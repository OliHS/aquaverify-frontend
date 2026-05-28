import React from 'react';
import type { Language } from '../../utils/translations';
import { mergeMarketingContent } from '../../utils/marketingPageOverrides.js';
import { MARKETING_PAGES } from '../../utils/marketingPages.js';
import { MarketingPageDocument } from './MarketingPageDocument';

export const MarketingPagePreview: React.FC<{
  pageId: string;
  pageLang: Language;
  contentOverride?: Record<string, unknown> | null;
  showCookieConsent?: boolean;
  isEditing?: boolean;
  onTextChange?: (path: string, value: string) => void;
  onImageChange?: (path: string, value: string) => void;
  uploadImage?: (file: File) => Promise<string | null>;
}> = ({
  pageId,
  pageLang,
  contentOverride = null,
  showCookieConsent = false,
  isEditing = false,
  onTextChange,
  onImageChange,
  uploadImage
}) => {
  const page = (MARKETING_PAGES as any[]).find((item) => item.id === pageId);
  const baseContent = page?.translations?.[pageLang];

  if (!page || !baseContent) {
    return <div className="p-8 text-sm font-semibold text-slate-500">Preview not available.</div>;
  }

  const content = mergeMarketingContent(baseContent, contentOverride);

  return (
    <MarketingPageDocument
      page={page}
      content={content}
      pageLang={pageLang}
      showCookieConsent={showCookieConsent}
      isEditing={isEditing}
      onTextChange={onTextChange}
      onImageChange={onImageChange}
      uploadImage={uploadImage}
    />
  );
};
