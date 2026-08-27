import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getPlatformCorporateCookiePolicyUrl,
  getPlatformCorporateCookiePreferencesUrl,
  getPlatformLegalUrl
} from '../utils/platformLinks';
import {
  clearMarketingAttributionStorage,
  refreshPrivacySafeMarketingAttribution
} from '../utils/marketingLeadCapture';
import {
  clearVerifiedCorporateAnalyticsConsent,
  flushPendingCorporatePageView,
  markCorporateAnalyticsConsentVerified,
  trackCorporateEvent,
  updateGoogleConsentMode
} from '../utils/corporateAnalytics';

interface CookieConsentState {
  status: 'accepted' | 'custom';
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: string;
  updatedAt: string;
}

const COOKIE_NAME = 'aquaverify_cookie_consent';
const COOKIE_STORAGE_KEY = COOKIE_NAME;
const DEFAULT_COOKIE_MAX_AGE_DAYS = 180;
const CONSENT_CLOCK_SKEW_MS = 5 * 60 * 1000;
const CONSENT_SAVE_ATTEMPTS = 2;
export const OPEN_COOKIE_PREFERENCES_EVENT = 'aquaverify:open-cookie-preferences';

interface CookiePolicyState {
  version: string;
  maxAgeDays: number;
}

const COOKIE_POLICY_VERSION_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,39}$/;

const LABELS = {
  en: {
    manage: 'Manage cookies',
    badge: 'Cookies',
    title: 'Cookie preferences',
    copy: 'We use essential cookies for the site to work and optional cookies to improve the AquaVerify experience.',
    acceptAll: 'Accept all',
    rejectOptional: 'Reject optional',
    customize: 'Customize',
    save: 'Save preferences',
    close: 'Close',
    necessaryTitle: 'Essential cookies',
    necessaryCopy: 'Required for security, language and basic site behavior.',
    analyticsTitle: 'Analytics',
    analyticsCopy: 'Helps us understand visits and improve the corporate site.',
    marketingTitle: 'Marketing',
    marketingCopy: 'Helps remember preferences for campaigns and product content.',
    alwaysOn: 'Always active',
    policy: 'Cookie policy',
    error: 'We could not verify or save your cookie preferences. Please try again.'
  },
  es: {
    manage: 'Gestionar cookies',
    badge: 'Cookies',
    title: 'Preferencias de cookies',
    copy: 'Usamos cookies esenciales para que el sitio funcione y cookies opcionales para mejorar la experiencia de AquaVerify.',
    acceptAll: 'Aceptar todas',
    rejectOptional: 'Rechazar opcionales',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    close: 'Cerrar',
    necessaryTitle: 'Cookies esenciales',
    necessaryCopy: 'Necesarias para seguridad, idioma y funcionamiento básico del sitio.',
    analyticsTitle: 'Analítica',
    analyticsCopy: 'Nos ayuda a entender visitas y mejorar la web corporativa.',
    marketingTitle: 'Marketing',
    marketingCopy: 'Permite recordar preferencias para campañas y contenido de producto.',
    alwaysOn: 'Siempre activas',
    policy: 'Política de cookies',
    error: 'No hemos podido verificar o guardar tus preferencias. Inténtalo de nuevo.'
  },
  fr: {
    manage: 'Gérer les cookies',
    badge: 'Cookies',
    title: 'Préférences de cookies',
    copy: 'Nous utilisons des cookies essentiels au fonctionnement du site et des cookies optionnels pour améliorer l expérience AquaVerify.',
    acceptAll: 'Tout accepter',
    rejectOptional: 'Refuser les optionnels',
    customize: 'Personnaliser',
    save: 'Enregistrer',
    close: 'Fermer',
    necessaryTitle: 'Cookies essentiels',
    necessaryCopy: 'Nécessaires pour la sécurité, la langue et le fonctionnement du site.',
    analyticsTitle: 'Analytique',
    analyticsCopy: 'Nous aide à comprendre les visites et à améliorer le site.',
    marketingTitle: 'Marketing',
    marketingCopy: 'Aide à mémoriser les préférences pour les campagnes et contenus produit.',
    alwaysOn: 'Toujours actifs',
    policy: 'Politique de cookies',
    error: 'Impossible de vérifier ou enregistrer vos préférences. Réessayez.'
  },
  it: {
    manage: 'Gestisci cookie',
    badge: 'Cookie',
    title: 'Preferenze cookie',
    copy: 'Usiamo cookie essenziali per il funzionamento del sito e cookie opzionali per migliorare l esperienza AquaVerify.',
    acceptAll: 'Accetta tutto',
    rejectOptional: 'Rifiuta opzionali',
    customize: 'Personalizza',
    save: 'Salva preferenze',
    close: 'Chiudi',
    necessaryTitle: 'Cookie tecnici',
    necessaryCopy: 'Necessari per sicurezza, lingua e funzionamento del sito.',
    analyticsTitle: 'Analitica',
    analyticsCopy: 'Ci aiuta a capire le visite e migliorare il sito corporate.',
    marketingTitle: 'Marketing',
    marketingCopy: 'Aiuta a ricordare preferenze per campagne e contenuti prodotto.',
    alwaysOn: 'Sempre attivi',
    policy: 'Politica cookie',
    error: 'Non e stato possibile verificare o salvare le preferenze. Riprova.'
  },
  ca: {
    manage: 'Gestionar cookies',
    badge: 'Cookies',
    title: 'Preferències de cookies',
    copy: 'Fem servir cookies essencials perquè el lloc funcioni i cookies opcionals per millorar l experiència AquaVerify.',
    acceptAll: 'Acceptar-ho tot',
    rejectOptional: 'Rebutjar opcionals',
    customize: 'Personalitzar',
    save: 'Guardar preferències',
    close: 'Tancar',
    necessaryTitle: 'Cookies essencials',
    necessaryCopy: 'Necessàries per a seguretat, idioma i funcionament bàsic del lloc.',
    analyticsTitle: 'Analítica',
    analyticsCopy: 'Ens ajuda a entendre visites i millorar la web corporativa.',
    marketingTitle: 'Màrqueting',
    marketingCopy: 'Permet recordar preferències per a campanyes i contingut de producte.',
    alwaysOn: 'Sempre actives',
    policy: 'Política de cookies',
    error: 'No hem pogut verificar o guardar les preferencies. Torna-ho a provar.'
  }
};

function readCookieValue(name: string) {
  try {
    const cookie = document.cookie
      .split('; ')
      .find((entry) => entry.startsWith(`${name}=`));
    if (!cookie) return null;
    return decodeURIComponent(cookie.slice(name.length + 1));
  } catch {
    return null;
  }
}

function getCookieMaxAgeSeconds(maxAgeDays = DEFAULT_COOKIE_MAX_AGE_DAYS) {
  const normalizedDays = Number.isFinite(maxAgeDays) && maxAgeDays >= 30 && maxAgeDays <= 730
    ? maxAgeDays
    : DEFAULT_COOKIE_MAX_AGE_DAYS;
  return normalizedDays * 24 * 60 * 60;
}

function readStoredConsent() {
  let localValue: string | null = null;
  try {
    localValue = window.localStorage.getItem(COOKIE_STORAGE_KEY);
  } catch {
    localValue = null;
  }
  return localValue || readCookieValue(COOKIE_NAME);
}

export function normalizeConsent(
  raw: string | null,
  policy?: CookiePolicyState,
  nowMs = Date.now()
): CookieConsentState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const status = parsed?.status;
    const version = typeof parsed?.version === 'string' ? parsed.version.trim() : '';
    const updatedAtMs = Date.parse(typeof parsed?.updatedAt === 'string' ? parsed.updatedAt : '');
    const validPolicy = !policy || (
      COOKIE_POLICY_VERSION_PATTERN.test(policy.version)
      && Number.isInteger(policy.maxAgeDays)
      && policy.maxAgeDays >= 30
      && policy.maxAgeDays <= 730
    );
    const maximumAgeMs = policy ? policy.maxAgeDays * 24 * 60 * 60 * 1000 : Number.POSITIVE_INFINITY;
    if (
      !parsed
      || typeof parsed !== 'object'
      || Array.isArray(parsed)
      || !['accepted', 'custom'].includes(status)
      || parsed.necessary !== true
      || typeof parsed.analytics !== 'boolean'
      || typeof parsed.marketing !== 'boolean'
      || !COOKIE_POLICY_VERSION_PATTERN.test(version)
      || !Number.isFinite(updatedAtMs)
      || updatedAtMs > nowMs + CONSENT_CLOCK_SKEW_MS
      || nowMs - updatedAtMs > maximumAgeMs
      || !validPolicy
      || (policy && version !== policy.version)
      || (status === 'accepted' && (parsed.analytics !== true || parsed.marketing !== true))
    ) return null;

    return {
      status,
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version,
      updatedAt: new Date(updatedAtMs).toISOString()
    };
  } catch {
    return null;
  }
}

function clearStoredConsent() {
  try {
    window.localStorage.removeItem(COOKIE_STORAGE_KEY);
  } catch {
    // Restricted storage must not prevent the banner from recovering.
  }
  try {
    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secureFlag}`;
  } catch {
    // Cookie access can also be disabled independently of localStorage.
  }
}

function persistConsent(consent: CookieConsentState, maxAgeDays = DEFAULT_COOKIE_MAX_AGE_DAYS) {
  const serialized = JSON.stringify(consent);
  try {
    window.localStorage.setItem(COOKIE_STORAGE_KEY, serialized);
  } catch {
    // Server persistence remains authoritative for the active page session.
  }
  try {
    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=${getCookieMaxAgeSeconds(maxAgeDays)}; Path=/; SameSite=Lax${secureFlag}`;
  } catch {
    // The UI still completes after the authoritative platform write succeeds.
  }
}

export async function fetchPlatformCookiePolicy(): Promise<CookiePolicyState | null> {
  try {
    const response = await fetch(getPlatformCorporateCookiePolicyUrl(), {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Policy endpoint unavailable');
    const data = await response.json();
    const version = typeof data?.cookiePolicyVersion === 'string' ? data.cookiePolicyVersion.trim() : '';
    const maxAgeDays = Number(data?.cookieConsentMaxAgeDays);
    if (
      data?.ok !== true
      || !COOKIE_POLICY_VERSION_PATTERN.test(version)
      || !Number.isInteger(maxAgeDays)
      || maxAgeDays < 30
      || maxAgeDays > 730
    ) throw new Error('Policy endpoint returned invalid data');
    return {
      version,
      maxAgeDays
    };
  } catch {
    return null;
  }
}

export async function fetchPersistedConsentFromPlatform(policy: CookiePolicyState) {
  try {
    const response = await fetch(getPlatformCorporateCookiePreferencesUrl(), {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data?.ok !== true || data?.currentPolicyVersion !== policy.version || !data?.consent) return null;
    return normalizeConsent(JSON.stringify(data.consent), policy);
  } catch {
    return null;
  }
}

export async function resolveAuthoritativeConsent(
  policy: CookiePolicyState,
  rawStoredConsent: string | null
) {
  const browserMirror = normalizeConsent(rawStoredConsent, policy);
  const consent = await fetchPersistedConsentFromPlatform(policy);
  const browserMirrorMatches = Boolean(
    browserMirror
    && consent
    && browserMirror.status === consent.status
    && browserMirror.analytics === consent.analytics
    && browserMirror.marketing === consent.marketing
    && browserMirror.version === consent.version
  );
  return { consent, browserMirror, browserMirrorMatches };
}

export async function syncConsentWithPlatform(consent: CookieConsentState, lang: string, policy: CookiePolicyState) {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return null;

  const body = new URLSearchParams({
    status: consent.status,
    analytics: consent.analytics ? '1' : '0',
    marketing: consent.marketing ? '1' : '0',
    version: consent.version,
    lang
  });
  if (consent.status === 'accepted' && consent.analytics && consent.marketing) body.set('accept_all', '1');
  if (!consent.analytics && !consent.marketing) body.set('reject_optional', '1');

  try {
    const response = await fetch(getPlatformCorporateCookiePreferencesUrl(), {
      method: 'POST',
      credentials: 'include',
      keepalive: true,
      headers: { Accept: 'application/json' },
      body
    });
    if (!response.ok) return null;
    const data = await response.json();
    const persisted = data?.ok === true && data?.consent
      ? normalizeConsent(JSON.stringify(data.consent), policy)
      : null;
    if (
      !persisted
      || persisted.analytics !== consent.analytics
      || persisted.marketing !== consent.marketing
      || persisted.status !== consent.status
    ) return null;
    return persisted;
  } catch {
    return null;
  }
}

export async function persistConsentAgainstLivePolicy(
  analytics: boolean,
  marketing: boolean,
  status: CookieConsentState['status'],
  lang: string,
  now: () => Date = () => new Date()
) {
  for (let attempt = 0; attempt < CONSENT_SAVE_ATTEMPTS; attempt += 1) {
    const livePolicy = await fetchPlatformCookiePolicy();
    if (!livePolicy) continue;

    const nextConsent: CookieConsentState = {
      status,
      necessary: true,
      analytics,
      marketing,
      version: livePolicy.version,
      updatedAt: now().toISOString()
    };
    const persistedConsent = await syncConsentWithPlatform(nextConsent, lang, livePolicy);
    if (persistedConsent) return { consent: persistedConsent, policy: livePolicy };
  }
  return null;
}

export const CookieConsent: React.FC = () => {
  const { lang } = useLanguage();
  const labels = LABELS[lang] || LABELS.en;
  const cookiePolicyUrl = useMemo(() => getPlatformLegalUrl('cookies', lang), [lang]);

  const [isReady, setIsReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });
  const [isSaving, setIsSaving] = useState(false);
  const [syncError, setSyncError] = useState('');

  useEffect(() => {
    let isMounted = true;
    clearVerifiedCorporateAnalyticsConsent();

    const loadConsentState = async () => {
      const livePolicy = await fetchPlatformCookiePolicy();
      if (!isMounted) return;
      if (!livePolicy) {
        clearMarketingAttributionStorage();
        setSyncError('cookie_policy_unavailable');
        setIsReady(true);
        return;
      }

      const rawStoredConsent = readStoredConsent();
      const { consent: persistedConsent } = await resolveAuthoritativeConsent(livePolicy, rawStoredConsent);
      if (!isMounted) return;

      if (persistedConsent && markCorporateAnalyticsConsentVerified(persistedConsent, livePolicy.version)) {
        if (persistedConsent.marketing) refreshPrivacySafeMarketingAttribution();
        else clearMarketingAttributionStorage();
        persistConsent(persistedConsent, livePolicy.maxAgeDays);
        setConsent(persistedConsent);
        updateGoogleConsentMode(persistedConsent);
        flushPendingCorporatePageView();
        setDraft({
          analytics: persistedConsent.analytics,
          marketing: persistedConsent.marketing
        });
      } else if (rawStoredConsent) {
        clearStoredConsent();
        clearMarketingAttributionStorage();
      } else {
        clearMarketingAttributionStorage();
      }

      setIsReady(true);
    };

    loadConsentState();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => setIsPanelOpen(true);

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  const saveConsent = async (analytics: boolean, marketing: boolean, status: CookieConsentState['status'] = 'custom') => {
    if (isSaving) return;
    setIsSaving(true);
    setSyncError('');
    clearVerifiedCorporateAnalyticsConsent();
    if (!marketing) clearMarketingAttributionStorage();
    updateGoogleConsentMode({ analytics: false, marketing: false });

    const result = await persistConsentAgainstLivePolicy(analytics, marketing, status, lang);
    if (!result) {
      setSyncError('cookie_preferences_sync_failed');
      setIsSaving(false);
      return;
    }
    const { consent: persistedConsent, policy: livePolicy } = result;
    if (!markCorporateAnalyticsConsentVerified(persistedConsent, livePolicy.version)) {
      setSyncError('cookie_preferences_sync_failed');
      setIsSaving(false);
      return;
    }

    if (persistedConsent.marketing) refreshPrivacySafeMarketingAttribution();
    else clearMarketingAttributionStorage();

    persistConsent(persistedConsent, livePolicy.maxAgeDays);
    updateGoogleConsentMode(persistedConsent);
    flushPendingCorporatePageView();
    setConsent(persistedConsent);
    setDraft({ analytics: persistedConsent.analytics, marketing: persistedConsent.marketing });
    setIsPanelOpen(false);
    if (persistedConsent.analytics) {
      trackCorporateEvent('cookie_consent_update', { status: persistedConsent.status });
    }
    setIsSaving(false);
  };

  if (!isReady) return null;

  const showNotice = !consent && !isPanelOpen;

  return (
    <>
      {showNotice && (
        <div className="cookie-banner workflow-advisor-cookie no-print fixed bottom-24 left-4 right-4 z-[91] rounded-2xl border border-slate-200 bg-white p-5 text-slate-700 shadow-2xl md:left-auto md:right-4 md:max-w-md">
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">{labels.badge}</div>
          <h2 className="mt-2 text-lg font-black text-slate-900">{labels.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{labels.copy}</p>
          {syncError && (
            <p role="alert" className="mt-2 text-xs font-bold text-rose-700">
              {labels.error}
            </p>
          )}
          <a href={cookiePolicyUrl} className="mt-3 inline-flex text-xs font-bold text-cyan-700 hover:text-cyan-900">
            {labels.policy}
          </a>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => saveConsent(true, true, 'accepted')}
              disabled={isSaving}
              className="rounded-xl bg-cyan-600 px-4 py-3 text-xs font-black text-white transition hover:bg-cyan-700"
            >
              {labels.acceptAll}
            </button>
            <button
              type="button"
              onClick={() => saveConsent(false, false)}
              disabled={isSaving}
              className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50"
            >
              {labels.rejectOptional}
            </button>
            <button
              type="button"
              onClick={() => setIsPanelOpen(true)}
              disabled={isSaving}
              className="rounded-xl border border-cyan-200 px-4 py-3 text-xs font-black text-cyan-800 transition hover:bg-cyan-50"
            >
              {labels.customize}
            </button>
          </div>
        </div>
      )}

      {isPanelOpen && (
        <div className="cookie-banner workflow-advisor-cookie no-print fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">{labels.badge}</div>
                <h2 className="mt-1 text-xl font-black text-slate-900">{labels.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsPanelOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label={labels.close}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{labels.necessaryTitle}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{labels.necessaryCopy}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-black text-slate-600">
                    {labels.alwaysOn}
                  </span>
                </div>
              </div>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <span>
                  <span className="block text-sm font-black text-slate-900">{labels.analyticsTitle}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{labels.analyticsCopy}</span>
                </span>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
              </label>

              <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50">
                <span>
                  <span className="block text-sm font-black text-slate-900">{labels.marketingTitle}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{labels.marketingCopy}</span>
                </span>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) => setDraft((current) => ({ ...current, marketing: event.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
              {syncError && (
                <p role="alert" className="mr-auto self-center text-xs font-bold text-rose-700">
                  {labels.error}
                </p>
              )}
              <button
                type="button"
                onClick={() => saveConsent(false, false)}
                disabled={isSaving}
                className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50"
              >
                {labels.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => saveConsent(draft.analytics, draft.marketing)}
                disabled={isSaving}
                className="rounded-xl bg-cyan-600 px-4 py-3 text-xs font-black text-white transition hover:bg-cyan-700"
              >
                {labels.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
