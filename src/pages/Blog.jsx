import { useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts, blogCategories } from '../data/blogPosts'
import { whatsappLink } from '../data/products'

const BLOG_CAT_ICONS = {
  all: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  'Peptide Guides': (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84 50.697 50.697 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  'Weight Loss': (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    </svg>
  ),
  'Recovery': (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  'Anti-Aging': (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  'Brain & Mood': (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  ),
  'Hormonal Health': (
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

const ARROW = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

function ArticleCard({ article }) {
  return (
    <Link
      to={`/learn/${article.slug}`}
      className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-6 hover:border-[#00B4B4]/40 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4B4]/5 hover:-translate-y-1 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {article.category}
        </span>
        <span className="text-white/30 text-xs">{article.readTime}</span>
      </div>
      <h3
        className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#00B4B4] transition-colors flex-1"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {article.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-5">
        {article.preview}
      </p>
      <div className="flex items-center gap-1 text-[#00B4B4] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
        Read Article
        {ARROW}
      </div>
    </Link>
  )
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const featured = blogPosts.find(a => a.featured)
  const rest = blogPosts.filter(a => !a.featured)

  const filtered = activeCategory === 'all'
    ? rest
    : rest.filter(a => a.category === activeCategory)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="bg-[#0A1628] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            Learning Hub
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            The STRIATA <span className="text-[#00B4B4]">Learning Hub</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            No jargon. No gatekeeping. Just clear, honest information about peptides, performance and what the science actually says.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ── */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {blogCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === key
                    ? 'bg-[#00B4B4] text-white shadow-lg shadow-teal-500/20'
                    : 'bg-[#0d1e35] text-white/60 border border-white/8 hover:border-[#00B4B4]/40 hover:text-white'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {BLOG_CAT_ICONS[key]}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ARTICLE ── */}
      {featured && (activeCategory === 'all' || activeCategory === featured.category) && (
        <section className="px-6 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to={`/learn/${featured.slug}`}
              className="group block bg-[#0d1e35] border border-[#00B4B4]/25 rounded-2xl p-8 md:p-10 hover:border-[#00B4B4]/50 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-xl hover:shadow-[#00B4B4]/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4B4]/5 rounded-full translate-x-32 -translate-y-32 pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 bg-[#00B4B4] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Start Here
                  </span>
                  <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    🧬 {featured.category}
                  </span>
                  <span className="text-white/30 text-xs">{featured.readTime}</span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight group-hover:text-[#00B4B4] transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {featured.title}
                </h2>
                <p className="text-white/60 leading-relaxed mb-6 max-w-2xl">
                  {featured.preview}
                </p>
                <div className="inline-flex items-center gap-2 text-[#00B4B4] font-semibold text-sm">
                  Read Article
                  {ARROW}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ── */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-white/30">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-20 bg-[#060e1a] border-t border-white/5">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Newsletter
          </div>
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-3"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Stay in the <span className="text-[#00B4B4]">Loop</span>
          </h2>
          <p className="text-white/60 mb-8">
            New articles dropped monthly — straight to your inbox. No spam, no nonsense. Just the science made simple.
          </p>
          {subscribed ? (
            <div className="bg-[#00B4B4]/10 border border-[#00B4B4]/30 rounded-2xl px-6 py-5">
              <p className="text-[#00B4B4] font-semibold">You're subscribed. Welcome to the hub.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#0d1e35] border border-white/10 rounded-full px-5 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-[#00B4B4] hover:bg-[#009999] text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30 shrink-0"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Subscribe →
              </button>
            </form>
          )}
          <p className="mt-4 text-white/30 text-xs">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/10 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Found Something That <span className="text-[#00B4B4]">Interests You?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Chat to us on WhatsApp — we'll help you understand your options and find the right compound for your goals.
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
