# Workflow Advisor PDF / Print Report

Date: 2026-07-04

The public report is exported through controlled print mode on `.workflow-report-print`.

After the report, the visible actions are:

- Descargar informe PDF / Download PDF report
- Imprimir informe / Print report
- Compartir resultado para mejorar el diagnostico / Share result to improve the assessment
- Solicitar revision tecnica / Request technical review

The download and print actions both open the browser print dialog so the visitor can save the consultative report as PDF. The visible instructions ask the visitor to disable browser headers and footers.

## Excluded From PDF/Print

Print mode hides:

- global navigation and footer
- landing and questionnaire blocks
- research modal and any legacy `.workflow-advisor-consent`
- contact form and contact consents
- FAQ
- cookie banner and cookie panel
- technical annex and JSON export
- all `.no-print` controls

Required CSS selectors:

```css
.workflow-advisor-consent,
.workflow-advisor-contact-form,
.workflow-advisor-faq,
.workflow-advisor-cookie,
.cookie-banner,
.no-print {
  display: none !important;
}
```

The PDF must not contain research checkbox copy, privacy-policy links, contact fields, contact consent, marketing consent, FAQ, cookie controls or browser header/footer text.
