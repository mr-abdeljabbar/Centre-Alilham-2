import React, { useEffect } from 'react';
import { Shield, Eye, Lock, RefreshCcw, UserCheck } from 'lucide-react';
import { DOCTOR_NAME } from '../constants';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 bg-soft-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-soft-100 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-soft-600" />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 font-playfair">Politique de Confidentialité</h1>
                    </div>

                    <div className="space-y-10 text-gray-700 leading-relaxed">
                        <p>
                            Au cabinet du <strong>{DOCTOR_NAME}</strong>, la protection de votre vie privée et de vos données de santé est une priorité absolue.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-soft-500" />
                                1. Collecte des Données
                            </h2>
                            <p>Nous collectons les informations que vous nous transmettez via le formulaire de contact ou de prise de rendez-vous :</p>
                            <ul className="list-disc ml-8 mt-2 space-y-1">
                                <li>Nom et Prénom</li>
                                <li>Numéro de téléphone</li>
                                <li>Type de consultation souhaitée</li>
                                <li>Message optionnel</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-soft-500" />
                                2. Finalité de la Collecte
                            </h2>
                            <p>Vos données sont exclusivement utilisées pour :</p>
                            <ul className="list-disc ml-8 mt-2 space-y-1">
                                <li>Organiser votre rendez-vous médical.</li>
                                <li>Vous rappeler pour confirmer un horaire.</li>
                                <li>Répondre à vos questions spécifiques.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-soft-500" />
                                3. Sécurité des Données
                            </h2>
                            <p>
                                Vos données sont traitées de manière confidentielle et ne sont jamais cédées ou vendues à des tiers.
                                Elles sont uniquement accessibles par le personnel autorisé du cabinet médical.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-medical-900 mb-4 flex items-center gap-2">
                                <RefreshCcw className="w-5 h-5 text-soft-500" />
                                4. Vos Droits
                            </h2>
                            <p>
                                Conformément à la loi marocaine (Loi 09-08), vous disposez d'un droit d'accès, de rectification et de suppression
                                des données vous concernant. Vous pouvez exercer ces droits en nous contactant directement par téléphone ou par email.
                            </p>
                        </section>

                        <section className="bg-soft-50 p-6 rounded-2xl border border-soft-100">
                            <p className="text-sm font-medium">
                                Note : Ce site utilise le service Formspree pour la réception des formulaires, qui s'engage également à respecter
                                la confidentialité des transmissions.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
