import { NextRequest, NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { generateDeepExplanation } from '@/lib/adaptive/llm-adapter'
import { vectorStore } from '@/infrastructure/vector-store/qdrant-vector-store.adapter'
import { checkRateLimit } from '@/lib/adaptive/rate-limit'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  if (!checkRateLimit(`explain:${ctx.userId}`, 20, 60 * 60 * 1000)) {
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

  if (!task || task.node.userId !== ctx.userId) {
    return NextResponse.json({ error: 'Aufgabe nicht gefunden' }, { status: 404 })
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: ctx.userId },
    select: { occupation: true },
  })
  const occupation = userProfile?.occupation ?? undefined

  const results = await vectorStore.search({
    tenantId: ctx.tenantId,
    query: task.node.title,
    documentId: task.node.documentId,
  })
  const ragContext = results.length > 0 ? results.map((r) => r.text).join('\n\n---\n\n') : undefined

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
