import { Language } from './translations';

type LinkParams = Record<string, string | number | boolean | null | undefined>;

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

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

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

function getCorporateAttributionParams(): LinkParams {
  if (typeof window === 'undefined') return {};

  const params: LinkParams = {
    source_url: window.location.href
  };

  if (document.referrer) {
    params.referrer = document.referrer;
  }

  const currentSearchParams = new URLSearchParams(window.location.search);
  TRACKED_QUERY_PARAMS.forEach((key) => {
    const value = currentSearchParams.get(key);
    if (value) params[key] = value;
  });

  return params;
}

export function buildPlatformUrl(path: string, params: LinkParams = {}) {
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
    ...getCorporateAttributionParams(),
    source: 'corporate',
    lang
  });
}

export function getPlatformSignupUrl(params: LinkParams = {}, lang?: Language) {
  return buildPlatformUrl('/signup', {
    ...getCorporateAttributionParams(),
    source: 'corporate',
    lang,
    ...params
  });
}

export function getPlatformLegalUrl(slug?: 'terms' | 'privacy' | 'cookies' | 'dpa' | 'subprocessors' | 'retention' | 'rights' | 'security', lang?: Language) {
  return buildPlatformUrl(slug ? `/legal/${slug}` : '/legal', {
    source: 'corporate',
    lang
  });
}

export function getPlatformCorporateCookiePreferencesUrl() {
  return buildPlatformUrl('/legal/cookies/corporate-preferences');
}
