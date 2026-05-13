"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { upsertLesson } from "@/lib/actions/lesson"
import { createSubject } from "@/lib/actions/admin"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"

interface Subject {
  id: string
  title: string
}

interface LessonEditorProps {
  subjects: Subject[]
  initialLesson?: {
    id: string
    title: string
    subjectId: string
    type: "article" | "quiz" | string
    status: "draft" | "published" | string
    sortOrder: number
    contentRaw: string
  }
}

const DEFAULT_ARTICLE_TEMPLATE = `# Neue Lektion\n\nHier kannst du mit **Markdown** schreiben. \n\n## Ein Untertitel\n\n- Punkt 1\n- Punkt 2\n\n## Interaktiver Playground\n\nDu kannst auch einen interaktiven Code-Playground einfügen:\n\n<playground html="<h1>Hallo</h1>" css="h1 { color: red; }" js="console.log('Playground geladen');"></playground>\n`

const DEFAULT_QUIZ_TEMPLATE = `[\n  {\n    "question": "Was ist die Hauptstadt von Deutschland?",\n    "options": {\n      "A": "München",\n      "B": "Berlin",\n      "C": "Hamburg",\n      "D": "Frankfurt"\n    },\n    "correct": "B",\n    "type": "radio"\n  }\n]`

const COLOR_PRESETS = [
  { name: "Saphir-Blau", value: "#3b82f6" },
  { name: "Smaragd-Grün", value: "#10b981" },
  { name: "Amethyst-Violett", value: "#8b5cf6" },
  { name: "Warmes Bernstein", value: "#f59e0b" },
  { name: "Sonnenuntergang-Orange", value: "#f97316" },
  { name: "Rubin-Rot", value: "#ef4444" },
  { name: "Tiefes Teal", value: "#14b8a6" },
  { name: "Leuchtendes Indigo", value: "#4f46e5" }
]

const ICON_PRESETS = [
  { class: "ph-book", name: "Lesen/Theorie" },
  { class: "ph-code", name: "Programmierung" },
  { class: "ph-database", name: "Datenbanken" },
  { class: "ph-terminal-window", name: "Terminal/Editor" },
  { class: "ph-calculator", name: "Mathematik" },
  { class: "ph-cpu", name: "Hardware/IT" },
  { class: "ph-globe", name: "Webentwicklung" },
  { class: "ph-shield-check", name: "Netzwerksicherheit" },
  { class: "ph-atom", name: "Naturwissenschaften" },
  { class: "ph-chart-bar", name: "Analysen" },
  { class: "ph-lightbulb", name: "Konzepte" },
  { class: "ph-gear", name: "DevOps/Tools" }
]

export function LessonEditor({ subjects, initialLesson }: LessonEditorProps) {
  const router = useRouter()
  const [editorSubjects, setEditorSubjects] = useState<Subject[]>(subjects)

  const [title, setTitle] = useState(initialLesson?.title || "")
  const [subjectId, setSubjectId] = useState(initialLesson?.subjectId || subjects[0]?.id || "")
  const [type, setType] = useState<"article" | "quiz">(initialLesson?.type === "quiz" ? "quiz" : "article")
  const [status, setStatus] = useState<"draft" | "published">(initialLesson?.status === "draft" ? "draft" : "published")
  const [sortOrder, setSortOrder] = useState(initialLesson?.sortOrder || 1)
  const [contentRaw, setContentRaw] = useState(
    initialLesson?.contentRaw || (initialLesson?.type === "quiz" ? DEFAULT_QUIZ_TEMPLATE : DEFAULT_ARTICLE_TEMPLATE)
  )

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  // Inline Subject Creation Modal States
  const [quickSubjectModalOpen, setQuickSubjectModalOpen] = useState(false)
  const [quickSubjectTitle, setQuickSubjectTitle] = useState("")
  const [quickSubjectColor, setQuickSubjectColor] = useState("#3b82f6")
  const [quickSubjectIcon, setQuickSubjectIcon] = useState("ph-book")
  const [isCreatingQuickSubject, setIsCreatingQuickSubject] = useState(false)
  const [quickSubjectError, setQuickSubjectError] = useState<string | null>(null)

  // Helper to load standard structures
  const loadTemplate = (newType: "article" | "quiz") => {
    setType(newType)
    if (newType === "article" && contentRaw === DEFAULT_QUIZ_TEMPLATE) {
      setContentRaw(DEFAULT_ARTICLE_TEMPLATE)
    } else if (newType === "quiz" && contentRaw === DEFAULT_ARTICLE_TEMPLATE) {
      setContentRaw(DEFAULT_QUIZ_TEMPLATE)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSaving(true)

    // For quizzes, validate JSON before sending to Server Action
    if (type === "quiz") {
      try {
        const parsed = JSON.parse(contentRaw)
        if (!Array.isArray(parsed)) {
          throw new Error("Das Quiz-Format muss ein Array von Fragen sein.")
        }
      } catch (err: unknown) {
        const error = err as Error
        setMessage({ type: "error", text: `Ungültiges Quiz-JSON: ${error.message}` })
        setIsSaving(false)
        return
      }
    }

    try {
      await upsertLesson({
        id: initialLesson?.id,
        subjectId,
        title,
        type,
        status,
        sortOrder: Number(sortOrder),
        contentRaw,
        content: "" // Compiled HTML is generated dynamically if needed, or left empty
      })

      setMessage({ type: "success", text: "Lektion erfolgreich gespeichert." })
      router.push(`/subjects/${subjectId}`)
    } catch (err: unknown) {
      const error = err as Error
      setMessage({ type: "error", text: error.message || "Fehler beim Speichern der Lektion." })
    } finally {
      setIsSaving(false)
    }
  }

  const handleQuickSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickSubjectTitle.trim()) {
      setQuickSubjectError("Bitte gib einen Fächertitel ein.")
      return
    }

    setIsCreatingQuickSubject(true)
    setQuickSubjectError(null)

    try {
      const res = await createSubject({
        title: quickSubjectTitle.trim(),
        color: quickSubjectColor,
        icon: quickSubjectIcon
      })

      if (res.success && res.subject) {
        // Append the newly created subject to our editor list
        const newSubjectObj = {
          id: res.subject.id,
          title: res.subject.title
        }
        setEditorSubjects(prev => [...prev, newSubjectObj])
        // Automatically select the new subject
        setSubjectId(newSubjectObj.id)
        
        // Reset and close
        setQuickSubjectTitle("")
        setQuickSubjectColor("#3b82f6")
        setQuickSubjectIcon("ph-book")
        setQuickSubjectModalOpen(false)
        router.refresh()
      } else {
        throw new Error("Konnte das neue Fach nicht registrieren.")
      }
    } catch (err: unknown) {
      const error = err as Error
      setQuickSubjectError(error.message || "Fehler beim Erstellen des Fachs.")
    } finally {
      setIsCreatingQuickSubject(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {message && (
        <div className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
          message.type === "success" 
            ? "bg-success/10 border-success/20 text-success" 
            : "bg-danger/10 border-danger/20 text-danger"
        }`}>
          <i className={`ph-fill ${message.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Settings Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-5">
          <div className="border-b border-border/60 pb-3">
            <h2 className="text-lg font-bold tracking-tight">Einstellungen</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Lektionstitel</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Einführung in Joins"
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Fach / Kurs</label>
              <div className="flex gap-2">
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold cursor-pointer"
                >
                  {editorSubjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.title}</option>
                  ))}
                  {editorSubjects.length === 0 && (
                    <option value="" disabled>Keine Fächer verfügbar</option>
                  )}
                </select>
                <button
                  type="button"
                  onClick={() => setQuickSubjectModalOpen(true)}
                  className="px-3 bg-background border border-border hover:border-primary/40 rounded-xl text-muted hover:text-primary transition-all flex items-center justify-center cursor-pointer"
                  title="Neues Fach schnell anlegen"
                >
                  <i className="ph ph-plus text-base font-bold"></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Typ</label>
                <select
                  value={type}
                  onChange={(e) => loadTemplate(e.target.value as "article" | "quiz")}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold cursor-pointer"
                >
                  <option value="article">Artikel (MD)</option>
                  <option value="quiz">Quiz (JSON)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Reihenfolge</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold cursor-pointer"
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <button
              disabled={isSaving || editorSubjects.length === 0}
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-primary/15 disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSaving ? "Wird gespeichert..." : "Inhalt speichern"} <i className="ph ph-floppy-disk text-base"></i>
            </button>
          </div>
        </div>

        {/* Editor & Preview Workspace */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col h-[550px]">
          {/* Header tabs */}
          <div className="bg-background/80 px-4 py-2 border-b border-border flex items-center justify-between shrink-0">
            <div className="flex bg-surface border border-border rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("edit")}
                className={`px-3 py-1.5 rounded-md font-bold transition ${
                  activeTab === "edit"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Inhalt bearbeiten
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("preview")
                }}
                className={`px-3 py-1.5 rounded-md font-bold transition ${
                  activeTab === "preview"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Live-Vorschau
              </button>
            </div>
            {type === "quiz" && (
              <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                JSON-Modus aktiv
              </span>
            )}
          </div>

          {/* Area view */}
          <div className="flex-1 min-h-0 relative">
            {activeTab === "edit" ? (
              <textarea
                value={contentRaw}
                onChange={(e) => setContentRaw(e.target.value)}
                className="w-full h-full p-6 bg-surface text-foreground font-mono text-sm focus:outline-none resize-none overflow-y-auto leading-relaxed"
                placeholder={type === "quiz" ? "Füge hier dein Quiz-JSON ein..." : "Schreibe hier deinen Lektionstext..."}
                spellCheck="false"
              />
            ) : (
              /* Live Preview */
              <div className="w-full h-full p-6 overflow-y-auto bg-surface prose dark:prose-invert max-w-none">
                {type === "article" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      h2: ({ children }: any) => (
                        <h2 className="text-xl font-bold mt-6 mb-3 border-b pb-1 border-border/60">{children}</h2>
                      ),
                      playground: () => (
                        <div className="p-4 bg-background border border-dashed border-border rounded-xl text-center text-xs text-muted font-bold my-4 flex flex-col items-center gap-1.5">
                          <i className="ph ph-terminal-window text-2xl text-primary"></i>
                          [Interaktiver Code-Playground wird hier geladen]
                        </div>
                      )
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any}
                  >
                    {contentRaw}
                  </ReactMarkdown>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-background border border-border rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                      <pre>
                        {(() => {
                          try {
                            return JSON.stringify(JSON.parse(contentRaw || "[]"), null, 2)
                          } catch (err: unknown) {
                            const error = err as Error
                            return `[Ungültiges JSON-Format: ${error.message}]`
                          }
                        })()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* ===================== INLINE QUICK SUBJECT CREATE MODAL ===================== */}
      {quickSubjectModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form 
            onSubmit={handleQuickSubjectSubmit}
            className="bg-surface border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-scale-up"
          >
            <div className="border-b border-border/60 pb-3 flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                <i className="ph ph-plus-circle text-primary"></i>
                Neues Fach schnell anlegen
              </h3>
              <button 
                type="button"
                onClick={() => setQuickSubjectModalOpen(false)}
                className="w-8 h-8 rounded-lg text-muted hover:text-foreground hover:bg-border/30 flex items-center justify-center transition cursor-pointer"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            {quickSubjectError && (
              <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold flex items-center gap-2.5 animate-slide-in">
                <i className="ph-fill ph-x-circle text-lg"></i>
                <span>{quickSubjectError}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Field 1: Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Titel des Fachs</label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Relationale Datenbanken"
                  value={quickSubjectTitle}
                  onChange={(e) => setQuickSubjectTitle(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                />
              </div>

              {/* Field 2: Color Picker Presets Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase block">Themenfarbe</label>
                <div className="grid grid-cols-8 gap-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setQuickSubjectColor(preset.value)}
                      style={{ backgroundColor: preset.value }}
                      className={`h-8 rounded-full border transition cursor-pointer relative ${
                        quickSubjectColor === preset.value 
                          ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-background scale-110" 
                          : "border-black/10 dark:border-white/10 hover:scale-105"
                      }`}
                      title={preset.name}
                    >
                      {quickSubjectColor === preset.value && (
                        <i className="ph-bold ph-check text-white text-xs absolute inset-0 flex items-center justify-center"></i>
                      )}
                    </button>
                  ))}
                </div>
                {/* Custom Hex Color Picker */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-border shrink-0">
                    <input
                      type="color"
                      value={quickSubjectColor}
                      onChange={(e) => setQuickSubjectColor(e.target.value)}
                      className="w-[150%] h-[150%] -ml-2 -mt-2 cursor-pointer border-none"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-bold text-muted uppercase block">Eigener HEX-Wert</label>
                    <input
                      type="text"
                      pattern="^#([A-Fa-f0-9]{6})$"
                      placeholder="#3b82f6"
                      value={quickSubjectColor}
                      onChange={(e) => setQuickSubjectColor(e.target.value)}
                      className="bg-background border border-border rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 w-24 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Field 3: Icon Selector Preset Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted uppercase block">Symbol / Icon</label>
                <div className="grid grid-cols-6 gap-2.5">
                  {ICON_PRESETS.map((preset) => (
                    <button
                      key={preset.class}
                      type="button"
                      onClick={() => setQuickSubjectIcon(preset.class)}
                      className={`p-2 rounded-xl border flex items-center justify-center text-lg transition cursor-pointer ${
                        quickSubjectIcon === preset.class
                          ? "bg-primary/10 text-primary border-primary font-bold scale-105"
                          : "border-border bg-background/50 hover:bg-border/30 text-muted"
                      }`}
                      title={preset.name}
                    >
                      <i className={`ph ${preset.class}`}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions buttons */}
            <div className="pt-4 border-t border-border/60 flex justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setQuickSubjectModalOpen(false)}
                className="px-4 py-2.5 bg-background border border-border text-foreground text-xs font-bold rounded-xl hover:bg-border/20 transition cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                disabled={isCreatingQuickSubject}
                type="submit"
                className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-white text-xs font-extrabold rounded-xl transition shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isCreatingQuickSubject ? (
                  <>
                    <i className="ph ph-spinner ph-spin"></i> Erstellt...
                  </>
                ) : (
                  <>
                    <i className="ph ph-floppy-disk"></i> Fach erstellen
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
