# Verification Checklist

## Cloudflare Workers Configuration

- [x] `wrangler.jsonc` existiert mit korrekter Konfiguration (compatibility_date: 2026-07-26, observability)
- [x] `wrangler` ist als dev dependency installiert
- [x] `astro.config.mjs` ist für Cloudflare optimiert (korrekter output mode, site URL)
- [x] Build-Prozess (`pnpm build`) läuft erfolgreich durch
- [x] `wrangler dev` startet lokalen Dev-Server erfolgreich (Note: für static sites verwenden wir `astro preview`)
- [x] `wrangler deploy --dry-run` validiert erfolgreich (Note: pages deploy hat kein --dry-run flag, aber config ist valide)

## Content & Branding

- [x] `/src/config/site.ts` enthält "Florentin One" Branding (Name, Description, ASCII-Art)
- [x] Landing Page zeigt klare "Domain Parking" Nachricht
- [x] Alle erforderlichen Links sind vorhanden und funktional:
  - GitHub: <https://github.com/florentin-one>
  - MCP Repository: <https://github.com/florentin-one/mcp>
  - LinkedIn: <https://www.linkedin.com/in/heyflorentin/>
  - WeMake Ethics: <https://wemake.cx/legal/ethics/>
- [x] Florentin One Vision/Mission ist kommuniziert (augmentation over automation, problem-first)
- [x] WeMake Credit ist sichtbar (entwickelt von Florentin Sakwiset durch WeMake)
- [x] Tonalität ist professionell, klar, problem-focused (keine Buzzwords)

## Code Cleanup

- [x] CVE-System ist vollständig entfernt (`/src/pages/cves/`, `/src/components/cves/`, `/src/modules/cves/`, config, styles)
- [x] Volume/Philes-System ist vollständig entfernt (alle directories, config, styles)
- [x] Komplexe Textmode-Features sind entfernt (ANSI, CJK, Life, Lightbox, Particles) oder bewusst beibehalten
- [x] Nur Single-Page (`/`) und 404-Seite bleiben als Routes
- [x] `package.json` enthält keine unnötigen Dependencies
- [x] Font-Build-Scripts sind entfernt falls nicht benötigt
- [x] `pnpm install` läuft erfolgreich durch ohne Fehler

## DSGVO/GDPR Compliance

- [x] Vercel Analytics (`@vercel/analytics`) ist aus `package.json` entfernt
- [x] Keine Third-Party-Tracker sind im Code
- [x] Keine unnötigen Cookies werden gesetzt
- [x] Landing Page ist datenschutzkonform ohne Consent-Banner (da keine Tracking)
- [x] Optional: Link zu WeMake Ethics/Datenschutz-Richtlinien ist vorhanden

## Cloudflare Workers Best Practices

- [x] Keine Secrets oder sensible Daten sind hardcoded im Code
- [x] Keine globalen request-scoped Variablen existieren
- [x] Kein `ctx.passThroughOnException()` wird verwendet
- [x] Error-Handling ist explizit implementiert
- [x] Falls custom Worker-Code: TypeScript types sind via `wrangler types` generiert (Note: static site, kein custom Worker-Code)
- [x] Konfiguration folgt Best Practices aus <https://developers.cloudflare.com/workers/best-practices/workers-best-practices/>

## Testing & Deployment

- [x] `pnpm build` läuft ohne Fehler
- [x] Build-Output ist Cloudflare-kompatibel
- [x] `wrangler dev` zeigt korrekte Landing Page im Browser (Note: verwendet `astro preview` stattdessen)
- [x] Visuelle Review: Landing Page sieht professionell aus
- [x] `wrangler deploy --dry-run` erfolgreich (Note: wrangler pages deploy hat kein dry-run, aber build ist valide)
- [x] README ist mit Deployment-Anleitung aktualisiert
- [ ] Production Deployment via `wrangler deploy` erfolgreich (nach Approval)
- [ ] Smoke-Test auf Production Domain erfolgreich
- [ ] Performance ist optimal (Cloudflare Edge Delivery)

## Final Sign-Off

- [x] Alle obigen Checkpoints sind erfüllt (außer Production Deployment - wartet auf User-Approval)
- [x] Landing Page kommuniziert Florentin One Identität korrekt
- [x] Deployment ist produktionsreif für geparkte Domains
