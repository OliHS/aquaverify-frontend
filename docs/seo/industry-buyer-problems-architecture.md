# Industry Buyer Problems Architecture

Date modified: 2026-06-23

## Objective

The industry buyer-problems layer adds one early, visible `#problema` section to each of the nine industry detail pages in English, Spanish, French, Italian and Catalan. The section is not a FAQ layer and must not alter URLs, H1, canonical or hreflang.

## Source Of Truth

Static source lives in `utils/industryBuyerProblemsContent.js`.

- `INDUSTRY_BUYER_PROBLEMS` stores the exact localized intro, five stable problem IDs, questions and answers.
- `BUYER_PROBLEM_LABELS` stores localized shared labels and CTA text.
- `INDUSTRY_BUYER_PROBLEM_LINKS` stores related resource, glossary and AquaTools IDs.
- `withIndustryBuyerProblems(pageRecord)` attaches `content.buyerProblems` to every localized industry page.

No visible English fallback is allowed. Missing language content must fail validation.

## Rendering

React rendering is centralized in `components/industries/IndustryBuyerProblemsSection.tsx`.

Static prerendering is centralized in `scripts/prerender-marketing-pages.js` through `renderIndustryBuyerProblems(content, lang)`.

The section is inserted after the hero or direct-answer layer and before the existing solution/flow sections. The legacy `water-quality-control` problem block was replaced by the shared component so each page has only one `id="problema"`.

## CMS Merge Policy

`utils/marketingContentMerge.js` preserves the static layer when CMS overrides are missing, old or partial. A CMS override can replace `buyerProblems` only when it contains five valid problems with the same stable IDs.

`utils/marketingOverrideNormalize.js` keeps complete buyer-problem overrides available to the merge layer without letting partial content silently remove the static source.

## SEO And AI

The section uses visible H2/H3 content, conversational questions and full explanatory answers. Buyer-problem questions are not added to `FAQPage` schema. Contextual links are resolved from real IDs only.

Validation is provided by `scripts/validate-industry-buyer-problems.js` and exposed through:

- `npm run validate:industry-buyer-problems:source`
- `npm run validate:industry-buyer-problems:dist`
- `npm run validate:industry-buyer-problems:prod`
- `npm run validate:industry-buyer-problems`
