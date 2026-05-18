import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id } = await params
  const userId = session.user.id

  const exam = await prisma.exam.findFirst({ where: { id, userId } })
  if (!exam) {
    return NextResponse.json({ error: 'Klausurtermin nicht gefunden' }, { status: 404 })
  }

  const body = (await req.json()) as {
    title?: string
    examDate?: string
    documentIds?: string[]
    nodeIds?: string[]
  }

  const data: Parameters<typeof prisma.exam.update>[0]['data'] = {}

  if (body.title !== undefined) {
    if (body.title.trim().length < 3) {
      return NextResponse.json({ error: 'Thema muss mindestens 3 Zeichen haben' }, { status: 400 })
    }
    data.title = body.title.trim()
  }

  if (body.examDate !== undefined) {
    const examDate = new Date(body.examDate)
    if (isNaN(examDate.getTime()) || examDate <= new Date()) {
      return NextResponse.json({ error: 'Klausurdatum muss in der Zukunft liegen' }, { status: 400 })
    }
    data.examDate = examDate
  }

  if (body.documentIds !== undefined) {
    const docIds = Array.isArray(body.documentIds) ? body.documentIds : []
    if (docIds.length > 0) {
      const ownedCount = await prisma.document.count({ where: { id: { in: docIds }, userId } })
      if (ownedCount !== docIds.length) {
        return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 400 })
      }
    }
    data.documents = { set: docIds.map((id) => ({ id })) }
  }

  if (body.nodeIds !== undefined) {
    const nodeIds = Array.isArray(body.nodeIds) ? body.nodeIds : []
    if (nodeIds.length > 0) {
      const ownedCount = await prisma.conceptNode.count({ where: { id: { in: nodeIds }, userId } })
      if (ownedCount !== nodeIds.length) {
        return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 400 })
      }
    }
    data.nodes = { set: nodeIds.map((id) => ({ id })) }
  }

  const updated = await prisma.exam.update({ where: { id }, data })
  return NextResponse.json(updated)
}

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

  const exam = await prisma.exam.findFirst({ where: { id, userId } })
  if (!exam) {
    return NextResponse.json({ error: 'Klausurtermin nicht gefunden' }, { status: 404 })
  }

  await prisma.exam.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
