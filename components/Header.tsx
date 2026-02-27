import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../utils/translations';
import { EditableText } from './admin/EditableText';
import logoSrc from '../src/assets/logo.png';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Handle header background style
      setIsScrolled(window.scrollY > 20);

      // Handle active section highlighting (Scroll Spy)
      const sections = ['solutions', 'products', 'platform', 'distributors', 'oem'];
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
    const isActive = activeSection === id;
    const baseClasses = isMobile
      ? "text-base font-medium transition-colors block py-2"
      : "text-sm font-medium transition-colors cursor-pointer";

    const colorClasses = isActive
      ? "text-primary font-bold"
      : "text-gray-600 hover:text-primary";

    return `${baseClasses} ${colorClasses}`;
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-white py-5'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Logo Image */}
          <img
            src={logoSrc}
            alt="AquaVerify Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-heading font-bold text-xl tracking-tight text-primary">
            Aqua<span className="text-secondary">Verify</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className={getNavLinkClasses('solutions')}><EditableText as="span" sectionId="nav" field="solutions" fallback={t.nav.solutions} /></a>
          <a href="#products" onClick={(e) => handleSmoothScroll(e, 'products')} className={getNavLinkClasses('products')}><EditableText as="span" sectionId="nav" field="products" fallback={t.nav.products} /></a>
          <a href="#platform" onClick={(e) => handleSmoothScroll(e, 'platform')} className={getNavLinkClasses('platform')}><EditableText as="span" sectionId="nav" field="platform" fallback={t.nav.platform} /></a>
          <a href="#distributors" onClick={(e) => handleSmoothScroll(e, 'distributors')} className={getNavLinkClasses('distributors')}><EditableText as="span" sectionId="nav" field="distributors" fallback={t.nav.distributors} /></a>
          <a href="#oem" onClick={(e) => handleSmoothScroll(e, 'oem')} className={getNavLinkClasses('oem')}><EditableText as="span" sectionId="nav" field="oem" fallback={t.nav.oem} /></a>
        </nav>

        {/* Desktop CTA & Lang Switcher */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative group mr-2">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors text-xs font-bold uppercase">
              <Globe size={16} />
              <span>{lang}</span>
            </button>
            <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
              <div className="bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden py-1 w-24">
                {(['en', 'es', 'fr', 'it'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`block w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-gray-50 ${lang === l ? 'text-secondary bg-blue-50' : 'text-gray-600'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="text-sm font-semibold text-primary hover:text-secondary transition-colors">
            <EditableText as="span" sectionId="nav" field="login" fallback={t.nav.login} />
          </button>
          <button className="bg-primary text-white px-5 py-2 rounded shadow-lg hover:bg-opacity-90 transition-all transform hover:-translate-y-0.5 text-sm font-semibold">
            <EditableText as="span" sectionId="nav" field="demo" fallback={t.nav.demo} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4 h-screen sm:h-auto">
          <div className="flex justify-end space-x-4 mb-2">
            {(['en', 'es', 'fr', 'it'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs font-bold uppercase px-2 py-1 rounded ${lang === l ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="#solutions" onClick={(e) => handleSmoothScroll(e, 'solutions')} className={getNavLinkClasses('solutions', true)}><EditableText as="span" sectionId="nav" field="solutions" fallback={t.nav.solutions} /></a>
          <a href="#products" onClick={(e) => handleSmoothScroll(e, 'products')} className={getNavLinkClasses('products', true)}><EditableText as="span" sectionId="nav" field="products" fallback={t.nav.products} /></a>
          <a href="#platform" onClick={(e) => handleSmoothScroll(e, 'platform')} className={getNavLinkClasses('platform', true)}><EditableText as="span" sectionId="nav" field="platform" fallback={t.nav.platform} /></a>
          <a href="#distributors" onClick={(e) => handleSmoothScroll(e, 'distributors')} className={getNavLinkClasses('distributors', true)}><EditableText as="span" sectionId="nav" field="distributors" fallback={t.nav.distributors} /></a>
          <a href="#oem" onClick={(e) => handleSmoothScroll(e, 'oem')} className={getNavLinkClasses('oem', true)}><EditableText as="span" sectionId="nav" field="oem" fallback={t.nav.oem} /></a>
          <a href="#distributors" onClick={(e) => handleSmoothScroll(e, 'distributors')} className={getNavLinkClasses('distributors', true)}>{t.nav.distributors}</a>
          <a href="#oem" onClick={(e) => handleSmoothScroll(e, 'oem')} className={getNavLinkClasses('oem', true)}>{t.nav.oem}</a>
          <hr className="border-gray-100 my-2" />
          <button className="text-primary font-semibold text-left py-2">{t.nav.login}</button>
          <button className="bg-primary text-white px-4 py-3 rounded text-center font-semibold w-full">
            {t.nav.demo}
          </button>
        </div>
      )}
    </header>
  );
};