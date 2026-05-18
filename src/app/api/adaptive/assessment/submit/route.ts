import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import type { Level } from '@prisma/client'

/**
 * POST /api/assessment/submit
 * Body: { subjectId: string, correctCount: number }
 *
 * Berechnet Level aus Anzahl richtiger Antworten und speichert Assessment.
 * correctCount 0-1 → EASY, 2 → MEDIUM, 3 → HARD
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  const { subjectId, correctCount } = await req.json()

  if (!subjectId || typeof subjectId !== 'string') {
    return NextResponse.json({ error: 'subjectId erforderlich' }, { status: 400 })
  }
  if (typeof correctCount !== 'number' || correctCount < 0 || correctCount > 3) {
    return NextResponse.json({ error: 'correctCount muss 0–3 sein' }, { status: 400 })
  }

  // Sicherstellen dass das Fach dem User gehört
  const subject = await prisma.subject.findFirst({
    where: { id: subjectId, userId: session.user.id },
  })
  if (!subject) {
    return NextResponse.json({ error: 'Fach nicht gefunden' }, { status: 404 })
  }

  const level: Level = correctCount <= 1 ? 'EASY' : correctCount === 2 ? 'MEDIUM' : 'HARD'

  await prisma.subjectAssessment.upsert({
    where: { userId_subjectId: { userId: session.user.id, subjectId } },
    create: { userId: session.user.id, subjectId, level },
    update: { level, completedAt: new Date() },
  })

  return NextResponse.json({ level })
}
