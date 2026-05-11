import { auth } from "@/lib/auth"
import prisma from "@/db/client"

export async function GET() {
  const session = await auth()
  
  // Verify that the user is an admin
  if (session?.user?.role !== "admin") {
    return new Response("Zugriff verweigert", { status: 403 })
  }

  const filename = `backup_${new Date().toISOString().slice(0, 19).replace(/T/, "_").replace(/:/g, "-")}.sql`

  try {
    const tables = [
      { name: "users", model: prisma.user },
      { name: "subjects", model: prisma.subject },
      { name: "lessons", model: prisma.lesson },
      { name: "user_progress", model: prisma.userProgress },
      { name: "bookmarks", model: prisma.bookmark },
      { name: "lesson_notes", model: prisma.lessonNote },
      { name: "audit_logs", model: prisma.auditLog },
      { name: "system_settings", model: prisma.systemSetting }
    ]

    let output = `-- Code & Cash Lernplattform Next.js - SQL Dump\n`
    output += `-- Generiert am: ${new Date().toISOString()}\n\n`
    output += `SET FOREIGN_KEY_CHECKS=0;\n\n`

    for (const table of tables) {
      output += `-- Table: ${table.name}\n`
      output += `DELETE FROM ${table.name};\n`

      const rows = await (table.model as any).findMany()

      if (rows.length === 0) {
        output += `-- Keine Daten für ${table.name}\n\n`
        continue
      }

      for (const row of rows) {
        // Exclude virtual fields or relations (which are lowercase/uppercase objects)
        const keys = Object.keys(row).filter(key => typeof row[key] !== "object" || row[key] instanceof Date || row[key] === null)
        const escapedValues = keys.map((key) => {
          const v = row[key]
          if (v === null || v === undefined) return "NULL"
          if (typeof v === "number") return v
          if (typeof v === "boolean") return v ? "1" : "0"
          if (v instanceof Date) return `'${v.toISOString().slice(0, 19).replace("T", " ")}'`
          
          // Escape single quotes and backslashes for SQL insertion
          const escapedStr = String(v).replace(/\\/g, "\\\\").replace(/'/g, "''")
          return `'${escapedStr}'`
        })

        output += `INSERT INTO ${table.name} (${keys.join(", ")}) VALUES (${escapedValues.join(", ")});\n`
      }
      output += `\n`
    }

    output += `SET FOREIGN_KEY_CHECKS=1;\n`

    // Log the backup action to audit logs
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: `Datenbank-Backup via SQL-Export heruntergeladen (${filename}).`,
        details: `Größe: ${Buffer.byteLength(output)} Bytes`
      }
    }).catch(console.error)

    return new Response(output, {
      headers: {
        "Content-Type": "application/sql",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(Buffer.byteLength(output))
      }
    })

  } catch (err: any) {
    return new Response(`Fehler beim Erstellen des Backups: ${err.message}`, { status: 500 })
  }
}
