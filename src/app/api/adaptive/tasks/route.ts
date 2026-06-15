import { NextRequest, NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { generateTask } from '@/lib/adaptive/llm-adapter'
import { vectorStore } from '@/infrastructure/vector-store/qdrant-vector-store.adapter'
import { LLMAdapterError } from '@/types/learning'

export async function GET(req: NextRequest) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const nodeId = req.nextUrl.searchParams.get('nodeId')
  const wantVariant = req.nextUrl.searchParams.get('variant') === 'true'

  if (!nodeId) {
    return NextResponse.json({ error: 'nodeId fehlt' }, { status: 400 })
  }

  const node = await prisma.conceptNode.findUnique({
    where: { id: nodeId },
    select: { id: true, userId: true, title: true, description: true, documentId: true },
  })

  if (!node || node.userId !== ctx.userId) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: ctx.userId },
    select: { occupation: true },
  })
  const occupation = userProfile?.occupation ?? undefined

  const cached = await prisma.cachedTask.findMany({
    where: { nodeId },
    orderBy: { createdAt: 'desc' },
    select: { id: true, taskContent: true, contextVariant: true, createdAt: true },
  })

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

  const nextVariant = cached.length > 0 ? Math.max(...cached.map((c) => c.contextVariant)) + 1 : 1

  try {
    const results = await vectorStore.search({
      tenantId: ctx.tenantId,
      query: node.title,
      documentId: node.documentId,
    })
    const ragContext = results.length > 0 ? results.map((r) => r.text).join('\n\n---\n\n') : undefined

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
    if (cached.length > 0) {
      const fallback = cached[cached.length - 1]
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
