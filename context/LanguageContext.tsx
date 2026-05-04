import React, { createContext, useCallback, useState, useContext, ReactNode } from 'react';
import { translations, Language } from '../utils/translations';
import { getRouteLanguage, isSupportedSeoLanguage } from '../utils/seo';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = 'aquaverify:language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  const routeLanguage = getRouteLanguage(window.location.pathname);
  if (routeLanguage) return routeLanguage;

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || undefined;
    if (isSupportedSeoLanguage(storedLanguage)) return storedLanguage;
  } catch (error) {
    return 'en';
  }

  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    } catch (error) {}
  }, []);

  const value = {
    lang,
    setLang,
    t: (translations as Record<string, typeof translations.en>)[lang] || translations.en
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
