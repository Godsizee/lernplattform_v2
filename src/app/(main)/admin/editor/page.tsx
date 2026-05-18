import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { notFound, redirect } from "next/navigation"
import { LessonEditor } from "@/components/features/LessonEditor"
import Link from "next/link"

interface PageProps {
  searchParams: Promise<{
    lessonId?: string
  }>
}

export default async function AdminEditorPage({ searchParams }: PageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id
  const { lessonId } = await searchParams

  // Fetch subjects of this admin user to select in form dropdown
  const subjects = await prisma.subject.findMany({
    where: { userId },
    select: { id: true, title: true }
  })

  let lesson = undefined

  if (lessonId) {
    const fetchedLesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { subject: true }
    })

    if (!fetchedLesson || fetchedLesson.subject.userId !== userId) {
      notFound()
    }

    lesson = {
      id: fetchedLesson.id,
      title: fetchedLesson.title,
      subjectId: fetchedLesson.subjectId,
      type: fetchedLesson.type,
      status: fetchedLesson.status,
      sortOrder: fetchedLesson.sortOrder,
      contentRaw: fetchedLesson.contentRaw,
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <i className="ph ph-squares-four"></i> Dashboard
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <Link href="/admin" className="hover:text-primary transition-colors">
          Admin-Bereich
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <span className="text-foreground font-medium">
          {lessonId ? "Lektion bearbeiten" : "Neue Lektion erstellen"}
        </span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl font-black tracking-tight">
          {lessonId ? "Lektion bearbeiten" : "Lektions-Editor"}
        </h1>
        <p className="text-sm text-muted mt-1">
          {lessonId 
            ? "Passe den Titel, Typ, Inhalt oder Status der bestehenden Lektion an." 
            : "Erstelle eine neue Lektion mit Markdown, füge interaktive Playgrounds hinzu oder entwerfe ein Quiz."}
        </p>
      </div>

      <LessonEditor subjects={subjects} initialLesson={lesson} />
    </div>
  )
}
