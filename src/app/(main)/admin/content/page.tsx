import prisma from "@/db/client"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ContentManagementTable } from "@/components/features/ContentManagementTable"
import Link from "next/link"

export default async function AdminContentPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id

  // Fetch all subjects
  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: { lessons: true }
      }
    },
    orderBy: { title: "asc" }
  })

  // Fetch all lessons
  const lessons = await prisma.lesson.findMany({
    orderBy: [
      { subjectId: "asc" },
      { sortOrder: "asc" }
    ],
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      sortOrder: true,
      subjectId: true,
      subject: {
        select: {
          title: true,
          color: true
        }
      }
    }
  })

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
        <span className="text-foreground font-medium">Inhaltsverwaltung</span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Inhalte verwalten</h1>
          <p className="text-sm text-muted mt-1">Hier siehst du alle Fächer und Lektionen deines Lehrplans. Bearbeite sie im Editor oder erstelle neue.</p>
        </div>
        <Link 
          href="/admin/editor"
          className="px-4 py-2 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-primary/10 flex items-center gap-1.5 shrink-0"
        >
          <i className="ph ph-plus-circle text-sm"></i> Neue Lektion
        </Link>
      </div>

      <ContentManagementTable initialLessons={lessons} initialSubjects={subjects} />
    </div>
  )
}

