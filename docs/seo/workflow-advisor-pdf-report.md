# Workflow Advisor PDF Report

El PDF publico se genera con impresion dedicada del bloque `.workflow-report`.

El modo `workflow-report-print` oculta:
- navegacion global
- hero y bloques introductorios
- formulario del cuestionario
- consentimiento de investigacion
- formulario de contacto
- FAQ
- anexos tecnicos y JSON

Botones visibles tras calcular:
- Descargar informe PDF
- Imprimir informe
- Solicitar revision tecnica

La descarga PDF usa la impresion del navegador para que el usuario guarde el informe consultivo. El JSON queda solo como exportacion tecnica en modo desarrollo.

Contrato PDF:
- `reportV2.pdf.mode = dedicated-print`
- `reportV2.pdf.filename = aquaverify-workflow-advisor-{sector}-{lang}.pdf`
