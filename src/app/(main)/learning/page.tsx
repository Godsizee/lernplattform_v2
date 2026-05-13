import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { initUserTenant } from "@/lib/tenant"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function LearningPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id

  // Find the master curriculum owner (Admin user)
  const admin = await prisma.user.findFirst({
    where: { role: "admin" }
  })
  const curriculumUserId = admin ? admin.id : userId

  // Fetch subjects with lessons and user progress
  const subjects = await prisma.subject.findMany({
    where: { userId: curriculumUserId },
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

  // Calculate subject completion stats
  const subjectsWithStats = subjects.map(subject => {
    const total = subject.lessons.length
    const completed = subject.lessons.filter(lesson => 
      lesson.progress.some(p => p.status === "completed")
    ).length
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      ...subject,
      totalLessons: total,
      completedLessons: completed,
      percent
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
        <span className="text-foreground font-medium">Lern-Bereich</span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl font-black tracking-tight">Dein Lern-Bereich</h1>
        <p className="text-sm text-muted mt-1">
          Wähle ein Fach aus, um den Lehrplan zu laden, oder springe direkt in eine ausstehende Lektion.
        </p>
      </div>

      {/* Grid listing the Subjects with their nested syllabus preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {subjectsWithStats.map((subject) => (
          <div 
            key={subject.id}
            className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition duration-300 flex flex-col space-y-6"
          >
            {/* Header: Icon, title, progress bar */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 animate-fade-in"
                  style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                >
                  <i className={`ph ${subject.icon || "ph-book"} text-3xl`}></i>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground">{subject.title}</h2>
                  <p className="text-xs text-muted mt-0.5">
                    {subject.completedLessons} von {subject.totalLessons} Lektionen beendet
                  </p>
                </div>
              </div>
              
              <Link
                href={`/subjects/${subject.id}`}
                className="px-4 py-2 bg-background hover:bg-border/40 border border-border rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                Syllabus öffnen <i className="ph ph-arrow-square-out text-sm"></i>
              </Link>
            </div>

            {/* Subject Progress bar */}
            <div className="space-y-1.5 bg-background/40 border border-border/40 rounded-2xl p-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted">Lernfortschritt</span>
                <span style={{ color: subject.color }}>{subject.percent}%</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/40">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${subject.percent}%`,
                    backgroundColor: subject.color
                  }}
                ></div>
              </div>
            </div>

            {/* Syllabus inline preview - lists up to 4 lessons directly */}
            <div className="space-y-2 flex-1">
              <h3 className="text-xs font-extrabold text-muted uppercase tracking-wider mb-3">Lektions-Übersicht</h3>
              <div className="divide-y divide-border/40">
                {subject.lessons.slice(0, 4).map((lesson) => {
                  const lessonCompleted = lesson.progress.some(p => p.status === "completed")
                  return (
                    <Link 
                      key={lesson.id}
                      href={`/lessons/${lesson.id}`}
                      className="flex items-center justify-between py-3.5 hover:text-primary transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-4">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs border ${
                          lessonCompleted 
                            ? "bg-success/15 border-success/30 text-success" 
                            : "bg-background border-border text-muted group-hover:border-primary group-hover:text-primary"
                        }`}>
                          {lessonCompleted ? (
                            <i className="ph ph-check text-xs"></i>
                          ) : (
                            lesson.sortOrder
                          )}
                        </span>
                        <span className="text-sm font-semibold truncate leading-tight">
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-background border border-border text-muted">
                          {lesson.type === "quiz" ? "Quiz" : "Artikel"}
                        </span>
                        <i className="ph ph-caret-right text-xs text-muted group-hover:text-primary transition-colors"></i>
                      </div>
                    </Link>
                  )
                })}

                {subject.lessons.length > 4 && (
                  <Link 
                    href={`/subjects/${subject.id}`}
                    className="block text-center pt-4 text-xs font-bold text-primary hover:underline transition"
                  >
                    + {subject.lessons.length - 4} weitere Lektionen ansehen
                  </Link>
                )}

                {subject.lessons.length === 0 && (
                  <p className="text-xs text-muted text-center py-6">
                    In diesem Fach sind noch keine Lektionen veröffentlicht.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
