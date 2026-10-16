/**
 * Where a page's generated social preview image lives. Shared by the pages
 * (og:image, Article.image) and by scripts/prerender.mjs, which renders the
 * file, so the two always agree. Plain module with no imports: the prerender
 * script loads it straight from node.
 */
export const OG_ORIGIN = 'https://www.striatalabs.co.za'

/** '/' -> 'home', '/learn/x' -> 'learn--x' */
export const ogImageName = (path) => (path === '/' ? 'home' : path.replace(/^\/+|\/+$/g, '').replace(/\//g, '--'))

export const ogImageFor = (path) => `${OG_ORIGIN}/og/${ogImageName(path)}.jpg`
