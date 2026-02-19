import * as React from 'react';
import { useEffect } from 'react';
import Contact from './Contact';

const ContactPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-20 lg:pt-32">
            <Contact />
        </div>
    );
};

export default ContactPage;
