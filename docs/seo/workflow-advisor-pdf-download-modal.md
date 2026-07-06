# Workflow Advisor PDF Download Modal

## Decision

The current report export is a controlled browser print flow, not a generated binary PDF. The main action is therefore labelled as print/save PDF:

- EN: `Print / save PDF`
- ES: `Imprimir / guardar PDF`
- FR: `Imprimer / enregistrer PDF`
- IT: `Stampa / salva PDF`
- CA: `Imprimir / desar PDF`

## Modal Flow

Clicking the primary PDF action opens `workflow-advisor-modal`. The user can:

- download without sharing;
- share pseudonymised research data and then download;
- cancel.

Cancel only closes the modal. It does not print, download or send data.

## Privacy

`Download without sharing` closes the modal and starts the local print/save flow without calling the workflow assessment endpoint.

`Share and download` is disabled until the research checkbox is explicitly selected. It calls the research save path and then starts the print/save flow. If saving fails, the modal shows an error and keeps the download-without-sharing action available.

Cookie consent is not reused as research consent.

## Print Exclusions

The print CSS hides `workflow-advisor-stepper`, `workflow-advisor-modal`, `workflow-advisor-consent`, `workflow-advisor-contact-form`, `workflow-advisor-faq`, cookie surfaces, navigation, site header and footer. Only `workflow-report-print` is made visible in print mode.
