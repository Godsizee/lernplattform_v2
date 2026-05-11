"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Real-time password validations
  const hasMinLength = password.length >= 8
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const isPasswordValid = hasMinLength && hasNumber && hasSpecialChar

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!isPasswordValid) {
      setError("Das Passwort erfüllt nicht alle Sicherheitsanforderungen.")
      setIsLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registrierung fehlgeschlagen")
      } else {
        router.push("/login?success=register")
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-8 flex flex-col items-center">
          <img 
            src="/assets/img/logo.png" 
            alt="Code & Cash Logo" 
            className="h-16 w-auto object-contain mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account erstellen</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Starte deine Lernreise noch heute</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-100 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name (Benutzername)
            </label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold"
              placeholder="z.B. coder123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold"
              placeholder="deine@email.de"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Passwort
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-12 pl-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold"
                placeholder="Mindestens 8 Zeichen"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition p-1 cursor-pointer flex items-center justify-center"
              >
                <i className={`ph text-lg ${showPassword ? "ph-eye-closed" : "ph-eye"}`}></i>
              </button>
            </div>

            {/* Realtime Password Rules Checklist */}
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700/50 space-y-2 text-xs font-semibold">
              <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Sicherheitsanforderungen:</p>
              <div className="flex items-center gap-2">
                <i className={`ph-fill ${hasMinLength ? "ph-check-circle text-emerald-500" : "ph-warning-circle text-gray-400 dark:text-gray-600"} text-base`}></i>
                <span className={hasMinLength ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}>Mindestens 8 Zeichen</span>
              </div>
              <div className="flex items-center gap-2">
                <i className={`ph-fill ${hasNumber ? "ph-check-circle text-emerald-500" : "ph-warning-circle text-gray-400 dark:text-gray-600"} text-base`}></i>
                <span className={hasNumber ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}>Mindestens 1 Zahl</span>
              </div>
              <div className="flex items-center gap-2">
                <i className={`ph-fill ${hasSpecialChar ? "ph-check-circle text-emerald-500" : "ph-warning-circle text-gray-400 dark:text-gray-600"} text-base`}></i>
                <span className={hasSpecialChar ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400"}>Mindestens 1 Sonderzeichen</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition shadow-lg shadow-blue-500/30 disabled:opacity-70"
          >
            {isLoading ? "Wird erstellt..." : "Registrieren"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
          Du hast schon einen Account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Zum Login
          </Link>
        </p>
      </div>
    </div>
  )
}
