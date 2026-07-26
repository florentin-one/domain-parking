# Tasks

## Phase 1: Cloudflare Workers Setup & Configuration

- [ ] Task 1: Install und konfiguriere Cloudflare Workers Tooling
  - [ ] SubTask 1.1: Installiere `wrangler` als dev dependency (`npm install -D wrangler@latest`)
  - [ ] SubTask 1.2: Überprüfe, ob `@astrojs/cloudflare` Adapter benötigt wird (für static site optional)
  - [ ] SubTask 1.3: Erstelle `wrangler.jsonc` mit korrekter Konfiguration:
    - `compatibility_date: "2026-07-26"`
    - `nodejs_compat` flag falls benötigt
    - Observability settings
    - Korrekte Build-Output-Pfade

- [ ] Task 2: Konfiguriere Astro für Cloudflare Deployment
  - [ ] SubTask 2.1: Update `astro.config.mjs` mit Cloudflare-optimierten Settings
  - [ ] SubTask 2.2: Setze korrekten `output` mode (`static` für reine static site)
  - [ ] SubTask 2.3: Konfiguriere Asset-Handling für Cloudflare CDN
  - [ ] SubTask 2.4: Update `package.json` scripts für `wrangler deploy`

- [ ] Task 3: Hole aktuelle Cloudflare Workers Best Practices
  - [ ] SubTask 3.1: Fetch `https://developers.cloudflare.com/workers/best-practices/workers-best-practices/`
  - [ ] SubTask 3.2: Review Best Practices für Static Site Hosting
  - [ ] SubTask 3.3: Validiere Konfiguration gegen Best Practices

## Phase 2: Content & Branding

- [ ] Task 4: Rebrand Site Configuration
  - [ ] SubTask 4.1: Update `/src/config/site.ts` mit Florentin One Branding:
    - Name: "Florentin One"
    - Description: Problem-first messaging (basierend auf FLORENTIN-ONE.md)
    - ASCII-Art: "Florentin One" oder passende Alternative
  - [ ] SubTask 4.2: Definiere Home Sections:
    - "About" – Vision und Mission von Florentin One
    - "Resources" – Links zu GitHub, MCP, LinkedIn, WeMake Ethics
    - "Status" – Domain Parking Nachricht
    - Optional: "Contact" oder "Coming Soon"

- [ ] Task 5: Vereinfache Landing Page
  - [ ] SubTask 5.1: Update `/src/pages/index.astro` – entferne Volume-Dependencies
  - [ ] SubTask 5.2: Update `/src/components/home/HomeScreen.astro` – statische Content-Darstellung
  - [ ] SubTask 5.3: Implementiere klare "Domain Parking" Message
  - [ ] SubTask 5.4: Integriere Links zu allen Ressourcen:
    - <https://github.com/florentin-one>
    - <https://github.com/florentin-one/mcp>
    - <https://www.linkedin.com/in/heyflorentin/>
    - <https://wemake.cx/legal/ethics/>
    - Referenz auf WeMake (entwickelt von Florentin Sakwiset)

## Phase 3: Code Cleanup & Simplification

- [ ] Task 6: Entferne unnötige Features
  - [ ] SubTask 6.1: Entferne CVE-System:
    - `/src/pages/cves/` directory
    - `/src/components/cves/` directory
    - `/src/modules/cves/` directory
    - `/src/config/cves.ts`
    - `/src/styles/modules/cves.css`
  - [ ] SubTask 6.2: Entferne Volume/Philes-System:
    - `/src/pages/volume/` directory
    - `/src/components/volume/` directory
    - `/src/components/phile/` directory
    - `/src/modules/philes/` directory
    - `/src/modules/volumes/` directory
    - `/src/content/philes/` directory
    - `/src/config/volumes.ts`
    - `/src/styles/modules/phile.css`
  - [ ] SubTask 6.3: Entferne komplexe Textmode-Features (optional anpassbar):
    - `/src/modules/textmode/ansi/` (ANSI-Rendering)
    - `/src/modules/textmode/cjk/` (CJK-Atlas)
    - `/src/modules/textmode/life/` (Game of Life)
    - `/src/modules/textmode/lightbox/`
    - `/src/modules/textmode/particles/`
    - Entsprechende CSS-Dateien
  - [ ] SubTask 6.4: Behalte und vereinfache:
    - Base Layout (TextmodeLayout oder vereinfacht)
    - Basis-Styling (tokens.css, base.css, responsive.css)
    - 404-Seite (optional angepasst)

- [ ] Task 7: Cleanup Dependencies
  - [ ] SubTask 7.1: Review `package.json` – entferne nicht benötigte dependencies
  - [ ] SubTask 7.2: Entferne Font-Build-Scripts falls nicht benötigt
  - [ ] SubTask 7.3: Update `pnpm-lock.yaml` via `pnpm install`

## Phase 4: DSGVO/GDPR Compliance & Security

- [ ] Task 8: Datenschutz-Compliance sicherstellen
  - [ ] SubTask 8.1: Entferne Vercel Analytics (`@vercel/analytics` aus package.json)
  - [ ] SubTask 8.2: Validiere: keine Third-Party-Tracker
  - [ ] SubTask 8.3: Validiere: keine unnötigen Cookies
  - [ ] SubTask 8.4: Optional: Link zu WeMake Ethics/Datenschutz in Footer

- [ ] Task 9: Sicherheits-Review nach Cloudflare Best Practices
  - [ ] SubTask 9.1: Stelle sicher: keine Secrets im Code
  - [ ] SubTask 9.2: Review: korrekte Error-Handling (kein passThroughOnException)
  - [ ] SubTask 9.3: Review: keine global request state
  - [ ] SubTask 9.4: Falls custom Worker-Code: TypeScript types via `wrangler types`

## Phase 5: Testing & Deployment

- [ ] Task 10: Lokales Testing
  - [ ] SubTask 10.1: Test `pnpm build` – validiere erfolgreichen Build
  - [ ] SubTask 10.2: Test `wrangler dev` – lokale Preview
  - [ ] SubTask 10.3: Test `wrangler deploy --dry-run` – Deployment-Validierung
  - [ ] SubTask 10.4: Visuelles Review der Landing Page

- [ ] Task 11: Dokumentation
  - [ ] SubTask 11.1: Update README mit Deployment-Anleitung
  - [ ] SubTask 11.2: Dokumentiere wrangler-Commands für Team
  - [ ] SubTask 11.3: Optional: Deployment-Workflow für CI/CD (GitHub Actions)

- [ ] Task 12: Production Deployment
  - [ ] SubTask 12.1: `wrangler deploy` zu Cloudflare
  - [ ] SubTask 12.2: Domain-Konfiguration (DNS) für geparkte Domains
  - [ ] SubTask 12.3: Smoke-Test: Seite auf Production Domain abrufen
  - [ ] SubTask 12.4: Performance-Check über Cloudflare Analytics

# Task Dependencies

- Task 2 depends on Task 1 (Wrangler muss installiert sein)
- Task 3 can run parallel to Task 2
- Task 4, 5 can run parallel nach Task 1-2
- Task 6, 7 können parallel nach Task 4-5 laufen
- Task 8, 9 können parallel nach Task 6-7 laufen
- Task 10 depends on Task 1-9 (alle vorherigen Tasks müssen abgeschlossen sein)
- Task 11 kann parallel zu Task 10 laufen
- Task 12 depends on Task 10 (erfolgreiches lokales Testing)
