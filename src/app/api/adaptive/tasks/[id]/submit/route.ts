import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { evaluateAnswer } from '@/lib/adaptive/llm-adapter'

/**
 * POST /api/tasks/[id]/submit
 * Body: { answer: string }
 *
 * Bewertet die Antwort via LLM, speichert den Versuch,
 * und setzt NodeMastery bei korrekter Antwort.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id: taskId } = await params
  const { answer } = await req.json()

  if (!answer?.trim()) {
    return NextResponse.json({ error: 'Antwort darf nicht leer sein' }, { status: 400 })
  }

  if (answer.trim().length > 2000) {
    return NextResponse.json(
      { error: 'Antwort zu lang (max. 2000 Zeichen)' },
      { status: 400 }
    )
  }

  // Task + Knoten laden
  const task = await prisma.cachedTask.findUnique({
    where: { id: taskId },
    include: { node: { select: { id: true, userId: true, title: true } } },
  })

  if (!task || task.node.userId !== session.user.id) {
    return NextResponse.json({ error: 'Aufgabe nicht gefunden' }, { status: 404 })
  }

  // LLM-Bewertung
  let evaluation
  try {
    evaluation = await evaluateAnswer(
      task.node.title,
      task.taskContent,
      task.expectedAnswer,
      answer.trim()
    )
  } catch {
    return NextResponse.json({ error: 'Bewertung fehlgeschlagen. Bitte erneut versuchen.' }, { status: 503 })
  }

  const userId = session.user.id
  const nodeId = task.node.id

  // Versuch speichern + ggf. Mastery setzen + Session aktualisieren (atomar)
  await prisma.$transaction(async (tx) => {
    await tx.taskAttempt.create({
      data: {
        taskId,
        userId,
        answer: answer.trim(),
        isCorrect: evaluation.correct,
        errorType: evaluation.errorType,
        feedback: evaluation.explanation,
      },
    })

    if (evaluation.correct) {
      await tx.nodeMastery.upsert({
        where: { userId_nodeId: { userId, nodeId } },
        create: { userId, nodeId },
        update: { masteredAt: new Date() },
      })
    }

    // LearningSession aktualisieren
    await tx.learningSession.upsert({
      where: { userId },
      create: { userId, lastNodeId: nodeId, lastTaskId: taskId },
      update: { lastNodeId: nodeId, lastTaskId: taskId },
    })
  })

  return NextResponse.json({
    correct: evaluation.correct,
    errorType: evaluation.errorType,
    explanation: evaluation.explanation,
  })
}
