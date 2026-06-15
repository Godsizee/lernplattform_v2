export class DomainError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message)
    this.name = 'DomainError'
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message = 'Nicht autorisiert') {
    super(message, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} nicht gefunden`, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class QuotaExceededError extends DomainError {
  constructor(resource: string) {
    super(`Quota für ${resource} überschritten`, 'QUOTA_EXCEEDED')
    this.name = 'QuotaExceededError'
  }
}
