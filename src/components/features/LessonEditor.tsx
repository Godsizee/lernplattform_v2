"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { upsertLesson } from "@/lib/actions/lesson"
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

export function LessonEditor({ subjects, initialLesson }: LessonEditorProps) {
  const router = useRouter()
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
      } catch (err: any) {
        setMessage({ type: "error", text: `Ungültiges Quiz-JSON: ${err.message}` })
        setIsSaving(false)
        return
      }
    }

    try {
      const result = await upsertLesson({
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
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Fehler beim Speichern der Lektion." })
    } finally {
      setIsSaving(false)
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
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.title}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Typ</label>
                <select
                  value={type}
                  onChange={(e) => loadTemplate(e.target.value as "article" | "quiz")}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
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
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
              >
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <button
              disabled={isSaving}
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-extrabold text-xs rounded-xl transition shadow-lg shadow-primary/15 disabled:opacity-50 flex items-center justify-center gap-1.5"
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
                onClick={() => setActiveTab("preview")}
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
                      h2: ({ children }: any) => (
                        <h2 className="text-xl font-bold mt-6 mb-3 border-b pb-1 border-border/60">{children}</h2>
                      ),
                      playground: () => (
                        <div className="p-4 bg-background border border-dashed border-border rounded-xl text-center text-xs text-muted font-bold my-4 flex flex-col items-center gap-1.5">
                          <i className="ph ph-terminal-window text-2xl text-primary"></i>
                          [Interaktiver Code-Playground wird hier geladen]
                        </div>
                      )
                    } as any}
                  >
                    {contentRaw}
                  </ReactMarkdown>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-background border border-border rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                      <pre>{JSON.stringify(JSON.parse(contentRaw || "[]"), null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
