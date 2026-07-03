# Workflow Advisor PDF / Print Report

El informe publico se exporta con impresion dedicada del bloque `.workflow-report-print`.

El modo `workflow-report-print-mode` oculta:
- navegacion global
- hero y bloques introductorios
- formulario del cuestionario
- consentimiento de investigacion
- formulario de contacto
- FAQ
- anexos tecnicos y JSON

Botones visibles tras calcular:
- Imprimir / guardar PDF
- Solicitar revision tecnica

El boton usa la impresion del navegador para que el usuario guarde el informe consultivo como PDF. El texto visible pide desactivar cabeceras y pies del navegador. El JSON queda solo como exportacion tecnica en modo desarrollo.

Contrato PDF:
- `reportV2.pdf.mode = dedicated-print`
- `reportV2.pdf.filename = aquaverify-workflow-advisor-{sector}-{lang}.pdf`
