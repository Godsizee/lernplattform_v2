-- SQL INSERT-Befehle für BC400 Kapitel 1 und Kapitel 2
-- Fach: SAP ERP (subjectId: 'sxh3e5ewi0qahenr6jg')
-- Autor: u5ilhtdcn9ycti9tbmc

-- =========================================================================
-- KAPITEL 1: Der Ablauf eines ABAP-Programms
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch01',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 1: Der Ablauf eines ABAP-Programms',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(139, 92, 246, 0.08); border: 1px solid var(--color-primary); color: var(--color-primary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 1: Der Ablauf eines ABAP-Programms</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel vermittelt das Verständnis für die technische Architektur des SAP-Systems, die Funktionsweise von Workprozessen und den Ablauf eines Programms im Hintergrund.</p>

    <!-- 1.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">1.1 Die dreistufige Client-Server-Architektur (3-Tier-Architecture)</h2>
        <p style="margin-bottom: 1.5rem;">Das SAP-System basiert auf einer klassischen dreistufigen Architektur, die eine klare Trennung der Aufgaben ermöglicht:</p>

        <!-- Glassmorphism Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            <!-- Präsentationsschicht -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 0.75rem; background: rgba(59, 130, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); font-weight: 700;">1</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">Präsentationsschicht</h3>
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--foreground); margin-bottom: 1rem;"><strong>Aufgabe:</strong> Schnittstelle zum Benutzer. Sie nimmt Eingaben entgegen und bereitet Daten visuell auf.</p>
                <p style="font-size: 0.9rem; color: var(--foreground-muted); margin: 0;"><strong>Technologien:</strong> SAP GUI (Windows/Java/HTML) sowie moderne, webbasierte Oberflächen wie <em>SAP Fiori</em> auf Basis von <em>SAPUI5</em>.</p>
            </div>

            <!-- Applikationsschicht -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 0.75rem; background: rgba(139, 92, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); font-weight: 700;">2</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">Applikationsschicht</h3>
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--foreground); margin-bottom: 1rem;"><strong>Aufgabe:</strong> Ausführung der Anwendungslogik. Hier laufen die ABAP-Programme.</p>
                <p style="font-size: 0.9rem; color: var(--foreground-muted); margin: 0;"><strong>Skalierbarkeit:</strong> Zustandslosigkeit zwischen Dialogschritten ermöglicht einfache horizontale Skalierung (Hinzufügen weiterer Applikationsserver / <em>AS ABAP</em>).</p>
            </div>

            <!-- Datenbankschicht -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border-radius: 0.75rem; background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-success); color: var(--color-success); font-weight: 700;">3</span>
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">Datenbankschicht</h3>
                </div>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--foreground); margin-bottom: 1rem;"><strong>Aufgabe:</strong> Zentrale, konsistente Speicherung aller Daten (Anwendungsdaten, Customizing, Metadaten, ABAP-Quellcode).</p>
                <p style="font-size: 0.9rem; color: var(--foreground-muted); margin: 0;"><strong>Verbindung:</strong> Ausschließlich die Applikationsschicht greift direkt auf die Datenbank zu. Die Präsentationsschicht hat keinen direkten Zugriff.</p>
            </div>
        </div>
    </div>

    <!-- 1.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">1.2 Die Architektur des ABAP-Applikationsservers und Workprozesse</h2>
        <p style="margin-bottom: 1.5rem;">Jeder ABAP-Applikationsserver verfügt über eine Laufzeitumgebung, die Anfragen verarbeitet. Das zentrale Steuerungselement ist der <strong>Dispatcher</strong> in Kombination mit den <strong>Workprozessen</strong>.</p>

        <!-- Dispatcher & Work Process Cards -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; color: var(--color-warning); font-weight: 700; margin-top: 0; margin-bottom: 1rem;">Der Dispatcher</h3>
            <p style="margin: 0; font-size: 0.95rem; line-height: 1.6;">
                Nimmt alle Anfragen (Requests) der Präsentationsschicht entgegen, verwaltet die verfügbaren Ressourcen und verteilt die eingehenden Anfragen nach dem <strong>FIFO-Prinzip</strong> (First In – First Out) an den nächsten freien Workprozess.
            </p>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.3rem; color: var(--color-warning); font-weight: 700; margin-top: 0; margin-bottom: 1rem;">Der Workprozess (Work Process)</h3>
            <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">
                Ein Workprozess führt die eigentliche Arbeit aus. Er läuft als isolierter Betriebssystem-Prozess und besteht intern aus folgenden Kernkomponenten:
            </p>

            <!-- Table or Grid for WP components -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 700;">Komponente</th>
                            <th style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 700;">Beschreibung</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem; color: var(--color-warning); font-weight: 600; white-space: nowrap;">Taskhändler (Task Handler)</td>
                            <td style="padding: 1rem; color: var(--foreground);">Koordiniert den gesamten Ablauf innerhalb des Workprozesses und steuert die Kommunikation.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem; color: var(--color-warning); font-weight: 600; white-space: nowrap;">Dynpro-Prozessor</td>
                            <td style="padding: 1rem; color: var(--foreground);">Verarbeitet die Bildschirmsteuerung dynamischer Programme (Dynpros). Kümmert sich um Layout, Formatprüfungen und Feldvalidierungen auf der UI.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 1rem; color: var(--color-warning); font-weight: 600; white-space: nowrap;">ABAP-Prozessor</td>
                            <td style="padding: 1rem; color: var(--foreground);">Führt den eigentlichen, kompilierten ABAP-Bytecode aus.</td>
                        </tr>
                        <tr>
                            <td style="padding: 1rem; color: var(--color-warning); font-weight: 600; white-space: nowrap;">Datenbank-Schnittstelle</td>
                            <td style="padding: 1rem; color: var(--foreground);">Übersetzt datenbankunabhängige ABAP-Befehle (z. B. Open SQL) in das native SQL der verwendeten Datenbank. Verwaltet außerdem die Datenbank-Pufferung zur Vermeidung langsamer Zugriffe auf unveränderliche Tabellendaten.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Merksatz / Prinzip Box -->
        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid var(--color-success); border-radius: 0 1rem 1rem 0; padding: 1.5rem; margin-top: 2rem; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);">
            <h4 style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">🔑 Wichtiges Prinzip: Das Dialogschritt-Verfahren</h4>
            <p style="margin: 0; font-size: 0.95rem; color: var(--foreground); line-height: 1.6;">
                Ein Workprozess bleibt während einer Benutzersitzung <strong>nicht dauerhaft</strong> für einen einzelnen Benutzer reserviert. Ein Programmablauf besteht aus einzelnen Dialogschritten (Benutzeraktion → Verarbeitung → Bildschirmausgabe). 
                Sobald ein Dialogschritt verarbeitet und das Ergebnis ans SAP GUI gesendet wurde, wird der Workprozess wieder frei. Dieser Mechanismus nennt sich <strong>Workprozess-Sharing</strong>.
            </p>
        </div>
    </div>

    <!-- 1.3 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">1.3 Ablauf eines interaktiven ABAP-Programms (PAI und PBO)</h2>
        <p style="margin-bottom: 2rem;">ABAP-Programme, die mit Bildschirmen (Dynpros) interagieren, arbeiten ereignisgesteuert. Jedes Dynpro besitzt eine zugehörige Ablauflogik (Flow Logic), die in zwei Hauptphasen unterteilt ist:</p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <!-- PAI -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: rgba(239, 68, 68, 0.08); border: 1px solid var(--color-danger); color: var(--color-danger); margin-bottom: 1rem; text-transform: uppercase;">Eingabephase</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1rem;">PAI – Process After Input</h3>
                <p style="font-size: 0.95rem; color: var(--foreground); margin-bottom: 1rem;">Ausgelöst, sobald der Benutzer eine Aktion auf dem Bildschirm ausführt (z. B. Enter drücken, Button anklicken, Sichern-Symbol nutzen).</p>
                <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.6;">
                    <li>Datenübertragung vom SAP GUI zum Applikationsserver</li>
                    <li>Prüfung der Datenkonsistenz</li>
                    <li>Berechnungen & Datenspeicherung in der Datenbank</li>
                </ul>
            </div>

            <!-- PBO -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-success); color: var(--color-success); margin-bottom: 1rem; text-transform: uppercase;">Ausgabephase</span>
                <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1rem;">PBO – Process Before Output</h3>
                <p style="font-size: 0.95rem; color: var(--foreground); margin-bottom: 1rem;">Läuft ab, bevor das nächste Bildschirmbild (dasselbe Dynpro oder ein Folgedynpro) an das SAP GUI gesendet wird.</p>
                <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.9rem; color: var(--foreground-muted); line-height: 1.6;">
                    <li>Feldinhalte für die Anzeige vorbereiten</li>
                    <li>Elemente ein- oder ausblenden</li>
                    <li>GUI-Status definieren (Menüleisten, Drucktasten, Symbole)</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- 1.4 Section -->
    <div style="margin-top: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid #ec4899; padding-left: 1rem; letter-spacing: -0.025em;">1.4 Programmtypen im Überblick</h2>
        <p style="margin-bottom: 2rem;">ABAP unterscheidet verschiedene Programmtypen, die für unterschiedliche Einsatzzwecke gedacht sind:</p>

        <div style="display: grid; grid-template-columns: 1fr; gap: 1.25rem;">
            <!-- Ausführbare Programme -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--foreground); margin: 0;">Ausführbare Programme (Reports / Typ 1)</h4>
                    <span style="font-size: 0.8rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 600;">SE38 / SA38</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Können direkt gestartet werden (über SE38/SA38 oder einen Transaktionscode). Nutzen standardisierte Selektionsbilder zur Dateneingabe und geben strukturierte Listen aus.</p>
            </div>

            <!-- Modulpools -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--foreground); margin: 0;">Modulpools (Dialogprogramme / Typ M)</h4>
                    <span style="font-size: 0.8rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 600;">Transaktionscode benötigt</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Werden für komplexe, bildschirmorientierte Anwendungen verwendet. Können nicht direkt gestartet werden; benötigen zwingend einen verknüpften Transaktionscode und bestehen aus einer Sammlung von PBO- und PAI-Modulen.</p>
            </div>

            <!-- Funktionsgruppen und Klassenpools -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--foreground); margin: 0;">Funktionsgruppen (Typ F) und Klassenpools (Typ K)</h4>
                    <span style="font-size: 0.8rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 600;">Wiederverwendbare Container</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Dienen als Container für wiederverwendbare Unterprogramme (Funktionsbausteine in Funktionsgruppen, Methoden in Klassenpools). Können nicht direkt als eigenständiges Programm gestartet werden.</p>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    45,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);

-- =========================================================================
-- KAPITEL 2: Erste Schritte in der ABAP-Entwicklung
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch02',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 2: Erste Schritte in der ABAP-Entwicklung',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: var(--color-warning);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 2: Erste Schritte in der ABAP-Entwicklung</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel führt in die praktische Arbeit mit der ABAP Workbench ein. Es erklärt die wichtigsten Entwicklungswerkzeuge, das Paketkonzept, die Software-Logistik (das Transportsystem) sowie die grundlegenden Syntaxregeln und elementaren Datentypen in ABAP.</p>

    <!-- 2.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">2.1 Werkzeuge der ABAP Workbench</h2>
        <p style="margin-bottom: 2rem;">Die ABAP Workbench ist eine integrierte Entwicklungsumgebung (IDE) innerhalb des SAP-Systems. Die wichtigsten Werkzeuge umfassen:</p>

        <!-- Grid for Workbench Tools -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- Object Navigator -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">Object Navigator</h3>
                    <span style="font-size: 0.8rem; background: rgba(245, 158, 11, 0.15); color: var(--color-warning); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">SE80</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.75rem;">Das zentrale „Schweizer Taschenmesser“ des Entwicklers. Bietet eine hierarchische Sicht auf alle Entwicklungsobjekte geordnet nach Paketen, Programmen, Klassen, Funktionsgruppen etc.</p>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0; font-style: italic;">Integriert fast alle anderen Workbench-Werkzeuge nahtlos.</p>
            </div>

            <!-- ABAP Editor -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">ABAP Editor</h3>
                    <span style="font-size: 0.8rem; background: rgba(245, 158, 11, 0.15); color: var(--color-warning); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">SE38</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.75rem;">Dient zum Schreiben, Ändern und Prüfen von ABAP-Quellcode.</p>
                <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0;"><strong>Features:</strong> Modernes Syntax-Highlighting, Autovervollständigung (Code Completion) und Pretty Printer (Formatierungshilfe).</p>
            </div>

            <!-- ABAP Dictionary -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--foreground); margin: 0;">ABAP Dictionary</h3>
                    <span style="font-size: 0.8rem; background: rgba(245, 158, 11, 0.15); color: var(--color-warning); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">SE11</span>
                </div>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.75rem;">Zentrales Metadaten-Repository für globale Typen.</p>
                <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5;">
                    <li><strong>Tabellen & Views:</strong> Physische Strukturen</li>
                    <li><strong>Datenelemente:</strong> Semantische Bedeutung (Spaltentitel)</li>
                    <li><strong>Domänen:</strong> Technische Eigenschaften (Typ, Länge, Festwerte)</li>
                    <li><strong>Strukturen & Tabellentypen:</strong> ABAP-Code-Datentypen</li>
                </ul>
            </div>
        </div>

        <!-- Additional Tools Table -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <h3 style="font-size: 1.25rem; color: var(--color-warning); font-weight: 700; margin-top: 0; margin-bottom: 1rem;">Weitere wichtige Werkzeuge</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 700;">Werkzeug</th>
                            <th style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 700; text-align: center;">Transaktion</th>
                            <th style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 700;">Aufgabe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 600;">Class Builder</td>
                            <td style="padding: 0.75rem 1rem; color: var(--color-warning); font-weight: 600; text-align: center;">SE24</td>
                            <td style="padding: 0.75rem 1rem; color: var(--foreground-muted);">Definition globaler ABAP-Objects-Klassen & Interfaces.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 600;">Function Builder</td>
                            <td style="padding: 0.75rem 1rem; color: var(--color-warning); font-weight: 600; text-align: center;">SE37</td>
                            <td style="padding: 0.75rem 1rem; color: var(--foreground-muted);">Erstellung von Funktionsbausteinen für prozedurale Wiederverwendung.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 600;">Screen Painter</td>
                            <td style="padding: 0.75rem 1rem; color: var(--color-warning); font-weight: 600; text-align: center;">SE51</td>
                            <td style="padding: 0.75rem 1rem; color: var(--foreground-muted);">Visuelle Gestaltung von Dynpro-Benutzeroberflächen.</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem 1rem; color: var(--foreground); font-weight: 600;">Menu Painter</td>
                            <td style="padding: 0.75rem 1rem; color: var(--color-warning); font-weight: 600; text-align: center;">SE41</td>
                            <td style="padding: 0.75rem 1rem; color: var(--foreground-muted);">Definition von GUI-Status, Menüs, Symbolleisten und Tastaturbelegungen.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- 2.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">2.2 Das Paketkonzept und Software-Logistik (Transportwesen)</h2>
        <p style="margin-bottom: 1.5rem;">In einem SAP-System wird Software strukturiert und kontrolliert aus der Entwicklung bis in den Produktivbetrieb überführt. Dafür sind Pakete und Transportaufträge unerlässlich.</p>

        <!-- Steps or Cards Grid -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Das Paket -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <h3 style="font-size: 1.25rem; color: var(--color-primary); font-weight: 700; margin-top: 0; margin-bottom: 0.75rem;">1. Das Paket (Package)</h3>
                <p style="margin-bottom: 1rem; font-size: 0.95rem;">Jedes neu angelegte Entwicklungsobjekt (Programm, Tabelle, Klasse etc.) muss einem Paket zugeordnet werden. Pakete gruppieren Objekte logisch und steuern Modularisierung, Sichtbarkeit, Schnittstellen und die Transportrelevanz.</p>
                <div style="background: rgba(163, 191, 250, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 0.75rem; padding: 1rem;">
                    <p style="font-size: 0.9rem; color: var(--foreground); margin: 0;"><strong>Lokale Objekte ($TMP):</strong> Objekte, die nur zu Testzwecken oder als temporäre Entwürfe dienen, werden dem Paket <code>$TMP</code> zugeordnet. Diese sind rein lokal, nicht transportierbar und werden niemals an andere Systeme im Netzwerk übertragen.</p>
                </div>
            </div>

            <!-- Transport Organizer -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                    <h3 style="font-size: 1.25rem; color: var(--color-primary); font-weight: 700; margin: 0;">2. Der Transport Organizer</h3>
                    <span style="font-size: 0.8rem; background: rgba(139, 92, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">SE09 / SE10</span>
                </div>
                <p style="margin-bottom: 1rem; font-size: 0.95rem;">Soll ein Objekt transportiert werden, muss es in ein transportables Paket (nicht <code>$TMP</code>) gelegt werden. Beim Sichern fordert das System automatisch die Zuordnung zu einem Transportauftrag (Transport Request).</p>
                
                <p style="font-weight: 600; font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.5rem;">Aufbau eines Transportauftrags:</p>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem; font-family: monospace; font-size: 0.85rem; color: var(--foreground); border-left: 3px solid #8b5cf6;">
                    Transportauftrag (z.B. DEVK900123 - Übergeordneter Behälter, Projekt/Release)<br>
                    &nbsp;└── Aufgabe / Task (Ebene des einzelnen Entwicklers, sperrt & zeichnet Objekte auf)
                </div>

                <p style="font-weight: 600; font-size: 0.9rem; color: var(--foreground); margin-top: 1.5rem; margin-bottom: 0.5rem;">Der Freigabe-Prozess:</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                        <span style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">1. Task freigeben</span>
                        <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.5rem 0 0 0;">Entwickler gibt seine persönliche Task frei. Sperren auf den Objekten bleiben bestehen.</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                        <span style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">2. Auftrag freigeben</span>
                        <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.5rem 0 0 0;">Sind alle Aufgaben freigegeben, gibt der Projektleiter den gesamten Transportauftrag frei.</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                        <span style="color: var(--color-primary); font-weight: 700; font-size: 0.9rem;">3. Export & Import</span>
                        <p style="font-size: 0.85rem; color: var(--foreground-muted); margin: 0.5rem 0 0 0;">Objekt-Export aus der DB in das Transportverzeichnis, gefolgt von Import in QAS und danach PRD.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 2.3 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">2.3 Der Entwicklungszyklus: Inaktiv vs. Aktiv</h2>
        <p style="margin-bottom: 2rem;">Um zu verhindern, dass unfertige oder fehlerhafte Entwicklungen den laufenden Betrieb stören, nutzt SAP ein striktes <strong>Aktivierungskonzept</strong>:</p>

        <!-- Activity Cycle Diagram -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 1.5rem auto; max-width: 420px;">
                <div style="background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.3); padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.9rem; text-align: center; width: 100%; color: var(--foreground);">
                    <strong>Inaktive Version im Editor</strong><br><span style="font-size: 0.75rem; color: var(--foreground-muted);">Sichern mit Strg + S</span>
                </div>
                <div style="color: var(--color-primary); font-weight: 800;">↓</div>
                <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.9rem; text-align: center; width: 100%; color: var(--color-warning);">
                    <strong>Syntaxprüfung</strong><br><span style="font-size: 0.75rem;">Prüfen mit Strg + F2</span>
                </div>
                <div style="color: var(--color-primary); font-weight: 800;">↓ <span style="font-size: 0.75rem; color: var(--foreground); font-weight: normal;">Fehlerfrei?</span></div>
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.9rem; text-align: center; width: 100%; color: var(--color-success);">
                    <strong>Aktivierung</strong><br><span style="font-size: 0.75rem;">Generieren mit Strg + F3</span>
                </div>
                <div style="color: var(--color-primary); font-weight: 800;">↓</div>
                <div style="background: rgba(34, 197, 94, 0.2); border: 1px solid rgba(34, 197, 94, 0.5); padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.9rem; text-align: center; width: 100%; color: #4ade80;">
                    <strong>Aktive Version zur Laufzeit</strong><br><span style="font-size: 0.75rem;">Global sichtbar & ausführbar</span>
                </div>
            </div>
            
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 2rem 0;">

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
                <div>
                    <h4 style="color: var(--color-primary); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.05rem;">Inaktiver Zustand</h4>
                    <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Beim Sichern (Strg + S) werden Änderungen gespeichert, sind jedoch nur für den Entwickler im Editor sichtbar. Es gibt keinerlei Auswirkungen auf andere Benutzer oder produktive Abläufe.</p>
                </div>
                <div>
                    <h4 style="color: var(--color-success); margin-top: 0; margin-bottom: 0.5rem; font-size: 1.05rem;">Aktivierung</h4>
                    <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Beim Aktivieren (Strg + F3) führt das System eine Konsistenzprüfung durch. Erst bei erfolgreicher Prüfung wird die Version generiert und überschreibt global sichtbar und ausführbar die vorherige aktive Version.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- 2.4 Section -->
    <div style="margin-top: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid #ec4899; padding-left: 1rem; letter-spacing: -0.025em;">2.4 Grundlagen der ABAP-Syntax und elementare Datentypen</h2>
        <p style="margin-bottom: 1.5rem;">ABAP (Advanced Business Application Programming) besitzt eine sehr strukturierte, historisch gewachsene Syntax.</p>

        <!-- Syntax Rules Card -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 2rem;">
            <h3 style="font-size: 1.25rem; color: #ec4899; font-weight: 700; margin-top: 0; margin-bottom: 1.25rem;">Grundlegende Syntaxregeln</h3>
            <ul style="padding-left: 1.25rem; margin: 0 0 1.5rem 0; font-size: 0.95rem; color: var(--foreground); line-height: 1.7;">
                <li><strong>Anweisungen:</strong> Jede ABAP-Anweisung beginnt mit einem deklarativen/operativen Schlüsselwort und endet zwingend mit einem <strong>Punkt (.)</strong>.</li>
                <li><strong>Tokens:</strong> Einzelne Wörter müssen durch mindestens ein Leerzeichen oder einen Zeilenumbruch voneinander getrennt sein.</li>
                <li><strong>Kommentare:</strong> Ein Sternchen (<code>*</code>) am Zeilenanfang kommentiert die gesamte Zeile. Ein doppeltes Anführungszeichen (<code>"</code>) macht den Rest einer Zeile zum Kommentar.</li>
                <li><strong>Deklaration:</strong> Variablen werden mit der <code>DATA</code>-Anweisung deklariert: <code style="background: var(--background); border: 1px solid var(--border); padding: 0.15rem 0.4rem; border-radius: 4px; color: var(--color-secondary);">DATA gv_name TYPE string.</code></li>
            </ul>

            <p style="font-weight: 600; font-size: 0.95rem; color: var(--foreground); margin-bottom: 0.5rem;">Kettensätze (Chain Statements):</p>
            <p style="font-size: 0.9rem; margin-bottom: 0.75rem;">Haben aufeinanderfolgende Anweisungen dasselbe Anfangsschlüsselwort, können sie mit einem Doppelpunkt zusammengefasst und durch Komma getrennt werden:</p>
            <div style="background: #0f172a; color: #e2e8f0; border-left: 4px solid #ec4899; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; color: #d4d4d4; line-height: 1.5;">
                DATA:<br>
                &nbsp;&nbsp;gv_name TYPE string,<br>
                &nbsp;&nbsp;gv_age  TYPE i.
            </div>
        </div>

        <!-- Datatypes Tables -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem;">
            <h3 style="font-size: 1.25rem; color: #ec4899; font-weight: 700; margin-top: 0; margin-bottom: 1.25rem;">Elementare Datentypen in ABAP</h3>
            
            <h4 style="color: var(--foreground); font-size: 1.05rem; margin-bottom: 0.75rem;">1. Typen mit fixer Länge</h4>
            <div style="overflow-x: auto; margin-bottom: 2rem;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 80px;">Typ</th>
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 140px;">Bedeutung</th>
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 100px; text-align: center;">Standardlänge</th>
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Beschreibung / Besonderheit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">I</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Integer / Ganzzahl</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">4 Byte</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Ganzzahlige Berechnungen, Indizes, Schleifenzähler.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">F</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Gleitkommazahl</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">8 Byte</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Sehr große Zahlen oder wissenschaftliche Berechnungen (Gefahr von Rundungsfehlern).</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">D</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Date / Datum</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">8 Zeichen</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Format: YYYYMMDD (z.B. 20260520). Erlaubt einfache Datumsarithmetik.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">T</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Time / Uhrzeit</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">6 Zeichen</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Format: HHMMSS (z.B. 143000).</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">C</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Character / Textfeld</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">1 Zeichen</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Alphanumerischer Text. Länge muss explizit deklariert werden: <code>DATA gv_text TYPE c LENGTH 10.</code></td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">N</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Numeric Character</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">1 Zeichen</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Alphanumerisch, nur Ziffern von 0-9. Fehlende Stellen werden linksbündig mit Nullen aufgefüllt.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">X</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Hexadezimal / Byte</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">1 Byte</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Für die direkte Verarbeitung von Byte-Folgen.</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">P</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Packed Number</td>
                            <td style="padding: 0.75rem; color: var(--foreground); text-align: center;">8 Byte</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Gepackte Festkommazahl mit Nachkommastellen (z.B. für Währungen). Definition: <code>DATA gv_preis TYPE p LENGTH 8 DECIMALS 2.</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 style="color: var(--foreground); font-size: 1.05rem; margin-bottom: 0.75rem;">2. Typen mit dynamischer Länge</h4>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.85rem;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border);">
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 80px;">Typ</th>
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 140px;">Bedeutung</th>
                            <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Beschreibung</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">STRING</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Textstring</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Für beliebig langen, dynamischen Text. Äußerst flexibel und speichereffizient bei variierender Länge.</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">XSTRING</td>
                            <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Byte-String</td>
                            <td style="padding: 0.75rem; color: var(--foreground-muted);">Für dynamische Byte-Folgen (z.B. PDF-Dateien oder Bilder im Binärformat).</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    46,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);

-- =========================================================================
-- KAPITEL 3: Programmablauf (Program Flow)
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch03',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 3: Programmablauf (Program Flow)',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(139, 92, 246, 0.08); border: 1px solid var(--color-primary); color: var(--color-primary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 3: Programmablauf (Program Flow)</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel behandelt die Struktur von ABAP-Programmen, ihre Ausführung durch die Laufzeitumgebung, die Steuerung des Programmflusses über Ereignisse sowie das effiziente Debugging.</p>

    <!-- 3.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">3.1 Verarbeitungsblöcke (Processing Blocks)</h2>
        <p style="margin-bottom: 1.5rem;">Ein ABAP-Programm besteht im Wesentlichen aus deklarativen Anweisungen und ausführbaren Verarbeitungsblöcken. In ABAP gibt es (außer rein deklarativen Befehlen) keine freien Anweisungen außerhalb von Verarbeitungsblöcken. Jede ausführbare Zeile gehört zwingend zu einem Block.</p>
        
        <p style="margin-bottom: 2rem;">Es gibt drei Hauptarten von Verarbeitungsblöcken, die von der ABAP-Laufzeitumgebung aufgerufen werden:</p>

        <!-- Grid of 3 Processing Blocks -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- Ereignisblöcke -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(139, 92, 246, 0.08); color: var(--color-primary); border: 1px solid var(--color-primary); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Ereignisgesteuert</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">Ereignisblöcke (Event Blocks)</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground); line-height: 1.5; margin-bottom: 1rem;">Werden durch Ereignisse des ABAP-Laufzeit-Frameworks ausgelöst (z.B. Benutzerinteraktionen, Systemereignisse, Programmstart, Selektionsbildverarbeitung).</p>
                    <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1.5rem;">
                        <li>Besitzen keine formale Parameterschnittstelle.</li>
                        <li>Können nicht explizit im Programm gerufen werden.</li>
                        <li>Enden implizit beim Start eines neuen Verarbeitungsblocks.</li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: var(--color-primary);">
                    Beispiele: INITIALIZATION, START-OF-SELECTION
                </div>
            </div>

            <!-- Dialogmodule -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(236, 72, 153, 0.08); border: 1px solid var(--color-secondary); color: var(--color-secondary); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Dynpro-Interaktion</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">Dialogmodule (Dialog Modules)</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground); line-height: 1.5; margin-bottom: 1rem;">Dienen der direkten Interaktion mit klassischen Dynpros (SAP-Bildschirmen).</p>
                    <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1.5rem;">
                        <li><strong>PBO (Process Before Output):</strong> Vor der Bildschirmanzeige ausgeführt.</li>
                        <li><strong>PAI (Process After Input):</strong> Nach einer Benutzeraktion ausgeführt.</li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); line-height: 1.4;">
                    <span style="color: var(--color-secondary);">MODULE</span> user_command_0100 INPUT.<br>
                    &nbsp;&nbsp;<span style="color: #64748b;">" Benutzereingabe verarbeiten</span><br>
                    <span style="color: var(--color-secondary);">ENDMODULE.</span>
                </div>
            </div>

            <!-- Prozeduren -->
            <div style="border-radius: 1.25rem; padding: 2rem; background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="font-size: 0.75rem; background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-success); color: var(--color-success); padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; text-transform: uppercase;">Wiederverwendbarkeit</span>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--foreground); margin-top: 1rem; margin-bottom: 0.75rem;">Prozeduren (Procedures)</h3>
                    <p style="font-size: 0.9rem; color: var(--foreground); line-height: 1.5; margin-bottom: 1rem;">Wiederverwendbare Blöcke, die explizit im Code aufgerufen werden. Unterstützen Kapselung, lokale Daten und strukturierte Parameterübergabe.</p>
                    <ul style="padding-left: 1.2rem; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin-bottom: 1.5rem;">
                        <li><strong>Methoden:</strong> Der moderne Standard in ABAP Objects (Klassen).</li>
                        <li><strong>Funktionsbausteine:</strong> Globale Prozeduren in Funktionsgruppen.</li>
                        <li><strong>Unterprogramme (FORM):</strong> Veraltete, rein lokale Routinen. <span style="color: #ef4444; font-weight: bold;">Obsolet!</span></li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); line-height: 1.4;">
                    <span style="color: var(--color-success);">METHOD</span> calc_price.<br>
                    &nbsp;&nbsp;<span style="color: #64748b;">" Logik in Klasse</span><br>
                    <span style="color: var(--color-success);">ENDMETHOD.</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 3.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-warning); padding-left: 1rem; letter-spacing: -0.025em;">3.2 Ablauf eines ausführbaren ABAP-Programms (Reports)</h2>
        <p style="margin-bottom: 2rem;">Ausführbare Programme werden auch <strong>Reports</strong> (Typ 1) genannt. Sie können direkt gestartet werden (SE38/SA38 oder T-Code) und folgen einem festen, von der Laufzeitumgebung gesteuerten Ereignis-Lebenszyklus.</p>

        <!-- Selection Screen Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- PARAMETERS -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <h3 style="font-size: 1.15rem; color: var(--color-warning); font-weight: 700; margin-top: 0; margin-bottom: 0.75rem;">PARAMETERS (Einzelfeld)</h3>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 1rem;">Erzeugt ein einzelnes, einfaches Eingabefeld auf dem Selektionsbild.</p>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #d4d4d4; margin-bottom: 0.5rem;">
                    <span style="color: var(--color-warning); font-weight: bold;">PARAMETERS</span> pv_carr <span style="color: var(--color-warning);">TYPE</span> scarr-carrid.
                </div>
                <span style="font-size: 0.85rem; color: var(--foreground-muted); font-style: italic;">Erzeugt Eingabefeld für eine einzelne Fluggesellschaft-ID.</span>
            </div>

            <!-- SELECT-OPTIONS -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <h3 style="font-size: 1.15rem; color: var(--color-warning); font-weight: 700; margin-top: 0; margin-bottom: 0.75rem;">SELECT-OPTIONS (Komplexe Ranges)</h3>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 1rem;">Erzeugt ein hochflexibles, komplexes Selektionsfeld für Filterbereiche.</p>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: #d4d4d4; margin-bottom: 0.5rem;">
                    <span style="color: var(--color-warning); font-weight: bold;">SELECT-OPTIONS</span> so_conn <span style="color: var(--color-warning);">FOR</span> sflight-connid.
                </div>
                <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: var(--foreground-muted); margin: 0; line-height: 1.4;">
                    <li>Erzeugt intern eine Range-Tabelle.</li>
                    <li>Unterstützt Von-Bis, Mehrfachauswahl und Ausschlüsse.</li>
                </ul>
            </div>
        </div>

        <!-- Datatransport Info Box -->
        <div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; border-radius: 0 1rem 1rem 0; padding: 1.5rem; margin-bottom: 3rem;">
            <h4 style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 0.5rem;">🔗 Das Prinzip der Namensgleichheit</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--foreground); line-height: 1.5;">
                Der Datentransport zwischen Dynpro-Feldern (auf dem Bildschirm) und dem ABAP-Programm basiert auf <strong>Namensgleichheit</strong>. Besitzt ein Eingabefeld auf dem Bildschirm denselben Namen wie eine im ABAP-Programm deklarierte Variable, übernimmt die ABAP-Laufzeitumgebung den Transport vollautomatisch:
                <br><span style="color: var(--color-primary); font-weight: 600;">Bei PBO:</span> Vom Programm zum Bildschirm.
                <br><span style="color: var(--color-primary); font-weight: 600;">Bei PAI:</span> Vom Bildschirm zurück in die Programmvariablen.
            </p>
        </div>

        <!-- Lifecycle Flowchart -->
        <h3 style="font-size: 1.4rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.5rem; text-align: center;">Ereignis-Lebenszyklus eines Reports</h3>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin: 2rem auto; max-width: 500px; background: rgba(30, 41, 59, 0.2); border: 1px solid var(--border); padding: 2rem; border-radius: 1.5rem;">
            
            <!-- LOAD-OF-PROGRAM -->
            <div style="background: var(--surface); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; letter-spacing: 0.05em;">Schritt 1 (Einmalig)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--foreground); font-family: monospace; margin: 0.15rem 0;">LOAD-OF-PROGRAM</div>
                <div style="font-size: 0.8rem; color: var(--foreground-muted);">Ausgelöst beim Laden des Programms in den internen Modus.</div>
            </div>
            
            <div style="color: var(--color-primary); font-weight: 800; font-size: 1.2rem;">↓</div>

            <!-- INITIALIZATION -->
            <div style="background: var(--surface); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--color-primary); font-weight: 700; letter-spacing: 0.05em;">Schritt 2 (Vor Anzeige)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--foreground); font-family: monospace; margin: 0.15rem 0;">INITIALIZATION</div>
                <div style="font-size: 0.8rem; color: var(--foreground-muted);">Dient zur Vorbelegung der Selektionsbildfelder mit Standardwerten.</div>
            </div>

            <div style="color: var(--color-primary); font-weight: 800; font-size: 1.2rem;">↓</div>

            <!-- SELECTION SCREEN DISPLAY -->
            <div style="background: rgba(245, 158, 11, 0.05); border: 1px dashed var(--color-warning); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%;">
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-warning); margin: 0.15rem 0;">Selektionsbild wird angezeigt</div>
                <div style="font-size: 0.8rem; color: var(--foreground);">Benutzer gibt Filterkriterien ein und drückt F8.</div>
            </div>

            <div style="color: var(--color-warning); font-weight: 800; font-size: 1.2rem;">↓ <span style="font-size: 0.75rem; color: var(--foreground-muted); font-weight: normal;">(Nach Benutzeraktion)</span></div>

            <!-- AT SELECTION-SCREEN -->
            <div style="background: var(--surface); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--color-warning); font-weight: 700; letter-spacing: 0.05em;">Schritt 3 (Eingabeverarbeitung / PAI)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--foreground); font-family: monospace; margin: 0.15rem 0;">AT SELECTION-SCREEN</div>
                <div style="font-size: 0.8rem; color: var(--foreground-muted);">Prüfung der Benutzereingaben. Bei Fehlern wird die Ausführung abgebrochen.</div>
            </div>

            <div style="color: #10b981; font-weight: 800; font-size: 1.2rem;">↓ <span style="font-size: 0.75rem; color: var(--foreground-muted); font-weight: normal;">(Fehlerfrei)</span></div>

            <!-- START-OF-SELECTION -->
            <div style="background: var(--surface); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--color-success); font-weight: 700; letter-spacing: 0.05em;">Schritt 4 (Haupt-Datenbeschaffung)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--foreground); font-family: monospace; margin: 0.15rem 0;">START-OF-SELECTION</div>
                <div style="font-size: 0.8rem; color: var(--color-success); font-weight: 600;">Standard-Hauptblock. Hier liegt die gesamte Geschäftslogik.</div>
            </div>

            <div style="color: #10b981; font-weight: 800; font-size: 1.2rem;">↓</div>

            <!-- END-OF-SELECTION -->
            <div style="background: var(--surface); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--color-success); font-weight: 700; letter-spacing: 0.05em;">Schritt 5 (Finalisierung)</div>
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--foreground); font-family: monospace; margin: 0.15rem 0;">END-OF-SELECTION</div>
                <div style="font-size: 0.8rem; color: var(--foreground-muted);">Aufbereitung vor der endgültigen Ausgabe (ALV / Liste).</div>
            </div>

            <div style="color: var(--color-primary); font-weight: 800; font-size: 1.2rem;">↓</div>

            <!-- LIST DISPLAY -->
            <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 1rem; padding: 0.75rem 1.25rem; text-align: center; width: 100%;">
                <div style="font-size: 1.05rem; font-weight: 800; color: var(--color-primary); margin: 0.15rem 0;">Ergebnis-Listenanzeige</div>
                <div style="font-size: 0.8rem; color: var(--foreground);">Dem Anwender wird das Ergebnis (ALV oder klassische Liste) präsentiert.</div>
            </div>
        </div>
    </div>

    <!-- 3.3 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">3.3 Debugging von Programmen</h2>
        <p style="margin-bottom: 1.5rem;">Der <strong>ABAP Debugger</strong> ist das zentrale Werkzeug zur Laufzeitanalyse und Fehlersuche. Er gestattet es, Programme Zeile für Zeile auszuführen, Variablen zu prüfen und Werte zur Laufzeit zu manipulieren.</p>

        <!-- Grid for Debugger Concepts -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <!-- Two Process Architecture -->
            <div style="background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); border-radius: 1rem; padding: 1.5rem;">
                <h3 style="font-size: 1.2rem; color: var(--color-primary); font-weight: 700; margin-top: 0; margin-bottom: 0.75rem;">Zwei-Prozessor-Architektur</h3>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">
                    Der moderne (neue) ABAP Debugger läuft in einer <strong>Zwei-Prozessor-Architektur</strong>. Die Anwendung läuft in einer eigenen Workprozess-Session, während die Debugger-Oberfläche in einer vollständig isolierten Session läuft. Ein Absturz des Debuggers reißt daher die Anwendung nicht mit in den Abgrund.
                </p>
            </div>

            <!-- Watchpoints -->
            <div style="background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); border-radius: 1rem; padding: 1.5rem;">
                <h3 style="font-size: 1.2rem; color: var(--color-primary); font-weight: 700; margin-top: 0; margin-bottom: 0.75rem;">Watchpoints</h3>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-bottom: 0.75rem; line-height: 1.5;">
                    Watchpoints überwachen den Inhalt eines Datenobjekts (Variable, Struktur, Tabelle) während der Ausführung. Das Programm stoppt automatisch, sobald sich der Wert des Objekts ändert.
                </p>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--foreground);">
                    Bedingung z.B.: sy-index > 5
                </div>
            </div>
        </div>

        <!-- Breakpoint Types Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Breakpoint-Arten im Überblick</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
            <!-- Statische -->
            <div style="background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; padding: 1.25rem;">
                <span style="color: #f87171; font-weight: 700; font-size: 0.95rem;">Statische Breakpoints</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0.75rem;">Werden fest in den Quelltext eingetragen:</p>
                <code style="background: var(--background); border: 1px solid var(--border); padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace; font-size: 0.8rem; color: #f87171;">BREAK-POINT.</code><br>
                <p style="font-size: 0.8rem; color: var(--foreground-muted); margin-top: 0.5rem; font-weight: 600; text-transform: uppercase;">⚠️ Niemals in Produktivcode einchecken!</p>
            </div>

            <!-- Dynamische -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Dynamische Breakpoints</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0;">Werden flexibel per Mausklick im Editor gesetzt und verschwinden nach dem Schließen des Programms wieder. Perfekt für das Debugging während der Entwicklung.</p>
            </div>

            <!-- Session -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">Session-Breakpoints</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0;">Gelten nur für die aktuelle Benutzeranmeldung in derselben SAP GUI Sitzung. Sehr typisch bei der alltäglichen Fehlersuche.</p>
            </div>

            <!-- External -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 0.95rem;">External Breakpoints</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0.5rem;">Gelten für externe Schnittstellenaufrufe (HTTP, RFC-Calls, SAP Fiori / Web-Dynpro). Sie sind typischerweise auf maximal <strong>2 Stunden</strong> zeitlich begrenzt.</p>
            </div>
        </div>

        <!-- Debugger Navigation Table -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Navigation im Debugger</h3>
        <div style="overflow-x: auto; margin-bottom: 3rem; background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 80px;">Taste</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 180px;">Funktion</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Bedeutung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-weight: 700; font-family: monospace;">F5</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Einzelschritt (Step Into)</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Führt die nächste Zeile aus. Springt bei Aufrufen tief hinein in Unterprozeduren (Methoden, Funktionsbausteine).</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-weight: 700; font-family: monospace;">F6</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Ausführen (Step Over)</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Führt die aktuelle Codezeile aus, führt aber Prozeduraufrufe vollständig im Hintergrund aus, ohne hineinzuspringen.</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-primary); font-weight: 700; font-family: monospace;">F7</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Return (Step Out)</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Führt die aktuelle Prozedur bis zum Ende durch und springt direkt zum Aufrufer zurück.</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; color: var(--color-primary); font-weight: 700; font-family: monospace;">F8</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Fortsetzen (Continue)</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Führt das Programm normal weiter aus, bis ein neues Ereignis, das Programmende oder der nächste Breakpoint/Watchpoint erreicht wird.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Debugger Tools Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Wichtige Debugger-Werkzeuge</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <!-- Variables -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">Variables (Variablenanzeige)</h4>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Ermöglicht das Überprüfen von Feldwerten zur Laufzeit. Werte können direkt im Debugger manuell überschrieben werden, um alternative Programmabläufe zu testen.</p>
            </div>

            <!-- Table -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">Table (Tabellenanzeige)</h4>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Stellt den Inhalt von internen Tabellen in einer komfortablen, tabellarischen Zeilen- und Spaltenübersicht dar. Ermöglicht auch das Filtern oder Sortieren im Arbeitsspeicher.</p>
            </div>

            <!-- Call Stack -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <h4 style="color: var(--color-primary); font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 0.5rem;">Call Stack (Aufrufhierarchie)</h4>
                <p style="font-size: 0.9rem; color: var(--foreground); margin: 0; line-height: 1.5;">Zeigt den exakten Programmpfad, den das System genommen hat, um zur aktuellen Codezeile zu gelangen (z. B. welcher Report welche Methode oder welchen Funktionsbaustein aufgerufen hat).</p>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    47,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);

-- =========================================================================
-- KAPITEL 4: Datenbeschaffung (Data Retrieval)
-- =========================================================================

INSERT INTO lessons (id, subjectId, authorId, title, content, contentRaw, type, status, sortOrder, createdAt, updatedAt)
VALUES (
    'lesson_bc400_ch04',
    'sxh3e5ewi0qahenr6jg',
    'u5ilhtdcn9ycti9tbmc',
    'BC400 - Kapitel 4: Datenbeschaffung (Data Retrieval)',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif; color: var(--foreground); line-height: 1.6;">
    <!-- Topic Badge -->
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(236, 72, 153, 0.15); border: 1px solid rgba(236, 72, 153, 0.3); color: var(--color-secondary);">SAP - ABAP (BC400)</span>
    
    <h1 style="font-size: 2.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1rem; letter-spacing: -0.025em; line-height: 1.2;">Kapitel 4: Datenbeschaffung (Data Retrieval)</h1>
    <p style="font-size: 1.1rem; color: var(--foreground-muted); margin-bottom: 2rem;">Dieses Kapitel erläutert, wie Daten effizient und datenbankunabhängig aus der relationalen Datenbank gelesen werden, wie Open SQL funktioniert und wie Berechtigungsprüfungen im Programm verankert werden.</p>

    <!-- 4.1 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-secondary); padding-left: 1rem; letter-spacing: -0.025em;">4.1 Datenbanksätze lesen mit Open SQL</h2>
        <p style="margin-bottom: 1.5rem;">Das SAP-System speichert alle Anwendungsdaten in einer relationalen Datenbank. ABAP greift über <strong>Open SQL</strong> (auch ABAP SQL) auf die Tabellen zu. Open SQL ist datenbankunabhängig; die ABAP-Datenbankschnittstelle übersetzt es in das native SQL der eingesetzten Datenbank (z.B. SAP HANA, Oracle, MS SQL Server).</p>

        <!-- Syntax of SELECT -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 2.5rem; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);">
            <h3 style="font-size: 1.2rem; color: var(--color-secondary); font-weight: 700; margin-top: 0; margin-bottom: 1rem;">Syntax der SELECT-Anweisung</h3>
            <div style="background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; color: var(--foreground); line-height: 1.5; border-left: 4px solid var(--color-secondary);">
                <span style="color: var(--color-secondary); font-weight: bold;">SELECT</span> &lt;projection&gt;<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">FROM</span> &lt;database_table&gt;<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">INTO</span> &lt;target_area&gt;<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">WHERE</span> &lt;condition&gt;.
            </div>
            
            <h4 style="font-size: 1.05rem; color: var(--foreground); font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;">Die Projektion (Spaltenauswahl)</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                    <span style="color: #ef4444; font-weight: bold; font-size: 0.9rem;">SELECT * (Alle Spalten)</span>
                    <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0;">Liest sämtliche Spalten einer Zeile. Sollte aus Performancegründen strikt vermieden werden, falls nicht alle Datenfelder zwingend benötigt werden.</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 0.75rem;">
                    <span style="color: var(--color-success); font-weight: bold; font-size: 0.9rem;">Gezielte Spaltenauswahl</span>
                    <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; margin-bottom: 0;">Liest nur die explizit aufgelisteten Spaltenfelder aus. Spart Netzwerkbandbreite und Speicherplatz auf dem Applikationsserver.</p>
                </div>
            </div>
        </div>

        <!-- Host Variables Info -->
        <div style="background: rgba(244, 114, 182, 0.1); border-left: 4px solid var(--color-secondary); border-radius: 0 1rem 1rem 0; padding: 1.5rem; margin-bottom: 3rem;">
            <h4 style="color: var(--color-secondary); font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 0.5rem;">@ Host-Variablen</h4>
            <p style="margin: 0; font-size: 0.9rem; color: var(--foreground); line-height: 1.5;">
                In modernem ABAP SQL müssen ABAP-Variablen, die innerhalb eines SQL-Statements verwendet werden (z. B. in der <code>WHERE</code>-Bedingung oder als Inline-Deklarationen), zwingend mit einem vorangestellten <strong><code>@</code>-Zeichen</strong> (Escape-Zeichen) gekennzeichnet werden.
            </p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); margin-top: 1rem;">
                <span style="color: var(--color-secondary);">SELECT</span> carrid, connid <span style="color: var(--color-secondary);">FROM</span> sflight <span style="color: var(--color-secondary);">INTO TABLE</span> <span style="color: var(--color-primary);">@DATA</span>(lt_flights) <span style="color: var(--color-secondary);">WHERE</span> carrid = <span style="color: var(--color-primary);">@lv_carrid</span>.
            </div>
        </div>

        <!-- Read Strategies Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Lesestrategien im Vergleich</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- SELECT SINGLE -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; text-transform: uppercase;">SELECT SINGLE</span>
                    <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; line-height: 1.5;">Sucht gezielt nach genau einem Datensatz.</p>
                    <ul style="padding-left: 1.1rem; font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.4; margin-top: 0.5rem;">
                        <li>Best Practice: Den vollständigen Primärschlüssel im <code>WHERE</code> angeben.</li>
                        <li>Benötigt <strong>kein</strong> schließendes <code>ENDSELECT</code>.</li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.75rem; color: var(--foreground); line-height: 1.4; margin-top: 1rem;">
                    <span style="color: var(--color-secondary);">SELECT SINGLE</span> carrname<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">FROM</span> scarr<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO</span> @DATA(lv_name)<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">WHERE</span> carrid = @lv_carrid.
                </div>
            </div>

            <!-- SELECT ... ENDSELECT -->
            <div style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="color: #ef4444; font-weight: 700; font-size: 1.1rem; text-transform: uppercase;">SELECT ... ENDSELECT</span>
                    <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; line-height: 1.5;">Liest Zeilen nacheinander einzeln aus der Datenbank.</p>
                    <ul style="padding-left: 1.1rem; font-size: 0.8rem; color: #b91c1c; line-height: 1.4; margin-top: 0.5rem; font-weight: 600;">
                        <li>Hohe Netzwerklast durch viele Datenbank-Roundtrips.</li>
                        <li>Sollte in der Praxis dringend vermieden werden!</li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.75rem; color: var(--foreground); line-height: 1.4; margin-top: 1rem;">
                    <span style="color: var(--color-secondary);">SELECT</span> carrid, connid <span style="color: var(--color-secondary);">FROM</span> sflight<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO</span> @DATA(ls_flight).<br>
                    &nbsp;&nbsp;<span style="color: #64748b;">" Schleifenverarbeitung pro Satz</span><br>
                    <span style="color: var(--color-secondary);">ENDSELECT.</span>
                </div>
            </div>

            <!-- SELECT ... INTO TABLE -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <span style="color: var(--color-success); font-weight: 700; font-size: 1.1rem; text-transform: uppercase;">SELECT ... INTO TABLE</span>
                    <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; line-height: 1.5;">Liest alle passenden Datensätze auf einmal.</p>
                    <ul style="padding-left: 1.1rem; font-size: 0.8rem; color: var(--foreground-muted); line-height: 1.4; margin-top: 0.5rem;">
                        <li>Daten werden über die <strong>Array-Schnittstelle</strong> übertragen.</li>
                        <li>Enormer Performance-Vorteil; Best Practice!</li>
                    </ul>
                </div>
                <div style="background: var(--background); border: 1px solid var(--border); padding: 0.75rem; border-radius: 6px; font-family: monospace; font-size: 0.75rem; color: var(--foreground); line-height: 1.4; margin-top: 1rem;">
                    <span style="color: var(--color-secondary);">SELECT</span> carrid, connid<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">FROM</span> sflight<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">INTO TABLE</span> @DATA(lt_flights)<br>
                    &nbsp;&nbsp;<span style="color: var(--color-secondary);">WHERE</span> carrid = @lv_carrid.
                </div>
            </div>
        </div>

        <!-- Inline Declarations -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Inline-Deklarationen (ABAP 7.40+)</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Seit ABAP Version 7.40 können Zielbereiche direkt im SQL-Befehl inline deklariert werden. Die Deklaration vorab mit <code>DATA</code> entfällt.</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 3rem;">
            <!-- Work Area -->
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px;">
                <span style="color: var(--color-secondary); font-weight: 700; font-size: 0.9rem;">Struktur / Work Area</span>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); margin-top: 0.5rem;">
                    INTO @DATA(ls_flight)
                </div>
            </div>
            <!-- Interne Tabelle -->
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px;">
                <span style="color: var(--color-secondary); font-weight: 700; font-size: 0.9rem;">Interne Tabelle</span>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); margin-top: 0.5rem;">
                    INTO TABLE @DATA(lt_flights)
                </div>
            </div>
            <!-- Variable -->
            <div style="background: var(--surface); border: 1px solid var(--border); padding: 1.25rem; border-radius: 12px;">
                <span style="color: var(--color-secondary); font-weight: 700; font-size: 0.9rem;">Einzelne Variable</span>
                <div style="background: #0f172a; color: #e2e8f0; padding: 0.5rem; border-radius: 6px; font-family: monospace; font-size: 0.8rem; color: var(--foreground); margin-top: 0.5rem;">
                    INTO @DATA(lv_carrname)
                </div>
            </div>
        </div>

        <!-- System Fields -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Fehlerbehandlung und Systemfelder</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- sy-subrc -->
            <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 1rem; padding: 1.5rem;">
                <span style="color: var(--color-success); font-weight: 800; font-size: 1.15rem; font-family: monospace;">sy-subrc</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.5rem;">Rückgabewert (Return Code) der Datenbankoperation:</p>
                <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0.5rem 0 0 0;">
                    <li><strong><code>sy-subrc = 0</code>:</strong> Erfolgreich. Mindestens ein Satz wurde selektiert.</li>
                    <li><strong><code>sy-subrc = 4</code>:</strong> Kein Eintrag gefunden.</li>
                </ul>
            </div>
            <!-- sy-dbcnt -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <span style="color: var(--color-success); font-weight: 800; font-size: 1.15rem; font-family: monospace;">sy-dbcnt</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.5rem;">Gibt die genaue Anzahl der betroffenen Tabellenzeilen an:</p>
                <ul style="padding-left: 1.1rem; font-size: 0.85rem; color: var(--foreground-muted); line-height: 1.5; margin: 0.5rem 0 0 0;">
                    <li>Enthält die Anzahl der gelesenen, eingefügten, geänderten oder gelöschten Datensätze.</li>
                </ul>
            </div>
        </div>

        <!-- Ranges / Selection Tables -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Filtern mit Ranges (Selektionstabellen)</h3>
        <p style="margin-bottom: 1.5rem; font-size: 0.95rem;">Deklariert man ein <code>SELECT-OPTIONS</code>, entsteht eine Range-Tabelle. Diese verfügt typischerweise über vier Felder, die in einer <code>WHERE</code>-Bedingung mit dem Operator <strong><code>IN</code></strong> geprüft werden:</p>
        
        <div style="overflow-x: auto; background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                <thead>
                    <tr style="border-bottom: 2px solid var(--border);">
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 100px;">Range-Feld</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700; width: 160px;">Bedeutung</th>
                        <th style="padding: 0.75rem; color: var(--foreground); font-weight: 700;">Beschreibung</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">SIGN</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Einschluss / Ausschluss</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);"><code>I</code> (Include) oder <code>E</code> (Exclude)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">OPTION</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Vergleichsoperator</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">z. B. <code>EQ</code> (Equal), <code>BT</code> (Between), <code>GE</code> (Greater/Equal)</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border);">
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">LOW</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Unterer Grenzwert</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Unterer Wert bei Intervallen oder konkreter Einzelwert.</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.75rem; color: var(--color-secondary); font-weight: 700; font-family: monospace;">HIGH</td>
                        <td style="padding: 0.75rem; color: var(--foreground); font-weight: 600;">Oberer Grenzwert</td>
                        <td style="padding: 0.75rem; color: var(--foreground-muted);">Obergrenze (nur bei Intervallen wie <code>BT</code> belegt).</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 4.2 Section -->
    <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary); padding-left: 1rem; letter-spacing: -0.025em;">4.2 Berechtigungsprüfungen (Performing Authority Checks)</h2>
        <p style="margin-bottom: 1.5rem;">Ein bloßer Datenbank-Zugriffsschutz reicht im SAP-Standard nicht aus, da ABAP-Programme häufig in privilegierten Systemkontexten laufen. Es liegt in der **alleinigen Verantwortung des Entwicklers**, im Quellcode explizit zu prüfen, ob der Anwender die Berechtigung besitzt, die selektierten Daten zu sehen.</p>

        <!-- Terms Box -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Kernbegriffe des Berechtigungskonzepts</h3>
        <div style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 3rem;">
            <!-- Feld -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem;">Berechtigungsfeld (Authorization Field)</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0;">Kleinste technische Einheit. Beispiel: <code>CARRID</code> (Fluggesellschaft) oder <code>ACTVT</code> (Aktivität, z. B. 03 = Anzeigen).</p>
            </div>
            <!-- Objekt -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem;">Berechtigungsobjekt (Authorization Object)</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0;">Logische Bündelung von bis zu 10 Berechtigungsfeldern, die gemeinsam geprüft werden (z. B. <code>S_CARRID</code>).</p>
            </div>
            <!-- Berechtigung -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem;">Berechtigung (Authorization)</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0;">Eine konkrete Wertebelegung für ein Berechtigungsobjekt (z. B. „Erlaubt ist LH mit der Aktivität 03“).</p>
            </div>
            <!-- Rolle -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1.05rem;">Profil / Rolle (Role)</span>
                <p style="font-size: 0.9rem; color: var(--foreground); margin-top: 0.25rem; margin-bottom: 0;">Bündelt beliebig viele Berechtigungen und wird dem Benutzer im Benutzerstammsatz (z. B. Transaktion SU01) zugewiesen.</p>
            </div>
        </div>

        <!-- AUTHORITY-CHECK -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Die ABAP-Anweisung AUTHORITY-CHECK</h3>
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; margin-bottom: 3rem; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.08);">
            <div style="background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.85rem; color: var(--foreground); line-height: 1.5; border-left: 4px solid var(--color-primary);">
                <span style="color: var(--color-secondary); font-weight: bold;">AUTHORITY-CHECK OBJECT</span> <span style="color: var(--color-primary);">''S_CARRID''</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''CARRID''</span> <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> lv_carrid<br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''ACTVT''</span>  <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> <span style="color: var(--color-primary);">''03''</span>. <span style="color: #64748b;">" 03 steht für Anzeigen</span>
            </div>
            
            <p style="font-size: 0.95rem; color: var(--foreground); margin-top: 1.5rem; margin-bottom: 1rem;"><strong>Verwendung von DUMMY:</strong> Soll ein Feld des Objekts bei der Prüfung explizit ignoriert werden (da es im aktuellen Kontext irrelevant ist), nutzt man das Schlüsselwort <code>DUMMY</code>:</p>
            <div style="background: #0f172a; color: #e2e8f0; padding: 0.75rem; border-radius: 0.5rem; font-family: monospace; font-size: 0.8rem; color: var(--foreground); margin-bottom: 1.5rem;">
                <span style="color: var(--color-secondary); font-weight: bold;">AUTHORITY-CHECK OBJECT</span> <span style="color: var(--color-primary);">''S_CARRID''</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''CARRID''</span> <span style="color: var(--color-secondary); font-weight: bold;">DUMMY</span><br>
                &nbsp;&nbsp;<span style="color: var(--color-secondary); font-weight: bold;">ID</span> <span style="color: var(--color-primary);">''ACTVT''</span>  <span style="color: var(--color-secondary); font-weight: bold;">FIELD</span> <span style="color: var(--color-primary);">''03''</span>.
            </div>

            <h4 style="font-size: 1.05rem; color: var(--foreground); font-weight: 700; margin-bottom: 0.5rem;">Auswertung des Rückgabewerts sy-subrc</h4>
            <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.9rem; color: var(--foreground); line-height: 1.6;">
                <li><strong><code>sy-subrc = 0</code>:</strong> Erfolgreich. Benutzer besitzt die Berechtigung, die Ausführung wird fortgesetzt.</li>
                <li><strong><code>sy-subrc &lt;&gt; 0</code>:</strong> Keine Berechtigung. Die Aktion muss abgebrochen oder Daten müssen gefiltert/ausgeblendet werden.</li>
                <li><strong><code>sy-subrc = 4</code>:</strong> Berechtigungsobjekt vorhanden, aber die Werte passen nicht.</li>
                <li><strong><code>sy-subrc = 12</code>:</strong> Benutzer hat überhaupt keine Berechtigung für dieses Objekt.</li>
            </ul>
        </div>

        <!-- Best Practices Grid -->
        <h3 style="font-size: 1.3rem; color: var(--foreground); font-weight: 800; margin-bottom: 1.25rem;">Best Practices zur Platzierung im Code</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <!-- Selection Screen Level -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1rem;">Prüfung auf Selektionsbildebene</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; line-height: 1.5;">Erfolgt meist direkt im Ereignisblock <code>AT SELECTION-SCREEN</code> oder zu Beginn des <code>START-OF-SELECTION</code>-Blocks. Dies verhindert unnötige, performancelastige Datenbankzugriffe, falls der Benutzer ohnehin keine Filterberechtigungen besitzt.</p>
            </div>
            <!-- Row Level -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;">
                <span style="color: var(--color-primary); font-weight: 700; font-size: 1rem;">Prüfung auf Zeilenebene</span>
                <p style="font-size: 0.85rem; color: var(--foreground); margin-top: 0.5rem; line-height: 1.5;">Werden Daten über Filterbereiche selektiert, muss nach dem Datenbankzugriff in einer <code>LOOP AT lt_flights</code>-Schleife jeder Datensatz geprüft werden. Nicht erlaubte Zeilen werden gelöscht (<code>DELETE lt_flights.</code>) oder nicht aufbereitet.</p>
            </div>
        </div>
    </div>

    <!-- Interactive Q&A Quiz Section -->
    <div style="margin-top: 4rem; margin-bottom: 4rem; background: rgba(30, 41, 59, 0.3); border: 1px solid var(--border); padding: 2.5rem; border-radius: 1.5rem;">
        <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--foreground); margin-bottom: 2rem; text-align: center;">💡 Übungsfragen und Kontrolle</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Q1 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 1: Welches Ereignis wird standardmäßig ausgeführt, wenn ausführbare Anweisungen ohne Ereignisschlüsselwort im Report-Code stehen?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Diese Anweisungen werden von der ABAP-Laufzeitumgebung implizit dem Standardereignisblock <code>START-OF-SELECTION</code> zugeordnet.
                </div>
            </div>

            <!-- Q2 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 2: Worin unterscheidet sich ein Session-Breakpoint von einem External Breakpoint?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Ein Session-Breakpoint gilt nur für die aktuelle SAP GUI Anmeldesitzung desselben Benutzers. Ein External Breakpoint ist hingegen auch für externe RFC-, HTTP- oder Fiori-Requests aktiv, gilt sitzungsübergreifend und läuft meist nach 2 Stunden ab.
                </div>
            </div>

            <!-- Q3 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 3: Warum sollte ein SELECT ... ENDSELECT nach Möglichkeit vermieden werden?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground);">
                    <strong>Antwort:</strong> Es liest Daten zeilenweise. Jedes einzelne Lesen ist ein separater Datenbank-Roundtrip. Dies erhöht die Netzwerklast drastisch. Ein Paket-Zugriff mit <code>SELECT ... INTO TABLE</code> über die Array-Schnittstelle ist weitaus performanter.
                </div>
            </div>

            <!-- Q4 -->
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 1rem; padding: 1.5rem;">
                <div style="color: var(--color-secondary); font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">Frage 4: Was passiert, wenn nach einer Berechtigungsprüfung mit AUTHORITY-CHECK das Feld sy-subrc nicht ausgewertet wird?</div>
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem; font-size: 0.85rem; color: var(--foreground); line-height: 1.5;">
                    <strong>Antwort:</strong> Technisch läuft das Programm einfach ungehindert weiter. Dies stellt eine <strong>gravierende Sicherheitslücke (Authority-Check Bypass)</strong> dar, da unautorisierte Benutzer vollen Datenzugriff erhalten. Der Rückgabewert muss immer aktiv abgefragt werden!
                </div>
            </div>
        </div>
    </div>

    <!-- Kurzzusammenfassung Card -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%); border: 1px solid var(--border); border-radius: 1.25rem; padding: 2rem; box-shadow: 0 10px 30px -15px rgba(0,0,0,0.4);">
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-top: 0; margin-bottom: 1.25rem;">📝 Kurzzusammenfassung</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; font-size: 0.9rem; color: var(--foreground); line-height: 1.6;">
            <div>
                <h4 style="color: var(--color-primary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Kapitel 3: Programmablauf</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>ABAP-Programme gliedern sich in Deklarationen und Verarbeitungsblöcke.</li>
                    <li>Reports folgen einem strikten Lebenszyklus (Initialization, Start-of-Selection, etc.).</li>
                    <li>Debugger läuft isoliert (2-Prozessor-Architektur). Tasten F5-F8 steuern die Navigation.</li>
                </ul>
            </div>
            <div>
                <h4 style="color: var(--color-secondary); margin-top: 0; font-weight: 700; margin-bottom: 0.5rem;">Kapitel 4: Datenbeschaffung</h4>
                <ul style="padding-left: 1.1rem; margin: 0;">
                    <li>Datenübertragung per Array-Schnittstelle in interne Tabellen ist der performanteste Weg.</li>
                    <li>Modernes SQL verwendet Host-Variablen (@) und Inline-Deklarationen (DATA).</li>
                    <li>Die Verantwortung für Berechtigungsprüfungen (AUTHORITY-CHECK + sy-subrc) liegt immer beim Entwickler.</li>
                </ul>
            </div>
        </div>
    </div>
</div>',
    '',
    'article',
    'published',
    48,
    '2026-05-20 11:35:00',
    '2026-05-20 11:35:00'
);
