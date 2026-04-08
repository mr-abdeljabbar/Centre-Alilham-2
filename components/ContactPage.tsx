import React from 'react';
import Contact from './Contact';
import SEO from './SEO';

const ContactPage: React.FC = () => {
    return (
        <div className="pt-20 lg:pt-32">
            <SEO
                title="Prendre Rendez-vous"
                description="Contactez le Centre Alilham pour prendre rendez-vous avec Dr Ilham YASSINE à El Kelâa des Sraghna."
                path="/contact"
            />
            <Contact />
        </div>
    );
};

export default ContactPage;
