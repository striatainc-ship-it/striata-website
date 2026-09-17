import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { tools } from '../data/toolsData'
import { guides } from '../data/guidesData'
import { whatsappLink } from '../data/products'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ARROW = (
  <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const CALC_ICON = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2" />
  </svg>
)

const QUIZ_ICON = (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
)

const ICONS = { calculator: CALC_ICON, quiz: QUIZ_ICON }

const CHECK = (
  <svg className="w-4 h-4 text-[#00B4B4] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function ToolCard({ tool }) {
  return (
    <Link
      to={tool.href}
      className="group relative bg-[#0d1e35] border border-white/8 rounded-2xl p-8 md:p-10 hover:border-[#00B4B4]/40 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-xl hover:shadow-[#00B4B4]/10 hover:-translate-y-1 overflow-hidden block"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B4B4]/5 rounded-full translate-x-32 -translate-y-32 pointer-events-none" />
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <span className="w-12 h-12 rounded-xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] group-hover:bg-[#00B4B4]/20 transition-colors mb-6">
            {ICONS[tool.icon] ?? CALC_ICON}
          </span>
          <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
            {tool.tagline}
          </span>
          <h2
            className="text-white font-black text-2xl md:text-3xl leading-tight mt-2 mb-4 group-hover:text-[#00B4B4] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {tool.title}
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-xl mb-6">{tool.preview}</p>
          <span className="btn btn-primary btn-md">
            {tool.cta}
            {ARROW}
          </span>
        </div>
        <ul className="space-y-3 md:pt-2 md:min-w-[17rem]">
          {tool.highlights.map(h => (
            <li key={h} className="flex items-start gap-2.5 text-white/65 text-sm leading-snug">
              {CHECK}
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  )
}

export default function Tools() {
  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Free Peptide Tools & Calculators | STRIATA</title>
        <meta name="description" content="Free calculators and tools for handling peptides properly: work out reconstitution concentration and the exact syringe units for any dose." />
        <link rel="canonical" href="https://www.striatalabs.co.za/tools" />
        <meta property="og:title" content="Free Peptide Tools & Calculators | STRIATA" />
        <meta property="og:description" content="Free calculators and tools for handling peptides properly." />
        <meta property="og:url" content="https://www.striatalabs.co.za/tools" />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Peptide Tools',
        url: 'https://www.striatalabs.co.za/tools',
        hasPart: tools.map(t => ({
          '@type': 'SoftwareApplication',
          name: t.title,
          url: `https://www.striatalabs.co.za/tools/${t.slug}`,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'ZAR' },
        })),
      }} />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <Reveal stagger delay={0.1} className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            Free to use
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            STRIATA <span className="text-[#00B4B4]">Tools</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Calculators built for the two minutes that matter most: water in the vial, needle in the syringe. Everything runs in your browser and nothing is stored.
          </p>
        </Reveal>
      </section>

      {/* ── TOOLS ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">
          {tools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Read alongside
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guides.map(g => (
              <Link
                key={g.slug}
                to={`/guides/${g.slug}`}
                className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                <p
                  className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-[#00B4B4] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {g.title}
                </p>
                <span className="text-white/30 text-xs">{g.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/10 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Want a Tool <span className="text-[#00B4B4]">We Don’t Have Yet?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Tell us what would make your protocol easier to run and we will look at building it.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            {WA_ICON}
            Chat to Us on WhatsApp
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
