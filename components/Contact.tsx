import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information & Form */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Prenez Rendez-vous
            </h2>
            <p className="text-gray-600 mb-8">
              Remplissez le formulaire ci-dessous ou appelez-nous directement. Nous nous engageons à vous répondre dans les plus brefs délais.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-medical-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Adresse</h4>
                  <p className="text-gray-600">{CONTACT_INFO.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-medical-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Téléphone</h4>
                  <p className="text-gray-600">
                    Fixe: <a href={`tel:${CONTACT_INFO.phoneFixed}`} className="hover:text-medical-600">{CONTACT_INFO.phoneFixed}</a>
                  </p>
                  <p className="text-red-500 font-semibold">
                    Urgence: <a href={`tel:${CONTACT_INFO.phoneEmergency}`}>{CONTACT_INFO.phoneEmergency}</a>
                  </p>
                </div>
              </div>

               <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-medical-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Horaires</h4>
                  <p className="text-gray-600">Lun - Ven: 09:00 - 18:00</p>
                  <p className="text-gray-600">Sam: 09:00 - 13:00</p>
                </div>
              </div>
            </div>

            {/* Simple Contact Form */}
            <form className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Votre Nom" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-medical-500 focus:ring-2 focus:ring-medical-200 outline-none transition-all"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Téléphone" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-medical-500 focus:ring-2 focus:ring-medical-200 outline-none transition-all"
                  required
                />
              </div>
              <textarea 
                rows={4} 
                placeholder="Comment pouvons-nous vous aider ?" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-medical-500 focus:ring-2 focus:ring-medical-200 outline-none transition-all"
              ></textarea>
              <button 
                type="submit" 
                className="w-full bg-medical-600 text-white font-bold py-3 rounded-lg hover:bg-medical-700 transition-colors shadow-md"
              >
                Demander un Rendez-vous
              </button>
              <p className="text-xs text-gray-500 text-center">
                Vos données sont sécurisées. Nous vous rappellerons pour confirmer.
              </p>
            </form>
          </div>

          {/* Map Embed */}
          <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-lg border border-gray-200 relative">
             <iframe 
               src={CONTACT_INFO.mapEmbedUrl}
               width="100%" 
               height="100%" 
               style={{border:0, position: 'absolute', top: 0, left: 0}} 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               title="Google Maps Centre Alilham"
             ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;