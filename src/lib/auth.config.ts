import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register')
      
      // Geschützte Bereiche definieren (Dashboard, Profile, Admin)
      // Für jetzt schützen wir alles außer auth, api, und public assets
      const isPublicRoute = isAuthPage || nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/api')

      if (!isPublicRoute) {
        if (isLoggedIn) return true
        return false // Redirect to signIn page
      } else if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL('/', nextUrl)) // Angemeldete Nutzer von Login wegleiten
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }

      // Impersonation Support check
      try {
        const { cookies } = require("next/headers")
        const cookieStore = await cookies()
        const impersonatedId = cookieStore.get("impersonated_user_id")?.value
        const originalAdminId = cookieStore.get("original_admin_id")?.value

        if (impersonatedId && originalAdminId) {
          const prisma = require("@/db/client").default
          // Securely check that the original user is indeed an admin
          const adminCheck = await prisma.user.findUnique({
            where: { id: originalAdminId }
          })
          
          if (adminCheck && adminCheck.role === "admin") {
            const impUser = await prisma.user.findUnique({
              where: { id: impersonatedId }
            })
            if (impUser && impUser.role !== "admin") {
              token.id = impUser.id
              token.role = impUser.role
              token.isImpersonating = true
              token.originalAdminId = originalAdminId
            }
          }
        } else {
          token.isImpersonating = false
          token.originalAdminId = undefined
        }
      } catch (e) {
        // Fallback for pre-rendering contexts where cookies() are unavailable
      }

      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        const user = session.user as any
        user.role = token.role as string
        user.id = token.id as string
        user.isImpersonating = token.isImpersonating as boolean
        user.originalAdminId = token.originalAdminId as string
      }
      return session
    }
  },
} satisfies NextAuthConfig
