import * as React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Features from './Features';
import Testimonials from './Testimonials';
import Contact from './Contact';

interface HomeProps {
    onOpenModal: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenModal }) => {
    return (
        <>
            <Hero onOpenModal={onOpenModal} />
            <About onOpenModal={onOpenModal} />
            <Services onOpenModal={onOpenModal} />
            <Features onOpenModal={onOpenModal} />
            <Testimonials />
            <Contact />
        </>
    );
};

export default Home;
