'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('header')

  const otherLocale = locale === 'en' ? 'es' : 'en'

  const switchLocale = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; SameSite=Lax`
    const newPath = pathname.replace(/^\/(en|es)/, `/${otherLocale}`)
    router.replace(newPath)
  }

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium text-navy hover:text-accent-blue transition-colors border border-navy/30 rounded px-2.5 py-1 hover:border-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Spanish'}`}
    >
      {t('languageToggle')}
    </button>
  )
}
