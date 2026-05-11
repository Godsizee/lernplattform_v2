"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"
  const loggedout = searchParams.get("loggedout") === "true"
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Ungültige E-Mail oder Passwort")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8 flex flex-col items-center">
          <img 
            src="/assets/img/logo.png" 
            alt="Code & Cash Logo" 
            className="h-16 w-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Willkommen zurück</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Logge dich in deinen Account ein</p>
        </div>

        {registered && (
          <div className="mb-6 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-2.5 animate-fade-in">
            <i className="ph-fill ph-check-circle text-lg"></i>
            <span>Registrierung erfolgreich! Logge dich jetzt ein.</span>
          </div>
        )}

        {loggedout && (
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-4 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-800/50 flex items-center gap-2.5 animate-fade-in">
            <i className="ph-fill ph-info text-lg"></i>
            <span>Erfolgreich abgemeldet. Bis bald!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="deine@email.de"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Passwort
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition shadow-lg shadow-blue-500/30 disabled:opacity-70"
          >
            {isLoading ? "Wird eingeloggt..." : "Einloggen"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Noch keinen Account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Hier registrieren
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="text-sm font-semibold text-muted">Laden...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
