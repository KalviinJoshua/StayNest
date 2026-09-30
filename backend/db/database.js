import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

if (!process.env.DATABASE_URL) {
  // Fail loudly at startup rather than on the first query.
  console.error('[db] DATABASE_URL is not set. Copy backend/.env.example to backend/.env and fill it in.')
}

// Supabase and most hosted Postgres providers require SSL. Local Postgres does not,
// so only enable SSL when the connection string points at a remote host.
const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '')

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
})

// Small helper so callers don't each grab/release a client for one-off queries.
export const query = (text, params) => pool.query(text, params)
