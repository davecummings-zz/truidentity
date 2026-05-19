import { getTranslations } from 'next-intl/server'
import { services } from '@/config/services'
import { ServiceCard } from '@/components/ui/ServiceCard'
import {
  ShieldCheck,
  Stamp,
  Fingerprint,
  ScanLine,
  ClipboardList,
  Upload,
  MapPin,
  ShieldAlert,
  UserCheck,
  Building2,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import type { FC } from 'react'

interface ServicesGridProps {
  locale: string
}

const serviceIcons: Record<string, FC<LucideProps>> = {
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

export async function ServicesGrid({ locale }: ServicesGridProps) {
  const t = await getTranslations({ locale, namespace: 'home.services' })
  const tc = await getTranslations({ locale, namespace: 'common' })
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })

  const fingerprintingServices = services.filter((s) => s.category === 'fingerprinting')
  const backgroundCheckServices = services.filter((s) => s.category === 'background-checks')

  const renderCard = (service: typeof services[0]) => {
    const Icon = serviceIcons[service.slug]
    return (
      <ServiceCard
        key={service.slug}
        icon={Icon ? <Icon size={32} className="text-accent-blue" aria-hidden="true" /> : null}
        name={ts(`${service.slug}.name`)}
        description={ts(`${service.slug}.shortDescription`)}
        href={`/${locale}/services/${service.slug}`}
        learnMoreLabel={tc('learnMore')}
      />
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Fingerprinting */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-navy mb-5">{t('fingerprintingTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fingerprintingServices.map(renderCard)}
          </div>
        </div>

        {/* Background Checks */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-navy mb-5">{t('backgroundChecksTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {backgroundCheckServices.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  )
}
