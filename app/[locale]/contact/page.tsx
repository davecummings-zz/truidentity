import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from '@/components/contact/ContactForm'
import { siteConfig } from '@/config/site'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/contact` },
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const mapsUrl =
    siteConfig.googleMapsEmbedUrl !== 'GOOGLE_MAPS_EMBED_URL'
      ? siteConfig.googleMapsEmbedUrl
      : null

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="text-2xl font-bold text-navy mb-6">{t('form.heading')}</h2>
            <ContactForm />
          </section>

          {/* Contact info */}
          <aside>
            <h2 className="text-2xl font-bold text-navy mb-6">{t('info.heading')}</h2>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('info.phone')}</p>
                  <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`} className="text-navy font-semibold hover:text-accent-blue transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('info.email')}</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-navy font-semibold hover:text-accent-blue transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('info.address')}</p>
                  <p className="text-navy font-semibold">{siteConfig.address.full}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('info.hours')}</p>
                  <ul className="mt-1 space-y-1">
                    {siteConfig.hoursStructured.map((h) => (
                      <li key={h.days} className="text-sm">
                        <span className="text-gray-500">{h.days}:</span>{' '}
                        <span className="text-navy font-medium">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-accent-orange font-semibold mt-2">{t('info.appointmentNote')}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <section aria-labelledby="map-heading">
              <h3 id="map-heading" className="text-lg font-bold text-navy mb-3">{t('map.heading')}</h3>
              {mapsUrl ? (
                <iframe
                  src={mapsUrl}
                  title={t('map.title')}
                  width="100%"
                  height="300"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl border border-gray-200 w-full"
                />
              ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 h-52 flex items-center justify-center text-center px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Map Placeholder</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Set <code className="bg-gray-200 px-1 rounded">GOOGLE_MAPS_EMBED_URL</code> in config/site.ts
                    </p>
                  </div>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
