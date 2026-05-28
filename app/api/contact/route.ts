import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  const { name, email, phone, service, message, website } = await req.json()

  // Silently discard bot submissions
  if (website) {
    return NextResponse.json({ ok: true })
  }

  // Validate required fields
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('RESEND_API_KEY is not set — email not sent in development.')
      return NextResponse.json({ ok: true })
    }
    throw new Error('RESEND_API_KEY environment variable is not set.')
  }

  const resend = new Resend(apiKey)

  const html = `
    <table style="font-family:sans-serif;font-size:14px;color:#1B3A5C;border-collapse:collapse;width:100%;max-width:560px">
      <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><strong>Name</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e5e7eb">${name}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><strong>Email</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e5e7eb"><a href="mailto:${email}">${email}</a></td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><strong>Phone</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e5e7eb">${phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><strong>Service</strong></td><td style="padding:8px 0 8px 16px;border-bottom:1px solid #e5e7eb">${service || '—'}</td></tr>
      <tr><td style="padding:8px 0;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0 8px 16px;white-space:pre-wrap">${message}</td></tr>
    </table>
  `

  try {
    await resend.emails.send({
      from: 'TruIdentity Website <noreply@truidentity956.com>',
      to: 'bill@truidentity956.com',
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
