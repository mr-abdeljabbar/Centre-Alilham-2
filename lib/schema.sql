-- Documentation only — paste into the Neon dashboard SQL editor to initialize the database.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS appointments (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           VARCHAR(100) NOT NULL,
  phone          VARCHAR(25)  NOT NULL,
  email          VARCHAR(150),
  service        VARCHAR(120) NOT NULL,
  preferred_date DATE,
  message        TEXT,
  status         VARCHAR(20)  NOT NULL DEFAULT 'pending',  -- pending | confirmed | cancelled | done
  source         VARCHAR(20)  NOT NULL DEFAULT 'web',       -- web | whatsapp
  notes          TEXT,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_appointments_name   ON appointments (lower(name));
CREATE INDEX IF NOT EXISTS idx_appointments_phone  ON appointments (phone);
CREATE INDEX IF NOT EXISTS idx_appointments_date   ON appointments (preferred_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments (status);
