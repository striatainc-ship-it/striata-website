import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { whatsappLink } from '../data/products'
import { nasalSprays } from '../data/nasalSpraysData'
import ProductCard from '../components/ProductCard'
import JsonLd from '../components/JsonLd'
import Reveal from '../components/Reveal'
import { useStaggerGrid, spotlightProps } from '../lib/motion'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const BENEFITS = [
  {
    title: 'No Reconstitution',
    desc: 'Each spray arrives ready to use. No bacteriostatic water, no mixing, no concentration maths.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Needle-Free',
    desc: 'Intranasal delivery, the route much of the published research on these peptides actually uses.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    title: '10ml Amber Bottle',
    desc: 'Light-protective amber glass in a pocket-sized bottle. Discreet to store and carry.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
]

const fmt = (price) => `R ${price.toLocaleString('en-ZA')}`

export default function NasalSprays() {
  const gridRef = useRef(null)
  useStaggerGrid(gridRef, [])

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Peptide Nasal Sprays South Africa | STRIATA</title>
        <meta name="description" content={`${nasalSprays.length} research peptides in 10ml nasal sprays: Semax, Selank, Oxytocin, DSIP, PT-141, NAD+, VIP and Adamax. No reconstitution. Delivered across South Africa.`} />
        <link rel="canonical" href="https://www.striatalabs.co.za/nasal-sprays" />
        <meta property="og:title" content="Peptide Nasal Sprays South Africa | STRIATA" />
        <meta property="og:description" content="Research-grade peptides in 10ml amber nasal sprays. No reconstitution, no needles. Delivered nationwide." />
        <meta property="og:url" content="https://www.striatalabs.co.za/nasal-sprays" />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: nasalSprays.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: `${s.name} Nasal Spray`,
            description: s.description,
            category: s.positioning,
            brand: { '@type': 'Brand', name: 'STRIATA' },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'ZAR',
              price: s.prices[0].price,
              availability: 'https://schema.org/InStock',
              url: `https://www.striatalabs.co.za/nasal-sprays#${s.anchor}`,
            },
          },
        })),
      }} />

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 80% 40%, #00B4B4 0%, transparent 50%), radial-gradient(circle at 15% 30%, #00B4B4 0%, transparent 35%)' }}
        />
        <Reveal stagger delay={0.1} className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-300 text-xs font-semibold uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            All Nasal Sprays In Stock
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Peptide <span className="text-[#00B4B4]">Nasal Sprays</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-3">
            Eight research peptides in a ready-to-use 10ml amber nasal spray. No reconstitution, no syringes.
          </p>
          <p className="text-white/35 text-sm">
            {nasalSprays.length} sprays · VAT inclusive · Research Purposes Only
          </p>
        </Reveal>
      </section>

      {/* Why sprays */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8 relative z-10">
        <Reveal stagger delay={0.3} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {BENEFITS.map(({ title, desc, icon }) => (
            <div
              key={title}
              {...spotlightProps()}
              className="spot flex gap-3.5 px-5 py-4 rounded-2xl border border-white/8 bg-[#0d1e35] hover:border-[#00B4B4]/30 transition-colors duration-300"
            >
              <span className="w-9 h-9 rounded-xl bg-[#00B4B4]/10 text-[#00B4B4] flex items-center justify-center flex-shrink-0">
                {icon}
              </span>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>{title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Range */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-6 md:py-12">
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {nasalSprays.map((spray) => (
            <ProductCard key={spray.id} product={spray} />
          ))}
        </div>
      </section>

      {/* Write-ups */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16">
        <Reveal className="mb-8">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            The <span className="text-[#00B4B4]">Research</span> Behind the Range
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            What each compound is and what it has been studied for. Every write-up describes published research, not a promised outcome.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {nasalSprays.map((spray) => (
            <article
              key={spray.id}
              id={spray.anchor}
              className="scroll-mt-28 rounded-2xl border border-white/8 bg-[#0d1e35] p-5 md:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                <h3 className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  {spray.name} Nasal Spray
                </h3>
                <span className="text-white font-bold tabular-nums">{fmt(spray.prices[0].price)}</span>
              </div>
              <p className="text-xs md:text-sm mb-4">
                <span className="text-[#00B4B4] font-semibold">{spray.positioning}</span>
                <span className="text-white/35"> · {spray.prices[0].dose} per bottle</span>
              </p>
              <div className="flex flex-col gap-3 text-white/60 text-sm leading-relaxed">
                {spray.writeup.map((para) => <p key={para.slice(0, 32)}>{para}</p>)}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
                <a
                  href={`${whatsappLink}?text=${encodeURIComponent(`Hi STRIATA, I'd like to order *${spray.name} (Nasal Spray)* — ${spray.prices[0].dose} @ ${fmt(spray.prices[0].price)}. Please send me payment details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Order on WhatsApp
                </a>
                {spray.compoundPath && (
                  <Link to={spray.compoundPath} className="text-white/45 hover:text-[#00B4B4] text-xs font-semibold transition-colors">
                    More on {spray.name} →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-white/35 text-xs text-center">
          Prices in ZAR, VAT inclusive. For Research Use Only — not for human consumption.
        </p>
      </section>

      {/* Other formats cross-link */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {[
          { to: '/catalogue', title: 'Prefer vials?', desc: 'Every spray compound is also available as a lyophilised vial in the full catalogue.' },
          { to: '/pens', title: 'Prefer a pen?', desc: 'Most of these compounds also come in a pre-filled, dial-in dosing pen.' },
        ].map(({ to, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-white/8 bg-[#0d1e35] hover:border-[#00B4B4]/35 hover:bg-[#0f2340] transition-all duration-200 group"
          >
            <div>
              <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{title}</p>
              <p className="text-white/50 text-xs">{desc}</p>
            </div>
            <svg className="w-4 h-4 text-[#00B4B4] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/8">
        <Reveal stagger className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Questions About <span className="text-[#00B4B4]">the Sprays?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Message us to order, or to ask which spray fits the research you're doing.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            {WA_ICON}
            Chat to Us on WhatsApp
          </a>
          <p className="mt-4 text-white/50 text-sm flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Typically responds within 1 hour during business hours
          </p>
        </Reveal>
      </section>
    </div>
  )
}
