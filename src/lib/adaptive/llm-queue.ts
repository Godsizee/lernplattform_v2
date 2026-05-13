/**
 * LLM-Queue — stellt sicher dass immer nur ein Ollama-Request gleichzeitig läuft.
 *
 * Warum: Ollama läuft lokal auf einer GPU und kann nur einen Inference-Kontext
 * effizient verarbeiten. Parallele Requests führen zu Speicherproblemen und
 * sehr langen Antwortzeiten.
 */

type JobFn<T> = () => Promise<T>

interface Job {
  fn: JobFn<unknown>
  resolve: (value: unknown) => void
  reject: (reason: unknown) => void
}

export class LLMQueue {
  private readonly queue: Job[] = []
  private _processing = false

  enqueue<T>(fn: JobFn<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn: fn as JobFn<unknown>,
        resolve: resolve as (v: unknown) => void,
        reject,
      })
      this.drain()
    })
  }

  private async drain(): Promise<void> {
    if (this._processing || this.queue.length === 0) return

    this._processing = true
    const job = this.queue.shift()!

    try {
      job.resolve(await job.fn())
    } catch (err) {
      job.reject(err)
    } finally {
      this._processing = false
      this.drain()
    }
  }

  get status(): { waiting: number; processing: boolean } {
    return { waiting: this.queue.length, processing: this._processing }
  }
}

/** Singleton — in llm-adapter.ts importieren. */
export const llmQueue = new LLMQueue()
