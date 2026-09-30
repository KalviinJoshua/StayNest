import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Categories from '../components/Categories.jsx'
import PropertySection from '../components/PropertySection.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import Footer from '../components/Footer.jsx'
import { propertyService } from '../services/propertyService.js'
// Local mock data is used only as an offline fallback if the API is unreachable.
import { popularStays, coastalEscapes, mountainHideaways } from '../data/properties.js'

// Navbar grouping (URL) → property_type stored in the database.
const DB_TYPE = { stays: 'stay', experiences: 'experience', adventures: 'adventure' }

export default function Home() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') || 'stays'
  const search = (searchParams.get('search') || '').trim()
  const category = searchParams.get('category') || ''

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setUsingFallback(false)

    const params = {}
    if (search) {
      params.search = search
    } else {
      params.type = DB_TYPE[type] || 'stay'
      if (category) params.category = category
    }

    propertyService
      .list(params)
      .then((data) => {
        if (active) setProperties(data.properties)
      })
      .catch(() => {
        if (active) {
          setProperties([])
          setUsingFallback(true)
        }
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [search, type, category])

  // Default "Stays" home view shows three curated sections; everything else
  // (search, experiences, adventures, a category filter) is a single grid.
  const isDefaultStays = !search && type === 'stays' && !category

  const popular = properties.slice(0, 6)
  const coastal = properties.filter((p) => p.category === 'Beach').slice(0, 6)
  const mountain = properties.filter((p) => p.category === 'Mountains').slice(0, 6)

  const { title, subtitle } = headingFor({ search, type, category })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sage/50 to-ivory" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-pine leading-[1.05] max-w-3xl mx-auto text-balance">
            Find a place that feels like yours, wherever you land
          </h1>
          <p className="mt-5 text-ink/70 text-base sm:text-lg max-w-xl mx-auto">
            Handpicked homes, cabins and hideaways from hosts who know their neighborhoods best.
          </p>

          <div className="mt-9">
            <SearchBar />
          </div>
        </div>
      </section>

      <Categories />

      <main className="flex-1">
        {loading ? (
          <SectionSkeleton />
        ) : isDefaultStays && usingFallback ? (
          // API unreachable — render the bundled sample data so the page still works.
          <>
            <PropertySection title="Popular stays right now" subtitle="Trending picks across our most-searched destinations" properties={popularStays} />
            <PropertySection title="Coastal escapes" subtitle="Wake up to the sound of the tide" properties={coastalEscapes} />
            <PropertySection title="Mountain hideaways" subtitle="Slow mornings, big views" properties={mountainHideaways} />
          </>
        ) : isDefaultStays ? (
          <>
            <PropertySection title="Popular stays right now" subtitle="Trending picks across our most-searched destinations" properties={popular} />
            {coastal.length > 0 && (
              <PropertySection title="Coastal escapes" subtitle="Wake up to the sound of the tide" properties={coastal} />
            )}
            {mountain.length > 0 && (
              <PropertySection title="Mountain hideaways" subtitle="Slow mornings, big views" properties={mountain} />
            )}
          </>
        ) : (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
            <div className="mb-5">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-pine">{title}</h2>
              <p className="text-ink/60 text-sm mt-1">
                {properties.length > 0
                  ? `${properties.length} ${properties.length === 1 ? 'result' : 'results'} · ${subtitle}`
                  : subtitle}
              </p>
            </div>

            {properties.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <EmptyState search={search} />
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

function headingFor({ search, type, category }) {
  if (search) {
    return { title: `Results for “${search}”`, subtitle: 'Matching stays, experiences and adventures' }
  }
  if (type === 'experiences') {
    return { title: 'Experiences', subtitle: 'Host-led activities and local know-how' }
  }
  if (type === 'adventures') {
    return { title: 'Adventures', subtitle: 'Guided trips for the outdoorsy' }
  }
  if (category) {
    return { title: category, subtitle: 'Stays in this category' }
  }
  return { title: 'Stays', subtitle: '' }
}

function EmptyState({ search }) {
  return (
    <div className="text-center py-16 border border-dashed border-pine-100 rounded-xl2 bg-white/40">
      <p className="font-display text-xl text-pine">No properties found</p>
      <p className="text-ink/60 text-sm mt-2 max-w-sm mx-auto">
        {search
          ? `We couldn’t find anything matching “${search}”. Try a different destination.`
          : 'Nothing here yet. Try another category or explore all stays.'}
      </p>
      <Link
        to="/"
        className="inline-block mt-5 text-sm font-semibold bg-pine text-ivory px-5 py-2.5 rounded-full hover:bg-pine-700 transition-colors"
      >
        Explore all stays
      </Link>
    </div>
  )
}

function SectionSkeleton() {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
      <div className="h-8 w-64 bg-sage rounded-lg animate-pulse mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="rounded-xl2 aspect-[4/5] bg-sage animate-pulse" />
            <div className="h-4 w-3/4 bg-sage rounded mt-3 animate-pulse" />
            <div className="h-4 w-1/2 bg-sage rounded mt-2 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  )
}
