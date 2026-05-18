import { auth } from "@/lib/auth"
import prisma from "@/db/client"
import { initUserTenant } from "@/lib/tenant"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id

  // Log action in AuditLog
  await prisma.auditLog.create({
    data: {
      userId,
      action: "VIEW_DASHBOARD",
      details: "Benutzer-Dashboard geöffnet"
    }
  }).catch(console.error)

  // Fetch user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true }
  })

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

  // Fetch bookmarked lessons
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      lesson: {
        include: {
          subject: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  // Calculate overall stats
  let totalLessons = 0
  let completedLessons = 0

  const subjectsWithStats = subjects.map(subject => {
    const total = subject.lessons.length
    const completed = subject.lessons.filter(lesson => 
      lesson.progress.some(p => p.status === "completed")
    ).length

    totalLessons += total
    completedLessons += completed

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      ...subject,
      totalLessons: total,
      completedLessons: completed,
      percent
    }
  })

  const overallPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/10 to-background border border-border rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Schön dich hier zu haben, <span className="text-primary">{user?.name || session.user.name}</span>!
          </h1>
          <p className="text-muted text-base max-w-xl">
            Bereit für deine tägliche Dosis Wissen? Setze deine Lernreise fort und vertiefe deine Kenntnisse.
          </p>
        </div>
        
        {/* Overall Progress Badge */}
        <div className="flex items-center gap-6 z-10">
          <div className="bg-surface/80 border border-border/80 backdrop-blur-sm px-6 py-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <i className="ph-bold ph-graduation-cap text-2xl"></i>
            </div>
            <div>
              <div className="text-2xl font-bold">{overallPercent}%</div>
              <div className="text-xs text-muted">Gesamtfortschritt</div>
            </div>
          </div>
        </div>

        {/* Decorative background blur blobs */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <i className="ph ph-books text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <div className="text-sm text-muted">Aktive Fächer</div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
            <i className="ph ph-check-square text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">{completedLessons} / {totalLessons}</div>
            <div className="text-sm text-muted">Lektionen abgeschlossen</div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5 sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
            <i className="ph ph-trend-up text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-bold">{overallPercent}%</div>
            <div className="text-sm text-muted">Fortschrittsquote</div>
          </div>
        </div>
      </div>

      {/* Layout Grid: Left column for Subjects, Right column for Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Fächer Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight">Deine Lernfächer</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {subjectsWithStats.map((subject) => (
              <Link 
                key={subject.id} 
                href={`/subjects/${subject.id}`}
                className="group bg-surface border border-border hover:border-border/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col h-[220px]"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                  >
                    <i className={`ph ${subject.icon} text-2xl`}></i>
                  </div>
                  <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background border border-border text-muted">
                    {subject.totalLessons} {subject.totalLessons === 1 ? 'Lektion' : 'Lektionen'}
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex-1 space-y-1">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-muted">
                    {subject.completedLessons} von {subject.totalLessons} Lektionen gelernt
                  </p>
                </div>

                {/* Progress Bar & Continue button */}
                <div className="mt-4 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-muted">Fortschritt</span>
                      <span className="font-bold" style={{ color: subject.color }}>{subject.percent}%</span>
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
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Bookmarks Widget */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            Lesezeichen 
            {bookmarks.length > 0 && (
              <span className="text-xs font-bold bg-warning/15 text-warning px-2.5 py-0.5 rounded-full border border-warning/10">
                {bookmarks.length}
              </span>
            )}
          </h2>

          <div className="bg-surface border border-border rounded-3xl p-6 space-y-4 shadow-sm">
            {bookmarks.length > 0 ? (
              <div className="divide-y divide-border/40 max-h-[440px] overflow-y-auto pr-1">
                {bookmarks.map((b) => (
                  <Link 
                    key={b.lessonId}
                    href={`/lessons/${b.lessonId}`}
                    className="flex items-center gap-3.5 py-3 hover:text-primary group transition-colors block"
                  >
                    <div className="w-9 h-9 rounded-xl bg-warning/10 text-warning flex items-center justify-center shrink-0">
                      <i className="ph-fill ph-bookmark text-base"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {b.lesson.title}
                      </h4>
                      <p className="text-[10px] font-semibold text-muted truncate mt-0.5" style={{ color: b.lesson.subject.color }}>
                        {b.lesson.subject.title}
                      </p>
                    </div>
                    <i className="ph ph-caret-right text-xs text-muted group-hover:text-primary group-hover:translate-x-1 transition-all"></i>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-background border border-border text-muted flex items-center justify-center mx-auto">
                  <i className="ph ph-bookmark text-xl"></i>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-foreground">Noch keine Lesezeichen</p>
                  <p className="text-[11px] text-muted leading-relaxed max-w-[200px] mx-auto">
                    Klicke in einer Lektion auf das Bookmark-Symbol, um sie hier zu sichern.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
