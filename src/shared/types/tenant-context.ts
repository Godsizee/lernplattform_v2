export type TenantRole = 'OWNER' | 'ADMIN' | 'INSTRUCTOR' | 'MEMBER'

export type TenantContext = {
  tenantId: string
  userId: string
  role: TenantRole
}
