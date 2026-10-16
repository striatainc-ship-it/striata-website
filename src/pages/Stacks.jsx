import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { spotlightProps } from '../lib/motion'
import { STACKS, CATEGORY_META, TIER_STYLES } from '../data/stacksData'
import Reveal from '../components/Reveal'
import { StackCard, UniversalContraindications } from '../components/StackCard'

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
        <title>Peptide Stacks & Protocols South Africa | STRIATA</title>
        <meta name="description" content="STRIATA's 10 recommended peptide stacks for recovery, weight loss, anti-aging and performance, with tier pricing. 99%+ purity. Enquire on WhatsApp." />
        <link rel="canonical" href="https://www.striatalabs.co.za/stacks" />
        <meta property="og:title" content="Peptide Stacks & Protocols South Africa | STRIATA" />
        <meta property="og:description" content="10 curated peptide stacks across gym, weight loss, anti-aging and wellness. Tier pricing from Entry to Premium." />
        <meta property="og:url" content="https://www.striatalabs.co.za/stacks" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00B4B4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 40%)' }}
        />
        <Reveal stagger delay={0.1} className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4B4]/10 border border-[#00B4B4]/20 text-[#00B4B4] text-xs font-semibold uppercase tracking-widest mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Curated Protocols
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Peptide Stacks <span className="text-[#00B4B4]">&amp; Protocols</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-3">
            Ten research-backed protocols built for specific goals. Each stack includes scientific rationale, tier pricing, and transparent safety information.
          </p>
          <p className="text-white/35 text-sm">
            Pharmaceutical Grade · 99%+ Purity · Research Purposes Only
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-1.5 mt-5 text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors"
          >
            Not sure which one? Take the 60-second quiz
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </Link>

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
        </Reveal>
      </section>

      {/* ── Featured protocol ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-10 relative z-10">
        <Reveal delay={0.4}>
          <Link
            to="/stacks/menopause-reset"
            {...spotlightProps()}
            className="spot group relative block rounded-3xl border border-[#F2B8A0]/25 hover:border-[#F2B8A0]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#F2B8A0]/10"
          >
            <div
              className="absolute inset-0 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.18]"
              style={{ backgroundImage: 'radial-gradient(circle at 10% 50%, #F2B8A0 0%, transparent 45%), radial-gradient(circle at 90% 30%, #00B4B4 0%, transparent 45%), radial-gradient(circle at 60% 100%, #8B9CF6 0%, transparent 40%)' }}
            />
            <div className="absolute inset-0 bg-[#0d1e35]/80" />

            <div className="relative grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center p-7 md:p-10">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2B8A0]/10 border border-[#F2B8A0]/25 text-[#F2B8A0] text-[11px] font-bold uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2B8A0]" />
                  Featured Protocol · New
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  The Menopause <span className="text-[#F2B8A0]">Reset</span>
                </h2>
                <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-xl mb-6">
                  A 12-week, four-stack protocol built around the four symptom clusters that tend to arrive together: broken sleep, collagen loss, loss of libido, and aging in fast-forward. Supplied through your practitioner.
                </p>
                <span className="btn btn-primary btn-lg">
                  Explore the Reset
                  <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>

              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {[
                  { n: '12', l: 'Weeks' },
                  { n: '4', l: 'Targeted stacks' },
                  { n: '21', l: 'Vials, water included' },
                ].map(({ n, l }) => (
                  <div key={l} className="rounded-2xl bg-white/[0.04] border border-white/8 px-4 py-4 lg:flex lg:items-baseline lg:gap-3">
                    <p className="text-white font-black text-3xl md:text-4xl leading-none tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>{n}</p>
                    <p className="text-white/45 text-xs mt-1 lg:mt-0">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </Reveal>
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
