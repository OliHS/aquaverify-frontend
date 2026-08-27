# Workflow Advisor Result Report V2

El resultado publico de Workflow Advisor usa el informe consultivo V2 como salida principal. La version tecnica existe en datos estructurados, pero no se muestra en la vista publica ni en el PDF/impresion.

Objetivos:
- Convertir respuestas estructuradas en un informe legible por comprador.
- Separar recomendaciones digitales, ruta analitica y productos a evaluar.
- Evitar que IDs internos como `module.crm`, `product.indica-screening` o codigos de reglas aparezcan en la vista publica.
- Mantener `reportSnapshot` V1 solo como compatibilidad/anexo tecnico.

Contrato visible:
- `title`, `subtitle`, `executiveSummary`
- `cover`
- `quickReadItems`
- `interpretedContext`
- `flowDiagnosis`
- `maturity`
- `priorityProblems`
- `improvementPlan`
- `recommendationSections`
- `analyticalReview`
- `missingInformation`
- `relatedResources`
- `pdf`
- `limitations`

Validacion:
- `npm run test:workflow-advisor` en `aquaverify-cloud`
- `npm run validate:workflow-advisor` en `aquaverify-corporate-site`
