-- StayNest database schema (PostgreSQL)
-- Run with: npm run migrate   (or paste into the Supabase SQL editor)

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  phone         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS properties (
  id              SERIAL PRIMARY KEY,
  title           TEXT           NOT NULL,
  location        TEXT           NOT NULL,
  description     TEXT           NOT NULL,
  price_per_night INTEGER        NOT NULL,
  rating          NUMERIC(3,2)   NOT NULL DEFAULT 0,
  review_count    INTEGER        NOT NULL DEFAULT 0,
  image_url       TEXT           NOT NULL,
  category        TEXT           NOT NULL,
  -- Top-level grouping used by the navbar: 'stay' | 'experience' | 'adventure'.
  property_type   TEXT           NOT NULL DEFAULT 'stay',
  dates           TEXT,
  note            TEXT,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT now()
);

-- Additive migration for databases created before property_type existed.
-- Safe to run repeatedly; existing rows default to 'stay'.
ALTER TABLE properties ADD COLUMN IF NOT EXISTS property_type TEXT NOT NULL DEFAULT 'stay';

CREATE TABLE IF NOT EXISTS favorites (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  property_id INTEGER     NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- A user cannot favorite the same property twice.
  CONSTRAINT favorites_user_property_unique UNIQUE (user_id, property_id)
);

CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
CREATE INDEX IF NOT EXISTS properties_category_idx ON properties (category);
CREATE INDEX IF NOT EXISTS properties_type_idx ON properties (property_type);
