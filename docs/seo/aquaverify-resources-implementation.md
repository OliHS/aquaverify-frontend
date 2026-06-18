# AquaVerify Resources Implementation

Date: 2026-06-18

## Scope Applied

- Added a stable editorial type model in `utils/resourceEditorialMetadata.js`.
- Added shared resource UI labels in `utils/resourceUiLabels.js` and reused them from React, prerendered HTML, PDF generation and validation.
- Added localized editorial trust information to resource detail pages and static prerendered HTML using `aside`, `h2`, `dl`, `dt` and `dd`.
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
- Added 7 resource category pages in 5 languages with `CollectionPage`/`ItemList` schema, FAQs, selected resources and checklist links:
  - regulation/compliance
  - coliphages/viral indicators
  - laboratory/sampling/methods
  - LIMS/digital traceability
  - applications/industries
  - scientific research
  - guides/checklists
- Rebuilt checklist PDFs without FR/IT/CA fallback body text, with localized labels, PDF metadata, `/Lang` and clickable links.
- Removed duplicate markdown tables in the Excel-to-LIMS and OEM whitepapers across EN, ES, FR, IT and CA.
- Updated sitemap generation to use page-level `lastmod`, `xhtml:link` alternates and child sitemap max dates. Resource updates use `2026-06-18`.
- Regenerated whitepaper raw content, checklist PDFs and sitemap resources.
- Expanded `npm run validate:resources` and added it as the first `check:local` gate.
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
- category-level `CollectionPage` plus `ItemList` for selected resource/checklist links

Breadcrumb and FAQ JSON-LD remain separate where already generated.

## Validation

Commands run after implementation:

- `npm run validate:resources`: passed, 7 resource categories and 20 whitepaper pages checked
- `npm run marketing:routes:audit`: passed, 770 routes, 0 mismatches
- `npm run seo:sitemap`: passed
- `npm run build`: passed, 776 SEO HTML routes prerendered
- `npm run cms:links:audit`: passed
- `npm run cms:assets:audit`: passed
- `npm run claims:audit`: passed with existing product-naming review warnings
- `npm run cms:claims:audit`: passed
- `npm run marketing:faqs:audit`: passed
- `npm run marketing:screenshots:audit`: passed
- `npm run check:local`: blocked at `cms:marketing:strict`; 770 expected URLs, 355 complete CMS records, 415 missing pages and 415 missing blocks

## Notes

- `public/robots.txt` was not changed.
- Existing Vite chunk-size warnings remain and are not introduced by this implementation.
- The generated checklist PDFs include metadata and language tags, but full tagged-PDF accessibility and PDF/UA conformance are not claimed.
