import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { getBookedSlots } from '../lib/availability';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { fr };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { locale: fr }),
  getDay,
  locales,
});

/* ── Custom calendar CSS injected once ─────────────────────────────────── */
const CAL_CSS = `
.alilham-cal .rbc-month-view {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.alilham-cal .rbc-header {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 10px 0;
  border-bottom: none;
}
.alilham-cal .rbc-header + .rbc-header { border-left: 1px solid #7c3aed88; }
.alilham-cal .rbc-month-header { border-bottom: none; }
.alilham-cal .rbc-today {
  background-color: #f5f3ff !important;
}
.alilham-cal .rbc-today .rbc-date-cell a,
.alilham-cal .rbc-today .rbc-date-cell span {
  background: #8b5cf6;
  color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.alilham-cal .rbc-date-cell {
  padding: 4px 6px 2px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  text-align: right;
}
.alilham-cal .rbc-off-range-bg { background-color: #f9fafb; }
.alilham-cal .rbc-off-range .rbc-date-cell { color: #d1d5db; }
.alilham-cal .rbc-day-bg:hover:not(.rbc-off-range-bg) { background-color: #f5f3ff; transition: background 0.15s; cursor: pointer; }
.alilham-cal .rbc-row-content { min-height: 44px; }
.alilham-cal .rbc-event { border-radius: 6px !important; font-size: 10px !important; font-weight: 600 !important; padding: 1px 5px !important; }
.alilham-cal .rbc-event:focus { outline: none; }
.alilham-cal .rbc-toolbar { margin-bottom: 10px; gap: 8px; }
.alilham-cal .rbc-toolbar button {
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 13px;
  font-weight: 600;
  color: #4b5563;
  padding: 5px 14px;
  transition: all 0.15s;
}
.alilham-cal .rbc-toolbar button:hover { background: #f5f3ff; border-color: #8b5cf6; color: #7c3aed; }
.alilham-cal .rbc-toolbar button.rbc-active { background: #8b5cf6 !important; color: #fff !important; border-color: #7c3aed !important; }
.alilham-cal .rbc-toolbar-label { font-size: 15px; font-weight: 700; color: #111827; letter-spacing: -0.01em; }
.alilham-cal .rbc-month-row { border-top: 1px solid #f3f4f6; }
`;

interface BookingCalendarProps {
  onDateSelect: (date: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedEvents, setBookedEvents] = useState<Event[]>([]);
  const { t } = useTranslation();

  /* Inject CSS once */
  useEffect(() => {
    const id = 'alilham-cal-styles';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = CAL_CSS;
      document.head.appendChild(el);
    }
    return () => {};
  }, []);

  const fetchBooked = useCallback(async (month: string) => {
    try {
      const slots = await getBookedSlots(month);
      const events: Event[] = slots.map((s) => ({
        title: s.status === 'confirmed'
          ? `✓ ${t('calendar.confirmed')}`
          : `⏳ ${t('calendar.pending')}`,
        start: new Date(s.date + 'T12:00:00'),
        end:   new Date(s.date + 'T12:00:00'),
        allDay: true,
        resource: s.status,
      }));
      setBookedEvents(events);
    } catch {
      setBookedEvents([]);
    }
  }, [t]);

  useEffect(() => {
    fetchBooked(format(currentDate, 'yyyy-MM'));
  }, [currentDate, fetchBooked]);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectSlot = ({ start }: { start: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(start);
    selected.setHours(0, 0, 0, 0);
    if (selected < today) return;
    onDateSelect(format(start, 'yyyy-MM-dd'));
  };

  const eventPropGetter = (event: Event) => {
    const status = event.resource as string;
    const confirmed = status === 'confirmed';
    return {
      style: {
        backgroundColor: confirmed ? '#059669' : '#d97706',
        borderColor:      confirmed ? '#047857' : '#b45309',
        borderRadius:     '6px',
        border:           `1px solid ${confirmed ? '#047857' : '#b45309'}`,
        color:            '#fff',
        fontSize:         '10px',
        fontWeight:       '600',
        padding:          '1px 5px',
        boxShadow:        confirmed ? '0 1px 4px #05966940' : '0 1px 4px #d9770640',
      },
    };
  };

  const dayPropGetter = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (d < today) {
      return {
        style: {
          backgroundColor: '#f9fafb',
          cursor: 'not-allowed',
          pointerEvents: 'none' as const,
          opacity: 0.55,
        },
      };
    }
    return {};
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800">
          {t('calendar.choose_date')}
        </h3>
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] shadow-sm" />
            {t('calendar.confirmed')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706] shadow-sm" />
            {t('calendar.pending')}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-soft-200 border border-soft-300" />
            {t('calendar.free')}
          </span>
        </div>
      </div>

      <div className="alilham-cal h-64 sm:h-[380px]">
        <Calendar
          localizer={localizer}
          events={bookedEvents}
          date={currentDate}
          defaultView="month"
          views={['month']}
          onNavigate={handleNavigate}
          onSelectSlot={handleSelectSlot}
          selectable
          eventPropGetter={eventPropGetter}
          dayPropGetter={dayPropGetter}
          culture="fr"
          messages={{
            next:     '›',
            previous: '‹',
            today:    t('calendar.today'),
            month:    t('calendar.month'),
          }}
        />
      </div>
    </div>
  );
};

export default BookingCalendar;
