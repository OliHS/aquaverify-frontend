# About AquaVerify Scorecard

## Coverage

| Area | Status | Notes |
| --- | --- | --- |
| Localized routes | Complete | EN, ES, FR, IT and CA use existing About routes. |
| Direct answer | Complete | Visible near the top of each localized page. |
| Technical table | Complete | Ecosystem table explains need, layer, evidence and consideration. |
| FAQs | Complete | Localized FAQs feed visible content and FAQPage schema. |
| Glossary concepts | Complete | Uses real glossary IDs only. |
| Internal links | Complete | Product, platform, resources, glossary, distributors, OEM and contact paths use route helpers. |
| AboutPage schema | Complete | About graph includes Organization, WebSite, AboutPage, BreadcrumbList, ItemList and FAQPage. |
| Social image | Complete | `public/images/social/about-aquaverify-1200x630.png`. |
| Header/footer discovery | Complete | About is linked from global navigation and footer. |
| CMS hydration guardrail | Complete | Static answer layer is preserved when CMS override is incomplete. |

## Claim Risk

| Risk | Status | Mitigation |
| --- | --- | --- |
| Fake corporate address/phone | Low | No address or telephone is introduced. |
| Certification/approval claims | Low | The page avoids certified/approved wording as a product claim. |
| Regulatory guarantee | Low | Copy uses method/matrix/country/scope/authority caveats. |
| Patent/founding/customer claims | Low | No unsupported corporate history or portfolio claims are added. |
| CMS override drift | Medium | Merge guardrail preserves static About structure; future CMS edits should follow the full schema. |

## Validation Gates

| Gate | Command |
| --- | --- |
| Source completeness | `npm run validate:about:source` |
| Prerender HTML | `npm run validate:about:dist` |
| Marketing routes | `npm run marketing:routes:audit` |
| FAQ coverage | `npm run marketing:faqs:audit` |
| Claims | `npm run claims:audit` |
| CMS claims | `npm run cms:claims:audit` |
| Build/prerender | `npm run build` |

## Release Decision

Ready when:

- `npm run validate:about` passes after build.
- all marketing route and FAQ audits pass.
- claims audits show only known non-blocking warnings.
- sitemap generation includes About `lastmod` from `ABOUT_REVIEW_DATE`.
- About pages in `dist` have one H1 and no silent English fallback.
