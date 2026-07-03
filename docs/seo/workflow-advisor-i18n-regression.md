# Workflow Advisor i18n regression

## Regression covered

Spanish reports must not expose English quick read labels or raw coded answers such as `connect process lab and quality`, `operational screening`, `other reference`, `drinking water` or `process water`.

## Guardrails

Corporate validation builds Spanish agriculture and industrial report V2 samples and checks visible text for localized labels, descriptions and analytical route status.

Cloud validation adds an industrial report fixture and blocks raw keys, internal IDs, placeholder labels and product evaluation status when the method is missing or unspecified.

