import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { addLine, lineFor } from '../lib/cart'
import { prefersReducedMotion } from '../lib/motion'
import { vialSrc } from '../data/products'

/** The id the corner button carries, so things added can fly to it. */
export const SLIP_TARGET_ID = 'order-slip-target'

/**
 * Send a small copy of the product (its photo, or a teal dot when there is no
 * photo) from the button to the corner button, so the customer sees where it
 * went. It answers a click, so it plays on every add; it is skipped
 * for anyone who has asked for reduced motion.
 */
function flyToSlip(from, imageName) {
  if (prefersReducedMotion()) return
  const target = document.getElementById(SLIP_TARGET_ID)
  if (!from || !target) return

  const a = from.getBoundingClientRect()
  const b = target.getBoundingClientRect()
  const token = document.createElement(imageName ? 'img' : 'span')
  if (imageName) {
    token.src = vialSrc(imageName, 160)
    token.alt = ''
  }
  Object.assign(token.style, {
    position: 'fixed',
    left: `${a.left + a.width / 2 - 12}px`,
    top: `${a.top + a.height / 2 - 24}px`,
    width: '24px',
    height: '48px',
    objectFit: 'contain',
    zIndex: 70,
    pointerEvents: 'none',
    ...(imageName ? {} : { height: '14px', width: '14px', borderRadius: '9999px', background: '#00B4B4' }),
  })
  document.body.appendChild(token)

  const dx = b.left + b.width / 2 - (a.left + a.width / 2)
  const dy = b.top + b.height / 2 - (a.top + a.height / 2)
  // x and y on different eases make the path an arc rather than a straight
  // line: it drifts across first and drops in at the end.
  gsap
    .timeline({ onComplete: () => token.remove() })
    .to(token, { x: dx, duration: 0.7, ease: 'power1.out' }, 0)
    .to(token, { y: dy, duration: 0.7, ease: 'back.in(1.4)' }, 0)
    .to(token, { scale: 0.4, opacity: 0.2, duration: 0.25, ease: 'power2.in' }, 0.45)
}

const PLUS = (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const TICK = (
  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

/**
 * "Add to order" for one product at one size.
 *
 * `tier` null means the product has several sizes and none is picked yet; the
 * button then asks for one and calls `onNeedTier` so the caller can open its
 * size picker. A size we are not holding can still be added. It goes on the
 * slip as an availability question rather than a priced line.
 */
export default function AddToOrder({
  product,
  tier,
  format,
  href = null,
  imageName = null,
  onNeedTier,
  className = 'btn btn-primary btn-lg',
  compact = false,
}) {
  const ref = useRef(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = window.setTimeout(() => setAdded(false), 1600)
    return () => window.clearTimeout(t)
  }, [added])

  const onClick = () => {
    if (!tier) {
      onNeedTier?.()
      return
    }
    addLine(lineFor(product, tier, { format, href, image: imageName }))
    flyToSlip(ref.current, imageName)
    setAdded(true)
  }

  const label = !tier
    ? 'Choose a size'
    : added
      ? 'Added to your slip'
      : tier.inStock
        ? 'Add to order'
        : 'Add as an enquiry'

  return (
    <button ref={ref} type="button" onClick={onClick} className={`${className} gap-2`} aria-live="polite">
      {added ? TICK : tier ? PLUS : null}
      <span className={compact ? 'truncate' : ''}>{label}</span>
    </button>
  )
}
