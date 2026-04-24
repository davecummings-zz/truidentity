import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

interface BookPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${siteConfig.siteUrl}/${locale}/book` },
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'book' })

  const whatToBringItems: string[] = t.raw('whatToBring.items') as string[]

  const acuityUrl =
    siteConfig.acuityOwnerId !== 'OWNER_ID'
      ? `https://app.acuityscheduling.com/schedule.php?owner=${siteConfig.acuityOwnerId}`
      : null

  return (
    <div className="py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-navy mb-4">{t('heading')}</h1>
          <p className="text-xl text-gray-600">{t('subheading')}</p>
        </div>

        {/* No walk-ins notice */}
        <div className="mb-8 rounded-xl bg-accent-orange/10 border border-accent-orange/30 p-4 flex items-start gap-3" role="alert">
          <span className="text-accent-orange text-xl flex-shrink-0" aria-hidden="true">⚠</span>
          <p className="text-sm font-semibold text-accent-orange">{t('noWalkIns')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Scheduler embed */}
          <div className="lg:col-span-2">
            {acuityUrl ? (
              <iframe
                src={acuityUrl}
                title="Schedule an appointment"
                width="100%"
                height="700"
                loading="lazy"
                className="rounded-2xl border border-gray-200 w-full"
                style={{ minHeight: '700px' }}
              />
            ) : (
              // Placeholder shown until Acuity owner ID is configured
              <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center h-96 text-center px-6 gap-4">
                <span className="text-5xl" aria-hidden="true">📅</span>
                <div>
                  <p className="font-bold text-navy text-lg mb-1">Scheduling Embed Placeholder</p>
                  <p className="text-sm text-gray-500">
                    Replace <code className="bg-gray-200 px-1 rounded text-xs">OWNER_ID</code> in{' '}
                    <code className="bg-gray-200 px-1 rounded text-xs">config/site.ts</code> with your
                    Acuity Scheduling owner ID to activate the booking calendar.
                  </p>
                </div>
                <a
                  href="https://acuityscheduling.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-blue hover:underline"
                >
                  acuityscheduling.com →
                </a>
              </div>
            )}
          </div>

          {/* Sidebar: What to bring */}
          <aside>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card sticky top-24">
              <h2 className="text-lg font-bold text-navy mb-4">{t('whatToBring.heading')}</h2>
              <ul className="space-y-3">
                {whatToBringItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500">{t('questions')}{' '}
                  <Link href={`/${locale}/contact`} className="text-accent-blue font-semibold hover:underline">
                    {t('contactLink')}
                  </Link>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
