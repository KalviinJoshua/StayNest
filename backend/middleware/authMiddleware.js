import jwt from 'jsonwebtoken'

// Guards protected routes. Reads the JWT from the HTTP-only cookie, verifies it,
// and attaches the user id to the request. Responds 401 when missing/invalid.
export function requireAuth(req, res, next) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.id
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired session' })
  }
}
