import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Beaker,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FlaskConical,
  Hotel,
  Landmark,
  Leaf,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Waves
} from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieConsent } from './CookieConsent';
import type { Language } from '../utils/translations';
import { getMarketingPagePath } from '../utils/marketingRoutes.js';
import { getPlatformSignupUrl } from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';

type HubCard = {
  title: string;
  body: string;
};

type HubSector = {
  routeId: string;
  title: string;
  body: string;
  focus: string;
  cta: string;
  label: string;
  code: string;
};

type HubContent = {
  path: string;
  title: string;
  description: string;
  eyebrow?: string;
  primaryCta?: string;
  secondaryCta?: string;
  trustEyebrow?: string;
  sectorsEyebrow?: string;
  flowEyebrow?: string;
  ecosystemEyebrow?: string;
  guideEyebrow?: string;
  matrixEyebrow?: string;
  matrixTitle?: string;
  matrixSector?: string;
  matrixChallenge?: string;
  matrixConnection?: string;
  faqEyebrow?: string;
  focusLabel?: string;
  coreTitle?: string;
  coreBody?: string;
  heroPanelTitle?: string;
  metrics?: string[];
  cycle?: Array<{ title: string; body: string; code: string }>;
  sections?: Array<{ title: string; body: string; bullets?: string[] }>;
  platformCards?: HubCard[];
  sectors?: HubSector[];
  flowItems?: HubCard[];
  ecosystemItems?: HubCard[];
  guideItems?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  cta?: { title: string; body: string; button?: string };
};

type Props = {
  content: HubContent;
  pageLang: Language;
  showCookieConsent?: boolean;
};

const sectorIcons = [
  FlaskConical,
  ShieldCheck,
  Landmark,
  Factory,
  Waves,
  Building2,
  Leaf,
  Beaker,
  Hotel
];

const platformIcons = [ClipboardCheck, FlaskConical, CheckCircle2, ShieldCheck];
const flowIcons = [MapPin, ClipboardCheck, FlaskConical, ShieldCheck, Network, Sparkles];
const FAQ_TITLES: Record<Language, string> = {
  en: 'Common questions before choosing a sector',
  es: 'Dudas comunes antes de elegir sector',
  fr: 'Questions fréquentes avant de choisir un secteur',
  it: 'Domande comuni prima di scegliere un settore',
  ca: 'Dubtes habituals abans de triar sector'
};

function splitLead(value: string) {
  const [lead, ...rest] = String(value || '').split(': ');
  return { lead: rest.length ? lead : '', body: rest.length ? rest.join(': ') : value };
}

export const IndustriesHubLanding: React.FC<Props> = ({ content, pageLang, showCookieConsent = true }) => {
  const platformCards = content.platformCards || [];
  const sectors = content.sectors || [];
  const flowItems = content.flowItems || [];
  const ecosystemItems = content.ecosystemItems || [];
  const guideItems = content.guideItems || content.sections?.[4]?.bullets || [];
  const faqs = content.faqs || [];
  const cycle = content.cycle || [];
  const metrics = content.metrics || [];
  const primaryUrl = '#sectores';
  const guidanceUrl = getPlatformSignupUrl({
    intent: 'sector_assessment',
    page: 'industries-hub',
    category: 'industries'
  }, pageLang);

  const handleGuidanceClick = () => {
    trackCorporateEvent('platform_link_click', {
      lang: pageLang,
      page: 'industries-hub',
      category: 'industries',
      intent: 'sector_assessment',
      label: content.cta?.button || content.secondaryCta || 'Talk to AquaVerify',
      target_url: guidanceUrl,
      path: content.path
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="container mx-auto grid gap-10 px-6 py-16 md:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.85fr)] lg:items-center">
            <div>
              {content.eyebrow && (
                <p className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase text-cyan-50">
                  {content.eyebrow}
                </p>
              )}
              <h1 className="max-w-5xl font-heading text-4xl font-black leading-tight md:text-6xl">
                {content.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-cyan-50/85">
                {content.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={primaryUrl}
                  className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-black text-primary shadow-lg transition hover:bg-cyan-50"
                >
                  {content.primaryCta || 'View sectors'}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={guidanceUrl}
                  onClick={handleGuidanceClick}
                  className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
                >
                  {content.secondaryCta || 'Request guidance'}
                </a>
              </div>
            </div>

            <aside className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur" aria-label={content.heroPanelTitle}>
              <h2 className="text-lg font-black text-white">{content.heroPanelTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {cycle.map((item) => (
                  <div key={item.code} className="rounded-lg border border-white/15 bg-white/10 p-4">
                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-black text-primary">
                      {item.code}
                    </div>
                    <h3 className="text-sm font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-cyan-50/75">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {metrics.map((item, index) => {
                  const { lead, body } = splitLead(item);
                  return (
                    <div key={`${item}-${index}`} className="rounded-lg border border-white/15 bg-white/10 p-3">
                      <strong className="block text-lg font-black text-white">{lead || item.split(' ')[0]}</strong>
                      <span className="mt-1 block text-xs font-semibold leading-4 text-cyan-50/70">{body || item.replace(item.split(' ')[0], '').trim()}</span>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>

        {content.sections?.[0] && (
          <section className="bg-slate-50 py-14 md:py-16">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-black uppercase text-cyan-700">{content.trustEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
                  {content.sections[0].title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{content.sections[0].body}</p>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {platformCards.map((item, index) => {
                  const Icon = platformIcons[index % platformIcons.length];
                  return (
                    <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading text-lg font-black text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section id="sectores" className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-black uppercase text-cyan-700">{content.sectorsEyebrow}</p>
              <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
                {content.sections?.[1]?.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">{content.sections?.[1]?.body}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {sectors.map((sector, index) => {
                const Icon = sectorIcons[index % sectorIcons.length];
                const target = getMarketingPagePath(sector.routeId, pageLang);
                return (
                  <Link
                    key={sector.routeId}
                    to={target}
                    className="group flex min-h-[23rem] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                    onClick={() => trackCorporateEvent('sector_hub_click', {
                      lang: pageLang,
                      page: 'industries-hub',
                      sector: sector.routeId,
                      label: sector.title,
                      target_url: target
                    })}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs font-black uppercase text-cyan-700">
                        {sector.label}
                      </span>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xs font-black text-white">
                        {sector.code}
                      </span>
                    </div>
                    <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-black leading-tight text-slate-950">{sector.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{sector.body}</p>
                    <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-600">
                      <strong className="text-primary">{content.focusLabel || 'Focus'}:</strong> {sector.focus}
                    </div>
                    <span className="mt-auto inline-flex items-center pt-5 text-sm font-black text-secondary">
                      {sector.cta || content.primaryCta}
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {content.sections?.[2] && (
          <section className="bg-slate-50 py-14 md:py-20">
            <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-xs font-black uppercase text-cyan-700">{content.flowEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
                  {content.sections[2].title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{content.sections[2].body}</p>
              </div>
              <div className="grid gap-3">
                {flowItems.map((item, index) => {
                  const Icon = flowIcons[index % flowIcons.length];
                  return (
                    <article key={item.title} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-[3rem_minmax(0,1fr)]">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-50 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-black text-slate-950">{item.title}</h3>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {content.sections?.[3] && (
          <section className="bg-primary py-14 text-white md:py-20">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-black uppercase text-cyan-100">{content.ecosystemEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight md:text-5xl">{content.sections[3].title}</h2>
                <p className="mt-4 text-base leading-8 text-cyan-50/75">{content.sections[3].body}</p>
              </div>
              <div className="mt-9 grid gap-3 lg:grid-cols-[repeat(5,minmax(0,1fr))]">
                {ecosystemItems.map((item, index) => (
                  <article key={item.title} className="rounded-lg border border-white/15 bg-white/10 p-5">
                    <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-primary">
                      {index + 1}
                    </div>
                    <h3 className="font-heading text-lg font-black text-white">{item.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-cyan-50/75">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-white py-14 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div>
                <p className="text-xs font-black uppercase text-cyan-700">{content.guideEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
                  {content.sections?.[4]?.title}
                </h2>
                <div className="mt-6 grid gap-3">
                  {guideItems.map((item) => {
                    const { lead, body } = splitLead(item);
                    return (
                      <article key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                        <h3 className="text-sm font-black text-slate-950">{lead || item}</h3>
                        {body && <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{body}</p>}
                      </article>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase text-cyan-700">{content.matrixEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-4xl">
                  {content.matrixTitle}
                </h2>
                <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="min-w-[760px]">
                    <div className="grid grid-cols-[0.85fr_1fr_1.1fr] bg-primary text-xs font-black uppercase text-white">
                      <div className="p-3">{content.matrixSector}</div>
                      <div className="border-l border-white/15 p-3">{content.matrixChallenge}</div>
                      <div className="border-l border-white/15 p-3">{content.matrixConnection}</div>
                    </div>
                    {sectors.map((sector) => (
                      <div key={`${sector.routeId}-matrix`} className="grid grid-cols-[0.85fr_1fr_1.1fr] border-t border-slate-100 text-sm">
                        <div className="p-3 font-black text-slate-900">{sector.title}</div>
                        <div className="border-l border-slate-100 p-3 font-semibold leading-6 text-slate-600">{sector.focus}</div>
                        <div className="border-l border-slate-100 p-3 font-semibold leading-6 text-slate-600">{sector.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <section className="bg-slate-50 py-14 md:py-20">
            <div className="container mx-auto px-6">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-black uppercase text-cyan-700">{content.faqEyebrow}</p>
                <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
                  {FAQ_TITLES[pageLang] || 'FAQ'}
                </h2>
              </div>
              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {faqs.map((faq) => (
                  <article key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-black text-slate-950">{faq.question}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-14 text-white md:py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mx-auto max-w-4xl font-heading text-3xl font-black leading-tight md:text-5xl">
              {content.cta?.title}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base font-semibold leading-8 text-cyan-50/80">
              {content.cta?.body}
            </p>
            <a
              href={guidanceUrl}
              onClick={handleGuidanceClick}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-4 text-sm font-black text-primary shadow-lg transition hover:bg-cyan-50"
            >
              {content.cta?.button || content.secondaryCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};
