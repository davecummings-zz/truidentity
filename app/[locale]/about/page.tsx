import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/schemas'
import {
  Clock,
  ShieldCheck,
  Zap,
  Languages,
  Car,
  MapPin,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { OrgsWeServe } from '@/components/home/OrgsWeServe'

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
    openGraph: { url: `${siteConfig.siteUrl}/about`, title: t('title'), description: t('description') },
  }
}

interface Differentiator {
  icon: string
  heading: string
  body: string
}

const DIFF_ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  'shield-check': ShieldCheck,
  zap: Zap,
  languages: Languages,
  car: Car,
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })

  const differentiators = t.raw('differentiators.items') as Differentiator[]

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ key: 'about', url: `${siteConfig.siteUrl}/${locale}/about` }])} />
      <div className="pt-16 lg:pt-24">
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
            <p>{t('story.body3')}</p>
          </div>
        </section>

        {/* Office photos */}
        <section className="mb-12" aria-labelledby="office-heading">
          <h2 id="office-heading" className="text-2xl font-bold text-navy mb-6">{t('office.heading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative h-60 lg:h-80 rounded-xl shadow-md overflow-hidden">
              <Image
                src="/images/location/office1.webp"
                alt={t('office.alt1')}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-60 lg:h-80 rounded-xl shadow-md overflow-hidden">
              <Image
                src="/images/location/office2.webp"
                alt={t('office.alt2')}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

      </div>
      </div>

      <div className="pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Differentiators */}
        <section className="mb-12" aria-labelledby="diff-heading">
          <h2 id="diff-heading" className="text-2xl font-bold text-navy mb-6">{t('differentiators.heading')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {differentiators.map((item) => {
              const Icon: LucideIcon = DIFF_ICONS[item.icon] ?? ShieldCheck
              return (
                <div key={item.heading} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white">
                  <div className="p-2 rounded-lg bg-blue-50 inline-flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Icon className="size-6 text-accent-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm mb-1">{item.heading}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              )
            })}
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
            <div className="p-2 rounded-lg bg-blue-50 inline-flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <MapPin className="size-6 text-accent-blue" />
            </div>
            <div>
              <h2 id="area-heading" className="text-2xl font-bold text-navy mb-3">{t('serviceArea.heading')}</h2>
              <p className="text-gray-600 leading-relaxed">{t('serviceArea.text')}</p>
            </div>
          </div>
        </section>

      </div>
      </div>

      {/* Organizations We Serve */}
      <OrgsWeServe locale={locale} />

      <div className="pb-16 lg:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* CTA */}
        <section className="mt-12 rounded-2xl bg-gradient-to-r from-navy to-accent-blue p-8 text-center" aria-labelledby="about-cta">
          <h2 id="about-cta" className="text-2xl font-bold text-white mb-2">{t('cta.heading')}</h2>
          <p className="text-white/80 mb-6">{t('cta.text')}</p>
          <Link
            href={`/${locale}/book`}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent-orange text-white font-bold rounded-xl hover:bg-accent-orange/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            <CalendarDays className="size-5" aria-hidden="true" />
            {t('cta.button')}
          </Link>
        </section>
      </div>
    </div>
    </>
  )
}
