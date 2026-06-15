export type IndexDocumentInput = {
  tenantId: string
  documentId: string
  text: string
  subjectId?: string
  ownerUserId?: string
  sourceType: 'CATALOG_LESSON' | 'TENANT_DOCUMENT' | 'PERSONAL_DOCUMENT'
}

export type SearchInput = {
  tenantId: string
  query: string
  documentId?: string | null
  subjectId?: string | null
  topK?: number
}

export type SearchResult = {
  text: string
  documentId: string
  chunkIndex: number
  score: number
}

export type DeleteDocumentInput = {
  documentId: string
}

export interface VectorStore {
  indexDocument(input: IndexDocumentInput): Promise<void>
  search(input: SearchInput): Promise<SearchResult[]>
  deleteDocument(input: DeleteDocumentInput): Promise<void>
}
