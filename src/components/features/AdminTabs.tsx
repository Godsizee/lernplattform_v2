"use client"

import { useState, useMemo } from "react"
import Link from "next/link"

interface AdminTabsProps {
  userCount: number
  subjectCount: number
  lessonCount: number
  subjects: any[]
  logs: any[]
  llmLogs: any[]
  conceptNodes: any[]
}

// Cost calculation helper based on current industry standard API rates
function calculateLlmCost(model: string, prompt: number, output: number) {
  const lowercaseModel = model.toLowerCase()
  let inputPricePerMillion = 0.5
  let outputPricePerMillion = 1.5

  if (lowercaseModel.includes("sonnet")) {
    inputPricePerMillion = 3.0 // Claude 3.5 Sonnet
    outputPricePerMillion = 15.0
  } else if (lowercaseModel.includes("haiku")) {
    inputPricePerMillion = 0.25 // Claude 3 Haiku
    outputPricePerMillion = 1.25
  } else if (lowercaseModel.includes("gemini-1.5-flash") || lowercaseModel.includes("gemini-2.5-flash") || lowercaseModel.includes("flash")) {
    inputPricePerMillion = 0.075 // Gemini Flash
    outputPricePerMillion = 0.30
  } else if (lowercaseModel.includes("gemini-1.5-pro") || lowercaseModel.includes("pro")) {
    inputPricePerMillion = 1.25 // Gemini Pro
    outputPricePerMillion = 5.00
  }

  const inputCost = (prompt / 1000000) * inputPricePerMillion
  const outputCost = (output / 1000000) * outputPricePerMillion
  return inputCost + outputCost
}

export function AdminTabs({
  userCount,
  subjectCount,
  lessonCount,
  subjects,
  logs,
  llmLogs,
  conceptNodes
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "ai" | "blockers">("overview")

  // ---------------------------------------------------------------------------
  // Tab 1: Format Audit Logs Helper
  // ---------------------------------------------------------------------------
  const formatAuditAction = (action: string) => {
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

    if (mapping[action]) return mapping[action]

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
    if (action.includes("Sidebar-Elemente Umsortierung")) {
      return { label: "Menü umsortiert", icon: "ph-list-numbers", color: "text-amber-500 bg-amber-500/10" }
    }

    return { label: action, icon: "ph-info", color: "text-muted bg-border/20" }
  }

  // ---------------------------------------------------------------------------
  // Tab 2: AI Cost & Performance Analytics Computations
  // ---------------------------------------------------------------------------
  const aiStats = useMemo(() => {
    let totalCost = 0
    let totalPromptTokens = 0
    let totalOutputTokens = 0
    let totalDuration = 0
    let errorCount = 0

    const modelDistribution: Record<string, number> = {}
    const opDistribution: Record<string, number> = {}
    const recentErrors: any[] = []

    llmLogs.forEach((log) => {
      const prompt = log.promptTokens || 0
      const output = log.outputTokens || 0
      totalPromptTokens += prompt
      totalOutputTokens += output
      totalDuration += log.durationMs

      const cost = calculateLlmCost(log.model, prompt, output)
      totalCost += cost

      // Model distribution
      const modelClean = log.model.split("/").pop() || log.model
      modelDistribution[modelClean] = (modelDistribution[modelClean] || 0) + 1

      // Operation distribution
      const opClean = log.operation || "Unbekannt"
      opDistribution[opClean] = (opDistribution[opClean] || 0) + 1

      if (log.error) {
        errorCount++
        recentErrors.push({
          id: log.id,
          model: modelClean,
          operation: opClean,
          error: log.error,
          createdAt: log.createdAt
        })
      }
    })

    const totalCalls = llmLogs.length
    const successRate = totalCalls > 0 ? ((totalCalls - errorCount) / totalCalls) * 100 : 100
    const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0

    return {
      totalCalls,
      totalCost,
      totalPromptTokens,
      totalOutputTokens,
      totalTokens: totalPromptTokens + totalOutputTokens,
      successRate,
      avgDuration: avgDuration / 1000, // convert to seconds
      modelDistribution,
      opDistribution,
      recentErrors: recentErrors.slice(0, 5)
    }
  }, [llmLogs])

  // ---------------------------------------------------------------------------
  // Tab 3: Cohort Lernblockaden Heatmap Computations
  // ---------------------------------------------------------------------------
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("all")
  const [blockerSearch, setBlockerSearch] = useState("")
  const [blockerSortBy, setBlockerSortBy] = useState<"score" | "attempts" | "failures">("score")
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null)

  const parsedBlockerNodes = useMemo(() => {
    return conceptNodes.map((node) => {
      // Flatten attempts
      const attempts = node.cachedTasks.flatMap((ct: any) => ct.attempts || [])
      
      const totalAttempts = attempts.length
      const failedAttempts = attempts.filter((a: any) => !a.isCorrect).length
      const successAttempts = attempts.filter((a: any) => a.isCorrect).length
      
      const failureRate = totalAttempts > 0 ? (failedAttempts / totalAttempts) * 100 : 0
      const uniqueStudents = Array.from(new Set(attempts.map((a: any) => a.userId))).length

      return {
        id: node.id,
        title: node.title,
        description: node.description,
        filename: node.document?.filename || "Unbekanntes Skript",
        subjectTitle: node.document?.subject?.title || "Allgemeines Fach",
        subjectId: node.document?.subject?.id || "unknown",
        subjectColor: node.document?.subject?.color || "#3b82f6",
        totalAttempts,
        failedAttempts,
        successAttempts,
        failureRate,
        uniqueStudents,
        attempts: attempts.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
      }
    })
  }, [conceptNodes])

  // Filter & Sort blocker nodes
  const filteredBlockerNodes = useMemo(() => {
    return parsedBlockerNodes
      .filter((node) => {
        const matchesSubject = selectedSubjectId === "all" || node.subjectId === selectedSubjectId
        const matchesSearch = node.title.toLowerCase().includes(blockerSearch.toLowerCase()) || 
                              node.subjectTitle.toLowerCase().includes(blockerSearch.toLowerCase())
        return matchesSubject && matchesSearch
      })
      .sort((a, b) => {
        if (blockerSortBy === "score") {
          // Failure rate primary, tiebreaker attempts
          return b.failureRate - a.failureRate || b.totalAttempts - a.totalAttempts
        }
        if (blockerSortBy === "attempts") {
          return b.totalAttempts - a.totalAttempts
        }
        return b.failedAttempts - a.failedAttempts
      })
  }, [parsedBlockerNodes, selectedSubjectId, blockerSearch, blockerSortBy])

  const topBlockers = useMemo(() => {
    return parsedBlockerNodes
      .filter(n => n.totalAttempts > 0 && n.failureRate >= 40)
      .sort((a, b) => b.failedAttempts - a.failedAttempts || b.failureRate - a.failureRate)
      .slice(0, 5)
  }, [parsedBlockerNodes])

  // Distinct subjects lists for filtering dropdown
  const distinctSubjects = useMemo(() => {
    const map = new Map()
    conceptNodes.forEach((node) => {
      const s = node.document?.subject
      if (s) {
        map.set(s.id, { id: s.id, title: s.title, color: s.color })
      }
    })
    return Array.from(map.values())
  }, [conceptNodes])

  return (
    <div className="space-y-6">
      {/* Tab Switcher Buttons */}
      <div className="flex border-b border-border/80 pb-px gap-2 overflow-x-auto select-none no-scrollbar">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-3 text-xs md:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === "overview"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <i className="ph ph-squares-four text-base"></i> Übersicht Dashboard
        </button>
        <button
          onClick={() => setActiveTab("ai")}
          className={`px-5 py-3 text-xs md:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === "ai"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <i className="ph ph-cpu text-base"></i> KI-Kosten & Performance
        </button>
        <button
          onClick={() => setActiveTab("blockers")}
          className={`px-5 py-3 text-xs md:text-sm font-extrabold flex items-center gap-2 border-b-2 transition-all shrink-0 cursor-pointer ${
            activeTab === "blockers"
              ? "border-primary text-primary"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <i className="ph ph-fire text-base animate-pulse"></i> Wissens-Blockaden (Heatmap)
        </button>
      </div>

      {/* -----------------------------------------------------------------------
          TAB 1: Cockpit Overview
          ----------------------------------------------------------------------- */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Clickable Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              href="/admin/users" 
              className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
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
      )}

      {/* -----------------------------------------------------------------------
          TAB 2: AI Cost & Performance Analytics
          ----------------------------------------------------------------------- */}
      {activeTab === "ai" && (
        <div className="space-y-8 animate-fade-in">
          {/* AI Metrics KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                <i className="ph ph-currency-eur text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{aiStats.totalCost.toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 4 })}</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wide">Geschätzte Gesamtkosten</div>
              </div>
            </div>

            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center shrink-0">
                <i className="ph ph-cpu text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{aiStats.totalCalls}</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wide">Gesamte KI-Anfragen</div>
              </div>
            </div>

            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-xl flex items-center justify-center shrink-0">
                <i className="ph ph-chart-line text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold">
                  {aiStats.totalTokens >= 1000000 
                    ? `${(aiStats.totalTokens / 1000000).toFixed(2)}M` 
                    : aiStats.totalTokens.toLocaleString("de-DE")}
                </div>
                <div className="text-xs text-muted font-bold uppercase tracking-wide">Gesamt-Tokenverbrauch</div>
              </div>
            </div>

            <div className="bg-surface border border-border p-6 rounded-2xl shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                <i className="ph ph-gauge text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-extrabold">{aiStats.successRate.toFixed(1)}%</div>
                <div className="text-xs text-muted font-bold uppercase tracking-wide">Anfragen-Erfolgsquote</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Model and Operation Distribution */}
            <div className="lg:col-span-7 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Verbrauchs-Verteilung</h3>
                <p className="text-xs text-muted">Auslastung nach KI-Modellen und Funktions-Operationen.</p>
              </div>

              <div className="space-y-6 border-t border-border/40 pt-6">
                {/* Model distribution */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-extrabold text-muted uppercase tracking-wider">Verwendete Modelle</h4>
                  <div className="space-y-3">
                    {Object.entries(aiStats.modelDistribution).map(([model, count]) => {
                      const percentage = (count / aiStats.totalCalls) * 100
                      return (
                        <div key={model} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-foreground">{model}</span>
                            <span className="text-muted font-semibold">{count} Anfragen ({percentage.toFixed(0)}%)</span>
                          </div>
                          <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-border/20">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                    {Object.keys(aiStats.modelDistribution).length === 0 && (
                      <p className="text-xs text-muted">Keine Modelldaten vorhanden.</p>
                    )}
                  </div>
                </div>

                {/* Operations distribution */}
                <div className="space-y-3.5 pt-4">
                  <h4 className="text-xs font-extrabold text-muted uppercase tracking-wider">Ausgeführte Operationen</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(aiStats.opDistribution).map(([op, count]) => (
                      <div key={op} className="p-3 bg-background border border-border/50 rounded-xl flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground truncate max-w-[150px]">{op}</span>
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-extrabold shrink-0">{count} ×</span>
                      </div>
                    ))}
                    {Object.keys(aiStats.opDistribution).length === 0 && (
                      <p className="text-xs text-muted col-span-2">Keine Operationsdaten vorhanden.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance and Error Logs */}
            <div className="lg:col-span-5 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold tracking-tight">Leistung & API-Ausfälle</h3>
                <p className="text-xs text-muted">Durchschnittliche Antwortzeit und letzte Systemfehler.</p>
              </div>

              <div className="space-y-5 border-t border-border/40 pt-6">
                {/* Performance stats */}
                <div className="p-4 bg-background border border-border/50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <i className="ph ph-timer text-lg"></i>
                    </div>
                    <div>
                      <span className="text-xs text-muted font-bold">Ø Antwortzeit</span>
                      <p className="text-sm font-black text-foreground">Schnittstelle</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-foreground">{aiStats.avgDuration.toFixed(2)}s</span>
                  </div>
                </div>

                {/* Error log list */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-extrabold text-muted uppercase tracking-wider flex items-center justify-between">
                    <span>Fehlerprotokoll</span>
                    <span className="text-[10px] bg-danger/10 text-danger px-2.5 py-0.5 rounded-full font-extrabold">letzte 5</span>
                  </h4>

                  <div className="space-y-3">
                    {aiStats.recentErrors.map((err) => (
                      <div key={err.id} className="p-3 bg-danger/5 border border-danger/20 rounded-xl space-y-1.5">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-extrabold text-danger uppercase tracking-wide">{err.operation}</span>
                          <span className="text-muted font-medium">
                            {new Date(err.createdAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-foreground leading-relaxed font-mono truncate">{err.error}</p>
                        <p className="text-[9px] text-muted">Modell: {err.model}</p>
                      </div>
                    ))}

                    {aiStats.recentErrors.length === 0 && (
                      <div className="p-4 bg-success/5 border border-success/15 rounded-xl text-center">
                        <i className="ph ph-check-circle text-2xl text-success mb-1"></i>
                        <p className="text-xs font-bold text-success">Super! Keine API-Fehler in den Logs.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------------------------------------------------------
          TAB 3: Cohort Learning Blockers Heatmap
          ----------------------------------------------------------------------- */}
      {activeTab === "blockers" && (
        <div className="space-y-8 animate-fade-in">
          {/* Header Description & Filtering Bar */}
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Kohorten-Lernblockaden</h3>
                <p className="text-xs text-muted">Finde heraus, an welchen Lernknoten Studenten am häufigsten scheitern, um Kursmaterial zu optimieren.</p>
              </div>

              {/* Filters dropdown */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full sm:w-auto bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="all">Alle Fächer ({subjects.length})</option>
                  {distinctSubjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>

                <select
                  value={blockerSortBy}
                  onChange={(e) => setBlockerSortBy(e.target.value as any)}
                  className="w-full sm:w-auto bg-background border border-border rounded-xl px-3.5 py-2 text-xs font-bold focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="score">Sortieren nach Blockade-Quote (%)</option>
                  <option value="attempts">Sortieren nach Versuche-Anzahl</option>
                  <option value="failures">Sortieren nach Fehlversuche-Anzahl</option>
                </select>
              </div>
            </div>

            {/* Live Search and stats */}
            <div className="flex flex-col sm:flex-row gap-4 border-t border-border/40 pt-4">
              <div className="relative flex-1">
                <i className="ph ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-base"></i>
                <input
                  type="text"
                  placeholder="Konzepte durchsuchen..."
                  value={blockerSearch}
                  onChange={(e) => setBlockerSearch(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-3.5 shrink-0 bg-background/50 border border-border rounded-xl px-4 py-2.5 text-[11px] font-bold text-muted select-none">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-success/20 border border-success/40 rounded-full"></span> &lt;30% (Einfach)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-warning/20 border border-warning/40 rounded-full"></span> 30%-60% (Mittel)</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-danger/20 border border-danger/40 rounded-full"></span> &gt;60% (Kritisch)</span>
              </div>
            </div>
          </div>

          {/* Grid Blocker Heatmap */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-muted uppercase tracking-wider flex items-center gap-1">
              <i className="ph ph-grid-four"></i> Interaktives Konzept-Netz ({filteredBlockerNodes.length} Knoten)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBlockerNodes.map((node) => {
                let statusClasses = "bg-background/40 border-border/60 text-muted"
                let statusLabel = "Keine Versuche"

                if (node.totalAttempts > 0) {
                  if (node.failureRate < 30) {
                    statusClasses = "bg-success/5 dark:bg-success/5 border-success/30 hover:bg-success/10 text-success dark:text-success-foreground"
                    statusLabel = "Einfach"
                  } else if (node.failureRate >= 30 && node.failureRate < 60) {
                    statusClasses = "bg-warning/5 dark:bg-warning/5 border-warning/30 hover:bg-warning/10 text-warning dark:text-warning-foreground"
                    statusLabel = "Mittel"
                  } else {
                    statusClasses = "bg-danger/5 dark:bg-danger/5 border-danger/30 hover:bg-danger/10 text-danger dark:text-danger-foreground animate-pulse-slow"
                    statusLabel = "Blockierend"
                  }
                }

                const isExpanded = expandedNodeId === node.id

                return (
                  <div
                    key={node.id}
                    onClick={() => setExpandedNodeId(isExpanded ? null : node.id)}
                    className={`border p-4.5 rounded-2xl cursor-pointer transition-all duration-300 relative group flex flex-col justify-between h-40 ${statusClasses}`}
                    title="Klicke für Details und Versuchshistorie"
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span 
                          className="px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider uppercase truncate max-w-[120px]"
                          style={{ backgroundColor: `${node.subjectColor}15`, color: node.subjectColor }}
                        >
                          {node.subjectTitle}
                        </span>
                        <span className="text-[9px] font-extrabold opacity-85 uppercase tracking-wider">{statusLabel}</span>
                      </div>
                      <h5 className="font-extrabold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2 pr-2">{node.title}</h5>
                    </div>

                    <div className="border-t border-border/20 pt-2.5 mt-2 flex justify-between items-center text-[10px] font-bold">
                      <div className="space-y-0.5">
                        <span className="text-muted block font-semibold text-[9px] uppercase tracking-wide">Versuche</span>
                        <span className="text-foreground text-xs font-black">{node.failedAttempts} / {node.totalAttempts}</span>
                      </div>
                      <div className="text-right space-y-0.5">
                        <span className="text-muted block font-semibold text-[9px] uppercase tracking-wide">Blockade-Quote</span>
                        <span className="text-foreground text-xs font-black">{node.failureRate.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                )
              })}

              {filteredBlockerNodes.length === 0 && (
                <div className="p-12 bg-surface border border-border rounded-2xl text-center col-span-full">
                  <i className="ph ph-folder text-3xl text-muted mb-2"></i>
                  <p className="text-xs text-muted font-bold">Keine Lernknoten für diese Auswahlkriterien gefunden.</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Drawer/Modal for Blocker details */}
          {expandedNodeId && (() => {
            const node = parsedBlockerNodes.find(n => n.id === expandedNodeId)
            if (!node) return null
            return (
              <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-md space-y-6 animate-fade-in">
                <div className="flex justify-between items-start border-b border-border/60 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide"
                        style={{ backgroundColor: `${node.subjectColor}15`, color: node.subjectColor }}
                      >
                        {node.subjectTitle}
                      </span>
                      <span className="text-xs text-muted font-medium">Extrahiert aus: <strong className="text-foreground underline">{node.filename}</strong></span>
                    </div>
                    <h4 className="text-lg font-black tracking-tight text-foreground">{node.title}</h4>
                  </div>
                  <button
                    onClick={() => setExpandedNodeId(null)}
                    className="w-8 h-8 rounded-lg border border-border hover:bg-background text-muted hover:text-foreground flex items-center justify-center transition cursor-pointer"
                    title="Schließen"
                  >
                    <i className="ph ph-x"></i>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-1 space-y-4">
                    <h5 className="text-xs font-extrabold text-muted uppercase tracking-wider">Konzept-KPIs</h5>
                    <div className="space-y-3">
                      <div className="p-3.5 bg-background rounded-xl border border-border/50 flex justify-between items-center text-xs">
                        <span className="text-muted font-bold">Blockade-Quote</span>
                        <span className="text-sm font-black text-danger">{node.failureRate.toFixed(1)}%</span>
                      </div>
                      <div className="p-3.5 bg-background rounded-xl border border-border/50 flex justify-between items-center text-xs">
                        <span className="text-muted font-bold">Fehlgeschlagene Versuche</span>
                        <span className="text-sm font-black text-foreground">{node.failedAttempts} / {node.totalAttempts}</span>
                      </div>
                      <div className="p-3.5 bg-background rounded-xl border border-border/50 flex justify-between items-center text-xs">
                        <span className="text-muted font-bold">Aktive Studenten</span>
                        <span className="text-sm font-black text-foreground">{node.uniqueStudents}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    <h5 className="text-xs font-extrabold text-muted uppercase tracking-wider flex items-center justify-between">
                      <span>Letzte studentische Fehlversuche</span>
                      <span className="text-[10px] font-medium text-muted">Aktivitätenprotokoll</span>
                    </h5>

                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 font-sans">
                      {node.attempts.map((att: any) => (
                        <div key={att.id} className="p-3.5 bg-background border border-border/60 rounded-xl flex items-center justify-between gap-4 text-xs">
                          <div className="min-w-0">
                            <span className="font-extrabold text-foreground block truncate">{att.user?.name || "Unbekannter Student"}</span>
                            <span className="text-[10px] text-muted truncate block">{att.user?.email}</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 font-sans">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold ${att.isCorrect ? "bg-success/15 text-success border border-success/25" : "bg-danger/15 text-danger border border-danger/25"}`}>
                              {att.isCorrect ? "Bestanden" : "Fehlversuch"}
                            </span>
                            <span className="text-[10px] text-muted font-semibold font-sans">
                              {new Date(att.submittedAt).toLocaleDateString("de-DE")}
                            </span>
                          </div>
                        </div>
                      ))}

                      {node.attempts.length === 0 && (
                        <p className="text-xs text-muted text-center py-4">Bisher gibt es keine Versuche für diesen Konzeptknoten.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Top 5 Blocker Highlight */}
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold tracking-tight text-danger flex items-center gap-2">
                <i className="ph-fill ph-fire text-xl animate-pulse"></i> Die 5 kritischsten Wissens-Blockaden
              </h3>
              <p className="text-xs text-muted">Konzepte mit der höchsten absoluten Anzahl an studentischen Fehlversuchen.</p>
            </div>

            <div className="space-y-3.5 border-t border-border/40 pt-6">
              {topBlockers.map((node, idx) => (
                <div
                  key={node.id}
                  onClick={() => {
                    setExpandedNodeId(node.id)
                    // Scroll to details panel if clicked
                    setTimeout(() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                    }, 100)
                  }}
                  className="p-4 bg-background border border-border hover:border-danger/40 rounded-2xl flex items-center justify-between gap-6 transition cursor-pointer group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-danger/10 text-danger flex items-center justify-center shrink-0 font-extrabold text-sm">
                      #{idx + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-extrabold uppercase text-muted tracking-wide">{node.subjectTitle}</span>
                      <h5 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">{node.title}</h5>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 text-xs font-bold text-right">
                    <div className="hidden sm:block">
                      <span className="text-[10px] text-muted block font-semibold">Aktive Studenten</span>
                      <span className="text-foreground">{node.uniqueStudents} Personen</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted block font-semibold">Fehlversuche</span>
                      <span className="text-danger font-black">{node.failedAttempts} / {node.totalAttempts}</span>
                    </div>
                  </div>
                </div>
              ))}

              {topBlockers.length === 0 && (
                <p className="text-xs text-muted text-center py-4">Bisher wurden keine nennenswerten Lernblockaden im System registriert.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
