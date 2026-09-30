import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapPin, CalendarDays, Users, Search } from 'lucide-react'

export default function SearchBar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [where, setWhere] = useState(searchParams.get('search') || '')

  // Keep the input in sync when the URL changes (e.g. Back button, cleared search).
  useEffect(() => {
    setWhere(searchParams.get('search') || '')
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = where.trim()
    // A blank search returns to the default home view.
    navigate(q ? `/?search=${encodeURIComponent(q)}` : '/')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-full sm:rounded-full shadow-card border border-pine-100 p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-1">
        <div className="flex items-stretch flex-1">
          <label className="flex-1 flex flex-col justify-center gap-0.5 px-5 py-2.5 sm:py-2 rounded-full hover:bg-sage/70 transition-colors cursor-text">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-pine">
              <MapPin size={13} className="sm:hidden" />
              Where
            </span>
            <input
              type="text"
              name="where"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              placeholder="Search destinations or stays"
              className="bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none w-full"
            />
          </label>
          <div className="hidden sm:block w-px bg-pine-100 my-2.5" />
        </div>

        <div className="flex items-stretch flex-1">
          <label className="flex-1 flex flex-col justify-center gap-0.5 px-5 py-2.5 sm:py-2 rounded-full hover:bg-sage/70 transition-colors cursor-pointer">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-pine">
              <CalendarDays size={13} className="sm:hidden" />
              Check in
            </span>
            <input
              type="text"
              placeholder="Add dates"
              className="bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none w-full"
            />
          </label>
          <div className="hidden sm:block w-px bg-pine-100 my-2.5" />
        </div>

        <div className="flex items-stretch flex-1">
          <label className="flex-1 flex flex-col justify-center gap-0.5 px-5 py-2.5 sm:py-2 rounded-full hover:bg-sage/70 transition-colors cursor-pointer">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-pine">
              <CalendarDays size={13} className="sm:hidden" />
              Check out
            </span>
            <input
              type="text"
              placeholder="Add dates"
              className="bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none w-full"
            />
          </label>
          <div className="hidden sm:block w-px bg-pine-100 my-2.5" />
        </div>

        <div className="flex items-stretch flex-1">
          <label className="flex-1 flex flex-col justify-center gap-0.5 px-5 py-2.5 sm:py-2 rounded-full hover:bg-sage/70 transition-colors cursor-pointer">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-pine">
              <Users size={13} className="sm:hidden" />
              Guests
            </span>
            <input
              type="text"
              placeholder="Add guests"
              className="bg-transparent text-sm text-ink placeholder:text-ink/40 outline-none w-full"
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-clay hover:bg-clay-600 transition-colors text-white font-semibold text-sm rounded-full px-6 py-3.5 sm:py-3 m-0.5 shrink-0"
        >
          <Search size={16} strokeWidth={2.5} />
          <span className="sm:hidden">Search</span>
        </button>
      </div>
    </form>
  )
}
