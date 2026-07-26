# Florentin One - Domain Parking

Eine minimalistische Domain-Parking-Seite für geparkte Domains der Florentin One Organisation.

## Über dieses Projekt

Diese Seite dient als Platzhalter für Domains, die der Florentin One Organisation gehören und auf zukünftige Inhalte warten. Sie bietet eine einfache, professionelle Präsenz mit Links zu relevanten Ressourcen.

## Zweck

- Professionelle Placeholder-Seite für geparkte Domains
- Einheitliches Branding für alle Florentin One Domains
- Verweis auf die GitHub-Organisation und ethische Grundsätze
- Einfache Wartung und Deployment über Cloudflare Pages

## Technologie-Stack

- **[Astro](https://astro.build)** - Modernes Static Site Framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-First CSS Framework
- **[Cloudflare Pages](https://pages.cloudflare.com)** - Hosting und Deployment
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare CLI für Deployment

## Entwicklung

### Voraussetzungen

- Node.js >= 22.12.0
- pnpm >= 9

### Installation

```bash
pnpm install
```

### Verfügbare Kommandos

```bash
# Entwicklungsserver starten (mit Hot Reload)
pnpm dev

# Projekt für Production builden
pnpm build

# Production Build lokal vorschauen
pnpm preview

# Code-Qualität prüfen (Astro Check + Biome)
pnpm check

# Code formatieren
pnpm format

# Code linting
pnpm lint
```

## Deployment

### Deployment zu Cloudflare Pages

```bash
# Build und Preview-Deployment
pnpm deploy:preview

# Production Deployment
pnpm deploy
```

### Domain-Konfiguration

1. In der [Cloudflare Dashboard](https://dash.cloudflare.com) anmelden
2. Zu **Pages** navigieren und das Projekt auswählen
3. Unter **Custom domains** die gewünschte Domain hinzufügen
4. DNS-Einträge werden automatisch konfiguriert (wenn Domain in Cloudflare verwaltet wird)

Detaillierte Deployment-Anweisungen finden sich in [DEPLOYMENT.md](./DEPLOYMENT.md).

### CI/CD

Aktuell erfolgt das Deployment manuell über Wrangler. Eine automatische CI/CD-Pipeline über GitHub Actions kann bei Bedarf später hinzugefügt werden.

## Ressourcen

- [Florentin One auf GitHub](https://github.com/florentin-one)
- [WeMake Ethics](https://ethic.so/wemake)

## Credits

Gebaut von **Florentin Sakwiset** durch [WeMake](https://wemake.dev).

## Lizenz

MIT
