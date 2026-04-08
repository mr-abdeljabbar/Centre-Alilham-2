import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, LogOut, RefreshCw, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const isAdminArea  = location.pathname.startsWith('/admin');
  const isAdminLogin = location.pathname === '/admin/login';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin/login');
  };

  const navLinks = [
    { name: t('header.nav.home'),     href: '/'         },
    { name: t('header.nav.about'),    href: '/about'    },
    { name: t('header.nav.services'), href: '/services' },
    { name: t('header.nav.contact'),  href: '/contact'  },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 bg-white ${
      scrolled ? 'shadow-md py-2' : 'shadow-sm py-4'
    }`}>

      {/* ── Top bar (public site only, desktop only) ─────────────────── */}
      {!isAdminArea && (
        <div className="hidden lg:block border-b border-gray-100 pb-2 mb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-soft-600" />
                {t('header.hours')}
              </span>
              <span className="flex items-center gap-2 font-bold text-red-500">
                <Phone className="w-4 h-4" />
                {t('header.urgence')} <span dir="ltr">{CONTACT_INFO.phoneEmergency}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a href={`tel:${CONTACT_INFO.phoneFixed}`} dir="ltr" className="hover:text-soft-600 transition-colors">
                {CONTACT_INFO.phoneFixed}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link to={isAdminArea ? '/admin' : '/'} className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Logo Centre Alilham"
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-serif font-bold text-medical-900 group-hover:text-soft-600 transition-colors">
                {t('common.center_name')}
              </span>
              <span className="text-[10px] lg:text-xs uppercase tracking-widest text-soft-600 font-semibold">
                {t('common.doctor_name')}
              </span>
            </div>
          </Link>

          {/* ── Admin controls ────────────────────────────────────────── */}
          {isAdminArea && !isAdminLogin && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-50 text-soft-600 text-xs font-semibold border border-soft-100">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administration
              </span>
              <button
                onClick={() => window.location.reload()}
                className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                title="Actualiser"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          )}

          {/* ── Public nav ────────────────────────────────────────────── */}
          {!isAdminArea && (
            <>
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-gray-600 hover:text-soft-600 font-medium transition-colors text-sm uppercase tracking-wide"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={onOpenModal}
                  className="bg-soft-600 text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:bg-soft-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  {t('header.cta')}
                </button>
              </nav>

              <div className="md:hidden flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-600 hover:text-soft-600 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile menu (public only) ─────────────────────────────────── */}
      {!isAdminArea && isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-soft-600 hover:bg-soft-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <a href={`tel:${CONTACT_INFO.phoneEmergency}`} className="flex items-center gap-3 text-red-500 font-bold mb-3 px-3">
                <Phone className="w-5 h-5" />
                {t('header.urgence')} <span dir="ltr">{CONTACT_INFO.phoneEmergency}</span>
              </a>
              <button
                onClick={() => { setIsOpen(false); onOpenModal(); }}
                className="block w-full text-center bg-soft-600 text-white px-5 py-3 rounded-lg font-bold shadow-sm"
              >
                {t('header.cta')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
