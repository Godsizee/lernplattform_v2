import prisma from "@/db/client"
import Link from "next/link"

function formatAuditAction(action: string) {
  const mapping: Record<string, { label: string; icon: string; color: string }> = {
    "VIEW_DASHBOARD": { label: "Dashboard geöffnet", icon: "ph-squares-four", color: "text-blue-500 bg-blue-500/10 border-blue-500/10" },
    "VIEW_LESSON": { label: "Lektion gelesen", icon: "ph-book-open", color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/10" },
    "COMPLETED_LESSON": { label: "Lektion erfolgreich beendet", icon: "ph-check-circle", color: "text-success bg-success/10 border-success/20" },
    "COMPLETED_QUIZ": { label: "Quiz erfolgreich bestanden", icon: "ph-trophy", color: "text-amber-500 bg-amber-500/10 border-amber-500/10" },
    "LOGIN": { label: "Erfolgreich angemeldet", icon: "ph-sign-in", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/10" },
    "LOGOUT": { label: "Sitzung beendet", icon: "ph-sign-out", color: "text-gray-500 bg-gray-500/10 border-gray-500/10" },
    "FAILED_LOGIN": { label: "Fehlgeschlagener Login", icon: "ph-warning-octagon", color: "text-danger bg-danger/10 border-danger/20" },
    "UPDATE_BIO": { label: "Biografie geändert", icon: "ph-pencil-line", color: "text-purple-500 bg-purple-500/10 border-purple-500/10" },
    "CHANGE_PASSWORD": { label: "Kennwort geändert", icon: "ph-key", color: "text-purple-500 bg-purple-500/10 border-purple-500/10" },
    "UPDATE_NAME": { label: "Anzeigenamen aktualisiert", icon: "ph-user-gear", color: "text-purple-500 bg-purple-500/10 border-purple-500/10" },
    "TOGGLE_BOOKMARK": { label: "Lesezeichen umgeschaltet", icon: "ph-bookmark", color: "text-sky-500 bg-sky-500/10 border-sky-500/10" },
    "SAVE_NOTE": { label: "Notiz gespeichert", icon: "ph-note-pencil", color: "text-teal-500 bg-teal-500/10 border-teal-500/10" },
  }

  if (mapping[action]) {
    return mapping[action]
  }

  if (action.includes("Ankündigung") || action.includes("Globale Ankündigung")) {
    return { label: "Ankündigung geändert", icon: "ph-megaphone", color: "text-pink-500 bg-pink-500/10" }
  }
  if (action.includes("Rolle geändert")) {
    return { label: "Benutzerrolle geändert", icon: "ph-user-gear", color: "text-violet-500 bg-violet-500/10" }
  }
  if (action.includes("Benutzer gelöscht")) {
    return { label: "Benutzer gelöscht", icon: "ph-trash", color: "text-danger bg-danger/10" }
  }
  if (action.includes("Sitzung von Benutzer ID") || action.includes("übernommen")) {
    return { label: "Sitzung übernommen", icon: "ph-mask-happy", color: "text-amber-500 bg-amber-500/10" }
  }
  if (action.includes("Sicherheitseinstellungen")) {
    return { label: "Sicherheit geändert", icon: "ph-shield-check", color: "text-teal-500 bg-teal-500/10" }
  }
  if (action.includes("Backup") || action.includes("Datenbank-Backup")) {
    return { label: "Backup heruntergeladen", icon: "ph-database", color: "text-blue-500 bg-blue-500/10" }
  }

  return { label: action, icon: "ph-info", color: "text-muted bg-border/20" }
}

export default async function AdminCockpitPage() {
  // Fetch overview statistics
  const [userCount, subjectCount, lessonCount, logs] = await Promise.all([
    prisma.user.count(),
    prisma.subject.count(),
    prisma.lesson.count(),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    }).catch(() => []) // Fallback in case table doesn't have logs yet
  ])

  // Fetch subject-wise curriculum overview to display list of subjects
  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: { lessons: true }
      }
    }
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin-Cockpit</h1>
          <p className="text-sm text-muted mt-1">Verwalte die Lernplattform, bearbeite Inhalte und überprüfe die Systemaktivität.</p>
        </div>
        <div className="flex gap-2.5 shrink-0 w-full sm:w-auto">
          <Link 
            href="/admin/settings" 
            className="w-1/2 sm:w-auto justify-center px-4 py-2.5 bg-surface hover:bg-surface/80 border border-border text-foreground text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <i className="ph ph-gear text-sm"></i> Systemeinstellungen
          </Link>
          <Link 
            href="/admin/editor" 
            className="w-1/2 sm:w-auto justify-center px-4 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-primary/10 flex items-center gap-1.5 cursor-pointer"
          >
            <i className="ph ph-plus-circle text-sm"></i> Neue Lektion
          </Link>
        </div>
      </div>

      {/* Clickable Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          href="/admin/users" 
          className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
          title="Benutzerverwaltung öffnen"
        >
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
            <i className="ph ph-users text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-extrabold">{userCount}</div>
            <div className="text-xs text-muted font-bold uppercase tracking-wide">Benutzer verwalten</div>
          </div>
        </Link>

        <Link 
          href="/admin/content" 
          className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
          title="Inhaltsverwaltung öffnen"
        >
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
            <i className="ph ph-books text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-extrabold">{subjectCount}</div>
            <div className="text-xs text-muted font-bold uppercase tracking-wide">Fächer verwalten</div>
          </div>
        </Link>

        <Link 
          href="/admin/content" 
          className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
          title="Lektionen verwalten"
        >
          <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
            <i className="ph ph-article text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-extrabold">{lessonCount}</div>
            <div className="text-xs text-muted font-bold uppercase tracking-wide">Lektionen verwalten</div>
          </div>
        </Link>

        <Link 
          href="/admin/audit" 
          className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
          title="Systemprotokoll öffnen"
        >
          <div className="w-12 h-12 bg-warning/10 text-warning rounded-xl flex items-center justify-center shrink-0 group-hover:bg-warning/20 transition-colors">
            <i className="ph ph-activity text-2xl"></i>
          </div>
          <div>
            <div className="text-2xl font-extrabold">{logs.length}</div>
            <div className="text-xs text-muted font-bold uppercase tracking-wide">Protokolle öffnen</div>
          </div>
        </Link>
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subjects & Taxonomy Management */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/60 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Fächerverwaltung</h2>
              <p className="text-xs text-muted">Aktive Taxonomien und zugeordnete Lektionen.</p>
            </div>
            <Link 
              href="/admin/content" 
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Inhalte bearbeiten <i className="ph ph-caret-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <div 
                key={subject.id} 
                className="p-4 border border-border rounded-2xl bg-background/50 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-xl"
                    style={{ backgroundColor: `${subject.color}15`, color: subject.color }}
                  >
                    <i className={`ph ${subject.icon}`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-foreground truncate">{subject.title}</h3>
                    <p className="text-xs text-muted font-medium">{subject._count.lessons} Lektionen</p>
                  </div>
                </div>
                <Link 
                  href={`/subjects/${subject.id}`}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-border/30 transition shrink-0 cursor-pointer"
                  title="Fach-Lehrplan ansehen"
                >
                  <i className="ph ph-eye text-sm"></i>
                </Link>
              </div>
            ))}

            {subjects.length === 0 && (
              <p className="text-muted text-sm col-span-2 py-4 text-center">Bisher wurden keine Fächer angelegt.</p>
            )}
          </div>
        </div>

        {/* Audit Logs / Activity Panel */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/60 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">System-Protokoll</h2>
              <p className="text-xs text-muted">Kürzliche administrative und Benutzeraktivitäten.</p>
            </div>
            <Link 
              href="/admin/audit" 
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              Alle Logs <i className="ph ph-caret-right"></i>
            </Link>
          </div>

          <div className="space-y-4">
            {logs.map((log) => {
              const actionStyle = formatAuditAction(log.action)
              return (
                <div key={log.id} className="text-xs space-y-2 border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground truncate max-w-[130px]">{log.user?.name || "System"}</span>
                    <span className="text-[10px] text-muted font-medium">
                      {new Date(log.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 shrink-0 ${actionStyle.color}`}>
                      <i className={`ph ${actionStyle.icon} text-xs`}></i>
                      <span>{actionStyle.label}</span>
                    </span>
                  </div>
                </div>
              )
            })}

            {logs.length === 0 && (
              <div className="text-center py-6 text-muted text-xs">
                <i className="ph ph-info text-2xl mb-1.5 block"></i>
                Keine Protokolleinträge vorhanden.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
