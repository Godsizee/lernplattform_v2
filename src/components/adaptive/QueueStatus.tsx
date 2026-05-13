'use client'

import { useEffect, useState } from 'react'

interface QueueStatusData {
  waiting: number
  processing: boolean
}

interface Props {
  /** Nur pollen wenn active=true (d.h. eine LLM-Anfrage läuft gerade) */
  active: boolean
}

/**
 * Zeigt dem User den aktuellen Queue-Status während auf die KI gewartet wird.
 * Pollt /api/adaptive/queue/status solange active=true.
 */
export default function QueueStatus({ active }: Props) {
  const [status, setStatus] = useState<QueueStatusData | null>(null)

  useEffect(() => {
    if (!active) {
      setStatus(null)
      return
    }

    let cancelled = false

    const poll = async () => {
      try {
        const res = await fetch('/api/adaptive/queue/status')
        if (res.ok && !cancelled) {
          setStatus(await res.json())
        }
      } catch {
        // Polling-Fehler ignorieren — nur UI, kein kritischer Pfad
      }
    }

    poll()
    const id = setInterval(poll, 1500)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [active])

  if (!active || !status) return null

  const { waiting, processing } = status

  if (!processing && waiting === 0) return null

  return (
    <p className="mt-1 text-xs text-gray-400 dark:text-slate-500" role="status" aria-live="polite">
      KI denkt nach…
    </p>
  )
}
