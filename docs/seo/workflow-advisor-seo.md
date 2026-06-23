# Workflow Advisor SEO Implementation

Date: 2026-06-23

## Implemented

- Five localized public routes.
- Canonical URLs without query parameters.
- `hreflang` plus `x-default`.
- Static prerender content for the assessment page.
- FAQPage JSON-LD.
- WebApplication JSON-LD.
- Dedicated sitemap group: `public/sitemaps/sitemap-workflow-advisor.xml`.
- OpenGraph image: `/images/social/aquaverify-workflow-advisor.png`.

## Internal Linking

Industry buyer problem cards deep-link to the assessment with sector and problem preselection.

The footer links to the assessment in every supported language.

## Checks

Run `npm run validate:workflow-advisor:dist` after `npm run build`.

