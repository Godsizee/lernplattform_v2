import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { generateChatResponse } from "@/lib/aiService"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { lessonTitle, lessonContent, messages } = await req.json()

    if (!lessonTitle || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Ungültige Parameter" }, { status: 400 })
    }

    const reply = await generateChatResponse(lessonTitle, lessonContent || "", messages)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error("Fehler in der Chat API Route:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
