import { StrictMode } from 'react'
import { Writable } from 'node:stream'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './App.jsx'
import { blogPosts } from './data/blogPosts'
import { guides } from './data/guidesData'

/**
 * Every URL the site serves, derived from the same data the pages render from.
 * This is the single source of truth for both prerendering and sitemap.xml —
 * add a blog post or guide and both pick it up with no manual edit.
 */
export function getRoutes() {
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/catalogue', priority: '0.9', changefreq: 'weekly' },
    { path: '/stacks', priority: '0.8', changefreq: 'weekly' },
    { path: '/guides', priority: '0.8', changefreq: 'weekly' },
    { path: '/learn', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/legal', priority: '0.3', changefreq: 'yearly' },
  ]

  return [
    ...staticRoutes,
    ...guides
      .filter(g => g.slug)
      .map(g => ({ path: `/guides/${g.slug}`, priority: '0.7', changefreq: 'monthly' })),
    ...blogPosts
      .filter(p => p.slug)
      .map(p => ({ path: `/learn/${p.slug}`, priority: '0.6', changefreq: 'monthly' })),
  ]
}

/**
 * Render one route to a complete HTML string.
 *
 * Uses renderToPipeableStream (not renderToString) because the routes are
 * React.lazy: onAllReady fires only once every Suspense boundary has resolved,
 * so the markup we collect is the real page, never the fallback.
 *
 * Returns the markup only. On React 19 the per-page title/meta/canonical are
 * hoisted into the front of this markup rather than into Helmet's context —
 * scripts/prerender.mjs lifts them from there into <head>.
 */
export function render(url) {
  const helmetContext = {}

  return new Promise((resolve, reject) => {
    const chunks = []
    let settled = false

    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk))
        cb()
      },
      final(cb) {
        if (!settled) {
          settled = true
          resolve({ html: Buffer.concat(chunks).toString('utf8') })
        }
        cb()
      },
    })

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <Layout />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          pipe(sink)
        },
        onError(error) {
          if (settled) return
          settled = true
          reject(error)
        },
      },
    )

    // Guard against a route that never resolves.
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      abort()
      reject(new Error(`Timed out prerendering ${url}`))
    }, 30000)
    timer.unref?.()
  })
}
