# Workflow Advisor Result Actions

Date: 2026-07-07

The Workflow Advisor result uses two post-report actions only:

- Imprimir / guardar PDF
- Solicitar revision tecnica

This two post-report actions contract keeps the report focused after completion. The former separate print-report button and the print-helper sentence about browser headers and footers must not render in the public result DOM.

The PDF action opens the existing modal with the local download path and the optional share-and-download path. The technical review action scrolls to the contact request form.
