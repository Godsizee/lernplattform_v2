"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function NotFound() {
  const [pathname, setPathname] = useState("/learning")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname)
    }
  }, [])

  return (
    <div className="error-page">
      <style>{`
        .error-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          background-color: var(--background, #0d1117);
          color: var(--foreground, #e6edf3);
        }

        .error-container {
          max-width: 560px;
          width: 100%;
        }

        .error-code {
          font-family: sans-serif;
          font-size: clamp(6rem, 20vw, 10rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, var(--color-primary, #8b5cf6), var(--color-secondary, #ec4899));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.25rem;
          user-select: none;
          animation: glitch 4s infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); filter: none; }
          92%            { transform: translate(-3px, 1px); filter: hue-rotate(30deg); }
          94%            { transform: translate(3px, -1px); filter: hue-rotate(-30deg); }
          96%            { transform: translate(-2px, 2px); filter: none; }
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          display: block;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }

        .error-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--foreground, #e6edf3);
          margin-bottom: 0.75rem;
        }

        .error-message {
          color: var(--muted, #8b949e);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          font-size: 0.975rem;
        }

        .error-message strong {
          color: var(--foreground, #e6edf3);
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-error-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.925rem;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          background: linear-gradient(135deg, var(--color-primary, #8b5cf6), var(--color-secondary, #ec4899));
          color: #fff;
          border: none;
          cursor: pointer;
        }

        .btn-error-back:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--shadow-color, rgba(139, 92, 246, 0.2));
        }

        .btn-error-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.925rem;
          text-decoration: none;
          color: var(--muted, #8b949e);
          border: 1px solid var(--border, #30363d);
          background: transparent;
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
          cursor: pointer;
        }

        .btn-error-secondary:hover {
          color: var(--foreground, #e6edf3);
          border-color: var(--color-primary, #8b5cf6);
          transform: translateY(-2px);
        }

        .error-hint {
          margin-top: 3rem;
          padding: 1rem 1.5rem;
          background: var(--surface, #161b22);
          border: 1px solid var(--border, #30363d);
          border-radius: 16px;
          font-size: 0.85rem;
          color: var(--muted, #8b949e);
          font-weight: 500;
        }

        .error-hint code {
          font-family: monospace;
          color: var(--color-secondary, #ec4899);
          background: var(--background, #0d1117);
          padding: 0.25em 0.5em;
          border-radius: 6px;
          font-weight: bold;
        }
      `}</style>

      <div className="error-container">
        <span className="error-icon">🗺️</span>
        <div className="error-code">404</div>

        <h1 className="error-title">Diese Seite hat wohl das Studium abgebrochen.</h1>

        <p className="error-message">
          Die URL <strong>{pathname}</strong> existiert nicht – vermutlich schon beim ersten Semester durchgefallen.<br />
          Kein Stress, passiert den Besten. Einfach zurück und weitermachen.
        </p>

        <div className="error-actions">
          <Link href="/" className="btn-error-back">
            <i className="ph ph-arrow-left"></i>
            Zurück zur Hauptseite
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-error-secondary cursor-pointer"
          >
            <i className="ph ph-arrow-counter-clockwise"></i>
            Zurück gehen
          </button>
        </div>

        <div className="error-hint">
          <i className="ph ph-lightbulb"></i> Tipp: Gültige Routen sind z. B. <code>/</code>, <code>/profile</code>, <code>/admin</code> oder ein beliebiges Fach.
        </div>
      </div>
    </div>
  )
}
