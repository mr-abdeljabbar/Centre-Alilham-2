import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import LegalNotice from './components/LegalNotice';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/admin/AdminLogin';
import AdminPage from './components/admin/AdminPage';

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
          <Routes>
            <Route path="/" element={<Home onOpenModal={openModal} />} />
            <Route path="/about" element={<AboutPage onOpenModal={openModal} />} />
            <Route path="/services" element={<ServicesPage onOpenModal={openModal} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
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