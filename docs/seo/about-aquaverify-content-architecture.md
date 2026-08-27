# About AquaVerify Content Architecture

## Scope

The About AquaVerify page is a corporate B2B page served on the existing localized marketing routes:

- `/about`
- `/es/sobre-nosotros`
- `/fr/a-propos`
- `/it/chi-siamo`
- `/ca/sobre-nosaltres`

The page explains AquaVerify as a water microbiology, digital traceability, distribution and OEM ecosystem without adding unsupported claims about regulatory acceptance, accreditation, certification, patents, customers, countries or founding history.

## Content Source

Primary content lives in `utils/aboutContent.js`.

The module exports:

- `ABOUT_REVIEW_DATE`
- `ABOUT_KEY_CONCEPT_IDS`
- `ABOUT_PAGE_TRANSLATIONS`
- `ABOUT_REQUIRED_ROUTE_IDS`

Each language has a complete localized object. The implementation does not rely on silent English fallback for page copy.

## Runtime Rendering

Runtime rendering is handled by `components/AboutAquaVerifyLanding.tsx`.

The component is selected in `components/marketing/CommercialMarketingPageDocument.tsx` only when:

```ts
page.id === 'about'
```

The page uses the existing marketing route helpers for internal links instead of hard-coded localized URLs.

## Prerender Rendering

Static HTML is rendered in `scripts/prerender-marketing-pages.js` through the dedicated About renderer path. The prerender output includes:

- direct answer block
- ecosystem table
- internal link groups
- section body copy
- glossary concepts
- evidence and commercial links
- visible FAQs
- one JSON-LD graph

## Structured Data

About uses a single `marketing-page` JSON-LD graph with:

- `Organization`
- `WebSite`
- `AboutPage`
- `BreadcrumbList`
- `ItemList`
- `FAQPage`

The Organization node intentionally avoids unconfirmed address, telephone, founding date, founders, certifications, patents or legal assertions.

## Glossary Relations

The About page links to real glossary concepts through stable IDs:

- `indicator-microorganism`
- `somatic-coliphages`
- `escherichia-coli-e-coli`
- `indica`
- `enumera`
- `lims`
- `digital-chain-of-custody`
- `analytical-traceability`
- `coa-certificate-of-analysis`
- `audit-trail`
- `oem`

## CMS Override Guardrail

`utils/marketingContentMerge.js` preserves the static About answer layer when CMS overrides are older or structurally incomplete. This keeps prerender/runtime parity and prevents hydration from replacing the complete corporate page with legacy short copy.

## Validation

About validation is provided by:

- `npm run validate:about:source`
- `npm run validate:about:dist`
- `npm run validate:about`

`validate:about:source` checks localized content completeness, real route IDs, real glossary concept IDs and the social image.

`validate:about:dist` checks prerendered HTML, one H1, AboutPage/Organization/BreadcrumbList/FAQPage JSON-LD, direct answer, table, internal links and language leakage.
