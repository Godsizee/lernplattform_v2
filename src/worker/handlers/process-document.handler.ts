import type { BackgroundJob } from '@/shared/ports/job-queue.port'

export async function processDocumentHandler(job: BackgroundJob): Promise<void> {
  const payload = job.payload as { documentId?: string }
  console.log(`[Worker] PROCESS_DOCUMENT — tenant=${job.tenantId} document=${payload.documentId ?? '?'}`)
  // Implementierung folgt in PR7 (persistente Queue + Worker)
}
