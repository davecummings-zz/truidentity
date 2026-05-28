import { getTranslations } from 'next-intl/server'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { siteConfig } from '@/config/site'
import { type GoogleReview, type GoogleReviewsData } from '@/lib/reviews'

// FALLBACK reviews shown when Google Places API returns no data (API error, no key, or empty response).
// Live data is pulled via lib/reviews.ts using GOOGLE_PLACES_API_KEY + googlePlaceId in config/site.ts.
// NOTE: Places API (New) must be enabled in Google Cloud Console and googlePlaceId must be set before live data flows.
const REAL_REVIEWS: GoogleReview[] = [
  {
    authorName: 'Roland Lee James',
    rating: 5,
    text: 'What a pleasant experience. Very informative, very helpful, very thorough and got the prints done in a timely manner. Thanks !!',
    relativePublishTime: '2 months ago',
    avatarInitials: 'RJ',
  },
  {
    authorName: 'Alexzander Santos',
    rating: 5,
    text: 'I had a great experience getting my fingerprints processed for a new job. Mr. Hawkins was incredibly polite, professional, and made the whole process smooth and stress-free. He was right on time for my appointment and took care of everything.',
    relativePublishTime: '11 months ago',
    avatarInitials: 'AS',
  },
  {
    authorName: 'Lesley Parra',
    rating: 5,
    text: 'Bill is great to work with friendly. Best quality print job in town.',
    relativePublishTime: '2 months ago',
    avatarInitials: 'LP',
  },
  {
    authorName: 'David Villarreal',
    rating: 5,
    text: 'Easy to set up appointment online. Mr. Hawkins was very professional and explained the process very well. Highly recommended.',
    relativePublishTime: '5 months ago',
    avatarInitials: 'DV',
  },
  {
    authorName: 'Santana Rodriguez',
    rating: 5,
    text: 'Great service, fast, professional, very reasonable price, highly recommended if you need fingerprints.',
    relativePublishTime: '5 months ago',
    avatarInitials: 'SR',
  },
]

interface ReviewsSectionProps {
  locale: string
  rating: number
  totalReviews: number
  reviews: GoogleReviewsData['reviews']
}

export async function ReviewsSection({
  locale,
  rating,
  totalReviews,
  reviews,
}: ReviewsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'home.reviews' })
  const displayReviews = (reviews.length > 0 ? reviews : REAL_REVIEWS).slice(0, 5)
  const topRow = displayReviews.slice(0, 3)
  const bottomRow = displayReviews.slice(3)

  return (
    <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">

          {/* Aggregate badge */}
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            aria-label={`${rating.toFixed(1)} — ${t('aggregate', { count: totalReviews })}`}
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-sm font-bold text-navy">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-600">{t('aggregate', { count: totalReviews })}</span>
          </a>

          <h2 id="reviews-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-600">{t('subheading')}</p>
          {locale === 'es' && (
            <p className="mt-2 text-xs text-gray-400">{t('originalLanguageNote')}</p>
          )}
        </div>

        {/* Top row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {topRow.map((review, i) => (
            <ReviewCard
              key={i}
              {...review}
              postedOnLabel={t('postedOn')}
              readMoreLabel={t('readMore')}
            />
          ))}
        </div>

        {/* Bottom row: up to 2 cards, centered */}
        {bottomRow.length > 0 && (
          <div className={`grid gap-5 mb-10 mx-auto ${
            bottomRow.length === 1
              ? 'grid-cols-1 max-w-md'
              : 'grid-cols-1 md:grid-cols-2 max-w-3xl'
          }`}>
            {bottomRow.map((review, i) => (
              <ReviewCard
                key={i + 3}
                {...review}
                postedOnLabel={t('postedOn')}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        )}

        <div className="text-center">
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent-blue font-semibold hover:underline text-sm"
          >
            {t('seeAll', { count: totalReviews })}
          </a>
        </div>
      </div>
    </section>
  )
}
