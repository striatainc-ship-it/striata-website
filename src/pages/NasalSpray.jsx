import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { products, vialImage, vialSrc, vialStill } from '../data/products'
import { nasalSprays, nasalSprayBySlug, formatMass, SPRAY_ML } from '../data/nasalSpraysData'
import { nasalSprayContentFor } from '../data/nasalSprayContent'
import { pens } from '../data/pensData'
import { guideFor } from '../data/productGuides'
import { blogPosts } from '../data/blogPosts'
import { SITE_URL, DEFAULT_IMAGE } from '../data/site'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'
import VialShot from '../components/VialShot'
import FaqItem from '../components/FaqItem'
import AddToOrder from '../components/AddToOrder'
import { enquiryLink } from '../lib/cart'

const H = { fontFamily: 'var(--font-heading)' }

const WA_ICON = (
  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const rand = (price) => `R ${price.toLocaleString('en-ZA')}`

/**
 * Generic nasal-spray technique. The same on every spray page, which is fine:
 * it is the practical block a first-time buyer needs, and the page around it
 * is specific to the compound.
 */
const HOW_TO = [
  { title: 'Prime the pump', body: 'Before the first use, pump into the air until a fine, even mist comes out. Those first few sprays are not counted in the bottle total.' },
  { title: 'Clear your nose', body: 'Blow your nose gently first. A congested nose absorbs poorly and more of the spray runs straight out.' },
  { title: 'Aim away from the middle', body: 'Tilt your head slightly forward and point the nozzle toward the outer wall of the nostril, not the septum.' },
  { title: 'Breathe in gently', body: 'Press once while breathing in softly through the nose. A hard sniff pulls the spray down the throat instead of leaving it in the nose.' },
  { title: 'Alternate nostrils', body: 'Between sprays, alternate nostrils. That spreads the dose over more of the nasal lining.' },
]

/** The vial and pen of the same compound, for the format comparison. */
function formatsFor(spray) {
  const vial = products.find((p) => p.id === spray.productId)
  const pen = pens.find((p) => p.id === `pen-${spray.productId}`)
  // Compare like with like where a matching size exists, otherwise the size
  // we actually hold.
  const pick = (tiers) =>
    tiers?.find((t) => t.dose === spray.amount) ?? tiers?.find((t) => t.inStock) ?? tiers?.[0] ?? null
  return {
    vial: vial && pick(vial.prices),
    pen: pen && pick(pen.prices),
  }
}

export default function NasalSpray() {
  const { slug } = useParams()
  const spray = nasalSprayBySlug(slug)

  // Prerendering walks a fixed route list, so this only fires for a URL typed
  // by hand or left over from a renamed slug.
  if (!spray) {
    return (
      <div className="bg-[#0A1628] min-h-screen grid place-items-center px-6">
        <Helmet>
          <title>Nasal spray not found | STRIATA</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-white text-2xl font-black mb-3" style={H}>
            We couldn&rsquo;t find that spray
          </h1>
          <p className="text-white/50 mb-8">It may have been renamed.</p>
          <Link to="/nasal-sprays" className="btn btn-primary btn-md">
            See all nasal sprays
          </Link>
        </div>
      </div>
    )
  }

  return <SprayPage key={spray.slug} spray={spray} />
}

function SprayPage({ spray }) {
  const content = nasalSprayContentFor(spray)
  const image = vialImage(spray)
  const url = `${SITE_URL}${spray.page}`
  const tier = spray.prices[0]
  const fullName = `${spray.name} Nasal Spray`
  const { dosing } = spray
  const { vial, pen } = formatsFor(spray)
  // Guides are keyed by the vial's catalogue id; the spray keeps it as productId.
  const guideSlug = guideFor({ id: spray.productId })
  const guidePost = guideSlug ? blogPosts.find((p) => p.slug === guideSlug) : null

  const socialImage = image ? `${SITE_URL}${vialStill(image.names[0], 'og')}` : DEFAULT_IMAGE
  const title = content?.meta.title ?? `${fullName} South Africa | STRIATA`
  const description = content?.meta.description ?? spray.description

  const related = (content?.pairsWith ?? []).map(nasalSprayBySlug).filter(Boolean)
  const others = nasalSprays.filter((s) => s.slug !== spray.slug && !related.includes(s))

  const stats = [
    { label: 'Per bottle', value: spray.amount, note: `in ${dosing.bottleMl}ml` },
    { label: 'Per mL', value: formatMass(dosing.perMl), note: 'concentration' },
    { label: 'Per spray', value: formatMass(dosing.perSpray), note: `at ${SPRAY_ML} mL a spray` },
    { label: 'Sprays', value: `~${dosing.spraysPerBottle}`, note: 'per bottle, before priming' },
  ]

  const formats = [
    {
      name: 'Nasal spray',
      tier,
      prep: 'Ready to use',
      delivery: 'Intranasal, no needles',
      to: null,
      current: true,
    },
    vial && {
      name: 'Vial',
      tier: vial,
      prep: 'Reconstitute with bacteriostatic water',
      delivery: 'Insulin syringe',
      to: spray.compoundPath,
    },
    pen && {
      name: 'Pen',
      tier: pen,
      prep: 'Pre-filled, dial-in dose',
      delivery: 'Pen needle',
      to: '/pens',
    },
  ].filter(Boolean)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={socialImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialImage} />
      </Helmet>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: fullName,
          description,
          category: `Nasal Spray · ${spray.positioning}`,
          ...(image ? { image: [`${SITE_URL}${vialStill(image.names[0])}`, socialImage] } : {}),
          brand: { '@type': 'Brand', name: 'STRIATA' },
          url,
          offers: {
            '@type': 'Offer',
            name: `${fullName} ${tier.dose}`,
            sku: `STRIATA-${spray.id}`,
            price: tier.price,
            priceCurrency: 'ZAR',
            availability: 'https://schema.org/InStock',
            url,
            seller: { '@type': 'Organization', name: 'STRIATA' },
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Nasal Sprays', item: `${SITE_URL}/nasal-sprays` },
            { '@type': 'ListItem', position: 2, name: fullName, item: url },
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

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link to="/nasal-sprays" className="hover:text-[#00B4B4] transition-colors">
                  Nasal Sprays
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70 truncate">{spray.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,360px)_1fr] gap-10 lg:gap-16 items-start">
            <div className="max-w-[240px] sm:max-w-[280px] mx-auto w-full lg:max-w-none lg:sticky lg:top-28">
              <VialShot image={image} alt={`${fullName}, 10ml amber bottle from STRIATA`} priority />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full"
                  style={H}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  In stock
                </span>
                <span className="text-[11px] text-[#00B4B4] bg-[#00B4B4]/10 px-3 py-1 rounded-full border border-[#00B4B4]/20">
                  {spray.positioning}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4" style={H}>
                {spray.name} <span className="text-[#00B4B4]">Nasal Spray</span>
              </h1>

              {content?.lede && (
                <p className="text-white/70 text-lg leading-relaxed mb-4 max-w-2xl">{content.lede}</p>
              )}
              <p className="text-white/50 leading-relaxed mb-8 max-w-2xl">{spray.description}</p>

              <div className="flex items-center justify-between max-w-md bg-[#00B4B4]/8 border border-[#00B4B4]/25 rounded-2xl px-5 py-4 mb-6">
                <div>
                  <p className="text-white/35 text-[11px] font-bold uppercase tracking-widest mb-1" style={H}>
                    1 bottle
                  </p>
                  <p className="text-white/80 font-mono text-sm">{tier.dose}</p>
                </div>
                <p className="text-white text-2xl font-black tabular-nums" style={H}>
                  {rand(tier.price)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <AddToOrder product={spray} tier={tier} format="Nasal Spray" href={spray.page} imageName={image?.names[0] ?? null} />
                <a href={enquiryLink(spray, tier, 'Nasal Spray')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg gap-2">
                  {WA_ICON}
                  Ask on WhatsApp
                </a>
              </div>
              <a href="#formats" className="inline-block mt-4 text-sm text-white/55 hover:text-[#00B4B4] transition-colors">
                Compare spray, vial and pen
              </a>
              <p className="mt-3 text-white/30 text-xs">VAT inclusive · Shipped nationwide from Johannesburg · Research use only</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S IN EACH SPRAY ── */}
      <section className="px-6 py-14 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={H}>
              What&rsquo;s in each spray
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-2xl">
              The spray arrives already in solution, so the arithmetic is done for you. Figures assume a standard{' '}
              {SPRAY_ML} mL metered pump.
            </p>
          </Reveal>
          <Reveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map(({ label, value, note }) => (
              <div key={label} className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5">
                <p className="text-white/35 text-[11px] font-bold uppercase tracking-widest mb-2" style={H}>
                  {label}
                </p>
                <p className="text-white text-2xl md:text-3xl font-black tabular-nums" style={H}>
                  {value}
                </p>
                <p className="text-white/35 text-xs mt-1">{note}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {content && (
        <section className="px-6 py-16 border-t border-white/5">
          <Reveal className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
              Why {spray.name} as a nasal spray
            </h2>
            {content.intranasal.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-white/60 leading-relaxed mb-5 last:mb-0">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </section>
      )}

      {/* ── ABOUT (the brief's write-up) ── */}
      <section className="px-6 py-16 border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6" style={H}>
            About {spray.name}
          </h2>
          {spray.writeup.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-white/60 leading-relaxed mb-5 last:mb-0">
              {paragraph}
            </p>
          ))}
          {spray.compoundPath && (
            <Link
              to={spray.compoundPath}
              className="inline-flex items-center gap-1 mt-6 text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors"
            >
              Read the full {spray.name} compound profile <span aria-hidden="true">→</span>
            </Link>
          )}
        </Reveal>
      </section>

      {content && (
        <>
          {/* ── RESEARCH ── */}
          <section className="px-6 py-16 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={H}>
                  What the research covers
                </h2>
                <p className="text-white/40 text-sm mb-10 max-w-2xl">
                  Published findings, not promised outcomes. Studies are listed under Sources below.
                </p>
              </Reveal>
              <Reveal stagger className="grid md:grid-cols-3 gap-4">
                {content.researchNotes.map((item) => (
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

              <Reveal className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-6 md:p-7">
                <h3 className="text-amber-200 font-bold mb-2" style={H}>
                  Where the evidence is thin
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{content.caveat}</p>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ── FORMATS ── */}
      <section id="formats" className="scroll-mt-28 px-6 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={H}>
              Spray, vial or pen
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-2xl">
              {spray.name} comes in all three formats. The compound is the same; what changes is the preparation and how
              it goes in.
            </p>
          </Reveal>
          <Reveal stagger className="grid md:grid-cols-3 gap-4">
            {formats.map((f) => (
              <div
                key={f.name}
                className={`rounded-2xl p-6 border ${
                  f.current ? 'bg-[#00B4B4]/8 border-[#00B4B4]/40' : 'bg-[#0d1e35] border-white/8'
                }`}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-white font-bold text-lg" style={H}>
                    {f.name}
                  </h3>
                  {f.current && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B4B4]" style={H}>
                      This page
                    </span>
                  )}
                </div>
                <p className="text-white text-2xl font-black tabular-nums mb-1" style={H}>
                  {rand(f.tier.price)}
                </p>
                <p className="text-white/40 font-mono text-xs mb-5">{f.tier.dose}</p>
                <dl className="text-sm flex flex-col gap-2 mb-5">
                  <div>
                    <dt className="text-white/30 text-[11px] uppercase tracking-widest">Preparation</dt>
                    <dd className="text-white/65">{f.prep}</dd>
                  </div>
                  <div>
                    <dt className="text-white/30 text-[11px] uppercase tracking-widest">Delivery</dt>
                    <dd className="text-white/65">{f.delivery}</dd>
                  </div>
                </dl>
                {f.to && (
                  <Link to={f.to} className="text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
                    See the {f.name.toLowerCase()} →
                  </Link>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
              Using a nasal spray properly
            </h2>
          </Reveal>
          <ol className="flex flex-col gap-4">
            {HOW_TO.map((step, i) => (
              <Reveal key={step.title} as="li" className="flex gap-4">
                <span
                  className="w-8 h-8 rounded-full bg-[#00B4B4]/10 text-[#00B4B4] text-sm font-bold grid place-items-center shrink-0"
                  style={H}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1" style={H}>
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            <h3 className="text-white font-bold text-lg mb-3" style={H}>
              Storage
            </h3>
            <p className="text-white/60 leading-relaxed">
              Keep the bottle upright with the cap on, and in the fridge once opened. The amber glass protects the
              solution from light, but not from heat: don&rsquo;t leave it in a parked car or a sunny window,
              especially in a South African summer. Don&rsquo;t freeze it, and don&rsquo;t share a nozzle between
              people.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      {content?.faqs?.length > 0 && (
        <section className="px-6 py-16 border-t border-white/5">
          <Reveal className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
              Questions about the {spray.name} spray
            </h2>
            <div>
              {content.faqs.map((faq) => (
                <FaqItem key={faq.q} {...faq} />
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ── SOURCES ── */}
      {content?.sources?.length > 0 && (
        <section className="px-6 py-12 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4" style={H}>
              Sources
            </h2>
            <ol className="list-decimal pl-5 flex flex-col gap-2 text-white/45 text-xs leading-relaxed marker:text-white/25">
              {content.sources.map((source) => (
                <li key={source.url + source.label}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#00B4B4] underline decoration-white/15 underline-offset-2 transition-colors"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
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
              <h3 className="text-white font-bold text-lg mt-2 mb-2 group-hover:text-[#00B4B4] transition-colors" style={H}>
                {guidePost.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{guidePost.preview}</p>
            </Link>
          </Reveal>
        </section>
      )}

      {/* ── OTHER SPRAYS ── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8" style={H}>
              {related.length ? 'Often paired with it' : 'The rest of the range'}
            </h2>
          </Reveal>
          <Reveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[...related, ...others].slice(0, 4).map((item) => {
              const shot = vialImage(item)
              return (
                <Link
                  key={item.id}
                  to={item.page}
                  {...spotlightProps()}
                  className="spot bg-[#0d1e35] border border-white/8 rounded-2xl p-4 hover:border-[#00B4B4]/40 transition-colors group flex flex-col items-center text-center"
                >
                  {shot && (
                    <img
                      src={vialSrc(shot.names[0], 320)}
                      alt=""
                      width={320}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-32 object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <h3
                    className="text-white font-bold text-sm group-hover:text-[#00B4B4] transition-colors leading-snug"
                    style={H}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[#00B4B4]/80 text-[11px] mt-0.5">{item.positioning}</p>
                  <p className="text-white/40 text-xs mt-1">{rand(item.prices[0].price)}</p>
                </Link>
              )
            })}
          </Reveal>
        </div>
      </section>

      {/* ── CLOSER ── */}
      <section className="px-6 py-20 border-t border-white/5">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4" style={H}>
            Order {fullName} in South Africa
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            Add it to your order slip and send it when you&rsquo;re ready. We&rsquo;ll confirm stock, pricing and
            delivery on WhatsApp before you pay a cent.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <AddToOrder product={spray} tier={tier} format="Nasal Spray" href={spray.page} imageName={image?.names[0] ?? null} />
            <Link to="/nasal-sprays" className="btn btn-ghost btn-lg">
              All nasal sprays
            </Link>
          </div>
          <p className="mt-6 text-white/30 text-xs">For Research Use Only — not for human consumption.</p>
        </Reveal>
      </section>
    </div>
  )
}
