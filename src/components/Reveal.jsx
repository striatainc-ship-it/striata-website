import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion'

/**
 * Fade-and-rise a block into view the first time it scrolls into the viewport.
 *
 * Wrap any static section with it. Pass `stagger` to animate the direct
 * children one after another instead (headings, card grids, button rows).
 *
 * Uses an IntersectionObserver rather than ScrollTrigger on purpose: a
 * ScrollTrigger created during page load can sit unevaluated until the next
 * scroll or refresh (the pinned scroll-beat on the home page makes this
 * worse), which left above-the-fold content invisible. The observer fires
 * synchronously for anything already in view.
 *
 * SSR-safe: the prerendered HTML is untouched and fully visible; the hidden
 * state is only applied on the client, right before the tween starts.
 * Reduced-motion visitors see the content exactly as prerendered.
 *
 * Not for lists that change — use useStaggerGrid for those.
 */
export default function Reveal({
  as = 'div',
  children,
  className,
  stagger = false,
  delay = 0,
  y = 28,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const targets = stagger ? Array.from(el.children) : [el]
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y })
    }, el)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        ctx.add(() => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'power3.out',
            stagger: stagger ? 0.09 : 0,
            clearProps: 'transform',
          })
        })
      },
      // Fire once the block's top is 12% up from the bottom edge — matches
      // the old 'top 88%' ScrollTrigger start.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      ctx.revert()
    }
  }, [stagger, delay, y])

  const Tag = as
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
