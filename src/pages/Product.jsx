import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  isInStock,
  categoryLabel,
  productBySlug,
  productPath,
  products,
  vialImage,
  vialSrc,
  vialStill,
  whatsappLink,
} from '../data/products'
import { contentFor } from '../data/productContent'
import { guideFor } from '../data/productGuides'
import { blogPosts } from '../data/blogPosts'
import { SITE_URL, DEFAULT_IMAGE } from '../data/site'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'

const H = { fontFamily: 'var(--font-heading)' }

const WA_ICON = (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const rand = (price) => `R ${price.toLocaleString('en-ZA')}`

/**
 * The WhatsApp message a visitor sends, pre-written from what they picked.
 *
 * Mirrors ProductCard so an enquiry from either place reads the same on the
 * other end, and distinguishes an order from an availability question — the
 * two need different replies.
 */
function waLink(product, tier) {
  const label = product.format ? `${product.name} (${product.format})` : product.name
  const message = !tier
    ? `Hi STRIATA, I'd like to enquire about *${label}*. Please send me pricing and availability.`
    : tier.inStock
      ? `Hi STRIATA, I'd like to order *${label}* — ${tier.dose} @ ${rand(tier.price)}. Please send me payment details.`
      : `Hi STRIATA, I'm interested in *${label}* — ${tier.dose} @ ${rand(tier.price)}. Is it currently available or when will it be back in stock?`
  return `${whatsappLink}?text=${encodeURIComponent(message)}`
}

/**
 * The vial, cut out of its studio background, on a soft teal stage.
 *
 * A product with more than one shot (bacteriostatic water is photographed in
 * both its sizes) gets thumbnails under the stage. The first shot is the one
 * structured data and the social card use, so the switcher is presentation
 * only and nothing downstream depends on which is showing.
 */
function VialShot({ image, alt, labels, priority }) {
  const [active, setActive] = useState(0)

  if (!image) {
    return (
      <div className="aspect-[4/5] rounded-3xl border border-white/8 bg-[#0d1e35] grid place-items-center">
        <span className="text-white/25 text-sm">Photography coming soon</span>
      </div>
    )
  }

  const { names } = image
  const name = names[active] ?? names[0]
  const caption = labels?.[active]

  return (
    <div>
      <div className="relative aspect-[4/5]">
        {/* A radial wash behind the glass so the vial reads as lit rather than
            pasted onto the navy. */}
        <div
          className="absolute inset-[8%] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,180,180,0.22), transparent 68%)' }}
        />
        <img
          key={name}
          src={vialSrc(name, 960)}
          srcSet={`${vialSrc(name, 320)} 320w, ${vialSrc(name, 640)} 640w, ${vialSrc(name, 960)} 960w`}
          sizes="(min-width: 1024px) 360px, 55vw"
          alt={caption ? `${alt} — ${caption}` : alt}
          width={960}
          height={1920}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="relative w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {names.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {names.map((shot, i) => (
            <button
              key={shot}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-colors ${
                i === active
                  ? 'border-[#00B4B4]/60 bg-[#00B4B4]/10'
                  : 'border-white/8 bg-white/[0.03] hover:border-white/20'
              }`}
            >
              <img
                src={vialSrc(shot, 160)}
                alt=""
                width={160}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-5 h-10 object-contain"
              />
              {labels?.[i] && (
                <span className={`text-[10px] font-mono ${i === active ? 'text-[#00B4B4]' : 'text-white/40'}`}>
                  {labels[i]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-white font-semibold group-hover:text-[#00B4B4] transition-colors" style={H}>
          {q}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 text-[#00B4B4] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {open && <p className="text-white/55 text-sm leading-relaxed pb-5 -mt-1 max-w-2xl">{a}</p>}
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const product = productBySlug(slug)

  // Prerendering walks a fixed route list, so this only fires for a URL typed
  // by hand or left over from a renamed slug.
  if (!product) {
    return (
      <div className="bg-[#0A1628] min-h-screen grid place-items-center px-6">
        <Helmet>
          <title>Product not found | STRIATA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-white text-2xl font-black mb-3" style={H}>
            We couldn&rsquo;t find that product
          </h1>
          <p className="text-white/50 mb-8">It may have been renamed or it may not have a page yet.</p>
          <Link to="/catalogue" className="btn btn-primary btn-md">
            Browse the catalogue
          </Link>
        </div>
      </div>
    )
  }

  return <ProductPage key={product.id} product={product} />
}

function ProductPage({ product }) {
  const content = contentFor(product)
  const image = vialImage(product)
  const inStock = isInStock(product)
  const guide = guideFor(product)
  const url = `${SITE_URL}${productPath(product)}`

  const prices = product.prices ?? []
  const lowest = prices.length ? Math.min(...prices.map((t) => t.price)) : null
  const highest = prices.length ? Math.max(...prices.map((t) => t.price)) : null

  // Default to the cheapest concentration that is actually in stock, so the
  // WhatsApp button is useful before anything is clicked.
  const [selected, setSelected] = useState(
    () => prices.filter((t) => t.inStock).sort((a, b) => a.price - b.price)[0] ?? null,
  )

  const guidePost = useMemo(() => blogPosts.find((p) => p.slug === guide) ?? null, [guide])

  const related = useMemo(() => {
    const ids = content?.pairsWith ?? []
    return ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p) => p && productPath(p))
      .slice(0, 3)
  }, [content])

  const socialImage = image ? `${SITE_URL}${vialStill(image.names[0], 'og')}` : DEFAULT_IMAGE

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{content?.meta.title ?? `${product.name} | STRIATA South Africa`}</title>
        <meta name="description" content={content?.meta.description ?? product.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={content?.meta.title ?? product.name} />
        <meta property="og:description" content={content?.meta.description ?? product.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: content?.meta.description ?? product.description,
          category: categoryLabel(product),
          ...(image ? { image: [`${SITE_URL}${vialStill(image.names[0])}`, socialImage] } : {}),
          brand: { '@type': 'Brand', name: 'STRIATA' },
          url,
          // One Offer per concentration rather than an AggregateOffer: the
          // sizes differ in availability as well as price, and that is exactly
          // what a shopper needs to see before enquiring.
          offers: prices.map((tier) => ({
            '@type': 'Offer',
            name: `${product.name} ${tier.dose}`,
            sku: `STRIATA-${product.id}-${tier.dose.replace(/[^\w]+/g, '')}`,
            price: tier.price,
            priceCurrency: 'ZAR',
            availability: tier.inStock
              ? 'https://schema.org/InStock'
              : 'https://schema.org/BackOrder',
            url,
            seller: { '@type': 'Organization', name: 'STRIATA' },
          })),
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Catalogue', item: `${SITE_URL}/catalogue` },
            { '@type': 'ListItem', position: 2, name: product.name, item: url },
          ],
        }}
      />
      {content?.faqs?.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }}
        />
      )}

      {/* ── HERO: photo, price table, enquiry ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link to="/catalogue" className="hover:text-[#00B4B4] transition-colors">
                  Catalogue
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70 truncate">{product.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="max-w-[280px] sm:max-w-xs mx-auto w-full lg:max-w-none lg:sticky lg:top-28">
              <VialShot
                image={image}
                labels={image?.labels}
                alt={`${product.name} vial from STRIATA`}
                priority
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {inStock ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full"
                    style={H}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    In stock
                  </span>
                ) : (
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest text-white/35 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                    style={H}
                  >
                    On request
                  </span>
                )}
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-white/45 bg-white/5 px-3 py-1 rounded-full border border-white/8"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={H}>
                {product.name}
              </h1>

              {content?.lede && (
                <p className="text-white/70 text-lg leading-relaxed mb-4 max-w-2xl">{content.lede}</p>
              )}
              <p className="text-white/50 leading-relaxed mb-8 max-w-2xl">{product.description}</p>

              {/* Concentrations */}
              {prices.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <h2 className="text-white/35 text-[11px] font-bold uppercase tracking-widest" style={H}>
                      Concentrations · 1 {product.format ?? 'vial'}
                    </h2>
                    <span className="text-[#00B4B4] text-sm font-bold">
                      {lowest === highest ? rand(lowest) : `from ${rand(lowest)}`}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2">
                    {prices.map((tier) => {
                      const isSelected = selected?.dose === tier.dose
                      return (
                        <button
                          key={tier.dose}
                          type="button"
                          onClick={() => setSelected(isSelected ? null : tier)}
                          aria-pressed={isSelected}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-150 ${
                            isSelected
                              ? 'bg-[#00B4B4]/15 border border-[#00B4B4]/60 text-white shadow-sm shadow-[#00B4B4]/10'
                              : tier.inStock
                                ? 'bg-white/[0.04] border border-white/8 text-white/65 hover:border-white/20 hover:text-white/85'
                                : 'bg-white/[0.02] border border-white/5 text-white/35 hover:border-white/15 hover:text-white/60'
                          }`}
                        >
                          <span className="inline-flex items-center gap-2 font-mono tracking-wide">
                            {tier.inStock && (
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400" aria-label="In stock" />
                            )}
                            {tier.dose}
                          </span>
                          <span className={`font-bold tabular-nums ${isSelected ? 'text-[#00B4B4]' : ''}`}>
                            {rand(tier.price)}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <p className="mt-2.5 text-white/25 text-xs">
                    {selected
                      ? selected.inStock
                        ? `${selected.dose} selected — in stock and shipping now.`
                        : `${selected.dose} selected — available on request.`
                      : 'Green dot marks the concentrations we are holding; the rest come in on request.'}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink(product, selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg gap-2"
                >
                  {WA_ICON}
                  {selected
                    ? selected.inStock
                      ? `Order ${selected.dose} on WhatsApp`
                      : `Check ${selected.dose} availability`
                    : 'Enquire on WhatsApp'}
                </a>
                <Link to="/tools/reconstitution-calculator" className="btn btn-ghost btn-lg">
                  Reconstitution calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {content && (
        <>
          {/* ── ABOUT ── */}
          <section className="px-6 py-16 border-t border-white/5">
            <Reveal className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
                About {product.name}
              </h2>
              {content.about.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-white/60 leading-relaxed mb-5 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </section>

          {/* ── RESEARCHED FOR ── */}
          <section className="px-6 py-16 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={H}>
                  What it&rsquo;s researched for
                </h2>
                <p className="text-white/40 text-sm mb-10 max-w-2xl">
                  Research context, not medical advice. Everything we sell is supplied for research purposes.
                </p>
              </Reveal>
              <Reveal stagger className="grid sm:grid-cols-2 gap-4">
                {content.researchedFor.map((item) => (
                  <div
                    key={item.title}
                    {...spotlightProps()}
                    className="spot bg-[#0d1e35] border border-white/8 rounded-2xl p-6 hover:border-[#00B4B4]/30 transition-colors"
                  >
                    <h3 className="text-white font-bold mb-2" style={H}>
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ── HANDLING ── */}
          <section className="px-6 py-16 border-t border-white/5">
            <Reveal className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
                Reconstitution and storage
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">{content.handling}</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/tools/reconstitution-calculator" className="btn btn-outline btn-sm">
                  Work out your dose
                </Link>
                <Link to="/learn/how-to-store-and-reconstitute-peptides" className="btn btn-ghost btn-sm">
                  Storage and reconstitution guide
                </Link>
              </div>
            </Reveal>
          </section>

          {/* ── FAQ ── */}
          {content.faqs.length > 0 && (
            <section className="px-6 py-16 border-t border-white/5">
              <Reveal className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
                  Questions we get about {product.name}
                </h2>
                <div>
                  {content.faqs.map((faq) => (
                    <FaqItem key={faq.q} {...faq} />
                  ))}
                </div>
              </Reveal>
            </section>
          )}
        </>
      )}

      {/* ── FURTHER READING ── */}
      {guidePost && (
        <section className="px-6 py-16 border-t border-white/5">
          <Reveal className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
              Read the full guide
            </h2>
            <Link
              to={`/learn/${guidePost.slug}`}
              {...spotlightProps()}
              className="spot block bg-[#0d1e35] border border-white/8 rounded-2xl p-6 hover:border-[#00B4B4]/40 transition-colors group"
            >
              <span className="text-[#00B4B4] text-[11px] font-bold uppercase tracking-widest" style={H}>
                {guidePost.category}
              </span>
              <h3
                className="text-white font-bold text-lg mt-2 mb-2 group-hover:text-[#00B4B4] transition-colors"
                style={H}
              >
                {guidePost.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{guidePost.preview}</p>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="px-6 py-16 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
                Often bought with it
              </h2>
            </Reveal>
            <Reveal stagger className="grid sm:grid-cols-3 gap-4">
              {related.map((item) => {
                const shot = vialImage(item)
                return (
                  <Link
                    key={item.id}
                    to={productPath(item)}
                    {...spotlightProps()}
                    className="spot bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-colors group flex gap-4 items-center"
                  >
                    {shot && (
                      <img
                        src={vialSrc(shot.names[0], 160)}
                        alt=""
                        width={160}
                        height={320}
                        loading="lazy"
                        decoding="async"
                        className="w-8 h-16 object-contain shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <h3
                        className="text-white font-bold text-sm group-hover:text-[#00B4B4] transition-colors leading-snug"
                        style={H}
                      >
                        {item.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-1">
                        {item.prices?.length ? `from ${rand(Math.min(...item.prices.map((t) => t.price)))}` : 'Enquire'}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </Reveal>
          </div>
        </section>
      )}

      {/* ── CLOSER ── */}
      <section className="px-6 py-20 border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={H}>
            Order {product.name} in South Africa
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Everything ships from Johannesburg, nationwide. Message us on WhatsApp and we&rsquo;ll confirm stock,
            pricing and delivery before you pay a cent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waLink(product, selected)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg gap-2"
            >
              {WA_ICON}
              Enquire on WhatsApp
            </a>
            <Link to="/catalogue" className="btn btn-ghost btn-lg">
              Back to the catalogue
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
