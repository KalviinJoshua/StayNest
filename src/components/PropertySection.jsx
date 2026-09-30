import { ChevronRight } from 'lucide-react'
import PropertyCard from './PropertyCard.jsx'

export default function PropertySection({ title, subtitle, properties }) {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-pine">
            {title}
          </h2>
          {subtitle && (
            <p className="text-ink/60 text-sm mt-1">{subtitle}</p>
          )}
        </div>
        <button className="hidden sm:flex items-center gap-1 text-sm font-semibold text-pine hover:text-clay transition-colors shrink-0">
          Show all
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
