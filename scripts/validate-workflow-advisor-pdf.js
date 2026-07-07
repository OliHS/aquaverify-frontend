import fs from 'node:fs';
import path from 'node:path';
import {
  WORKFLOW_ADVISOR_GATE_FIXTURES,
  assert,
  buildFixtureReports,
  buildReportTextPages,
  normalizeWhitespace
} from './lib/workflow-advisor-report-gate.js';

const PDF_FORBIDDEN_TERMS = [
  'https://aquaverify.com/es/diagnostico-flujo-calidad-agua',
  'Analizar mi flujo',
  'diagnóstico de flujo de microbiología y trazabilidad del agua',
  'formulario de contacto',
  'Solicito que AquaVerify utilice estos datos',
  'Permito que AquaVerify guarde estas respuestas',
  'Preguntas frecuentes',
  'FAQ',
  'name',
  'email',
  'company',
  'countryCode',
  'buyerRole',
  'phone',
  'comment',
  'Cookie preferences',
  'Preferencias de cookies',
  'Accept all',
  'Aceptar todas',
  'Reject optional',
  'Rechazar opcionales',
  'Customize',
  'Personalizar',
  'technicalExport',
  'downloadTechnicalExport',
  'WORKFLOW-ADVISOR-REPORT-V2',
  'reportVersion',
  'matchedRuleIds',
  'workflow_maturity',
  'Imprimir informe',
  'Usa el diálogo',
  'Desactiva cabeceras',
  'Compartir resultado para mejorar',
  'workflow-result-actions'
  , 'coordinate network sampling'
  , 'manage incidents and resampling'
  , 'prepare water safety plan records'
  , 'surface water'
  , 'pool spa water'
  , 'wastewater'
  , 'chemical water parameters'
];

const REQUIRED_PDF_TERMS = [
  'Informe de diagnóstico',
  'AquaVerify',
  'Resumen ejecutivo',
  'Lectura rápida',
  'Análisis del flujo',
  'Madurez por dimensiones',
  'Plan de mejora',
  'Piloto recomendado',
  'Ruta analítica',
  'Información que falta',
  'Nivel de detalle del diagnóstico',
  'Limitaciones',
  'Cómo puede ayudar AquaVerify',
  'Impacto operativo',
  'Enfoque de mejora',
  'Condición antes de implantar',
  'Problema que resuelve',
  'Datos necesarios',
  'Resultado operativo esperado',
  'Alcance sugerido',
  'Roles implicados',
  'Evidencia que debería conservarse',
  'Por qué importa',
  'Quién debería confirmarlo',
  'Cómo usarlo'
];

const REQUIRED_INDUSTRIAL_TERMS = [
  'Agua de proceso industrial',
  'Riesgo principal',
  'Prioridad inmediata',
  'Ruta analítica',
  'Siguiente paso',
  'Conectar proceso, laboratorio y calidad',
  'Controlar puntos críticos de proceso',
  'Coordinar laboratorios externos',
  'Agua de consumo',
  'Agua de proceso',
  'Agua regenerada',
  'Ruta analítica pendiente de revisión técnica',
  'Método o referencia exacta'
];

const AGRICULTURE_TERMS = [
  'fuente de agua',
  'parcela',
  'cultivo',
  'campaña',
  'agua regenerada',
  'riego',
  'packhouse',
  'comprador',
  'auditoría',
  'CoA'
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsTerm(text, term) {
  const pattern = /^[A-Za-z]+$/.test(term)
    ? new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i')
    : new RegExp(escapeRegExp(term), 'i');
  return pattern.test(text);
}

function renderPdfText(fixtureId, report) {
  const pages = buildReportTextPages(report);
  assert(pages.length >= 6 && pages.length <= 8, `${fixtureId} PDF should stay around 6-8 pages, got ${pages.length}`);
  pages.forEach((page, index) => {
    const usefulLength = normalizeWhitespace(page).length;
    assert(usefulLength >= 120, `${fixtureId} PDF page ${index + 1} is almost empty (${usefulLength} chars)`);
  });

  return pages
    .map((page, index) => `--- Extracted page ${index + 1} ---\n${page.trim()}`)
    .join('\n\n');
}

function assertNoBrowserChrome(fixtureId, text) {
  assert(!/(^|\n)\s*\d{1,2}\s*\/\s*\d{1,2}\s*(\n|$)/.test(text), `${fixtureId} PDF contains browser page numbering`);
  assert(!/\b\d{1,2}\/\d{1,2}\/\d{2,4},?\s+\d{1,2}:\d{2}/.test(text), `${fixtureId} PDF contains browser date/time`);
  assert(!/\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun|lunes|martes|miercoles|miércoles|jueves|viernes|sábado|sabado|domingo),?\s+\d{1,2}/i.test(text), `${fixtureId} PDF contains browser date header`);
  assert(!/AquaVerify \| .*diagn[oó]stico/i.test(text), `${fixtureId} PDF contains repeated browser title`);
}

function validateForbiddenTerms(fixtureId, text) {
  for (const term of PDF_FORBIDDEN_TERMS) {
    assert(!containsTerm(text, term), `${fixtureId} PDF leaks forbidden term: ${term}`);
  }
}

function validateRequiredTerms(fixtureId, text) {
  for (const term of REQUIRED_PDF_TERMS) {
    assert(containsTerm(text, term), `${fixtureId} PDF missing required term: ${term}`);
  }
}

function validateIndustrial(text) {
  for (const term of REQUIRED_INDUSTRIAL_TERMS) {
    assert(containsTerm(text, term), `Industrial PDF missing required term: ${term}`);
  }
}

function validateAgriculture(text) {
  const matches = AGRICULTURE_TERMS.filter((term) => containsTerm(text, term));
  assert(matches.length >= 5, `Agriculture PDF needs at least five agricultural terms, found ${matches.length}: ${matches.join(', ')}`);
}

function writePdfTextArtifact(fixtureId, text) {
  fs.mkdirSync('generated', { recursive: true });
  fs.writeFileSync(path.join('generated', `workflow-advisor-pdf-text-${fixtureId}-es.txt`), `${text}\n`);
}

function main() {
  const reports = buildFixtureReports(WORKFLOW_ADVISOR_GATE_FIXTURES);

  for (const { fixture, report } of reports) {
    const text = renderPdfText(fixture.id, report);
    writePdfTextArtifact(fixture.id, text);
    assertNoBrowserChrome(fixture.id, text);
    validateForbiddenTerms(fixture.id, text);
    validateRequiredTerms(fixture.id, text);

    if (fixture.id === 'industrial') validateIndustrial(text);
    if (fixture.id === 'agriculture') validateAgriculture(text);
  }

  console.log(`OK validate:workflow-advisor:pdf (${reports.map((item) => item.fixture.id).join(', ')})`);
}

main();
