/**
 * Storage-Adapter — abstrahiert Supabase Storage (Production) und
 * lokales Dateisystem (Entwicklung ohne Supabase Cloud).
 *
 * Steuerung über Umgebungsvariablen:
 *   SUPABASE_URL gesetzt → Supabase Storage
 *   sonst               → lokales Dateisystem (./local-uploads/)
 *
 * WICHTIG: Nur server-side verwenden.
 */

import path from 'path'
import fs from 'fs/promises'

const BUCKET = 'learning-documents'
export const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'local-uploads')

export interface UploadResult {
  storagePath: string
}

// ---------------------------------------------------------------------------
// Supabase Storage
// ---------------------------------------------------------------------------

async function supabaseUpload(
  buffer: Buffer,
  storagePath: string,
  mimeType: string
): Promise<UploadResult> {
  const { createClient } = await import('@supabase/supabase-js')

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, buffer, { contentType: mimeType, upsert: false })

  if (error) throw new Error(`Supabase Storage Fehler: ${error.message}`)

  return { storagePath }
}

async function supabaseDelete(storagePath: string): Promise<void> {
  const { createClient } = await import('@supabase/supabase-js')

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY!
  )

  await supabase.storage.from(BUCKET).remove([storagePath])
}

// ---------------------------------------------------------------------------
// Lokales Dateisystem (Entwicklung)
// ---------------------------------------------------------------------------

async function localUpload(buffer: Buffer, storagePath: string): Promise<UploadResult> {
  const fullPath = path.join(LOCAL_UPLOAD_DIR, storagePath)
  await fs.mkdir(path.dirname(fullPath), { recursive: true })
  await fs.writeFile(fullPath, buffer)
  return { storagePath }
}

async function localDelete(storagePath: string): Promise<void> {
  const fullPath = path.join(LOCAL_UPLOAD_DIR, storagePath)
  await fs.unlink(fullPath).catch(() => undefined)
}

// ---------------------------------------------------------------------------
// Öffentliche API
// ---------------------------------------------------------------------------

export function useSupabaseStorage(): boolean {
  // Supabase Storage nur wenn explizit aktiviert und Service-Role-Key vorhanden
  return process.env.STORAGE_BACKEND === 'supabase' && !!process.env.SUPABASE_SERVICE_ROLE_KEY
}

export async function uploadFile(
  buffer: Buffer,
  storagePath: string,
  mimeType: string
): Promise<UploadResult> {
  if (useSupabaseStorage()) {
    return supabaseUpload(buffer, storagePath, mimeType)
  }
  return localUpload(buffer, storagePath)
}

export async function deleteFile(storagePath: string): Promise<void> {
  if (useSupabaseStorage()) {
    return supabaseDelete(storagePath)
  }
  return localDelete(storagePath)
}
