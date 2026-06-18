# Resources Post-Audit Remediation

Date: 2026-06-18

## Completed Remediation

- Centralized resource interface labels in `utils/resourceUiLabels.js` for React, prerendered HTML, PDF generation and validation.
- Added static editorial trust blocks to prerendered resource HTML for validation reports, external summaries, conference communication and methodology pages.
- Rebuilt all checklist PDFs in EN, ES, FR, IT and CA without silent English body fallback, with `/Lang`, Info metadata and clickable links.
- Added 7 resource category collections in 5 languages: regulation/compliance, coliphages/viral indicators, laboratory/sampling/methods, LIMS/digital traceability, applications/industries, scientific research and guides/checklists.
- Updated sitemap generation to use stable page dates, `xhtml:link` alternates and child sitemap max `lastmod`.
- Removed duplicate tables in Excel-to-LIMS and OEM whitepapers across all languages.
- Expanded `validate:resources` to cover labels, categories, PDFs, duplicate tables, sitemap dates, static HTML and placeholder checks.
- Added `validate:resources` as the first `check:local` gate.

## Validation Snapshot

- `npm run validate:resources`: passed.
- `npm run marketing:routes:audit`: passed, 770 routes.
- `npm run build`: passed, 776 prerendered SEO HTML routes.
- `npm run check:local`: blocked at `cms:marketing:strict` because CMS records are not synchronized.

## Remaining External Blocker

CMS strict sync is outside the static repo changes. Current audit reports 770 expected URLs, 355 complete CMS records, 415 missing pages and 415 missing content blocks.
