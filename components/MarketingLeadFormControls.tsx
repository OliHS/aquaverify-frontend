import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getPlatformLegalUrl } from '../utils/platformLinks';
import type { Language } from '../utils/translations';
import type { MarketingLeadCaptureStatus, MarketingLeadFormCopy } from '../utils/marketingLeadCapture';

type Props = {
  lang: Language;
  submitLabel: string;
  privacyNote?: string;
  status: MarketingLeadCaptureStatus;
  copy: MarketingLeadFormCopy;
};

export const MarketingLeadFormControls: React.FC<Props> = ({ lang, submitLabel, privacyNote, status, copy }) => {
  const sending = status === 'sending';
  const success = status === 'success';

  return (
    <>
      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 md:col-span-2">
        <input
          type="checkbox"
          name="contact_consent"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
        />
        <span>
          {copy.contactConsent}{' '}
          <a
            href={getPlatformLegalUrl('privacy', lang)}
            target="_blank"
            rel="noreferrer"
            className="font-black text-cyan-700 underline decoration-cyan-300 underline-offset-2 hover:text-cyan-900"
          >
            {copy.privacyPolicy}
          </a>.
        </span>
      </label>

      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="md:col-span-2" aria-live="polite">
        <button
          type="submit"
          disabled={sending || success}
          aria-busy={sending}
          className="aq-cta-primary w-full py-4 disabled:cursor-wait disabled:opacity-60 md:w-auto"
        >
          {sending ? copy.sending : submitLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
        {privacyNote ? <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">{privacyNote}</p> : null}
        {status === 'error' ? <p role="alert" className="mt-3 text-sm font-bold text-red-700">{copy.error}</p> : null}
        {success ? <p className="mt-3 text-sm font-bold text-emerald-700">{copy.success}</p> : null}
      </div>
    </>
  );
};
