import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { llmQueue } from '@/lib/adaptive/llm-queue'

/**
 * GET /api/queue/status
 *
 * Gibt den aktuellen Queue-Status zurück.
 * Wird vom Frontend während laufender LLM-Requests gepollt (~alle 1,5s).
 *
 * Response: { waiting: number, processing: boolean }
 *   waiting:    Anzahl Jobs die noch nicht gestartet wurden
 *   processing: ob gerade ein Job läuft
 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nicht authentifiziert' }, { status: 401 })
  }

  return NextResponse.json(llmQueue.status)
}
