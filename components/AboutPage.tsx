import React from 'react';
import About from './About';
import SEO from './SEO';

interface AboutPageProps {
    onOpenModal: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal }) => {
    return (
        <div className="pt-20 lg:pt-32">
            <SEO
                title="À propos du Dr Ilham YASSINE"
                description="Gynécologue obstétricienne formée en France, Dr Yassine offre des soins d'excellence à El Kelâa des Sraghna."
                path="/about"
            />
            <About onOpenModal={onOpenModal} />
        </div>
    );
};

export default AboutPage;
