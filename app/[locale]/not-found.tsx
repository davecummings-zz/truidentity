import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="py-24 text-center px-4">
      <p className="text-7xl font-extrabold text-navy/10 mb-4">404</p>
      <h1 className="text-3xl font-extrabold text-navy mb-4">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        The page you&apos;re looking for doesn&apos;t exist. It may have moved or been removed.
      </p>
      <Link
        href="/en"
        className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
