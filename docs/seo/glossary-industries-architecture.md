# Glossary and Industries Semantic Architecture

Last updated: 2026-06-18

## Scope

This architecture connects the technical glossary, Industries hub, 9 sector pages, products, AquaVerify Cloud and resources in five languages: `en`, `es`, `fr`, `it`, `ca`.

## Data Model

- Glossary terms now expose stable language-independent IDs such as `somatic-coliphages`, `haccp`, `water-safety-plan` and `alcoa-plus`.
- Legacy numeric IDs are preserved as `legacyId` for migration compatibility.
- Retired duplicate `water-safety-plan-2` resolves to canonical `water-safety-plan`.
- Supporting terms without a full page resolve to stable hub anchors: `/es/glosario#termino-haccp`.
- Priority/promoted terms resolve to localized detail pages.

## Relation Source

The public relation source is `utils/glossaryRelations.js`.

It defines:

- `GLOSSARY_INDUSTRY_TERM_IDS`
- `GLOSSARY_RELATED_TERM_IDS`
- `GLOSSARY_TERM_RELATIONS`
- `GLOSSARY_SOURCE_REFS`
- `SUPPLEMENTAL_GLOSSARY_TERMS`

The public layer no longer uses text substring heuristics such as `productRouteFor()` or `whitepaperRouteFor()`.

## Rendering

- React glossary hub renders stable `article` anchors for every term.
- React industry pages render `IndustryGlossaryTerms` before the final CTA/diagnosis section.
- Static prerender renders the same industry glossary block and controlled contextual links over plain text.

## Schema

- Industries hub: `CollectionPage`, `ItemList`, `BreadcrumbList`, `Organization`, `WebSite`.
- Industry detail pages: `WebPage` with `Service` as `mainEntity`, plus visible glossary terms in `about`/`mentions`.
- Glossary hub: `CollectionPage` with one `DefinedTermSet`.
- Glossary term pages: `WebPage` with one `DefinedTerm` main entity.

## Sitemap

Industry pages use `dateModified: 2026-06-18`; `public/sitemaps/sitemap-industries.xml` and the sitemap index are regenerated from page metadata.
