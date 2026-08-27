import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../utils/translations';
import { EditableLinkWrapper } from './admin/EditableLinkWrapper';
import { usePageContent } from '../context/PageContentContext';
import { getLanguagePath } from '../utils/seo';
import { findMarketingRouteByPath, getMarketingPagePath } from '../utils/marketingRoutes.js';
import {
  LEGACY_PLATFORM_LOGIN_URLS,
  LEGACY_PLATFORM_SIGNUP_URLS,
  getPlatformLoginUrl,
  getPlatformSignupUrl
} from '../utils/platformLinks';
import { trackCorporateEvent } from '../utils/corporateAnalytics';

const logoSrc = '/images/logo-mark-160.png';

const NAV_ROUTE_GROUPS: Record<string, string[]> = {
  tools: [
    'aquatools',
    'aquatool-dilution',
    'aquatool-molarity',
    'aquatool-unit-converter',
    'aquatool-rpm-rcf',
    'aquatool-cfu',
    'aquatool-recovery-rpd',
    'aquatool-hardness-alkalinity',
    'aquatool-chemical-species'
  ],
  solutions: [
    'industries-hub',
    'water-quality-control',
    'water-testing-labs',
    'municipal-water-testing',
    'food-beverage-water-quality',
    'industrial-process-water',
    'agriculture-water',
    'pharma-cosmetics-water',
    'hospitality-tourism-water',
    'facility-water-risk'
  ],
  products: ['products', 'enumera', 'indica', 'standard-kits', 'lab-essentials'],
  platform: ['platform', 'saas-biotech'],
  resources: [
    'resources',
    'glossary',
    'iso-10705-2',
    'epa-1602',
    'coliphages-indicators',
    'presence-vs-enumeration',
    'sample-traceability',
    'distributor-checklist'
  ],
  distributors: ['distributors'],
  oem: ['oem']
};

const FREE_TOOLS_LABELS: Record<Language, string> = {
  en: 'Tools',
  es: 'Herramientas',
  fr: 'Outils',
  it: 'Strumenti',
  ca: 'Eines'
};

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { isEditing } = usePageContent();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const platformLoginUrl = getPlatformLoginUrl(lang);
  const platformQuoteUrl = getPlatformSignupUrl({ intent: 'quote', page: 'header' }, lang);
  const homePaths = ['/', '/en', '/es', '/fr', '/it', '/ca'];
  const isHomePath = homePaths.includes(location.pathname.replace(/\/+$/, '') || '/');
  const marketingMatch = findMarketingRouteByPath(location.pathname);
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const activeRouteNavId = (() => {
    const explicitMatch = Object.entries(NAV_ROUTE_GROUPS)
      .find(([, routeIds]) => marketingMatch?.id && routeIds.includes(marketingMatch.id))?.[0] || '';
    if (explicitMatch) return explicitMatch;

    const routeLang = marketingMatch?.lang || lang;
    const productBase = getMarketingPagePath('products', routeLang).replace(/\/+$/, '') || '/';
    if (normalizedPath.startsWith(`${productBase}/`)) return 'products';
    return '';
  })();
  const navHrefs = {
    solutions: getMarketingPagePath('industries-hub', lang),
    products: getMarketingPagePath('products', lang),
    platform: getMarketingPagePath('platform', lang),
    resources: getMarketingPagePath('resources', lang),
    tools: getMarketingPagePath('aquatools', lang),
    distributors: getMarketingPagePath('distributors', lang),
    oem: getMarketingPagePath('oem', lang)
  };
  const navItems = [
    { id: 'products', label: t.nav.products, field: 'link_products', legacyFallbacks: ['#', '#products'] },
    { id: 'platform', label: t.nav.platform, field: 'link_platform', legacyFallbacks: ['#', '#platform', '#saas'] },
    { id: 'solutions', label: t.nav.solutions, field: 'link_solutions', legacyFallbacks: ['#', '#solutions'] },
    { id: 'tools', label: FREE_TOOLS_LABELS[lang], field: 'link_tools', legacyFallbacks: ['#', '#tools'] },
    { id: 'distributors', label: t.nav.distributors, field: 'link_distributors', legacyFallbacks: ['#', '#distributors'] },
    { id: 'oem', label: t.nav.oem, field: 'link_oem', legacyFallbacks: ['#', '#oem'] },
    { id: 'resources', label: t.nav.resources, field: 'link_resources', legacyFallbacks: ['#', '#resources'] }
  ] as const;
  const navButtonBase = 'inline-flex items-center justify-center gap-2.5 rounded-full px-[18px] py-[13px] text-sm font-black leading-none border transition duration-200 hover:-translate-y-0.5';
  const signInButtonClasses = `${navButtonBase} border-slate-200 bg-white text-primary hover:border-cyan-200 hover:bg-cyan-50`;
  const quoteButtonClasses = `${navButtonBase} border-transparent bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary whitespace-nowrap`;

  useEffect(() => {
    const handleScroll = () => {
      // Handle header background style
      setIsScrolled(window.scrollY > 20);

      // Handle active section highlighting (Scroll Spy)
      const sections = ['products', 'platform', 'solutions', 'distributors', 'oem', 'resources'];
      const scrollPosition = window.scrollY + 150;

      let current = '';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && !href.startsWith('#')) {
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin === window.location.origin) {
          e.preventDefault();
          setIsMenuOpen(false);
          navigate(`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`);
        }
      } catch {
        // Keep the native browser behavior for malformed or unsupported URLs.
      }
      setIsMenuOpen(false);
      return;
    }

    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(id);
    }

    setIsMenuOpen(false);
  };

  const getNavLinkClasses = (id: string, isMobile = false) => {
    const isActive = isHomePath ? activeSection === id : activeRouteNavId === id;
    const baseClasses = isMobile
      ? "text-base font-medium transition-colors block py-2"
      : "text-sm font-medium transition-colors cursor-pointer";

    const colorClasses = isActive
      ? "text-primary font-bold"
      : "text-gray-600 hover:text-primary";

    return `${baseClasses} ${colorClasses}`;
  };

  const handleLanguageChange = (nextLang: Language) => {
    if (nextLang !== lang) {
      trackCorporateEvent('language_switch', {
        from_lang: lang,
        to_lang: nextLang,
        path: location.pathname
      });
    }
    setLang(nextLang);
    if (!isEditing) {
      const marketingMatch = findMarketingRouteByPath(location.pathname);
      const nextPath = marketingMatch?.translations?.[nextLang] || getLanguagePath(nextLang);
      navigate(`${nextPath}${location.hash || ''}`);
    }
  };

  const handleLogoClick = () => {
    if (isHomePath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate(lang === 'en' ? '/' : getLanguagePath(lang));
  };

  return (
    <header
      className={`${isEditing ? 'absolute top-0' : 'fixed'} w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-white py-5'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-6 xl:grid xl:grid-cols-[minmax(205px,0.82fr)_minmax(0,auto)_minmax(290px,0.9fr)] xl:gap-6">
        {/* Logo */}
        <div
          className="group flex shrink-0 cursor-pointer items-center space-x-3 xl:justify-self-start"
          onClick={handleLogoClick}
        >
          {/* Logo Image */}
          <img
            src={logoSrc}
            alt="AquaVerify Logo"
            width={32}
            height={40}
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading font-bold text-xl tracking-tight text-primary">
            Aqua<span className="text-secondary">Verify</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden min-w-0 items-center justify-center gap-4 xl:flex 2xl:gap-6">
          {navItems.map((item) => (
            <EditableLinkWrapper
              key={item.id}
              sectionId="nav"
              field={item.field}
              fallback={navHrefs[item.id]}
              legacyFallbacks={[...item.legacyFallbacks]}
            >
              <a
                href={navHrefs[item.id]}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={`${getNavLinkClasses(item.id)} whitespace-nowrap text-center leading-5`}
              >
                {item.label}
              </a>
            </EditableLinkWrapper>
          ))}
        </nav>

        {/* Desktop CTA & Lang Switcher */}
        <div className="hidden min-w-0 items-center justify-end gap-3 xl:flex xl:justify-self-end">
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors text-xs font-bold uppercase">
              <Globe size={16} />
              <span>{lang}</span>
            </button>
            <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden py-1 w-24">
                {(['en', 'es', 'fr', 'it', 'ca'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    className={`block w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-gray-50 ${lang === l ? 'text-secondary bg-blue-50' : 'text-gray-600'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <EditableLinkWrapper sectionId="nav" field="url_login" fallback={platformLoginUrl} legacyFallbacks={LEGACY_PLATFORM_LOGIN_URLS}>
            <a href={platformLoginUrl} className={signInButtonClasses}>
              Sign in
            </a>
          </EditableLinkWrapper>
          <EditableLinkWrapper sectionId="nav" field="url_quote" fallback={platformQuoteUrl} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}>
            <a href={platformQuoteUrl} className={quoteButtonClasses}>
              {t.nav.quote}
            </a>
          </EditableLinkWrapper>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-gray-600 focus:outline-none p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4 h-screen sm:h-auto">
          <div className="flex justify-end space-x-4 mb-2">
            {(['en', 'es', 'fr', 'it', 'ca'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`text-xs font-bold uppercase px-2 py-1 rounded ${lang === l ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {l}
              </button>
            ))}
          </div>
          {navItems.map((item) => (
            <EditableLinkWrapper
              key={item.id}
              sectionId="nav"
              field={item.field}
              fallback={navHrefs[item.id]}
              legacyFallbacks={[...item.legacyFallbacks]}
            >
              <a
                href={navHrefs[item.id]}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className={getNavLinkClasses(item.id, true)}
              >
                {item.label}
              </a>
            </EditableLinkWrapper>
          ))}
          <hr className="border-gray-100 my-2" />
          <EditableLinkWrapper sectionId="nav" field="url_login" fallback={platformLoginUrl} legacyFallbacks={LEGACY_PLATFORM_LOGIN_URLS}>
            <a href={platformLoginUrl} onClick={() => setIsMenuOpen(false)} className={`${signInButtonClasses} w-full`}>
              Sign in
            </a>
          </EditableLinkWrapper>
          <EditableLinkWrapper sectionId="nav" field="url_quote" fallback={platformQuoteUrl} legacyFallbacks={LEGACY_PLATFORM_SIGNUP_URLS}>
            <a href={platformQuoteUrl} onClick={() => setIsMenuOpen(false)} className={`${quoteButtonClasses} w-full`}>
              {t.nav.quote}
            </a>
          </EditableLinkWrapper>
        </div>
      )}
    </header>
  );
};
