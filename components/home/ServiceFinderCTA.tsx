import { getTranslations } from 'next-intl/server'
import { LinkButton } from '@/components/ui/Button'

interface ServiceFinderCTAProps {
  locale: string
}

export async function ServiceFinderCTA({ locale }: ServiceFinderCTAProps) {
  const t = await getTranslations({ locale, namespace: 'home.services.finderCta' })

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="text-xl font-bold text-navy mb-2">{t('heading')}</h2>
        <p className="text-gray-600 text-sm mb-6">{t('subtext')}</p>
        <LinkButton href={`/${locale}/service-finder`} variant="outline" size="md">
          {t('button')} →
        </LinkButton>
      </div>
    </div>
  )
}
