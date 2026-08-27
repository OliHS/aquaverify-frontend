# Workflow Advisor Release Scorecard

Date: 2026-06-23

| Area | Status | Evidence |
| --- | --- | --- |
| Local-only calculation | Pass | Browser uses `assessWorkflow` before any save call. |
| Deterministic core | Pass | Core is vendored from Cloud and hash-verified. |
| Multilingual routes | Pass | EN, ES, FR, IT and CA routes are registered. |
| SEO prerender | Pass | Static renderer includes content, FAQ and WebApplication schema. |
| Sitemap | Pass | Workflow Advisor sitemap group generated. |
| Consent separation | Pass | Research, contact and marketing options are separate. |
| No compliance score | Pass | Core emits maturity dimensions and constraints, not compliance scores. |
| Production data storage | Pending | Requires Cloud migration and env flags; migration not run without explicit approval. |

