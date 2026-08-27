# Workflow Advisor PDF: print versus real PDF

## Current mode

The public site uses controlled print mode, not a generated binary PDF. The button is labeled `Imprimir / guardar PDF` in Spanish and equivalent labels in other languages. It does not claim `Descargar informe PDF`.

## Print behavior

The report container uses `.workflow-report-print`. In print mode the page adds `workflow-report-print-mode` to `body` and CSS hides navigation, landing content, FAQ, consent blocks, contact form, buttons and the technical annex.

Browser headers and footers are controlled by the browser print dialog, so the UI includes instructions to disable them before saving as PDF.

## Future option

A real PDF generator can replace print mode later if it produces a dedicated AquaVerify document with embedded fonts, cover, footer and page numbering.

