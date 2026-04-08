import React from 'react';
import { ShieldCheck, Heart, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeaturesProps {
  onOpenModal: () => void;
}

const ICONS = [Award, ShieldCheck, Heart, Clock];

const Features: React.FC<FeaturesProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const rawItems = t('features.items', { returnObjects: true });
  const items = Array.isArray(rawItems) ? rawItems as { title: string; desc: string }[] : [];

  return (
    <section className="py-16 bg-medical-900 text-white relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-medical-800 opacity-20"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-soft-600 opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between mb-12">
          <div className="lg:w-1/2">
            <h2 className="text-soft-300 font-bold tracking-wide uppercase text-sm mb-2">
              {t('features.label')}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              {t('features.title')}
            </h3>
          </div>
          <div className="lg:w-auto mt-6 lg:mt-0">
            <button
              onClick={onOpenModal}
              className="inline-block bg-white text-medical-900 px-8 py-3 rounded-full font-bold hover:bg-soft-50 transition-colors shadow-lg"
            >
              {t('features.cta')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((feature, index) => {
            const Icon = ICONS[index];
            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all">
                <Icon className="w-10 h-10 text-soft-300 mb-4" />
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-200 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
