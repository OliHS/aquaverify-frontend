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
  assert(component.includes('workflow-report'), 'Landing must expose dedicated workflow-report print container');
  assert(component.includes('workflow-advisor-contact-form'), 'Landing must isolate contact form from report print mode');
  assert(component.includes('downloadTechnicalExport'), 'Technical JSON export must be explicit support-only action');
  assert(!component.includes('downloadResult('), 'JSON result download must not be the primary CTA');
  assert(component.includes("credentials: 'omit'"), 'Public API calls must omit credentials');
  assert(component.includes('researchConsent') && component.includes('contactConsent') && component.includes('marketingConsent'), 'Consent switches must remain separate');
  assert(component.includes('Idempotency-Key'), 'Assessment save should use idempotency key');
  assert(component.includes('workflow-advisor-tool'), 'Landing must expose workflow-advisor-tool anchor');
  assert(component.includes('saveAssessment') && component.includes('submitContact'), 'Landing must support research save and contact lead flow');

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
    relatedResources: reportV2.relatedResources.map((item) => item.url)
  });
  assert(reportV2.reportVersion === reportV2Version, 'Regression report must use V2');
  assert(visibleV2.includes('50-199 muestras/mes'), 'Regression report must localize sample band');
  assert(visibleV2.includes('método no está definido'), 'Regression report must explain missing method');
  ['50 to 199 month', 'Screening INDICA', 'module.crm', 'product.indica-screening', '/es/diagnostico-flujo-calidad-agua'].forEach((term) => {
    assert(!visibleV2.includes(term), `Regression report leaks forbidden V2 term: ${term}`);
  });

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
    assert(html.includes(content.privacyConsent), `Missing research consent copy in ${content.path}`);
    assert(html.includes(content.contactConsent), `Missing contact consent copy in ${content.path}`);
    assert(html.includes(content.marketingConsent), `Missing marketing consent copy in ${content.path}`);
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
