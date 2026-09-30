// Applies db/schema.sql to the configured database. Idempotent (uses IF NOT EXISTS).
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pool } from './database.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function migrate() {
  const sql = await readFile(join(__dirname, 'schema.sql'), 'utf8')
  await pool.query(sql)
  console.log('[migrate] schema applied successfully')
  await pool.end()
}

migrate().catch((err) => {
  console.error('[migrate] failed:', err.message)
  process.exit(1)
})
