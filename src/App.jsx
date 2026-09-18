import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useRef, lazy } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, markNavigated } from './lib/motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OrderSlip, { SlipFab } from './components/OrderSlip'
import { initGA, trackPageview } from './lib/analytics'
import { loaders, resolved } from './routeLoaders'
import AppRoutes from './AppRoutes'

// Lazy: each route ships as its own chunk, keeping the initial bundle small.
// This also splits the ~340 KB of blog/guide markdown out of the main bundle.
// (The homepage is eager — see AppRoutes.)
const lazyComponents = Object.fromEntries(
  Object.entries(loaders).map(([path, load]) => [path, lazy(load)]),
)

// Prefer an already-loaded component over its lazy wrapper — main.jsx resolves
// the landing route before hydrating so that route mounts without suspending.
function routeComponents() {
  return Object.fromEntries(
    Object.keys(loaders).map(path => [path, resolved.get(path) ?? lazyComponents[path]]),
  )
}

/**
 * Scroll to the top on every navigation, or to the `#anchor` when the URL
 * has one. Lazy routes mount a beat after the location changes, so the
 * anchor lookup retries for up to a second before giving up.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    let frame
    const seek = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
      if (tries++ < 60) frame = requestAnimationFrame(seek)
    }
    seek()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

/**
 * Drop the prerendered <head> tags once the user navigates away from the
 * landing route.
 *
 * They must survive hydration — React adopts the hoisted title/meta/canonical
 * that are already in the document rather than recreating them, so removing
 * them earlier leaves the head bare. From the first client-side navigation on,
 * React renders its own, and these would otherwise linger as a stale duplicate
 * canonical and title.
 */
function PrerenderedHeadCleanup() {
  const { pathname } = useLocation()
  const landing = useRef(pathname)

  useEffect(() => {
    if (pathname === landing.current) return
    markNavigated()
    document.querySelectorAll('head [data-prerendered-head]').forEach(el => el.remove())
  }, [pathname])

  return null
}

/**
 * Fade each new page in on client-side navigation.
 *
 * The first render is skipped so a prerendered page never re-animates on
 * hydration. `clearProps` removes the inline transform when done — while it
 * is present <main> is a containing block, which would break any fixed
 * descendant, and sticky filter bars must be free to work afterwards.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation()
  const ref = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }
    if (prefersReducedMotion()) return
    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' },
    )
    return () => tween.kill()
  }, [pathname])

  return <main ref={ref}>{children}</main>
}

function Analytics() {
  const { pathname, search } = useLocation()
  useEffect(() => { initGA() }, [])
  useEffect(() => { trackPageview(pathname + search) }, [pathname, search])
  return null
}

export function Layout({ routes = <AppRoutes components={routeComponents()} /> }) {
  return (
    <>
      <ScrollToTop />
      <PrerenderedHeadCleanup />
      <Analytics />
      <Navbar />
      <PageTransition>{routes}</PageTransition>
      <Footer />
      <SlipFab />
      <OrderSlip />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  )
}
