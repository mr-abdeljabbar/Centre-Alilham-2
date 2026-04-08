import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import {
  User, Phone as PhoneIcon, Mail, Stethoscope, Calendar,
  MessageSquare, MessageCircle, CheckCircle2, AlertCircle, Loader2, Send,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { createAppointment } from '../lib/appointments';

interface ContactFormProps {
  defaultDate?: string;
}

/* Shared field wrapper */
const Field: React.FC<{
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}> = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
      <Icon className="w-3.5 h-3.5 text-soft-500" />
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none transition-all text-sm bg-gray-50 focus:bg-white placeholder:text-gray-400';

const ContactForm: React.FC<ContactFormProps> = ({ defaultDate }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { t } = useTranslation();

  const rawServices = t('form.services', { returnObjects: true });
  const services = Array.isArray(rawServices) ? rawServices as string[] : [];

  const appointmentSchema = z.object({
    name:           z.string().min(2, t('form.err_name')),
    phone:          z.string().regex(/^(\+212|0)(5|6|7)\d{8}$/, t('form.err_phone')),
    email:          z.string().email(t('form.err_email')).optional().or(z.literal('')),
    service:        z.string().min(1, t('form.err_service')),
    preferred_date: z.string().optional(),
    message:        z.string().max(500, t('form.err_message')).optional(),
  });

  type AppointmentFormData = z.infer<typeof appointmentSchema>;

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } =
    useForm<AppointmentFormData>({
      resolver: zodResolver(appointmentSchema),
      defaultValues: {
        service:        services[0],
        preferred_date: defaultDate ?? '',
      },
    });

  useEffect(() => {
    if (defaultDate) setValue('preferred_date', defaultDate);
  }, [defaultDate, setValue]);

  const watchedName    = watch('name', '');
  const watchedService = watch('service', services[0]);

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneEmergency.replace(/\D/g, '')}?text=${encodeURIComponent(
    t('form.whatsapp_msg', { name: watchedName, service: watchedService })
  )}`;

  const onSubmit = async (data: AppointmentFormData) => {
    setStatus('submitting');
    try {
      await createAppointment({
        name:           data.name,
        phone:          data.phone,
        email:          data.email || undefined,
        service:        data.service,
        preferred_date: data.preferred_date || undefined,
        message:        data.message || undefined,
        source:         'web',
      });
      setStatus('success');
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  /* ── Success state ──────────────────────────────────────────────────── */
  if (status === 'success') {
    return (
      <div className="py-10 px-4 text-center">
        <div className="w-20 h-20 bg-soft-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-soft-600" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{t('form.success_title')}</h3>
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
          {t('form.success_text')}
        </p>
        <button
          onClick={() => { reset(); setStatus('idle'); }}
          className="inline-flex items-center gap-2 text-soft-600 font-bold hover:underline text-sm"
        >
          {t('form.success_again')}
        </button>
      </div>
    );
  }

  /* ── Form ───────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-5">

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{t('form.error_text')}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t('form.name_label')} icon={User} error={errors.name?.message}>
            <input {...register('name')} type="text" placeholder={t('form.name_placeholder')} className={inputCls} />
          </Field>
          <Field label={t('form.phone_label')} icon={PhoneIcon} error={errors.phone?.message}>
            <input {...register('phone')} type="tel" placeholder={t('form.phone_placeholder')} className={inputCls} />
          </Field>
        </div>

        {/* Email */}
        <Field label={t('form.email_label')} icon={Mail} error={errors.email?.message}>
          <input {...register('email')} type="email" placeholder={t('form.email_placeholder')} className={inputCls} />
        </Field>

        {/* Service + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={t('form.service_label')} icon={Stethoscope} error={errors.service?.message}>
            <select {...register('service')} className={inputCls}>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label={t('form.date_label')} icon={Calendar}>
            <input
              {...register('preferred_date')}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className={inputCls}
            />
          </Field>
        </div>

        {/* Message */}
        <Field label={t('form.message_label')} icon={MessageSquare} error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={3}
            placeholder={t('form.message_placeholder')}
            className={inputCls}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex items-center justify-center gap-2 bg-soft-600 hover:bg-soft-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-soft-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:transform-none disabled:cursor-not-allowed text-sm"
        >
          {status === 'submitting' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> {t('form.submitting')}</>
          ) : (
            <><Send className="w-4 h-4" /> {t('form.submit')}</>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-white text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('form.or')}</span>
        </div>
      </div>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#22c55e] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-100 hover:-translate-y-0.5 active:scale-95 text-sm"
      >
        <MessageCircle className="w-5 h-5" />
        {t('form.whatsapp_btn')}
      </a>

      <p className="text-[10px] text-gray-400 text-center leading-relaxed pt-1">
        {t('form.privacy')}
      </p>
    </div>
  );
};

export default ContactForm;
