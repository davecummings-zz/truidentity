import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface HeroSectionProps {
  locale: string
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home.hero' })

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/bg_truidentity.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center z-0"
        priority
        fetchPriority="high"
        quality={75}
      />

      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#1B3A5C]/75 z-[1]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t('headline')}
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            {t('subheadline')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/book`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent-orange text-navy font-bold rounded-xl hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy text-base"
            >
              <span aria-hidden="true">📅</span> {t('ctaBook')}
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
