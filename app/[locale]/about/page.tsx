import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/about` },
    openGraph: { url: `${siteConfig.siteUrl}/${locale}/about`, title: t('title'), description: t('description') },
  }
}

interface Differentiator {
  icon: string
  heading: string
  body: string
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  const certifications = t.raw('certifications.items') as string[]
  const differentiators = t.raw('differentiators.items') as Differentiator[]

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{t('subheading')}</p>
        </div>

        {/* Founding story */}
        <section className="mb-12" aria-labelledby="story-heading">
          <h2 id="story-heading" className="text-2xl font-bold text-navy mb-4">{t('story.heading')}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t('story.body1')}</p>
            <p>{t('story.body2')}</p>
          </div>
        </section>

        {/* Differentiators */}
        <section className="mb-12" aria-labelledby="diff-heading">
          <h2 id="diff-heading" className="text-2xl font-bold text-navy mb-6">{t('differentiators.heading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((item) => (
              <div key={item.heading} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white">
                <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-navy text-sm mb-1">{item.heading}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mb-12" aria-labelledby="mission-heading">
          <h2 id="mission-heading" className="text-2xl font-bold text-navy mb-4">{t('mission.heading')}</h2>
          <p className="text-gray-600 leading-relaxed">{t('mission.text')}</p>
        </section>

        {/* Service area */}
        <section className="mb-12 p-6 rounded-2xl bg-navy/5 border border-navy/10" aria-labelledby="area-heading">
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0" aria-hidden="true">📍</span>
            <div>
              <h2 id="area-heading" className="text-2xl font-bold text-navy mb-3">{t('serviceArea.heading')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('serviceArea.text')}</p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12" aria-labelledby="cert-heading">
          <h2 id="cert-heading" className="text-2xl font-bold text-navy mb-5">{t('certifications.heading')}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((item) => (
              <li key={item} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white">
                <svg className="w-5 h-5 text-accent-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-navy">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Placeholder photo */}
        <section className="mb-12 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center h-56 text-gray-400">
          <div className="text-center">
            <p className="text-sm font-medium">Team / Office Photo</p>
            <p className="text-xs mt-1">Placeholder — replace with real photography</p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-navy to-accent-blue p-8 text-center" aria-labelledby="about-cta">
          <h2 id="about-cta" className="text-2xl font-bold text-white mb-2">{t('cta.heading')}</h2>
          <p className="text-white/80 mb-6">{t('cta.text')}</p>
          <Link
            href={`/${locale}/book`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white font-bold rounded-xl hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            📅 {t('cta.button')}
          </Link>
        </section>
      </div>
    </div>
  )
}
