import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

// POST /api/concept-nodes — neuen Knoten anlegen
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { documentId, title, description } = await req.json()

  if (!documentId || !title?.trim()) {
    return NextResponse.json({ error: 'documentId und title sind Pflichtfelder' }, { status: 400 })
  }

  // Sicherstellen dass das Dokument dem Nutzer gehört
  const doc = await prisma.document.findUnique({ where: { id: documentId } })
  if (!doc || doc.userId !== session.user.id) {
    return NextResponse.json({ error: 'Dokument nicht gefunden' }, { status: 404 })
  }

  const node = await prisma.conceptNode.create({
    data: {
      userId: session.user.id,
      documentId,
      title: title.trim().slice(0, 60),
      description: description?.trim() ?? '',
    },
    select: { id: true, title: true, description: true },
  })

  return NextResponse.json(node, { status: 201 })
}
