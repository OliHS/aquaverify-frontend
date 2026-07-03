# Workflow Advisor Result Report V2

El resultado publico de Workflow Advisor usa `workflow-advisor-report-v2` como informe consultivo principal.

Objetivos:
- Convertir respuestas estructuradas en un informe legible por comprador.
- Separar recomendaciones digitales, ruta analitica y productos a evaluar.
- Evitar que IDs internos como `module.crm`, `product.indica-screening` o codigos de reglas aparezcan en la vista publica.
- Mantener `reportSnapshot` V1 solo como compatibilidad/anexo tecnico.

Contrato visible:
- `title`, `subtitle`, `executiveSummary`
- `quickRead`
- `interpretedContext`
- `flowDiagnosis`
- `maturity`
- `priorityProblems`
- `improvementPlan`
- `recommendationSections`
- `analyticalReview`
- `missingInformation`
- `relatedResources`
- `limitations`

Validacion:
- `npm run test:workflow-advisor` en `aquaverify-cloud`
- `npm run validate:workflow-advisor` en `aquaverify-corporate-site`
