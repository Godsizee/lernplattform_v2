"use client"

import { useState } from "react"
import { updateProfile, updatePassword, exportUserData, deleteUserAccount } from "@/lib/actions/profile"
import { signOut } from "next-auth/react"

interface ProfileFormProps {
  user: {
    name: string
    email: string
    bio: string
    createdAt: Date
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  // Profile Form States
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)
  const [profileMessage, setProfileMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

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
    } catch (err: any) {
      alert("Fehler beim Exportieren der Daten: " + err.message)
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmEmail !== user.email) return
    setIsDeleting(true)
    try {
      await deleteUserAccount()
      await signOut({ callbackUrl: "/login?loggedout=true" })
    } catch (err: any) {
      alert("Fehler beim Löschen des Kontos: " + err.message)
      setIsDeleting(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage(null)
    setIsSavingProfile(true)

    try {
      await updateProfile({ name, bio })
      setProfileMessage({ type: "success", text: "Profil erfolgreich aktualisiert." })
    } catch (err: any) {
      setProfileMessage({ type: "error", text: err.message || "Fehler beim Speichern." })
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Die neuen Passwörter stimmen nicht überein." })
      return
    }

    setIsSavingPassword(true)

    try {
      await updatePassword({ currentPassword, newPassword, confirmPassword })
      setPasswordMessage({ type: "success", text: "Passwort erfolgreich geändert." })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setPasswordMessage({ type: "error", text: err.message || "Fehler beim Ändern des Passworts." })
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
            {profileMessage && (
              <div className={`p-4 rounded-xl text-xs font-bold border flex items-center gap-2.5 ${
                profileMessage.type === "success" 
                  ? "bg-success/10 border-success/20 text-success" 
                  : "bg-danger/10 border-danger/20 text-danger"
              }`}>
                <i className={`ph-fill ${profileMessage.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
                <span>{profileMessage.text}</span>
              </div>
            )}

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
            {passwordMessage && (
              <div className={`p-4 rounded-xl text-xs font-bold border flex items-center gap-2.5 ${
                passwordMessage.type === "success" 
                  ? "bg-success/10 border-success/20 text-success" 
                  : "bg-danger/10 border-danger/20 text-danger"
              }`}>
                <i className={`ph-fill ${passwordMessage.type === "success" ? "ph-check-circle" : "ph-x-circle"} text-lg`}></i>
                <span className="leading-snug">{passwordMessage.text}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Aktuelles Passwort</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Neues Passwort</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted uppercase">Passwort bestätigen</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/25 transition-all"
              />
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
