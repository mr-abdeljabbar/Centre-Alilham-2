import * as React from 'react';
import { useState } from 'react';
import { MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const ContactForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        subject: 'Suivi de grossesse',
        message: ''
    });

    const whatsappNumber = CONTACT_INFO.phoneEmergency.replace(/\D/g, ''); // Use emergency mobile for WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Bonjour Dr Yassine, je souhaite prendre un rendez-vous (Nom: ${formData.name}, Sujet: ${formData.subject}).`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://formspree.io/f/mdallkgn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (status === 'success') {
        return (
            <div className="py-8 px-4 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-soft-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-soft-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Merci Madame !</h3>
                <p className="text-gray-600 mb-8">
                    Votre demande a été transmise au cabinet. Nous vous rappellerons dans les plus brefs délais pour confirmer votre rendez-vous.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-soft-600 font-bold hover:underline"
                >
                    Envoyer une autre demande
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-3">
                {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Nom complet</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Votre Nom"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none transition-all"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Téléphone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="06XXXXXXXX"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Sujet de consultation</label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-medical-500 focus:ring-4 focus:ring-medical-100 outline-none transition-all bg-white"
                    >
                        <option>Suivi de grossesse</option>
                        <option>Echographie 3D/4D</option>
                        <option>Consultation générale</option>
                        <option>Stérilité / Fertilité</option>
                        <option>Contrôle périodique</option>
                        <option>Autre</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Message (Optionnel)</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Comment pouvons-nous vous aider ?"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-medical-500 focus:ring-4 focus:ring-medical-100 outline-none transition-all"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-soft-600 text-white font-bold py-3 rounded-xl hover:bg-soft-700 transition-all shadow-lg shadow-soft-200 transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'submitting' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Envoi en cours...
                        </>
                    ) : (
                        'Envoyer la demande'
                    )}
                </button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">OU</span>
                </div>
            </div>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#22C35E] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-100 transform hover:-translate-y-0.5 active:scale-95"
            >
                <MessageCircle className="w-6 h-6" />
                Prendre RDV via WhatsApp
            </a>

            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                En soumettant ce formulaire, vous acceptez d'être rappelé par notre cabinet pour confirmer l'horaire de votre rendez-vous.
            </p>
        </div>
    );
};

export default ContactForm;
