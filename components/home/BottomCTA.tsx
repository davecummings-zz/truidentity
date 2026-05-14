import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface BottomCTAProps {
  locale: string
}

export async function BottomCTA({ locale }: BottomCTAProps) {
  const t = await getTranslations({ locale, namespace: 'home.cta' })

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-navy to-accent-blue" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta-heading" className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
          {t('heading')}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{t('subheading')}</p>
        <Link
          href={`/${locale}/book`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent-orange text-navy font-bold text-lg rounded-xl hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
        >
          <span aria-hidden="true">📅</span> {t('button')}
        </Link>
      </div>
    </section>
  )
}
