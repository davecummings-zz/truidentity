import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import {
  ShieldCheck,
  Stamp,
  Fingerprint,
  ScanLine,
  ClipboardList,
  Upload,
  MapPin,
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/config/services'
import { PricingCard } from '@/components/ui/PricingCard'
import { PriceEstimator } from '@/components/ui/PriceEstimator'
import { siteConfig } from '@/config/site'

const serviceIcons: Record<string, LucideIcon> = {
  'fbi-background-checks': ShieldCheck,
  'fbi-apostille': Stamp,
  'ink-fingerprinting': Fingerprint,
  'live-scan-fingerprinting': ScanLine,
  'nfa-fingerprinting': ClipboardList,
  'atf-efile-services': Upload,
  'mobile-fingerprinting': MapPin,
}

interface ServicesPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/services` },
    openGraph: { url: `${siteConfig.siteUrl}/${locale}/services`, title: t('title'), description: t('description') },
  }
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'services' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        {/* Service finder callout */}
        <div className="mb-12 rounded-2xl bg-accent-blue/5 border border-accent-blue/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-navy">{t('notSure')}</p>
          </div>
          <Link
            href={`/${locale}/service-finder`}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-white font-semibold rounded-xl hover:bg-accent-blue/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2"
          >
            {t('useFinder')} →
          </Link>
        </div>

        {/* Price Estimator + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          <aside className="lg:col-span-1">
            <PriceEstimator services={services} />
          </aside>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug]
              return (
              <div key={service.slug} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    {Icon && <Icon size={20} className="text-accent-blue" />}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-navy leading-tight">{ts(`${service.slug}.name`)}</h2>
                    <span className="text-lg font-extrabold text-accent-blue">{service.price}</span>
                    {service.popular && (
                      <span className="ml-2 inline-flex text-xs font-bold text-accent-orange">★ {tc('mostPopular')}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{ts(`${service.slug}.shortDescription`)}</p>
                <div className="flex gap-2">
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="flex-1 text-center text-xs font-semibold border border-navy text-navy rounded-lg py-2 hover:bg-navy hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  >
                    {tc('learnMore')}
                  </Link>
                  <Link
                    href={`/${locale}/book`}
                    className="flex-1 text-center text-xs font-semibold bg-navy text-white rounded-lg py-2 hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  >
                    {tc('bookNow')}
                  </Link>
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
