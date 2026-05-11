"use client"

import { useState } from "react"
import { toggleUserBan, resetUserPassword, updateUserRole, deleteUser, startImpersonation } from "@/lib/actions/admin"

interface User {
  id: string
  name: string
  email: string
  role: string
  isBanned: boolean
}

interface UserManagementTableProps {
  initialUsers: User[]
}

export function UserManagementTable({ initialUsers }: UserManagementTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [tempPasswordModal, setTempPasswordModal] = useState<{ name: string; pass: string } | null>(null)
  const [isBanningId, setIsBanningId] = useState<string | null>(null)
  const [isResettingId, setIsResettingId] = useState<string | null>(null)
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null)
  const [isRoleUpdatingId, setIsRoleUpdatingId] = useState<string | null>(null)
  const [isImpersonatingId, setIsImpersonatingId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Client-side search & filtering states
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all") // "all" | "admin" | "student"
  const [statusFilter, setStatusFilter] = useState("all") // "all" | "active" | "banned"

  const handleUpdateRole = async (targetId: string, newRole: string) => {
    setIsRoleUpdatingId(targetId)
    setErrorMessage(null)

    try {
      await updateUserRole(targetId, newRole)
      setUsers(prev => prev.map(u => u.id === targetId ? { ...u, role: newRole } : u))
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler beim Ändern der Rolle.")
    } finally {
      setIsRoleUpdatingId(null)
    }
  }

  const handleDelete = async (targetId: string, name: string) => {
    if (!confirm(`Möchtest du den Benutzer "${name}" und all seine Fortschrittsdaten wirklich unwiderruflich aus der Datenbank löschen?`)) return

    setIsDeletingId(targetId)
    setErrorMessage(null)

    try {
      await deleteUser(targetId)
      setUsers(prev => prev.filter(u => u.id !== targetId))
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler beim Löschen des Benutzers.")
    } finally {
      setIsDeletingId(null)
    }
  }

  const handleImpersonate = async (targetId: string, name: string) => {
    if (!confirm(`Sitzungsübernahme: Möchtest du dich temporär als "${name}" einloggen?`)) return

    setIsImpersonatingId(targetId)
    setErrorMessage(null)

    try {
      await startImpersonation(targetId)
      // Redirect to dashboard with a full reload to apply session
      window.location.href = "/"
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler bei der Sitzungsübernahme.")
      setIsImpersonatingId(null)
    }
  }

  const handleToggleBan = async (targetId: string) => {
    setIsBanningId(targetId)
    setErrorMessage(null)

    try {
      const res = await toggleUserBan(targetId)
      setUsers(prev => prev.map(u => u.id === targetId ? { ...u, isBanned: res.isBanned } : u))
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler beim Sperren des Benutzers.")
    } finally {
      setIsBanningId(null)
    }
  }

  const handleResetPassword = async (targetId: string, name: string) => {
    if (!confirm(`Möchtest du das Passwort für ${name} wirklich zurücksetzen?`)) return

    setIsResettingId(targetId)
    setErrorMessage(null)

    try {
      const res = await resetUserPassword(targetId)
      setTempPasswordModal({ name, pass: res.tempPassword })
    } catch (err: any) {
      setErrorMessage(err.message || "Fehler beim Zurücksetzen des Passworts.")
    } finally {
      setIsResettingId(null)
    }
  }

  // Filter users based on query and filters
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "active" && !u.isBanned) || 
                          (statusFilter === "banned" && u.isBanned)
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Messages */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-bold flex items-center gap-2.5">
          <i className="ph-fill ph-x-circle text-lg"></i>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Temporary Password Modal */}
      {tempPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl p-6 md:p-8 max-w-md w-full space-y-5 shadow-2xl animate-scale-up">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto text-2xl">
                <i className="ph-bold ph-check"></i>
              </div>
              <h3 className="text-lg font-bold">Passwort erfolgreich zurückgesetzt!</h3>
              <p className="text-xs text-muted leading-relaxed">
                Das neue temporäre Passwort für <strong className="text-foreground">{tempPasswordModal.name}</strong> lautet:
              </p>
            </div>

            <div className="bg-background border border-border p-4 rounded-2xl flex items-center justify-between font-mono text-sm">
              <span className="font-bold select-all tracking-wider">{tempPasswordModal.pass}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(tempPasswordModal.pass)
                  alert("Passwort in die Zwischenablage kopiert!")
                }}
                className="text-xs font-bold text-primary hover:underline shrink-0 cursor-pointer"
              >
                Kopieren
              </button>
            </div>

            <button
              onClick={() => setTempPasswordModal(null)}
              className="w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-primary/10 cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface border border-border p-4 rounded-3xl shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
            <i className="ph ph-magnifying-glass text-lg"></i>
          </span>
          <input
            type="text"
            placeholder="Benutzer nach Name oder E-Mail suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-2xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all font-semibold"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto shrink-0">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
          >
            <option value="all">Alle Rollen</option>
            <option value="admin">Administratoren</option>
            <option value="student">Studenten</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-2xl px-4 py-2.5 text-xs font-bold text-muted focus:outline-none focus:border-primary transition-all cursor-pointer"
          >
            <option value="all">Alle Status</option>
            <option value="active">Nur Aktive</option>
            <option value="banned">Nur Gesperrte</option>
          </select>
        </div>
      </div>

      {/* Table Canvas */}
      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs font-bold text-muted uppercase">
                <th className="p-4 md:p-5">Benutzer</th>
                <th className="p-4 md:p-5">Rolle</th>
                <th className="p-4 md:p-5">Status</th>
                <th className="p-4 md:p-5 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-background/20 transition duration-150">
                  <td className="p-4 md:p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-foreground truncate max-w-[150px] md:max-w-[200px]">{u.name}</div>
                        <div className="text-xs text-muted truncate max-w-[150px] md:max-w-[200px]">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 md:p-5">
                    <select
                      value={u.role}
                      disabled={u.isBanned || isRoleUpdatingId === u.id}
                      onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                      className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-primary transition-all font-bold text-foreground cursor-pointer disabled:opacity-50"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 md:p-5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.isBanned 
                        ? "bg-danger/10 text-danger border border-danger/10" 
                        : "bg-success/10 text-success border border-success/10"
                    }`}>
                      {u.isBanned ? "Gesperrt" : "Aktiv"}
                    </span>
                  </td>
                  <td className="p-4 md:p-5 text-right">
                    <div className="flex items-center justify-end gap-2 shrink-0">
                      <button
                        disabled={u.role === "admin" || isImpersonatingId !== null}
                        onClick={() => handleImpersonate(u.id, u.name)}
                        className="p-2 rounded-lg border border-border bg-background text-muted hover:text-primary hover:bg-primary/5 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Als dieser Nutzer einloggen (Sitzung übernehmen)"
                      >
                        <i className={`ph ${isImpersonatingId === u.id ? "ph-spinner-gap ph-spin" : "ph-mask-happy"} text-sm`}></i>
                      </button>

                      <button
                        disabled={isResettingId === u.id}
                        onClick={() => handleResetPassword(u.id, u.name)}
                        className="p-2 rounded-lg border border-border bg-background text-muted hover:text-foreground hover:bg-border/30 transition cursor-pointer"
                        title="Passwort zurücksetzen"
                      >
                        <i className="ph ph-key text-sm"></i>
                      </button>
                      
                      <button
                        disabled={isBanningId === u.id}
                        onClick={() => handleToggleBan(u.id)}
                        className={`p-2 rounded-lg border transition cursor-pointer ${
                          u.isBanned 
                            ? "bg-success/10 border-success/20 text-success hover:bg-success/15" 
                            : "bg-danger/10 border-danger/20 text-danger hover:bg-danger/15"
                        }`}
                        title={u.isBanned ? "Sperre aufheben" : "Benutzer sperren"}
                      >
                        <i className={`ph ${u.isBanned ? "ph-user-check" : "ph-user-minus"} text-sm`}></i>
                      </button>

                      <button
                        disabled={isDeletingId === u.id}
                        onClick={() => handleDelete(u.id, u.name)}
                        className="p-2 rounded-lg border border-danger/10 bg-background text-danger/60 hover:text-danger hover:bg-danger/5 transition cursor-pointer"
                        title="Benutzer unwiderruflich löschen"
                      >
                        <i className={`ph ${isDeletingId === u.id ? "ph-spinner-gap ph-spin" : "ph-trash"} text-sm`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-muted text-xs font-bold">
                    Keine Benutzer gefunden, die den Filtern entsprechen.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
