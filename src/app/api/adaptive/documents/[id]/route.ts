import { NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { deleteFile } from '@/lib/adaptive/storage-adapter'
import { vectorStore } from '@/infrastructure/vector-store/qdrant-vector-store.adapter'
import { deleteDocumentChunks } from '@/lib/adaptive/rag-adapter'
import { verifyCsrf, csrfErrorResponse } from '@/lib/csrf'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyCsrf(req)) {
    return csrfErrorResponse()
  }

  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params

  const document = await prisma.document.findUnique({ where: { id } })

  if (!document || document.userId !== ctx.userId) {
    return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
  }

  // Datei aus Storage löschen
  await deleteFile(document.storagePath).catch(() => undefined)

  // Qdrant-Chunks löschen — neuer VectorStore + Legacy-Adapter (beide Collections)
  await Promise.all([
    vectorStore.deleteDocument({ documentId: id }),
    deleteDocumentChunks(id),
  ])

  // DB-Eintrag löschen (cascaded: ConceptNode → Edges, CachedTasks, Mastery)
  await prisma.document.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
