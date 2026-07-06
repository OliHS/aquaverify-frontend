# Workflow Advisor PDF Regression

## Command

```bash
npm run validate:workflow-advisor:pdf
```

The current public experience uses controlled browser print mode. The validator simulates extracted PDF text from the printable V2 report sections and splits it into pages to catch empty-page regressions.

## Required Report Text

Every simulated PDF must include:

- `Informe de diagnóstico`
- `AquaVerify`
- `Resumen ejecutivo`
- `Lectura rápida`
- `Análisis del flujo`
- `Madurez por dimensiones`
- `Plan de mejora`
- `Ruta analítica`
- `Limitaciones`

The industrial ES fixture additionally requires:

- `Agua de proceso industrial`
- `Riesgo principal`
- `Prioridad inmediata`
- `Siguiente paso`
- `Conectar proceso, laboratorio y calidad`
- `Controlar puntos críticos de proceso`
- `Coordinar laboratorios externos`
- `Agua de consumo`
- `Agua de proceso`
- `Agua regenerada`
- `Ruta analítica pendiente de revisión técnica`
- `Método o referencia exacta`

The agriculture ES fixture must contain at least five agriculture terms from: `fuente de agua`, `parcela`, `cultivo`, `campaña`, `agua regenerada`, `riego`, `packhouse`, `comprador`, `auditoría`, `CoA`.

## Forbidden Text

The PDF gate fails on:

- browser URL/date/title/page-number chrome
- landing/form/contact/consent/FAQ/cookie text
- visible fields such as `name`, `email`, `company`, `countryCode`, `buyerRole`, `phone`, `comment`
- technical JSON/export strings such as `technicalExport`, `reportVersion`, `matchedRuleIds`, `workflow_maturity`

Any simulated page under 120 useful characters fails the gate.

## Artifacts

Extracted text snapshots are written to:

```text
generated/workflow-advisor-pdf-text-*-es.txt
```

These files are the evidence used by the Home CTA quality gate workflow before deployment.
