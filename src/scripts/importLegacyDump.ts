import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

// Simple custom CUID generator
function makeId(prefix = "c") {
  return prefix + Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11)
}

function parseValues(valuesStr: string) {
  const result: string[] = []
  let current = ""
  let inString = false
  let escape = false
  let parenDepth = 0

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i]

    if (escape) {
      current += char
      escape = false
      continue
    }

    if (char === '\\') {
      current += char
      escape = true
      continue
    }

    if (char === "'") {
      inString = !inString
      current += char
      continue
    }

    if (!inString) {
      if (char === '(') {
        parenDepth++
        if (parenDepth === 1) continue
      } else if (char === ')') {
        parenDepth--
        if (parenDepth === 0) {
          result.push(current.trim())
          break
        }
      } else if (char === ',' && parenDepth === 1) {
        result.push(current.trim())
        current = ""
        continue
      }
    }

    current += char
  }

  return result.map(val => {
    val = val.trim()
    if (val === "NULL" || val === "null") return null
    if (val.startsWith("'") && val.endsWith("'")) {
      let unquoted = val.slice(1, -1)
      unquoted = unquoted
        .replace(/''/g, "'")
        .replace(/\\'/g, "'")
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t")
      return unquoted
    }
    if (val === "true" || val === "TRUE" || val === "'1'" || val === "1") return true
    if (val === "false" || val === "FALSE" || val === "'0'" || val === "0") return false
    if (!isNaN(val as any)) return Number(val)
    return val
  })
}

async function run() {
  console.log("=== STARTING LEGACY POSTGRES DUMP MIGRATION ===")

  const dumpPath = path.join(__dirname, "..", "..", "backup_2026-05-11_08-40-26.sql")
  if (!fs.existsSync(dumpPath)) {
    console.error("SQL Dump-Datei nicht gefunden unter:", dumpPath)
    process.exit(1)
  }

  const dumpContent = fs.readFileSync(dumpPath, "utf-8")
  
  // Split content by INSERT statements
  const inserts = dumpContent.split(/INSERT INTO\s+/i)
  console.log(`Gefundene Segmente im SQL-Dump: ${inserts.length}`)

  const rowsByTable: Record<string, any[]> = {
    users: [],
    subjects: [],
    lessons: [],
    user_progress: [],
    audit_logs: []
  }

  // Parse each INSERT statement segment
  for (let i = 1; i < inserts.length; i++) {
    const segment = inserts[i].trim()
    if (!segment) continue

    // Extract table name
    const tableMatch = segment.match(/^(\w+)/)
    if (!tableMatch) continue
    const tableName = tableMatch[1].toLowerCase()

    if (!rowsByTable[tableName]) {
      continue // Skip unneeded tables like kunden
    }

    // Extract columns
    const columnsMatch = segment.match(/^\w+\s*\(([^)]+)\)/)
    if (!columnsMatch) continue
    const columns = columnsMatch[1].split(",").map(c => c.trim().toLowerCase())

    // Extract values block
    const valuesIndex = segment.indexOf("VALUES")
    if (valuesIndex === -1) continue
    const valuesPart = segment.substring(valuesIndex + 6).trim()

    // Parse the values row
    const parsedValues = parseValues(valuesPart)

    // Map column names to values
    const row: Record<string, any> = {}
    columns.forEach((col, idx) => {
      row[col] = parsedValues[idx]
    })

    rowsByTable[tableName].push(row)
  }

  console.log("=== GEFUNDENE EINTRÄGE PRO TABELLE ===")
  Object.keys(rowsByTable).forEach(tbl => {
    console.log(`- ${tbl}: ${rowsByTable[tbl].length} Zeilen`)
  })

  // Clear existing records in correct relation order (leaves first)
  console.log("\nLösche bestehende v2-Datenbanktabellen...")
  await prisma.auditLog.deleteMany()
  await prisma.userProgress.deleteMany()
  await prisma.lesson.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.user.deleteMany()
  console.log("Datenbanktabellen erfolgreich geleert.")

  // ID Maps to translate integer IDs into String CUIDs
  const userMap: Record<number, string> = {}
  const subjectMap: Record<number, string> = {}
  const lessonMap: Record<number, string> = {}

  let adminUserId = ""

  // 1. Migrate Users
  console.log("\nMigriere Benutzer...")
  for (const row of rowsByTable.users) {
    const newId = makeId("u")
    userMap[row.id] = newId

    if (row.role === "admin") {
      adminUserId = newId // Keep track of admin CUID to assign global subjects
    }

    await prisma.user.create({
      data: {
        id: newId,
        name: row.name,
        email: row.email,
        password: row.password_hash, // Transfer existing bcrypt hash directly!
        role: row.role || "student",
        bio: row.bio || "",
        theme: row.theme || "dark",
        isBanned: !!row.is_banned,
        createdAt: row.created_at ? new Date(row.created_at) : new Date()
      }
    })
    console.log(`  User: ${row.name} (${row.email}) -> Mapped to ID: ${newId}`)
  }

  // Fallback if no admin was found
  if (!adminUserId) {
    adminUserId = Object.values(userMap)[0] || makeId("u")
    console.log(`Warnung: Kein Admin-User gefunden. Verwende ID: ${adminUserId} als Fallback für Fach-Eigentümer.`)
  }

  // 2. Migrate Subjects
  console.log("\nMigriere Fächer...")
  for (const row of rowsByTable.subjects) {
    const newId = makeId("s")
    subjectMap[row.id] = newId

    await prisma.subject.create({
      data: {
        id: newId,
        userId: adminUserId, // In v2, subjects are owned by an admin user for tenant routing
        title: row.title,
        color: row.color || "#3b82f6",
        icon: row.icon || "ph-book"
      }
    })
    console.log(`  Subject: ${row.title} -> Mapped to ID: ${newId}`)
  }

  // 3. Migrate Lessons
  console.log("\nMigriere Lektionen...")
  for (const row of rowsByTable.lessons) {
    const newId = makeId("l")
    lessonMap[row.id] = newId

    const mappedSubjectId = subjectMap[row.subject_id]
    if (!mappedSubjectId) {
      console.log(`  Überspringe Lektion "${row.title}" (ID: ${row.id}): Fach ID ${row.subject_id} nicht gefunden.`)
      continue
    }

    const mappedAuthorId = userMap[row.author_id] || adminUserId

    await prisma.lesson.create({
      data: {
        id: newId,
        subjectId: mappedSubjectId,
        authorId: mappedAuthorId,
        title: row.title,
        content: row.content || "",
        contentRaw: row.content_raw || "",
        type: row.type || "article",
        status: row.status || "published",
        sortOrder: Number(row.sort_order) || 0,
        createdAt: row.created_at ? new Date(row.created_at) : new Date(),
        updatedAt: row.updated_at ? new Date(row.updated_at) : new Date()
      }
    })
    console.log(`  Lesson: ${row.title} (Syllabus Order: ${row.sort_order}) -> Mapped to ID: ${newId}`)
  }

  // 4. Migrate User Progress
  console.log("\nMigriere Lernfortschritte...")
  let progressCount = 0
  for (const row of rowsByTable.user_progress) {
    const mappedUserId = userMap[row.user_id]
    const mappedLessonId = lessonMap[row.lesson_id]

    if (!mappedUserId || !mappedLessonId) {
      continue // Skip if relation can't be resolved
    }

    await prisma.userProgress.create({
      data: {
        userId: mappedUserId,
        lessonId: mappedLessonId,
        status: row.status || "completed",
        score: row.score !== null ? Number(row.score) : null,
        updatedAt: row.updated_at ? new Date(row.updated_at) : new Date()
      }
    })
    progressCount++
  }
  console.log(`  Erfolgreich ${progressCount} Fortschrittseinträge importiert.`)

  // 5. Migrate Audit Logs
  console.log("\nMigriere System-Audit-Protokolle...")
  let auditCount = 0
  for (const row of rowsByTable.audit_logs) {
    const mappedUserId = userMap[row.user_id] || adminUserId

    await prisma.auditLog.create({
      data: {
        id: makeId("a"),
        userId: mappedUserId,
        action: row.action,
        details: row.details || "",
        createdAt: row.created_at ? new Date(row.created_at) : new Date()
      }
    })
    auditCount++
  }
  console.log(`  Erfolgreich ${auditCount} Audit-Protokolle importiert.`)

  console.log("\n=== MIGRATION ERFOLGREICH ABGESCHLOSSEN ===")
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
