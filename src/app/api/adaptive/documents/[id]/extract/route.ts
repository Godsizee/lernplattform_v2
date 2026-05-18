import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { processDocument, processExamDocument } from '@/lib/adaptive/document-processor'
import { LLMAdapterError } from '@/types/learning'
import { findDuplicates } from '@/lib/adaptive/node-similarity'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const userId = session.user.id
  const mode = new URL(req.url).searchParams.get('mode')

  try {
    if (mode === 'exam') {
      await processExamDocument(id, userId)
    } else {
      await processDocument(id, userId)
    }

    // Neu extrahierte Knoten dieses Dokuments
    const newNodes = await prisma.conceptNode.findMany({
      where: { documentId: id },
      select: { id: true, title: true },
    })

    // Alle anderen Knoten des Nutzers (aus anderen Dokumenten)
    const existingNodes = await prisma.conceptNode.findMany({
      where: { userId, documentId: { not: id } },
      select: { id: true, title: true },
    })

    const duplicates = findDuplicates(newNodes, existingNodes)

    return NextResponse.json({
      nodeCount: newNodes.length,
      duplicates,
    })
  } catch (err) {
    console.error('[extract] Fehler:', err instanceof Error ? err.message : String(err))
    if (err instanceof LLMAdapterError) {
      return NextResponse.json(
        { error: 'KI-Extraktion fehlgeschlagen. Bitte versuche es erneut.', retry: true },
        { status: 503 }
      )
    }
    const message = err instanceof Error ? err.message : 'Unbekannter Fehler'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
