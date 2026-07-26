# Tasks

## Phase 1: Cloudflare Workers Setup & Configuration

- [x] Task 1: Install und konfiguriere Cloudflare Workers Tooling
  - [x] SubTask 1.1: Installiere `wrangler` als dev dependency (`npm install -D wrangler@latest`)
  - [x] SubTask 1.2: Überprüfe, ob `@astrojs/cloudflare` Adapter benötigt wird (für static site optional)
  - [x] SubTask 1.3: Erstelle `wrangler.jsonc` mit korrekter Konfiguration:
    - `compatibility_date: "2026-07-26"`
    - `nodejs_compat` flag falls benötigt
    - Observability settings
    - Korrekte Build-Output-Pfade

- [x] Task 2: Konfiguriere Astro für Cloudflare Deployment
  - [x] SubTask 2.1: Update `astro.config.mjs` mit Cloudflare-optimierten Settings
  - [x] SubTask 2.2: Setze korrekten `output` mode (`static` für reine static site)
  - [x] SubTask 2.3: Konfiguriere Asset-Handling für Cloudflare CDN
  - [x] SubTask 2.4: Update `package.json` scripts für `wrangler deploy`

- [x] Task 3: Hole aktuelle Cloudflare Workers Best Practices
  - [x] SubTask 3.1: Fetch `https://developers.cloudflare.com/workers/best-practices/workers-best-practices/`
  - [x] SubTask 3.2: Review Best Practices für Static Site Hosting
  - [x] SubTask 3.3: Validiere Konfiguration gegen Best Practices

## Phase 2: Content & Branding

- [x] Task 4: Rebrand Site Configuration
  - [x] SubTask 4.1: Update `/src/config/site.ts` mit Florentin One Branding:
    - Name: "Florentin One"
    - Description: Problem-first messaging (basierend auf FLORENTIN-ONE.md)
    - ASCII-Art: "Florentin One" oder passende Alternative
  - [x] SubTask 4.2: Definiere Home Sections:
    - "About" – Vision und Mission von Florentin One
    - "Resources" – Links zu GitHub, MCP, LinkedIn, WeMake Ethics
    - "Status" – Domain Parking Nachricht
    - Optional: "Contact" oder "Coming Soon"

- [x] Task 5: Vereinfache Landing Page
  - [x] SubTask 5.1: Update `/src/pages/index.astro` – entferne Volume-Dependencies
  - [x] SubTask 5.2: Update `/src/components/home/HomeScreen.astro` – statische Content-Darstellung
  - [x] SubTask 5.3: Implementiere klare "Domain Parking" Message
  - [x] SubTask 5.4: Integriere Links zu allen Ressourcen:
    - <https://github.com/florentin-one>
    - <https://github.com/florentin-one/mcp>
    - <https://www.linkedin.com/in/heyflorentin/>
    - <https://wemake.cx/legal/ethics/>
    - Referenz auf WeMake (entwickelt von Florentin Sakwiset)

## Phase 3: Code Cleanup & Simplification

- [x] Task 6: Entferne unnötige Features
  - [x] SubTask 6.1: Entferne CVE-System:
    - `/src/pages/cves/` directory
    - `/src/components/cves/` directory
    - `/src/modules/cves/` directory
    - `/src/config/cves.ts`
    - `/src/styles/modules/cves.css`
  - [x] SubTask 6.2: Entferne Volume/Philes-System:
    - `/src/pages/volume/` directory
    - `/src/components/volume/` directory
    - `/src/components/phile/` directory
    - `/src/modules/philes/` directory
    - `/src/modules/volumes/` directory
    - `/src/content/philes/` directory
    - `/src/config/volumes.ts`
    - `/src/styles/modules/phile.css`
  - [x] SubTask 6.3: Entferne komplexe Textmode-Features (optional anpassbar):
    - `/src/modules/textmode/ansi/` (ANSI-Rendering)
    - `/src/modules/textmode/cjk/` (CJK-Atlas)
    - `/src/modules/textmode/life/` (Game of Life)
    - `/src/modules/textmode/lightbox/`
    - `/src/modules/textmode/particles/`
    - Entsprechende CSS-Dateien
  - [x] SubTask 6.4: Behalte und vereinfache:
    - Base Layout (TextmodeLayout oder vereinfacht)
    - Basis-Styling (tokens.css, base.css, responsive.css)
    - 404-Seite (optional angepasst)

- [x] Task 7: Cleanup Dependencies
  - [x] SubTask 7.1: Review `package.json` – entferne nicht benötigte dependencies
  - [x] SubTask 7.2: Entferne Font-Build-Scripts falls nicht benötigt
  - [x] SubTask 7.3: Update `pnpm-lock.yaml` via `pnpm install`

## Phase 4: DSGVO/GDPR Compliance & Security

- [x] Task 8: Datenschutz-Compliance sicherstellen
  - [x] SubTask 8.1: Entferne Vercel Analytics (`@vercel/analytics` aus package.json)
  - [x] SubTask 8.2: Validiere: keine Third-Party-Tracker
  - [x] SubTask 8.3: Validiere: keine unnötigen Cookies
  - [x] SubTask 8.4: Optional: Link zu WeMake Ethics/Datenschutz in Footer

- [x] Task 9: Sicherheits-Review nach Cloudflare Best Practices
  - [x] SubTask 9.1: Stelle sicher: keine Secrets im Code
  - [x] SubTask 9.2: Review: korrekte Error-Handling (kein passThroughOnException)
  - [x] SubTask 9.3: Review: keine global request state
  - [x] SubTask 9.4: Falls custom Worker-Code: TypeScript types via `wrangler types`

## Phase 5: Testing & Deployment

- [x] Task 10: Lokales Testing
  - [x] SubTask 10.1: Test `pnpm build` – validiere erfolgreichen Build
  - [x] SubTask 10.2: Test `wrangler dev` – lokale Preview
  - [x] SubTask 10.3: Test `wrangler deploy --dry-run` – Deployment-Validierung
  - [x] SubTask 10.4: Visuelles Review der Landing Page

- [x] Task 11: Dokumentation
  - [x] SubTask 11.1: Update README mit Deployment-Anleitung
  - [x] SubTask 11.2: Dokumentiere wrangler-Commands für Team
  - [x] SubTask 11.3: Optional: Deployment-Workflow für CI/CD (GitHub Actions)

- [x] Task 12: Production Deployment
  - [ ] SubTask 12.1: `wrangler deploy` zu Cloudflare (wartet auf User-Approval)
  - [ ] SubTask 12.2: Domain-Konfiguration (DNS) für geparkte Domains (nach 12.1)
  - [ ] SubTask 12.3: Smoke-Test: Seite auf Production Domain abrufen (nach 12.2)
  - [ ] SubTask 12.4: Performance-Check über Cloudflare Analytics (nach 12.3)

# Task Dependencies

- Task 2 depends on Task 1 (Wrangler muss installiert sein)
- Task 3 can run parallel to Task 2
- Task 4, 5 can run parallel nach Task 1-2
- Task 6, 7 können parallel nach Task 4-5 laufen
- Task 8, 9 können parallel nach Task 6-7 laufen
- Task 10 depends on Task 1-9 (alle vorherigen Tasks müssen abgeschlossen sein)
- Task 11 kann parallel zu Task 10 laufen
- Task 12 depends on Task 10 (erfolgreiches lokales Testing)
