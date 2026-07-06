# Workflow Advisor Accessibility

## Stepper

The top stepper is a `nav` landmark with `aria-label="Progreso del diagnóstico"`. The active step uses `aria-current="step"`, disabled future steps use native `disabled`, and all step controls have visible focus styles.

## Errors

Required fields are validated step by step. If validation fails, the UI scrolls to the first invalid question and focuses the field or its error. Error text is linked with `aria-describedby`; invalid controls use `aria-invalid`.

## Modal

The PDF sharing modal uses `role="dialog"`, `aria-modal="true"` and `aria-labelledby`. Focus is trapped inside the modal, Escape closes it, and focus returns to the print/save PDF button after closing.

The modal does not close on accidental background clicks. Its actions are explicit: cancel, download without sharing, or share and download.

## Motion

Automatic scrolling respects `prefers-reduced-motion`, switching from smooth scrolling to immediate scrolling when reduced motion is requested.
