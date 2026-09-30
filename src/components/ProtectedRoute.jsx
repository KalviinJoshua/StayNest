import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Wraps routes that require a logged-in user. While the session is being
// restored we show a small loader so we don't flash the login page. Once we
// know the user is unauthenticated, we redirect to /login.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-ivory">
        <div className="flex items-center gap-3 text-pine">
          <span className="w-5 h-5 rounded-full border-2 border-pine/30 border-t-pine animate-spin" />
          <span className="text-sm font-medium">Loading your account…</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
