import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(1, "Passwort wird benötigt"),
})

export const registerSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z.string().min(6, "Passwort muss mindestens 6 Zeichen lang sein"),
})

export const profileSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  bio: z.string().max(500, "Bio darf maximal 500 Zeichen lang sein").optional().default(""),
  occupation: z.string().max(200, "Beruf darf maximal 200 Zeichen lang sein").optional().default(""),
})

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Aktuelles Passwort wird benötigt"),
  newPassword: z.string().min(6, "Das neue Passwort muss mindestens 6 Zeichen lang sein"),
  confirmPassword: z.string().min(6, "Die Passwort-Bestätigung wird benötigt"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Die neuen Passwörter stimmen nicht überein",
  path: ["confirmPassword"]
})

export const lessonSchema = z.object({
  id: z.string().optional(),
  subjectId: z.string().min(1, "Fach wird benötigt"),
  title: z.string().min(2, "Titel muss mindestens 2 Zeichen lang sein"),
  type: z.enum(["article", "quiz"]),
  status: z.enum(["draft", "published"]),
  sortOrder: z.number().int().default(0),
  contentRaw: z.string().optional().default(""),
  content: z.string().optional().default(""),
})


