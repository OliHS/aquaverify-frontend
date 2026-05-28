import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Download } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { CookieConsent } from '../CookieConsent';
import { ResourcesHubLanding } from '../ResourcesHubLanding';
import type { Language } from '../../utils/translations';
import { getPlatformSignupUrl } from '../../utils/platformLinks';
import { trackCorporateEvent } from '../../utils/corporateAnalytics';
import { getMarketingPagePath } from '../../utils/marketingRoutes.js';

type WhitepaperTone = 'cyan' | 'emerald' | 'indigo' | 'rose' | 'slate';

type MarkdownWhitepaperLink = {
  label: string;
  href: string;
};

type MarkdownWhitepaperBlock =
  | { type: 'heading'; level: number; text: string; id?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'unorderedList' | 'orderedList'; items: Array<{ text: string; checked?: boolean }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'html'; html: string };

type MarkdownWhitepaperContent = {
  audience?: string;
  region?: string;
  level?: string;
  readingTime?: string;
  blocks: MarkdownWhitepaperBlock[];
  primaryCta?: MarkdownWhitepaperLink | null;
  secondaryCta?: MarkdownWhitepaperLink | null;
};

type WhitepaperDeepDiveContent = {
  eyebrow?: string;
  title: string;
  intro: string;
  metrics?: Array<{ label: string; value: string; body: string; tone?: WhitepaperTone }>;
  comparisonTitle?: string;
  comparison?: Array<{ label: string; title: string; body: string; valuePercent?: number; tone?: WhitepaperTone }>;
  flowTitle?: string;
  flow?: Array<{ title: string; body: string }>;
  timelineTitle?: string;
  timeline?: Array<{ year: string; region: string; sector: string; body: string }>;
  sourceLabel?: string;
  note?: string;
};

type ResourceContentMeta = {
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: Array<{ src: string; alt: string; title?: string; body?: string; fit?: 'cover' | 'contain' }>;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageFit?: 'cover' | 'contain';
  heroVideo?: string;
  ogImage?: string;
  datasheetUrl?: string;
  datasheetLabel?: string;
  whitepaper?: WhitepaperDeepDiveContent;
  markdownWhitepaper?: MarkdownWhitepaperContent;
  path: string;
  title: string;
};

type ResourceMarketingPageDocumentProps = {
  page: any;
  content: any;
  pageLang: Language;
  breadcrumbs?: Array<{ name: string; path: string }>;
  relatedPages?: Array<{ id: string; title: string; description: string; path: string }>;
  showCookieConsent?: boolean;
};

const UI_LABELS: Record<Language, {
  relatedPages: string;
  nextStep: string;
  talkToAquaVerify: string;
  faqTitle: string;
  screenshotsTitle: string;
}> = {
  en: {
    relatedPages: 'Related resources',
    nextStep: 'Next step',
    talkToAquaVerify: 'Talk to AquaVerify',
    faqTitle: 'Frequently asked questions',
    screenshotsTitle: 'Resource visuals'
  },
  es: {
    relatedPages: 'Recursos relacionados',
    nextStep: 'Siguiente paso',
    talkToAquaVerify: 'Hablar con AquaVerify',
    faqTitle: 'Preguntas frecuentes',
    screenshotsTitle: 'Visuales del recurso'
  },
  fr: {
    relatedPages: 'Ressources associées',
    nextStep: 'Étape suivante',
    talkToAquaVerify: 'Parler à AquaVerify',
    faqTitle: 'Questions fréquentes',
    screenshotsTitle: 'Visuels de la ressource'
  },
  it: {
    relatedPages: 'Risorse correlate',
    nextStep: 'Passo successivo',
    talkToAquaVerify: 'Parla con AquaVerify',
    faqTitle: 'Domande frequenti',
    screenshotsTitle: 'Visual della risorsa'
  },
  ca: {
    relatedPages: 'Recursos relacionats',
    nextStep: 'Següent pas',
    talkToAquaVerify: 'Parlar amb AquaVerify',
    faqTitle: 'Preguntes freqüents',
    screenshotsTitle: 'Visuals del recurs'
  }
};

const whitepaperToneClasses: Record<WhitepaperTone, {
  card: string;
  eyebrow: string;
  value: string;
  bar: string;
  step: string;
}> = {
  cyan: {
    card: 'border-cyan-100 bg-cyan-50/70',
    eyebrow: 'text-cyan-700',
    value: 'text-cyan-900',
    bar: 'bg-cyan-500',
    step: 'bg-cyan-600 text-white'
  },
  emerald: {
    card: 'border-emerald-100 bg-emerald-50/70',
    eyebrow: 'text-emerald-700',
    value: 'text-emerald-900',
    bar: 'bg-emerald-500',
    step: 'bg-emerald-600 text-white'
  },
  indigo: {
    card: 'border-indigo-100 bg-indigo-50/70',
    eyebrow: 'text-indigo-700',
    value: 'text-indigo-900',
    bar: 'bg-indigo-500',
    step: 'bg-indigo-600 text-white'
  },
  rose: {
    card: 'border-rose-100 bg-rose-50/70',
    eyebrow: 'text-rose-700',
    value: 'text-rose-900',
    bar: 'bg-rose-500',
    step: 'bg-rose-600 text-white'
  },
  slate: {
    card: 'border-slate-200 bg-slate-50',
    eyebrow: 'text-slate-500',
    value: 'text-slate-900',
    bar: 'bg-slate-400',
    step: 'bg-slate-800 text-white'
  }
};

export function toPublicAssetUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function clampPercent(value: number | undefined) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Number(value)));
}

function stripSimpleMarkdown(value: string) {
  return String(value || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

function renderInlineMarkdown(value: string): React.ReactNode[] {
  const source = String(value || '');
  const pattern = /(\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source)) !== null) {
    if (match.index > cursor) nodes.push(source.slice(cursor, match.index));

    if (match[2] && match[3]) {
      nodes.push(
        <a key={`link-${match.index}`} href={match[3]} className="font-black text-primary underline decoration-cyan-200 underline-offset-4 transition hover:text-secondary">
          <strong>{stripSimpleMarkdown(match[2])}</strong>
        </a>
      );
    } else if (match[4] && match[5]) {
      nodes.push(
        <a key={`link-${match.index}`} href={match[5]} className="font-black text-primary underline decoration-cyan-200 underline-offset-4 transition hover:text-secondary">
          {stripSimpleMarkdown(match[4])}
        </a>
      );
    } else if (match[6]) {
      nodes.push(<strong key={`strong-${match.index}`} className="font-black text-slate-900">{match[6]}</strong>);
    } else if (match[7]) {
      nodes.push(<em key={`em-${match.index}`}>{match[7]}</em>);
    } else if (match[8]) {
      nodes.push(<code key={`code-${match.index}`} className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.92em] font-bold text-primary">{match[8]}</code>);
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < source.length) nodes.push(source.slice(cursor));
  return nodes;
}

function extractStandaloneMarkdownLinks(value: string): MarkdownWhitepaperLink[] {
  const source = String(value || '').trim();
  const pattern = /(\*\*)?\[([^\]]+)\]\(([^)]+)\)(\*\*)?/g;
  const links: MarkdownWhitepaperLink[] = [];
  const remainder = source.replace(pattern, (_match, _openBold, label, href) => {
    links.push({ label: stripSimpleMarkdown(label), href: String(href || '').trim() });
    return ' ';
  }).trim();

  return links.length >= 2 && !remainder ? links : [];
}

const MarkdownActionLinks: React.FC<{ links: MarkdownWhitepaperLink[] }> = ({ links }) => (
  <div className="flex flex-wrap gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/75 p-4">
    {links.map((link, index) => (
      <a
        key={`${link.href}-${link.label}`}
        href={link.href}
        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-black no-underline transition ${
          index === 0
            ? 'bg-secondary text-white shadow-lg shadow-cyan-500/20 hover:bg-primary'
            : 'border border-slate-200 bg-white text-primary hover:border-cyan-200 hover:bg-cyan-50'
        }`}
      >
        {link.label}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </a>
    ))}
  </div>
);

const MarkdownWhitepaperArticle: React.FC<{ whitepaper: MarkdownWhitepaperContent; pageLang: Language }> = ({
  whitepaper,
  pageLang
}) => {
  const metaItems = [
    { label: pageLang === 'en' ? 'Audience' : pageLang === 'fr' ? 'Audience' : pageLang === 'it' ? 'Pubblico' : pageLang === 'ca' ? 'Audiència' : 'Audiencia', value: whitepaper.audience },
    { label: pageLang === 'en' ? 'Region' : pageLang === 'fr' ? 'Région' : pageLang === 'it' ? 'Regione' : pageLang === 'ca' ? 'Regió' : 'Región', value: whitepaper.region },
    { label: pageLang === 'en' ? 'Reading time' : pageLang === 'fr' ? 'Temps de lecture' : pageLang === 'it' ? 'Tempo di lettura' : pageLang === 'ca' ? 'Temps de lectura' : 'Tiempo de lectura', value: whitepaper.readingTime },
    { label: pageLang === 'en' ? 'Resource' : pageLang === 'fr' ? 'Ressource' : pageLang === 'it' ? 'Risorsa' : pageLang === 'ca' ? 'Recurs' : 'Recurso', value: whitepaper.level || 'Whitepaper' }
  ].filter((item) => item.value);
  const ctaLinks = [whitepaper.primaryCta, whitepaper.secondaryCta].filter(Boolean) as MarkdownWhitepaperLink[];

  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
      {metaItems.length > 0 && (
        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/70 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {metaItems.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{item.label}</div>
              <div className="mt-2 text-sm font-black leading-6 text-primary">{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {ctaLinks.length > 0 && (
        <div className="border-b border-slate-100 p-5">
          <MarkdownActionLinks links={ctaLinks} />
        </div>
      )}

      <div className="space-y-7 p-6 md:p-8">
        {whitepaper.blocks.map((block, index) => {
          if (block.type === 'heading') {
            const Heading = block.level === 3 ? 'h3' : 'h2';
            return (
              <Heading
                key={`${block.id || block.text}-${index}`}
                id={block.id}
                className={block.level === 3
                  ? 'scroll-mt-28 font-heading text-xl font-black text-slate-950'
                  : 'scroll-mt-28 pt-3 font-heading text-3xl font-black leading-tight text-primary'}
              >
                {block.text}
              </Heading>
            );
          }

          if (block.type === 'paragraph') {
            const links = extractStandaloneMarkdownLinks(block.text);
            if (links.length) return <MarkdownActionLinks key={`actions-${index}`} links={links} />;
            return (
              <p key={`paragraph-${index}`} className="max-w-4xl text-base leading-8 text-slate-600">
                {renderInlineMarkdown(block.text)}
              </p>
            );
          }

          if (block.type === 'unorderedList' || block.type === 'orderedList') {
            const List = block.type === 'orderedList' ? 'ol' : 'ul';
            return (
              <List key={`list-${index}`} className={`grid gap-3 ${block.type === 'orderedList' ? 'list-decimal pl-6' : ''}`}>
                {block.items.map((item, itemIndex) => (
                  <li key={`${item.text}-${itemIndex}`} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
                    {block.type === 'unorderedList' && (
                      item.checked
                        ? <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                        : <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                    )}
                    <span>{renderInlineMarkdown(item.text)}</span>
                  </li>
                ))}
              </List>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={`table-${index}`} className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-cyan-50 text-[11px] font-black uppercase tracking-[0.12em] text-primary">
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header} className="px-4 py-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`} className="px-4 py-3 align-top font-semibold leading-6">
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          return (
            <div
              key={`html-${index}`}
              className="aqv-rich-html"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        })}
      </div>
    </article>
  );
};

const WhitepaperDeepDive: React.FC<{ content: WhitepaperDeepDiveContent }> = ({ content }) => {
  const metrics = content.metrics || [];
  const comparison = content.comparison || [];
  const flow = content.flow || [];
  const timeline = content.timeline || [];

  return (
    <article className="overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-slate-50 shadow-sm">
      <div className="border-b border-cyan-100/70 p-7">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{content.eyebrow || 'Whitepaper visual brief'}</div>
        <h2 className="mt-3 font-heading text-2xl font-black text-primary md:text-3xl">{content.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{content.intro}</p>
      </div>

      {metrics.length > 0 && (
        <div className="grid gap-4 p-7 md:grid-cols-3">
          {metrics.map((metric) => {
            const tone = whitepaperToneClasses[metric.tone || 'cyan'];
            return (
              <div key={`${metric.label}-${metric.value}`} className={`rounded-xl border p-5 ${tone.card}`}>
                <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${tone.eyebrow}`}>{metric.label}</div>
                <div className={`mt-3 font-heading text-2xl font-black leading-tight ${tone.value}`}>{metric.value}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{metric.body}</p>
              </div>
            );
          })}
        </div>
      )}

      {comparison.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.comparisonTitle && <h3 className="font-heading text-xl font-black text-primary">{content.comparisonTitle}</h3>}
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {comparison.map((item) => {
              const tone = whitepaperToneClasses[item.tone || 'cyan'];
              const percent = clampPercent(item.valuePercent);
              return (
                <div key={`${item.label}-${item.title}`} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${tone.eyebrow}`}>{item.label}</div>
                  <h4 className="mt-2 font-heading text-lg font-black text-slate-900">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                  {percent > 0 && (
                    <div className="mt-5">
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className={`h-2 rounded-full ${tone.bar}`} style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {flow.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.flowTitle && <h3 className="font-heading text-xl font-black text-primary">{content.flowTitle}</h3>}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {flow.map((step, index) => {
              const tone = whitepaperToneClasses[index % 2 === 0 ? 'cyan' : 'indigo'];
              return (
                <div key={`${step.title}-${index}`} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${tone.step}`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-black text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {timeline.length > 0 && (
        <div className="border-t border-cyan-100/70 p-7">
          {content.timelineTitle && <h3 className="font-heading text-xl font-black text-primary">{content.timelineTitle}</h3>}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {timeline.map((item) => (
              <div key={`${item.year}-${item.region}-${item.sector}`} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-white">{item.year}</span>
                  <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-cyan-800">{item.region}</span>
                </div>
                <h4 className="mt-3 font-heading text-base font-black text-slate-900">{item.sector}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(content.sourceLabel || content.note) && (
        <div className="border-t border-cyan-100/70 bg-white/70 p-7">
          {content.sourceLabel && <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{content.sourceLabel}</p>}
          {content.note && <p className="mt-2 text-sm leading-6 text-slate-500">{content.note}</p>}
        </div>
      )}
    </article>
  );
};

const secondaryTargetByCategory: Record<string, string> = {
  resources: 'products'
};

export const ResourceMarketingPageDocument: React.FC<ResourceMarketingPageDocumentProps> = ({
  page,
  content,
  pageLang,
  breadcrumbs = [],
  relatedPages = [],
  showCookieConsent = true
}) => {
  if (page.id === 'resources') {
    return (
      <ResourcesHubLanding
        content={content}
        pageLang={pageLang}
        showCookieConsent={showCookieConsent}
      />
    );
  }

  const contentMeta = content as ResourceContentMeta;
  const labels = UI_LABELS[pageLang] || UI_LABELS.en;
  const primaryUrl = getPlatformSignupUrl({
    intent: page.primaryIntent,
    page: page.id,
    category: page.category
  }, pageLang);
  const secondaryId = page.parentId || secondaryTargetByCategory[page.category] || 'products';
  const secondaryUrl = getMarketingPagePath(secondaryId, pageLang);
  const heroImageUrl = toPublicAssetUrl(contentMeta.heroImage);
  const heroVideoUrl = toPublicAssetUrl(contentMeta.heroVideo);
  const heroImageClass = contentMeta.heroImageFit === 'contain'
    ? 'h-full max-h-[420px] w-full object-contain'
    : 'h-full max-h-[420px] w-full object-cover';
  const heroVideoClass = 'h-full max-h-[420px] w-full object-contain';
  const heroImageFrameClass = contentMeta.heroImageFit === 'contain'
    ? 'overflow-visible'
    : 'overflow-hidden rounded-md border border-white/15 bg-white/5';
  const hasHeroMedia = Boolean(heroVideoUrl || heroImageUrl);
  const ogFallbackAlt = contentMeta.heroImageAlt || content.title;
  const datasheetUrl = toPublicAssetUrl(contentMeta.datasheetUrl);
  const galleryItems = (contentMeta.gallery || [])
    .map((item, sourceIndex) => ({
      ...item,
      sourceIndex,
      src: toPublicAssetUrl(item.src)
    }))
    .filter((item) => item.src && item.alt);

  const handleDatasheetClick = () => {
    trackCorporateEvent('datasheet_click', {
      lang: pageLang,
      page: page.id,
      category: page.category,
      label: contentMeta.datasheetLabel || 'Datasheet',
      target_url: datasheetUrl,
      path: content.path
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
      <Header />
      <main className="flex-grow pt-20">
        <section className="aq-page-hero">
          <div className={`container mx-auto grid gap-10 px-6 py-20 md:py-24 ${hasHeroMedia ? 'lg:grid-cols-[1fr_0.82fr] lg:items-center' : ''}`}>
            <div className="max-w-4xl">
              {breadcrumbs.length > 1 && (
                <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs font-bold text-slate-500">
                  {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.path}>
                        {isLast ? (
                          <span className="max-w-[18rem] truncate text-primary" aria-current="page">{crumb.name}</span>
                        ) : (
                          <Link to={crumb.path} className="max-w-[12rem] truncate transition hover:text-primary">{crumb.name}</Link>
                        )}
                        {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" aria-hidden="true" />}
                      </React.Fragment>
                    );
                  })}
                </nav>
              )}
              <div className="aq-hero-eyebrow mb-5">{content.eyebrow || page.category}</div>
              <h1 className="aq-gradient-title max-w-4xl font-heading text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
              <p className="aq-hero-copy mt-6 max-w-3xl text-lg leading-8">{content.description}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={primaryUrl} className="aq-cta-primary">
                  {content.primaryCta || 'Contact AquaVerify'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link to={secondaryUrl} className="aq-cta-secondary">
                  {content.secondaryCta || 'Explore AquaVerify'}
                </Link>
                {datasheetUrl && (
                  <a
                    href={datasheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleDatasheetClick}
                    className="aq-cta-secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {contentMeta.datasheetLabel || 'Datasheet'}
                  </a>
                )}
              </div>
            </div>
            {heroVideoUrl ? (
              <div className="overflow-visible">
                <video
                  className={heroVideoClass}
                  src={heroVideoUrl}
                  poster={heroImageUrl || undefined}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={ogFallbackAlt}
                />
              </div>
            ) : heroImageUrl && (
              <div className={heroImageFrameClass}>
                <img
                  src={heroImageUrl}
                  alt={ogFallbackAlt}
                  className={heroImageClass}
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="space-y-8">
              {contentMeta.markdownWhitepaper && (
                <MarkdownWhitepaperArticle whitepaper={contentMeta.markdownWhitepaper} pageLang={pageLang} />
              )}

              {(content.sections || []).map((section: any, index: number) => (
                <article key={`${section.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-slate-600">{section.body}</p>
                  {section.bullets?.length > 0 && (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet: string, bulletIndex: number) => (
                        <li key={`${bullet}-${bulletIndex}`} className="flex gap-3 text-sm font-semibold text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              {contentMeta.whitepaper && (
                <WhitepaperDeepDive content={contentMeta.whitepaper} />
              )}

              {galleryItems.length > 0 && (
                <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{labels.screenshotsTitle}</h2>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {galleryItems.map((item) => (
                      <figure key={item.src} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        <div className="aspect-[16/10] bg-white">
                          <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            className={`h-full w-full ${item.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
                          />
                        </div>
                        {(item.title || item.body) && (
                          <figcaption className="p-4">
                            {item.title && <h3 className="font-heading text-base font-black text-slate-900">{item.title}</h3>}
                            {item.body && <p className="mt-1 text-sm leading-6 text-slate-600">{item.body}</p>}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </article>
              )}

              {contentMeta.faqs && contentMeta.faqs.length > 0 && (
                <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <h2 className="font-heading text-2xl font-black text-primary">{labels.faqTitle}</h2>
                  <div className="mt-6 divide-y divide-slate-200">
                    {contentMeta.faqs.map((faq, index) => (
                      <div key={`${faq.question}-${index}`} className="py-5 first:pt-0 last:pb-0">
                        <h3 className="font-heading text-lg font-black text-slate-900">{faq.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        {relatedPages.length > 0 && (
          <section className="bg-surface py-16">
            <div className="container mx-auto px-6">
              <h2 className="font-heading text-3xl font-black text-primary">{labels.relatedPages}</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {relatedPages.map((related) => (
                  <Link
                    key={related.id}
                    to={related.path}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="font-heading text-lg font-black text-slate-900">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{related.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-primary py-14 text-white">
          <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">{labels.nextStep}</div>
              <h2 className="mt-2 font-heading text-3xl font-black">{labels.talkToAquaVerify}</h2>
            </div>
            <a
              href={primaryUrl}
              className="inline-flex items-center rounded bg-white px-6 py-3 text-sm font-black text-primary transition hover:bg-secondary hover:text-white"
            >
              {content.primaryCta || 'Contact AquaVerify'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      {showCookieConsent && <CookieConsent />}
    </div>
  );
};

export default ResourceMarketingPageDocument;
