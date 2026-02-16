import React from 'react';
import { Calendar, Phone, Star } from 'lucide-react';
import { DOCTOR_NAME, CONTACT_INFO } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Cabinet médical gynécologie Maroc" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 lg:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2">
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-medical-800 border border-blue-200">
              <Star className="w-3 h-3 mr-1 fill-current" /> Diplômée en France
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200">
              Ex-Médecin CHU Med 6
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {DOCTOR_NAME} <br />
            <span className="text-medical-600 text-3xl lg:text-4xl">Spécialiste en Gynécologie Obstétrique</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Votre santé féminine accompagnée avec expertise, sécurité et bienveillance au cœur d'El Kelâa des Sraghna.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="flex items-center justify-center gap-2 bg-medical-600 hover:bg-medical-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-medical-500/30 transition-all transform hover:-translate-y-1"
            >
              <Calendar className="w-5 h-5" />
              Prendre Rendez-vous
            </a>
            
            <a 
              href={`tel:${CONTACT_INFO.phoneFixed}`}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-bold border border-gray-200 shadow-md transition-all"
            >
              <Phone className="w-5 h-5 text-medical-600" />
              Appeler Maintenant
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
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
      </div>
    </section>
  );
};

export default Hero;