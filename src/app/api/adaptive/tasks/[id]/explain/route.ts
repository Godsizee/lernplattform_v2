import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { generateDeepExplanation } from '@/lib/adaptive/llm-adapter'
import { searchChunks } from '@/lib/adaptive/rag-adapter'
import { checkRateLimit } from '@/lib/adaptive/rate-limit'

/**
 * POST /api/tasks/[id]/explain
 * Body: { userAnswer: string, previousExplanation: string }
 *
 * Generiert eine tiefergehende Erklärung für eine Aufgabe.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  if (!checkRateLimit(`explain:${session.user.id}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Anfragen. Bitte warte kurz.' }, { status: 429 })
  }

  const { id: taskId } = await params
  const { userAnswer, previousExplanation } = await req.json()

  if (!userAnswer?.trim() || !previousExplanation?.trim()) {
    return NextResponse.json(
      { error: 'userAnswer und previousExplanation dürfen nicht leer sein' },
      { status: 400 }
    )
  }

  if (userAnswer.trim().length > 2000 || previousExplanation.trim().length > 1000) {
    return NextResponse.json({ error: 'Eingabe zu lang' }, { status: 400 })
  }

  const task = await prisma.cachedTask.findUnique({
    where: { id: taskId },
    include: { node: { select: { userId: true, title: true, documentId: true } } },
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

  let explanation
  try {
    explanation = await generateDeepExplanation(
      task.node.title,
      task.taskContent,
      userAnswer.trim(),
      previousExplanation.trim(),
      occupation,
      ragContext
    )
  } catch {
    return NextResponse.json(
      { error: 'Erklärung konnte nicht generiert werden.' },
      { status: 503 }
    )
  }

  return NextResponse.json({ explanation })
}
