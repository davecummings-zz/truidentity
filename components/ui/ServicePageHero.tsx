import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { LucideIcon } from 'lucide-react'

interface ServicePageHeroProps {
  serviceName: string
  tagline: string
  icon: LucideIcon
  locale: string
}

export async function ServicePageHero({ serviceName, tagline, icon: Icon, locale }: ServicePageHeroProps) {
  const tn = await getTranslations({ locale, namespace: 'nav' })

  return (
    <div
      className="relative overflow-hidden border-l-8 border-accent-orange"
      style={{ background: 'linear-gradient(135deg, #1B3A5C 0%, #2E75B6 100%)', minHeight: '220px' }}
    >
      {/* Fingerprint watermark */}
      <svg
        viewBox="0 0 200 240"
        className="absolute right-8 top-1/2 -translate-y-1/2 w-56 h-56 hidden md:block text-white opacity-[0.06] pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="108" rx="9" ry="13" />
        <path d="M74,93 C74,62 126,62 126,93 C126,134 100,152 100,152" />
        <path d="M56,87 C56,39 144,39 144,87 C144,148 100,172 100,172" />
        <path d="M38,84 C38,16 162,16 162,84 C162,160 100,192 100,192" />
        <path d="M20,84 C20,-6 180,-6 180,84 C180,172 100,212 100,212" />
        <path d="M4,88 C4,-28 196,-28 196,88 C196,184 100,230 100,230" />
      </svg>

      <div className="flex items-center min-h-[220px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white/80 transition-colors">
              {tn('home')}
            </Link>
            <span aria-hidden="true">›</span>
            <Link href={`/${locale}/services`} className="hover:text-white/80 transition-colors">
              {tn('services')}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white/80" aria-current="page">{serviceName}</span>
          </nav>

          {/* Icon + heading */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1" aria-hidden="true">
              <Icon size={40} className="text-white/20" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {serviceName}
              </h1>
              <p className="text-base text-white/75 mt-2 max-w-2xl">{tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
