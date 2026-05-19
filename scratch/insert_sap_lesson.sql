INSERT INTO lessons (id, subjectId, authorId, title, sortOrder, status, contentRaw, content)
VALUES (
    'lesson_sap_06',
    'sxh3e5ewi0qahenr6jg',
    NULL,
    '6. SAP Abschlussprüfung – sortierte Lernnotizen',
    52,
    'published',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif;">
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b;">Prüfungsvorbereitung</span>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.025em; line-height: 1.2;">6. SAP Abschlussprüfung – sortierte Lernnotizen</h1>
    
    <!-- Prüfungsinformationen Card -->
    <div class="lesson-card">
        <h3 style="color: #f59e0b; font-weight: 700; font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="ph ph-info" style="font-size: 1.4rem;"></i> Prüfungsinformationen
        </h3>
        <p>Es kommen voraussichtlich Inhalte aus drei SAP-Bereichen/Büchern dran:</p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">S4500</span>
            <span class="lesson-badge">S4220</span>
            <span class="lesson-badge">S4F10</span>
        </div>
        <p>Die Prüfung besteht vermutlich aus:</p>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li> ca. 16–18 Fragen SAP</li>
            <li> ca. 16–18 Fragen ABAP</li>
            <li> 
                <div>
                    <span style="font-weight: 600;">schriftlicher Teil mit:</span>
                    <ul style="list-style: none; padding-left: 1rem; margin: 0.25rem 0 0 0;">
                        <li>- Multiple Choice</li>
                        <li>- offenen Fragen, bei denen etwas geschrieben werden muss</li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <!-- S4500 Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4500 – Logistik, Planung, Beschaffung, Fertigung</h2>
    
    <!-- Planungsschritte -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Planungsschritte</h3>
        <p>Die richtige Reihenfolge für einen Planungsschritt lautet:</p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Programmplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Absatz- und Produktionsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Kapazitätsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Materialbedarfsplanung</span>
            </div>
        </div>
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong> Erst wird geplant, was verkauft bzw. produziert werden soll. Danach wird geprüft, ob genug Kapazitäten vorhanden sind. Anschließend wird der Materialbedarf ermittelt.
        </div>
    </div>

    <!-- Lagerfertigung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Lagerfertigung</h3>
        <p>Bei der Lagerfertigung wird nicht erst auf einen konkreten Kundenauftrag gewartet. Stattdessen wird auf Lager produziert.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Grundlage der Auslösung ist:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Planprimärbedarf</li>
            <li> Absatzprognose</li>
            <li> vorhandener Lagerbestand</li>
        </ul>
        
        <p>Der Kundenbedarf wird später aus dem vorhandenen Lagerbestand gedeckt.</p>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Bei der Lagerfertigung ist der Planprimärbedarf die Grundlage der Auslösung. Der Kundenbedarf wird aus dem vorhandenen Lagerbestand gedeckt."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Lieferantenkonsignation -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sonderbeschaffungsprozess: Lieferantenkonsignation</h3>
        
        <h4 style="color: var(--color-warning);">Was ist Konsignation?</h4>
        <p>Bei der Lieferantenkonsignation liegen die Waren zwar im eigenen Lager, gehören aber rechtlich noch dem Lieferanten.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Das bedeutet:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>Die Ware befindet sich im Lager des Unternehmens.</span></li>
            <li> <span>Solange die Ware nicht entnommen wird, gehört sie dem Lieferanten.</span></li>
            <li> <span>Erst bei Entnahme aus dem Lager geht der Besitz bzw. die wirtschaftliche Verantwortung auf das eigene Unternehmen über.</span></li>
            <li> <span>Abrechnet wird normalerweise erst bei Entnahme oder Verbrauch.</span></li>
        </ul>
        
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5rem 0;">
        
        <h4 style="color: var(--color-warning);">Unterschied zum normalen Beschaffungsprozess</h4>
        <p>Beim normalen Beschaffungsprozess wird die Ware in der Regel mit Wareneingang gekauft und gehört danach dem Unternehmen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Bei der Konsignation:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Ware liegt im eigenen Lager.</li>
            <li> Eigentum bleibt zunächst beim Lieferanten.</li>
            <li> Abrechnung erfolgt erst bei Entnahme bzw. Verbrauch.</li>
            <li> Das Unternehmen muss nicht sofort Kapital für den Warenbestand binden.</li>
        </ul>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Mögliche Prozessbestandteile:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="lesson-badge">1. Anforderung / Bedarf</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">2. Lieferung durch den Lieferanten</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">3. Ware liegt im Lager</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">4. Entnahme / Verbrauch</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">5. Abrechnung</span>
        </div>
    </div>

    <!-- CPD-Lieferant -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">CPD-Lieferant / Conto pro Diverse</h3>
        <p>
            CPD bedeutet <strong>Conto pro Diverse</strong>. Ein CPD-Lieferant ist ein Einmallieferant bzw. ein Lieferantenstammsatz, der für mehrere verschiedene Lieferanten verwendet werden kann.
        </p>
        
        <h4 style="color: var(--color-warning);">Wann verwendet man einen CPD-Lieferanten?</h4>
        <p>Ein CPD-Lieferant wird genutzt, wenn:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>man nur einmalig bei einem Lieferanten bestellt</span></li>
            <li> <span>sehr selten bei diesem Lieferanten bestellt wird</span></li>
            <li> <span>noch kein Kontakt oder keine Stammdaten zu diesem Lieferanten bestehen</span></li>
            <li> <span>sich die vollständige Anlage eines eigenen Lieferantenstammsatzes nicht lohnt</span></li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Eine Anfrage oder Bestellung an einen Lieferanten, mit dem man bisher noch nie Kontakt hatte und bei dem nur eine sehr geringe Anzahl an Bestellungen erwartet wird.
        </div>
        
        <h4 style="color: var(--color-warning);">Vorteil</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Es müssen nicht für jeden seltenen Lieferanten vollständige Stammdaten angelegt werden.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Der Pflegeaufwand wird reduziert.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Die komplette Stammdatenanlage entfällt teilweise.</li>
        </ul>
    </div>

    <!-- Fertigungsprozess und Kundenauftrag -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Fertigungsprozess und Kundenauftrag</h3>
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der eingehende Kundenauftrag bildet die Grundlage für die Bedarfsermittlung und steuert den nachgelagerten Produktionsprozess."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Erklärung:</p>
        <p>Ein eingehender Kundenauftrag kann im Fertigungsprozess als Grundlage dienen für:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Bedarfsermittlung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Produktionsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Materialbedarfsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nachgelagerte Fertigungsprozesse</li>
        </ul>
        <p style="color: #a78bfa; font-size: 0.9rem; font-weight: 600; margin: 0;">Besonders wichtig ist das bei kundenauftragsbezogener Fertigung.</p>
    </div>

    <!-- Rollenbasiertes System -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Rollenbasiertes SAP ERP-System</h3>
        <p>
            SAP ERP ist rollenbasiert. Das bedeutet: Benutzer erhalten Zugriff auf Funktionen, Daten und Transaktionen entsprechend ihrer Rolle im Unternehmen.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Rollen:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Administrator</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Angestellter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Einkäufer</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Lagerist</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Buchhalter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Geschäftsführer</span>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Durch die rollenbasierte Struktur wird geregelt:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> wer welche Daten sehen darf</li>
            <li> wer welche Daten bearbeiten darf</li>
            <li> wer welche Prozesse ausführen darf</li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Ein Mitarbeiter im Einkauf darf Bestellungen bearbeiten, aber möglicherweise keine Gehaltsdaten sehen.
        </div>
    </div>

    <!-- Organisation und Stammdaten Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Stammdaten und Organisation</h2>
    
    <!-- Materialstammdaten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Materialstammdaten</h3>
        <p>Bei der Pflege der Materialstammdaten stehen mehrere Funktionen zur Verfügung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Mögliche Funktionen:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Vorlage Material</li>
            <li> Massenpflege</li>
            <li> Sammelpflege von Teilbereichen</li>
        </ul>
        
        <div class="lesson-merksatz">
            Die Materialstammdaten gehören besonders zum Modul <strong>MM – Materialwirtschaft</strong>.
        </div>
    </div>

    <!-- Organisationselemente -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Organisationselemente</h3>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Organisationselemente bilden die Organisationsstruktur für rechtliche und betriebswirtschaftliche Zwecke ab."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p>Organisationselemente dienen dazu, die Struktur eines Unternehmens in SAP abzubilden. Sie können rechtliche und betriebswirtschaftliche Einheiten darstellen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Organisationselemente:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span class="lesson-badge">Buchungskreis</span>
            <span class="lesson-badge">Werk</span>
            <span class="lesson-badge">Lagerort</span>
            <span class="lesson-badge">Einkaufsorganisation</span>
            <span class="lesson-badge">Verkaufsorganisation</span>
            <span class="lesson-badge">Kostenrechnungskreis</span>
        </div>
    </div>

    <!-- Buchungskreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Buchungskreis</h3>
        <p>
            Der Buchungskreis ist in SAP die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung erstellt werden kann. Ein Buchungskreis definiert eine rechtlich selbstständige Einheit.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Dazu gehören:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> vollständige Buchführung</li>
            <li> Bilanzierung</li>
            <li> Gewinn- und Verlustrechnung</li>
            <li> gesetzliche Abschlüsse</li>
        </ul>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der Buchungskreis ist die kleinste organisatorische Einheit der Finanzbuchhaltung und stellt eine rechtlich selbstständige Einheit für vollständige Buchführung und Bilanzierung dar."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Mahnlaufverfahren -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Mahnlaufverfahren</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 0.75rem;">Ablauf des Mahnlaufverfahrens</h3>
        <p>Das Mahnlaufverfahren besteht laut den Notizen aus folgenden Schritten:</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Parameter pflegen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnverfahren einplanen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Planlauf beenden</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnlauf starten</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> In SAP wird der Mahnlauf genutzt, um offene Forderungen gegenüber Kunden zu prüfen und gegebenenfalls Mahnungen zu erstellen.
        </div>
    </div>

    <!-- Belege und Geschäftsvorfälle -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Belege und Geschäftsvorfälle</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Elektronischer Datensatz eines Geschäftsvorfalls</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welcher Begriff beschreibt einen elektronischen Datensatz von Geschäftsvorfällen?</p>
        <p><strong style="color: #34d399;">Richtige Antwort:</strong> <span style="background: rgba(52, 211, 153, 0.15); color: #34d399; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">Beleg</span></p>
        
        <p>Ein Beleg dokumentiert einen Geschäftsvorfall im SAP-System.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">Bestellung</span>
            <span class="lesson-badge">Wareneingangsbeleg</span>
            <span class="lesson-badge">Rechnung</span>
            <span class="lesson-badge">Buchhaltungsbeleg</span>
            <span class="lesson-badge">Materialbeleg</span>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Zusätzlicher Begriff – Belegfluss:</strong> Der Belegfluss zeigt die Verbindung bzw. Reihenfolge zusammenhängender Belege in einem Prozess.
        </div>
    </div>

    <!-- Materialwirtschaft / MM -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialwirtschaft / MM</h2>
    
    <!-- Unternehmensszenario -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Unternehmensszenario: Einführung des MM-Moduls</h3>
        
        <p><strong style="color: #f59e0b;">Szenario:</strong> Die Geschäftsleitung eines Automobilunternehmens hat die SAP-Einführung abgeschlossen. Das Modul Materialwirtschaft / MM wird implementiert bzw. genutzt. Mehrere Abteilungen sind beteiligt und benötigen Zugriff auf vorhandene Stammdaten.</p>
        
        <p><strong style="color: #f59e0b;">Aufgabe:</strong> Zentrale Fragestellungen beantworten, damit das System sauber läuft.</p>
    </div>

    <!-- Infosätze -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Infosätze in SAP</h3>
        
        <p>Ein Infosatz enthält Informationen über die Beziehung zwischen Material und Lieferant.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Er kann unter anderem Informationen enthalten zu:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Preisen</li>
            <li> Lieferbedingungen</li>
            <li> Lieferzeiten</li>
            <li> Einkaufsdaten</li>
            <li> Material-Lieferanten-Beziehung</li>
        </ul>
        
        <div class="lesson-step">
            <strong>In den Notizen steht:</strong> <span style="font-style: italic; ">"Infosatz = Stammsatz"</span><br>
            <span style="color: #a78bfa; font-weight: 600; display: inline-block; margin-top: 0.5rem;">Besser formuliert:</span> Ein Infosatz ist ein Stammdatensatz im Einkauf.
        </div>
        
        <h4 style="color: var(--color-warning);">Möglichkeiten zur Erstellung von Infosätzen</h4>
        <p>SAP bietet mehrere Möglichkeiten zur Erstellung bzw. Pflege von Infosätzen:</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="lesson-badge">1. Manuelle Anlage</span>
            <span class="lesson-badge">2. Update aus einer Bestellung</span>
            <span class="lesson-badge">3. Update aus einem Angebot</span>
            <span class="lesson-badge">4. Update aus einem Rahmenvertrag</span>
        </div>
    </div>

    <!-- S4F10 – Finanzwesen und Controlling -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4F10 – Finanzwesen und Controlling</h2>
    
    <!-- Konten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Konten im SAP-System</h3>
        
        <p>In SAP gibt es Haupt- und Nebenbuchhaltung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Wichtige Kontenarten:</p>
        <div style="display: grid; grid-template-cols: 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Sachkonto</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Gehört zur Hauptbuchhaltung.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Bank, Kasse, Umsatzerlöse, Materialaufwand, Maschinen, Gebäude</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Kreditoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Lieferantenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Verbindlichkeiten gegenüber Lieferanten.</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Debitoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Kundenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Forderungen gegenüber Kunden.</span>
            </div>
        </div>
    </div>

    <!-- Controlling -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Controlling</h3>
        
        <p>Im Controlling geht es um Kosten- und Leistungsrechnung sowie interne Steuerung. Wichtige Begriffe sind: Kostenrechnungskreis, Ergebnisbereich und Kosten- und Leistungsrechnung.</p>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche der aufgeführten Objekte sind Organisationseinheiten im SAP Controlling?</p>
        <p><strong>Aus den Notizen:</strong> Buchungskreis, Kostenrechnungskreis, Leistungsart, Ergebnisbereich</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Wahrscheinlich richtige Organisationseinheiten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Kostenrechnungskreis</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Ergebnisbereich</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> Eine Leistungsart ist eher ein Stammdatum bzw. eine Verrechnungsgröße im Controlling, aber keine klassische Organisationseinheit.
        </div>
    </div>

    <!-- Vertrieb / Verkaufsprozess -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Vertrieb / Verkaufsprozess</h2>
    
    <!-- Verkaufsprozess -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verkaufsprozess bei Terminabwicklung</h3>
        
        <p>In den Notizen steht die Reihenfolge teilweise durcheinander. Sortiert sieht der Verkaufsprozess ungefähr so aus:</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">1.</span>
                <span style="font-size: 0.9rem; ">Kundenanfrage</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">2.</span>
                <span style="font-size: 0.9rem; ">Angebot</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">3.</span>
                <span style="font-size: 0.9rem; ">Kundenauftrag / Terminauftrag</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">4.</span>
                <span style="font-size: 0.9rem; ">Verfügbarkeitsprüfung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">5.</span>
                <span style="font-size: 0.9rem; ">Lieferung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">6.</span>
                <span style="font-size: 0.9rem; ">Kommissionierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">7.</span>
                <span style="font-size: 0.9rem; ">Transport</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">8.</span>
                <span style="font-size: 0.9rem; ">Warenausgang</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">9.</span>
                <span style="font-size: 0.9rem; ">Fakturierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">10.</span>
                <span style="font-size: 0.9rem; ">Zahlungsabwicklung</span>
            </div>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Wichtig:</strong> Die ursprünglich notierte Reihenfolge war teilweise falsch. Für die Prüfung sollte die logische Prozesskette verstanden werden.
        </div>
    </div>

    <!-- Verfügbarkeitsprüfung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verfügbarkeitsprüfung und Teillieferung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Warum hängt das Ergebnis der Verfügbarkeitsprüfung unter Umständen von der Vereinbarung zur Teillieferung ab?</p>
        
        <div class="lesson-step">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Antwort:</p>
            <p>Die Verfügbarkeitsprüfung ermittelt zunächst technisch, wann welche Menge verfügbar ist. Die Teillieferungsvereinbarung entscheidet dann, wie SAP mit einer Unterdeckung umgehen darf.</p>
            <p>Das bedeutet: Wenn nicht genug Ware vorhanden ist, bestimmt die Teillieferungsvereinbarung, ob:</p>
            <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> eine Teillieferung erlaubt ist</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nur vollständig geliefert werden darf</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> mehrere Lieferungen möglich sind</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> der Auftrag komplett zurückgestellt werden muss</li>
            </ul>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong><br>
            Die Verfügbarkeitsprüfung sagt, was wann verfügbar ist.<br>
            Die Teillieferungsvereinbarung sagt, was dem Kunden angeboten oder geliefert werden darf.
        </div>
    </div>

    <!-- Fertigung / Produktion -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Fertigung / Produktion</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">SAP R/3 Stammdaten mit Bezug zur Fertigung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche Elemente gehören in SAP R/3 zu den Stammdaten, die sich auf die Fertigung beziehen?</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Richtige Antworten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Arbeitsplatz</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Stückliste</span>
            </div>
        </div>
        
        <p>Nicht passend bzw. eher keine Fertigungsstammdaten: Umlagerung, Produktkostensammler</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Arbeitsplatz</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Ein Arbeitsplatz beschreibt, wo ein Arbeitsvorgang ausgeführt wird.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Maschine, Fertigungslinie, Arbeitsplatzgruppe, manuelle Arbeitsstation</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Stückliste</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Eine Stückliste beschreibt, aus welchen Komponenten ein Produkt besteht.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiel: Ein Fahrrad besteht aus: Rahmen, Rädern, Lenker, Sattel, Schrauben</span>
            </div>
        </div>
    </div>

    <!-- Materialbewertung -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialbewertung</h2>
    
    <!-- Bewertung gelagerter Materialien -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Bewertung gelagerter Materialien</h3>
        <p>Die Bewertung gelagerter Materialien betrifft den Warenwert bzw. den Wert des Lagerbestands.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">In SAP gibt es insbesondere folgende Bewertungsverfahren:</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <span class="lesson-badge">S-Preis = Standardpreis</span>
            <span class="lesson-badge">V-Preis = gleitender Durchschnittspreis</span>
        </div>
    </div>

    <!-- Standardpreis und gleitender Durchschnittspreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Standardpreis und gleitender Durchschnittspreis</h3>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">S-Preis / Standardpreis</span>
            <p>Der Standardpreis ist ein fester Preis. Er wird verwendet, wenn Wareneingänge stets zu einem festen Preis gebucht werden sollen. Preisabweichungen werden separat gebucht.</p>
            
            <p><strong>Frage:</strong> Welches Verfahren ist anzuwenden, wenn Wareneingänge stets zu einem festen Preis gebucht werden und Abweichungen separat gebucht werden?</p>
            <p style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin: 0;">Antwort: S-Preis / Standardpreis</p>
        </div>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">V-Preis / gleitender Durchschnittspreis</span>
            <p>Beim gleitenden Durchschnittspreis verändert sich der Materialpreis durch neue Wareneingänge. Der Durchschnittspreis wird bei neuen Beständen und neuen Einkaufspreisen angepasst.</p>
        </div>
    </div>

    <!-- Sicht im Materialstammsatz -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sicht im Materialstammsatz für Bewertungsverfahren</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> In welcher Sicht des Materialstammsatzes werden die Bewertungsverfahren für Materialien festgelegt?</p>
        
        <div class="lesson-success-box">
            <p><strong style="color: #34d399;">Antwort:</strong></p>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Buchhaltungssicht</li>
                <li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> genauer: Buchhaltung 1</li>
            </ul>
        </div>
    </div>

    <!-- Kompakte Fragen-und-Antworten-Liste -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Kompakte Fragen-und-Antworten-Liste</h2>
    <div class="lesson-card">
        
        <!-- QA Item 1 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Planung: Wie ist die richtige Reihenfolge der Planungsschritte?</p>
            <p>Programmplanung → Absatz- und Produktionsplanung → Kapazitätsplanung → Materialbedarfsplanung</p>
        </div>
        
        <!-- QA Item 2 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Lagerfertigung: Was ist die Grundlage bei der Lagerfertigung?</p>
            <p>Planprimärbedarf, Absatzprognose und Lagerbestand</p>
        </div>
        
        <!-- QA Item 3 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konsignation: Was unterscheidet Lieferantenkonsignation von normaler Beschaffung?</p>
            <p>Die Ware liegt im eigenen Lager, gehört aber bis zur Entnahme dem Lieferanten. Erst bei Entnahme wird sie dem Unternehmen zugerechnet bzw. abgerechnet.</p>
        </div>
        
        <!-- QA Item 4 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">CPD-Lieferant: Was ist ein CPD-Lieferant?</p>
            <p>Ein Einmallieferant bzw. Sammelstammsatz für verschiedene selten genutzte Lieferanten.</p>
        </div>
        
        <!-- QA Item 5 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsprozess: Bildet der eingehende Kundenauftrag die Grundlage für Bedarfsermittlung und nachgelagerte Produktionsprozesse?</p>
            <p>Ja, das ist richtig.</p>
        </div>
        
        <!-- QA Item 6 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Rollenbasiertes System: Was bedeutet rollenbasiert in SAP?</p>
            <p>Benutzer erhalten Berechtigungen entsprechend ihrer Rolle im Unternehmen.</p>
        </div>
        
        <!-- QA Item 7 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialstammdaten: Welche Optionen gibt es bei der Pflege von Materialstammdaten?</p>
            <p>- Vorlage Material, - Massenpflege, - Sammelpflege von Teilbereichen</p>
        </div>
        
        <!-- QA Item 8 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Organisationselemente: Bilden Organisationselemente die rechtliche und betriebswirtschaftliche Struktur ab?</p>
            <p>Ja, richtig.</p>
        </div>
        
        <!-- QA Item 9 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Mahnlauf: Wie läuft ein Mahnverfahren ab?</p>
            <p>Parameter pflegen → Mahnverfahren einplanen → Planlauf beenden → starten</p>
        </div>
        
        <!-- QA Item 10 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Beleg: Welcher Begriff beschreibt einen elektronischen Datensatz eines Geschäftsvorfalls?</p>
            <p>Beleg</p>
        </div>
        
        <!-- QA Item 11 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Infosatz: Welche Möglichkeiten bietet SAP beim Bilden von Infosätzen?</p>
            <p>- Manuelle Anlage, - Update aus Bestellung, - Update aus Angebot, - Update aus Rahmenvertrag</p>
        </div>
        
        <!-- QA Item 12 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konten: Welche Konten gibt es in SAP?</p>
            <p>- Sachkonten, - Kreditoren, - Debitoren</p>
        </div>
        
        <!-- QA Item 13 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Controlling: Welche Objekte sind Organisationseinheiten im SAP Controlling?</p>
            <p>- Kostenrechnungskreis, - Ergebnisbereich</p>
        </div>
        
        <!-- QA Item 14 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Verkaufsprozess: Wie ist der Verkaufsprozess bei Terminabwicklung sortiert?</p>
            <p>Kundenanfrage → Angebot → Auftrag → Verfügbarkeitsprüfung → Lieferung → Kommissionierung → Transport → Warenausgang → Fakturierung → Zahlungsabwicklung</p>
        </div>
        
        <!-- QA Item 15 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Teillieferung: Warum hängt das Ergebnis der Verfügbarkeitsprüfung von der Teillieferungsvereinbarung ab?</p>
            <p>Weil SAP dadurch weiß, ob Unterdeckungen durch Teillieferungen erlaubt sind oder ob nur vollständig geliefert werden darf.</p>
        </div>
        
        <!-- QA Item 16 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Buchungskreis: Was ist ein Buchungskreis?</p>
            <p>Die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung und Bilanzierung möglich ist.</p>
        </div>
        
        <!-- QA Item 17 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsstammdaten: Welche Stammdaten beziehen sich auf Fertigung?</p>
            <p>- Arbeitsplatz, - Stückliste</p>
        </div>
        
        <!-- QA Item 18 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialbewertung: Welche Bewertungsverfahren gibt es?</p>
            <p>- Standardpreis, - gleitender Durchschnittspreis</p>
        </div>
        
        <!-- QA Item 19 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Standardpreis: Welches Verfahren wird genutzt, wenn Wareneingänge zu festem Preis gebucht und Abweichungen separat gebucht werden?</p>
            <p>Standardpreis / S-Preis</p>
        </div>
        
        <!-- QA Item 20 -->
        <div style="padding-bottom: 0.5rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Bewertungssicht: In welcher Sicht wird das Bewertungsverfahren festgelegt?</p>
            <p>In der Buchhaltungssicht, insbesondere Buchhaltung 1.</p>
        </div>
    </div>

    <!-- Begriffe zum Lernen -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Begriffe zum Lernen</h2>
    <div class="lesson-card">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Programmplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung des Produktions- bzw. Absatzprogramms.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Absatz- und Produktionsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung von Absatzmengen und Produktionsmengen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kapazitätsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prüfung, ob genügend Maschinen, Arbeitsplätze und Personal verfügbar sind.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialbedarfsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ermittlung benötigter Materialien.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Lagerfertigung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Produktion auf Lager, nicht direkt auf Kundenauftrag.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Planprimärbedarf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Geplanter Bedarf für zukünftige Produktion.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Konsignation</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ware liegt beim Unternehmen, gehört aber bis zur Entnahme dem Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">CPD-Lieferant</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einmallieferant / Sammelstammsatz für seltene Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Rollenbasiert</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zugriff abhängig von Benutzerrolle und Berechtigungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialstamm</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zentrale Stammdaten zu einem Material.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Organisationselement</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Bildet Unternehmensstruktur in SAP ab.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Rechtlich selbstständige Einheit der Finanzbuchhaltung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Mahnlauf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prozess zur Erstellung von Mahnungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Beleg</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Elektronischer Nachweis eines Geschäftsvorfalls.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Infosatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einkaufsstammdatum zu Material-Lieferanten-Beziehung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kreditor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Lieferant.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Debitor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Kunde.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Sachkonto</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Konto im Hauptbuch.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kostenrechnungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit im Controlling.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Ergebnisbereich</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit für Ergebnisrechnung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Arbeitsplatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ort oder Ressource, an der Fertigung stattfindet.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Stückliste</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Liste der Bestandteile eines Produkts.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">S-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Standardpreis.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">V-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Gleitender Durchschnittspreis.</span>
            </div>
            
            <div>
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchhaltung 1</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Materialstammsicht für Bewertung.</span>
            </div>
            
        </div>
    </div>
</div>',
    '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif;">
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b;">Prüfungsvorbereitung</span>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.025em; line-height: 1.2;">6. SAP Abschlussprüfung – sortierte Lernnotizen</h1>
    
    <!-- Prüfungsinformationen Card -->
    <div class="lesson-card">
        <h3 style="color: #f59e0b; font-weight: 700; font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="ph ph-info" style="font-size: 1.4rem;"></i> Prüfungsinformationen
        </h3>
        <p>Es kommen voraussichtlich Inhalte aus drei SAP-Bereichen/Büchern dran:</p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">S4500</span>
            <span class="lesson-badge">S4220</span>
            <span class="lesson-badge">S4F10</span>
        </div>
        <p>Die Prüfung besteht vermutlich aus:</p>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li> ca. 16–18 Fragen SAP</li>
            <li> ca. 16–18 Fragen ABAP</li>
            <li> 
                <div>
                    <span style="font-weight: 600;">schriftlicher Teil mit:</span>
                    <ul style="list-style: none; padding-left: 1rem; margin: 0.25rem 0 0 0;">
                        <li>- Multiple Choice</li>
                        <li>- offenen Fragen, bei denen etwas geschrieben werden muss</li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <!-- S4500 Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4500 – Logistik, Planung, Beschaffung, Fertigung</h2>
    
    <!-- Planungsschritte -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Planungsschritte</h3>
        <p>Die richtige Reihenfolge für einen Planungsschritt lautet:</p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Programmplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Absatz- und Produktionsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Kapazitätsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Materialbedarfsplanung</span>
            </div>
        </div>
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong> Erst wird geplant, was verkauft bzw. produziert werden soll. Danach wird geprüft, ob genug Kapazitäten vorhanden sind. Anschließend wird der Materialbedarf ermittelt.
        </div>
    </div>

    <!-- Lagerfertigung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Lagerfertigung</h3>
        <p>Bei der Lagerfertigung wird nicht erst auf einen konkreten Kundenauftrag gewartet. Stattdessen wird auf Lager produziert.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Grundlage der Auslösung ist:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Planprimärbedarf</li>
            <li> Absatzprognose</li>
            <li> vorhandener Lagerbestand</li>
        </ul>
        
        <p>Der Kundenbedarf wird später aus dem vorhandenen Lagerbestand gedeckt.</p>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Bei der Lagerfertigung ist der Planprimärbedarf die Grundlage der Auslösung. Der Kundenbedarf wird aus dem vorhandenen Lagerbestand gedeckt."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Lieferantenkonsignation -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sonderbeschaffungsprozess: Lieferantenkonsignation</h3>
        
        <h4 style="color: var(--color-warning);">Was ist Konsignation?</h4>
        <p>Bei der Lieferantenkonsignation liegen die Waren zwar im eigenen Lager, gehören aber rechtlich noch dem Lieferanten.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Das bedeutet:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>Die Ware befindet sich im Lager des Unternehmens.</span></li>
            <li> <span>Solange die Ware nicht entnommen wird, gehört sie dem Lieferanten.</span></li>
            <li> <span>Erst bei Entnahme aus dem Lager geht der Besitz bzw. die wirtschaftliche Verantwortung auf das eigene Unternehmen über.</span></li>
            <li> <span>Abrechnet wird normalerweise erst bei Entnahme oder Verbrauch.</span></li>
        </ul>
        
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5rem 0;">
        
        <h4 style="color: var(--color-warning);">Unterschied zum normalen Beschaffungsprozess</h4>
        <p>Beim normalen Beschaffungsprozess wird die Ware in der Regel mit Wareneingang gekauft und gehört danach dem Unternehmen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Bei der Konsignation:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Ware liegt im eigenen Lager.</li>
            <li> Eigentum bleibt zunächst beim Lieferanten.</li>
            <li> Abrechnung erfolgt erst bei Entnahme bzw. Verbrauch.</li>
            <li> Das Unternehmen muss nicht sofort Kapital für den Warenbestand binden.</li>
        </ul>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Mögliche Prozessbestandteile:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="lesson-badge">1. Anforderung / Bedarf</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">2. Lieferung durch den Lieferanten</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">3. Ware liegt im Lager</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">4. Entnahme / Verbrauch</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">5. Abrechnung</span>
        </div>
    </div>

    <!-- CPD-Lieferant -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">CPD-Lieferant / Conto pro Diverse</h3>
        <p>
            CPD bedeutet <strong>Conto pro Diverse</strong>. Ein CPD-Lieferant ist ein Einmallieferant bzw. ein Lieferantenstammsatz, der für mehrere verschiedene Lieferanten verwendet werden kann.
        </p>
        
        <h4 style="color: var(--color-warning);">Wann verwendet man einen CPD-Lieferanten?</h4>
        <p>Ein CPD-Lieferant wird genutzt, wenn:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>man nur einmalig bei einem Lieferanten bestellt</span></li>
            <li> <span>sehr selten bei diesem Lieferanten bestellt wird</span></li>
            <li> <span>noch kein Kontakt oder keine Stammdaten zu diesem Lieferanten bestehen</span></li>
            <li> <span>sich die vollständige Anlage eines eigenen Lieferantenstammsatzes nicht lohnt</span></li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Eine Anfrage oder Bestellung an einen Lieferanten, mit dem man bisher noch nie Kontakt hatte und bei dem nur eine sehr geringe Anzahl an Bestellungen erwartet wird.
        </div>
        
        <h4 style="color: var(--color-warning);">Vorteil</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Es müssen nicht für jeden seltenen Lieferanten vollständige Stammdaten angelegt werden.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Der Pflegeaufwand wird reduziert.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Die komplette Stammdatenanlage entfällt teilweise.</li>
        </ul>
    </div>

    <!-- Fertigungsprozess und Kundenauftrag -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Fertigungsprozess und Kundenauftrag</h3>
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der eingehende Kundenauftrag bildet die Grundlage für die Bedarfsermittlung und steuert den nachgelagerten Produktionsprozess."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Erklärung:</p>
        <p>Ein eingehender Kundenauftrag kann im Fertigungsprozess als Grundlage dienen für:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Bedarfsermittlung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Produktionsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Materialbedarfsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nachgelagerte Fertigungsprozesse</li>
        </ul>
        <p style="color: #a78bfa; font-size: 0.9rem; font-weight: 600; margin: 0;">Besonders wichtig ist das bei kundenauftragsbezogener Fertigung.</p>
    </div>

    <!-- Rollenbasiertes System -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Rollenbasiertes SAP ERP-System</h3>
        <p>
            SAP ERP ist rollenbasiert. Das bedeutet: Benutzer erhalten Zugriff auf Funktionen, Daten und Transaktionen entsprechend ihrer Rolle im Unternehmen.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Rollen:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Administrator</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Angestellter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Einkäufer</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Lagerist</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Buchhalter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Geschäftsführer</span>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Durch die rollenbasierte Struktur wird geregelt:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> wer welche Daten sehen darf</li>
            <li> wer welche Daten bearbeiten darf</li>
            <li> wer welche Prozesse ausführen darf</li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Ein Mitarbeiter im Einkauf darf Bestellungen bearbeiten, aber möglicherweise keine Gehaltsdaten sehen.
        </div>
    </div>

    <!-- Organisation und Stammdaten Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Stammdaten und Organisation</h2>
    
    <!-- Materialstammdaten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Materialstammdaten</h3>
        <p>Bei der Pflege der Materialstammdaten stehen mehrere Funktionen zur Verfügung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Mögliche Funktionen:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Vorlage Material</li>
            <li> Massenpflege</li>
            <li> Sammelpflege von Teilbereichen</li>
        </ul>
        
        <div class="lesson-merksatz">
            Die Materialstammdaten gehören besonders zum Modul <strong>MM – Materialwirtschaft</strong>.
        </div>
    </div>

    <!-- Organisationselemente -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Organisationselemente</h3>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Organisationselemente bilden die Organisationsstruktur für rechtliche und betriebswirtschaftliche Zwecke ab."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p>Organisationselemente dienen dazu, die Struktur eines Unternehmens in SAP abzubilden. Sie können rechtliche und betriebswirtschaftliche Einheiten darstellen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Organisationselemente:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span class="lesson-badge">Buchungskreis</span>
            <span class="lesson-badge">Werk</span>
            <span class="lesson-badge">Lagerort</span>
            <span class="lesson-badge">Einkaufsorganisation</span>
            <span class="lesson-badge">Verkaufsorganisation</span>
            <span class="lesson-badge">Kostenrechnungskreis</span>
        </div>
    </div>

    <!-- Buchungskreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Buchungskreis</h3>
        <p>
            Der Buchungskreis ist in SAP die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung erstellt werden kann. Ein Buchungskreis definiert eine rechtlich selbstständige Einheit.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Dazu gehören:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> vollständige Buchführung</li>
            <li> Bilanzierung</li>
            <li> Gewinn- und Verlustrechnung</li>
            <li> gesetzliche Abschlüsse</li>
        </ul>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der Buchungskreis ist die kleinste organisatorische Einheit der Finanzbuchhaltung und stellt eine rechtlich selbstständige Einheit für vollständige Buchführung und Bilanzierung dar."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Mahnlaufverfahren -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Mahnlaufverfahren</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 0.75rem;">Ablauf des Mahnlaufverfahrens</h3>
        <p>Das Mahnlaufverfahren besteht laut den Notizen aus folgenden Schritten:</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Parameter pflegen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnverfahren einplanen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Planlauf beenden</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnlauf starten</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> In SAP wird der Mahnlauf genutzt, um offene Forderungen gegenüber Kunden zu prüfen und gegebenenfalls Mahnungen zu erstellen.
        </div>
    </div>

    <!-- Belege und Geschäftsvorfälle -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Belege und Geschäftsvorfälle</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Elektronischer Datensatz eines Geschäftsvorfalls</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welcher Begriff beschreibt einen elektronischen Datensatz von Geschäftsvorfällen?</p>
        <p><strong style="color: #34d399;">Richtige Antwort:</strong> <span style="background: rgba(52, 211, 153, 0.15); color: #34d399; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">Beleg</span></p>
        
        <p>Ein Beleg dokumentiert einen Geschäftsvorfall im SAP-System.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">Bestellung</span>
            <span class="lesson-badge">Wareneingangsbeleg</span>
            <span class="lesson-badge">Rechnung</span>
            <span class="lesson-badge">Buchhaltungsbeleg</span>
            <span class="lesson-badge">Materialbeleg</span>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Zusätzlicher Begriff – Belegfluss:</strong> Der Belegfluss zeigt die Verbindung bzw. Reihenfolge zusammenhängender Belege in einem Prozess.
        </div>
    </div>

    <!-- Materialwirtschaft / MM -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialwirtschaft / MM</h2>
    
    <!-- Unternehmensszenario -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Unternehmensszenario: Einführung des MM-Moduls</h3>
        
        <p><strong style="color: #f59e0b;">Szenario:</strong> Die Geschäftsleitung eines Automobilunternehmens hat die SAP-Einführung abgeschlossen. Das Modul Materialwirtschaft / MM wird implementiert bzw. genutzt. Mehrere Abteilungen sind beteiligt und benötigen Zugriff auf vorhandene Stammdaten.</p>
        
        <p><strong style="color: #f59e0b;">Aufgabe:</strong> Zentrale Fragestellungen beantworten, damit das System sauber läuft.</p>
    </div>

    <!-- Infosätze -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Infosätze in SAP</h3>
        
        <p>Ein Infosatz enthält Informationen über die Beziehung zwischen Material und Lieferant.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Er kann unter anderem Informationen enthalten zu:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Preisen</li>
            <li> Lieferbedingungen</li>
            <li> Lieferzeiten</li>
            <li> Einkaufsdaten</li>
            <li> Material-Lieferanten-Beziehung</li>
        </ul>
        
        <div class="lesson-step">
            <strong>In den Notizen steht:</strong> <span style="font-style: italic; ">"Infosatz = Stammsatz"</span><br>
            <span style="color: #a78bfa; font-weight: 600; display: inline-block; margin-top: 0.5rem;">Besser formuliert:</span> Ein Infosatz ist ein Stammdatensatz im Einkauf.
        </div>
        
        <h4 style="color: var(--color-warning);">Möglichkeiten zur Erstellung von Infosätzen</h4>
        <p>SAP bietet mehrere Möglichkeiten zur Erstellung bzw. Pflege von Infosätzen:</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="lesson-badge">1. Manuelle Anlage</span>
            <span class="lesson-badge">2. Update aus einer Bestellung</span>
            <span class="lesson-badge">3. Update aus einem Angebot</span>
            <span class="lesson-badge">4. Update aus einem Rahmenvertrag</span>
        </div>
    </div>

    <!-- S4F10 – Finanzwesen und Controlling -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4F10 – Finanzwesen und Controlling</h2>
    
    <!-- Konten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Konten im SAP-System</h3>
        
        <p>In SAP gibt es Haupt- und Nebenbuchhaltung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Wichtige Kontenarten:</p>
        <div style="display: grid; grid-template-cols: 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Sachkonto</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Gehört zur Hauptbuchhaltung.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Bank, Kasse, Umsatzerlöse, Materialaufwand, Maschinen, Gebäude</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Kreditoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Lieferantenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Verbindlichkeiten gegenüber Lieferanten.</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Debitoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Kundenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Forderungen gegenüber Kunden.</span>
            </div>
        </div>
    </div>

    <!-- Controlling -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Controlling</h3>
        
        <p>Im Controlling geht es um Kosten- und Leistungsrechnung sowie interne Steuerung. Wichtige Begriffe sind: Kostenrechnungskreis, Ergebnisbereich und Kosten- und Leistungsrechnung.</p>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche der aufgeführten Objekte sind Organisationseinheiten im SAP Controlling?</p>
        <p><strong>Aus den Notizen:</strong> Buchungskreis, Kostenrechnungskreis, Leistungsart, Ergebnisbereich</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Wahrscheinlich richtige Organisationseinheiten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Kostenrechnungskreis</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Ergebnisbereich</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> Eine Leistungsart ist eher ein Stammdatum bzw. eine Verrechnungsgröße im Controlling, aber keine klassische Organisationseinheit.
        </div>
    </div>

    <!-- Vertrieb / Verkaufsprozess -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Vertrieb / Verkaufsprozess</h2>
    
    <!-- Verkaufsprozess -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verkaufsprozess bei Terminabwicklung</h3>
        
        <p>In den Notizen steht die Reihenfolge teilweise durcheinander. Sortiert sieht der Verkaufsprozess ungefähr so aus:</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">1.</span>
                <span style="font-size: 0.9rem; ">Kundenanfrage</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">2.</span>
                <span style="font-size: 0.9rem; ">Angebot</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">3.</span>
                <span style="font-size: 0.9rem; ">Kundenauftrag / Terminauftrag</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">4.</span>
                <span style="font-size: 0.9rem; ">Verfügbarkeitsprüfung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">5.</span>
                <span style="font-size: 0.9rem; ">Lieferung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">6.</span>
                <span style="font-size: 0.9rem; ">Kommissionierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">7.</span>
                <span style="font-size: 0.9rem; ">Transport</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">8.</span>
                <span style="font-size: 0.9rem; ">Warenausgang</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">9.</span>
                <span style="font-size: 0.9rem; ">Fakturierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">10.</span>
                <span style="font-size: 0.9rem; ">Zahlungsabwicklung</span>
            </div>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Wichtig:</strong> Die ursprünglich notierte Reihenfolge war teilweise falsch. Für die Prüfung sollte die logische Prozesskette verstanden werden.
        </div>
    </div>

    <!-- Verfügbarkeitsprüfung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verfügbarkeitsprüfung und Teillieferung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Warum hängt das Ergebnis der Verfügbarkeitsprüfung unter Umständen von der Vereinbarung zur Teillieferung ab?</p>
        
        <div class="lesson-step">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Antwort:</p>
            <p>Die Verfügbarkeitsprüfung ermittelt zunächst technisch, wann welche Menge verfügbar ist. Die Teillieferungsvereinbarung entscheidet dann, wie SAP mit einer Unterdeckung umgehen darf.</p>
            <p>Das bedeutet: Wenn nicht genug Ware vorhanden ist, bestimmt die Teillieferungsvereinbarung, ob:</p>
            <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> eine Teillieferung erlaubt ist</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nur vollständig geliefert werden darf</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> mehrere Lieferungen möglich sind</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> der Auftrag komplett zurückgestellt werden muss</li>
            </ul>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong><br>
            Die Verfügbarkeitsprüfung sagt, was wann verfügbar ist.<br>
            Die Teillieferungsvereinbarung sagt, was dem Kunden angeboten oder geliefert werden darf.
        </div>
    </div>

    <!-- Fertigung / Produktion -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Fertigung / Produktion</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">SAP R/3 Stammdaten mit Bezug zur Fertigung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche Elemente gehören in SAP R/3 zu den Stammdaten, die sich auf die Fertigung beziehen?</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Richtige Antworten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Arbeitsplatz</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Stückliste</span>
            </div>
        </div>
        
        <p>Nicht passend bzw. eher keine Fertigungsstammdaten: Umlagerung, Produktkostensammler</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Arbeitsplatz</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Ein Arbeitsplatz beschreibt, wo ein Arbeitsvorgang ausgeführt wird.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Maschine, Fertigungslinie, Arbeitsplatzgruppe, manuelle Arbeitsstation</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Stückliste</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Eine Stückliste beschreibt, aus welchen Komponenten ein Produkt besteht.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiel: Ein Fahrrad besteht aus: Rahmen, Rädern, Lenker, Sattel, Schrauben</span>
            </div>
        </div>
    </div>

    <!-- Materialbewertung -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialbewertung</h2>
    
    <!-- Bewertung gelagerter Materialien -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Bewertung gelagerter Materialien</h3>
        <p>Die Bewertung gelagerter Materialien betrifft den Warenwert bzw. den Wert des Lagerbestands.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">In SAP gibt es insbesondere folgende Bewertungsverfahren:</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <span class="lesson-badge">S-Preis = Standardpreis</span>
            <span class="lesson-badge">V-Preis = gleitender Durchschnittspreis</span>
        </div>
    </div>

    <!-- Standardpreis und gleitender Durchschnittspreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Standardpreis und gleitender Durchschnittspreis</h3>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">S-Preis / Standardpreis</span>
            <p>Der Standardpreis ist ein fester Preis. Er wird verwendet, wenn Wareneingänge stets zu einem festen Preis gebucht werden sollen. Preisabweichungen werden separat gebucht.</p>
            
            <p><strong>Frage:</strong> Welches Verfahren ist anzuwenden, wenn Wareneingänge stets zu einem festen Preis gebucht werden und Abweichungen separat gebucht werden?</p>
            <p style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin: 0;">Antwort: S-Preis / Standardpreis</p>
        </div>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">V-Preis / gleitender Durchschnittspreis</span>
            <p>Beim gleitenden Durchschnittspreis verändert sich der Materialpreis durch neue Wareneingänge. Der Durchschnittspreis wird bei neuen Beständen und neuen Einkaufspreisen angepasst.</p>
        </div>
    </div>

    <!-- Sicht im Materialstammsatz -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sicht im Materialstammsatz für Bewertungsverfahren</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> In welcher Sicht des Materialstammsatzes werden die Bewertungsverfahren für Materialien festgelegt?</p>
        
        <div class="lesson-success-box">
            <p><strong style="color: #34d399;">Antwort:</strong></p>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Buchhaltungssicht</li>
                <li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> genauer: Buchhaltung 1</li>
            </ul>
        </div>
    </div>

    <!-- Kompakte Fragen-und-Antworten-Liste -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Kompakte Fragen-und-Antworten-Liste</h2>
    <div class="lesson-card">
        
        <!-- QA Item 1 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Planung: Wie ist die richtige Reihenfolge der Planungsschritte?</p>
            <p>Programmplanung → Absatz- und Produktionsplanung → Kapazitätsplanung → Materialbedarfsplanung</p>
        </div>
        
        <!-- QA Item 2 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Lagerfertigung: Was ist die Grundlage bei der Lagerfertigung?</p>
            <p>Planprimärbedarf, Absatzprognose und Lagerbestand</p>
        </div>
        
        <!-- QA Item 3 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konsignation: Was unterscheidet Lieferantenkonsignation von normaler Beschaffung?</p>
            <p>Die Ware liegt im eigenen Lager, gehört aber bis zur Entnahme dem Lieferanten. Erst bei Entnahme wird sie dem Unternehmen zugerechnet bzw. abgerechnet.</p>
        </div>
        
        <!-- QA Item 4 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">CPD-Lieferant: Was ist ein CPD-Lieferant?</p>
            <p>Ein Einmallieferant bzw. Sammelstammsatz für verschiedene selten genutzte Lieferanten.</p>
        </div>
        
        <!-- QA Item 5 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsprozess: Bildet der eingehende Kundenauftrag die Grundlage für Bedarfsermittlung und nachgelagerte Produktionsprozesse?</p>
            <p>Ja, das ist richtig.</p>
        </div>
        
        <!-- QA Item 6 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Rollenbasiertes System: Was bedeutet rollenbasiert in SAP?</p>
            <p>Benutzer erhalten Berechtigungen entsprechend ihrer Rolle im Unternehmen.</p>
        </div>
        
        <!-- QA Item 7 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialstammdaten: Welche Optionen gibt es bei der Pflege von Materialstammdaten?</p>
            <p>- Vorlage Material, - Massenpflege, - Sammelpflege von Teilbereichen</p>
        </div>
        
        <!-- QA Item 8 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Organisationselemente: Bilden Organisationselemente die rechtliche und betriebswirtschaftliche Struktur ab?</p>
            <p>Ja, richtig.</p>
        </div>
        
        <!-- QA Item 9 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Mahnlauf: Wie läuft ein Mahnverfahren ab?</p>
            <p>Parameter pflegen → Mahnverfahren einplanen → Planlauf beenden → starten</p>
        </div>
        
        <!-- QA Item 10 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Beleg: Welcher Begriff beschreibt einen elektronischen Datensatz eines Geschäftsvorfalls?</p>
            <p>Beleg</p>
        </div>
        
        <!-- QA Item 11 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Infosatz: Welche Möglichkeiten bietet SAP beim Bilden von Infosätzen?</p>
            <p>- Manuelle Anlage, - Update aus Bestellung, - Update aus Angebot, - Update aus Rahmenvertrag</p>
        </div>
        
        <!-- QA Item 12 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konten: Welche Konten gibt es in SAP?</p>
            <p>- Sachkonten, - Kreditoren, - Debitoren</p>
        </div>
        
        <!-- QA Item 13 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Controlling: Welche Objekte sind Organisationseinheiten im SAP Controlling?</p>
            <p>- Kostenrechnungskreis, - Ergebnisbereich</p>
        </div>
        
        <!-- QA Item 14 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Verkaufsprozess: Wie ist der Verkaufsprozess bei Terminabwicklung sortiert?</p>
            <p>Kundenanfrage → Angebot → Auftrag → Verfügbarkeitsprüfung → Lieferung → Kommissionierung → Transport → Warenausgang → Fakturierung → Zahlungsabwicklung</p>
        </div>
        
        <!-- QA Item 15 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Teillieferung: Warum hängt das Ergebnis der Verfügbarkeitsprüfung von der Teillieferungsvereinbarung ab?</p>
            <p>Weil SAP dadurch weiß, ob Unterdeckungen durch Teillieferungen erlaubt sind oder ob nur vollständig geliefert werden darf.</p>
        </div>
        
        <!-- QA Item 16 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Buchungskreis: Was ist ein Buchungskreis?</p>
            <p>Die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung und Bilanzierung möglich ist.</p>
        </div>
        
        <!-- QA Item 17 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsstammdaten: Welche Stammdaten beziehen sich auf Fertigung?</p>
            <p>- Arbeitsplatz, - Stückliste</p>
        </div>
        
        <!-- QA Item 18 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialbewertung: Welche Bewertungsverfahren gibt es?</p>
            <p>- Standardpreis, - gleitender Durchschnittspreis</p>
        </div>
        
        <!-- QA Item 19 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Standardpreis: Welches Verfahren wird genutzt, wenn Wareneingänge zu festem Preis gebucht und Abweichungen separat gebucht werden?</p>
            <p>Standardpreis / S-Preis</p>
        </div>
        
        <!-- QA Item 20 -->
        <div style="padding-bottom: 0.5rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Bewertungssicht: In welcher Sicht wird das Bewertungsverfahren festgelegt?</p>
            <p>In der Buchhaltungssicht, insbesondere Buchhaltung 1.</p>
        </div>
    </div>

    <!-- Begriffe zum Lernen -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Begriffe zum Lernen</h2>
    <div class="lesson-card">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Programmplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung des Produktions- bzw. Absatzprogramms.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Absatz- und Produktionsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung von Absatzmengen und Produktionsmengen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kapazitätsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prüfung, ob genügend Maschinen, Arbeitsplätze und Personal verfügbar sind.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialbedarfsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ermittlung benötigter Materialien.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Lagerfertigung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Produktion auf Lager, nicht direkt auf Kundenauftrag.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Planprimärbedarf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Geplanter Bedarf für zukünftige Produktion.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Konsignation</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ware liegt beim Unternehmen, gehört aber bis zur Entnahme dem Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">CPD-Lieferant</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einmallieferant / Sammelstammsatz für seltene Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Rollenbasiert</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zugriff abhängig von Benutzerrolle und Berechtigungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialstamm</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zentrale Stammdaten zu einem Material.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Organisationselement</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Bildet Unternehmensstruktur in SAP ab.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Rechtlich selbstständige Einheit der Finanzbuchhaltung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Mahnlauf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prozess zur Erstellung von Mahnungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Beleg</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Elektronischer Nachweis eines Geschäftsvorfalls.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Infosatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einkaufsstammdatum zu Material-Lieferanten-Beziehung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kreditor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Lieferant.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Debitor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Kunde.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Sachkonto</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Konto im Hauptbuch.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kostenrechnungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit im Controlling.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Ergebnisbereich</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit für Ergebnisrechnung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Arbeitsplatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ort oder Ressource, an der Fertigung stattfindet.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Stückliste</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Liste der Bestandteile eines Produkts.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">S-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Standardpreis.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">V-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Gleitender Durchschnittspreis.</span>
            </div>
            
            <div>
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchhaltung 1</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Materialstammsicht für Bewertung.</span>
            </div>
            
        </div>
    </div>
</div>'
)
ON DUPLICATE KEY UPDATE
    subjectId = 'sxh3e5ewi0qahenr6jg',
    authorId = NULL,
    title = '6. SAP Abschlussprüfung – sortierte Lernnotizen',
    sortOrder = 52,
    status = 'published',
    contentRaw = '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif;">
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b;">Prüfungsvorbereitung</span>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.025em; line-height: 1.2;">6. SAP Abschlussprüfung – sortierte Lernnotizen</h1>
    
    <!-- Prüfungsinformationen Card -->
    <div class="lesson-card">
        <h3 style="color: #f59e0b; font-weight: 700; font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="ph ph-info" style="font-size: 1.4rem;"></i> Prüfungsinformationen
        </h3>
        <p>Es kommen voraussichtlich Inhalte aus drei SAP-Bereichen/Büchern dran:</p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">S4500</span>
            <span class="lesson-badge">S4220</span>
            <span class="lesson-badge">S4F10</span>
        </div>
        <p>Die Prüfung besteht vermutlich aus:</p>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li> ca. 16–18 Fragen SAP</li>
            <li> ca. 16–18 Fragen ABAP</li>
            <li> 
                <div>
                    <span style="font-weight: 600;">schriftlicher Teil mit:</span>
                    <ul style="list-style: none; padding-left: 1rem; margin: 0.25rem 0 0 0;">
                        <li>- Multiple Choice</li>
                        <li>- offenen Fragen, bei denen etwas geschrieben werden muss</li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <!-- S4500 Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4500 – Logistik, Planung, Beschaffung, Fertigung</h2>
    
    <!-- Planungsschritte -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Planungsschritte</h3>
        <p>Die richtige Reihenfolge für einen Planungsschritt lautet:</p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Programmplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Absatz- und Produktionsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Kapazitätsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Materialbedarfsplanung</span>
            </div>
        </div>
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong> Erst wird geplant, was verkauft bzw. produziert werden soll. Danach wird geprüft, ob genug Kapazitäten vorhanden sind. Anschließend wird der Materialbedarf ermittelt.
        </div>
    </div>

    <!-- Lagerfertigung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Lagerfertigung</h3>
        <p>Bei der Lagerfertigung wird nicht erst auf einen konkreten Kundenauftrag gewartet. Stattdessen wird auf Lager produziert.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Grundlage der Auslösung ist:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Planprimärbedarf</li>
            <li> Absatzprognose</li>
            <li> vorhandener Lagerbestand</li>
        </ul>
        
        <p>Der Kundenbedarf wird später aus dem vorhandenen Lagerbestand gedeckt.</p>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Bei der Lagerfertigung ist der Planprimärbedarf die Grundlage der Auslösung. Der Kundenbedarf wird aus dem vorhandenen Lagerbestand gedeckt."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Lieferantenkonsignation -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sonderbeschaffungsprozess: Lieferantenkonsignation</h3>
        
        <h4 style="color: var(--color-warning);">Was ist Konsignation?</h4>
        <p>Bei der Lieferantenkonsignation liegen die Waren zwar im eigenen Lager, gehören aber rechtlich noch dem Lieferanten.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Das bedeutet:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>Die Ware befindet sich im Lager des Unternehmens.</span></li>
            <li> <span>Solange die Ware nicht entnommen wird, gehört sie dem Lieferanten.</span></li>
            <li> <span>Erst bei Entnahme aus dem Lager geht der Besitz bzw. die wirtschaftliche Verantwortung auf das eigene Unternehmen über.</span></li>
            <li> <span>Abrechnet wird normalerweise erst bei Entnahme oder Verbrauch.</span></li>
        </ul>
        
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5rem 0;">
        
        <h4 style="color: var(--color-warning);">Unterschied zum normalen Beschaffungsprozess</h4>
        <p>Beim normalen Beschaffungsprozess wird die Ware in der Regel mit Wareneingang gekauft und gehört danach dem Unternehmen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Bei der Konsignation:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Ware liegt im eigenen Lager.</li>
            <li> Eigentum bleibt zunächst beim Lieferanten.</li>
            <li> Abrechnung erfolgt erst bei Entnahme bzw. Verbrauch.</li>
            <li> Das Unternehmen muss nicht sofort Kapital für den Warenbestand binden.</li>
        </ul>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Mögliche Prozessbestandteile:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="lesson-badge">1. Anforderung / Bedarf</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">2. Lieferung durch den Lieferanten</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">3. Ware liegt im Lager</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">4. Entnahme / Verbrauch</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">5. Abrechnung</span>
        </div>
    </div>

    <!-- CPD-Lieferant -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">CPD-Lieferant / Conto pro Diverse</h3>
        <p>
            CPD bedeutet <strong>Conto pro Diverse</strong>. Ein CPD-Lieferant ist ein Einmallieferant bzw. ein Lieferantenstammsatz, der für mehrere verschiedene Lieferanten verwendet werden kann.
        </p>
        
        <h4 style="color: var(--color-warning);">Wann verwendet man einen CPD-Lieferanten?</h4>
        <p>Ein CPD-Lieferant wird genutzt, wenn:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>man nur einmalig bei einem Lieferanten bestellt</span></li>
            <li> <span>sehr selten bei diesem Lieferanten bestellt wird</span></li>
            <li> <span>noch kein Kontakt oder keine Stammdaten zu diesem Lieferanten bestehen</span></li>
            <li> <span>sich die vollständige Anlage eines eigenen Lieferantenstammsatzes nicht lohnt</span></li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Eine Anfrage oder Bestellung an einen Lieferanten, mit dem man bisher noch nie Kontakt hatte und bei dem nur eine sehr geringe Anzahl an Bestellungen erwartet wird.
        </div>
        
        <h4 style="color: var(--color-warning);">Vorteil</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Es müssen nicht für jeden seltenen Lieferanten vollständige Stammdaten angelegt werden.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Der Pflegeaufwand wird reduziert.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Die komplette Stammdatenanlage entfällt teilweise.</li>
        </ul>
    </div>

    <!-- Fertigungsprozess und Kundenauftrag -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Fertigungsprozess und Kundenauftrag</h3>
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der eingehende Kundenauftrag bildet die Grundlage für die Bedarfsermittlung und steuert den nachgelagerten Produktionsprozess."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Erklärung:</p>
        <p>Ein eingehender Kundenauftrag kann im Fertigungsprozess als Grundlage dienen für:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Bedarfsermittlung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Produktionsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Materialbedarfsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nachgelagerte Fertigungsprozesse</li>
        </ul>
        <p style="color: #a78bfa; font-size: 0.9rem; font-weight: 600; margin: 0;">Besonders wichtig ist das bei kundenauftragsbezogener Fertigung.</p>
    </div>

    <!-- Rollenbasiertes System -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Rollenbasiertes SAP ERP-System</h3>
        <p>
            SAP ERP ist rollenbasiert. Das bedeutet: Benutzer erhalten Zugriff auf Funktionen, Daten und Transaktionen entsprechend ihrer Rolle im Unternehmen.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Rollen:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Administrator</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Angestellter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Einkäufer</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Lagerist</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Buchhalter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Geschäftsführer</span>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Durch die rollenbasierte Struktur wird geregelt:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> wer welche Daten sehen darf</li>
            <li> wer welche Daten bearbeiten darf</li>
            <li> wer welche Prozesse ausführen darf</li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Ein Mitarbeiter im Einkauf darf Bestellungen bearbeiten, aber möglicherweise keine Gehaltsdaten sehen.
        </div>
    </div>

    <!-- Organisation und Stammdaten Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Stammdaten und Organisation</h2>
    
    <!-- Materialstammdaten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Materialstammdaten</h3>
        <p>Bei der Pflege der Materialstammdaten stehen mehrere Funktionen zur Verfügung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Mögliche Funktionen:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Vorlage Material</li>
            <li> Massenpflege</li>
            <li> Sammelpflege von Teilbereichen</li>
        </ul>
        
        <div class="lesson-merksatz">
            Die Materialstammdaten gehören besonders zum Modul <strong>MM – Materialwirtschaft</strong>.
        </div>
    </div>

    <!-- Organisationselemente -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Organisationselemente</h3>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Organisationselemente bilden die Organisationsstruktur für rechtliche und betriebswirtschaftliche Zwecke ab."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p>Organisationselemente dienen dazu, die Struktur eines Unternehmens in SAP abzubilden. Sie können rechtliche und betriebswirtschaftliche Einheiten darstellen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Organisationselemente:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span class="lesson-badge">Buchungskreis</span>
            <span class="lesson-badge">Werk</span>
            <span class="lesson-badge">Lagerort</span>
            <span class="lesson-badge">Einkaufsorganisation</span>
            <span class="lesson-badge">Verkaufsorganisation</span>
            <span class="lesson-badge">Kostenrechnungskreis</span>
        </div>
    </div>

    <!-- Buchungskreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Buchungskreis</h3>
        <p>
            Der Buchungskreis ist in SAP die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung erstellt werden kann. Ein Buchungskreis definiert eine rechtlich selbstständige Einheit.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Dazu gehören:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> vollständige Buchführung</li>
            <li> Bilanzierung</li>
            <li> Gewinn- und Verlustrechnung</li>
            <li> gesetzliche Abschlüsse</li>
        </ul>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der Buchungskreis ist die kleinste organisatorische Einheit der Finanzbuchhaltung und stellt eine rechtlich selbstständige Einheit für vollständige Buchführung und Bilanzierung dar."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Mahnlaufverfahren -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Mahnlaufverfahren</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 0.75rem;">Ablauf des Mahnlaufverfahrens</h3>
        <p>Das Mahnlaufverfahren besteht laut den Notizen aus folgenden Schritten:</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Parameter pflegen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnverfahren einplanen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Planlauf beenden</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnlauf starten</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> In SAP wird der Mahnlauf genutzt, um offene Forderungen gegenüber Kunden zu prüfen und gegebenenfalls Mahnungen zu erstellen.
        </div>
    </div>

    <!-- Belege und Geschäftsvorfälle -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Belege und Geschäftsvorfälle</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Elektronischer Datensatz eines Geschäftsvorfalls</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welcher Begriff beschreibt einen elektronischen Datensatz von Geschäftsvorfällen?</p>
        <p><strong style="color: #34d399;">Richtige Antwort:</strong> <span style="background: rgba(52, 211, 153, 0.15); color: #34d399; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">Beleg</span></p>
        
        <p>Ein Beleg dokumentiert einen Geschäftsvorfall im SAP-System.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">Bestellung</span>
            <span class="lesson-badge">Wareneingangsbeleg</span>
            <span class="lesson-badge">Rechnung</span>
            <span class="lesson-badge">Buchhaltungsbeleg</span>
            <span class="lesson-badge">Materialbeleg</span>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Zusätzlicher Begriff – Belegfluss:</strong> Der Belegfluss zeigt die Verbindung bzw. Reihenfolge zusammenhängender Belege in einem Prozess.
        </div>
    </div>

    <!-- Materialwirtschaft / MM -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialwirtschaft / MM</h2>
    
    <!-- Unternehmensszenario -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Unternehmensszenario: Einführung des MM-Moduls</h3>
        
        <p><strong style="color: #f59e0b;">Szenario:</strong> Die Geschäftsleitung eines Automobilunternehmens hat die SAP-Einführung abgeschlossen. Das Modul Materialwirtschaft / MM wird implementiert bzw. genutzt. Mehrere Abteilungen sind beteiligt und benötigen Zugriff auf vorhandene Stammdaten.</p>
        
        <p><strong style="color: #f59e0b;">Aufgabe:</strong> Zentrale Fragestellungen beantworten, damit das System sauber läuft.</p>
    </div>

    <!-- Infosätze -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Infosätze in SAP</h3>
        
        <p>Ein Infosatz enthält Informationen über die Beziehung zwischen Material und Lieferant.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Er kann unter anderem Informationen enthalten zu:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Preisen</li>
            <li> Lieferbedingungen</li>
            <li> Lieferzeiten</li>
            <li> Einkaufsdaten</li>
            <li> Material-Lieferanten-Beziehung</li>
        </ul>
        
        <div class="lesson-step">
            <strong>In den Notizen steht:</strong> <span style="font-style: italic; ">"Infosatz = Stammsatz"</span><br>
            <span style="color: #a78bfa; font-weight: 600; display: inline-block; margin-top: 0.5rem;">Besser formuliert:</span> Ein Infosatz ist ein Stammdatensatz im Einkauf.
        </div>
        
        <h4 style="color: var(--color-warning);">Möglichkeiten zur Erstellung von Infosätzen</h4>
        <p>SAP bietet mehrere Möglichkeiten zur Erstellung bzw. Pflege von Infosätzen:</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="lesson-badge">1. Manuelle Anlage</span>
            <span class="lesson-badge">2. Update aus einer Bestellung</span>
            <span class="lesson-badge">3. Update aus einem Angebot</span>
            <span class="lesson-badge">4. Update aus einem Rahmenvertrag</span>
        </div>
    </div>

    <!-- S4F10 – Finanzwesen und Controlling -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4F10 – Finanzwesen und Controlling</h2>
    
    <!-- Konten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Konten im SAP-System</h3>
        
        <p>In SAP gibt es Haupt- und Nebenbuchhaltung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Wichtige Kontenarten:</p>
        <div style="display: grid; grid-template-cols: 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Sachkonto</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Gehört zur Hauptbuchhaltung.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Bank, Kasse, Umsatzerlöse, Materialaufwand, Maschinen, Gebäude</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Kreditoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Lieferantenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Verbindlichkeiten gegenüber Lieferanten.</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Debitoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Kundenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Forderungen gegenüber Kunden.</span>
            </div>
        </div>
    </div>

    <!-- Controlling -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Controlling</h3>
        
        <p>Im Controlling geht es um Kosten- und Leistungsrechnung sowie interne Steuerung. Wichtige Begriffe sind: Kostenrechnungskreis, Ergebnisbereich und Kosten- und Leistungsrechnung.</p>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche der aufgeführten Objekte sind Organisationseinheiten im SAP Controlling?</p>
        <p><strong>Aus den Notizen:</strong> Buchungskreis, Kostenrechnungskreis, Leistungsart, Ergebnisbereich</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Wahrscheinlich richtige Organisationseinheiten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Kostenrechnungskreis</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Ergebnisbereich</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> Eine Leistungsart ist eher ein Stammdatum bzw. eine Verrechnungsgröße im Controlling, aber keine klassische Organisationseinheit.
        </div>
    </div>

    <!-- Vertrieb / Verkaufsprozess -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Vertrieb / Verkaufsprozess</h2>
    
    <!-- Verkaufsprozess -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verkaufsprozess bei Terminabwicklung</h3>
        
        <p>In den Notizen steht die Reihenfolge teilweise durcheinander. Sortiert sieht der Verkaufsprozess ungefähr so aus:</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">1.</span>
                <span style="font-size: 0.9rem; ">Kundenanfrage</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">2.</span>
                <span style="font-size: 0.9rem; ">Angebot</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">3.</span>
                <span style="font-size: 0.9rem; ">Kundenauftrag / Terminauftrag</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">4.</span>
                <span style="font-size: 0.9rem; ">Verfügbarkeitsprüfung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">5.</span>
                <span style="font-size: 0.9rem; ">Lieferung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">6.</span>
                <span style="font-size: 0.9rem; ">Kommissionierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">7.</span>
                <span style="font-size: 0.9rem; ">Transport</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">8.</span>
                <span style="font-size: 0.9rem; ">Warenausgang</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">9.</span>
                <span style="font-size: 0.9rem; ">Fakturierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">10.</span>
                <span style="font-size: 0.9rem; ">Zahlungsabwicklung</span>
            </div>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Wichtig:</strong> Die ursprünglich notierte Reihenfolge war teilweise falsch. Für die Prüfung sollte die logische Prozesskette verstanden werden.
        </div>
    </div>

    <!-- Verfügbarkeitsprüfung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verfügbarkeitsprüfung und Teillieferung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Warum hängt das Ergebnis der Verfügbarkeitsprüfung unter Umständen von der Vereinbarung zur Teillieferung ab?</p>
        
        <div class="lesson-step">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Antwort:</p>
            <p>Die Verfügbarkeitsprüfung ermittelt zunächst technisch, wann welche Menge verfügbar ist. Die Teillieferungsvereinbarung entscheidet dann, wie SAP mit einer Unterdeckung umgehen darf.</p>
            <p>Das bedeutet: Wenn nicht genug Ware vorhanden ist, bestimmt die Teillieferungsvereinbarung, ob:</p>
            <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> eine Teillieferung erlaubt ist</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nur vollständig geliefert werden darf</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> mehrere Lieferungen möglich sind</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> der Auftrag komplett zurückgestellt werden muss</li>
            </ul>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong><br>
            Die Verfügbarkeitsprüfung sagt, was wann verfügbar ist.<br>
            Die Teillieferungsvereinbarung sagt, was dem Kunden angeboten oder geliefert werden darf.
        </div>
    </div>

    <!-- Fertigung / Produktion -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Fertigung / Produktion</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">SAP R/3 Stammdaten mit Bezug zur Fertigung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche Elemente gehören in SAP R/3 zu den Stammdaten, die sich auf die Fertigung beziehen?</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Richtige Antworten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Arbeitsplatz</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Stückliste</span>
            </div>
        </div>
        
        <p>Nicht passend bzw. eher keine Fertigungsstammdaten: Umlagerung, Produktkostensammler</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Arbeitsplatz</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Ein Arbeitsplatz beschreibt, wo ein Arbeitsvorgang ausgeführt wird.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Maschine, Fertigungslinie, Arbeitsplatzgruppe, manuelle Arbeitsstation</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Stückliste</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Eine Stückliste beschreibt, aus welchen Komponenten ein Produkt besteht.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiel: Ein Fahrrad besteht aus: Rahmen, Rädern, Lenker, Sattel, Schrauben</span>
            </div>
        </div>
    </div>

    <!-- Materialbewertung -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialbewertung</h2>
    
    <!-- Bewertung gelagerter Materialien -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Bewertung gelagerter Materialien</h3>
        <p>Die Bewertung gelagerter Materialien betrifft den Warenwert bzw. den Wert des Lagerbestands.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">In SAP gibt es insbesondere folgende Bewertungsverfahren:</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <span class="lesson-badge">S-Preis = Standardpreis</span>
            <span class="lesson-badge">V-Preis = gleitender Durchschnittspreis</span>
        </div>
    </div>

    <!-- Standardpreis und gleitender Durchschnittspreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Standardpreis und gleitender Durchschnittspreis</h3>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">S-Preis / Standardpreis</span>
            <p>Der Standardpreis ist ein fester Preis. Er wird verwendet, wenn Wareneingänge stets zu einem festen Preis gebucht werden sollen. Preisabweichungen werden separat gebucht.</p>
            
            <p><strong>Frage:</strong> Welches Verfahren ist anzuwenden, wenn Wareneingänge stets zu einem festen Preis gebucht werden und Abweichungen separat gebucht werden?</p>
            <p style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin: 0;">Antwort: S-Preis / Standardpreis</p>
        </div>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">V-Preis / gleitender Durchschnittspreis</span>
            <p>Beim gleitenden Durchschnittspreis verändert sich der Materialpreis durch neue Wareneingänge. Der Durchschnittspreis wird bei neuen Beständen und neuen Einkaufspreisen angepasst.</p>
        </div>
    </div>

    <!-- Sicht im Materialstammsatz -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sicht im Materialstammsatz für Bewertungsverfahren</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> In welcher Sicht des Materialstammsatzes werden die Bewertungsverfahren für Materialien festgelegt?</p>
        
        <div class="lesson-success-box">
            <p><strong style="color: #34d399;">Antwort:</strong></p>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Buchhaltungssicht</li>
                <li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> genauer: Buchhaltung 1</li>
            </ul>
        </div>
    </div>

    <!-- Kompakte Fragen-und-Antworten-Liste -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Kompakte Fragen-und-Antworten-Liste</h2>
    <div class="lesson-card">
        
        <!-- QA Item 1 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Planung: Wie ist die richtige Reihenfolge der Planungsschritte?</p>
            <p>Programmplanung → Absatz- und Produktionsplanung → Kapazitätsplanung → Materialbedarfsplanung</p>
        </div>
        
        <!-- QA Item 2 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Lagerfertigung: Was ist die Grundlage bei der Lagerfertigung?</p>
            <p>Planprimärbedarf, Absatzprognose und Lagerbestand</p>
        </div>
        
        <!-- QA Item 3 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konsignation: Was unterscheidet Lieferantenkonsignation von normaler Beschaffung?</p>
            <p>Die Ware liegt im eigenen Lager, gehört aber bis zur Entnahme dem Lieferanten. Erst bei Entnahme wird sie dem Unternehmen zugerechnet bzw. abgerechnet.</p>
        </div>
        
        <!-- QA Item 4 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">CPD-Lieferant: Was ist ein CPD-Lieferant?</p>
            <p>Ein Einmallieferant bzw. Sammelstammsatz für verschiedene selten genutzte Lieferanten.</p>
        </div>
        
        <!-- QA Item 5 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsprozess: Bildet der eingehende Kundenauftrag die Grundlage für Bedarfsermittlung und nachgelagerte Produktionsprozesse?</p>
            <p>Ja, das ist richtig.</p>
        </div>
        
        <!-- QA Item 6 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Rollenbasiertes System: Was bedeutet rollenbasiert in SAP?</p>
            <p>Benutzer erhalten Berechtigungen entsprechend ihrer Rolle im Unternehmen.</p>
        </div>
        
        <!-- QA Item 7 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialstammdaten: Welche Optionen gibt es bei der Pflege von Materialstammdaten?</p>
            <p>- Vorlage Material, - Massenpflege, - Sammelpflege von Teilbereichen</p>
        </div>
        
        <!-- QA Item 8 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Organisationselemente: Bilden Organisationselemente die rechtliche und betriebswirtschaftliche Struktur ab?</p>
            <p>Ja, richtig.</p>
        </div>
        
        <!-- QA Item 9 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Mahnlauf: Wie läuft ein Mahnverfahren ab?</p>
            <p>Parameter pflegen → Mahnverfahren einplanen → Planlauf beenden → starten</p>
        </div>
        
        <!-- QA Item 10 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Beleg: Welcher Begriff beschreibt einen elektronischen Datensatz eines Geschäftsvorfalls?</p>
            <p>Beleg</p>
        </div>
        
        <!-- QA Item 11 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Infosatz: Welche Möglichkeiten bietet SAP beim Bilden von Infosätzen?</p>
            <p>- Manuelle Anlage, - Update aus Bestellung, - Update aus Angebot, - Update aus Rahmenvertrag</p>
        </div>
        
        <!-- QA Item 12 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konten: Welche Konten gibt es in SAP?</p>
            <p>- Sachkonten, - Kreditoren, - Debitoren</p>
        </div>
        
        <!-- QA Item 13 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Controlling: Welche Objekte sind Organisationseinheiten im SAP Controlling?</p>
            <p>- Kostenrechnungskreis, - Ergebnisbereich</p>
        </div>
        
        <!-- QA Item 14 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Verkaufsprozess: Wie ist der Verkaufsprozess bei Terminabwicklung sortiert?</p>
            <p>Kundenanfrage → Angebot → Auftrag → Verfügbarkeitsprüfung → Lieferung → Kommissionierung → Transport → Warenausgang → Fakturierung → Zahlungsabwicklung</p>
        </div>
        
        <!-- QA Item 15 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Teillieferung: Warum hängt das Ergebnis der Verfügbarkeitsprüfung von der Teillieferungsvereinbarung ab?</p>
            <p>Weil SAP dadurch weiß, ob Unterdeckungen durch Teillieferungen erlaubt sind oder ob nur vollständig geliefert werden darf.</p>
        </div>
        
        <!-- QA Item 16 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Buchungskreis: Was ist ein Buchungskreis?</p>
            <p>Die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung und Bilanzierung möglich ist.</p>
        </div>
        
        <!-- QA Item 17 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsstammdaten: Welche Stammdaten beziehen sich auf Fertigung?</p>
            <p>- Arbeitsplatz, - Stückliste</p>
        </div>
        
        <!-- QA Item 18 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialbewertung: Welche Bewertungsverfahren gibt es?</p>
            <p>- Standardpreis, - gleitender Durchschnittspreis</p>
        </div>
        
        <!-- QA Item 19 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Standardpreis: Welches Verfahren wird genutzt, wenn Wareneingänge zu festem Preis gebucht und Abweichungen separat gebucht werden?</p>
            <p>Standardpreis / S-Preis</p>
        </div>
        
        <!-- QA Item 20 -->
        <div style="padding-bottom: 0.5rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Bewertungssicht: In welcher Sicht wird das Bewertungsverfahren festgelegt?</p>
            <p>In der Buchhaltungssicht, insbesondere Buchhaltung 1.</p>
        </div>
    </div>

    <!-- Begriffe zum Lernen -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Begriffe zum Lernen</h2>
    <div class="lesson-card">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Programmplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung des Produktions- bzw. Absatzprogramms.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Absatz- und Produktionsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung von Absatzmengen und Produktionsmengen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kapazitätsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prüfung, ob genügend Maschinen, Arbeitsplätze und Personal verfügbar sind.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialbedarfsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ermittlung benötigter Materialien.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Lagerfertigung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Produktion auf Lager, nicht direkt auf Kundenauftrag.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Planprimärbedarf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Geplanter Bedarf für zukünftige Produktion.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Konsignation</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ware liegt beim Unternehmen, gehört aber bis zur Entnahme dem Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">CPD-Lieferant</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einmallieferant / Sammelstammsatz für seltene Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Rollenbasiert</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zugriff abhängig von Benutzerrolle und Berechtigungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialstamm</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zentrale Stammdaten zu einem Material.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Organisationselement</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Bildet Unternehmensstruktur in SAP ab.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Rechtlich selbstständige Einheit der Finanzbuchhaltung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Mahnlauf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prozess zur Erstellung von Mahnungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Beleg</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Elektronischer Nachweis eines Geschäftsvorfalls.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Infosatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einkaufsstammdatum zu Material-Lieferanten-Beziehung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kreditor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Lieferant.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Debitor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Kunde.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Sachkonto</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Konto im Hauptbuch.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kostenrechnungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit im Controlling.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Ergebnisbereich</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit für Ergebnisrechnung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Arbeitsplatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ort oder Ressource, an der Fertigung stattfindet.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Stückliste</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Liste der Bestandteile eines Produkts.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">S-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Standardpreis.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">V-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Gleitender Durchschnittspreis.</span>
            </div>
            
            <div>
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchhaltung 1</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Materialstammsicht für Bewertung.</span>
            </div>
            
        </div>
    </div>
</div>',
    content = '<div style="margin-bottom: 3rem; font-family: system-ui, -apple-system, sans-serif;">
    <span style="display: inline-block; padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); color: #f59e0b;">Prüfungsvorbereitung</span>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; letter-spacing: -0.025em; line-height: 1.2;">6. SAP Abschlussprüfung – sortierte Lernnotizen</h1>
    
    <!-- Prüfungsinformationen Card -->
    <div class="lesson-card">
        <h3 style="color: #f59e0b; font-weight: 700; font-size: 1.2rem; margin-top: 0; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="ph ph-info" style="font-size: 1.4rem;"></i> Prüfungsinformationen
        </h3>
        <p>Es kommen voraussichtlich Inhalte aus drei SAP-Bereichen/Büchern dran:</p>
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">S4500</span>
            <span class="lesson-badge">S4220</span>
            <span class="lesson-badge">S4F10</span>
        </div>
        <p>Die Prüfung besteht vermutlich aus:</p>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li> ca. 16–18 Fragen SAP</li>
            <li> ca. 16–18 Fragen ABAP</li>
            <li> 
                <div>
                    <span style="font-weight: 600;">schriftlicher Teil mit:</span>
                    <ul style="list-style: none; padding-left: 1rem; margin: 0.25rem 0 0 0;">
                        <li>- Multiple Choice</li>
                        <li>- offenen Fragen, bei denen etwas geschrieben werden muss</li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>

    <!-- S4500 Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4500 – Logistik, Planung, Beschaffung, Fertigung</h2>
    
    <!-- Planungsschritte -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Planungsschritte</h3>
        <p>Die richtige Reihenfolge für einen Planungsschritt lautet:</p>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Programmplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Absatz- und Produktionsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Kapazitätsplanung</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Materialbedarfsplanung</span>
            </div>
        </div>
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong> Erst wird geplant, was verkauft bzw. produziert werden soll. Danach wird geprüft, ob genug Kapazitäten vorhanden sind. Anschließend wird der Materialbedarf ermittelt.
        </div>
    </div>

    <!-- Lagerfertigung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Lagerfertigung</h3>
        <p>Bei der Lagerfertigung wird nicht erst auf einen konkreten Kundenauftrag gewartet. Stattdessen wird auf Lager produziert.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Grundlage der Auslösung ist:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Planprimärbedarf</li>
            <li> Absatzprognose</li>
            <li> vorhandener Lagerbestand</li>
        </ul>
        
        <p>Der Kundenbedarf wird später aus dem vorhandenen Lagerbestand gedeckt.</p>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Bei der Lagerfertigung ist der Planprimärbedarf die Grundlage der Auslösung. Der Kundenbedarf wird aus dem vorhandenen Lagerbestand gedeckt."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Lieferantenkonsignation -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sonderbeschaffungsprozess: Lieferantenkonsignation</h3>
        
        <h4 style="color: var(--color-warning);">Was ist Konsignation?</h4>
        <p>Bei der Lieferantenkonsignation liegen die Waren zwar im eigenen Lager, gehören aber rechtlich noch dem Lieferanten.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Das bedeutet:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>Die Ware befindet sich im Lager des Unternehmens.</span></li>
            <li> <span>Solange die Ware nicht entnommen wird, gehört sie dem Lieferanten.</span></li>
            <li> <span>Erst bei Entnahme aus dem Lager geht der Besitz bzw. die wirtschaftliche Verantwortung auf das eigene Unternehmen über.</span></li>
            <li> <span>Abrechnet wird normalerweise erst bei Entnahme oder Verbrauch.</span></li>
        </ul>
        
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5rem 0;">
        
        <h4 style="color: var(--color-warning);">Unterschied zum normalen Beschaffungsprozess</h4>
        <p>Beim normalen Beschaffungsprozess wird die Ware in der Regel mit Wareneingang gekauft und gehört danach dem Unternehmen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Bei der Konsignation:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Ware liegt im eigenen Lager.</li>
            <li> Eigentum bleibt zunächst beim Lieferanten.</li>
            <li> Abrechnung erfolgt erst bei Entnahme bzw. Verbrauch.</li>
            <li> Das Unternehmen muss nicht sofort Kapital für den Warenbestand binden.</li>
        </ul>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Mögliche Prozessbestandteile:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
            <span class="lesson-badge">1. Anforderung / Bedarf</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">2. Lieferung durch den Lieferanten</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">3. Ware liegt im Lager</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">4. Entnahme / Verbrauch</span>
            <span style="color: #475569; font-weight: 800;">➔</span>
            <span class="lesson-badge">5. Abrechnung</span>
        </div>
    </div>

    <!-- CPD-Lieferant -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">CPD-Lieferant / Conto pro Diverse</h3>
        <p>
            CPD bedeutet <strong>Conto pro Diverse</strong>. Ein CPD-Lieferant ist ein Einmallieferant bzw. ein Lieferantenstammsatz, der für mehrere verschiedene Lieferanten verwendet werden kann.
        </p>
        
        <h4 style="color: var(--color-warning);">Wann verwendet man einen CPD-Lieferanten?</h4>
        <p>Ein CPD-Lieferant wird genutzt, wenn:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.25rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> <span>man nur einmalig bei einem Lieferanten bestellt</span></li>
            <li> <span>sehr selten bei diesem Lieferanten bestellt wird</span></li>
            <li> <span>noch kein Kontakt oder keine Stammdaten zu diesem Lieferanten bestehen</span></li>
            <li> <span>sich die vollständige Anlage eines eigenen Lieferantenstammsatzes nicht lohnt</span></li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Eine Anfrage oder Bestellung an einen Lieferanten, mit dem man bisher noch nie Kontakt hatte und bei dem nur eine sehr geringe Anzahl an Bestellungen erwartet wird.
        </div>
        
        <h4 style="color: var(--color-warning);">Vorteil</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Es müssen nicht für jeden seltenen Lieferanten vollständige Stammdaten angelegt werden.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Der Pflegeaufwand wird reduziert.</li>
            <li style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Die komplette Stammdatenanlage entfällt teilweise.</li>
        </ul>
    </div>

    <!-- Fertigungsprozess und Kundenauftrag -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Fertigungsprozess und Kundenauftrag</h3>
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der eingehende Kundenauftrag bildet die Grundlage für die Bedarfsermittlung und steuert den nachgelagerten Produktionsprozess."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Erklärung:</p>
        <p>Ein eingehender Kundenauftrag kann im Fertigungsprozess als Grundlage dienen für:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Bedarfsermittlung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Produktionsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> Materialbedarfsplanung</li>
            <li style="margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nachgelagerte Fertigungsprozesse</li>
        </ul>
        <p style="color: #a78bfa; font-size: 0.9rem; font-weight: 600; margin: 0;">Besonders wichtig ist das bei kundenauftragsbezogener Fertigung.</p>
    </div>

    <!-- Rollenbasiertes System -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Rollenbasiertes SAP ERP-System</h3>
        <p>
            SAP ERP ist rollenbasiert. Das bedeutet: Benutzer erhalten Zugriff auf Funktionen, Daten und Transaktionen entsprechend ihrer Rolle im Unternehmen.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Rollen:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Administrator</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Angestellter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Einkäufer</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Lagerist</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Buchhalter</span>
            <span class="lesson-badge" style="color: var(--color-warning); border-color: rgba(245, 158, 11, 0.25);">Geschäftsführer</span>
        </div>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Durch die rollenbasierte Struktur wird geregelt:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> wer welche Daten sehen darf</li>
            <li> wer welche Daten bearbeiten darf</li>
            <li> wer welche Prozesse ausführen darf</li>
        </ul>
        
        <div class="lesson-step">
            <strong>Beispiel:</strong> Ein Mitarbeiter im Einkauf darf Bestellungen bearbeiten, aber möglicherweise keine Gehaltsdaten sehen.
        </div>
    </div>

    <!-- Organisation und Stammdaten Section -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Stammdaten und Organisation</h2>
    
    <!-- Materialstammdaten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Materialstammdaten</h3>
        <p>Bei der Pflege der Materialstammdaten stehen mehrere Funktionen zur Verfügung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Mögliche Funktionen:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Vorlage Material</li>
            <li> Massenpflege</li>
            <li> Sammelpflege von Teilbereichen</li>
        </ul>
        
        <div class="lesson-merksatz">
            Die Materialstammdaten gehören besonders zum Modul <strong>MM – Materialwirtschaft</strong>.
        </div>
    </div>

    <!-- Organisationselemente -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Organisationselemente</h3>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Organisationselemente bilden die Organisationsstruktur für rechtliche und betriebswirtschaftliche Zwecke ab."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
        
        <p>Organisationselemente dienen dazu, die Struktur eines Unternehmens in SAP abzubilden. Sie können rechtliche und betriebswirtschaftliche Einheiten darstellen.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele für Organisationselemente:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <span class="lesson-badge">Buchungskreis</span>
            <span class="lesson-badge">Werk</span>
            <span class="lesson-badge">Lagerort</span>
            <span class="lesson-badge">Einkaufsorganisation</span>
            <span class="lesson-badge">Verkaufsorganisation</span>
            <span class="lesson-badge">Kostenrechnungskreis</span>
        </div>
    </div>

    <!-- Buchungskreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Buchungskreis</h3>
        <p>
            Der Buchungskreis ist in SAP die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung erstellt werden kann. Ein Buchungskreis definiert eine rechtlich selbstständige Einheit.
        </p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Dazu gehören:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> vollständige Buchführung</li>
            <li> Bilanzierung</li>
            <li> Gewinn- und Verlustrechnung</li>
            <li> gesetzliche Abschlüsse</li>
        </ul>
        
        <div class="lesson-success-box">
            <p class="success-title">Prüfungsaussage</p>
            <p style="font-style: italic; font-size: 0.95rem; margin: 0 0 0.75rem 0;">"Der Buchungskreis ist die kleinste organisatorische Einheit der Finanzbuchhaltung und stellt eine rechtlich selbstständige Einheit für vollständige Buchführung und Bilanzierung dar."</p>
            <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 0.95rem; color: var(--color-success);">
                <span>Bewertung:</span> <span class="success-badge">richtig</span>
            </div>
        </div>
    </div>

    <!-- Mahnlaufverfahren -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Mahnlaufverfahren</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 0.75rem;">Ablauf des Mahnlaufverfahrens</h3>
        <p>Das Mahnlaufverfahren besteht laut den Notizen aus folgenden Schritten:</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span class="step-number">1.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Parameter pflegen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">2.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnverfahren einplanen</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">3.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Planlauf beenden</span>
            </div>
            <div class="lesson-step">
                <span class="step-number">4.</span>
                <span style="font-size: 0.95rem; font-weight: 600;">Mahnlauf starten</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> In SAP wird der Mahnlauf genutzt, um offene Forderungen gegenüber Kunden zu prüfen und gegebenenfalls Mahnungen zu erstellen.
        </div>
    </div>

    <!-- Belege und Geschäftsvorfälle -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Belege und Geschäftsvorfälle</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Elektronischer Datensatz eines Geschäftsvorfalls</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welcher Begriff beschreibt einen elektronischen Datensatz von Geschäftsvorfällen?</p>
        <p><strong style="color: #34d399;">Richtige Antwort:</strong> <span style="background: rgba(52, 211, 153, 0.15); color: #34d399; padding: 0.2rem 0.6rem; border-radius: 6px; font-weight: 700;">Beleg</span></p>
        
        <p>Ein Beleg dokumentiert einen Geschäftsvorfall im SAP-System.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Beispiele:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            <span class="lesson-badge">Bestellung</span>
            <span class="lesson-badge">Wareneingangsbeleg</span>
            <span class="lesson-badge">Rechnung</span>
            <span class="lesson-badge">Buchhaltungsbeleg</span>
            <span class="lesson-badge">Materialbeleg</span>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Zusätzlicher Begriff – Belegfluss:</strong> Der Belegfluss zeigt die Verbindung bzw. Reihenfolge zusammenhängender Belege in einem Prozess.
        </div>
    </div>

    <!-- Materialwirtschaft / MM -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialwirtschaft / MM</h2>
    
    <!-- Unternehmensszenario -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Unternehmensszenario: Einführung des MM-Moduls</h3>
        
        <p><strong style="color: #f59e0b;">Szenario:</strong> Die Geschäftsleitung eines Automobilunternehmens hat die SAP-Einführung abgeschlossen. Das Modul Materialwirtschaft / MM wird implementiert bzw. genutzt. Mehrere Abteilungen sind beteiligt und benötigen Zugriff auf vorhandene Stammdaten.</p>
        
        <p><strong style="color: #f59e0b;">Aufgabe:</strong> Zentrale Fragestellungen beantworten, damit das System sauber läuft.</p>
    </div>

    <!-- Infosätze -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Infosätze in SAP</h3>
        
        <p>Ein Infosatz enthält Informationen über die Beziehung zwischen Material und Lieferant.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.5rem;">Er kann unter anderem Informationen enthalten zu:</p>
        <ul style="list-style: none; padding: 0; margin: 0 0 1.5rem 0; font-size: 0.95rem; line-height: 1.6;">
            <li> Preisen</li>
            <li> Lieferbedingungen</li>
            <li> Lieferzeiten</li>
            <li> Einkaufsdaten</li>
            <li> Material-Lieferanten-Beziehung</li>
        </ul>
        
        <div class="lesson-step">
            <strong>In den Notizen steht:</strong> <span style="font-style: italic; ">"Infosatz = Stammsatz"</span><br>
            <span style="color: #a78bfa; font-weight: 600; display: inline-block; margin-top: 0.5rem;">Besser formuliert:</span> Ein Infosatz ist ein Stammdatensatz im Einkauf.
        </div>
        
        <h4 style="color: var(--color-warning);">Möglichkeiten zur Erstellung von Infosätzen</h4>
        <p>SAP bietet mehrere Möglichkeiten zur Erstellung bzw. Pflege von Infosätzen:</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span class="lesson-badge">1. Manuelle Anlage</span>
            <span class="lesson-badge">2. Update aus einer Bestellung</span>
            <span class="lesson-badge">3. Update aus einem Angebot</span>
            <span class="lesson-badge">4. Update aus einem Rahmenvertrag</span>
        </div>
    </div>

    <!-- S4F10 – Finanzwesen und Controlling -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">S4F10 – Finanzwesen und Controlling</h2>
    
    <!-- Konten -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Konten im SAP-System</h3>
        
        <p>In SAP gibt es Haupt- und Nebenbuchhaltung.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">Wichtige Kontenarten:</p>
        <div style="display: grid; grid-template-cols: 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Sachkonto</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Gehört zur Hauptbuchhaltung.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Bank, Kasse, Umsatzerlöse, Materialaufwand, Maschinen, Gebäude</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Kreditoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Lieferantenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Verbindlichkeiten gegenüber Lieferanten.</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Debitoren</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Sind Kundenkonten.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Sie zeigen Forderungen gegenüber Kunden.</span>
            </div>
        </div>
    </div>

    <!-- Controlling -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Controlling</h3>
        
        <p>Im Controlling geht es um Kosten- und Leistungsrechnung sowie interne Steuerung. Wichtige Begriffe sind: Kostenrechnungskreis, Ergebnisbereich und Kosten- und Leistungsrechnung.</p>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche der aufgeführten Objekte sind Organisationseinheiten im SAP Controlling?</p>
        <p><strong>Aus den Notizen:</strong> Buchungskreis, Kostenrechnungskreis, Leistungsart, Ergebnisbereich</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Wahrscheinlich richtige Organisationseinheiten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Kostenrechnungskreis</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Ergebnisbereich</span>
            </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.08); padding: 1rem 1.25rem; border-radius: 0.75rem; font-size: 0.95rem; line-height: 1.6;">
            <strong>Hinweis:</strong> Eine Leistungsart ist eher ein Stammdatum bzw. eine Verrechnungsgröße im Controlling, aber keine klassische Organisationseinheit.
        </div>
    </div>

    <!-- Vertrieb / Verkaufsprozess -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Vertrieb / Verkaufsprozess</h2>
    
    <!-- Verkaufsprozess -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verkaufsprozess bei Terminabwicklung</h3>
        
        <p>In den Notizen steht die Reihenfolge teilweise durcheinander. Sortiert sieht der Verkaufsprozess ungefähr so aus:</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin-bottom: 1.5rem;">
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">1.</span>
                <span style="font-size: 0.9rem; ">Kundenanfrage</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">2.</span>
                <span style="font-size: 0.9rem; ">Angebot</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">3.</span>
                <span style="font-size: 0.9rem; ">Kundenauftrag / Terminauftrag</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">4.</span>
                <span style="font-size: 0.9rem; ">Verfügbarkeitsprüfung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">5.</span>
                <span style="font-size: 0.9rem; ">Lieferung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">6.</span>
                <span style="font-size: 0.9rem; ">Kommissionierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">7.</span>
                <span style="font-size: 0.9rem; ">Transport</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">8.</span>
                <span style="font-size: 0.9rem; ">Warenausgang</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">9.</span>
                <span style="font-size: 0.9rem; ">Fakturierung</span>
            </div>
            <div class="lesson-step">
                <span style="font-weight: 800; color: #f59e0b; font-size: 1rem; width: 1.5rem;">10.</span>
                <span style="font-size: 0.9rem; ">Zahlungsabwicklung</span>
            </div>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Wichtig:</strong> Die ursprünglich notierte Reihenfolge war teilweise falsch. Für die Prüfung sollte die logische Prozesskette verstanden werden.
        </div>
    </div>

    <!-- Verfügbarkeitsprüfung -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Verfügbarkeitsprüfung und Teillieferung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Warum hängt das Ergebnis der Verfügbarkeitsprüfung unter Umständen von der Vereinbarung zur Teillieferung ab?</p>
        
        <div class="lesson-step">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Antwort:</p>
            <p>Die Verfügbarkeitsprüfung ermittelt zunächst technisch, wann welche Menge verfügbar ist. Die Teillieferungsvereinbarung entscheidet dann, wie SAP mit einer Unterdeckung umgehen darf.</p>
            <p>Das bedeutet: Wenn nicht genug Ware vorhanden ist, bestimmt die Teillieferungsvereinbarung, ob:</p>
            <ul style="list-style: none; padding: 0; margin: 0.5rem 0 0 0; font-size: 0.95rem; line-height: 1.6;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> eine Teillieferung erlaubt ist</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> nur vollständig geliefert werden darf</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> mehrere Lieferungen möglich sind</li>
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #f59e0b;">•</span> der Auftrag komplett zurückgestellt werden muss</li>
            </ul>
        </div>
        
        <div class="lesson-merksatz">
            <strong>Merksatz:</strong><br>
            Die Verfügbarkeitsprüfung sagt, was wann verfügbar ist.<br>
            Die Teillieferungsvereinbarung sagt, was dem Kunden angeboten oder geliefert werden darf.
        </div>
    </div>

    <!-- Fertigung / Produktion -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Fertigung / Produktion</h2>
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">SAP R/3 Stammdaten mit Bezug zur Fertigung</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> Welche Elemente gehören in SAP R/3 zu den Stammdaten, die sich auf die Fertigung beziehen?</p>
        
        <div class="lesson-success-box">
            <span style="display: block; color: #34d399; font-weight: 700; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 0.5rem;">Richtige Antworten:</span>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Arbeitsplatz</span>
                <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 0.25rem 0.6rem; border-radius: 6px; font-weight: 700; font-size: 0.9rem;">Stückliste</span>
            </div>
        </div>
        
        <p>Nicht passend bzw. eher keine Fertigungsstammdaten: Umlagerung, Produktkostensammler</p>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Arbeitsplatz</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Ein Arbeitsplatz beschreibt, wo ein Arbeitsvorgang ausgeführt wird.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiele: Maschine, Fertigungslinie, Arbeitsplatzgruppe, manuelle Arbeitsstation</span>
            </div>
            <div class="lesson-step">
                <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1rem; margin-bottom: 0.5rem;">Stückliste</span>
                <span style="font-size: 0.9rem; line-height: 1.5; display: block; margin-bottom: 0.5rem;">Eine Stückliste beschreibt, aus welchen Komponenten ein Produkt besteht.</span>
                <span style="font-size: 0.85rem; color: #a78bfa; font-weight: 600;">Beispiel: Ein Fahrrad besteht aus: Rahmen, Rädern, Lenker, Sattel, Schrauben</span>
            </div>
        </div>
    </div>

    <!-- Materialbewertung -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Materialbewertung</h2>
    
    <!-- Bewertung gelagerter Materialien -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Bewertung gelagerter Materialien</h3>
        <p>Die Bewertung gelagerter Materialien betrifft den Warenwert bzw. den Wert des Lagerbestands.</p>
        
        <p style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.75rem;">In SAP gibt es insbesondere folgende Bewertungsverfahren:</p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <span class="lesson-badge">S-Preis = Standardpreis</span>
            <span class="lesson-badge">V-Preis = gleitender Durchschnittspreis</span>
        </div>
    </div>

    <!-- Standardpreis und gleitender Durchschnittspreis -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Standardpreis und gleitender Durchschnittspreis</h3>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">S-Preis / Standardpreis</span>
            <p>Der Standardpreis ist ein fester Preis. Er wird verwendet, wenn Wareneingänge stets zu einem festen Preis gebucht werden sollen. Preisabweichungen werden separat gebucht.</p>
            
            <p><strong>Frage:</strong> Welches Verfahren ist anzuwenden, wenn Wareneingänge stets zu einem festen Preis gebucht werden und Abweichungen separat gebucht werden?</p>
            <p style="color: #34d399; font-weight: 700; font-size: 0.95rem; margin: 0;">Antwort: S-Preis / Standardpreis</p>
        </div>
        
        <div class="lesson-step">
            <span style="display: block; color: #f59e0b; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.5rem;">V-Preis / gleitender Durchschnittspreis</span>
            <p>Beim gleitenden Durchschnittspreis verändert sich der Materialpreis durch neue Wareneingänge. Der Durchschnittspreis wird bei neuen Beständen und neuen Einkaufspreisen angepasst.</p>
        </div>
    </div>

    <!-- Sicht im Materialstammsatz -->
    <div class="lesson-card">
        <h3 style="font-weight: 700; font-size: 1.25rem; margin-top: 0; margin-bottom: 1rem;">Sicht im Materialstammsatz für Bewertungsverfahren</h3>
        
        <p><strong style="color: #f59e0b;">Frage:</strong> In welcher Sicht des Materialstammsatzes werden die Bewertungsverfahren für Materialien festgelegt?</p>
        
        <div class="lesson-success-box">
            <p><strong style="color: #34d399;">Antwort:</strong></p>
            <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> Buchhaltungssicht</li>
                <li style="display: flex; align-items: center; gap: 0.5rem;"><span style="color: var(--color-success);">✓</span> genauer: Buchhaltung 1</li>
            </ul>
        </div>
    </div>

    <!-- Kompakte Fragen-und-Antworten-Liste -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Kompakte Fragen-und-Antworten-Liste</h2>
    <div class="lesson-card">
        
        <!-- QA Item 1 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Planung: Wie ist die richtige Reihenfolge der Planungsschritte?</p>
            <p>Programmplanung → Absatz- und Produktionsplanung → Kapazitätsplanung → Materialbedarfsplanung</p>
        </div>
        
        <!-- QA Item 2 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Lagerfertigung: Was ist die Grundlage bei der Lagerfertigung?</p>
            <p>Planprimärbedarf, Absatzprognose und Lagerbestand</p>
        </div>
        
        <!-- QA Item 3 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konsignation: Was unterscheidet Lieferantenkonsignation von normaler Beschaffung?</p>
            <p>Die Ware liegt im eigenen Lager, gehört aber bis zur Entnahme dem Lieferanten. Erst bei Entnahme wird sie dem Unternehmen zugerechnet bzw. abgerechnet.</p>
        </div>
        
        <!-- QA Item 4 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">CPD-Lieferant: Was ist ein CPD-Lieferant?</p>
            <p>Ein Einmallieferant bzw. Sammelstammsatz für verschiedene selten genutzte Lieferanten.</p>
        </div>
        
        <!-- QA Item 5 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsprozess: Bildet der eingehende Kundenauftrag die Grundlage für Bedarfsermittlung und nachgelagerte Produktionsprozesse?</p>
            <p>Ja, das ist richtig.</p>
        </div>
        
        <!-- QA Item 6 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Rollenbasiertes System: Was bedeutet rollenbasiert in SAP?</p>
            <p>Benutzer erhalten Berechtigungen entsprechend ihrer Rolle im Unternehmen.</p>
        </div>
        
        <!-- QA Item 7 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialstammdaten: Welche Optionen gibt es bei der Pflege von Materialstammdaten?</p>
            <p>- Vorlage Material, - Massenpflege, - Sammelpflege von Teilbereichen</p>
        </div>
        
        <!-- QA Item 8 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Organisationselemente: Bilden Organisationselemente die rechtliche und betriebswirtschaftliche Struktur ab?</p>
            <p>Ja, richtig.</p>
        </div>
        
        <!-- QA Item 9 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Mahnlauf: Wie läuft ein Mahnverfahren ab?</p>
            <p>Parameter pflegen → Mahnverfahren einplanen → Planlauf beenden → starten</p>
        </div>
        
        <!-- QA Item 10 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Beleg: Welcher Begriff beschreibt einen elektronischen Datensatz eines Geschäftsvorfalls?</p>
            <p>Beleg</p>
        </div>
        
        <!-- QA Item 11 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Infosatz: Welche Möglichkeiten bietet SAP beim Bilden von Infosätzen?</p>
            <p>- Manuelle Anlage, - Update aus Bestellung, - Update aus Angebot, - Update aus Rahmenvertrag</p>
        </div>
        
        <!-- QA Item 12 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Konten: Welche Konten gibt es in SAP?</p>
            <p>- Sachkonten, - Kreditoren, - Debitoren</p>
        </div>
        
        <!-- QA Item 13 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Controlling: Welche Objekte sind Organisationseinheiten im SAP Controlling?</p>
            <p>- Kostenrechnungskreis, - Ergebnisbereich</p>
        </div>
        
        <!-- QA Item 14 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Verkaufsprozess: Wie ist der Verkaufsprozess bei Terminabwicklung sortiert?</p>
            <p>Kundenanfrage → Angebot → Auftrag → Verfügbarkeitsprüfung → Lieferung → Kommissionierung → Transport → Warenausgang → Fakturierung → Zahlungsabwicklung</p>
        </div>
        
        <!-- QA Item 15 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Teillieferung: Warum hängt das Ergebnis der Verfügbarkeitsprüfung von der Teillieferungsvereinbarung ab?</p>
            <p>Weil SAP dadurch weiß, ob Unterdeckungen durch Teillieferungen erlaubt sind oder ob nur vollständig geliefert werden darf.</p>
        </div>
        
        <!-- QA Item 16 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Buchungskreis: Was ist ein Buchungskreis?</p>
            <p>Die kleinste organisatorische Einheit der Finanzbuchhaltung, für die eine vollständige Buchführung und Bilanzierung möglich ist.</p>
        </div>
        
        <!-- QA Item 17 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Fertigungsstammdaten: Welche Stammdaten beziehen sich auf Fertigung?</p>
            <p>- Arbeitsplatz, - Stückliste</p>
        </div>
        
        <!-- QA Item 18 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Materialbewertung: Welche Bewertungsverfahren gibt es?</p>
            <p>- Standardpreis, - gleitender Durchschnittspreis</p>
        </div>
        
        <!-- QA Item 19 -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 1rem; margin-bottom: 1rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Standardpreis: Welches Verfahren wird genutzt, wenn Wareneingänge zu festem Preis gebucht und Abweichungen separat gebucht werden?</p>
            <p>Standardpreis / S-Preis</p>
        </div>
        
        <!-- QA Item 20 -->
        <div style="padding-bottom: 0.5rem;">
            <p style="font-weight: 700; font-size: 0.95rem; margin-top: 0; margin-bottom: 0.5rem;">Bewertungssicht: In welcher Sicht wird das Bewertungsverfahren festgelegt?</p>
            <p>In der Buchhaltungssicht, insbesondere Buchhaltung 1.</p>
        </div>
    </div>

    <!-- Begriffe zum Lernen -->
    <h2 style="border-left: 4px solid var(--color-warning); padding-left: 1rem;">Begriffe zum Lernen</h2>
    <div class="lesson-card">
        <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Programmplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung des Produktions- bzw. Absatzprogramms.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Absatz- und Produktionsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Planung von Absatzmengen und Produktionsmengen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kapazitätsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prüfung, ob genügend Maschinen, Arbeitsplätze und Personal verfügbar sind.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialbedarfsplanung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ermittlung benötigter Materialien.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Lagerfertigung</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Produktion auf Lager, nicht direkt auf Kundenauftrag.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Planprimärbedarf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Geplanter Bedarf für zukünftige Produktion.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Konsignation</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ware liegt beim Unternehmen, gehört aber bis zur Entnahme dem Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">CPD-Lieferant</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einmallieferant / Sammelstammsatz für seltene Lieferanten.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Rollenbasiert</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zugriff abhängig von Benutzerrolle und Berechtigungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Materialstamm</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Zentrale Stammdaten zu einem Material.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Organisationselement</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Bildet Unternehmensstruktur in SAP ab.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Rechtlich selbstständige Einheit der Finanzbuchhaltung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Mahnlauf</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Prozess zur Erstellung von Mahnungen.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Beleg</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Elektronischer Nachweis eines Geschäftsvorfalls.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Infosatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Einkaufsstammdatum zu Material-Lieferanten-Beziehung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kreditor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Lieferant.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Debitor</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Kunde.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Sachkonto</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Konto im Hauptbuch.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Kostenrechnungskreis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit im Controlling.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Ergebnisbereich</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Organisationseinheit für Ergebnisrechnung.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Arbeitsplatz</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Ort oder Ressource, an der Fertigung stattfindet.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Stückliste</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Liste der Bestandteile eines Produkts.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">S-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Standardpreis.</span>
            </div>
            
            <div style="border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.75rem;">
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">V-Preis</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Gleitender Durchschnittspreis.</span>
            </div>
            
            <div>
                <strong style="color: #f59e0b; font-size: 1rem; display: block; margin-bottom: 0.25rem;">Buchhaltung 1</strong>
                <span style="font-size: 0.9rem; line-height: 1.5;">Materialstammsicht für Bewertung.</span>
            </div>
            
        </div>
    </div>
</div>';