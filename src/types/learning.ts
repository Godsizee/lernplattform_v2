export interface ExtractedNode {
  title: string
  description: string
}

export interface ExtractedEdge {
  from: string // title des Voraussetzungs-Knotens
  to: string   // title des abhängigen Knotens
}

export interface ExtractedGraph {
  nodes: ExtractedNode[]
  edges: ExtractedEdge[]
}

export interface ExtractedExamQuestion {
  title: string       // Kurzbezeichner, max 60 Zeichen, z.B. "Aufgabe 1 – Quicksort"
  description: string // Welches Konzept/Thema wird geprüft
  question: string    // Vollständiger Aufgabentext
  answer: string      // Musterlösung
}

export interface ExtractedExamGraph {
  questions: ExtractedExamQuestion[]
}

export class LLMAdapterError extends Error {
  constructor(
    message: string,
    public readonly fallback: boolean = true
  ) {
    super(message)
    this.name = 'LLMAdapterError'
  }
}
