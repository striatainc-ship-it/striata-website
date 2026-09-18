import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { whatsappLink } from '../data/products'
import { spotlightProps } from '../lib/motion'
import Reveal from '../components/Reveal'
import AddToOrder from '../components/AddToOrder'

// The two ways to buy the protocol, as order-slip lines. The payment plan goes
// on the slip at its first instalment, since that is what is paid on order.
const RESET = { id: 'menopause-reset', name: 'The Menopause Reset' }
const FULL_KIT = { dose: 'Full 12-week kit', price: 8950, inStock: true }
const PLAN = { dose: '3-month payment plan', price: 3000, inStock: true }

const ENQUIRY_EMAIL = 'info@striatalabs.co.za'
const WA_MSG = "Hi STRIATA, I'd like to enquire about *The Menopause Reset* 12-week protocol and how to find a practitioner."
const WA_HREF = `${whatsappLink}?text=${encodeURIComponent(WA_MSG)}`

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const MAIL_ICON = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const CHECK = (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const H = { fontFamily: 'var(--font-heading)' }

/* Each stack owns a colour so the four clusters read as distinct at a glance,
   while every accent stays inside the navy/teal system. */
const STACKS = [
  {
    num: '01',
    name: 'RESTFUL',
    subtitle: 'Sleep & Nervous System',
    tagline: 'For the 3 a.m. wake-ups and the wired-but-tired exhaustion that no amount of magnesium fixes.',
    body: "Oestrogen and progesterone modulate the GABA system — the brain's braking mechanism. When they withdraw, night-time cortisol climbs and sleep architecture fragments. RESTFUL works on both ends: reducing daytime hyperarousal, and deepening slow-wave sleep at night.",
    targets: ['Early-morning wakings', 'Cortisol hyperarousal', 'Disrupted sleep architecture'],
    begins: 'Week 1',
    vials: 7,
    color: '#8B9CF6',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'RADIANT',
    subtitle: 'Skin, Collagen & Antioxidant Support',
    tagline: 'Women lose roughly 30% of skin collagen in the first five years post-menopause — which is why wrinkles seem to surface overnight.',
    body: 'Oestrogen drives collagen synthesis and holds back the enzymes that break the extracellular matrix down. Without it, collagen declines around 2.1% per year. RADIANT combines a copper-peptide and repair-peptide stack with a cellular antioxidant to support collagen signalling and reduce the oxidative load that accelerates skin aging.',
    targets: ['Collagen loss', 'Skin laxity and crepey texture', 'Oxidative stress', 'Slow dermal repair'],
    begins: 'Week 3',
    vials: 6,
    color: '#F2B8A0',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    num: '05',
    name: 'IGNITE',
    subtitle: 'Libido, Arousal & Intimacy',
    tagline: "Desire is a brain process before it's a body one.",
    body: 'Menopausal changes to sexual function run on two tracks — local tissue changes, and central changes in how desire and arousal are generated. IGNITE works on the central track, on the hypothalamic circuitry behind desire rather than on blood flow, paired with a compound that supports bonding and sensory receptivity.',
    targets: ['Loss of desire', 'Reduced arousal', 'Intimacy avoidance', 'Reduced sensitivity'],
    begins: 'Week 1, as needed',
    vials: 5,
    color: '#F98C7A',
    note: 'IGNITE requires a cardiovascular screen before first use, including a resting blood pressure check. Your practitioner will complete this with you.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
  },
  {
    num: '06',
    name: 'RENEW',
    subtitle: 'Cellular Anti-Aging & GH Restoration',
    tagline: 'For the "I\'m aging in fast-forward" feeling.',
    body: "The somatopause — the decline in growth hormone pulsing with age — runs in parallel with menopause and produces many of the same effects: visceral fat gain, lean mass loss, poor sleep, fatigue. Oestrogen stimulates GH release directly, so its withdrawal accelerates the process. RENEW works to restore the body's own GH pulse pattern rather than replacing the hormone.",
    targets: ['Somatopause', 'Visceral adiposity', 'Fatigue and poor recovery', 'Accelerated cellular aging'],
    begins: 'Week 1',
    vials: 3,
    color: '#00B4B4',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
]

const TOTAL_VIALS = STACKS.reduce((n, s) => n + s.vials, 0)

const SYMPTOMS = [
  { title: 'Sleep that breaks at 3 a.m.', desc: "and won't restart, alongside a wired-but-exhausted feeling during the day." },
  { title: 'Skin changing faster than it should', desc: 'roughly 30% of skin collagen is lost in the first five years post-menopause.' },
  { title: 'Libido and arousal dropping away', desc: 'often quite suddenly.' },
  { title: 'Body composition shifting', desc: 'more visceral fat, less lean mass, slower recovery, persistent fatigue.' },
]

const PHASES = [
  {
    weeks: 'Weeks 1–2',
    title: 'Foundation',
    desc: 'RESTFUL and RENEW start together — sleep and GH restoration first, because most of what follows works better once those two are stable. IGNITE becomes available in Week 1 on an as-needed basis.',
    stacks: ['RESTFUL', 'RENEW', 'IGNITE'],
  },
  {
    weeks: 'Weeks 3–12',
    title: 'Full Protocol',
    desc: 'RADIANT joins from Week 3. Staging it this way means fewer new injections introduced at once, and gives you time to settle into the first two stacks.',
    stacks: ['RESTFUL', 'RENEW', 'IGNITE', 'RADIANT'],
  },
  {
    weeks: 'Week 12',
    title: 'Review',
    desc: 'Bloodwork repeated, symptoms reassessed against your baseline. From there: a maintenance protocol at reduced frequency, or a four-week washout before a second cycle.',
    stacks: [],
  },
]

const NOT_SUITABLE = [
  'Are pregnant or breastfeeding',
  'Have an active or suspected malignancy, particularly a hormone-sensitive cancer',
  'Have significant liver or kidney impairment',
  'Have a known sensitivity to any component',
]

const BLOODWORK = ['Full blood count', 'Metabolic & liver panel', 'Glucose & HbA1c', 'Full hormone panel', 'Thyroid function', 'IGF-1', 'Lipids', 'Inflammatory markers']

const stackColor = (name) => STACKS.find((s) => s.name === name)?.color

function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal stagger className="max-w-3xl mb-12">
      {eyebrow && (
        <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4" style={H}>{title}</h2>
      {children && <p className="text-white/60 text-lg leading-relaxed">{children}</p>}
    </Reveal>
  )
}

export default function MenopauseReset() {
  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Menopause Reset: 12-Week Peptide Protocol | STRIATA</title>
        <meta name="description" content="A 12-week, four-stack peptide protocol for menopause: sleep, skin and collagen, libido and cellular anti-aging. 21 vials over 84 days, South Africa." />
        <link rel="canonical" href="https://www.striatalabs.co.za/stacks/menopause-reset" />
        <meta property="og:title" content="Menopause Reset: 12-Week Peptide Protocol | STRIATA" />
        <meta property="og:description" content="A 12-week, four-stack protocol built around the four symptom clusters of menopause. Supplied through your practitioner." />
        <meta property="og:url" content="https://www.striatalabs.co.za/stacks/menopause-reset" />
      </Helmet>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 15% 40%, #F2B8A0 0%, transparent 45%), radial-gradient(circle at 85% 20%, #00B4B4 0%, transparent 45%), radial-gradient(circle at 70% 90%, #8B9CF6 0%, transparent 40%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1628]/40 to-[#0A1628]" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal stagger delay={0.1}>
            <Link to="/stacks" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs font-semibold mb-6 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
              Peptide Stacks
            </Link>
            <span className="block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B4B4]/10 border border-[#00B4B4]/20 text-[#00B4B4] text-xs font-semibold uppercase tracking-widest mb-6" style={H}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
                Practitioner-Supplied Protocol
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] mb-5" style={H}>
              The Menopause <span className="text-shimmer">Reset</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-4" style={H}>
              A 12-week, four-stack protocol — supplied through your practitioner.
            </p>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Menopause isn't one thing going wrong. It's several systems shifting at once — and that's why single-fix approaches so often disappoint. The Reset is an 84-day kit built around the four symptom clusters that tend to arrive together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                {WA_ICON}
                Enquire on WhatsApp
              </a>
              <a href="#pricing" className="btn btn-ghost btn-lg">
                See Pricing
                <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </a>
            </div>
          </Reveal>

          {/* Kit at a glance */}
          <Reveal delay={0.35}>
            <div {...spotlightProps()} className="spot rounded-3xl border border-white/10 bg-[#0d1e35]/80 backdrop-blur p-6 md:p-8">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-5" style={H}>The kit at a glance</p>
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { n: '12', l: 'Weeks' },
                  { n: '4', l: 'Stacks' },
                  { n: String(TOTAL_VIALS), l: 'Vials' },
                ].map(({ n, l }) => (
                  <div key={l} className="rounded-2xl bg-white/[0.04] border border-white/8 px-3 py-4 text-center">
                    <p className="text-white font-black text-3xl md:text-4xl leading-none mb-1 tabular-nums" style={H}>{n}</p>
                    <p className="text-white/45 text-xs">{l}</p>
                  </div>
                ))}
              </div>
              <ul className="space-y-2.5">
                {STACKS.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-white font-bold text-sm tracking-wide w-20" style={H}>{s.name}</span>
                    <span className="text-white/45 text-xs flex-1 truncate">{s.subtitle}</span>
                    <span className="text-white/60 text-xs tabular-nums">{s.vials} vials</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 pt-5 border-t border-white/8 text-white/40 text-xs leading-relaxed">
                All 21 vials supplied lyophilised, with every millilitre of bacteriostatic water included.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY MULTI-SYSTEM ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="The Approach" title={<>Why a <span className="text-[#00B4B4]">Multi-System</span> Approach</>}>
            Oestrogen and progesterone don't only regulate reproduction. Their withdrawal cascades through three separate systems — the reproductive axis, the stress axis, and the growth hormone axis — at the same time. That's why the symptom list is so scattered, and why it rarely responds to one intervention.
          </SectionHeading>

          <Reveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SYMPTOMS.map(({ title, desc }, i) => (
              <div
                key={title}
                {...spotlightProps()}
                className="spot rounded-2xl border border-white/8 bg-[#0d1e35] p-6 hover:border-white/20 transition-colors duration-300"
              >
                <p className="text-[10px] font-bold tracking-widest mb-4" style={{ ...H, color: STACKS[i].color }}>0{i + 1}</p>
                <p className="text-white font-bold mb-2 leading-snug" style={H}>{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10 text-white/40 text-sm">
            The Reset maps each cluster to its underlying mechanism, then to a specific stack.
          </Reveal>
        </div>
      </section>

      {/* ── THE FOUR STACKS ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What's Inside" title={<>The <span className="text-[#00B4B4]">Four Stacks</span></>}>
            Each stack targets one symptom cluster. Together they cover ground that diet, supplements and GLP-1 protocols generally don't reach.
          </SectionHeading>

          <div className="grid lg:grid-cols-2 gap-5">
            {STACKS.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05}>
                <article
                  {...spotlightProps()}
                  className="spot h-full rounded-3xl border border-white/8 bg-[#0d1e35] p-7 md:p-9 flex flex-col hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  style={{ '--stack': s.color }}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <span
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                        style={{ color: s.color, backgroundColor: `${s.color}14`, borderColor: `${s.color}40` }}
                      >
                        {s.icon}
                      </span>
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] mb-1" style={{ ...H, color: s.color }}>{s.num}</p>
                        <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight leading-none" style={H}>{s.name}</h3>
                        <p className="text-white/50 text-sm mt-1.5">{s.subtitle}</p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/60 bg-white/5 border border-white/8 rounded-full px-3 py-1.5 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                      Begins {s.begins}
                    </span>
                  </div>

                  <p className="text-white/80 italic leading-relaxed mb-4 border-l-2 pl-4" style={{ borderColor: s.color }}>
                    {s.tagline}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mb-6 flex-1">{s.body}</p>

                  <div>
                    <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-2.5" style={H}>Targets</p>
                    <div className="flex flex-wrap gap-2">
                      {s.targets.map((t) => (
                        <span key={t} className="text-xs text-white/70 bg-white/5 border border-white/8 rounded-full px-3 py-1">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:hidden mt-5 text-xs text-white/50">Begins {s.begins}</div>

                  {s.note && (
                    <p className="mt-6 pt-5 border-t border-white/8 text-xs text-white/50 leading-relaxed flex gap-2.5">
                      <svg className="w-4 h-4 shrink-0 mt-px" style={{ color: s.color }} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                      {s.note}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── KIT + TIMELINE ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* Kit */}
          <div>
            <SectionHeading eyebrow="The Kit" title={<>{TOTAL_VIALS} Vials, <span className="text-[#00B4B4]">84 Days</span></>}>
              All supplied lyophilised, covering the full 12 weeks. All required bacteriostatic water is included.
            </SectionHeading>

            <Reveal className="rounded-3xl border border-white/8 bg-[#0d1e35] p-6 md:p-7">
              <div className="flex h-3 rounded-full overflow-hidden mb-6 gap-0.5">
                {STACKS.map((s) => (
                  <span key={s.name} style={{ width: `${(s.vials / TOTAL_VIALS) * 100}%`, backgroundColor: s.color }} />
                ))}
              </div>
              <ul className="space-y-3">
                {STACKS.map((s) => (
                  <li key={s.name} className="flex items-center gap-3 text-sm">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-white font-bold tracking-wide flex-1" style={H}>{s.name}</span>
                    <span className="text-white/60 tabular-nums">{s.vials} vials</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-sm pt-3 border-t border-white/8">
                  <span className="w-2.5 h-2.5 shrink-0" />
                  <span className="text-white font-bold flex-1" style={H}>Total</span>
                  <span className="text-[#00B4B4] font-bold tabular-nums">{TOTAL_VIALS} vials</span>
                </li>
              </ul>
              <p className="mt-6 text-white/40 text-xs leading-relaxed">
                Your practitioner will confirm the full compound list, dosing, and reconstitution instructions as part of your protocol.
              </p>
            </Reveal>
          </div>

          {/* Timeline */}
          <div>
            <SectionHeading eyebrow="The Schedule" title={<>How the <span className="text-[#00B4B4]">12 Weeks</span> Run</>} />

            <Reveal stagger className="relative">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-[#00B4B4]/60 via-white/15 to-transparent hidden sm:block" aria-hidden="true" />
              {PHASES.map((p, i) => (
                <div key={p.title} className="relative sm:pl-14 pb-10 last:pb-0">
                  <span className="hidden sm:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-[#0A1628] border border-[#00B4B4]/40 text-[#00B4B4] items-center justify-center text-xs font-black" style={H}>
                    {i + 1}
                  </span>
                  <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-1" style={H}>{p.weeks}</p>
                  <h3 className="text-white font-black text-xl md:text-2xl tracking-tight mb-2" style={H}>{p.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-3 max-w-xl">{p.desc}</p>
                  {p.stacks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.stacks.map((name) => (
                        <span key={name} className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide rounded-full px-2.5 py-1 border" style={{ ...H, color: stackColor(name), borderColor: `${stackColor(name)}40`, backgroundColor: `${stackColor(name)}12` }}>
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BEFORE YOU START ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Screening" title={<>Before You <span className="text-[#00B4B4]">Start</span></>}>
            The Reset begins with baseline bloodwork. This isn't a formality — it establishes your reference values, confirms the protocol is appropriate for you, and gives you and your practitioner something concrete to measure against at Week 12.
          </SectionHeading>

          <Reveal stagger className="grid md:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-white/8 bg-[#0d1e35] p-7">
              <p className="text-white font-bold mb-4" style={H}>Your practitioner will typically request</p>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {BLOODWORK.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-white/65">
                    <span className="text-[#00B4B4]">{CHECK}</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#F98C7A]/25 bg-[#F98C7A]/[0.05] p-7">
              <p className="text-white font-bold mb-4" style={H}>This protocol is not suitable if you:</p>
              <ul className="space-y-2.5 mb-5">
                {NOT_SUITABLE.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F98C7A] shrink-0 mt-2" />
                    {n}
                  </li>
                ))}
              </ul>
              <p className="text-white/50 text-xs leading-relaxed">
                The IGNITE stack specifically is withheld or requires physician sign-off if you have uncontrolled high blood pressure, or a history of angina, heart attack, or stroke within the past 12 months.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-5 rounded-2xl border border-white/8 bg-[#0d1e35] px-6 py-5 flex gap-4 items-start">
            <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 text-white/60 flex items-center justify-center shrink-0">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12h6m-6 4h6M7.5 3.75H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5" /></svg>
            </span>
            <p className="text-white/60 text-sm leading-relaxed">
              <span className="text-white font-semibold">Bring your full medication list to your consultation.</span> Some medications — particularly blood pressure medications, nitrates, and erectile dysfunction drugs — interact with parts of this protocol.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT YOU'LL SUPPLY ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <SectionHeading eyebrow="Your Side" title={<>What You'll <span className="text-[#00B4B4]">Need to Supply</span></>}>
            Everything peptide-related comes with the kit. Two items you'll source yourself, both available at any pharmacy without a prescription.
          </SectionHeading>
          <Reveal stagger className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Insulin syringes', desc: '1 ml (100u), 29–31 gauge, 8 mm needle. A box of 100 covers the protocol comfortably.' },
              { title: 'Sterile alcohol swabs', desc: 'For vial stoppers and skin prep.' },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/8 bg-[#0d1e35] p-6">
                <p className="text-white font-bold mb-1.5" style={H}>{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Pricing" title={<>Two Ways to <span className="text-[#00B4B4]">Pay</span></>}>
            Delivery at our standard (R150) or express (R200) rate. Lead time 3–5 business days.
          </SectionHeading>

          <Reveal stagger className="grid md:grid-cols-2 gap-5 max-w-4xl">
            <div {...spotlightProps()} className="spot relative rounded-3xl border border-[#00B4B4]/40 bg-gradient-to-br from-[#00B4B4]/12 to-[#0d1e35] p-8">
              <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest text-[#0A1628] bg-[#00B4B4] rounded-full px-2.5 py-1" style={H}>Saves R 50</span>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3" style={H}>Full 12-week kit</p>
              <p className="text-white font-black text-4xl md:text-5xl tracking-tight mb-1" style={H}>R 8,950</p>
              <p className="text-white/50 text-sm mb-6">once-off</p>
              <ul className="space-y-2 text-sm text-white/70 mb-8">
                <li className="flex gap-2"><span className="text-[#00B4B4]">{CHECK}</span>The full kit arrives at the start</li>
                <li className="flex gap-2"><span className="text-[#00B4B4]">{CHECK}</span>Standard or express delivery</li>
              </ul>
              <AddToOrder
                product={RESET}
                tier={FULL_KIT}
                format="Protocol"
                href="/stacks/menopause-reset"
                detail="Once-off, full kit shipped at the start"
                className="btn btn-primary btn-lg w-full"
              />
            </div>

            <div {...spotlightProps()} className="spot rounded-3xl border border-white/10 bg-[#0d1e35] p-8">
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3" style={H}>3-month payment plan</p>
              <p className="text-white font-black text-4xl md:text-5xl tracking-tight mb-1" style={H}>R 3,000 <span className="text-white/40 text-2xl">× 3</span></p>
              <p className="text-white/50 text-sm mb-6">R 9,000 total</p>
              <ul className="space-y-2 text-sm text-white/70 mb-8">
                <li className="flex gap-2"><span className="text-[#00B4B4]">{CHECK}</span>Month 1 dispatched on order</li>
                <li className="flex gap-2"><span className="text-[#00B4B4]">{CHECK}</span>Month 2 at Week 4, Month 3 at Week 8</li>
                <li className="flex gap-2"><span className="text-[#00B4B4]">{CHECK}</span>Standard or express delivery on each shipment</li>
              </ul>
              <AddToOrder
                product={RESET}
                tier={PLAN}
                format="Protocol"
                href="/stacks/menopause-reset"
                detail="First of 3 instalments (R 3,000 × 3, R 9,000 total)"
                className="btn btn-outline btn-lg w-full"
              />
            </div>
          </Reveal>

          <p className="mt-5 max-w-4xl text-sm text-white/55">
            Questions first?{' '}
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="text-[#00B4B4] font-semibold hover:underline underline-offset-2">
              Ask us on WhatsApp
            </a>
            .
          </p>

          <Reveal className="mt-5 text-white/40 text-sm max-w-4xl">
            On the payment plan, each month's supply is dispatched when that month's payment clears.
          </Reveal>
        </div>
      </section>

      {/* ── HOW TO ORDER ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/12 via-transparent to-transparent" />
        <Reveal stagger className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3" style={H}>How to Order</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-5" style={H}>
            Supplied Through <span className="text-[#00B4B4]">Registered Practitioners</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Your practitioner handles your baseline screening, builds your individual protocol, and takes you through reconstitution, storage, and administration before you begin.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              {WA_ICON}
              Find a Practitioner
            </a>
            <a href={`mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent('The Menopause Reset enquiry')}`} className="btn btn-ghost btn-lg">
              {MAIL_ICON}
              {ENQUIRY_EMAIL}
            </a>
          </div>
          <p className="text-white/40 text-sm">
            Purity guaranteed at ≥99%. Manufacturer Certificate of Analysis available on request.
          </p>
        </Reveal>
      </section>

      {/* ── DISCLAIMER ───────────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto rounded-2xl border border-white/8 bg-[#060e1a] px-6 py-5">
          <p className="text-white/35 text-xs leading-relaxed">
            All STRIATA products are supplied for research purposes only and are not intended for human or veterinary use. This page is informational and does not constitute medical advice. It is not a diagnosis, a treatment recommendation, or a substitute for consultation with a qualified healthcare professional. Nothing here should be used to self-treat or to self-administer any compound. Speak to your doctor before beginning any protocol, particularly if you have an existing medical condition or take prescription medication. Pricing subject to change without notice.
          </p>
        </div>
      </section>
    </div>
  )
}
