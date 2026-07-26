# Deployment-Anleitung

Diese Anleitung beschreibt, wie die Domain Parking Seite auf Cloudflare Pages deployed wird.

## Voraussetzungen

### 1. Cloudflare Account

- Erstelle einen kostenlosen Account auf [cloudflare.com](https://cloudflare.com)
- Notiere deine Account-ID (zu finden im Dashboard unter **Account Home**)

### 2. Wrangler CLI Installation

Wrangler ist bereits als Dev-Dependency im Projekt enthalten. Für globale Nutzung:

```bash
npm install -g wrangler
```

### 3. Wrangler Authentifizierung

Authentifiziere Wrangler mit deinem Cloudflare Account:

```bash
wrangler login
```

Dies öffnet einen Browser, in dem du dich mit deinem Cloudflare Account anmelden kannst.

## Deployment-Prozess

### Erstmaliges Deployment

1. **Projekt builden:**
   ```bash
   pnpm build
   ```

2. **Deployment zu Cloudflare Pages:**
   ```bash
   pnpm deploy
   ```
   
   Oder in einem Schritt:
   ```bash
   pnpm deploy:preview
   ```

3. **Pages-Projekt konfigurieren:**
   - Beim ersten Deployment wird ein neues Pages-Projekt erstellt
   - Gib einen Projektnamen ein (z.B. `domain-parking`)
   - Das Deployment erfolgt zunächst auf eine `*.pages.dev` URL

### Nachfolgende Deployments

Für Updates einfach den Build- und Deploy-Befehl ausführen:

```bash
pnpm deploy:preview
```

## Custom Domain konfigurieren

### Voraussetzung: Domain in Cloudflare

Die Domain sollte bereits in Cloudflare verwaltet werden (Nameserver zeigen auf Cloudflare).

### Domain hinzufügen

1. Öffne das [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigiere zu **Pages** → Dein Projekt
3. Klicke auf den **Custom domains** Tab
4. Klicke auf **Set up a custom domain**
5. Gib die gewünschte Domain ein (z.B. `example.com` oder `www.example.com`)
6. Cloudflare konfiguriert automatisch die notwendigen DNS-Einträge

### DNS-Einträge (manuell)

Falls automatische Konfiguration nicht funktioniert:

- **CNAME-Eintrag:** `subdomain` → `<projekt-name>.pages.dev`
- **Root Domain:** Cloudflare erstellt automatisch einen ALIAS/CNAME-Eintrag

Die DNS-Änderungen können einige Minuten bis Stunden dauern (DNS-Propagation).

## Environments

Cloudflare Pages unterstützt automatisch zwei Environments:

- **Production:** Deployments auf den `main` Branch (bei Git-Integration) oder manuelle Deployments
- **Preview:** Deployments auf andere Branches oder explizite Preview-Deployments

Mit `wrangler pages deploy` wird standardmäßig auf Production deployed.

Für Preview-Deployments:

```bash
wrangler pages deploy dist --branch=preview
```

## Troubleshooting

### Problem: "Wrangler not found"

**Lösung:** Stelle sicher, dass Dependencies installiert sind:
```bash
pnpm install
```

Verwende dann `pnpm deploy` statt `wrangler` direkt.

### Problem: "Authentication error"

**Lösung:** Führe `wrangler login` erneut aus:
```bash
npx wrangler login
```

### Problem: "Build failed"

**Lösung:** Prüfe den Build lokal:
```bash
pnpm build
```

Behebe eventuelle Fehler vor dem Deployment.

### Problem: "Domain already exists"

**Lösung:** Die Domain ist bereits einem anderen Pages-Projekt zugeordnet. Entferne sie dort zuerst oder verwende eine andere Subdomain.

### Problem: "DNS not resolving"

**Lösung:** 
- Warte 24-48 Stunden auf DNS-Propagation
- Prüfe DNS mit `dig example.com` oder [dnschecker.org](https://dnschecker.org)
- Stelle sicher, dass Nameserver auf Cloudflare zeigen

### Problem: "404 on custom domain"

**Lösung:**
- Prüfe, ob das Deployment erfolgreich war
- Verifiziere die Custom Domain-Konfiguration im Dashboard
- Lösche den Browser-Cache oder teste im Inkognito-Modus

## Monitoring und Logs

### Deployment-Status prüfen

Im Cloudflare Dashboard unter **Pages** → **Deployments** siehst du:
- Deployment-Historie
- Build-Logs
- Deployment-Status (Success/Failed)

### Analytics

Cloudflare Pages bietet kostenlose Analytics:
- **Pages** → Dein Projekt → **Analytics**
- Zeigt Requests, Bandbreite und Performance-Metriken

## Rollback

Falls ein Deployment Probleme verursacht:

1. Gehe zu **Pages** → Dein Projekt → **Deployments**
2. Wähle ein früheres, funktionierendes Deployment
3. Klicke auf **Rollback to this deployment**

## Best Practices

- **Preview vor Production:** Teste Änderungen mit `pnpm deploy:preview` und Preview-URLs
- **Build lokal testen:** Führe `pnpm build` und `pnpm preview` aus, bevor du deployst
- **Git-Integration:** Erwäge die Verwendung von GitHub/GitLab-Integration für automatische Deployments
- **Environment Variables:** Setze sensible Daten als Environment Variables im Dashboard, nicht im Code

## Weitere Ressourcen

- [Cloudflare Pages Dokumentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Dokumentation](https://developers.cloudflare.com/workers/wrangler/)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/cloudflare/)
