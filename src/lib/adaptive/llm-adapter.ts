/**
 * LLM Adapter — abstrahiert Ollama (lokal) und Anthropic Claude (Production).
 *
 * Steuerung über Umgebungsvariablen:
 *   OLLAMA_BASE_URL gesetzt → Ollama (OpenAI-kompatible API)
 *   sonst               → Anthropic Claude
 *
 * WICHTIG: Nur server-side verwenden ('use server' oder Route Handler).
 */

import Anthropic from '@anthropic-ai/sdk'
import type { ExtractedGraph, ExtractedExamGraph, ExtractedExamQuestion } from '@/types/learning'
import { LLMAdapterError } from '@/types/learning'
import { jaccardSimilarity } from '@/lib/adaptive/node-similarity'
import { llmQueue } from '@/lib/adaptive/llm-queue'
import prisma from '@/db/client'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LLMOptions {
  /** Strukturierte JSON-Ausgabe anfordern */
  jsonMode?: boolean
  /** Max Output-Tokens (default: 2048) */
  maxTokens?: number
  /** Ollama-Modell überschreiben (ignoriert bei Anthropic) */
  model?: string
  /** Bezeichner der aufrufenden Operation — für Logging */
  operation?: string
  /** Sampling-Temperatur (0.0–2.0, ignoriert bei Anthropic) */
  temperature?: number
}

// ---------------------------------------------------------------------------
// LLM-Call-Logging
// ---------------------------------------------------------------------------

async function logLlmCall(data: {
  model: string
  outputTokens?: number
  promptTokens?: number
  durationMs: number
  operation: string
  error?: string
}) {
  await prisma.llmCallLog.create({
    data: {
      model: data.model,
      outputTokens: data.outputTokens ?? null,
      promptTokens: data.promptTokens ?? null,
      durationMs: data.durationMs,
      operation: data.operation,
      error: data.error ?? null,
    },
  })
}

// ---------------------------------------------------------------------------
// Ollama (lokal)
// ---------------------------------------------------------------------------

async function ollamaChat(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<string> {
  return llmQueue.enqueue(async () => {
    const baseUrl = process.env.OLLAMA_BASE_URL!
    const model = options.model ?? process.env.OLLAMA_MODEL ?? 'qwen3:4b'

    // Qwen3: Thinking-Modus via API-Parameter deaktivieren (think: false).
    // /no_think im Content funktioniert nicht mehr zuverlässig.
    const isQwen3 = model.startsWith('qwen3')

    const ollamaOptions: Record<string, unknown> = {
      num_predict: options.maxTokens ?? 2048,
    }
    if (options.temperature !== undefined) {
      ollamaOptions.temperature = options.temperature
    }

    const body: Record<string, unknown> = {
      model,
      messages,
      stream: false,
      options: ollamaOptions,
    }

    if (isQwen3) {
      body.think = false
    }

    // Ollama JSON-Modus: zwingt das Modell zu valider JSON-Ausgabe
    if (options.jsonMode) {
      body.format = 'json'
    }

    const res = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      throw new Error(`Ollama Fehler: ${res.status} ${res.statusText}`)
    }

    type OllamaNativeResponse = {
      message: { content: string }
      eval_count?: number
      prompt_eval_count?: number
      eval_duration?: number // Nanoseconds
    }
    const data = (await res.json()) as OllamaNativeResponse
    const raw = data.message?.content ?? ''

    // Timing fire-and-forget (kein await — blockiert Request nicht)
    if (data.eval_count && data.eval_duration) {
      const durationMs = Math.round(data.eval_duration / 1_000_000)
      logLlmCall({
        model,
        outputTokens: data.eval_count,
        promptTokens: data.prompt_eval_count,
        durationMs,
        operation: options.operation ?? 'unknown',
      }).catch(() => {})
    }

    // Qwen3 "thinking"-Tags entfernen (<think>...</think>)
    return raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
  })
}

// ---------------------------------------------------------------------------
// Anthropic Claude
// ---------------------------------------------------------------------------

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function anthropicChat(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<string> {
  const systemMessages = messages.filter((m) => m.role === 'system')
  const userMessages = messages.filter((m) => m.role !== 'system')

  const systemPrompt = systemMessages.map((m) => m.content).join('\n\n')

  const anthropicMessages = userMessages.map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  if (options.jsonMode && systemPrompt) {
    // Anthropic hat keinen nativen JSON-Modus — per System-Prompt erzwingen
    anthropicMessages[0] = {
      ...anthropicMessages[0],
      content: `${anthropicMessages[0].content}\n\nAntworte ausschließlich mit validem JSON, ohne Erklärungen.`,
    }
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: options.maxTokens ?? 2048,
    system: systemPrompt || undefined,
    messages: anthropicMessages,
  })

  const block = response.content[0]
  return block.type === 'text' ? block.text : ''
}

// ---------------------------------------------------------------------------
// Öffentliche API
// ---------------------------------------------------------------------------

/**
 * Sendet eine Chat-Nachricht an das konfigurierte LLM.
 * Wählt automatisch Ollama (lokal) oder Anthropic (Production).
 */
export async function chat(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<string> {
  if (process.env.OLLAMA_BASE_URL) {
    return ollamaChat(messages, options)
  }
  return anthropicChat(messages, options)
}

// ---------------------------------------------------------------------------
// Retry-Logik
// ---------------------------------------------------------------------------

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  context?: { operation: string; model: string }
): Promise<T> {
  const startTime = Date.now()
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      if (attempt === maxRetries - 1) {
        if (context) {
          logLlmCall({
            model: context.model,
            durationMs: Date.now() - startTime,
            operation: context.operation,
            error: String(err),
          }).catch(() => {})
        }
        throw new LLMAdapterError(
          `LLM-Aufruf nach ${maxRetries} Versuchen fehlgeschlagen: ${String(err)}`,
          true
        )
      }
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }
  throw new LLMAdapterError('Unerwarteter Fehler in withRetry', true)
}

// ---------------------------------------------------------------------------
// Domänen-Methoden
// ---------------------------------------------------------------------------

const EXTRACT_GRAPH_SYSTEM = `Du bist ein Experte für Wissensstrukturierung. \
Extrahiere Konzeptknoten und Lernabhängigkeiten aus dem gegebenen Lernmaterial.
Das Material kann ein Lehrbuchabschnitt, eine Vorlesungsmitschrift oder eine informelle Schülerzusammenfassung sein.

Antworte ausschließlich mit validem JSON in diesem exakten Format:
{
  "nodes": [
    { "title": "Konzepttitel (max 60 Zeichen)", "description": "3-5 Sätze: Kerninhalt des Konzepts, wichtige Details und Abgrenzung zu verwandten Konzepten" }
  ],
  "edges": [
    { "from": "Titel des Voraussetzungs-Konzepts", "to": "Titel des abhängigen Konzepts" }
  ]
}

Regeln:
- 2 bis 20 Knoten (auch bei kurzen oder informellen Texten mindestens 2 extrahieren)
- Kanten zeigen Lernreihenfolge: "from" muss vor "to" verstanden werden
- Nur Kanten zwischen Knoten die im nodes-Array existieren
- Keine Erklärungen außerhalb des JSON
- Jeder Knoten MUSS ein "title"-Feld haben
- Verwende IMMER Deutsch für Titel und Beschreibungen, unabhängig von der Sprache des Materials`

// ---------------------------------------------------------------------------
// Chunking-Hilfsfunktionen
// ---------------------------------------------------------------------------

const CHUNK_SIZE = 10_000
const CHUNK_OVERLAP = 200
const DEDUP_THRESHOLD = 0.7

/** Teilt Text in Chunks à ~CHUNK_SIZE Zeichen, Schnitt an Absatzgrenzen. */
function chunkText(text: string): string[] {
  if (text.length <= CHUNK_SIZE) return [text]

  const chunks: string[] = []
  let pos = 0

  while (pos < text.length) {
    const end = Math.min(pos + CHUNK_SIZE, text.length)

    // An Absatzgrenze suchen (innerhalb der letzten 500 Zeichen)
    let splitAt = end
    if (end < text.length) {
      const searchFrom = Math.max(pos, end - 500)
      const lastBreak = text.lastIndexOf('\n\n', end)
      if (lastBreak > searchFrom) {
        splitAt = lastBreak + 2
      } else {
        const lastNewline = text.lastIndexOf('\n', end)
        if (lastNewline > searchFrom) splitAt = lastNewline + 1
      }
    }

    chunks.push(text.slice(pos, splitAt))
    if (splitAt >= text.length) break
    pos = splitAt - CHUNK_OVERLAP
    if (pos <= 0) pos = splitAt
  }

  return chunks
}

/** Extrahiert das erste vollständige JSON-Objekt aus einem String (balancierte Klammern). */
function extractFirstJsonObject(text: string): string | null {
  const start = text.indexOf('{')
  if (start < 0) return null
  let depth = 0
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++
    else if (text[i] === '}') {
      depth--
      if (depth === 0) return text.slice(start, i + 1)
    }
  }
  return null
}

/** Extrahiert einen einzelnen Chunk — ohne Retry (wird von extractGraph gesteuert). */
async function extractChunk(chunk: string): Promise<ExtractedGraph> {
  const raw = await chat(
    [
      { role: 'system', content: EXTRACT_GRAPH_SYSTEM },
      { role: 'user', content: chunk },
    ],
    { jsonMode: true, maxTokens: 4096, model: process.env.OLLAMA_MODEL_EXTRACT, operation: 'extractGraph', temperature: 0.1 }
  )

  const jsonStr = extractFirstJsonObject(raw)
  if (!jsonStr) throw new Error('Kein JSON in LLM-Antwort gefunden')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = JSON.parse(jsonStr) as Record<string, any>

  if (!Array.isArray(parsed.nodes) || parsed.nodes.length === 0) {
    throw new Error('LLM hat keine Knoten extrahiert')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalizedNodes = parsed.nodes.map((n: any) => ({
    id: typeof n.id === 'string' ? n.id : undefined,
    title: (n.title ?? n.label ?? n.name ?? '') as string,
    description: (n.description ?? n.desc ?? '') as string,
  }))

  const validNodes = normalizedNodes.filter(
    (n) => typeof n.title === 'string' && n.title.trim().length > 0
  )

  if (validNodes.length === 0) throw new Error('Keine gültigen Knoten')

  const idToTitle = new Map(validNodes.filter((n) => n.id).map((n) => [n.id!, n.title]))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawEdges: Array<{ from: string; to: string }> = Array.isArray(parsed.edges)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? parsed.edges.map((e: any) => ({
        from: idToTitle.get(String(e.from ?? e.source)) ?? String(e.from ?? e.source ?? ''),
        to: idToTitle.get(String(e.to ?? e.target)) ?? String(e.to ?? e.target ?? ''),
      }))
    : []

  return {
    nodes: validNodes.map(({ title, description }) => ({ title, description })),
    edges: rawEdges,
  }
}

/** Führt mehrere Teilgraphen zusammen — dedupliziert Nodes, filtert Edges. */
function mergeGraphs(graphs: ExtractedGraph[]): ExtractedGraph {
  const mergedNodes: Array<{ title: string; description: string }> = []
  // Mapping: original title (lowercase) → canonical title im mergedNodes-Array
  const canonicalMap = new Map<string, string>()

  for (const graph of graphs) {
    for (const node of graph.nodes) {
      const titleNorm = node.title.toLowerCase().trim()

      // Exakte Duplikat-Prüfung
      if (canonicalMap.has(titleNorm)) continue

      // Fuzzy-Duplikat über Jaccard
      const duplicate = mergedNodes.find(
        (existing) => jaccardSimilarity(existing.title, node.title) >= DEDUP_THRESHOLD
      )

      if (duplicate) {
        canonicalMap.set(titleNorm, duplicate.title)
      } else {
        mergedNodes.push({ title: node.title.trim(), description: node.description })
        canonicalMap.set(titleNorm, node.title.trim())
      }
    }
  }

  const validTitles = new Set(mergedNodes.map((n) => n.title.toLowerCase()))

  const resolve = (title: string): string =>
    canonicalMap.get(title.toLowerCase().trim()) ?? title.trim()

  const mergedEdges: Array<{ from: string; to: string }> = []
  const seenEdges = new Set<string>()

  for (const graph of graphs) {
    for (const edge of graph.edges) {
      const from = resolve(edge.from)
      const to = resolve(edge.to)
      const key = `${from.toLowerCase()}→${to.toLowerCase()}`
      if (
        validTitles.has(from.toLowerCase()) &&
        validTitles.has(to.toLowerCase()) &&
        from !== to &&
        !seenEdges.has(key)
      ) {
        mergedEdges.push({ from, to })
        seenEdges.add(key)
      }
    }
  }

  return { nodes: mergedNodes, edges: mergedEdges }
}

/**
 * Extrahiert einen Kompetenzgraphen aus einem Dokumenttext.
 * Bei langen Dokumenten wird automatisch in Chunks aufgeteilt und parallel verarbeitet.
 */
export async function extractGraph(content: string): Promise<ExtractedGraph> {
  // Max 120.000 Zeichen (~120 Seiten) — verhindert OOM bei sehr großen Dokumenten
  const capped = content.length > 120_000 ? content.slice(0, 120_000) : content
  const chunks = chunkText(capped)

  if (chunks.length === 1) {
    // Kurzes Dokument — direkt mit Retry
    const extractCtx = { operation: 'extractGraph', model: process.env.OLLAMA_MODEL_EXTRACT ?? process.env.OLLAMA_MODEL ?? 'qwen3:8b' }
    return withRetry(() => extractChunk(chunks[0]), 3, extractCtx)
  }

  // Chunks sequenziell verarbeiten (GPU hat nur 6GB, Modell belegt ~5GB)
  const extractCtx = { operation: 'extractGraph', model: process.env.OLLAMA_MODEL_EXTRACT ?? process.env.OLLAMA_MODEL ?? 'qwen3:8b' }
  const results: ExtractedGraph[] = []
  for (const chunk of chunks) {
    // Partial-Failure toleriert: einzelner Chunk kann fehlschlagen, restliche Chunks werden weiterverarbeitet
    const result = await withRetry(() => extractChunk(chunk), 2, extractCtx).catch(() => ({ nodes: [], edges: [] } as ExtractedGraph))
    results.push(result)
  }

  const merged = mergeGraphs(results)

  if (merged.nodes.length === 0) {
    throw new LLMAdapterError('LLM hat aus keinem Chunk Knoten extrahiert', true)
  }

  return merged
}

const EXTRACT_EXAM_GRAPH_SYSTEM = `Antworte NUR mit JSON, ohne Text davor oder danach:
{"questions":[{"title":"Aufgabe-Bezeichner (max 60 Zeichen)","description":"Welches Konzept/Thema wird geprüft (1-2 Sätze)","question":"Vollständiger Aufgabentext","answer":"Musterlösung"}]}`

/**
 * Extrahiert echte Klausuraufgaben aus einer Übungsklausur.
 * Jede Frage wird als Konzeptknoten + CachedTask gespeichert.
 */
export async function extractExamGraph(content: string): Promise<ExtractedExamGraph> {
  const truncated = content.length > 12000 ? content.slice(0, 12000) + '\n[Dokument gekürzt]' : content

  return withRetry(async () => {
    const userMessage = `Analysiere diese Klausur. Extrahiere alle Aufgaben auf Deutsch als questions-Array (max 20 Aufgaben):
- title: Kurzer Bezeichner der Aufgabe, max 60 Zeichen (z.B. "Aufgabe 1 – Quicksort")
- description: Welches Konzept/Thema wird geprüft (1-2 Sätze)
- question: Vollständiger Aufgabentext
- answer: Musterlösung

Klausur:
${truncated}`

    const raw = await chat(
      [
        { role: 'system', content: EXTRACT_EXAM_GRAPH_SYSTEM },
        { role: 'user', content: userMessage },
      ],
      { jsonMode: true, maxTokens: 6000, operation: 'extractExamGraph' }
    )

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Kein JSON in LLM-Antwort gefunden')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = JSON.parse(jsonMatch[0]) as Record<string, any>

    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error('LLM hat keine Aufgaben extrahiert — retry')
    }

    const questions: ExtractedExamQuestion[] = parsed.questions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((q: any) =>
        typeof q.question === 'string' && q.question.trim() &&
        typeof q.answer === 'string' && q.answer.trim()
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((q: any) => ({
        title: String(q.title ?? q.label ?? '').trim().slice(0, 60) || 'Aufgabe',
        description: String(q.description ?? q.desc ?? '').trim(),
        question: String(q.question).trim(),
        answer: String(q.answer).trim(),
      }))

    if (questions.length === 0) {
      throw new Error('LLM hat keine gültigen Aufgaben extrahiert — retry')
    }

    return { questions }
  }, 3, { operation: 'extractExamGraph', model: process.env.OLLAMA_MODEL ?? 'qwen3:8b' })
}

/**
 * Hilfsfunktion: sendet eine einfache User-Nachricht mit optionalem System-Prompt.
 */
export async function prompt(
  userMessage: string,
  systemMessage?: string,
  options: LLMOptions = {}
): Promise<string> {
  const messages: ChatMessage[] = []
  if (systemMessage) messages.push({ role: 'system', content: systemMessage })
  messages.push({ role: 'user', content: userMessage })
  return chat(messages, options)
}

// ---------------------------------------------------------------------------
// Hint-System (Story 3.3)
// ---------------------------------------------------------------------------

// System-Prompt pro Hint-Level
const HINT_SYSTEMS: Record<1 | 2 | 3, string> = {
  1: 'You are a Socratic tutor. Output ONLY a single German question (max 10 words) starting with "Was", "Wie", "Warum", "Welche", or "Woran". No code keywords. No explanation. Only the question.',
  2: 'You are a Socratic tutor. Output ONLY a single German sentence starting with "Überlege" or "Denk" that names an aspect to think about — without any implementation detail, code construct, or solution. No "static", "Variable", "Methode", "Klasse", or similar keywords.',
  3: 'You are a Socratic tutor. Output 1-2 German sentences starting with "Denk daran" or "Beachte". Name a direction of thought, not a solution. No code constructs, no implementation steps.',
}

const HINT_MODEL = process.env.OLLAMA_MODEL ?? 'qwen3:8b'

/**
 * Generiert einen Hinweis für eine Aufgabe auf dem angegebenen Level (1–3).
 */
export async function generateHint(
  nodeTitle: string,
  nodeDescription: string,
  taskContent: string,
  hintLevel: 1 | 2 | 3,
  occupation?: string,
  userAnswer?: string,
  ragContext?: string
): Promise<string> {
  return withRetry(async () => {
    const occupationLine = occupation ? `\nBeruflicher Kontext des Lernenden: ${occupation}` : ''
    const answerLine = userAnswer ? `\nBisheriger Ansatz des Lernenden: ${userAnswer}` : ''
    const ragLine = ragContext ? `\n\nRelevante Textpassagen aus dem Lernmaterial:\n${ragContext}` : ''
    const userContent = `Konzept: "${nodeTitle}"\nBeschreibung: ${nodeDescription}\nAufgabe: ${taskContent}${ragLine}${answerLine}${occupationLine}`
    const result = await chat(
      [
        {
          role: 'system',
          content: HINT_SYSTEMS[hintLevel],
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
      { operation: 'generateHint', model: HINT_MODEL, maxTokens: 1024 }
    )
    return result.trim()
  }, 3, { operation: 'generateHint', model: HINT_MODEL })
}

// ---------------------------------------------------------------------------
// Task-Generierung (Story 3.1)
// ---------------------------------------------------------------------------

const GENERATE_TASK_SYSTEM = `Du bist ein Lernassistent. Erstelle eine Anwendungsaufgabe für ein Lernkonzept.

Antworte ausschließlich mit validem JSON:
{
  "task": "Die Aufgabenstellung (1–3 Sätze, offen formuliert, kein Multiple-Choice)",
  "expected_answer": "Die Musterlösung (2–4 Sätze)"
}

Regeln:
- Aufgabe erfordert praktisches Verständnis, nicht nur Faktenwissen
- Keine Ja/Nein-Fragen, keine Multiple-Choice
- Aufgabe und Musterlösung IMMER auf Deutsch, unabhängig von der Sprache des Konzeptnamens
- Aufgabe und Musterlösung auf Deutsch; fachspezifische Begriffe dürfen in ihrer üblichen Schreibweise verwendet werden (z.B. "Stack", "Interface", "Callback")
- Wenn ein beruflicher Kontext des Lernenden angegeben ist: Nutze ihn als thematischen Hintergrund, formuliere die Aufgabe aber allgemein und natürlich — nenne den Beruf NICHT wörtlich in der Aufgabenstellung`

export interface GeneratedTask {
  task: string
  expectedAnswer: string
}

export function buildTaskUserMessage(
  nodeTitle: string,
  nodeDescription: string,
  occupation?: string,
  ragContext?: string
): string {
  const base = `Konzept: "${nodeTitle}"\nBeschreibung: ${nodeDescription}`
  const ragLine = ragContext
    ? `\n\nRelevante Textpassagen aus dem Lernmaterial:\n${ragContext}`
    : ''
  return occupation
    ? `${base}${ragLine}\nBeruflicher Kontext des Lernenden: ${occupation}`
    : `${base}${ragLine}`
}

/**
 * Generiert eine Anwendungsaufgabe für einen Konzeptknoten.
 */
export async function generateTask(
  nodeTitle: string,
  nodeDescription: string,
  occupation?: string,
  ragContext?: string
): Promise<GeneratedTask> {
  return withRetry(async () => {
    const raw = await chat(
      [
        { role: 'system', content: GENERATE_TASK_SYSTEM },
        {
          role: 'user',
          content: buildTaskUserMessage(nodeTitle, nodeDescription, occupation, ragContext),
        },
      ],
      { jsonMode: true, maxTokens: 1024, operation: 'generateTask' }
    )

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Kein JSON in LLM-Antwort')

    const parsed = JSON.parse(jsonMatch[0]) as { task?: string; expected_answer?: string }
    if (!parsed.task || !parsed.expected_answer) {
      throw new Error('LLM-Antwort unvollständig (task oder expected_answer fehlt)')
    }

    return { task: parsed.task, expectedAnswer: parsed.expected_answer }
  }, 3, { operation: 'generateTask', model: process.env.OLLAMA_MODEL ?? 'qwen3:8b' })
}

// ---------------------------------------------------------------------------
// Antwort-Bewertung (Story 3.2)
// ---------------------------------------------------------------------------

const EVALUATE_ANSWER_SYSTEM = `Antworte NUR mit JSON:
{"correct":true,"error_type":null,"explanation":"..."}
{"correct":false,"error_type":"Verständnisfehler"|"Anwendungsfehler"|"Unvollständig","explanation":"..."}`

export interface EvaluationResult {
  correct: boolean
  errorType: string | null
  explanation: string
}

/**
 * Bewertet eine Lernantwort anhand der Musterlösung.
 */
export async function evaluateAnswer(
  nodeTitle: string,
  taskContent: string,
  expectedAnswer: string,
  userAnswer: string
): Promise<EvaluationResult> {
  return withRetry(async () => {
    const raw = await chat(
      [
        { role: 'system', content: EVALUATE_ANSWER_SYSTEM },
        {
          role: 'user',
          content: `Bewerte die Lernantwort nach diesen Regeln:
- Kernkonzept stimmt → correct: true, auch bei unvollständiger Formulierung
- explanation (correct=true): kurzes bestätigendes Feedback (1–2 Sätze)
- explanation (correct=false): KEIN direktes Nennen der richtigen Antwort oder fehlender Begriffe — stattdessen leitende Frage oder Hinweis auf einen zu durchdenkenden Aspekt (max. 3 Sätze)
- Der Referenzinhalt ist ein möglicher Lösungsweg, keine Checkliste

Konzept: "${nodeTitle}"
Aufgabe: ${taskContent}
Referenzinhalt: ${expectedAnswer}
Antwort des Lernenden: ${userAnswer}`,
        },
      ],
      { jsonMode: true, maxTokens: 768, operation: 'evaluateAnswer' }
    )

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Kein JSON in LLM-Antwort')

    const parsed = JSON.parse(jsonMatch[0]) as {
      correct?: boolean
      error_type?: string | null
      explanation?: string
    }

    if (typeof parsed.correct !== 'boolean' || !parsed.explanation) {
      throw new Error('LLM-Bewertung unvollständig')
    }

    return {
      correct: parsed.correct,
      errorType: parsed.error_type ?? null,
      explanation: parsed.explanation,
    }
  }, 3, { operation: 'evaluateAnswer', model: process.env.OLLAMA_MODEL ?? 'qwen3:8b' })
}

// ---------------------------------------------------------------------------
// Erklärung vertiefen (Feedback-Feature)
// ---------------------------------------------------------------------------

const DEEP_EXPLANATION_SYSTEM = `Du bist ein Lernbegleiter. Der Lernende hat eine Aufgabe falsch oder unvollständig beantwortet und eine erste Erklärung erhalten, versteht es aber noch nicht.

REGELN:
- VERBOTEN: die korrekte Antwort, konkrete Lösungswerte oder fehlende Begriffe direkt nennen
- Stattdessen: denselben Fehler anders beleuchten, eine Analogie oder Gegenfrage verwenden
- Wenn ein beruflicher Kontext des Lernenden angegeben ist, nutze eine Analogie aus diesem Berufsfeld
- Maximal 3 Sätze
- Immer auf Deutsch`

/**
 * Generiert eine vertiefende Erklärung wenn der Lernende die erste Erklärung nicht verstanden hat.
 */
export async function generateDeepExplanation(
  nodeTitle: string,
  taskContent: string,
  userAnswer: string,
  previousExplanation: string,
  occupation?: string,
  ragContext?: string
): Promise<string> {
  return withRetry(async () => {
    const occupationLine = occupation ? `\nBeruflicher Kontext des Lernenden: ${occupation}` : ''
    const ragLine = ragContext ? `\n\nRelevante Textpassagen aus dem Lernmaterial:\n${ragContext}` : ''
    const result = await chat(
      [
        { role: 'system', content: DEEP_EXPLANATION_SYSTEM },
        {
          role: 'user',
          content: `Konzept: "${nodeTitle}"${occupationLine}${ragLine}
Aufgabe: ${taskContent}
Antwort des Lernenden: ${userAnswer}
Bisherige Erklärung: ${previousExplanation}`,
        },
      ],
      { maxTokens: 1024, operation: 'generateDeepExplanation', model: HINT_MODEL }
    )
    return result.trim()
  }, 3, { operation: 'generateDeepExplanation', model: HINT_MODEL })
}

// ---------------------------------------------------------------------------
// Assessment — Selbsteinschätzungsfragen
// ---------------------------------------------------------------------------

export interface AssessmentQuestion {
  question: string
  options: string[]    // exakt 4 Antwortmöglichkeiten
  correctIndex: number // 0-basiert
}

const ASSESSMENT_SYSTEM_PROMPT = `Du bist ein Prüfungsexperte. Generiere Multiple-Choice-Fragen zur Selbsteinschätzung.

Regeln:
- Genau 3 Fragen, je 4 Antwortoptionen
- Eine korrekte Antwort pro Frage
- Fragen testen Verständnis, nicht Auswendiglernen
- Antworte NUR mit einem JSON-Array, kein Text davor oder danach
- Format: [{"question":"...","options":["A","B","C","D"],"correctIndex":0}, ...]`

export async function generateAssessmentQuestions(
  nodes: Array<{ title: string; description: string }>
): Promise<AssessmentQuestion[]> {
  const nodeList = nodes
    .map((n, i) => `${i + 1}. ${n.title}: ${n.description.slice(0, 200)}`)
    .join('\n')

  const messages: ChatMessage[] = [
    { role: 'system', content: ASSESSMENT_SYSTEM_PROMPT },
    {
      role: 'user',
      content: `Erstelle 3 Multiple-Choice-Fragen basierend auf diesen Konzepten:\n\n${nodeList}`,
    },
  ]

  const raw = await chat(messages, {
    jsonMode: true,
    maxTokens: 1024,
    operation: 'generateAssessmentQuestions',
  })

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new LLMAdapterError('Assessment-Fragen konnten nicht geparst werden')
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new LLMAdapterError('Ungültiges Format für Assessment-Fragen')
  }

  return (parsed as AssessmentQuestion[]).slice(0, 3)
}
