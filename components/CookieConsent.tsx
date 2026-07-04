import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPlatformCorporateCookiePolicyUrl, getPlatformCorporateCookiePreferencesUrl, getPlatformLegalUrl } from '../utils/platformLinks';
import { COOKIE_POLICY_VERSION } from '../utils/legalPolicy';
import { trackCorporateEvent, updateGoogleConsentMode } from '../utils/corporateAnalytics';

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
export const OPEN_COOKIE_PREFERENCES_EVENT = 'aquaverify:open-cookie-preferences';

interface CookiePolicyState {
  version: string;
  maxAgeDays: number;
}

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
    policy: 'Cookie policy'
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
    policy: 'Política de cookies'
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
    policy: 'Politique de cookies'
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
    policy: 'Politica cookie'
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
    policy: 'Política de cookies'
  }
};

function readCookieValue(name: string) {
  const cookie = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) return null;
  return decodeURIComponent(cookie.slice(name.length + 1));
}

function getCookieMaxAgeSeconds(maxAgeDays = DEFAULT_COOKIE_MAX_AGE_DAYS) {
  const normalizedDays = Number.isFinite(maxAgeDays) && maxAgeDays >= 30 && maxAgeDays <= 730
    ? maxAgeDays
    : DEFAULT_COOKIE_MAX_AGE_DAYS;
  return normalizedDays * 24 * 60 * 60;
}

function normalizeConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const status = parsed.status === 'accepted' ? 'accepted' : 'custom';

    return {
      status,
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      version: String(parsed.version || COOKIE_POLICY_VERSION),
      updatedAt: String(parsed.updatedAt || new Date().toISOString())
    };
  } catch {
    return null;
  }
}

function clearStoredConsent() {
  localStorage.removeItem(COOKIE_STORAGE_KEY);
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${secureFlag}`;
}

function persistConsent(consent: CookieConsentState, maxAgeDays = DEFAULT_COOKIE_MAX_AGE_DAYS) {
  const serialized = JSON.stringify(consent);
  localStorage.setItem(COOKIE_STORAGE_KEY, serialized);

  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(serialized)}; Max-Age=${getCookieMaxAgeSeconds(maxAgeDays)}; Path=/; SameSite=Lax${secureFlag}`;
}

async function fetchPlatformCookiePolicy(): Promise<CookiePolicyState> {
  try {
    const response = await fetch(getPlatformCorporateCookiePolicyUrl(), {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('Policy endpoint unavailable');
    const data = await response.json();
    const version = String(data?.cookiePolicyVersion || COOKIE_POLICY_VERSION);
    const maxAgeDays = Number.parseInt(String(data?.cookieConsentMaxAgeDays || DEFAULT_COOKIE_MAX_AGE_DAYS), 10);
    return {
      version,
      maxAgeDays: Number.isFinite(maxAgeDays) ? maxAgeDays : DEFAULT_COOKIE_MAX_AGE_DAYS
    };
  } catch {
    return {
      version: COOKIE_POLICY_VERSION,
      maxAgeDays: DEFAULT_COOKIE_MAX_AGE_DAYS
    };
  }
}

function syncConsentWithPlatform(consent: CookieConsentState, lang: string) {
  if (typeof window === 'undefined' || typeof fetch !== 'function') return;

  const body = new URLSearchParams({
    status: consent.status,
    analytics: consent.analytics ? '1' : '0',
    marketing: consent.marketing ? '1' : '0',
    version: consent.version,
    lang,
    source_url: window.location.href
  });

  if (document.referrer) body.set('referrer', document.referrer);

  fetch(getPlatformCorporateCookiePreferencesUrl(), {
    method: 'POST',
    credentials: 'include',
    keepalive: true,
    body
  }).catch(() => {
    // Local consent remains valid; platform sync is best-effort.
  });
}

export const CookieConsent: React.FC = () => {
  const { lang } = useLanguage();
  const labels = LABELS[lang] || LABELS.en;
  const cookiePolicyUrl = useMemo(() => getPlatformLegalUrl('cookies', lang), [lang]);

  const [isReady, setIsReady] = useState(false);
  const [policy, setPolicy] = useState<CookiePolicyState>({
    version: COOKIE_POLICY_VERSION,
    maxAgeDays: DEFAULT_COOKIE_MAX_AGE_DAYS
  });
  const [consent, setConsent] = useState<CookieConsentState | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    let isMounted = true;

    const loadConsentState = async () => {
      const livePolicy = await fetchPlatformCookiePolicy();
      if (!isMounted) return;

      setPolicy(livePolicy);

      const storedConsent = normalizeConsent(localStorage.getItem(COOKIE_STORAGE_KEY))
        || normalizeConsent(readCookieValue(COOKIE_NAME));

      if (storedConsent && storedConsent.version === livePolicy.version) {
        setConsent(storedConsent);
        updateGoogleConsentMode(storedConsent);
        setDraft({
          analytics: storedConsent.analytics,
          marketing: storedConsent.marketing
        });
      } else if (storedConsent) {
        clearStoredConsent();
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

  const saveConsent = (analytics: boolean, marketing: boolean, status: CookieConsentState['status'] = 'custom') => {
    const nextConsent: CookieConsentState = {
      status,
      necessary: true,
      analytics,
      marketing,
      version: policy.version,
      updatedAt: new Date().toISOString()
    };

    persistConsent(nextConsent, policy.maxAgeDays);
    updateGoogleConsentMode(nextConsent, { sendPageView: analytics });
    syncConsentWithPlatform(nextConsent, lang);
    setConsent(nextConsent);
    setDraft({ analytics, marketing });
    setIsPanelOpen(false);
    trackCorporateEvent('cookie_consent_update', {
      analytics,
      marketing,
      status,
      version: nextConsent.version
    });
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
          <a href={cookiePolicyUrl} className="mt-3 inline-flex text-xs font-bold text-cyan-700 hover:text-cyan-900">
            {labels.policy}
          </a>
          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => saveConsent(true, true, 'accepted')}
              className="rounded-xl bg-cyan-600 px-4 py-3 text-xs font-black text-white transition hover:bg-cyan-700"
            >
              {labels.acceptAll}
            </button>
            <button
              type="button"
              onClick={() => saveConsent(false, false)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50"
            >
              {labels.rejectOptional}
            </button>
            <button
              type="button"
              onClick={() => setIsPanelOpen(true)}
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
              <button
                type="button"
                onClick={() => saveConsent(false, false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-black text-slate-700 transition hover:bg-slate-50"
              >
                {labels.rejectOptional}
              </button>
              <button
                type="button"
                onClick={() => saveConsent(draft.analytics, draft.marketing)}
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
