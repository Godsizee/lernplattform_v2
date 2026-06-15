import { auth } from '@/lib/auth'
import { ensurePersonalTenant } from '@/modules/tenancy/application/ensure-personal-tenant'
import type { TenantContext } from '@/shared/types/tenant-context'

/**
 * Server-seitiger Helper — gibt den TenantContext der aktuellen Session zurück.
 * Legt automatisch einen persönlichen Workspace an, falls noch keiner existiert.
 * Gibt null zurück wenn keine gültige Session vorhanden ist.
 */
export async function getTenantContext(): Promise<TenantContext | null> {
  const session = await auth()
  if (!session?.user?.id) return null
  return ensurePersonalTenant(session.user.id)
}
