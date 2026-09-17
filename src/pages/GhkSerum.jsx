import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { whatsappLink } from '../data/products'
import { prefersReducedMotion, spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'

const H = { fontFamily: 'var(--font-heading)' }
// Cut-out (transparent) for the hero stage; the original on white stays for og:image.
const IMG = (w) => `${import.meta.env.BASE_URL}assets/opt/ghk-serum-cut-${w}.webp`

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const CHECK = (
  <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const STRENGTHS = [
  {
    id: '1%',
    label: '1% Copper Peptide',
    price: 549,
    tag: 'Daily use',
    blurb: 'The everyday serum. Gentle enough for morning and night, for every skin type, and the right place to start if copper peptides are new to your routine.',
    points: ['GHK-Cu 1% + Hyaluronic Acid 1%', 'Morning and night', 'All skin types, including sensitive'],
  },
  {
    id: '2%',
    label: '2% Copper Peptide',
    price: 795,
    tag: 'Concentrated',
    blurb: 'Double the copper peptide for skin that is already comfortable with actives, or for targeted work on fine lines, texture and post-procedure recovery.',
    points: ['GHK-Cu 2% + Hyaluronic Acid', 'Once daily, building to twice', 'For established routines'],
  },
]

const BENEFITS = [
  {
    title: 'Collagen & firmness',
    desc: 'GHK-Cu is a signalling peptide — it tells skin cells to build. It is studied for its role in collagen and elastin production, which is what keeps skin feeling firm and springy.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: 'Deep hydration',
    desc: 'Hyaluronic acid holds many times its weight in water. Paired with the peptide it plumps, cushions and keeps the skin barrier comfortable while the active does its work.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21a8.25 8.25 0 005.83-14.08L12 1.5 6.17 6.92A8.25 8.25 0 0012 21z" />
      </svg>
    ),
  },
  {
    title: 'Repair & recovery',
    desc: 'Copper peptides are best known in the research literature for wound healing and tissue remodelling — the same processes that help skin bounce back from sun, stress and treatments.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: 'Calm, even tone',
    desc: 'GHK-Cu has antioxidant and soothing properties in studies, which is why it suits reactive skin that struggles with harsher actives like retinoids and acids.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

const STEPS = [
  { n: '01', title: 'Cleanse', desc: 'Start on clean, slightly damp skin. Damp skin helps the hyaluronic acid pull in and hold water.' },
  { n: '02', title: 'Three to four drops', desc: 'Dispense into your palm or straight onto the face. A little goes a long way — the bottle should last six to eight weeks.' },
  { n: '03', title: 'Press, don\'t rub', desc: 'Pat over the face and neck and let it absorb for a minute. It sinks in clear; the blue is the copper, not a tint.' },
  { n: '04', title: 'Seal and protect', desc: 'Follow with your moisturiser. In the morning, finish with SPF — always, but especially while using actives.' },
]

const FAQ = [
  {
    q: 'Which strength should I start with?',
    a: 'The 1%. It is the daily-driver formula and suits every skin type. Move to the 2% once your skin is settled on it and you want a more concentrated dose for targeted work.',
  },
  {
    q: 'Can I use it with vitamin C or retinol?',
    a: 'Yes, but not in the same step. Copper and strong direct acids or vitamin C are best kept apart — use the serum in one routine and the acid or vitamin C in the other. Retinol at night and the serum in the morning is a simple, well-tolerated split.',
  },
  {
    q: 'Why is the serum blue?',
    a: 'That is the copper. GHK-Cu is naturally blue in solution and the colour is a good sign — it means the peptide-copper complex is intact. It goes on clear.',
  },
  {
    q: 'How long until I see a difference?',
    a: 'Hydration is immediate. Texture and firmness are slower — think in weeks, not days, with the biggest changes usually reported after eight to twelve weeks of consistent use.',
  },
]

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
        <span className="text-white font-semibold group-hover:text-[#00B4B4] transition-colors" style={H}>{q}</span>
        <svg className={`w-4 h-4 text-[#00B4B4] shrink-0 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="text-white/60 text-sm leading-relaxed pb-5">{a}</p>
        </div>
      </div>
    </div>
  )
}

/**
 * The product shot, staged on the site's navy: a warm glow that breathes
 * behind the bottle, the bottle floating on a CSS loop, a mirrored
 * reflection beneath, ingredient badges bobbing on their own rhythm, and the
 * whole card tilting toward the cursor on pointer devices.
 */
function SerumStage() {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || prefersReducedMotion() || !window.matchMedia('(hover: hover)').matches) return

    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.9, ease: 'power3.out' })
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const dx = (e.clientX - r.left) / r.width - 0.5
      const dy = (e.clientY - r.top) / r.height - 0.5
      ry(dx * 10)
      rx(dy * -8)
    }
    const onLeave = () => { rx(0); ry(0) }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="serum-perspective mx-auto w-full max-w-md lg:max-w-none">
      <div
        ref={cardRef}
        className="serum-card relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-gradient-to-b from-[#12213d] via-[#0d1e35] to-[#0A1628] border border-white/10 shadow-2xl shadow-black/50"
      >
        {/* Breathing glow */}
        <div className="serum-glow absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(212,160,60,0.55)_0%,rgba(0,180,180,0.35)_40%,transparent_68%)] blur-3xl" aria-hidden="true" />

        {/* Fine label-style rings */}
        <div className="absolute inset-6 rounded-[2rem] border border-white/[0.07]" aria-hidden="true" />
        <div className="absolute inset-9 rounded-[1.6rem] border border-white/[0.04]" aria-hidden="true" />

        {/* Bottle + reflection */}
        <div className="absolute inset-0 flex items-end justify-center pb-[13%]">
          <div className="serum-float relative w-[46%]">
            {/* Contact glow under the base */}
            <span className="absolute left-1/2 top-[98%] -translate-x-1/2 w-[110%] h-[7%] rounded-[50%] bg-[#00B4B4]/40 blur-xl" aria-hidden="true" />
            <img
              src={IMG(336)}
              alt="STRIATA Labs GHK-Cu Serum, 30 ml blue glass dropper bottle"
              width={336}
              height={1002}
              decoding="async"
              fetchPriority="high"
              className="relative z-[1] w-full h-auto drop-shadow-[0_24px_36px_rgba(0,0,0,0.55)]"
            />
            <img
              src={IMG(336)}
              alt=""
              aria-hidden="true"
              width={336}
              height={1002}
              decoding="async"
              className="serum-reflection absolute left-0 top-full w-full h-auto opacity-40"
            />
          </div>
        </div>

        {/* Floating ingredient badges */}
        {[
          { text: 'GHK-Cu 1% · 2%', cls: 'top-[13%] left-[7%]', delay: '0s' },
          { text: 'Hyaluronic Acid 1%', cls: 'top-[26%] right-[6%]', delay: '-1.6s' },
          { text: '30 ml · 1 fl oz', cls: 'bottom-[22%] left-[6%]', delay: '-3.1s' },
          { text: 'All skin types', cls: 'bottom-[10%] right-[8%]', delay: '-2.3s' },
        ].map(({ text, cls, delay }) => (
          <span
            key={text}
            className={`serum-badge absolute ${cls} z-[2] inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/70 backdrop-blur border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg shadow-black/30`}
            style={{ ...H, animationDelay: delay }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            {text}
          </span>
        ))}

        {/* Corner mark */}
        <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35" style={H}>
          Restore · Hydrate · Renew
        </span>
      </div>
    </div>
  )
}

export default function GhkSerum() {
  const [strength, setStrength] = useState(STRENGTHS[0])

  const waHref = `${whatsappLink}?text=${encodeURIComponent(
    `Hi STRIATA, I'd like to order the *GHK-Cu Serum ${strength.id}* (30 ml) @ R ${strength.price}. Please send me payment details.`,
  )}`

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>GHK-Cu Copper Peptide Serum | STRIATA South Africa</title>
        <meta name="description" content="STRIATA Labs GHK-Cu Serum: 1% or 2% copper peptide with hyaluronic acid in a 30 ml dropper. Restore, hydrate, renew. From R549, delivered across South Africa." />
        <link rel="canonical" href="https://www.striatalabs.co.za/ghk-serum" />
        <meta property="og:title" content="GHK-Cu Copper Peptide Serum | STRIATA South Africa" />
        <meta property="og:description" content="Copper peptide + hyaluronic acid serum, 1% and 2% strengths. Restore. Hydrate. Renew." />
        <meta property="og:url" content="https://www.striatalabs.co.za/ghk-serum" />
        <meta property="og:image" content="https://www.striatalabs.co.za/assets/opt/ghk-serum-960.webp" />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'STRIATA Labs GHK-Cu Serum',
        description: 'Copper peptide (GHK-Cu) and hyaluronic acid face serum, 30 ml, available in 1% and 2% strengths.',
        image: 'https://www.striatalabs.co.za/assets/opt/ghk-serum-960.webp',
        brand: { '@type': 'Brand', name: 'STRIATA' },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'ZAR',
          lowPrice: 549,
          highPrice: 795,
          offerCount: 2,
          availability: 'https://schema.org/InStock',
          url: 'https://www.striatalabs.co.za/ghk-serum',
        },
      }} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 md:pt-36 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'radial-gradient(circle at 75% 35%, #D4A03C 0%, transparent 40%), radial-gradient(circle at 15% 70%, #00B4B4 0%, transparent 45%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal stagger delay={0.1} className="order-2 lg:order-1">
            <Link to="/catalogue?cat=skin" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold mb-6 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              Skin, Hair & Anti-Aging
            </Link>
            <span className="block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4B4]/10 border border-[#00B4B4]/20 text-[#00B4B4] text-xs font-semibold uppercase tracking-widest mb-6" style={H}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
                Topical · Copper Peptide Skincare
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] mb-5" style={H}>
              GHK-Cu <span className="text-shimmer">Serum</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-4" style={H}>
              The copper peptide your skin makes less of every year — back in the bottle.
            </p>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              GHK-Cu is a naturally occurring copper tripeptide found in human plasma. Levels fall steadily from our twenties, and with them the signals that keep skin firm, hydrated and quick to recover. Our serum pairs it with hyaluronic acid in a 30 ml dropper, in two strengths.
            </p>

            {/* Strength picker */}
            <div className="grid sm:grid-cols-2 gap-3 mb-5" role="radiogroup" aria-label="Choose a strength">
              {STRENGTHS.map((s) => {
                const active = s.id === strength.id
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setStrength(s)}
                    className={`text-left rounded-2xl border px-5 py-4 transition-all duration-300 cursor-pointer ${
                      active
                        ? 'border-[#00B4B4]/60 bg-[#00B4B4]/10 shadow-lg shadow-[#00B4B4]/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-bold" style={H}>{s.label}</span>
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#00B4B4]' : 'border-white/25'}`}>
                        {active && <span className="w-2 h-2 rounded-full bg-[#00B4B4]" />}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-[#00B4B4] text-xs font-semibold">{s.tag}</span>
                      <span className="text-white font-black text-xl tabular-nums" style={H}>R {s.price}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {WA_ICON}
                Order {strength.id} · R {strength.price}
              </a>
              <a href="#strengths" className="btn btn-ghost btn-lg">
                Compare Strengths
                <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>
            <p className="mt-5 text-white/40 text-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              In stock · 30 ml · Free delivery nationwide
            </p>
          </Reveal>

          <Reveal delay={0.3} y={40} className="order-1 lg:order-2">
            <SerumStage />
          </Reveal>
        </div>
      </section>

      {/* ── WHY GHK-CU ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto">
          <Reveal stagger className="max-w-3xl mb-12">
            <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>Why copper peptides</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4" style={H}>
              One molecule, <span className="text-[#00B4B4]">four jobs</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Most actives do one thing well. GHK-Cu is unusual in that it is a signal, not a scrub — it changes what skin cells do rather than stripping anything away. That is why it plays nicely with sensitive skin and slots into almost any routine.
            </p>
          </Reveal>

          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map(({ title, desc, icon }) => (
              <div key={title} {...spotlightProps()} className="spot rounded-2xl border border-white/8 bg-[#0d1e35] p-6 hover:border-[#00B4B4]/30 transition-all duration-300 hover:-translate-y-1">
                <span className="w-11 h-11 rounded-xl bg-[#00B4B4]/10 border border-[#00B4B4]/25 text-[#00B4B4] flex items-center justify-center mb-4">{icon}</span>
                <p className="text-white font-bold mb-2" style={H}>{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── STRENGTHS ────────────────────────────────────────────────── */}
      <section id="strengths" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <Reveal stagger className="max-w-3xl mb-12">
            <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>Two strengths</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4" style={H}>
              Start at 1%. <span className="text-[#00B4B4]">Step up when ready.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Same base, same hyaluronic acid, same 30 ml dropper. The only difference is how much copper peptide is in the bottle.
            </p>
          </Reveal>

          <Reveal stagger className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {STRENGTHS.map((s, i) => (
              <div
                key={s.id}
                {...spotlightProps()}
                className={`spot rounded-3xl p-8 border ${i === 0 ? 'border-[#00B4B4]/40 bg-gradient-to-br from-[#00B4B4]/12 to-[#0d1e35]' : 'border-white/10 bg-[#0d1e35]'}`}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-1" style={H}>{s.tag}</p>
                    <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight" style={H}>{s.label}</h3>
                  </div>
                  <p className="text-white font-black text-3xl tabular-nums shrink-0" style={H}>R {s.price}</p>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{s.blurb}</p>
                <ul className="space-y-2.5 mb-8">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/75">{CHECK}{p}</li>
                  ))}
                </ul>
                <a
                  href={`${whatsappLink}?text=${encodeURIComponent(`Hi STRIATA, I'd like to order the *GHK-Cu Serum ${s.id}* (30 ml) @ R ${s.price}. Please send me payment details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-lg w-full ${i === 0 ? 'btn-primary' : 'btn-outline'}`}
                >
                  {WA_ICON}
                  Order the {s.id}
                </a>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── HOW TO USE ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          <Reveal stagger>
            <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>How to use</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4" style={H}>
              Sixty seconds, <span className="text-[#00B4B4]">twice a day</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              No layering rules to memorise. Clean skin, a few drops, press it in, moisturise. Patch-test on the inner arm first if your skin is reactive.
            </p>
            <div className="rounded-2xl border border-white/8 bg-[#0d1e35] p-5">
              <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-3" style={H}>On the label</p>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex justify-between gap-4"><span>GHK-Cu</span><span className="text-white font-semibold">1% or 2%</span></li>
                <li className="flex justify-between gap-4"><span>Hyaluronic acid</span><span className="text-white font-semibold">1%</span></li>
                <li className="flex justify-between gap-4"><span>Volume</span><span className="text-white font-semibold">30 ml · 1 fl oz</span></li>
                <li className="flex justify-between gap-4"><span>Suitable for</span><span className="text-white font-semibold">All skin types</span></li>
                <li className="flex justify-between gap-4"><span>Use</span><span className="text-white font-semibold">External only</span></li>
              </ul>
            </div>
          </Reveal>

          <Reveal stagger className="grid sm:grid-cols-2 gap-4">
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="rounded-2xl border border-white/8 bg-[#0d1e35] p-6">
                <p className="text-[#00B4B4] text-[10px] font-bold tracking-[0.25em] mb-3" style={H}>{n}</p>
                <p className="text-white font-bold text-lg mb-2" style={H}>{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal stagger className="mb-8">
            <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>Good to know</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight" style={H}>
              Questions we <span className="text-[#00B4B4]">get asked</span>
            </h2>
          </Reveal>
          <Reveal className="rounded-3xl border border-white/8 bg-[#0d1e35] px-7">
            {FAQ.map((f) => <FaqItem key={f.q} {...f} />)}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/12 via-transparent to-transparent" />
        <Reveal stagger className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-5" style={H}>
            Restore. Hydrate. <span className="text-[#00B4B4]">Renew.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Pick your strength and order on WhatsApp. We'll confirm, take payment and dispatch — usually the same day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {STRENGTHS.map((s) => (
              <a
                key={s.id}
                href={`${whatsappLink}?text=${encodeURIComponent(`Hi STRIATA, I'd like to order the *GHK-Cu Serum ${s.id}* (30 ml) @ R ${s.price}. Please send me payment details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-lg ${s.id === '1%' ? 'btn-primary' : 'btn-ghost'}`}
              >
                {WA_ICON}
                {s.id} · R {s.price}
              </a>
            ))}
          </div>
          <p className="mt-6 text-white/35 text-xs leading-relaxed max-w-xl mx-auto">
            For external use only. Avoid the eye area. Discontinue if irritation occurs. This page is informational and does not constitute medical advice.
          </p>
        </Reveal>
      </section>
    </div>
  )
}
