import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schemas'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/privacy-policy` },
    openGraph: { url: `${siteConfig.siteUrl}/${locale}/privacy-policy`, title: t('title'), description: t('description') },
  }
}

export default async function PrivacyPolicyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'privacy' })
  const sections = t.raw('sections') as { heading: string; content: string }[]

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ key: 'privacy-policy', url: `${siteConfig.siteUrl}/${locale}/privacy-policy` }])} />
      <div className="py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-navy mb-2">{t('heading')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('lastUpdated')}</p>
        <p className="text-gray-600 leading-relaxed mb-10">{t('intro')}</p>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-navy mb-3">{section.heading}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}
