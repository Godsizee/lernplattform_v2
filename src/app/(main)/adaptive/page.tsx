import { auth } from '@/lib/auth'
import prisma from '@/db/client'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  const userId = session.user.id

  const [lastSession, masteredCount, totalCount, nextExam] = await Promise.all([
    prisma.learningSession.findUnique({
      where: { userId },
      include: { lastNode: { select: { title: true } } },
    }),
    prisma.nodeMastery.count({ where: { userId } }),
    prisma.conceptNode.count({ where: { userId } }),
    prisma.exam.findFirst({
      where: { userId, examDate: { gte: new Date() } },
      orderBy: { examDate: 'asc' },
      select: { title: true, examDate: true },
    }),
  ])

  const daysUntilExam = nextExam
    ? (() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const exam = new Date(nextExam.examDate)
        exam.setHours(0, 0, 0, 0)
        return Math.round((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      })()
    : null

  const progressPercent = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0

  return (
    <main className="min-h-screen py-6 sm:py-10 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-8 sm:space-y-12 animate-fade-in select-none">
      {/* Hero Welcome Block with Custom HSL Gradient Banner */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5 sm:p-8 md:p-12 text-white shadow-2xl shadow-indigo-500/10 border border-indigo-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-indigo-50 backdrop-blur-md">
            🚀 Willkommen bei LumadIQ
          </span>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight break-words">
            Hallo, {session.user?.name ?? session.user?.email?.split('@')[0] ?? 'Lernender'}!
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-indigo-100 font-medium leading-relaxed max-w-2xl break-words">
            Bereit, dein Lernen auf das nächste Level zu heben? LumadIQ ist dein intelligenter, KI-gestützter Lernbegleiter. Wir verwandeln deine PDFs in lebendige, interaktive Lernwelten!
          </p>
          
          <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {totalCount === 0 ? (
              <Link
                href="/adaptive/upload"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-indigo-600 hover:bg-indigo-50 transition-all font-black rounded-xl sm:rounded-2xl text-xs sm:text-sm shadow-md hover:scale-[1.02] duration-200 cursor-pointer w-full sm:w-auto"
              >
                <i className="ph-bold ph-upload-simple text-sm sm:text-base"></i>
                <span>Erstes Dokument hochladen</span>
              </Link>
            ) : (
              <Link
                href="/adaptive/learn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-indigo-600 hover:bg-indigo-50 transition-all font-black rounded-xl sm:rounded-2xl text-xs sm:text-sm shadow-md hover:scale-[1.02] duration-200 cursor-pointer w-full sm:w-auto"
              >
                <i className="ph-bold ph-lightning text-sm sm:text-base"></i>
                <span>{lastSession?.lastNode ? 'Weiterlernen' : 'Lern-Session starten'}</span>
              </Link>
            )}
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white transition-all font-bold rounded-xl sm:rounded-2xl text-xs sm:text-sm border border-white/10 cursor-pointer w-full sm:w-auto"
            >
              <span>Wie funktioniert das?</span>
              <i className="ph ph-arrow-down text-sm sm:text-base"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Real-time Student Learning Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Progress Card */}
        <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-extrabold text-muted uppercase tracking-wider">Gesamtfortschritt</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <i className="ph-fill ph-check-circle text-lg"></i>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-foreground">{masteredCount}</span>
              <span className="text-xs sm:text-sm text-muted">/ {totalCount} Konzepte</span>
            </div>
            {totalCount > 0 ? (
              <div className="mt-3 space-y-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-border dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                    role="progressbar"
                    aria-valuenow={masteredCount}
                    aria-valuemax={totalCount}
                  />
                </div>
                <div className="text-[9px] sm:text-[10px] text-muted font-bold">{progressPercent}% aller Konzepte gemeistert!</div>
              </div>
            ) : (
              <p className="text-xs text-muted mt-2">Lade Lernmaterial hoch, um deinen Fortschritt zu sehen.</p>
            )}
          </div>
        </div>

        {/* Last Lesson Card */}
        <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-extrabold text-muted uppercase tracking-wider">Zuletzt gelernt</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <i className="ph-fill ph-clock text-lg"></i>
            </div>
          </div>
          <div>
            {lastSession?.lastNode ? (
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black text-foreground line-clamp-1">{lastSession.lastNode.title}</h4>
                <p className="text-[11px] sm:text-xs text-muted">Hier hast du deine letzte Session beendet.</p>
                <div className="pt-2">
                  <Link href="/adaptive/learn" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                    <span>Jetzt fortsetzen</span> <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-muted">Noch keine Session</h4>
                <p className="text-[11px] sm:text-xs text-muted">Starte deine erste adaptive Lerneinheit, um loszulegen.</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Exam Card */}
        <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-extrabold text-muted uppercase tracking-wider">Nächste Klausur</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <i className="ph-fill ph-calendar text-lg"></i>
            </div>
          </div>
          <div>
            {nextExam && daysUntilExam !== null ? (
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black text-foreground line-clamp-1">{nextExam.title}</h4>
                <p className="text-[11px] sm:text-xs text-muted">
                  Termin: {new Date(nextExam.examDate).toLocaleDateString('de-DE')}
                </p>
                <div className="pt-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-extrabold ${
                    daysUntilExam <= 3 ? 'bg-danger/10 text-danger' : 'bg-purple-500/10 text-purple-500'
                  }`}>
                    {daysUntilExam <= 0 ? 'Heute ist Klausur!' : `Noch ${daysUntilExam} Tag${daysUntilExam === 1 ? '' : 'e'}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-muted">Keine anstehenden Klausuren</h4>
                <p className="text-[11px] sm:text-xs text-muted">Trage eine Klausur ein, damit wir deinen Lernplan anpassen können.</p>
                <div className="pt-2">
                  <Link href="/adaptive/exams" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                    <span>Klausur eintragen</span> <i className="ph ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Guide: What does LumadIQ do? (Was macht es alles?) */}
      <section className="space-y-4 sm:space-y-6">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">Was macht LumadIQ alles? 🧠</h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl font-medium">Dein Werkzeugkasten für stressfreies, schnelles und cleveres Lernen.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <i className="ph-bold ph-sparkles text-xl"></i>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base">Automatische Konzept-Extraktion</h3>
            <p className="text-xs text-muted leading-relaxed font-medium">
              Kein ewiges Zusammenfassen mehr! Unsere schlaue KI liest deine Scripte und PDFs durch und filtert automatisch die wichtigsten Fachbegriffe und Definitionen für dich heraus.
            </p>
          </div>

          <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-5 hover:border-warning/30 hover:shadow-md transition-all duration-300 space-y-3 sm:space-y-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
              <i className="ph-bold ph-tree-structure text-xl"></i>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base">Interaktiver Wissensgraph</h3>
            <p className="text-xs text-muted leading-relaxed font-medium">
              Sehe den Wald vor lauter Bäumen wieder! LumadIQ verknüpft alle Konzepte in einem visuellen Diagramm. So erkennst du sofort, welches Thema auf welchem aufbaut.
            </p>
          </div>

          <div className="bg-surface border border-border/80 rounded-xl sm:rounded-2xl p-5 hover:border-success/30 hover:shadow-md transition-all duration-300 space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <i className="ph-bold ph-list-checks text-xl"></i>
            </div>
            <h3 className="font-extrabold text-sm sm:text-base">Lernfragen & Quizzes</h3>
            <p className="text-xs text-muted leading-relaxed font-medium">
              Echtes Verständnis statt nur Auswendiglernen! Zu jedem Konzept generiert LumadIQ maßgeschneiderte Fragen, Rechenaufgaben oder Erklärungs-Quizzes, um dein Wissen zu prüfen.
            </p>
          </div>
        </div>
      </section>

      {/* Guide: How does it work? (Wie funktioniert es?) */}
      <section id="how-it-works" className="space-y-4 sm:space-y-6 pt-4 border-t border-border/40">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">Wie funktioniert es? 🗺️</h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl font-medium">In nur vier einfachen Schritten zu besseren Noten.</p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-surface/50 border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 relative space-y-3.5">
            <span className="absolute top-4 right-4 text-xs font-black text-primary/35">01</span>
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              📂
            </div>
            <h4 className="font-bold text-xs sm:text-sm">PDF hochladen</h4>
            <p className="text-[11px] sm:text-xs text-muted font-semibold leading-relaxed">
              Gehe auf <Link href="/adaptive/upload" className="text-primary hover:underline">Dokumente</Link> und lade dein Skript, deine Mitschriften oder Folien hoch.
            </p>
          </div>

          <div className="bg-surface/50 border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 relative space-y-3.5">
            <span className="absolute top-4 right-4 text-xs font-black text-primary/35">02</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <h4 className="font-bold text-xs sm:text-sm">KI analysieren lassen</h4>
            <p className="text-[11px] sm:text-xs text-muted font-semibold leading-relaxed">
              Unsere KI liest das Dokument und spaltet es in kleine, verständliche Lerneinheiten (Konzepte) auf.
            </p>
          </div>

          <div className="bg-surface/50 border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 relative space-y-3.5">
            <span className="absolute top-4 right-4 text-xs font-black text-primary/35">03</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm">
              🎯
            </div>
            <h4 className="font-bold text-xs sm:text-sm">Adaptiv lernen</h4>
            <p className="text-[11px] sm:text-xs text-muted font-semibold leading-relaxed">
              Die App merkt sich deine Stärken und Schwächen. Schwierige Themen werden häufiger abgefragt.
            </p>
          </div>

          <div className="bg-surface/50 border border-border/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 relative space-y-3.5">
            <span className="absolute top-4 right-4 text-xs font-black text-primary/35">04</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm">
              🏆
            </div>
            <h4 className="font-bold text-xs sm:text-sm">Klausur rocken</h4>
            <p className="text-[11px] sm:text-xs text-muted font-semibold leading-relaxed">
              Sehe im <Link href="/adaptive/graph" className="text-primary hover:underline">Wissensgraphen</Link>, wie sich deine Lücken schließen, und gehe vollkommen vorbereitet in die Prüfung!
            </p>
          </div>
        </div>
      </section>

      {/* Final Student Call-to-Action */}
      <section className="bg-surface border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
          <h3 className="font-black text-lg sm:text-xl">Lass uns dein Wissen aufbauen!</h3>
          <p className="text-xs text-muted font-medium max-w-md leading-relaxed">
            Egal ob Mathe, Deutsch, Programmierung oder Wirtschaft – LumadIQ stellt sich ganz flexibel auf deine Fächer und dein eigenes Lerntempo ein.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/adaptive/upload"
            className="px-5 py-3 rounded-xl sm:rounded-2xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all shadow-lg shadow-primary/10 cursor-pointer text-center"
          >
            Jetzt starten
          </Link>
          <Link
            href="/adaptive/learn"
            className="px-5 py-3 rounded-xl sm:rounded-2xl border border-border hover:bg-border/30 text-xs font-bold transition-all cursor-pointer text-foreground text-center"
          >
            Lern-Session öffnen
          </Link>
        </div>
      </section>
    </main>
  )
}
