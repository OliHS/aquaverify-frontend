import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';

const indexHtml = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const productHubSource = await readFile(new URL('../components/ProductHubLanding.tsx', import.meta.url), 'utf8');
assert.doesNotMatch(indexHtml, /localStorage|aquaverify_cookie_consent/);
assert.match(indexHtml, /analytics_storage:\s*'denied'/);
assert.match(indexHtml, /ad_storage:\s*'denied'/);
assert.match(indexHtml, /ad_user_data:\s*'denied'/);
assert.match(indexHtml, /ad_personalization:\s*'denied'/);
assert.doesNotMatch(indexHtml, /<noscript[\s\S]*googletagmanager/i);
assert.match(productHubSource, /click_product_card',[\s\S]{0,120}\{ page: family\.pageId/);
assert.match(productHubSource, /click_compare_products',[\s\S]{0,120}\{ page: family\.pageId/);
assert.match(productHubSource, /page: card\.pageId, location: 'products_partner_paths'/);
assert.doesNotMatch(productHubSource, /\{ product: family\.pageId/);

const session = new Map([['aquaverify:analytics_session', 'person@example.invalid']]);
const local = new Map([[
  'aquaverify_cookie_consent',
  JSON.stringify({ analytics: true, marketing: false, version: '2026-04' })
]]);
const gtagCalls = [];

globalThis.window = {
  location: new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_campaign=person%2525252540example.invalid&utm_id=opaque_123456'),
  sessionStorage: {
    getItem: (key) => session.get(key) || null,
    setItem: (key, value) => session.set(key, value)
  },
  localStorage: {
    getItem: (key) => local.get(key) || null
  },
  dataLayer: [],
  gtag: (...args) => gtagCalls.push(args),
  dispatchEvent: () => true
};
globalThis.document = {
  referrer: 'https://www.linkedin.com/feed/?email=person@example.invalid',
  cookie: '',
  title: 'AquaVerify Labs'
};
globalThis.CustomEvent = class CustomEvent {
  constructor(type, options) {
    this.type = type;
    this.detail = options?.detail;
  }
};

let analyticsRequest = null;
let analyticsRequestCount = 0;
const analyticsFetch = async (url, options) => {
  analyticsRequest = { url: String(url), options };
  analyticsRequestCount += 1;
  return { ok: true };
};
globalThis.fetch = analyticsFetch;

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
try {
  const links = await vite.ssrLoadModule('/utils/platformLinks.ts');
  const nestedEntity = (code, depth = 80) => {
    let encoded = code;
    for (let index = 0; index < depth; index += 1) encoded = encoded.replace('&', '&amp;');
    return encoded;
  };
  assert.equal(links.buildPlatformUrl, undefined);
  assert.equal(links.containsLikelyPersonalData('person%2540example.invalid'), true);
  assert.equal(links.containsLikelyPersonalData('person%2525252540example.invalid'), true);
  assert.equal(links.containsLikelyPersonalData('person%2525252540example.invalid%E2'), true);
  assert.equal(links.containsLikelyPersonalData('person&#64;example&#46;invalid'), true);
  assert.equal(links.containsLikelyPersonalData('person&commat;example&period;invalid'), true);
  assert.equal(links.containsLikelyPersonalData('person&amp;amp;commat;example&amp;period;invalid'), true);
  assert.equal(links.containsLikelyPersonalData(
    `person${nestedEntity('&#64;')}example${nestedEntity('&#46;')}invalid`
  ), true);
  assert.equal(links.containsLikelyPersonalData('+34 612 345 678'), true);
  assert.equal(links.containsLikelyPersonalData('612 345 678'), true);
  assert.equal(links.containsLikelyPersonalData('612345678'), true);
  assert.equal(links.containsLikelyPersonalData('612/345/678'), true);
  assert.equal(links.containsLikelyPersonalData('612_345_678'), true);
  assert.equal(links.containsLikelyPersonalData('612,345,678'), true);
  assert.equal(links.containsLikelyPersonalData('６１２３４５６７８'), true);
  assert.equal(links.containsLikelyPersonalData('612\u200B345\u200B678'), true);
  assert.equal(links.containsLikelyPersonalData('٦١٢٣٤٥٦٧٨'), true);
  assert.equal(links.containsLikelyPersonalData('۶۱۲۳۴۵۶۷۸'), true);
  assert.equal(links.containsLikelyPersonalData('12345678901234567890'), false);
  assert.equal(links.containsLikelyPersonalData('12345_67890_12345_67890'), false);

  const unsafeContextSignup = new URL(links.getPlatformSignupUrl({
    intent: 'josé@example.com',
    page: 'user["name"]=Ana',
    category: '612345678,611222333'
  }, 'es'));
  assert.equal(unsafeContextSignup.searchParams.get('intent'), null);
  assert.equal(unsafeContextSignup.searchParams.get('page'), null);
  assert.equal(unsafeContextSignup.searchParams.get('category'), null);
  const entityContextSignup = new URL(links.getPlatformSignupUrl({
    intent: 'person&#64;example&#46;invalid',
    page: `person${nestedEntity('&#64;')}example${nestedEntity('&#46;')}invalid`
  }, 'es'));
  assert.equal(entityContextSignup.searchParams.get('intent'), null);
  assert.equal(entityContextSignup.searchParams.get('page'), null);
  assert.equal(links.containsLikelyPersonalData('person＠example．com'), true);
  assert.equal(links.containsLikelyPersonalData('person\u200B@\u200Bexample.com'), true);
  assert.equal(links.containsLikelyPersonalData('josé@ejemplo.es'), true);
  assert.equal(links.containsLikelyPersonalData('δοκιμή@παράδειγμα.δοκιμή'), true);
  assert.equal(links.containsLikelyPersonalData('person@example。com'), true);
  assert.equal(links.containsLikelyPersonalData('612·345·678'), true);
  assert.equal(links.containsLikelyPersonalData('用户@example.com'), true);
  assert.equal(links.containsLikelyPersonalData('ana@exämple.com'), true);
  assert.equal(links.containsLikelyPersonalData('user["name"]=Ana'), true);
  assert.equal(links.containsLikelyPersonalData("user['email']=ana"), true);
  assert.equal(links.containsLikelyPersonalData('{"na\\u006de":"Ana"}'), true);
  assert.equal(links.containsLikelyPersonalData('612+345+678'), true);
  assert.equal(links.containsLikelyPersonalData('612•345•678'), true);
  assert.equal(links.containsLikelyPersonalData('612345678,611222333'), true);
  assert.equal(links.containsLikelyPersonalData('612345678/611222333'), true);
  assert.equal(links.containsLikelyPersonalData('612345678_611222333'), true);
  assert.equal(links.containsLikelyPersonalData('612345678•611222333'), true);
  assert.equal(links.containsLikelyPersonalData('person\\u002540example.com'), true);
  assert.equal(links.containsLikelyPersonalData('person\\u005cu0040example.com'), true);
  assert.equal(links.containsLikelyPersonalData('person％40example.com'), true);
  assert.equal(links.containsLikelyPersonalData('person%\u200B40example.com'), true);
  assert.equal(links.containsLikelyPersonalData('person＼u0040example.com'), true);
  assert.equal(links.containsLikelyPersonalData('user[\\"name\\"]=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('{"na\\u005cu006de":"Ana"}'), true);
  assert.equal(links.containsLikelyPersonalData('/demo%253Ffull_name=Ana%20Garcia'), true);
  assert.equal(links.containsLikelyPersonalData('/demo%26full_name=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('/demo%3Fnombre=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('/demo%3Fentreprise=Aqua'), true);
  assert.equal(links.containsLikelyPersonalData('name=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('name:Ana'), true);
  assert.equal(links.containsLikelyPersonalData('{"name":"Ana"}'), true);
  assert.equal(links.containsLikelyPersonalData('user[name]=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('contactName=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('emailAddress=ana%2540example.invalid'), true);
  assert.equal(links.containsLikelyPersonalData('companyName:Aqua'), true);
  assert.equal(links.containsLikelyPersonalData('phoneNumber=612345678'), true);
  assert.equal(links.containsLikelyPersonalData('correoElectronico=ana%2540example.invalid'), true);
  assert.equal(links.containsLikelyPersonalData('nombreCompleto=Ana'), true);
  assert.equal(links.containsLikelyPersonalData('ｃｏｎｔａｃｔＮａｍｅ＝Ana'), true);
  assert.equal(links.containsLikelyPersonalData('campaign=summer-launch'), false);
  assert.equal(links.containsLikelyPersonalData('username=opaque-handle'), false);
  assert.equal(links.containsSensitivePersonalDataKey('user[name]'), true);
  assert.equal(links.containsSensitivePersonalDataKey('metadata.contactName'), true);
  assert.equal(links.containsSensitivePersonalDataKey('emailAddress'), true);
  assert.equal(links.containsSensitivePersonalDataKey('companyName'), true);
  assert.equal(links.containsSensitivePersonalDataKey('phoneNumber'), true);
  assert.equal(links.containsSensitivePersonalDataKey('correoElectronico'), true);
  assert.equal(links.containsSensitivePersonalDataKey('nombreCompleto'), true);
  assert.equal(links.containsSensitivePersonalDataKey('ｃｏｎｔａｃｔＮａｍｅ'), true);
  assert.equal(links.containsSensitivePersonalDataKey('campaignName'), true);
  assert.equal(links.containsSensitivePersonalDataKey('campaign_id'), false);
  assert.equal(links.containsLikelyPersonalData('550e8400-e29b-41d4-a716-446655440000'), false);
  assert.equal(links.CORPORATE_SOURCE_PATHS.size, 896);
  for (const path of links.CORPORATE_SOURCE_PATHS) {
    assert.equal(links.normalizePrivacySafeCorporateSourcePath(path), path, path);
  }
  for (const path of [
    '/admin', '/admin/campaigns', '/synthetic-page-name',
    '/people/privateperson', '/people/private.person%2540example.invalid',
    '/es/industrias/laboratorios-analisis-agua?utm_source=linkedin'
  ]) {
    assert.equal(links.normalizePrivacySafeCorporateSourcePath(path), '', path);
  }
  const { MARKETING_ROUTE_PATHS } = await vite.ssrLoadModule('/utils/marketingRoutes.js');
  const formRouteIds = [
    'water-testing-labs', 'industrial-process-water', 'hospitality-tourism-water',
    'municipal-water-testing', 'food-beverage-water-quality', 'water-quality-control',
    'distributors', 'distributors', 'agriculture-water', 'pharma-cosmetics-water',
    'facility-water-risk', 'oem'
  ];
  assert.equal(formRouteIds.length, 12);
  for (const routeId of formRouteIds) {
    for (const routePath of Object.values(MARKETING_ROUTE_PATHS[routeId])) {
      assert.equal(links.CORPORATE_SOURCE_PATHS.has(routePath), true, `${routeId}:${routePath}`);
    }
  }

  const attribution = links.getPrivacySafeCorporateAttributionParams();
  assert.equal(attribution.source_url, 'https://aquaverify.com/es/industrias/laboratorios-analisis-agua');
  assert.equal(attribution.referrer, 'https://www.linkedin.com');
  assert.equal(attribution.utm_campaign, undefined);
  assert.equal(attribution.utm_id, 'opaque_123456');

  const signup = new URL(links.getPlatformSignupUrl({
    intent: 'quote',
    page: 'products',
    category: 'catalog',
    profile: 'laboratory',
    module: 'recommendation',
    family: 'microbiology',
    product: 'enumera',
    products: 'enumera,indica',
    distributor: 'partner-42',
    prefill_name: 'Person Name',
    prefill_email: 'person@example.invalid',
    prefill_company: 'Example Company',
    source: 'attacker',
    source_url: 'https://evil.invalid/?email=person@example.invalid',
    referrer: 'https://evil.invalid/',
    utm_id: 'caller_override',
    country: '+34 612 345 678',
    company_type: 'Person Name',
    volume: 'Private free text',
    current_method: 'Private free text',
    main_need: 'Private free text'
  }, 'es'));
  assert.equal(signup.origin, 'https://app.aquaverify.com');
  assert.equal(signup.searchParams.get('source_url'), 'https://aquaverify.com/es/industrias/laboratorios-analisis-agua');
  assert.equal(signup.searchParams.get('referrer'), 'https://www.linkedin.com');
  assert.equal(signup.searchParams.get('utm_campaign'), null);
  assert.equal(signup.searchParams.get('utm_id'), 'opaque_123456');
  assert.equal(signup.searchParams.get('source'), 'corporate');
  Object.entries({
    intent: 'quote',
    page: 'products',
    category: 'catalog',
    profile: 'laboratory',
    module: 'recommendation',
    family: 'microbiology',
    product: 'enumera',
    products: 'enumera,indica',
    distributor: 'partner-42'
  }).forEach(([key, value]) => assert.equal(signup.searchParams.get(key), value));
  [
    'prefill_name', 'prefill_email', 'prefill_company', 'company_type',
    'volume', 'current_method', 'main_need', 'country'
  ].forEach((key) => assert.equal(signup.searchParams.get(key), null));

  const privateSignup = new URL(links.getPlatformSignupUrl({
    intent: 'name=Ana',
    page: 'name:Ana',
    category: '{"name":"Ana"}',
    profile: 'user[name]=Ana',
    module: 'contactName=Ana',
    family: 'emailAddress=ana@example.invalid',
    product: 'companyName=Aqua',
    products: 'phoneNumber=612345678',
    distributor: 'correoElectronico=ana@example.invalid',
    country: 'nombreCompleto=Ana'
  }, 'es'));
  [
    'intent', 'page', 'category', 'profile', 'module', 'family',
    'product', 'products', 'distributor', 'country'
  ].forEach((key) => assert.equal(privateSignup.searchParams.get(key), null));

  window.location = new URL('https://aquaverify.com/people/person%2540example.invalid?utm_source=linkedin');
  assert.equal(links.getPrivacySafePagePath(), '');
  assert.equal(links.getPrivacySafeCorporateAttributionParams().source_url, undefined);

  window.location = new URL('https://aquaverify.com/people/jos%C3%A9%40example.com?utm_term=ana%40ex%C3%A4mple.com');
  assert.equal(links.getPrivacySafePagePath(), '');
  assert.equal(links.getPrivacySafeCorporateAttributionParams().source_url, undefined);
  assert.equal(links.getPrivacySafeCorporateAttributionParams().utm_term, undefined);

  window.location = new URL('https://aquaverify.com/demo%26full_name=Ana');
  assert.equal(links.getPrivacySafePagePath(), '');

  window.location = new URL('https://aquaverify.com/demo%253Ffull_name=Ana%20Garcia');
  assert.equal(links.getPrivacySafePagePath(), '');
  assert.equal(links.getPrivacySafeCorporateAttributionParams().source_url, undefined);

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_term=612345678');
  assert.equal(links.getPrivacySafeCorporateAttributionParams().utm_term, undefined);

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_content=612%2F345%2F678&utm_term=person%EF%BC%A0example%EF%BC%8Ecom');
  const unicodeAttribution = links.getPrivacySafeCorporateAttributionParams();
  assert.equal(unicodeAttribution.utm_content, undefined);
  assert.equal(unicodeAttribution.utm_term, undefined);

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua');
  window.location.searchParams.set('utm_campaign', 'person&commat;example&period;invalid');
  const entityAttribution = links.getPrivacySafeCorporateAttributionParams();
  assert.equal(entityAttribution.utm_campaign, undefined);
  assert.equal(new URL(links.getPlatformSignupUrl({ intent: 'quote' }, 'es')).searchParams.get('utm_campaign'), null);

  window.location.searchParams.set(
    'utm_campaign',
    `person${nestedEntity('&#64;')}example${nestedEntity('&#46;')}invalid`
  );
  const deepEntityAttribution = links.getPrivacySafeCorporateAttributionParams();
  assert.equal(deepEntityAttribution.utm_campaign, undefined);
  assert.equal(new URL(links.getPlatformSignupUrl({ intent: 'quote' }, 'es')).searchParams.get('utm_campaign'), null);

  const leadCapture = await vite.ssrLoadModule('/utils/marketingLeadCapture.ts');
  session.set('aquaverify:marketing_attribution', JSON.stringify({
    utm_source: 'linkedin',
    utm_campaign: 'person&commat;example&period;invalid',
    utm_content: 'launch_2026'
  }));
  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_campaign=person%2525252540example.invalid');
  assert.deepEqual(leadCapture.readPrivacySafeMarketingUtm(), {
    utm_source: 'linkedin',
    utm_medium: '',
    utm_campaign: '',
    utm_content: 'launch_2026',
    utm_term: '',
    utm_id: ''
  });
  assert.equal(session.get('aquaverify:marketing_attribution').includes('commat'), false);

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_source=bluesky&utm_campaign=q3-launch');
  assert.deepEqual(leadCapture.readPrivacySafeMarketingUtm(), {
    utm_source: 'bluesky',
    utm_medium: '',
    utm_campaign: 'q3-launch',
    utm_content: '',
    utm_term: '',
    utm_id: ''
  });

  session.set('aquaverify:marketing_attribution', JSON.stringify({
    utm_source: 'person&#64;example&#46;invalid',
    utm_medium: 'social'
  }));
  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua');
  assert.deepEqual(leadCapture.readPrivacySafeMarketingUtm(), {
    utm_source: '',
    utm_medium: 'social',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    utm_id: ''
  });

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?utm_source=linkedin&utm_content=612%20345%20678');
  const analytics = await vite.ssrLoadModule('/utils/corporateAnalytics.ts');
  assert.equal(analytics.parseConsent(JSON.stringify({
    status: 'custom', necessary: true, analytics: 'false', marketing: false,
    version: '2026-08', updatedAt: new Date().toISOString()
  })), null);
  analytics.clearVerifiedCorporateAnalyticsConsent();
  window.dataLayer = [];
  gtagCalls.length = 0;
  analyticsRequest = null;
  analyticsRequestCount = 0;
  assert.equal(analytics.trackCorporateEvent('page_view', {
    path: '/es/industrias/laboratorios-analisis-agua', lang: 'es'
  }), false);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(analyticsRequestCount, 0);
  assert.equal(window.dataLayer.length, 0);
  assert.equal(gtagCalls.length, 0);

  const verifiedConsent = {
    status: 'custom',
    necessary: true,
    analytics: true,
    marketing: false,
    version: '2026-08',
    updatedAt: new Date().toISOString()
  };
  assert.equal(analytics.markCorporateAnalyticsConsentVerified(verifiedConsent, '2026-08'), true);
  analytics.updateGoogleConsentMode(verifiedConsent);
  assert.equal(analytics.flushPendingCorporatePageView(), true);
  assert.equal(analytics.flushPendingCorporatePageView(), false);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(analyticsRequestCount, 1);
  assert.equal(window.dataLayer.filter((entry) => entry?.event === 'aquaverify_page_view').length, 1);
  assert.equal(gtagCalls.filter((entry) => entry?.[0] === 'event' && entry?.[1] === 'page_view').length, 1);

  for (const currentPath of [
    '/admin', '/admin/marketing', '/unregistered-corporate-page',
    '/people/private.person%2540example.invalid'
  ]) {
    const requestsBefore = analyticsRequestCount;
    const eventsBefore = window.dataLayer.length;
    const gtagBefore = gtagCalls.length;
    window.location = new URL(`https://aquaverify.com${currentPath}`);
    assert.equal(analytics.trackCorporateEvent('page_view', { path: currentPath, lang: 'es' }), false, currentPath);
    await new Promise((resolve) => setTimeout(resolve, 0));
    assert.equal(analyticsRequestCount, requestsBefore, currentPath);
    assert.equal(window.dataLayer.length, eventsBefore, currentPath);
    assert.equal(gtagCalls.length, gtagBefore, currentPath);
  }
  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua');

  for (const poisonedSession of [
    '550e8400-e29b-11d4-a716-446655440000',
    '550e8400-e29b-51d4-a716-446655440000',
    '550e8400-e29b-41d4-7716-446655440000',
    'legacy-session-id'
  ]) {
    session.set('aquaverify:analytics_session', poisonedSession);
    assert.equal(analytics.trackCorporateEvent('page_view', { lang: 'es' }), true, poisonedSession);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const regenerated = new URLSearchParams(analyticsRequest.options.body).get('session_id');
    assert.match(regenerated, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.notEqual(regenerated, poisonedSession);
  }

  const sanitizedLink = analytics.sanitizeCorporateAnalyticsEvent('platform_link_click', {
    lang: 'es',
    path: '/es/industrias/laboratorios-analisis-agua',
    page: 'water-testing-labs',
    category: 'industries',
    intent: 'quote',
    profile: 'labs',
    module: 'lab-diagnosis',
    target_path: '/signup',
    target_url: 'https://app.aquaverify.com/signup?intent=quote&utm_id=opaque_123',
    country: 'Private Person',
    label: 'Ana García',
    product: 'enumera',
    unknown_dimension: 'private-value',
    email: 'person@example.invalid',
    phone: '612345678'
  });
  assert.deepEqual(sanitizedLink, {
    eventName: 'platform_link_click',
    payload: {
      lang: 'es',
      path: '/es/industrias/laboratorios-analisis-agua',
      target_url: 'https://app.aquaverify.com/signup',
      target_path: '/signup',
      intent: 'quote',
      page: 'water-testing-labs',
      category: 'industries',
      profile: 'labs',
      module: 'lab-diagnosis'
    }
  });
  ['country', 'label', 'product', 'unknown_dimension', 'email', 'phone']
    .forEach((key) => assert.equal(Object.hasOwn(sanitizedLink.payload, key), false));

  assert.deepEqual(analytics.sanitizeCorporateAnalyticsEvent('product_view', {
    lang: 'fr',
    path: '/fr/produits/enumera',
    page: 'enumera',
    category: 'products',
    product: 'Private Person',
    label: 'Ana García',
    country: 'France'
  }), {
    eventName: 'product_view',
    payload: {
      lang: 'fr',
      path: '/fr/produits/enumera',
      page: 'enumera',
      category: 'products'
    }
  });
  assert.equal(analytics.sanitizeCorporateAnalyticsEvent('private_event', { page: 'labs' }), null);
  assert.deepEqual(analytics.sanitizeCorporateAnalyticsEvent('datasheet_click', {
    path: '/fr/produits/enumera',
    lang: 'fr',
    page: 'enumera',
    category: 'products',
    target_path: '/datasheets/products/enumera-fr.html',
    target_url: 'https://aquaverify.com/datasheets/products/enumera-fr.html'
  }), {
    eventName: 'datasheet_click',
    payload: {
      lang: 'fr',
      path: '/fr/produits/enumera',
      target_url: 'https://aquaverify.com/datasheets/products/enumera-fr.html',
      target_path: '/datasheets/products/enumera-fr.html',
      page: 'enumera',
      category: 'products'
    }
  });

  const eventForGovernedField = {
    page: 'product_view',
    category: 'product_view',
    intent: 'platform_link_click',
    sector: 'sector_hub_click',
    profile: 'platform_link_click',
    module: 'platform_link_click',
    status: 'cookie_consent_update',
    location: 'click_product_card',
    partner_type: 'distributor_partner_match',
    route: 'oem_route_selector_click'
  };
  for (const [field, values] of Object.entries(analytics.ALLOWED_DIMENSION_VALUES)) {
    for (const value of values) {
      const result = analytics.sanitizeCorporateAnalyticsEvent(eventForGovernedField[field], { [field]: value });
      assert.equal(result.payload[field], value, `${field}:${value}`);
    }
    for (const unsafeName of ['PrivatePerson', 'privateperson']) {
      const result = analytics.sanitizeCorporateAnalyticsEvent(eventForGovernedField[field], { [field]: unsafeName });
      assert.equal(Object.hasOwn(result.payload, field), false, `${field}:${unsafeName}`);
    }
  }

  const opaquePartnerIdentifiers = [
    ['partner', 'distributor_country_search', 'eu-open'],
    ['partner', 'distributor_country_search', '42'],
    ['distributor', 'distributor_partner_match', '550e8400-e29b-41d4-a716-446655440000']
  ];
  for (const [field, eventName, value] of opaquePartnerIdentifiers) {
    const result = analytics.sanitizeCorporateAnalyticsEvent(eventName, { [field]: value });
    assert.equal(result.payload[field], value);
  }
  for (const field of ['partner', 'distributor']) {
    const eventName = field === 'partner' ? 'distributor_country_search' : 'distributor_partner_match';
    for (const unsafeName of ['PrivatePerson', 'privateperson']) {
      const result = analytics.sanitizeCorporateAnalyticsEvent(eventName, { [field]: unsafeName });
      assert.equal(Object.hasOwn(result.payload, field), false, `${field}:${unsafeName}`);
    }
  }
  assert.equal(
    analytics.sanitizeCorporateAnalyticsEvent('distributor_globe_load', { partners: 42 }).payload.partners,
    42
  );
  for (const unsafeName of ['PrivatePerson', 'privateperson']) {
    assert.equal(
      Object.hasOwn(analytics.sanitizeCorporateAnalyticsEvent('distributor_globe_load', { partners: unsafeName }).payload, 'partners'),
      false
    );
  }

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua?gclid=PrivatePerson&fbclid=privateperson&msclkid=PrivatePerson');
  window.dataLayer = [];
  gtagCalls.length = 0;
  analyticsRequest = null;
  assert.equal(analytics.trackCorporateEvent('page_view', { path: '/es/industrias/laboratorios-analisis-agua', lang: 'es' }), true);
  await new Promise((resolve) => setTimeout(resolve, 0));
  ['gclid', 'fbclid', 'msclkid'].forEach((field) => {
    assert.equal(String(analyticsRequest.options.body).includes(`${field}=`), false, field);
    assert.equal(Object.hasOwn(window.dataLayer.at(-1), field), false, field);
    assert.equal(Object.hasOwn(gtagCalls.at(-1)[2], field), false, field);
  });

  const approvedClickIds = {
    gclid: 'AbCdEfGhIjKlMnOpQrStUv12',
    fbclid: 'ZyXwVuTsRqPoNmLkJiHgFe98',
    msclkid: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6'
  };
  window.location = new URL(`https://aquaverify.com/es/industrias/laboratorios-analisis-agua?${new URLSearchParams(approvedClickIds)}`);
  window.dataLayer = [];
  gtagCalls.length = 0;
  analyticsRequest = null;
  assert.equal(analytics.trackCorporateEvent('page_view', { path: '/es/industrias/laboratorios-analisis-agua', lang: 'es' }), true);
  await new Promise((resolve) => setTimeout(resolve, 0));
  for (const [field, value] of Object.entries(approvedClickIds)) {
    assert.equal(new URLSearchParams(analyticsRequest.options.body).get(field), value);
    assert.equal(window.dataLayer.at(-1)[field], value);
    assert.equal(gtagCalls.at(-1)[2][field], value);
  }

  window.location = new URL('https://aquaverify.com/es/industrias/laboratorios-analisis-agua');
  window.dataLayer = [];
  gtagCalls.length = 0;
  analyticsRequest = null;
  assert.equal(analytics.trackCorporateEvent('water_testing_lab_diagnosis_submit', {
    page: 'water-testing-labs',
    path: '/es/industrias/laboratorios-analisis-agua',
    lang: 'es',
    category: 'industries',
    profile: 'labs',
    module: 'lab-diagnosis',
    email: 'person@example.invalid',
    country: 'Private Person',
    label: 'Ana García',
    product: 'enumera',
    unknown_dimension: 'private-value',
    phone_number: '+34 612 345 678',
    'user[name]': 'Ana',
    contactName: 'Ana',
    emailAddress: 'opaque',
    companyName: 'Aqua',
    phoneNumber: 'opaque',
    correoElectronico: 'opaque',
    nombreCompleto: 'Ana',
    assignment_equal: 'name=Ana',
    assignment_colon: 'name:Ana',
    assignment_json: '{"name":"Ana"}',
    assignment_nested: 'user[name]=Ana',
    assignment_camel: 'contactName=Ana',
    assignment_fullwidth: 'ｎａｍｅ＝Ana',
    phone_slash: '612/345/678',
    phone_underscore: '612_345_678',
    phone_comma: '612,345,678',
    phone_fullwidth: '６１２３４５６７８',
    phone_zero_width: '612\u200B345\u200B678',
    phone_arabic: '٦١٢٣٤٥٦٧٨',
    phone_persian: '۶۱۲۳۴۵۶۷۸',
    email_fullwidth: 'person＠example．com',
    email_zero_width: 'person\u200B@\u200Bexample.com',
    intent: 'quote'
  }), true);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.ok(analyticsRequest);
  const serializedBody = String(analyticsRequest.options.body).toLowerCase();
  const dataLayerEvent = window.dataLayer.at(-1);
  const gtagEvent = gtagCalls.at(-1);
  assert.equal(dataLayerEvent.event, 'aquaverify_water_testing_lab_diagnosis_submit');
  assert.equal(dataLayerEvent.page, 'water-testing-labs');
  assert.equal(dataLayerEvent.path, '/es/industrias/laboratorios-analisis-agua');
  assert.deepEqual(gtagEvent, [
    'event',
    'water_testing_lab_diagnosis_submit',
    Object.fromEntries(Object.entries(dataLayerEvent).filter(([key]) => key !== 'event'))
  ]);
  const allClientDelivery = JSON.stringify({ serializedBody, dataLayerEvent, gtagEvent }).toLowerCase();
  assert.equal(serializedBody.includes('person%40example.invalid'), false);
  assert.equal(serializedBody.includes('person%2540example.invalid'), false);
  assert.equal(serializedBody.includes('612+345+678'), false);
  assert.equal(serializedBody.includes('phone_number'), false);
  [
    'user_name_', 'contactname', 'emailaddress', 'companyname', 'phonenumber',
    'correoelectronico', 'nombrecompleto', 'assignment_equal', 'assignment_colon',
    'assignment_json', 'assignment_nested', 'assignment_camel', 'assignment_fullwidth',
    'phone_slash', 'phone_underscore', 'phone_comma', 'phone_fullwidth', 'phone_zero_width',
    'phone_arabic', 'phone_persian', 'email_fullwidth', 'email_zero_width'
  ].forEach((key) => assert.equal(serializedBody.includes(key), false));
  [
    'private person', 'ana garcía', 'private-value', 'person@example.invalid',
    '612345678', 'country', 'label', 'product', 'unknown_dimension', 'email', 'phone_number'
  ].forEach((value) => assert.equal(allClientDelivery.includes(value), false));
  assert.equal(serializedBody.includes('intent=quote'), true);
  assert.equal(serializedBody.includes('event_name=water_testing_lab_diagnosis_submit'), true);
  const deliveriesBeforeUnknown = {
    dataLayer: window.dataLayer.length,
    gtag: gtagCalls.length,
    request: analyticsRequest
  };
  assert.equal(analytics.trackCorporateEvent('person@example.invalid', { page: 'labs' }), false);
  assert.equal(window.dataLayer.length, deliveriesBeforeUnknown.dataLayer);
  assert.equal(gtagCalls.length, deliveriesBeforeUnknown.gtag);
  assert.equal(analyticsRequest, deliveriesBeforeUnknown.request);
  assert.match(session.get('aquaverify:analytics_session'), /^[0-9a-f-]{36}$/i);

  const cookie = await vite.ssrLoadModule('/components/CookieConsent.tsx');
  const consentNowMs = Date.now();
  const consentPolicy = { version: '2026-08', maxAgeDays: 180 };
  const validConsent = {
    status: 'custom', necessary: true, analytics: true, marketing: false,
    version: '2026-08', updatedAt: new Date(consentNowMs).toISOString()
  };
  assert.deepEqual(cookie.normalizeConsent(JSON.stringify(validConsent), consentPolicy, consentNowMs), validConsent);
  assert.ok(cookie.normalizeConsent(JSON.stringify({
    ...validConsent,
    updatedAt: new Date(consentNowMs + 5 * 60 * 1000).toISOString()
  }), consentPolicy, consentNowMs));
  assert.equal(cookie.normalizeConsent(JSON.stringify({
    ...validConsent,
    updatedAt: new Date(consentNowMs + 5 * 60 * 1000 + 1).toISOString()
  }), consentPolicy, consentNowMs), null);
  assert.equal(cookie.normalizeConsent(JSON.stringify({
    ...validConsent,
    updatedAt: new Date(consentNowMs - 180 * 24 * 60 * 60 * 1000 - 1).toISOString()
  }), consentPolicy, consentNowMs), null);
  assert.equal(cookie.normalizeConsent(JSON.stringify({
    ...validConsent,
    analytics: 'false'
  }), consentPolicy, consentNowMs), null);

  let consentFetches = [];
  globalThis.fetch = async (url, options = {}) => {
    consentFetches.push({ url: String(url), options });
    return {
      ok: true,
      async json() {
        return { ok: true, currentPolicyVersion: '2026-08', consent: validConsent };
      }
    };
  };
  const restored = await cookie.resolveAuthoritativeConsent(consentPolicy, null);
  assert.deepEqual(restored.consent, validConsent);
  assert.equal(restored.browserMirror, null);
  assert.equal(restored.browserMirrorMatches, false);
  assert.equal(consentFetches.length, 1);
  assert.equal(consentFetches[0].options.credentials, 'include');
  assert.equal(consentFetches[0].options.cache, 'no-store');

  const retryPolicyVersions = ['2026-08-a', '2026-08-b'];
  let policyReads = 0;
  let preferenceWrites = 0;
  consentFetches = [];
  globalThis.fetch = async (url, options = {}) => {
    const request = { url: String(url), options };
    consentFetches.push(request);
    if ((options.method || 'GET') === 'GET') {
      const version = retryPolicyVersions[Math.min(policyReads, retryPolicyVersions.length - 1)];
      policyReads += 1;
      return {
        ok: true,
        async json() {
          return { ok: true, cookiePolicyVersion: version, cookieConsentMaxAgeDays: 180 };
        }
      };
    }
    preferenceWrites += 1;
    const version = preferenceWrites === 1 ? retryPolicyVersions[1] : retryPolicyVersions[1];
    return {
      ok: true,
      async json() {
        return {
          ok: true,
          consent: {
            status: 'custom', necessary: true, analytics: true, marketing: false,
            version, updatedAt: new Date().toISOString()
          }
        };
      }
    };
  };
  const retried = await cookie.persistConsentAgainstLivePolicy(true, false, 'custom', 'es');
  assert.equal(retried.policy.version, retryPolicyVersions[1]);
  assert.equal(retried.consent.version, retryPolicyVersions[1]);
  assert.equal(policyReads, 2);
  assert.equal(preferenceWrites, 2);
  assert.deepEqual(consentFetches.map((entry) => entry.options.method || 'GET'), ['GET', 'POST', 'GET', 'POST']);

  let outageReads = 0;
  globalThis.fetch = async () => {
    outageReads += 1;
    return { ok: false };
  };
  assert.equal(await cookie.persistConsentAgainstLivePolicy(true, true, 'accepted', 'es'), null);
  assert.equal(outageReads, 2);
  globalThis.fetch = analyticsFetch;

  console.log(JSON.stringify({
    ok: true,
    checks: [
      'encoded-email', 'phone', 'safe-url', 'origin-only-referrer', 'utm-filter',
      'signup-allowlist', 'reserved-attribution', 'event-schema-filter',
      'data-layer-filter', 'gtag-filter', 'payload-filter', 'session-id-filter',
      'exact-path-registry', 'consent-gate', 'consent-server-restore', 'consent-policy-retry'
    ]
  }));
} finally {
  await vite.close();
}
