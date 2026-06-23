# About AquaVerify Remediation

## Problem

The previous About page was too brief for a scientific B2B website. It did not clearly explain:

- what AquaVerify is
- what the product/platform/channel ecosystem contains
- who AquaVerify serves
- what AquaVerify does not claim to do
- how the page connects to glossary, resources, products, Cloud, distributors and OEM routes

For GEO/AEO extraction, the page needed direct-answer copy, structured Q&A, internal entity links and prudent claim boundaries.

## Remediation Applied

The About page was rebuilt as a dedicated localized corporate landing page with:

- direct answer section
- three ecosystem pillars
- technical ecosystem table
- eight explanatory sections
- glossary concept block
- evidence/transparency links
- commercial route links
- localized FAQs
- final technical-recommendation CTA
- dedicated 1200x630 social image
- AboutPage JSON-LD graph

## Claim Boundaries

The page avoids unsupported claims such as:

- certified products
- approved workflows
- compliance guarantees
- compliance by default
- patents
- founding story
- customer counts
- country counts
- legal address or telephone

Prudent language is used around:

- method validation
- laboratory scope
- competent authority review
- regulatory acceptance
- distributor/OEM availability
- accredited laboratory responsibilities

## Route And Link Handling

Internal links are resolved through `getMarketingPagePath()` so localized routes stay aligned with `MARKETING_ROUTE_PATHS`.

The page is linked from:

- header navigation
- footer action/navigation area
- sitemap generation through existing marketing route metadata

## Runtime/Prerender Parity

Runtime uses `AboutAquaVerifyLanding`.

Prerender uses the dedicated About path in `scripts/prerender-marketing-pages.js`.

CMS override merging preserves the static About structure unless a future CMS override supplies the full answer-layer shape.

## Validation Commands

Run:

```bash
npm run validate:about:source
npm run seo:sitemap
npm run build
npm run validate:about:dist
```

Full release validation should also include:

```bash
npm run validate:resources
npm run validate:glossary-industries
npm run marketing:routes:audit
npm run marketing:faqs:audit
npm run cms:links:audit
npm run cms:assets:audit
npm run claims:audit
npm run cms:claims:audit
```
