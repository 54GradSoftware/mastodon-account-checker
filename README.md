# Mastodon Account Checker

Dieses Webtool überprüft Mastodon-Accounts basierend auf den Einstellungen des eingegebenen Accounts. Es gibt einen Gesamt-Score von 0 bis 100 sowie eine Scoring-Tabelle, die eine Übersicht der einzelnen Bewertungspunkte bietet.

## Funktionen

- Lädt Mastodon-Accounts anhand von Benutzername und Server
- Bewertet Accounts nach Vollständigkeit (Avatar, Header, Bio, etc.)
- Zeigt einen Score für die Profilqualität an

## Scoring-Tabelle

| Kriterium | Punkte | Beschreibung |
|-----------|--------|--------------|
| Anzeigename| 10 | Anzeigename ist gesetzt |
| Profilbeschreibung (Bio) | 20 | Profilbeschreibung ist ausgefüllt |
| Auffindbar - "Profil und Beiträge in Suchalgorithmen berücksichtigen" (Discoverable) | 20 | Profil ist für Suche freigegeben |
| Indexierbar - "Öffentliche Beiträge in die Suchergebnisse einbeziehen" | 20 | Profil ist für Indexierung freigegeben |
| Verifizierte Links | 20 | Mindestens ein verifizierter Link |
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
npm run start-server

# Frontend
cd frontend
npm install
npm run dev
```


## Lizenz
Die komplette Software steht unter [der MIT-Lizenz](/LICENSE).

## 54 Grad Software GmbH
Wir freuen uns immer über neue Kontakte und Projekt(ideen). Mehr Infos zu findest du auf unserer [Website](https://www.54gradsoftware.de/) oder schreib uns direkt an kontakt@54gradsoftware.de. Mann kann uns auch auf Mastodon folgen [54gradsoftware@norden.social](https://norden.social/@54gradsoftware).