import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-medical-600 font-semibold tracking-wide uppercase text-sm mb-2">
            Nos Domaines d'Intervention
          </h2>
          <h3 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">
            Une prise en charge complète et spécialisée
          </h3>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Du suivi de grossesse à la chirurgie spécialisée, nous offrons des soins de haute qualité adaptés à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-soft-200 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-soft-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-medical-600 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-medical-600 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                {service.title}
              </h4>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-soft-600 transition-colors"
              >
                Prendre Rendez-vous
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;