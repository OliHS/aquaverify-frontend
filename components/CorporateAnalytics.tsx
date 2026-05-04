import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { isPlatformUrl, trackCorporateEvent } from '../utils/corporateAnalytics';

function getTextLabel(element: Element) {
  return (element.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

function getPlatformLinkPayload(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href);
    return {
      target_url: url.toString(),
      target_path: url.pathname,
      intent: url.searchParams.get('intent'),
      page: url.searchParams.get('page'),
      category: url.searchParams.get('category'),
      product: url.searchParams.get('product'),
      country: url.searchParams.get('country'),
      label: getTextLabel(anchor)
    };
  } catch {
    return {
      target_url: anchor.href,
      label: getTextLabel(anchor)
    };
  }
}

export const CorporateAnalytics: React.FC = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    trackCorporateEvent('page_view', {
      lang,
      path: location.pathname,
      hash: location.hash,
      title: document.title
    });
  }, [lang, location.hash, location.pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href || !isPlatformUrl(anchor.href)) return;

      const url = new URL(anchor.href);
      if (!['/signup', '/login'].includes(url.pathname)) return;

      trackCorporateEvent('platform_link_click', getPlatformLinkPayload(anchor));
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
};
