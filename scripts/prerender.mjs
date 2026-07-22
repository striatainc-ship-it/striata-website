/**
 * Prerender every route to static HTML after the client + SSR builds.
 *
 * Why: this is a client-rendered SPA, so every URL used to ship the same empty
 * <div id="root"> and Google only ever indexed the two pages it bothered to
 * render JS for. Each route now gets a real HTML file with its own title,
 * meta description, canonical and body copy, and the client hydrates it.
 *
 * Run via `npm run build` (see package.json):
 *   vite build            -> dist/            (client, incl. index.html template)
 *   vite build --ssr      -> .ssr-dist/       (server bundle, not deployed)
 *   node scripts/prerender.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const serverEntry = join(root, '.ssr-dist', 'entry-server.js')

const ORIGIN = 'https://www.striatalabs.co.za'

const { render, getRoutes } = await import(pathToFileURL(serverEntry).href)

const template = await readFile(join(distDir, 'index.html'), 'utf8')
const routes = getRoutes()

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree to the
// front of the stream rather than into Helmet's context, so they arrive at the
// start of the markup. Pull that leading run off and put it in <head> where it
// belongs. JSON-LD <script> tags stay in the body — valid, and Google reads them.
const HOISTED_TAG = /^\s*(<title[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*?\/?>|<link\b[^>]*?\/?>)/

function extractHoistedTags(html) {
  const tags = []
  let body = html
  let match

  while ((match = body.match(HOISTED_TAG))) {
    tags.push(match[1])
    body = body.slice(match[0].length)
  }

  return { tags, body }
}

/** Inject the rendered markup and this route's head tags into the template. */
function buildPage(template, html) {
  const { tags, body } = extractHoistedTags(html)
  let page = template

  // The template's <title> is only a fallback. Drop it when the route supplies
  // a real one, otherwise the page ships two and Google reads the wrong one.
  if (tags.some(tag => tag.startsWith('<title'))) {
    page = page.replace(/\n?[ \t]*<title>[\s\S]*?<\/title>/, '')
  }

  // Marked so main.jsx can drop them at hydration: React re-creates its own
  // copies rather than adopting these, and without the cleanup the head would
  // accumulate a stale canonical/title/description after each client-side
  // navigation.
  const marked = tags.map(tag => tag.replace(/^<(\w+)/, '<$1 data-prerendered-head=""'))

  page = page.replace('</head>', `  ${marked.join('\n    ')}\n  </head>`)
  page = page.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  return page
}

/** `/` -> dist/index.html, `/learn/x` -> dist/learn/x.html (Vercel serves both at the clean URL). */
function outputPath(routePath) {
  if (routePath === '/') return join(distDir, 'index.html')
  return join(distDir, `${routePath.replace(/^\//, '')}.html`)
}

const failures = []

for (const route of routes) {
  try {
    const { html } = await render(route.path)
    const file = outputPath(route.path)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, buildPage(template, html), 'utf8')
    console.log(`  prerendered ${route.path}`)
  } catch (error) {
    failures.push({ path: route.path, error })
    console.error(`  FAILED ${route.path}: ${error.message}`)
  }
}

// sitemap.xml is generated from the same route list, so a new blog post or
// guide can never be left out of it.
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    r => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

console.log(
  `\nPrerendered ${routes.length - failures.length}/${routes.length} routes; sitemap.xml written with ${routes.length} URLs.`,
)

if (failures.length) {
  console.error(`\n${failures.length} route(s) failed to prerender.`)
  process.exit(1)
}
