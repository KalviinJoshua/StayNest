import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Trash2, Mail, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const { favorites, count, loading, toggleFavorite } = useFavorites()
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-10">
        {/* Account header */}
        <div className="bg-white border border-pine-100 rounded-xl2 shadow-soft p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid place-items-center w-14 h-14 rounded-full bg-pine text-ivory text-xl font-semibold shrink-0">
              {firstName.charAt(0).toUpperCase()}
            </span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-pine">
                Welcome, {firstName}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1 text-sm text-ink/60">
                {user?.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} /> {user.email}
                  </span>
                )}
                {user?.createdAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> Member since{' '}
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Saved properties */}
        <div className="flex items-end justify-between mt-10 mb-5">
          <div>
            <h2 className="font-display text-2xl font-semibold text-pine">Saved stays</h2>
            <p className="text-ink/60 text-sm mt-1">
              {loading ? 'Loading your saved stays…' : `Saved properties: ${count}`}
            </p>
          </div>
        </div>

        {loading ? (
          <SavedSkeleton />
        ) : count === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((property) => (
              <SavedCard key={property.id} property={property} onRemove={toggleFavorite} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function SavedCard({ property, onRemove }) {
  const { notify } = useToast()
  const [busy, setBusy] = useState(false)

  const remove = async () => {
    setBusy(true)
    try {
      await onRemove(property) // toggling an already-saved property removes it
      notify('Removed from saved stays')
    } catch (err) {
      notify(err.message || 'Could not remove this stay', 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-white border border-pine-100 rounded-xl2 overflow-hidden shadow-soft flex flex-col">
      <div className="relative aspect-[16/10]">
        <img src={property.image_url} alt={property.title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 grid place-items-center w-8 h-8 rounded-full bg-white/90 shadow-soft">
          <Heart size={16} className="fill-clay text-clay" />
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-ink">{property.location}</p>
          <span className="flex items-center gap-1 text-sm shrink-0">
            <Star size={13} className="fill-ink text-ink" />
            {property.rating}
            <span className="text-ink/50">({property.review_count})</span>
          </span>
        </div>
        <p className="text-sm text-ink/60">{property.title}</p>
        <p className="text-sm pt-1">
          <span className="font-semibold text-ink">${property.price_per_night}</span>
          <span className="text-ink/60"> night</span>
        </p>

        <button
          onClick={remove}
          disabled={busy}
          className="mt-4 flex items-center justify-center gap-2 border border-pine-100 text-pine text-sm font-semibold rounded-xl py-2.5 hover:bg-clay-50 hover:text-clay-600 hover:border-clay-100 transition-colors disabled:opacity-60"
        >
          <Trash2 size={15} />
          {busy ? 'Removing…' : 'Remove from saved'}
        </button>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="bg-sage/40 border border-pine-100 rounded-xl2 py-16 px-6 text-center">
      <span className="inline-grid place-items-center w-14 h-14 rounded-full bg-white shadow-soft mb-4">
        <Heart size={22} className="text-clay" />
      </span>
      <h3 className="font-display text-xl font-semibold text-pine">No saved stays yet.</h3>
      <p className="text-ink/60 text-sm mt-2 max-w-sm mx-auto">
        Explore properties and tap the heart icon to save your favorites.
      </p>
      <Link
        to="/"
        className="inline-block mt-6 bg-clay hover:bg-clay-600 transition-colors text-white font-semibold text-sm rounded-full px-6 py-3 shadow-soft"
      >
        Explore stays
      </Link>
    </div>
  )
}

function SavedSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white border border-pine-100 rounded-xl2 overflow-hidden shadow-soft">
          <div className="aspect-[16/10] bg-sage animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-3/4 bg-sage rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-sage rounded animate-pulse" />
            <div className="h-9 w-full bg-sage rounded-xl animate-pulse mt-3" />
          </div>
        </div>
      ))}
    </div>
  )
}
