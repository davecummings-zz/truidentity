import { getTranslations } from 'next-intl/server'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { type Review } from '@/types'

interface ReviewsSectionProps {
  locale: string
  reviews?: Review[]
}

// Placeholder reviews — swap with real Google API data when available
const PLACEHOLDER_REVIEWS: Review[] = [
  {
    author: 'Maria G.',
    rating: 5,
    date: 'March 2026',
    text: 'Very professional and efficient. The whole process took less than 15 minutes. Highly recommend for anyone needing Live Scan for a teaching license.',
    avatarInitials: 'MG',
  },
  {
    author: 'Carlos R.',
    rating: 5,
    date: 'February 2026',
    text: 'Great service! I needed fingerprinting for my FBI background check and they made it simple and stress-free. Clear pricing with no surprises.',
    avatarInitials: 'CR',
  },
  {
    author: 'Jennifer L.',
    rating: 5,
    date: 'January 2026',
    text: 'Used TruIdentity for NFA fingerprinting. They knew exactly what was needed for ATF Form 4 submissions. Quick, knowledgeable, and reasonably priced.',
    avatarInitials: 'JL',
  },
  {
    author: 'David M.',
    rating: 5,
    date: 'December 2025',
    text: 'Outstanding experience. The booking process online was easy and they were ready for me when I arrived. Professional environment.',
    avatarInitials: 'DM',
  },
  {
    author: 'Rosa T.',
    rating: 5,
    date: 'November 2025',
    text: 'Needed fingerprinting for nursing license application. They provided exactly what TX DPS required. Very friendly staff. Will definitely return.',
    avatarInitials: 'RT',
  },
]

export async function ReviewsSection({ locale, reviews = PLACEHOLDER_REVIEWS }: ReviewsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home.reviews' })

  return (
    <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1 mb-3" aria-label="5 out of 5 stars average">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-sm font-semibold text-gray-600">5.0</span>
          </div>
          <h2 id="reviews-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600">{t('subheading')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {reviews.map((review, i) => (
            <ReviewCard key={i} {...review} />
          ))}
        </div>
      </div>
    </section>
  )
}
