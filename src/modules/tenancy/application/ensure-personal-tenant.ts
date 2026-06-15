import prisma from '@/db/client'
import type { TenantContext } from '@/shared/types/tenant-context'

/**
 * Gibt den TenantContext des Nutzers zurück.
 * Existiert noch kein persönlicher Workspace, wird er automatisch angelegt.
 * Idempotent: mehrfache Aufrufe sind sicher (unique slug pro userId).
 */
export async function ensurePersonalTenant(userId: string): Promise<TenantContext> {
  const existing = await prisma.membership.findFirst({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  })

  if (existing) {
    return {
      tenantId: existing.tenantId,
      userId,
      role: existing.role as TenantContext['role'],
    }
  }

  // Persönlichen Workspace anlegen — slug ist per unique constraint idempotent
  try {
    const tenant = await prisma.tenant.create({
      data: {
        name: 'Persönlicher Workspace',
        slug: `user-${userId}`,
        status: 'ACTIVE',
        memberships: {
          create: { userId, role: 'OWNER' },
        },
      },
      include: { memberships: true },
    })

    return {
      tenantId: tenant.id,
      userId,
      role: 'OWNER',
    }
  } catch {
    // Race condition: anderer Request hat Tenant bereits angelegt
    const membership = await prisma.membership.findFirstOrThrow({ where: { userId } })
    return {
      tenantId: membership.tenantId,
      userId,
      role: membership.role as TenantContext['role'],
    }
  }
}
