import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const exams = await prisma.exam.findMany({
    where: { userId: session.user.id },
    orderBy: { examDate: 'asc' },
    select: {
      id: true,
      title: true,
      examDate: true,
      documents: { select: { id: true, filename: true } },
      createdAt: true,
    },
  })

  return NextResponse.json(exams)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const body = (await req.json()) as {
    title?: string
    examDate?: string
    documentIds?: string[]
    nodeIds?: string[]
  }

  if (!body.title || body.title.trim().length < 3) {
    return NextResponse.json({ error: 'Thema muss mindestens 3 Zeichen haben' }, { status: 400 })
  }

  const examDate = body.examDate ? new Date(body.examDate) : null
  if (!examDate || isNaN(examDate.getTime()) || examDate <= new Date()) {
    return NextResponse.json({ error: 'Klausurdatum muss in der Zukunft liegen' }, { status: 400 })
  }

  const docIds = Array.isArray(body.documentIds) ? body.documentIds : []
  const nodeIds = Array.isArray(body.nodeIds) ? body.nodeIds : []

  if (docIds.length > 0) {
    const ownedCount = await prisma.document.count({
      where: { id: { in: docIds }, userId: session.user.id },
    })
    if (ownedCount !== docIds.length) {
      return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 400 })
    }
  }

  if (nodeIds.length > 0) {
    const ownedCount = await prisma.conceptNode.count({
      where: { id: { in: nodeIds }, userId: session.user.id },
    })
    if (ownedCount !== nodeIds.length) {
      return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 400 })
    }
  }

  const exam = await prisma.exam.create({
    data: {
      userId: session.user.id,
      title: body.title.trim(),
      examDate,
      documents: docIds.length > 0 ? { connect: docIds.map((id) => ({ id })) } : undefined,
      nodes: nodeIds.length > 0 ? { connect: nodeIds.map((id) => ({ id })) } : undefined,
    },
  })

  return NextResponse.json(exam, { status: 201 })
}
