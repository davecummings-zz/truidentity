import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Accordion } from '@/components/ui/Accordion'
import { JsonLd } from '@/components/seo/JsonLd'
import { faqPageSchema } from '@/lib/schemas'
import { siteConfig } from '@/config/site'
import { faqItemCount } from '@/config/faq'

interface FaqPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/faq` },
  }
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })

  const items = Array.from({ length: faqItemCount }, (_, i) => ({
    question: t(`items.${i}.question`),
    answer: t(`items.${i}.answer`),
  }))

  return (
    <>
      <JsonLd data={faqPageSchema(items)} />

      <div className="py-12 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
            <p className="text-xl text-gray-600">{t('subheading')}</p>
          </div>

          <Accordion items={items} />

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-200 p-6 text-center">
            <p className="font-semibold text-navy mb-4">{t('cta.text')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
