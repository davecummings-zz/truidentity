import { getTranslations } from 'next-intl/server'
import { STATIC_REVIEWS } from '@/lib/static-reviews'
import { ReviewCard } from '@/components/ui/ReviewCard'

interface ServiceReviewsProps {
  reviewIds: string[]
  locale: string
  heading?: string
}

export async function ServiceReviews({ reviewIds, locale, heading }: ServiceReviewsProps) {
  const t = await getTranslations({ locale, namespace: 'serviceReviews' })
  const reviews = reviewIds
    .map((id) => STATIC_REVIEWS.find((r) => r.id === id))
    .filter(Boolean) as typeof STATIC_REVIEWS

  if (reviews.length === 0) return null

  return (
    <section aria-labelledby="service-reviews-heading" className="mt-12 pt-10 border-t border-gray-200">
      <h2 id="service-reviews-heading" className="text-xl font-bold text-navy mb-6">
        {heading ?? t('heading')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            authorName={review.author}
            rating={review.rating}
            text={review.text}
            relativePublishTime={review.date}
            avatarInitials={review.initials}
            postedOnLabel=""
            readMoreLabel={t('readMore')}
          />
        ))}
      </div>
    </section>
  )
}
