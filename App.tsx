import * as React from 'react';
import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';

// Lazy load components
// Lazy load components with proper types
const Home = lazy<React.ComponentType<{ onOpenModal: () => void }>>(() => import('./components/Home'));
const AboutPage = lazy<React.ComponentType<{ onOpenModal: () => void }>>(() => import('./components/AboutPage'));
const ServicesPage = lazy<React.ComponentType<{ onOpenModal: () => void }>>(() => import('./components/ServicesPage'));
const ContactPage = lazy<React.ComponentType<{}>>(() => import('./components/ContactPage'));
const LegalNotice = lazy<React.ComponentType<{}>>(() => import('./components/LegalNotice'));
const PrivacyPolicy = lazy<React.ComponentType<{}>>(() => import('./components/PrivacyPolicy'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-soft-100 border-t-soft-600 rounded-full animate-spin"></div>
  </div>
);

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header onOpenModal={openModal} />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home onOpenModal={openModal} />} />
              <Route path="/about" element={<AboutPage onOpenModal={openModal} />} />
              <Route path="/services" element={<ServicesPage onOpenModal={openModal} />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </main>
        <Footer onOpenModal={openModal} />
        <FloatingElements onOpenModal={openModal} />

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Prendre un Rendez-vous"
        >
          <ContactForm />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
