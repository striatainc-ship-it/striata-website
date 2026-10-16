import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { STACKS, CATEGORY_META, stackBySlug, stackPath, randValue } from '../data/stacksData'
import { SITE_URL, offerTerms } from '../data/site'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import { StackCard, UniversalContraindications } from '../components/StackCard'

const H = { fontFamily: 'var(--font-heading)' }

/** How each stack category reads inside a sentence. */
const GOAL = {
  gym: 'training and recovery',
  weightloss: 'weight loss',
  antiaging: 'anti-aging',
  wellness: 'wellness',
}

const rand = (value) => `R${value.toLocaleString('en-ZA')}`

export default function StackPage() {
  const { slug } = useParams()
  const stack = stackBySlug(slug)

  if (!stack) {
    return (
      <div className="bg-[#0A1628] min-h-screen grid place-items-center px-6">
        <Helmet>
          <title>Stack not found | STRIATA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-white text-2xl font-black mb-3" style={H}>
            We couldn&rsquo;t find that stack
          </h1>
          <Link to="/stacks" className="btn btn-primary btn-md">
            See all stacks
          </Link>
        </div>
      </div>
    )
  }

  const meta = CATEGORY_META[stack.category]
  const url = `${SITE_URL}${stackPath(stack)}`
  const lowest = Math.min(...stack.tiers.map((t) => randValue(t.price)))
  const title = `${stack.name} Peptide Stack | STRIATA`
  const description = `${stack.tagline}: a ${GOAL[stack.category]} peptide stack in three tiers from ${rand(lowest)}, with the rationale and safety notes.`

  // Other stacks for the same goal first, then the rest, so every page links
  // onward to three more.
  const others = STACKS.filter((s) => s !== stack)
  const related = [
    ...others.filter((s) => s.category === stack.category),
    ...others.filter((s) => s.category !== stack.category),
  ].slice(0, 3)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
      </Helmet>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: stack.name,
          description: `${stack.tagline}. ${stack.rationale}`,
          category: `Peptide stack · ${meta.label}`,
          brand: { '@type': 'Brand', name: 'STRIATA' },
          url,
          offers: stack.tiers.map((tier) => ({
            '@type': 'Offer',
            name: `${stack.name}, ${tier.label} tier`,
            sku: `STRIATA-stack-${stack.num}-${tier.label.toLowerCase()}`,
            price: randValue(tier.price),
            priceCurrency: 'ZAR',
            availability: 'https://schema.org/InStock',
            url,
            seller: { '@type': 'Organization', name: 'STRIATA' },
            ...offerTerms(),
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Stacks', item: `${SITE_URL}/stacks` },
            { '@type': 'ListItem', position: 2, name: stack.name, item: url },
          ],
        }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-10 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `radial-gradient(circle at 20% 40%, ${meta.color} 0%, transparent 50%)` }}
        />
        <Reveal stagger delay={0.1} className="relative z-10 max-w-3xl mx-auto">
          <Link to="/stacks" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold mb-6 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            All stacks
          </Link>
          <span
            className="block w-fit px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: meta.lightColor, color: meta.color, border: `1px solid ${meta.border}` }}
          >
            {meta.label} stack
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight" style={H}>
            {stack.name}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            {stack.tagline}. Three tiers, from {rand(lowest)}, each listed with what is in it, why the compounds are
            combined, and who should not use it.
          </p>
        </Reveal>
      </section>

      {/* ── The stack ── */}
      <section className="max-w-3xl mx-auto px-3 md:px-6 pb-12">
        <StackCard stack={stack} standalone />
      </section>

      <section className="max-w-3xl mx-auto px-3 md:px-6 pb-12">
        <UniversalContraindications />
      </section>

      {/* ── Related ── */}
      <section className="px-6 py-14 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
            Other stacks
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((s) => {
              const m = CATEGORY_META[s.category]
              return (
                <Link
                  key={s.num}
                  to={stackPath(s)}
                  {...spotlightProps()}
                  className="spot bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-colors group"
                  style={{ borderLeft: `3px solid ${m.color}` }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: m.color }}>{m.label}</p>
                  <h3 className="text-white font-bold mb-1 group-hover:text-[#00B4B4] transition-colors" style={H}>{s.name}</h3>
                  <p className="text-white/45 text-sm">{s.tagline}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-10 px-6">
        <p className="max-w-3xl mx-auto text-center text-white/30 text-sm leading-relaxed">
          All products are for research purposes only and are not intended for human or veterinary use.
        </p>
      </section>
    </div>
  )
}
