# AquaVerify Corporate Site

Corporate website and lightweight CMS for AquaVerify.

## Local Setup

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
npm run smoke:prod
npm run deploy:prod
```
