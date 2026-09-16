// Google Analytics 4 — activated only when VITE_GA_MEASUREMENT_ID is set
// (add it in .env.local and in Vercel env vars). No ID = no-op, no network calls.
export const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initGA() {
  if (!GA_ID || typeof window === 'undefined' || window.__gaInit) return
  window.__gaInit = true

  // The queue is live immediately, so the landing page_view and any early
  // events are recorded and flushed once the tag arrives.
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // Manual page_view on route change (SPA), so disable the automatic one.
  window.gtag('config', GA_ID, { send_page_view: false })

  // The 176 KB tag itself waits for an idle main thread: loaded eagerly it
  // blocked ~400 ms on mobile while the catalogue was still hydrating.
  const load = () => {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
  }
  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 5000 })
  else window.setTimeout(load, 2500)
}

/** Custom GA4 event. No-op without a measurement ID, so safe to call anywhere. */
export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

export function trackPageview(path) {
  if (!GA_ID || typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}
