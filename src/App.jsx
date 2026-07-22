import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useRef, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
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
    document.querySelectorAll('head [data-prerendered-head]').forEach(el => el.remove())
  }, [pathname])

  return null
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
      <main>{routes}</main>
      <Footer />
      <WhatsAppFAB />
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
