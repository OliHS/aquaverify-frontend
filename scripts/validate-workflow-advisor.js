import fs from 'node:fs';
import path from 'node:path';
import {
  WORKFLOW_ADVISOR_COPY,
  WORKFLOW_ADVISOR_MARKETING_PAGES,
  WORKFLOW_ADVISOR_ROUTE_ID
} from '../utils/workflowAdvisorContent.js';
import {
  MARKETING_LANGUAGES,
  MARKETING_PAGES,
  findMarketingPageByPath,
  getMarketingPagePath
} from '../utils/marketingPages.js';
import { getIndustryBuyerProblems } from '../utils/industryBuyerProblemsContent.js';
import {
  assessmentPaths,
  assessmentVersion,
  assessWorkflow,
  buildWorkflowAdvisorReportV2,
  buyerProblemIdsBySector,
  catalogVersion,
  languages,
  questionnaireVersion,
  reportV2Version,
  rules,
  rulesVersion,
  sectors
} from '../vendor/workflow-advisor-core/index.js';

const SITE_URL = 'https://aquaverify.com';
const vectors = JSON.parse(fs.readFileSync('vendor/workflow-advisor-core/test-vectors/workflow-advisor-v1.json', 'utf8'));
const mode = process.argv.includes('--dist') ? 'dist'
  : process.argv.includes('--prod') ? 'prod'
    : 'source';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function htmlPath(routePath) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  return normalized ? path.join('dist', normalized, 'index.html') : path.join('dist', 'index.html');
}

function publicPath(routePath) {
  return path.join('public', routePath.replace(/^\/+/, ''));
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function vectorRecommendationIds(result) {
  return new Set(result.recommendations.flatMap((item) => [
    item.recommendationId,
    item.targetId,
    item.targetId ? `${item.type}.${item.targetId}` : ''
  ].filter(Boolean)));
}

function validateVectors() {
  assert(vectors.length >= sectors.length, 'Expected at least one vector per sector or use case');
  for (const vector of vectors) {
    const result = assessWorkflow(vector.input);
    assert(result.assessmentVersion === assessmentVersion, `${vector.id} assessment version mismatch`);
    assert(result.questionnaireVersion === questionnaireVersion, `${vector.id} questionnaire version mismatch`);
    assert(result.rulesVersion === rulesVersion, `${vector.id} rules version mismatch`);
    assert(result.catalogVersion === catalogVersion, `${vector.id} catalog version mismatch`);

    for (const [dimensionId, level] of Object.entries(vector.expectedScores || {})) {
      const score = result.scores.find((item) => item.dimensionId === dimensionId);
      assert(score?.level === level, `${vector.id} expected ${dimensionId} ${level}, got ${score?.level}`);
    }

    const recommendationIds = vectorRecommendationIds(result);
    for (const id of vector.expectedRecommendations || []) {
      assert(recommendationIds.has(id), `${vector.id} missing expected recommendation ${id}`);
    }
    for (const id of vector.mustNotRecommend || []) {
      assert(!recommendationIds.has(id), `${vector.id} returned forbidden recommendation ${id}`);
    }
    for (const id of vector.expectedConstraints || []) {
      assert(result.constraints.includes(id), `${vector.id} missing expected constraint ${id}`);
    }
  }
}

function validateSource() {
  assert(WORKFLOW_ADVISOR_MARKETING_PAGES.length === 1, 'Expected one Workflow Advisor marketing page');
  assert(MARKETING_PAGES.some((page) => page.id === WORKFLOW_ADVISOR_ROUTE_ID), 'Workflow Advisor missing from MARKETING_PAGES');
  assert(JSON.stringify(languages) === JSON.stringify(MARKETING_LANGUAGES), 'Language contract mismatch');
  assert(sectors.length === 9, `Expected nine sectors, found ${sectors.length}`);
  assert(Object.keys(assessmentPaths).length === MARKETING_LANGUAGES.length, 'Assessment path language count mismatch');

  const page = WORKFLOW_ADVISOR_MARKETING_PAGES[0];
  assert(page.schemaType === 'WebApplication', 'Workflow Advisor schemaType must be WebApplication');
  assert(page.category === 'workflow-advisor', 'Workflow Advisor category mismatch');

  const routeSet = new Set();
  for (const lang of MARKETING_LANGUAGES) {
    const content = page.translations[lang];
    assert(content?.path === assessmentPaths[lang], `Path mismatch for ${lang}`);
    assert(getMarketingPagePath(WORKFLOW_ADVISOR_ROUTE_ID, lang) === content.path, `Route helper mismatch for ${lang}`);
    assert(findMarketingPageByPath(content.path)?.page?.id === WORKFLOW_ADVISOR_ROUTE_ID, `Path lookup mismatch for ${lang}`);
    assert(content.title && content.description && content.seoTitle && content.seoDescription, `Missing SEO copy for ${lang}`);
    assert(content.blocks?.length >= 6, `Expected six content blocks for ${lang}`);
    assert(content.faqs?.length >= 4, `Expected four FAQ entries for ${lang}`);
    assert(content.localModeNote, `Missing local mode note for ${lang}`);
    assert(content.privacyConsent && content.contactConsent && content.marketingConsent, `Missing consent copy for ${lang}`);
    assert(content.limits, `Missing limitations copy for ${lang}`);
    assert(content.ogImage === '/images/social/aquaverify-workflow-advisor.png', `Unexpected OG image for ${lang}`);
    routeSet.add(content.path);
  }
  assert(routeSet.size === 5, `Expected five unique Workflow Advisor routes, found ${routeSet.size}`);

  const socialImage = publicPath('/images/social/aquaverify-workflow-advisor.png');
  assert(fs.existsSync(socialImage), `Missing Workflow Advisor social image: ${socialImage}`);
  assert(fs.statSync(socialImage).size > 10_000, 'Workflow Advisor social image is unexpectedly small');

  for (const sectorId of sectors) {
    assert((buyerProblemIdsBySector[sectorId] || []).length === 5, `Expected five buyer problems for ${sectorId}`);
    for (const lang of MARKETING_LANGUAGES) {
      const problems = getIndustryBuyerProblems(sectorId, lang);
      assert(problems?.industryId === sectorId, `Missing industryId for ${sectorId} ${lang}`);
      assert(problems?.problems?.length === 5, `Expected five public buyer problems for ${sectorId} ${lang}`);
    }
  }

  validateVectors();

  const component = readText('components/workflow/WorkflowAdvisorLanding.tsx');
  assert(component.includes('assessWorkflow('), 'Landing must calculate through deterministic core');
  assert(component.includes('buildWorkflowAdvisorReportV2'), 'Landing must render Workflow Advisor report V2');
  assert(component.includes('workflow-report-print'), 'Landing must expose dedicated workflow-report print container');
  assert(component.includes('workflow-report-print-mode'), 'Landing must enable controlled report-only print mode');
  assert(component.includes('workflow-advisor-contact-form'), 'Landing must isolate contact form from report print mode');
  assert(component.includes('workflow-advisor-stepper'), 'Landing must render the horizontal Workflow Advisor stepper');
  assert(component.includes('aria-label="Progreso del diagnóstico"'), 'Stepper must expose the required diagnostic progress aria label');
  assert(component.includes("aria-current={isCurrent ? 'step' : undefined}"), 'Current step must use aria-current="step"');
  assert(component.includes('workflow-questionnaire-panel workflow-form-panel'), 'Questionnaire must render as a full-width panel');
  assert(component.includes('container mx-auto max-w-6xl px-6'), 'Questionnaire shell must use the corporate full-width content measure');
  assert(!component.includes('<aside className="no-print lg:sticky'), 'Workflow Advisor must not use the old left sidebar step navigation');
  assert(component.includes('workflow-advisor-research-modal'), 'Research consent must open in a post-result modal');
  assert(component.includes('workflow-advisor-modal'), 'PDF sharing choice must open in a modal excluded from print');
  assert(!component.includes('workflow-advisor-consent no-print'), 'Fixed research consent block must not render on the main page');
  assert(component.includes('downloadTechnicalExport'), 'Technical JSON export must be explicit support-only action');
  assert(!component.includes('downloadResult('), 'JSON result download must not be the primary CTA');
  assert(!component.includes('quickReadLabel'), 'Quick read labels must come localized from report V2');
  assert(!component.includes('report.reportVersion'), 'Technical report version must not be visible in the client report');
  assert(component.includes("credentials: 'omit'"), 'Public API calls must omit credentials');
  assert(component.includes('researchConsent') && component.includes('contactConsent') && component.includes('marketingConsent'), 'Consent switches must remain separate');
  assert(component.includes('Idempotency-Key'), 'Assessment save should use idempotency key');
  assert(component.includes('workflow-advisor-tool'), 'Landing must expose workflow-advisor-tool anchor');
  assert(component.includes('saveAssessment') && component.includes('submitContact'), 'Landing must support research save and contact lead flow');
  assert(component.includes("saveAssessment('research')"), 'Research sharing must explicitly call the research save path');
  assert(component.includes("saveAssessment('contact')"), 'Contact requests must explicitly call the contact save path');
  assert(component.includes('downloadWithoutSharing') && component.includes('shareAndDownload'), 'PDF modal must offer download without sharing and share-and-download actions');
  assert(component.includes('disabled={!researchConsent}') && component.includes('onClick={shareAndDownload}'), 'Share-and-download must require the explicit research checkbox');
  assert(component.includes('onClick={downloadWithoutSharing}'), 'Download without sharing must be a separate local action');
  assert(component.includes('onClick={closePdfModal}'), 'Cancel must close the PDF modal without downloading');
  assert(component.includes('setPdfModalError(copy.shareError)'), 'Share failures must keep the no-share download path available');
  assert(!component.includes('saveAssessment(false)') && !component.includes('saveAssessment(true)'), 'Save path must not rely on boolean consent mixing');
  assert(component.includes('researchConsent: isResearchSave'), 'Research save must only send research consent for research action');
  assert(component.includes('contactConsent: isContactSave'), 'Contact save must only send contact consent for contact action');
  assert(component.includes('marketingConsent: isContactSave ? marketingConsent : false'), 'Research sharing must not send marketing consent');
  assert(component.includes('questionnaireTopRef') && component.includes('resultTopRef'), 'Questionnaire and result must have scroll targets');
  assert(component.includes('scrollIntoView({ behavior: prefersReducedMotion() ?') && component.includes('prefers-reduced-motion'), 'Step changes must scroll while respecting reduced motion');
  assert(component.includes('focusFirstError') && component.includes('data-question-id'), 'Validation errors must scroll and focus the first invalid question');
  assert(component.includes('stepHeadingRef') && component.includes('resultHeadingRef'), 'Step and result headings must receive focus after navigation');
  assert(component.includes('workflowAdvisorQuestionHelp'), 'Question help dictionary is required');
  [
    'sector_id',
    'country_code',
    'organization_type',
    'buyer_role',
    'site_count_band',
    'lab_model',
    'sample_volume_band',
    'current_systems',
    'digitised_stages',
    'priority_problem_ids',
    'evidence_needs',
    'implementation_timeline',
    'preferred_route',
    'target_groups',
    'result_type',
    'intended_use',
    'method_context',
    'sample_volume_context',
    'water_use_context',
    'laboratory_workflow_needs',
    'release_decision_context',
    'facility_assets',
    'pharma_quality_context',
    'hospitality_context'
  ].forEach((key) => {
    assert(component.includes(`'${key}'`) && component.includes(`${key}:`), `Question help missing key ${key}`);
  });
  [
    "downloadWithoutSharing: 'Download without sharing'",
    "downloadWithoutSharing: 'Descargar sin compartir'",
    "downloadWithoutSharing: 'Télécharger sans partager'",
    "downloadWithoutSharing: 'Scarica senza condividere'",
    "downloadWithoutSharing: 'Descarregar sense compartir'",
    "shareAndDownload: 'Share and download'",
    "shareAndDownload: 'Compartir y descargar'",
    "shareAndDownload: 'Partager et télécharger'",
    "shareAndDownload: 'Condividi e scarica'",
    "shareAndDownload: 'Compartir i descarregar'"
  ].forEach((term) => assert(component.includes(term), `PDF modal localization missing ${term}`));
  assert(component.includes('body.workflow-report-print-mode .workflow-advisor-consent'), 'Print CSS must still hide any legacy research consent block');
  assert(component.includes('body.workflow-report-print-mode .workflow-advisor-stepper'), 'Print CSS must hide the stepper');
  assert(component.includes('body.workflow-report-print-mode .workflow-advisor-modal'), 'Print CSS must hide modal surfaces');
  assert(component.includes('body.workflow-report-print-mode .workflow-advisor-contact-form'), 'Print CSS must hide contact form');
  assert(component.includes('body.workflow-report-print-mode .workflow-advisor-cookie'), 'Print CSS must hide cookie surfaces');
  assert(component.includes('body.workflow-report-print-mode .cookie-banner'), 'Print CSS must hide cookie banner');
  assert(component.includes('.workflow-advisor-modal,') && component.includes('header:not(.workflow-report-header)'), 'Print CSS must include the mandatory no-print selector set');
  assert(component.includes('<main className="bg-slate-50 text-slate-900">'), 'Workflow Advisor main surface must use the light corporate background');
  assert(component.includes('workflow-advisor-landing border-b border-cyan-100'), 'Workflow Advisor hero must use the light corporate hero surface');
  assert(component.includes('Preparando el diagnóstico…') || readText('pages/MarketingRoutePage.tsx').includes('Preparando el diagnóstico…'), 'Workflow Advisor route must have a localized loading shell');
  ['workflow-advisor-landing bg-slate-950', 'workflow-advisor-landing bg-black', 'workflow-advisor-landing bg-zinc-950', 'workflow-advisor-landing bg-neutral-950', 'from-black', 'via-slate-950', 'dark:'].forEach((term) => {
    assert(!component.includes(term), `Workflow Advisor primary layout contains forbidden dark design token: ${term}`);
  });

  const cookieComponent = readText('components/CookieConsent.tsx');
  [
    'Preferencias de cookies',
    'Usamos cookies esenciales para que el sitio funcione y cookies opcionales para mejorar la experiencia de AquaVerify.',
    'Política de cookies',
    'Aceptar todas',
    'Rechazar opcionales',
    'Personalizar'
  ].forEach((term) => assert(cookieComponent.includes(term), `Cookie banner missing Spanish copy: ${term}`));
  assert(cookieComponent.includes('cookie-banner workflow-advisor-cookie no-print'), 'Cookie banner must be excluded from print/PDF');
  assert(!cookieComponent.match(/es:\s*{[\s\S]*Cookie preferences[\s\S]*?}/), 'Spanish cookie banner must not use English title');
  assert(!cookieComponent.match(/es:\s*{[\s\S]*Accept all[\s\S]*?}/), 'Spanish cookie banner must not use English accept-all label');

  const regression = assessWorkflow({
    questionnaireVersion,
    lang: 'es',
    sectorId: 'agriculture-water',
    answers: {
      country_code: 'FR',
      organization_type: 'private_laboratory',
      buyer_role: 'executive',
      site_count_band: 'one',
      lab_model: 'internal',
      sample_volume_band: '50_to_199_month',
      current_systems: ['external_lab_portal', 'erp', 'spreadsheets'],
      digitised_stages: ['control_plan', 'technical_review', 'inventory'],
      priority_problem_ids: ['connect-water-source-to-crop-risk', 'manage-reclaimed-water-evidence', 'improve_audit_evidence'],
      evidence_needs: ['dashboards', 'method_traceability', 'coa'],
      implementation_timeline: 'within_three_months',
      preferred_route: 'authorised_distributor',
      target_groups: ['somatic_coliphages', 'f_specific_coliphages', 'e_coli', 'general_microbiology'],
      result_type: 'presence_absence',
      intended_use: 'routine_internal_control',
      method_context: 'not_defined',
      sample_volume_context: 'one_ml',
      water_use_context: ['irrigation_water', 'reclaimed_water']
    }
  });
  const reportV2 = regression.reportV2 || buildWorkflowAdvisorReportV2({ result: regression, lang: 'es' });
  const visibleV2 = JSON.stringify({
    title: reportV2.title,
    facts: reportV2.interpretedContext.facts.map((fact) => fact.value),
    analyticalReview: {
      title: reportV2.analyticalReview.title,
      paragraph: reportV2.analyticalReview.paragraph,
      candidates: reportV2.analyticalReview.candidates.map((candidate) => candidate.title)
    },
    recommendationSections: reportV2.recommendationSections.map((item) => item.title),
    quickReadItems: reportV2.quickReadItems,
    relatedResources: reportV2.relatedResources.map((item) => ({ url: item.url, description: item.description })),
    pdf: reportV2.pdf
  });
  assert(reportV2.reportVersion === reportV2Version, 'Regression report must use V2');
  assert(visibleV2.includes('50-199 muestras/mes'), 'Regression report must localize sample band');
  assert(visibleV2.includes('método no está definido'), 'Regression report must explain missing method');
  ['50 to 199 month', 'Screening INDICA', 'module.crm', 'product.indica-screening', '/es/diagnostico-flujo-calidad-agua'].forEach((term) => {
    assert(!visibleV2.includes(term), `Regression report leaks forbidden V2 term: ${term}`);
  });
  assert(reportV2.quickReadItems?.some((item) => item.label === 'Riesgo principal'), 'Regression report must localize quick read labels');
  assert(reportV2.relatedResources.every((item) => item.description), 'Regression report resources must include descriptions');
  assert(!reportV2.pdf.buttonLabel.includes('Descargar'), 'Print-based report action must not promise PDF download');

  const industrial = assessWorkflow({
    questionnaireVersion,
    lang: 'es',
    sectorId: 'industrial-process-water',
    answers: {
      country_code: 'ES',
      organization_type: 'manufacturer',
      buyer_role: 'quality',
      site_count_band: 'two_to_five',
      lab_model: 'mixed',
      sample_volume_band: '50_to_199_month',
      current_systems: ['custom_software', 'email', 'spreadsheets'],
      digitised_stages: ['chain_of_custody', 'coa_reporting'],
      priority_problem_ids: ['connect-process-lab-and-quality', 'control-critical-process-points', 'coordinate_external_labs'],
      evidence_needs: ['chain_of_custody', 'method_traceability', 'coa', 'audit_trail', 'deviations_and_capa'],
      implementation_timeline: 'within_three_months',
      preferred_route: 'technical_review',
      target_groups: ['somatic_coliphages', 'e_coli', 'general_microbiology'],
      result_type: 'both',
      intended_use: 'operational_screening',
      method_context: 'other_reference',
      sample_volume_context: 'one_ml',
      water_use_context: ['drinking_water', 'process_water', 'reclaimed_water']
    }
  });
  const industrialV2 = industrial.reportV2 || buildWorkflowAdvisorReportV2({ result: industrial, lang: 'es' });
  const visibleIndustrialV2 = JSON.stringify({
    cover: industrialV2.cover,
    quickReadItems: industrialV2.quickReadItems,
    interpretedContext: industrialV2.interpretedContext,
    flowDiagnosis: industrialV2.flowDiagnosis,
    maturity: industrialV2.maturity,
    priorityProblems: industrialV2.priorityProblems,
    recommendationSections: industrialV2.recommendationSections,
    analyticalReview: industrialV2.analyticalReview,
    missingInformation: industrialV2.missingInformation,
    relatedResources: industrialV2.relatedResources,
    limitations: industrialV2.limitations
  });
  [
    'Riesgo principal',
    'Prioridad inmediata',
    'Conectar proceso, laboratorio y calidad',
    'Controlar puntos críticos de proceso',
    'Coordinar laboratorios externos',
    'Agua de consumo',
    'Agua de proceso',
    'Agua regenerada',
    'Ruta analítica pendiente de revisión técnica',
    'Método o referencia exacta'
  ].forEach((term) => assert(visibleIndustrialV2.includes(term), `Industrial V2 report missing ${term}`));
  [
    'PRIMARY RISK',
    'connect process lab and quality',
    'operational screening',
    'other reference',
    'drinking water',
    'process water',
    'Producto a evaluar',
    'es relevante porque Las'
  ].forEach((term) => assert(!visibleIndustrialV2.includes(term), `Industrial V2 report leaks ${term}`));

  const ruleSource = JSON.stringify(rules).toLowerCase();
  for (const forbidden of ['openai', 'anthropic', 'chatgpt', 'llm api', 'model prompt']) {
    assert(!ruleSource.includes(forbidden), `Rules include forbidden generative reference: ${forbidden}`);
  }

  const problemComponent = readText('components/industries/IndustryBuyerProblemsSection.tsx');
  assert(problemComponent.includes('source=industry-problem'), 'Industry buyer problems must deep-link to Workflow Advisor');

  console.log('OK validate:workflow-advisor:source');
}

function validateDist() {
  const page = WORKFLOW_ADVISOR_MARKETING_PAGES[0];
  for (const lang of MARKETING_LANGUAGES) {
    const content = page.translations[lang];
    const file = htmlPath(content.path);
    assert(fs.existsSync(file), `Missing prerendered route ${content.path}`);
    const html = readText(file);
    assert((html.match(/<h1\b/g) || []).length === 1, `Expected one H1 in ${content.path}`);
    assert(html.includes(`<link rel="canonical" href="${SITE_URL}${content.path}"`), `Missing canonical in ${content.path}`);
    assert(html.includes('hreflang="x-default"'), `Missing x-default hreflang in ${content.path}`);
    assert(html.includes('name="robots" content="index, follow'), `Missing robots in ${content.path}`);
    assert(html.includes(content.title), `Missing title content in ${content.path}`);
    assert(html.includes('workflow-advisor-tool'), `Missing assessment anchor in ${content.path}`);
    assert(html.includes(content.localModeNote), `Missing local mode note in ${content.path}`);
    assert(!html.includes(content.privacyConsent), `Research consent must not appear before result in ${content.path}`);
    assert(!html.includes(content.contactConsent), `Contact consent must not appear before result in ${content.path}`);
    assert(!html.includes(content.marketingConsent), `Marketing consent must not appear before result in ${content.path}`);
    assert(!html.includes('workflow-advisor-consent'), `Fixed research consent block leaked into prerendered HTML for ${content.path}`);
    assert(!html.includes('Permito que AquaVerify guarde estas respuestas'), `Research consent checkbox leaked into prerendered HTML for ${content.path}`);
    assert(html.includes(content.limits), `Missing limitation copy in ${content.path}`);
    assert(html.includes('FAQPage'), `Missing FAQPage JSON-LD in ${content.path}`);
    assert(html.includes('WebApplication'), `Missing WebApplication JSON-LD in ${content.path}`);
  }

  const sitemap = readText('public/sitemaps/sitemap-workflow-advisor.xml');
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  assert(locCount === 5, `Expected five Workflow Advisor sitemap URLs, found ${locCount}`);
  for (const lang of MARKETING_LANGUAGES) {
    assert(sitemap.includes(`${SITE_URL}${assessmentPaths[lang]}`), `Sitemap missing ${assessmentPaths[lang]}`);
  }
  assert(readText('public/sitemap.xml').includes('sitemap-workflow-advisor.xml'), 'Sitemap index missing workflow sitemap');
  console.log('OK validate:workflow-advisor:dist');
}

async function validateProd() {
  for (const lang of MARKETING_LANGUAGES) {
    const pathName = assessmentPaths[lang];
    const response = await fetch(`${SITE_URL}${pathName}`);
    assert(response.ok, `Production ${pathName} returned ${response.status}`);
    const html = await response.text();
    assert(html.includes(WORKFLOW_ADVISOR_COPY[lang].h1), `Production ${pathName} missing H1 copy`);
    assert(html.includes('workflow-advisor-tool'), `Production ${pathName} missing assessment anchor`);
    assert(html.includes('WebApplication'), `Production ${pathName} missing WebApplication schema`);
  }
  console.log('OK validate:workflow-advisor:prod');
}

if (mode === 'dist') validateDist();
else if (mode === 'prod') await validateProd();
else validateSource();
