import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { LANDING, QUESTIONS, RESULT_BASE, RESULT_COPY } from '../data/quizConfig'
import { quizProtocols } from '../data/quizProtocols'
import Reveal from '../components/Reveal'
import JsonLd from '../components/JsonLd'

/*
 * /quiz — the landing page is real prerendered content (intro, what the
 * quiz covers, every possible result as a crawlable link). The stepper is a
 * separate chunk that loads when the visitor presses Start, or a moment
 * after the page is idle, so it never blocks the page's own paint.
 */

const loadQuizFlow = () => import('../components/QuizFlow')
const QuizFlow = lazy(loadQuizFlow)

const URL = 'https://www.striatalabs.co.za/quiz'
const H = { fontFamily: 'var(--font-heading)' }

const ARROW = (
  <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const CHECK = (
  <svg className="w-4 h-4 text-[#00B4B4] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const KIND_LABEL = { product: 'Peptide', stack: 'Stack', menopause: 'Menopause Reset' }

export default function Quiz() {
  const [started, setStarted] = useState(false)
  const goals = QUESTIONS.find(q => q.id === 'goal').options

  // Warm the stepper chunk once the page is idle so Start feels instant.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((fn) => setTimeout(fn, 1500))
    const id = idle(() => { loadQuizFlow() })
    return () => (window.cancelIdleCallback ?? clearTimeout)(id)
  }, [])

  const start = () => {
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Which Peptide Protocol Is Right For You? Quiz | STRIATA</title>
        <meta name="description" content="A sixty-second quiz matching your goal, dosing preference and experience to the STRIATA stack or peptide people most often choose. No sign-up." />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="Which Peptide Protocol Is Right For You? | STRIATA Quiz" />
        <meta property="og:description" content="Four quick questions, an immediate match, and a link straight to the product." />
        <meta property="og:url" content={URL} />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Which Peptide Protocol Is Right For You?',
        description: LANDING.intro,
        url: URL,
        isPartOf: { '@type': 'WebSite', name: 'STRIATA', url: 'https://www.striatalabs.co.za' },
        hasPart: quizProtocols.map(p => ({ '@type': 'WebPage', name: p.name, url: `https://www.striatalabs.co.za${RESULT_BASE}/${p.slug}` })),
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tools', item: 'https://www.striatalabs.co.za/tools' },
          { '@type': 'ListItem', position: 2, name: 'Protocol Quiz', item: URL },
        ],
      }} />

      {started ? (
        /* ── STEPPER ── */
        <section className="relative pt-32 pb-24 px-6 min-h-screen">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <Suspense fallback={<div className="max-w-2xl mx-auto h-64 rounded-2xl bg-[#0d1e35]/60 animate-pulse" />}>
              <QuizFlow onRestart={() => setStarted(false)} />
            </Suspense>
          </div>
        </section>
      ) : (
        <>
          {/* ── HERO ── */}
          <section className="relative pt-40 pb-16 px-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
            <Reveal stagger delay={0.1} className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={H}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
                {LANDING.eyebrow}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-tight" style={H}>
                Which Protocol Is <span className="text-[#00B4B4]">Right For You?</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">{LANDING.intro}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button type="button" onClick={start} onMouseEnter={loadQuizFlow} onFocus={loadQuizFlow} className="btn btn-primary btn-lg">
                  {LANDING.start}
                  {ARROW}
                </button>
                <Link to="/stacks" className="btn btn-ghost btn-lg">Browse all stacks</Link>
              </div>
              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                {LANDING.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-white/60 text-sm leading-snug">
                    {CHECK}
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ── GOALS COVERED ── */}
          <section className="px-6 pb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5" style={H}>
                Goals the quiz covers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {goals.map(g => (
                  <div key={g.id} className="bg-[#0d1e35] border border-white/8 rounded-2xl px-5 py-4">
                    <p className="text-white font-bold text-sm" style={H}>{g.label}</p>
                    <p className="text-white/45 text-xs mt-1">{g.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ALL RESULTS ── */}
          <section className="px-6 pb-20 border-t border-white/5 pt-16">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-2" style={H}>
                Every possible match
              </h2>
              <p className="text-white/55 text-base mb-8 max-w-2xl">
                The quiz routes to one of these {quizProtocols.length} protocols and peptides. Each has its own page explaining what it is commonly used for and where to find it.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {quizProtocols.map(p => (
                  <li key={p.slug}>
                    <Link
                      to={`${RESULT_BASE}/${p.slug}`}
                      className="group flex items-center justify-between gap-3 bg-[#0d1e35] border border-white/8 rounded-xl px-4 py-3 hover:border-[#00B4B4]/40 transition-colors"
                    >
                      <span className="min-w-0">
                        <span className="block text-white text-sm font-semibold truncate group-hover:text-[#00B4B4] transition-colors" style={H}>{p.name}</span>
                        <span className="block text-white/35 text-xs">{KIND_LABEL[p.kind]}</span>
                      </span>
                      <svg className="w-4 h-4 text-white/30 shrink-0 group-hover:text-[#00B4B4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── DISCLAIMER + CTA ── */}
          <section className="py-20 px-6 relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/10 to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4" style={H}>
                Ready When <span className="text-[#00B4B4]">You Are</span>
              </h2>
              <p className="text-white/60 mb-8">Four questions. About a minute. Your match and the reading behind it, straight away.</p>
              <button type="button" onClick={start} onMouseEnter={loadQuizFlow} className="btn btn-primary btn-lg">
                {LANDING.start}
                {ARROW}
              </button>
              <p className="mt-8 text-white/30 text-xs leading-relaxed max-w-xl mx-auto">{RESULT_COPY.disclaimer}</p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
