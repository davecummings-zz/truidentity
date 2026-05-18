import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

interface PackageItem {
  name: string
  price: string
  includes: string[]
}

interface PackageCardsProps {
  heading: string
  bookLabel: string
  packages: PackageItem[]
  locale: string
}

export function PackageCards({ heading, bookLabel, packages, locale }: PackageCardsProps) {
  return (
    <section aria-labelledby="packages-heading">
      <h2 id="packages-heading" className="text-xl font-bold text-navy mb-4">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-card hover:border-accent-blue/40 hover:shadow-card-hover transition-all"
          >
            <div className="mb-4">
              <h3 className="text-base font-bold text-navy">{pkg.name}</h3>
              <span className="text-3xl font-extrabold text-navy">{pkg.price}</span>
            </div>

            <ul className="flex-1 space-y-2 mb-5">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/book`}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <CalendarDays size={16} aria-hidden="true" />
              {bookLabel}<span className="sr-only"> — {pkg.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
