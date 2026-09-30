import { useState } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Globe, Menu, User, Leaf, X, LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const navLinks = [
  { label: 'Stays', type: 'stays', to: '/' },
  { label: 'Experiences', type: 'experiences', to: '/?type=experiences' },
  { label: 'Adventures', type: 'adventures', to: '/?type=adventures' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  // Highlight the active grouping only while on the home page.
  const activeType =
    location.pathname === '/' ? searchParams.get('type') || 'stays' : null

  const handleLogout = async () => {
    await logout()
    setMobileOpen(false)
    notify('You have been logged out')
    navigate('/')
  }

  const firstName = user?.name?.split(' ')[0] || 'Account'

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur border-b border-pine-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-pine text-ivory">
              <Leaf size={18} strokeWidth={2.25} />
            </span>
            <span className="font-display text-2xl font-semibold text-pine tracking-tight">
              StayNest
            </span>
          </Link>

          {/* Center nav links - desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-white/60 border border-pine-100 rounded-full px-1 py-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeType === link.type ? 'bg-pine text-ivory' : 'text-pine-600 hover:bg-sage'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-medium text-ink px-3 py-2 rounded-full hover:bg-sage transition-colors">
              Become a host
            </button>
            <button
              aria-label="Language and region"
              className="grid place-items-center w-10 h-10 rounded-full hover:bg-sage transition-colors"
            >
              <Globe size={18} />
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-medium text-ink px-4 py-2 rounded-full hover:bg-sage transition-colors"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-ink px-4 py-2 rounded-full hover:bg-sage transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
                <Link
                  to="/dashboard"
                  aria-label="Your account"
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-pine-100 hover:shadow-soft transition-shadow"
                >
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-pine text-ivory text-xs font-semibold">
                    {firstName.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold text-pine">{firstName}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-ink px-4 py-2 rounded-full hover:bg-sage transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold bg-pine text-ivory px-5 py-2.5 rounded-full hover:bg-pine-700 transition-colors shadow-soft"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  aria-label="Account menu"
                  className="grid place-items-center w-10 h-10 rounded-full border border-pine-100 hover:shadow-soft transition-shadow"
                >
                  <User size={17} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-pine-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-pine-100 bg-ivory px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeType === link.type ? 'bg-sage text-pine' : 'text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-pine-100 my-2" />
          <button className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-ink">
            Become a host
          </button>
          <button className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-ink">
            <Globe size={17} /> Language / Region
          </button>

          {isAuthenticated ? (
            <>
              <p className="px-3 pt-1 text-sm text-ink/60">
                Signed in as <span className="font-semibold text-pine">{user.name}</span>
              </p>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-3 py-2.5 rounded-full border border-pine-100 text-sm font-semibold text-pine"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-center px-3 py-2.5 rounded-full bg-pine text-ivory text-sm font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-3 py-2.5 rounded-full border border-pine-100 text-sm font-semibold text-pine"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-3 py-2.5 rounded-full bg-pine text-ivory text-sm font-semibold"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
