import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function AuthLayout({ children, imageUrl, quote, quoteAuthor }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form side */}
      <div className="flex flex-col px-6 sm:px-12 lg:px-16 py-8">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-pine text-ivory">
            <Leaf size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-2xl font-semibold text-pine tracking-tight">
            StayNest
          </span>
        </Link>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-sm mx-auto py-10">{children}</div>
        </div>
      </div>

      {/* Image side */}
      <div className="hidden lg:block relative">
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-900/70 via-pine-900/10 to-transparent" />
        {quote && (
          <div className="absolute bottom-12 left-10 right-10 text-ivory">
            <p className="font-display text-2xl leading-snug max-w-md">
              “{quote}”
            </p>
            {quoteAuthor && (
              <p className="mt-3 text-sm text-ivory/80">{quoteAuthor}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
