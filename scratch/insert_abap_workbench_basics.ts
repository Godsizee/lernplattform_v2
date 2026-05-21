import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  const lessonId = 'lesson_abap_workbench_basics'
  const subjectId = 'sxh3e5ewi0qahenr6jg' // SAP ERP
  const authorId = 'u5ilhtdcn9ycti9tbmc'
  const title = 'Zusammenfassung: ABAP Workbench & Grundlagen'
  
  const contentRaw = `# Zusammenfassung: ABAP Workbench & Grundlagen

## 🖥️ 1. Systemarchitektur & Schichten

### **Die 3-Schichten-Architektur (Client-Server-Modell)**
Die technische Architektur eines SAP-NetWeaver-Systems ist modular aufgebaut, um Lasten effizient zu verteilen:
- **Präsentationsschicht (Presentation Layer):** Die Benutzeroberfläche (SAP GUI, SAP Fiori oder Web-Browser). Nimmt Tastatur- und Maus-Eingaben entgegen, bereitet diese auf und sendet sie an die Applikationsschicht. Führt selbst *keine* Geschäftslogik aus.
- **Applikationsschicht (Application Layer):** Hier arbeitet die ABAP-Laufzeitumgebung auf den Applikationsservern. Führt den ABAP-Code aus, verarbeitet die Geschäftslogik und kommuniziert mit der Datenbank.
- **Datenbankschicht (Database Layer):** Das relationale Datenbanksystem (z. B. SAP HANA). Speichert alle Stammdaten, Customizing-Einstellungen und den ABAP-Quellcode.

### **Ergänzung: Workprozesse & Dispatcher**
Der Applikationsserver verwaltet eingehende Anforderungen hochgradig dynamisch:
- **Dispatcher:** Der Manager des Applikationsservers. Er nimmt Benutzeranfragen entgegen, reiht sie in die Request-Queue ein und verteilt sie effizient an freie Workprozesse.
- **Workprozess:** Das ausführende Glied. Er führt den ABAP-Code aus und stellt die Schnittstelle zur Datenbank dar.
- **Die 5 elementaren Workprozess-Typen (D-U-B-S-E):**
  1. **Dialog (DIA):** Verarbeitet interaktive Anfragen aktiver Benutzer (mind. 2 pro System).
  2. **Update/Verbuchung (UPD):** Führt zeitkritische Datenbankänderungen asynchron im Hintergrund aus (V1 & V2 Verbuchung).
  3. **Background (BTC):** Führt periodische/Hintergrund-Jobs (Batch) aus.
  4. **Spool (SPO):** Bereitet Dokumente und Daten für den physikalischen Druck vor.
  5. **Enqueue (ENQ):** Verwaltet das logische SAP-Sperrwesen auf Applikationsebene.

## 🌐 2. Systemlandschaft & Transportwesen

### **Die klassische 3-Systemlandschaft**
Um den laufenden Geschäftsbetrieb vor Fehlern zu schützen, trennt SAP die Softwareentwicklung strikt:
1. **Entwicklung (DEV):** Programmierung & Customizing. Fehler sind unkritisch.
2. **Qualitätssicherung (QAS):** Funktions- & Integrationstests mit Testdatenkopien.
3. **Produktiv (PRD):** Operatives Geschäft mit höchster Sicherheitsstufe.

### **Das Transportwesen (TMS)**
Der Change and Transport System (CTS) steuert den Transfer von Änderungen:
- **Transportauftrag (Request):** Container auf OS-Ebene, der geänderte, gelöschte oder neue Objekte bündelt.
- **Transportaufgabe (Task):** Untereinheit des Auftrags, in der Regel genau einem Entwickler zugeordnet.
- **Transportweg (Route):** Logische Verbindung zwischen Systemen im TMS (z. B. DEV nach QAS).
- **Transportlayer:** Steuert standardmäßigen Transportweg anhand der Paketzuordnung.

### **Der typische Transportablauf (Phasen)**
1. **Entwicklung & Zuordnung (DEV):** Entwickler legt Objekt an und ordnet es einer Task in einem Auftrag zu.
2. **Freigabe der Task:** Nach Abschluss gibt der Entwickler seine Task frei. Objekte werden wieder entsperrt.
3. **Freigabe des Auftrags (Export):** Sind alle Tasks freigegeben, gibt der Projektleiter den Auftrag frei (Export ins OS-Transportverzeichnis).
4. **Import in QAS:** Der Auftrag wird ins QAS-System importiert und getestet.
5. **Import in PRD:** Nach Freigabe erfolgt der Import ins PRD-System (Go-Live).

## 🗃️ 3. ABAP-Repository & Pakete

### **Das ABAP-Repository**
Das ABAP-Repository ist die systemweite, mandantenunabhängige Datenbank-Sammlung aller Entwicklungsobjekte.
- Together-principle: Objekte müssen in **Paketen (Packages)** zusammengefasst werden.
- **Lokale Objekte ($TMP):** Sind nicht transportierbar und dienen nur temporären Testzwecken.
- **Risiken einer schlechten Paketstruktur:** Unübersichtlichkeit, unvollständige Transporte (Syntaxfehler im Folgesystem), Namenskonflikte und erschwerte Systemupdates.

### **Zentrale Werkzeuge (Transaktionen)**
- **SE80:** Object Navigator (Zentrale Workbench-Plattform)
- **SE38:** ABAP Editor (Programmierung & Aktivierung)
- **SE11:** ABAP Dictionary (Zentrale Definition aller Datenstrukturen)
- **SE24:** Class Builder (Globale Klassen & Interfaces)
- **SE37:** Function Builder (Globale Funktionsbausteine)
- **SE51:** Screen Painter (GUI Dynpro-Gestaltung)
- **SE41:** Menu Painter (GUI Status und Tasten)
- **Debugger:** Laufzeitanalyse zur detaillierten Fehlersuche

## 💾 4. Data Dictionary (DDIC) & Datentypen

### **Kategorien von Datentypen**
- **Elementar:** Einzelne Felder ohne Unterstrukturen (z. B. \`i\`, \`c\`, \`string\`).
- **Struktur:** Fasst mehrere elementare Felder logisch zu einer Zeilenstruktur zusammen (\`BEGIN OF ... END OF\`).
- **Tabellentyp:** Beschreibt die Struktur einer internen Tabelle im Repository (Zeilentyp, Tabellenart & Schlüssel).

### **Domäne vs. Datenelement**
Das ABAP Dictionary trennt die technischen Merkmale strikt von der betriebswirtschaftlichen Semantik:
- **Domäne (Domain):** Technische Details wie Datentyp, Länge, Dezimalstellen und Festwerte (Fixed Values) für Wertevalidierungen.
- **Datenelement (Data Element):** Semantische/betriebswirtschaftliche Bedeutung (Labels für UIs, F1-Hilfe).
- **Tabellenfeld** ➔ basiert auf **Datenelement** ➔ basiert auf **Domäne**.
- **Vorteile des zweistufigen Domänenkonzepts:** Zentrale Pflege (Änderungen an der Domäne wirken sich überall aus), Wiederverwendbarkeit und automatische Datenkonsistenz.

## ⚙️ 5. Modularisierung & Programmereignisse

### **Eingabeparameter (PARAMETERS)**
Mit \`PARAMETERS\` wird ein einfaches Eingabefeld deklariert. Zusätze wie \`DEFAULT\` (Vorbelegung) oder \`OBLIGATORY\` (Pflichtfeld) steuern das Verhalten.

### **Ablaufsteuerung über Report-Ereignisse**
1. **INITIALIZATION:** Vor Selektionsbild-Anzeige (Dynamische Vorbelegungen).
2. **AT SELECTION-SCREEN:** Validierung & Berechtigungen. Fehler per \`MESSAGE ... TYPE 'E'\` sperren das Selektionsbild nicht, sondern halten es eingabebereit.
3. **START-OF-SELECTION:** Hauptverarbeitung (Datenselektion & logik).

### **Modularisierungstechniken im Vergleich**
- **Unterprogramme (FORM-Routinen):** Veraltet, rein lokal im Report, direkter Zugriff auf globale Reportdaten (Gefahr von Seiteneffekten).
- **Funktionsbausteine:** Global wiederverwendbar, in **Funktionsgruppen** gekapselt, besitzen Schnittstellenparameter (\`IMPORTING\`, \`EXPORTING\`, \`CHANGING\`), RFC-fähig (Transaktion \`SE37\`).
- **Methoden (ABAP Objects):** Moderner OO-Ansatz, Kapselung (Public, Protected, Private), Vererbung und klassenbasierte Fehlerbehandlung.
- **Klassen-Kategorien:** *Globale Klassen* (systemweit über \`SE24\` definiert, permanent in DB) vs. *Lokale Klassen* (nur innerhalb des Reports definiert, temporär).

### **Exception-Handling (Fehlerbehandlung)**
Strukturiertes fangen über \`TRY ... CATCH ... ENDTRY\`. Die Exception-Klassenhierarchie erbt von \`CX_ROOT\`:
1. **CX_STATIC_CHECK:** Vom Compiler streng geprüft. Muss behandelt oder deklariert (\`RAISING\`) werden, sonst Syntaxfehler.
2. **CX_DYNAMIC_CHECK:** Muss nicht zwingend im Code deklariert/abgefangen werden. Führt ungefangen zum Kurzdump zur Laufzeit (z. B. \`CX_SY_ZERODIVIDE\`).
3. **CX_NO_CHECK:** Für unvorhersehbare Systemfehler. Dürfen nicht deklariert werden.

## 📝 6. Syntax-Beispiel: Funktionsbaustein-Aufruf
- **Parameter-Inversion:** \`EXPORTING\` beim Aufruf übergibt an \`IMPORTING\` des FBs; \`IMPORTING\` beim Aufruf empfängt aus \`EXPORTING\` des FBs.
- **Auswertung:** Das Systemfeld \`sy-subrc\` muss unmittelbar nach dem Aufruf ausgewertet werden, um Fehler abzufangen.`

  const htmlContent = `<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%); border: 1px solid rgba(59, 130, 246, 0.4); color: var(--color-primary);">✨ SAP ABAP Core</span>
    
    <h1 style="font-size: 2.75rem; font-weight: 900; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.1;">ABAP Workbench & Grundlagen</h1>
    <p style="font-size: 1.15rem; color: var(--foreground-muted); margin-bottom: 3rem; font-weight: 500;">Umfassende Zusammenfassung der SAP Systemarchitektur, Transportprozesse, des Repositorys, des Data Dictionarys (DDIC) sowie modularer ABAP-Entwicklungstechniken zur perfekten Klausurvorbereitung.</p>

    <!-- SECTION 1: SYSTEMARCHITEKTUR -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">1</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">Systemarchitektur & Schichten</h2>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Die technische Architektur eines SAP-NetWeaver-Systems basiert auf einem hochgradig skalierbaren, modular verteilten <strong>3-Schichten-Client-Server-Modell</strong>.</p>
        
        <!-- VISUAL 3-TIER CHART -->
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; background: rgba(0,0,0,0.1); padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--border);">
            <!-- Presentation Layer -->
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid var(--color-primary); border-radius: 0.75rem; padding: 1rem; position: relative; text-align: center;">
                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.5rem;">🖥️</span>
                <strong style="color: var(--color-primary); display: block; font-size: 1.05rem;">Präsentationsschicht (Presentation Layer)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">SAP GUI, SAP Fiori, Web-Browser • Nimmt Eingaben entgegen, führt <em>keine</em> Geschäftslogik aus</span>
            </div>
            
            <div style="text-align: center; color: var(--foreground-muted); font-size: 1.2rem; margin: -0.25rem 0;">↕ (Anfrage / Antwort)</div>
            
            <!-- Application Layer -->
            <div style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.05) 100%); border: 1px solid var(--color-secondary); border-radius: 0.75rem; padding: 1rem; position: relative; text-align: center;">
                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.5rem;">⚙️</span>
                <strong style="color: var(--color-secondary); display: block; font-size: 1.05rem;">Applikationsschicht (Application Layer)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">ABAP-Laufzeitumgebung • Führt ABAP-Code &amp; Geschäftslogik aus, verwaltet Workprozesse</span>
            </div>
            
            <div style="text-align: center; color: var(--foreground-muted); font-size: 1.2rem; margin: -0.25rem 0;">↕ (Open SQL / HANA native)</div>
            
            <!-- Database Layer -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%); border: 1px solid var(--color-success); border-radius: 0.75rem; padding: 1rem; position: relative; text-align: center;">
                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.5rem;">💾</span>
                <strong style="color: var(--color-success); display: block; font-size: 1.05rem;">Datenbankschicht (Database Layer)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Relationales Datenbanksystem (z.B. SAP HANA) • Speichert Stammdaten, Customizing &amp; ABAP-Quellcode</span>
            </div>
        </div>

        <!-- DISPATCHER & WORK PROCESSES -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; margin-top: 2rem;">Dispatcher &amp; Workprozesse: Die logische Zentrale</h3>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Der Applikationsserver verwaltet eingehende Anforderungen hochgradig dynamisch über einen ausgeklügelten Prozessverwaltungs-Mechanismus:</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔀</span>
                <strong style="color: var(--color-primary); display: block; margin-bottom: 0.5rem;">Der Dispatcher (Zentraler Manager)</strong>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Er ist der Manager des Applikationsservers. Er nimmt Benutzeranfragen entgegen, reiht sie in die <strong>Request-Queue</strong> ein und verteilt sie effizient an freie Workprozesse.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔄</span>
                <strong style="color: var(--color-secondary); display: block; margin-bottom: 0.5rem;">Der Workprozess (Ausführendes Glied)</strong>
                <p style="margin: 0; font-size: 0.85rem; line-height: 1.5; color: var(--foreground-muted);">Führt das eigentliche ABAP-Programm aus, stellt die Schnittstelle zur Datenbank dar und ist für genau eine Aufgabe reserviert. Typen werden über die Formel <strong>D-U-B-S-E</strong> identifiziert.</p>
            </div>
        </div>

        <!-- D-U-B-S-E Workprozesse -->
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem;">Die 5 elementaren Workprozess-Typen (D-U-B-S-E)</h4>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <!-- DIA -->
            <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-family: monospace; font-weight: 900; background: var(--color-primary); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; width: 50px; text-align: center;">DIA</span>
                <div style="flex: 1;">
                    <strong style="color: var(--color-primary); font-size: 0.95rem;">Dialog</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block;">Verarbeitet interaktive Anfragen aktiver Benutzer. Jedes System benötigt mindestens 2 Dialog-Workprozesse.</span>
                </div>
            </div>
            
            <!-- UPD -->
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-family: monospace; font-weight: 900; background: var(--color-success); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; width: 50px; text-align: center;">UPD</span>
                <div style="flex: 1;">
                    <strong style="color: var(--color-success); font-size: 0.95rem;">Update / Verbuchung</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block;">Führt zeitkritische Datenbankänderungen asynchron im Hintergrund aus, um den schnellen Dialog-Ablauf zu sichern.</span>
                </div>
            </div>
            
            <!-- BTC -->
            <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-family: monospace; font-weight: 900; background: var(--color-warning); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; width: 50px; text-align: center;">BTC</span>
                <div style="flex: 1;">
                    <strong style="color: var(--color-warning); font-size: 0.95rem;">Background</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block;">Führt Hintergrund-Jobs aus (Reports, periodische Jobs, die nachts oder ohne Benutzerinteraktion laufen).</span>
                </div>
            </div>
            
            <!-- SPO -->
            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-family: monospace; font-weight: 900; background: var(--color-secondary); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; width: 50px; text-align: center;">SPO</span>
                <div style="flex: 1;">
                    <strong style="color: var(--color-secondary); font-size: 0.95rem;">Spool</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block;">Bereitet Dokumente und Daten für den physikalischen Druck oder Ausgabegeräte auf.</span>
                </div>
            </div>
            
            <!-- ENQ -->
            <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1rem;">
                <span style="font-family: monospace; font-weight: 900; background: var(--color-danger); color: white; padding: 0.2rem 0.6rem; border-radius: 4px; font-size: 0.85rem; width: 50px; text-align: center;">ENQ</span>
                <div style="flex: 1;">
                    <strong style="color: var(--color-danger); font-size: 0.95rem;">Enqueue</strong>
                    <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block;">Verwaltet das logische SAP-Sperrwesen auf Applikationsebene, um die Datenkonsistenz bei parallelen Zugriffen zu gewährleisten.</span>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 2: SYSTEMLANDSCHAFT & TRANSPORTWESEN -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">2</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">Systemlandschaft &amp; Transportwesen</h2>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Um den laufenden Geschäftsbetrieb vor Fehlern und Systemausfällen zu schützen, trennt SAP die Softwareentwicklung strikt in einer <strong>dreistufigen Systemlandschaft</strong>:</p>
        
        <!-- VISUAL LANDSCAPE FLOW -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 2rem; background: rgba(0,0,0,0.1); padding: 1.5rem; border-radius: 1rem; border: 1px solid var(--border); flex-wrap: wrap;">
            <!-- DEV Card -->
            <div style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.02) 100%); border: 1px solid var(--color-secondary); border-radius: 0.75rem; padding: 1rem; flex: 1; min-width: 150px; text-align: center;">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.25rem;">🔧</span>
                <strong style="color: var(--color-secondary); display: block; font-size: 0.95rem;">Entwicklung (DEV)</strong>
                <span style="font-size: 0.75rem; color: var(--foreground-muted);">Programmierung &amp; Customizing • Fehler unkritisch</span>
            </div>
            
            <div style="color: var(--color-secondary); font-weight: 900; font-size: 1.5rem; text-align: center;">➔</div>
            
            <!-- QAS Card -->
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.02) 100%); border: 1px solid var(--color-primary); border-radius: 0.75rem; padding: 1rem; flex: 1; min-width: 150px; text-align: center;">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.25rem;">🧪</span>
                <strong style="color: var(--color-primary); display: block; font-size: 0.95rem;">Qualitätssicherung (QAS)</strong>
                <span style="font-size: 0.75rem; color: var(--foreground-muted);">Funktions- &amp; Integrationstests • Testdatenkopien</span>
            </div>
            
            <div style="color: var(--color-primary); font-weight: 900; font-size: 1.5rem; text-align: center;">➔</div>
            
            <!-- PRD Card -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.02) 100%); border: 1px solid var(--color-success); border-radius: 0.75rem; padding: 1rem; flex: 1; min-width: 150px; text-align: center;">
                <span style="font-size: 1.5rem; display: block; margin-bottom: 0.25rem;">🚀</span>
                <strong style="color: var(--color-success); display: block; font-size: 0.95rem;">Produktiv (PRD)</strong>
                <span style="font-size: 0.75rem; color: var(--foreground-muted);">Operatives Geschäft • Höchste Sicherheitsstufe</span>
            </div>
        </div>

        <!-- TRANSPORTLANDSCHAFT & EINHEITEN -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; margin-top: 2rem;">Das Transportwesen (TMS)</h3>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Das Transport Management System steuert die kontrollierte und nachvollziehbare Übertragung aller Repository-Objekte und Customizing-Einstellungen über definierte Einheiten:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <!-- Transportauftrag -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-primary); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">📦 Transportauftrag (Request)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Ein Container auf Betriebssystemebene, der geänderte, gelöschte oder neue Entwicklungsobjekte bündelt.</span>
            </div>
            
            <!-- Transportaufgabe -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-secondary); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">🔑 Transportaufgabe (Task)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Untereinheit des Auftrags. In der Regel genau *einem* Entwickler zugeordnet, um dessen Änderungen aufzuzeichnen.</span>
            </div>
            
            <!-- Transportweg -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-success); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">🛣️ Transportweg (Route)</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Die physisch definierte logische Verbindungsroute zwischen Systemen im TMS (z. B. DEV nach QAS).</span>
            </div>
            
            <!-- Transportlayer -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-warning); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">🏗️ Transportlayer</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Steuert anhand der Paketzuordnung den standardmäßigen Transportweg (z.b. SAP-Standard vs. kundeneigene Entwicklung).</span>
            </div>
        </div>

        <!-- PHASEN DES TRANSPORTABLAUFS -->
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.25rem;">Der typische Transportablauf (Phasen)</h4>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
            <!-- Phase 1 -->
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; margin-top: 0.2rem;">1</span>
                <div>
                    <strong style="color: var(--foreground); font-size: 0.95rem;">Entwicklung &amp; Zuordnung (DEV)</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted);">Entwickler legt Objekt in DEV an und ordnet es einer persönlichen <strong>Transportaufgabe (Task)</strong> innerhalb des übergeordneten <strong>Transportauftrags</strong> zu.</p>
                </div>
            </div>
            
            <!-- Phase 2 -->
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; margin-top: 0.2rem;">2</span>
                <div>
                    <strong style="color: var(--foreground); font-size: 0.95rem;">Freigabe der Task (Aufgabe)</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted);">Nach Abschluss gibt der Entwickler seine Task frei. Dadurch werden die gesperrten Objekte wieder für andere Entwickler entsperrt.</p>
                </div>
            </div>
            
            <!-- Phase 3 -->
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; margin-top: 0.2rem;">3</span>
                <div>
                    <strong style="color: var(--foreground); font-size: 0.95rem;">Freigabe des Auftrags (Export)</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted);">Sind alle Tasks im Auftrag freigegeben, gibt der Projektleiter den gesamten Auftrag frei. Der **Export** erfolgt in das zentrale Transportverzeichnis auf OS-Ebene.</p>
                </div>
            </div>
            
            <!-- Phase 4 -->
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; margin-top: 0.2rem;">4</span>
                <div>
                    <strong style="color: var(--foreground); font-size: 0.95rem;">Import in QAS</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted);">Der Auftrag wird ins Qualitätssicherungssystem importiert. Dort finden intensive Funktions- &amp; Performance-Tests statt.</p>
                </div>
            </div>
            
            <!-- Phase 5 -->
            <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="display: inline-flex; align-items: center; justify-content: center; width: 1.5rem; height: 1.5rem; border-radius: 50%; background: var(--color-secondary); color: white; font-weight: 800; font-size: 0.8rem; flex-shrink: 0; margin-top: 0.2rem;">5</span>
                <div>
                    <strong style="color: var(--foreground); font-size: 0.95rem;">Freigabe &amp; Import in PRD (Go-Live)</strong>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted);">Nach erfolgreicher Freigabe durch die Qualitätssicherung wird der Auftrag ins Produktivsystem importiert und steht den Endanwendern produktiv zur Verfügung.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 3: ABAP-REPOSITORY & PAKETE -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">3</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">ABAP-Repository &amp; Pakete</h2>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Das ABAP-Repository ist die systemweite, mandantenunabhängige Datenbank-Sammlung aller Entwicklungsobjekte.</p>
        
        <!-- INFO BOX METAPHOR -->
        <div style="background: rgba(147, 51, 234, 0.08); border-left: 4px solid var(--color-secondary); padding: 1.25rem; border-radius: 0 0.75rem 0.75rem 0; margin-bottom: 1.5rem;">
            <p style="font-weight: 700; font-size: 1rem; color: var(--color-secondary); margin: 0 0 0.5rem 0;">📚 Metapher zur Strukturierung</p>
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.5;">Das ABAP-Repository dient der Strukturierung aller transportierbaren Entwicklungsobjekte. Wie ein sortiertes Regal werden zusammengehörige Entwicklungsobjekte in <strong>Paketen (Packages)</strong> zusammengefasst, um die Wartbarkeit und Übersichtlichkeit zu gewährleisten.</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem;">
                <strong style="color: var(--color-primary); font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">📦 Pakete (Packages)</strong>
                <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5;">Dienen der logischen Gruppierung funktional zusammengehörender Entwicklungsobjekte (z. B. Paket <code>Z_FINANCIALS</code>). Sie steuern die <strong>Transportfähigkeit</strong> (Zuordnung zum Transportlayer) und verbessern Modularität.</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1.25rem;">
                <strong style="color: var(--color-warning); font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">📁 Lokale Objekte ($TMP)</strong>
                <p style="margin: 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5;">Sind <strong>nicht transportierbar</strong> und existieren ausschließlich auf dem System, auf dem sie angelegt wurden. Sie dienen rein temporären Testzwecken oder lokalen Experimenten.</p>
            </div>
        </div>

        <!-- RISKS WARNING BOX -->
        <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: flex-start; gap: 1rem;">
            <span style="font-size: 1.5rem;">⚠️</span>
            <div>
                <strong style="color: var(--color-danger); font-size: 1.05rem;">Risiken einer schlechten Paketstruktur</strong>
                <ul style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0; line-height: 1.6; padding-left: 1.2rem;">
                    <li><strong>Unübersichtlichkeit:</strong> Redundanter Code, da Entwickler bestehende Bausteine nicht finden.</li>
                    <li><strong>Fehlerhafte Transporte:</strong> Unvollständige Objektsammlungen führen in Folgesystemen zu Syntaxfehlern ("Missing Objects").</li>
                    <li><strong>Namenskonflikte:</strong> Ohne klare Namenskonventionen werden fremde Objekte versehentlich überschrieben.</li>
                    <li><strong>Erschwerte Wartbarkeit:</strong> Verstrickte Paket-Abhängigkeiten verhindern reibungsfreie Systemupdates.</li>
                </ul>
            </div>
        </div>

        <!-- TRANSACTIONS TABLE -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; margin-top: 2rem;">Zentrale Werkzeuge der ABAP Workbench (Transaktionen)</h3>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Die wichtigsten Transaktionscodes, die jeder Entwickler auswendig kennen muss:</p>
        
        <div style="overflow-x: auto; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--surface);">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border); background: rgba(255,255,255,0.02);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 100px;">Transaktion</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 150px;">Werkzeug</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE80</td>
                        <td style="padding: 0.75rem; font-weight: 700;">Object Navigator</td>
                        <td style="padding: 0.75rem;">Die zentrale Workbench-Plattform. Zeigt Repository-Strukturen hierarchisch an.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE38</td>
                        <td style="padding: 0.75rem; font-weight: 700;">ABAP Editor</td>
                        <td style="padding: 0.75rem;">Schreiben, Syntaxprüfung, Kompilieren &amp; Aktivieren von ABAP-Quelltexten.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE11</td>
                        <td style="padding: 0.75rem; font-weight: 700;">ABAP Dictionary</td>
                        <td style="padding: 0.75rem;">Zentrale Definition aller Datenstrukturen (Tabellen, Datenelemente, Domänen, Suchhilfen).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE24</td>
                        <td style="padding: 0.75rem; font-weight: 700;">Class Builder</td>
                        <td style="padding: 0.75rem;">Entwickeln und Verwalten von objektorientierten ABAP Objects (Klassen &amp; Interfaces).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE37</td>
                        <td style="padding: 0.75rem; font-weight: 700;">Function Builder</td>
                        <td style="padding: 0.75rem;">Erstellung, Implementierung und Testen von globalen Funktionsbausteinen.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE51</td>
                        <td style="padding: 0.75rem; font-weight: 700;">Screen Painter</td>
                        <td style="padding: 0.75rem;">Entwickeln von klassischen grafischen Benutzeroberflächen (Dynpros) und deren Ablauflogik.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">SE41</td>
                        <td style="padding: 0.75rem; font-weight: 700;">Menu Painter</td>
                        <td style="padding: 0.75rem;">Definition des GUI-Status (Menüleisten, Tastenbelegung, Drucktastenleisten).</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; font-family: monospace; font-weight: 900; color: var(--color-secondary);">Debugger</td>
                        <td style="padding: 0.75rem; font-weight: 700;">ABAP Debugger</td>
                        <td style="padding: 0.75rem;">Laufzeitanalyse zur detaillierten Fehlersuche und Variablenüberwachung.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- SECTION 4: DATA DICTIONARY (DDIC) & DATENTYPEN -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">4</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">Data Dictionary (DDIC) &amp; Datentypen</h2>
        </div>
        
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">ABAP unterscheidet im Dictionary (DDIC) und Laufzeitspeicher drei grundlegende Typ-Kategorien:</p>
        
        <!-- 3 TYPES -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-primary); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">1. Elementar</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Einzelne Felder ohne Unterstrukturen (z. B. Integers <code>i</code>, Characters <code>c</code>, Strings).</span>
            </div>
            
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-success); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">2. Struktur</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Fasst mehrere elementare Felder logisch zu einer Zeilenstruktur zusammen (im Code: <code>BEGIN OF ... END OF</code>).</span>
            </div>
            
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-secondary); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">3. Tabellentyp</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Beschreibt die Struktur einer internen Tabelle im Repository (Zeilentyp, Tabellenart [Standard, Sorted, Hashed] &amp; Schlüssel).</span>
            </div>
        </div>

        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; margin-top: 2rem;">Das zweistufige Domänenkonzept: Domäne vs. Datenelement</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Das ABAP Dictionary trennt die <strong>technischen Merkmale</strong> strikt von der <strong>betriebswirtschaftlichen Semantik</strong>:</p>

        <!-- VISUAL HIERARCHY FLOW -->
        <div style="background: rgba(59, 130, 246, 0.04); border: 1px solid rgba(59, 130, 246, 0.2); padding: 1.25rem; border-radius: 0.75rem; display: flex; justify-content: center; align-items: center; gap: 1rem; margin-bottom: 2rem; font-weight: 700; flex-wrap: wrap; text-align: center;">
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 0.5rem; color: var(--foreground);">Tabellenfeld</div>
            <div style="color: var(--color-primary);">➔ basiert auf ➔</div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 0.5rem; color: var(--color-secondary);">Datenelement (Semantik)</div>
            <div style="color: var(--color-primary);">➔ basiert auf ➔</div>
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 0.5rem; color: var(--color-success);">Domäne (Technik)</div>
        </div>

        <!-- COMPARATIVE TABLE -->
        <div style="overflow-x: auto; border: 1px solid var(--border); border-radius: 0.75rem; background: var(--surface); margin-bottom: 2rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border); background: rgba(255,255,255,0.02);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 120px;">Merkmal</th>
                        <th style="padding: 0.75rem; color: var(--color-success); font-weight: 700;">Domäne (Domain)</th>
                        <th style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700;">Datenelement (Data Element)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-weight: 700;">Fokus</td>
                        <td style="padding: 0.75rem; color: var(--color-success); font-weight: 600;">Technische Details (Daten-Bauplan)</td>
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 600;">Semantische / Betriebswirtschaftliche Bedeutung</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-weight: 700;">Eigenschaften</td>
                        <td style="padding: 0.75rem;">Datentyp, Länge, Dezimalstellen, Ausgabelänge.</td>
                        <td style="padding: 0.75rem;">Feldbezeichner (UI-Labels), F1-Hilfe (Dokumentationstexte).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; font-weight: 700;">Prüfungen</td>
                        <td style="padding: 0.75rem;">Festwerte (Fixed Values), Prüftabellen, Konvertierungsroutinen.</td>
                        <td style="padding: 0.75rem;">Wertehilfe-Zuweisung (F4-Suchhilfe).</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; font-weight: 700;">Beispiel</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--color-success);">CHAR 10</td>
                        <td style="padding: 0.75rem; font-family: monospace; color: var(--color-secondary);">CARRID (Fluggesellschaft)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- BENEFITS LIST -->
        <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 1rem; padding: 1.5rem;">
            <strong style="color: var(--color-success); font-size: 1.05rem; display: block; margin-bottom: 0.5rem;">✨ Vorteile des zweistufigen Domänenkonzepts</strong>
            <ul style="font-size: 0.85rem; color: var(--foreground); margin: 0; line-height: 1.6; padding-left: 1.2rem;">
                <li><strong>Zentrale Pflege:</strong> Ändert sich ein technisches Attribut (z. B. Erhöhung der Stellenzahl), muss nur die eine Domäne geändert werden. Alle zugehörigen Datenelemente passen sich automatisch an.</li>
                <li><strong>Wiederverwendbarkeit:</strong> Einmal definierte technische Muster können systemweit in hunderten Tabellen wiederverwendet werden.</li>
                <li><strong>Automatische Datenkonsistenz:</strong> Durch das Hinterlegen von **Festwerten** (Fixed Values) validiert das System Benutzereingaben auf Dynpros automatisch.</li>
            </ul>
        </div>
    </div>

    <!-- SECTION 5: MODULARISIERUNG & PROGRAMMEREIGNISSE -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">5</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">Modularisierung &amp; Programmereignisse</h2>
        </div>

        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Ausführbare ABAP-Reports zeichnen sich durch eine <strong>ereignisgesteuerte Ablaufsteuerung</strong> aus. Die Steuerung liegt vollzählig beim ABAP-Laufzeit-Framework:</p>

        <!-- TIMELINE CHRONOLOGY -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.25rem;">⏱️ Ablaufsteuerung über Report-Ereignisse</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; padding-left: 1rem; border-left: 3px solid var(--color-secondary);">
            <div>
                <strong style="color: var(--color-secondary);">1. INITIALIZATION</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block; margin-top: 0.15rem;">Wird genau einmal vor der ersten Anzeige des Selektionsbildes ausgeführt. Hauptzweck: Vorbelegung von Eingabefeldern mit dynamischen Standardwerten.</span>
            </div>
            <div>
                <strong style="color: var(--color-secondary);">2. AT SELECTION-SCREEN</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block; margin-top: 0.15rem;">Wird aufgerufen, wenn der Benutzer auf dem Selektionsbild eine Aktion auslöst. Hauptzweck: **Eingabeprüfung** und Validierung. Kann Fehlermeldungen direkt auf dem Screen erzeugen (MESSAGE ... TYPE 'E' sperrt das Feld nicht).</span>
            </div>
            <div>
                <strong style="color: var(--color-secondary);">3. START-OF-SELECTION</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted); display: block; margin-top: 0.15rem;">Wird nach der Bestätigung des Selektionsbildes ausgeführt. Der eigentliche **Hauptverarbeitungsblock** (Daten selektieren, verarbeiten und ausgeben).</span>
            </div>
        </div>

        <!-- MODULARIZATION METHODS -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem;">Modularisierungstechniken im Vergleich</h3>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Kapselung und Wiederverwendbarkeit von Sourcecode lassen sich in ABAP über drei Wege realisieren:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <!-- Form-Routinen -->
            <div style="background: rgba(239, 68, 68, 0.02); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-size: 0.725rem; background: rgba(239, 68, 68, 0.1); color: var(--color-danger); border: 1px solid var(--color-danger); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Obsolet / Veraltet</span>
                <strong style="color: var(--color-danger); font-size: 1rem; display: block; margin-top: 0.75rem; margin-bottom: 0.25rem;">FORM-Routinen</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Rein lokal im Report. Haben direkten Zugriff auf globale Reportdaten (Gefahr von Seiteneffekten!). Schnittstellen über <code>USING</code> und <code>CHANGING</code>.</span>
            </div>
            
            <!-- Funktionsbausteine -->
            <div style="background: rgba(59, 130, 246, 0.02); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-size: 0.725rem; background: rgba(59, 130, 246, 0.1); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Prozeduraler Standard</span>
                <strong style="color: var(--color-primary); font-size: 1rem; display: block; margin-top: 0.75rem; margin-bottom: 0.25rem;">Funktionsbausteine</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Global wiederverwendbar, gepflegt im Function Builder (<code>SE37</code>) und in <strong>Funktionsgruppen</strong> gekapselt. Besitzen einen eigenen lokalen Speicherbereich, Schnittstellenparameter (<code>IMPORTING</code>, <code>EXPORTING</code>) und klassische Ausnahmen. RFC-fähig.</span>
            </div>
            
            <!-- Methoden -->
            <div style="background: rgba(16, 185, 129, 0.02); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 0.75rem; padding: 1.25rem;">
                <span style="font-size: 0.725rem; background: rgba(16, 185, 129, 0.1); color: var(--color-success); border: 1px solid var(--color-success); padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Moderner Standard</span>
                <strong style="color: var(--color-success); font-size: 1rem; display: block; margin-top: 0.75rem; margin-bottom: 0.25rem;">Methoden (ABAP Objects)</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Der modernste, objektorientierte Entwicklungsansatz. Unterstützt Sichtbarkeitsbereiche (<code>PUBLIC</code>, <code>PROTECTED</code>, <code>PRIVATE</code>) zur Kapselung sowie Vererbung, Polymorphie und klassenbasierte Fehlerbehandlung.</span>
            </div>
        </div>

        <!-- CLASSES HIERARCHY -->
        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem;">Klassen-Kategorien (Global vs. Lokal)</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-primary); display: block; margin-bottom: 0.25rem;">🌐 Globale Klassen</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Systemweit sichtbar und aus jedem Programm/Report aufrufbar. Gespeichert als eigenständige Entwicklungsobjekte im Repository (Klassenpools) über Transaktion <code>SE24</code>. Die Lebensdauer ist permanent in der DB hinterlegt.</span>
            </div>
            
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-secondary); display: block; margin-bottom: 0.25rem;">📍 Lokale Klassen</strong>
                <span style="font-size: 0.85rem; color: var(--foreground-muted);">Ausschließlich innerhalb des umschließenden Programms (z. B. Reports) sichtbar und nutzbar. Die Lebensdauer ist an die Ausführungszeit des Programms gebunden. Perfekt geeignet als Hilfsklassen oder zur internen Kapselung.</span>
            </div>
        </div>

        <!-- EXCEPTION HANDLING & HIERARCHY -->
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem;">⚠️ Exception-Handling (Fehlerbehandlung)</h3>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Der moderne standardisierte Ansatz nutzt klassenbasierte Ausnahmen in einem **\`TRY ... CATCH ... ENDTRY\`**-Block:</p>

        <!-- TRY CATCH BLOCK EXAMPLE -->
        <div style="background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; border-left: 4px solid var(--color-secondary); line-height: 1.5; margin-bottom: 2rem;">
            <span style="color: var(--color-secondary); font-weight: bold;">TRY</span>.<br>
            &nbsp;&nbsp;<span style="color: #64748b;">" Auszuführender Quellcode</span><br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">CALL METHOD</span> lo_calc-&gt;divide<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">EXPORTING</span> iv_num1 = gv_val1<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv_num2 = gv_val2<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">IMPORTING</span> ev_res  = gv_result.<br>
            <span style="color: var(--color-secondary); font-weight: bold;">CATCH</span> cx_sy_zerodivide <span style="color: var(--color-secondary); font-weight: bold;">INTO DATA</span>(lo_error).<br>
            &nbsp;&nbsp;<span style="color: #64748b;">" Behandlung der spezifischen Exception (Division durch Null)</span><br>
            &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / 'Fehler aufgetreten:', lo_error-&gt;get_text( ).<br>
            <span style="color: var(--color-secondary); font-weight: bold;">ENDTRY</span>.
        </div>

        <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem;">Die Exception-Klassenhierarchie</h4>
        <p style="margin-bottom: 1.25rem; font-size: 0.95rem;">Alle klassenbasierten Exceptions erben von der globalen Oberklasse <strong>\`CX_ROOT\`</strong>, welche sich in drei strategische Klassen aufgeteilt:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <!-- CX_STATIC_CHECK -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-success); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">1. CX_STATIC_CHECK</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Der Compiler erzwingt die Fehlerbehandlung. Die Exception muss entweder lokal gefangen (<code>CATCH</code>) oder über den Zusatz <code>RAISING</code> deklariert werden. Andernfalls liegt ein <strong>Syntaxfehler</strong> vor.</span>
            </div>
            
            <!-- CX_DYNAMIC_CHECK -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-warning); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">2. CX_DYNAMIC_CHECK</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Muss nicht zwingend im Code deklariert oder abgefangen werden, um erfolgreich zu kompilieren. Tritt der Fehler jedoch zur Laufzeit auf und ist nicht abgefangen, führt dies zum <strong>Kurzdump (Laufzeitfehler)</strong>.</span>
            </div>
            
            <!-- CX_NO_CHECK -->
            <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 0.75rem; padding: 1rem;">
                <strong style="color: var(--color-danger); font-size: 0.95rem; display: block; margin-bottom: 0.25rem;">3. CX_NO_CHECK</strong>
                <span style="font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.5; display: block;">Wird für Systemfehler verwendet, die theoretisch an fast jeder Programmstelle auftreten können (z.b. Speicherengpass <code>CX_SY_NO_MEMORY_LEFT</code>). Sie dürfen nicht deklariert werden.</span>
            </div>
        </div>
    </div>

    <!-- SECTION 6: SYNTAX-BEISPIEL FUNKTIONSBAUSTEIN-AUFRUF -->
    <div style="margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px -5px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <span style="display: inline-flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; background: linear-gradient(135deg, var(--color-primary), var(--color-secondary)); color: white; font-weight: 800; font-size: 1.1rem; flex-shrink: 0;">6</span>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin: 0;">Syntax-Beispiel: Funktionsbaustein-Aufruf</h2>
        </div>

        <!-- WARNING BOX PARAMETER INVERSION -->
        <div style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; display: flex; align-items: flex-start; gap: 1rem;">
            <span style="font-size: 1.5rem;">⚠️</span>
            <div>
                <strong style="color: var(--color-warning); font-size: 1.05rem;">Wichtiger Merksatz für die Parameter-Inversion beim Aufruf!</strong>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0; line-height: 1.6;">
                    Die Parameterbezeichnungen drehen sich beim Aufruf aus Sicht des Hauptprogramms komplett um!
                </p>
                <ul style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0; line-height: 1.6; padding-left: 1.2rem;">
                    <li><strong>EXPORTING</strong> im Hauptprogramm übergibt Daten <em>an</em> die <strong>IMPORTING</strong>-Parameter des Funktionsbausteins.</li>
                    <li><strong>IMPORTING</strong> im Hauptprogramm empfängt Daten <em>aus</em> den <strong>EXPORTING</strong>-Parametern des Funktionsbausteins.</li>
                </ul>
            </div>
        </div>

        <!-- Elegant code block container -->
        <div style="border-radius: 1rem; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 10px 30px -15px rgba(0,0,0,0.3); margin-bottom: 2rem;">
            <div style="background: #1e293b; padding: 0.75rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: space-between;">
                <span style="font-family: monospace; font-size: 0.8rem; font-weight: 700; color: #94a3b8;">Z_CALL_FUNCTION.ABAP</span>
                <span style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 0.15rem 0.5rem; border-radius: 4px; font-weight: 600;">ABAP Source</span>
            </div>
            <div style="background: #0f172a; padding: 1.5rem; font-family: monospace; font-size: 0.85rem; line-height: 1.6; overflow-x: auto; color: #e2e8f0;">
                <span style="color: var(--color-secondary); font-weight: bold;">DATA</span>: gv_num1 <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> i <span style="color: var(--color-secondary); font-weight: bold;">VALUE</span> 10,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gv_num2 <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> i <span style="color: var(--color-secondary); font-weight: bold;">VALUE</span> 0,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gv_res  <span style="color: var(--color-secondary); font-weight: bold;">TYPE</span> f.<br><br>
                
                <span style="color: #64748b;">* Aufruf des globalen Funktionsbausteins</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">CALL FUNCTION</span> <span style="color: #60a5fa;">'Z_MATH_DIVISION'</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">EXPORTING</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;im_dividend&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= gv_num1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">" Übergabe an den IMPORT-Parameter des FB</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;im_divisor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= gv_num2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">" Übergabe an den IMPORT-Parameter des FB</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">IMPORTING</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;ex_result&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= gv_res&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">" Empfang aus dem EXPORT-Parameter des FB</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">EXCEPTIONS</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;division_by_zero = 1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">" Fehlernummer 1 bei Division durch Null</span><br>
                &nbsp;&nbsp;&nbsp;&nbsp;others&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2.<br><br>
                
                <span style="color: #64748b;">* Wichtig: Direkt nach dem Aufruf MUSS das Systemfeld SY-SUBRC geprüft werden!</span><br>
                <span style="color: var(--color-secondary); font-weight: bold;">IF</span> sy-subrc &lt;&gt; 0.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">CASE</span> sy-subrc.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHEN</span> 1.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / <span style="color: #60a5fa;">'Fehler: Es wurde versucht, durch 0 zu teilen!'</span>.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHEN OTHERS</span>.<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / <span style="color: #60a5fa;">'Ein unbekannter Fehler ist im Funktionsbaustein aufgetreten.'</span>.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ENDCASE</span>.<br>
                <span style="color: var(--color-secondary); font-weight: bold;">ELSE</span>.<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WRITE</span>: / <span style="color: #60a5fa;">'Die Berechnung war erfolgreich. Ergebnis:'</span>, gv_res.<br>
                <span style="color: var(--color-secondary); font-weight: bold;">ENDIF</span>.
            </div>
        </div>
    </div>

    <!-- QUIZ & SUMMARY SECTION -->
    <div style="margin-top: 4rem; margin-bottom: 4rem; background: rgba(30, 41, 59, 0.02); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 2rem; text-align: center;">💡 Schnell-Check &amp; Klausurfragen</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Q1 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 1: Was versteht man unter der Formel D-U-B-S-E in SAP?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Es beschreibt die 5 primären Workprozesse des ABAP-Applikationsservers:
                    <ul style="margin: 0.25rem 0 0 0; padding-left: 1.25rem;">
                        <li><strong>D</strong>ialog (DIA) – Benutzerinteraktion</li>
                        <li><strong>U</strong>pdate (UPD) – Asynchrone Datenbankänderungen</li>
                        <li><strong>B</strong>ackground (BTC) – Batch-Hintergrundjobs</li>
                        <li><strong>S</strong>pool (SPO) – Druckaufbereitung</li>
                        <li><strong>E</strong>nqueue (ENQ) – Logisches Sperrwesen</li>
                    </ul>
                </div>
            </div>

            <!-- Q2 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 2: Was ist der Unterschied zwischen Domäne und Datenelement?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Die Domäne beschreibt die <strong>technischen</strong> Eigenschaften (Datentyp, Länge, Festwerte) eines Datenfeldes. Das Datenelement baut darauf op und verankert die <strong>semantische</strong> bzw. betriebswirtschaftliche Bedeutung (Labels für UIs, F1-Hilfe). Dies ermöglicht zentrale Wartbarkeit und Wiederverwendbarkeit.
                </div>
            </div>

            <!-- Q3 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 3: Welche Klassen erben von CX_ROOT und wie unterscheiden sie sich?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Von <code>CX_ROOT</code> leiten sich drei Hauptkategorien ab:
                    <ul style="margin: 0.25rem 0 0 0; padding-left: 1.25rem;">
                        <li><code>CX_STATIC_CHECK</code>: Der Compiler erzwingt das Abfangen oder Weiterleiten (andernfalls Syntaxfehler).</li>
                        <li><code>CX_DYNAMIC_CHECK</code>: Compiler erzwingt keine Behandlung. Tritt der Fehler ungefangen auf, führt dies zum Kurzdump.</li>
                        <li><code>CX_NO_CHECK</code>: Generelle Systemausnahmen (z.b. Speicherengpässe), die nicht deklariert werden dürfen.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Final Summary Card -->
    <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.15);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1.25rem;">📝 Fazit &amp; Lernhinweis</h2>
        <p style="font-size: 0.95rem; line-height: 1.6; margin: 0;">Für die Klausur sind vor allem die Unterschiede zwischen <strong>Domäne &amp; Datenelement</strong>, der Aufbau von <strong>D-U-B-S-E</strong>, der Ablauf der <strong>3-Systemlandschaft</strong> und die <strong>Parameter-Inversion</strong> beim Rufen von Funktionsbausteinen absolute Pflichtthemen. Präge dir die Transaktionscodes (SE80, SE11, SE38 etc.) sowie die Chronologie der Report-Ereignisse ein!</p>
    </div>
</div>`

  // Escape single quotes for SQL statement
  const escapedHtmlContent = htmlContent.replace(/'/g, "''")
  const escapedContentRaw = contentRaw.replace(/'/g, "''")

  const sqlInsert = `-- SQL INSERT-Befehl für ABAP Workbench & Grundlagen
-- Fach: SAP ERP (subjectId: 'sxh3e5ewi0qahenr6jg')
-- Autor: u5ilhtdcn9ycti9tbmc
-- Typ: Zusammenfassung
-- Datum: 2026-05-21

INSERT INTO lessons (id, subjectId, authorId, title, sortOrder, status, contentRaw, content, type)
VALUES (
    '${lessonId}',
    '${subjectId}',
    '${authorId}',
    '${title}',
    52,
    'published',
    '${escapedContentRaw}',
    '${escapedHtmlContent}',
    'article'
)
ON DUPLICATE KEY UPDATE
    subjectId = '${subjectId}',
    authorId = '${authorId}',
    title = '${title}',
    sortOrder = 52,
    status = 'published',
    contentRaw = '${escapedContentRaw}',
    content = '${escapedHtmlContent}',
    type = 'article';`

  const scratchDir = path.dirname(__filename)
  const sqlFilePath = path.join(scratchDir, 'insert_abap_workbench_basics.sql')
  fs.writeFileSync(sqlFilePath, sqlInsert, 'utf-8')
  console.log(`SQL-Importdatei erfolgreich geschrieben nach: ${sqlFilePath}`)

  console.log('Versuche Lektion in lokale DB einzufügen...')
  try {
    // Upsert the lesson locally
    const lesson = await prisma.lesson.upsert({
      where: { id: lessonId },
      update: {
        subjectId: subjectId,
        authorId: authorId,
        title: title,
        sortOrder: 52,
        status: 'published',
        contentRaw: contentRaw,
        content: htmlContent
      },
      create: {
        id: lessonId,
        subjectId: subjectId,
        authorId: authorId,
        title: title,
        sortOrder: 52,
        status: 'published',
        contentRaw: contentRaw,
        content: htmlContent
      }
    })

    console.log(`Lektion '${lesson.title}' erfolgreich in lokale DB eingefügt!`)
  } catch (err) {
    console.warn(`[WARNUNG] Lokale DB unter 127.0.0.1:3307 ist zurzeit offline. Lokaler DB-Upsert wurde übersprungen.`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
