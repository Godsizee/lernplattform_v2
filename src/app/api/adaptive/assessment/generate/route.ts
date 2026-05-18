import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { generateAssessmentQuestions } from '@/lib/adaptive/llm-adapter'
import { checkRateLimit } from '@/lib/adaptive/rate-limit'

/**
 * POST /api/assessment/generate
 * Body: { subjectId: string }
 *
 * Wählt bis zu 3 zufällige Konzeptknoten aus dem Fach und generiert MC-Fragen.
 */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  if (!checkRateLimit(`assessment:gen:${session.user.id}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Zu viele Anfragen.' }, { status: 429 })
  }

  const { subjectId } = await req.json()
  if (!subjectId || typeof subjectId !== 'string') {
    return NextResponse.json({ error: 'subjectId erforderlich' }, { status: 400 })
  }

  // Sicherstellen dass das Fach dem User gehört
  const subject = await prisma.subject.findFirst({
    where: { id: subjectId, userId: session.user.id },
  })
  if (!subject) {
    return NextResponse.json({ error: 'Fach nicht gefunden' }, { status: 404 })
  }

  // Alle Knoten aus dem Fach laden
  const allNodes = await prisma.conceptNode.findMany({
    where: {
      userId: session.user.id,
      document: { subjectId },
    },
    select: { title: true, description: true },
  })

  if (allNodes.length < 1) {
    return NextResponse.json({ error: 'Keine Konzeptknoten im Fach' }, { status: 400 })
  }

  // Fisher-Yates shuffle, erste 3 nehmen
  const shuffled = [...allNodes].sort(() => Math.random() - 0.5).slice(0, 3)

  const questions = await generateAssessmentQuestions(shuffled)
  return NextResponse.json({ questions })
}
