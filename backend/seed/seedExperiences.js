// Additive seed for the Experiences + Adventures rows.
//
// Unlike `npm run seed`, this does NOT truncate the table, so it preserves
// existing stays, their ids, and any saved favorites. Each row is inserted
// only if a property with the same title does not already exist, which makes
// the script safe to run repeatedly.
//
// Usage: npm run seed:discovery   (run once after `npm run migrate`)
import { pool } from '../db/database.js'
import { discoveryProperties } from './propertiesData.js'

async function seed() {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    let inserted = 0
    for (const p of discoveryProperties) {
      const { rowCount } = await client.query(
        `INSERT INTO properties
           (title, location, description, price_per_night, rating, review_count, image_url, category, property_type, dates, note)
         SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11
         WHERE NOT EXISTS (SELECT 1 FROM properties WHERE title = $1)`,
        [
          p.title,
          p.location,
          p.description,
          p.price_per_night,
          p.rating,
          p.review_count,
          p.image_url,
          p.category,
          p.property_type,
          p.dates,
          p.note,
        ],
      )
      inserted += rowCount
    }

    await client.query('COMMIT')
    console.log(
      `[seed:discovery] inserted ${inserted} new rows ` +
        `(${discoveryProperties.length - inserted} already present)`,
    )
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

seed().catch((err) => {
  console.error('[seed:discovery] failed:', err.message)
  process.exit(1)
})
