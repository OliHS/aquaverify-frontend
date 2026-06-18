import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { Language } from '../utils/translations';
import { getGlossaryHubContent, getIndustryGlossaryTerms } from '../utils/glossaryContent.js';

type Props = {
  industryId: string;
  lang: Language;
  limit?: number;
};

const LABELS: Record<Language, {
  commonTitle: string;
  title: string;
  intro: string;
  cta: string;
  relevance: string;
}> = {
  en: {
    commonTitle: 'Common concepts in water control',
    title: 'Key concepts for this sector',
    intro: 'Glossary terms that help connect the sector workflow with sampling, microbiology, traceability and reporting.',
    cta: 'Explore the technical glossary',
    relevance: 'Sector relevance'
  },
  es: {
    commonTitle: 'Conceptos comunes en el control del agua',
    title: 'Conceptos clave para este sector',
    intro: 'Conceptos del glosario que conectan el flujo sectorial con muestreo, microbiología, trazabilidad y reporting.',
    cta: 'Explorar el glosario técnico',
    relevance: 'Relevancia sectorial'
  },
  fr: {
    commonTitle: 'Concepts communs du contrôle de l’eau',
    title: 'Concepts clés pour ce secteur',
    intro: 'Termes du glossaire qui relient le flux sectoriel au prélèvement, à la microbiologie, à la traçabilité et au reporting.',
    cta: 'Explorer le glossaire technique',
    relevance: 'Pertinence sectorielle'
  },
  it: {
    commonTitle: 'Concetti comuni nel controllo dell’acqua',
    title: 'Concetti chiave per questo settore',
    intro: 'Termini del glossario che collegano il workflow di settore con campionamento, microbiologia, tracciabilità e reporting.',
    cta: 'Esplora il glossario tecnico',
    relevance: 'Rilevanza per il settore'
  },
  ca: {
    commonTitle: 'Conceptes comuns en el control de l’aigua',
    title: 'Conceptes clau per a aquest sector',
    intro: 'Conceptes del glossari que connecten el flux sectorial amb mostreig, microbiologia, traçabilitat i informes.',
    cta: 'Explorar el glossari tècnic',
    relevance: 'Rellevància sectorial'
  }
};

export const IndustryGlossaryTerms: React.FC<Props> = ({ industryId, lang, limit }) => {
  const labels = LABELS[lang] || LABELS.en;
  const glossary = getGlossaryHubContent(lang);
  const terms = getIndustryGlossaryTerms(industryId, lang, limit || (industryId === 'industries-hub' ? 8 : 10));

  if (!terms.length) return null;

  return (
    <section id="conceptos-glosario" className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">{glossary.glossaryLabel}</p>
            <h2 className="mt-3 font-heading text-3xl font-black leading-tight text-primary md:text-5xl">
              {industryId === 'industries-hub' ? labels.commonTitle : labels.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{labels.intro}</p>
          </div>
          <Link to={glossary.path} className="aq-cta-secondary w-fit">
            {labels.cta}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {terms.map((term) => (
            <article key={term.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-primary">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-black leading-tight text-primary">
                <Link to={term.href}>{term.term}</Link>
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{term.definition}</p>
              <p className="mt-4 text-[11px] font-black uppercase tracking-[0.12em] text-cyan-700">{labels.relevance}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{term.relevance}</p>
              <Link to={term.href} className="mt-4 inline-flex items-center text-sm font-black text-secondary">
                {glossary.termCta}
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryGlossaryTerms;
