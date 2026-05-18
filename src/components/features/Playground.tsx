"use client"

import { useState, useEffect } from "react"

interface PlaygroundProps {
  initialHtml?: string
  initialCss?: string
  initialJs?: string
  title?: string
}

export function Playground({
  initialHtml = "<h1>Hallo Welt!</h1>\n<p>Bearbeite diesen Code, um das Ergebnis live zu sehen.</p>",
  initialCss = "body {\n  font-family: sans-serif;\n  background-color: #f0fdf4;\n  color: #166534;\n  padding: 20px;\n  text-align: center;\n}\nh1 {\n  color: #15803d;\n}",
  initialJs = "console.log('Hallo aus dem Playground!');",
  title = "Interaktiver Code-Playground"
}: PlaygroundProps) {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [js, setJs] = useState(initialJs)
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html")
  const [srcDoc, setSrcDoc] = useState("")

  // Generate combined preview document with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      const compiled = `
        <!DOCTYPE html>
        <html lang="de">
          <head>
            <meta charset="UTF-8">
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script>
              // Capturing console errors to show in the preview
              window.onerror = function(message, source, lineno, colno, error) {
                const errorBox = document.createElement('div');
                errorBox.style.color = '#ef4444';
                errorBox.style.background = '#fef2f2';
                errorBox.style.border = '1px solid #fee2e2';
                errorBox.style.padding = '12px';
                errorBox.style.margin = '16px 0';
                errorBox.style.borderRadius = '8px';
                errorBox.style.fontFamily = 'monospace';
                errorBox.style.fontSize = '13px';
                errorBox.innerHTML = '<strong>Laufzeitfehler:</strong> ' + message;
                document.body.appendChild(errorBox);
                return false;
              };
              
              try {
                ${js}
              } catch (err) {
                console.error(err);
              }
            </script>
          </body>
        </html>
      `
      setSrcDoc(compiled)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [html, css, js])

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-surface shadow-sm my-6 flex flex-col md:h-[450px] h-[600px] animate-fade-in">
      {/* Top Header */}
      <div className="bg-background/80 px-5 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-danger/80"></span>
            <span className="w-3 h-3 rounded-full bg-warning/80"></span>
            <span className="w-3 h-3 rounded-full bg-success/80"></span>
          </div>
          <span className="text-xs font-semibold text-muted ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              setHtml(initialHtml)
              setCss(initialCss)
              setJs(initialJs)
            }}
            className="text-[11px] font-bold px-2.5 py-1 rounded bg-background hover:bg-border border border-border text-muted hover:text-foreground transition flex items-center gap-1"
            title="Code zurücksetzen"
          >
            <i className="ph ph-arrow-counter-clockwise"></i> Zurücksetzen
          </button>
        </div>
      </div>

      {/* Editor & Preview Pane */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Code Editor Column */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-border min-h-0">
          {/* Tabs */}
          <div className="flex bg-background/50 border-b border-border text-xs">
            <button
              onClick={() => setActiveTab("html")}
              className={`px-4 py-2.5 font-bold transition flex items-center gap-1.5 border-b-2 ${
                activeTab === "html"
                  ? "border-primary text-primary bg-surface"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <i className="ph ph-code text-sm text-orange-500"></i> HTML
            </button>
            <button
              onClick={() => setActiveTab("css")}
              className={`px-4 py-2.5 font-bold transition flex items-center gap-1.5 border-b-2 ${
                activeTab === "css"
                  ? "border-primary text-primary bg-surface"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <i className="ph ph-paint-brush text-sm text-blue-500"></i> CSS
            </button>
            <button
              onClick={() => setActiveTab("js")}
              className={`px-4 py-2.5 font-bold transition flex items-center gap-1.5 border-b-2 ${
                activeTab === "js"
                  ? "border-primary text-primary bg-surface"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <i className="ph ph-file-js text-sm text-yellow-500"></i> JS
            </button>
          </div>

          {/* Text Area Input */}
          <div className="flex-1 relative min-h-0">
            {activeTab === "html" && (
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm bg-surface text-foreground focus:outline-none resize-none overflow-y-auto leading-relaxed"
                placeholder="Schreibe hier dein HTML..."
                spellCheck="false"
              />
            )}
            {activeTab === "css" && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm bg-surface text-foreground focus:outline-none resize-none overflow-y-auto leading-relaxed"
                placeholder="Schreibe hier dein CSS..."
                spellCheck="false"
              />
            )}
            {activeTab === "js" && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                className="w-full h-full p-4 font-mono text-sm bg-surface text-foreground focus:outline-none resize-none overflow-y-auto leading-relaxed"
                placeholder="Schreibe hier dein JavaScript..."
                spellCheck="false"
              />
            )}
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="bg-gray-100 text-[10px] font-bold text-gray-500 px-4 py-1.5 border-b border-gray-200 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            LIVE-VORSCHAU
          </div>
          <div className="flex-1 min-h-0 relative">
            <iframe
              srcDoc={srcDoc}
              title="Code Playground Live Preview"
              sandbox="allow-scripts"
              className="w-full h-full border-none bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
