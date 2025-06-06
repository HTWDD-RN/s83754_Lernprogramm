# Lernprogramm IT-Beleg

## Projektziel

Entwicklung eines webbasierten Lernprogramms, das Quizfragen zu verschiedenen Themenbereichen (Mathematik, Internettechnologien, Allgemeinwissen) bereitstellt. Die Anwendung ist lokal und optional mit einem externen Aufgabenserver nutzbar.

## Erfüllte Aufgaben laut Belegbeschreibung

- Interaktives Quiz mit Auswertung und Fortschrittsanzeige
- Laden von Fragen aus einer lokalen JSON-Datei
- Option zum Umschalten auf externen Aufgabenserver (nur Mathe-Fragen)
- Nutzung eines MVC-ähnlichen Aufbaus mit `QuizModel`, `QuizView`, `QuizPresenter`
- Mobile-optimiertes Layout (Responsive Design mit CSS)
- Offline-Unterstützung über Service Worker
- Mathematische Darstellung mit KaTeX
- Kategorien: Allgemeinwissen, Mathe, Internettechnologien

## Nicht umgesetzte Erweiterungen (Bewertungsstufen)

- Bewertungsstufe 2: Notenlernen (nicht implementiert)
- Bewertungsstufe 1: Piano-Keyboard-Funktion (nicht implementiert)

## Technische Umsetzung

- HTML, CSS und JavaScript (Vanilla JS)
- KaTeX zur Anzeige mathematischer Formeln
- Service Worker zur Offline-Funktionalität
- JSON-Datei zur Verwaltung lokaler Quizdaten
- Klare Trennung in Model / View / Presenter

## Nutzungshinweis

Die Anwendung kann lokal gestartet werden, indem die Datei `index.html` im Browser geöffnet wird.  
Im linken Bereich kann der Nutzer eine Quiz-Kategorie (Allgemein, Mathe, Internettechnologien) sowie den Modus (Offline oder Online) auswählen.  
Bei Auswahl des Online-Modus werden Mathe-Fragen dynamisch vom Aufgabenserver der HTW Dresden geladen.  
Nach Beantwortung von 10 Fragen wird das Quiz automatisch beendet und das Ergebnis angezeigt.

## Getestete Browser

- Google Chrome (aktuelle Version)


## Probleme / Herausforderungen

- Zugriff auf den externen Aufgabenserver nur mit HTTP Basic Auth (fest im Code integriert)
- Begrenzung des Online-Modus auf Mathefragen
- Unvollständige oder unpassende externe Fragen – Filterung durch Schlagwortprüfung implementiert

## Quellen und Hilfsmittel

- Skripte, Übungen sowie Hinweise aus IT, Stack Overflow, ChatGPT



