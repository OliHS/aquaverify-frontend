# AquaTools Free Remediation

## Completed

| Area | Remediation |
| --- | --- |
| Shared formulas | Added deterministic vendoring from AquaVerify Cloud instead of duplicating formulas in the corporate site. |
| Public scope | Limited the indexable public surface to the eight approved tools. |
| Browser privacy | Calculator UI runs locally and does not submit input values or results to the backend. |
| Localized routes | Added EN, ES, FR, IT and CA routes for the hub and all tools. |
| SEO content | Added visible formulas, units, examples, validation rules, warnings, limitations, FAQ and related links. |
| Structured data | Added CollectionPage/ItemList for the hub and WebApplication for tool pages. |
| Sitemap | Added `sitemap-tools.xml` with 45 localized URLs. |
| Social images | Added 1200x630 AquaTools social images for hub and tools. |
| Validation | Added source, dist and production smoke validator commands. |

## Guardrails

| Risk | Guardrail |
| --- | --- |
| Formula drift between repos | Corporate vendor artifact is hash-checked against `aquatools-core-manifest.json`. |
| Unsupported claims | Source validator rejects placeholder and official/regulatory acceptance language. |
| Privacy regression | Form code is kept local-only; future network instrumentation must not include input values or results. |
| Incomplete route publication | Source validator requires 9 page definitions and 45 unique localized routes. |
| Static/runtime mismatch | Build prerenders the same marketing page IDs used by runtime routing. |

## Deferred On Purpose

The following tools remain out of public scope until Cloud has a verified core, acceptance vectors and public copy:

- calibration curves
- LOD/LOQ
- uncertainty
- advanced MDL
- MPN/NMP
- chlorine and hypochlorite
- chemical dosing
- decision rules
- regulatory comparators
- batch planner
- qPCR
- DoE

They may belong in AquaVerify Cloud workflows, but they should not become indexable public pages without the same extraction and validation path.

