import sql from './db';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'done';
export type AppointmentSource = 'web' | 'whatsapp';

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  preferred_date?: string | null;
  message?: string | null;
  status: AppointmentStatus;
  source: AppointmentSource;
  notes?: string | null;
  created_at: string;
}

export interface AppointmentSearchParams {
  query?: string;                       // searches name OR phone
  date?: string;                        // ISO date string YYYY-MM-DD
  status?: AppointmentStatus | 'all';
}

export async function createAppointment(
  data: Omit<Appointment, 'id' | 'created_at' | 'status'>
): Promise<Appointment> {
  const rows = await sql`
    INSERT INTO appointments (name, phone, email, service, preferred_date, message, source)
    VALUES (
      ${data.name},
      ${data.phone},
      ${data.email ?? null},
      ${data.service},
      ${data.preferred_date ?? null},
      ${data.message ?? null},
      ${data.source}
    )
    RETURNING *
  `;
  return rows[0] as Appointment;
}

export async function searchAppointments(
  params: AppointmentSearchParams = {}
): Promise<Appointment[]> {
  const { query, date, status } = params;

  if (query && date && status && status !== 'all') {
    return sql`
      SELECT * FROM appointments
      WHERE (lower(name) LIKE ${'%' + query.toLowerCase() + '%'} OR phone LIKE ${'%' + query + '%'})
        AND preferred_date = ${date}::date
        AND status = ${status}
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (query && date) {
    return sql`
      SELECT * FROM appointments
      WHERE (lower(name) LIKE ${'%' + query.toLowerCase() + '%'} OR phone LIKE ${'%' + query + '%'})
        AND preferred_date = ${date}::date
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (query && status && status !== 'all') {
    return sql`
      SELECT * FROM appointments
      WHERE (lower(name) LIKE ${'%' + query.toLowerCase() + '%'} OR phone LIKE ${'%' + query + '%'})
        AND status = ${status}
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (date && status && status !== 'all') {
    return sql`
      SELECT * FROM appointments
      WHERE preferred_date = ${date}::date AND status = ${status}
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (query) {
    return sql`
      SELECT * FROM appointments
      WHERE lower(name) LIKE ${'%' + query.toLowerCase() + '%'} OR phone LIKE ${'%' + query + '%'}
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (date) {
    return sql`
      SELECT * FROM appointments
      WHERE preferred_date = ${date}::date
      ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  if (status && status !== 'all') {
    return sql`
      SELECT * FROM appointments WHERE status = ${status} ORDER BY created_at DESC
    ` as Promise<Appointment[]>;
  }
  return sql`SELECT * FROM appointments ORDER BY created_at DESC` as Promise<Appointment[]>;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<Appointment> {
  const rows = await sql`
    UPDATE appointments SET status = ${status} WHERE id = ${id} RETURNING *
  `;
  return rows[0] as Appointment;
}

export async function updateAppointmentNotes(
  id: string,
  notes: string
): Promise<Appointment> {
  const rows = await sql`
    UPDATE appointments SET notes = ${notes} WHERE id = ${id} RETURNING *
  `;
  return rows[0] as Appointment;
}

export async function updateAppointment(
  id: string,
  data: {
    name: string;
    phone: string;
    email?: string | null;
    service: string;
    preferred_date?: string | null;
    message?: string | null;
    status: AppointmentStatus;
    source: AppointmentSource;
    notes?: string | null;
  }
): Promise<Appointment> {
  const rows = await sql`
    UPDATE appointments
    SET name           = ${data.name},
        phone          = ${data.phone},
        email          = ${data.email ?? null},
        service        = ${data.service},
        preferred_date = ${data.preferred_date ?? null},
        message        = ${data.message ?? null},
        status         = ${data.status},
        source         = ${data.source},
        notes          = ${data.notes ?? null}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Appointment;
}

export async function deleteAppointment(id: string): Promise<void> {
  await sql`DELETE FROM appointments WHERE id = ${id}`;
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const rows = await sql`SELECT * FROM appointments WHERE id = ${id}`;
  return (rows[0] as Appointment) ?? null;
}

export async function seedAppointments(
  records: Omit<Appointment, 'id' | 'created_at'>[]
): Promise<void> {
  for (const record of records) {
    await sql`
      INSERT INTO appointments (name, phone, email, service, preferred_date, message, status, source, notes)
      VALUES (
        ${record.name}, ${record.phone}, ${record.email ?? null}, ${record.service},
        ${record.preferred_date ?? null}, ${record.message ?? null},
        ${record.status}, ${record.source}, ${record.notes ?? null}
      )
    `;
  }
}
