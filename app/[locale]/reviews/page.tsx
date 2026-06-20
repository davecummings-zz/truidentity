import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { JsonLd } from '@/components/seo/JsonLd'
import { aggregateRatingSchema } from '@/lib/schemas'
import { STATIC_REVIEWS } from '@/lib/static-reviews'
import { siteConfig } from '@/config/site'

interface ReviewsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'reviews.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/reviews` },
    openGraph: { url: `${siteConfig.siteUrl}/reviews`, title: t('title'), description: t('description') },
  }
}

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'reviews' })

  const displayReviews = STATIC_REVIEWS.filter((r) => r.text !== 'TODO')

  return (
    <>
      <JsonLd data={aggregateRatingSchema()} />

      {/* Hero */}
      <section className="bg-navy text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
            aria-label={`5.0 — ${t('aggregate')}`}
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </span>
            <span className="text-sm font-bold text-white">5.0</span>
            <span className="text-sm text-white/40">·</span>
            <span className="text-sm text-white/80">{t('aggregate')}</span>
          </a>

          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {t('heading')}
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('subheading')}
          </p>
          <a
            href={siteConfig.googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            {t('viewOnGoogle')}
          </a>
        </div>
      </section>

      {/* Review grid */}
      <section className="py-16 lg:py-24 bg-gray-50" aria-label="Customer reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  authorName={review.author}
                  rating={review.rating}
                  text={review.text}
                  relativePublishTime={review.date}
                  avatarInitials={review.initials}
                  postedOnLabel={t('postedOn')}
                  readMoreLabel={t('readMore')}
                />
              ))}
            </div>
          ) : null}

          {locale === 'es' && (
            <p className="mt-8 text-center text-xs text-gray-400">{t('originalLanguageNote')}</p>
          )}

          {/* Write a Review CTA */}
          <div className="mt-12 text-center">
            <a
              href={siteConfig.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t('writeReview')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
