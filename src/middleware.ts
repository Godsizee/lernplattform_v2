import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

const { auth } = NextAuth(authConfig)

export default async function middleware(req: NextRequest) {
  // HTTPS-Zwang in Produktion (prüft x-forwarded-proto für Proxy-Setups)
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers.get("x-forwarded-proto")
    const host = req.headers.get("host")
    if (proto === "http" && host) {
      return NextResponse.redirect(`https://${host}${req.nextUrl.pathname}${req.nextUrl.search}`, 301)
    }
  }

  // NextAuth auth middleware
  return (auth as any)(req)
}

export const config = {
  // Verhindert Middleware-Ausführung auf statischen Dateien und API-Routen (außer auth API)
  matcher: ['/((?!api/.*|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
