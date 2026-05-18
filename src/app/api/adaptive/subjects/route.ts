import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { Prisma } from '@prisma/client'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const subjects = await prisma.subject.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'asc' },
    select: { id: true, title: true, color: true },
  })

  return NextResponse.json(subjects)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const body = (await req.json()) as { title?: string; color?: string }

  if (!body.title || body.title.trim().length < 2) {
    return NextResponse.json({ error: 'Name muss mindestens 2 Zeichen haben' }, { status: 400 })
  }

  try {
    const subject = await prisma.subject.create({
      data: {
        userId: session.user.id,
        title: body.title.trim(),
        color: body.color ?? '#6366f1',
      },
      select: { id: true, title: true, color: true },
    })
    return NextResponse.json(subject, { status: 201 })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return NextResponse.json({ error: 'Fach mit diesem Namen existiert bereits' }, { status: 409 })
    }
    throw err
  }
}
