import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getTool } from '../data/toolsData'
import { getGuide } from '../data/guidesData'
import { whatsappLink } from '../data/products'
import { DEFAULT_MAX_BAC_WATER_ML } from '../data/calculatorData'
import ReconstitutionCalculator from '../components/ReconstitutionCalculator'
import JsonLd from '../components/JsonLd'

const TOOL = getTool('reconstitution-calculator')
const URL = 'https://www.striatalabs.co.za/tools/reconstitution-calculator'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const STEPS = [
  {
    n: '01',
    title: 'Concentration',
    formula: 'mg in vial ÷ mL of water',
    example: '5 mg ÷ 2 mL = 2.5 mg/mL (2,500 mcg/mL)',
    body: 'More water means a weaker solution and a bigger, easier-to-read draw. Every STRIATA vial is capped at 3 mL, apart from NAD+ and Glutathione, which take up to 10 mL.',
  },
  {
    n: '02',
    title: 'Volume to draw',
    formula: 'dose ÷ concentration',
    example: '0.25 mg ÷ 2.5 mg/mL = 0.1 mL',
    body: 'Keep the units matched: a dose in mcg against a concentration in mcg/mL, or convert first. The calculator handles the conversion for you.',
  },
  {
    n: '03',
    title: 'Syringe units',
    formula: 'mL × 100 (U-100) or × 40 (U-40)',
    example: '0.1 mL × 100 = 10 units',
    body: 'On a U-100 insulin syringe every unit is 0.01 mL. Results are rounded to the nearest half-unit, the smallest mark most people can read reliably.',
  },
]

const FAQ = [
  {
    q: 'How much bacteriostatic water should I add?',
    a: `There is no single right answer. It only changes how strong the solution is, not how much peptide is in the vial. Aim for a volume that turns your usual dose into a comfortable draw of roughly 5 to 50 units, and stay within the ${DEFAULT_MAX_BAC_WATER_ML} mL limit for the vial.`,
  },
  {
    q: 'What is the difference between a U-100 and a U-40 syringe?',
    a: 'A U-100 syringe has 100 units per mL, so 1 unit is 0.01 mL. A U-40 has 40 units per mL, so 1 unit is 0.025 mL. The same dose is a different number of units on each, which is why the toggle matters. U-100 is the standard in South Africa.',
  },
  {
    q: 'My dose comes out to more than 100 units. What now?',
    a: 'That is more than one full 1 mL syringe. Either draw it across two syringes, or reconstitute the vial with less water so the solution is stronger and the same dose is a smaller draw.',
  },
  {
    q: 'Does the calculator store anything?',
    a: 'No. All of the maths runs in your browser. Nothing you enter is sent anywhere or saved.',
  },
]

export default function ReconstitutionCalculatorPage() {
  const guide = getGuide(TOOL.relatedGuide)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Peptide Reconstitution Calculator | STRIATA Tools</title>
        <meta name="description" content="Free peptide reconstitution calculator: choose your vial, enter the bacteriostatic water, and get the concentration plus the exact mL and insulin syringe units to draw for any dose." />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="Peptide Reconstitution Calculator | STRIATA Tools" />
        <meta property="og:description" content="Work out concentration, mL and syringe units for any peptide dose in seconds." />
        <meta property="og:url" content={URL} />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: TOOL.title,
        description: TOOL.preview,
        url: URL,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'ZAR' },
        publisher: { '@type': 'Organization', name: 'STRIATA', url: 'https://www.striatalabs.co.za' },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tools', item: 'https://www.striatalabs.co.za/tools' },
          { '@type': 'ListItem', position: 2, name: TOOL.title, item: URL },
        ],
      }} />

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#00B4B4] text-sm transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tools
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-3 py-1.5 rounded-full"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Calculator
            </span>
            <span className="text-white/30 text-sm">Runs in your browser. Nothing is stored.</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 max-w-3xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Peptide Reconstitution <span className="text-[#00B4B4]">Calculator</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
            Choose the vial, enter the bacteriostatic water you are adding, and read off the units to draw for your dose.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <ReconstitutionCalculator />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 pb-20 border-t border-white/5 pt-20">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The maths behind it
          </h2>
          <p className="text-white text-2xl md:text-3xl font-black mb-10 max-w-2xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Three steps. Learn them once and they apply to every vial you will ever handle.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map(s => (
              <div key={s.n} className="bg-[#0d1e35] border border-white/8 rounded-2xl p-7">
                <span className="text-[#00B4B4]/50 text-sm font-black tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>{s.n}</span>
                <h3 className="text-white font-bold text-lg mt-2 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{s.title}</h3>
                <p className="text-[#00B4B4] font-semibold text-sm mb-1 tabular-nums">{s.formula}</p>
                <p className="text-white/40 text-xs mb-4 tabular-nums">{s.example}</p>
                <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDE + FAQ ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
          {guide && (
            <Link
              to={`/guides/${guide.slug}`}
              className="group relative bg-[#0d1e35] border border-[#00B4B4]/25 rounded-2xl p-8 hover:border-[#00B4B4]/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden block lg:sticky lg:top-28"
            >
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#00B4B4]/8 rounded-full translate-x-20 -translate-y-20 pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
                  Full guide · {guide.readTime}
                </span>
                <h3
                  className="text-white font-bold text-xl leading-snug mt-3 mb-3 group-hover:text-[#00B4B4] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {guide.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  The step-by-step procedure, equipment, storage and injection technique this calculator sits alongside.
                </p>
                <span className="inline-flex items-center gap-1 text-[#00B4B4] text-sm font-semibold">
                  Read the guide
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          <div>
            <h2
              className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Common questions
            </h2>
            <div className="space-y-3">
              {FAQ.map(f => (
                <details key={f.q} className="group bg-[#0d1e35] border border-white/8 rounded-2xl open:border-[#00B4B4]/30 transition-colors">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-white font-semibold text-base" style={{ fontFamily: 'var(--font-heading)' }}>
                    {f.q}
                    <svg className="w-4 h-4 text-white/40 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/8 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Not Sure About <span className="text-[#00B4B4]">a Number?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Send us the vial, the water and the dose and we will confirm the draw. We would rather answer a question than have you guess.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
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
