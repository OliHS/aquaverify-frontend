# Workflow Advisor Result Layout

Date: 2026-07-07

The public Workflow Advisor result uses a single-column report layout. The goal is to make the consultative result read like an ordered executive report instead of a dashboard with competing columns.

## Required Order

1. Sector result header
2. Executive summary
3. Quick read
4. Interpreted context
5. Workflow analysis
6. Maturity by dimension
7. Priority problems
8. Improvement plan
9. Digital modules within the plan
10. Analytical route / products to evaluate
11. Missing information
12. Related resources
13. Limitations
14. Actions

## Anchors

The report exposes stable anchors for the main result sections:

- `#contexto-interpretado`
- `#analisis-flujo`
- `#madurez`
- `#problemas`
- `#plan-mejora`
- `#modulos`
- `#ruta-analitica`
- `#informacion-faltante`
- `#recursos`
- `#limitaciones`

## Layout Rules

Each main report section uses `.workflow-report-section` with the approved wide-card surface: rounded border, white background, internal padding and subtle shadow. The main report sequence must not use two-column grids, CSS columns or masonry. Small internal grids are allowed only inside a section when they do not move two main report sections side by side.

## Capture Notes

There is no Playwright or Cypress visual harness in this repository. The before/after visual regression requirement is covered by the DOM/source equivalent in `npm run validate:workflow-advisor`: it checks the approved section order, anchors, full-width wrapper, absence of the old two-column report classes and localized section headings.
