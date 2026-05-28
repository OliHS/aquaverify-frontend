import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FlaskConical,
  Globe2,
  Handshake,
  Hotel,
  Landmark,
  Leaf,
  MapPin,
  Network,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Waves
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import { supabase } from '../utils/supabase';
import type { DistributorPartner } from './DistributorsGlobe';

const DistributorsGlobe = React.lazy(() =>
  import('./DistributorsGlobe').then((module) => ({ default: module.DistributorsGlobe }))
);

type Card = {
  title: string;
  body: string;
};

type PathCard = Card & {
  bullets: string[];
  cta: string;
};

type DistributorForm = {
  title: string;
  body: string;
  submit: string;
  fields: Record<string, string>;
};

type DistributorContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  heroPanelTitle?: string;
  metrics?: string[];
  cycle?: Card[];
  trustCards?: Card[];
  pathsTitle?: string;
  pathsBody?: string;
  buyerPath?: PathCard;
  partnerPath?: PathCard;
  authorizedEyebrow?: string;
  authorizedTitle?: string;
  authorizedBody?: string;
  mapTitle?: string;
  mapBody?: string;
  mapNetworkTitle?: string;
  mapTags?: string[];
  searchTitle?: string;
  searchBody?: string;
  searchPlaceholder?: string;
  searchEmptyTitle?: string;
  searchEmptyBody?: string;
  searchResultTitle?: string;
  searchResultBody?: string;
  processEyebrow?: string;
  processTitle?: string;
  processBody?: string;
  processSteps?: Card[];
  buyerEyebrow?: string;
  buyerTitle?: string;
  buyerBody?: string;
  buyerCards?: Card[];
  partnerEyebrow?: string;
  partnerTitle?: string;
  partnerBody?: string;
  partnerModels?: Card[];
  candidateTitle?: string;
  candidateBullets?: string[];
  programEyebrow?: string;
  programTitle?: string;
  programBody?: string;
  programCards?: Card[];
  sectorsEyebrow?: string;
  sectorsTitle?: string;
  sectorsBody?: string;
  sectorCta?: string;
  sectors?: Array<Card & { routeId: string; code: string }>;
  formsTitle?: string;
  formsBody?: string;
  forms?: { buyer: DistributorForm; partner: DistributorForm };
  faqEyebrow?: string;
  faqTitle?: string;
  cta?: { title: string; body: string; primary?: string; secondary?: string };
  countries?: string[];
  sectorOptions?: string[];
  faqs?: Array<{ question: string; answer: string }>;
};

type Props = {
  content: DistributorContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const sectorIcons = [FlaskConical, ShieldCheck, Landmark, Factory, Waves, Building2, Leaf, PackageCheck, Hotel];
const buyerIcons = [PackageCheck, ShieldCheck, ClipboardCheck, Sparkles, CheckCircle2, Network];
const programIcons = [PackageCheck, ClipboardCheck, ShieldCheck, Network, Handshake, Sparkles];

const FALLBACK_PARTNERS: DistributorPartner[] = [
  { id: 'eu-open', name: 'Open Territory: European Union', location: 'Barcelona, Spain / European Union', country: 'European Union', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 51, y: 31, lat: 41.38, lng: 2.17 },
  { id: 'na-open', name: 'Open Territory: North America', location: 'North America', country: 'North America', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 25, y: 35, lat: 40.71, lng: -74.00 },
  { id: 'latam-open', name: 'Open Territory: Latin America', location: 'Latin America', country: 'Latin America', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 34, y: 72, lat: -23.55, lng: -46.63 },
  { id: 'uk-open', name: 'Open Territory: United Kingdom & Ireland', location: 'United Kingdom & Ireland', country: 'United Kingdom & Ireland', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 49.5, y: 26, lat: 51.50, lng: -0.12 },
  { id: 'apac-open', name: 'Open Territory: Asia Pacific', location: 'Asia Pacific', country: 'Asia Pacific', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 86, y: 40, lat: 35.68, lng: 139.65 },
  { id: 'mea-open', name: 'Open Territory: Middle East & Africa', location: 'Middle East & Africa', country: 'Middle East & Africa', type: 'open', address: 'Contact via form', email: 'hola@aquaverify.com', phone: '', x: 57, y: 54, lat: 25.20, lng: 55.27 }
];

const COUNTRY_ALIASES: Record<string, string> = {
  alemania: 'Germany',
  allemagne: 'Germany',
  alemanya: 'Germany',
  argentina: 'Argentina',
  australia: 'Australia',
  australie: 'Australia',
  austràlia: 'Australia',
  brasil: 'Brazil',
  brasile: 'Brazil',
  brésil: 'Brazil',
  canada: 'Canada',
  canadà: 'Canada',
  chile: 'Chile',
  chili: 'Chile',
  cile: 'Chile',
  colombia: 'Colombia',
  colombie: 'Colombia',
  colòmbia: 'Colombia',
  espagne: 'Spain',
  espanya: 'Spain',
  españa: 'Spain',
  estadosunidos: 'United States',
  estatsunits: 'United States',
  etatsunis: 'United States',
  france: 'France',
  francia: 'France',
  frança: 'France',
  germania: 'Germany',
  germany: 'Germany',
  italia: 'Italy',
  italie: 'Italy',
  italy: 'Italy',
  itàlia: 'Italy',
  japan: 'Japan',
  japó: 'Japan',
  mexico: 'Mexico',
  mexique: 'Mexico',
  messico: 'Mexico',
  mèxic: 'Mexico',
  marocco: 'Morocco',
  maroc: 'Morocco',
  marroc: 'Morocco',
  marruecos: 'Morocco',
  peru: 'Peru',
  perú: 'Peru',
  pérou: 'Peru',
  perù: 'Peru',
  regneunit: 'United Kingdom',
  regnounito: 'United Kingdom',
  reinounido: 'United Kingdom',
  royaumeuni: 'United Kingdom',
  spain: 'Spain',
  spagna: 'Spain',
  statiunit: 'United States',
  statiuniti: 'United States',
  sudafrica: 'South Africa',
  sudafrique: 'South Africa',
  sudàfrica: 'South Africa',
  sudáfrica: 'South Africa',
  unitedkingdom: 'United Kingdom',
  unitedstates: 'United States'
};

const MAP_UI: Record<Language, { load: string; nodes: string; countries: string; support: string; exclusive: string; reseller: string; open: string }> = {
  en: { load: 'Load interactive globe', nodes: 'nodes', countries: '140+ countries', support: 'Local support', exclusive: 'Exclusive', reseller: 'Reseller', open: 'Open for new distributor' },
  es: { load: 'Cargar globo interactivo', nodes: 'nodos', countries: '140+ países', support: 'Soporte local', exclusive: 'Exclusivo', reseller: 'Reseller', open: 'Abierto a nuevo distribuidor' },
  fr: { load: 'Charger le globe interactif', nodes: 'nœuds', countries: '140+ pays', support: 'Support local', exclusive: 'Exclusif', reseller: 'Reseller', open: 'Ouvert à nouveau distributeur' },
  it: { load: 'Carica globo interattivo', nodes: 'nodi', countries: '140+ paesi', support: 'Supporto locale', exclusive: 'Esclusivo', reseller: 'Reseller', open: 'Aperto a nuovo distributore' },
  ca: { load: 'Carregar globus interactiu', nodes: 'nodes', countries: '140+ països', support: 'Suport local', exclusive: 'Exclusiu', reseller: 'Reseller', open: 'Obert a nou distribuïdor' }
};

function countryKey(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase();
}

function scrollToForm(id: string) {
  if (typeof document === 'undefined') return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-sm font-black text-slate-800">{children}</span>;
}

function TextInput({
  id,
  name,
  label,
  type = 'text',
  required = false,
  autoComplete
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <FieldLabel>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}

function SelectField({
  id,
  name,
  label,
  options,
  required = false
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <FieldLabel>{label}</FieldLabel>
      <select
        id={id}
        name={name}
        required={required}
        className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ id, name, label, required = false }: { id: string; name: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="grid gap-2 md:col-span-2">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        id={id}
        name={name}
        required={required}
        className="min-h-28 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}

export const DistributorsLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isGlobeEnabled, setIsGlobeEnabled] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<DistributorPartner | null>(null);
  const [partners, setPartners] = useState<DistributorPartner[]>(FALLBACK_PARTNERS);
  const countries = content.countries || [];
  const mapLabels = MAP_UI[pageLang] || MAP_UI.en;
  const filteredCountries = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();
    return query
      ? countries.filter((country) => country.toLowerCase().includes(query)).slice(0, 8)
      : countries.slice(0, 8);
  }, [countries, countryQuery]);

  const buyerPath = content.buyerPath;
  const partnerPath = content.partnerPath;
  const buyerFormId = 'buscar-distribuidor';
  const partnerFormId = 'ser-distribuidor';
  const buyerUrl = getPlatformSignupUrl({
    intent: 'find_distributor',
    page: 'distributors',
    category: 'partners',
    profile: 'buyer'
  }, pageLang);
  const partnerUrl = getPlatformSignupUrl({
    intent: 'distributor',
    page: 'distributors',
    category: 'partners',
    profile: 'partner'
  }, pageLang);

  useEffect(() => {
    let isMounted = true;

    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from('distributors').select('*');
        if (!isMounted) return;
        if (!error && Array.isArray(data) && data.length > 0) {
          setPartners(data.map((partner: any) => ({ ...partner, x: partner.x || 0, y: partner.y || 0 })));
        }
      } catch (error) {
        console.warn('Unable to load distributor partners', error);
      }
    };

    fetchPartners();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCtaClick = (label: string, targetUrl: string, intent: string) => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'distributors',
      category: 'partners',
      intent,
      label,
      target_url: targetUrl,
      path: content.path
    });
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCountryQuery(country);
    const normalizedCountry = COUNTRY_ALIASES[countryKey(country)] || country;
    const matchingPartner = partners.find((partner) => countryKey(partner.country) === countryKey(normalizedCountry));
    setSelectedPartner(matchingPartner || null);
    trackCorporateEvent('distributor_country_search', {
      lang: pageLang,
      page: 'distributors',
      category: 'partners',
      country,
      partner: matchingPartner?.id
    });
  };

  const handlePartnerSelect = (partner: DistributorPartner) => {
    setSelectedPartner(partner);
    setSelectedCountry(partner.country);
    setCountryQuery(partner.country);
    trackCorporateEvent('distributor_partner_select', {
      lang: pageLang,
      page: 'distributors',
      category: 'partners',
      country: partner.country,
      distributor: partner.id,
      distributorName: partner.name,
      partner_type: partner.type
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, type: 'buyer' | 'partner') => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields: Record<string, string> = {};
    form.forEach((value, key) => {
      if (typeof value !== 'string') return;
      const clean = value.trim();
      if (clean) fields[key] = clean;
    });

    const intent = type === 'buyer' ? 'find_distributor' : 'distributor';
    trackCorporateEvent(type === 'buyer' ? 'distributor_contact_submit' : 'distributor_partner_submit', {
      lang: pageLang,
      page: 'distributors',
      category: 'partners',
      intent,
      country: fields.country,
      sector: fields.sector,
      company_type: fields.company_type
    });

    window.location.href = getPlatformSignupUrl({
      intent,
      page: 'distributors',
      category: 'partners',
      profile: type,
      module: type === 'buyer' ? 'local-distributor-routing' : 'partner-review',
      ...fields,
      prefill_name: fields.name,
      prefill_email: fields.email,
      prefill_company: fields.name
    }, pageLang);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="absolute inset-0 bg-transparent" />
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
            <div className="max-w-4xl">
              <div className="aq-hero-eyebrow">
                {content.eyebrow}
              </div>
              <h1 className="aq-gradient-title mt-6 font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    handleCtaClick(content.primaryCta || '', buyerUrl, 'find_distributor');
                    scrollToForm(buyerFormId);
                  }}
                  className="aq-cta-primary"
                >
                  {content.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCtaClick(content.secondaryCta || '', partnerUrl, 'distributor');
                    scrollToForm(partnerFormId);
                  }}
                  className="aq-cta-secondary"
                >
                  {content.secondaryCta}
                </button>
              </div>
            </div>

            <aside className="rounded-lg border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-2xl font-black">{content.heroPanelTitle}</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {(content.cycle || []).map((item, index) => (
                  <div key={item.title} className="min-h-32 rounded-lg border border-white/15 bg-white/10 p-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white text-xs font-black text-primary">{index + 1}</span>
                    <strong className="mt-3 block text-sm font-black">{item.title}</strong>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-cyan-50/70">{item.body}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2">
                {(content.metrics || []).map((metric) => (
                  <div key={metric} className="rounded border border-white/15 bg-white/10 px-3 py-2 text-sm font-black text-cyan-50">
                    {metric}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="relative z-10 -mt-8 px-6">
          <div className="container mx-auto grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl md:grid-cols-4">
            {(content.trustCards || []).map((item) => (
              <article key={item.title} className="border-b border-slate-100 p-5 md:border-b-0 md:border-r last:md:border-r-0">
                <h2 className="font-heading text-base font-black text-primary">{item.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.eyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.pathsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.pathsBody}</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {[buyerPath, partnerPath].filter(Boolean).map((item, index) => {
                const formId = index === 0 ? buyerFormId : partnerFormId;
                const intent = index === 0 ? 'find_distributor' : 'distributor';
                const targetUrl = index === 0 ? buyerUrl : partnerUrl;
                return (
                  <article key={item!.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-primary">
                      {index === 0 ? <MapPin className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                    </div>
                    <h3 className="font-heading text-2xl font-black text-slate-950">{item!.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item!.body}</p>
                    <ul className="mt-5 grid gap-3">
                      {item!.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        handleCtaClick(item!.cta, targetUrl, intent);
                        scrollToForm(formId);
                      }}
                      className="aq-cta-primary mt-6"
                    >
                      {item!.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mb-8 max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.authorizedEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.authorizedTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.authorizedBody}</p>
            </div>

            <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
              <div className="relative min-h-[520px] overflow-hidden bg-[#071521] text-white">
                <div className="absolute inset-0 bg-[#071521]" />
                {isGlobeEnabled ? (
                  <div className="relative z-10 h-[520px] cursor-move">
                    <Suspense
                      fallback={
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="h-20 w-20 animate-pulse rounded-full border border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_80px_rgba(34,211,238,0.18)]" />
                        </div>
                      }
                    >
                      <DistributorsGlobe
                        partners={partners}
                        selectedPartner={selectedPartner}
                        onSelectPartner={handlePartnerSelect}
                      />
                    </Suspense>
                  </div>
                ) : (
                  <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-8 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-400/10 shadow-lg">
                      <Globe2 className="h-10 w-10 text-cyan-200" />
                    </div>
                    <h3 className="font-heading text-3xl font-black md:text-4xl">{content.mapTitle}</h3>
                    <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-cyan-50/75">{content.mapBody}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-100/80">
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{partners.length} {mapLabels.nodes}</span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{mapLabels.countries}</span>
                      <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1">{mapLabels.support}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsGlobeEnabled(true);
                        trackCorporateEvent('distributor_globe_load', {
                          lang: pageLang,
                          page: 'distributors',
                          category: 'partners',
                          partners: partners.length
                        });
                      }}
                      className="aq-cta-primary mt-8 gap-2 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    >
                      <Globe2 className="h-4 w-4" />
                      {mapLabels.load}
                    </button>
                  </div>
                )}
                <div className="absolute bottom-6 left-6 right-6 z-20 hidden flex-wrap items-center gap-3 rounded-full bg-white/80 px-3 py-1.5 text-xs font-mono font-semibold text-slate-600 shadow-sm backdrop-blur md:right-auto md:flex md:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-500" /> {mapLabels.exclusive}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> {mapLabels.reseller}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" /> {mapLabels.open}
                  </div>
                </div>
              </div>

              <aside className="flex flex-col border-t border-slate-200 bg-white lg:border-l lg:border-t-0">
                <div className="border-b border-slate-100 p-6">
                  <h3 className="font-heading text-2xl font-black text-slate-950">{content.mapNetworkTitle}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{content.searchBody}</p>
                  <label htmlFor="distributor-country-search" className="mt-5 grid gap-2">
                    <FieldLabel>{content.searchTitle}</FieldLabel>
                    <div className="relative">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="distributor-country-search"
                        type="search"
                        value={countryQuery}
                        onChange={(event) => setCountryQuery(event.target.value)}
                        placeholder={content.searchPlaceholder}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                      />
                    </div>
                  </label>
                </div>
                <div className="flex-1 p-6">
                  <div className="grid gap-2">
                    {filteredCountries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountrySelect(country)}
                        className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-black transition ${selectedCountry === country ? 'border-cyan-300 bg-cyan-50 text-primary' : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-200 hover:bg-cyan-50/60'}`}
                      >
                        <span>{country}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h4 className="font-heading text-lg font-black text-slate-950">{selectedCountry ? content.searchResultTitle : content.searchEmptyTitle}</h4>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{selectedCountry ? content.searchResultBody : content.searchEmptyBody}</p>
                    <div className="mt-4 grid gap-2">
                      <button type="button" onClick={() => scrollToForm(buyerFormId)} className="aq-cta-primary px-4">
                        {content.primaryCta}
                      </button>
                      <button type="button" onClick={() => scrollToForm(partnerFormId)} className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:border-cyan-200 hover:text-primary">
                        {content.secondaryCta}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.processEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.processTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.processBody}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {(content.processSteps || []).map((step, index) => (
                <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-cyan-50 text-sm font-black text-primary">{index + 1}</span>
                  <h3 className="mt-5 font-heading text-lg font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.buyerEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.buyerTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.buyerBody}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(content.buyerCards || []).map((item, index) => {
                const Icon = buyerIcons[index % buyerIcons.length];
                return (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded bg-cyan-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-white md:py-20">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{content.partnerEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight md:text-5xl">{content.partnerTitle}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-cyan-50/75">{content.partnerBody}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {(content.partnerModels || []).map((model) => (
                  <article key={model.title} className="rounded-lg border border-white/15 bg-white/10 p-5">
                    <h3 className="font-heading text-lg font-black text-white">{model.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-cyan-50/75">{model.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="rounded-lg border border-white/15 bg-white/10 p-6 shadow-xl">
              <h3 className="font-heading text-2xl font-black">{content.candidateTitle}</h3>
              <ul className="mt-5 grid gap-3">
                {(content.candidateBullets || []).map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-cyan-50/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.programEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.programTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.programBody}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(content.programCards || []).map((item, index) => {
                const Icon = programIcons[index % programIcons.length];
                return (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded bg-cyan-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.sectorsEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.sectorsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.sectorsBody}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(content.sectors || []).map((sector, index) => {
                const Icon = sectorIcons[index % sectorIcons.length];
                return (
                  <Link
                    key={sector.routeId}
                    to={getMarketingPagePath(sector.routeId, pageLang)}
                    className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                  >
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded bg-primary text-xs font-black text-white">
                        {sector.code}
                      </span>
                      <Icon className="h-5 w-5 text-cyan-600 transition group-hover:scale-110" />
                    </div>
                    <h3 className="font-heading text-lg font-black text-slate-950">{sector.title}</h3>
                    <p className="mt-2 min-h-[3.5rem] text-sm font-semibold leading-6 text-slate-600">{sector.body}</p>
                    <span className="mt-5 inline-flex items-center text-sm font-black text-primary">
                      {content.sectorCta}
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.eyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.formsTitle}</h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.formsBody}</p>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-2">
              {content.forms?.buyer && (
                <article id={buyerFormId} className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
                  <h3 className="font-heading text-2xl font-black text-primary">{content.forms.buyer.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{content.forms.buyer.body}</p>
                  <form onSubmit={(event) => handleSubmit(event, 'buyer')} className="mt-6 grid gap-4 md:grid-cols-2">
                    <TextInput id="find-name" name="name" label={content.forms.buyer.fields.name} required autoComplete="name" />
                    <TextInput id="find-email" name="email" label={content.forms.buyer.fields.email} type="email" required autoComplete="email" />
                    <SelectField id="find-country" name="country" label={content.forms.buyer.fields.country} options={countries} required />
                    <SelectField id="find-sector" name="sector" label={content.forms.buyer.fields.sector} options={content.sectorOptions || []} />
                    <TextAreaField id="find-message" name="message" label={content.forms.buyer.fields.message} />
                    <div className="md:col-span-2">
                      <button type="submit" className="aq-cta-primary w-full py-4 md:w-auto">
                        {content.forms.buyer.submit}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </article>
              )}

              {content.forms?.partner && (
                <article id={partnerFormId} className="scroll-mt-28 rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
                  <h3 className="font-heading text-2xl font-black text-primary">{content.forms.partner.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{content.forms.partner.body}</p>
                  <form onSubmit={(event) => handleSubmit(event, 'partner')} className="mt-6 grid gap-4 md:grid-cols-2">
                    <TextInput id="partner-name" name="name" label={content.forms.partner.fields.name} required autoComplete="name" />
                    <TextInput id="partner-email" name="email" label={content.forms.partner.fields.email} type="email" required autoComplete="email" />
                    <SelectField id="partner-country" name="country" label={content.forms.partner.fields.country} options={countries} required />
                    <TextInput id="partner-company-type" name="company_type" label={content.forms.partner.fields.companyType} />
                    <TextAreaField id="partner-portfolio" name="portfolio" label={content.forms.partner.fields.portfolio} />
                    <div className="md:col-span-2">
                      <button type="submit" className="aq-cta-primary w-full py-4 md:w-auto">
                        {content.forms.partner.submit}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.faqEyebrow}</span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">{content.faqTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {(content.faqs || []).map((faq) => (
                <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-lg font-black text-slate-950">{faq.question}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {content.cta && (
          <section className="bg-primary py-16 text-white md:py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="mx-auto max-w-4xl font-heading text-3xl font-black leading-tight md:text-5xl">{content.cta.title}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-cyan-50/75">{content.cta.body}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => scrollToForm(buyerFormId)} className="aq-cta-primary">
                  {content.cta.primary || content.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button type="button" onClick={() => scrollToForm(partnerFormId)} className="aq-cta-secondary">
                  {content.cta.secondary || content.secondaryCta}
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};
