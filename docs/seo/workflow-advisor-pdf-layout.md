# Workflow Advisor PDF Layout

Date: 2026-07-07

Workflow Advisor print/PDF output follows the same vertical report order as the on-screen result. The printable surface is `.workflow-report-print`, and each main section is marked with `.workflow-report-section`.

## Print Scope

Print mode must include only the report content. It excludes navigation, the stepper, questionnaire form, consent controls, contact form, FAQ, cookie surfaces, modals, post-report actions and technical JSON export.

## Page Breaks

Main report sections may break naturally when needed so long reports do not create excessive whitespace. Compact internal cards use `.workflow-report-card` with `break-inside: avoid` to keep labels, explanations and resource descriptions together.

## Validation

`npm run validate:workflow-advisor:pdf` checks the text extracted from representative Spanish reports. `npm run validate:workflow-advisor` checks the print/PDF source selectors, section wrappers and no-print action placement.
