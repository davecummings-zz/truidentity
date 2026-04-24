import Link from 'next/link'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  price: string
  priceNote?: string
  bullets: string[]
  href: string
  bookLabel: string
  popular?: boolean
  popularLabel?: string
  className?: string
}

export function PricingCard({
  name,
  price,
  priceNote,
  bullets,
  href,
  bookLabel,
  popular,
  popularLabel = 'Most Popular',
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover',
        popular ? 'border-accent-blue ring-2 ring-accent-blue/20' : 'border-gray-200',
        className,
      )}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-accent-orange text-white whitespace-nowrap">
          ★ {popularLabel}
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy">{name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-navy">{price}</span>
          {priceNote && <span className="text-sm text-gray-500">{priceNote}</span>}
        </div>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {bullet}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={cn(
          'flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          popular
            ? 'bg-navy text-white hover:bg-navy-600 focus-visible:ring-navy'
            : 'border-2 border-navy text-navy hover:bg-navy hover:text-white focus-visible:ring-navy',
        )}
      >
        {bookLabel}
      </Link>
    </div>
  )
}
