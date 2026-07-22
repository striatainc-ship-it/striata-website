/**
 * Generate the web-ready images in public/assets/opt from the originals in
 * assets-source/.
 *
 * The originals are 2–7 MB PNGs straight out of image generation — the
 * homepage alone shipped ~23 MB of them. Nothing in assets-source/ is
 * deployed; only the WebP output under public/assets/opt is.
 *
 * Run with `npm run images` after adding or replacing a source image, then
 * commit the output. It is deliberately NOT part of `npm run build`: the
 * inputs change rarely and re-encoding on every deploy would be wasted time.
 *
 * `widths` are the intrinsic widths to emit for a srcset — pick them from how
 * large the image actually renders, not from the source resolution. Widths
 * larger than the source are skipped rather than upscaled.
 */
import sharp from 'sharp'
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'assets-source')
const outDir = join(root, 'public', 'assets', 'opt')

// Column images render at ~576px inside the max-w-7xl two-column grid;
// full-bleed images run to the viewport width.
const COLUMN = [640, 1280]
const FULL_BLEED = [768, 1280, 1920]

const images = [
  { file: 'vial layouts 2.png', slug: 'vial-layouts-2', widths: FULL_BLEED },
  { file: 'purity.png', slug: 'purity', widths: FULL_BLEED },
  { file: 'hero background 2.png', slug: 'hero-background-2', widths: FULL_BLEED },
  // CSS background-image can't use a srcset, so these need one width only.
  { file: 'vial layouts.png', slug: 'vial-layouts', widths: [1920] },
  { file: 'background overlay 2.png', slug: 'background-overlay-2', widths: [1920] },
  { file: 'lab equipment 1.png', slug: 'lab-equipment-1', widths: [1280] },
  { file: 'purity 2.png', slug: 'purity-2', widths: COLUMN },
  { file: 'image 1.png', slug: 'image-1', widths: COLUMN },
  { file: 'athlete 2.png', slug: 'athlete-2', widths: COLUMN },
  { file: 'helix 2.png', slug: 'helix-2', widths: COLUMN },
  // Rendered at h-14 (56px tall), so 640px wide covers well past 2x.
  { file: 'logo-white.png', slug: 'logo-white', widths: [320, 640] },
]

const kb = bytes => `${Math.round(bytes / 1024)} KB`

await mkdir(outDir, { recursive: true })

let sourceBytes = 0
let outputBytes = 0

for (const { file, slug, widths } of images) {
  const path = join(sourceDir, file)
  const input = await readFile(path)
  const meta = await sharp(input).metadata()
  sourceBytes += input.length

  // These PNGs carry an alpha channel that is fully opaque. Dropping it
  // compresses noticeably better.
  const { isOpaque } = await sharp(input).stats()
  const usable = widths.filter(w => w <= meta.width)
  if (!usable.length) usable.push(meta.width)

  const variants = []

  for (const width of usable) {
    const pipeline = sharp(input).resize({ width, withoutEnlargement: true })
    if (isOpaque) pipeline.flatten({ background: '#0A1628' })

    const buffer = await pipeline.webp({ quality: 78, effort: 6 }).toBuffer()
    const name = `${slug}-${width}.webp`
    await writeFile(join(outDir, name), buffer)
    outputBytes += buffer.length
    variants.push({ name, width, bytes: buffer.length })
  }

  const before = kb(input.length)
  const after = kb(variants.at(-1).bytes)
  const saved = Math.round((1 - variants.at(-1).bytes / input.length) * 100)
  console.log(
    `  ${slug.padEnd(22)} ${before.padStart(9)} -> ${after.padStart(8)} (largest variant, -${saved}%)`,
  )
}

// The favicon was a 3840x2160 PNG weighing 1 MB. Browsers need at most 180px.
const iconSource = await readFile(join(sourceDir, 'logo-icon.png'))
for (const size of [32, 180]) {
  const buffer = await sharp(iconSource)
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer()
  await writeFile(join(outDir, `favicon-${size}.png`), buffer)
  outputBytes += buffer.length
  console.log(`  favicon-${size}.png`.padEnd(24) + ` ${kb(buffer.length).padStart(9)}`)
}
sourceBytes += iconSource.length

// schema.org Organization logo: Google wants PNG or JPEG here, not WebP.
const logoSource = await readFile(join(sourceDir, 'logo-white.png'))
const logoBuffer = await sharp(logoSource)
  .resize({ width: 640, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toBuffer()
await writeFile(join(outDir, 'logo-640.png'), logoBuffer)
outputBytes += logoBuffer.length
console.log(`  logo-640.png`.padEnd(24) + ` ${kb(logoBuffer.length).padStart(9)}`)

// og:image must stay JPEG — some social scrapers still don't decode WebP —
// and 1200x630 is the size Facebook, LinkedIn and X all crop to.
const ogSource = await readFile(join(sourceDir, 'helix.png'))
const ogBuffer = await sharp(ogSource)
  .resize({ width: 1200, height: 630, fit: 'cover' })
  .flatten({ background: '#0A1628' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer()
await writeFile(join(outDir, 'og-image.jpg'), ogBuffer)
outputBytes += ogBuffer.length
sourceBytes += ogSource.length
console.log(`  og-image.jpg`.padEnd(24) + ` ${kb(ogBuffer.length).padStart(9)}`)


const sourceTotal = (await readdir(sourceDir, { withFileTypes: true }))
  .filter(e => e.isFile())
  .reduce(async (acc, e) => (await acc) + (await stat(join(sourceDir, e.name))).size, Promise.resolve(0))

console.log(
  `\nOptimised ${images.length + 3} outputs: ${kb(sourceBytes)} of source -> ${kb(outputBytes)} shipped` +
    ` (-${Math.round((1 - outputBytes / sourceBytes) * 100)}%).` +
    `\nassets-source/ holds ${kb(await sourceTotal)} of originals and is not deployed.`,
)
