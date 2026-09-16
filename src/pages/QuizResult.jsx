import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { quizProtocols, getQuizProtocol } from '../data/quizProtocols'
import { QUESTIONS, QUIZ_URL, RESULT_BASE, RESULT_COPY, answerLabel, tagsFromAnswers } from '../data/quizConfig'
import { getBlogPost } from '../data/blogPosts'
import { whatsappLink } from '../data/products'
import { matchProtocols, scoreProtocol, bucketTags, matchStrength, answersFromQuery } from '../lib/quizScoring'
import QuizLeadForm from '../components/QuizLeadForm'
import JsonLd from '../components/JsonLd'

/*
 * /quiz/result/{slug} — one prerendered page per protocol.
 *
 * Reached two ways:
 *   • from the quiz, with the answers in the query string, so the page can
 *     say why it matched and rank the runners-up against those answers;
 *   • directly from search or a shared link, with no answers, in which case
 *     it reads as a plain protocol page with same-goal alternatives.
 */

const ORIGIN = 'https://www.striatalabs.co.za'
const H = { fontFamily: 'var(--font-heading)' }
const QUESTION_IDS = QUESTIONS.map(q => q.id)

const KIND = {
  product: { label: 'Peptide', cta: 'View the product' },
  stack: { label: 'Stack', cta: 'View the stack' },
  menopause: { label: 'Menopause Reset', cta: 'View the protocol' },
}

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ARROW = (
  <svg className="w-4 h-4 btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const CHEVRON = (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

function NotFound() {
  return (
    <div className="bg-[#0A1628] min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-3xl font-black text-white mb-4" style={H}>Result not found</h1>
        <Link to={QUIZ_URL} className="text-[#00B4B4] hover:text-white transition-colors">Take the quiz</Link>
      </div>
    </div>
  )
}

function RunnerUpCard({ entry, search }) {
  const p = entry.protocol
  return (
    <Link
      to={`${RESULT_BASE}/${p.slug}${search}`}
      className="group block bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-all duration-200 hover:-translate-y-0.5"
    >
      <span className="text-white/35 text-xs font-bold uppercase tracking-widest" style={H}>{KIND[p.kind].label}</span>
      <p className="text-white font-semibold text-base leading-snug mt-1 mb-2 group-hover:text-[#00B4B4] transition-colors" style={H}>{p.name}</p>
      <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{p.summary}</p>
      <span className="inline-flex items-center gap-1 text-[#00B4B4] text-sm font-semibold mt-3">
        See this match {CHEVRON}
      </span>
    </Link>
  )
}

export default function QuizResult() {
  const { slug } = useParams()
  const { search } = useLocation()
  const protocol = getQuizProtocol(slug)
  const [copied, setCopied] = useState(false)

  if (!protocol) return <NotFound />

  const answers = answersFromQuery(search, QUESTION_IDS)
  const hasAnswers = Boolean(answers.goal)
  const tags = hasAnswers ? tagsFromAnswers(answers) : []
  const buckets = bucketTags(tags)

  let match = null
  let runnersUp = []
  let fallback = false
  if (hasAnswers) {
    const ranked = matchProtocols(quizProtocols, tags, { runnersUpCount: 3 })
    const isTop = ranked.top?.protocol.slug === slug
    match = isTop ? ranked.top : { protocol, ...scoreProtocol(protocol, buckets) }
    fallback = isTop && ranked.fallback
    runnersUp = [ranked.top, ...ranked.runnersUp].filter(r => r && r.protocol.slug !== slug).slice(0, 2)
  } else {
    runnersUp = quizProtocols
      .filter(p => p.slug !== slug && p.goalTags.some(t => protocol.goalTags.includes(t)))
      .slice(0, 2)
      .map(p => ({ protocol: p }))
  }
  const strength = match && match.score > 0 ? matchStrength(match, buckets) : null

  const url = `${ORIGIN}${RESULT_BASE}/${protocol.slug}`
  const kind = KIND[protocol.kind]
  const posts = protocol.posts.map(getBlogPost).filter(Boolean)
  const whyRows = hasAnswers
    ? QUESTIONS.filter(q => q.type === 'single' && answers[q.id]).map(q => ({ q: q.title, a: answerLabel(q.id, answers[q.id]) }))
    : []
  const waText = `Hi STRIATA, the protocol quiz matched me to ${protocol.name}. Can you tell me more? ${url}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked: the URL is visible in the address bar */ }
  }

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>{protocol.metaTitle}</title>
        <meta name="description" content={protocol.metaDescription} />
        <link rel="canonical" href={url} />
        {/* Result pages share most of their copy with the catalogue and stacks
            pages they point at, so they are crawlable (for the links) but not
            indexed — near-duplicate clusters are what got the site de-indexed
            in July. They are also left out of sitemap.xml (entry-server.jsx). */}
        <meta name="robots" content="noindex,follow" />
        <meta property="og:title" content={protocol.metaTitle} />
        <meta property="og:description" content={protocol.metaDescription} />
        <meta property="og:url" content={url} />
      </Helmet>

      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: protocol.name,
        description: protocol.summary,
        url,
        brand: { '@type': 'Brand', name: 'STRIATA' },
        category: kind.label,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'ZAR',
          price: String(protocol.fromPrice),
          availability: 'https://schema.org/InStock',
          url: `${ORIGIN}${protocol.primary.to}`,
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Protocol Quiz', item: `${ORIGIN}${QUIZ_URL}` },
          { '@type': 'ListItem', position: 2, name: protocol.name, item: url },
        ],
      }} />

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link to={QUIZ_URL} className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#00B4B4] text-sm transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {hasAnswers ? 'Retake the quiz' : 'Take the quiz'}
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-3 py-1.5 rounded-full" style={H}>
              {hasAnswers ? RESULT_COPY.eyebrow : 'Quiz result'}
            </span>
            <span className="text-white/30 text-sm">{kind.label}</span>
            {strength !== null && (
              <span className="text-white/45 text-sm tabular-nums">{strength}% match to your answers</span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5 max-w-3xl" style={H}>
            {hasAnswers ? <>Your match: <span className="text-[#00B4B4]">{protocol.name}</span></> : protocol.name}
          </h1>
          <ul className="flex flex-wrap gap-2">
            {protocol.usedFor.map(u => (
              <li key={u} className="text-white/65 text-xs font-semibold bg-white/5 border border-white/10 rounded-full px-3 py-1.5">{u}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-[#0d1e35] border border-[#00B4B4]/25 rounded-2xl p-7 md:p-9">
              <p className="text-white/80 text-base md:text-lg leading-relaxed">{protocol.summary}</p>

              {fallback && (
                <p role="note" className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 leading-relaxed">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                  <span>{RESULT_COPY.fallbackNote}</span>
                </p>
              )}

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link to={protocol.primary.to} className="btn btn-primary btn-lg">
                  {kind.cta}
                  {ARROW}
                </Link>
                <a href={`${whatsappLink}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                  {WA_ICON}
                  Ask us about it
                </a>
              </div>

              {protocol.secondary?.length > 0 && (
                <ul className="mt-6 space-y-2 border-t border-white/8 pt-5">
                  {protocol.secondary.map(l => (
                    <li key={l.to}>
                      <Link to={l.to} className="inline-flex items-center gap-1.5 text-[#00B4B4]/90 hover:text-[#00B4B4] text-sm font-semibold transition-colors">
                        {CHEVRON}
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {whyRows.length > 0 && (
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
                <p className="text-white/55 text-xs font-bold uppercase tracking-widest mb-4" style={H}>{RESULT_COPY.whyTitle}</p>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {whyRows.map(r => (
                    <div key={r.q}>
                      <dt className="text-white/40 text-xs">{r.q}</dt>
                      <dd className="text-white text-sm font-semibold mt-0.5" style={H}>{r.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {posts.length > 0 && (
              <div>
                <h2 className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-4" style={H}>Further reading</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {posts.map(p => (
                    <Link key={p.slug} to={`/learn/${p.slug}`} className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-all duration-200 hover:-translate-y-0.5">
                      <p className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-[#00B4B4] transition-colors" style={H}>{p.title}</p>
                      <span className="text-white/30 text-xs">{p.readTime}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            {runnersUp.length > 0 && (
              <div>
                <h2 className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-4" style={H}>{RESULT_COPY.runnersUp}</h2>
                <div className="space-y-3">
                  {runnersUp.map(r => <RunnerUpCard key={r.protocol.slug} entry={r} search={search} />)}
                </div>
              </div>
            )}

            <QuizLeadForm protocol={protocol} answers={answers} resultUrl={url} />

            <button type="button" onClick={copyLink} className="btn btn-ghost btn-md w-full">
              {copied ? 'Link copied' : 'Copy a link to this result'}
            </button>
          </aside>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto border-t border-white/8 pt-8">
          <p className="text-white/35 text-xs leading-relaxed max-w-3xl">{RESULT_COPY.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
