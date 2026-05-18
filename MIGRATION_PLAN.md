# Schlachtplan: Lernplattform v2 (Neues Projekt)

## Entscheidungen (bestätigt)

- **Subjects:** User-spezifisch (Multi-Tenancy)
- **IDs:** String-CUIDs (Auth.js-Standard)
- **Markdown-Rendering:** Server-seitig
- **PWA:** Beibehalten
- **Deployment:** Vercel
- **Projektansatz:** Komplett neues Projekt – kein Umbau des bestehenden Repos

---

## Projekt-Setup

Das neue Projekt wird in einem **eigenen Verzeichnis** angelegt:
```
c:\xampp\htdocs\files\lernplattform_v2\
```
Das alte Projekt unter `lernplattform/` bleibt unangetastet und dient als Referenz.

---

## Phasenplan (7 Phasen)

> **WICHTIG:** Jede Phase ist ein eigenständiger, testbarer Meilenstein.

---

### Phase 0: Projekt-Scaffolding

**Ziel:** Neues Next.js-Projekt mit komplettem Tooling aufsetzen.

1. **Next.js initialisieren:**
   ```bash
   npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --no-turbopack --import-alias "@/*"
   ```
2. **Dependencies:**
   ```bash
   npm install prisma @prisma/client next-auth@beta bcryptjs next-themes zod react-markdown remark-gfm rehype-raw rehype-sanitize
   npm install -D @types/bcryptjs vitest
   ```
3. **Config-Dateien** aus dem Referenzprojekt (adaptives-lerntool) übernehmen:
   - `next.config.ts` (Security-Headers)
   - `vitest.config.ts`
   - `postcss.config.mjs`
4. **`.env` anlegen** mit `DATABASE_URL`, `NEXTAUTH_SECRET`, `AUTH_URL`
5. **Ordnerstruktur:**
   ```
   src/
   ├── app/
   │   ├── (auth)/login/ & register/
   │   ├── (main)/                    # Dashboard, Learning, Profile
   │   ├── admin/                     # Admin-Panel
   │   └── api/                       # Route Handlers
   ├── components/
   │   ├── ui/                        # Button, Card, Modal, Form
   │   ├── layout/                    # Sidebar, Topbar
   │   └── features/                  # QuizEngine, Search, Editor
   ├── db/client.ts                   # Prisma-Singleton
   ├── lib/                           # Auth, Validierung, Actions
   └── types/                         # Globale TS-Typen
   ```
6. **PWA-Setup:** `next-pwa` oder manuelles Service-Worker + `manifest.json`
7. **Git init + erster Commit**

**Ergebnis:** `npm run dev` zeigt eine leere Next.js-App.

---

### Phase 1: Prisma-Schema & Datenmigration

**Ziel:** Komplettes DB-Schema in Prisma abbilden. Subjects werden User-spezifisch.

#### Schema-Design (`prisma/schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String
  role          String    @default("student")  // "student" | "admin"
  streak        Int       @default(0)
  bio           String    @default("")
  theme         String    @default("dark")
  isBanned      Boolean   @default(false)
  createdAt     DateTime  @default(now())

  accounts      Account[]
  sessions      Session[]
  subjects      Subject[]
  progress      UserProgress[]
  bookmarks     Bookmark[]
  notes         LessonNote[]
  auditLogs     AuditLog[]
  lessons       Lesson[]    @relation("AuthoredLessons")

  @@map("users")
}

model Subject {
  id        String   @id @default(cuid())
  userId    String
  title     String
  color     String   @default("#3b82f6")
  icon      String   @default("ph-book")
  createdAt DateTime @default(now())

  user    User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessons Lesson[]

  @@unique([userId, title])
  @@map("subjects")
}

model Lesson {
  id         String   @id @default(cuid())
  subjectId  String
  authorId   String?
  title      String
  content    String   @db.Text   // Gerendertes HTML
  contentRaw String   @default("") @db.Text  // Markdown / Quiz-JSON
  type       String   @default("article")  // "article" | "quiz"
  status     String   @default("published")  // "draft" | "published"
  sortOrder  Int      @default(0)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  subject   Subject        @relation(fields: [subjectId], references: [id], onDelete: Cascade)
  author    User?          @relation("AuthoredLessons", fields: [authorId], references: [id], onDelete: SetNull)
  progress  UserProgress[]
  bookmarks Bookmark[]
  notes     LessonNote[]

  @@map("lessons")
}

model UserProgress {
  userId    String
  lessonId  String
  status    String    @default("completed")  // "pending" | "completed"
  score     Int?
  updatedAt DateTime  @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@id([userId, lessonId])
  @@map("user_progress")
}

model Bookmark {
  userId    String
  lessonId  String
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@id([userId, lessonId])
  @@map("bookmarks")
}

model LessonNote {
  userId    String
  lessonId  String
  content   String   @db.Text
  updatedAt DateTime @updatedAt

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@id([userId, lessonId])
  @@map("lesson_notes")
}

model AuditLog {
  id        String   @id @default(cuid())
  userId    String
  action    String
  details   String?  @db.Text
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("audit_logs")
}

model SystemSetting {
  settingKey   String   @id
  settingValue String   @db.Text
  updatedAt    DateTime @updatedAt

  @@map("system_settings")
}

// --- Auth.js Pflichtmodelle ---
model Account { /* ... Standard Auth.js */ }
model Session { /* ... Standard Auth.js */ }
model VerificationToken { /* ... Standard Auth.js */ }
```

#### Schritte

1. `prisma/schema.prisma` erstellen
2. `src/db/client.ts` — Prisma-Singleton
3. `npx prisma migrate dev --name init`
4. `prisma/seed.ts` — Testdaten + Admin-User
5. **Migrations-Script** (`scripts/migrate-data.ts`): Daten aus alter DB kopieren, Integer-IDs → CUIDs

**Ergebnis:** `npx prisma studio` zeigt alle Tabellen.

---

### Phase 2: Authentifizierung

**Ziel:** Auth.js mit Credentials Provider, JWT, Rollen-System.

| Alt (PHP) | Neu (Next.js) |
|---|---|
| `$_SESSION` + `bootstrap.php` | `src/lib/auth.ts` (JWT) |
| `AuthController@login` | Auth.js `signIn("credentials")` |
| `AuthController@register` | `src/app/api/auth/register/route.ts` |
| `requireAuth()` + CSRF | `src/middleware.ts` |
| `requireAdmin()` | Role-Check in Middleware |

#### Dateien

- `src/lib/auth.ts` — NextAuth-Config (inkl. `role` im JWT)
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/api/auth/register/route.ts`
- `src/middleware.ts` — Route-Protection
- `src/lib/validations.ts` — Zod-Schemas
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`

**Ergebnis:** Login/Register/Logout funktioniert. Geschützte Routen leiten auf `/login` um.

---

### Phase 3: Layout & Navigation

**Ziel:** App-Shell mit Sidebar, Topbar, Theme-Toggle als React-Komponenten.

| Alt | Neu |
|---|---|
| `header.php` + `footer.php` | `src/app/(main)/layout.tsx` |
| `Sidebar.js` + `_sidebar.css` | `src/components/layout/Sidebar.tsx` |
| `_topbar.css` | `src/components/layout/Topbar.tsx` |
| `ThemeToggle.js` | `src/components/ThemeToggle.tsx` + `next-themes` |
| `variables.css` (Farben) | Tailwind-Theme in `globals.css` |
| `app.js` (SPA-Router) | Entfällt (Next.js App Router) |

#### Schritte

1. **`globals.css`** — Tailwind + Custom-Theme-Tokens (Farben/Spacing aus `variables.css`)
2. **`ThemeProvider.tsx`** — `next-themes`
3. **`(main)/layout.tsx`** — Sidebar + Content-Area + Topbar
4. **`Sidebar.tsx`** — Fächer-Navigation, aktiver Zustand, responsive (Drawer auf Mobile)
5. **`Topbar.tsx`** — Search-Trigger, User-Menu, Theme-Toggle

**Ergebnis:** Navigierbare, responsive App-Shell.

---

### Phase 4: Kern-Features

#### 4a — Dashboard (`(main)/page.tsx`)
- Server Component mit Prisma-Queries (Fortschritt, Streak, Subject-Cards)
- Ersetzt: `dashboard.view.php` + `Dashboard.js` + `GET /api/content/dashboard`

#### 4b — Learning-View (komplexeste Seite)
- `(main)/subjects/[subjectId]/page.tsx` — Lektionsliste
- `(main)/lessons/[lessonId]/page.tsx` — Lektionsinhalt
- **Server-seitiges Markdown-Rendering** via `react-markdown` + `remark-gfm` + `rehype-raw` im Server Component
- Zen-Mode, TOC, Lesezeit als Client-Subkomponenten
- Code-Playground als Client Component mit sandboxed iframe
- Ersetzt: `learning.view.php` + `Learning.js` (36 KB)

#### 4c — Quiz-Engine
- `src/components/features/QuizEngine.tsx` (Client Component)
- Quiz-JSON aus `contentRaw`, validiert mit Zod
- Ersetzt: `QuizEngine.js` (16 KB)

#### 4d — Profil
- `(main)/profile/page.tsx` — Server Component + Client-Form
- Server Actions für Update/Theme/Export
- Ersetzt: `profile.view.php` + `Profile.js`

#### 4e — Editor
- `admin/editor/page.tsx` — Markdown-Editor (Client Component)
- Server Actions für CRUD
- Ersetzt: `editor.view.php` + `Editor.js`

#### 4f — Admin-Panel
- `admin/layout.tsx` + Unterseiten: `/users`, `/content`, `/audit`, `/settings`
- Dashboard-Cockpit, User-Management, Content-Reorder, Bulk-Actions, Audit-Logs, System-Settings, Impersonation
- Ersetzt: `admin.view.php` + `Admin.js` (41 KB) + 17 API-Routen

**Ergebnis:** Alle Kernfunktionen laufen.

---

### Phase 5: Student-Features & Suche

- **Bookmarks & Notizen** → Server Actions in `src/lib/actions/student.ts`
- **Suche** → `src/components/features/SearchDialog.tsx` + `src/app/api/search/route.ts`
- `ApiService.js` entfällt komplett (Server Actions ersetzen alles)

---

### Phase 6: QA & Polish

1. **Vitest** — Unit-Tests für Lib-Logik, API-Route-Tests
2. **SEO** — `metadata`-Exports, `robots.ts`, `sitemap.ts`
3. **Error-Handling** — `error.tsx`, `not-found.tsx`, `loading.tsx`
4. **Performance** — `next/image`, `next/font`
5. **Accessibility** — Fokus-States, ARIA, Keyboard-Nav
6. **PWA** — Service-Worker, Manifest, Offline-Fallback

---

### Phase 7: Deployment & Cutover

1. **Vercel-Projekt** einrichten (GitHub-Repo verbinden)
2. **Environment-Variablen** in Vercel setzen
3. **PostgreSQL** auf Vercel Postgres oder Supabase
4. **Datenmigration** vom alten System ausführen
5. **Domain konfigurieren** → DNS umstellen
6. **Altes Projekt archivieren**

---

## API-Routen-Mapping

| PHP-Route | Next.js-Äquivalent |
|---|---|
| `POST /api/auth/login` | Auth.js `signIn()` |
| `POST /api/auth/register` | `api/auth/register/route.ts` |
| `GET /api/auth/logout` | Auth.js `signOut()` |
| `GET /api/content/*` | Server Components (kein API nötig) |
| `CRUD /api/articles/{id}` | `api/lessons/[id]/route.ts` |
| `POST /api/progress/toggle` | Server Action |
| `GET/POST /api/student/*` | Server Actions |
| `GET/POST /api/profile/*` | Server Actions |
| `GET /api/search` | `api/search/route.ts` |
| `GET/POST /api/admin/*` | `api/admin/*/route.ts` + Server Actions |
| `POST /api/media/upload` | `api/media/upload/route.ts` |

---

## Zeitschätzung

| Phase | Aufwand |
|---|---|
| Phase 0: Scaffolding | 0,5 Tage |
| Phase 1: Prisma-Schema | 1 Tag |
| Phase 2: Auth | 1 Tag |
| Phase 3: Layout | 1,5 Tage |
| Phase 4: Kern-Features | 4–6 Tage |
| Phase 5: Student-Features | 1 Tag |
| Phase 6: QA & Polish | 1–2 Tage |
| Phase 7: Deployment | 0,5 Tage |
| **Gesamt** | **~11–14 Tage** |

## Empfohlene Reihenfolge

```
Phase 0 → 1 → 2 → 3 → 4b (Learning) → 4a (Dashboard) → 4c (Quiz) → 4d (Profil) → 4e+4f (Admin) → 5 → 6 → 7
```
