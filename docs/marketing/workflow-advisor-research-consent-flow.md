# Workflow Advisor Research Consent Flow

## Local By Default

The Workflow Advisor remains local by default. The questionnaire can be completed and printed without identifying the user and without sending answers to the backend.

## Research Sharing

Research sharing happens only from the PDF modal after the user checks the explicit research checkbox and clicks `Share and download`.

The research path calls `saveAssessment('research')`, sends `researchConsent: true`, keeps `contactConsent: false`, and keeps `marketingConsent: false`.

## Contact And Marketing

Contact remains separate in the technical review form. The contact path calls `saveAssessment('contact')` and then submits the lead details to the lead endpoint. Marketing remains optional and only applies to the contact flow.

## Cancel And No-Share Download

Cancel closes the modal and does not print or send data. Download without sharing starts the local print/save flow without calling the workflow assessment endpoint.

## Validation

`validate:workflow-advisor` checks the modal actions, research/contact separation, no-share path, print exclusions and required localized modal copy.
