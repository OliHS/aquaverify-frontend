# AquaVerify Corporate Site

Corporate website and lightweight CMS for AquaVerify.

## Local Setup

Use Node 20.19.x:

```bash
nvm use
```

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with the public CMS configuration:

   ```bash
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_PLATFORM_URL=https://app.aquaverify.com
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Useful Scripts

```bash
npm run build
npm run cms:links:audit
npm run check:local
npm run smoke:prod
npm run check:release
npm run deploy:prod
```

## Production Guardrails

- `npm run check:local` validates CMS links and builds the site.
- `npm run smoke:prod` checks the live corporate site, platform cookie policy bridge, security headers, PWA disablement, local globe textures and cache headers.
- `npm run check:release` runs the local checks, high-severity audit gate and production smoke check.
- `npm run deploy:prod` deploys the corporate site to Vercel production.

See [docs/corporate_platform_phase_closure.md](docs/corporate_platform_phase_closure.md) for the current corporate/platform closure status.
