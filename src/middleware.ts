import NextAuth from "next-auth"
import { authConfig } from "./lib/auth.config"

export default NextAuth(authConfig).auth

export const config = {
  // Verhindert Middleware-Ausführung auf statischen Dateien und API-Routen (außer auth API)
  matcher: ['/((?!api/.*|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
