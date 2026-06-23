import { siteConfig } from '@/config/site'

export interface GoogleReview {
  authorName: string
  rating: number
  text: string
  relativePublishTime: string
  avatarInitials: string
}

export interface GoogleReviewsData {
  rating: number
  totalReviews: number
  reviews: GoogleReview[]
}

const FALLBACK: GoogleReviewsData = {
  rating: 5.0,
  totalReviews: 51,
  reviews: [],
}

function getInitials(name: string): string {
  const words = name.split(' ').filter(Boolean)
  if (words.length === 1) return words[0][0].toUpperCase()
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return FALLBACK
  }

  const placeId = siteConfig.googlePlaceId
  if (!placeId || placeId === 'PLACE_ID_HERE') {
    return FALLBACK
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
      },
      next: { revalidate: 604800 },
    })

    if (!res.ok) {
      throw new Error(`Places API ${res.status}: ${res.statusText}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json()

    const reviews: GoogleReview[] = (data.reviews ?? []).slice(0, 5).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => ({
        authorName: r.authorAttribution?.displayName ?? 'Anonymous',
        rating: r.rating ?? 5,
        text: r.text?.text ?? '',
        relativePublishTime: r.relativePublishTimeDescription ?? '',
        avatarInitials: getInitials(r.authorAttribution?.displayName ?? 'A'),
      })
    )

    return {
      rating: data.rating ?? FALLBACK.rating,
      totalReviews: data.userRatingCount ?? FALLBACK.totalReviews,
      reviews,
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      throw err
    }
    console.error('[fetchGoogleReviews] Failed, using fallback:', err)
    return FALLBACK
  }
}
