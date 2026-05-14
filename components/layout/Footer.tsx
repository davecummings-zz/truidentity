import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

interface FooterProps {
  locale: string
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const tn = await getTranslations({ locale, namespace: 'nav' })
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: tn('home'), href: `/${locale}` },
    { label: tn('about'), href: `/${locale}/about` },
    { label: tn('services'), href: `/${locale}/services` },
    { label: tn('serviceFinder'), href: `/${locale}/service-finder` },
    { label: tn('book'), href: `/${locale}/book` },
    { label: tn('faq'), href: `/${locale}/faq` },
    { label: tn('contact'), href: `/${locale}/contact` },
  ]

  const legalLinks = [
    { label: tn('privacyPolicy'), href: `/${locale}/privacy-policy` },
    { label: tn('terms'), href: `/${locale}/terms-conditions` },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
              <Image
                src="/images/logo-w.png"
                alt="TruIdentity Screening Solutions"
                height={40}
                width={93}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{t('tagline')}</p>
            {siteConfig.googleBusinessUrl !== 'GOOGLE_BUSINESS_URL' && (
              <a
                href={siteConfig.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent-orange hover:text-accent-orange/80 transition-colors"
              >
                ★ {t('googleBusiness')}
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`tel:${siteConfig.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0 text-accent-orange" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 text-accent-orange mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{siteConfig.address.full}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">{t('hours')}</h3>
            <ul className="space-y-2">
              {siteConfig.hoursStructured.map((h) => (
                <li key={h.days} className="text-sm">
                  <span className="text-white/60 block">{h.days}</span>
                  <span className="text-white/90">{h.hours}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-accent-orange font-medium">{t('appointmentOnly')}</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>{t('copyright', { year })}</span>
          <nav className="flex items-center gap-4" aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white/80 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
