# Workflow Advisor Navigation

## Problem

The Home CTA originally rendered as a manual `<a href="/es/diagnostico-flujo-calidad-agua">`. That made the browser perform a document navigation instead of following the same React Router path used by the other hero CTAs. During the transition, the app could show the lazy-route fallback and feel like a refresh or a blank page before the Workflow Advisor chunk appeared.

## Fix

`components/home/HomeWorkflowAdvisorCta.tsx` now uses React Router `Link`:

```tsx
<Link
  to={cta.href}
  discover="render"
  prefetch="intent"
  data-event="click_home_hero_workflow_advisor"
>
```

This keeps a real rendered anchor/href for SEO and tracking, but uses the internal router for navigation. `discover="render"` follows the project/router convention for route discovery and `prefetch="intent"` starts module prefetch on hover or focus.

## Loading Shell

The global route fallback in `App.tsx` and the marketing route fallback in `pages/MarketingRoutePage.tsx` now render a light AquaVerify shell instead of an empty white screen or dark hero.

Localized messages:

- ES: `Preparando el diagnóstico…`
- EN: `Preparing the assessment…`
- FR: `Préparation du diagnostic…`
- IT: `Preparazione della valutazione…`
- CA: `Preparant el diagnòstic…`

The fallback does not call analytics, cookies, CRM or the Workflow Advisor backend. The public assessment still runs locally until the visitor explicitly shares a result or requests contact.

## Validation

Run:

```bash
npm run validate:home
npm run validate:workflow-advisor
npm run check:static
```

`validate:home` checks the CTA uses `Link`, keeps the event marker, preserves existing hero CTAs and verifies localized prerendered CTA HTML.
