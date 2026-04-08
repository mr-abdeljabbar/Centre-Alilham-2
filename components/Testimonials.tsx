import React from 'react';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const rawItems = t('testimonials.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? rawItems as { name: string; text: string }[] : [];

  return (
    <section className="py-20 bg-white min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-soft-100 text-soft-600 uppercase tracking-widest mb-4 border border-soft-200">
            {t('testimonials.title')}
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
            {t('testimonials.subtitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((tst, i) => {
            const translated = items[i] ?? { name: tst.name, text: tst.text };
            return (
              <div
                key={i}
                className="relative bg-gradient-to-br from-soft-50 to-white border border-soft-100 rounded-3xl p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-soft-100 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Giant decorative quote */}
                <span className="absolute top-4 right-5 text-7xl font-serif text-soft-100 leading-none select-none" aria-hidden="true">
                  "
                </span>

                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-soft-600 to-violet-500 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-soft-300 flex-shrink-0">
                    {translated.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{translated.name}</p>
                    <p className="text-xs text-soft-500 font-medium">{t('testimonials.patient_label')}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-soft-200 to-transparent" />

                {/* Text */}
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  {translated.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
