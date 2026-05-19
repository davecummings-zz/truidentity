'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
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
  type LucideIcon,
} from 'lucide-react'
import { services } from '@/config/services'
import { ServicePricingCard } from './ServicePricingCard'

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

const fingerprintingServices = services.filter((s) => s.category === 'fingerprinting')
const backgroundCheckServices = services.filter((s) => s.category === 'background-checks')

export function ServicesPricingGrid() {
  const locale = useLocale()
  const t = useTranslations('home.services')

  const [fingerprintingOpen, setFingerprintingOpen] = useState(false)
  const [backgroundChecksOpen, setBackgroundChecksOpen] = useState(false)

  const toggleFingerprinting = () => setFingerprintingOpen((v) => !v)
  const toggleBackgroundChecks = () => setBackgroundChecksOpen((v) => !v)

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="services-pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main heading */}
        <div className="text-center mb-12">
          <h2
            id="services-pricing-heading"
            className="text-3xl lg:text-4xl font-extrabold text-navy mb-4"
          >
            {t('heading')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{t('subheading')}</p>
        </div>

        {/* Fingerprinting section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-navy">{t('fingerprintingTitle')}</h3>
            <button
              onClick={toggleFingerprinting}
              aria-expanded={fingerprintingOpen}
              aria-controls="fingerprinting-pricing-section"
              className={`px-4 py-2 text-sm font-semibold rounded-lg border border-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                fingerprintingOpen
                  ? 'bg-navy text-white hover:bg-navy/90'
                  : 'bg-white text-navy hover:bg-navy hover:text-white'
              }`}
            >
              {fingerprintingOpen ? t('hidePricing') : t('viewAllPricing')}
            </button>
          </div>
          <div
            id="fingerprinting-pricing-section"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {fingerprintingServices.map((service) => (
              <ServicePricingCard
                key={service.slug}
                service={service}
                icon={serviceIcons[service.slug] ?? ShieldCheck}
                pricingOpen={fingerprintingOpen}
                onSeePricing={toggleFingerprinting}
                locale={locale}
              />
            ))}
          </div>
        </div>

        {/* Background Checks section */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-navy">{t('backgroundChecksTitle')}</h3>
            <button
              onClick={toggleBackgroundChecks}
              aria-expanded={backgroundChecksOpen}
              aria-controls="background-checks-pricing-section"
              className={`px-4 py-2 text-sm font-semibold rounded-lg border border-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                backgroundChecksOpen
                  ? 'bg-navy text-white hover:bg-navy/90'
                  : 'bg-white text-navy hover:bg-navy hover:text-white'
              }`}
            >
              {backgroundChecksOpen ? t('hidePricing') : t('viewAllPricing')}
            </button>
          </div>
          <div
            id="background-checks-pricing-section"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {backgroundCheckServices.map((service) => (
              <ServicePricingCard
                key={service.slug}
                service={service}
                icon={serviceIcons[service.slug] ?? ShieldCheck}
                pricingOpen={backgroundChecksOpen}
                onSeePricing={toggleBackgroundChecks}
                locale={locale}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
