import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { guides } from '../data/guidesData'
import { whatsappLink } from '../data/products'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ARROW = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const GUIDE_ICON = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
)

function GuideCard({ guide }) {
  return (
    <Link
      to={`/guides/${guide.slug}`}
      className="group relative bg-[#0d1e35] border border-white/8 rounded-2xl p-8 hover:border-[#00B4B4]/40 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-xl hover:shadow-[#00B4B4]/10 hover:-translate-y-1 flex flex-col overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4B4]/5 rounded-full translate-x-24 -translate-y-24 pointer-events-none" />
      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-5">
          <span className="w-11 h-11 rounded-xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] group-hover:bg-[#00B4B4]/20 transition-colors">
            {GUIDE_ICON}
          </span>
          <span className="text-white/30 text-xs">{guide.readTime}</span>
        </div>
        <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {guide.category}
        </span>
        <h3
          className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#00B4B4] transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {guide.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
          {guide.preview}
        </p>
        <div className="flex items-center gap-1 text-[#00B4B4] text-sm font-semibold mt-auto">
          Read Guide
          {ARROW}
        </div>
      </div>
    </Link>
  )
}

export default function Guides() {
  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Peptide Guides | STRIATA</title>
        <meta name="description" content="Practical, step-by-step peptide guides — reconstitution and dosage calculation, and the bloodwork to run before, during and after a protocol." />
        <link rel="canonical" href="https://striatalabs.co.za/guides" />
        <meta property="og:title" content="Peptide Guides | STRIATA" />
        <meta property="og:description" content="Practical, step-by-step peptide guides — reconstitution, dosing and bloodwork monitoring." />
        <meta property="og:url" content="https://striatalabs.co.za/guides" />
      </Helmet>

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            Practical Guides
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            STRIATA <span className="text-[#00B4B4]">Guides</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Step-by-step, reference-grade guides for handling peptides properly — from the vial to the bloodwork. Written to be printed, followed and trusted.
          </p>
        </div>
      </section>

      {/* ── GUIDE GRID ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(guide => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/10 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Need a Hand <span className="text-[#00B4B4]">Getting Started?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Chat to us on WhatsApp — we'll help you reconstitute, dose and monitor correctly for your goals.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {WA_ICON}
            Chat to Us on WhatsApp →
          </a>
          <p className="mt-4 text-white/30 text-sm flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Typically responds within 1 hour during business hours
          </p>
        </div>
      </section>
    </div>
  )
}
