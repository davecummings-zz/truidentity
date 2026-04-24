import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'
import { services } from '@/config/services'

const locales = ['en', 'es']
const base = siteConfig.siteUrl

const staticPaths = [
  '',
  '/about',
  '/services',
  '/book',
  '/contact',
  '/faq',
  '/service-finder',
  '/privacy-policy',
  '/terms-conditions',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: path === '' ? 1.0 : 0.8,
      })
    }
    for (const service of services) {
      entries.push({
        url: `${base}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return entries
}
