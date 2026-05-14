'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { services } from '@/config/services'
import { siteConfig } from '@/config/site'

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const locale = useLocale()
  const t = useTranslations('nav')
  const th = useTranslations('header')
  const tc = useTranslations('common')
  const ts = useTranslations('serviceItems')
  const drawerRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setOpen(false)
    setServicesOpen(false)
    triggerRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return

    // Move focus into the drawer on open
    const firstFocusable = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]
    firstFocusable?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return }
      if (e.key !== 'Tab') return

      const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="md:hidden p-2.5 rounded text-navy hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
        aria-label={open ? th('menuClose') : th('menuOpen')}
        aria-expanded={open}
        aria-controls="mobile-menu-drawer"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={close} aria-hidden="true" />

          {/* Drawer */}
          <nav id="mobile-menu-drawer" ref={drawerRef} className="absolute top-0 right-0 w-80 max-w-full h-full bg-white shadow-xl flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-semibold text-navy">{tc('menuLabel')}</span>
              <button
                onClick={close}
                className="p-2.5 rounded text-navy hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                aria-label={th('menuClose')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Click-to-call */}
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, '')}`}
              aria-label={`Call ${siteConfig.phone}`}
              className="flex items-center gap-2 px-5 py-4 bg-accent-orange/10 text-amber-900 font-semibold hover:bg-accent-orange/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {siteConfig.phone}
            </a>

            <ul className="flex-1 px-3 py-3 space-y-1">
              <li>
                <Link href={`/${locale}`} onClick={close} className="block px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} onClick={close} className="block px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors">
                  {t('about')}
                </Link>
              </li>

              {/* Services accordion */}
              <li>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                  aria-expanded={servicesOpen}
                >
                  <span>{t('services')}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesOpen && (
                  <ul className="ml-3 mt-1 space-y-1">
                    <li>
                      <Link href={`/${locale}/services`} onClick={close} className="block px-3 py-2.5 rounded-lg text-sm text-navy/80 hover:bg-navy/5 transition-colors">
                        {t('servicesDropdown')}
                      </Link>
                    </li>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/${locale}/services/${s.slug}`} onClick={close} className="block px-3 py-2.5 rounded-lg text-sm text-navy/80 hover:bg-navy/5 transition-colors">
                          {ts(`${s.slug}.name`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link href={`/${locale}/service-finder`} onClick={close} className="block px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors">
                  {t('serviceFinder')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} onClick={close} className="block px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} onClick={close} className="block px-3 py-2.5 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>

            <div className="px-4 py-4 border-t border-gray-100">
              <Link
                href={`/${locale}/book`}
                onClick={close}
                className="flex items-center justify-center w-full px-4 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-600 transition-colors"
              >
                {t('book')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
