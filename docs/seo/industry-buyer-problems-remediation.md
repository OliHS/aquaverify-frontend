# Industry Buyer Problems Remediation

Date modified: 2026-06-23

## Scope

Implemented a shared buyer-problem section for the nine industry detail pages in five languages:

- water-testing-labs
- water-quality-control
- municipal-water-testing
- food-beverage-water-quality
- industrial-process-water
- facility-water-risk
- agriculture-water
- pharma-cosmetics-water
- hospitality-tourism-water

## Changes

- Added localized static `buyerProblems` content with five stable problem IDs per industry.
- Added `IndustryBuyerProblemsSection` for React rendering.
- Added static prerender output for initial HTML.
- Replaced the previous `water-quality-control` `#problema` block with the shared component.
- Preserved the static layer during CMS merge unless an override is complete and ID-compatible.
- Added `validate:industry-buyer-problems` scripts and included source/dist checks in `check:static`.
- Added the content map CSV required for editorial review.

## Validation Plan

Source validation checks:

- nine industries and five languages;
- five stable problem IDs per industry;
- non-empty localized questions and answers;
- unique questions per industry/language;
- no visible English fallback;
- no placeholder text or guaranteed outcome claims;
- no literal reuse of existing FAQ questions;
- contextual links resolved from real resource, glossary and AquaTools IDs.

Dist and production validation check:

- generated route exists;
- exactly one H1;
- exactly one `id="problema"`;
- localized H2;
- five H3 and five visible problem items;
- answers present in initial HTML;
- canonical and hreflang present;
- contextual internal links resolve;
- buyer-problem questions are not injected into FAQPage schema.

## Known Guardrail

CMS marketing strict validation depends on remote Supabase records. If it remains blocked by missing remote records or missing service credentials, keep that failure separate from static build validation and do not remove the guardrail.
