import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Appointment, AppointmentStatus, AppointmentSource } from '../../lib/appointments';

const SERVICES = [
  'Consultation gynécologique',
  'Suivi de grossesse',
  'Échographie obstétricale',
  'Frottis cervico-vaginal',
  'Contraception',
  'Bilan de fertilité',
  'Urgence gynécologique',
  'Autre',
];

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferred_date: string;
  message: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  notes: string;
};

interface AppointmentModalProps {
  appointment?: Appointment;
  onSave: (data: Omit<Appointment, 'id' | 'created_at'>) => void;
  onCancel: () => void;
  saving?: boolean;
}

const label = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1';
const input =
  'w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none bg-white';

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  appointment,
  onSave,
  onCancel,
  saving,
}) => {
  const isEdit = Boolean(appointment);
  const today = new Date().toISOString().split('T')[0];

  const toDateStr = (v: unknown): string => {
    if (!v) return '';
    if (v instanceof Date) {
      const y = v.getFullYear();
      const m = String(v.getMonth() + 1).padStart(2, '0');
      const d = String(v.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return String(v).substring(0, 10);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name:           appointment?.name ?? '',
      phone:          appointment?.phone ?? '',
      email:          appointment?.email ?? '',
      service:        appointment?.service ?? SERVICES[0],
      preferred_date: toDateStr(appointment?.preferred_date),
      message:        appointment?.message ?? '',
      status:         appointment?.status ?? 'pending',
      source:         appointment?.source ?? 'web',
      notes:          appointment?.notes ?? '',
    },
  });

  const onSubmit = (values: FormValues) => {
    onSave({
      name:           values.name.trim(),
      phone:          values.phone.trim(),
      email:          values.email.trim() || null,
      service:        values.service,
      preferred_date: values.preferred_date || null,
      message:        values.message.trim() || null,
      status:         values.status,
      source:         values.source,
      notes:          values.notes.trim() || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-base">
            {isEdit ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Nom *</label>
              <input
                {...register('name', { required: 'Requis' })}
                className={input}
                placeholder="Prénom NOM"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className={label}>Téléphone *</label>
              <input
                {...register('phone', { required: 'Requis' })}
                className={input}
                placeholder="06XXXXXXXX"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={label}>Email</label>
            <input
              {...register('email')}
              type="email"
              className={input}
              placeholder="exemple@email.com"
            />
          </div>

          {/* Service + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Service *</label>
              <select {...register('service', { required: 'Requis' })} className={input}>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Date RDV</label>
              <input
                {...register('preferred_date')}
                type="date"
                min={today}
                className={input}
              />
            </div>
          </div>

          {/* Status + Source */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Statut</label>
              <select {...register('status')} className={input}>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
                <option value="done">Terminé</option>
              </select>
            </div>
            <div>
              <label className={label}>Source</label>
              <select {...register('source')} className={input}>
                <option value="web">Web</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className={label}>Message</label>
            <textarea
              {...register('message')}
              rows={2}
              className={input}
              placeholder="Motif de la consultation..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className={label}>Notes médicales</label>
            <textarea
              {...register('notes')}
              rows={2}
              className={input}
              placeholder="Notes internes (confidentielles)..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 border-t border-gray-50">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-soft-600 text-white text-sm font-semibold hover:bg-soft-700 transition-colors disabled:opacity-60"
            >
              {saving ? 'Sauvegarde...' : isEdit ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
