import React from 'react';
import { ArrowRight, ClipboardCheck, ShieldCheck } from 'lucide-react';
import type { Language } from '../../utils/translations';
import { trackCorporateEvent } from '../../utils/corporateAnalytics';
import workflowAdvisorQualityStatus from '../../generated/workflow-advisor-quality-status.json';
import {
  getWorkflowAdvisorHomeCta,
  isWorkflowAdvisorHomeCtaEnabled,
  isWorkflowAdvisorQualityGateRequired,
  resolveWorkflowAdvisorHomeCtaVisibility
} from '../../utils/workflowAdvisorHomeCta.js';

type Props = {
  lang: Language;
};

export const HomeWorkflowAdvisorCta: React.FC<Props> = ({ lang }) => {
  const cta = getWorkflowAdvisorHomeCta(lang);
  const canShow = resolveWorkflowAdvisorHomeCtaVisibility({
    enabled: isWorkflowAdvisorHomeCtaEnabled(),
    qualityGateRequired: isWorkflowAdvisorQualityGateRequired(),
    qualityPassed: Boolean(workflowAdvisorQualityStatus?.passed)
  });

  if (!canShow) return null;

  const titleId = `home-workflow-advisor-title-${cta.lang}`;

  const trackClick = () => {
    trackCorporateEvent(cta.event, {
      lang: cta.lang,
      source_page: 'home',
      target: 'workflow-advisor'
    });
  };

  return (
    <section
      aria-labelledby={titleId}
      data-home-workflow-advisor-cta
      className="mt-6 max-w-4xl rounded-lg border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/60 backdrop-blur md:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
            <ClipboardCheck aria-hidden="true" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">{cta.eyebrow}</p>
            <h2 id={titleId} className="mt-1 font-heading text-2xl font-black leading-tight text-primary md:text-3xl">
              {cta.title}
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-600">{cta.body}</p>
            <p className="mt-3 inline-flex items-center text-xs font-black text-slate-500">
              <ShieldCheck aria-hidden="true" className="mr-2 h-4 w-4 text-cyan-700" />
              {cta.microcopy}
            </p>
          </div>
        </div>
        <a
          href={cta.href}
          data-event={cta.event}
          onClick={trackClick}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-black text-white shadow-lg shadow-primary/20 transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500"
        >
          {cta.button}
          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};
