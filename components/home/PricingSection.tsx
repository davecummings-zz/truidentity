import { getTranslations } from 'next-intl/server'
import { services } from '@/config/services'
import { PricingCard } from '@/components/ui/PricingCard'

interface PricingSectionProps {
  locale: string
}

export async function PricingSection({ locale }: PricingSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home.pricing' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="pricing-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service) => {
            const bullets = ts.raw(`${service.slug}.pricingBullets`) as string[]
            return (
              <PricingCard
                key={service.slug}
                name={ts(`${service.slug}.name`)}
                price={service.price}
                priceNote={service.priceNote}
                bullets={bullets.slice(0, 3)}
                href={`/${locale}/book`}
                bookLabel={tc('bookNow')}
                popular={service.popular}
                popularLabel={tc('mostPopular')}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
