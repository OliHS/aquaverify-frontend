import type { Language } from './translations';
import { MARKETING_ROUTE_PATHS } from './marketingRoutes.js';

type LinkParamValue = string | number | boolean | null | undefined;
type LinkParams = Record<string, LinkParamValue>;

const DEFAULT_PLATFORM_URL = 'https://app.aquaverify.com';
const TRACKED_QUERY_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'gclid',
  'fbclid',
  'msclkid'
] as const;
const CLICK_ID_QUERY_PARAMS = new Set(['gclid', 'fbclid', 'msclkid']);
const SIGNUP_CONTEXT_QUERY_PARAMS = [
  'intent',
  'page',
  'category',
  'profile',
  'module',
  'family',
  'product',
  'products',
  'country',
  'distributor'
] as const;
export type SignupContextParams = Partial<Record<typeof SIGNUP_CONTEXT_QUERY_PARAMS[number], LinkParamValue>>;
const SUPPORTED_LANGUAGES = new Set<Language>(['en', 'es', 'fr', 'it', 'ca']);
const MAX_PRIVACY_NORMALIZATION_PASSES = 32;
const UNRESOLVED_ENCODING_SENTINEL = ' email=unresolved_encoding ';
const GOVERNED_TOKEN_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:+~-]*$/;
const SIGNUP_INTENTS = new Set([
  'demo', 'quote', 'contact', 'signup', 'saas', 'platform', 'oem', 'distributor',
  'find_distributor', 'distributor_lookup', 'oem_program', 'product_recommendation',
  'sector_assessment', 'agriculture_water', 'facility_water_risk', 'food_beverage',
  'hospitality_tourism_water', 'industrial_process_water', 'municipal',
  'pharma_cosmetics_water', 'partner-contact', 'distributor-opportunity',
  'direct-shipping', 'global-quote', 'careers'
]);
export const CORPORATE_MARKETING_SOURCE_PATHS: ReadonlySet<string> = new Set([
  '/', '/en', '/es', '/fr', '/it', '/ca',
  ...Object.values(MARKETING_ROUTE_PATHS).flatMap((translations) => Object.values(translations))
]);
export const CORPORATE_SYSTEM_SOURCE_PATHS: ReadonlySet<string> = new Set([
  '/ca/diagnostic-flux-qualitat-aigua',
  '/es/diagnostico-flujo-calidad-agua',
  '/fr/diagnostic-flux-qualite-eau',
  '/it/valutazione-flusso-qualita-acqua',
  '/water-quality-workflow-assessment',
  '/ca/eines',
  '/ca/eines/calculadora-dilucions',
  '/ca/eines/calculadora-duresa-alcalinitat',
  '/ca/eines/calculadora-molaritat',
  '/ca/eines/calculadora-recuperacio-rpd',
  '/ca/eines/calculadora-ufc-cfu',
  '/ca/eines/conversor-especies-quimiques',
  '/ca/eines/conversor-rpm-rcf',
  '/ca/eines/conversor-unitats-laboratori',
  '/es/herramientas',
  '/es/herramientas/calculadora-diluciones',
  '/es/herramientas/calculadora-dureza-alcalinidad',
  '/es/herramientas/calculadora-molaridad',
  '/es/herramientas/calculadora-recuperacion-rpd',
  '/es/herramientas/calculadora-ufc-cfu',
  '/es/herramientas/conversor-especies-quimicas',
  '/es/herramientas/conversor-rpm-rcf',
  '/es/herramientas/conversor-unidades-laboratorio',
  '/fr/outils',
  '/fr/outils/calculateur-dilution',
  '/fr/outils/calculateur-durete-alcalinite',
  '/fr/outils/calculateur-molarite',
  '/fr/outils/calculateur-recuperation-rpd',
  '/fr/outils/calculateur-ufc-cfu',
  '/fr/outils/convertisseur-especes-chimiques',
  '/fr/outils/convertisseur-rpm-rcf',
  '/fr/outils/convertisseur-unites-laboratoire',
  '/it/strumenti',
  '/it/strumenti/calcolatore-diluizioni',
  '/it/strumenti/calcolatore-durezza-alcalinita',
  '/it/strumenti/calcolatore-molarita',
  '/it/strumenti/calcolatore-recupero-rpd',
  '/it/strumenti/calcolatore-ufc-cfu',
  '/it/strumenti/convertitore-rpm-rcf',
  '/it/strumenti/convertitore-specie-chimiche',
  '/it/strumenti/convertitore-unita-laboratorio',
  '/tools',
  '/tools/cfu-calculator',
  '/tools/chemical-species-converter',
  '/tools/dilution-calculator',
  '/tools/hardness-alkalinity-calculator',
  '/tools/lab-unit-converter',
  '/tools/molarity-calculator',
  '/tools/recovery-rpd-calculator',
  '/tools/rpm-rcf-converter'
]);
export const CORPORATE_SOURCE_PATHS: ReadonlySet<string> = new Set([
  ...CORPORATE_MARKETING_SOURCE_PATHS,
  ...CORPORATE_SYSTEM_SOURCE_PATHS
]);

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

function decodePercentOnce(value: string) {
  return value.replace(/(?:%[0-9a-f]{2})+/gi, (encodedRun) => {
    try {
      return decodeURIComponent(encodedRun);
    } catch {
      return encodedRun.replace(/%([0-9a-f]{2})/gi, (match, hex) => {
        const byte = Number.parseInt(hex, 16);
        return byte >= 0x20 && byte <= 0x7e ? String.fromCharCode(byte) : match;
      });
    }
  });
}

function normalizePrivacyInspectionValue(value: unknown) {
  let normalized = String(value ?? '');
  const namedEntities: Record<string, string> = {
    amp: '&', commat: '@', period: '.', dot: '.', colon: ':', equals: '=', quest: '?',
    sol: '/', bsol: '\\', num: '#', semi: ';', comma: ',', lowbar: '_', plus: '+',
    quot: '"', apos: "'", lsqb: '[', rsqb: ']', lcub: '{', rcub: '}',
    shy: '', zwj: '', zwnj: '', tab: ' ', newline: ' '
  };
  let reachedFixedPoint = false;
  for (let index = 0; index < MAX_PRIVACY_NORMALIZATION_PASSES; index += 1) {
    const next = decodePercentOnce(normalized)
      .replace(/\\u(?:\{([0-9a-f]{1,6})\}|([0-9a-f]{4}))/giu, (match, braced, fixed) => {
        const codePoint = Number.parseInt(braced || fixed, 16);
        if (!Number.isSafeInteger(codePoint) || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
          return match;
        }
        return String.fromCodePoint(codePoint);
      })
      .replace(/&#(?:x([0-9a-f]{1,6})|([0-9]{1,7}));?/giu, (match, hex, decimal) => {
        const codePoint = Number.parseInt(hex || decimal, hex ? 16 : 10);
        if (!Number.isSafeInteger(codePoint) || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
          return match;
        }
        return String.fromCodePoint(codePoint);
      })
      .replace(/&([a-z][a-z0-9]{1,31});/giu, (match, name) => (
        Object.hasOwn(namedEntities, name.toLowerCase()) ? namedEntities[name.toLowerCase()] : 'x'
      ))
      .normalize('NFKC')
      .replace(/[\u3002\uff0e\uff61]/gu, '.')
      .replace(/\p{Cf}/gu, '')
      .replace(/\\(["'])/gu, '$1');
    if (next === normalized) {
      reachedFixedPoint = true;
      break;
    }
    normalized = next;
  }
  const residualEncoding = /%[0-9a-f]{2}|\\u(?:\{|[0-9a-f])|&#(?:x[0-9a-f]|[0-9])|&[a-z][a-z0-9]{1,31};/iu.test(normalized);
  if (!reachedFixedPoint || residualEncoding) normalized += UNRESOLVED_ENCODING_SENTINEL;
  return normalized.trim();
}

const SENSITIVE_PERSONAL_DATA_KEY_TOKENS = new Set([
  'email', 'mail', 'correo', 'courriel',
  'phone', 'telephone', 'tel', 'mobile', 'telefono', 'telefon', 'movil', 'mobil', 'portable', 'cellulare',
  'first_name', 'firstname', 'last_name', 'lastname', 'full_name', 'fullname', 'surname', 'name',
  'nombre', 'nombre_completo', 'nom', 'nom_complet', 'nome', 'nome_completo',
  'apellido', 'apellidos', 'cognom', 'cognoms', 'cognome', 'prenom',
  'company', 'company_name', 'empresa', 'organizacion', 'organisation', 'entreprise', 'societe',
  'azienda', 'impresa', 'organitzacio',
  'address', 'street_address', 'postal_address', 'direccion', 'adresse', 'indirizzo', 'adreca',
  'date_of_birth', 'birthdate', 'dob', 'dni', 'nie', 'nif', 'passport', 'tax_id',
  'contact_name', 'email_address', 'phone_number', 'correo_electronico'
]);

function normalizePotentialPersonalDataKey(value: unknown) {
  return normalizePrivacyInspectionValue(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase();
}

export function containsSensitivePersonalDataKey(value: unknown) {
  const normalized = normalizePotentialPersonalDataKey(value);
  if (!normalized) return false;

  const tokens = normalized.split(/[^a-z0-9]+/).filter(Boolean);
  if (tokens.some((token) => SENSITIVE_PERSONAL_DATA_KEY_TOKENS.has(token))) return true;

  const compact = normalized.replace(/[^a-z0-9]+/g, '');
  return Array.from(SENSITIVE_PERSONAL_DATA_KEY_TOKENS).some((token) => (
    token.includes('_') && compact === token.replace(/_/g, '')
  ));
}

function containsSensitivePersonalDataAssignment(value: string) {
  const normalized = normalizePrivacyInspectionValue(value)
    .replace(/\[\s*["']([^"']{1,120})["']\s*\]/gu, '[$1]');
  const assignmentPattern = /(?:^|[^\p{L}\p{N}_\]])(["']?)([^\s?&#;/,{}:="']{1,120})\1\s*(?:=|:)/gu;
  let match = assignmentPattern.exec(normalized);
  while (match) {
    if (containsSensitivePersonalDataKey(match[2])) return true;
    match = assignmentPattern.exec(normalized);
  }
  return false;
}

export function containsLikelyPersonalData(value: unknown) {
  const decoded = normalizePrivacyInspectionValue(value);
  if (!decoded) return false;
  if (/(?:^|[^\p{L}\p{N}._%+-])[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}\p{N}-]{2,}(?:$|[^\p{L}\p{N}.-])/iu.test(` ${decoded} `)) return true;
  if (containsSensitivePersonalDataAssignment(decoded)) return true;
  if (/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(decoded)) return false;
  const digitCount = (decoded.match(/\p{Nd}/gu) || []).length;
  if (/^(?:tel\s*:)?\s*(?:\+|00)/i.test(decoded)) {
    return digitCount >= 9 && digitCount <= 15;
  }
  if (/(?<!\p{Nd})\p{Nd}{9,15}(?!\p{Nd})/u.test(decoded)) return true;
  const phoneLike = decoded.match(/\p{Nd}(?:[^\p{L}\p{N}]*\p{Nd})+/gu) || [];
  return phoneLike.some((candidate) => {
    const count = (candidate.match(/\p{Nd}/gu) || []).length;
    if (count >= 9 && count <= 15) return true;
    if (count <= 15) return false;
    return candidate.split(/[^\p{L}\p{N}]+/u).some((part) => {
      const partDigits = (part.match(/\p{Nd}/gu) || []).length;
      return partDigits >= 9 && partDigits <= 15;
    });
  });
}

function cleanAttributionValue(value: unknown, maxLength = 500) {
  const raw = String(value ?? '');
  if (raw.length > maxLength) return '';
  const cleaned = raw
    .replace(/[\u0000-\u001F\u007F<>]+/g, ' ')
    .trim();
  return cleaned && !containsLikelyPersonalData(cleaned) ? cleaned : '';
}

function cleanGovernedToken(value: unknown, maxLength: number, allowList?: Set<string>) {
  const cleaned = cleanAttributionValue(value, maxLength);
  if (!cleaned || !GOVERNED_TOKEN_PATTERN.test(cleaned)) return '';
  const normalized = cleaned.toLowerCase();
  return !allowList || allowList.has(normalized) ? normalized : '';
}

function cleanClickIdentifier(value: unknown, field: string) {
  const cleaned = cleanAttributionValue(value, 220);
  if (!cleaned) return '';
  const valid = field === 'msclkid'
    ? /^[a-f0-9]{32}$/i.test(cleaned)
    : /^(?=.{24,220}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z0-9._~-]+$/.test(cleaned);
  return valid ? cleaned : '';
}

export function normalizePrivacySafeCorporateSourcePath(value: unknown) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw || raw.length > 2_048 || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '';
  let parsed: URL;
  try {
    parsed = new URL(raw, 'https://aquaverify.com');
  } catch {
    return '';
  }
  if (parsed.origin !== 'https://aquaverify.com' || parsed.search || parsed.hash || parsed.pathname.includes('%')) return '';
  const pathname = parsed.pathname.length > 1 ? parsed.pathname.replace(/\/+$/u, '') : '/';
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return '';
  return CORPORATE_SOURCE_PATHS.has(pathname) ? pathname : '';
}

export function getPrivacySafePagePath() {
  if (typeof window === 'undefined') return '';
  return normalizePrivacySafeCorporateSourcePath(window.location.pathname);
}

export function getPrivacySafeCorporateAttributionParams(): LinkParams {
  if (typeof window === 'undefined') return {};

  const params: LinkParams = {};
  const sourcePath = getPrivacySafePagePath();
  if (sourcePath && ['https://aquaverify.com', 'https://www.aquaverify.com'].includes(window.location.origin)) {
    params.source_url = `${window.location.origin}${sourcePath}`;
  }

  if (typeof document !== 'undefined' && document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (['http:', 'https:'].includes(referrer.protocol) && !containsLikelyPersonalData(referrer.hostname)) {
        params.referrer = referrer.origin;
      }
    } catch {
      // Malformed or non-web referrers are intentionally omitted.
    }
  }

  const currentSearchParams = new URLSearchParams(window.location.search);
  TRACKED_QUERY_PARAMS.forEach((key) => {
    const value = CLICK_ID_QUERY_PARAMS.has(key)
      ? cleanClickIdentifier(currentSearchParams.get(key), key)
      : cleanGovernedToken(currentSearchParams.get(key), 500);
    if (value) params[key] = value;
  });

  return params;
}

function getPrivacySafeSignupContextParams(params: LinkParams): LinkParams {
  const result: LinkParams = {};
  SIGNUP_CONTEXT_QUERY_PARAMS.forEach((key) => {
    const raw = cleanAttributionValue(params[key], key === 'products' ? 220 : 160);
    let value = '';
    if (key === 'intent') {
      value = cleanGovernedToken(raw, 80, SIGNUP_INTENTS);
    } else if (key === 'products') {
      const tokens = raw.split(',');
      if (tokens.length > 0 && tokens.length <= 20 && tokens.every((token) => GOVERNED_TOKEN_PATTERN.test(token))) {
        value = tokens.join(',').toLowerCase();
      }
    } else {
      value = cleanGovernedToken(raw, 160);
    }
    if (value) result[key] = value;
  });
  return result;
}

export const PLATFORM_BASE_URL = trimTrailingSlash(
  String(import.meta.env.VITE_PLATFORM_URL || DEFAULT_PLATFORM_URL)
);

function uniqueLinks(values: string[]) {
  return Array.from(new Set(values));
}

export const LEGACY_PLATFORM_LOGIN_URLS = uniqueLinks([
  '/login',
  `${DEFAULT_PLATFORM_URL}/login`,
  `${PLATFORM_BASE_URL}/login`
]);

export const LEGACY_PLATFORM_SIGNUP_URLS = uniqueLinks([
  '/signup',
  '/demo',
  '#contact',
  `${DEFAULT_PLATFORM_URL}/signup`,
  `${PLATFORM_BASE_URL}/signup`
]);

function buildPlatformUrl(path: string, params: LinkParams = {}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${PLATFORM_BASE_URL}${normalizedPath}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

export function getPlatformLoginUrl(lang?: Language) {
  return buildPlatformUrl('/login', {
    ...getPrivacySafeCorporateAttributionParams(),
    source: 'corporate',
    lang: lang && SUPPORTED_LANGUAGES.has(lang) ? lang : undefined
  });
}

export function getPlatformSignupUrl(params: SignupContextParams = {}, lang?: Language) {
  return buildPlatformUrl('/signup', {
    ...getPrivacySafeSignupContextParams(params),
    ...getPrivacySafeCorporateAttributionParams(),
    source: 'corporate',
    lang: lang && SUPPORTED_LANGUAGES.has(lang) ? lang : undefined
  });
}

export function getPlatformLegalUrl(slug?: 'terms' | 'privacy' | 'cookies' | 'dpa' | 'subprocessors' | 'retention' | 'rights' | 'security', lang?: Language) {
  return buildPlatformUrl(slug ? `/legal/${slug}` : '/legal', {
    source: 'corporate',
    lang: lang && SUPPORTED_LANGUAGES.has(lang) ? lang : undefined
  });
}

export function getPlatformCorporateCookiePreferencesUrl() {
  return buildPlatformUrl('/legal/cookies/corporate-preferences');
}

export function getPlatformCorporateCookiePolicyUrl() {
  return buildPlatformUrl('/legal/cookies/corporate-policy');
}

export function getPlatformCorporateAnalyticsUrl() {
  return buildPlatformUrl('/legal/cookies/corporate-events');
}
