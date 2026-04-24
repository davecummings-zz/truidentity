# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Custom Next.js 14 website for **TruIdentity Screening Solutions** — a fingerprinting and background check service in McAllen, South Texas (truidentity956.com). Replaces their existing WordPress site.

**Business context:** Appointment-only service. Services: FBI Background Checks, Live Scan, Ink Fingerprinting, NFA Fingerprinting, ATF eFile, FBI Apostille, Mobile Fingerprinting. Pricing: $49–$220.

## Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run type-check   # TypeScript check (tsc --noEmit)
npm run lint         # ESLint
```

All routes are under `/en/` or `/es/` — middleware auto-redirects bare `/` to `/en/`.

## Architecture

### Routing
- **`app/[locale]/`** — all pages live here; `locale` is `en` or `es`
- `middleware.ts` intercepts every request and injects the locale prefix
- `app/layout.tsx` is a minimal passthrough; all HTML/body rendering is in `app/[locale]/layout.tsx`

### i18n (next-intl)
- Server components: `getTranslations({ locale, namespace: '...' })` from `next-intl/server`
- Client components: `useTranslations('namespace')` hook
- Translation files: `locales/en.json` / `locales/es.json` — add keys to both files
- Language toggle sets `NEXT_LOCALE` cookie and navigates to same path with new locale prefix

### Single Source of Truth
- **`config/site.ts`** — all contact info, hours, Acuity owner ID, Maps embed URL. Never hardcode these elsewhere.
- **`config/services.ts`** — all service data (slug, name, price, descriptions, what-to-bring, related)
- `lib/schemas.ts` — JSON-LD schema builder functions (`localBusinessSchema`, `serviceSchema`, `faqPageSchema`)

### Component Patterns
- Server components by default (no `'use client'`)
- Client components that need state: `MobileMenu`, `LanguageToggle`, `ServiceFinder`, `Accordion`, `PriceEstimator`, `ContactForm`
- Layout components (`Header`, `Footer`) are server components receiving `locale: string` as a prop

### SEO
- Every page exports `generateMetadata()` with unique title, description, canonical, and OG tags
- `JsonLd` component injects `<script type="application/ld+json">` — `localBusinessSchema` is in the locale layout (all pages), service schema is per service page, FAQPage schema is on /faq
- `app/sitemap.ts` auto-generates all locale × page combinations
- `app/robots.ts` serves robots.txt

### Brand Colors (Tailwind)
- `navy` / `navy-DEFAULT` = `#1B3A5C` (primary)
- `accent-blue` = `#2E75B6`
- `accent-orange` = `#E8943A` (CTAs, alerts)

## Placeholder Integration Points

| Feature | Config key | File |
|---|---|---|
| Acuity booking embed | `acuityOwnerId` | `config/site.ts` |
| Google Maps embed | `googleMapsEmbedUrl` | `config/site.ts` |
| Contact form endpoint | `NEXT_PUBLIC_FORM_ENDPOINT` | `.env.local` |
| Google Reviews | `PLACEHOLDER_REVIEWS` array | `components/home/ReviewsSection.tsx` |
| Logo SVG | — | `components/ui/TruidentityLogo.tsx` |

## Service Pages

Dynamic route: `app/[locale]/services/[slug]/page.tsx` with `generateStaticParams` covering all 7 service slugs × 2 locales. Add a new service by adding an entry to `config/services.ts` — pages and sitemap generate automatically.

## Adding FAQ Items

1. Append to `faq.items` array in both `locales/en.json` and `locales/es.json`
2. Increment `faqItemCount` in `config/faq.ts`
