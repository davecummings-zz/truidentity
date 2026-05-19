'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { LucideIcon } from 'lucide-react'
import type { Service } from '@/config/services'

interface ServicePricingCardProps {
  service: Service
  icon: LucideIcon
  pricingOpen: boolean
  onSeePricing: () => void
  locale: string
}

export function ServicePricingCard({
  service,
  icon: Icon,
  pricingOpen,
  onSeePricing,
  locale,
}: ServicePricingCardProps) {
  const t = useTranslations('home.services')
  const tc = useTranslations('common')
  const ts = useTranslations('serviceItems')

  const name = ts(`${service.slug}.name`)
  const bullets = ts.raw(`${service.slug}.pricingBullets`) as string[]
  const panelId = `${service.slug}-pricing-panel`

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all duration-200 ${
        pricingOpen
          ? 'border-[1.5px] border-accent-blue'
          : 'border border-gray-200'
      }`}
    >
      {/* Upper card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-3 flex-shrink-0"
          aria-hidden="true"
        >
          <Icon size={24} className="text-accent-blue" />
        </div>

        {/* Name */}
        <p className="font-bold text-navy text-sm mb-1">{name}</p>

        {/* Short description */}
        <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">
          {ts(`${service.slug}.shortDescription`)}
        </p>

        {/* Links row */}
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/services/${service.slug}`}
            className="text-xs font-semibold text-accent-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
          >
            {tc('learnMore')}
          </Link>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <button
            onClick={onSeePricing}
            aria-label={`See pricing for ${name}`}
            aria-expanded={pricingOpen}
            aria-controls={panelId}
            className="text-xs font-semibold text-accent-blue hover:underline bg-transparent border-0 p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
          >
            {pricingOpen ? t('hidePricing') : t('seePricing')}
          </button>
        </div>
      </div>

      {/* Pricing panel */}
      <div
        id={panelId}
        role="region"
        aria-label={`${name} pricing`}
        className={`overflow-hidden transition-all duration-[400ms] ease-in-out ${
          pricingOpen ? 'max-h-56' : 'max-h-0'
        }`}
      >
        <div className="bg-navy px-5 pt-4 pb-5 rounded-b-xl">
          {/* Price */}
          <div className="text-center mb-3">
            <span
              className={`font-extrabold text-white ${
                service.price.startsWith('$') ? 'text-3xl' : 'text-xl'
              }`}
            >
              {service.price}
            </span>
            {service.priceNote && (
              <p className="text-xs text-white/60 mt-1 leading-snug">{service.priceNote}</p>
            )}
          </div>

          {/* Bullets */}
          <ul className="space-y-1.5 mb-3">
            {bullets.slice(0, 3).map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-xs text-white/80">
                <svg
                  className="w-3 h-3 text-accent-orange flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Book button */}
          <Link
            href={`/${locale}/book`}
            className="block w-full text-center text-xs font-bold bg-accent-orange text-navy rounded-lg py-2 hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange"
          >
            {tc('bookNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}
