import { siteConfig } from '@/config/site'
import { type Service } from '@/config/services'

const BUSINESS_ID = `${siteConfig.siteUrl}/#business`

const NAV_LABELS: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    book: 'Book Appointment',
    contact: 'Contact',
    faq: 'FAQ',
    'service-finder': 'Find My Service',
    'privacy-policy': 'Privacy Policy',
    'terms-conditions': 'Terms & Conditions',
  },
  es: {
    home: 'Inicio',
    about: 'Nosotros',
    services: 'Servicios',
    book: 'Reservar Cita',
    contact: 'Contacto',
    faq: 'Preguntas Frecuentes',
    'service-finder': 'Encontrar Mi Servicio',
    'privacy-policy': 'Política de Privacidad',
    'terms-conditions': 'Términos y Condiciones',
  },
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Bill Hawkins',
    },
    telephone: `+1${siteConfig.phone.replace(/\D/g, '')}`,
    email: siteConfig.email,
    image: `${siteConfig.siteUrl}/images/logo-b.png`,
    description: siteConfig.description,
    priceRange: '$49–$220',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.211888,
      longitude: -98.233461,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 26.211888,
        longitude: -98.233461,
      },
      geoRadius: '100000',
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
  }
}

export function serviceSchema(service: Service, locale: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
    provider: { '@id': BUSINESS_ID },
    areaServed: 'South Texas',
    url: `${siteConfig.siteUrl}/${locale}/services/${service.slug}`,
  }
  if (service.price.startsWith('$')) {
    schema.offers = {
      '@type': 'Offer',
      price: service.price.replace(/[$+]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
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

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  }
}

export function aggregateRatingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '51',
      bestRating: '5',
    },
  }
}

export function breadcrumbSchema(
  locale: string,
  crumbs: { key?: string; name?: string; url: string }[],
) {
  const labels = NAV_LABELS[locale] ?? NAV_LABELS.en
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: labels.home,
        item: `${siteConfig.siteUrl}/${locale}`,
      },
      ...crumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name ?? labels[crumb.key ?? ''] ?? crumb.key ?? '',
        item: crumb.url,
      })),
    ],
  }
}
