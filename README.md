# Adaptive Lernplattform v2

Eine moderne, KI-gestützte Lernplattform, die auf individuellen Lernfortschritt und adaptive Wissensvermittlung ausgelegt ist. Entwickelt mit Next.js, integriert die Plattform fortgeschrittene RAG-Konzepte (Retrieval-Augmented Generation) und dynamische Wissensgraphen für ein personalisiertes Lernerlebnis.

## ✨ Hauptfunktionen

*   **KI-gestütztes Adaptives Lernen:** Automatische Generierung von Lernpfaden, Concept-Nodes und gezielte Analyse von Schwachstellen.
*   **Intelligenter Tutor-Chat:** Ein integrierter KI-Assistent beantwortet Fragen, liefert Erklärungen und hilft bei der Prüfungsvorbereitung.
*   **Dokumentenverarbeitung & RAG:** Automatisierte Extraktion und Strukturierung von Lernmaterialien (PDFs, Dokumente).
*   **Quiz-Engine & Prüfungsmodus:** Dynamische Generierung von Fragen zur Wissensüberprüfung basierend auf dem aktuellen Kenntnisstand.
*   **Fortschrittstracking:** Visualisierung des Lernfortschritts inklusive Streaks und detaillierten Analysen.
*   **Umfangreiches Admin-Dashboard:** Verwaltung von Nutzern, Inhalten, Datenbank und KI-Einstellungen.

## 🛠️ Tech-Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Datenbank:** Relationale Datenbank (via [Prisma ORM](https://www.prisma.io/))
*   **Authentifizierung:** [NextAuth.js](https://next-auth.js.org/)
*   **KI & LLM:** Integration diverser LLM-Schnittstellen (Langchain/Custom) für RAG und Chat-Funktionalitäten.
*   **Deployment & Infrastruktur:** Docker-Unterstützung für einfache Containerisierung.

## 🚀 Erste Schritte

### Voraussetzungen

*   Node.js (ab v18 empfohlen)
*   Laufende Datenbank (kompatibel mit Prisma)
*   Ggf. Docker für das Container-Deployment

### Installation

1.  **Repository klonen**
    ```bash
    git clone <repository-url>
    cd lernplattform_v2
    ```

2.  **Abhängigkeiten installieren**
    ```bash
    npm install
    # oder
    yarn install
    ```

3.  **Umgebungsvariablen konfigurieren**
    Erstelle eine `.env`-Datei im Hauptverzeichnis (siehe `.env.example` falls vorhanden) und hinterlege die benötigten Variablen (Datenbank-URL, NextAuth-Secrets, KI-API-Keys etc.).

4.  **Datenbank initialisieren**
    ```bash
    npx prisma generate
    npx prisma db push
    # Für initiale Testdaten (falls vorhanden):
    # npx prisma db seed
    ```

5.  **Entwicklungsserver starten**
    ```bash
    npm run dev
    ```
    Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) erreichbar.

## 📦 Docker Deployment

Die Plattform beinhaltet ein Dockerfile sowie optional Docker Compose Support für ein schnelles, isoliertes Deployment.

```bash
docker build -t lernplattform .
docker run -p 3000:3000 lernplattform
```

## 📜 Skripte

*   `npm run dev` - Startet den Entwicklungsserver
*   `npm run build` - Erstellt den Produktions-Build
*   `npm run start` - Startet die produktive Instanz
*   `npm run lint` - Führt Code-Analysen durch
