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
  'coordinate network sampling',
  'manage incidents and resampling',
  'prepare water safety plan records',
  'surface water',
  'pool spa water',
  'wastewater',
  'chemical water parameters',
  '50 to 199 month',
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
  'documentacion',
  'evaluacion',
  'revision',
  'metodo',
  'informacion',
  'aprobacion',
  'electronica',
  'tecnica',
  'modulos',
  'auditoria',
  'analitico',
  'aceptacion',
  'automatico',
  'pais',
  'estadistica',
  'investigacion',
  'opcion',
  'direccion',
  'coordinacion'
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
  'país',
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
  assert(/no debe cerrarse|deben confirmarse|requiere confirmar/i.test(report.analyticalReview?.paragraph || ''), `${fixture.id} should explain that product selection is not closed`);
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
  assert(text.includes('Piloto recomendado'), `${fixture.id} must render recommended pilot`);
  assert(text.includes('Nivel de detalle del diagnóstico'), `${fixture.id} must render diagnostic detail level`);
  [
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
  ].forEach((term) => assert(text.includes(term), `${fixture.id} visible report text missing enriched term: ${term}`));
  assert(!text.includes('es relevante porque Las respuestas'), `${fixture.id} contains automated recommendation wording`);
  assert(!text.includes('es relevante porque El resultado'), `${fixture.id} contains automated recommendation wording`);
  assert(!text.includes('es relevante porque La trazabilidad'), `${fixture.id} contains automated recommendation wording`);
  const explanations = (report.priorityProblems || []).map((item) => item.explanation || item.paragraph).filter(Boolean);
  assert(new Set(explanations).size === explanations.length, `${fixture.id} priority problem explanations must not repeat`);
  assert((report.priorityProblems || []).every((item) => item.title && item.explanation && item.operationalImpact && item.improvementFocus && item.aquaverifySupport && item.relatedCapabilities?.length && item.nextStep), `${fixture.id} priority problems must include all premium fields`);
  assert(!explanations.some((item) => item.includes('El problema seleccionado indica')), `${fixture.id} priority problems must not use generic repeated wording`);
  const missingItems = report.missingInformation || [];
  assert(missingItems.length > 0, `${fixture.id} missing information must not be empty`);
  assert(missingItems.every((item) => typeof item !== 'string' && item.title && item.whyItMatters && item.owner && item.useInReview), `${fixture.id} missing information must be structured`);
  const missingReasons = missingItems.map((item) => item.whyItMatters);
  assert(new Set(missingReasons).size === missingReasons.length, `${fixture.id} missing information reasons must not repeat`);
  assert(report.pilotRecommendation?.scope && report.pilotRecommendation?.roles && report.pilotRecommendation?.evidence && report.pilotRecommendation?.expectedOutcome, `${fixture.id} must include complete recommended pilot`);
  assert(report.diagnosticDetail?.status && report.diagnosticDetail?.paragraph, `${fixture.id} must include assessment detail level`);
  assert(!/compliance|cumplimiento/i.test(`${report.diagnosticDetail?.title || ''} ${report.diagnosticDetail?.status || ''} ${report.diagnosticDetail?.paragraph || ''}`), `${fixture.id} assessment detail must not be framed as compliance`);
  assert((report.relatedResources || []).length >= 3, `${fixture.id} must include at least three related resources`);
  assert((report.relatedResources || []).every((resource) => resource.title && resource.description && resource.url && resource.typeLabel), `${fixture.id} resources must include title, description, URL and type`);
  assert(!(report.relatedResources || []).some((resource) => /diagnostico-flujo-calidad-agua|diagnostic-flux|diagnosi-flusso/i.test(resource.url)), `${fixture.id} resources must not point to the diagnostic landing`);
  if (fixture.id === 'municipal') {
    [
      'Coordinar muestreo de red',
      'Gestionar incidencias y remuestreos',
      'Preparar registros para el Plan de Seguridad del Agua',
      'Agua superficial',
      'Agua residual',
      'Parámetros químicos del agua',
      'Suficiente para orientar el flujo, pero requiere revisión técnica para cerrar ruta analítica.'
    ].forEach((term) => assert(text.includes(term), `Municipal report missing ${term}`));
  }
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
