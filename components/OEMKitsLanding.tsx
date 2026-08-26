import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FlaskConical,
  Handshake,
  Layers3,
  Network,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Tags
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import { MarketingLeadFormControls } from './MarketingLeadFormControls';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { trackCorporateEvent } from '../utils/corporateAnalytics';
import { useMarketingLeadCapture } from '../utils/marketingLeadCapture';

type Card = {
  title: string;
  body: string;
};

type ModelCard = Card & {
  bullets: string[];
  cta: string;
};

type DirectAnswerContent = {
  title: string;
  body: string;
};

type TechnicalTableContent = {
  title?: string;
  columns: string[];
  rows: string[][];
};

type OEMContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  directAnswer?: DirectAnswerContent;
  primaryCta?: string;
  secondaryCta?: string;
  heroPanelTitle?: string;
  heroNodes?: Card[];
  heroMetrics?: Card[];
  trustCards?: Card[];
  modelsEyebrow?: string;
  modelsTitle?: string;
  modelsBody?: string;
  models?: ModelCard[];
  architectureEyebrow?: string;
  architectureTitle?: string;
  architectureBody?: string;
  coreTitle?: string;
  coreBody?: string;
  architectureCards?: Card[];
  productsEyebrow?: string;
  productsTitle?: string;
  productsBody?: string;
  products?: Card[];
  launchEyebrow?: string;
  launchTitle?: string;
  launchBody?: string;
  launchSteps?: Card[];
  selectorEyebrow?: string;
  selectorTitle?: string;
  selectorBody?: string;
  selectorCta?: string;
  partnersCta?: string;
  routes?: Record<string, Card>;
  routeNotes?: Record<string, string>;
  routeLabels?: Record<string, string>;
  sectorsEyebrow?: string;
  sectorsTitle?: string;
  sectorsBody?: string;
  sectorCta?: string;
  sectors?: Array<Card & { routeId: string }>;
  comparisonEyebrow?: string;
  comparisonTitle?: string;
  comparisonCards?: Card[];
  requirementsEyebrow?: string;
  requirementsTitle?: string;
  aquaverifyProvidesTitle?: string;
  partnerProvidesTitle?: string;
  aquaverifyProvides?: string[];
  partnerProvides?: string[];
  technicalEyebrow?: string;
  technicalTitle?: string;
  technicalBody?: string;
  references?: Card[];
  formsEyebrow?: string;
  formsTitle?: string;
  formsBody?: string;
  forms?: {
    oem: { title: string; body: string; submit: string };
    partner?: { title: string; body: string; submit: string };
  };
  formLabels?: Record<string, string>;
  modelOptions?: string[];
  sectorOptions?: string[];
  countries?: string[];
  faqEyebrow?: string;
  faqTitle?: string;
  faqs?: Array<{ question: string; answer: string }>;
  technicalTable?: TechnicalTableContent;
  cta?: { title: string; body: string; primary?: string; secondary?: string };
};

type Props = {
  content: OEMContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const routeKeys = ['distributor', 'manufacturer', 'lab', 'integrator'];
const modelIcons = [Handshake, Tags, PackageCheck];
const architectureIcons = [FlaskConical, Boxes, FileCheck2, Network, Sparkles, Layers3];
const productIcons = [FlaskConical, Layers3, ShieldCheck, CheckCircle2, ClipboardCheck, Network];
const sectorIcons = [FlaskConical, ShieldCheck, Network, PackageCheck, Layers3, FileCheck2, Sparkles, ClipboardCheck, Handshake];
const referenceHrefs = [
  'https://www.iso.org/standard/20127.html',
  'https://www.epa.gov/water-research/microbiological-methods-and-online-publications',
  '#solicitud'
];

const oemFormFallbacks: Record<Language, { name: string; company: string; privacy: string }> = {
  en: {
    name: 'Contact name',
    company: 'Company or organisation',
    privacy: 'The commercial team receives the request with its source, OEM profile and private-label context.'
  },
  es: {
    name: 'Nombre de contacto',
    company: 'Empresa u organización',
    privacy: 'El equipo comercial recibe la solicitud con su origen, perfil OEM y contexto de marca privada.'
  },
  fr: {
    name: 'Nom du contact',
    company: 'Entreprise ou organisation',
    privacy: 'L’équipe commerciale reçoit la demande avec son origine, le profil OEM et le contexte de marque blanche.'
  },
  it: {
    name: 'Nome del referente',
    company: 'Azienda o organizzazione',
    privacy: 'Il team commerciale riceve la richiesta con la sua origine, il profilo OEM e il contesto private label.'
  },
  ca: {
    name: 'Nom de contacte',
    company: 'Empresa o organització',
    privacy: 'L’equip comercial rep la sol·licitud amb el seu origen, el perfil OEM i el context de marca privada.'
  }
};

const AnswerLayer: React.FC<{
  directAnswer?: DirectAnswerContent;
  technicalTable?: TechnicalTableContent;
}> = ({ directAnswer, technicalTable }) => {
  if (!directAnswer && !technicalTable) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          {directAnswer && (
            <>
              <h2 className="font-heading text-2xl font-black text-primary">{directAnswer.title}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{directAnswer.body}</p>
            </>
          )}
          {technicalTable && technicalTable.columns.length > 0 && technicalTable.rows.length > 0 && (
            <div className={directAnswer ? 'mt-7' : ''}>
              {technicalTable.title && (
                <h3 className="font-heading text-xl font-black text-slate-900">{technicalTable.title}</h3>
              )}
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {technicalTable.columns.map((column) => (
                        <th key={column} scope="col" className="px-4 py-3 font-black text-primary">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {technicalTable.rows.map((row, rowIndex) => (
                      <tr key={`${row.join('-')}-${rowIndex}`}>
                        {technicalTable.columns.map((column, columnIndex) => (
                          <td key={`${column}-${columnIndex}`} className="px-4 py-4 font-semibold leading-6 text-slate-600">
                            {row[columnIndex] || ''}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

function scrollToId(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export const OEMKitsLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const [selectedRoute, setSelectedRoute] = useState(routeKeys[0]);
  const route = content.routes?.[selectedRoute] || content.routes?.distributor;
  const routeNote = content.routeNotes?.[selectedRoute] || '';

  const partnerUrl = useMemo(() => getMarketingPagePath('distributors', pageLang), [pageLang]);

  const leadCapture = useMarketingLeadCapture({
    formKey: 'oem-private-label-request',
    requestType: 'oem',
    lang: pageLang,
    sourcePath: content.path,
    detailFields: ['country', 'site_model'],
    buyerRoleFields: ['company_type'],
    onAccepted: () => trackCorporateEvent('oem_form_submit', {
      lang: pageLang,
      page: 'oem',
      category: 'partners',
      intent: 'oem',
      module: 'private-label-program'
    })
  });

  const handleHeroCta = (label: string, target: string, eventName: string) => {
    trackCorporateEvent(eventName, {
      lang: pageLang,
      page: 'oem',
      category: 'partners',
      label
    });
    scrollToId(target);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className="container relative z-10 mx-auto grid gap-10 px-6 py-16 md:py-24 lg:grid-cols-[minmax(0,1.06fr)_minmax(330px,0.82fr)] lg:items-center">
            <div className="max-w-5xl">
              <span className="aq-hero-eyebrow">
                <span className="mr-2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(103,232,249,0.16)]" />
                {content.eyebrow}
              </span>
              <h1 className="aq-gradient-title mt-6 max-w-5xl font-heading text-4xl font-black leading-[0.98] tracking-tight md:text-6xl">
                {content.title}
              </h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">
                {content.description}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => handleHeroCta(content.primaryCta || '', 'solicitud', 'oem_primary_cta_click')}
                  className="aq-cta-primary"
                >
                  {content.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleHeroCta(content.secondaryCta || '', 'modelos', 'oem_secondary_cta_click')}
                  className="aq-cta-secondary"
                >
                  {content.secondaryCta}
                </button>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <h2 className="font-heading text-lg font-black text-white">{content.heroPanelTitle}</h2>
              <div className="relative mt-5 grid min-h-[340px] grid-cols-2 gap-3">
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-white text-sm font-black tracking-[0.12em] text-primary shadow-xl sm:flex">
                  OEM
                </div>
                {(content.heroNodes || []).map((item, index) => (
                  <div key={item.title} className="relative z-0 rounded-2xl border border-white/15 bg-white/10 p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-primary">
                      {index + 1}
                    </span>
                    <strong className="mt-6 block text-sm font-black text-white">{item.title}</strong>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-cyan-50/70">{item.body}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {(content.heroMetrics || []).map((metric) => (
                  <div key={metric.title} className="rounded-2xl border border-white/15 bg-white/10 px-3 py-3">
                    <strong className="block text-lg font-black leading-none text-white">{metric.title}</strong>
                    <span className="mt-1 block text-xs font-semibold leading-5 text-cyan-50/70">{metric.body}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="relative z-10 -mt-8 px-6">
          <div className="container mx-auto grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl md:grid-cols-4">
            {(content.trustCards || []).map((item) => (
              <article key={item.title} className="border-b border-slate-100 p-5 md:border-b-0 md:border-r last:md:border-r-0">
                <h2 className="font-heading text-base font-black text-primary">{item.title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <AnswerLayer
          directAnswer={content.directAnswer}
          technicalTable={content.technicalTable}
        />

        <section id="modelos" className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.modelsEyebrow} title={content.modelsTitle} body={content.modelsBody} centered />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {(content.models || []).map((item, index) => {
                const Icon = modelIcons[index] || Handshake;
                return (
                  <article key={item.title} className="flex min-h-[27rem] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-2xl font-black text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                    <ul className="mt-5 grid gap-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleHeroCta(item.cta, 'solicitud', 'oem_model_cta_click')}
                      className="mt-auto inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-primary transition hover:border-cyan-200 hover:bg-cyan-50"
                    >
                      {item.cta}
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
            <SectionHeading eyebrow={content.architectureEyebrow} title={content.architectureTitle} body={content.architectureBody} />
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
              <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#062b42,#075477)] p-8 text-white shadow-xl">
                <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white text-center font-heading text-xl font-black leading-none text-primary shadow-xl">
                  AquaVerify<br />OEM
                </div>
                <h3 className="mt-8 font-heading text-3xl font-black leading-tight">{content.coreTitle}</h3>
                <p className="mt-4 text-sm font-semibold leading-7 text-cyan-50/75">{content.coreBody}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Kits', 'Brand', 'Cloud', 'CoA'].map((item) => (
                    <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
              <div className="grid gap-4 md:grid-cols-2">
                {(content.architectureCards || []).map((item, index) => {
                  const Icon = architectureIcons[index] || Sparkles;
                  return (
                    <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon className="h-5 w-5 text-cyan-600" />
                      <h3 className="mt-4 font-heading text-lg font-black text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.productsEyebrow} title={content.productsTitle} body={content.productsBody} centered />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(content.products || []).map((item, index) => {
                const Icon = productIcons[index] || FlaskConical;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-800">{String(index + 1).padStart(2, '0')}</span>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.launchEyebrow} title={content.launchTitle} body={content.launchBody} centered />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {(content.launchSteps || []).map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#11bfd3,#0b6fae)] text-sm font-black text-white shadow-lg">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-black text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="selector" className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.selectorEyebrow} title={content.selectorTitle} body={content.selectorBody} />
            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(280px,0.82fr)_minmax(0,1.18fr)]">
              <div className="grid gap-3 self-start">
                {routeKeys.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={selectedRoute === key}
                    onClick={() => {
                      setSelectedRoute(key);
                      trackCorporateEvent('oem_route_selector_click', {
                        lang: pageLang,
                        page: 'oem',
                        category: 'partners',
                        route: key
                      });
                    }}
                    className={`rounded-2xl border p-4 text-left text-sm font-black shadow-sm transition ${selectedRoute === key ? 'border-cyan-300 bg-cyan-50 text-primary' : 'border-slate-200 bg-white text-slate-800 hover:border-cyan-200 hover:bg-cyan-50/60'}`}
                  >
                    {content.routeLabels?.[key] || key}
                  </button>
                ))}
              </div>
              <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#062b42,#075477)] p-7 text-white shadow-xl md:p-9">
                <h3 className="font-heading text-3xl font-black leading-tight">{route?.title}</h3>
                <p className="mt-4 text-base font-semibold leading-8 text-cyan-50/75">{route?.body}</p>
                <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5 text-sm font-black leading-6 text-cyan-50">
                  {routeNote}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleHeroCta(content.selectorCta || '', 'solicitud', 'oem_selector_cta_click')}
                    className="aq-cta-primary"
                  >
                    {content.selectorCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <Link
                    to={partnerUrl}
                    className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
                  >
                    {content.partnersCta}
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.sectorsEyebrow} title={content.sectorsTitle} body={content.sectorsBody} centered />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(content.sectors || []).map((item, index) => {
                const Icon = sectorIcons[index] || Network;
                return (
                  <Link
                    key={item.title}
                    to={getMarketingPagePath(item.routeId, pageLang)}
                    className="group relative min-h-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                  >
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#11bfd3,#0b6fae)] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-black leading-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                    <span className="absolute bottom-5 left-6 inline-flex items-center text-sm font-black text-primary group-hover:text-secondary">
                      {content.sectorCta}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#062b42,#075477)] py-16 text-white md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.comparisonEyebrow} title={content.comparisonTitle} centered inverted />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(content.comparisonCards || []).map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-black text-primary">{index + 1}</span>
                  <h3 className="mt-5 font-heading text-2xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-cyan-50/75">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.requirementsEyebrow} title={content.requirementsTitle} centered />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <ChecklistCard title={content.aquaverifyProvidesTitle} items={content.aquaverifyProvides || []} />
              <ChecklistCard title={content.partnerProvidesTitle} items={content.partnerProvides || []} />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.technicalEyebrow} title={content.technicalTitle} body={content.technicalBody} />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {(content.references || []).map((item, index) => {
                const href = referenceHrefs[index] || '#solicitud';
                const isInternal = href.startsWith('#');
                return (
                  <a
                    key={item.title}
                    href={href}
                    target={isInternal ? undefined : '_blank'}
                    rel={isInternal ? undefined : 'noopener noreferrer'}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
                  >
                    <strong className="block font-heading text-xl font-black text-primary">{item.title}</strong>
                    <span className="mt-3 block text-sm font-semibold leading-6 text-slate-600">{item.body}</span>
                    <span className="mt-5 inline-flex text-sm font-black text-secondary">{isInternal ? '->' : '↗'}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="solicitud" className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.formsEyebrow} title={content.formsTitle} body={content.formsBody} centered />
            <div className="mx-auto mt-10 max-w-3xl">
              <OEMForm
                content={content}
                pageLang={pageLang}
                leadCapture={leadCapture}
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <SectionHeading eyebrow={content.faqEyebrow} title={content.faqTitle} centered />
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {(content.faqs || []).map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-black text-slate-950">{faq.question}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#062b42,#075477)] py-16 text-center text-white md:py-20">
          <div className="container mx-auto px-6">
            <h2 className="mx-auto max-w-4xl font-heading text-3xl font-black leading-tight md:text-5xl">{content.cta?.title}</h2>
            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-cyan-50/75">{content.cta?.body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => handleHeroCta(content.cta?.primary || '', 'solicitud', 'oem_final_primary_cta_click')}
                className="aq-cta-primary"
              >
                {content.cta?.primary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleHeroCta(content.cta?.secondary || '', 'modelos', 'oem_final_secondary_cta_click')}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
              >
                {content.cta?.secondary}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

function SectionHeading({ eyebrow, title, body, centered = false, inverted = false }: {
  eyebrow?: string;
  title?: string;
  body?: string;
  centered?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`text-xs font-black uppercase tracking-[0.18em] ${inverted ? 'text-cyan-100' : 'text-cyan-700'}`}>
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className={`mt-4 font-heading text-3xl font-black leading-tight md:text-5xl ${inverted ? 'text-white' : 'text-primary'}`}>
          {title}
        </h2>
      )}
      {body && (
        <p className={`mt-4 text-base font-semibold leading-8 ${inverted ? 'text-cyan-50/75' : 'text-slate-600'}`}>
          {body}
        </p>
      )}
    </div>
  );
}

function ChecklistCard({ title, items }: { title?: string; items: string[] }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <h3 className="font-heading text-2xl font-black text-primary">{title}</h3>
      <ul className="mt-6 grid gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function OEMForm({ content, pageLang, leadCapture }: {
  content: OEMContent;
  pageLang: Language;
  leadCapture: ReturnType<typeof useMarketingLeadCapture>;
}) {
  const form = content.forms?.oem;
  const labels = content.formLabels || {};
  const fallback = oemFormFallbacks[pageLang] || oemFormFallbacks.en;

  if (!form) return null;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-primary">
        <PackageCheck className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-2xl font-black text-slate-950">{form.title}</h3>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{form.body}</p>
      <form className="relative mt-6 grid gap-4" onSubmit={leadCapture.handleSubmit}>
        <Field label={labels.contactName || fallback.name} name="name" autoComplete="name" required />
        <Field label={labels.company || fallback.company} name="company" autoComplete="organization" required />
        <Field label={labels.email} name="email" type="email" autoComplete="email" required />
        <SelectField label={labels.country} name="country" options={content.countries || []} />
        <Field label={labels.companyType} name="company_type" />
        <SelectField label={labels.model} name="site_model" options={content.modelOptions || []} />
        <TextAreaField label={labels.volume} name="main_need" />
        <MarketingLeadFormControls
          lang={pageLang}
          submitLabel={form.submit}
          privacyNote={fallback.privacy}
          status={leadCapture.status}
          copy={leadCapture.copy}
        />
      </form>
    </article>
  );
}

function Field({ label, name, type = 'text', autoComplete, required = false }: {
  label?: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}

function SelectField({ label, name, options }: { label?: string; name: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <select
        name={name}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
      >
        <option value="" />
        {options.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({ label, name }: { label?: string; name: string }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-800">
      {label}
      <textarea
        name={name}
        className="min-h-28 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
      />
    </label>
  );
}
