import { NextResponse } from 'next/server'
import { getTenantContext } from '@/lib/get-tenant-context'
import prisma from '@/db/client'
import { Prisma } from '@prisma/client'
import { deleteDocumentChunks } from '@/lib/adaptive/rag-adapter'
import { vectorStore } from '@/infrastructure/vector-store/qdrant-vector-store.adapter'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const userId = ctx.userId

  const subject = await prisma.subject.findFirst({ where: { id, userId } })
  if (!subject) {
    return NextResponse.json({ error: 'Fach nicht gefunden' }, { status: 404 })
  }

  const body = (await req.json()) as { title?: string; color?: string }

  const data: Prisma.SubjectUpdateInput = {}

  if (body.title !== undefined) {
    if (body.title.trim().length < 2) {
      return NextResponse.json({ error: 'Name muss mindestens 2 Zeichen haben' }, { status: 400 })
    }
    data.title = body.title.trim()
  }

  if (body.color !== undefined) {
    data.color = body.color
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'Keine Felder zum Aktualisieren' }, { status: 400 })
  }

  try {
    const updated = await prisma.subject.update({
      where: { id },
      data,
      select: { id: true, title: true, color: true },
    })
    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Fach mit diesem Namen existiert bereits' }, { status: 409 })
    }
    throw err
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await getTenantContext()
  if (!ctx) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const userId = ctx.userId

  const subject = await prisma.subject.findFirst({ where: { id, userId } })
  if (!subject) {
    return NextResponse.json({ error: 'Fach nicht gefunden' }, { status: 404 })
  }

  // Qdrant-Chunks aller Dokumente dieses Fachs löschen (beide Collections)
  const docs = await prisma.document.findMany({
    where: { subjectId: id },
    select: { id: true },
  })
  await Promise.all(
    docs.flatMap((d) => [
      vectorStore.deleteDocument({ documentId: d.id }),
      deleteDocumentChunks(d.id),
    ])
  )

  // Dokumente löschen (kaskadiert zu ConceptNodes, Tasks, Exams)
  await prisma.document.deleteMany({ where: { subjectId: id } })

  // Fach löschen
  await prisma.subject.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
