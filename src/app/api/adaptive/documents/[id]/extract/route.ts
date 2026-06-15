import { NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { processDocument, processExamDocument } from '@/lib/adaptive/document-processor'
import { LLMAdapterError } from '@/types/learning'
import { findDuplicates } from '@/lib/adaptive/node-similarity'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const mode = new URL(req.url).searchParams.get('mode')

  try {
    if (mode === 'exam') {
      await processExamDocument(id, ctx.userId, ctx.tenantId)
    } else {
      await processDocument(id, ctx.userId, ctx.tenantId)
    }

    const newNodes = await prisma.conceptNode.findMany({
      where: { documentId: id },
      select: { id: true, title: true },
    })

    const existingNodes = await prisma.conceptNode.findMany({
      where: { userId: ctx.userId, documentId: { not: id } },
      select: { id: true, title: true },
    })

    const duplicates = findDuplicates(newNodes, existingNodes)

    return NextResponse.json({ nodeCount: newNodes.length, duplicates })
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
