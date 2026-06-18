# Editorial Review Needed

Date: 2026-06-18

## Needs Human Or CMS Review

- CMS marketing strict sync: `npm run cms:marketing:strict` reports 415 missing marketing pages and 415 missing content blocks out of 770 expected URLs. Static routes build correctly, but CMS records need synchronization. The first missing records are the 35 new resource-category routes.
- Santonja et al. 2024 conference communication: no official source URL, DOI or distribution-rights evidence was found in the repository. AquaVerify should confirm whether it can link an official page or host a file.
- External scientific papers: local public PDFs were removed. DOI/source links remain for the journal articles with DOI metadata.
- Human reviewer names and review dates are not present for most resources. Do not invent reviewers; add them only when approved.
- PDF accessibility: generated checklists include PDF metadata, `/Lang` and clickable links, and pass resource validation. They are not tagged PDFs and do not claim PDF/UA conformance.
- Legal/regulatory copy: RD 3/2023, EU Directive, ISO, EPA and country-specific compliance language should be reviewed by a qualified regulatory or quality owner before being used as authoritative guidance.
- Product claims: `npm run claims:audit` still reports existing review warnings around ENUMERA product mapping. They are outside this resource pass but should be resolved by product/technical owners.

## Search Console And Indexing Follow-Up

- Submit or recrawl `https://aquaverify.com/sitemap.xml` after deployment.
- Inspect the 35 new category URLs, the five editorial methodology URLs and the updated scientific-summary URLs in Search Console.
- Confirm that removed `/resources/scientific-papers/*.pdf` URLs return the intended production behavior after deploy.
- Monitor crawl reports for stale `/en/resources/...` canonical references; source frontmatter was corrected for the affected English resources.
