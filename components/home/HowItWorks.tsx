import { getTranslations } from 'next-intl/server'

interface HowItWorksProps {
  locale: string
}

const stepIcons = [
  // Choose service
  <svg key="1" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
  // Book online
  <svg key="2" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  // Come prepared
  <svg key="3" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
]

export async function HowItWorks({ locale }: HowItWorksProps) {
  const t = await getTranslations({ locale, namespace: 'home.howItWorks' })

  const steps = [
    { key: 'step1', title: t('step1.title'), description: t('step1.description') },
    { key: 'step2', title: t('step2.title'), description: t('step2.description') },
    { key: 'step3', title: t('step3.title'), description: t('step3.description') },
  ]

  return (
    <section className="py-16 lg:py-24 bg-navy" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 id="how-it-works-heading" className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
            {t('heading')}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">{t('subheading')}</p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-white/20" aria-hidden="true" />

          {steps.map((step, i) => (
            <li key={step.key} className="flex flex-col items-center text-center">
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  {stepIcons[i]}
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-orange text-white text-xs font-bold flex items-center justify-center" aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
