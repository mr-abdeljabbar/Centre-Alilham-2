import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle, FileText,
  Check, X, CheckCheck, Download, Search,
  Plus, Pencil, Trash2, Upload,
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  searchAppointments,
  updateAppointmentStatus,
  updateAppointmentNotes,
  updateAppointment,
  deleteAppointment,
  createAppointment,
  seedAppointments,
  Appointment,
  AppointmentStatus,
  AppointmentSource,
  AppointmentSearchParams,
} from '../../lib/appointments';
import { buildWhatsAppConfirmationUrl } from '../../lib/whatsapp';
import { exportAppointmentsToExcel } from '../../lib/exportExcel';
import { downloadPrescriptionPDF } from '../../lib/exportPDF';
import {
  getStatusSummary, getServiceStats, getMonthlyStats, getPeakHours,
  StatusSummary, ServiceStat, DailyStat, HourlyStat,
} from '../../lib/analytics';
import SeedButton from './SeedButton';
import ConfirmModal from './ConfirmModal';
import AppointmentModal from './AppointmentModal';

/* ─── Types ───────────────────────────────────────────────────────────── */
type AdminTab = 'appointments' | 'stats' | 'tools';

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending:   'En attente',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  done:      'Terminé',
};

const STATUS_BADGE: Record<AppointmentStatus, string> = {
  pending:   'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-600',
  done:      'bg-gray-100 text-gray-600',
};

/* ─── AdminPage ───────────────────────────────────────────────────────── */
const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  // Tab
  const [tab, setTab] = useState<AdminTab>('appointments');

  // Appointments list + loading
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);

  // Filters
  const [searchQuery, setSearchQuery]   = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [dateFilter, setDateFilter]     = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'all'>('all');

  // Inline notes
  const [expandedRow, setExpandedRow]   = useState<string | null>(null);
  const [notesMap, setNotesMap]         = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes]   = useState<Set<string>>(new Set());

  // CRUD modals
  const [apptModal, setApptModal]       = useState<{ mode: 'add' | 'edit'; appt?: Appointment } | null>(null);
  const [savingAppt, setSavingAppt]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);
  const [deleting, setDeleting]         = useState(false);

  // Excel import
  const importRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting]       = useState(false);

  // Stats
  const [statsLoaded, setStatsLoaded]   = useState(false);
  const [statusSummary, setStatusSummary] = useState<StatusSummary | null>(null);
  const [serviceStats, setServiceStats] = useState<ServiceStat[]>([]);
  const [dailyStats, setDailyStats]     = useState<DailyStat[]>([]);
  const [hourStats, setHourStats]       = useState<HourlyStat[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);

  /* ── Auth guard ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (sessionStorage.getItem('admin_authenticated') !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  /* ── Debounce search query ──────────────────────────────────────────── */
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  /* ── Fetch appointments when filters change ─────────────────────────── */
  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params: AppointmentSearchParams = {
        query:  debouncedQuery || undefined,
        date:   dateFilter     || undefined,
        status: statusFilter,
      };
      const data = await searchAppointments(params);
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, dateFilter, statusFilter]);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  /* ── Load stats lazily when stats tab is opened ─────────────────────── */
  useEffect(() => {
    if (tab !== 'stats' || statsLoaded) return;
    const load = async () => {
      setLoadingStats(true);
      try {
        const [summary, svc, daily, hours] = await Promise.all([
          getStatusSummary(),
          getServiceStats(),
          getMonthlyStats(),
          getPeakHours(),
        ]);
        setStatusSummary(summary);
        setServiceStats(svc);
        setDailyStats(daily);
        setHourStats(hours);
        setStatsLoaded(true);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };
    load();
  }, [tab, statsLoaded]);

  /* ── Status update ──────────────────────────────────────────────────── */
  const handleStatus = async (id: string, status: AppointmentStatus) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  /* ── Notes ──────────────────────────────────────────────────────────── */
  const toggleRow = (appt: Appointment) => {
    if (expandedRow === appt.id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(appt.id);
      setNotesMap((prev) => ({ ...prev, [appt.id]: appt.notes ?? '' }));
    }
  };

  const saveNotes = async (id: string) => {
    setSavingNotes((prev) => new Set(prev).add(id));
    try {
      const updated = await updateAppointmentNotes(id, notesMap[id] ?? '');
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, notes: updated.notes } : a))
      );
      setExpandedRow(null);
    } catch (err) {
      console.error('Notes save failed:', err);
    } finally {
      setSavingNotes((prev) => { const s = new Set(prev); s.delete(id); return s; });
    }
  };

  /* ── CRUD ───────────────────────────────────────────────────────────── */
  const handleSaveAppt = async (data: Omit<Appointment, 'id' | 'created_at'>) => {
    setSavingAppt(true);
    try {
      if (apptModal?.mode === 'edit' && apptModal.appt) {
        const updated = await updateAppointment(apptModal.appt.id, data);
        setAppointments((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a))
        );
      } else {
        await createAppointment({ ...data, source: data.source ?? 'web' });
        await fetchAppointments();
        setStatsLoaded(false);
      }
      setApptModal(null);
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSavingAppt(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAppointment(deleteTarget.id);
      setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
      setStatsLoaded(false);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(false);
    }
  };

  /* ── Excel Import ───────────────────────────────────────────────────── */
  const handleExcelImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const ExcelJS = await import('exceljs');
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(await file.arrayBuffer());
      const ws = wb.worksheets[0];

      // Helper: extract cell as plain string
      const cellStr = (row: import('exceljs').Row, col: number): string => {
        const v = row.getCell(col).value;
        if (v === null || v === undefined) return '';
        if (v instanceof Date) {
          const y = v.getFullYear();
          const mo = String(v.getMonth() + 1).padStart(2, '0');
          const d  = String(v.getDate()).padStart(2, '0');
          return `${y}-${mo}-${d}`;
        }
        if (typeof v === 'object' && 'text' in v) return String((v as { text: string }).text).trim();
        return String(v).trim();
      };

      // Parse fr-MA date (dd/MM/yyyy) → ISO yyyy-MM-dd
      const parseFrDate = (s: string): string | null => {
        if (!s || s === '—') return null;
        if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.substring(0, 10);
        const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
        return null;
      };

      const records: Omit<Appointment, 'id' | 'created_at'>[] = [];

      ws.eachRow((row) => {
        // Export layout: col1=# col2=Nom col3=Tel col4=Email col5=Service col6=DateRDV col7=Statut col8=Source col9=Message
        // Only data rows have a numeric value in col 1 (the row index 1, 2, 3…)
        const indexCell = row.getCell(1).value;
        if (typeof indexCell !== 'number') return; // skip title/header/footer rows

        const name  = cellStr(row, 2);
        const phone = cellStr(row, 3);
        if (!name || !phone) return;

        const statusRaw = cellStr(row, 7).toLowerCase();
        const status: AppointmentStatus =
          statusRaw.includes('confirm') ? 'confirmed' :
          statusRaw.includes('annul')   ? 'cancelled' :
          statusRaw.includes('termin')  ? 'done'      : 'pending';

        const sourceRaw = cellStr(row, 8).toLowerCase();
        const source: AppointmentSource = sourceRaw.includes('whatsapp') ? 'whatsapp' : 'web';

        records.push({
          name,
          phone,
          email:          cellStr(row, 4) || null,
          service:        cellStr(row, 5) || 'Consultation gynécologique',
          preferred_date: parseFrDate(cellStr(row, 6)),
          message:        cellStr(row, 9) || null,
          status,
          source,
          notes:          null,
        });
      });

      if (records.length === 0) {
        alert('Aucune ligne valide trouvée. Assurez-vous d\'utiliser un fichier exporté depuis ce tableau de bord.');
        return;
      }

      await seedAppointments(records);
      alert(`${records.length} client(s) importé(s) avec succès.`);
      await fetchAppointments();
      setStatsLoaded(false);
    } catch (err) {
      console.error('Import failed:', err);
      alert("Erreur lors de l'importation. Vérifiez le format du fichier.");
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  /* ── Stats card helpers ──────────────────────────────────────────────── */
  const pending   = appointments.filter((a) => a.status === 'pending').length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const done      = appointments.filter((a) => a.status === 'done').length;

  /* ─────────────────────────────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">

        {/* ── TABS ────────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-6">
          {(['appointments', 'stats', 'tools'] as AdminTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t
                  ? 'bg-soft-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t === 'appointments' ? 'Rendez-vous' : t === 'stats' ? 'Statistiques' : 'Outils'}
            </button>
          ))}
        </div>

        {/* ── APPOINTMENTS TAB ─────────────────────────────────────────── */}
        {tab === 'appointments' && (
          <div className="space-y-5">

            {/* Search / Filter bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="flex flex-wrap gap-3 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Recherche</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Nom ou téléphone..."
                      className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Date RDV</label>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="py-2.5 px-3 text-sm rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Statut</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | 'all')}
                    className="py-2.5 px-3 text-sm rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none bg-white"
                  >
                    <option value="all">Tous</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                    <option value="done">Terminé</option>
                  </select>
                </div>

                <button
                  onClick={() => { setSearchQuery(''); setDateFilter(''); setStatusFilter('all'); }}
                  className="py-2.5 px-4 text-sm rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Réinitialiser
                </button>

                <button
                  onClick={() => setApptModal({ mode: 'add' })}
                  className="flex items-center gap-2 py-2.5 px-4 text-sm rounded-xl bg-soft-600 text-white font-semibold hover:bg-soft-700 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau
                </button>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total',      value: appointments.length, cls: 'text-gray-900' },
                { label: 'En attente', value: pending,             cls: 'text-yellow-600' },
                { label: 'Confirmés',  value: confirmed,           cls: 'text-green-600' },
                { label: 'Terminés',   value: done,                cls: 'text-gray-500' },
              ].map(({ label, value, cls }) => (
                <div key={label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                  <p className={`text-2xl font-bold ${cls}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Export + table card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-700">
                  {appointments.length} rendez-vous
                </p>
                <button
                  onClick={() => exportAppointmentsToExcel(appointments)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-soft-50 text-soft-600 hover:bg-soft-100 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Exporter Excel
                </button>
              </div>

              {loading ? (
                <div className="p-12 text-center text-gray-400">Chargement...</div>
              ) : appointments.length === 0 ? (
                <div className="p-12 text-center text-gray-400">Aucun résultat.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 text-left">Date RDV</th>
                        <th className="px-4 py-3 text-left">Patiente</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Service</th>
                        <th className="px-4 py-3 text-left">Statut</th>
                        <th className="px-4 py-3 text-left">Source</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {appointments.map((appt) => (
                        <React.Fragment key={appt.id}>
                          <tr
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => toggleRow(appt)}
                          >
                            {/* Date RDV */}
                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                              {appt.preferred_date
                                ? new Date(appt.preferred_date).toLocaleDateString('fr-MA')
                                : '—'}
                            </td>

                            {/* Patiente */}
                            <td className="px-4 py-3">
                              <p className="font-medium text-gray-900">{appt.name}</p>
                              <p className="text-xs text-gray-400">{appt.phone}</p>
                            </td>

                            {/* Email */}
                            <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">
                              {appt.email ?? '—'}
                            </td>

                            {/* Service */}
                            <td className="px-4 py-3">
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-soft-50 text-soft-600">
                                {appt.service}
                              </span>
                            </td>

                            {/* Statut */}
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[appt.status]}`}>
                                {STATUS_LABELS[appt.status]}
                              </span>
                            </td>

                            {/* Source */}
                            <td className="px-4 py-3">
                              {appt.source === 'whatsapp' ? (
                                <span className="flex items-center gap-1 text-xs text-gray-600">
                                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                                  WhatsApp
                                </span>
                              ) : (
                                <span className="text-xs text-gray-500">Web</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {appt.status !== 'confirmed' && appt.status !== 'done' && appt.status !== 'cancelled' && (
                                  <button
                                    onClick={() => handleStatus(appt.id, 'confirmed')}
                                    title="Confirmer"
                                    className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {appt.status !== 'cancelled' && appt.status !== 'done' && (
                                  <button
                                    onClick={() => handleStatus(appt.id, 'cancelled')}
                                    title="Annuler"
                                    className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {appt.status === 'confirmed' && (
                                  <button
                                    onClick={() => handleStatus(appt.id, 'done')}
                                    title="Marquer terminé"
                                    className="p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                                  >
                                    <CheckCheck className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {appt.status === 'confirmed' && (
                                  <a
                                    href={buildWhatsAppConfirmationUrl(appt.phone, appt.name, appt.service)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Envoyer confirmation WhatsApp"
                                    className="p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                                  </a>
                                )}
                                <button
                                  onClick={() => downloadPrescriptionPDF(appt)}
                                  title="Télécharger ordonnance PDF"
                                  className="p-1.5 rounded-lg bg-soft-50 text-soft-600 hover:bg-soft-100 transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit */}
                                <button
                                  onClick={() => setApptModal({ mode: 'edit', appt })}
                                  title="Modifier"
                                  className="p-1.5 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => setDeleteTarget(appt)}
                                  title="Supprimer"
                                  className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Inline notes panel */}
                          {expandedRow === appt.id && (
                            <tr>
                              <td colSpan={7} className="px-4 pb-4 bg-soft-50">
                                <div className="pt-3 space-y-2">
                                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    Notes médicales (confidentielles)
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={notesMap[appt.id] ?? ''}
                                    onChange={(e) =>
                                      setNotesMap((prev) => ({ ...prev, [appt.id]: e.target.value }))
                                    }
                                    placeholder="Ajouter une note médicale..."
                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-soft-500 focus:ring-4 focus:ring-soft-100 outline-none bg-white"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => saveNotes(appt.id)}
                                      disabled={savingNotes.has(appt.id)}
                                      className="px-4 py-1.5 text-sm font-semibold bg-soft-600 text-white rounded-lg hover:bg-soft-700 transition-colors disabled:opacity-60"
                                    >
                                      {savingNotes.has(appt.id) ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </button>
                                    <button
                                      onClick={() => setExpandedRow(null)}
                                      className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                      Annuler
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── STATS TAB ────────────────────────────────────────────────── */}
        {tab === 'stats' && (
          loadingStats ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center text-gray-400">
              Chargement des statistiques…
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total</p>
                  <p className="text-3xl font-bold text-gray-900">{statusSummary?.total ?? '—'}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ce mois-ci</p>
                  <p className="text-3xl font-bold text-soft-600">
                    {dailyStats.reduce((s, d) => s + d.count, 0)}
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Service le plus demandé</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug">{serviceStats[0]?.service ?? '—'}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">En attente</p>
                  <p className="text-3xl font-bold text-yellow-500">{statusSummary?.pending ?? '—'}</p>
                </div>
              </div>

              {/* Bar chart: services */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Rendez-vous par service</h3>
                {serviceStats.length === 0 ? (
                  <p className="text-sm text-gray-400">Aucune donnée.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={serviceStats} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="service" tick={{ fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Rendez-vous" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Line chart: daily 30 days */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Soumissions (30 derniers jours)</h3>
                {dailyStats.length === 0 ? (
                  <p className="text-sm text-gray-400">Aucune donnée.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={dailyStats} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#0E7490" strokeWidth={2} dot={false} name="RDV" />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Bar chart: peak hours */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Heures de soumission</h3>
                {hourStats.length === 0 ? (
                  <p className="text-sm text-gray-400">Aucune donnée.</p>
                ) : (
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={hourStats} margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" tickFormatter={(h: number) => `${h}h`} tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip labelFormatter={(h) => `${h}h00`} />
                      <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} name="RDV" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          )
        )}

        {/* ── TOOLS TAB ─────────────────────────────────────────────────── */}
        {tab === 'tools' && (
          <div className="space-y-6">
            {/* Seed card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-1">Données de démonstration</h2>
              <p className="text-sm text-gray-500 mb-4">
                Insérer 18 patients de démonstration pour tester le tableau de bord.
                Cette action ajoute des rendez-vous avec des statuts variés et des notes.
              </p>
              <SeedButton onSuccess={() => { fetchAppointments(); setStatsLoaded(false); }} />
            </div>

            {/* Import Excel card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-1">Importer depuis Excel</h2>
              <p className="text-sm text-gray-500 mb-1">
                Importez un fichier <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">.xlsx</code> exporté depuis ce tableau de bord.
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Colonnes attendues (dans l'ordre) : Date RDV, Nom, Téléphone, Email, Service, Statut, Source, Message, Notes.
              </p>
              <input
                ref={importRef}
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleExcelImport}
              />
              <button
                onClick={() => importRef.current?.click()}
                disabled={importing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-soft-600 text-white text-sm font-semibold hover:bg-soft-700 transition-colors disabled:opacity-60"
              >
                <Upload className="w-4 h-4" />
                {importing ? 'Importation...' : 'Sélectionner un fichier'}
              </button>
            </div>

            {/* Export all card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-1">Exporter tous les rendez-vous</h2>
              <p className="text-sm text-gray-500 mb-4">
                Télécharger la liste complète (sans filtre) au format Excel.
              </p>
              <button
                onClick={async () => {
                  const all = await searchAppointments();
                  exportAppointmentsToExcel(all);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-soft-600 text-white text-sm font-semibold hover:bg-soft-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Exporter tout
              </button>
            </div>

            {/* SQL note card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-2">Initialisation de la base de données</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Avant d'insérer des données, assurez-vous d'avoir exécuté le schéma SQL dans le
                dashboard Neon. Le fichier <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">lib/schema.sql</code> contient
                les instructions <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">CREATE TABLE</code> et les index nécessaires.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── APPOINTMENT MODAL ──────────────────────────────────────────── */}
      {apptModal && (
        <AppointmentModal
          appointment={apptModal.appt}
          onSave={handleSaveAppt}
          onCancel={() => setApptModal(null)}
          saving={savingAppt}
        />
      )}

      {/* ── DELETE CONFIRM MODAL ───────────────────────────────────────── */}
      {deleteTarget && (
        <ConfirmModal
          title="Supprimer le rendez-vous"
          message={`Êtes-vous sûr de vouloir supprimer le rendez-vous de ${deleteTarget.name} ? Cette action est irréversible.`}
          confirmLabel={deleting ? 'Suppression...' : 'Supprimer'}
          danger
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;
