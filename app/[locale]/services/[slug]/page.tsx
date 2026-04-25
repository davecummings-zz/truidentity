import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import {
  ShieldCheck,
  Stamp,
  Fingerprint,
  ScanLine,
  ClipboardList,
  Upload,
  MapPin,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { services, getServiceBySlug, getRelatedServices } from '@/config/services'
import { JsonLd } from '@/components/seo/JsonLd'
import { serviceSchema, localBusinessSchema } from '@/lib/schemas'
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

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return services.flatMap((service) =>
    ['en', 'es'].map((locale) => ({ locale, slug: service.slug })),
  )
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  const t = await getTranslations({ locale, namespace: 'services.serviceDetail' })
  const title = `${service.name} ${t('inSouthTexas')} | ${siteConfig.name}`
  return {
    title,
    description: service.shortDescription,
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/services/${slug}` },
    openGraph: { url: `${siteConfig.siteUrl}/${locale}/services/${slug}`, title, description: service.shortDescription },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const t = await getTranslations({ locale, namespace: 'services.serviceDetail' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const tn = await getTranslations({ locale, namespace: 'nav' })
  const related = getRelatedServices(service.relatedSlugs)
  const Icon: LucideIcon = serviceIcons[service.slug] ?? ShieldCheck

  return (
    <>
      <JsonLd data={[serviceSchema(service, locale), localBusinessSchema()]} />

      <div className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href={`/${locale}`} className="hover:text-navy transition-colors">{tn('home')}</Link>
            <span aria-hidden="true">›</span>
            <Link href={`/${locale}/services`} className="hover:text-navy transition-colors">{tn('services')}</Link>
            <span aria-hidden="true">›</span>
            <span className="text-navy font-medium" aria-current="page">{service.name}</span>
          </nav>

          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Icon size={32} className="text-accent-blue" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-navy leading-tight">
                {service.name} <span className="text-accent-blue">{t('inSouthTexas')}</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">{service.shortDescription}</p>
            </div>
          </div>

          {/* Trust line */}
          <div className="mb-8 px-4 py-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
            <p className="text-sm font-semibold text-accent-blue">{service.trustLine}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              <section aria-labelledby="what-it-is">
                <h2 id="what-it-is" className="text-xl font-bold text-navy mb-3">{t('whatItIs')}</h2>
                <p className="text-gray-600 leading-relaxed">{service.whatItIs}</p>
              </section>

              <section aria-labelledby="who-needs">
                <h2 id="who-needs" className="text-xl font-bold text-navy mb-3">{t('whoNeeds')}</h2>
                <ul className="space-y-2">
                  {service.whoNeeds.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-600 text-sm">
                      <svg className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="what-to-bring">
                <h2 id="what-to-bring" className="text-xl font-bold text-navy mb-3">{t('whatToBring')}</h2>
                <ul className="space-y-2">
                  {service.whatToBring.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="text-accent-orange font-bold flex-shrink-0">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="what-to-expect">
                <h2 id="what-to-expect" className="text-xl font-bold text-navy mb-3">{t('whatToExpect')}</h2>
                <p className="text-gray-600 leading-relaxed">{service.whatToExpect}</p>
              </section>

              {/* Related */}
              {related.length > 0 && (
                <section aria-labelledby="related-services">
                  <h2 id="related-services" className="text-xl font-bold text-navy mb-4">{t('relatedServices')}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {related.map((rel) => {
                      const RelIcon = serviceIcons[rel.slug] ?? ShieldCheck
                      return (
                        <Link
                          key={rel.slug}
                          href={`/${locale}/services/${rel.slug}`}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <RelIcon size={16} className="text-accent-blue" />
                          </div>
                          <span className="text-sm font-semibold text-navy">{rel.name}</span>
                          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar: pricing CTA */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border-2 border-accent-blue/30 bg-white p-6 shadow-card">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{t('pricing')}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-navy">{service.price}</span>
                </div>
                {service.priceNote && (
                  <p className="text-xs text-gray-500 mb-4">{service.priceNote}</p>
                )}
                <Link
                  href={`/${locale}/book`}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-navy text-white font-bold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 mb-3"
                >
                  <CalendarDays size={18} aria-hidden="true" />
                  {t('bookCta')}
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  {siteConfig.noWalkIns && tc('noWalkIns')}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
