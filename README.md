# TruIdentity Screening Solutions — Website

Custom Next.js website for [TruIdentity Screening Solutions](https://truidentity956.com), a professional fingerprinting and background check service in McAllen, Texas. Replaces the existing WordPress site.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Internationalization | next-intl (English + Spanish) |
| Deployment | Vercel |

---

## Getting Started

```bash
git clone https://github.com/davecummings-zz/truidentity.git
cd truidentity
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev                         # http://localhost:3000
```

All routes are served under `/en/` or `/es/`. The middleware automatically redirects bare `/` to `/en/`.

### Available Scripts

```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run type-check   # TypeScript type checking
npm run lint         # ESLint
```

---

## How to Update Contact Information

All contact details live in a single file — **`config/site.ts`**. Edit that file and every page, component, and JSON-LD schema updates automatically. Never hardcode contact information anywhere else.

```ts
// config/site.ts
export const siteConfig = {
  phone: '(956) 000-0000',          // ← real phone number
  email: 'info@truidentity956.com',
  address: {
    street: '123 Placeholder St',   // ← real street address
    city: 'McAllen',
    state: 'TX',
    zip: '78501',
    full: '123 Placeholder St, McAllen, TX 78501',
  },
  hours: 'Mon–Fri: 9am–5pm, Sat: 10am–2pm',
  hoursStructured: [
    { days: 'Monday–Friday', hours: '9:00 AM – 5:00 PM' },
    { days: 'Saturday', hours: '10:00 AM – 2:00 PM' },
    { days: 'Sunday', hours: 'Closed' },
  ],
}
```

---

## How to Connect Acuity Scheduling

1. Log in to [Acuity Scheduling](https://acuityscheduling.com).
2. Your **Owner ID** appears in your scheduling page URL:
   `https://app.acuityscheduling.com/schedule.php?owner=YOUR_ID`
3. Open `config/site.ts` and set:

```ts
acuityOwnerId: '12345678',
```

The booking embed on `/book` will activate automatically.

---

## How to Connect Google Maps

1. Go to [maps.google.com](https://maps.google.com) and search for the business address.
2. Click **Share → Embed a map** and copy the `src` URL from the `<iframe>` tag.
3. Open `config/site.ts` and set:

```ts
googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=...',
```

The map on the Contact page activates automatically.

---

## How to Connect the Contact Form

The contact form (`components/contact/ContactForm.tsx`) submits a POST request to a configurable endpoint. [Formspree](https://formspree.io) is recommended.

1. Create a Formspree account, create a form, and copy your endpoint URL (e.g. `https://formspree.io/f/xabc1234`).
2. Open `.env.local` and set:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xabc1234
```

3. Set the same variable in Vercel's environment variables for production.

---

## How to Add or Edit Translations

All user-facing strings are in two files:

- `locales/en.json` — English
- `locales/es.json` — Spanish (Mexican-American RGV register)

Both files must have identical key structures. When adding a new key, add it to both.

**In server components:**
```ts
const t = await getTranslations({ locale, namespace: 'namespaceName' })
t('keyName')
```

**In client components (`'use client'`):**
```ts
const t = useTranslations('namespaceName')
t('keyName')
```

**To add a FAQ item:**
1. Append to `faq.items` in both `locales/en.json` and `locales/es.json`:
   ```json
   { "question": "Your question?", "answer": "Your answer." }
   ```
2. Increment `faqItemCount` in `config/faq.ts` to match the new total.

---

## How to Add a New Service Page

Service pages are dynamically generated from `config/services.ts`. No new files are needed — just add an entry to the array.

1. Add a new object to the `services` array in `config/services.ts`:

```ts
{
  slug: 'new-service-slug',
  name: 'Service Name',
  shortDescription: 'One sentence — used for meta description and service cards.',
  price: '$XX',
  emoji: '🔑',
  trustLine: 'Short trust statement shown on the service detail page.',
  whatItIs: 'Paragraph explaining what the service is and who authorizes it.',
  whoNeeds: ['Group or role 1', 'Group or role 2'],
  whatToBring: ['Required item 1', 'Required item 2'],
  whatToExpect: 'Paragraph describing the appointment experience and turnaround.',
  relatedSlugs: ['other-service-slug'],
}
```

2. Pages at `/en/services/new-service-slug` and `/es/services/new-service-slug` are created automatically.
3. The service is automatically added to the services listing page, sitemap, price estimator, and service finder wizard.

---

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, and import the repository.
3. Vercel auto-detects Next.js — no build settings needed.
4. Under **Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree endpoint URL |

5. Click **Deploy**.
6. Connect your custom domain under **Project Settings → Domains**.
7. After the domain is live, update `siteConfig.siteUrl` in `config/site.ts` so canonical URLs and the sitemap are correct.

---

## Environment Variables Reference

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_FORM_ENDPOINT` | Contact form POST endpoint (Formspree or similar) | Yes (for contact form) |

Copy `.env.local.example` to `.env.local` for local development. Never commit `.env.local` — it is gitignored.

---

## Replacing Placeholder Content

| Placeholder | Location | What to Do |
|---|---|---|
| Phone / address | `config/site.ts` | Update with real values |
| Acuity Owner ID | `config/site.ts` | Set `acuityOwnerId` |
| Google Maps URL | `config/site.ts` | Set `googleMapsEmbedUrl` |
| Logo SVG | `components/ui/TruidentityLogo.tsx` | Replace with final logo |
| Team / office photo | `app/[locale]/about/page.tsx` | Replace the dashed placeholder `<div>` with `<Image>` |
| OG image | `public/og-image.png` | Add a 1200×630 px image for social sharing |
| Google Reviews | `components/home/ReviewsSection.tsx` | Replace `PLACEHOLDER_REVIEWS` with real review data |
| `[YEAR FOUNDED]` | `locales/en.json`, `locales/es.json` | Replace with actual founding year |
| `[FOUNDER NAME]` | `locales/en.json`, `locales/es.json` | Replace with actual founder name |
