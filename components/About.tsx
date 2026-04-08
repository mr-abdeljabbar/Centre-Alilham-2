import React from 'react';
import { Award, GraduationCap, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DOCTOR_NAME } from '../constants';

interface AboutProps {
  onOpenModal: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const rawDiplomas = t('diplomas', { returnObjects: true });
  const diplomas = Array.isArray(rawDiplomas) ? rawDiplomas as string[] : [];

  return (
    <section id="about" className="py-16 bg-cold-pink/30 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

          {/* Image Side */}
          <div className="relative mb-12 lg:mb-0">
            <div className="absolute top-4 -left-4 w-full h-full bg-soft-200 rounded-3xl z-0 transform -rotate-3"></div>
            <img
              src="/images/profil.jpg"
              alt={`Portrait ${DOCTOR_NAME}`}
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl shadow-xl"
            />

            <div className="absolute bottom-8 right-8 z-20 bg-white p-6 rounded-2xl shadow-lg max-w-xs border-l-4 border-soft-500">
              <p className="text-gray-900 font-bold text-lg mb-1">{t('about.chu_badge_title')}</p>
              <p className="text-soft-600 font-medium">{t('about.chu_badge_sub')}</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <h2 className="text-soft-600 font-semibold tracking-wide uppercase text-sm mb-2">
              {t('about.label')}
            </h2>
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h3>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {t('about.bio', { name: DOCTOR_NAME })}
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h4 className="flex items-center gap-2 font-bold text-gray-800 mb-4">
                <GraduationCap className="text-soft-600" />
                {t('about.diplomas_title')}
              </h4>
              <ul className="space-y-3">
                {diplomas.map((diploma, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <Award className="w-5 h-5 text-soft-500 flex-shrink-0 mt-0.5" />
                    <span>{diploma}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={onOpenModal}
                className="px-8 py-3 bg-soft-600 text-white rounded-full font-bold hover:bg-soft-700 transition-all shadow-lg transform hover:-translate-y-0.5 active:scale-95"
              >
                {t('about.cta')}
              </button>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-soft-600" />
                <span className="font-medium">{t('about.location')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
