interface ReviewCardProps {
  author: string
  rating: number
  date: string
  text: string
  avatarInitials: string
}

export function ReviewCard({ author, rating, date, text, avatarInitials }: ReviewCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3" role="img" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="flex-1 text-sm text-gray-700 leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold flex-shrink-0" aria-hidden="true">
          {avatarInitials}
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">{author}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  )
}
