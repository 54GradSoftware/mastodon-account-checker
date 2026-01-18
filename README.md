# Mastodon Profile Checker

Ein Tool zur Überprüfung und Bewertung von Mastodon-Profilen basierend auf ausgefüllten Feldern.

## Funktionen

- Lädt Mastodon-Profile anhand von Benutzername und Server
- Bewertet Profile nach Vollständigkeit (Avatar, Header, Bio, etc.)
- Zeigt einen Score für die Profilqualität an

## Scoring-Tabelle

| Kriterium | Punkte | Beschreibung |
|-----------|--------|--------------|
| Display Name | 10 | Anzeigename ist gesetzt |
| Bio (Note) | 20 | Profilbeschreibung ist ausgefüllt |
| Verifizierte Felder | 20 | Mindestens ein verifizierter Link |
| Discoverable | 20 | Profil ist für Suche freigegeben |
| Indexable | 20 | Profil ist für Indexierung freigegeben |
| Angepinnte Posts | 10 | Mindestens ein angepinnter Beitrag |
| **Gesamt** | **100** | |

## Tech-Stack

**Frontend:**
- Vue 3
- PrimeVue
- Vite

**Backend:**
- Node.js / Express
- Axios

## Installation

```bash
# Backend
cd server
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```


## Lizenz
Die komplette Software steht unter [der MIT-Lizenz](/LICENSE).

## 54 Grad Software GmbH
Wir freuen uns immer über neue Kontakte und Projekt(ideen). Mehr Infos zu findest du auf unserer [Website](https://www.54gradsoftware.de/) oder schreib uns direkt an kontakt@54gradsoftware.de. Mann kann uns auch auf Mastodon folgen [54gradsoftware@norden.social](https://norden.social/@54gradsoftware).