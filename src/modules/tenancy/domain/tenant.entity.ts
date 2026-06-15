export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'DELETED'

export type TenantRole = 'OWNER' | 'ADMIN' | 'INSTRUCTOR' | 'MEMBER'

export type Tenant = {
  id: string
  name: string
  slug: string
  status: TenantStatus
  createdAt: Date
}

export type Membership = {
  tenantId: string
  userId: string
  role: TenantRole
  createdAt: Date
}
