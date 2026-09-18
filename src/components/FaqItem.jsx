import { useState } from 'react'

const H = { fontFamily: 'var(--font-heading)' }

export default function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-white font-semibold group-hover:text-[#00B4B4] transition-colors" style={H}>
          {q}
        </span>
        <svg
          className={`w-4 h-4 shrink-0 text-[#00B4B4] transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      {open && <p className="text-white/55 text-sm leading-relaxed pb-5 -mt-1 max-w-2xl">{a}</p>}
    </div>
  )
}
