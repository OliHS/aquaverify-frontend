# Workflow Advisor i18n regression

## Regression covered

Spanish reports must not expose English quick read labels or raw coded answers such as `connect process lab and quality`, `operational screening`, `other reference`, `drinking water` or `process water`.

## Guardrails

Corporate validation builds Spanish agriculture and industrial report V2 samples and checks visible text for localized labels, descriptions and analytical route status.

Cloud validation adds an industrial report fixture and blocks raw keys, internal IDs, placeholder labels and product evaluation status when the method is missing or unspecified.

## Current Gate

Run:

```bash
npm run validate:workflow-advisor:quality-gate
npm run validate:workflow-advisor:pdf
```

The shared fixtures now cover industrial, agriculture and municipal scenarios. The quality gate blocks unaccented Spanish forms such as `Diagnostico`, `microbiologia`, `revision`, `metodo`, `informacion`, `tecnica`, `modulos`, `auditoria`, `analitico`, `evaluacion`, `aceptacion` and `pais`.

The PDF gate also blocks user/contact field labels and English leakage. A concrete regression fixed with this gate was the Spanish report phrase `software propio, email y hojas de cálculo`, which now renders as `software propio, correo electrónico y hojas de cálculo`.

Visible text snapshots are written to:

```text
generated/workflow-advisor-quality-text-*-es.txt
generated/workflow-advisor-pdf-text-*-es.txt
```
