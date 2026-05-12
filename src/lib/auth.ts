import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/db/client"
import { authConfig } from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Tage
  },
  events: {
    async signIn({ user }) {
      if (user?.id) {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "LOGIN",
            details: "Erfolgreich angemeldet"
          }
        }).catch(console.error)
      }
    },
    async signOut(message) {
      const token = "token" in message ? (message as any).token : null
      const uid = (token?.id || token?.sub) as string
      if (uid) {
        await prisma.auditLog.create({
          data: {
            userId: uid,
            action: "LOGOUT",
            details: "Sitzung beendet"
          }
        }).catch(console.error)
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Identifier", type: "text" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const identifier = credentials.email as string;
        let user = null;

        if (identifier.includes("@")) {
          user = await prisma.user.findUnique({
            where: { email: identifier }
          });
        } else {
          user = await prisma.user.findFirst({
            where: { name: identifier }
          });
        }
        
        if (!user || !user.password) return null;
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        
        if (passwordsMatch) {
          return { 
            id: user.id, 
            email: user.email, 
            name: user.name, 
            role: user.role 
          };
        }
        return null;
      }
    })
  ]
})
