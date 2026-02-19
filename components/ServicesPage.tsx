import * as React from 'react';
import { useEffect } from 'react';
import Services from './Services';

interface ServicesPageProps {
    onOpenModal: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 lg:pt-32">
            <Services onOpenModal={onOpenModal} />
        </div>
    );
};

export default ServicesPage;
