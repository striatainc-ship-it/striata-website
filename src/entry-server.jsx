import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './App.jsx'
import AppRoutes from './AppRoutes'
import { loaders } from './routeLoaders'
import { blogPosts } from './data/blogPosts'
import { guides } from './data/guidesData'

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
