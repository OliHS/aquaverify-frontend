import React from 'react';
import { GlossaryLanding } from '../GlossaryLanding';
import type { Language } from '../../utils/translations';

type GlossaryMarketingPageDocumentProps = {
  page: {
    glossaryTermId?: string | number;
  };
  content: {
    title: string;
    description: string;
    path: string;
  };
  pageLang: Language;
  showCookieConsent?: boolean;
};

export const GlossaryMarketingPageDocument: React.FC<GlossaryMarketingPageDocumentProps> = ({
  page,
  content,
  pageLang,
  showCookieConsent = true
}) => (
  <GlossaryLanding
    content={content}
    pageLang={pageLang}
    termId={page.glossaryTermId}
    showCookieConsent={showCookieConsent}
  />
);

export default GlossaryMarketingPageDocument;
