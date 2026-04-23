import { useParams, Link } from 'react-router-dom'
import { getBlogPost, blogPosts } from '../data/blogPosts'
import { whatsappLink } from '../data/products'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// ── Inline markdown renderer ──────────────────────────────
function renderInline(text) {
  if (!text) return null
  const parts = text.split(/(\*\*(?:[^*]|\*(?!\*))+\*\*)/)
  if (parts.length === 1) return text
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>
    }
    return part || null
  })
}

function renderBlock(block, key) {
  const trimmed = block.trim()
  if (!trimmed) return null

  const lines = trimmed.split('\n')
  const first = lines[0]

  // h2
  if (first.startsWith('## ')) {
    return (
      <h2 key={key} className="text-xl md:text-2xl font-black text-white mt-12 mb-4 pb-3 border-b border-white/8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {renderInline(first.slice(3))}
      </h2>
    )
  }

  // h3
  if (first.startsWith('### ')) {
    return (
      <h3 key={key} className="text-base md:text-lg font-bold text-[#00B4B4] mt-8 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {renderInline(first.slice(4))}
      </h3>
    )
  }

  // Section divider
  if (trimmed === '---') {
    return <div key={key} className="my-10 border-t border-white/8" />
  }

  // Table — all lines start with |
  if (lines.every(l => l.trim().startsWith('|'))) {
    const nonSep = lines.filter(l => !l.match(/^\s*\|[-: |]+\|\s*$/))
    if (nonSep.length >= 1) {
      const headers = nonSep[0].split('|').filter(Boolean).map(h => h.trim())
      const rows = nonSep.slice(1).map(l => l.split('|').filter(Boolean).map(c => c.trim()))
      return (
        <div key={key} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border border-white/8 rounded-xl overflow-hidden">
            <thead className="bg-[#0d1e35]">
              <tr>
                {headers.map((h, j) => (
                  <th key={j} className="text-[#00B4B4] text-left py-3 px-4 font-semibold border-b border-white/8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, j) => (
                <tr key={j} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  {row.map((cell, k) => (
                    <td key={k} className="text-white/70 py-2.5 px-4">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }

  // Bullet list — all (non-empty) lines start with "- "
  const bulletLines = lines.filter(l => l.trim())
  if (bulletLines.length > 0 && bulletLines.every(l => l.startsWith('- '))) {
    return (
      <ul key={key} className="my-4 space-y-2">
        {bulletLines.map((l, j) => (
          <li key={j} className="flex items-start gap-3 text-white/70 text-base leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] mt-2.5 shrink-0" />
            <span>{renderInline(l.slice(2))}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Mixed block starting with bullet
  if (first.startsWith('- ')) {
    return (
      <ul key={key} className="my-4 space-y-2">
        {lines.filter(l => l.startsWith('- ')).map((l, j) => (
          <li key={j} className="flex items-start gap-3 text-white/70 text-base leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4] mt-2.5 shrink-0" />
            <span>{renderInline(l.slice(2))}</span>
          </li>
        ))}
      </ul>
    )
  }

  // Numbered list
  if (/^\d+\. /.test(first)) {
    const numLines = lines.filter(l => /^\d+\. /.test(l))
    return (
      <ol key={key} className="my-4 space-y-2">
        {numLines.map((l, j) => (
          <li key={j} className="flex items-start gap-3 text-white/70 text-base leading-relaxed">
            <span className="text-[#00B4B4] font-bold shrink-0 min-w-[1.5rem]">{j + 1}.</span>
            <span>{renderInline(l.replace(/^\d+\. /, ''))}</span>
          </li>
        ))}
      </ol>
    )
  }

  // Italic disclaimer paragraph: *text* on its own
  if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
    return (
      <p key={key} className="text-white/40 text-xs italic leading-relaxed mt-10 pt-6 border-t border-white/8">
        {trimmed.slice(1, -1)}
      </p>
    )
  }

  // Regular paragraph — multi-line blocks get a <br> between lines
  return (
    <p key={key} className="text-white/70 text-base leading-relaxed my-4">
      {lines.map((line, j) => (
        <span key={j}>
          {renderInline(line)}
          {j < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  )
}

function MarkdownContent({ content }) {
  if (!content) return null
  const blocks = content.split(/\n\n+/)
  return (
    <div>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams()
  const article = getBlogPost(slug)

  if (!article) {
    return (
      <div className="bg-[#0A1628] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Article not found
          </h1>
          <Link to="/learn" className="text-[#00B4B4] hover:text-white transition-colors">
            ← Back to Learning Hub
          </Link>
        </div>
      </div>
    )
  }

  const related = blogPosts
    .filter(a => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <div className="bg-[#0A1628] min-h-screen">

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-[#00B4B4] text-sm transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Learning Hub
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-3 py-1.5 rounded-full"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {article.category}
            </span>
            <span className="text-white/30 text-sm">{article.readTime}</span>
          </div>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {article.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed border-l-2 border-[#00B4B4]/40 pl-4">
            {article.preview}
          </p>
        </div>
      </section>

      {/* ── ARTICLE CONTENT ── */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-7 md:p-10">
            <MarkdownContent content={article.content} />
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {related.length > 0 && (
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              More in {article.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(a => (
                <Link
                  key={a.slug}
                  to={`/learn/${a.slug}`}
                  className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-5 hover:border-[#00B4B4]/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <p
                    className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-[#00B4B4] transition-colors"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {a.title}
                  </p>
                  <span className="text-white/30 text-xs">{a.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/8 to-transparent" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <h2
            className="text-2xl md:text-4xl font-black text-white mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Found Something That <span className="text-[#00B4B4]">Interests You?</span>
          </h2>
          <p className="text-white/60 mb-8">
            Chat to us on WhatsApp — we'll help you understand your options and find the right compound for your goals.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {WA_ICON}
            Chat to Us on WhatsApp →
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
