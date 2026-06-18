# Glossary and Industries Scorecard

Last updated: 2026-06-18

| Area | Status | Evidence |
|---|---:|---|
| Stable glossary IDs | Pass | `utils/glossaryData.js` uses string `id` plus `legacyId`; validator rejects numeric public IDs. |
| Explicit industry relations | Pass | `utils/glossaryRelations.js` and `docs/seo/glossary-industry-map.csv`. |
| Supporting term anchors | Pass | Glossary hub renders `termino-{termId}` anchors; dist validator checks `termino-haccp`. |
| Industry glossary block | Pass | React component and prerender block present for hub + 9 sector pages. |
| Related terms | Pass | Key term clusters now use `GLOSSARY_RELATED_TERM_IDS`. |
| Product/resource links | Pass | Public relations use arrays, not heuristic string routing. |
| Industry schema | Pass | Detail pages include `WebPage` + `Service`; hub includes `CollectionPage` + `ItemList`. |
| Glossary schema | Pass | Hub emits one `DefinedTermSet`; term pages emit one `DefinedTerm`. |
| Sitemap lastmod | Pass | `sitemap-industries.xml` uses `2026-06-18`. |
| Validation | Pass | `validate:glossary-industries:source` and `validate:glossary-industries:dist`. |

## Commands

- `npm run validate:glossary-industries:source`
- `npm run build`
- `npm run seo:sitemap`
- `npm run validate:glossary-industries:dist`

## Score

Production readiness: 94/100.

Residual risk is mainly editorial: newly evaluated but not promoted terms should only be expanded after approved scope, sources and translations are available.
