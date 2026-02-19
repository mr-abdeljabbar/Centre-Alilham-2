import * as React from 'react';
import { useEffect } from 'react';
import { Scale, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO, DOCTOR_NAME } from '../constants';

const LegalNotice: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 bg-soft-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-soft-100 rounded-2xl flex items-center justify-center">
                            <Scale className="w-6 h-6 text-soft-600" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 font-playfair">Mentions Légales</h1>
                    </div>

                    <div className="space-y-10 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-soft-500" />
                                1. Éditeur du Site
                            </h2>
                            <p>Le site <strong>Centre Alilham</strong> est édité par :</p>
                            <ul className="mt-4 space-y-2 ml-4">
                                <li><strong>Nom :</strong> {DOCTOR_NAME}</li>
                                <li><strong>Profession :</strong> Gynécologue Obstétricien</li>
                                <li><strong>Inscrit à l'Ordre National des Médecins du Maroc</strong></li>
                                <li className="flex items-start gap-2">
                                    <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                    <span>{CONTACT_INFO.address}</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4">2. Contact</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                                    <Phone className="w-5 h-5 text-soft-500" />
                                    <span>{CONTACT_INFO.phoneFixed}</span>
                                </div>
                                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
                                    <Mail className="w-5 h-5 text-soft-500" />
                                    <span>{CONTACT_INFO.email}</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4">3. Hébergement</h2>
                            <p>Le site est hébergé par Netlify, Inc.</p>
                            <p className="mt-2">Adresse : 2325 3rd Street, Suite 215, San Francisco, California 94107, USA.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4">4. Propriété Intellectuelle</h2>
                            <p>
                                L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive du Centre Alilham, sauf mention contraire.
                                Toute reproduction est interdite sans accord préalable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4">5. Responsabilité Médicale</h2>
                            <p>
                                Les informations fournies sur ce site le sont à titre informatif et ne sauraient remplacer une consultation médicale.
                                En cas d'urgence, veuillez contacter les services d'urgence ou vous rendre au cabinet.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalNotice;
