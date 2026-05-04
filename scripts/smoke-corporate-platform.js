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

async function expectStatus(url, expectedStatus = 200, options = {}) {
  const response = await fetchWithTimeout(url, options);
  assert(
    response.status === expectedStatus,
    `${url} returned ${response.status}, expected ${expectedStatus}`
  );
  return response;
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

  await check('corporate robots and sitemap respond', async () => {
    const [{ text: robotsText }, { text: sitemapText }] = await Promise.all([
      getText(`${CORPORATE_SITE_URL}/robots.txt`),
      getText(`${CORPORATE_SITE_URL}/sitemap.xml`)
    ]);

    assert(robotsText.includes('Sitemap: https://aquaverify.com/sitemap.xml'), 'Robots sitemap entry missing');
    assert(sitemapText.includes('<loc>https://aquaverify.com/es</loc>'), 'Spanish sitemap URL missing');
    assert(sitemapText.includes('hreflang="fr"'), 'French sitemap hreflang missing');
    assert(sitemapText.includes('hreflang="it"'), 'Italian sitemap hreflang missing');
    assert(sitemapText.includes('hreflang="ca"'), 'Catalan sitemap hreflang missing');
    assert(sitemapText.includes('<loc>https://aquaverify.com/products/enumera</loc>'), 'ENUMERA sitemap URL missing');
    assert(sitemapText.includes('<loc>https://aquaverify.com/es/productos</loc>'), 'Spanish products sitemap URL missing');
    assert(sitemapText.includes('<loc>https://aquaverify.com/ca/productes</loc>'), 'Catalan products sitemap URL missing');
  });

  await check('corporate marketing routes respond', async () => {
    await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/products`),
      expectStatus(`${CORPORATE_SITE_URL}/products/enumera`),
      expectStatus(`${CORPORATE_SITE_URL}/es/productos`),
      expectStatus(`${CORPORATE_SITE_URL}/ca/productes`),
      expectStatus(`${CORPORATE_SITE_URL}/oem-water-testing-kits`),
      expectStatus(`${CORPORATE_SITE_URL}/about`)
    ]);
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
    assert(text.includes('aqCookieManageButton'), 'Cookie manage button marker missing from bundle');
    assert(text.includes('corporate-preferences'), 'Corporate cookie sync endpoint missing from bundle');
    assert(text.includes('corporate-policy'), 'Corporate cookie policy endpoint missing from bundle');
    assert(text.includes('terms'), 'Legal terms marker missing from bundle');
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

  await check('dynamic platform link helpers are present', async () => {
    assert(mainAssetText.includes('/signup'), 'Signup path missing from corporate bundle');
    assert(mainAssetText.includes('/login'), 'Login path missing from corporate bundle');
  });

  await check('corporate bundle does not use random image fallbacks', async () => {
    assert(!mainAssetText.includes('picsum.photos'), 'Random image fallback host is still present in corporate bundle');
    assert(
      mainAssetText.includes('koysa1xep3m_1772472595932.png'),
      'Stable AquaVerify LIMS dashboard fallback is missing from corporate bundle'
    );
  });

  await check('corporate CMS home slug fallback is present', async () => {
    assert(mainAssetText.includes('home-es'), 'Localized CMS home slug candidate missing from corporate bundle');
    assert(mainAssetText.includes('home'), 'Base CMS home fallback missing from corporate bundle');
    assert(mainAssetText.includes('/rest/v1/'), 'Public CMS REST marker missing from corporate bundle');
  });

  await check('distributor globe textures are local', async () => {
    const distributorsSectionMatch = mainAssetText.match(/assets\/DistributorsSection-[^"',)]+\.js/);
    assert(distributorsSectionMatch, 'Distributors section asset reference missing from main bundle');
    const { text: distributorsSectionText } = await getText(`${CORPORATE_SITE_URL}/${distributorsSectionMatch[0]}`);

    const globeAssetMatch = distributorsSectionText.match(/(?:assets\/)?DistributorsGlobe-[^"',)]+\.js/);
    assert(globeAssetMatch, 'Distributors globe asset reference missing from main bundle');
    const globeAssetPath = globeAssetMatch[0].startsWith('assets/')
      ? globeAssetMatch[0]
      : `assets/${globeAssetMatch[0]}`;
    const { text: globeAssetText } = await getText(`${CORPORATE_SITE_URL}/${globeAssetPath}`);
    assert(globeAssetText.includes('/images/globe/earth-blue-marble.jpg'), 'Local earth texture missing from globe asset');
    assert(globeAssetText.includes('/images/globe/earth-topology.png'), 'Local earth topology missing from globe asset');
    assert(!globeAssetText.includes('unpkg.com/three-globe'), 'Globe asset still references unpkg textures');
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
