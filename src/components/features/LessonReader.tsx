"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { Playground } from "@/components/features/Playground"
import { completeLesson, undoCompleteLesson } from "@/lib/actions/progress"
import { toggleBookmark, saveLessonNote } from "@/lib/actions/learning"
import { useToast } from "@/context/ToastContext"

interface LessonReaderProps {
  lesson: {
    id: string
    title: string
    contentRaw: string
    type: string
    subjectId: string
  }
  subject: {
    title: string
    color: string
  }
  isCompleted: boolean
  isBookmarked: boolean
  initialNote: string
}

export function LessonReader({ 
  lesson, 
  subject, 
  isCompleted,
  isBookmarked,
  initialNote 
}: LessonReaderProps) {
  const { showToast } = useToast()
  const [isZenMode, setIsZenMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [successState, setSuccessState] = useState(isCompleted)
  const [activeHeading, setActiveHeading] = useState("")

  // Bookmarks & Notes state
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [noteContent, setNoteContent] = useState(initialNote)
  const [isSavingNote, setIsSavingNote] = useState(false)
  const [noteSavedSuccess, setNoteSavedSuccess] = useState(false)

  // Calculate Reading Time
  const wordCount = lesson.contentRaw.split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  // Auto-generate TOC entries from headers
  const tocEntries = lesson.contentRaw
    .split("\n")
    .filter(line => line.startsWith("## "))
    .map(line => {
      const text = line.replace("## ", "").trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      return { text, id }
    })

  // Watch body scroll to highlight active heading in TOC
  useEffect(() => {
    const handleScroll = () => {
      const elements = tocEntries.map(entry => document.getElementById(entry.id))
      const scrollPos = window.scrollY + 120

      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i]
        if (el && el.offsetTop <= scrollPos) {
          setActiveHeading(tocEntries[i].id)
          return
        }
      }
      setActiveHeading("")
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [tocEntries])

  // Zen Mode toggle logic
  useEffect(() => {
    if (isZenMode) {
      document.body.classList.add("focus-mode")
    } else {
      document.body.classList.remove("focus-mode")
    }

    return () => {
      document.body.classList.remove("focus-mode")
    }
  }, [isZenMode])

  const handleComplete = async () => {
    setIsSaving(true)
    try {
      await completeLesson(lesson.id)
      setSuccessState(true)
      showToast("Lektion erfolgreich abgeschlossen! 🎓", "success")
    } catch (err) {
      console.error("Fehler beim Abschließen der Lektion:", err)
      showToast("Abschluss fehlgeschlagen.", "error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleUndoComplete = async () => {
    setIsSaving(true)
    try {
      await undoCompleteLesson(lesson.id)
      setSuccessState(false)
      showToast("Lernfortschritt zurückgesetzt.", "info")
    } catch (err) {
      console.error("Fehler beim Zurücksetzen der Lektion:", err)
      showToast("Zurücksetzen fehlgeschlagen.", "error")
    } finally {
      setIsSaving(false)
    }
  }

  const handleBookmarkToggle = async () => {
    try {
      const res = await toggleBookmark(lesson.id)
      setBookmarked(res.bookmarked)
      if (res.bookmarked) {
        showToast("Lesezeichen hinzugefügt!", "success")
      } else {
        showToast("Lesezeichen entfernt.", "info")
      }
    } catch (err) {
      console.error("Fehler beim Lesezeichen setzen:", err)
      showToast("Fehler beim Verwalten des Lesezeichens.", "error")
    }
  }

  const handleNoteSave = async () => {
    setIsSavingNote(true)
    setNoteSavedSuccess(false)
    try {
      await saveLessonNote(lesson.id, noteContent)
      setNoteSavedSuccess(true)
      showToast("Deine Notiz wurde gespeichert!", "success")
      // Reset success indicator after 3 seconds
      setTimeout(() => setNoteSavedSuccess(false), 3000)
    } catch (err) {
      console.error("Fehler beim Speichern der Notiz:", err)
      showToast("Fehler beim Speichern der Notiz.", "error")
    } finally {
      setIsSavingNote(false)
    }
  }

  const NotesWidget = () => (
    <div className="bg-surface border border-border rounded-2xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-muted uppercase tracking-wider flex items-center gap-1.5">
          <i className="ph ph-note-pencil text-sm"></i> Deine Notizen
        </h3>
        {noteSavedSuccess && (
          <span className="text-[10px] text-success font-bold flex items-center gap-1 animate-pulse">
            <i className="ph ph-check-circle"></i> Gespeichert
          </span>
        )}
      </div>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Schreibe hier deine persönlichen Gedanken oder Notizen zu dieser Lektion..."
        className="w-full h-32 bg-background/50 border border-border rounded-xl p-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground resize-none leading-relaxed"
      />
      <button
        onClick={handleNoteSave}
        disabled={isSavingNote}
        className="w-full py-2 bg-background hover:bg-border/40 border border-border disabled:opacity-50 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 text-foreground cursor-pointer"
      >
        {isSavingNote ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-muted border-t-transparent rounded-full animate-spin"></div>
            <span>Wird gespeichert...</span>
          </>
        ) : (
          <>
            <i className="ph ph-floppy-disk text-sm"></i>
            <span>Notiz speichern</span>
          </>
        )}
      </button>
    </div>
  )

  return (
    <div className={`space-y-8 ${isZenMode ? "max-w-5xl mx-auto py-12 px-4" : "animate-fade-in"}`}>
      {/* Breadcrumb - hide in zen mode */}
      {!isZenMode && (
        <nav className="flex items-center gap-2 text-sm text-muted">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <i className="ph ph-squares-four"></i> Dashboard
          </Link>
          <i className="ph ph-caret-right text-xs"></i>
          <Link href={`/subjects/${lesson.subjectId}`} className="hover:text-primary transition-colors">
            {subject.title}
          </Link>
          <i className="ph ph-caret-right text-xs"></i>
          <span className="text-foreground font-medium truncate">{lesson.title}</span>
        </nav>
      )}

      {/* Lesson Header block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
            <span style={{ color: subject.color }}>{subject.title}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <i className="ph ph-clock"></i> ca. {readingTime} {readingTime === 1 ? 'Minute' : 'Minuten'} Lesezeit
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">{lesson.title}</h1>
        </div>

        {/* Action Controls: Bookmark, Zen Mode */}
        <div className="flex items-center gap-3.5 shrink-0 w-full sm:w-auto">
          {/* Bookmark Button */}
          <button
            onClick={handleBookmarkToggle}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              bookmarked 
                ? "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20 shadow-sm" 
                : "bg-surface hover:bg-border/30 border-border text-muted hover:text-foreground"
            }`}
            title={bookmarked ? "Lesezeichen entfernen" : "Lesezeichen setzen"}
          >
            <i className={`text-xl ${bookmarked ? "ph-fill ph-bookmark" : "ph ph-bookmark"}`}></i>
          </button>

          {/* Zen Mode Button */}
          <button
            onClick={() => setIsZenMode(!isZenMode)}
            className={`h-10 px-4 rounded-xl border border-border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              isZenMode 
                ? "bg-primary text-white border-primary" 
                : "bg-surface hover:bg-border/30 text-muted hover:text-foreground"
            }`}
            title={isZenMode ? "Zen-Modus beenden" : "Zen-Modus aktivieren"}
          >
            <i className={`ph ${isZenMode ? "ph-eye-closed" : "ph-eye"}`}></i>
            <span>Zen-Modus</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {/* Article Body */}
        <div className="flex-1 min-w-0 prose dark:prose-invert max-w-none text-foreground space-y-6 leading-relaxed w-full">
          {lesson.contentRaw.trim().startsWith("<") ? (
            <div dangerouslySetInnerHTML={{ __html: lesson.contentRaw }} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h2: ({ children }: any) => {
                  const text = String(children)
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  return (
                    <h2 id={id} className="text-2xl font-extrabold mt-10 mb-4 pb-1 border-b border-border/60 flex items-center gap-2">
                      {children}
                    </h2>
                  )
                },
                h3: ({ children }: any) => (
                  <h3 className="text-xl font-bold mt-6 mb-3 text-foreground/90">{children}</h3>
                ),
                p: ({ children }: any) => (
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }: any) => (
                  <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-foreground/80 my-4">{children}</ul>
                ),
                ol: ({ children }: any) => (
                  <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-foreground/80 my-4">{children}</ol>
                ),
                li: ({ children }: any) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                code({ node, inline, className, children, ...props }: any) {
                  return (
                    <code className="bg-background border border-border px-1.5 py-0.5 rounded text-primary text-xs font-mono">
                      {children}
                    </code>
                  )
                },
                pre({ children }: any) {
                  return (
                    <pre className="p-4 bg-background border border-border rounded-2xl font-mono text-xs overflow-x-auto my-6 max-w-full leading-relaxed shadow-inner">
                      {children}
                    </pre>
                  )
                },
                // Inject code-playgrounds directly inside lesson content!
                playground: ({ node, ...props }: any) => {
                  return (
                    <Playground 
                      initialHtml={props.html}
                      initialCss={props.css}
                      initialJs={props.js}
                      title={props.title}
                    />
                  )
                }
              } as any}
            >
              {lesson.contentRaw}
            </ReactMarkdown>
          )}

          {/* Collapsible Mobile-Only Notes Widget (hidden on XL screen with sidebar unless Zen Mode is active) */}
          {(isZenMode || tocEntries.length === 0) ? (
            <div className="pt-8">
              <NotesWidget />
            </div>
          ) : (
            <div className="xl:hidden pt-8">
              <NotesWidget />
            </div>
          )}

          {/* Complete Lesson bar */}
          <div className="pt-8 mt-12 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-base">Lektion abschließen</h4>
              <p className="text-xs text-muted">
                {successState 
                  ? "Du hast diese Lektion bereits abgeschlossen." 
                  : "Markiere diese Lektion als gelernt, um deinen Lernfortschritt zu speichern."}
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link 
                href={`/subjects/${lesson.subjectId}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border text-center text-xs font-bold hover:bg-border/30 transition-all shrink-0 text-foreground"
              >
                Zurück zur Liste
              </Link>
              
              {!successState ? (
                <button
                  disabled={isSaving}
                  onClick={handleComplete}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0 shadow-lg shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSaving ? "Wird gespeichert..." : "Als abgeschlossen markieren"} <i className="ph ph-check text-sm"></i>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <div className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-success/10 text-success border border-success/20 text-xs font-bold flex items-center justify-center gap-1.5 shrink-0">
                    <i className="ph-fill ph-check-circle text-lg"></i> Gelernt
                  </div>
                  <button
                    disabled={isSaving}
                    onClick={handleUndoComplete}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-dashed border-border hover:border-danger/40 hover:bg-danger/5 hover:text-danger text-muted hover:text-danger text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Abschluss rückgängig machen"
                  >
                    <i className="ph ph-arrow-counter-clockwise text-sm"></i>
                    <span>Rückgängig</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets Column (Table of Contents & Notes) - hide in zen mode */}
        {!isZenMode && (
          <aside className="w-72 shrink-0 hidden xl:flex flex-col gap-6 sticky top-24 self-start">
            {/* Table of Contents Widget */}
            {tocEntries.length > 0 && (
              <div className="bg-surface border border-border rounded-2xl p-5 space-y-3.5 shadow-sm">
                <h3 className="text-xs font-extrabold text-muted uppercase tracking-wider">Inhaltsverzeichnis</h3>
                <nav className="flex flex-col gap-2.5">
                  {tocEntries.map((entry) => (
                    <a
                      key={entry.id}
                      href={`#${entry.id}`}
                      className={`text-xs font-semibold leading-relaxed transition-all pl-1.5 border-l-2 hover:text-primary ${
                        activeHeading === entry.id
                          ? "border-primary text-primary font-bold"
                          : "border-transparent text-muted"
                      }`}
                    >
                      {entry.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Notes Widget */}
            <NotesWidget />
          </aside>
        )}
      </div>
    </div>
  )
}
