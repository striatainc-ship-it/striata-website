import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { products, categories, whatsappLink } from '../data/products'
import ProductCard from '../components/ProductCard'

const CAT_ICONS = {
  all: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  recovery: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  skin: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  hormonal: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  weight: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    </svg>
  ),
  brain: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  immunity: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  specialised: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
}

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function Catalogue() {
  const location = useLocation()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const cat = params.get('cat')
    if (cat) setActiveCategory(cat)
  }, [location.search])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      return matchesCat && matchesSearch
    })
  }, [activeCategory, search])

  const currentCategory = categories.find((c) => c.id === activeCategory)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/vial layouts.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 to-[#0A1628]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Explore the <span className="text-[#00B4B4]">Catalogue</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Research-grade peptides across every category: purity guaranteed, results driven. Find your compound and enquire directly on WhatsApp for pricing and availability.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-30 bg-[#0A1628]/95 backdrop-blur-md border-b border-white/8 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-4 relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search peptides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === id
                    ? 'bg-[#00B4B4] text-white shadow-lg shadow-[#00B4B4]/20'
                    : 'bg-[#0d1e35] border border-white/10 text-white/60 hover:text-white hover:border-[#00B4B4]/30'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {CAT_ICONS[id] && <span className={activeCategory === id ? 'text-white' : 'text-[#00B4B4]'}>{CAT_ICONS[id]}</span>}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-white/40 text-sm">
            {filtered.length} compound{filtered.length !== 1 ? 's' : ''} found
            {activeCategory !== 'all' && currentCategory && (
              <> in <span className="text-[#00B4B4]">{currentCategory.label}</span></>
            )}
            {search && <> matching "<span className="text-white/60">{search}</span>"</>}
          </p>
          {(activeCategory !== 'all' || search) && (
            <button
              onClick={() => { setActiveCategory('all'); setSearch('') }}
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">No compounds match your search.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearch('') }}
              className="mt-4 text-[#00B4B4] hover:text-white text-sm transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="py-20 border-t border-white/8">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Can't Find What You're <span className="text-[#00B4B4]">Looking For?</span>
          </h2>
          <p className="text-white/60 mb-8">
            We stock over 100 research-grade peptides. If you don't see what you need, message us directly and we'll source it for you.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
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
