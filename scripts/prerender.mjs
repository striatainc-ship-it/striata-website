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
import { basename, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { renderOgImage } from './lib/og-image.mjs'
import { OG_ORIGIN, ogImageFor } from '../src/lib/ogImage.js'

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

/** `property="og:image"` / `name="description"` -> the key it sets, or null. */
function metaKey(tag) {
  const match = tag.match(/<meta\b[^>]*?\b(property|name)=["']([^"']+)["']/i)
  return match ? `${match[1].toLowerCase()}:${match[2].toLowerCase()}` : null
}

const decode = (s) =>
  s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/** The section label printed above the title on a generated preview image. */
function eyebrowFor(path, html) {
  if (path.startsWith('/learn/')) {
    const section = html.match(/"articleSection":"([^"]+)"/)
    return section ? `STRIATA Learn · ${decode(section[1])}` : 'STRIATA Learn'
  }
  if (path.startsWith('/guides/')) return 'STRIATA Guide'
  if (path.startsWith('/stacks/')) return 'Peptide stack'
  if (/^\/catalogue\/[a-z-]+-peptides$/.test(path)) return 'Peptide range'
  if (path.startsWith('/tools')) return 'Free tool'
  if (path.startsWith('/quiz')) return 'Protocol quiz'
  return 'STRIATA'
}

/**
 * A social preview image for an indexable page that has no photo of its own:
 * one whose og:image is missing (it would fall back to the generic site
 * image) or points at /og/ (the page asked for a generated one by name).
 * Product, spray, pen and serum pages set their photography and are left
 * alone. Returns the head tags to add.
 */
async function previewImage(route, html, tags) {
  if (route.sitemap === false) return []
  const ogTag = tags.find((tag) => metaKey(tag) === 'property:og:image')
  const current = ogTag?.match(/content=["']([^"']+)["']/)?.[1] ?? null
  if (current && !current.startsWith(`${OG_ORIGIN}/og/`)) return []

  const url = current ?? ogImageFor(route.path)
  const rawTitle = decode(tags.find((tag) => tag.startsWith('<title'))?.replace(/<[^>]+>/g, '') ?? 'STRIATA')
  const parts = rawTitle.split(' | ')
  const title = parts[0] === 'STRIATA' && parts[1] ? parts[1] : parts[0]

  await mkdir(join(distDir, 'og'), { recursive: true })
  await renderOgImage({ title, eyebrow: eyebrowFor(route.path, html), file: join(distDir, 'og', basename(url)) })

  const hasTwitterImage = tags.some((tag) => metaKey(tag) === 'name:twitter:image')
  return [
    ...(current ? [] : [`<meta property="og:image" content="${url}"/>`]),
    ...(hasTwitterImage ? [] : [`<meta name="twitter:image" content="${url}"/>`]),
    '<meta property="og:image:width" content="1200"/>',
    '<meta property="og:image:height" content="630"/>',
  ]
}

/** Inject the rendered markup and this route's head tags into the template. */
function buildPage(template, html, extraTags = []) {
  const extracted = extractHoistedTags(html)
  const { body } = extracted
  const tags = [...extracted.tags, ...extraTags]
  let page = template

  // The template's <title> is only a fallback. Drop it when the route supplies
  // a real one, otherwise the page ships two and Google reads the wrong one.
  if (tags.some(tag => tag.startsWith('<title'))) {
    page = page.replace(/\n?[ \t]*<title>[\s\S]*?<\/title>/, '')
  }

  // Same problem one level down: index.html carries site-wide og:image and
  // og:type defaults, and a page that sets its own would ship both. Scrapers
  // differ on which of two og:image tags they believe, and the one they most
  // often pick is the first — which is the generic default, not the product
  // photo. So for every key the route sets, drop the template's version.
  for (const key of new Set(tags.map(metaKey).filter(Boolean))) {
    const [kind, name] = key.split(/:(.*)/s)
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const duplicate = new RegExp(
      `\\n?[ \\t]*<meta\\b(?=[^>]*?\\b${kind}=["']${escaped}["'])[^>]*?\\/?>`,
      'gi',
    )
    page = page.replace(duplicate, '')
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
    const extraTags = await previewImage(route, html, extractHoistedTags(html).tags)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, buildPage(template, html, extraTags), 'utf8')
    console.log(`  prerendered ${route.path}`)
  } catch (error) {
    failures.push({ path: route.path, error })
    console.error(`  FAILED ${route.path}: ${error.message}`)
  }
}

// sitemap.xml is generated from the same route list, so a new blog post or
// guide can never be left out of it. Routes flagged `sitemap: false` are
// prerendered but noindex, and listing them would only confuse Search Console.
const lastmod = new Date().toISOString().slice(0, 10)
const sitemapRoutes = routes.filter(r => r.sitemap !== false)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    r => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${r.lastmod ?? lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

console.log(
  `\nPrerendered ${routes.length - failures.length}/${routes.length} routes; sitemap.xml written with ${sitemapRoutes.length} URLs.`,
)

if (failures.length) {
  console.error(`\n${failures.length} route(s) failed to prerender.`)
  process.exit(1)
}
