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
      { source: '/about{/}?', destination: '/en/about', statusCode: 301 },
      { source: '/services{/}?', destination: '/en/services', statusCode: 301 },
      { source: '/contact{/}?', destination: '/en/contact', statusCode: 301 },
      { source: '/faq{/}?', destination: '/en/faq', statusCode: 301 },
      { source: '/appointment{/}?', destination: '/en/book', statusCode: 301 },
      { source: '/privacy-policy{/}?', destination: '/en/privacy-policy', statusCode: 301 },
      { source: '/terms-conditions{/}?', destination: '/en/terms-conditions', statusCode: 301 },
      { source: '/terms{/}?', destination: '/en/terms-conditions', statusCode: 301 },
      { source: '/ink-fingerprinting{/}?', destination: '/en/services/ink-fingerprinting', statusCode: 301 },
      { source: '/fbi-background-checks{/}?', destination: '/en/services/fbi-background-checks', statusCode: 301 },
      { source: '/fbi-apostille{/}?', destination: '/en/services/fbi-apostille', statusCode: 301 },
      { source: '/live-scan-fingerprinting{/}?', destination: '/en/services/live-scan-fingerprinting', statusCode: 301 },
      { source: '/nfa-fingerprinting{/}?', destination: '/en/services/nfa-fingerprinting', statusCode: 301 },
      { source: '/atf-efile-services{/}?', destination: '/en/services/atf-efile-services', statusCode: 301 },
      { source: '/mobile-fingerprinting{/}?', destination: '/en/services/mobile-fingerprinting', statusCode: 301 },
    ]
  },
}

export default withNextIntl(nextConfig)
