# Domain Parking Placeholder für Florentin One Spec

## Why

Parked domains und Domains, die auf ihre Erstellung warten, brauchen eine professionelle, schnelle Placeholder-Seite, die Florentin Ones Identität, Prinzipien und ethische Grundlagen kommuniziert. Aktuell existiert ein Astro-Template ("Entropic") mit Security-Research-Inhalten, das vollständig rebrandet und für Cloudflare Workers optimiert werden muss.

## What Changes

- **Kompletter Rebrand** des Astro-Templates von "Entropic" (Security Research Blog) zu "Florentin One" (Domain Parking Placeholder)
- **Inhaltliche Transformation** zu einer statischen, professionellen Landing Page mit:
  - Florentin One Branding und Identität
  - Links zu relevanten Ressourcen (GitHub, LinkedIn, WeMake Ethics, MCP Repository)
  - Klare Kommunikation: "Diese Domain ist geparkt / wartet auf Erstellung"
  - Problem-first Messaging gemäß WeMake Prinzipien
- **Cloudflare Workers Deployment Setup**:
  - Migration von Standard-Astro zu Cloudflare Pages/Workers-kompatiblem Build
  - wrangler.jsonc Konfiguration nach Best Practices
  - Static Asset Handling über Cloudflare
- **Technische Optimierung**:
  - Entfernung aller dynamischen Blog/Philes/CVE-Funktionalität
  - Vereinfachung zu einer Single-Page-Anwendung
  - Performance-Optimierung für Edge-Delivery
  - DSGVO/GDPR-konforme Implementierung (keine unnötigen Tracker)

## Impact

- **Affected Specs**: Neue Capability "Domain Parking" für Florentin One
- **Affected Code**:
  - `/src/config/site.ts` – kompletter Inhalt und Struktur
  - `/src/pages/index.astro` – vereinfacht zu statischer Landing Page
  - `/src/components/home/HomeScreen.astro` – angepasst an neue Inhalte
  - `/astro.config.mjs` – Cloudflare-Adapter Integration
  - Neue Dateien: `wrangler.jsonc`, potenziell `_worker.js` für Edge-Logic
  - Zu entfernen: Volume-System, CVE-System, Philes-Content, komplexe Navigation
  - Zu behalten: Textmode-Ästhetik (optional anpassbar), Performance-Features

## ADDED Requirements

### Requirement: Domain Parking Landing Page

Das System MUSS eine professionelle, statische Landing Page bereitstellen, die Florentin Ones Identität kommuniziert.

#### Scenario: Besucher landet auf geparkter Domain

- **WHEN** ein Besucher eine geparkte Domain aufruft
- **THEN** sieht er eine klare Nachricht über den Domain-Status
- **AND** Branding-Elemente von Florentin One (Name, Tagline, ASCII-Art optional)
- **AND** Links zu: GitHub (florentin-one, florentin-one/mcp), LinkedIn, WeMake Ethics
- **AND** Optionale kurze Erklärung der Florentin One Vision (augmentation over automation, problem-first)
- **AND** Kontaktmöglichkeit oder "Coming Soon" Status

### Requirement: Cloudflare Workers Deployment

Das System MUSS über Cloudflare Workers/Pages deploybar sein und Best Practices folgen.

#### Scenario: Deployment via wrangler

- **WHEN** `wrangler deploy` ausgeführt wird
- **THEN** wird die statische Site erfolgreich zu Cloudflare hochgeladen
- **AND** alle Assets sind über das Edge-Network verfügbar
- **AND** `wrangler.jsonc` enthält:
  - Aktuelles `compatibility_date` (2026-07-26)
  - `nodejs_compat` Flag falls benötigt
  - Korrekte `main` und Build-Output-Konfiguration
  - Observability-Settings
- **AND** keine Secrets oder sensible Daten sind hardcoded

#### Scenario: Performance und Best Practices

- **WHEN** die Site deployed ist
- **THEN** folgt sie Cloudflare Workers Best Practices:
  - Streaming für Assets wo sinnvoll
  - Keine globalen request-scoped Variablen
  - Keine floating promises
  - Crypto-APIs für security-relevante Operations
  - Proper error handling (kein passThroughOnException)

### Requirement: DSGVO/GDPR Compliance

Das System MUSS DSGVO-konform sein ohne unnötige Tracking-Technologien.

#### Scenario: Datenschutz-Check

- **WHEN** die Landing Page geladen wird
- **THEN** werden keine Third-Party-Tracker geladen
- **AND** keine Cookies gesetzt (außer technisch notwendige)
- **AND** keine personenbezogenen Daten ohne Consent erhoben
- **AND** optional: Datenschutz-Link zu WeMake Ethics-Richtlinien

### Requirement: Brand Consistency

Das System MUSS Florentin Ones Identität konsistent reflektieren.

#### Scenario: Marken-Elemente

- **WHEN** die Landing Page angezeigt wird
- **THEN** sind folgende Elemente sichtbar:
  - "Florentin One" Name/Logo
  - Tagline oder Mission Statement (z.B. aus FLORENTIN-ONE.md)
  - WeMake-Bezug (entwickelt durch WeMake, gegründet von Florentin Sakwiset)
  - Links zu offiziellen Ressourcen
- **AND** Tonalität: professionell, klar, problem-focused, keine Buzzwords

## MODIFIED Requirements

### Requirement: Astro Build Configuration

Die bestehende Astro-Konfiguration MUSS für Cloudflare Workers/Pages angepasst werden.

**Änderungen:**

- Integration des `@astrojs/cloudflare` Adapters
- Output-Modus auf `server` oder `hybrid` (je nach Bedarf) oder `static` für reine static site
- Build-Target für Cloudflare Edge Runtime
- Asset-Handling für Cloudflare CDN

**Migration von:**

```javascript
export default defineConfig({
  site: "https://www.cubeyond.net/",
  vite: { plugins: [tailwindcss()] }
});
```

**Migration zu:**

```javascript
export default defineConfig({
  site: "https://florentin.dev/", // oder spezifische parked domain
  output: 'static', // oder 'server' mit cloudflare adapter
  adapter: cloudflare(), // falls SSR benötigt
  vite: { plugins: [tailwindcss()] }
});
```

## REMOVED Requirements

### Requirement: Blog/Philes Volume System

**Reason**: Domain Parking benötigt keine dynamische Content-Navigation oder Blog-Funktionalität
**Migration**: Komplette Entfernung des Volume-Systems, Philes-Content, CVE-Tracking. Diese Features sind spezifisch für den Original-Use-Case (Security Research Blog) und nicht relevant für Domain Parking.

### Requirement: Multi-Page Navigation

**Reason**: Single-Page Landing Page ist ausreichend für Domain Parking
**Migration**: Entfernung von `/cves/`, `/volume/[volume]/` Routes. Nur `/` (Home) und ggf. `/404` behalten.

### Requirement: Complex Textmode Rendering

**Reason**: Vereinfachte Darstellung reicht für statische Inhalte
**Migration**: Beibehaltung der Basis-Textmode-Ästhetik (optional), aber Entfernung von:

- ANSI-Rendering
- CJK-Atlas
- Game of Life Effekte
- Lightbox
- Particles
Falls gewünscht: simple ASCII-Art beibehalten für Retro-Look.
