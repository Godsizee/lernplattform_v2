export type JobType =
  | 'PROCESS_DOCUMENT'
  | 'INDEX_DOCUMENT'
  | 'DELETE_DOCUMENT_INDEX'
  | 'REINDEX_TENANT'
  | 'REBUILD_CONCEPT_GRAPH'
  | 'ROLLUP_USAGE'

export type BackgroundJob<T = unknown> = {
  type: JobType
  tenantId: string
  idempotencyKey: string
  payload: T
}

export interface JobQueue {
  enqueue<T>(job: BackgroundJob<T>): Promise<void>
}
