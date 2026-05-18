/**
 * Document-Processor — liest Dateiinhalt aus Storage und ruft LLM-Adapter auf.
 * Nur server-side verwenden.
 */

import path from 'path'
import fs from 'fs/promises'
import { extractGraph, extractExamGraph } from '@/lib/adaptive/llm-adapter'
import { indexDocumentChunks } from '@/lib/adaptive/rag-adapter'
import prisma from '@/db/client'
import type { ExtractedGraph } from '@/types/learning'
import { LOCAL_UPLOAD_DIR, useSupabaseStorage } from '@/lib/adaptive/storage-adapter'

// ---------------------------------------------------------------------------
// Datei-Inhalt lesen
// ---------------------------------------------------------------------------

async function readLocalFile(storagePath: string): Promise<Buffer> {
  return fs.readFile(path.join(LOCAL_UPLOAD_DIR, storagePath))
}

async function readSupabaseFile(storagePath: string): Promise<Buffer> {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.storage
    .from('learning-documents')
    .download(storagePath)

  if (error || !data) throw new Error(`Storage-Lesefehler: ${error?.message}`)
  return Buffer.from(await data.arrayBuffer())
}

async function readFileBuffer(storagePath: string): Promise<Buffer> {
  if (useSupabaseStorage()) {
    return readSupabaseFile(storagePath)
  }
  return readLocalFile(storagePath)
}

async function bufferToText(buffer: Buffer, storagePath: string): Promise<string> {
  const ext = path.extname(storagePath).toLowerCase()

  if (ext === '.pdf') {
    // @ts-ignore
    const pdfModule: any = await import('pdf-parse')
    const pdfParse = pdfModule.default ?? pdfModule
    const result = await pdfParse(buffer)
    return result.text as string
  }

  // .txt und .md: direkt als UTF-8 lesen
  return buffer.toString('utf-8')
}

// ---------------------------------------------------------------------------
// Haupt-Funktion: Dokument verarbeiten
// ---------------------------------------------------------------------------

export async function processDocument(documentId: string, userId: string): Promise<void> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  })

  if (!document || document.userId !== userId) {
    throw new Error('Dokument nicht gefunden')
  }

  if (document.status === 'processed') {
    throw new Error('Dokument wurde bereits verarbeitet')
  }

  // Datei lesen und in Text umwandeln
  const buffer = await readFileBuffer(document.storagePath)
  const text = await bufferToText(buffer, document.storagePath)

  if (!text.trim()) {
    throw new Error('Dokument enthält keinen lesbaren Text')
  }

  // RAG: Chunks einbetten und in Qdrant speichern (fire-and-forget)
  indexDocumentChunks(document.id, document.userId, text).catch(() => {})

  // Graph extrahieren (mit Retry)
  const graph: ExtractedGraph = await extractGraph(text)

  // Atomares Schreiben: Nodes + Edges + Status-Update in einer Transaktion
  await prisma.$transaction(async (tx) => {
    // Alte Knoten/Kanten für dieses Dokument löschen (Idempotenz bei Retry)
    await tx.conceptNode.deleteMany({ where: { documentId } })

    // Knoten anlegen (Knoten ohne Titel oder Beschreibung überspringen)
    const validNodes = graph.nodes.filter(
      (node) => typeof node.title === 'string' && node.title.trim().length > 0
    )

    const createdNodes = await Promise.all(
      validNodes.map((node) =>
        tx.conceptNode.create({
          data: {
            userId,
            documentId,
            title: node.title.trim().slice(0, 60),
            description: typeof node.description === 'string' ? node.description : '',
          },
        })
      )
    )

    if (validNodes.length === 0) {
      throw new Error('LLM hat keine gültigen Knoten extrahiert')
    }

    // Titel → ID Mapping für Kanten
    const titleToId = new Map(createdNodes.map((n) => [n.title.toLowerCase(), n.id]))

    // Kanten anlegen (nur wenn beide Knoten existieren und from/to Strings sind)
    const validEdges = graph.edges.filter((edge) => {
      if (typeof edge.from !== 'string' || typeof edge.to !== 'string') return false
      const fromId = titleToId.get(edge.from.toLowerCase())
      const toId = titleToId.get(edge.to.toLowerCase())
      return fromId && toId && fromId !== toId
    })

    if (validEdges.length > 0) {
      await tx.conceptEdge.createMany({
        data: validEdges.map((edge) => ({
          prerequisiteNodeId: titleToId.get(edge.from.toLowerCase())!,
          dependentNodeId: titleToId.get(edge.to.toLowerCase())!,
        })),
        skipDuplicates: true,
      })
    }

    // Status auf 'processed' setzen
    await tx.document.update({
      where: { id: documentId },
      data: { status: 'processed' },
    })
  })
}

// ---------------------------------------------------------------------------
// Übungsklausur verarbeiten (Story 7.1)
// ---------------------------------------------------------------------------

/**
 * Verarbeitet eine Übungsklausur: extrahiert Konzeptgraph UND legt
 * echte Klausurfragen direkt als CachedTask-Einträge an.
 */
export async function processExamDocument(documentId: string, userId: string): Promise<void> {
  const document = await prisma.document.findUnique({ where: { id: documentId } })

  if (!document || document.userId !== userId) {
    throw new Error('Dokument nicht gefunden')
  }

  if (document.status === 'processed') {
    throw new Error('Dokument wurde bereits verarbeitet')
  }

  const buffer = await readFileBuffer(document.storagePath)
  const text = await bufferToText(buffer, document.storagePath)

  if (!text.trim()) {
    throw new Error('Dokument enthält keinen lesbaren Text')
  }

  const graph = await extractExamGraph(text)

  if (graph.questions.length === 0) {
    throw new Error('LLM hat keine Aufgaben extrahiert')
  }

  await prisma.$transaction(async (tx) => {
    await tx.conceptNode.deleteMany({ where: { documentId } })

    // 1 Aufgabe = 1 Knoten + 1 CachedTask
    for (const q of graph.questions) {
      const node = await tx.conceptNode.create({
        data: {
          userId,
          documentId,
          title: q.title,
          description: q.description,
        },
      })

      await tx.cachedTask.create({
        data: {
          nodeId: node.id,
          taskContent: q.question,
          expectedAnswer: q.answer,
        },
      })
    }

    await tx.document.update({
      where: { id: documentId },
      data: { status: 'processed' },
    })
  })
}
