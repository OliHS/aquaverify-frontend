# Corporate / Platform Phase Closure

Date: 2026-05-04

This document records the closure state for the Aquaverify corporate site and its operational bridge with the platform.

## Live Surfaces

- Corporate site: `https://aquaverify.com`
- Platform: `https://app.aquaverify.com`
- Corporate deployment path: Vercel, via `npm run deploy:prod`
- Platform deployment path: safe SSH delta deploy from the platform repository, via `npm run deploy:safe`

## Closed Items

- Brand alignment: the corporate site uses the platform logo and favicon.
- Public performance: initial public CMS data is fetched through the lightweight REST path, the distributor section is deferred, and the 3D globe is loaded only after user intent.
- Static assets: Vite assets and local globe textures use immutable cache headers on production.
- Visual cleanup: random fallback dashboard images, decorative database watermark and the white image frame were removed.
- PWA behavior: the corporate site no longer exposes a web app manifest, so browsers should not offer to install it.
- Cookies/legal: the persistent cookie management button is present, footer cookie settings opens the cookie panel, and policy metadata is read from the platform bridge.
- Signup attribution: corporate signup intent and UTM data are passed to the platform, stored in CRM, and surfaced in the client detail view.
- AquaChat notification: new web signups create a Sales channel notification with the CRM link.
- CRM visibility: web-origin filters and attribution cards are available in the platform CRM.
- Product CRO visibility: product page views and datasheet clicks from marketing URLs are tracked with consent and surfaced in the platform CRM dashboard.
- Funnel intent visibility: quote, demo, OEM, distributor, SaaS and contact starts are tracked as separate consented events and surfaced in the CRM dashboard.
- CMS hardening: editable links are validated, placeholder `#` links are blocked from being saved as real destinations, and footer/social/contact fields are structured.
- SEO: canonical URLs, language routes, sitemap, robots, OpenGraph/Twitter metadata, visible breadcrumbs and JSON-LD are in place.
- Security headers: CSP, frame, content-type, referrer and permissions headers are configured in Vercel.
- Dependency hygiene: production audit is clean for high-severity release gating.

## Release Checks

Before a corporate release:

```bash
nvm use
npm install
npm run check:release
npm run deploy:prod
```

After deploy, verify:

```bash
npm run smoke:prod
curl -I https://aquaverify.com/assets/<current-index-file>.js
curl -I https://aquaverify.com/images/globe/earth-blue-marble.jpg
```

Expected cache header for both static URLs:

```text
cache-control: public, max-age=31536000, immutable
```

## Remaining Watchlist

- Add browser-level visual regression screenshots for the home page, cookie panel, signup flow and distributors interaction.
- Continue reducing CSP inline allowances once the Vite/runtime inline requirements are isolated.
- Re-run a real signup attribution test after major CRM, auth, cookie or CMS releases.
