"use client"

import { useState } from "react"
import { updateProfile, updatePassword, exportUserData, deleteUserAccount } from "@/lib/actions/profile"
import { signOut } from "next-auth/react"
import { useToast } from "@/context/ToastContext"

interface ProfileFormProps {
  user: {
    name: string
    email: string
    bio: string
    createdAt: Date
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { showToast } = useToast()
  
  // Profile Form States
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Real-time password validations
  const hasMinLength = newPassword.length >= 8
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword)
  const isNewPasswordValid = hasMinLength && hasNumber && hasSpecialChar

  // DSGVO / GDPR states
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmEmail, setDeleteConfirmEmail] = useState("")

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const data = await exportUserData()
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`
      const downloadAnchor = document.createElement("a")
      downloadAnchor.setAttribute("href", jsonString)
      downloadAnchor.setAttribute("download", `dsgvo-datenexport-${user.email}.json`)
      document.body.appendChild(downloadAnchor)
      downloadAnchor.click()
      downloadAnchor.remove()
      showToast("Ihre Daten wurden erfolgreich exportiert!", "success")
    } catch (err: any) {
      showToast("Fehler beim Exportieren: " + err.message, "error")
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmEmail !== user.email) return
    setIsDeleting(true)
    try {
      await deleteUserAccount()
      await signOut({ callbackUrl: "/login?success=logout" })
    } catch (err: any) {
      showToast("Fehler beim Löschen des Kontos: " + err.message, "error")
      setIsDeleting(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)

    try {
      await updateProfile({ name, bio })
      showToast("Profil erfolgreich aktualisiert!", "success")
    } catch (err: any) {
      showToast(err.message || "Fehler beim Speichern.", "error")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      showToast("Die neuen Passwörter stimmen nicht überein.", "warning")
      return
    }

    if (!isNewPasswordValid) {
      showToast("Das neue Passwort erfüllt nicht die Sicherheitsanforderungen.", "warning")
      return
    }

    setIsSavingPassword(true)

    try {
      await updatePassword({ currentPassword, newPassword, confirmPassword })
      showToast("Passwort erfolgreich geändert!", "success")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      showToast(err.message || "Fehler beim Ändern des Passworts.", "error")
    } finally {
      setIsSavingPassword(false)
    }
  }

  const registerDate = new Date(user.createdAt).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  return (
    <div className="space-y-8">
      {/* Profile Header Cards */}
      <div className="max-w-md">
        <div className="bg-surface border border-border p-6 rounded-2xl flex items-center gap-5 shadow-sm">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <i className="ph ph-calendar text-2xl"></i>
          </div>
          <div>
            <div className="text-lg font-bold">{registerDate}</div>
            <div className="text-xs text-muted font-bold uppercase tracking-wider">Mitglied seit</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Editing Card */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-border/60 pb-4">
            <h2 className="text-xl font-bold tracking-tight">Persönliche Details</h2>
            <p className="text-xs text-muted">Aktualisiere deinen Anzeigenamen und deine Kurzbiografie.</p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">Anzeigename</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted uppercase">E-Mail-Adresse</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-sm text-muted cursor-not-allowed font-semibold opacity-70"
                  title="Die E-Mail-Adresse kann nicht geändert werden"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Über mich (Bio)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full bg-background border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all resize-none leading-relaxed font-semibold"
                placeholder="Erzähle ein wenig über dich..."
              />
              <div className="text-[10px] text-muted text-right">
                {bio.length} / 500 Zeichen
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={isSavingProfile}
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-primary/10 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSavingProfile ? "Wird gespeichert..." : "Änderungen speichern"} <i className="ph ph-floppy-disk text-sm"></i>
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-border/60 pb-4">
            <h2 className="text-xl font-bold tracking-tight">Sicherheit</h2>
            <p className="text-xs text-muted">Ändere dein Passwort, um dein Konto zu schützen.</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Aktuelles Passwort</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pr-12 pl-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition p-1 cursor-pointer flex items-center justify-center"
                >
                  <i className={`ph text-lg ${showCurrentPassword ? "ph-eye-closed" : "ph-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Neues Passwort</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pr-12 pl-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                  placeholder="Mindestens 8 Zeichen"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition p-1 cursor-pointer flex items-center justify-center"
                >
                  <i className={`ph text-lg ${showNewPassword ? "ph-eye-closed" : "ph-eye"}`}></i>
                </button>
              </div>

              {/* Realtime Checklist */}
              <div className="mt-2.5 p-3 bg-background/50 rounded-xl border border-border/80 space-y-2 text-xs font-semibold">
                <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Sicherheitsanforderungen:</p>
                <div className="flex items-center gap-2">
                  <i className={`ph-fill ${hasMinLength ? "ph-check-circle text-success" : "ph-warning-circle text-muted"} text-base`}></i>
                  <span className={hasMinLength ? "text-success" : "text-muted"}>Mindestens 8 Zeichen</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className={`ph-fill ${hasNumber ? "ph-check-circle text-success" : "ph-warning-circle text-muted"} text-base`}></i>
                  <span className={hasNumber ? "text-success" : "text-muted"}>Mindestens 1 Zahl</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className={`ph-fill ${hasSpecialChar ? "ph-check-circle text-success" : "ph-warning-circle text-muted"} text-base`}></i>
                  <span className={hasSpecialChar ? "text-success" : "text-muted"}>Mindestens 1 Sonderzeichen</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Passwort bestätigen</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background border border-border rounded-xl pr-12 pl-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition p-1 cursor-pointer flex items-center justify-center"
                >
                  <i className={`ph text-lg ${showConfirmPassword ? "ph-eye-closed" : "ph-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                disabled={isSavingPassword}
                type="submit"
                className="w-full px-5 py-2.5 bg-background border border-border hover:bg-border/30 font-bold text-xs rounded-xl text-foreground transition disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSavingPassword ? "Wird geändert..." : "Passwort aktualisieren"} <i className="ph ph-key text-sm"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* GDPR Data Control Box */}
      <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="space-y-1 border-b border-border/60 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <i className="ph-fill ph-shield-check text-primary"></i> DSGVO-Datenkontrolle
          </h2>
          <p className="text-xs text-muted">
            Verwalte deine personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO). Du hast die volle Kontrolle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Data Export (Art. 20 DSGVO) */}
          <div className="border border-border rounded-2xl p-5 space-y-4 bg-background/20">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <i className="ph ph-download-simple text-primary text-base"></i> Persönliche Daten exportieren
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Fordere alle über dich gespeicherten personenbezogenen Daten, Lernfortschritte, Notizen und Lesezeichen an und lade sie als strukturierte JSON-Datei herunter (Art. 20 DSGVO).
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={handleExportData}
                disabled={isExporting}
                className="px-4 py-2 bg-background border border-border hover:bg-border/30 hover:border-primary/50 text-foreground font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isExporting ? "Wird exportiert..." : "Daten als JSON herunterladen"}{" "}
                <i className="ph ph-file-code text-sm text-primary"></i>
              </button>
            </div>
          </div>

          {/* Account Deletion (Art. 17 DSGVO) */}
          <div className="border border-border/80 rounded-2xl p-5 space-y-4 bg-background/20">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <i className="ph ph-trash text-danger text-base"></i> Benutzerkonto löschen
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Lösche dein Benutzerkonto und alle damit verknüpften Lerndaten, Lesezeichen und Notizen unwiderruflich und rückstandslos aus der Datenbank (Art. 17 DSGVO).
              </p>
            </div>
            <div>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-danger/10 text-danger border border-danger/20 hover:bg-danger hover:text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  Konto unwiderruflich löschen <i className="ph ph-user-minus text-sm"></i>
                </button>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <div className="text-xs font-bold text-danger bg-danger/5 border border-danger/20 rounded-xl p-3 leading-relaxed">
                    ⚠️ <strong>Achtung:</strong> Diese Aktion kann nicht rückgängig gemacht werden. Bitte bestätige dies durch Eingabe deiner E-Mail-Adresse (<strong>{user.email}</strong>):
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="E-Mail-Adresse eingeben"
                      value={deleteConfirmEmail}
                      onChange={(e) => setDeleteConfirmEmail(e.target.value)}
                      className="flex-1 bg-background border border-danger/30 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-danger transition-all font-semibold text-foreground"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmEmail !== user.email || isDeleting}
                        className="px-4 py-2 bg-danger text-white hover:bg-danger/90 disabled:opacity-40 font-bold text-xs rounded-xl transition flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        {isDeleting ? "Wird gelöscht..." : "Löschung bestätigen"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDeleteConfirm(false)
                          setDeleteConfirmEmail("")
                        }}
                        className="px-3 py-2 bg-background border border-border hover:bg-border/30 font-bold text-xs rounded-xl transition text-foreground"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
