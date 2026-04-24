'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const id = `accordion-panel-${i}`
        const buttonId = `accordion-btn-${i}`
        return (
          <div
            key={i}
            className={cn(
              'rounded-xl border transition-colors',
              isOpen ? 'border-accent-blue/40 bg-navy/[0.02]' : 'border-gray-200 bg-white',
            )}
          >
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy hover:text-accent-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue rounded-xl"
              >
                <span>{item.question}</span>
                <svg
                  className={cn('w-5 h-5 flex-shrink-0 transition-transform text-accent-blue', isOpen && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div
              id={id}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
            >
              <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
