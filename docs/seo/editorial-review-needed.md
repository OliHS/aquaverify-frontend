# Editorial Review Needed

Date: 2026-06-18

## Needs Human Or CMS Review

- CMS marketing strict sync: `npm run cms:marketing:strict` reports 380 missing marketing pages/blocks out of 735 expected URLs. Static routes build correctly, but CMS records need synchronization.
- Santonja et al. 2024 conference communication: no official source URL, DOI or distribution-rights evidence was found in the repository. AquaVerify should confirm whether it can link an official page or host a file.
- External scientific papers: local public PDFs were removed. DOI/source links remain for the journal articles with DOI metadata.
- Human reviewer names and review dates are not present for most resources. Do not invent reviewers; add them only when approved.
- PDF accessibility: generated checklists start with a valid `%PDF-` header and pass resource validation, but tagged PDF structure, PDF/UA conformance and document metadata require a dedicated PDF accessibility review.
- Legal/regulatory copy: RD 3/2023, EU Directive, ISO, EPA and country-specific compliance language should be reviewed by a qualified regulatory or quality owner before being used as authoritative guidance.
- Product claims: `npm run claims:audit` still reports existing review warnings around ENUMERA product mapping. They are outside this resource pass but should be resolved by product/technical owners.

## Search Console And Indexing Follow-Up

- Submit or recrawl `https://aquaverify.com/sitemap.xml` after deployment.
- Inspect the five new editorial methodology URLs and the updated scientific-summary URLs in Search Console.
- Confirm that removed `/resources/scientific-papers/*.pdf` URLs return the intended production behavior after deploy.
- Monitor crawl reports for stale `/en/resources/...` canonical references; source frontmatter was corrected for the affected English resources.
