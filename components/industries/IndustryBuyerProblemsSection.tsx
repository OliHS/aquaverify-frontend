import React from 'react';
import { ArrowRight, BookOpenCheck, FlaskConical, Link2 } from 'lucide-react';
import type { Language } from '../../utils/translations';
import { resolveIndustryBuyerProblemLinks } from '../../utils/industryBuyerProblemLinks';
import { getWorkflowAdvisorPath } from '../../utils/workflowAdvisorContent';

export type IndustryBuyerProblem = {
  id: string;
  question: string;
  answer: string;
};

export type IndustryBuyerProblemsContent = {
  industryId?: string;
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  problems: IndustryBuyerProblem[];
  relatedResourceIds?: string[];
  relatedGlossaryTermIds?: string[];
  relatedToolIds?: string[];
  dateModified?: string;
};

const PROBLEM_CTA: Record<Language, string> = {
  en: 'Assess this problem',
  es: 'Analizar este problema',
  fr: 'Analyser ce probleme',
  it: 'Analizza questo problema',
  ca: 'Analitzar aquest problema'
};

type Props = {
  buyerProblems?: IndustryBuyerProblemsContent | null;
  pageLang: Language;
  ctaHref?: string;
};

const LINK_ICONS = {
  resource: BookOpenCheck,
  glossary: Link2,
  tool: FlaskConical
};

export const IndustryBuyerProblemsSection: React.FC<Props> = ({
  buyerProblems,
  pageLang,
  ctaHref = '#diagnostico'
}) => {
  const problems = Array.isArray(buyerProblems?.problems) ? buyerProblems.problems : [];
  if (!buyerProblems || problems.length !== 5) return null;

  const links = resolveIndustryBuyerProblemLinks(buyerProblems, pageLang);
  const advisorPath = getWorkflowAdvisorPath(pageLang);

  return (
    <section id="problema" className="scroll-mt-28 bg-slate-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-cyan-100 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-700">
            {buyerProblems.eyebrow}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            {buyerProblems.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
            {buyerProblems.intro}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {problems.map((problem, index) => (
            <article
              key={problem.id}
              data-problem-id={problem.id}
              className="flex min-h-[22rem] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-sm font-black text-cyan-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-heading text-lg font-black leading-snug text-slate-950">
                {problem.question}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {problem.answer}
              </p>
              {buyerProblems.industryId ? (
                <a
                  href={`${advisorPath}?sector=${encodeURIComponent(buyerProblems.industryId)}&problem=${encodeURIComponent(problem.id)}&source=industry-problem`}
                  className="mt-auto inline-flex items-center pt-4 text-sm font-black text-cyan-700 hover:text-primary"
                >
                  {PROBLEM_CTA[pageLang] || PROBLEM_CTA.en}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {links.length ? (
            <div className="grid flex-1 gap-3 md:grid-cols-3">
              {links.map((link) => {
                const Icon = LINK_ICONS[link.kind as keyof typeof LINK_ICONS] || Link2;
                return (
                  <a
                    key={`${link.kind}-${link.id}`}
                    href={link.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm outline-none transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md focus-visible:ring-4 focus-visible:ring-cyan-100"
                  >
                    <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-cyan-700">
                      <Icon className="h-4 w-4" />
                      {link.kindLabel}
                    </span>
                    <span className="mt-2 block text-sm font-black leading-6 text-slate-900 group-hover:text-primary">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          ) : null}
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-lg shadow-cyan-900/10 outline-none transition hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-cyan-100"
          >
            {buyerProblems.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default IndustryBuyerProblemsSection;
