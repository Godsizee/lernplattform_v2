import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/db/client'

// Liste der erlaubten Tabellen zur Vermeidung von SQL-Injection durch ungültige Tabellennamen
const ALLOWED_TABLES = [
  'users',
  'subjects',
  'lessons',
  'user_progress',
  'bookmarks',
  'lesson_notes',
  'audit_logs',
  'system_settings',
  'documents',
  'concept_nodes',
  'concept_edges',
  'cached_tasks',
  'task_attempts',
  'node_mastery',
  'learning_sessions',
  'exams',
  'subject_assessments',
  'llm_call_logs',
  'accounts',
  'sessions',
  'verification_tokens',
]

/**
 * Hilfsfunktion zur Autorisierungsprüfung (nur Administratoren erlaubt)
 */
async function checkAdminAuth() {
  const session = await auth()
  if (!session?.user?.id) {
    return { authorized: false, error: 'Nicht authentifiziert', status: 401 }
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })
  if (user?.role !== 'admin') {
    return { authorized: false, error: 'Nicht autorisiert. Administrator-Rechte erforderlich.', status: 403 }
  }
  return { authorized: true, userId: session.user.id }
}

/**
 * GET: Abfrage von Tabellen-Metadaten oder konkreten Datensätzen
 */
export async function GET(req: NextRequest) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action') || 'tables'

  try {
    // -------------------------------------------------------------------------
    // Aktion: Liste aller Tabellen und deren Zeilenanzahl ermitteln
    // -------------------------------------------------------------------------
    if (action === 'tables') {
      const tableStats = []
      for (const table of ALLOWED_TABLES) {
        const countRes: any = await prisma.$queryRawUnsafe(
          `SELECT COUNT(*) as count FROM \`${table}\``
        )
        const rowCount = Number(countRes[0]?.count ?? 0)
        tableStats.push({ table, count: rowCount })
      }
      return NextResponse.json(tableStats)
    }

    // -------------------------------------------------------------------------
    // Aktion: Zeilen einer bestimmten Tabelle abfragen (mit Paging, Sort & Search)
    // -------------------------------------------------------------------------
    if (action === 'rows') {
      const table = searchParams.get('table')
      if (!table || !ALLOWED_TABLES.includes(table)) {
        return NextResponse.json({ error: 'Ungültige oder fehlende Tabelle' }, { status: 400 })
      }

      const page = Math.max(1, Number(searchParams.get('page') || 1))
      const limit = Math.max(1, Math.min(200, Number(searchParams.get('limit') || 50)))
      const offset = (page - 1) * limit
      const search = searchParams.get('search') || ''
      const sort = searchParams.get('sort') || ''
      const dir = (searchParams.get('dir') || 'ASC').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'

      // 1. Spaltenmetadaten abfragen (Name, Typ, PK, Nullable)
      const columns: any = await prisma.$queryRawUnsafe(`
        SELECT COLUMN_NAME as name, DATA_TYPE as type, IS_NULLABLE as nullable, COLUMN_KEY as \`key\`
        FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = '${table}'
        ORDER BY ORDINAL_POSITION
      `)

      const colNames = columns.map((c: any) => c.name)
      const primaryKeys = columns.filter((c: any) => c.key === 'PRI').map((c: any) => c.name)

      // 2. Suchbedingung bauen (Suchbegriff auf allen Text- und Varchar-Spalten prüfen)
      let searchWhere = ''
      const stringTypes = ['varchar', 'text', 'char', 'longtext', 'mediumtext', 'tinytext']
      const searchableCols = columns.filter((c: any) => stringTypes.includes(c.type.toLowerCase()))

      if (search && searchableCols.length > 0) {
        // SQL-Escaping für die Suche (Prisma QueryRawUnsafe schützt vor SQL-Injection in Parametern nicht,
        // daher säubern wir den Suchwert manuell durch Entfernen von gefährlichen Zeichen)
        const safeSearch = search.replace(/['"\\]/g, '')
        const searchClauses = searchableCols.map((c: any) => `\`${c.name}\` LIKE '%${safeSearch}%'`)
        searchWhere = `WHERE ${searchClauses.join(' OR ')}`
      }

      // 3. Gesamtanzahl der Datensätze nach Filter ermitteln
      const countRes: any = await prisma.$queryRawUnsafe(
        `SELECT COUNT(*) as count FROM \`${table}\` ${searchWhere}`
      )
      const total = Number(countRes[0]?.count ?? 0)

      // 4. Sortierung validieren und Query zusammenstellen
      let orderClause = ''
      if (sort && colNames.includes(sort)) {
        orderClause = `ORDER BY \`${sort}\` ${dir}`
      } else if (primaryKeys.length > 0) {
        orderClause = `ORDER BY ${primaryKeys.map((pk: string) => `\`${pk}\``).join(', ')} DESC`
      }

      // 5. Daten auslesen
      const rows: any = await prisma.$queryRawUnsafe(
        `SELECT * FROM \`${table}\` ${searchWhere} ${orderClause} LIMIT ${limit} OFFSET ${offset}`
      )

      return NextResponse.json({
        table,
        columns,
        primaryKeys,
        rows,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      })
    }

    return NextResponse.json({ error: 'Ungültige Aktion' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: `Datenbankfehler: ${err.message}` }, { status: 500 })
  }
}

/**
 * DELETE: Batch Delete von Datensätzen
 */
export async function DELETE(req: NextRequest) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { table, keys } = (await req.json()) as { table: string; keys: any[] }

    if (!table || !ALLOWED_TABLES.includes(table)) {
      return NextResponse.json({ error: 'Ungültige Tabelle' }, { status: 400 })
    }
    if (!Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json({ error: 'Keine Schlüssel zum Löschen übermittelt' }, { status: 400 })
    }

    // Spaltenmetadaten abfragen zur Ermittlung des Primärschlüssels
    const columns: any = await prisma.$queryRawUnsafe(`
      SELECT COLUMN_NAME as name, COLUMN_KEY as \`key\`
      FROM information_schema.columns
      WHERE table_schema = DATABASE() AND table_name = '${table}'
    `)
    const primaryKeys = columns.filter((c: any) => c.key === 'PRI').map((c: any) => c.name)

    if (primaryKeys.length === 0) {
      return NextResponse.json({ error: 'Die Tabelle hat keinen Primärschlüssel' }, { status: 400 })
    }

    let affectedRows = 0

    // Löschvorgang in einer sicheren Transaktion durchführen
    await prisma.$transaction(async (tx) => {
      // Wenn zusammengesetzter Primärschlüssel vorliegt (z.B. UserProgress, Bookmarks)
      if (primaryKeys.length > 1) {
        for (const keyObj of keys) {
          const conditions = primaryKeys.map((pk: string) => {
            const val = keyObj[pk]
            const escapedVal = typeof val === 'string' ? `'${val.replace(/['"\\]/g, '')}'` : val
            return `\`${pk}\` = ${escapedVal}`
          })
          const deleteSql = `DELETE FROM \`${table}\` WHERE ${conditions.join(' AND ')}`
          affectedRows += await tx.$executeRawUnsafe(deleteSql)
        }
      } else {
        // Einfacher Primärschlüssel (z.B. id)
        const pkName = primaryKeys[0]
        const escapedKeys = keys.map((k) => {
          const val = typeof k === 'object' && k !== null ? k[pkName] : k
          return typeof val === 'string' ? `'${val.replace(/['"\\]/g, '')}'` : val
        })

        // In Chunks aufteilen (jeweils max 1000 Einträge pro DELETE-Statement wegen SQL-Längenbegrenzung)
        const chunkSize = 1000
        for (let i = 0; i < escapedKeys.length; i += chunkSize) {
          const chunk = escapedKeys.slice(i, i + chunkSize)
          const deleteSql = `DELETE FROM \`${table}\` WHERE \`${pkName}\` IN (${chunk.join(', ')})`
          affectedRows += await tx.$executeRawUnsafe(deleteSql)
        }
      }
    })

    return NextResponse.json({ success: true, affectedRows })
  } catch (err: any) {
    return NextResponse.json({ error: `Fehler beim Löschen: ${err.message}` }, { status: 500 })
  }
}

/**
 * POST: Batch Insert (JSON oder SQL-Statements)
 */
export async function POST(req: NextRequest) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { format, table, payload } = (await req.json()) as {
      format: 'json' | 'sql'
      table: string
      payload: any
    }

    if (!table || !ALLOWED_TABLES.includes(table)) {
      return NextResponse.json({ error: 'Ungültige Tabelle' }, { status: 400 })
    }

    let affectedRows = 0

    // -------------------------------------------------------------------------
    // Format: SQL-Statements (rohe INSERT INTO statements aus insert_db.txt)
    // -------------------------------------------------------------------------
    if (format === 'sql') {
      if (typeof payload !== 'string' || !payload.trim()) {
        return NextResponse.json({ error: 'Ungültiges SQL-Payload' }, { status: 400 })
      }

      // Einzelne SQL-Befehle parsen (Aufteilung an Semikolons außerhalb von Hochkommas)
      const rawStatements = payload
        .split(/;(?=(?:[^']*'[^']*')*[^']*$)/g) // Splittet an Semikolons, ignoriert Semikolons in Strings
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      // Nur INSERT INTO / UPDATE / DELETE erlauben
      const illegalKeywords = ['drop', 'truncate', 'alter', 'create', 'grant', 'revoke']
      for (const stmt of rawStatements) {
        // Entferne SQL-Kommentare für die Typprüfung
        const cleanStmt = stmt
          .replace(/--.*$/gm, '')
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .trim()
        
        if (cleanStmt.length === 0) continue

        const lower = cleanStmt.toLowerCase()
        const firstWord = lower.split(/[\s(]+/)[0]
        if (illegalKeywords.includes(firstWord)) {
          return NextResponse.json(
            { error: `Ungültiger Befehl blockiert: Strukturänderungen sind im Batch-Import verboten. (${firstWord.toUpperCase()} nicht erlaubt)` },
            { status: 400 }
          )
        }
      }

      await prisma.$transaction(async (tx) => {
        // Fremdschlüssel-Prüfungen temporär ausschalten
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;')

        for (const stmt of rawStatements) {
          affectedRows += await tx.$executeRawUnsafe(stmt)
        }

        // Fremdschlüssel-Prüfungen wieder aktivieren
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;')
      })

      return NextResponse.json({ success: true, affectedRows })
    }

    // -------------------------------------------------------------------------
    // Format: JSON-Array
    // -------------------------------------------------------------------------
    if (format === 'json') {
      const records = typeof payload === 'string' ? JSON.parse(payload) : payload
      if (!Array.isArray(records) || records.length === 0) {
        return NextResponse.json({ error: 'Payload muss ein nicht-leeres JSON-Array sein' }, { status: 400 })
      }

      // Spalten aus Metadaten auslesen zur Typsicherstellung
      const columns: any = await prisma.$queryRawUnsafe(`
        SELECT COLUMN_NAME as name, DATA_TYPE as type
        FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = '${table}'
      `)
      const colNames = columns.map((c: any) => c.name)

      await prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;')

        for (const record of records) {
          const keys = Object.keys(record).filter((k) => colNames.includes(k))
          if (keys.length === 0) continue

          const colString = keys.map((k) => `\`${k}\``).join(', ')
          const valString = keys
            .map((k) => {
              const val = record[k]
              if (val === null || val === undefined) return 'NULL'
              if (typeof val === 'string') return `'${val.replace(/['"\\]/g, '')}'`
              if (typeof val === 'boolean') return val ? '1' : '0'
              if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`
              return val
            })
            .join(', ')

          const insertSql = `INSERT INTO \`${table}\` (${colString}) VALUES (${valString})`
          affectedRows += await tx.$executeRawUnsafe(insertSql)
        }

        await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;')
      })

      return NextResponse.json({ success: true, affectedRows })
    }

    return NextResponse.json({ error: 'Format nicht unterstützt' }, { status: 400 })
  } catch (err: any) {
    return NextResponse.json({ error: `Importfehler: ${err.message}` }, { status: 500 })
  }
}

/**
 * PUT: Raw SQL Console
 */
export async function PUT(req: NextRequest) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return NextResponse.json({ error: authCheck.error }, { status: authCheck.status })
  }

  try {
    const { sql } = (await req.json()) as { sql: string }
    if (!sql || !sql.trim()) {
      return NextResponse.json({ error: 'SQL-Befehl darf nicht leer sein' }, { status: 400 })
    }

    const trimmed = sql.trim().toLowerCase()

    // Destruktive DDL-Befehle blockieren zur Sicherheit der Plattform
    const blockedKeywords = ['drop database', 'alter database', 'flush privileges']
    if (blockedKeywords.some((keyword) => trimmed.includes(keyword))) {
      return NextResponse.json({ error: 'Sicherheitsfehler: Dieser administrative Befehl ist blockiert.' }, { status: 403 })
    }

    // Wenn es ein SELECT-Befehl oder SHOW-Befehl ist, Ergebnisse ausgeben
    if (trimmed.startsWith('select') || trimmed.startsWith('show') || trimmed.startsWith('describe') || trimmed.startsWith('explain')) {
      const result = await prisma.$queryRawUnsafe(sql)
      return NextResponse.json({ success: true, isQuery: true, data: result })
    } else {
      // DML (Insert, Update, Delete)
      const affectedRows = await prisma.$executeRawUnsafe(sql)
      return NextResponse.json({ success: true, isQuery: false, affectedRows })
    }
  } catch (err: any) {
    return NextResponse.json({ error: `SQL-Ausführungsfehler: ${err.message}` }, { status: 500 })
  }
}
