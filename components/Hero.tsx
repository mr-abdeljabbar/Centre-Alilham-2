import * as React from 'react';
import { Calendar, Phone, Star } from 'lucide-react';
import { DOCTOR_NAME, CONTACT_INFO } from '../constants';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  return (
    <section className="relative min-h-screen flex items-center py-16 overflow-hidden">
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
                <Star className="w-2.5 h-2.5 mr-1 fill-current" /> Diplômée en France
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold bg-medical-50 text-medical-600 border border-medical-100">
                Ex-Médecin CHU Med 6
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {DOCTOR_NAME} <br />
              <span className="text-soft-600 text-3xl lg:text-4xl italic">Spécialiste en Gynécologie Obstétrique</span>
            </h1>

            <p className="text-base text-gray-600 mb-8 max-w-2xl leading-relaxed text-justify">
              Votre santé féminine accompagnée avec expertise, sécurité et bienveillance au cœur d'El Kelâa des Sraghna. Nous offrons des soins personnalisés et une écoute attentive pour chaque étape de votre vie de femme.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={onOpenModal}
                className="flex items-center justify-center gap-2 bg-soft-600 hover:bg-soft-700 text-white px-6 py-3 rounded-full font-bold shadow-md shadow-soft-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Prendre Rendez-vous
              </button>

              <a
                href={`tel:${CONTACT_INFO.phoneFixed}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full font-bold border border-gray-200 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-soft-500" />
                Appeler Maintenant
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-semibold text-gray-700">Service 5 Étoiles</span>
            </div>

            <p className="mt-4 text-red-500 font-bold text-sm">
              Numéro d'urgence : {CONTACT_INFO.phoneEmergency}
            </p>
          </div>
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;