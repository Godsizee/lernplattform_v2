import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

/**
 * DELETE /api/assessment/[subjectId]
 *
 * Löscht das Assessment für dieses Fach — Modal erscheint beim nächsten Lernstart erneut.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ subjectId: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { subjectId } = await params

  await prisma.subjectAssessment.deleteMany({
    where: { userId: session.user.id, subjectId },
  })

  return NextResponse.json({ ok: true })
}
