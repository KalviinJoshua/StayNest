// Seeds the properties table. Safe to re-run: it clears existing properties first.
// Usage: npm run seed   (requires DATABASE_URL and a migrated schema)
import { pool } from '../db/database.js'
import { properties } from './propertiesData.js'

async function seed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // Reset properties (and dependent favorites) so seeding is idempotent.
    await client.query('TRUNCATE properties RESTART IDENTITY CASCADE')

    for (const p of properties) {
      await client.query(
        `INSERT INTO properties
           (title, location, description, price_per_night, rating, review_count, image_url, category, property_type, dates, note)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          p.title,
          p.location,
          p.description,
          p.price_per_night,
          p.rating,
          p.review_count,
          p.image_url,
          p.category,
          p.property_type || 'stay',
          p.dates,
          p.note,
        ],
      )
    }

    await client.query('COMMIT')
    console.log(`[seed] inserted ${properties.length} properties`)
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

seed().catch((err) => {
  console.error('[seed] failed:', err.message)
  process.exit(1)
})
