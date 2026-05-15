/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { TutorChatWindow } from "@/components/features/TutorChatWindow"

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

  // AI summary states
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [summary, setSummary] = useState("")
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)

  // AI chat states
  const [isChatOpen, setIsChatOpen] = useState(false)

  // PDF export states
  const [isExporting, setIsExporting] = useState(false)
  const [isExportingSummary, setIsExportingSummary] = useState(false)

  const handleGenerateSummary = async () => {
    setIsSummaryOpen(true)
    if (summary) return

    setIsGeneratingSummary(true)
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonTitle: lesson.title,
          lessonContent: lesson.contentRaw
        })
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSummary(data.summary)
    } catch (err) {
      console.error(err)
      showToast("Zusammenfassung konnte nicht geladen werden.", "error")
      setIsSummaryOpen(false)
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  const handleExportLesson = async () => {
    if (isExporting) return
    setIsExporting(true)
    try {
      console.log("Starting Lesson PDF Export (High-Fidelity Image Mode)...")
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      document.body.classList.add("export-pdf-rendering")
      await new Promise(resolve => setTimeout(resolve, 600))

      const element = document.getElementById("lesson-pdf-content")
      if (!element) throw new Error("Export-Inhalt nicht gefunden.")

      // 1. Capture as high-res image
      console.log("Capturing element as image...")
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // High resolution for sharp text
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 800,
        onclone: (clonedDoc) => {
          // EMERGENCY FIX for oklch/oklab errors in html2canvas
          // We remove or replace all occurrences of modern color functions in stylesheets
          const styleSheets = Array.from(clonedDoc.styleSheets);
          styleSheets.forEach(sheet => {
            try {
              const rules = Array.from(sheet.cssRules);
              rules.forEach((rule, idx) => {
                if (rule.cssText.includes('oklch') || rule.cssText.includes('oklab') || rule.cssText.includes('color-mix')) {
                  // If a rule contains problematic colors, we attempt to delete it 
                  // or replace it with a sanitized version.
                  // For safety, we just comment it out/empty it in the clone
                  try {
                    sheet.deleteRule(idx);
                  } catch (e) {
                    // Fallback if rule deletion fails
                  }
                }
              });
            } catch (e) {
              // Ignore cross-origin stylesheet errors
            }
          });
          
          // Force a simple stylesheet for the clone
          const safeStyle = clonedDoc.createElement('style');
          safeStyle.innerHTML = `
            * { 
              color: #0f172a !important; 
              border-color: #e2e8f0 !important; 
              background-image: none !important;
              box-shadow: none !important;
              text-shadow: none !important;
            }
            .text-primary { color: #8b5cf6 !important; }
            .bg-primary { background-color: #8b5cf6 !important; }
          `;
          clonedDoc.head.appendChild(safeStyle);
        }
      })

      const imgData = canvas.toDataURL("image/jpeg", 0.95)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      })

      const filename = `${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-lektion.pdf`
      
      // 2. Calculate dimensions to fit A4
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      console.log("Adding images to PDF pages...")
      // First page
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Additional pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      console.log("Saving PDF...")
      pdf.save(filename)
      
      document.body.classList.remove("export-pdf-rendering")
      setIsExporting(false)
      showToast("Lektion erfolgreich als PDF exportiert!", "success")
    } catch (err) {
      console.error("PDF-Export Fehler:", err)
      document.body.classList.remove("export-pdf-rendering")
      setIsExporting(false)
      showToast("PDF-Export fehlgeschlagen.", "error")
    }
  }

  const handleExportSummary = async () => {
    if (isExportingSummary) return
    setIsExportingSummary(true)
    try {
      console.log("Starting Summary PDF Export (High-Fidelity Image Mode)...")
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      document.body.classList.add("export-pdf-rendering")
      await new Promise(resolve => setTimeout(resolve, 600))

      const element = document.getElementById("summary-pdf-content")
      if (!element) throw new Error("Spickzettel-Inhalt nicht gefunden.")

      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 800,
        onclone: (clonedDoc) => {
          // Same safety fix for summary
          const safeStyle = clonedDoc.createElement('style');
          safeStyle.innerHTML = `
            * { 
              color: #0f172a !important; 
              border-color: #e2e8f0 !important; 
              background-image: none !important;
              box-shadow: none !important;
            }
          `;
          clonedDoc.head.appendChild(safeStyle);
        }
      })

      const imgData = canvas.toDataURL("image/jpeg", 0.95)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      })

      const filename = `${lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-spickzettel.pdf`
      
      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(filename)
      
      document.body.classList.remove("export-pdf-rendering")
      setIsExportingSummary(false)
      showToast("KI-Spickzettel erfolgreich als PDF exportiert!", "success")
    } catch (err) {
      console.error("Spickzettel-Export Fehler:", err)
      document.body.classList.remove("export-pdf-rendering")
      setIsExportingSummary(false)
      showToast("Spickzettel-Export fehlgeschlagen.", "error")
    }
  }


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

  const notesWidgetNode = (
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
    <>
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

        {/* Lesson Wrapper with ID for high-fidelity PDF Generation */}
        <div id="lesson-pdf-content" className="space-y-8">
          {/* Lesson Header block */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
                <span className="subject-title-display" style={{ color: subject.color }}>{subject.title}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <i className="ph ph-clock"></i> ca. {readingTime} {readingTime === 1 ? 'Minute' : 'Minuten'} Lesezeit
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{lesson.title}</h1>
            </div>

            {/* Action Controls: Bookmark, Zen Mode, Chat - Hidden on PDF export */}
            <div className="flex items-center gap-3.5 shrink-0 w-full sm:w-auto no-pdf-export">
              {/* KI-Tutor Sidebar Button */}
              <button
                onClick={() => setIsChatOpen(true)}
                className="h-10 px-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="KI-Tutor Chat öffnen"
              >
                <i className="ph ph-chat-centered-dots text-base"></i>
                <span>Tutor fragen 🤖</span>
              </button>

              {/* PDF Export Button */}
              <button
                onClick={handleExportLesson}
                disabled={isExporting}
                className="h-10 px-4 rounded-xl border border-border bg-surface hover:bg-border/30 text-muted hover:text-foreground text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Lektion als PDF herunterladen"
              >
                {isExporting ? (
                  <div className="w-3.5 h-3.5 border-2 border-muted border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <i className="ph ph-file-pdf text-base"></i>
                )}
                <span>Exportieren 📄</span>
              </button>

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
              {/* KI-Zusammenfassung (Spickzettel) Section */}
              <div className="not-prose mb-6 no-pdf-export">
                {!isSummaryOpen ? (
                  <button
                    onClick={handleGenerateSummary}
                    className="px-4 py-2.5 rounded-xl border border-border bg-surface/40 hover:bg-surface text-xs font-bold text-foreground transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <i className="ph ph-lightning text-warning text-sm"></i>
                    <span>Zusammenfassung generieren (Spickzettel) ⚡</span>
                  </button>
                ) : (
                  <div className="bg-surface/50 backdrop-blur-md border border-border/80 rounded-2xl p-5 md:p-6 shadow-md space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                      <div className="flex items-center gap-2 text-warning">
                        <i className="ph-fill ph-lightning text-lg"></i>
                        <h3 className="text-sm font-black tracking-wide uppercase">⚡ KI-Spickzettel</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Download Spickzettel PDF Button */}
                        <button
                          onClick={handleExportSummary}
                          disabled={isExportingSummary}
                          className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-border/30 text-[10px] font-bold text-foreground transition-all flex items-center gap-1.5 cursor-pointer"
                          title="Spickzettel als PDF herunterladen"
                        >
                          {isExportingSummary ? (
                            <div className="w-3 h-3 border-2 border-muted border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <i className="ph ph-file-pdf text-xs"></i>
                          )}
                          <span>PDF Speichern ⚡</span>
                        </button>
                        <button
                          onClick={() => setIsSummaryOpen(false)}
                          className="text-muted hover:text-foreground p-1 rounded-lg hover:bg-border/30 transition cursor-pointer"
                          title="Schließen"
                        >
                          <i className="ph ph-x text-base"></i>
                        </button>
                      </div>
                    </div>

                  {isGeneratingSummary ? (
                    <div className="space-y-4 py-3">
                      <div className="flex items-center gap-2.5 text-xs text-muted font-bold">
                        <div className="w-4 h-4 border-2 border-warning border-t-transparent rounded-full animate-spin shrink-0"></div>
                        <span>Etwas Geduld bitte. Deine Zusammenfassung wird gerade erstellt...</span>
                      </div>
                      <div className="space-y-2.5 animate-pulse">
                        <div className="h-3.5 bg-border/60 rounded-md w-3/4"></div>
                        <div className="h-3.5 bg-border/60 rounded-md w-5/6"></div>
                        <div className="h-3.5 bg-border/60 rounded-md w-2/3"></div>
                        <div className="h-3.5 bg-border/60 rounded-md w-4/5"></div>
                        <div className="h-3.5 bg-border/60 rounded-md w-1/2"></div>
                      </div>
                    </div>
                  ) : (
                    <div id="summary-pdf-content" className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-foreground/80 space-y-2">
                      {/* Header that only displays during PDF export */}
                      <div className="hidden pdf-only-title mb-6 pb-4 border-b border-border">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">⚡ KI-Spickzettel (Zusammenfassung)</span>
                        <h2 className="text-2xl font-black text-foreground mt-1 mb-0">{lesson.title}</h2>
                      </div>

                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {summary}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              )}
            </div>
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
                  code({ children }: any) {
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
                  playground: ({ ...props }: any) => {
                    return (
                      <div className="no-pdf-export">
                        <Playground 
                          initialHtml={props.html}
                          initialCss={props.css}
                          initialJs={props.js}
                          title={props.title}
                        />
                      </div>
                    )
                  }
                } as any}
              >
                {lesson.contentRaw}
              </ReactMarkdown>
            )}

            {/* Collapsible Mobile-Only Notes Widget (rendered on mobile/tablet or in Zen Mode) */}
            {isZenMode ? (
              <div className="pt-8">
                {notesWidgetNode}
              </div>
            ) : (
              <div className="xl:hidden pt-8">
                {notesWidgetNode}
              </div>
            )}

            {/* Complete Lesson bar */}
            <div className="pt-8 mt-12 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-bold text-base">Lektion abschließen</h4>
                <p className="text-xs text-muted">
                  {successState 
                    ? "Du hast diese Lektion bereits abgeschlossen." 
                    : "Markiere diese Lektion as gelernt, um deinen Lernfortschritt zu speichern."}
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
              {notesWidgetNode}
            </aside>
          )}
        </div>
        </div>
      </div>

      <TutorChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        lessonTitle={lesson.title}
        lessonContent={lesson.contentRaw}
      />
    </>
  )
}

