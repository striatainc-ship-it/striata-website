import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { whatsappNumbers } from '../data/products'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
          to_email: 'info@striatalabs.co.za',
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#0A1628] min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: 'url(/assets/background overlay 2.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Get In <span className="text-[#00B4B4]">Touch</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Whether you have a question about our products, need help with an order or want to discuss bulk supply. We're here and we respond fast. Reach out on WhatsApp for the quickest response.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {/* Left — Contact Info & WhatsApp */}
          <div>
            {/* WhatsApp Buttons */}
            <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-7 mb-6">
              <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Chat to Us Directly
              </h2>
              <p className="text-white/50 text-sm mb-5">
                The fastest way to get a response. Tap below to open WhatsApp instantly.
              </p>
              <div className="space-y-3">
                {whatsappNumbers.map(({ number, display }) => (
                  <a
                    key={number}
                    href={`https://wa.me/${number.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366] border border-[#25D366]/20 hover:border-[#25D366] text-[#25D366] hover:text-white px-5 py-3.5 rounded-xl transition-all duration-200 font-semibold text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {WA_ICON}
                    Chat on WhatsApp: {display}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-white/30 text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Tap any number to open a WhatsApp chat directly
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-7 mb-6">
              <h2 className="text-white font-bold text-xl mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Contact Us
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00B4B4] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">Email</p>
                    <a href="mailto:info@striatalabs.co.za" className="text-white hover:text-[#00B4B4] transition-colors text-sm">
                      info@striatalabs.co.za
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00B4B4] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">Location</p>
                    <p className="text-white text-sm">Johannesburg, South Africa</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00B4B4] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-white/40 text-xs mb-1">Business Hours</p>
                    <p className="text-white text-sm">Mon – Fri: 08:00 – 18:00</p>
                    <p className="text-white text-sm">Saturday: 09:00 – 13:00</p>
                    <p className="text-white/40 text-sm">Sunday: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-7">
              <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Follow Us
              </h2>
              <p className="text-white/50 text-sm mb-5">Stay up to date with new products, research insights and STRIATA news.</p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com/striata.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-5 h-5 text-[#00B4B4]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @striata.za | Follow us on Instagram
                </a>
                <a
                  href="https://tiktok.com/@striata.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <svg className="w-5 h-5 text-[#00B4B4]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.88a8.28 8.28 0 004.84 1.55V7.01a4.85 4.85 0 01-1.07-.32z" />
                  </svg>
                  @striata.za | Follow us on TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-7">
            <h2 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Send Us a Message
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Prefer email? Fill in the form below and we'll get back to you within 1 business day.
            </p>

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Message Sent!</h3>
                <p className="text-white/60 text-sm">We'll get back to you within 1 business day.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-[#00B4B4] hover:text-white text-sm transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
                    placeholder="+27 ..."
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Subject *</label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
                  >
                    <option value="" className="text-white/30">Select a subject</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Product Question">Product Question</option>
                    <option value="Bulk & Business Order">Bulk &amp; Business Order</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Something Else">Something Else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try WhatsApp for the fastest response.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#00B4B4] hover:bg-[#009999] disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/20 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
                <p className="text-white/30 text-xs text-center">
                  Your message will be sent to info@striatalabs.co.za. We aim to respond within 1 business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
