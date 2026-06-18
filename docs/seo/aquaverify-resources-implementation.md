# AquaVerify Resources Implementation

Date: 2026-06-18

## Scope Applied

- Added a stable editorial type model in `utils/resourceEditorialMetadata.js`.
- Added localized editorial trust information to resource detail pages.
- Added localized editorial methodology pages:
  - `/resources/editorial-methodology`
  - `/es/recursos/metodologia-editorial`
  - `/fr/ressources/methodologie-editoriale`
  - `/it/risorse/metodologia-editoriale`
  - `/ca/recursos/metodologia-editorial`
- Changed external scientific resource pages from local PDF downloads to DOI or official-source links where available.
- Removed public local copies of external scientific PDFs from `public/resources/scientific-papers`.
- Kept the Santonja et al. conference communication as a summary without local PDF distribution until source/rights evidence is available.
- Fixed the OEM regulatory-compliance FAQ answer to affirmative wording in EN, ES, FR, IT and CA.
- Regenerated whitepaper raw content, checklist PDFs and sitemap resources.
- Added `npm run validate:resources`.
- Generated `docs/seo/resource-url-matrix.csv` and `docs/seo/resources-baseline.md`.

## Editorial Types

The enum now supports:

- `peer-reviewed-research`
- `external-research-summary`
- `aquaverify-validation-report`
- `conference-communication`
- `technical-guide`
- `operational-checklist`
- `regulatory-note`

Resource pages display editorial information only when the repository has useful metadata beyond the default document type. External summaries include source, DOI, original authors, peer-review status and relationship to AquaVerify where available.

## Structured Data

Runtime SEO and static prerender now emit a `schema.org` graph with:

- AquaVerify `Organization`
- AquaVerify `WebSite`
- page-level `WebPage`, `Article`, `TechArticle`, `Product`, or collection schema
- `author`, `publisher`, `dateModified`, `citation` and `isBasedOn` for editorial resources with source metadata

Breadcrumb and FAQ JSON-LD remain separate where already generated.

## Validation

Commands run after implementation:

- `npm run validate:resources`: passed
- `npm run marketing:routes:audit`: passed, 735 routes, 0 mismatches
- `npm run build`: passed, 741 SEO HTML routes prerendered
- `npm run cms:links:audit`: passed
- `npm run claims:audit`: passed with existing product-naming review warnings
- `npm run cms:claims:audit`: passed
- `npm run cms:assets:audit`: passed
- `npm run marketing:faqs:audit`: passed
- `npm run marketing:screenshots:audit`: passed
- `npm run cms:marketing:strict`: failed because 380 expected marketing CMS records are not synchronized

## Notes

- `public/robots.txt` was not changed.
- Existing Vite chunk-size warnings remain and are not introduced by this implementation.
- The generated checklist PDFs are valid PDF files, but full tagged-PDF accessibility metadata has not been certified.
