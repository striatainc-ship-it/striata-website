import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { whatsappLink, products, isInStock, productPath, vialSrc } from '../data/products'
import { prefersReducedMotion } from '../lib/motion'
import { SA_ESSENTIALS } from '../data/learnLinks'
import ReviewBadges from '../components/ReviewBadges'

const BASE = import.meta.env.BASE_URL
const H = { fontFamily: 'var(--font-heading)' }

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ARROW = (
  <svg className="w-4 h-4 shrink-0 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 12h14m-6-6 6 6-6 6" />
  </svg>
)

const IN_STOCK_COUNT = products.filter(isInStock).length
const bySlug = (slug) => products.find((p) => p.slug === slug)
const fromPrice = (product) =>
  `from R ${Math.min(...product.prices.map((t) => t.price)).toLocaleString('en-ZA')}`

// The four vials in the range photograph, left to right.
const RANGE = ['retatrutide', 'tirzepatide', 'bpc-157-tb-500-wolverine-stack', 'ghk-cu']
  .map(bySlug)
  .filter(Boolean)

// Each goal is shown with a real vial from that part of the catalogue rather
// than an icon: the product is the most characteristic thing we have.
const categories = [
  { label: 'Recovery & Performance', desc: 'Push harder. Lift heavier. Break limits.', to: '/catalogue/recovery-peptides', vial: 'bpc-157-tb-500-wolverine-stack', vialName: 'BPC-157 + TB-500' },
  { label: 'Skin, Hair & Anti-Aging', desc: 'Regenerate. Rejuvenate. Renew.', to: '/catalogue/skin-anti-aging-peptides', vial: 'ghk-cu', vialName: 'GHK-Cu' },
  { label: 'Hormonal & Sexual Health', desc: 'Optimise. Balance. Perform.', to: '/catalogue/hormonal-health-peptides', vial: 'pt-141', vialName: 'PT-141' },
  { label: 'Weight Loss & Metabolism', desc: 'Optimise your metabolism. Reclaim your body.', to: '/catalogue/weight-loss-peptides', vial: 'retatrutide', vialName: 'Retatrutide' },
  { label: 'Brain, Mood & Sleep', desc: 'Sharpen your mind. Sustain your drive.', to: '/catalogue/nootropic-peptides', vial: 'semax', vialName: 'Semax' },
  { label: 'Immunity & Longevity', desc: 'Age on your terms. Stay ahead of time.', to: '/catalogue/immunity-longevity-peptides', vial: 'thymosin-alpha-1', vialName: 'Thymosin Alpha-1' },
]

// Verbatim from the STRIATA Labs Google Business Profile (read 2026-10-23),
// newest first. Kept out of Review/AggregateRating schema on purpose: Google
// treats reviews a business shows about itself as self-serving.
const GOOGLE_REVIEWS_URL = 'https://maps.google.com/?cid=12845544918200623913'

const testimonials = [
  {
    text: 'Outstanding service from start to finish. Communication was clear and prompt, ordering was straightforward, and delivery was impressively fast. A genuinely positive experience. I\'d happily recommend them!',
    name: 'Mahdi Goodarzi',
  },
  {
    text: 'Honestly, such a great experience dealing with Striata. From placing the order to receiving it, everything was so easy. They were really helpful, kept us updated throughout, and responded quickly whenever we had questions. We weren’t expecting the order to arrive the very next day, so that was a really nice surprise. Definitely happy with the service and will be ordering again. Highly recommend!',
    name: 'Lilian ugochukwu',
  },
  {
    text: 'Great service from Striata, fast delivery. Would recommend them to everyone',
    name: 'David Viljoen',
  },
  {
    text: 'Excellent service from start to finish! Delivery is always fast, efficient, and reliable, and the team is incredibly helpful and responsive. They never hesitate to answer any questions and genuinely take the time to guide and support you throughout the process. I would highly recommend Striata Labs and their team to anyone looking to become the best version of themselves. Their professionalism, dedication, and commitment to their clients truly stand out! ⭐️',
    name: 'Maseeha Kathrada',
  },
  {
    text: 'Professional and Fast Service',
    name: 'Domonique Re',
  },
  {
    text: 'Excellent service from start to finish! The ordering process was smooth, communication was fantastic, and all our questions were answered quickly. We received regular updates and, best of all, our product arrived the very next day. Highly recommended — outstanding service!',
    name: 'Francois Bezuidenhout',
  },
  {
    text: 'Wow, what a great experience very help full and professional, they realy do make an effort not like all the other places i have ordered from i would really recommend using them doing a gr8 job keep ot going striata labs you are really helping people to become their best self and we all Appreciate it thank you very much',
    name: 'Bianca Botha',
  },
  {
    text: 'Thank you for answering all my questions and showing certification without hesitation. I had a smooth ordering process and the products were well recieved. Great quality and great service 👏 👍',
    name: 'Ashleigh Gunning',
  },
]

const GOOGLE_G = (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

const Stars = ({ className = 'w-3.5 h-3.5' }) => (
  <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, j) => (
      <svg key={j} className={`${className} text-amber-300`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </span>
)

const standards = [
  {
    title: '99% purity guaranteed',
    desc: 'Every batch is held to a minimum 99% purity standard. No fillers, no compromises. Just the compound, exactly as it should be.',
  },
  {
    title: 'Research grade only',
    desc: 'All STRIATA peptides are research-grade quality, sourced from trusted suppliers and handled with the precision the science demands.',
  },
  {
    title: 'South African based',
    desc: 'We are proudly South African. Local stock, local support and fast nationwide delivery, with no waiting weeks for international shipments.',
  },
]

const bulkPoints = [
  {
    title: 'Competitive bulk pricing',
    desc: 'The more you order, the better your rate. We work with businesses of all sizes to find a pricing structure that makes sense.',
  },
  {
    title: 'Reliable stock availability',
    desc: 'We maintain consistent local stock levels so your business never has to wait. No backorders, no surprises.',
  },
  {
    title: 'Dedicated support',
    desc: 'Your business gets direct WhatsApp support and a dedicated contact for all orders, queries and restocking needs.',
  },
]

const H2 = 'text-3xl md:text-[2.75rem] font-black text-white leading-[1.08]'

function TestimonialCard({ t, ...rest }) {
  return (
    <figure {...rest} className="w-[300px] md:w-[360px] mr-10 md:mr-14 shrink-0 flex flex-col border-t border-white/12 pt-6">
      <Stars />
      <blockquote className="text-white/75 text-[15px] leading-relaxed mt-4 mb-6 flex-1">“{t.text}”</blockquote>
      <figcaption className="flex items-center gap-2.5 text-sm">
        {GOOGLE_G}
        <span className="text-white font-semibold" style={H}>{t.name}</span>
      </figcaption>
    </figure>
  )
}

export default function Home() {
  const videoRef = useRef(null)

  // The hero clip is decorative, so it is attached from here rather than in
  // the markup, once the main thread is idle, and the poster carries the look
  // until then. It was desktop-only while the clip was 2.1 MB; re-encoded to
  // ~150 KB it costs a phone less than one product photo, so it now plays
  // everywhere — except for visitors who asked for reduced motion or less data.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (prefersReducedMotion() || navigator.connection?.saveData) return

    let cancelled = false
    const start = () => {
      if (cancelled) return
      for (const [ext, type] of [['webm', 'video/webm'], ['mp4', 'video/mp4']]) {
        const source = document.createElement('source')
        source.src = `${BASE}assets/hero-video.${ext}`
        source.type = type
        video.appendChild(source)
      }
      // iOS only autoplays a video it knows is muted, and React sets `muted`
      // as a property that the prerendered markup does not carry. Set it every
      // way Safari checks before asking it to play.
      video.muted = true
      video.defaultMuted = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      // load() resets playbackRate to defaultPlaybackRate, so set both.
      video.defaultPlaybackRate = 0.5
      video.load()
      video.playbackRate = 0.5
      video.play().catch(() => {})
    }

    const hasIdle = 'requestIdleCallback' in window
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 3000 })
      : window.setTimeout(start, 1500)
    return () => {
      cancelled = true
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [])

  return (
    <div className="bg-[#141C3A]">
      <Helmet>
        <title>Peptides South Africa | STRIATA Labs, Johannesburg</title>
        <meta name="description" content="Research-grade peptides in South Africa: BPC-157, Retatrutide, Tirzepatide, GHK-Cu and 30+ compounds at 99%+ purity. Johannesburg based. Order on WhatsApp." />
        <link rel="canonical" href="https://www.striatalabs.co.za/" />
        <meta property="og:title" content="Peptides South Africa | STRIATA Labs, Johannesburg" />
        <meta property="og:description" content="South Africa's premier source for research-grade peptides. 99%+ purity guaranteed. Think Strong. Train Smarter." />
        <meta property="og:url" content="https://www.striatalabs.co.za/" />
      </Helmet>

      {/* ── HERO ───────────────────────────────────
          Type sits on the left, the vial in the clip keeps the right. They
          used to share the centre, so the label ran through the copy. */}
      <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={`${BASE}assets/opt/hero-video-poster-1280.webp`}
          className="absolute inset-0 w-full h-full object-cover object-right opacity-20 md:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141C3A] via-[#141C3A]/85 to-[#141C3A]/10 md:via-[#141C3A]/70 md:via-45% md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141C3A]/70 via-transparent to-[#141C3A]" />

        <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-14">
          <div className="max-w-2xl">
            {/* The slogan stays the visual headline; the H1 is the sentence
                that says what the site is, so the page heading carries the
                keyword rather than the tagline. */}
            <p
              className="font-black text-white text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] leading-[0.98] mb-7"
              style={{ ...H, letterSpacing: '-0.022em', fontVariationSettings: "'opsz' 96" }}
            >
              <span className="block">Think strong.</span>
              <span className="block">Train smarter.</span>
            </p>
            <h1 className="text-base md:text-xl text-white/75 max-w-xl mb-10 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-body)', letterSpacing: 'normal', wordSpacing: '0.05em' }}>
              South Africa's premier source for research-grade peptides. Purity you can trust. Performance you can feel.
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {WA_ICON}
                Enquire on WhatsApp
              </a>
              <Link to="/catalogue" className="btn btn-ghost btn-lg">
                Browse the catalogue
                {ARROW}
              </Link>
            </div>
          </div>
        </div>

        {/* What a first-time visitor checks before anything else. */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-10">
          <dl className="grid grid-cols-2 md:grid-cols-4 border-t border-white/15 text-sm">
            {[
              [`${IN_STOCK_COUNT} compounds`, 'in stock now'],
              ['99% purity', 'certificate on request'],
              ['Johannesburg', 'local stock, nationwide delivery'],
              ['5.0 on Google', 'customer reviews'],
            ].map(([term, detail]) => (
              <div key={term} className="pt-4 pr-4 pb-1">
                <dt className="text-white font-semibold" style={H}>{term}</dt>
                <dd className="text-white/50 mt-0.5">{detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── THE RANGE ──────────────────────────────
          The photograph was a 20%-opacity backdrop behind three pinned
          slogans. Shown properly, it does more than the slogans did. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 md:pt-28">
        <div className="md:flex md:items-end md:justify-between gap-10 mb-10">
          <h2 className={`${H2} max-w-xl`} style={H}>The compounds people ask for first</h2>
          <Link to="/catalogue" className="hidden md:inline-flex items-center gap-2 text-[#2FBCAB] hover:text-white font-semibold text-sm transition-colors">
            All {IN_STOCK_COUNT} in the catalogue
            {ARROW}
          </Link>
        </div>

        <img
          src={`${BASE}assets/opt/home-vials-1920.webp`}
          srcSet={`${BASE}assets/opt/home-vials-768.webp 768w, ${BASE}assets/opt/home-vials-1280.webp 1280w, ${BASE}assets/opt/home-vials-1920.webp 1920w`}
          sizes="(min-width: 1280px) 1216px, 100vw"
          alt="STRIATA Retatrutide, Tirzepatide, BPC-157 + TB-500 and GHK-Cu vials"
          width={2688}
          height={1152}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[21/9] object-cover object-[86%_50%] md:object-center rounded-3xl"
        />

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8">
          {RANGE.map((product) => (
            <li key={product.slug}>
              <Link
                to={productPath(product)}
                className="group flex items-start justify-between gap-3 border-b border-white/10 py-5 hover:border-[#2FBCAB]/60 transition-colors"
              >
                <span>
                  <span className="block text-white font-semibold text-[15px] sm:text-base group-hover:text-[#2FBCAB] transition-colors" style={H}>
                    {product.slug === 'bpc-157-tb-500-wolverine-stack' ? 'BPC-157 + TB-500' : product.name}
                  </span>
                  <span className="block text-white/50 text-sm mt-0.5 tabular-nums">{fromPrice(product)}</span>
                </span>
                <span className="hidden sm:block text-white/35 group-hover:text-[#2FBCAB] transition-colors mt-1">{ARROW}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CATEGORIES ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 mb-12 md:items-end">
          <h2 className={H2} style={H}>What are you training for?</h2>
          <p className="text-white/60 text-lg max-w-md md:justify-self-end">
            Explore our full catalogue of research-grade peptides, each category precision-selected to support your goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-white/10">
          {categories.map(({ label, desc, to, vial, vialName }) => (
            <Link
              key={label}
              to={to}
              className="group flex items-center gap-5 border-b border-white/10 py-6 hover:border-[#2FBCAB]/60 transition-colors"
            >
              <img
                src={vialSrc(vial, 160)}
                alt={`STRIATA ${vialName} vial`}
                width={160}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-11 h-[5.5rem] object-contain shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-1"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-white font-semibold text-lg leading-snug group-hover:text-[#2FBCAB] transition-colors" style={H}>
                  {label}
                </span>
                <span className="block text-white/50 text-sm mt-1">{desc}</span>
              </span>
              <span className="text-white/30 group-hover:text-[#2FBCAB] transition-colors">{ARROW}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ABOUT SNAPSHOT ────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0F152E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-12 gap-x-16 gap-y-10 items-center">
          <img
            src={`${BASE}assets/opt/dispatch-1280.webp`}
            srcSet={`${BASE}assets/opt/dispatch-640.webp 640w, ${BASE}assets/opt/dispatch-1280.webp 1280w`}
            sizes="(min-width: 768px) 660px, 100vw"
            alt="STRIATA GHK-Cu vials being packed into an insulated box with ice packs"
            width={1280}
            height={724}
            loading="lazy"
            decoding="async"
            className="md:col-span-7 rounded-3xl w-full object-cover aspect-[4/3]"
          />
          <div className="md:col-span-5">
            <h2 className={`${H2} mb-6`} style={H}>Built by people who believe in better</h2>
            <p className="text-white/65 leading-relaxed mb-4">
              STRIATA was founded in 2021 by a team with deep roots in the health and medical supply industry. When the world was navigating the uncertainty of a global pandemic, we were already on the ground, sourcing and supplying critical medical products to those who needed them most.
            </p>
            <p className="text-white/65 leading-relaxed mb-8">
              STRIATA was built to fill the gap. To bring world-class, research-grade peptides to South Africans at pricing that doesn't punish you for wanting to take your health seriously.
            </p>
            <Link to="/about" className="btn btn-ghost btn-md">
              Learn more about us
              {ARROW}
            </Link>
          </div>
        </div>
      </section>

      {/* ── STANDARDS ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-4 mb-14 md:items-end">
          <h2 className={H2} style={H}>Purity you can count on</h2>
          <p className="text-white/60 text-lg max-w-md md:justify-self-end">
            We don't cut corners. Every product in the STRIATA catalogue meets strict research-grade standards so you always know exactly what you're getting.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-8 mb-20">
          {standards.map(({ title, desc }) => (
            <div key={title} className="border-t border-white/15 pt-6">
              <h3 className="text-white font-bold text-xl mb-3" style={H}>{title}</h3>
              <p className="text-white/55 text-[15px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={`${BASE}assets/opt/purity-1920.webp`}
            srcSet={`${BASE}assets/opt/purity-768.webp 768w, ${BASE}assets/opt/purity-1280.webp 1280w, ${BASE}assets/opt/purity-1920.webp 1920w`}
            sizes="(min-width: 1280px) 1216px, 100vw"
            alt="Lab purity standards"
            width={2816}
            height={1536}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative bg-gradient-to-r from-[#141C3A] via-[#141C3A]/85 to-[#141C3A]/10 px-7 py-12 md:px-14 md:py-20">
            <div className="max-w-md">
              <p className="eyebrow mb-4">Certificate of Analysis</p>
              <h3 className="text-white text-3xl md:text-4xl font-black mb-4 leading-[1.1]" style={H}>
                Ask us for the CoA. We'll send it.
              </h3>
              <p className="text-white/65 mb-8">
                Full transparency on every product. Third-party verified, no questions asked.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md">
                {WA_ICON}
                Request a CoA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BULK & BUSINESS ───────────────────────── */}
      <section className="py-24 md:py-32 bg-[#0F152E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-12 gap-x-16 gap-y-12">
          <div className="md:col-span-5">
            <h2 className={`${H2} mb-6`} style={H}>Stocking for your business?</h2>
            <p className="text-white/60 text-lg mb-9">
              STRIATA supplies clinics, wellness centres, gyms and health retailers across South Africa with bulk research-grade peptides at competitive pricing.
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {WA_ICON}
              Enquire about bulk orders
            </a>
          </div>
          <div className="md:col-span-7 border-t border-white/10">
            {bulkPoints.map(({ title, desc }) => (
              <div key={title} className="grid sm:grid-cols-[14rem_1fr] gap-x-8 gap-y-2 border-b border-white/10 py-7">
                <h3 className="text-white font-bold text-lg" style={H}>{title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-14 md:flex md:items-end md:justify-between gap-10">
          <div>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 mb-5 text-sm text-white/70 hover:text-white transition-colors"
            >
              {GOOGLE_G}
              <span className="font-semibold tabular-nums">5.0</span>
              <Stars />
              <span>on Google Reviews</span>
            </a>
            <h2 className={H2} style={H}>What our customers are saying</h2>
            <p className="text-white/50 text-sm mt-4">
              Word for word from our Google Business Profile.{' '}
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="text-[#2FBCAB] hover:text-white transition-colors">
                Read them all on Google
              </a>
            </p>
          </div>
          <div className="mt-8 md:mt-0 flex flex-col md:items-end gap-3 shrink-0">
            <p className="text-white/55 text-sm">Bought from us? We&rsquo;d value your review.</p>
            <ReviewBadges />
          </div>
        </div>

        {/* Two copies: -50% lands on copy two, which matches copy one. The
            duration scales with the list so the scroll speed stays constant. */}
        <div className="marquee">
          <div className="marquee-track" style={{ animationDuration: `${testimonials.length * 11}s` }}>
            {[0, 1].map((copy) =>
              testimonials.map((t, i) => (
                <TestimonialCard key={`${copy}-${i}`} t={t} aria-hidden={copy > 0 ? 'true' : undefined} />
              )),
            )}
          </div>
        </div>
      </section>

      {/* ── START HERE (SA essentials) ────────────── */}
      <section className="py-24 md:py-28 bg-[#0F152E]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-12 gap-x-16 gap-y-10">
          <div className="md:col-span-5">
            <h2 className={`${H2} mb-5`} style={H}>New to peptides in South Africa?</h2>
            <p className="text-white/60">
              Start with the questions we get asked most: what is legal, where to buy safely, and what the research says about the compounds people ask for first.
            </p>
          </div>
          <div className="md:col-span-7 border-t border-white/10">
            {SA_ESSENTIALS.map((e) => (
              <Link
                key={e.slug}
                to={`/learn/${e.slug}`}
                className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 hover:border-[#2FBCAB]/60 transition-colors"
              >
                <span className="text-white font-semibold group-hover:text-[#2FBCAB] transition-colors" style={H}>
                  {e.label}
                </span>
                <span className="text-white/30 group-hover:text-[#2FBCAB] transition-colors">{ARROW}</span>
              </Link>
            ))}
            <Link
              to="/learn"
              className="group flex items-center justify-between gap-4 py-4 text-[#2FBCAB] hover:text-white transition-colors"
            >
              <span className="font-semibold" style={H}>All 35 articles in the Learning Hub</span>
              {ARROW}
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-28 md:py-36">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.02]" style={{ ...H, letterSpacing: '-0.022em' }}>
            Ready to start?
          </h2>
          <p className="text-white/60 text-base md:text-xl mb-10 max-w-2xl">
            Browse our full catalogue, get a personalised price list or ask us anything. All on WhatsApp. Our team responds fast.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-xl">
              {WA_ICON}
              Chat to us on WhatsApp
            </a>
            <p className="text-white/50 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Typically responds within 1 hour during business hours
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
