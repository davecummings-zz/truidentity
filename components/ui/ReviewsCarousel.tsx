'use client'

import { useRef } from 'react'
import { type StaticReview } from '@/lib/static-reviews'
import { ReviewCard } from '@/components/ui/ReviewCard'

interface ReviewsCarouselProps {
  reviews: StaticReview[]
  previousLabel: string
  nextLabel: string
  postedOnLabel: string
  readMoreLabel: string
}

export function ReviewsCarousel({
  reviews,
  previousLabel,
  nextLabel,
  postedOnLabel,
  readMoreLabel,
}: ReviewsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth ?? 300
    el.scrollBy({ left: direction === 'next' ? cardWidth + 20 : -(cardWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-snap-x-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex-none w-[85vw] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ReviewCard
              authorName={review.author}
              rating={review.rating}
              text={review.text}
              relativePublishTime={review.date}
              avatarInitials={review.initials}
              postedOnLabel={postedOnLabel}
              readMoreLabel={readMoreLabel}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={() => scroll('prev')}
          aria-label={previousLabel}
          className="p-2 rounded-lg bg-navy text-white hover:bg-accent-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('next')}
          aria-label={nextLabel}
          className="p-2 rounded-lg bg-navy text-white hover:bg-accent-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
