import bcrypt from 'bcryptjs'
import { query } from '../db/database.js'
import { generateToken, setAuthCookie, clearAuthCookie } from '../utils/generateToken.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Shape the row we return to the client — never includes password_hash.
const publicUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  createdAt: row.created_at,
})

// POST /api/auth/signup
export async function signup(req, res, next) {
  try {
    const name = (req.body.name || '').trim()
    const email = (req.body.email || '').trim().toLowerCase()
    const password = req.body.password || ''
    const phone = (req.body.phone || '').trim() || null

    // --- Server-side validation (never trust the client) ---
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' })
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' })
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rowCount > 0) {
      return res.status(409).json({ message: 'An account with this email already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const { rows } = await query(
      `INSERT INTO users (name, email, password_hash, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, phone, created_at`,
      [name, email, passwordHash, phone],
    )

    const user = rows[0]
    setAuthCookie(res, generateToken(user.id))
    res.status(201).json({ user: publicUser(user) })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const email = (req.body.email || '').trim().toLowerCase()
    const password = req.body.password || ''

    if (!EMAIL_RE.test(email) || !password) {
      return res.status(400).json({ message: 'Valid email and password are required' })
    }

    const { rows } = await query('SELECT * FROM users WHERE email = $1', [email])
    const user = rows[0]

    // Same generic error whether the email is unknown or the password is wrong,
    // so we don't reveal which emails have accounts.
    const ok = user && (await bcrypt.compare(password, user.password_hash))
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    setAuthCookie(res, generateToken(user.id))
    res.json({ user: publicUser(user) })
  } catch (err) {
    next(err)
  }
}

// GET /api/auth/me  (protected)
export async function me(req, res, next) {
  try {
    const { rows } = await query(
      'SELECT id, name, email, phone, created_at FROM users WHERE id = $1',
      [req.userId],
    )
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user: publicUser(rows[0]) })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/logout
export function logout(_req, res) {
  clearAuthCookie(res)
  res.json({ message: 'Logged out' })
}
