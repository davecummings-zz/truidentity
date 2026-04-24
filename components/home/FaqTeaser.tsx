import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

interface FaqTeaserProps {
  locale: string
}

export async function FaqTeaser({ locale }: FaqTeaserProps) {
  const t = await getTranslations({ locale, namespace: 'home.faqTeaser' })
  const tfaq = await getTranslations({ locale, namespace: 'faq' })

  // Show the first, sixth, and seventh FAQ items (0-based: 0, 5, 6)
  const teaserItems = [0, 5, 6].map((i) => ({
    question: tfaq(`items.${i}.question`),
    answer: tfaq(`items.${i}.answer`),
  }))

  return (
    <section className="py-16 lg:py-24 bg-white" aria-labelledby="faq-teaser-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="faq-teaser-heading" className="text-3xl lg:text-4xl font-extrabold text-navy mb-4">
            {t('heading')}
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          {teaserItems.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 bg-white open:border-accent-blue/40"
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-sm font-semibold text-navy hover:text-accent-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-blue rounded-xl">
                <span>{item.question}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-accent-blue transition-transform group-open:rotate-180"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/faq`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy font-semibold rounded-xl hover:bg-navy hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
