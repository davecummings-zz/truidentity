import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface HeroSectionProps {
  locale: string
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home.hero' })

  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-500 to-accent-blue overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 48V0h48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-6">
            <span aria-hidden="true">🛡</span>
            <span>{t('trustBadge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t('headline')}
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/book`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-orange text-white font-bold rounded-xl hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy text-base"
            >
              📅 {t('ctaBook')}
            </Link>
            <Link
              href={`/${locale}/service-finder`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy text-base"
            >
              {t('ctaFinder')} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
