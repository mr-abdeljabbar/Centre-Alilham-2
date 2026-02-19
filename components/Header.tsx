import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À Propos', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'}`}>

      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block border-b border-gray-100 pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-soft-600" />
              Lun - Ven: 09:00 - 18:00
            </span>
            <span className="flex items-center gap-2 font-bold text-red-500">
              <Phone className="w-4 h-4" />
              Urgence: {CONTACT_INFO.phoneEmergency}
            </span>
          </div>
          <a href={`tel:${CONTACT_INFO.phoneFixed}`} className="hover:text-soft-600 transition-colors">
            Tél: {CONTACT_INFO.phoneFixed}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Logo Centre Alilham"
                className="w-12 h-12 object-contain"
                width="48"
                height="48"
              />
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-serif font-bold text-medical-900 group-hover:text-soft-600 transition-colors">
                  Centre Alilham
                </span>
                <span className="text-[10px] lg:text-xs uppercase tracking-widest text-soft-600 font-semibold">
                  Dr Ilham YASSINE
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
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
              Prendre Rendez-vous
            </button>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-soft-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
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
                Urgence : {CONTACT_INFO.phoneEmergency}
              </a>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenModal();
                }}
                className="block w-full text-center bg-soft-600 text-white px-5 py-3 rounded-lg font-bold shadow-sm"
              >
                Prendre Rendez-vous
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;