"use client"

export function BackButton() {
  return (
    <button 
      onClick={() => window.history.back()} 
      className="btn-error-secondary cursor-pointer"
    >
      <i className="ph ph-arrow-counter-clockwise"></i>
      Zurück gehen
    </button>
  )
}
