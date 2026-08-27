# Workflow Advisor i18n audit

The i18n audit covers questionnaire labels, option labels, visible report sections, print/PDF text and CRM Marketing report output across EN, ES, FR, IT and CA.

The Spanish gate blocks raw keys such as `coordinate network sampling`, `manage incidents and resampling`, `prepare water safety plan records`, `surface water`, `pool spa water`, `wastewater`, `chemical water parameters`, `operational screening`, `other reference`, `drinking water`, `process water` and `50 to 199 month`.

FR, IT and CA keep localized labels for the municipal priority problems and water-use values. Allowed English technical strings are limited to brand or domain terms such as AquaVerify, AquaVerify Cloud, LIMS, CoA, ISO, EPA, QA/QC, OEM, AquaTools, INDICA, ENUMERA, PLAQUE and Water Safety Plan when accompanied by localized context.

The five-language checks render deterministic result fixtures through the shared core and fail when visible text falls back to raw English keys, missing translation placeholders or undefined values.
