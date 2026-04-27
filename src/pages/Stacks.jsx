import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { STACKS, UNIVERSAL_CONTRAINDICATIONS, CATEGORY_META, waLink } from '../data/stacksData'

// ─── Tier colour system ──────────────────────────────────────────────────────
// Entry = blue (accessible, introductory)
// Mid   = amber (enhanced, intermediate)
// Premium = emerald (elite, best-in-class)
const TIER_STYLES = {
  Entry: {
    bg:       'rgba(59,130,246,0.10)',
    label:    '#93C5FD',
    price:    '#93C5FD',
    text:     'rgba(255,255,255,0.65)',
  },
  Mid: {
    bg:       'rgba(245,158,11,0.10)',
    label:    '#FCD34D',
    price:    '#FCD34D',
    text:     'rgba(255,255,255,0.65)',
  },
  Premium: {
    bg:       '#0B3D2B',
    label:    '#34D399',
    price:    '#34D399',
    text:     'rgba(255,255,255,0.80)',
  },
}

// ─── Filter definitions with icons ──────────────────────────────────────────
const FILTERS = [
  {
    id: 'all',
    label: 'All Stacks',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'gym',
    label: 'Gym / Fitness',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
  {
    id: 'weightloss',
    label: 'Weight Loss',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/>
      </svg>
    ),
  },
  {
    id: 'antiaging',
    label: 'Anti-Aging',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M5 19l.75 2.25L8 22l-2.25.75L5 25l-.75-2.25L2 22l2.25-.75L5 19z" opacity=".5"/>
      </svg>
    ),
  },
  {
    id: 'wellness',
    label: 'General Wellness',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
]

// ─── SVG helpers ─────────────────────────────────────────────────────────────
const WA_SVG = (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const WARN_SVG = (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const ChevronSvg = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ─── SafetyBadge ─────────────────────────────────────────────────────────────
function SafetyBadge({ safety }) {
  const SHIELD = (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
  if (safety === 'SAFE') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
        {SHIELD} Safe
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/25 whitespace-nowrap">
      {WARN_SVG} Caution
    </span>
  )
}

// ─── Tier legend strip ────────────────────────────────────────────────────────
function TierLegend() {
  return (
    <div className="flex items-center gap-4 mt-4 justify-center flex-wrap">
      {Object.entries(TIER_STYLES).map(([label, styles]) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: styles.price }} />
          <span className="text-white/40 text-xs">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── StackCard ────────────────────────────────────────────────────────────────
function StackCard({ stack }) {
  const meta = CATEGORY_META[stack.category]
  const PHASE_SVG = (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )

  return (
    <article
      className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1e35] flex flex-col hover:border-white/15 transition-colors duration-200"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
              style={{ backgroundColor: meta.color, color: '#0A1628' }}
            >
              {String(stack.num).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h2 className="text-base font-black text-white leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {stack.name}
              </h2>
              <p className="text-white/50 text-xs mt-0.5 italic">{stack.tagline}</p>
            </div>
          </div>
          <SafetyBadge safety={stack.safety} />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: meta.lightColor, color: meta.color, border: `1px solid ${meta.border}` }}
          >
            {meta.label}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/8">
            {PHASE_SVG}
            {stack.phase}
          </span>
        </div>
      </div>

      {/* ── Rationale ── */}
      <div
        className="px-5 py-4 border-b border-white/8"
        style={{ backgroundColor: meta.lightColor, borderLeft: `3px solid ${meta.color}` }}
      >
        <p className="text-white/70 text-sm leading-relaxed">{stack.rationale}</p>
      </div>

      {/* ── Pricing table ── */}
      <div className="border-b border-white/8">
        <div className="grid grid-cols-[1fr_2.5fr_1fr] bg-[#0A1628] px-4 py-2.5">
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest">Tier</span>
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest">Includes</span>
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest text-right">Price</span>
        </div>

        {stack.tiers.map((tier) => {
          const ts = TIER_STYLES[tier.label]
          return (
            <div
              key={tier.label}
              className="grid grid-cols-[1fr_2.5fr_1fr] px-4 py-3 border-t border-white/5"
              style={{ backgroundColor: ts.bg }}
            >
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: ts.label }}>
                {tier.label}
              </span>
              <span className="text-xs leading-snug pr-2" style={{ color: ts.text }}>
                {tier.products}
              </span>
              <span className="text-xs font-mono font-bold text-right" style={{ color: ts.price }}>
                {tier.price}
              </span>
            </div>
          )
        })}
      </div>

      {/* ── Safety note ── */}
      <div
        className="px-5 py-4 border-b border-white/8"
        style={
          stack.safety === 'SAFE'
            ? { backgroundColor: 'rgba(16,185,129,0.06)', borderLeft: '3px solid rgba(16,185,129,0.4)' }
            : { backgroundColor: 'rgba(245,158,11,0.06)', borderLeft: '3px solid rgba(245,158,11,0.4)' }
        }
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: stack.safety === 'SAFE' ? '#34D399' : '#FCD34D' }}>
          Safety Note
        </p>
        <p className="text-white/60 text-sm leading-relaxed">{stack.safetyNote}</p>
      </div>

      {/* ── Advisory (CAUTION only) ── */}
      {stack.advisory && (
        <div className="px-5 py-4 border-b border-white/8" style={{ backgroundColor: 'rgba(239,68,68,0.05)', borderLeft: '3px solid rgba(239,68,68,0.35)' }}>
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1.5">Usage Advisory</p>
          <p className="text-white/60 text-sm leading-relaxed">{stack.advisory}</p>
        </div>
      )}

      {/* ── Contraindications ── */}
      <div className="border-b border-white/8">
        <div className="px-5 py-2.5 bg-[#0A1628]">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35">Contraindications — Do Not Use If:</p>
        </div>
        {stack.contraindications.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-5 py-3 border-t border-white/5"
            style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-amber-400 flex-shrink-0 mt-0.5">{WARN_SVG}</span>
            <p className="text-white/55 text-sm leading-snug">{item}</p>
          </div>
        ))}
      </div>

      {/* ── WhatsApp CTA ── */}
      <div className="p-4 mt-auto">
        <a
          href={waLink(stack.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${stack.name} on WhatsApp`}
          className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 cursor-pointer"
          style={{ backgroundColor: '#00B4B4' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#009999' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#00B4B4' }}
        >
          {WA_SVG}
          Enquire on WhatsApp — {stack.name}
        </a>
      </div>
    </article>
  )
}

// ─── UniversalContraindications ───────────────────────────────────────────────
function UniversalContraindications() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1e35]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4B4]"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-0.5">Applies to All Stacks</p>
          <h3 className="text-base font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Universal Contraindications
          </h3>
        </div>
        <span className="text-white/40 flex-shrink-0 ml-4">
          <ChevronSvg open={open} />
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '2000px' : '0px' }}>
        <div className="border-t border-white/8">
          {UNIVERSAL_CONTRAINDICATIONS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-6 py-4 border-b border-white/5 last:border-0"
              style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-amber-400 flex-shrink-0 mt-0.5">{WARN_SVG}</span>
              <p className="text-white/60 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Stacks() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [filterVisible, setFilterVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 120) setFilterVisible(true)
      else if (y > lastScrollY.current + 6) setFilterVisible(false)
      else if (y < lastScrollY.current - 6) setFilterVisible(true)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = activeFilter === 'all' ? STACKS : STACKS.filter((s) => s.category === activeFilter)
  const countFor = (id) => id === 'all' ? STACKS.length : STACKS.filter((s) => s.category === id).length

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Peptide Stacks | STRIATA South Africa</title>
        <meta name="description" content="Browse STRIATA's 10 recommended peptide stacks for recovery, weight loss, anti-aging, and performance. Pharmaceutical grade, 99%+ purity. Enquire on WhatsApp." />
        <link rel="canonical" href="https://striatalabs.co.za/stacks" />
        <meta property="og:title" content="Peptide Stacks | STRIATA South Africa" />
        <meta property="og:description" content="10 curated peptide stacks across gym, weight loss, anti-aging and wellness. Tier pricing from Entry to Premium." />
        <meta property="og:url" content="https://striatalabs.co.za/stacks" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00B4B4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 40%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4B4]/10 border border-[#00B4B4]/20 text-[#00B4B4] text-xs font-semibold uppercase tracking-widest mb-6">
            Curated Protocols
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Recommended <span className="text-[#00B4B4]">Peptide Stacks</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-3">
            Ten research-backed protocols built for specific goals. Each stack includes scientific rationale, tier pricing, and transparent safety information.
          </p>
          <p className="text-white/35 text-sm">
            Pharmaceutical Grade · 99%+ Purity · Research Purposes Only
          </p>

          {/* Category legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                <span className="text-white/40 text-xs">{meta.label}</span>
              </div>
            ))}
          </div>

          {/* Tier legend */}
          <div className="mt-3 pt-3 border-t border-white/8">
            <TierLegend />
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section
        className={`sticky top-20 z-30 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/8 py-3 transition-transform duration-300 ${filterVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-0.5" role="group" aria-label="Filter stacks by category">
            {FILTERS.map(({ id, label, icon }) => {
              const isActive = activeFilter === id
              const meta = id !== 'all' ? CATEGORY_META[id] : null
              const count = countFor(id)
              const activeColor = meta ? meta.color : '#00B4B4'

              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  aria-pressed={isActive}
                  className={`flex-none flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4B4] ${
                    isActive
                      ? 'shadow-lg text-[#0A1628]'
                      : 'bg-[#0d1e35] border border-white/10 text-white/60 hover:text-white hover:border-white/20'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: activeColor }
                      : {}
                  }
                >
                  <span className={isActive ? 'opacity-80' : 'opacity-50'} style={!isActive && meta ? { color: meta.color } : {}}>
                    {icon}
                  </span>
                  {label}
                  <span
                    className={`text-xs font-normal ${isActive ? 'opacity-60' : 'opacity-35'}`}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stack Grid ── */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-8 md:py-12">
        {activeFilter !== 'all' && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/40 text-sm">
              {filtered.length} stack{filtered.length !== 1 ? 's' : ''} in{' '}
              <span style={{ color: CATEGORY_META[activeFilter]?.color }}>
                {CATEGORY_META[activeFilter]?.label}
              </span>
            </p>
            <button onClick={() => setActiveFilter('all')} className="text-white/40 hover:text-white text-sm transition-colors cursor-pointer">
              Clear filter
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((stack) => (
            <StackCard key={stack.num} stack={stack} />
          ))}
        </div>
      </section>

      {/* ── Universal Contraindications ── */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 pb-12">
        <UniversalContraindications />
      </section>

      {/* ── Footer strip ── */}
      <section className="border-t border-white/8 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/30 text-sm leading-relaxed mb-4">
            All products are for research purposes only and are not intended for human or veterinary use.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/30 text-sm">
            <span>+27 60 142 8649</span>
            <span>+27 60 323 7355</span>
            <span>info@striatalabs.co.za</span>
          </div>
        </div>
      </section>
    </div>
  )
}
