import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      // About
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/about/', destination: '/en/about', permanent: true },

      // Services overview
      { source: '/services', destination: '/en/services', permanent: true },
      { source: '/services/', destination: '/en/services', permanent: true },

      // Contact
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/contact/', destination: '/en/contact', permanent: true },

      // FAQ
      { source: '/faq', destination: '/en/faq', permanent: true },
      { source: '/faq/', destination: '/en/faq', permanent: true },

      // Appointment → Book
      { source: '/appointment', destination: '/en/book', permanent: true },
      { source: '/appointment/', destination: '/en/book', permanent: true },

      // Privacy Policy
      { source: '/privacy-policy', destination: '/en/privacy-policy', permanent: true },
      { source: '/privacy-policy/', destination: '/en/privacy-policy', permanent: true },

      // Terms
      { source: '/terms-conditions', destination: '/en/terms-conditions', permanent: true },
      { source: '/terms-conditions/', destination: '/en/terms-conditions', permanent: true },
      { source: '/terms', destination: '/en/terms-conditions', permanent: true },
      { source: '/terms/', destination: '/en/terms-conditions', permanent: true },

      // Service pages — fingerprinting
      { source: '/ink-fingerprinting', destination: '/en/services/ink-fingerprinting', permanent: true },
      { source: '/ink-fingerprinting/', destination: '/en/services/ink-fingerprinting', permanent: true },
      { source: '/fbi-background-checks', destination: '/en/services/fbi-background-checks', permanent: true },
      { source: '/fbi-background-checks/', destination: '/en/services/fbi-background-checks', permanent: true },
      { source: '/fbi-apostille', destination: '/en/services/fbi-apostille', permanent: true },
      { source: '/fbi-apostille/', destination: '/en/services/fbi-apostille', permanent: true },
      { source: '/live-scan-fingerprinting', destination: '/en/services/live-scan-fingerprinting', permanent: true },
      { source: '/live-scan-fingerprinting/', destination: '/en/services/live-scan-fingerprinting', permanent: true },
      { source: '/nfa-fingerprinting', destination: '/en/services/nfa-fingerprinting', permanent: true },
      { source: '/nfa-fingerprinting/', destination: '/en/services/nfa-fingerprinting', permanent: true },
      { source: '/atf-efile-services', destination: '/en/services/atf-efile-services', permanent: true },
      { source: '/atf-efile-services/', destination: '/en/services/atf-efile-services', permanent: true },
      { source: '/mobile-fingerprinting', destination: '/en/services/mobile-fingerprinting', permanent: true },
      { source: '/mobile-fingerprinting/', destination: '/en/services/mobile-fingerprinting', permanent: true },
    ]
  },
}

export default withNextIntl(nextConfig)
