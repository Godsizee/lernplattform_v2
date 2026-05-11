import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"

interface PageProps {
  params: Promise<{
    subjectId: string
  }>
}

export default async function SubjectLessonsPage({ params }: PageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const { subjectId } = await params
  const userId = session.user.id

  // Fetch subject details with associated lessons and current user progress
  const subject = await prisma.subject.findUnique({
    where: {
      id: subjectId,
      userId, // Ensure the subject belongs to the logged-in user (multi-tenancy)
    },
    include: {
      lessons: {
        where: { status: "published" },
        orderBy: { sortOrder: "asc" },
        include: {
          progress: {
            where: { userId }
          }
        }
      }
    }
  })

  if (!subject) {
    notFound()
  }

  // Calculate stats for this subject
  const totalLessons = subject.lessons.length
  const completedLessons = subject.lessons.filter(lesson => 
    lesson.progress.some(p => p.status === "completed")
  ).length
  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <i className="ph ph-squares-four"></i> Dashboard
        </Link>
        <i className="ph ph-caret-right text-xs"></i>
        <span className="text-foreground font-medium truncate">{subject.title}</span>
      </nav>

      {/* Header card with subject color styling */}
      <div 
        className="relative overflow-hidden rounded-3xl p-8 md:p-10 border border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm"
        style={{ 
          background: `linear-gradient(135deg, ${subject.color}15 0%, var(--surface) 100%)`,
          borderColor: `${subject.color}30`
        }}
      >
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm"
              style={{ backgroundColor: `${subject.color}25`, color: subject.color }}
            >
              <i className={`ph ${subject.icon}`}></i>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{subject.title}</h1>
              <p className="text-xs text-muted mt-0.5">Lehrplan &amp; Lektionen</p>
            </div>
          </div>
        </div>

        {/* Progress summary block */}
        <div className="bg-surface/90 border border-border/80 backdrop-blur-sm px-6 py-4 rounded-2xl shrink-0 flex items-center gap-4 shadow-sm z-10 w-full md:w-auto">
          <div className="flex-1 space-y-1.5 min-w-[150px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-muted">Kursfortschritt</span>
              <span className="font-bold" style={{ color: subject.color }}>{percent}%</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${percent}%`,
                  backgroundColor: subject.color
                }}
              ></div>
            </div>
            <div className="text-[11px] text-muted text-right">
              {completedLessons} von {totalLessons} abgeschlossen
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: subject.color }}
        ></div>
      </div>

      {/* Curriculum list */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Curriculum</h2>

        {totalLessons === 0 ? (
          <div className="bg-surface border border-border rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted/10 flex items-center justify-center mx-auto text-muted text-3xl">
              <i className="ph ph-folder-open"></i>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">Noch keine Lektionen</h3>
              <p className="text-sm text-muted">Für dieses Fach wurden bisher noch keine Lektionen eingetragen.</p>
            </div>
            <Link href="/" className="inline-flex bg-primary hover:bg-primary/95 text-white font-medium px-4 py-2 rounded-lg text-sm transition">
              Zurück zum Dashboard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {subject.lessons.map((lesson, index) => {
              const isCompleted = lesson.progress.some(p => p.status === "completed")
              
              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className="group bg-surface border border-border hover:border-border/80 rounded-xl p-5 flex items-center justify-between gap-6 transition hover:shadow-sm"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Index / Icon Indicator */}
                    <div className="w-10 h-10 rounded-lg bg-background border border-border group-hover:border-primary/20 flex items-center justify-center shrink-0 text-sm font-semibold text-muted group-hover:text-primary transition-colors">
                      {isCompleted ? (
                        <i className="ph-fill ph-check-circle text-success text-xl"></i>
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm md:text-base text-foreground group-hover:text-primary transition-colors truncate">
                          {lesson.title}
                        </span>
                        
                        {/* Type Badge */}
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                          lesson.type === "quiz" 
                            ? "bg-purple-500/10 border-purple-500/20 text-purple-400" 
                            : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                        }`}>
                          {lesson.type === "quiz" ? "Quiz" : "Lektion"}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted">
                        {lesson.type === "quiz" ? "Prüfe dein erlerntes Wissen" : "Leseartikel zur Vorbereitung"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button className="h-9 px-4 rounded-lg bg-background group-hover:bg-primary/10 border border-border group-hover:border-primary/20 text-xs font-semibold text-foreground group-hover:text-primary transition-all flex items-center gap-1.5">
                      {isCompleted ? "Wiederholen" : "Starten"}
                      <i className="ph ph-arrow-right text-xs"></i>
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
