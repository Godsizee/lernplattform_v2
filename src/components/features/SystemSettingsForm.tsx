"use client"

import { useState } from "react"
import { updateGlobalAnnouncement, updateSecuritySettings } from "@/lib/actions/admin"

interface SystemSettingsFormProps {
  initialAnnouncement: {
    message: string
    type: "info" | "warning" | "success"
    isActive: boolean
  }
  initialSecurity: {
    maxLoginAttempts: number
    sessionDurationDays: number
  }
}

export function SystemSettingsForm({ initialAnnouncement, initialSecurity }: SystemSettingsFormProps) {
  // Announcement states
  const [message, setMessage] = useState(initialAnnouncement.message)
  const [type, setType] = useState<"info" | "warning" | "success">(initialAnnouncement.type)
  const [isActive, setIsActive] = useState(initialAnnouncement.isActive)
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)
  const [announcementMsg, setAnnouncementMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Security states
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(initialSecurity.maxLoginAttempts)
  const [sessionDurationDays, setSessionDurationDays] = useState(initialSecurity.sessionDurationDays)
  const [isSavingSecurity, setIsSavingSecurity] = useState(false)
  const [securityMsg, setSecurityMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Backup states
  const [isBackupPreparing, setIsBackupPreparing] = useState(false)

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnnouncementMsg(null)
    setIsSavingAnnouncement(true)

    try {
      await updateGlobalAnnouncement({ message, type, isActive })
      setAnnouncementMsg({ type: "success", text: "Ankündigungs-Banner erfolgreich gespeichert." })
    } catch (err: any) {
      setAnnouncementMsg({ type: "error", text: err.message || "Fehler beim Speichern der Ankündigung." })
    } finally {
      setIsSavingAnnouncement(false)
    }
  }

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSecurityMsg(null)
    setIsSavingSecurity(true)

    try {
      await updateSecuritySettings({ maxLoginAttempts, sessionDurationDays })
      setSecurityMsg({ type: "success", text: "Sicherheitsparameter erfolgreich gespeichert." })
    } catch (err: any) {
      setSecurityMsg({ type: "error", text: err.message || "Fehler beim Speichern der Sicherheits-Einstellunen." })
    } finally {
      setIsSavingSecurity(false)
    }
  }

  const handleBackupDownload = () => {
    setIsBackupPreparing(true)
    // Small timeout to simulate preparation and then trigger download
    setTimeout(() => {
      window.location.href = "/api/admin/system/backup"
      setIsBackupPreparing(false)
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Announcement Column */}
      <div className="lg:col-span-7 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <i className="ph ph-megaphone text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Globale System-Meldung</h2>
              <p className="text-xs text-muted">Schalte einen auffälligen Ankündigungs-Banner für Studenten im Dashboard.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAnnouncementSubmit} className="space-y-5">
          {announcementMsg && (
            <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
              announcementMsg.type === "success" 
                ? "bg-success/10 border-success/20 text-success" 
                : "bg-danger/10 border-danger/20 text-danger"
            }`}>
              <i className={`ph-fill ${announcementMsg.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
              <span>{announcementMsg.text}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-border bg-background text-primary focus:ring-primary focus:ring-1 cursor-pointer"
              />
              <span className="text-sm font-bold text-foreground">Ankündigungs-Banner aktivieren</span>
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase">Anzeige-Typ</label>
            <select
              disabled={!isActive}
              value={type}
              onChange={(e) => setType(e.target.value as "info" | "warning" | "success")}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="info">Information (Blau)</option>
              <option value="success">Erfolg / Erledigt (Grün)</option>
              <option value="warning">Warnung / Dringend (Gelb)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted uppercase">Nachricht</label>
            <textarea
              disabled={!isActive}
              required={isActive}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={200}
              placeholder="z.B. Wartungsarbeiten am Freitag ab 22 Uhr..."
              className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all resize-none leading-relaxed font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="text-[10px] text-muted text-right">
              {message.length} / 200 Zeichen
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              disabled={isSavingAnnouncement}
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSavingAnnouncement ? "Wird gespeichert..." : "Änderungen anwenden"} <i className="ph ph-floppy-disk text-sm"></i>
            </button>
          </div>
        </form>
      </div>

      {/* Security & Backup Column */}
      <div className="lg:col-span-5 space-y-8">
        {/* Security Parameters Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <i className="ph ph-shield-check text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Sicherheitsparameter</h2>
                <p className="text-xs text-muted">Definiere Grenzwerte und Login-Richtlinien.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSecuritySubmit} className="space-y-4">
            {securityMsg && (
              <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
                securityMsg.type === "success" 
                  ? "bg-success/10 border-success/20 text-success" 
                  : "bg-danger/10 border-danger/20 text-danger"
              }`}>
                <i className={`ph-fill ${securityMsg.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
                <span>{securityMsg.text}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Fehlgeschlagene Logins (Bruteforce-Schutz)</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={1}
                  max={20}
                  required
                  value={maxLoginAttempts}
                  onChange={(e) => setMaxLoginAttempts(parseInt(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl pl-4 pr-24 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
                />
                <span className="absolute right-4 text-xs font-bold text-muted pointer-events-none">Versuche</span>
              </div>
              <p className="text-[10px] text-muted">Maximale Loginversuche, bevor das IP-bezogene System Aktivitäten sperrt.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Maximale Sitzungsdauer (JWT Cookie)</label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min={1}
                  max={365}
                  required
                  value={sessionDurationDays}
                  onChange={(e) => setSessionDurationDays(parseInt(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl pl-4 pr-16 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
                />
                <span className="absolute right-4 text-xs font-bold text-muted pointer-events-none">Tage</span>
              </div>
              <p className="text-[10px] text-muted">Definiert das Cookie-Verfallsdatum der angemeldeten Benutzersitzungen.</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={isSavingSecurity}
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-primary/10 hover:bg-primary/15 text-primary font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSavingSecurity ? "Wird gespeichert..." : "Sicherheit speichern"} <i className="ph ph-shield text-sm"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Database Backup Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <i className="ph ph-database text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Datenbank & Backup</h2>
                <p className="text-xs text-muted">Archiviere den aktuellen Stand der Lernplattform.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-muted leading-relaxed">
              Erstelle und lade einen standardkonformen <strong className="text-foreground">SQL-Dump</strong> der MySQL-Datenbank herunter.
              Der Export enthält alle Tabellenstrukturen und Einträge inklusive Benutzer, Lektionen, Lernfortschritte und Logbucheinträge.
            </p>

            <button
              onClick={handleBackupDownload}
              disabled={isBackupPreparing}
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 hover:opacity-95 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-primary/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isBackupPreparing ? (
                <>
                  <i className="ph ph-spinner-gap ph-spin text-sm"></i> Backup wird generiert...
                </>
              ) : (
                <>
                  <i className="ph ph-download-simple text-sm"></i> SQL-Backup herunterladen
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
