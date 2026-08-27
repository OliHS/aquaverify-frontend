import fs from 'node:fs';
import path from 'node:path';
import {
  WORKFLOW_ADVISOR_HOME_CTA_COPY,
  WORKFLOW_ADVISOR_HOME_CTA_EVENT,
  getWorkflowAdvisorHomeCta,
  resolveWorkflowAdvisorHomeCtaVisibility
} from '../utils/workflowAdvisorHomeCta.js';

const ROUTES = {
  en: '/',
  es: '/es',
  fr: '/fr',
  it: '/it',
  ca: '/ca'
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function htmlPath(routePath) {
  const normalized = routePath === '/' ? '' : routePath.replace(/^\/+|\/+$/g, '');
  return normalized ? path.join('dist', normalized, 'index.html') : path.join('dist', 'index.html');
}

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function readQualityStatus() {
  try {
    return JSON.parse(read('generated/workflow-advisor-quality-status.json'));
  } catch {
    return { passed: false };
  }
}

function validateVisibilityLogic() {
  assert(resolveWorkflowAdvisorHomeCtaVisibility({ enabled: true, qualityGateRequired: true, qualityPassed: true }) === true, 'CTA should show when flag and quality gate pass');
  assert(resolveWorkflowAdvisorHomeCtaVisibility({ enabled: false, qualityGateRequired: true, qualityPassed: true }) === false, 'CTA should hide when flag is disabled');
  assert(resolveWorkflowAdvisorHomeCtaVisibility({ enabled: true, qualityGateRequired: true, qualityPassed: false }) === false, 'CTA should hide when quality gate fails');
  assert(resolveWorkflowAdvisorHomeCtaVisibility({ enabled: true, qualityGateRequired: false, qualityPassed: false }) === true, 'CTA can show in non-required gate mode');
}

function validateSource() {
  const home = read('components/HomeEcosystemLanding.tsx');
  const cta = read('components/home/HomeWorkflowAdvisorCta.tsx');
  const footer = read('components/Footer.tsx');
  const app = read('App.tsx');
  const marketingRoute = read('pages/MarketingRoutePage.tsx');
  const prerender = read('scripts/prerender-marketing-pages.js');

  [
    'click_home_hero_products',
    'click_home_hero_industries',
    'click_home_hero_platform',
    'click_home_hero_distributors'
  ].forEach((event) => assert(home.includes(event), `Home lost existing CTA event: ${event}`));

  assert(home.includes('<HomeWorkflowAdvisorCta lang={lang} />'), 'Home must render HomeWorkflowAdvisorCta below hero CTAs');
  assert(cta.includes("import { Link } from 'react-router-dom'"), 'Workflow Advisor CTA must use React Router Link');
  assert(cta.includes('<Link') && cta.includes('to={cta.href}'), 'Workflow Advisor CTA must navigate with Link to the localized route');
  assert(cta.includes('discover="render"'), 'Workflow Advisor CTA must eagerly discover the route');
  assert(cta.includes('prefetch="intent"'), 'Workflow Advisor CTA must prefetch on hover/focus intent');
  assert(!cta.includes('href={cta.href}'), 'Workflow Advisor CTA must not use a manual anchor href in React source');
  assert(!cta.includes('<button'), 'Workflow Advisor CTA must not render as button');
  assert(cta.includes('data-event={cta.event}'), 'Workflow Advisor CTA must expose data-event');
  assert(cta.includes('source_page') && cta.includes('target') && cta.includes('workflow-advisor'), 'Workflow Advisor CTA analytics payload must stay minimal');
  assert(cta.includes('aria-hidden="true"'), 'Workflow Advisor CTA decorative icons must be aria-hidden');
  assert(cta.includes('focus-visible:outline'), 'Workflow Advisor CTA must have a visible focus state');
  assert(app.includes('Preparando el diagnóstico…') && app.includes('bg-slate-50 text-slate-900'), 'Global route fallback must expose a light localized assessment shell');
  assert(!app.includes('bg-primary px-6 py-20 text-white'), 'Global route fallback must not use the old dark/primary hero');
  assert(marketingRoute.includes('Preparando el diagnóstico…') && marketingRoute.includes('aria-busy="true"'), 'Marketing route fallback must expose a localized loading shell');
  assert(!marketingRoute.includes('min-h-screen bg-white" aria-busy="true" aria-live="polite" />'), 'Marketing route fallback must not be blank white');
  assert(prerender.includes('renderHomeWorkflowAdvisorCta'), 'Home prerender must include Workflow Advisor CTA renderer');
  assert(prerender.includes('data-home-workflow-advisor-cta'), 'Prerendered CTA must be inspectable');
  assert(footer.includes('https://www.linkedin.com/company/aquaverify'), 'Footer must link to the official AquaVerify LinkedIn profile');
  assert(footer.includes('https://bsky.app/profile/aquaverify.com'), 'Footer must link to the official AquaVerify Bluesky profile');
  assert(footer.includes('field="url_linkedin"'), 'Footer LinkedIn URL must remain CMS-editable');
  assert(footer.includes('field="url_bluesky"'), 'Footer Bluesky URL must remain CMS-editable');
  assert(footer.includes('target="_blank"') && footer.includes('rel="noopener noreferrer"'), 'Footer social links must open external profiles safely');
  ['en', 'es', 'fr', 'it', 'ca'].forEach((lang) => {
    assert(footer.includes(`${lang}: {`), `Footer must retain ${lang} localized copy`);
  });
}

function validateDist() {
  const status = readQualityStatus();
  const shouldShow = resolveWorkflowAdvisorHomeCtaVisibility({
    enabled: true,
    qualityGateRequired: true,
    qualityPassed: Boolean(status.passed)
  });

  for (const [lang, route] of Object.entries(ROUTES)) {
    const file = htmlPath(route);
    assert(fs.existsSync(file), `Missing prerendered home route ${route}`);
    const html = read(file);
    const cta = getWorkflowAdvisorHomeCta(lang);

    if (!shouldShow) {
      assert(!html.includes(WORKFLOW_ADVISOR_HOME_CTA_EVENT), `${route} should hide Workflow Advisor CTA when gate is off`);
      continue;
    }

    assert(html.includes('data-home-workflow-advisor-cta'), `${route} missing prerendered Workflow Advisor CTA`);
    assert(html.includes(`href="${cta.href}"`), `${route} Workflow Advisor CTA href mismatch`);
    assert(html.includes('data-discover="true"'), `${route} Workflow Advisor CTA discover marker missing`);
    assert(html.includes(`data-event="${WORKFLOW_ADVISOR_HOME_CTA_EVENT}"`), `${route} Workflow Advisor CTA event missing`);
    assert(html.includes(cta.eyebrow), `${route} Workflow Advisor CTA eyebrow missing`);
    assert(html.includes(cta.title), `${route} Workflow Advisor CTA title missing`);
    assert(html.includes(cta.body), `${route} Workflow Advisor CTA body missing`);
    assert(html.includes(cta.button), `${route} Workflow Advisor CTA button missing`);
    assert(html.includes(cta.microcopy), `${route} Workflow Advisor CTA microcopy missing`);

    if (lang !== 'en') {
      assert(!html.includes(WORKFLOW_ADVISOR_HOME_CTA_COPY.en.title), `${route} leaked English Workflow Advisor CTA title`);
      assert(!html.includes(WORKFLOW_ADVISOR_HOME_CTA_COPY.en.button), `${route} leaked English Workflow Advisor CTA button`);
      assert(!html.includes(WORKFLOW_ADVISOR_HOME_CTA_COPY.en.microcopy), `${route} leaked English Workflow Advisor CTA microcopy`);
    }
  }
}

validateVisibilityLogic();
validateSource();
validateDist();
console.log('OK validate:home');
