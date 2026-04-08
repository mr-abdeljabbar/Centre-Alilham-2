import React from 'react';
import Services from './Services';
import SEO from './SEO';

interface ServicesPageProps {
    onOpenModal: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal }) => {
    return (
        <div className="pt-20 lg:pt-32">
            <SEO
                title="Nos Services de Gynécologie"
                description="Suivi de grossesse, échographie 3D-4D, stérilité, chirurgie cœlioscopique et plus — Centre Alilham."
                path="/services"
            />
            <Services onOpenModal={onOpenModal} />
        </div>
    );
};

export default ServicesPage;
