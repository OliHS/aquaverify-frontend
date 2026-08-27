const CORPORATE_SITE_URL = trimTrailingSlash(process.env.CORPORATE_SITE_URL || 'https://aquaverify.com');
const PLATFORM_URL = trimTrailingSlash(process.env.PLATFORM_URL || 'https://app.aquaverify.com');
const REQUEST_TIMEOUT_MS = Number.parseInt(process.env.SMOKE_TIMEOUT_MS || '15000', 10);
const LEGAL_POLICY_VERSION = process.env.LEGAL_POLICY_VERSION || '2026-04';

const checks = [];

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/+$/, '');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function check(name, fn) {
  const startedAt = Date.now();

  try {
    await fn();
    checks.push({ name, ok: true, ms: Date.now() - startedAt });
  } catch (error) {
    checks.push({
      name,
      ok: false,
      ms: Date.now() - startedAt,
      error: error.message
    });
  }
}

async function getText(url, options = {}) {
  const response = await fetchWithTimeout(url, options);
  const text = await response.text();
  return { response, text };
}

function getMainAssetUrl(html) {
  const match = html.match(/\/assets\/index-[^"'\s]+\.js/);
  assert(match, 'Main Vite asset was not found in corporate HTML');
  return `${CORPORATE_SITE_URL}${match[0]}`;
}

function toAssetPath(assetReference) {
  const cleaned = assetReference
    .replace(/^\.?\//, '')
    .replace(/^assets\//, 'assets/');
  return cleaned.startsWith('assets/') ? cleaned : `assets/${cleaned}`;
}

function findAssetPath(text, pattern, message) {
  const match = text.match(pattern);
  assert(match, message);
  return toAssetPath(match[1] || match[0]);
}

async function expectStatus(url, expectedStatus = 200, options = {}) {
  const response = await fetchWithTimeout(url, options);
  assert(
    response.status === expectedStatus,
    `${url} returned ${response.status}, expected ${expectedStatus}`
  );
  return response;
}

async function expectPermanentRedirect(source, destination) {
  const response = await fetchWithTimeout(source, { redirect: 'manual' });
  const location = response.headers.get('location') || '';
  const relativeDestination = new URL(destination).pathname;

  assert([301, 308].includes(response.status), `${source} returned ${response.status}, expected permanent redirect`);
  assert(
    location === destination || location === relativeDestination,
    `${source} redirect location was ${location || 'empty'}, expected ${destination}`
  );
}

async function run() {
  let corporateHtml = '';
  let mainAssetText = '';
  let corporateHomeHeaders = null;

  await check('corporate home responds', async () => {
    const { response, text } = await getText(CORPORATE_SITE_URL);
    assert(response.status === 200, `Corporate site returned ${response.status}`);
    assert(text.includes('<div id="root">'), 'Corporate root container missing');
    corporateHtml = text;
    corporateHomeHeaders = response.headers;
  });

  await check('corporate security headers are present', async () => {
    assert(corporateHomeHeaders, 'Corporate home headers were not captured');

    const contentSecurityPolicy = corporateHomeHeaders.get('content-security-policy') || '';
    assert(contentSecurityPolicy.includes("default-src 'self'"), 'CSP default-src missing');
    assert(contentSecurityPolicy.includes("frame-ancestors 'none'"), 'CSP frame-ancestors missing');
    assert(contentSecurityPolicy.includes('https://app.aquaverify.com'), 'CSP platform origin missing');
    assert(contentSecurityPolicy.includes('https://www.googletagmanager.com'), 'CSP Google Tag Manager origin missing');
    assert(contentSecurityPolicy.includes('https://www.google-analytics.com'), 'CSP Google Analytics origin missing');
    assert(!contentSecurityPolicy.includes('unpkg.com'), 'CSP still allows unpkg.com');
    assert(
      corporateHomeHeaders.get('x-content-type-options') === 'nosniff',
      'X-Content-Type-Options is not nosniff'
    );
    assert(corporateHomeHeaders.get('x-frame-options') === 'DENY', 'X-Frame-Options is not DENY');
    assert(
      corporateHomeHeaders.get('referrer-policy') === 'strict-origin-when-cross-origin',
      'Referrer-Policy is incorrect'
    );
    assert(
      (corporateHomeHeaders.get('permissions-policy') || '').includes('camera=()'),
      'Permissions-Policy camera directive missing'
    );
  });

  await check('corporate identity assets respond', async () => {
    await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/favicon.ico`),
      expectStatus(`${CORPORATE_SITE_URL}/favicon-32x32.png`),
      expectStatus(`${CORPORATE_SITE_URL}/images/logo-mark-160.png`)
    ]);
  });

  await check('corporate SEO metadata is present', async () => {
    assert(/<meta\s+name=["']description["']/i.test(corporateHtml), 'Meta description missing');
    assert(/<link\s+rel=["']canonical["']\s+href=["']https:\/\/aquaverify\.com\/["']/i.test(corporateHtml), 'Canonical link missing');
    assert(/property=["']og:title["']/i.test(corporateHtml), 'OpenGraph title missing');
    assert(/name=["']twitter:card["']/i.test(corporateHtml), 'Twitter card metadata missing');
    assert(/hreflang=["']es["']\s+href=["']https:\/\/aquaverify\.com\/es["']/i.test(corporateHtml), 'Spanish hreflang missing');
    assert(/hreflang=["']ca["']\s+href=["']https:\/\/aquaverify\.com\/ca["']/i.test(corporateHtml), 'Catalan hreflang missing');
    assert(/application\/ld\+json/i.test(corporateHtml), 'Organization JSON-LD missing');
  });

  await check('Google Tag Manager is installed with consent mode', async () => {
    assert(corporateHtml.includes('GTM-TXHGB5D4'), 'GTM container ID missing');
    assert(corporateHtml.includes('https://www.googletagmanager.com/gtm.js'), 'GTM head script missing');
    assert(corporateHtml.includes('https://www.googletagmanager.com/ns.html?id=GTM-TXHGB5D4'), 'GTM noscript iframe missing');
    assert(corporateHtml.includes("gtag('consent', 'default'"), 'Google Consent Mode default command missing');
    assert(corporateHtml.includes('aquaverify_cookie_consent'), 'Consent mode should read stored corporate consent');
    assert(corporateHtml.includes('analytics_storage: analyticsStorage'), 'Analytics consent should use resolved storage state');
    assert(corporateHtml.includes('ad_storage: marketingStorage'), 'Ad consent should use resolved storage state');
  });

  await check('www host redirects to canonical apex domain', async () => {
    const url = new URL(CORPORATE_SITE_URL);
    const apexHost = url.host.replace(/^www\./, '');
    const cases = [
      { source: `${url.protocol}//www.${apexHost}/`, destination: `${url.protocol}//${apexHost}/` },
      { source: `${url.protocol}//www.${apexHost}/resources`, destination: `${url.protocol}//${apexHost}/resources` }
    ];

    for (const item of cases) {
      const response = await fetchWithTimeout(item.source, { redirect: 'manual' });
      const location = response.headers.get('location') || '';

      assert([301, 308].includes(response.status), `${item.source} returned ${response.status}, expected permanent redirect`);
      assert(location === item.destination, `${item.source} redirect location was ${location || 'empty'}`);
    }
  });

  await check('corporate robots and sitemap respond', async () => {
    const [{ text: robotsText }, { text: sitemapText }] = await Promise.all([
      getText(`${CORPORATE_SITE_URL}/robots.txt`),
      getText(`${CORPORATE_SITE_URL}/sitemap.xml`)
    ]);
    const sitemapUrls = [...sitemapText.matchAll(/<loc>(https:\/\/aquaverify\.com\/sitemaps\/[^<]+)<\/loc>/g)].map((match) => match[1]);
    const childSitemapTexts = await Promise.all(sitemapUrls.map((url) => getText(url).then(({ text }) => text)));
    const indexedSitemapText = [sitemapText, ...childSitemapTexts].join('\n');

    assert(robotsText.includes('Sitemap: https://aquaverify.com/sitemap.xml'), 'Robots sitemap entry missing');
    assert(sitemapText.includes('<sitemapindex'), 'Root sitemap should be a sitemap index');
    assert(sitemapUrls.length >= 5, 'Sitemap index should include child sitemaps');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es</loc>'), 'Spanish sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/products/enumera</loc>'), 'ENUMERA sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/productos</loc>'), 'Spanish products sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/ca/productes</loc>'), 'Catalan products sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/products/enumera-soma100</loc>'), 'ENUMERA Soma100 sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/productos/indica-coli</loc>'), 'Spanish INDICA Coli sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/ca/productes/epa-f-plus</loc>'), 'Catalan EPA F-Plus sitemap URL missing');
    assert(!indexedSitemapText.includes('/oem/private-label-water-testing-kits'), 'Private-label OEM duplicate should not be in sitemap');
    assert(!indexedSitemapText.includes('/es/oem/kits-analisis-agua-marca-blanca'), 'Spanish private-label OEM duplicate should not be in sitemap');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/industries/food-beverage-water-quality</loc>'), 'Food & beverage industry sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/resources</loc>'), 'Resources hub sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/resources/eu-drinking-water-directive-coliphages</loc>'), 'EU water directive whitepaper sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/recursos/software-cumplimiento-calidad-agua</loc>'), 'Spanish compliance software whitepaper sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/resources/presence-absence-vs-enumeration</loc>'), 'Presence vs enumeration sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/recursos/trazabilidad-digital-muestras-agua</loc>'), 'Spanish traceability guide sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/glosario</loc>'), 'Spanish glossary hub sitemap URL missing');
    assert(indexedSitemapText.includes('<loc>https://aquaverify.com/es/glosario/colifagos-somaticos</loc>'), 'Spanish somatic coliphages glossary sitemap URL missing');
  });

  await check('private-label OEM duplicates redirect to canonical OEM pages', async () => {
    await Promise.all([
      expectPermanentRedirect(`${CORPORATE_SITE_URL}/oem/private-label-water-testing-kits`, `${CORPORATE_SITE_URL}/oem-water-testing-kits`),
      expectPermanentRedirect(`${CORPORATE_SITE_URL}/es/oem/kits-analisis-agua-marca-blanca`, `${CORPORATE_SITE_URL}/es/oem-kits-analisis-agua`),
      expectPermanentRedirect(`${CORPORATE_SITE_URL}/fr/oem/kits-analyse-eau-marque-blanche`, `${CORPORATE_SITE_URL}/fr/oem-kits-analyse-eau`),
      expectPermanentRedirect(`${CORPORATE_SITE_URL}/it/oem/kit-analisi-acqua-marca-privata`, `${CORPORATE_SITE_URL}/it/oem-kit-analisi-acqua`),
      expectPermanentRedirect(`${CORPORATE_SITE_URL}/ca/oem/kits-analisi-aigua-marca-blanca`, `${CORPORATE_SITE_URL}/ca/oem-kits-analisi-aigua`)
    ]);
  });

  await check('corporate marketing routes respond', async () => {
    await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/products`),
      expectStatus(`${CORPORATE_SITE_URL}/products/enumera`),
      expectStatus(`${CORPORATE_SITE_URL}/products/enumera-soma100`),
      expectStatus(`${CORPORATE_SITE_URL}/es/productos`),
      expectStatus(`${CORPORATE_SITE_URL}/es/productos/indica-coli`),
      expectStatus(`${CORPORATE_SITE_URL}/ca/productes`),
      expectStatus(`${CORPORATE_SITE_URL}/ca/productes/epa-f-plus`),
      expectStatus(`${CORPORATE_SITE_URL}/oem-water-testing-kits`),
      expectStatus(`${CORPORATE_SITE_URL}/industries/food-beverage-water-quality`),
      expectStatus(`${CORPORATE_SITE_URL}/es/industrias/agua-proceso-industrial`),
      expectStatus(`${CORPORATE_SITE_URL}/resources`),
      expectStatus(`${CORPORATE_SITE_URL}/resources/eu-drinking-water-directive-coliphages`),
      expectStatus(`${CORPORATE_SITE_URL}/es/recursos/software-cumplimiento-calidad-agua`),
      expectStatus(`${CORPORATE_SITE_URL}/resources/us-drinking-water-compliance-coliform-rule`),
      expectStatus(`${CORPORATE_SITE_URL}/resources/water-testing-kit-distributor-checklist`),
      expectStatus(`${CORPORATE_SITE_URL}/es/recursos/trazabilidad-digital-muestras-agua`),
      expectStatus(`${CORPORATE_SITE_URL}/es/glosario`),
      expectStatus(`${CORPORATE_SITE_URL}/es/glosario/colifagos-somaticos`),
      expectStatus(`${CORPORATE_SITE_URL}/en/glossary/somatic-coliphages`),
      expectStatus(`${CORPORATE_SITE_URL}/about`)
    ]);
  });

  await check('corporate marketing routes expose static SEO HTML', async () => {
    const [
      { text: englishProductHtml },
      { text: spanishProductHtml },
      { text: spanishHomeHtml },
      { text: englishSaasHtml }
    ] = await Promise.all([
      getText(`${CORPORATE_SITE_URL}/products/enumera-soma100`),
      getText(`${CORPORATE_SITE_URL}/es/productos/indica-coli`),
      getText(`${CORPORATE_SITE_URL}/es`),
      getText(`${CORPORATE_SITE_URL}/saas/biotech-lims-platform`)
    ]);

    assert(englishProductHtml.includes('<title>ENUMERA Soma100 | AquaVerify ENUMERA</title>'), 'Static product title missing');
    assert(englishProductHtml.includes('"@type": "Product"'), 'Static Product JSON-LD missing');
    assert(englishProductHtml.includes('"@type": "FAQPage"'), 'Static FAQ JSON-LD missing');
    assert(englishProductHtml.includes('"@type": "BreadcrumbList"'), 'Static Breadcrumb JSON-LD missing');
    assert(englishProductHtml.includes('data-prerender="marketing-seo"'), 'Static product SEO body missing');
    assert(
      englishProductHtml.includes('https://aquaverify.com/datasheets/products/enumera-soma100-en.html'),
      'Static product datasheet link missing'
    );
    assert(
      englishProductHtml.includes('https://aquaverify.com/images/products/marketing/enumera-soma100.svg'),
      'Static product hero image missing'
    );
    assert(
      (englishProductHtml.match(/property=["']og:title["']/g) || []).length === 1,
      'Static product HTML has duplicate OpenGraph title metadata'
    );
    assert(
      spanishProductHtml.includes('<html lang="es"') && spanishProductHtml.includes('INDICA Coli | AquaVerify INDICA'),
      'Spanish product static SEO HTML missing'
    );
    assert(
      spanishHomeHtml.includes('<html lang="es"') &&
        spanishHomeHtml.includes('AquaVerify | Detección innovadora de virus y bacterias en el agua'),
      'Spanish home static SEO HTML missing'
    );
    assert(
      englishSaasHtml.includes('/images/platform/saas/aquaverify-cloud-dashboard.jpg'),
      'SaaS static SEO HTML does not expose platform screenshot image'
    );
  });

  await check('corporate SaaS screenshot assets respond', async () => {
    await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-cloud-dashboard.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-crm-customer-360.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-lims-dashboard.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-work-board.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-wms-dashboard.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/platform/saas/aquaverify-finance-treasury.jpg`)
    ]);
  });

  await check('corporate product assets and datasheets respond', async () => {
    const [heroResponse, datasheetResponse] = await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/images/products/marketing/enumera-soma100.svg`),
      expectStatus(`${CORPORATE_SITE_URL}/datasheets/products/enumera-soma100-es.html`)
    ]);
    assert(
      (heroResponse.headers.get('content-type') || '').includes('image/svg+xml'),
      'Product hero asset content-type is not SVG'
    );
    assert(
      (datasheetResponse.headers.get('content-type') || '').includes('text/html'),
      'Product datasheet content-type is not HTML'
    );
  });

  await check('corporate site is not installable as PWA', async () => {
    assert(!/rel=["']manifest["']/i.test(corporateHtml), 'Corporate HTML still exposes a web app manifest');
  });

  await check('corporate bundle contains platform integration markers', async () => {
    const mainAssetUrl = getMainAssetUrl(corporateHtml);
    const { response, text } = await getText(mainAssetUrl);
    assert(response.status === 200, `Main asset returned ${response.status}`);
    assert(
      (response.headers.get('cache-control') || '').includes('immutable'),
      'Main hashed asset is not served with immutable cache'
    );
    assert(text.includes('app.aquaverify.com'), 'Platform host missing from corporate bundle');
    assert(!text.includes('aqCookieManageButton'), 'Floating cookie manage button is still present in bundle');
    assert(text.includes('corporate-preferences'), 'Corporate cookie sync endpoint missing from bundle');
    assert(text.includes('corporate-policy'), 'Corporate cookie policy endpoint missing from bundle');
    assert(text.includes('corporate-events'), 'Corporate analytics endpoint missing from bundle');
    assert(text.includes('platform_link_click'), 'Corporate CRO click event marker missing from bundle');
    assert(text.includes('quote_start'), 'Quote start conversion marker missing from bundle');
    assert(text.includes('oem_form_start'), 'OEM start conversion marker missing from bundle');
    assert(text.includes('saas_demo_start'), 'SaaS start conversion marker missing from bundle');
    assert(text.includes('terms'), 'Legal terms marker missing from bundle');
    assert(text.includes('buyer-pathways'), 'Buyer pathway conversion marker missing from bundle');
    assert(text.includes('home-final-cta'), 'Final home CTA conversion marker missing from bundle');
    assert(text.includes(LEGAL_POLICY_VERSION), 'Legal/cookie policy version marker missing from bundle');
    mainAssetText = text;
  });

  await check('platform public routes respond', async () => {
    await Promise.all([
      expectStatus(`${PLATFORM_URL}/signup`),
      expectStatus(`${PLATFORM_URL}/login`),
      expectStatus(`${PLATFORM_URL}/legal/terms`),
      expectStatus(`${PLATFORM_URL}/legal/cookies`)
    ]);
  });

  await check('corporate cookie CORS allows corporate origin', async () => {
    const response = await expectStatus(
      `${PLATFORM_URL}/legal/cookies/corporate-preferences`,
      204,
      {
        method: 'OPTIONS',
        headers: {
          Origin: CORPORATE_SITE_URL,
          'Access-Control-Request-Method': 'POST'
        }
      }
    );

    assert(
      response.headers.get('access-control-allow-origin') === CORPORATE_SITE_URL,
      'Corporate cookie CORS allow-origin header is incorrect'
    );
  });

  await check('corporate cookie policy metadata is aligned', async () => {
    const { response, text } = await getText(
      `${PLATFORM_URL}/legal/cookies/corporate-policy`,
      {
        headers: {
          Origin: CORPORATE_SITE_URL,
          Accept: 'application/json'
        }
      }
    );
    assert(response.status === 200, `Corporate cookie policy returned ${response.status}`);
    assert(
      response.headers.get('access-control-allow-origin') === CORPORATE_SITE_URL,
      'Corporate cookie policy CORS allow-origin header is incorrect'
    );
    const payload = JSON.parse(text);
    assert(payload.ok === true, 'Corporate cookie policy did not return ok=true');
    assert(payload.cookiePolicyVersion === LEGAL_POLICY_VERSION, 'Corporate cookie policy version is not aligned');
    assert(Number(payload.cookieConsentMaxAgeDays) >= 30, 'Corporate cookie max age is invalid');
  });

  await check('corporate cookie CORS blocks foreign origin', async () => {
    await expectStatus(
      `${PLATFORM_URL}/legal/cookies/corporate-preferences`,
      403,
      {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://example.invalid',
          'Access-Control-Request-Method': 'POST'
        }
      }
    );
  });

  await check('corporate analytics endpoint respects consent gate', async () => {
    const response = await expectStatus(
      `${PLATFORM_URL}/legal/cookies/corporate-events`,
      202,
      {
        method: 'POST',
        headers: {
          Origin: CORPORATE_SITE_URL,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          event_name: 'smoke_no_consent',
          analytics: '0',
          path: '/smoke'
        })
      }
    );
    assert(
      response.headers.get('access-control-allow-origin') === CORPORATE_SITE_URL,
      'Corporate analytics CORS allow-origin header is incorrect'
    );
  });

  await check('dynamic platform link helpers are present', async () => {
    assert(mainAssetText.includes('/signup'), 'Signup path missing from corporate bundle');
    assert(mainAssetText.includes('/login'), 'Login path missing from corporate bundle');
  });

  await check('marketing product analytics markers are present', async () => {
    const marketingRoutePath = findAssetPath(
      mainAssetText,
      /(?:assets\/|\.\/)?(MarketingRoutePage-[^"',)]+\.js)/,
      'Marketing route asset reference missing from main bundle'
    );
    const { text: marketingRouteText } = await getText(`${CORPORATE_SITE_URL}/${marketingRoutePath}`);
    let analyticsBundleText = marketingRouteText;

    if (!analyticsBundleText.includes('product_view') || !analyticsBundleText.includes('datasheet_click')) {
      const productsRoutePath = findAssetPath(
        marketingRouteText,
        /(?:assets\/|\.\/)?(ProductsMarketingRoute-[^"',)]+\.js)/,
        'Product marketing route asset reference missing from marketing route bundle'
      );
      const { text: productsRouteText } = await getText(`${CORPORATE_SITE_URL}/${productsRoutePath}`);
      analyticsBundleText = `${marketingRouteText}\n${productsRouteText}`;
    }

    assert(analyticsBundleText.includes('product_view'), 'Product view analytics marker missing from marketing route bundle');
    assert(analyticsBundleText.includes('datasheet_click'), 'Datasheet analytics marker missing from marketing route bundle');
  });

  await check('corporate bundle does not use random image fallbacks', async () => {
    assert(!mainAssetText.includes('picsum.photos'), 'Random image fallback host is still present in corporate bundle');
    assert(
      mainAssetText.includes('/videos/enumera-tray-video.mp4'),
      'Stable ENUMERA tray hero video fallback is missing from corporate bundle'
    );
  });

  await check('home platform teaser uses SaaS route and local screenshots', async () => {
    assert(
      mainAssetText.includes('/images/platform/saas/aquaverify-lims-dashboard.jpg'),
      'Local LIMS screenshot path is missing from the home bundle'
    );
    assert(
      mainAssetText.includes('/images/platform/saas/aquaverify-crm-customer-360.jpg'),
      'Local CRM screenshot path is missing from the home bundle'
    );
    assert(
      mainAssetText.includes('/images/platform/saas/aquaverify-cloud-dashboard.jpg'),
      'Local cloud dashboard screenshot path is missing from the home bundle'
    );
    assert(
      mainAssetText.includes('/platform') || mainAssetText.includes('/plataforma'),
      'Platform route is missing from the home bundle'
    );
  });

  await check('corporate CMS home slug fallback is present', async () => {
    assert(mainAssetText.includes('home-es'), 'Localized CMS home slug candidate missing from corporate bundle');
    assert(mainAssetText.includes('home'), 'Base CMS home fallback missing from corporate bundle');
    assert(mainAssetText.includes('/rest/v1/'), 'Public CMS REST marker missing from corporate bundle');
  });

  await check('distributor globe textures are local', async () => {
    assert(!corporateHtml.includes('DistributorsGlobe'), 'Home HTML preloads the distributor globe chunk');
    assert(!mainAssetText.includes('/images/globe/earth-blue-marble.jpg'), 'Main bundle contains globe texture path');
    assert(!mainAssetText.includes('/images/globe/earth-topology.png'), 'Main bundle contains globe topology path');
    assert(!mainAssetText.includes('three-globe'), 'Main bundle contains three-globe code');
    assert(!mainAssetText.includes('react-globe'), 'Main bundle contains react-globe code');
    const textureResponses = await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/images/globe/earth-blue-marble.jpg`),
      expectStatus(`${CORPORATE_SITE_URL}/images/globe/earth-topology.png`)
    ]);
    textureResponses.forEach((response) => {
      assert(
        (response.headers.get('cache-control') || '').includes('immutable'),
        'Local globe texture is not served with immutable cache'
      );
    });
  });

  await check('footer cookie settings opens preferences panel', async () => {
    assert(
      mainAssetText.includes('aquaverify:open-cookie-preferences'),
      'Cookie preferences open event missing from corporate bundle'
    );
  });

  await check('footer exposes the official social profiles', async () => {
    const footerAssetPath = findAssetPath(
      mainAssetText,
      /(?:assets\/|\.\/)?(Footer-[^"',)]+\.js)/,
      'Footer asset reference missing from main bundle'
    );
    const { response, text: footerAssetText } = await getText(`${CORPORATE_SITE_URL}/${footerAssetPath}`);

    assert(response.status === 200, `Footer asset returned ${response.status}`);
    assert(
      footerAssetText.includes('https://www.linkedin.com/company/aquaverify'),
      'Official AquaVerify LinkedIn profile missing from footer bundle'
    );
    assert(
      footerAssetText.includes('https://bsky.app/profile/aquaverify.com'),
      'Official AquaVerify Bluesky profile missing from footer bundle'
    );
    assert(footerAssetText.includes('url_linkedin'), 'CMS LinkedIn footer field missing from footer bundle');
    assert(footerAssetText.includes('url_bluesky'), 'CMS Bluesky footer field missing from footer bundle');
    assert(footerAssetText.includes('noopener noreferrer'), 'Footer external-link protection missing');
  });

  const failedChecks = checks.filter((item) => !item.ok);
  console.log(JSON.stringify({
    ok: failedChecks.length === 0,
    corporateSiteUrl: CORPORATE_SITE_URL,
    platformUrl: PLATFORM_URL,
    checks
  }, null, 2));

  if (failedChecks.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
