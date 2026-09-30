// Thin fetch wrapper around the StayNest API.
// - Base URL comes from VITE_API_URL so the same build works locally and in prod.
// - credentials: 'include' sends the HTTP-only auth cookie on every request.
// - Non-2xx responses throw an Error carrying the server's message.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  // 204 / empty bodies
  const text = await res.text()
  const data = text ? JSON.parse(text) : {}

  if (!res.ok) {
    throw new Error(data.message || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  del: (path) => request(path, { method: 'DELETE' }),
}
