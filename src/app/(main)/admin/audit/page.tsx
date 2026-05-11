import prisma from "@/db/client"
import Link from "next/link"

interface PageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    userId?: string
  }>
}

function formatAuditAction(action: string) {
  const mapping: Record<string, { label: string; icon: string; color: string }> = {
    "VIEW_DASHBOARD": { label: "Dashboard geöffnet", icon: "ph-squares-four", color: "text-blue-500 bg-blue-500/10 border border-blue-500/10" },
    "VIEW_LESSON": { label: "Lektion gelesen", icon: "ph-book-open", color: "text-indigo-500 bg-indigo-500/10 border border-indigo-500/10" },
    "COMPLETED_LESSON": { label: "Lektion erfolgreich beendet", icon: "ph-check-circle", color: "text-success bg-success/10 border border-success/20" },
    "COMPLETED_QUIZ": { label: "Quiz erfolgreich bestanden", icon: "ph-trophy", color: "text-amber-500 bg-amber-500/10 border border-amber-500/10" },
    "LOGIN": { label: "Erfolgreich angemeldet", icon: "ph-sign-in", color: "text-emerald-500 bg-emerald-500/10 border border-emerald-500/10" },
    "LOGOUT": { label: "Sitzung beendet", icon: "ph-sign-out", color: "text-gray-500 bg-gray-500/10 border border-gray-500/10" },
    "FAILED_LOGIN": { label: "Fehlgeschlagener Login-Versuch", icon: "ph-warning-octagon", color: "text-danger bg-danger/10 border border-danger/20" },
    "UPDATE_BIO": { label: "Biografie geändert", icon: "ph-pencil-line", color: "text-purple-500 bg-purple-500/10 border border-purple-500/10" },
    "CHANGE_PASSWORD": { label: "Kennwort geändert", icon: "ph-key", color: "text-purple-500 bg-purple-500/10 border border-purple-500/10" },
    "UPDATE_NAME": { label: "Anzeigenamen aktualisiert", icon: "ph-user-gear", color: "text-purple-500 bg-purple-500/10 border border-purple-500/10" },
    "TOGGLE_BOOKMARK": { label: "Lesezeichen umgeschaltet", icon: "ph-bookmark", color: "text-sky-500 bg-sky-500/10 border border-sky-500/10" },
    "SAVE_NOTE": { label: "Notiz gespeichert", icon: "ph-note-pencil", color: "text-teal-500 bg-teal-500/10 border border-teal-500/10" },
  }

  if (mapping[action]) {
    return mapping[action]
  }

  // Matcher for Admin Actions
  if (action.includes("Ankündigung") || action.includes("Globale Ankündigung")) {
    return { label: "Globale Ankündigung geändert", icon: "ph-megaphone", color: "text-pink-500 bg-pink-500/10 border border-pink-500/10" }
  }
  if (action.includes("Rolle geändert")) {
    return { label: "Benutzerrolle geändert", icon: "ph-user-gear", color: "text-violet-500 bg-violet-500/10 border border-violet-500/10" }
  }
  if (action.includes("Benutzer gelöscht")) {
    return { label: "Benutzer gelöscht", icon: "ph-trash", color: "text-danger bg-danger/10 border border-danger/20" }
  }
  if (action.includes("Sitzung von Benutzer ID") || action.includes("übernommen")) {
    return { label: "Sitzung übernommen (Impersonation)", icon: "ph-mask-happy", color: "text-amber-500 bg-amber-500/10 border border-amber-500/10" }
  }
  if (action.includes("Sicherheitseinstellungen aktualisiert")) {
    return { label: "Sicherheitsparameter aktualisiert", icon: "ph-shield-check", color: "text-teal-500 bg-teal-500/10 border border-teal-500/10" }
  }
  if (action.includes("Backup") || action.includes("Datenbank-Backup")) {
    return { label: "Datenbank-Backup heruntergeladen", icon: "ph-database", color: "text-blue-500 bg-blue-500/10 border border-blue-500/10" }
  }

  return { label: action, icon: "ph-info", color: "text-muted bg-border/20 border border-border/10" }
}

export default async function AdminAuditPage({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params.q || ""
  const type = params.type || "all"
  const selectedUserId = params.userId || "all"

  // Fetch all logs
  const allLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  })

  // Fetch all users to populate the user filter dropdown
  const dbUsers = await prisma.user.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true }
  })

  // Filter in-memory for premium search
  const filtered = allLogs.filter((log) => {
    // 1. Search filter
    if (q) {
      const query = q.toLowerCase()
      const formatted = formatAuditAction(log.action).label.toLowerCase()
      const userName = (log.user?.name || "System").toLowerCase()
      const userEmail = (log.user?.email || "").toLowerCase()
      const details = (log.details || "").toLowerCase()
      const rawAction = log.action.toLowerCase()

      const matches = formatted.includes(query) || 
                      userName.includes(query) || 
                      userEmail.includes(query) || 
                      details.includes(query) ||
                      rawAction.includes(query)
      if (!matches) return false
    }

    // 2. Type category filter
    if (type !== "all") {
      const act = log.action
      if (type === "auth") {
        return act === "LOGIN" || act === "LOGOUT" || act === "FAILED_LOGIN" || act === "CHANGE_PASSWORD" || act.includes("Sicherheit")
      }
      if (type === "learning") {
        return act === "VIEW_LESSON" || act === "COMPLETED_LESSON" || act === "COMPLETED_QUIZ" || act === "TOGGLE_BOOKMARK" || act === "SAVE_NOTE"
      }
      if (type === "admin") {
        return !["VIEW_DASHBOARD", "VIEW_LESSON", "COMPLETED_LESSON", "COMPLETED_QUIZ", "LOGIN", "LOGOUT", "FAILED_LOGIN", "UPDATE_BIO", "CHANGE_PASSWORD", "UPDATE_NAME", "TOGGLE_BOOKMARK", "SAVE_NOTE"].includes(act)
      }
    }

    // 3. User Filter
    if (selectedUserId !== "all") {
      if (log.userId !== selectedUserId) return false
    }

    return true
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
        <span className="text-foreground font-medium">System-Protokoll</span>
      </nav>

      {/* Header */}
      <div className="pb-4 border-b border-border/80">
        <h1 className="text-3xl font-black tracking-tight">System-Audit</h1>
        <p className="text-sm text-muted mt-1">Überwache alle administrativen Vorgänge, Passwortänderungen, Inhaltserstellungen und Benutzersperren.</p>
      </div>

      {/* Search and Filters */}
      <form method="GET" className="flex flex-col xl:flex-row gap-4 items-center justify-between bg-surface border border-border p-4 rounded-3xl shadow-sm">
        <div className="relative w-full xl:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <i className="ph ph-magnifying-glass text-lg"></i>
          </span>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Protokolle filtern..."
            className="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto shrink-0">
          {/* User Filter Dropdown */}
          <select
            name="userId"
            defaultValue={selectedUserId}
            className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer w-full sm:w-64"
          >
            <option value="all">Alle Benutzer</option>
            {dbUsers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {/* Activity Category Dropdown */}
          <select
            name="type"
            defaultValue={type}
            className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer w-full sm:w-48"
          >
            <option value="all">Alle Aktivitäten</option>
            <option value="auth">Anmeldungen / Sicherheit</option>
            <option value="learning">Lernaktivitäten (Lektionen, Quizzes)</option>
            <option value="admin">Administrative Aktionen</option>
          </select>

          <button
            type="submit"
            className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-2xl transition shadow-md shadow-primary/10 cursor-pointer w-full sm:w-auto"
          >
            Filtern
          </button>
        </div>
      </form>

      {/* Audit Log Table */}
      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs font-bold text-muted uppercase">
                <th className="p-4 md:p-5">Zeitstempel</th>
                <th className="p-4 md:p-5">Aktion / Vorgang</th>
                <th className="p-4 md:p-5">Ausführender Benutzer</th>
                <th className="p-4 md:p-5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs md:text-sm">
              {filtered.slice(0, 200).map((log) => {
                const dateString = new Date(log.createdAt).toLocaleString("de-DE", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                })

                const actionStyle = formatAuditAction(log.action)

                return (
                  <tr key={log.id} className="hover:bg-background/20 transition duration-150">
                    <td className="p-4 md:p-5 font-mono text-muted text-xs leading-none shrink-0 min-w-[150px]">
                      {dateString}
                    </td>
                    <td className="p-4 md:p-5 font-bold">
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shrink-0 ${actionStyle.color}`}>
                          <i className={`ph ${actionStyle.icon} text-sm`}></i>
                          <span>{actionStyle.label}</span>
                        </span>
                      </div>
                    </td>
                    <td className="p-4 md:p-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground/80">{log.user?.name || "System"}</span>
                        {log.user?.email && <span className="text-[10px] text-muted">{log.user.email}</span>}
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-muted font-mono text-xs max-w-[250px] truncate leading-snug" title={log.details || ""}>
                      {log.details || "-"}
                    </td>
                  </tr>
                )
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted text-xs font-bold">
                    Keine Logeinträge gefunden, die den Suchkriterien entsprechen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
