import { NextRequest, NextResponse } from "next/server"

/**
 * Validates the Origin header against the Host header to protect API route handlers from CSRF.
 */
export function verifyCsrf(req: Request): boolean {
  // Allow safe methods (GET, HEAD, OPTIONS)
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return true
  }

  const origin = req.headers.get("origin")
  const host = req.headers.get("host")

  if (origin) {
    try {
      const originUrl = new URL(origin)
      if (originUrl.host !== host) {
        return false
      }
    } catch {
      return false
    }
  }
  return true
}

/**
 * Returns a CSRF error response if validation fails.
 */
export function csrfErrorResponse() {
  return NextResponse.json({ error: "CSRF-Verifizierungsfehler" }, { status: 403 })
}
