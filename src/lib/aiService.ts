import prisma from "@/db/client"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export async function getAIKeys() {
  try {
    // Query database system_settings
    const setting = await prisma.systemSetting.findUnique({
      where: { settingKey: "ai_settings" }
    })

    let anthropicKey = ""
    let geminiKey = ""

    if (setting) {
      try {
        const parsed = JSON.parse(setting.settingValue)
        anthropicKey = parsed.anthropicApiKey || ""
        geminiKey = parsed.geminiApiKey || ""
      } catch (e) {
        console.error("Fehler beim Parsen der DB-KI-Keys:", e)
      }
    }

    // Fallback to env if database keys are empty/not present
    if (!anthropicKey) {
      anthropicKey = process.env.ANTHROPIC_API_KEY || ""
    }
    if (!geminiKey) {
      geminiKey = process.env.GEMINI_API_KEY || ""
    }

    // If set to "mock", treat as empty
    if (anthropicKey === "mock") anthropicKey = ""
    if (geminiKey === "mock") geminiKey = ""

    return {
      anthropicKey,
      geminiKey,
      isMockMode: !anthropicKey && !geminiKey
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der AI-Keys aus der DB:", error)
    return {
      anthropicKey: "",
      geminiKey: "",
      isMockMode: true
    }
  }
}

async function callClaude(apiKey: string, systemPrompt: string, messages: ChatMessage[]): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 1524,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Claude API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.content?.[0]?.text || ""
}

async function callGemini(apiKey: string, systemPrompt: string, messages: ChatMessage[]): Promise<string> {
  const contents = messages.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }]
  }))

  const payload: any = {
    contents
  }

  if (systemPrompt) {
    payload.systemInstruction = {
      parts: [{ text: systemPrompt }]
    }
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API Error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

// -------------------------------------------------------------
// Core AI Orchestrators called by API route handlers
// -------------------------------------------------------------

export async function generateChatResponse(
  lessonTitle: string,
  lessonContent: string,
  messages: ChatMessage[]
): Promise<string> {
  const { anthropicKey, geminiKey, isMockMode } = await getAIKeys()

  if (isMockMode) {
    return generateMockChatResponse(lessonTitle, messages)
  }

  const systemPrompt = `Du bist ein hochqualifizierter, geduldiger und motivierender KI-Lektor für die Lernplattform "Code & Cash". 
Das aktuelle Thema der Lektion, die der Student gerade lernt, ist: "${lessonTitle}".
Hier ist der Inhalt der Lektion als Kontext für dich:
---
${lessonContent}
---
Beantworte Fragen des Benutzers verständlich, professionell und praxisnah. Nutze Markdown-Formatierungen (wie fett, kursiv, Listen, Überschriften und Codeblöcke), um deine Antworten gut lesbar zu gestalten. Halte deine Antworten prägnant.`

  try {
    if (anthropicKey) {
      return await callClaude(anthropicKey, systemPrompt, messages)
    } else {
      return await callGemini(geminiKey, systemPrompt, messages)
    }
  } catch (error) {
    console.error("Live AI Chat fehlgeschlagen, weiche auf Mock aus:", error)
    return generateMockChatResponse(lessonTitle, messages) + "\n\n*(Hinweis: Live KI-Verbindung fehlgeschlagen, Simulationsmodus aktiv)*"
  }
}

export async function generateExplanation(
  question: string,
  userAnswer: string,
  correctAnswer: string
): Promise<string> {
  const { anthropicKey, geminiKey, isMockMode } = await getAIKeys()

  if (isMockMode) {
    return generateMockExplanation(question, userAnswer, correctAnswer)
  }

  const systemPrompt = `Du bist ein KI-Tutor. Deine Aufgabe ist es, einem Programmierstudenten verständlich und ermutigend zu erklären, warum seine gewählte Quiz-Antwort falsch war und warum die richtige Antwort korrekt ist. Beantworte in deutscher Sprache und verwende ansprechendes Markdown.`

  const prompt = `Frage im Quiz: "${question}"
Vom Benutzer gewählte falsche Antwort: "${userAnswer}"
Die tatsächliche korrekte Antwort: "${correctAnswer}"

Bitte erkläre logisch, warum die gewählte Antwort nicht passt und warum die korrekte Antwort die richtige Wahl ist. Biete Tipps für das Verständnis des zugrunde liegenden Konzepts.`

  const messages: ChatMessage[] = [{ role: "user", content: prompt }]

  try {
    if (anthropicKey) {
      return await callClaude(anthropicKey, systemPrompt, messages)
    } else {
      return await callGemini(geminiKey, systemPrompt, messages)
    }
  } catch (error) {
    console.error("Live AI Explanation fehlgeschlagen, weiche auf Mock aus:", error)
    return generateMockExplanation(question, userAnswer, correctAnswer) + "\n\n*(Hinweis: Live KI-Verbindung fehlgeschlagen, Simulationsmodus aktiv)*"
  }
}

export async function generateSummary(
  lessonTitle: string,
  lessonContent: string
): Promise<string> {
  const { anthropicKey, geminiKey, isMockMode } = await getAIKeys()

  if (isMockMode) {
    return generateMockSummary(lessonTitle, lessonContent)
  }

  const systemPrompt = `Du bist ein präziser Spickzettel-Generator für Programmier-Lektionen. Deine Aufgabe ist es, den Inhalt der Lektion kurz, prägnant und übersichtlich zusammenzufassen.`

  const prompt = `Erstelle eine erstklassige Zusammenfassung (Spickzettel) der Lektion mit dem Titel "${lessonTitle}".
Nutze genau 5 Bullet-Points (Spannungspunkte / Kernaspekte). Nutze Markdown und halte es extrem fokussiert und nützlich.
Inhalt der Lektion:
---
${lessonContent}
---`

  const messages: ChatMessage[] = [{ role: "user", content: prompt }]

  try {
    if (anthropicKey) {
      return await callClaude(anthropicKey, systemPrompt, messages)
    } else {
      return await callGemini(geminiKey, systemPrompt, messages)
    }
  } catch (error) {
    console.error("Live AI Summary fehlgeschlagen, weiche auf Mock aus:", error)
    return generateMockSummary(lessonTitle, lessonContent) + "\n\n*(Hinweis: Live KI-Verbindung fehlgeschlagen, Simulationsmodus aktiv)*"
  }
}

// -------------------------------------------------------------
// Simulations-Generatoren (Mock Mode)
// -------------------------------------------------------------

function generateMockSummary(lessonTitle: string, lessonContent: string): string {
  return `### ⚡ Spickzettel: ${lessonTitle}

Hier sind die 5 wichtigsten Kernpunkte dieser Lektion auf einen Blick zusammengefasst:

1. **Grundkonzept**: Das Hauptthema befasst sich mit der effizienten Strukturierung und Anwendung in echten Praxis-Projekten.
2. **Best Practices**: Schreibe immer sauberen, modularisierten Code, um die Wartbarkeit und Skalierbarkeit für Teams zu gewährleisten.
3. **Typische Fehler**: Vermeide redundante Logik (Anti-Pattern DRY) und unzureichende Validierung von Inputdaten.
4. **Performance-Fokus**: Achte auf minimale DOM-Manipulationen und nutze optimierte Selektoren für blitzschnelles Rendering.
5. **Praxistipp**: Setze das Gelernte direkt in unserem integrierten interaktiven **Code Playground** um, um ein Muskelgedächtnis aufzubauen!

*💡 Tipp: Du kannst diesen Spickzettel jederzeit aufklappen, um dein Wissen vor dem Quiz aufzufrischen.*`
}

function generateMockExplanation(question: string, userAnswer: string, correctAnswer: string): string {
  return `💡 **KI-Erklärung zum Quiz**

Deine ausgewählte Antwort **"${userAnswer}"** ist leider nicht korrekt. 

Die richtige Antwort ist **"${correctAnswer}"**.

**Warum ist das so?**
In der Praxis ist dieses Verhalten ein fundamentaler Bestandteil der Webentwicklung. Während deine Auswahl in einigen Randfällen logisch erscheinen mag, deckt die korrekte Antwort die standardkonforme, performante und fehlerfreie Methode ab. 

*Schlüsselerkenntnis:* Achte bei derartigen Szenarien besonders auf die Trennung von Zuständigkeiten (Separation of Concerns) und verwende die dafür vorgesehenen Best-Practice-Konventionen.`
}

function generateMockChatResponse(lessonTitle: string, messages: ChatMessage[]): string {
  const lastUserMsg = messages[messages.length - 1]?.content || ""
  const query = lastUserMsg.toLowerCase()

  let response = `### 🤖 Dein KI-Lerntutor

Hallo! Ich bin dein persönlicher Tutor für die Lektion **"${lessonTitle}"**. 

`
  if (query.includes("beispiel") || query.includes("code") || query.includes("how") || query.includes("wie")) {
    response += `Hier ist ein praktisches Code-Beispiel passend zu deiner Frage:

\`\`\`javascript
// Best Practice Demonstration
function handleInteraction(event) {
  const data = event.target.dataset;
  console.log("Erfolgreiche Interaktion mit:", data);
}
\`\`\`

**Erklärung des Beispiels:**
- Wir verwenden semantisch saubere Events.
- Der Code bleibt durch Entkopplung wiederverwendbar.
- Perfekt geeignet für moderne Browser-Umgebungen.`
  } else if (query.includes("warum") || query.includes("weshalb") || query.includes("fehler")) {
    response += `Gute Frage! Viele Entwickler stolpern am Anfang hierüber. 

Der Grund liegt in der sauberen Trennung von Logik und Darstellung. Wenn wir Logik und Design vermischen, führt das schnell zu "Spaghetti-Code", der schwer zu testen und zu warten ist. 

Indem wir uns an standardisierte Entwurfsmuster (Design Patterns) halten, machen wir unseren Code zukunftssicher.`
  } else {
    response += `Das ist ein spannender Aspekt! Zu der Lektion **"${lessonTitle}"** solltest du dir vor allem merken:

- **Einfachheit**: Halte deine Implementierungen KISS (*Keep It Simple, Stupid*).
- **Struktur**: Verwende immer die passende semantische Struktur.
- **Wiederverwendbarkeit**: Schreibe Funktionen, die genau eine Aufgabe lösen (Single Responsibility Principle).

Hast du noch eine spezifische Frage zu einem Code-Teil oder einem Begriff aus dieser Lektion? Ich helfe dir gerne beim Verstehen!`
  }

  return response
}
