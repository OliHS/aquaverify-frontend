# Glossary and Industries Remediation

Last updated: 2026-06-18

## Completed

- Replaced public glossary identity with stable IDs while preserving `legacyId`.
- Removed personal absolute path dependency from `scripts/generate-glossary-data.js`.
- Added explicit glossary-industry, glossary-product, glossary-resource and related-term maps.
- Added stable hub anchors for supporting terms.
- Promoted central supporting terms including `haccp`, `iso-11731`, `iso-22000`, `iso-5667-1`, `21-cfr-part-11`, `alcoa-plus`, `gxp`, `aerosolization`, `hydroponics`, `packhouse`, `turbidity`, `uv-disinfection`, `capa` and `document-control`.
- Added supplemental translated terms for `purified-water`, `water-for-injection-wfi` and `final-rinse-water`.
- Consolidated `water-safety-plan-2` into `water-safety-plan` and added 301 redirects.
- Added `IndustryGlossaryTerms` to the Industries hub and all 9 sector pages.
- Added glossary sector explorer to the glossary hub.
- Added controlled static contextual linker for sector prerender text.
- Updated industry parent architecture to `industries-hub`.
- Added industry `dateModified` metadata and regenerated sitemap dates.
- Added source/dist validator: `npm run validate:glossary-industries`.

## Editorial Notes

- `Purified water`, `Water for Injection (WFI)` and `final rinse water` were added with cautious definitions and explicit pharma/CIP context.
- Reverse osmosis, AFCH, cooling tower, fertigation and PPCL/PSL were evaluated but not promoted in this pass because they need a stronger approved editorial scope before becoming public glossary relations.
- ISO source references point to official ISO pages and do not reproduce protected standard text.

## Remaining Watch Items

- Existing product naming warnings for ENUMERA Coli100/Entero100 remain owned by product claim review.
- `npm run cms:marketing:strict` is blocked by remote CMS completeness, not local static output: `expectedUrls: 840`, `completeCmsRecords: 355`, `missingPages: 485`, `missingBlocks: 485`. No CMS write was performed.
