import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import { initGA, trackPageview } from './lib/analytics'

// Eager: the homepage is the most common landing point.
import Home from './pages/Home'

// Lazy: each route ships as its own chunk, keeping the initial bundle small.
// This also splits the ~340 KB of blog/guide markdown out of the main bundle.
const Catalogue = lazy(() => import('./pages/Catalogue'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Guides = lazy(() => import('./pages/Guides'))
const GuidePost = lazy(() => import('./pages/GuidePost'))
const Legal = lazy(() => import('./pages/Legal'))
const Stacks = lazy(() => import('./pages/Stacks'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Analytics() {
  const { pathname, search } = useLocation()
  useEffect(() => { initGA() }, [])
  useEffect(() => { trackPageview(pathname + search) }, [pathname, search])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
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
