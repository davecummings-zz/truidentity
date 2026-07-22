import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ServiceFinder } from '@/components/service-finder/ServiceFinder'
import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schemas'

interface ServiceFinderPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServiceFinderPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'serviceFinder.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'en' ? `${siteConfig.siteUrl}/service-finder` : `${siteConfig.siteUrl}/es/service-finder`,
      languages: {
        en: `${siteConfig.siteUrl}/service-finder`,
        es: `${siteConfig.siteUrl}/es/service-finder`,
      },
    },
    openGraph: {
      url: locale === 'en' ? `${siteConfig.siteUrl}/service-finder` : `${siteConfig.siteUrl}/es/service-finder`,
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function ServiceFinderPage({ params }: ServiceFinderPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'serviceFinder' })

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ key: 'service-finder', url: `${siteConfig.siteUrl}/${locale}/service-finder` }])} />
      <div className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-card p-6 sm:p-8">
          <ServiceFinder />
        </div>
      </div>
    </div>
    </>
  )
}
