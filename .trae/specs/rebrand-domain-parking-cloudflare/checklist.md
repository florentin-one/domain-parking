# Verification Checklist

## Cloudflare Workers Configuration

- [ ] `wrangler.jsonc` existiert mit korrekter Konfiguration (compatibility_date: 2026-07-26, observability)
- [ ] `wrangler` ist als dev dependency installiert
- [ ] `astro.config.mjs` ist für Cloudflare optimiert (korrekter output mode, site URL)
- [ ] Build-Prozess (`pnpm build`) läuft erfolgreich durch
- [ ] `wrangler dev` startet lokalen Dev-Server erfolgreich
- [ ] `wrangler deploy --dry-run` validiert erfolgreich

## Content & Branding

- [ ] `/src/config/site.ts` enthält "Florentin One" Branding (Name, Description, ASCII-Art)
- [ ] Landing Page zeigt klare "Domain Parking" Nachricht
- [ ] Alle erforderlichen Links sind vorhanden und funktional:
  - GitHub: <https://github.com/florentin-one>
  - MCP Repository: <https://github.com/florentin-one/mcp>
  - LinkedIn: <https://www.linkedin.com/in/heyflorentin/>
  - WeMake Ethics: <https://wemake.cx/legal/ethics/>
- [ ] Florentin One Vision/Mission ist kommuniziert (augmentation over automation, problem-first)
- [ ] WeMake Credit ist sichtbar (entwickelt von Florentin Sakwiset durch WeMake)
- [ ] Tonalität ist professionell, klar, problem-focused (keine Buzzwords)

## Code Cleanup

- [ ] CVE-System ist vollständig entfernt (`/src/pages/cves/`, `/src/components/cves/`, `/src/modules/cves/`, config, styles)
- [ ] Volume/Philes-System ist vollständig entfernt (alle directories, config, styles)
- [ ] Komplexe Textmode-Features sind entfernt (ANSI, CJK, Life, Lightbox, Particles) oder bewusst beibehalten
- [ ] Nur Single-Page (`/`) und 404-Seite bleiben als Routes
- [ ] `package.json` enthält keine unnötigen Dependencies
- [ ] Font-Build-Scripts sind entfernt falls nicht benötigt
- [ ] `pnpm install` läuft erfolgreich durch ohne Fehler

## DSGVO/GDPR Compliance

- [ ] Vercel Analytics (`@vercel/analytics`) ist aus `package.json` entfernt
- [ ] Keine Third-Party-Tracker sind im Code
- [ ] Keine unnötigen Cookies werden gesetzt
- [ ] Landing Page ist datenschutzkonform ohne Consent-Banner (da keine Tracking)
- [ ] Optional: Link zu WeMake Ethics/Datenschutz-Richtlinien ist vorhanden

## Cloudflare Workers Best Practices

- [ ] Keine Secrets oder sensible Daten sind hardcoded im Code
- [ ] Keine globalen request-scoped Variablen existieren
- [ ] Kein `ctx.passThroughOnException()` wird verwendet
- [ ] Error-Handling ist explizit implementiert
- [ ] Falls custom Worker-Code: TypeScript types sind via `wrangler types` generiert
- [ ] Konfiguration folgt Best Practices aus <https://developers.cloudflare.com/workers/best-practices/workers-best-practices/>

## Testing & Deployment

- [ ] `pnpm build` läuft ohne Fehler
- [ ] Build-Output ist Cloudflare-kompatibel
- [ ] `wrangler dev` zeigt korrekte Landing Page im Browser
- [ ] Visuelle Review: Landing Page sieht professionell aus
- [ ] `wrangler deploy --dry-run` erfolgreich
- [ ] README ist mit Deployment-Anleitung aktualisiert
- [ ] Production Deployment via `wrangler deploy` erfolgreich (nach Approval)
- [ ] Smoke-Test auf Production Domain erfolgreich
- [ ] Performance ist optimal (Cloudflare Edge Delivery)

## Final Sign-Off

- [ ] Alle obigen Checkpoints sind erfüllt
- [ ] Landing Page kommuniziert Florentin One Identität korrekt
- [ ] Deployment ist produktionsreif für geparkte Domains
