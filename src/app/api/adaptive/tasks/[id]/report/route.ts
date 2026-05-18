import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

/**
 * POST /api/tasks/[id]/report
 *
 * Inkrementiert report_count für die Aufgabe.
 * Idempotent pro Nutzer: speichert gemeldete Task-IDs in der Session (client-seitig).
 * Server-seitig: einfaches Inkrement ohne Duplikat-Prüfung (ausreichend für MVP).
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { id: taskId } = await params

  const task = await prisma.cachedTask.findUnique({
    where: { id: taskId },
    include: { node: { select: { userId: true } } },
  })

  if (!task || task.node.userId !== session.user.id) {
    return NextResponse.json({ error: 'Aufgabe nicht gefunden' }, { status: 404 })
  }

  await prisma.cachedTask.update({
    where: { id: taskId },
    data: { reportCount: { increment: 1 } },
  })

  return NextResponse.json({ success: true })
}
