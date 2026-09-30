import { query } from '../db/database.js'

// GET /api/favorites  — the logged-in user's saved properties (full property rows)
export async function listFavorites(req, res, next) {
  try {
    const { rows } = await query(
      `SELECT p.*, f.created_at AS saved_at
         FROM favorites f
         JOIN properties p ON p.id = f.property_id
        WHERE f.user_id = $1
        ORDER BY f.created_at DESC`,
      [req.userId],
    )
    res.json({ properties: rows })
  } catch (err) {
    next(err)
  }
}

// POST /api/favorites/:propertyId  — save a property
export async function addFavorite(req, res, next) {
  try {
    const propertyId = Number(req.params.propertyId)
    if (!Number.isInteger(propertyId)) {
      return res.status(400).json({ message: 'Invalid property id' })
    }

    // Make sure the property exists before creating the favorite.
    const property = await query('SELECT id FROM properties WHERE id = $1', [propertyId])
    if (property.rowCount === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }

    // ON CONFLICT DO NOTHING relies on the UNIQUE(user_id, property_id) constraint
    // to prevent the same user favoriting the same property twice.
    const result = await query(
      `INSERT INTO favorites (user_id, property_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, property_id) DO NOTHING
       RETURNING id`,
      [req.userId, propertyId],
    )

    if (result.rowCount === 0) {
      return res.status(200).json({ message: 'Already saved', propertyId })
    }
    res.status(201).json({ message: 'Saved', propertyId })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/favorites/:propertyId  — remove a saved property
export async function removeFavorite(req, res, next) {
  try {
    const propertyId = Number(req.params.propertyId)
    if (!Number.isInteger(propertyId)) {
      return res.status(400).json({ message: 'Invalid property id' })
    }

    const result = await query(
      'DELETE FROM favorites WHERE user_id = $1 AND property_id = $2',
      [req.userId, propertyId],
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Not in your saved list' })
    }
    res.json({ message: 'Removed', propertyId })
  } catch (err) {
    next(err)
  }
}
