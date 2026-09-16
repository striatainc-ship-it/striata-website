import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { LEAD_CAPTURE, answerLabel } from '../data/quizConfig'
import { whatsappLink } from '../data/products'
import { trackEvent } from '../lib/analytics'
import { NOTES_STORAGE_KEY } from './QuizFlow'

/*
 * Optional "email me this result" capture on the result page. Never a gate.
 *
 * Delivery: POST to the n8n webhook in VITE_QUIZ_WEBHOOK_URL when it is set
 * (n8n fans out to email / CRM / WhatsApp from there). Without it, fall back
 * to the EmailJS account the contact form already uses, so the lead still
 * lands in the inbox today.
 */

const WEBHOOK_URL = import.meta.env.VITE_QUIZ_WEBHOOK_URL
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const H = { fontFamily: 'var(--font-heading)' }

const readNotes = () => {
  try { return sessionStorage.getItem(NOTES_STORAGE_KEY) || '' } catch { return '' }
}

async function deliver(payload) {
  if (WEBHOOK_URL) {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`Webhook ${res.status}`)
    return
  }
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('No lead destination configured')
  }
  const lines = [
    `Quiz result: ${payload.matched_protocol.name}`,
    `Result page: ${payload.matched_protocol.url}`,
    '',
    'Answers:',
    ...Object.entries(payload.answers).map(([k, v]) => `  ${k}: ${v}`),
    payload.notes ? `\nNotes: ${payload.notes}` : '',
    `\nSubmitted: ${payload.timestamp}`,
  ]
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: 'Protocol quiz lead',
      from_email: payload.email,
      phone: '',
      subject: `Quiz result: ${payload.matched_protocol.name}`,
      message: lines.join('\n'),
      to_email: 'info@striatalabs.co.za',
    },
    EMAILJS_PUBLIC_KEY,
  )
}

export default function QuizLeadForm({ protocol, answers, resultUrl }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const labelled = Object.fromEntries(
      Object.entries(answers).map(([k, v]) => [k, answerLabel(k, v)]),
    )
    const payload = {
      source: 'protocol-quiz',
      email: email.trim(),
      answers: labelled,
      notes: readNotes(),
      matched_protocol: { slug: protocol.slug, name: protocol.name, url: resultUrl },
      timestamp: new Date().toISOString(),
      page: typeof window !== 'undefined' ? window.location.href : resultUrl,
    }
    try {
      await deliver(payload)
      trackEvent('quiz_lead', { result: protocol.slug })
      setStatus('success')
      try { sessionStorage.removeItem(NOTES_STORAGE_KEY) } catch { /* ignore */ }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
      <p className="text-white font-bold text-base mb-1" style={H}>{LEAD_CAPTURE.title}</p>
      <p className="text-white/50 text-sm leading-relaxed mb-4">{LEAD_CAPTURE.body}</p>

      {status === 'success' ? (
        <p role="status" className="flex items-start gap-2.5 rounded-xl border border-[#00B4B4]/30 bg-[#00B4B4]/10 px-4 py-3 text-sm text-white/85">
          <svg className="w-4 h-4 mt-0.5 text-[#00B4B4] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
          {LEAD_CAPTURE.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="quiz-lead-email" className="sr-only">Email address</label>
          <input
            id="quiz-lead-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={LEAD_CAPTURE.placeholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-base focus:outline-none focus:border-[#00B4B4]/60 transition-colors"
          />
          <button type="submit" disabled={status === 'sending'} className="btn btn-primary btn-md w-full disabled:opacity-60">
            {status === 'sending' ? LEAD_CAPTURE.sending : LEAD_CAPTURE.button}
          </button>
          {status === 'error' && (
            <p role="alert" className="text-amber-100 text-sm leading-relaxed">
              {LEAD_CAPTURE.error}{' '}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-[#00B4B4] underline underline-offset-2">Open WhatsApp</a>
            </p>
          )}
          <p className="text-white/30 text-xs leading-relaxed">{LEAD_CAPTURE.consent}</p>
        </form>
      )}
    </div>
  )
}
