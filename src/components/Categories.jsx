import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Flame,
  Waves,
  Mountain,
  Wheat,
  Gem,
  Droplets,
  Eye,
  TreePine,
  Building2,
  Palmtree,
} from 'lucide-react'
import { categories } from '../data/categories.js'

const iconMap = {
  Flame,
  Waves,
  Mountain,
  Wheat,
  Gem,
  Droplets,
  Eye,
  TreePine,
  Building2,
  Palmtree,
}

export default function Categories() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // The active chip mirrors the ?category= param; nothing filtered means Trending.
  const activeCategory = searchParams.get('category')
  const activeId =
    activeCategory && !searchParams.get('search')
      ? categories.find((c) => c.label === activeCategory)?.id
      : 'trending'

  const handleSelect = (cat) => {
    // Trending clears the filter; everything else browses stays by category.
    navigate(cat.id === 'trending' ? '/' : `/?category=${encodeURIComponent(cat.label)}`)
  }

  return (
    <div className="border-b border-pine-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center gap-7 overflow-x-auto scrollbar-hide py-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            const isActive = activeId === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat)}
                className={`flex flex-col items-center gap-2 shrink-0 pb-2 border-b-2 transition-colors ${
                  isActive
                    ? 'border-pine text-pine'
                    : 'border-transparent text-ink/60 hover:text-ink hover:border-ink/20'
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
                <span className="text-xs font-medium whitespace-nowrap">
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
