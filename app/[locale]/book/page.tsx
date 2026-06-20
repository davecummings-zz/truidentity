import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle2 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schemas'

interface BookPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/book` },
    openGraph: { url: `${siteConfig.siteUrl}/book`, title: t('title'), description: t('description') },
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book' })

  const whatToBringItems = t.raw('whatToBring.items') as string[]
  const acuityLocale = locale === 'es' ? 'es' : 'en'
  const acuityUrl = `https://app.acuityscheduling.com/schedule.php?owner=${siteConfig.acuityOwnerId}&locale=${acuityLocale}`

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ key: 'book', url: `${siteConfig.siteUrl}/${locale}/book` }])} />
      <div>

      {/* Header */}
      <div className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600 mb-8">{t('subheading')}</p>

          {/* No walk-ins notice */}
          <div className="rounded-xl bg-accent-orange/10 border border-accent-orange/30 p-4 flex items-start gap-3" role="alert">
            <span className="text-accent-orange text-xl flex-shrink-0" aria-hidden="true">⚠</span>
            <p className="text-sm font-semibold text-accent-orange">{t('noWalkIns')}</p>
          </div>
        </div>
      </div>

      {/* What to Bring */}
      <div className="py-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-navy mb-6">{t('whatToBring.heading')}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatToBringItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 size={18} className="text-accent-blue flex-shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            {t('questions')}{' '}
            <Link href={`/${locale}/contact`} className="text-accent-blue font-semibold hover:underline">
              {t('contactLink')}
            </Link>
          </p>
        </div>
      </div>

      {/* Acuity embed */}
      <div className="bg-gray-50 py-10 border-t border-gray-100">
        <iframe
          src={acuityUrl}
          title="Schedule an appointment"
          width="100%"
          height="900"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full block border-0"
        />
        <Script
          src="https://embed.acuityscheduling.com/js/embed.js"
          strategy="lazyOnload"
        />
      </div>

    </div>
    </>
  )
}
