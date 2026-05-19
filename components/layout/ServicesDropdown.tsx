'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface ServiceItem {
  slug: string
  name: string
}

export interface ServiceGroup {
  label: string
  href: string
  items: ServiceItem[]
}

interface ServicesDropdownProps {
  label: string
  groups: ServiceGroup[]
  locale: string
}

export function ServicesDropdown({ label, groups, locale }: ServicesDropdownProps) {
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
        <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-card-hover border border-gray-100 z-50">
          <div className="py-2">
            {groups.map((group, gi) => (
              <div key={group.href}>
                {gi > 0 && <hr className="my-2 border-gray-100" />}
                <Link
                  href={group.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-navy border-b border-navy/20 pb-2 mb-1 hover:text-accent-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue"
                >
                  {group.label}
                </Link>
                {group.items.map((s) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
