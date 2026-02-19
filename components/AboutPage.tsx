import * as React from 'react';
import { useEffect } from 'react';
import About from './About';

interface AboutPageProps {
    onOpenModal: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 lg:pt-32">
            <About onOpenModal={onOpenModal} />
        </div>
    );
};

export default AboutPage;
