import React from 'react';
import { useTranslation } from 'react-i18next';
import { applyLang, SupportedLang } from '../lib/i18n';

const LANGS: { code: SupportedLang; label: string; flag: string }[] = [
  { code: 'fr',    label: 'FR', flag: '🇫🇷' },
  { code: 'ar-MA', label: 'AR', flag: '🇲🇦' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language as SupportedLang;

  return (
    <div className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-0.5">
      {LANGS.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => applyLang(code)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
            current === code
              ? 'bg-soft-600 text-white shadow-sm'
              : 'text-gray-500 hover:text-soft-600'
          }`}
          aria-label={`Switch to ${label}`}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
