import { query } from '../db/database.js'

// GET /api/properties          — all properties
// GET /api/properties?category=Beach
// GET /api/properties?location=New%20York
// GET /api/properties?type=experience        (stay | experience | adventure)
// GET /api/properties?search=greece          (matches title OR location)
export async function listProperties(req, res, next) {
  try {
    const { category, location, type, search } = req.query
    const clauses = []
    const params = []

    if (category) {
      params.push(category)
      clauses.push(`category = $${params.length}`)
    }
    if (location) {
      params.push(`%${location}%`)
      clauses.push(`location ILIKE $${params.length}`)
    }
    if (type) {
      params.push(type)
      clauses.push(`property_type = $${params.length}`)
    }
    if (search) {
      params.push(`%${search}%`)
      // Free-text search across the listing title and its location.
      clauses.push(`(title ILIKE $${params.length} OR location ILIKE $${params.length})`)
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
    const { rows } = await query(
      `SELECT * FROM properties ${where} ORDER BY review_count DESC, id ASC`,
      params,
    )
    res.json({ properties: rows })
  } catch (err) {
    next(err)
  }
}

// GET /api/properties/:id
export async function getProperty(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid property id' })
    }
    const { rows } = await query('SELECT * FROM properties WHERE id = $1', [id])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    res.json({ property: rows[0] })
  } catch (err) {
    next(err)
  }
}
