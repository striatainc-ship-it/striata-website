import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * A row of filter chips where the active highlight slides between chips
 * instead of switching colour.
 *
 * Until the pill has been measured (before hydration, or if JS is off) the
 * active chip paints its own background, so the prerendered page never shows
 * a row with nothing selected.
 */
export default function FilterChips({ options, value, onChange, renderIcon, className = '' }) {
  const rowRef = useRef(null)
  const [pill, setPill] = useState(null)

  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const active = row.querySelector('[data-active="true"]')
    setPill(active ? { left: active.offsetLeft, width: active.offsetWidth } : null)
  }, [])

  useEffect(measure, [measure, value, options])

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const ro = new ResizeObserver(measure)
    ro.observe(row)
    // Chip widths settle once the webfont lands
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [measure])

  return (
    <div ref={rowRef} className={`relative flex gap-2 ${className}`} role="group">
      {pill && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-full rounded-full bg-[#00B4B4] shadow-lg shadow-[#00B4B4]/20 transition-[transform,width] duration-300 ease-out"
          style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
        />
      )}
      {options.map((opt) => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            data-active={active}
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`relative z-[1] flex-none flex items-center gap-1.5 px-3.5 md:px-4 py-2 rounded-full border text-xs md:text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
              active
                ? `border-transparent text-white ${pill ? '' : 'bg-[#00B4B4]'}`
                : 'bg-[#0d1e35] border-white/10 text-white/60 hover:text-white hover:border-[#00B4B4]/30'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {renderIcon?.(opt, active)}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
