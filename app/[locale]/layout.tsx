import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site'
import { JsonLd } from '@/components/seo/JsonLd'
import { localBusinessSchema } from '@/lib/schemas'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const locales = ['en', 'es']

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: process.env.VERCEL_ENV === 'production'
    ? 'index, follow'
    : 'noindex, nofollow',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    images: [{
      url: `${siteConfig.siteUrl}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'TruIdentity Screening Solutions — McAllen, TX',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()
  const tc = await getTranslations({ locale, namespace: 'common' })

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-white">
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_2
                  ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID_2}');`
                  : ''}
              `}
            </Script>
          </>
        )}
        <JsonLd data={localBusinessSchema()} />
        <a href="#main-content" className="skip-link">{tc('skipToContent')}</a>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
