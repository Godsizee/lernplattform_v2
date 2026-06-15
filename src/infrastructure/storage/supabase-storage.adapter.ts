import type { ObjectStorage, UploadFileInput, StoredFile } from '@/shared/ports/object-storage.port'
import { uploadFile, deleteFile } from '@/lib/adaptive/storage-adapter'
import path from 'path'
import fs from 'fs/promises'

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'local-uploads')

export class SupabaseStorageAdapter implements ObjectStorage {
  async upload(input: UploadFileInput): Promise<StoredFile> {
    const result = await uploadFile(input.content, input.path, input.mimeType)
    return { storagePath: result.storagePath }
  }

  async download(storagePath: string): Promise<Buffer> {
    const useSupabase = process.env.STORAGE_BACKEND === 'supabase' && !!process.env.SUPABASE_SERVICE_ROLE_KEY

    if (useSupabase) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      const { data, error } = await supabase.storage
        .from('learning-documents')
        .download(storagePath)
      if (error || !data) throw new Error(`Storage download failed: ${error?.message}`)
      return Buffer.from(await data.arrayBuffer())
    }

    const fullPath = path.join(LOCAL_UPLOAD_DIR, storagePath)
    return fs.readFile(fullPath)
  }

  async delete(storagePath: string): Promise<void> {
    await deleteFile(storagePath)
  }
}

export const objectStorage: ObjectStorage = new SupabaseStorageAdapter()
