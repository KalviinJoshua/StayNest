import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

// --- Core middleware ---
app.use(express.json())
app.use(cookieParser())

// CORS must allow credentials so the auth cookie is sent cross-origin
// (Vercel frontend ↔ Render backend live on different domains).
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  }),
)

// --- Health check (used by Render) ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// --- Routes ---
app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/favorites', favoriteRoutes)

// --- 404 ---
app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// --- Central error handler: never leak stack traces in production ---
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500
  console.error('[error]', err.message)
  const body = { message: status === 500 ? 'Something went wrong' : err.message }
  if (process.env.NODE_ENV !== 'production') body.detail = err.message
  res.status(status).json(body)
})

app.listen(PORT, () => {
  console.log(`[server] StayNest API listening on http://localhost:${PORT}`)
})
