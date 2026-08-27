# Workflow Advisor final report polish

## Scope

The final Workflow Advisor result must read as an AquaVerify consultative report, not as raw rule output. The client-facing report now uses report V2 fields for cover, localized quick read labels, interpreted context, flow diagnosis, maturity, priority problems, improvement plan, digital modules, analytical route, missing information, related resources and limitations.

## Corrections

- The visible report no longer renders `workflow-advisor-report-v2`.
- Quick read labels come from `quickReadItems`, not camelCase keys.
- Industrial coded answers are localized before rendering.
- Recommendations avoid automatic phrases such as `es relevante porque Las...`.
- Related resources include title, description and localized URL.
- The technical JSON remains behind the development-only technical annex.

## Validation

Run:

```bash
npm run validate:workflow-advisor
npm run build
npm run validate:workflow-advisor
```

