import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ChevronRight, CalendarCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONTACT_INFO } from '../constants';
import ContactForm from './ContactForm';
import BookingCalendar from './BookingCalendar';

const Contact: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const { t, i18n } = useTranslation();

  const whatsappHref = `https://wa.me/${CONTACT_INFO.phoneEmergency.replace(/\D/g, '')}`;

  const infoCards = [
    {
      icon: MapPin,
      label: t('contact.info_address'),
      value: t('common.address'),
      accent: 'bg-soft-100 text-soft-600',
    },
    {
      icon: Phone,
      label: t('contact.info_phone'),
      value: CONTACT_INFO.phoneFixed,
      sub: `${t('contact.urgences')} ${CONTACT_INFO.phoneEmergency}`,
      subCls: 'text-red-500 font-bold',
      accent: 'bg-red-50 text-red-500',
      href: `tel:${CONTACT_INFO.phoneFixed}`,
    },
    {
      icon: Clock,
      label: t('contact.info_hours'),
      value: t('contact.hours_weekdays'),
      sub: t('contact.hours_saturday'),
      accent: 'bg-amber-50 text-amber-500',
    },
  ];

  const formattedDate = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString(
        i18n.language === 'ar-MA' ? 'ar-MA' : 'fr-MA',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      )
    : null;

  return (
    <section id="contact" className="bg-gradient-to-b from-white via-soft-50/20 to-soft-50/40 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-soft-100 text-soft-600 uppercase tracking-widest mb-4 border border-soft-200">
            <CalendarCheck className="w-3.5 h-3.5" />
            {t('contact.label')}
          </span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3">
            {t('contact.title')} <span className="text-soft-600 italic">{t('contact.title_emphasis')}</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* ── Main grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── LEFT: clinic card + info + map ───── */}
          <div className="space-y-4">

            {/* Clinic identity card */}
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-br from-soft-600 to-violet-700 px-6 py-6">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

                <div className="relative flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src="/images/logo.png"
                      alt="Centre Alilham"
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-serif font-bold text-xl leading-tight">{t('common.center_name')}</p>
                    <p className="text-soft-200 text-xs font-semibold mt-0.5">{t('common.doctor_name')}</p>
                    <p className="text-soft-300 text-[11px] mt-0.5">{t('common.specialty_short')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white divide-y divide-gray-50">
                {infoCards.map(({ icon: Icon, label, value, sub, subCls, accent, href }) => (
                  <div key={label} className="flex items-center gap-4 px-5 py-3.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest leading-none mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-semibold text-gray-800 hover:text-soft-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-800 leading-snug">{value}</p>
                      )}
                      {sub && <p className={`text-xs mt-0.5 ${subCls ?? 'text-gray-400'}`}>{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp quick link */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 p-4 bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl hover:bg-[#bbf7d0] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center shadow-sm shadow-green-200">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t('contact.whatsapp_title')}</p>
                  <p className="text-xs text-gray-500">{t('contact.whatsapp_sub')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#25D366] transition-colors flex-shrink-0" />
            </a>

            {/* Map */}
            <div className="h-[220px] rounded-2xl overflow-hidden border border-gray-200 shadow-md relative">
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Centre Alilham"
              />
            </div>
          </div>

          {/* ── RIGHT: calendar + form ────────────── */}
          <div className="space-y-5">

            {/* Step indicators */}
            <div className="flex items-center gap-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-soft-600 text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-soft-200">
                  1
                </span>
                <span className="text-sm font-semibold text-gray-700">{t('contact.step1')}</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-soft-300 to-gray-200" />
              <div className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  selectedDate ? 'bg-soft-600 text-white shadow-sm shadow-soft-200' : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </span>
                <span className={`text-sm font-semibold transition-colors ${selectedDate ? 'text-gray-700' : 'text-gray-400'}`}>
                  {t('contact.step2')}
                </span>
              </div>
            </div>

            {/* Calendar */}
            <BookingCalendar
              onDateSelect={(date) => {
                setSelectedDate(date);
                setTimeout(() => {
                  document.getElementById('rdv-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 150);
              }}
            />

            {/* Form card */}
            <div id="rdv-form" className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">

              {/* Card header */}
              <div className="px-6 py-5 bg-gradient-to-r from-soft-600 to-violet-500 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-white" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white" />
                </div>
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-bold text-base">{t('contact.form_title')}</h3>
                    <p className="text-soft-200 text-xs mt-0.5">
                      {formattedDate
                        ? t('contact.form_date_selected', { date: formattedDate })
                        : t('contact.form_date_hint')}
                    </p>
                  </div>
                  {selectedDate && (
                    <span className="flex-shrink-0 px-3 py-1 rounded-full bg-white/25 text-white text-xs font-semibold border border-white/30">
                      {t('contact.form_date_chosen')}
                    </span>
                  )}
                </div>
              </div>

              {/* Form body */}
              <div className="p-6">
                <ContactForm defaultDate={selectedDate} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
