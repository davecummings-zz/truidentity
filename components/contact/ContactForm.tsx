'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { services } from '@/config/services'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact.form')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = t('required')
    if (!form.email.trim()) e.email = t('required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('invalidEmail')
    if (!form.message.trim()) e.message = t('required')
    return e
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => { const n = { ...er }; delete n[name]; return n })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setStatus('sending')
    try {
      // Replace with your Formspree endpoint or other form handler
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? ''
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Failed')
      } else {
        // No endpoint configured — simulate success for development
        await new Promise((r) => setTimeout(r, 800))
      }
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <p className="font-semibold text-green-800">{t('success')}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('name')} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name" required
          placeholder={t('namePlaceholder')} value={form.name} onChange={handleChange}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:opacity-50"
          disabled={status === 'sending'}
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600" role="alert">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('email')} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id="email" name="email" type="email" autoComplete="email" required
            placeholder={t('emailPlaceholder')} value={form.email} onChange={handleChange}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:opacity-50"
            disabled={status === 'sending'}
          />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
            {t('phone')}
          </label>
          <input
            id="phone" name="phone" type="tel" autoComplete="tel"
            placeholder={t('phonePlaceholder')} value={form.phone} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:opacity-50"
            disabled={status === 'sending'}
          />
        </div>
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('service')}
        </label>
        <select
          id="service" name="service"
          value={form.service} onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:opacity-50"
          disabled={status === 'sending'}
        >
          <option value="">{t('servicePlaceholder')}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t('message')} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message" name="message" rows={4} required
          placeholder={t('messagePlaceholder')} value={form.message} onChange={handleChange}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent resize-none disabled:opacity-50"
          disabled={status === 'sending'}
        />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600" role="alert">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">{t('error')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-navy text-white font-bold rounded-xl hover:bg-navy-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </button>
    </form>
  )
}
