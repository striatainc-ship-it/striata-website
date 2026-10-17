import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * 18+ and research-use confirmation, shown once per visitor (re-asked after
 * REMEMBER_DAYS).
 *
 * It is a client-side overlay on top of the prerendered page, never a
 * replacement for it: the HTML a crawler fetches is the full page, and the
 * server snapshot below reports "confirmed" so nothing renders during SSR or
 * hydration. Google treats age verification as a legitimate interstitial.
 *
 * The wording mirrors the Footer and the Legal page (sections 1.2 and 1.3);
 * change all three together.
 */
const KEY = 'striata-age-confirmed'
const REMEMBER_DAYS = 30
const EXEMPT_PATHS = ['/legal']

const listeners = new Set()
let confirmedThisVisit = false

function readConfirmed() {
  try {
    const at = Number(localStorage.getItem(KEY))
    return Boolean(at) && Date.now() - at < REMEMBER_DAYS * 864e5
  } catch {
    // Storage blocked (private mode, strict settings): ask every visit.
    return false
  }
}

function confirm() {
  try {
    localStorage.setItem(KEY, String(Date.now()))
  } catch {
    // Nothing to persist to; the confirmation still holds for this page view.
  }
  confirmedThisVisit = true
  listeners.forEach((fn) => fn())
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
const getSnapshot = () => confirmedThisVisit || readConfirmed()
const getServerSnapshot = () => true

export default function AgeGate() {
  const confirmed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const { pathname } = useLocation()
  const button = useRef(null)
  const open = !confirmed && !EXEMPT_PATHS.includes(pathname)

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    button.current?.focus()
    return () => {
      document.body.style.overflow = overflow
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="gate-backdrop fixed inset-0 z-[100] bg-[#060e1a]/90 backdrop-blur-md flex items-center justify-center px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-body"
    >
      <div className="gate-card relative w-full max-w-md bg-[#0d1e35] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/40 text-center overflow-hidden">
        <div
          className="gate-glow absolute left-1/2 top-10 -translate-x-1/2 w-72 h-40 rounded-full bg-[#00B4B4]/25 blur-3xl opacity-35 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative flex justify-center mb-6">
          <span className="gate-logo">
            <img
              src={`${import.meta.env.BASE_URL}assets/opt/logo-white-640.webp`}
              srcSet={`${import.meta.env.BASE_URL}assets/opt/logo-white-320.webp 320w, ${import.meta.env.BASE_URL}assets/opt/logo-white-640.webp 640w`}
              sizes="185px"
              alt="STRIATA"
              width={640}
              height={222}
              className="h-16 w-auto block"
            />
          </span>
        </div>
        <h2
          id="age-gate-title"
          className="gate-rise relative text-white text-2xl font-black mb-3"
          style={{ fontFamily: 'var(--font-heading)', '--d': '1.05s' }}
        >
          Before you enter
        </h2>
        <div
          id="age-gate-body"
          className="gate-rise relative text-white/60 text-sm leading-relaxed space-y-3 mb-7"
          style={{ '--d': '1.15s' }}
        >
          <p>You must be 18 or older to browse this website.</p>
          <p>
            All products are sold strictly for research purposes only. Not intended for human or veterinary use. Not
            approved by SAHPRA for human consumption.
          </p>
        </div>
        <div className="gate-rise relative" style={{ '--d': '1.25s' }}>
          <button ref={button} type="button" onClick={confirm} className="btn btn-primary btn-lg w-full">
            I am 18+ and I understand
          </button>
          <a
            href="https://www.google.com"
            className="block mt-4 text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            I am under 18, take me away
          </a>
        </div>
        <p className="gate-rise relative mt-6 text-white/30 text-xs" style={{ '--d': '1.35s' }}>
          See our{' '}
          <Link to="/legal" className="underline hover:text-white/60">
            terms and research-use policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
