export type UploadFileInput = {
  path: string
  content: Buffer
  mimeType: string
}

export type StoredFile = {
  storagePath: string
}

export interface ObjectStorage {
  upload(input: UploadFileInput): Promise<StoredFile>
  download(path: string): Promise<Buffer>
  delete(path: string): Promise<void>
}
