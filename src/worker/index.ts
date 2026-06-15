import { InMemoryJobQueue } from '@/infrastructure/queue/in-memory-queue.adapter'
import { processDocumentHandler } from './handlers/process-document.handler'

export function startWorker(queue: InMemoryJobQueue): void {
  queue.register('PROCESS_DOCUMENT', processDocumentHandler)
  console.log('[Worker] Gestartet — Handler registriert: PROCESS_DOCUMENT')
}
