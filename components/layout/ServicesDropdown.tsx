'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface ServiceItem {
  slug: string
  name: string
}

interface ServicesDropdownProps {
  label: string
  allServicesLabel: string
  services: ServiceItem[]
  locale: string
  allServicesHref: string
}

export function ServicesDropdown({
  label,
  allServicesLabel,
  services,
  locale,
  allServicesHref,
}: ServicesDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        containerRef.current?.querySelector('button')?.focus()
      }
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy hover:text-accent-blue transition-colors rounded hover:bg-navy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
      >
        {label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-card-hover border border-gray-100 z-50">
          <div className="py-2">
            <Link
              href={allServicesHref}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5 transition-colors border-b border-gray-100 mb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue rounded-t-xl"
            >
              {allServicesLabel}
            </Link>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                onClick={() => setOpen(false)}
                className="block px-4 py-2 text-sm text-navy/80 hover:bg-navy/5 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
