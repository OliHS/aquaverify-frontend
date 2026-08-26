import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { PLATFORM_BASE_URL } from './platformLinks';
import type { Language } from './translations';

const MARKETING_LEAD_ENDPOINT = `${PLATFORM_BASE_URL}/api/public/v1/marketing/leads`;
const ATTRIBUTION_SESSION_KEY = 'aquaverify:marketing_attribution';
const REFERRER_SESSION_KEY = 'aquaverify:marketing_referrer_host';
const REQUEST_TIMEOUT_MS = 15_000;
const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id'
] as const;

type UtmKey = typeof UTM_KEYS[number];
type UtmValues = Record<UtmKey, string>;
type LeadDetailValue = string | number | boolean | null;

export type MarketingLeadCaptureStatus = 'idle' | 'sending' | 'error' | 'success';

export type MarketingLeadCaptureResponse = {
  ok: boolean;
  duplicate?: boolean;
  requestId?: string;
  leadId?: number | string;
  handoffToken: string;
  signupUrl: string;
};

export type MarketingLeadCapturePayload = {
  formKey: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  countryCode: string;
  buyerRole: string;
  requestType: string;
  comment: string;
  contactConsent: true;
  marketingConsent: false;
  lang: Language;
  sourcePath: string;
  referrerHost: string;
  utm: UtmValues;
  details: Record<string, LeadDetailValue>;
  website: string;
  elapsedMs: number;
};

export type MarketingLeadCaptureConfig = {
  formKey: string;
  requestType: string;
  lang: Language;
  sourcePath?: string;
  detailFields?: readonly string[];
  details?: Record<string, LeadDetailValue>;
  buyerRoleFields?: readonly string[];
  onAccepted?: (result: MarketingLeadCaptureResponse, payload: MarketingLeadCapturePayload) => void;
};

export type MarketingLeadFormCopy = {
  contactConsent: string;
  privacyPolicy: string;
  sending: string;
  success: string;
  error: string;
};

const FORM_COPY: Record<Language, MarketingLeadFormCopy> = {
  en: {
    contactConsent: 'I agree that AquaVerify may use my details to respond to this request. I have read the',
    privacyPolicy: 'Privacy Policy',
    sending: 'Sending securely…',
    success: 'Request received. Redirecting securely…',
    error: 'We could not send your request. Check your connection and try again.'
  },
  es: {
    contactConsent: 'Acepto que AquaVerify use mis datos para responder a esta solicitud. He leído la',
    privacyPolicy: 'Política de privacidad',
    sending: 'Enviando de forma segura…',
    success: 'Solicitud recibida. Redirigiendo de forma segura…',
    error: 'No hemos podido enviar tu solicitud. Revisa la conexión e inténtalo de nuevo.'
  },
  fr: {
    contactConsent: 'J’accepte qu’AquaVerify utilise mes données pour répondre à cette demande. J’ai lu la',
    privacyPolicy: 'Politique de confidentialité',
    sending: 'Envoi sécurisé…',
    success: 'Demande reçue. Redirection sécurisée…',
    error: 'Votre demande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez.'
  },
  it: {
    contactConsent: 'Accetto che AquaVerify utilizzi i miei dati per rispondere a questa richiesta. Ho letto la',
    privacyPolicy: 'Informativa sulla privacy',
    sending: 'Invio sicuro…',
    success: 'Richiesta ricevuta. Reindirizzamento sicuro…',
    error: 'Non è stato possibile inviare la richiesta. Controlla la connessione e riprova.'
  },
  ca: {
    contactConsent: 'Accepto que AquaVerify utilitzi les meves dades per respondre aquesta sol·licitud. He llegit la',
    privacyPolicy: 'Política de privacitat',
    sending: 'Enviant de manera segura…',
    success: 'Sol·licitud rebuda. Redirigint de manera segura…',
    error: 'No hem pogut enviar la sol·licitud. Revisa la connexió i torna-ho a provar.'
  }
};

const emptyUtm = (): UtmValues => ({
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  utm_id: ''
});

const clean = (value: FormDataEntryValue | LeadDetailValue | undefined, maxLength = 2_000) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean' || typeof value === 'number') return value;
  if (typeof File !== 'undefined' && value instanceof File) return '';
  return String(value)
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .trim()
    .slice(0, maxLength);
};

const stringField = (form: FormData, key: string, maxLength = 2_000) => {
  const value = clean(form.get(key), maxLength);
  return typeof value === 'string' ? value : String(value);
};

function readCurrentUtm(): UtmValues {
  const values = emptyUtm();
  if (typeof window === 'undefined') return values;

  let stored: Partial<UtmValues> = {};
  try {
    stored = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_SESSION_KEY) || '{}') as Partial<UtmValues>;
  } catch {
    stored = {};
  }

  const query = new URLSearchParams(window.location.search);
  const currentValues = emptyUtm();
  UTM_KEYS.forEach((key) => {
    const current = clean(query.get(key), 500);
    currentValues[key] = typeof current === 'string' ? current : '';
  });
  const hasCurrentAttribution = UTM_KEYS.some((key) => Boolean(currentValues[key]));

  if (hasCurrentAttribution) {
    try {
      window.sessionStorage.setItem(ATTRIBUTION_SESSION_KEY, JSON.stringify(currentValues));
    } catch {
      // Storage can be disabled; submission must still work with current URL values.
    }
    return currentValues;
  }

  UTM_KEYS.forEach((key) => {
    const fallback = clean(stored[key], 500);
    values[key] = typeof fallback === 'string' ? fallback : '';
  });
  return values;
}

function getReferrerHost() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return '';
  let current = '';
  try {
    current = document.referrer ? new URL(document.referrer).hostname.slice(0, 255) : '';
  } catch {
    current = '';
  }

  try {
    const stored = clean(window.sessionStorage.getItem(REFERRER_SESSION_KEY), 255);
    const isExternal = Boolean(current && current !== window.location.hostname);
    if (isExternal) {
      window.sessionStorage.setItem(REFERRER_SESSION_KEY, current);
      return current;
    }
    return typeof stored === 'string' ? stored : '';
  } catch {
    return current;
  }
}

function createIdempotencyKey(formKey: string) {
  const randomPart = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${formKey}:${randomPart}`.slice(0, 200);
}

function buildPayload(
  formElement: HTMLFormElement,
  config: MarketingLeadCaptureConfig,
  startedAt: number
): MarketingLeadCapturePayload {
  const form = new FormData(formElement);
  const contactConsent = form.get('contact_consent') === 'on';
  if (!contactConsent) throw new Error('CONTACT_CONSENT_REQUIRED');

  const dynamicDetails: Record<string, LeadDetailValue> = {};
  (config.detailFields || []).forEach((key) => {
    const value = stringField(form, key);
    if (value) dynamicDetails[key] = value;
  });

  const buyerRole = ['buyer_role', 'role', ...(config.buyerRoleFields || [])]
    .map((key) => stringField(form, key, 255))
    .find(Boolean) || '';
  const country = stringField(form, 'country_code', 100) || stringField(form, 'country', 100);
  const countryCode = /^[A-Za-z]{2}$/.test(country) ? country.toUpperCase() : '';

  return {
    formKey: clean(config.formKey, 100) as string,
    name: stringField(form, 'name', 255),
    email: stringField(form, 'email', 320),
    company: stringField(form, 'company', 255),
    phone: stringField(form, 'phone', 50),
    countryCode,
    buyerRole,
    requestType: clean(config.requestType, 100) as string,
    comment: stringField(form, 'main_need', 5_000) || stringField(form, 'comment', 5_000),
    contactConsent: true,
    marketingConsent: false,
    lang: config.lang,
    sourcePath: clean(
      typeof window !== 'undefined' ? window.location.pathname : config.sourcePath || '',
      500
    ) as string,
    referrerHost: getReferrerHost(),
    utm: readCurrentUtm(),
    details: {
      ...(config.details || {}),
      ...(country ? { country } : {}),
      ...dynamicDetails
    },
    website: stringField(form, 'website', 500),
    elapsedMs: Math.max(0, Math.min(Date.now() - startedAt, 86_400_000))
  };
}

function safeSignupUrl(result: MarketingLeadCaptureResponse, lang: Language) {
  const token = clean(result.handoffToken, 2_048);
  if (typeof token !== 'string' || token.length < 8) throw new Error('INVALID_HANDOFF_TOKEN');

  const platformOrigin = new URL(PLATFORM_BASE_URL).origin;
  let target: URL;
  try {
    target = new URL(result.signupUrl || '/signup', PLATFORM_BASE_URL);
  } catch {
    target = new URL('/signup', PLATFORM_BASE_URL);
  }

  if (target.origin !== platformOrigin || target.pathname !== '/signup') {
    target = new URL('/signup', PLATFORM_BASE_URL);
  }

  // Never trust query data returned by the server: the hand-off transports only
  // the opaque token and UI language, never contact fields or other PII.
  target.search = '';
  target.hash = '';
  target.searchParams.set('lead_token', token);
  target.searchParams.set('lang', lang);
  return target.toString();
}

async function postMarketingLead(payload: MarketingLeadCapturePayload, idempotencyKey: string) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(MARKETING_LEAD_ENDPOINT, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) throw new Error(`LEAD_CAPTURE_HTTP_${response.status}`);
    const result = await response.json() as MarketingLeadCaptureResponse;
    if (!result?.ok || !result.handoffToken) throw new Error('INVALID_LEAD_CAPTURE_RESPONSE');
    return result;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getMarketingLeadFormCopy(lang: Language) {
  return FORM_COPY[lang] || FORM_COPY.en;
}

export function useMarketingLeadCapture(config: MarketingLeadCaptureConfig) {
  const [status, setStatus] = useState<MarketingLeadCaptureStatus>('idle');
  const startedAt = useRef(Date.now());
  const idempotencyKey = useRef('');
  const idempotencyPayload = useRef('');
  const submitting = useRef(false);
  const configRef = useRef(config);
  configRef.current = config;

  useEffect(() => {
    readCurrentUtm();
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (submitting.current || !formElement.reportValidity()) return;

    submitting.current = true;
    setStatus('sending');
    try {
      const currentConfig = configRef.current;
      const payload = buildPayload(formElement, currentConfig, startedAt.current);
      // elapsedMs is anti-bot telemetry and naturally changes between retries;
      // excluding it from the fingerprint preserves the same transport key.
      const serializedPayload = JSON.stringify({ ...payload, elapsedMs: 0 });
      // A transport retry reuses the key; an edited form receives a new key so
      // the API can correctly reject only true conflicting replays.
      if (!idempotencyKey.current || idempotencyPayload.current !== serializedPayload) {
        idempotencyKey.current = createIdempotencyKey(currentConfig.formKey);
        idempotencyPayload.current = serializedPayload;
      }
      const result = await postMarketingLead(payload, idempotencyKey.current);
      const handoffUrl = safeSignupUrl(result, currentConfig.lang);
      setStatus('success');
      try {
        currentConfig.onAccepted?.(result, payload);
      } catch {
        // Optional analytics callbacks must never block a successful hand-off.
      }
      window.location.assign(handoffUrl);
    } catch {
      submitting.current = false;
      setStatus('error');
    }
  }, []);

  return {
    status,
    handleSubmit,
    copy: getMarketingLeadFormCopy(config.lang)
  };
}
