import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateExplanation } from "@/lib/aiService"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { question, userAnswer, correctAnswer } = await req.json()

    if (!question || !userAnswer || !correctAnswer) {
      return NextResponse.json({ error: "Ungültige Parameter" }, { status: 400 })
    }

    const explanation = await generateExplanation(question, userAnswer, correctAnswer)
    return NextResponse.json({ explanation })
  } catch (error) {
    console.error("Fehler in der Explain API Route:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
