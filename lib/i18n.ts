import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fr from '../locales/fr/translation.json';
import arMA from '../locales/ar-MA/translation.json';

const LANG_KEY = 'alilham_lang';

export type SupportedLang = 'fr' | 'ar-MA';

const savedLang = (localStorage.getItem(LANG_KEY) as SupportedLang | null) ?? 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr:    { translation: fr    },
      'ar-MA': { translation: arMA },
    },
    lng:         savedLang,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

/** Apply dir + lang to <html> and persist to localStorage */
export function applyLang(lang: SupportedLang) {
  const isAr = lang === 'ar-MA';
  document.documentElement.lang = lang;
  document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
  // Toggle Arabic font class
  document.documentElement.classList.toggle('font-cairo', isAr);
  localStorage.setItem(LANG_KEY, lang);
  i18n.changeLanguage(lang);
}

// Apply on initial load
applyLang(savedLang);

export default i18n;
