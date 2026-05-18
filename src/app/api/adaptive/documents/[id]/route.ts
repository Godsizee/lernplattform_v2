import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { deleteFile } from '@/lib/adaptive/storage-adapter'
import { deleteDocumentChunks } from '@/lib/adaptive/rag-adapter'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const userId = session.user.id

  const document = await prisma.document.findUnique({ where: { id } })

  if (!document || document.userId !== userId) {
    return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
  }

  // Datei aus Storage löschen (Fehler ignorieren — DB-Eintrag trotzdem löschen)
  await deleteFile(document.storagePath).catch(() => undefined)

  // Qdrant-Chunks löschen
  await deleteDocumentChunks(id)

  // DB-Eintrag löschen (cascaded: ConceptNode → Edges, CachedTasks, Mastery)
  await prisma.document.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
