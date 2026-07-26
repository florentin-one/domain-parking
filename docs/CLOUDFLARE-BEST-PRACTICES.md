# Cloudflare Workers Best Practices für Static Site Hosting

**Stand:** Juli 2026  
**Quelle:** [Cloudflare Workers Best Practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)

Dieses Dokument fasst die relevanten Best Practices für das Domain-Parking-Projekt zusammen, das als statische Website auf Cloudflare Workers/Pages gehostet wird.

---

## 1. Konfiguration

### 1.1 Compatibility Date aktuell halten

Der `compatibility_date` steuert, welche Runtime-Features und Bug-Fixes verfügbar sind. Für neue Projekte sollte er auf das aktuelle Datum gesetzt werden.

**Empfehlung für unser Projekt:**

```jsonc
{
  "compatibility_date": "2026-07-26"
}
```

**Wichtig:** Periodisches Aktualisieren bei bestehenden Projekten ermöglicht Zugriff auf neue APIs und Fixes ohne Code-Änderungen.

### 1.2 nodejs_compat aktivieren

Das `nodejs_compat` Compatibility Flag gibt Zugriff auf Node.js Built-in-Module (`node:crypto`, `node:buffer`, `node:stream`, etc.). Viele Libraries benötigen diese Module.

**Empfehlung:**

```jsonc
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### 1.3 Binding-Typen mit wrangler types generieren

**Best Practice:** Niemals die `Env`-Interface manuell schreiben. `wrangler types` generiert automatisch Type Definitions, die der tatsächlichen Konfiguration entsprechen.

```bash
npx wrangler types
```

**Wichtig:** Nach jeder Änderung an Bindings erneut ausführen.

### 1.4 Secrets sicher speichern

Secrets (API Keys, Tokens, Credentials) dürfen **niemals** im Source Code oder in der Wrangler-Konfiguration erscheinen.

**Empfehlung:**

- Produktions-Secrets: `wrangler secret put SECRET_NAME`
- Lokale Entwicklung: `.env` Datei (in `.gitignore`)
- Nie Secrets in Git committen

### 1.5 Custom Domains vs Routes

Für statische Sites gibt es zwei Routing-Mechanismen:

**Custom Domains** (empfohlen für statische Sites):

- Worker **ist** der Origin
- DNS-Records und SSL-Zertifikate werden automatisch erstellt
- Verwenden, wenn der Worker den gesamten Traffic für einen Hostname behandelt

```jsonc
{
  "routes": [
    { "pattern": "example.com", "custom_domain": true }
  ]
}
```

**Routes** (für Proxy-Szenarien):

- Worker läuft **vor** einem bestehenden Origin-Server
- Erfordert einen Cloudflare-proxied DNS-Record (orange cloud)
- Für Domain Parking nicht relevant

---

## 2. Static Assets auf Workers

### 2.1 Assets Directory konfigurieren

Cloudflare empfiehlt seit 2026 **Workers Static Assets** für statische Sites statt Pages. Neue Features und Optimierungen fokussieren sich auf Workers.

**Minimale Konfiguration:**

```jsonc
{
  "name": "domain-parking",
  "compatibility_date": "2026-07-26",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  }
}
```

**Für Single-Page Applications:**

```jsonc
{
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  }
}
```

Dies sorgt dafür, dass nicht gefundene Routes `index.html` mit `200 OK` zurückgeben (wichtig für Client-Side Routing).

### 2.2 Routing-Verhalten

**Standard-Verhalten:**

1. Wenn eine URL einem File im Assets-Verzeichnis entspricht → File wird direkt ausgeliefert (ohne Worker-Code)
2. Kein Match gefunden + Worker-Script vorhanden → Request wird vom Worker verarbeitet
3. Kein Worker-Script vorhanden → `404 Not Found`

**Für reine statische Sites:** Kein Worker-Script nötig, nur `assets.directory` konfigurieren.

---

## 3. Caching & Performance

### 3.1 Automatisches Caching

Statische Assets werden automatisch gecacht:

**Erster Request:**

- Asset wird aus Storage geholt und im Data Center gecacht

**Folgende Requests:**

- Tiered Caching: Assets werden von nahen Caches abgerufen statt erneut aus Storage
- Verbessert Cache-Hit-Ratio und reduziert Latenz

### 3.2 Streaming für große Response Bodies

**Wichtig:** Workers haben ein 128 MB Memory-Limit. Große Payloads niemals mit `await response.text()` oder `await request.arrayBuffer()` buffern.

**Best Practice:** Response Bodies streamen:

```typescript
// ✅ Gut: Response Body durchstreamen ohne Buffering
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await fetch("https://api.example.com/large-dataset");
    return new Response(response.body, response);
  }
};
```

**Für unser Projekt:** Da wir nur statische Assets ausliefern, wird dies automatisch von Cloudflare gehandhabt.

### 3.3 waitUntil für Background-Arbeit

`ctx.waitUntil()` erlaubt Arbeit nach dem Response (Analytics, Cache-Writes, Logging).

**Wichtig:**

- Nicht destructuren: `const { waitUntil } = ctx` führt zu "Illegal invocation"
- 30-Sekunden-Limit nach Response

**Für unser Projekt:** Nicht relevant für reine statische Sites.

---

## 4. Security Best Practices

### 4.1 Bindings statt REST APIs verwenden

Für Cloudflare Services (R2, KV, D1, Queues) immer Bindings verwenden statt REST APIs:

**Vorteile von Bindings:**

- Kein Network-Hop erforderlich
- Keine Authentication nötig
- Geringere Latenz
- Typsicher (bei TypeScript mit `wrangler types`)

### 4.2 Secrets nicht exposen

**Wichtig:**

- Niemals Secrets in Responses zurückgeben
- Nicht in Logs ausgeben
- Bei File-Reads von `.env`, `credentials.json` etc. vorsichtig sein

---

## 5. Deployment & Build

### 5.1 Build Command konfigurieren

Für Astro-Projekte wie unser Domain Parking:

```jsonc
{
  "build": {
    "command": "npm run build"
  }
}
```

### 5.2 Environments nutzen

Wrangler Environments erlauben separate Deployments für Production, Staging, Development:

```jsonc
{
  "name": "domain-parking",
  "env": {
    "production": {
      "routes": [
        { "pattern": "example.com", "custom_domain": true }
      ]
    },
    "staging": {
      "routes": [
        { "pattern": "staging.example.com", "custom_domain": true }
      ]
    }
  }
}
```

**Deployment:**

```bash
npx wrangler deploy --env production
npx wrangler deploy --env staging
```

---

## 6. Observability (für spätere Erweiterung)

### 6.1 Logpush konfigurieren

Für Production-Monitoring sollten Logs an einen externen Service weitergeleitet werden:

```jsonc
{
  "logpush": {
    "enabled": true
  }
}
```

### 6.2 Tail Logs während Entwicklung

```bash
npx wrangler tail
```

---

## 7. Spezifische Empfehlungen für Domain-Parking

### 7.1 Minimale Worker-Konfiguration

Da Domain Parking eine reine statische Site ist (Astro-generiert), reicht eine minimale Konfiguration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "domain-parking",
  "compatibility_date": "2026-07-26",
  "compatibility_flags": ["nodejs_compat"],
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  },
  "build": {
    "command": "npm run build"
  }
}
```

### 7.2 Kein Worker-Script erforderlich

Für reine statische Sites ist kein `main`-Entry-Point erforderlich. Die `assets`-Konfiguration reicht aus.

### 7.3 HTML Handling

Für statische Sites mit Astro:

```jsonc
{
  "assets": {
    "html_handling": "drop-trailing-slash"
  }
}
```

Dies entfernt Trailing Slashes von URLs (Standard für Astro).

### 7.4 Performance-Optimierungen

**Automatisch von Cloudflare:**

- HTTP/2 und HTTP/3 (QUIC) aktiviert
- Brotli/Gzip-Kompression
- Tiered Caching über 300+ Edge-Locations
- Sub-20ms TTFB für gecachte Assets

**Keine manuelle Konfiguration erforderlich** für Standard-Static-Assets.

---

## 8. Checklist für Domain-Parking-Deployment

- [x] `compatibility_date` auf aktuelles Datum gesetzt
- [x] `nodejs_compat` flag aktiviert (falls Build-Tools Node.js-APIs benötigen)
- [ ] `assets.directory` auf `./dist` gesetzt
- [ ] `not_found_handling` auf `404-page` gesetzt
- [ ] `html_handling` auf `drop-trailing-slash` gesetzt
- [ ] `build.command` konfiguriert
- [ ] Custom Domain konfiguriert
- [ ] `.gitignore` enthält `.env` und andere sensible Files
- [ ] `wrangler types` ausgeführt (falls TypeScript)

---

## Quellen

- [Cloudflare Workers Best Practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)
- [Cloudflare Static Assets Documentation](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/)
- [Compatibility Dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)
