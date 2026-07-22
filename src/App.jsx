import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import { initGA, trackPageview } from './lib/analytics'
import { loaders } from './routeLoaders'

// Eager: the homepage is the most common landing point.
import Home from './pages/Home'

// Lazy: each route ships as its own chunk, keeping the initial bundle small.
// This also splits the ~340 KB of blog/guide markdown out of the main bundle.
const Catalogue = lazy(loaders['/catalogue'])
const About = lazy(loaders['/about'])
const Contact = lazy(loaders['/contact'])
const FAQ = lazy(loaders['/faq'])
const Blog = lazy(loaders['/learn'])
const BlogPost = lazy(loaders['/learn/:slug'])
const Guides = lazy(loaders['/guides'])
const GuidePost = lazy(loaders['/guides/:slug'])
const Legal = lazy(loaders['/legal'])
const Stacks = lazy(loaders['/stacks'])

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

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <PrerenderedHeadCleanup />
      <Analytics />
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/learn" element={<Blog />} />
            <Route path="/learn/:slug" element={<BlogPost />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuidePost />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/stacks" element={<Stacks />} />
          </Routes>
        </Suspense>
      </main>
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
