import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateSummary } from "@/lib/aiService"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { lessonTitle, lessonContent } = await req.json()

    if (!lessonTitle) {
      return NextResponse.json({ error: "Ungültige Parameter" }, { status: 400 })
    }

    const summary = await generateSummary(lessonTitle, lessonContent || "")
    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Fehler in der Summarize API Route:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
