import { getTranslations } from 'next-intl/server'
import { services } from '@/config/services'
import { ServiceCard } from '@/components/ui/ServiceCard'

interface ServicesGridProps {
  locale: string
}

export async function ServicesGrid({ locale }: ServicesGridProps) {
  const t = await getTranslations({ locale, namespace: 'home.services' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  return (
    <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              emoji={service.emoji}
              name={service.name}
              description={service.shortDescription}
              href={`/${locale}/services/${service.slug}`}
              learnMoreLabel={tc('learnMore')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
