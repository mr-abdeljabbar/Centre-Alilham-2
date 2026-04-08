import sql from './db';

export interface BookedSlot {
  date: string;
  service: string;
  status: 'pending' | 'confirmed';
}

export async function getBookedSlots(month: string): Promise<BookedSlot[]> {
  const rows = await sql`
    SELECT preferred_date::text AS date, service, status
    FROM appointments
    WHERE status IN ('pending', 'confirmed')
      AND preferred_date IS NOT NULL
      AND to_char(preferred_date, 'YYYY-MM') = ${month}
  `;
  return rows as BookedSlot[];
}
