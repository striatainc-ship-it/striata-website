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
 * Load the chunk for `pathname` before hydration.
 *
 * Prerendered pages ship the real markup, but a lazy route's chunk isn't in
 * memory yet at hydrate time, so the boundary would suspend and React would
 * throw away the server HTML and re-render it on the client. Awaiting the
 * chunk first makes hydration match what the prerenderer wrote.
 */
export function preloadRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (loaders[path]) return loaders[path]()
  if (path.startsWith('/learn/')) return loaders['/learn/:slug']()
  if (path.startsWith('/guides/')) return loaders['/guides/:slug']()

  return Promise.resolve() // '/' is eager, and unknown paths render the SPA shell.
}
