import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star, MapPin, Check, Calendar, Tag } from 'lucide-react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { propertyService } from '../services/propertyService.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

// Presentational amenity list derived from the property's type and category.
const TYPE_AMENITIES = {
  stay: ['Wifi', 'Self check-in', 'Fully equipped kitchen', 'Free parking'],
  experience: ['Local host guide', 'Small group', 'Equipment included', 'Hotel pickup available'],
  adventure: ['Certified guide', 'Safety gear provided', 'Transport included', 'Beginner friendly'],
}
const CATEGORY_AMENITIES = {
  Beach: ['Beachfront access', 'Outdoor shower'],
  Mountains: ['Fireplace', 'Mountain views'],
  Pools: ['Private pool'],
  Cabins: ['Wood stove', 'Forest trailheads'],
  Luxury: ['Concierge service', 'Infinity pool'],
  Islands: ['Private dock', 'Snorkel gear'],
  City: ['City-center location', 'Dedicated workspace'],
  Countryside: ['Private garden', 'Quiet setting'],
}

function amenitiesFor(property) {
  const type = property.property_type || 'stay'
  return [
    ...(TYPE_AMENITIES[type] || TYPE_AMENITIES.stay),
    ...(CATEGORY_AMENITIES[property.category] || []),
  ]
}

export default function PropertyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { notify } = useToast()

  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    propertyService
      .getOne(id)
      .then((data) => {
        if (active) setProperty(data.property)
      })
      .catch((err) => {
        if (active) setError(err.message || 'We could not load this property.')
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [id])

  const saved = property ? isFavorite(property.id) : false
  const priceUnit =
    property?.property_type && property.property_type !== 'stay' ? 'person' : 'night'

  const handleFavorite = async () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 sm:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine hover:text-clay transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {loading ? (
          <DetailsSkeleton />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-pine leading-tight">
                  {property.title}
                </h1>
                <p className="flex items-center gap-1.5 text-ink/70 mt-2">
                  <MapPin size={16} /> {property.location}
                </p>
              </div>
              <button
                aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
                aria-pressed={saved}
                disabled={busy}
                onClick={handleFavorite}
                className="flex items-center gap-2 shrink-0 border border-pine-100 rounded-full px-4 py-2.5 text-sm font-semibold text-pine hover:shadow-soft transition-shadow disabled:opacity-60"
              >
                <Heart
                  size={18}
                  className={saved ? 'fill-clay text-clay' : 'text-pine'}
                  strokeWidth={1.75}
                />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <div className="relative rounded-xl2 overflow-hidden aspect-[16/10] sm:aspect-[16/9] mt-5">
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.note && (
                <span className="absolute top-4 left-4 bg-white/95 text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-soft">
                  {property.note}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 text-sm">
              <span className="flex items-center gap-1.5">
                <Star size={16} className="fill-ink text-ink" />
                <span className="font-semibold text-ink">{property.rating}</span>
                <span className="text-ink/50">({property.review_count} reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-ink/70">
                <Tag size={15} /> {property.category}
              </span>
              {property.dates && (
                <span className="flex items-center gap-1.5 text-ink/70">
                  <Calendar size={15} /> {property.dates}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="font-display text-xl font-semibold text-pine mb-2">
                    About this {property.property_type || 'stay'}
                  </h2>
                  <p className="text-ink/80 leading-relaxed">{property.description}</p>
                </section>

                <section>
                  <h2 className="font-display text-xl font-semibold text-pine mb-3">
                    What this place offers
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {amenitiesFor(property).map((a) => (
                      <li key={a} className="flex items-center gap-2.5 text-ink/80 text-sm">
                        <Check size={16} className="text-pine shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Price / booking card */}
              <aside className="md:col-span-1">
                <div className="border border-pine-100 rounded-xl2 shadow-card p-6 md:sticky md:top-28 bg-white">
                  <p className="text-2xl font-semibold text-ink">
                    ${property.price_per_night}
                    <span className="text-base font-normal text-ink/60"> / {priceUnit}</span>
                  </p>
                  <button
                    disabled={busy}
                    onClick={handleFavorite}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-clay hover:bg-clay-600 transition-colors text-white font-semibold text-sm rounded-full py-3 disabled:opacity-60"
                  >
                    <Heart
                      size={16}
                      className={saved ? 'fill-white text-white' : 'text-white'}
                      strokeWidth={2}
                    />
                    {saved ? 'Saved to your stays' : 'Save to your stays'}
                  </button>
                  <Link
                    to="/"
                    className="w-full mt-3 block text-center text-sm font-semibold text-pine border border-pine-100 rounded-full py-3 hover:bg-sage transition-colors"
                  >
                    Explore more
                  </Link>
                  {!isAuthenticated && (
                    <p className="text-xs text-ink/50 text-center mt-3">
                      Log in to save properties to your dashboard.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

function DetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-2/3 bg-sage rounded-lg" />
      <div className="h-4 w-40 bg-sage rounded mt-3" />
      <div className="rounded-xl2 aspect-[16/9] bg-sage mt-5" />
      <div className="h-4 w-1/2 bg-sage rounded mt-6" />
      <div className="h-4 w-full bg-sage rounded mt-6" />
      <div className="h-4 w-5/6 bg-sage rounded mt-3" />
    </div>
  )
}

function ErrorState({ message }) {
  return (
    <div className="text-center py-16 border border-dashed border-pine-100 rounded-xl2 bg-white/40">
      <p className="font-display text-xl text-pine">Property not found</p>
      <p className="text-ink/60 text-sm mt-2 max-w-sm mx-auto">{message}</p>
      <Link
        to="/"
        className="inline-block mt-5 text-sm font-semibold bg-pine text-ivory px-5 py-2.5 rounded-full hover:bg-pine-700 transition-colors"
      >
        Back to all stays
      </Link>
    </div>
  )
}
