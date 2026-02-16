import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Centre Alilham</h3>
            <p className="text-sm text-gray-400 mb-4">
              Cabinet de Gynécologie Obstétrique à El Kelâa des Sraghna. Expertise, sécurité et bienveillance pour la santé des femmes.
            </p>
            <div className="flex gap-4">
               {/* Social Placeholders */}
               <a href="#" className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-medical-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-medical-400 transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-medical-400 transition-colors">Dr Ilham Yassine</a></li>
              <li><a href="#services" className="hover:text-medical-400 transition-colors">Nos Services</a></li>
              <li><a href="#contact" className="hover:text-medical-400 transition-colors">Prendre Rendez-vous</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-medical-500" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-medical-500" />
                <a href={`tel:${CONTACT_INFO.phoneFixed}`} className="hover:text-white">{CONTACT_INFO.phoneFixed}</a>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="w-5 h-5 text-medical-500" />
                 <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">{CONTACT_INFO.email}</a>
              </li>
              <li className="pt-2">
                 <p className="text-red-400 font-bold">Urgence: {CONTACT_INFO.phoneEmergency}</p>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Centre Alilham - Dr Ilham Yassine. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-300">Mentions Légales</a>
            <a href="#" className="hover:text-gray-300">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;