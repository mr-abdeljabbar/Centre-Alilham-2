import React from 'react';
import { Calendar, Phone, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DOCTOR_NAME, CONTACT_INFO } from '../constants';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center pb-16 pt-24 lg:pt-36 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_bg.jpg"
          alt="Cabinet médical gynécologie Maroc"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/40 lg:via-white/70 lg:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-soft-100 text-soft-600 border border-soft-200">
                <Star className="w-2.5 h-2.5 mr-1 fill-current" /> {t('hero.badge1')}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-medical-50 text-medical-600 border border-medical-100">
                {t('hero.badge2')}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {t('common.doctor_name')} <br />
              <span className="text-soft-600 text-3xl lg:text-4xl italic">{t('hero.specialty')}</span>
            </h1>

            <p className="text-base text-gray-600 mb-8 max-w-2xl leading-relaxed text-justify">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onOpenModal}
                className="flex items-center justify-center gap-2 bg-soft-600 hover:bg-soft-700 text-white px-6 py-3 rounded-full font-bold shadow-md shadow-soft-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                {t('hero.cta_rdv')}
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneFixed}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full font-bold border border-gray-200 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-soft-500" />
                {t('hero.cta_call')}
              </a>
            </div>

            <p className="text-red-500 font-bold text-sm">
              {t('hero.urgence_label')} <span dir="ltr">{CONTACT_INFO.phoneEmergency}</span>
            </p>
          </div>
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
