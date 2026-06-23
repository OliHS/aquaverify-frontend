# AquaTools Free Scorecard

## Coverage

| Area | Status | Notes |
| --- | --- | --- |
| Approved tools | Complete | Eight public tools only. |
| Localized routes | Complete | Hub plus eight tools in EN, ES, FR, IT and CA. |
| Shared calculation core | Complete | Corporate uses vendored artifact generated from AquaVerify Cloud. |
| Acceptance vectors | Complete | Source validator executes all AquaTools Free v1 vectors. |
| Browser-only calculation | Complete | UI calls local core module and avoids backend submission. |
| Formula visibility | Complete | Runtime and prerender expose formula, variables and examples. |
| Warnings and limits | Complete | Public pages include warnings, validation rules, limitations and disclaimer. |
| Structured data | Complete | FAQPage, ItemList and WebApplication schemas included. |
| Sitemap | Complete | `sitemap-tools.xml` contains 45 URLs. |
| Navigation/footer discovery | Complete | Header and footer link to AquaTools Free. |
| Social images | Complete | Hub and each tool have a 1200x630 PNG. |

## Validation Gates

| Gate | Command | Result |
| --- | --- | --- |
| Vendor hash | `npm run verify:aquatools-core` | Passing locally |
| Source contract | `npm run validate:aquatools:source` | Passing locally |
| Sitemap generation | `npm run seo:sitemap` | Passing locally |
| Build/prerender | `npm run build` | Passing locally; 891 SEO routes prerendered |
| Dist contract | `npm run validate:aquatools:dist` | Passing locally |
| Production smoke | `npm run validate:aquatools:prod` | Not run locally; requires production deployment approval |

## Release Decision

Ready for review when the branch includes both repositories and CI repeats the local gates. Production smoke should be run only after deployment to confirm `/tools` returns the new prerendered hub.

