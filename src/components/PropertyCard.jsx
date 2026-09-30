import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

export default function PropertyCard({ property }) {
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  // Support both the API shape (image_url, review_count, price_per_night)
  // and the legacy mock shape (image, reviews, price).
  const title = property.title
  const location = property.location
  const image = property.image_url || property.image
  const rating = property.rating
  const reviews = property.review_count ?? property.reviews
  const price = property.price_per_night ?? property.price
  const { dates, note } = property
  // Experiences/adventures are priced per person, stays per night.
  const priceUnit = property.property_type && property.property_type !== 'stay' ? 'person' : 'night'

  const saved = isFavorite(property.id)

  const handleFavorite = async (e) => {
    // Keep the heart click from following the card's link to the detail page.
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      notify('Log in to save your favorite stays')
      navigate('/login')
      return
    }
    setBusy(true)
    try {
      await toggleFavorite(property)
      notify(saved ? 'Removed from saved stays' : 'Saved to your stays')
    } catch (err) {
      notify(err.message || 'Could not update your saved stays', 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <Link to={`/property/${property.id}`} className="group block cursor-pointer">
      <div className="relative rounded-xl2 overflow-hidden aspect-[4/5]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {note && (
          <span className="absolute top-3 left-3 bg-white/95 text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-soft">
            {note}
          </span>
        )}

        <button
          aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
          aria-pressed={saved}
          disabled={busy}
          onClick={handleFavorite}
          className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors disabled:opacity-60"
        >
          <Heart
            size={18}
            className={saved ? 'fill-clay text-clay' : 'fill-black/30 text-white'}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="mt-3 space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm text-ink">{location}</p>
          <span className="flex items-center gap-1 text-sm shrink-0">
            <Star size={13} className="fill-ink text-ink" />
            {rating}
            <span className="text-ink/50">({reviews})</span>
          </span>
        </div>
        <p className="text-sm text-ink/60">{title}</p>
        {dates && <p className="text-sm text-ink/60">{dates}</p>}
        <p className="text-sm pt-1">
          <span className="font-semibold text-ink">${price}</span>
          <span className="text-ink/60"> {priceUnit}</span>
        </p>
      </div>
    </Link>
  )
}
