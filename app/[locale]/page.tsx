import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeroSection } from '@/components/home/HeroSection'
import { NoWalkInsBanner } from '@/components/ui/NoWalkInsBanner'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { PricingSection } from '@/components/home/PricingSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ReviewsSection } from '@/components/home/ReviewsSection'
import { FaqTeaser } from '@/components/home/FaqTeaser'
import { BottomCTA } from '@/components/home/BottomCTA'
import { siteConfig } from '@/config/site'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: {
      absolute: `TruIdentity | McAllen Fingerprinting & Background Checks`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: `${siteConfig.siteUrl}/${locale}`,
      languages: { en: `${siteConfig.siteUrl}/en`, es: `${siteConfig.siteUrl}/es` },
    },
    openGraph: {
      url: `${siteConfig.siteUrl}/${locale}`,
      title: `${siteConfig.name} — Professional Fingerprinting in South Texas`,
      description: siteConfig.description,
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <HeroSection locale={locale} />
      <NoWalkInsBanner locale={locale} />
      <ServicesGrid locale={locale} />
      <PricingSection locale={locale} />
      <HowItWorks locale={locale} />
      <ReviewsSection locale={locale} />
      <FaqTeaser locale={locale} />
      <BottomCTA locale={locale} />
    </>
  )
}
