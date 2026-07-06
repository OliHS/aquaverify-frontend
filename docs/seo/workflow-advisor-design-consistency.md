# Workflow Advisor Design Consistency

## Problem

The Workflow Advisor hero used a dominant dark surface (`bg-slate-950 text-white`). It looked closer to a dark app screen than to the AquaVerify corporate marketing pages.

## Current Design

`components/workflow/WorkflowAdvisorLanding.tsx` now uses the corporate light system:

- main surface: `bg-slate-50 text-slate-900`
- hero: white/cyan soft radial background
- cards: white or slate-50 with slate/cyan borders
- headings: `text-primary`
- body copy: slate text
- CTA: primary/secondary buttons consistent with Home
- header and footer remain the corporate shared components

Dark surfaces are limited to small, contextual UI only, such as development-only debug output or modal overlays. They are not used as the primary page background.

## SEO And Accessibility

The page keeps:

- one H1
- canonical and hreflang from the marketing route SEO layer
- `index, follow`
- WebApplication/WebPage schema
- prerendered HTML with H1, description, CTA, privacy/local-mode explanation and main content
- visible focus states on interactive controls

## Validation

Run:

```bash
npm run validate:workflow-advisor
npm run validate:home
```

The source validator fails if the Workflow Advisor primary layout returns to forbidden dark design tokens such as `workflow-advisor-landing bg-slate-950`, `bg-black`, `bg-zinc-950`, `bg-neutral-950`, `from-black`, `via-slate-950` or `dark:`.
