import { siteConfig } from '@/config/site'
import { type Service } from '@/config/services'

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '26.2034',
        longitude: '-98.2300',
      },
      geoRadius: '100',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair accessible entrance',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wheelchair accessible parking lot',
        value: true,
      },
    ],
    priceRange: '$49–$220',
  }
}

export function serviceSchema(service: Service, locale: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    areaServed: 'South Texas',
    url: `${siteConfig.siteUrl}/${locale}/services/${service.slug}`,
  }
  if (service.price.startsWith('$')) {
    schema.offers = {
      '@type': 'Offer',
      price: service.price.replace(/[$+]/g, ''),
      priceCurrency: 'USD',
    }
  }
  return schema
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
