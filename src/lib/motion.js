import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/** True when the visitor has asked the OS for less motion. Safe on the server. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * True until the first client-side navigation.
 *
 * Prerendered pages arrive fully visible, so an entrance tween on the landing
 * route can only hide what the visitor is already looking at and fade it back
 * in — a flash, and a second paint of the largest element. Above-the-fold
 * reveals and the product-grid stagger skip themselves while this is true;
 * from the first navigation on, every page animates as before.
 */
let initialLoad = true
export const isInitialLoad = () => initialLoad
export const markNavigated = () => { initialLoad = false }

/**
 * Props for a cursor-tracking glow card. Spread onto any element that also
 * carries the `.spot` class (see index.css). The glow position lives in CSS
 * custom properties so there is no React state or re-render per mouse move.
 */
export function spotlightProps() {
  return {
    onMouseMove: (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
  }
}

/**
 * Stagger a grid's children in whenever `deps` change — used for product
 * grids so a filter or search change animates instead of snapping.
 *
 * The per-item delay is capped so a 90-card grid still settles in ~0.7s;
 * `overwrite` kills any in-flight tween on the same nodes if the user filters
 * again mid-animation, and `clearProps` hands transform control back to CSS
 * so hover lifts keep working afterwards.
 */
export function useStaggerGrid(ref, deps) {
  const firstRun = useRef(true)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    // The prerendered grid is already on screen when the page lands; tweening
    // 90 cards from opacity 0 at that point is pure cost (see isInitialLoad).
    if (firstRun.current) {
      firstRun.current = false
      if (isInitialLoad()) return
    }
    const items = Array.from(el.children)
    if (items.length === 0) return

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: Math.min(0.04, 0.7 / items.length),
        overwrite: true,
        clearProps: 'transform',
      },
    )
    return () => { tween.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
