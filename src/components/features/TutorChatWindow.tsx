"use client"

import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { useToast } from "@/context/ToastContext"

interface TutorChatWindowProps {
  isOpen: boolean
  onClose: () => void
  lessonTitle: string
  lessonContent: string
}

export function TutorChatWindow({
  isOpen,
  onClose,
  lessonTitle,
  lessonContent,
}: TutorChatWindowProps) {
  const { showToast } = useToast()
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isSendingChat, setIsSendingChat] = useState(false)

  // Drag-and-drop state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const positionRef = useRef({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset position when opened
    if (isOpen) {
      setPosition({ x: 0, y: 0 })
      positionRef.current = { x: 0, y: 0 }
    }
  }, [isOpen])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return // Only left click
    const target = e.target as HTMLElement
    if (target.closest("button") || target.closest("input") || target.closest("a") || target.closest("i")) return

    setIsDragging(true)
    dragStartRef.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    }
    e.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const newX = e.clientX - dragStartRef.current.x
      const newY = e.clientY - dragStartRef.current.y
      
      positionRef.current = { x: newX, y: newY }
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isSendingChat) return

    const userMsg = chatInput.trim()
    setChatInput("")

    const newMessages = [...chatMessages, { role: "user" as const, content: userMsg }]
    setChatMessages(newMessages)
    setIsSendingChat(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonTitle,
          lessonContent,
          messages: newMessages,
        }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setChatMessages([...newMessages, { role: "assistant" as const, content: data.reply }])
    } catch (err) {
      console.error(err)
      showToast("KI-Antwort konnte nicht geladen werden.", "error")
    } finally {
      setIsSendingChat(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={windowRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        cursor: isDragging ? "grabbing" : "default",
      }}
      className="fixed right-6 bottom-6 z-[9999] w-[calc(100vw-32px)] sm:w-[380px] h-[550px] bg-surface/90 dark:bg-slate-900/90 backdrop-blur-xl border border-border/80 dark:border-slate-800 shadow-2xl rounded-2xl flex flex-col transition-shadow duration-200 overflow-hidden animate-fade-in"
    >
      {/* Header (Drag Handle) */}
      <div
        onMouseDown={handleMouseDown}
        className="py-3.5 px-4 border-b border-border/60 dark:border-slate-800/80 flex items-center justify-between bg-surface/40 dark:bg-slate-950/40 select-none cursor-grab active:cursor-grabbing shrink-0"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary dark:bg-primary/20 flex items-center justify-center font-bold text-sm">
            🤖
          </div>
          <div>
            <h3 className="font-extrabold text-xs tracking-tight text-foreground dark:text-slate-100">
              KI-Lektionstutor
            </h3>
            <p className="text-[9px] text-muted dark:text-slate-400 font-semibold truncate max-w-[200px]">
              Aktiv für: {lessonTitle}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted hover:text-foreground dark:text-slate-400 dark:hover:text-slate-100 p-1.5 rounded-xl hover:bg-border/40 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <i className="ph ph-x text-base"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0 bg-background/10 dark:bg-slate-950/10 select-text">
        {chatMessages.length === 0 ? (
          <div className="text-center py-10 px-4 space-y-2">
            <span className="text-3xl block animate-bounce">👋</span>
            <p className="font-bold text-sm text-foreground dark:text-slate-200">
              Frage den KI-Tutor!
            </p>
            <p className="text-[10px] text-muted dark:text-slate-400 leading-relaxed max-w-[200px] mx-auto">
              Hast du Fragen zum Code, Konzepten oder suchst nach Beispielen? Ich helfe dir sofort weiter.
            </p>
          </div>
        ) : (
          chatMessages.map((msg, idx) => {
            const isBot = msg.role === "assistant"
            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[88%] ${
                  isBot ? "self-start items-start animate-fade-in" : "self-end items-end ml-auto"
                }`}
              >
                <span className="text-[9px] text-muted dark:text-slate-500 font-bold mb-0.5 px-1 uppercase tracking-wider">
                  {isBot ? "KI-TUTOR" : "DU"}
                </span>
                <div
                  className={`py-2 px-3 rounded-xl space-y-1.5 border shadow-sm ${
                    isBot
                      ? "bg-surface dark:bg-slate-850 border-border/80 dark:border-slate-800 text-foreground dark:text-slate-200 rounded-tl-none"
                      : "bg-primary border-primary text-white rounded-tr-none"
                  }`}
                >
                  {isBot ? (
                    <div className="max-w-none text-foreground dark:text-slate-200 text-xs leading-relaxed space-y-1">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          p: ({ children }) => (
                            <p className="text-xs text-foreground/95 dark:text-slate-300 leading-relaxed font-medium">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-4 space-y-1 text-xs my-1 font-medium text-foreground/90 dark:text-slate-300">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-4 space-y-1 text-xs my-1 font-medium text-foreground/90 dark:text-slate-300">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed font-medium">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-extrabold text-primary dark:text-primary-light">
                              {children}
                            </strong>
                          ),
                          code: ({ children }) => (
                            <code className="bg-background dark:bg-slate-950 border border-border/80 dark:border-slate-800/80 px-1 py-0.5 rounded text-primary dark:text-primary/90 text-[10px] font-mono font-bold">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="p-2.5 bg-background dark:bg-slate-950 border border-border/80 dark:border-slate-800/80 rounded-xl font-mono text-[10px] overflow-x-auto my-1.5 max-w-full leading-relaxed shadow-inner">
                              {children}
                            </pre>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap text-xs font-semibold leading-relaxed">
                      {msg.content}
                    </p>
                  )}
                </div>
              </div>
            )
          })
        )}

        {/* Shimmer loading skeleton */}
        {isSendingChat && (
          <div className="flex flex-col max-w-[88%] self-start items-start animate-pulse">
            <span className="text-[9px] text-muted dark:text-slate-500 font-bold mb-0.5 px-1 tracking-wider">
              KI-TUTOR
            </span>
            <div className="py-2 px-3 rounded-xl bg-surface dark:bg-slate-850 border border-border/80 dark:border-slate-800 text-foreground rounded-tl-none space-y-1.5 w-40 shadow-sm">
              <div className="h-2.5 bg-border/60 dark:bg-slate-700/60 rounded w-5/6"></div>
              <div className="h-2.5 bg-border/60 dark:bg-slate-700/60 rounded w-3/4"></div>
              <div className="h-2.5 bg-border/60 dark:bg-slate-700/60 rounded w-1/2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="py-2.5 px-3 border-t border-border/60 dark:border-slate-800 bg-surface/60 dark:bg-slate-900/60 backdrop-blur-md sticky bottom-0 shrink-0">
        <form
          onSubmit={handleSendChat}
          className="flex items-center gap-1.5 bg-background dark:bg-slate-950 border border-border/80 dark:border-slate-800 rounded-xl p-1 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all"
        >
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Frage stellen..."
            disabled={isSendingChat}
            className="flex-1 bg-transparent px-2 py-1 text-[11px] font-semibold focus:outline-none text-foreground dark:text-slate-150 placeholder:text-muted dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isSendingChat}
            className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center transition-all hover:bg-primary/95 disabled:opacity-40 disabled:hover:bg-primary cursor-pointer shrink-0"
          >
            <i className="ph ph-paper-plane-right text-xs"></i>
          </button>
        </form>
      </div>
    </div>
  )
}
