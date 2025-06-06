# Web-basiertes Lernprogramm – Phil Beck

Die Lernapp ist unter [www.informatik.htw-dresden.de/~s83754/Lernprogramm/](https://www.informatik.htw-dresden.de/~s83754/Lernprogramm/) aufrufbar.

## Erfüllte Aufgaben laut Bewertungsstufen

| Bewertungsstufe | Beschreibung                                    | Erfüllt |
|------------------|--------------------------------------------------|:-------:|
| **4**            | Programm funktioniert mit internen Aufgaben      | ✅      |
| **3**            | Externer Aufgabenserver funktionsfähig           | ✅      |
| **2**            | Kategorie Notenlernen integriert                 | ❌      |
| **1**            | Piano-Keyboard integriert                        | ❌      |

---

## Nutzungshinweis

Die Anwendung funktioniert **nicht bei direktem Öffnen der `index.html`-Datei**, da moderne Browser lokale Datei-Zugriffe (z. B. Service Worker, Fetch, KaTeX-Fonts) blockieren.
Hinweis: Um externe Mathe-Fragen vom Aufgabenserver der HTW Dresden zu laden (Online-Modus), musst du mit dem VPN der HTW Dresden verbunden sein. 
Zudem kann es 10-20s dauern bis das online Quiz startet, da erst 10 verschiedene Fragen gefunden werden müssen.

### So startest du die Anwendung korrekt:

1. Projekt herunterladen oder klonen
2. Terminal öffnen
3. Lokalen Webserver starten, z. B.:

```bash
# Variante mit Node.js
npx serve
```

4. Im Browser http://localhost:3000 aufrufen

### Anwendung starten in Visual Studio Code

Durch die Erweiterung Live Server möglich


## Getestete Browser

- Google Chrome (aktuelle Version)
- Mozilla Firefox: Diese Anwendung ist mit Firefox nur eingeschränkt oder gar nicht nutzbar – insbesondere funktionieren Offline-Modus, mathematische Darstellung (KaTeX-Fonts) und PWA-Installation nicht korrekt.
- Safari (aktuelle Version)


## Mögliche Verbesserungen

- Erweiterung von Kategorien Notenlernen
- Piano-Keyboard integrieren
- Statisik für falsche fragen (Detailierte Statistiken)
- Internettechnologien und Allgemein online fragen hinzufügen

## Quellen und Hilfsmittel

- Skripte, Übungen sowie Hinweise aus IT, Stack Overflow, ChatGPT


