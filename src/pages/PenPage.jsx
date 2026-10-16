import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { products, productPath, vialImage, vialSrc, vialStill } from '../data/products'
import { pens } from '../data/pensData'
import { PEN_PAGES, penPageBySlug, penPagePath } from '../data/penPages'
import { guideFor } from '../data/productGuides'
import { blogPosts } from '../data/blogPosts'
import { COLD_CHAIN } from '../lib/cart'
import { SITE_URL, DEFAULT_IMAGE, offerTerms } from '../data/site'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import AddToOrder from '../components/AddToOrder'

const H = { fontFamily: 'var(--font-heading)' }

const rand = (value) => `R${value.toLocaleString('en-ZA')}`

export default function PenPage() {
  const { slug } = useParams()
  const page = penPageBySlug(slug)
  const pen = page ? pens.find((p) => p.id === `pen-${page.productId}`) : null
  const vial = page ? products.find((p) => p.id === page.productId) : null
  const [picked, setPicked] = useState(null)

  if (!page || !pen || !vial) {
    return (
      <div className="bg-[#0A1628] min-h-screen grid place-items-center px-6">
        <Helmet>
          <title>Pen not found | STRIATA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-white text-2xl font-black mb-3" style={H}>
            We couldn&rsquo;t find that pen
          </h1>
          <Link to="/pens" className="btn btn-primary btn-md">
            See all pens
          </Link>
        </div>
      </div>
    )
  }

  const name = `${vial.name} Pen`
  const url = `${SITE_URL}${penPagePath(page)}`
  const shot = vialImage(pen)
  const socialImage = shot ? `${SITE_URL}${vialStill(shot.names[0], 'og')}` : DEFAULT_IMAGE
  const tier = picked ?? (pen.prices.length === 1 ? pen.prices[0] : null)
  const vialPath = productPath(vial)
  const guide = blogPosts.find((p) => p.slug === guideFor(vial)) ?? null
  const otherPens = PEN_PAGES.filter((p) => p !== page)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          description: `${vial.description} Supplied pre-filled in a pen.`,
          ...(shot ? { image: [`${SITE_URL}${vialStill(shot.names[0])}`, socialImage] } : {}),
          brand: { '@type': 'Brand', name: 'STRIATA' },
          url,
          offers: pen.prices.map((t) => ({
            '@type': 'Offer',
            name: `${name} ${t.dose}`,
            sku: `STRIATA-pen-${vial.id}-${t.dose.replace(/[^\w]+/g, '')}`,
            price: t.price,
            priceCurrency: 'ZAR',
            availability: 'https://schema.org/InStock',
            url,
            seller: { '@type': 'Organization', name: 'STRIATA' },
            ...offerTerms({ pen: true }),
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Pens', item: `${SITE_URL}/pens` },
            { '@type': 'ListItem', position: 2, name, item: url },
          ],
        }}
      />

      {/* ── Hero ── */}
      <section className="relative pt-32 md:pt-36 pb-14 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal stagger delay={0.1}>
            <Link to="/pens" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold mb-6 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              All pens
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight" style={H}>
              {name}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-7">{page.intro[0]}</p>

            <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Pen size">
              {pen.prices.map((t) => {
                const active = tier?.dose === t.dose
                return (
                  <button
                    key={t.dose}
                    type="button"
                    onClick={() => setPicked(t)}
                    aria-pressed={active}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                      active ? 'border-[#00B4B4] bg-[#00B4B4]/15 text-white' : 'border-white/12 text-white/65 hover:border-white/30'
                    }`}
                  >
                    {t.dose} · {rand(t.price)}
                  </button>
                )
              })}
            </div>
            <AddToOrder
              product={pen}
              tier={tier}
              format="Pen"
              href={penPagePath(page)}
              imageName={shot?.names[0] ?? null}
            />
            <p className="text-white/40 text-sm mt-4">
              Ships {COLD_CHAIN.label.toLowerCase()} with ice packs, {rand(COLD_CHAIN.price)} per order, anywhere in South Africa.
            </p>
          </Reveal>

          {shot && (
            <Reveal delay={0.2} className="rounded-3xl bg-white overflow-hidden">
              <img
                src={vialSrc(shot.names[0], 960)}
                srcSet={`${vialSrc(shot.names[0], 640)} 640w, ${vialSrc(shot.names[0], 960)} 960w`}
                sizes="(min-width: 1024px) 560px, 100vw"
                alt={`${name}, pre-filled peptide pen and box from STRIATA`}
                width={960}
                height={576}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto"
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* ── Pen or vial ── */}
      <section className="px-6 py-14 border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-5" style={H}>
            Pen or vial?
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">{page.intro[1]}</p>
          <div className="rounded-2xl border border-white/8 overflow-hidden text-sm">
            <div className="grid grid-cols-3 bg-[#0d1e35] px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-widest">
              <span>Size</span>
              <span>Pen</span>
              <span>Vial</span>
            </div>
            {pen.prices.map((t) => {
              const match = vial.prices.find((v) => v.dose === t.dose)
              return (
                <div key={t.dose} className="grid grid-cols-3 px-5 py-3.5 border-t border-white/5 text-white/75">
                  <span className="font-semibold text-white">{t.dose}</span>
                  <span>{rand(t.price)} · pre-filled</span>
                  <span>
                    {match ? `${rand(match.price)} · powder${match.inStock ? '' : ' (on request)'}` : 'not in this size'}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
            {vialPath && (
              <Link to={vialPath} className="text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
                {vial.name} vial: research summary, specifications and sources →
              </Link>
            )}
            <Link to="/pens" className="text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
              How a peptide pen works →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Reading ── */}
      {guide && (
        <section className="px-6 py-14 border-t border-white/5">
          <Reveal className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
              The research behind {vial.name}
            </h2>
            <Link
              to={`/learn/${guide.slug}`}
              {...spotlightProps()}
              className="spot block bg-[#0d1e35] border border-white/8 rounded-2xl p-6 hover:border-[#00B4B4]/40 transition-colors group"
            >
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00B4B4] transition-colors" style={H}>
                {guide.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{guide.preview}</p>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── Other pens ── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4" style={H}>Other pens</p>
          <div className="flex flex-wrap gap-2">
            {otherPens.map((p) => (
              <Link
                key={p.slug}
                to={penPagePath(p)}
                className="px-4 py-2 rounded-full bg-[#0d1e35] border border-white/10 text-white/65 text-sm hover:text-white hover:border-[#00B4B4]/40 transition-colors"
              >
                {products.find((x) => x.id === p.productId)?.name} pen
              </Link>
            ))}
            <Link to="/pens" className="px-4 py-2 rounded-full border border-[#00B4B4]/30 text-[#00B4B4] text-sm hover:text-white transition-colors">
              All {pens.length} pens
            </Link>
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
