import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'es'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !(locales as readonly string[]).includes(locale)) {
    locale = 'en'
  }
  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  }
})
