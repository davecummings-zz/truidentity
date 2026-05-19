import { getTranslations } from 'next-intl/server'
import { CheckCircle2 } from 'lucide-react'

interface OrgsWeServeProps {
  locale: string
}

export async function OrgsWeServe({ locale }: OrgsWeServeProps) {
  const t = await getTranslations({ locale, namespace: 'home.orgsWeServe' })
  const items = t.raw('items') as string[]

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="orgs-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="orgs-heading" className="text-2xl lg:text-3xl font-bold text-navy mb-3">
            {t('heading')}
          </h2>
          <p className="text-gray-600">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-accent-blue flex-shrink-0" aria-hidden="true" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
