import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface NoWalkInsBannerProps {
  locale: string
}

export async function NoWalkInsBanner({ locale }: NoWalkInsBannerProps) {
  const t = await getTranslations({ locale, namespace: 'home.noWalkInsBanner' })

  return (
    <div className="bg-accent-orange/10 border-y border-accent-orange/20" role="alert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <span className="text-sm font-semibold text-amber-900">
          ⚠ {t('text')}
        </span>
        <Link
          href={`/${locale}/book`}
          className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-accent-blue transition-colors"
        >
          {t('cta')} →
        </Link>
      </div>
    </div>
  )
}
