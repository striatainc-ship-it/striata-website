import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './App.jsx'
import AppRoutes from './AppRoutes'
import { loaders } from './routeLoaders'
import { blogPosts } from './data/blogPosts'
import { guides } from './data/guidesData'
import { quizResultPaths } from './data/quizProtocols'
import { categories, pagedProducts, productPath } from './data/products'

/**
 * Import every route component up front.
 *
 * Code splitting is pointless here — the server bundle is never sent to a
 * browser — and it is actively harmful: a React.lazy component suspends, and
 * anything that suspends gets emitted as a deferred Suspense boundary rather
 * than inline HTML. Resolving them first means the render is fully synchronous.
 */
const routesElement = AppRoutes({
  components: Object.fromEntries(
    await Promise.all(
      Object.entries(loaders).map(async ([path, load]) => [path, (await load()).default]),
    ),
  ),
})

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
    { path: '/stacks/menopause-reset', priority: '0.8', changefreq: 'monthly' },
    { path: '/pens', priority: '0.8', changefreq: 'weekly' },
    { path: '/nasal-sprays', priority: '0.8', changefreq: 'weekly' },
    { path: '/ghk-serum', priority: '0.8', changefreq: 'monthly' },
    { path: '/tools', priority: '0.8', changefreq: 'monthly' },
    { path: '/tools/reconstitution-calculator', priority: '0.8', changefreq: 'monthly' },
    { path: '/quiz', priority: '0.8', changefreq: 'monthly' },
    { path: '/guides', priority: '0.8', changefreq: 'weekly' },
    { path: '/learn', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/faq', priority: '0.7', changefreq: 'monthly' },
    { path: '/legal', priority: '0.3', changefreq: 'yearly' },
  ]

  // /catalogue/<category> is the planned next tier of the catalogue, so a
  // product slug that collides with a category id would quietly take a URL
  // that belongs to a listing page. Cheaper to fail the build than to find out
  // from Search Console.
  const categoryIds = new Set(categories.map(c => c.id))
  const collisions = pagedProducts.filter(p => categoryIds.has(p.slug))
  if (collisions.length) {
    throw new Error(
      `Product slug collides with a catalogue category: ${collisions.map(p => p.slug).join(', ')}`,
    )
  }

  return [
    ...staticRoutes,
    // Per-product pages. Priority sits just under /catalogue itself: they are
    // the pages that answer a named-product search, which is most of them.
    ...pagedProducts.map(product => ({
      path: productPath(product),
      priority: '0.8',
      changefreq: 'weekly',
    })),
    // Prerendered so shared result links open instantly, but `sitemap: false`
    // keeps them out of sitemap.xml: they carry noindex (see QuizResult.jsx).
    ...quizResultPaths.map(path => ({ path, priority: '0.7', changefreq: 'monthly', sitemap: false })),
    // Content routes carry their real last-modified date; static routes take
    // the build date in prerender.mjs (they change with stock and pricing).
    ...guides
      .filter(g => g.slug)
      .map(g => ({ path: `/guides/${g.slug}`, priority: '0.7', changefreq: 'monthly', lastmod: g.dateModified })),
    ...blogPosts
      .filter(p => p.slug)
      .map(p => ({ path: `/learn/${p.slug}`, priority: '0.6', changefreq: 'monthly', lastmod: p.dateModified })),
  ]
}

/**
 * Render one route to a complete HTML string.
 *
 * renderToString, not one of the streaming renderers. Streaming (and
 * react-dom/static, which shares the machinery) flushes the shell as soon as it
 * is ready and defers the contents of a Suspense boundary into a hidden
 * <div id="S:0"> plus a script that moves it into place on the next animation
 * frame. It does that whether or not the boundary actually suspended. Right for
 * a live server, wrong here: the page would be invisible to anything reading
 * the raw HTML, and blank in a background tab, where requestAnimationFrame
 * never fires.
 *
 * renderToString has no such phase. It cannot wait on anything — which is
 * exactly why the route components above are imported up front — and it writes
 * the Suspense boundary inline, with the same hydration markers the browser
 * expects.
 *
 * Returns the markup only. On React 19 the per-page title/meta/canonical are
 * hoisted into the front of this markup rather than into Helmet's context —
 * scripts/prerender.mjs lifts them from there into <head>.
 */
export async function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <Layout routes={routesElement} />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  )

  return { html }
}
