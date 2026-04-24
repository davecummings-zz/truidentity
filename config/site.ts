export const siteConfig = {
  name: 'TruIdentity Screening Solutions',
  shortName: 'TruIdentity',
  phone: '(956) 000-0000',
  email: 'info@truidentity956.com',
  address: {
    street: '123 Placeholder St',
    city: 'McAllen',
    state: 'TX',
    zip: '78501',
    full: '123 Placeholder St, McAllen, TX 78501',
  },
  hours: 'Mon–Fri: 9am–5pm, Sat: 10am–2pm',
  hoursStructured: [
    { days: 'Monday–Friday', hours: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 2:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
  acuityOwnerId: 'OWNER_ID',
  googleMapsEmbedUrl: 'GOOGLE_MAPS_EMBED_URL',
  googleBusinessUrl: 'GOOGLE_BUSINESS_URL',
  noWalkIns: true,
  siteUrl: 'https://truidentity956.com',
  description:
    'FBI Background Checks with 48-hour results, Live Scan, ATF eFile, NFA Fingerprinting, and Mobile Fingerprinting — serving McAllen and the Rio Grande Valley. Appointment-only, bilingual service.',
  locale: 'en_US',
  twitterHandle: '@truidentity956',
  ogImage: '/og-image.png',
}

export type SiteConfig = typeof siteConfig
