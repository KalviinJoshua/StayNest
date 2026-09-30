import { Instagram, Twitter, Facebook, Leaf } from 'lucide-react'

const columns = [
  {
    heading: 'Support',
    links: ['Help center', 'Safety information', 'Cancellation options', 'Contact us'],
  },
  {
    heading: 'Community',
    links: ['StayNest.org', 'Accessibility', 'Host resources', 'Referrals'],
  },
  {
    heading: 'Hosting',
    links: ['Become a host', 'Host protection', 'Explore hosting resources', 'Community forum'],
  },
  {
    heading: 'StayNest',
    links: ['About', 'Newsroom', 'Careers', 'Terms', 'Privacy'],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-pine-100 bg-pine-50/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-pine mb-4">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-ink/70 hover:text-ink hover:underline underline-offset-2 text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-pine-100 my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-pine text-ivory">
              <Leaf size={15} />
            </span>
            <span className="font-display text-lg font-semibold text-pine">
              StayNest
            </span>
            <span className="text-sm text-ink/50 ml-2">
              © {new Date().getFullYear()} StayNest, Inc.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button aria-label="Instagram" className="text-ink/60 hover:text-pine transition-colors">
              <Instagram size={18} />
            </button>
            <button aria-label="Twitter" className="text-ink/60 hover:text-pine transition-colors">
              <Twitter size={18} />
            </button>
            <button aria-label="Facebook" className="text-ink/60 hover:text-pine transition-colors">
              <Facebook size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
