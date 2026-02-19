import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';

interface ServicesProps {
  onOpenModal: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  return (
    <section id="services" className="py-16 bg-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-soft-600 font-semibold tracking-wide uppercase text-sm mb-2">
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
              className="group bg-white p-8 rounded-3xl border border-gray-50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(139,92,246,0.12)] hover:border-soft-100 hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-soft-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-soft-600 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-soft-600 group-hover:text-white transition-colors duration-300" />
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-3 font-serif">
                {service.title}
              </h4>

              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>

              <button
                onClick={onOpenModal}
                className="inline-flex items-center text-sm font-bold text-soft-600 hover:text-soft-700 transition-colors"
              >
                Prendre Rendez-vous
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;