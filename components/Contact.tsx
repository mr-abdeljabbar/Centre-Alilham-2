import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import ContactForm from './ContactForm';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Contact Information & Form */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                Prenez Rendez-vous
              </h2>
              <p className="text-gray-600 text-sm">
                Remplissez le formulaire ci-dessous ou appelez-nous directement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-8 h-8 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-medical-600" />
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">{CONTACT_INFO.address}</p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-8 h-8 bg-medical-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-medical-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-900 font-bold leading-none mb-1">{CONTACT_INFO.phoneFixed}</p>
                  <p className="text-[10px] text-red-500 font-bold leading-none">Urgent: {CONTACT_INFO.phoneEmergency}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1">
              <ContactForm />
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:h-[550px] h-[300px] rounded-3xl overflow-hidden shadow-lg border border-gray-200 relative mt-4 lg:mt-0">
            <iframe
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
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