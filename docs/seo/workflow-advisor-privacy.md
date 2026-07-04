# Workflow Advisor Privacy Notes

Date: 2026-07-04

## Local Mode

Workflow Advisor runs locally by default. The visitor can complete the questionnaire and read the report without identifying themselves. No answers, analysis or report snapshot are sent to AquaVerify Cloud unless the visitor chooses a post-result action.

Visible note:

> Puedes completar el diagnóstico sin identificarte. Las respuestas permanecen en el navegador salvo que decidas compartir el resultado o solicitar contacto.

## Optional Research Sharing

Research sharing appears only after the report. The button opens a modal with an unchecked checkbox. Saving is allowed only when the visitor checks the research box and clicks the share button.

Research save sends `processing_purpose = research`, coded answers and the report context. It does not send name, email, phone, company or free-text contact comment.

## Contact And Marketing

Technical review is a separate action. The contact form has its own required contact consent. Marketing consent is optional and is not required for contact.

If the visitor requests contact without research sharing, the platform may create a contact/lead workflow record, but it must not be counted as research statistics.

## Cookie Banner

Cookie consent is only for cookies and analytics preferences. It does not replace Workflow Advisor research consent and must not be used to decide whether answers can be stored.

## Validation

`npm run validate:workflow-advisor` checks that the fixed research-consent block is not rendered before the result, local-only copy is present, print CSS hides non-report surfaces, and Spanish cookie-banner copy is localized.
