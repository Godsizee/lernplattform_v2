import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { generateTask } from '@/lib/adaptive/llm-adapter'
import { searchChunks } from '@/lib/adaptive/rag-adapter'
import { LLMAdapterError } from '@/types/learning'

/**
 * GET /api/tasks?nodeId={id}[&variant=true]
 *
 * Liefert eine Aufgabe für den Konzeptknoten:
 * - Ohne variant: gecachte Aufgabe zurückgeben, wenn vorhanden; sonst neu generieren
 * - Mit variant=true: immer neu generieren (andere context_variant)
 *
 * Fallback: wenn LLM nicht verfügbar → älteste gecachte Aufgabe mit meta.fallback=true
 */
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const nodeId = req.nextUrl.searchParams.get('nodeId')
  const wantVariant = req.nextUrl.searchParams.get('variant') === 'true'

  if (!nodeId) {
    return NextResponse.json({ error: 'nodeId fehlt' }, { status: 400 })
  }

  // Knoten holen + Eigentümer-Check
  const node = await prisma.conceptNode.findUnique({
    where: { id: nodeId },
    select: { id: true, userId: true, title: true, description: true, documentId: true },
  })

  if (!node || node.userId !== session.user.id) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }

  // User-Occupation für Prompt-Kontext laden
  const userProfile = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { occupation: true },
  })
  const occupation = userProfile?.occupation ?? undefined

  // Gecachte Aufgaben für diesen Knoten
  const cached = await prisma.cachedTask.findMany({
    where: { nodeId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, taskContent: true, contextVariant: true, createdAt: true },
  })

  // Ohne variant + Cache vorhanden → direkt zurückgeben
  if (!wantVariant && cached.length > 0) {
    const task = cached[0]
    return NextResponse.json({
      id: task.id,
      nodeId,
      nodeTitle: node.title,
      task: task.taskContent,
      meta: { cached: true, fallback: false },
    })
  }

  // Neue context_variant bestimmen
  const nextVariant = cached.length > 0 ? Math.max(...cached.map((c) => c.contextVariant)) + 1 : 1

  // LLM-Generierung versuchen
  try {
    const ragChunks = await searchChunks(node.title, session.user.id, node.documentId)
    const ragContext = ragChunks.length > 0 ? ragChunks.join('\n\n---\n\n') : undefined

    const generated = await generateTask(node.title, node.description, occupation, ragContext)

    const saved = await prisma.cachedTask.create({
      data: {
        nodeId,
        taskContent: generated.task,
        expectedAnswer: generated.expectedAnswer,
        contextVariant: nextVariant,
      },
      select: { id: true },
    })

    return NextResponse.json({
      id: saved.id,
      nodeId,
      nodeTitle: node.title,
      task: generated.task,
      meta: { cached: false, fallback: false },
    })
  } catch (err) {
    // LLM-Ausfall: gecachte Aufgabe als Fallback
    if (cached.length > 0) {
      const fallback = cached[cached.length - 1] // älteste Variante
      return NextResponse.json({
        id: fallback.id,
        nodeId,
        nodeTitle: node.title,
        task: fallback.taskContent,
        meta: { cached: true, fallback: true },
      })
    }

    const isLLMError = err instanceof LLMAdapterError
    return NextResponse.json(
      {
        error: isLLMError
          ? 'KI nicht verfügbar. Bitte versuche es erneut.'
          : 'Aufgaben-Generierung fehlgeschlagen.',
        retry: true,
      },
      { status: 503 }
    )
  }
}
