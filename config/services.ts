export interface Service {
  slug: string
  name: string
  shortDescription: string
  price: string
  priceNote?: string
  popular?: boolean
  emoji: string
  trustLine: string
  whatItIs: string
  whoNeeds: string[]
  whatToBring: string[]
  whatToExpect: string
  relatedSlugs: string[]
}

export const services: Service[] = [
  {
    slug: 'fbi-background-checks',
    name: 'FBI Background Checks',
    shortDescription:
      'Official FBI Identity History Summary — results delivered in as little as 48 hours.',
    price: '$49',
    popular: true,
    emoji: '🔍',
    trustLine: '48-hour results. No-rejection guarantee. Delivered directly from the FBI.',
    whatItIs:
      'An FBI Background Check — officially called an Identity History Summary — is an official record of your criminal history as maintained by the FBI. Required for many employment positions, professional licenses, volunteer roles, and personal record requests. Results are returned directly from the FBI, typically within 48 hours of submission through our authorized channeler.',
    whoNeeds: [
      'Job applicants for positions requiring a federal background check',
      'Healthcare, education, and finance professionals seeking licensure',
      'Volunteer organizations and nonprofits with background-check requirements',
      'Individuals requesting their own personal record',
      'Landlords and property managers',
    ],
    whatToBring: [
      'Valid government-issued photo ID (driver\'s license or passport)',
      'Social Security Number',
      'Completed FD-258 fingerprint card if your agency provided one (we also stock them on-site)',
    ],
    whatToExpect:
      'The fingerprinting process takes about 10 minutes. Results are returned directly from the FBI — most arrive within 48 hours. If your fingerprints are rejected for quality reasons, we reprint them at no charge.',
    relatedSlugs: ['live-scan-fingerprinting', 'fbi-apostille', 'ink-fingerprinting'],
  },
  {
    slug: 'fbi-apostille',
    name: 'FBI Apostille',
    shortDescription:
      'FBI background check authenticated for international use — required for work visas, residency, and immigration.',
    price: '$220',
    emoji: '🌐',
    trustLine: 'Full-service — fingerprinting, FBI processing, and apostille authentication handled for you.',
    whatItIs:
      'An FBI Apostille is an FBI Identity History Summary that has been authenticated with an apostille certificate, making it legally valid in countries that are members of the Hague Apostille Convention. Required for international employment, immigration applications, permanent residency, and international adoption. We handle the complete process — fingerprinting, FBI submission, and apostille certification — in a single appointment.',
    whoNeeds: [
      'Individuals applying for international work visas',
      'Those seeking permanent residency or citizenship abroad',
      'International adoption applicants',
      'Expats and foreign nationals requiring a U.S. background check for immigration',
      'Anyone whose destination country requires a Hague Convention apostille',
    ],
    whatToBring: [
      'Valid government-issued photo ID',
      'Social Security Number',
      'Destination country name and any specific instructions from the requesting foreign authority',
    ],
    whatToExpect:
      'One appointment covers everything — fingerprinting, FBI background check submission, and coordination of the apostille authentication process. Total turnaround is typically 8–12 weeks, determined by FBI and U.S. Department of State processing times.',
    relatedSlugs: ['fbi-background-checks', 'live-scan-fingerprinting'],
  },
  {
    slug: 'ink-fingerprinting',
    name: 'Ink Fingerprinting',
    shortDescription:
      'Traditional ink-rolled FD-258 fingerprint cards — completed same day, ready to mail.',
    price: '$49',
    emoji: '✋',
    trustLine: 'Completed cards in hand same day — no waiting, no mailing delays on our end.',
    whatItIs:
      'Ink fingerprinting uses traditional ink to roll your fingerprints onto standard FD-258 fingerprint cards. Many federal agencies, out-of-state licensing boards, and certain background check providers still require physical ink cards rather than electronic submission. Cards are prepared and ready for you to mail same day.',
    whoNeeds: [
      'Federal agency applicants required to submit physical fingerprint cards',
      'Out-of-state licensing board applicants (notary, process server, real estate, etc.)',
      'Anyone whose agency specifically requires FD-258 ink cards',
      'Individuals who have received rejected electronic submissions and need a physical backup',
    ],
    whatToBring: [
      'Valid government-issued photo ID',
      'Fingerprint card if your requesting agency provided one (we also stock standard FD-258 cards)',
    ],
    whatToExpect:
      'The process takes about 10 minutes. You leave with completed, legible fingerprint cards — ready to mail to your requesting agency. No delays on our end.',
    relatedSlugs: ['live-scan-fingerprinting', 'fbi-background-checks'],
  },
  {
    slug: 'live-scan-fingerprinting',
    name: 'Live Scan Fingerprinting',
    shortDescription:
      'Electronic fingerprint capture transmitted directly to the FBI or TX DPS — no ink, results in 24–72 hours.',
    price: '$49',
    emoji: '📡',
    trustLine: 'No ink. No cards. Results transmitted directly to your agency — typically within 24–72 hours.',
    whatItIs:
      'Live Scan captures your fingerprints electronically using a high-resolution digital scanner and transmits them directly to the requesting agency — no ink, no physical card, no mailing. This is the required method for most Texas state licensing boards, teachers, childcare workers, healthcare professionals, and adoption applicants in Texas.',
    whoNeeds: [
      'Teachers and school district employees (TEA, SBEC)',
      'Childcare and daycare workers',
      'Healthcare professionals seeking Texas licensure',
      'Texas state license applicants through TX DPS',
      'Adoption applicants and foster care providers',
    ],
    whatToBring: [
      'Valid government-issued photo ID',
      'ORI (Originating Agency Identifier) number — provided by your employer or licensing board',
      'Completed request form from your agency, if applicable',
    ],
    whatToExpect:
      'Electronic capture takes about 10 minutes. Results are transmitted directly to your requesting agency — typically within 24–72 hours. You do not need to mail anything. Bring your ORI number; without it we cannot complete your Live Scan submission.',
    relatedSlugs: ['fbi-background-checks', 'ink-fingerprinting'],
  },
  {
    slug: 'nfa-fingerprinting',
    name: 'NFA Fingerprinting',
    shortDescription:
      'Two FD-258 fingerprint cards for ATF Form 4 or Form 1 NFA transfers — completed in 10 minutes.',
    price: '$49',
    emoji: '🔒',
    trustLine: 'Correctly completed FD-258 cards ready for your Form 4 or Form 1 — done right the first time.',
    whatItIs:
      'NFA (National Firearms Act) Fingerprinting produces the two completed FD-258 fingerprint card sets required by the ATF when purchasing or transferring NFA-regulated items — suppressors, short-barreled rifles (SBRs), short-barreled shotguns (SBSs), and machine guns. Correctly completed cards are critical; errors delay your approval by months.',
    whoNeeds: [
      'Individuals purchasing suppressors or silencers',
      'Short-barreled rifle (SBR) and shotgun (SBS) applicants',
      'ATF Form 4 (Tax Paid Transfer) applicants',
      'ATF Form 1 (Make and Register) applicants',
      'NFA trust responsible persons',
    ],
    whatToBring: [
      'Valid government-issued photo ID',
      'Copy of your ATF Form 4 or Form 1 for reference',
      'NFA trust documents, if applying as a trust',
    ],
    whatToExpect:
      'We produce two sets of completed, legible FD-258 fingerprint cards as required by the ATF. The process takes 10–15 minutes. Cards are ready immediately — submit them with your NFA paperwork. Also ask about our ATF eFile service for significantly faster approval.',
    relatedSlugs: ['atf-efile-services', 'ink-fingerprinting'],
  },
  {
    slug: 'atf-efile-services',
    name: 'ATF eFile Services',
    shortDescription:
      'Electronic NFA application through the ATF eForms system — weeks faster than paper filing.',
    price: '$75',
    emoji: '💻',
    trustLine: 'We guide you through every field — approvals in weeks, not months.',
    whatItIs:
      'ATF eFile Services guide you through submitting your NFA application electronically through the ATF eForms system. Electronic submissions are processed significantly faster than paper — often approved in weeks rather than months. We handle the fingerprinting, walk through every field of the form with you, and submit your completed application.',
    whoNeeds: [
      'Anyone filing ATF Form 4 (Tax Paid Transfer) for a suppressor, SBR, SBS, or machine gun',
      'Individuals filing ATF Form 1 (Make and Register)',
      'Trust, corporation, or individual applicants seeking faster approval',
      'First-time NFA buyers who want guided assistance',
    ],
    whatToBring: [
      'Valid government-issued photo ID',
      'Serial number and description of the NFA item',
      'Dealer name, address, and FFL/SOT information',
      'Responsible person information (name, DOB, address)',
      'NFA trust or corporate documents, if applicable',
    ],
    whatToExpect:
      'We capture your fingerprints, photograph, and signature, then guide you through the complete ATF eForms submission — every field, every attachment. Your application is submitted before you leave. eFile approvals are typically received in weeks. Paper submissions can take many months.',
    relatedSlugs: ['nfa-fingerprinting', 'ink-fingerprinting'],
  },
  {
    slug: 'mobile-fingerprinting',
    name: 'Mobile Fingerprinting',
    shortDescription:
      'Professional fingerprinting at your location — offices, schools, and facilities throughout South Texas.',
    price: '$75+',
    priceNote: 'Starting price. Travel fee may apply based on distance from McAllen.',
    emoji: '🚗',
    trustLine: 'We come to you — anywhere in South Texas, all equipment included.',
    whatItIs:
      'Mobile fingerprinting brings professional-grade fingerprinting equipment directly to your office, school, clinic, or facility — no travel required for your staff or group. Ideal for employers onboarding multiple employees, school districts, healthcare organizations, nonprofits, and government agencies throughout South Texas.',
    whoNeeds: [
      'Employers with multiple new hires requiring fingerprinting',
      'Schools and educational institutions fingerprinting staff',
      'Healthcare facilities and clinics',
      'Nonprofits and government agencies',
      'Any organization needing group fingerprinting on-site',
    ],
    whatToBring: [
      'Valid government-issued photo ID (each participant)',
      'ORI numbers or required agency forms for each participant',
      'A clear table or desk area at your location',
    ],
    whatToExpect:
      'Contact us in advance to confirm your group\'s specific needs, location, and scheduling. We bring all necessary equipment and handle everything on-site — Live Scan, ink cards, or both. Minimum group size may apply. Travel fee is based on distance from our McAllen location.',
    relatedSlugs: ['live-scan-fingerprinting', 'fbi-background-checks', 'ink-fingerprinting'],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => s !== undefined)
}
