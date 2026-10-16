import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { products, categories, isInStock, productPath } from '../data/products'
import { CATEGORY_PAGES, categoryPagePath } from '../data/categoryPages'
import { blogPosts } from '../data/blogPosts'
import { SITE_URL } from '../data/site'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import ProductCard from '../components/ProductCard'

const H = { fontFamily: 'var(--font-heading)' }

/**
 * One goal category of the catalogue at its own URL. Each page has an exact
 * route (see routeLoaders.js), so the page is found by path rather than by a
 * route param.
 */
export default function CategoryPage() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '')
  const page = CATEGORY_PAGES.find((p) => categoryPagePath(p) === path)
  if (!page) return null

  const label = categories.find((c) => c.id === page.id)?.label ?? page.h1
  const listed = products.filter((p) => p.category === page.id && isInStock(p))
  const reading = page.reading.map((slug) => blogPosts.find((p) => p.slug === slug)).filter(Boolean)
  const url = `${SITE_URL}${categoryPagePath(page)}`

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={url} />
      </Helmet>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: page.h1,
          description: page.description,
          url,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: listed.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: p.name,
              ...(productPath(p) ? { url: `${SITE_URL}${productPath(p)}` } : {}),
            })),
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Catalogue', item: `${SITE_URL}/catalogue` },
            { '@type': 'ListItem', position: 2, name: label, item: url },
          ],
        }}
      />

      {/* ── Hero and intro ── */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <Reveal stagger delay={0.1} className="relative z-10 max-w-3xl mx-auto">
          <Link to="/catalogue" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            Full catalogue
          </Link>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight" style={H}>
            {page.h1}
          </h1>
          {page.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-white/60 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
          <p className="text-white/35 text-sm mt-6">
            {listed.length} in stock · priced in rand · delivered across South Africa · research purposes only
          </p>
        </Reveal>
      </section>

      {/* ── Products ── */}
      <section className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8 pb-14">
        <h2 className="sr-only">{label}: in stock</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {listed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Reading ── */}
      <section className="px-6 py-14 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
            The research, in plain language
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {reading.map((post) => (
              <Link
                key={post.slug}
                to={`/learn/${post.slug}`}
                {...spotlightProps()}
                className="spot block bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-colors group"
              >
                <h3 className="text-white font-bold mb-1.5 group-hover:text-[#00B4B4] transition-colors" style={H}>{post.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed line-clamp-2">{post.preview}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
            {page.links.map((l) => (
              <Link key={l.to} to={l.to} className="text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
                {l.label} →
              </Link>
            ))}
            <Link to="/learn/how-to-read-a-certificate-of-analysis" className="text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
              How to read a certificate of analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Other categories ── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4" style={H}>Other ranges</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_PAGES.filter((p) => p !== page).map((p) => (
              <Link
                key={p.slug}
                to={categoryPagePath(p)}
                className="px-4 py-2 rounded-full bg-[#0d1e35] border border-white/10 text-white/65 text-sm hover:text-white hover:border-[#00B4B4]/40 transition-colors"
              >
                {categories.find((c) => c.id === p.id)?.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
