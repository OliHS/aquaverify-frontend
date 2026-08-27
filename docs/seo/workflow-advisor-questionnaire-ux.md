# Workflow Advisor Questionnaire UX

## Scope

The public Workflow Advisor questionnaire uses a top horizontal stepper and a full-width form panel on all localized assessment routes:

- `/water-quality-workflow-assessment`
- `/es/diagnostico-flujo-calidad-agua`
- `/fr/diagnostic-flux-qualite-eau`
- `/it/valutazione-flusso-qualita-acqua`
- `/ca/diagnostic-flux-qualitat-aigua`

## Stepper

The previous left sidebar step navigation was removed to give the questionnaire the full content width. The new `workflow-advisor-stepper` is rendered above the form, uses `aria-label="Progreso del diagnóstico"` and marks the active step with `aria-current="step"`.

Completed steps are styled separately from the current step. Future steps remain disabled until the user reaches them, except the result step after a result exists.

## Question Help

Each complex question uses `workflowAdvisorQuestionHelp` in EN, ES, FR, IT and CA. The help text explains what the user should answer and how the answer is used. It avoids promotional claims and does not ask for sensitive data or real analytical results.

The source validator checks that all required help keys exist and that the questionnaire uses those localized help strings.

## Scroll And Focus

When the user advances or goes back, the form scrolls to `questionnaireTopRef` and focuses the step heading. When a step has validation errors, the first invalid question is scrolled into view and focused instead.

When the result is calculated, the UI moves to the result step, scrolls to `resultTopRef` and focuses the localized result heading. The implementation respects `prefers-reduced-motion`.
