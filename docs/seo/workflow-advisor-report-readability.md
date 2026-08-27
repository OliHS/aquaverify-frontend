# Workflow Advisor Report Readability

Date: 2026-07-07

This note captures the readability contract for the Workflow Advisor result.

## Reading Model

The report is designed as a vertical narrative. The visitor should first understand the sector context, then the operational interpretation, then maturity gaps, then improvement actions, then the analytical/product route.

The maturity section renders as vertical cards instead of a compressed table. Priority problems also render as full-width cards so each problem has its own title, priority label and explanation.

## Localization

Section headings are localized in English, Spanish, French, Italian and Catalan. Spanish headings keep accents, including `Análisis del flujo`, `Módulos digitales dentro del plan`, `Ruta analítica / productos a evaluar` and `Información que falta`.

Missing information is rendered with the missing item as the label and a short explanation of why it matters. Related resources render title, description and URL so the user can judge relevance without guessing from a bare link.

## Validation

`npm run validate:workflow-advisor` checks the section order, anchors, localized headings, absence of old compressed report layout classes and the Spanish accent regression list.
