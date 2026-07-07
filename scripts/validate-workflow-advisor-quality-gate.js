import fs from 'node:fs';
import path from 'node:path';
import { reportV2Version } from '../vendor/workflow-advisor-core/index.js';
import {
  WORKFLOW_ADVISOR_GATE_FIXTURES,
  assert,
  buildFixtureReports,
  normalizeWhitespace,
  stripUrls,
  visibleReportText,
  writeQualityStatus
} from './lib/workflow-advisor-report-gate.js';

const FORBIDDEN_ES_TERMS = [
  'WORKFLOW-ADVISOR-REPORT-V2',
  'PRIMARY RISK',
  'IMMEDIATE PRIORITY',
  'ANALYTICAL ROUTE',
  'NEXT STEP',
  'connect process lab and quality',
  'control critical process points',
  'coordinate external labs',
  'operational screening',
  'other reference',
  'drinking water',
  'process water',
  '50 to 199 month',
  'connect water source to crop risk',
  'manage reclaimed water evidence',
  'improve audit evidence',
  'name',
  'company',
  'countryCode',
  'buyerRole',
  'technical review',
  'Imprimir informe',
  'Usa el diálogo',
  'Desactiva cabeceras',
  'Compartir resultado para mejorar',
  'comment',
  'reason.',
  'condition.',
  'constraint.',
  'recommendation.',
  'module.',
  'product.',
  'matchedRuleIds',
  'workflow_maturity',
  'traceability_signal_count',
  'customer_visibility_gap',
  'undefined',
  'missing translation',
  'Screening INDICA',
  'Seguimiento CRM',
  'module.crm'
];

const UNACCENTED_SPANISH_TERMS = [
  'Diagnostico',
  'microbiologia',
  'revision',
  'metodo',
  'informacion',
  'tecnica',
  'modulos',
  'auditoria',
  'analitico',
  'evaluacion',
  'aceptacion',
  'pais'
];

const REQUIRED_SPANISH_TERMS = [
  'Diagnóstico',
  'microbiología',
  'revisión',
  'método',
  'información',
  'técnica',
  'módulos',
  'auditoría',
  'analítico',
  'evaluación',
  'aceptación',
  'país'
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsTerm(text, term) {
  const haystack = normalizeWhitespace(text);
  const pattern = /^[A-Za-z]+$/.test(term)
    ? new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i')
    : new RegExp(escapeRegExp(term), 'i');
  return pattern.test(haystack);
}

function writeVisibleTextArtifact(fixtureId, text) {
  fs.mkdirSync('generated', { recursive: true });
  fs.writeFileSync(path.join('generated', `workflow-advisor-quality-text-${fixtureId}-es.txt`), `${text}\n`);
}

function validateForbiddenTerms(fixtureId, text) {
  const textWithoutUrls = stripUrls(text);
  for (const term of FORBIDDEN_ES_TERMS) {
    assert(!containsTerm(textWithoutUrls, term), `${fixtureId} visible report leaks forbidden term: ${term}`);
  }

  for (const term of UNACCENTED_SPANISH_TERMS) {
    assert(!containsTerm(textWithoutUrls, term), `${fixtureId} visible report contains unaccented Spanish term: ${term}`);
  }
}

function validateRequiredSpanishTerms(combinedText) {
  const textWithoutUrls = stripUrls(combinedText);
  for (const term of REQUIRED_SPANISH_TERMS) {
    assert(containsTerm(textWithoutUrls, term), `Visible ES report text missing accented term: ${term}`);
  }
}

function validatePrudentAnalyticalRoute(fixture, report, text) {
  const methodContext = fixture.input.answers.method_context;
  const needsReview = ['other_reference', 'not_defined', undefined, null, ''].includes(methodContext);
  if (!needsReview) return;

  assert(report.analyticalReview?.title === 'Ruta analítica pendiente de revisión técnica', `${fixture.id} should use pending technical review analytical route`);
  assert(report.analyticalReview?.paragraph?.includes('no debe cerrarse'), `${fixture.id} should explain that product selection is not closed`);
  assert((report.analyticalReview?.candidates || []).every((candidate) => candidate.status === 'No recomendación cerrada'), `${fixture.id} should mark candidates as non-closed recommendations`);
  assert(text.includes('Método o referencia exacta'), `${fixture.id} should request exact method/reference`);
}

function validateReport(report, fixture, text) {
  assert(report.reportVersion === reportV2Version, `${fixture.id} report must use report V2`);
  assert(!text.includes(report.reportVersion), `${fixture.id} must not render report version to users`);
  assert(text.includes('Informe de diagnóstico'), `${fixture.id} must render corporate report title`);
  assert(text.includes('Lectura rápida'), `${fixture.id} must render localized quick-read section`);
  assert(text.includes('Ruta analítica'), `${fixture.id} must render localized analytical route`);
  assert(text.includes('Siguiente paso'), `${fixture.id} must render localized next-step label`);
  assert(text.includes('Plan de mejora'), `${fixture.id} must render improvement plan`);
  [
    'Cómo puede ayudar AquaVerify',
    'Impacto operativo',
    'Enfoque de mejora',
    'Condición antes de implantar',
    'Problema que resuelve',
    'Datos necesarios',
    'Resultado operativo esperado'
  ].forEach((term) => assert(text.includes(term), `${fixture.id} visible report text missing enriched term: ${term}`));
  assert(!text.includes('es relevante porque Las respuestas'), `${fixture.id} contains automated recommendation wording`);
  assert(!text.includes('es relevante porque El resultado'), `${fixture.id} contains automated recommendation wording`);
  assert(!text.includes('es relevante porque La trazabilidad'), `${fixture.id} contains automated recommendation wording`);
  validatePrudentAnalyticalRoute(fixture, report, text);
}

function main() {
  const reports = buildFixtureReports(WORKFLOW_ADVISOR_GATE_FIXTURES);
  const combined = [];

  for (const { fixture, report } of reports) {
    const text = visibleReportText(report);
    writeVisibleTextArtifact(fixture.id, text);
    combined.push(text);
    validateForbiddenTerms(fixture.id, text);
    validateReport(report, fixture, text);
  }

  validateRequiredSpanishTerms(combined.join('\n\n'));
  writeQualityStatus(true, { reportVersion: reportV2Version });
  console.log(`OK validate:workflow-advisor:quality-gate (${reports.map((item) => item.fixture.id).join(', ')})`);
}

try {
  main();
} catch (error) {
  writeQualityStatus(false, {
    error: error instanceof Error ? error.message : String(error)
  });
  throw error;
}
