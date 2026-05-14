import Link from 'next/link'
import type { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  name: string
  description: string
  href: string
  learnMoreLabel: string
}

export function ServiceCard({ icon, name, description, href, learnMoreLabel }: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-accent-blue/40 transition-all">
      <div className="mb-4 w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-base font-bold text-navy mb-2">{name}</h3>
      <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">{description}</p>
      <Link
        href={href}
        aria-label={`${learnMoreLabel} — ${name}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-navy transition-colors group-hover:gap-2.5"
      >
        {learnMoreLabel}<span className="sr-only"> — {name}</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
