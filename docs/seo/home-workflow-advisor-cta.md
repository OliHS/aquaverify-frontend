# Home Workflow Advisor CTA

## Purpose

The Home hero already has primary paths for products, industries, platform and distributors. The Workflow Advisor entry is rendered as a complementary card below those CTAs for visitors who are not sure where to start.

## Routes

- EN: `/water-quality-workflow-assessment`
- ES: `/es/diagnostico-flujo-calidad-agua`
- FR: `/fr/diagnostic-flux-qualite-eau`
- IT: `/it/valutazione-flusso-qualita-acqua`
- CA: `/ca/diagnostic-flux-qualitat-aigua`

## Copy

The source of truth is `utils/workflowAdvisorHomeCta.js`.

- ES: `Diagnóstico gratuito`, `¿No sabes por dónde empezar?`, `Hacer diagnóstico gratuito`
- EN: `Free assessment`, `Not sure where to start?`, `Start free assessment`
- FR: `Diagnostic gratuit`, `Vous ne savez pas par où commencer ?`, `Lancer le diagnostic gratuit`
- IT: `Valutazione gratuita`, `Non sai da dove iniziare?`, `Avvia la valutazione gratuita`
- CA: `Diagnòstic gratuït`, `No saps per on començar?`, `Iniciar diagnòstic gratuït`

## Flags and Quality Gate

The CTA is shown only when:

- `WORKFLOW_ADVISOR_HOME_CTA_ENABLED` is enabled. Browser builds can also use `VITE_WORKFLOW_ADVISOR_HOME_CTA_ENABLED`.
- `WORKFLOW_ADVISOR_REPORT_QUALITY_GATE_REQUIRED` is enabled and `generated/workflow-advisor-quality-status.json` has `passed: true`.

The default is enabled with the quality gate required. Setting either flag to `false`, `0`, `off` or `disabled` hides the CTA.

## Analytics

The React component uses `Link` from React Router with `discover="render"` and `prefetch="intent"`. The rendered HTML remains an anchor with a real localized href.

The link uses:

```text
data-event="click_home_hero_workflow_advisor"
```

The explicit analytics payload is limited to:

- `lang`
- `source_page=home`
- `target=workflow-advisor`

No diagnostic answers, account IDs, email, company, consent payload or other personal data is sent by this CTA.

## Validation

Run:

```bash
npm run validate:workflow-advisor:quality-gate
npm run validate:workflow-advisor:pdf
npm run build
npm run validate:home
```

`validate:home` checks flag behavior, localized href/copy, prerendered HTML, the CTA event and preservation of the existing hero CTA events.

Navigation and loading behavior are documented in `docs/seo/workflow-advisor-navigation.md`.
