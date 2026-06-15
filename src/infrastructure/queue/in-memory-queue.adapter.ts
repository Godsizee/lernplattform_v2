import type { JobQueue, BackgroundJob } from '@/shared/ports/job-queue.port'

type HandlerFn = (job: BackgroundJob) => Promise<void>

class InMemoryJobQueue implements JobQueue {
  private handlers = new Map<string, HandlerFn>()

  register(type: string, handler: HandlerFn): void {
    this.handlers.set(type, handler)
  }

  async enqueue<T>(job: BackgroundJob<T>): Promise<void> {
    const handler = this.handlers.get(job.type)
    if (!handler) {
      console.warn(`[Queue] Kein Handler für Job-Typ: ${job.type}`)
      return
    }
    // Fire-and-forget — Fehler werden geloggt, aber nicht nach oben propagiert
    setImmediate(() => {
      handler(job as BackgroundJob).catch((err) => {
        console.error(`[Queue] Job ${job.type} (${job.idempotencyKey}) fehlgeschlagen:`, err)
      })
    })
  }
}

export const jobQueue: JobQueue = new InMemoryJobQueue()
export { InMemoryJobQueue }
