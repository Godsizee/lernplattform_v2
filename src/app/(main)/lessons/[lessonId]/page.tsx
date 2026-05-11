import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { notFound, redirect } from "next/navigation"
import { LessonReader } from "@/components/features/LessonReader"
import { QuizEngine } from "@/components/features/QuizEngine"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    lessonId: string
  }>
}

export default async function LessonDetailPage({ params }: PageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const { lessonId } = await params
  const userId = session.user.id

  // Fetch the lesson ensuring it belongs to the user's subjects (multi-tenancy safety)
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      subject: true,
      progress: {
        where: { userId }
      }
    }
  })

  if (!lesson || lesson.subject.userId !== userId) {
    notFound()
  }

  const isCompleted = lesson.progress.some(p => p.status === "completed")

  // For quizzes, render the Quiz Engine
  if (lesson.type === "quiz") {
    let questions = []
    try {
      questions = JSON.parse(lesson.contentRaw || "[]")
    } catch (e) {
      console.error("Fehler beim Parsen der Quiz-Fragen:", e)
    }

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <i className="ph ph-squares-four"></i> Dashboard
          </Link>
          <i className="ph ph-caret-right text-xs"></i>
          <Link href={`/subjects/${lesson.subjectId}`} className="hover:text-primary transition-colors">
            {lesson.subject.title}
          </Link>
          <i className="ph ph-caret-right text-xs"></i>
          <span className="text-foreground font-medium truncate">{lesson.title}</span>
        </nav>

        {/* Header Block */}
        <div className="text-center space-y-2 pb-2">
          <span 
            className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-border"
            style={{ color: lesson.subject.color }}
          >
            {lesson.subject.title}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{lesson.title}</h1>
        </div>

        {/* Quiz Canvas */}
        <QuizEngine
          questions={questions}
          lessonId={lesson.id}
          subjectId={lesson.subjectId}
        />
      </div>
    )
  }

  // Fetch initial bookmark status & personal notes
  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  })
  const isBookmarked = !!bookmark

  const lessonNote = await prisma.lessonNote.findUnique({
    where: {
      userId_lessonId: { userId, lessonId }
    }
  })
  const initialNote = lessonNote?.content || ""

  // Default: Article Lesson Reader
  return (
    <LessonReader
      lesson={{
        id: lesson.id,
        title: lesson.title,
        contentRaw: lesson.contentRaw || lesson.content,
        type: lesson.type,
        subjectId: lesson.subjectId
      }}
      subject={{
        title: lesson.subject.title,
        color: lesson.subject.color
      }}
      isCompleted={isCompleted}
      isBookmarked={isBookmarked}
      initialNote={initialNote}
    />
  )
}
