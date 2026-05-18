"use client"

import { useState } from "react"
import { updateGlobalAnnouncement, updateSecuritySettings, updateAISettings, updateSidebarOrder } from "@/lib/actions/admin"

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
  initialAI: {
    anthropicApiKey: string
    geminiApiKey: string
  }
  initialSidebarOrder: {
    main: string[]
    lumadiq: string[]
  }
}

const ALL_SIDEBAR_ITEMS = {
  dashboard: { label: "Dashboard", icon: "ph-squares-four" },
  learning: { label: "Lern-Bereich", icon: "ph-books" },
  admin: { label: "Admin-Bereich", icon: "ph-shield-star" },
  intro: { label: "Einführung", icon: "ph-info" },
  docs: { label: "Dokumente", icon: "ph-upload-simple" },
  learn: { label: "Adaptiv Lernen", icon: "ph-lightning" },
  graph: { label: "Wissensgraph", icon: "ph-graph" },
  exams: { label: "Klausuren", icon: "ph-calendar-check" }
} as Record<string, { label: string; icon: string }>

export function SystemSettingsForm({ initialAnnouncement, initialSecurity, initialAI, initialSidebarOrder }: SystemSettingsFormProps) {
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

  // AI states
  const [anthropicApiKey, setAnthropicApiKey] = useState(initialAI?.anthropicApiKey || "")
  const [geminiApiKey, setGeminiApiKey] = useState(initialAI?.geminiApiKey || "")
  const [showAnthropic, setShowAnthropic] = useState(false)
  const [showGemini, setShowGemini] = useState(false)
  const [isSavingAI, setIsSavingAI] = useState(false)
  const [aiMsg, setAiMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Backup states
  const [isBackupPreparing, setIsBackupPreparing] = useState(false)

  // Sidebar order state
  const [mainOrder, setMainOrder] = useState<string[]>(initialSidebarOrder?.main || ["dashboard", "learning", "admin"])
  const [lumadiqOrder, setLumadiqOrder] = useState<string[]>(initialSidebarOrder?.lumadiq || ["intro", "docs", "learn", "graph", "exams"])
  const [isSavingSidebar, setIsSavingSidebar] = useState(false)
  const [sidebarMsg, setSidebarMsg] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Drag and drop states
  const [draggedItem, setDraggedItem] = useState<{ id: string; listType: "main" | "lumadiq" } | null>(null)

  // Drag start handler
  const handleDragStart = (id: string, listType: "main" | "lumadiq") => {
    setDraggedItem({ id, listType })
  }

  // Drag over handler to allow dropping
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Drop handler
  const handleDrop = (targetId: string, listType: "main" | "lumadiq") => {
    if (!draggedItem || draggedItem.listType !== listType) return

    const list = listType === "main" ? [...mainOrder] : [...lumadiqOrder]
    const setList = listType === "main" ? setMainOrder : setLumadiqOrder

    const dragIndex = list.indexOf(draggedItem.id)
    const dropIndex = list.indexOf(targetId)

    if (dragIndex === -1 || dropIndex === -1 || dragIndex === dropIndex) return

    // Reorder array
    list.splice(dragIndex, 1)
    list.splice(dropIndex, 0, draggedItem.id)

    setList(list)
    setDraggedItem(null)
  }

  // Accessibility/Keyboard reorder buttons (Up/Down)
  const moveItem = (index: number, direction: "up" | "down", listType: "main" | "lumadiq") => {
    const list = listType === "main" ? [...mainOrder] : [...lumadiqOrder]
    const setList = listType === "main" ? setMainOrder : setLumadiqOrder

    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= list.length) return

    // Swap items
    const temp = list[index]
    list[index] = list[targetIndex]
    list[targetIndex] = temp

    setList(list)
  }

  // Submit handler
  const handleSidebarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSidebarMsg(null)
    setIsSavingSidebar(true)

    try {
      await updateSidebarOrder({ main: mainOrder, lumadiq: lumadiqOrder })
      setSidebarMsg({ type: "success", text: "Sidebar-Reihenfolge erfolgreich gespeichert! Die Änderungen sind nun für alle Benutzer wirksam." })
    } catch (err: any) {
      setSidebarMsg({ type: "error", text: err.message || "Fehler beim Speichern der Sidebar-Reihenfolge." })
    } finally {
      setIsSavingSidebar(false)
    }
  }

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

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAiMsg(null)
    setIsSavingAI(true)

    try {
      await updateAISettings({ anthropicApiKey, geminiApiKey })
      setAiMsg({ type: "success", text: "KI-Schnittstellen-Schlüssel erfolgreich gespeichert." })
    } catch (err: any) {
      setAiMsg({ type: "error", text: err.message || "Fehler beim Speichern der KI-Schlüssel." })
    } finally {
      setIsSavingAI(false)
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

        {/* KI-Schnittstellen (API Keys) Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-border/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <i className="ph ph-cpu text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">KI-Schnittstellen (API-Keys)</h2>
                <p className="text-xs text-muted">Verwalte die API-Keys für den intelligenten Lern-Assistenten.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAISubmit} className="space-y-4">
            {aiMsg && (
              <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
                aiMsg.type === "success" 
                  ? "bg-success/10 border-success/20 text-success" 
                  : "bg-danger/10 border-danger/20 text-danger"
              }`}>
                <i className={`ph-fill ${aiMsg.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
                <span>{aiMsg.text}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase flex items-center justify-between">
                <span>Anthropic Claude API Key</span>
                <span className="text-[10px] text-muted capitalize">Claude 3.5 Sonnet</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showAnthropic ? "text" : "password"}
                  value={anthropicApiKey}
                  onChange={(e) => setAnthropicApiKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-background border border-border rounded-xl pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowAnthropic(!showAnthropic)}
                  className="absolute right-4 text-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  <i className={`ph ${showAnthropic ? "ph-eye-closed" : "ph-eye"} text-base`}></i>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase flex items-center justify-between">
                <span>Google Gemini API Key</span>
                <span className="text-[10px] text-muted capitalize">Gemini 1.5/2.5 Flash</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showGemini ? "text" : "password"}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-background border border-border rounded-xl pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowGemini(!showGemini)}
                  className="absolute right-4 text-muted hover:text-foreground cursor-pointer transition-colors"
                >
                  <i className={`ph ${showGemini ? "ph-eye-closed" : "ph-eye"} text-base`}></i>
                </button>
              </div>
            </div>

            <div className="bg-background/40 border border-border/40 rounded-xl p-3 text-[10px] text-muted leading-relaxed">
              <i className="ph ph-info-circle text-xs text-primary mr-1 align-middle"></i>
              Wenn kein API-Key hinterlegt oder dieser ungültig ist, wechselt das System automatisch in den 
              kostenlosen <strong>Simulations-Modus (Mock Mode)</strong>. Dies schützt vor unnötigen Live-Kosten beim Testen.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={isSavingAI}
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-primary/10 disabled:opacity-50"
              >
                {isSavingAI ? "Wird gespeichert..." : "KI-Einstellungen speichern"} <i className="ph ph-cpu text-sm"></i>
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

      {/* Sidebar drag and drop ordering */}
      <div className="lg:col-span-12 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6 mt-8">
        <div className="border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <i className="ph ph-list-numbers text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Sidebar-Navigation verwalten</h2>
              <p className="text-xs text-muted">Ziehe die Elemente per Drag & Drop in die gewünschte Reihenfolge, um das Hauptmenü und das LumadIQ-Menü plattformweit neu zu ordnen.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSidebarSubmit} className="space-y-6">
          {sidebarMsg && (
            <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
              sidebarMsg.type === "success" 
                ? "bg-success/10 border-success/20 text-success" 
                : "bg-danger/10 border-danger/20 text-danger"
            }`}>
              <i className={`ph-fill ${sidebarMsg.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
              <span>{sidebarMsg.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main menu column */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                <i className="ph ph-list-dashes text-primary"></i> Hauptmenü
              </h3>
              <div className="space-y-2">
                {mainOrder.map((id, index) => {
                  const item = ALL_SIDEBAR_ITEMS[id]
                  if (!item) return null
                  return (
                    <div
                      key={id}
                      draggable
                      onDragStart={() => handleDragStart(id, "main")}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(id, "main")}
                      className="flex items-center justify-between p-3.5 bg-background border border-border/70 hover:border-primary/50 rounded-xl transition-all group cursor-grab active:cursor-grabbing select-none hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <i className="ph ph-dots-six-vertical text-muted group-hover:text-primary transition-colors text-lg"></i>
                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-muted group-hover:text-primary transition-all border border-border/40">
                          <i className={`ph ${item.icon} text-base`}></i>
                        </div>
                        <span className="text-xs font-bold text-foreground">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveItem(index, "up", "main")}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:bg-surface text-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Nach oben verschieben"
                        >
                          <i className="ph ph-caret-up text-xs"></i>
                        </button>
                        <button
                          type="button"
                          disabled={index === mainOrder.length - 1}
                          onClick={() => moveItem(index, "down", "main")}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:bg-surface text-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Nach unten verschieben"
                        >
                          <i className="ph ph-caret-down text-xs"></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* LumadIQ menu column */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
                <i className="ph ph-brain text-purple-500"></i> LumadIQ-Untermenü
              </h3>
              <div className="space-y-2">
                {lumadiqOrder.map((id, index) => {
                  const item = ALL_SIDEBAR_ITEMS[id]
                  if (!item) return null
                  return (
                    <div
                      key={id}
                      draggable
                      onDragStart={() => handleDragStart(id, "lumadiq")}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(id, "lumadiq")}
                      className="flex items-center justify-between p-3.5 bg-background border border-border/70 hover:border-purple-500/50 rounded-xl transition-all group cursor-grab active:cursor-grabbing select-none hover:shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <i className="ph ph-dots-six-vertical text-muted group-hover:text-purple-500 transition-colors text-lg"></i>
                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-muted group-hover:text-purple-500 transition-all border border-border/40">
                          <i className={`ph ${item.icon} text-base`}></i>
                        </div>
                        <span className="text-xs font-bold text-foreground">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveItem(index, "up", "lumadiq")}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:bg-surface text-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Nach oben verschieben"
                        >
                          <i className="ph ph-caret-up text-xs"></i>
                        </button>
                        <button
                          type="button"
                          disabled={index === lumadiqOrder.length - 1}
                          onClick={() => moveItem(index, "down", "lumadiq")}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:bg-surface text-muted disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          title="Nach unten verschieben"
                        >
                          <i className="ph ph-caret-down text-xs"></i>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
            <button
              type="button"
              onClick={() => {
                setMainOrder(["dashboard", "learning", "admin"])
                setLumadiqOrder(["intro", "docs", "learn", "graph", "exams"])
              }}
              className="px-5 py-2.5 bg-background hover:bg-surface border border-border text-foreground font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Standard zurücksetzen
            </button>
            <button
              disabled={isSavingSidebar}
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSavingSidebar ? "Wird gespeichert..." : "Reihenfolge speichern"} <i className="ph ph-floppy-disk text-sm"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
