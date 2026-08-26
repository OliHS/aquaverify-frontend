import {
  containsLikelyPersonalData,
  getPlatformCorporateAnalyticsUrl,
  getPrivacySafeCorporateAttributionParams,
  getPrivacySafePagePath,
  normalizePrivacySafeCorporateSourcePath,
  PLATFORM_BASE_URL
} from './platformLinks';
import { MARKETING_ROUTE_PATHS } from './marketingRoutes.js';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

const ANALYTICS_SESSION_KEY = 'aquaverify:analytics_session';
const SUPPORTED_LANGUAGES = new Set(['es', 'en', 'fr', 'it', 'ca']);
const SAFE_SOURCE_ORIGINS = new Set(['https://aquaverify.com', 'https://www.aquaverify.com']);
const SAFE_TARGET_HOSTS = new Set(['aquaverify.com', 'www.aquaverify.com', 'app.aquaverify.com']);
const TRACKING_FIELDS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id',
  'gclid', 'fbclid', 'msclkid'
] as const;
const CLICK_ID_FIELDS = new Set(['gclid', 'fbclid', 'msclkid']);
const ALLOWED_PAGE_VALUES = new Set([
  ...Object.keys(MARKETING_ROUTE_PATHS),
  'aquatools', 'aquatool-dilution', 'aquatool-molarity', 'aquatool-unit-converter',
  'aquatool-rpm-rcf', 'aquatool-cfu', 'aquatool-recovery-rpd',
  'aquatool-hardness-alkalinity', 'aquatool-chemical-species', 'workflow-advisor',
  'footer', 'header', 'home', 'home-final-cta', 'home-platform-teaser'
]);
const CORPORATE_DATASHEET_PAGE_IDS = new Set(
  [...ALLOWED_PAGE_VALUES].filter((value) => ![
    'footer', 'header', 'home', 'home-final-cta', 'home-platform-teaser'
  ].includes(value))
);
const APP_ANALYTICS_TARGET_PATHS = new Set(['/login', '/signup']);
const CONSENT_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,39}$/;
const CONSENT_CLOCK_SKEW_MS = 5 * 60 * 1000;
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const ALLOWED_DIMENSION_VALUES: Readonly<Record<string, ReadonlySet<string>>> = Object.freeze({
  page: ALLOWED_PAGE_VALUES,
  category: new Set(['company', 'industries', 'partners', 'platform', 'products', 'resources']),
  intent: new Set([
    'agriculture_water', 'contact', 'demo', 'direct-shipping', 'distributor',
    'distributor-opportunity', 'distributor_lookup', 'facility_water_risk',
    'find_distributor', 'food_beverage', 'global-quote', 'hospitality_tourism_water',
    'industrial_process_water', 'municipal', 'oem', 'oem_program', 'partner-contact',
    'pharma_cosmetics_water', 'platform', 'product_recommendation', 'quote', 'saas',
    'sector_assessment', 'signup'
  ]),
  sector: new Set([
    'agriculture-water', 'facility-water-risk', 'food-beverage-water-quality',
    'hospitality-tourism-water', 'industrial-process-water', 'municipal-water-testing',
    'pharma-cosmetics-water', 'water-quality-control', 'water-testing-labs'
  ]),
  profile: new Set([
    'agriculture', 'biotech', 'buyer', 'distributors', 'facilities', 'food-beverage',
    'hospitality-tourism', 'industrial', 'labs', 'municipal', 'partner',
    'pharma-cosmetics', 'quality'
  ]),
  module: new Set([
    'agriculture-water-diagnosis', 'compliance', 'facility-water-risk-diagnosis',
    'food-beverage-water-diagnosis', 'hospitality-tourism-water-diagnosis',
    'industrial-process-water-diagnosis', 'lab-diagnosis', 'lims',
    'local-distributor-routing', 'mobile', 'municipal-water-diagnosis', 'partner-review',
    'pharma-cosmetics-water-diagnosis', 'private-label-program', 'sector',
    'water-quality-diagnosis'
  ]),
  status: new Set(['accepted', 'custom']),
  location: new Set([
    'products_comparison', 'products_decision', 'products_hero', 'products_partner_paths',
    'products_sector_overview', 'products_sector_recommendations'
  ]),
  partner_type: new Set(['exclusive', 'open', 'reseller', 'service']),
  route: new Set(['distributor', 'integrator', 'lab', 'manufacturer'])
});
export const ALLOWED_STATIC_PARTNER_IDS: ReadonlySet<string> = new Set([
  'apac-open', 'eu-open', 'latam-open', 'mea-open', 'na-open', 'uk-open'
]);

const COMMON_EVENT_FIELDS = ['lang', 'path'] as const;
const LINK_EVENT_FIELDS = [
  'target_url', 'target_path', 'intent', 'page', 'category', 'profile', 'module'
] as const;
const SUBMIT_EVENT_FIELDS = ['page', 'category', 'intent', 'profile', 'module'] as const;
export const EVENT_FIELDS: Readonly<Record<string, readonly string[]>> = Object.freeze({
  agriculture_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  click_compare_products: ['page', 'location'],
  click_distributor_cta: ['page', 'intent', 'location'],
  click_oem_cta: ['page', 'intent', 'location'],
  click_product_card: ['page', 'location'],
  click_sector_card: ['page', 'sector', 'location'],
  contact_start: LINK_EVENT_FIELDS,
  cookie_consent_update: ['status'],
  datasheet_click: ['page', 'category', 'target_url', 'target_path'],
  demo_start: LINK_EVENT_FIELDS,
  distributor_contact_submit: SUBMIT_EVENT_FIELDS,
  distributor_country_search: ['page', 'category', 'partner'],
  distributor_globe_load: ['page', 'category', 'partners'],
  distributor_partner_match: ['page', 'category', 'distributor', 'partner', 'partner_type'],
  distributor_partner_select: ['page', 'category', 'distributor', 'partner', 'partner_type'],
  distributor_partner_submit: SUBMIT_EVENT_FIELDS,
  distributor_start: LINK_EVENT_FIELDS,
  facility_water_risk_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  food_beverage_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  hospitality_tourism_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  industrial_process_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  language_switch: ['from_lang', 'to_lang'],
  municipal_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  oem_final_primary_cta_click: ['page', 'category'],
  oem_final_secondary_cta_click: ['page', 'category'],
  oem_form_start: LINK_EVENT_FIELDS,
  oem_form_submit: SUBMIT_EVENT_FIELDS,
  oem_model_cta_click: ['page', 'category'],
  oem_primary_cta_click: ['page', 'category'],
  oem_route_selector_click: ['page', 'category', 'route'],
  oem_secondary_cta_click: ['page', 'category'],
  oem_selector_cta_click: ['page', 'category'],
  page_view: [],
  pharma_cosmetics_water_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  platform_link_click: LINK_EVENT_FIELDS,
  product_view: ['page', 'category'],
  quote_start: LINK_EVENT_FIELDS,
  saas_demo_start: LINK_EVENT_FIELDS,
  sector_hub_click: ['page', 'sector', 'target_url', 'target_path'],
  submit_quote_form: ['page', 'intent', 'location'],
  water_quality_diagnosis_submit: SUBMIT_EVENT_FIELDS,
  water_testing_lab_diagnosis_submit: SUBMIT_EVENT_FIELDS
});

const TOKEN_FIELD_LIMITS: Readonly<Record<string, number>> = Object.freeze({
  page: 140,
  category: 100,
  intent: 100,
  sector: 100,
  profile: 100,
  module: 140,
  status: 40,
  location: 140,
  distributor: 120,
  partner: 120,
  partner_type: 80,
  route: 100,
  utm_source: 140,
  utm_medium: 140,
  utm_campaign: 180,
  utm_content: 180,
  utm_term: 180,
  utm_id: 140,
  gclid: 220,
  fbclid: 220,
  msclkid: 220
});

type VerifiedCorporateConsent = {
  status: 'accepted' | 'custom';
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  updatedAt: string;
};

let verifiedCorporateConsent: VerifiedCorporateConsent | null = null;
let pendingCorporatePageView: AnalyticsPayload | null = null;

export function parseConsent(raw: string | null): VerifiedCorporateConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const updatedAtMs = Date.parse(typeof parsed?.updatedAt === 'string' ? parsed.updatedAt : '');
    if (
      !parsed
      || typeof parsed !== 'object'
      || Array.isArray(parsed)
      || !['accepted', 'custom'].includes(parsed.status)
      || parsed.necessary !== true
      || typeof parsed.analytics !== 'boolean'
      || typeof parsed.marketing !== 'boolean'
      || typeof parsed.version !== 'string'
      || !CONSENT_VERSION_PATTERN.test(parsed.version)
      || !Number.isFinite(updatedAtMs)
      || updatedAtMs > Date.now() + CONSENT_CLOCK_SKEW_MS
    ) return null;
    return {
      status: parsed.status,
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: parsed.version,
      updatedAt: new Date(updatedAtMs).toISOString()
    };
  } catch {
    return null;
  }
}

function getAnalyticsSessionId() {
  if (typeof window === 'undefined') return '';

  try {
    const existing = window.sessionStorage.getItem(ANALYTICS_SESSION_KEY);
    if (existing && UUID_V4_PATTERN.test(existing)) {
      return existing.toLowerCase();
    }
    const next = crypto.randomUUID?.() || '';
    if (!UUID_V4_PATTERN.test(next)) return '';
    const normalized = next.toLowerCase();
    window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, normalized);
    return normalized;
  } catch {
    return '';
  }
}

function strictScalar(value: AnalyticsPayload[string], limit: number) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  const raw = String(value).trim();
  if (!raw || raw.length > limit || /[\u0000-\u001F\u007F]/.test(raw)) return '';
  return containsLikelyPersonalData(raw) ? '' : raw;
}

function repeatedlyDecode(value: string) {
  let decoded = value;
  const maxIterations = Math.min(Math.max(decoded.length + 1, 1), 512);
  for (let index = 0; index < maxIterations; index += 1) {
    const next = decoded.replace(/(?:%[0-9a-f]{2})+/gi, (encodedRun) => {
      try {
        return decodeURIComponent(encodedRun);
      } catch {
        return encodedRun.replace(/%([0-9a-f]{2})/gi, (match, hex) => {
          const byte = Number.parseInt(hex, 16);
          return byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : match;
        });
      }
    });
    if (next === decoded) break;
    decoded = next;
  }
  return decoded.normalize('NFKC').replace(/\p{Cf}/gu, '');
}

function sanitizeToken(value: AnalyticsPayload[string], field: string) {
  const raw = strictScalar(value, TOKEN_FIELD_LIMITS[field] || 140);
  if (!raw) return '';
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(raw)) return '';
  return raw.toLowerCase();
}

function sanitizeRegisteredDimension(value: AnalyticsPayload[string], field: string) {
  const normalized = sanitizeToken(value, field);
  return normalized && ALLOWED_DIMENSION_VALUES[field]?.has(normalized) ? normalized : '';
}

function sanitizePartnerIdentifier(value: AnalyticsPayload[string], field: string) {
  const raw = strictScalar(value, TOKEN_FIELD_LIMITS[field] || 120).toLowerCase();
  if (!raw) return '';
  const isNumericId = /^[1-9]\d{0,9}$/.test(raw);
  const isUuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(raw);
  return isNumericId || isUuid || ALLOWED_STATIC_PARTNER_IDS.has(raw) ? raw : '';
}

function sanitizeClickIdentifier(value: AnalyticsPayload[string], field: string) {
  const raw = strictScalar(value, TOKEN_FIELD_LIMITS[field] || 220);
  if (!raw) return '';
  const valid = field === 'msclkid'
    ? /^[a-f0-9]{32}$/i.test(raw)
    : /^(?=.{24,220}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z0-9._~-]+$/.test(raw);
  return valid ? raw : '';
}

function sanitizeLanguage(value: AnalyticsPayload[string]) {
  const raw = strictScalar(value, 10).toLowerCase();
  return SUPPORTED_LANGUAGES.has(raw) ? raw : '';
}

function sanitizePathShape(value: AnalyticsPayload[string], limit = 300) {
  const raw = strictScalar(value, 2048);
  if (!raw || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '';

  let parsed: URL;
  try {
    parsed = new URL(raw, 'https://aquaverify.com');
  } catch {
    return '';
  }
  if (parsed.origin !== 'https://aquaverify.com' || parsed.search || parsed.hash) return '';
  const inspected = repeatedlyDecode(parsed.pathname);
  if (/[\\?#&;=]/u.test(inspected) || inspected.includes('%') || containsLikelyPersonalData(inspected)) return '';
  const pathname = parsed.pathname.length > 1 ? parsed.pathname.replace(/\/+$/u, '') : '/';
  return pathname.length <= limit ? pathname : '';
}

function sanitizeSourcePath(value: AnalyticsPayload[string]) {
  const pathname = sanitizePathShape(value);
  return pathname ? normalizePrivacySafeCorporateSourcePath(pathname) : '';
}

function sanitizeTargetPath(value: AnalyticsPayload[string], hostname = '') {
  const pathname = sanitizePathShape(value);
  if (!pathname) return '';
  const normalizedHost = hostname.toLowerCase();
  if (normalizedHost === 'app.aquaverify.com') return APP_ANALYTICS_TARGET_PATHS.has(pathname) ? pathname : '';
  if (!normalizedHost && APP_ANALYTICS_TARGET_PATHS.has(pathname)) return pathname;
  if (normalizedHost && !['aquaverify.com', 'www.aquaverify.com'].includes(normalizedHost)) return '';
  const sourcePath = normalizePrivacySafeCorporateSourcePath(pathname);
  if (sourcePath) return sourcePath;
  const datasheetMatch = pathname.match(/^\/datasheets\/products\/([a-z0-9][a-z0-9-]{0,179})-(en|es|fr|it|ca)\.html$/u);
  return datasheetMatch && CORPORATE_DATASHEET_PAGE_IDS.has(datasheetMatch[1]) ? pathname : '';
}

function sanitizeTargetUrl(value: AnalyticsPayload[string]) {
  const raw = strictScalar(value, 2048);
  if (!raw || raw.includes('\\')) return '';

  let parsed: URL;
  try {
    parsed = new URL(raw, 'https://aquaverify.com');
  } catch {
    return '';
  }
  if (
    parsed.protocol !== 'https:'
    || parsed.username
    || parsed.password
    || parsed.port
    || !SAFE_TARGET_HOSTS.has(parsed.hostname.toLowerCase())
  ) return '';
  const hostname = parsed.hostname.toLowerCase();
  const pathname = sanitizeTargetPath(parsed.pathname, raw.startsWith('/') ? '' : hostname);
  if (!pathname) return '';
  return raw.startsWith('/') ? pathname : `https://${hostname}${pathname}`;
}

function sanitizeSourceUrl(value: AnalyticsPayload[string]) {
  const raw = strictScalar(value, 2048);
  if (!raw || raw.includes('\\')) return '';
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return '';
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) return '';
  if (!SAFE_SOURCE_ORIGINS.has(parsed.origin) || parsed.search || parsed.hash) return '';
  const pathname = sanitizeSourcePath(parsed.pathname);
  return pathname ? `${parsed.origin}${pathname}` : '';
}

function sanitizeReferrer(value: AnalyticsPayload[string]) {
  const raw = strictScalar(value, 2048);
  if (!raw || raw.includes('\\')) return '';
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return '';
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) return '';
  if (parsed.pathname !== '/' || parsed.search || parsed.hash || parsed.hostname === 'localhost') return '';
  if (!parsed.hostname.includes('.') || !/^[a-z0-9.-]+$/i.test(parsed.hostname)) return '';
  return `https://${parsed.hostname.toLowerCase()}`;
}

function sanitizeCount(value: AnalyticsPayload[string]) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  const raw = String(value).trim();
  if (!/^\d{1,5}$/.test(raw)) return '';
  const count = Number.parseInt(raw, 10);
  return Number.isSafeInteger(count) && count >= 0 && count <= 10000 ? count : '';
}

function sanitizeEventField(field: string, value: AnalyticsPayload[string]) {
  if (field === 'lang' || field === 'from_lang' || field === 'to_lang') return sanitizeLanguage(value);
  if (field === 'path') return sanitizeSourcePath(value);
  if (field === 'target_path') return sanitizeTargetPath(value);
  if (field === 'target_url') return sanitizeTargetUrl(value);
  if (field === 'partners') return sanitizeCount(value);
  if (ALLOWED_DIMENSION_VALUES[field]) return sanitizeRegisteredDimension(value, field);
  if (field === 'partner' || field === 'distributor') return sanitizePartnerIdentifier(value, field);
  if (CLICK_ID_FIELDS.has(field)) return sanitizeClickIdentifier(value, field);
  return sanitizeToken(value, field);
}

export function sanitizeCorporateAnalyticsEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof eventName !== 'string' || containsLikelyPersonalData(eventName)) return null;
  const normalizedEventName = eventName.trim().toLowerCase();
  const eventFields = EVENT_FIELDS[normalizedEventName];
  if (!eventFields || !/^[a-z][a-z0-9_]{1,79}$/.test(normalizedEventName)) return null;

  const sanitizedPayload: AnalyticsPayload = {};
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { eventName: normalizedEventName, payload: sanitizedPayload };
  }
  const allowedFields = new Set<string>([...COMMON_EVENT_FIELDS, ...eventFields]);
  allowedFields.forEach((field) => {
    const value = sanitizeEventField(field, payload[field]);
    if (value !== '') sanitizedPayload[field] = value;
  });
  return { eventName: normalizedEventName, payload: sanitizedPayload };
}

function getSafeCurrentAttribution() {
  const safe: AnalyticsPayload = {};
  if (typeof window === 'undefined') return safe;
  const attribution = getPrivacySafeCorporateAttributionParams();
  const sourceUrl = sanitizeSourceUrl(attribution.source_url);
  const referrer = sanitizeReferrer(attribution.referrer);
  const path = sanitizeSourcePath(getPrivacySafePagePath());
  if (sourceUrl) safe.source_url = sourceUrl;
  if (referrer) safe.referrer = referrer;
  if (path) safe.path = path;
  TRACKING_FIELDS.forEach((field) => {
    const value = CLICK_ID_FIELDS.has(field)
      ? sanitizeClickIdentifier(attribution[field], field)
      : sanitizeToken(attribution[field], field);
    if (value) safe[field] = value;
  });
  return safe;
}

function appendPayload(body: URLSearchParams, payload: AnalyticsPayload) {
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') body.set(key, String(value));
  });
}

function pushDataLayerEvent(eventName: string, payload: AnalyticsPayload) {
  if (typeof window === 'undefined') return;
  const win = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({
    event: `aquaverify_${eventName}`,
    ...payload
  });

  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, payload);
  }
}

export function clearVerifiedCorporateAnalyticsConsent() {
  verifiedCorporateConsent = null;
}

export function markCorporateAnalyticsConsentVerified(
  consent: VerifiedCorporateConsent,
  currentPolicyVersion: string
) {
  clearVerifiedCorporateAnalyticsConsent();
  const expectedVersion = typeof currentPolicyVersion === 'string' ? currentPolicyVersion.trim() : '';
  if (!CONSENT_VERSION_PATTERN.test(expectedVersion)) return false;
  let normalized: VerifiedCorporateConsent | null = null;
  try {
    normalized = parseConsent(JSON.stringify(consent));
  } catch {
    normalized = null;
  }
  if (!normalized || normalized.version !== expectedVersion) return false;
  verifiedCorporateConsent = normalized;
  if (!normalized.analytics) pendingCorporatePageView = null;
  return true;
}

export function flushPendingCorporatePageView() {
  if (!verifiedCorporateConsent?.analytics || !pendingCorporatePageView) return false;
  const payload = pendingCorporatePageView;
  pendingCorporatePageView = null;
  return trackCorporateEvent('page_view', payload);
}

export function updateGoogleConsentMode(
  consent: { analytics: boolean; marketing: boolean }
) {
  if (typeof window === 'undefined') return;

  const win = window as typeof window & {
    dataLayer?: Array<unknown>;
    gtag?: (...args: unknown[]) => void;
  };

  win.dataLayer = win.dataLayer || [];
  const consentMatchesVerifiedState = Boolean(
    verifiedCorporateConsent
    && consent.analytics === verifiedCorporateConsent.analytics
    && consent.marketing === verifiedCorporateConsent.marketing
  );
  const analyticsStorage = consentMatchesVerifiedState && consent.analytics === true ? 'granted' : 'denied';
  const marketingStorage = consentMatchesVerifiedState && consent.marketing === true ? 'granted' : 'denied';

  if (typeof win.gtag === 'function') {
    win.gtag('consent', 'update', {
      analytics_storage: analyticsStorage,
      ad_storage: marketingStorage,
      ad_user_data: marketingStorage,
      ad_personalization: marketingStorage
    });
  } else {
    win.dataLayer.push(['consent', 'update', {
      analytics_storage: analyticsStorage,
      ad_storage: marketingStorage,
      ad_user_data: marketingStorage,
      ad_personalization: marketingStorage
    }]);
  }

  win.dataLayer.push({
    event: 'aquaverify_consent_update',
    analytics_storage: analyticsStorage,
    ad_storage: marketingStorage
  });
}

export function hasAnalyticsConsent() {
  return verifiedCorporateConsent?.analytics === true;
}

export function isPlatformUrl(href: string) {
  try {
    return new URL(href).origin === new URL(PLATFORM_BASE_URL).origin;
  } catch {
    return false;
  }
}

export function trackCorporateEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined' || !eventName) return false;
  const currentPath = getPrivacySafePagePath();
  if (!currentPath) {
    if (String(eventName).trim().toLowerCase() === 'page_view') pendingCorporatePageView = null;
    return false;
  }

  const sanitizedEvent = sanitizeCorporateAnalyticsEvent(eventName, payload);
  if (!sanitizedEvent) return false;
  if (!hasAnalyticsConsent()) {
    if (sanitizedEvent.eventName === 'page_view') {
      pendingCorporatePageView = { ...sanitizedEvent.payload, path: currentPath };
    }
    return false;
  }
  const currentAttribution = getSafeCurrentAttribution();
  const deliveryPayload = {
    ...sanitizedEvent.payload,
    ...currentAttribution
  };
  const policyVersion = verifiedCorporateConsent?.version || '';
  const body = new URLSearchParams({
    event_name: sanitizedEvent.eventName,
    analytics: '1',
    marketing: verifiedCorporateConsent?.marketing === true ? '1' : '0',
    version: policyVersion,
    session_id: getAnalyticsSessionId()
  });

  appendPayload(body, deliveryPayload);

  pushDataLayerEvent(sanitizedEvent.eventName, deliveryPayload);

  fetch(getPlatformCorporateAnalyticsUrl(), {
    method: 'POST',
    credentials: 'include',
    keepalive: true,
    body
  }).catch(() => {
    // Analytics must never break navigation or conversion flows.
  });

  window.dispatchEvent(new CustomEvent('aquaverify:corporate-analytics-event', {
    detail: {
      eventName: sanitizedEvent.eventName,
      payload: deliveryPayload
    }
  }));

  return true;
}
