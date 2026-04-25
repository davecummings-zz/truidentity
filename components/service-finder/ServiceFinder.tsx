'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import {
  ShieldCheck,
  Stamp,
  Fingerprint,
  ScanLine,
  ClipboardList,
  Upload,
  MapPin,
  CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { services, type Service } from '@/config/services'

const serviceIcons: Record<string, LucideIcon> = {
  'fbi-background-checks': ShieldCheck,
  'fbi-apostille': Stamp,
  'ink-fingerprinting': Fingerprint,
  'live-scan-fingerprinting': ScanLine,
  'nfa-fingerprinting': ClipboardList,
  'atf-efile-services': Upload,
  'mobile-fingerprinting': MapPin,
}

function ServiceIcon({ slug, size, containerClass }: { slug: string; size: number; containerClass: string }) {
  const Icon = serviceIcons[slug] ?? ShieldCheck
  return (
    <div className={containerClass} aria-hidden="true">
      <Icon size={size} className="text-accent-blue" />
    </div>
  )
}

type Step = 'purpose' | 'format' | 'international' | 'result' | 'all'

interface State {
  step: Step
  history: Step[]
  result: Service | null
}

const INITIAL_STATE: State = { step: 'purpose', history: [], result: null }

export function ServiceFinder() {
  const locale = useLocale()
  const t = useTranslations('serviceFinder')
  const tc = useTranslations('common')
  const ts = useTranslations('serviceItems')
  const [state, setState] = useState<State>(INITIAL_STATE)

  const push = (next: Step, result: Service | null = null) => {
    setState((s) => ({
      step: next,
      history: [...s.history, s.step],
      result,
    }))
  }

  const back = () => {
    setState((s) => {
      const history = [...s.history]
      const prev = history.pop() ?? 'purpose'
      return { step: prev, history, result: null }
    })
  }

  const reset = () => setState(INITIAL_STATE)

  const getService = (slug: string) => services.find((s) => s.slug === slug)!

  const purposeOptions = t.raw('steps.purpose.options') as string[]
  const formatOptions = t.raw('steps.format.options') as string[]
  const internationalOptions = t.raw('steps.international.options') as string[]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress / controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {state.history.length > 0 && state.step !== 'result' && state.step !== 'all' && (
            <button
              onClick={back}
              className="flex items-center gap-1.5 text-navy font-medium hover:text-accent-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
            >
              ← {t('back')}
            </button>
          )}
        </div>
        {(state.step !== 'purpose' || state.history.length > 0) && (
          <button
            onClick={reset}
            className="text-sm text-gray-500 hover:text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue rounded"
          >
            ↺ {t('startOver')}
          </button>
        )}
      </div>

      {/* Step: Purpose */}
      {state.step === 'purpose' && (
        <div>
          <h2 className="text-xl font-bold text-navy mb-6">{t('steps.purpose.question')}</h2>
          <ul className="space-y-3">
            {purposeOptions.map((option, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    if (i === 0) push('format')
                    else if (i === 1) push('result', getService('nfa-fingerprinting'))
                    else if (i === 2) push('result', getService('live-scan-fingerprinting'))
                    else if (i === 3) push('international')
                    else push('all')
                  }}
                  className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-accent-blue hover:bg-accent-blue/5 text-sm font-medium text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step: Format */}
      {state.step === 'format' && (
        <div>
          <h2 className="text-xl font-bold text-navy mb-6">{t('steps.format.question')}</h2>
          <ul className="space-y-3">
            {formatOptions.map((option, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    if (i === 0) push('result', getService('fbi-background-checks'))
                    else if (i === 1) push('result', getService('ink-fingerprinting'))
                    else push('result', getService('live-scan-fingerprinting'))
                  }}
                  className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-accent-blue hover:bg-accent-blue/5 text-sm font-medium text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step: International */}
      {state.step === 'international' && (
        <div>
          <h2 className="text-xl font-bold text-navy mb-6">{t('steps.international.question')}</h2>
          <ul className="space-y-3">
            {internationalOptions.map((option, i) => (
              <li key={i}>
                <button
                  onClick={() =>
                    push('result', getService(i === 0 ? 'fbi-apostille' : 'fbi-background-checks'))
                  }
                  className="w-full text-left px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-accent-blue hover:bg-accent-blue/5 text-sm font-medium text-navy transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Result */}
      {state.step === 'result' && state.result && (
        <div className="rounded-2xl border-2 border-accent-blue/40 bg-white p-6 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-blue mb-2">{t('results.recommended')}</p>
          <div className="flex items-center gap-3 mb-4">
            <ServiceIcon slug={state.result.slug} size={24} containerClass="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center flex-shrink-0" />
            <h2 className="text-2xl font-extrabold text-navy">{ts(`${state.result.slug}.name`)}</h2>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-5">{ts(`${state.result.slug}.shortDescription`)}</p>

          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-sm text-gray-500">{t('results.price')}:</span>
            <span className="text-3xl font-extrabold text-navy">{state.result.price}</span>
            {state.result.priceNote && (
              <span className="text-xs text-gray-500">{state.result.priceNote}</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/book`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              <CalendarDays size={18} aria-hidden="true" />
              {t('bookService')}
            </Link>
            <Link
              href={`/${locale}/services/${state.result.slug}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-navy text-navy font-semibold rounded-xl hover:bg-navy hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
            >
              {t('results.learnMore')}
            </Link>
          </div>
        </div>
      )}

      {/* All services */}
      {state.step === 'all' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-navy">{t('allServices.heading')}</h2>
            <p className="text-gray-600 text-sm mt-1">{t('allServices.subheading')}</p>
          </div>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-200 bg-white hover:border-accent-blue hover:bg-accent-blue/5 transition-colors"
                >
                  <ServiceIcon slug={s.slug} size={18} containerClass="w-9 h-9 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-navy">{ts(`${s.slug}.name`)}</p>
                    <p className="text-xs text-gray-500 truncate">{ts(`${s.slug}.shortDescription`)}</p>
                  </div>
                  <span className="ml-auto text-sm font-bold text-navy flex-shrink-0">{s.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
