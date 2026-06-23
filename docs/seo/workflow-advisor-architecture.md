# AquaVerify Workflow Advisor Architecture

Date: 2026-06-23

## Scope

AquaVerify Workflow Advisor is a public multilingual B2B assessment for water microbiology, control and traceability workflows.

Corporate owns the public landing experience on `aquaverify.com`. Cloud owns the deterministic core source, public persistence API, CRM Marketing views and database schema.

## Public Routes

- English: `/water-quality-workflow-assessment`
- Spanish: `/es/diagnostico-flujo-calidad-agua`
- French: `/fr/diagnostic-flux-qualite-eau`
- Italian: `/it/valutazione-flusso-qualita-acqua`
- Catalan: `/ca/diagnostic-flux-qualitat-aigua`

## Core Contract

Corporate vendors `vendor/workflow-advisor-core` from Cloud with a manifest hash. The source of truth is Cloud `packages/workflow-advisor-core`.

The MVP is deterministic:

- no generative model selects products, modules or compliance conclusions
- no compliance score is emitted
- regulated, unknown or insufficient analytical contexts require technical review
- assessment, questionnaire, rules and catalog versions are returned in each result

## Browser Flow

The browser computes the first result locally with `assessWorkflow`. No answers are sent until the visitor explicitly selects research sharing or contact.

Optional save and lead requests go to `https://app.aquaverify.com/api/public/v1/workflow-assessments`.

## Validation

Use:

- `npm run verify:workflow-advisor-core`
- `npm run validate:workflow-advisor:source`
- `npm run build`
- `npm run validate:workflow-advisor:dist`

