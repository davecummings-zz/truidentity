import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'
import { services } from '@/config/services'
import { LanguageToggle } from './LanguageToggle'
import { MobileMenu } from './MobileMenu'
import { ServicesDropdown } from './ServicesDropdown'

interface HeaderProps {
  locale: string
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale, namespace: 'nav' })
  const th = await getTranslations({ locale, namespace: 'header' })
  const ts = await getTranslations({ locale, namespace: 'serviceItems' })

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded">
            <Image
              src="/images/logo-b.png"
              alt={th('logoAlt')}
              height={48}
              width={114}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            <Link href={`/${locale}`} className="px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('home')}
            </Link>
            <Link href={`/${locale}/about`} className="px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('aboutShort')}
            </Link>
            <Link href={`/${locale}/reviews`} className="px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('reviews')}
            </Link>

            {/* Services dropdown */}
            <ServicesDropdown
              label={t('services')}
              locale={locale}
              groups={[
                {
                  label: th('fingerprintingGroup'),
                  href: `/${locale}/services`,
                  items: services
                    .filter((s) => s.category === 'fingerprinting')
                    .map((s) => ({ slug: s.slug, name: ts(`${s.slug}.name`) })),
                },
                {
                  label: th('backgroundChecksGroup'),
                  href: `/${locale}/services#background-checks`,
                  items: services
                    .filter((s) => s.category === 'background-checks')
                    .map((s) => ({ slug: s.slug, name: ts(`${s.slug}.name`) })),
                },
              ]}
            />

            <Link href={`/${locale}/service-finder`} className="hidden lg:inline-flex px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('serviceFinderShort')}
            </Link>
            <Link href={`/${locale}/faq`} className="px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('faq')}
            </Link>
            <Link href={`/${locale}/contact`} className="px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5">
              {t('contact')}
            </Link>
          </nav>

          {/* Right: phone + actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Click-to-call */}
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-accent-orange hover:text-accent-orange/80 transition-colors"
              aria-label={`${th('callUs')}: ${siteConfig.phone}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden lg:inline">{siteConfig.phone}</span>
            </a>

            {/* Book button (desktop) */}
            <Link
              href={`/${locale}/book`}
              className="hidden md:inline-flex items-center px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('book')}
            </Link>

            <LanguageToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
