import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Honor the PORT env var when provided (used by the preview harness),
    // otherwise fall back to Vite's default.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
})
