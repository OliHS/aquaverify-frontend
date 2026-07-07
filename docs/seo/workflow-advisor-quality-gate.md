# Workflow Advisor Quality Gate

## Command

```bash
npm run validate:workflow-advisor:quality-gate
```

The gate builds deterministic Workflow Advisor V2 reports from three Spanish fixtures:

- `industrial`: industrial process water with `method_context=other_reference`
- `agriculture`: agriculture water with `method_context=not_defined`
- `municipal`: municipal water testing with a defined ISO method

The fixtures live in `scripts/lib/workflow-advisor-report-gate.js`.

## Status File

On success the gate writes:

```text
generated/workflow-advisor-quality-status.json
```

Current expected shape:

```json
{
  "passed": true,
  "checkedAt": "YYYY-MM-DD",
  "fixtures": ["industrial", "agriculture", "municipal"],
  "reportVersion": "workflow-advisor-report-v2"
}
```

The Home CTA reads this status at build/runtime and stays hidden when `passed` is not true.

This guard remains required for production even though the Home CTA now uses internal React Router navigation. Navigation improvements do not bypass report/PDF quality checks.

## Blocked Regressions

The gate fails if the visible ES report leaks:

- report version strings such as `WORKFLOW-ADVISOR-REPORT-V2`
- English quick-read labels such as `PRIMARY RISK`, `IMMEDIATE PRIORITY`, `ANALYTICAL ROUTE`, `NEXT STEP`
- raw coded answers such as `connect process lab and quality`, `operational screening`, `other reference`, `drinking water`, `process water`
- internal fields such as `matchedRuleIds`, `workflow_maturity`, `traceability_signal_count`
- unresolved placeholders such as `undefined` or `missing translation`
- unaccented Spanish forms such as `Diagnostico`, `microbiologia`, `revision`, `metodo`, `informacion`, `tecnica`, `modulos`, `auditoria`, `analitico`, `evaluacion`, `aceptacion`, `pais`

It also requires the accented forms to be present across the ES report corpus.

## Prudence Rule

When the analytical context is incomplete or not closed, the report must show:

```text
Ruta analítica pendiente de revisión técnica
```

Candidates such as INDICA, ENUMERA or PLAQUE / ISO-EPA kits must remain marked as `Candidato a evaluar · Requiere revisión técnica` until matrix, method, volume, country, intended use and laboratory scope are reviewed. The section must also include the long family-specific review copy and the `Solicitar revisión técnica gratuita` CTA.

## Audit Artifacts

The gate writes visible-text snapshots to:

```text
generated/workflow-advisor-quality-text-*-es.txt
```

These files are intended for quick regression review and should match the report text a visitor can read, not internal IDs.
