import jwt from 'jsonwebtoken'

// Signs a JWT carrying the user's id. Kept tiny on purpose — never put
// the password hash or other sensitive fields in the token payload.
export function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

// Sends the JWT as an HTTP-only cookie so client-side JS can never read it
// (mitigates XSS token theft). In production the frontend and API are on
// different domains, which requires SameSite=None + Secure.
export function setAuthCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production'
  res.cookie('token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: SEVEN_DAYS_MS,
  })
}

export function clearAuthCookie(res) {
  const isProd = process.env.NODE_ENV === 'production'
  res.clearCookie('token', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  })
}
