# Workflow Advisor Report Rendering

El componente publico `WorkflowAdvisorLanding` renderiza `reportV2` con `WorkflowReportV2`.

Notas de rendering:
- El informe consultivo visible esta dentro de `.workflow-report`.
- Los botones principales son PDF, imprimir y solicitud de revision tecnica.
- El JSON tecnico se muestra solo con `import.meta.env.DEV`.
- Los campos de contacto tienen etiquetas localizadas; no se usan placeholders crudos como `name`, `company` o `comment`.
- El formulario, consentimientos y FAQ quedan fuera del bloque imprimible.

Comandos de verificacion:
- `npm run validate:workflow-advisor:source`
- `npm run validate:workflow-advisor`
- `npm run build`
