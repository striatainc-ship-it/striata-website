import { Link } from 'react-router-dom'
import { AUTHOR, formatDate } from '../data/site'

const Avatar = ({ size = 'w-9 h-9 text-xs' }) => (
  <span
    className={`${size} rounded-full bg-[#00B4B4]/15 border border-[#00B4B4]/30 text-[#00B4B4] font-bold flex items-center justify-center shrink-0`}
    style={{ fontFamily: 'var(--font-heading)' }}
    aria-hidden="true"
  >
    {AUTHOR.initials}
  </span>
)

/**
 * Author, publish date and (when it differs) last-updated date, shown under
 * an article title. Machine-readable via <time dateTime>.
 */
export function Byline({ datePublished, dateModified, readTime }) {
  const updated = dateModified && dateModified !== datePublished
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-7 text-sm">
      <Link to="/about#founder" className="inline-flex items-center gap-2.5 group">
        <Avatar />
        <span>
          <span className="block text-white font-semibold leading-tight group-hover:text-[#00B4B4] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            {AUTHOR.name}
          </span>
          <span className="block text-white/40 text-xs">{AUTHOR.role}</span>
        </span>
      </Link>
      <span className="text-white/35 text-xs sm:text-sm">
        <time dateTime={datePublished}>Published {formatDate(datePublished)}</time>
        {updated && (
          <>
            {' · '}
            <time dateTime={dateModified}>Updated {formatDate(dateModified)}</time>
          </>
        )}
        {readTime && <> · {readTime}</>}
      </span>
    </div>
  )
}

/** "About the author" box for the end of an article. */
export function AuthorCard() {
  return (
    <aside className="mt-6 bg-[#0d1e35] border border-white/8 rounded-2xl p-6 md:p-7 flex gap-4 items-start">
      <Avatar size="w-12 h-12 text-sm" />
      <div>
        <p className="text-white/35 text-[10px] font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
          About the author
        </p>
        <p className="text-white font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
          {AUTHOR.name} <span className="text-white/40 font-normal">· {AUTHOR.role}</span>
        </p>
        <p className="text-white/60 text-sm leading-relaxed mt-2">{AUTHOR.bio}</p>
        <Link to="/about#founder" className="inline-block mt-3 text-[#00B4B4] text-sm font-semibold hover:text-white transition-colors">
          Read the STRIATA story →
        </Link>
      </div>
    </aside>
  )
}
