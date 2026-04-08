import sql from './db';

export interface ServiceStat  { service: string; count: number; }
export interface DailyStat    { date: string;    count: number; }
export interface HourlyStat   { hour: number;    count: number; }
export interface StatusSummary {
  pending:   number;
  confirmed: number;
  cancelled: number;
  done:      number;
  total:     number;
}

export async function getStatusSummary(): Promise<StatusSummary> {
  const rows = await sql`
    SELECT
      COUNT(*) FILTER (WHERE status = 'pending')::int   AS pending,
      COUNT(*) FILTER (WHERE status = 'confirmed')::int AS confirmed,
      COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
      COUNT(*) FILTER (WHERE status = 'done')::int      AS done,
      COUNT(*)::int                                      AS total
    FROM appointments
  `;
  return rows[0] as StatusSummary;
}

export async function getServiceStats(): Promise<ServiceStat[]> {
  return sql`
    SELECT service, COUNT(*)::int AS count
    FROM appointments GROUP BY service ORDER BY count DESC
  ` as Promise<ServiceStat[]>;
}

export async function getMonthlyStats(): Promise<DailyStat[]> {
  return sql`
    SELECT to_char(created_at, 'YYYY-MM-DD') AS date, COUNT(*)::int AS count
    FROM appointments
    WHERE created_at >= now() - interval '30 days'
    GROUP BY date ORDER BY date ASC
  ` as Promise<DailyStat[]>;
}

export async function getPeakHours(): Promise<HourlyStat[]> {
  return sql`
    SELECT EXTRACT(HOUR FROM created_at)::int AS hour, COUNT(*)::int AS count
    FROM appointments GROUP BY hour ORDER BY hour ASC
  ` as Promise<HourlyStat[]>;
}
