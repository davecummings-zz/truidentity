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
