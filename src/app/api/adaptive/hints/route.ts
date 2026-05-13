import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { generateHint } from '@/lib/adaptive/llm-adapter'
import { searchChunks } from '@/lib/adaptive/rag-adapter'
import { checkRateLimit } from '@/lib/adaptive/rate-limit'

/**
 * POST /api/hints
 * Body: { taskId: string, hintLevel: 1 | 2 | 3 }
 *
 * Generiert einen Hinweis für die Aufgabe auf dem angegebenen Level.
 * Hinweise werden nicht in der DB gespeichert — reine LLM-Generierung.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  if (!checkRateLimit(`hints:${session.user.id}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Hinweis-Anfragen. Bitte warte kurz.' }, { status: 429 })
  }

  const { taskId, hintLevel, userAnswer } = await req.json()

  if (!taskId || ![1, 2, 3].includes(hintLevel)) {
    return NextResponse.json({ error: 'taskId und hintLevel (1–3) erforderlich' }, { status: 400 })
  }

  // Task + Knoten laden (mit Eigentümer-Check)
  const task = await prisma.cachedTask.findUnique({
    where: { id: taskId },
    include: { node: { select: { userId: true, title: true, description: true, documentId: true } } },
  })

  if (!task || task.node.userId !== session.user.id) {
    return NextResponse.json({ error: 'Aufgabe nicht gefunden' }, { status: 404 })
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { occupation: true },
  })
  const occupation = userProfile?.occupation ?? undefined

  const ragChunks = await searchChunks(task.node.title, session.user.id, task.node.documentId)
  const ragContext = ragChunks.length > 0 ? ragChunks.join('\n\n---\n\n') : undefined

  const hint = await generateHint(task.node.title, task.node.description, task.taskContent, hintLevel as 1 | 2 | 3, occupation, typeof userAnswer === 'string' ? userAnswer : undefined, ragContext)

  return NextResponse.json({ hint, hintLevel })
}
