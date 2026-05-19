export const siteConfig = {
  name: 'TruIdentity Screening Solutions',
  shortName: 'TruIdentity',
  phone: '(956) 670-6144',
  email: 'bill@truidentity956.com',
  address: {
    street: '813 N. Main St, Suite 110B',
    city: 'McAllen',
    state: 'TX',
    zip: '78501',
    full: '813 N. Main St, Suite 110B, McAllen, TX 78501',
  },
  hours: 'Mon–Fri: 8:30 AM–6:00 PM',
  hoursStructured: [
    { days: 'Mon – Fri', hours: '8:30 AM – 6:00 PM' },
    { days: 'Sat – Sun', hours: 'Closed' },
  ],
  acuityOwnerId: '31846135',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d28636.25851314076!2d-98.233461!3d26.211888!3m2!1i1024!2i768!4f13.1!2m1!1s813%20N%20Main%20St%20Office%20Suite%20%23511%20McAllen%2C%20TX%2078501!5e0!3m2!1sen!2sus!4v1777061461985!5m2!1sen!2sus',
  googlePlaceId: 'PLACE_ID_HERE',
  googleBusinessUrl: 'GOOGLE_BUSINESS_URL',
  noWalkIns: true,
  siteUrl: 'https://truidentity956.com',
  description:
    'FBI Background Checks, Criminal Background Checks, Live Scan, NFA, ATF eFile, and Mobile Fingerprinting in McAllen, TX. 24-hour results, bilingual staff, appointment-only.',
  locale: 'en_US',
  twitterHandle: '@truidentity956',
  ogImage: '/images/logo-b.png',
}

export type SiteConfig = typeof siteConfig
