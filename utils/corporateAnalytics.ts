import { getPlatformCorporateAnalyticsUrl, PLATFORM_BASE_URL } from './platformLinks';

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

const COOKIE_STORAGE_KEY = 'aquaverify_cookie_consent';
const ANALYTICS_SESSION_KEY = 'aquaverify:analytics_session';
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

function parseConsent(raw: string | null) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return {
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      version: String(parsed.version || '')
    };
  } catch {
    return null;
  }
}

function readCookieValue(name: string) {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return null;
  return decodeURIComponent(cookie.slice(name.length + 1));
}

function readConsent() {
  if (typeof window === 'undefined') return null;

  try {
    return parseConsent(window.localStorage.getItem(COOKIE_STORAGE_KEY))
      || parseConsent(readCookieValue(COOKIE_STORAGE_KEY));
  } catch {
    return parseConsent(readCookieValue(COOKIE_STORAGE_KEY));
  }
}

function getAnalyticsSessionId() {
  if (typeof window === 'undefined') return '';

  try {
    const existing = window.sessionStorage.getItem(ANALYTICS_SESSION_KEY);
    if (existing) return existing;
    const next = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, next);
    return next;
  } catch {
    return '';
  }
}

function sanitizeValue(value: AnalyticsPayload[string]) {
  if (value === null || value === undefined || value === '') return '';
  return String(value).replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/[<>]/g, '').trim().slice(0, 500);
}

function appendCurrentAttribution(body: URLSearchParams) {
  if (typeof window === 'undefined') return;

  body.set('source_url', window.location.href);
  body.set('path', window.location.pathname);
  if (document.referrer) body.set('referrer', document.referrer);

  const currentSearchParams = new URLSearchParams(window.location.search);
  TRACKED_QUERY_PARAMS.forEach((key) => {
    const value = currentSearchParams.get(key);
    if (value) body.set(key, value);
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

export function hasAnalyticsConsent() {
  return Boolean(readConsent()?.analytics);
}

export function isPlatformUrl(href: string) {
  try {
    return new URL(href).origin === new URL(PLATFORM_BASE_URL).origin;
  } catch {
    return false;
  }
}

export function trackCorporateEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined' || !eventName || !hasAnalyticsConsent()) return false;

  const consent = readConsent();
  const normalizedEventName = eventName.toLowerCase().replace(/[^a-z0-9_.:-]+/g, '_').replace(/^_+|_+$/g, '');
  const body = new URLSearchParams({
    event_name: normalizedEventName || 'corporate_event',
    analytics: '1',
    marketing: consent?.marketing ? '1' : '0',
    version: consent?.version || '',
    session_id: getAnalyticsSessionId()
  });

  appendCurrentAttribution(body);

  Object.entries(payload).forEach(([key, value]) => {
    const sanitized = sanitizeValue(value);
    if (sanitized) body.set(key, sanitized);
  });

  pushDataLayerEvent(normalizedEventName, payload);

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
      eventName: normalizedEventName,
      payload
    }
  }));

  return true;
}
