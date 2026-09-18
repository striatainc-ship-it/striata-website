import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { categories, whatsappLink } from '../data/products'
import { pens, penCount } from '../data/pensData'
import ProductCard from '../components/ProductCard'
import JsonLd from '../components/JsonLd'
import Reveal from '../components/Reveal'
import FilterChips from '../components/FilterChips'
import { useStaggerGrid, spotlightProps } from '../lib/motion'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const BENEFITS = [
  {
    title: 'No Reconstitution',
    desc: 'Pens arrive ready to use. No bacteriostatic water, no mixing, no calculating concentrations.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Dial-In Dosing',
    desc: 'Set your dose on the pen instead of reading syringe markings. Consistent, repeatable, simple.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Discreet & Portable',
    desc: 'Compact and travel-friendly. Store, carry and use without the vial-and-syringe kit.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
]

export default function Pens() {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [filterVisible, setFilterVisible] = useState(true)
  const lastScrollY = useRef(0)
  const gridRef = useRef(null)

  // `/pens?q=KPV` pre-fills the search, so other pages can deep-link a pen.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the URL, same pattern as Catalogue
    if (q) setSearch(q)
  }, [location.search])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 120) {
        setFilterVisible(true)
      } else if (y > lastScrollY.current + 6) {
        setFilterVisible(false)
      } else if (y < lastScrollY.current - 6) {
        setFilterVisible(true)
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Only show category chips that actually have a pen in them
  const penCategories = useMemo(() => {
    const present = new Set(pens.map((p) => p.category))
    return categories.filter((c) => c.id === 'all' || present.has(c.id))
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return pens.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesSearch
    })
  }, [activeCategory, search])

  useStaggerGrid(gridRef, [filtered])

  const currentCategory = categories.find((c) => c.id === activeCategory)
  const hasActiveFilters = activeCategory !== 'all' || search
  const clearFilters = () => { setActiveCategory('all'); setSearch('') }

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Pre-Filled Peptide Pens South Africa | STRIATA</title>
        <meta name="description" content={`${penCount} research peptides in pre-filled pens: no reconstitution, dial-in dosing. BPC+TB, Retatrutide, Tirzepatide, GHK-Cu. Delivered across South Africa.`} />
        <link rel="canonical" href="https://www.striatalabs.co.za/pens" />
        <meta property="og:title" content="Pre-Filled Peptide Pens South Africa | STRIATA" />
        <meta property="og:description" content="Research-grade peptides in pre-filled pen format. No reconstitution, dial-in dosing. Delivered nationwide." />
        <meta property="og:url" content="https://www.striatalabs.co.za/pens" />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: pens.map((p, i) => {
          const amounts = p.prices.map((v) => v.price)
          return {
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Product',
              name: `${p.name} Pen`,
              description: p.description,
              category: p.category,
              brand: { '@type': 'Brand', name: 'STRIATA' },
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'ZAR',
                lowPrice: Math.min(...amounts),
                highPrice: Math.max(...amounts),
                offerCount: p.prices.length,
                availability: 'https://schema.org/InStock',
                url: 'https://www.striatalabs.co.za/pens',
              },
            },
          }
        }),
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
            All Pens In Stock
          </span>
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5 leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Pre-Filled Peptide <span className="text-[#00B4B4]">Pens</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-3">
            The same research-grade peptides from our catalogue, pre-filled in a pen. No reconstitution, no syringes, just dial your dose.
          </p>
          <p className="text-white/35 text-sm">
            {penCount} pens across {pens.length} compounds · Research Purposes Only
          </p>
        </Reveal>
      </section>

      {/* Why pens */}
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
        <p className="mt-4 text-white/50 text-xs md:text-sm text-center">
          Pens ship cold-chain express, with ice packs and insulation so the peptide doesn&rsquo;t degrade in transit:
          a flat <span className="text-white font-semibold">R 220</span> per order, anywhere in South Africa.
        </p>
      </section>

      {/* Filter Bar */}
      <section className={`sticky top-20 z-30 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/8 py-3 md:py-4 transition-transform duration-300 ${filterVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-3 relative md:max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search pens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <FilterChips
            className="overflow-x-auto scrollbar-hide pb-0.5"
            options={penCategories}
            value={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 py-6 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-white/40 text-sm">
            {filtered.length} pen{filtered.length !== 1 ? 's' : ''} found
            {activeCategory !== 'all' && currentCategory && (
              <> in <span className="text-[#00B4B4]">{currentCategory.label}</span></>
            )}
            {search && <> matching "<span className="text-white/60">{search}</span>"</>}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-white/40 hover:text-white text-sm transition-colors">
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((pen) => (
              <ProductCard key={pen.id} product={pen} format="Pen" />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No pens match your search.</p>
            <button onClick={clearFilters} className="mt-4 text-[#00B4B4] hover:text-white text-sm transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Vials cross-link */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
        <Link
          to="/catalogue"
          className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border border-white/8 bg-[#0d1e35] hover:border-[#00B4B4]/35 hover:bg-[#0f2340] transition-all duration-200 group"
        >
          <div>
            <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Prefer vials?</p>
            <p className="text-white/50 text-xs">Every pen compound is also available as a lyophilised vial in the full catalogue, usually at a lower price.</p>
          </div>
          <svg className="w-4 h-4 text-[#00B4B4] flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/8">
        <Reveal stagger className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            Want a Compound <span className="text-[#00B4B4]">as a Pen?</span>
          </h2>
          <p className="text-white/60 mb-8">
            If the peptide you need isn't listed in pen format yet, message us and we'll let you know what's possible.
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
