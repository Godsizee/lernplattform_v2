const store = new Map<string, number[]>()

/**
 * Einfaches In-Memory Rate Limiting.
 * Gibt false zurück wenn das Limit überschritten ist.
 *
 * @param key      Identifier (z.B. IP-Adresse oder User-ID)
 * @param limit    Max. erlaubte Requests im Zeitfenster
 * @param windowMs Zeitfenster in Millisekunden
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const timestamps = (store.get(key) ?? []).filter((t) => now - t < windowMs)
  if (timestamps.length >= limit) return false
  timestamps.push(now)
  store.set(key, timestamps)
  return true
}

/** Nur für Tests — Store zurücksetzen */
export function _resetForTests(): void {
  store.clear()
}
