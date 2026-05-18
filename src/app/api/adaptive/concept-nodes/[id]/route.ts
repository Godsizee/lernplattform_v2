import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

// PATCH /api/concept-nodes/[id] — Titel und Beschreibung aktualisieren
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { id } = await params
  const { title, description } = await req.json()

  if (!title?.trim()) {
    return NextResponse.json({ error: 'Titel darf nicht leer sein' }, { status: 400 })
  }

  const existing = await prisma.conceptNode.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }

  const node = await prisma.conceptNode.update({
    where: { id },
    data: {
      title: title.trim().slice(0, 60),
      description: description?.trim() ?? existing.description,
    },
    select: { id: true, title: true, description: true },
  })

  return NextResponse.json(node)
}

// DELETE /api/concept-nodes/[id] — Knoten + Kanten löschen (Cascade via Prisma)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { id } = await params

  const existing = await prisma.conceptNode.findUnique({ where: { id } })
  if (!existing || existing.userId !== session.user.id) {
    return NextResponse.json({ error: 'Knoten nicht gefunden' }, { status: 404 })
  }

  await prisma.conceptNode.delete({ where: { id } })

  return new NextResponse(null, { status: 204 })
}
