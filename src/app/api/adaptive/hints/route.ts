import { NextRequest, NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { generateHint } from '@/lib/adaptive/llm-adapter'
import { vectorStore } from '@/infrastructure/vector-store/qdrant-vector-store.adapter'
import { checkRateLimit } from '@/lib/adaptive/rate-limit'

export async function POST(req: NextRequest) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  if (!checkRateLimit(`hints:${ctx.userId}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Hinweis-Anfragen. Bitte warte kurz.' }, { status: 429 })
  }

  const { taskId, hintLevel, userAnswer } = await req.json()

  if (!taskId || ![1, 2, 3].includes(hintLevel)) {
    return NextResponse.json({ error: 'taskId und hintLevel (1–3) erforderlich' }, { status: 400 })
  }

  const task = await prisma.cachedTask.findUnique({
    where: { id: taskId },
    include: { node: { select: { userId: true, title: true, description: true, documentId: true } } },
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

  const hint = await generateHint(
    task.node.title,
    task.node.description,
    task.taskContent,
    hintLevel as 1 | 2 | 3,
    occupation,
    typeof userAnswer === 'string' ? userAnswer : undefined,
    ragContext
  )

  return NextResponse.json({ hint, hintLevel })
}
