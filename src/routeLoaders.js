/**
 * Dynamic imports for the lazy routes, keyed by route path.
 *
 * Kept out of App.jsx so the chunk for a route can be loaded on demand —
 * App.jsx wraps these in React.lazy, and main.jsx awaits the matching one
 * before hydrating a prerendered page.
 */
export const loaders = {
  '/catalogue': () => import('./pages/Catalogue'),
  '/about': () => import('./pages/About'),
  '/contact': () => import('./pages/Contact'),
  '/faq': () => import('./pages/FAQ'),
  '/learn': () => import('./pages/Blog'),
  '/learn/:slug': () => import('./pages/BlogPost'),
  '/guides': () => import('./pages/Guides'),
  '/guides/:slug': () => import('./pages/GuidePost'),
  '/legal': () => import('./pages/Legal'),
  '/stacks': () => import('./pages/Stacks'),
}

/**
 * Route components that have finished loading, keyed the same way.
 *
 * App.jsx prefers one of these over the React.lazy wrapper. That matters for
 * the landing route: a lazy component suspends on its first render even when
 * the module is already in memory, and a boundary that suspends mid-hydration
 * makes React throw away the prerendered HTML and rebuild it on the client.
 */
export const resolved = new Map()

/** Which loader key handles this pathname, or null for the eager homepage. */
function matchLoader(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (loaders[path]) return path
  if (path.startsWith('/learn/')) return '/learn/:slug'
  if (path.startsWith('/guides/')) return '/guides/:slug'

  return null
}

/**
 * Load the chunk for `pathname` and record it, so the first render after this
 * resolves can mount the component synchronously.
 */
export async function preloadRoute(pathname) {
  const key = matchLoader(pathname)
  if (!key) return // '/' is eager, and unknown paths render the SPA shell.

  const module = await loaders[key]()
  resolved.set(key, module.default)
}
