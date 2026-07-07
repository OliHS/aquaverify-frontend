# Workflow Advisor overall maturity

The report adds overall maturity in the executive summary to give buyers one simple orientation point without framing it as compliance, approval, product validation or regulatory scoring.

`calculateOverallWorkflowMaturity(scores)` uses these positive maturity dimensions: workflow maturity, traceability, audit readiness, client visibility, digital readiness and analytical context completeness. The recommended weights are redistributed across dimensions that exist in the result, then rounded to one decimal.

Operational complexity is shown separately as “Operational complexity detected” / “Complejidad operativa detectada”. It is not counted as positive maturity because a complex workflow can be well governed or poorly governed; complexity describes coordination pressure, not maturity.

The visible explanation says that overall maturity is not a compliance score and not an automatic product recommendation. Validators check the formatted score, qualitative band, explanatory copy and the explicit exclusion of `operational_complexity`.
