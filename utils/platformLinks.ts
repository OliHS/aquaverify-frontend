import { Language } from './translations';

type LinkParams = Record<string, string | number | boolean | null | undefined>;

const DEFAULT_PLATFORM_URL = 'https://app.aquaverify.com';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const PLATFORM_BASE_URL = trimTrailingSlash(
  String(import.meta.env.VITE_PLATFORM_URL || DEFAULT_PLATFORM_URL)
);

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
    source: 'corporate',
    lang
  });
}

export function getPlatformSignupUrl(params: LinkParams = {}, lang?: Language) {
  return buildPlatformUrl('/signup', {
    source: 'corporate',
    lang,
    ...params
  });
}

export function getPlatformLegalUrl(slug?: 'privacy' | 'cookies' | 'dpa' | 'subprocessors' | 'retention' | 'rights' | 'security', lang?: Language) {
  return buildPlatformUrl(slug ? `/legal/${slug}` : '/legal', {
    source: 'corporate',
    lang
  });
}
