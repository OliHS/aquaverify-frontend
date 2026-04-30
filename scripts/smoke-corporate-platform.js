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

  await check('corporate home responds', async () => {
    const { response, text } = await getText(CORPORATE_SITE_URL);
    assert(response.status === 200, `Corporate site returned ${response.status}`);
    assert(text.includes('<div id="root">'), 'Corporate root container missing');
    corporateHtml = text;
  });

  await check('corporate identity assets respond', async () => {
    await Promise.all([
      expectStatus(`${CORPORATE_SITE_URL}/favicon.ico`),
      expectStatus(`${CORPORATE_SITE_URL}/favicon-32x32.png`),
      expectStatus(`${CORPORATE_SITE_URL}/images/logo-mark-160.png`)
    ]);
  });

  await check('corporate site is not installable as PWA', async () => {
    assert(!/rel=["']manifest["']/i.test(corporateHtml), 'Corporate HTML still exposes a web app manifest');
  });

  await check('corporate bundle contains platform integration markers', async () => {
    const mainAssetUrl = getMainAssetUrl(corporateHtml);
    const { response, text } = await getText(mainAssetUrl);
    assert(response.status === 200, `Main asset returned ${response.status}`);
    assert(text.includes('app.aquaverify.com'), 'Platform host missing from corporate bundle');
    assert(text.includes('aqCookieManageButton'), 'Cookie manage button marker missing from bundle');
    assert(text.includes('corporate-preferences'), 'Corporate cookie sync endpoint missing from bundle');
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
