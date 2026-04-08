import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../constants';

interface FooterProps {
  onOpenModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">{t('common.center_name')}</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/Drilhamyassin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/dr.ilhamyassine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('footer.nav_title')}</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-soft-400 transition-colors">{t('footer.nav_home')}</Link></li>
              <li><Link to="/about" className="hover:text-soft-400 transition-colors">{t('footer.nav_doctor')}</Link></li>
              <li><Link to="/services" className="hover:text-soft-400 transition-colors">{t('footer.nav_services')}</Link></li>
              <li><button onClick={onOpenModal} className="hover:text-soft-400 transition-colors">{t('footer.nav_rdv')}</button></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('footer.links_title')}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/P.ELKELAA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-soft-400 transition-colors flex items-center gap-2"
                >
                  Polyclinique El Kelaa
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/p/D%C3%A9l%C3%A9gation-de-la-Sant%C3%A9-El-kelaa-des-Sraghna-100057437529666/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-soft-400 transition-colors flex items-center gap-2"
                >
                  Délégation de la Santé
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">{t('footer.contact_title')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-soft-500 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{t('common.address')}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-soft-500" />
                <a href={`tel:${CONTACT_INFO.phoneFixed}`} dir="ltr" className="hover:text-white transition-colors">{CONTACT_INFO.phoneFixed}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-soft-500" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="pt-2">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 font-bold text-xs uppercase tracking-tight mb-1">{t('footer.urgence_box')}</p>
                  <p dir="ltr" className="text-white font-bold">{CONTACT_INFO.phoneEmergency}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          <p className="mb-2">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <p className="mb-4">
            {t('footer.dev_by')} <a href="https://abdeljabar.com" target="_blank" rel="noopener noreferrer" className="text-soft-500 hover:text-soft-400 font-bold transition-colors">Abdeljabar.com</a>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/legal-notice" className="hover:text-gray-300">{t('footer.legal')}</Link>
            <Link to="/privacy-policy" className="hover:text-gray-300">{t('footer.privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
