# Workflow Advisor select UX

This note documents the select UX update for the public Workflow Advisor.

The form now uses a reusable `WorkflowAdvisorSelect` component. The goal is select UX that reads as a decision control, not a text input. Each select keeps keyboard support, native semantics, `aria-describedby`, `aria-invalid`, and a visible chevron.

State styling:

- Empty: cyan background and border, with localized placeholder.
- Filled: white background, slate border and stronger text.
- Error: red background and border with the error message tied by `aria-describedby`.
- Disabled: slate background, muted text and disabled cursor.

Localized placeholders:

- EN: Select an option
- ES: Selecciona una opción
- FR: Sélectionnez une option
- IT: Seleziona un’opzione
- CA: Selecciona una opció

The component uses `appearance-none`, `ChevronDown`, and `data-select-state` so regressions can be tested in source and DOM checks.
