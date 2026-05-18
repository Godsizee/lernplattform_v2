"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'

interface TableStat {
  table: string
  count: number
}

interface ColumnMeta {
  name: string
  type: string
  nullable: string
  key: string
}

interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

interface TableDataResponse {
  table: string
  columns: ColumnMeta[]
  primaryKeys: string[]
  rows: Record<string, any>[]
  pagination: PaginationMeta
}

export default function DatabaseAdminPage() {
  // Navigation & State
  const [tables, setTables] = useState<TableStat[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('users')
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<TableDataResponse | null>(null)

  // Table grid query parameters
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(25)
  const [search, setSearch] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC')

  // UI States
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [cascadeChecked, setCascadeChecked] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  // Batch Insert Modal States
  const [showImportModal, setShowImportModal] = useState<boolean>(false)
  const [importFormat, setImportFormat] = useState<'json' | 'sql'>('json')
  const [importPayload, setImportPayload] = useState<string>('')
  const [importing, setImporting] = useState<boolean>(false)
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null)

  // SQL Console States
  const [consoleExpanded, setConsoleExpanded] = useState<boolean>(false)
  const [sqlQuery, setSqlQuery] = useState<string>('')
  const [executingSql, setExecutingSql] = useState<boolean>(false)
  const [sqlError, setSqlError] = useState<string | null>(null)
  const [sqlResult, setSqlResult] = useState<{
    success: boolean
    isQuery: boolean
    affectedRows?: number
    data?: any[]
  } | null>(null)

  // ---------------------------------------------------------------------------
  // Data Fetching
  // ---------------------------------------------------------------------------

  // 1. Tabellen-Liste abrufen
  const fetchTables = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/database?action=tables')
      if (res.ok) {
        const stats = await res.json()
        setTables(stats)
      }
    } catch (err) {
      console.error('Fehler beim Laden der Tabellen:', err)
    }
  }, [])

  // 2. Datensätze der ausgewählten Tabelle abrufen
  const fetchTableData = useCallback(async () => {
    if (!selectedTable) return
    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        action: 'rows',
        table: selectedTable,
        page: page.toString(),
        limit: limit.toString(),
        search,
        sort: sortColumn,
        dir: sortDirection,
      })
      const res = await fetch(`/api/admin/database?${queryParams}`)
      if (res.ok) {
        const result = await res.json()
        setData(result)
        setSelectedRows({}) // Auswahl zurücksetzen bei Tabellenwechsel/Paging
      }
    } catch (err) {
      console.error('Fehler beim Laden der Zeilen:', err)
    } finally {
      setLoading(false)
    }
  }, [selectedTable, page, limit, search, sortColumn, sortDirection])

  // Initiales Laden
  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  // Laden bei Parameteränderung
  useEffect(() => {
    fetchTableData()
  }, [fetchTableData])

  // ---------------------------------------------------------------------------
  // Grid Hilfsfunktionen
  // ---------------------------------------------------------------------------

  // Zeile auswählen / abwählen
  const toggleRowSelection = (rowKey: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowKey]: !prev[rowKey],
    }))
  }

  // Ermittelt einen eindeutigen String-Key für eine Zeile (auch für zusammengesetzte Primärschlüssel)
  const getRowKey = useCallback(
    (row: Record<string, any>) => {
      if (!data) return ''
      return data.primaryKeys.map((pk) => `${pk}:${row[pk]}`).join('||')
    },
    [data]
  )

  // Master-Checkbox: Alle auswählen / abwählen
  const handleSelectAll = (checked: boolean) => {
    if (!data) return
    const newSelections: Record<string, boolean> = {}
    if (checked) {
      data.rows.forEach((row) => {
        const key = getRowKey(row)
        newSelections[key] = true
      })
    }
    setSelectedRows(newSelections)
  }

  // Sind alle Zeilen auf der aktuellen Seite ausgewählt?
  const isAllSelected = useMemo(() => {
    if (!data || data.rows.length === 0) return false
    return data.rows.every((row) => selectedRows[getRowKey(row)])
  }, [data, selectedRows, getRowKey])

  // Wie viele Zeilen sind ausgewählt?
  const selectedCount = useMemo(() => {
    return Object.values(selectedRows).filter(Boolean).length
  }, [selectedRows])

  // Spaltensortierung umschalten
  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'))
    } else {
      setSortColumn(columnName)
      setSortDirection('ASC')
    }
    setPage(1)
  }

  // ---------------------------------------------------------------------------
  // Batch Löschen (Delete)
  // ---------------------------------------------------------------------------
  const handleBatchDelete = async () => {
    if (!data || selectedCount === 0) return
    setDeleting(true)
    try {
      // Keys für die API vorbereiten
      const keysToDelete = Object.keys(selectedRows)
        .filter((k) => selectedRows[k])
        .map((k) => {
          // Compound-Keys parsen (z.B. "userId:123||lessonId:456")
          const parts = k.split('||')
          const keyObj: Record<string, any> = {}
          parts.forEach((p) => {
            const [pk, val] = p.split(':')
            keyObj[pk] = val
          })
          // Wenn es nur ein einzelner PK ist, direkt den Wert senden
          return Object.keys(keyObj).length === 1 ? Object.values(keyObj)[0] : keyObj
        })

      const res = await fetch('/api/admin/database', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: selectedTable,
          keys: keysToDelete,
        }),
      })

      if (res.ok) {
        setShowDeleteModal(false)
        setCascadeChecked(false)
        setSelectedRows({})
        fetchTableData()
        fetchTables()
      } else {
        const err = await res.json()
        alert(`Löschen fehlgeschlagen: ${err.error}`)
      }
    } catch (err) {
      alert(`Fehler beim Löschen: ${err}`)
    } finally {
      setDeleting(false)
    }
  }

  // ---------------------------------------------------------------------------
  // Batch Insert (Import)
  // ---------------------------------------------------------------------------
  const handleBatchInsert = async () => {
    if (!importPayload.trim()) return
    setImporting(true)
    setImportResult(null)

    try {
      let finalPayload: any = importPayload

      if (importFormat === 'json') {
        try {
          finalPayload = JSON.parse(importPayload)
        } catch (e) {
          setImportResult({ success: false, message: 'Ungültiges JSON-Format. Bitte überprüfe die Syntax.' })
          setImporting(false)
          return
        }
      }

      const res = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: importFormat,
          table: selectedTable,
          payload: finalPayload,
        }),
      })

      const result = await res.json()
      if (res.ok) {
        setImportResult({
          success: true,
          message: `Erfolgreich importiert! Datensätze eingefügt/aktualisiert: ${result.affectedRows}`,
        })
        setImportPayload('')
        fetchTableData()
        fetchTables()
      } else {
        setImportResult({ success: false, message: `Fehler beim Importieren: ${result.error}` })
      }
    } catch (err: any) {
      setImportResult({ success: false, message: `Fehler: ${err.message}` })
    } finally {
      setImporting(false)
    }
  }

  // JSON-Template generieren für den aktiven Import
  const jsonPlaceholderTemplate = useMemo(() => {
    if (!data) return '[\n  {\n    "id": "1",\n    "field": "wert"\n  }\n]'
    const sampleRecord: Record<string, any> = {}
    data.columns.forEach((c) => {
      if (c.name === 'createdAt' || c.name === 'updatedAt') return
      sampleRecord[c.name] = c.type.includes('int') ? 0 : c.type.includes('bool') ? false : ''
    })
    return JSON.stringify([sampleRecord], null, 2)
  }, [data])

  // SQL-Template generieren für den aktiven Import
  const sqlPlaceholderTemplate = useMemo(() => {
    if (!data) return 'INSERT INTO `table` (`col1`) VALUES (\'val1\');'
    const cols = data.columns
      .filter((c) => c.name !== 'createdAt' && c.name !== 'updatedAt')
      .map((c) => `\`${c.name}\``)
      .join(', ')
    const vals = data.columns
      .filter((c) => c.name !== 'createdAt' && c.name !== 'updatedAt')
      .map((c) => (c.type.includes('int') ? '0' : '\'wert\''))
      .join(', ')
    return `INSERT INTO \`${selectedTable}\` (${cols}) VALUES\n  (${vals});`
  }, [data, selectedTable])

  // ---------------------------------------------------------------------------
  // SQL Entwickler-Konsole
  // ---------------------------------------------------------------------------
  const handleExecuteSql = async () => {
    if (!sqlQuery.trim()) return
    setExecutingSql(true)
    setSqlError(null)
    setSqlResult(null)

    try {
      const res = await fetch('/api/admin/database', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: sqlQuery }),
      })

      const result = await res.json()
      if (res.ok) {
        setSqlResult(result)
        fetchTableData()
        fetchTables()
      } else {
        setSqlError(result.error)
      }
    } catch (err: any) {
      setSqlError(`Fehler bei der Verbindung: ${err.message}`)
    } finally {
      setExecutingSql(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500/30">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-white/5 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
              <i className="ph ph-database text-2xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                Live-Datenbankverwaltung
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                  System-Live
                </span>
              </h1>
              <p className="text-xs text-slate-400">Next.js Administrations-Konsole & SQL-Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <i className="ph ph-arrow-left"></i> Cockpit
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Table Selection */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 backdrop-blur-xl">
            <div className="text-xs text-slate-400 font-extrabold uppercase tracking-widest mb-4">
              Tabellen ({tables.length})
            </div>

            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {tables.map((t) => (
                <button
                  key={t.table}
                  onClick={() => {
                    setSelectedTable(t.table)
                    setPage(1)
                    setSearch('')
                    setSortColumn('')
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-sm font-medium transition-all group ${
                    selectedTable === t.table
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <i
                      className={`ph ${
                        selectedTable === t.table ? 'ph-folder-open text-indigo-200' : 'ph-folder text-slate-400'
                      }`}
                    ></i>
                    <span className="truncate">{t.table}</span>
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold shrink-0 ${
                      selectedTable === t.table ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Dynamic Spreadsheet Data Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl space-y-6 relative overflow-hidden">
            {/* Header / Actions bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black capitalize tracking-tight flex items-center gap-2">
                  <i className="ph ph-table text-indigo-400"></i> {selectedTable}
                </h2>
                <p className="text-xs text-slate-400">Metadaten und Datensätze in Echtzeit editieren</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setImportFormat('json')
                    setImportPayload('')
                    setImportResult(null)
                    setShowImportModal(true)
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
                >
                  <i className="ph ph-plus-circle"></i> Batch Import
                </button>
              </div>
            </div>

            {/* Filter / Search input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <i className="ph ph-magnifying-glass"></i>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder={`Suchen in ${selectedTable}...`}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Grid Table */}
            {loading ? (
              <div className="h-60 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xs font-bold uppercase tracking-wider">Daten werden geladen...</div>
              </div>
            ) : data && data.rows.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-x-auto rounded-xl border border-white/10 max-h-[500px]">
                  <table className="w-full border-collapse text-left text-sm text-slate-300">
                    <thead className="sticky top-0 z-10 bg-slate-900 border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5 w-10 text-center">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="w-4 h-4 accent-indigo-600 rounded bg-slate-950 border-white/10 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                          />
                        </th>
                        {data.columns.map((c) => (
                          <th
                            key={c.name}
                            onClick={() => handleSort(c.name)}
                            className="px-4 py-3.5 font-bold text-xs uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer select-none whitespace-nowrap"
                          >
                            <span className="flex items-center gap-1.5">
                              {c.name}
                              {c.key === 'PRI' && (
                                <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1 py-0.2 rounded border border-indigo-500/20 font-bold lowercase shrink-0">
                                  pk
                                </span>
                              )}
                              {sortColumn === c.name && (
                                <i className={`ph ${sortDirection === 'ASC' ? 'ph-caret-up' : 'ph-caret-down'}`}></i>
                              )}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-slate-950/20">
                      {data.rows.map((row, idx) => {
                        const rowKey = getRowKey(row)
                        const isSelected = !!selectedRows[rowKey]
                        return (
                          <tr
                            key={rowKey}
                            className={`hover:bg-white/5 transition-all ${isSelected ? 'bg-indigo-600/5' : ''}`}
                          >
                            <td className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleRowSelection(rowKey)}
                                className="w-4 h-4 accent-indigo-600 rounded bg-slate-950 border-white/10 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                              />
                            </td>
                            {data.columns.map((c) => {
                              const val = row[c.name]
                              let displayVal = String(val ?? '')
                              if (val === null || val === undefined) {
                                displayVal = 'NULL'
                              } else if (typeof val === 'boolean') {
                                displayVal = val ? 'true' : 'false'
                              }

                              return (
                                <td
                                  key={c.name}
                                  className={`px-4 py-3 text-xs max-w-[240px] truncate ${
                                    val === null || val === undefined
                                      ? 'text-slate-600 italic font-medium'
                                      : typeof val === 'boolean'
                                      ? val
                                        ? 'text-emerald-400 font-extrabold'
                                        : 'text-rose-400 font-extrabold'
                                      : ''
                                  }`}
                                  title={displayVal}
                                >
                                  {displayVal}
                                </td>
                              )
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 pt-4">
                  <div className="text-xs text-slate-400 font-medium">
                    Zeige <span className="text-slate-200">{data.rows.length}</span> von{' '}
                    <span className="text-slate-200">{data.pagination.total}</span> Einträgen
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="bg-white/5 border border-white/10 disabled:opacity-40 disabled:hover:bg-white/5 hover:bg-white/10 text-white w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all"
                    >
                      <i className="ph ph-caret-left"></i>
                    </button>
                    {Array.from({ length: Math.min(5, data.pagination.totalPages) }).map((_, idx) => {
                      const pageNum = idx + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                            page === pageNum
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white/5 hover:bg-white/10 text-slate-400 border border-white/10'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )}
                    )}
                    <button
                      onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                      disabled={page === data.pagination.totalPages}
                      className="bg-white/5 border border-white/10 disabled:opacity-40 disabled:hover:bg-white/5 hover:bg-white/10 text-white w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all"
                    >
                      <i className="ph ph-caret-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-60 flex flex-col items-center justify-center gap-2 text-slate-500 border border-dashed border-white/10 rounded-xl">
                <i className="ph ph-folder-open text-4xl mb-1"></i>
                <div className="text-sm font-bold uppercase tracking-wider">Tabelle ist leer</div>
                <div className="text-xs">Verwende den "+ Batch Import" Button, um Daten einzufügen.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SQL DEVELOPER CONSOLE (Sticky bottom collapsible console) */}
      <footer className="max-w-7xl mx-auto px-4 pb-12 mt-6">
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Header toggler */}
          <button
            onClick={() => setConsoleExpanded(!consoleExpanded)}
            className="w-full bg-slate-900 hover:bg-slate-800/80 px-6 py-4 flex items-center justify-between border-b border-white/5 cursor-pointer text-slate-200"
          >
            <span className="flex items-center gap-3 font-extrabold uppercase tracking-wider text-xs">
              <i className="ph ph-terminal-window text-lg text-indigo-400 animate-pulse"></i>
              SQL-Entwicklerkonsole (Raw SQL Query Engine)
            </span>
            <i className={`ph ${consoleExpanded ? 'ph-caret-down' : 'ph-caret-up'} text-slate-400`}></i>
          </button>

          {consoleExpanded && (
            <div className="p-6 space-y-6">
              <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl text-xs text-indigo-300 leading-relaxed">
                <i className="ph ph-info mr-1.5 font-bold"></i>
                <strong>Sicherheits-Hinweis:</strong> Du hast direkten Schreib- und Lesezugriff auf das Live-Datenbanksystem. 
                Destruktive Struktur-DDL Befehle (`DROP DATABASE`, `ALTER DATABASE`) werden zu deiner eigenen Sicherheit serverseitig gefiltert.
              </div>

              <div className="space-y-2">
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  placeholder="SELECT * FROM users LIMIT 5;&#10;-- Oder: UPDATE lessons SET status = 'published' WHERE subjectId = 'cuid';"
                  rows={4}
                  className="w-full bg-slate-950 border border-white/15 rounded-xl p-4 text-sm font-mono text-indigo-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[10px] text-slate-500 font-mono">
                    Tipp: Beende deine Queries optional mit einem Semikolon.
                  </div>
                  <button
                    onClick={handleExecuteSql}
                    disabled={executingSql || !sqlQuery.trim()}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
                  >
                    {executingSql ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Ausführen...
                      </>
                    ) : (
                      <>
                        <i className="ph ph-play-circle"></i> Befehl ausführen
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Console Results Output */}
              {sqlError && (
                <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl text-xs text-rose-400 font-mono break-all">
                  <i className="ph ph-warning-circle mr-1.5 font-bold"></i>
                  {sqlError}
                </div>
              )}

              {sqlResult && (
                <div className="border border-white/10 rounded-xl overflow-hidden bg-slate-950/60 p-4 space-y-3">
                  <div className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Ausführung erfolgreich
                  </div>

                  {sqlResult.isQuery && sqlResult.data ? (
                    sqlResult.data.length > 0 ? (
                      <div className="overflow-x-auto max-h-[300px]">
                        <table className="w-full border-collapse text-left text-xs font-mono text-slate-400 divide-y divide-white/5">
                          <thead>
                            <tr className="bg-slate-900 text-slate-200">
                              {Object.keys(sqlResult.data[0]).map((key) => (
                                <th key={key} className="px-3 py-2 font-bold uppercase tracking-wider">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {sqlResult.data.map((row: any, idx: number) => (
                              <tr key={idx} className="hover:bg-white/5">
                                {Object.values(row).map((val: any, cidx: number) => (
                                  <td key={cidx} className="px-3 py-2 truncate max-w-[200px]" title={String(val ?? '')}>
                                    {val === null || val === undefined ? 'NULL' : String(val)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 font-mono">Die Abfrage lieferte 0 Ergebnisse.</div>
                    )
                  ) : (
                    <div className="text-xs text-slate-300 font-mono">
                      Betroffene Zeilen (Affected Rows):{' '}
                      <span className="text-emerald-400 font-extrabold">{sqlResult.affectedRows}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </footer>

      {/* FLOATING ACTION PILL (Slides in from bottom when 1+ rows selected) */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-5 shadow-2xl backdrop-blur-xl z-30 transition-all duration-300 ${
          selectedCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-indigo-600 text-xs flex items-center justify-center font-extrabold text-white">
            {selectedCount}
          </span>
          Einträge ausgewählt
        </span>
        <div className="w-px h-6 bg-white/10" />
        <button
          onClick={() => {
            setCascadeChecked(false)
            setShowDeleteModal(true)
          }}
          className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <i className="ph ph-trash"></i> Batch Löschen
        </button>
      </div>

      {/* SAFETY WARNING DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-rose-500/20 max-w-md w-full rounded-2xl p-6 shadow-2xl animate-scale-in space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-xl flex items-center justify-center shrink-0 border border-rose-500/20 animate-pulse">
                <i className="ph ph-warning-octagon text-3xl"></i>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-tight text-white">Kaskadierendes Löschen</h3>
                <p className="text-xs text-rose-400/90 font-medium">Sicherheitswarnung vor Datenverlust</p>
              </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl space-y-2">
              <p className="text-xs text-slate-300 leading-relaxed">
                Du löschst gerade <strong className="text-rose-400 font-extrabold">{selectedCount} Datensätze</strong> aus der Tabelle <strong className="text-white capitalize">{selectedTable}</strong>.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Achtung:</strong> Die Datenbank führt bei einigen Beziehungen kaskadierendes Löschen durch! 
                Das Löschen dieser Einträge führt unter Umständen zum <strong>automatischen Mitlöschen von verknüpften Lektionen, Progressdaten, Lesezeichen und Notizen</strong> in anderen Tabellen!
              </p>
            </div>

            {/* Checkbox activation safety switch */}
            <label className="flex items-start gap-3 bg-slate-950/60 p-4 rounded-xl border border-white/5 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={cascadeChecked}
                onChange={(e) => setCascadeChecked(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded bg-slate-950 border-white/10 mt-0.5 shrink-0"
              />
              <span className="text-xs text-slate-300 font-semibold leading-snug">
                Ich bin mir bewusst, dass dieser Löschvorgang auch verbundene Relationen kaskadierend und unwiderruflich entfernt.
              </span>
            </label>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                onClick={handleBatchDelete}
                disabled={!cascadeChecked || deleting}
                className="flex-1 bg-rose-600 disabled:opacity-40 disabled:hover:bg-rose-600 hover:bg-rose-500 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Wird gelöscht...
                  </>
                ) : (
                  <>
                    <i className="ph ph-trash-simple"></i> Unwiderruflich löschen
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BATCH INSERT / IMPORT MODAL */}
      {showImportModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/20 max-w-2xl w-full rounded-2xl p-6 shadow-2xl animate-scale-in space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                  <i className="ph ph-upload-simple text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-white">Batch Import: {selectedTable}</h3>
                  <p className="text-xs text-slate-400">Mehrere Datensätze gleichzeitig in die Tabelle einfügen</p>
                </div>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            {/* Tab selection */}
            <div className="flex border-b border-white/10 gap-4">
              <button
                onClick={() => {
                  setImportFormat('json')
                  setImportPayload('')
                  setImportResult(null)
                }}
                className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  importFormat === 'json' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500'
                }`}
              >
                JSON-Format (Array)
              </button>
              <button
                onClick={() => {
                  setImportFormat('sql')
                  setImportPayload('')
                  setImportResult(null)
                }}
                className={`pb-2.5 text-xs font-black uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  importFormat === 'sql' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500'
                }`}
              >
                SQL INSERT-Statements
              </button>
            </div>

            {/* Instructions */}
            <div className="space-y-1">
              <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Beispiel / Vorlage</div>
              <pre className="bg-slate-950 border border-white/5 p-3 rounded-xl text-[10px] font-mono text-indigo-200 overflow-x-auto">
                {importFormat === 'json' ? jsonPlaceholderTemplate : sqlPlaceholderTemplate}
              </pre>
            </div>

            {/* Textarea Input */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                Import-Code hier einfügen
              </div>
              <textarea
                value={importPayload}
                onChange={(e) => setImportPayload(e.target.value)}
                placeholder={
                  importFormat === 'json'
                    ? '[\n  {\n    "id": "cuid-1",\n    "title": "Neue Lektion"\n  }\n]'
                    : `INSERT INTO \`${selectedTable}\` (\`id\`, \`title\`) VALUES ('cuid-1', 'Neue Lektion');`
                }
                rows={6}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-xs font-mono text-indigo-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Import Status Alert */}
            {importResult && (
              <div
                className={`p-4 rounded-xl text-xs font-medium border flex items-start gap-2.5 ${
                  importResult.success
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
                }`}
              >
                <i
                  className={`ph ${importResult.success ? 'ph-check-circle' : 'ph-warning-circle'} text-lg shrink-0`}
                ></i>
                <div className="leading-snug break-words max-w-full">{importResult.message}</div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                onClick={handleBatchInsert}
                disabled={importing || !importPayload.trim()}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {importing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Wird importiert...
                  </>
                ) : (
                  <>
                    <i className="ph ph-upload"></i> Datensätze einspielen
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
