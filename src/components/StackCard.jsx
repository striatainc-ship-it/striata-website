import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_META, UNIVERSAL_CONTRAINDICATIONS, TIER_STYLES, randValue, waLink, stackPath, stackSlug } from '../data/stacksData'
import AddToOrder from './AddToOrder'

// Shared by /stacks (every stack) and /stacks/<slug> (one stack per page).

// ─── SVG helpers ─────────────────────────────────────────────────────────────
const WA_SVG = (
  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const WARN_SVG = (
  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const ChevronSvg = ({ open }) => (
  <svg className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

// ─── SafetyBadge ─────────────────────────────────────────────────────────────
export function SafetyBadge({ safety }) {
  const SHIELD = (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
  if (safety === 'SAFE') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 whitespace-nowrap">
        {SHIELD} Safe
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/15 text-amber-400 border border-amber-500/25 whitespace-nowrap">
      {WARN_SVG} Caution
    </span>
  )
}

// ─── StackCard ────────────────────────────────────────────────────────────────
export function StackCard({ stack, standalone = false }) {
  const meta = CATEGORY_META[stack.category]
  // Which tier goes on the order slip. Nothing is picked until the customer
  // chooses: the tiers differ by up to R 2 000, so a default would be a guess.
  const [selected, setSelected] = useState(null)
  const PHASE_SVG = (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )

  return (
    <article
      id={stackSlug(stack)}
      className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1e35] flex flex-col hover:border-white/15 transition-colors duration-200 scroll-mt-28"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
              style={{ backgroundColor: meta.color, color: '#0A1628' }}
            >
              {String(stack.num).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              {standalone ? (
                <p className="text-base font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stack.name}
                </p>
              ) : (
                <h2 className="text-base font-black text-white leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  <Link to={stackPath(stack)} className="hover:text-[#00B4B4] transition-colors">
                    {stack.name}
                  </Link>
                </h2>
              )}
              <p className="text-white/50 text-xs mt-0.5 italic">{stack.tagline}</p>
            </div>
          </div>
          <SafetyBadge safety={stack.safety} />
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: meta.lightColor, color: meta.color, border: `1px solid ${meta.border}` }}
          >
            {meta.label}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/8">
            {PHASE_SVG}
            {stack.phase}
          </span>
        </div>
      </div>

      {/* ── Rationale ── */}
      <div
        className="px-5 py-4 border-b border-white/8"
        style={{ backgroundColor: meta.lightColor, borderLeft: `3px solid ${meta.color}` }}
      >
        <p className="text-white/70 text-sm leading-relaxed">{stack.rationale}</p>
      </div>

      {/* ── Pricing table ── */}
      <div className="border-b border-white/8">
        <div className="grid grid-cols-[1fr_2.5fr_1fr] bg-[#0A1628] px-4 py-2.5">
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest">Tier</span>
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest">Includes</span>
          <span className="text-white/35 text-xs font-semibold uppercase tracking-widest text-right">Price</span>
        </div>

        {stack.tiers.map((tier) => {
          const ts = TIER_STYLES[tier.label]
          const isSelected = selected?.label === tier.label
          return (
            <button
              key={tier.label}
              type="button"
              onClick={() => setSelected(isSelected ? null : tier)}
              aria-pressed={isSelected}
              className="w-full text-left grid grid-cols-[1fr_2.5fr_1fr] px-4 py-3 border-t border-white/5 cursor-pointer transition-shadow"
              style={{
                backgroundColor: ts.bg,
                boxShadow: isSelected ? `inset 0 0 0 2px ${ts.label}` : undefined,
              }}
            >
              <span className="text-xs font-bold uppercase tracking-wide inline-flex items-center gap-1.5" style={{ color: ts.label }}>
                <span
                  className="w-3 h-3 rounded-full border shrink-0 grid place-items-center"
                  style={{ borderColor: ts.label }}
                  aria-hidden="true"
                >
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ts.label }} />}
                </span>
                {tier.label}
              </span>
              <span className="text-xs leading-snug pr-2" style={{ color: ts.text }}>
                {tier.products}
              </span>
              <span className="text-xs font-mono font-bold text-right" style={{ color: ts.price }}>
                {tier.price}
              </span>
            </button>
          )
        })}
        <p className="px-4 py-2 text-[11px] text-white/35 border-t border-white/5">
          {selected ? `${selected.label} tier selected` : 'Tap a tier to choose it'}
        </p>
      </div>

      {/* ── Safety note ── */}
      <div
        className="px-5 py-4 border-b border-white/8"
        style={
          stack.safety === 'SAFE'
            ? { backgroundColor: 'rgba(16,185,129,0.06)', borderLeft: '3px solid rgba(16,185,129,0.4)' }
            : { backgroundColor: 'rgba(245,158,11,0.06)', borderLeft: '3px solid rgba(245,158,11,0.4)' }
        }
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: stack.safety === 'SAFE' ? '#34D399' : '#FCD34D' }}>
          Safety Note
        </p>
        <p className="text-white/60 text-sm leading-relaxed">{stack.safetyNote}</p>
      </div>

      {/* ── Advisory (CAUTION only) ── */}
      {stack.advisory && (
        <div className="px-5 py-4 border-b border-white/8" style={{ backgroundColor: 'rgba(239,68,68,0.05)', borderLeft: '3px solid rgba(239,68,68,0.35)' }}>
          <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1.5">Usage Advisory</p>
          <p className="text-white/60 text-sm leading-relaxed">{stack.advisory}</p>
        </div>
      )}

      {/* ── Contraindications ── */}
      <div className="border-b border-white/8">
        <div className="px-5 py-2.5 bg-[#0A1628]">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35">Contraindications — Do Not Use If:</p>
        </div>
        {stack.contraindications.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-5 py-3 border-t border-white/5"
            style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-amber-400 flex-shrink-0 mt-0.5">{WARN_SVG}</span>
            <p className="text-white/55 text-sm leading-snug">{item}</p>
          </div>
        ))}
      </div>

      {/* ── Add to order, or ask about the stack ── */}
      <div className="p-4 mt-auto flex gap-2">
        <AddToOrder
          product={{ id: `stack-${stack.num}`, name: stack.name }}
          tier={selected && { dose: `${selected.label} tier`, price: randValue(selected.price), inStock: true }}
          format="Stack"
          href={stackPath(stack)}
          detail={selected?.products ?? null}
          chooseLabel="Choose a tier above"
          className={`flex-1 flex items-center justify-center py-3.5 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
            selected ? 'bg-[#00B4B4] hover:bg-[#009999] text-white' : 'bg-[#00B4B4]/12 text-[#00B4B4] hover:bg-[#00B4B4]/20'
          }`}
        />
        <a
          href={waLink(stack.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask about ${stack.name} on WhatsApp`}
          title="Ask about this stack on WhatsApp"
          className="w-12 shrink-0 grid place-items-center rounded-xl border border-white/12 text-white/60 hover:text-white hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition-colors"
        >
          {WA_SVG}
        </a>
      </div>
    </article>
  )
}

// ─── UniversalContraindications ───────────────────────────────────────────────
export function UniversalContraindications() {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#0d1e35]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4B4]"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-0.5">Applies to All Stacks</p>
          <h3 className="text-base font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
            Universal Contraindications
          </h3>
        </div>
        <span className="text-white/40 flex-shrink-0 ml-4">
          <ChevronSvg open={open} />
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? '2000px' : '0px' }}>
        <div className="border-t border-white/8">
          {UNIVERSAL_CONTRAINDICATIONS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-6 py-4 border-b border-white/5 last:border-0"
              style={{ backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-amber-400 flex-shrink-0 mt-0.5">{WARN_SVG}</span>
              <p className="text-white/60 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
