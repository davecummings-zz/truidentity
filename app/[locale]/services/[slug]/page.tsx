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
  ShieldAlert,
  UserCheck,
  Building2,
  type LucideIcon,
} from 'lucide-react'
import { services, getServiceBySlug, getRelatedServices } from '@/config/services'
import { JsonLd } from '@/components/seo/JsonLd'
import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/schemas'
import { siteConfig } from '@/config/site'
import { PackageCards } from '@/components/ui/PackageCards'
import { Accordion } from '@/components/ui/Accordion'
import { ServicePageHero } from '@/components/ui/ServicePageHero'

// FAQ item indices (into faq.items[]) shown on each background-check page
const SERVICE_FAQ_INDICES: Record<string, number[]> = {
  'criminal-background-check': [13, 14, 15, 16, 17, 19, 20],
  'pre-employment-screening':  [13, 17, 19, 20, 14],
  'tenant-screening':          [21, 18, 14],
}

const serviceIcons: Record<string, LucideIcon> = {
  'fbi-background-checks': ShieldCheck,
  'fbi-apostille': Stamp,
  'ink-fingerprinting': Fingerprint,
  'live-scan-fingerprinting': ScanLine,
  'nfa-fingerprinting': ClipboardList,
  'atf-efile-services': Upload,
  'mobile-fingerprinting': MapPin,
  'criminal-background-check': ShieldAlert,
  'pre-employment-screening': UserCheck,
  'tenant-screening': Building2,
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
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })
  const name = ts(`${slug}.name`)
  const description = ts(`${slug}.shortDescription`)
  const title = `${name} ${t('inSouthTexas')} | ${siteConfig.name}`
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/services/${slug}` },
    openGraph: { url: `${siteConfig.siteUrl}/services/${slug}`, title, description },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const t = await getTranslations({ locale, namespace: 'services.serviceDetail' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })
  const tf = await getTranslations({ locale, namespace: 'faq' })
  const related = getRelatedServices(service.relatedSlugs)
  const Icon: LucideIcon = serviceIcons[service.slug] ?? ShieldCheck

  const name = ts(`${slug}.name`)
  const whoNeeds = ts.raw(`${slug}.whoNeeds`) as string[]
  const whatToBring = ts.raw(`${slug}.whatToBring`) as string[]
  const packages = slug === 'criminal-background-check'
    ? ts.raw(`${slug}.packages`) as { name: string; price: string; includes: string[] }[]
    : null
  const packageIncludes = (slug === 'tenant-screening' || slug === 'pre-employment-screening')
    ? ts.raw(`${slug}.packageIncludes`) as string[]
    : null
  const creditReportNote = slug === 'tenant-screening'
    ? ts(`${slug}.creditReportNote`)
    : null
  const faqIndices = SERVICE_FAQ_INDICES[slug] ?? []
  const serviceFaqItems = faqIndices.map((i) => ({
    question: tf(`items.${i}.question`),
    answer: tf(`items.${i}.answer`),
  }))
  const supportedForms = slug === 'ink-fingerprinting'
    ? ts.raw(`${slug}.supportedForms`) as string[]
    : null

  return (
    <>
      <JsonLd data={[
        serviceSchema(service, locale),
        breadcrumbSchema(locale, [
          { key: 'services', url: `${siteConfig.siteUrl}/${locale}/services` },
          { name, url: `${siteConfig.siteUrl}/${locale}/services/${slug}` },
        ]),
        ...(serviceFaqItems.length > 0 ? [faqPageSchema(serviceFaqItems)] : []),
      ]} />

      <ServicePageHero
        serviceName={name}
        tagline={ts(`${slug}.shortDescription`)}
        icon={Icon}
        locale={locale}
      />

      <div className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Trust line */}
          <div className="mb-8 px-4 py-3 rounded-xl bg-accent-blue/5 border border-accent-blue/20">
            <p className="text-sm font-semibold text-accent-blue">{ts(`${slug}.trustLine`)}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">

              <section aria-labelledby="what-it-is">
                <h2 id="what-it-is" className="text-xl font-bold text-navy mb-3">{t('whatItIs')}</h2>
                <p className="text-gray-600 leading-relaxed">{ts(`${slug}.whatItIs`)}</p>
              </section>

              {packages && (
                <PackageCards
                  heading={t('choosePackage')}
                  bookLabel={t('bookPackage')}
                  packages={packages}
                  locale={locale}
                />
              )}

              {packageIncludes && (
                <section aria-labelledby="whats-included">
                  <h2 id="whats-included" className="text-xl font-bold text-navy mb-3">{t('whatsIncluded')}</h2>
                  <ul className="space-y-2">
                    {packageIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {creditReportNote && (
                    <p className="mt-3 text-xs text-gray-500">{creditReportNote}</p>
                  )}
                </section>
              )}

              <section aria-labelledby="who-needs">
                <h2 id="who-needs" className="text-xl font-bold text-navy mb-3">{t('whoNeeds')}</h2>
                <ul className="space-y-2">
                  {whoNeeds.map((item) => (
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
                  {whatToBring.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm">
                      <span className="text-accent-orange font-bold flex-shrink-0" aria-hidden="true">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {supportedForms && (
                <section aria-labelledby="supported-forms">
                  <h2 id="supported-forms" className="text-xl font-bold text-navy mb-3">
                    {ts(`${slug}.supportedFormsHeading`)}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {supportedForms.map((form) => (
                      <div key={form} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-accent-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {form}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section aria-labelledby="what-to-expect">
                <h2 id="what-to-expect" className="text-xl font-bold text-navy mb-3">{t('whatToExpect')}</h2>
                <p className="text-gray-600 leading-relaxed">{ts(`${slug}.whatToExpect`)}</p>
              </section>

              {serviceFaqItems.length > 0 && (
                <section aria-labelledby="service-faq-heading">
                  <h2 id="service-faq-heading" className="text-xl font-bold text-navy mb-4">{t('frequentlyAskedQuestions')}</h2>
                  <Accordion items={serviceFaqItems} />
                </section>
              )}

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
                          <span className="text-sm font-semibold text-navy">{ts(`${rel.slug}.name`)}</span>
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
                <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                  <span className={service.price.startsWith('$') ? 'text-4xl font-extrabold text-navy' : 'text-xl font-bold text-navy'}>
                    {service.price}
                  </span>
                </div>
                {service.priceNote && (
                  <p className="text-xs text-gray-500 mb-4">{service.priceNote}</p>
                )}
                {slug !== 'criminal-background-check' && (
                  <Link
                    href={`/${locale}/book`}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-navy text-white font-bold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 mb-3"
                  >
                    <CalendarDays size={18} aria-hidden="true" />
                    {t('bookCta')}
                  </Link>
                )}
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
