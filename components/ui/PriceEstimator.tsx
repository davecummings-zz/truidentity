'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { type Service } from '@/config/services'

interface PriceEstimatorProps {
  services: Service[]
}

export function PriceEstimator({ services }: PriceEstimatorProps) {
  const t = useTranslations('services.estimator')
  const ts = useTranslations('serviceItems')
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
      <h3 className="text-lg font-bold text-navy mb-4">{t('heading')}</h3>

      <label htmlFor="service-estimator" className="block text-sm font-medium text-gray-700 mb-2">
        {t('selectLabel')}
      </label>
      <select
        id="service-estimator"
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
        value={selected?.slug ?? ''}
        onChange={(e) => {
          const found = services.find((s) => s.slug === e.target.value) ?? null
          setSelected(found)
        }}
      >
        <option value="">{t('placeholder')}</option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug}>
            {ts(`${s.slug}.name`)}
          </option>
        ))}
      </select>

      {selected && (
        <div className="mt-5 space-y-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-sm text-gray-500">{t('priceLabel')}:</span>
            <span className={selected.price.startsWith('$') ? 'text-3xl font-extrabold text-navy' : 'text-base font-bold text-navy'}>
              {selected.price}
            </span>
            {selected.priceNote && (
              <span className="text-xs text-gray-500">{selected.priceNote}</span>
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{t('includes')}</p>
            <ul className="space-y-1.5">
              {(ts.raw(`${selected.slug}.whatToBring`) as string[]).slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
