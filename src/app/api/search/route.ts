import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/db/client"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")?.trim() || ""

    if (query.length < 2) {
      return NextResponse.json({ subjects: [], lessons: [] })
    }

    const userId = session.user.id

    // Search subjects
    const subjects = await prisma.subject.findMany({
      where: {
        userId,
        title: {
          contains: query
        }
      },
      select: {
        id: true,
        title: true,
        color: true,
        icon: true
      },
      take: 5
    })

    // Search lessons matching either the title or the raw markdown content
    const lessons = await prisma.lesson.findMany({
      where: {
        subject: {
          userId
        },
        status: "published",
        OR: [
          {
            title: {
              contains: query
            }
          },
          {
            contentRaw: {
              contains: query
            }
          }
        ]
      },
      select: {
        id: true,
        title: true,
        type: true,
        subject: {
          select: {
            title: true,
            color: true
          }
        }
      },
      take: 8
    })

    return NextResponse.json({ subjects, lessons })
  } catch (error) {
    console.error("Fehler bei der globalen Suche:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
