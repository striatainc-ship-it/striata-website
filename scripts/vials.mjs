/**
 * Turn the studio vial photography into the web assets the product pages use.
 *
 * Input:  assets-source/vials/*.png  — 2048px squares on a white sweep, one
 *         per product. assets-source/sprays/*.png — the nasal spray bottles,
 *         1360x2048, same sweep; masters in ../assets/Nasal Spray Images/. They are ~3.5 MB each and gitignored; the masters live
 *         in ../assets/Vial Images/ (OneDrive). Output IS committed.
 * Output: public/assets/opt/vials/
 *         <slug>-{160,320,640,960}.webp  transparent cut-out, for the dark UI
 *         <slug>-sq.jpg              1000x1000 on white, for Product.image
 *         <slug>-og.jpg              1200x630 on white, for og:image
 *
 * The site is near-black navy, so a white square photo dropped onto it reads
 * as a bright hole. Knocking the background out instead lets the vial sit on
 * the page like an object rather than a pasted-in tile. Structured data and
 * social scrapers want the opposite — a neutral, opaque, conventionally
 * shaped image — so both forms are emitted from the same master.
 *
 * Run with `npm run vials` after adding or replacing a photo, then commit the
 * output. Deliberately not part of `npm run build`: 30 flood fills over 2048px
 * buffers is about a minute, and the inputs change only when stock does.
 */
import sharp from 'sharp'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { products, vialImage } from '../src/data/products.js'
import { nasalSprays } from '../src/data/nasalSpraysData.js'
import { knockOutBackground } from './lib/cutout.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = join(root, 'assets-source')
const outDir = join(root, 'public', 'assets', 'opt', 'vials')

/**
 * The cut-out renders ~80px tall in a catalogue card and ~450px in the product
 * hero, so 160 covers the card at 2x and 960 covers the hero at 2x. 320 and
 * 640 fill in the srcset between them.
 *
 * Each is padded to 1:2 rather than emitted at whatever the trim produced.
 * Trimmed vials land between 0.41 and 0.48 wide-to-tall, so a 1:2 box holds
 * every one of them without cropping, and padding to it buys two things: the
 * `width`/`height` attributes in the markup are exactly right, which is what
 * stops the image reserving the wrong space and shifting the layout; and every
 * vial is normalised to the same height, so a row of cards lines up.
 */
const WIDTHS = [160, 320, 640, 960]
const ASPECT = 2

/** White-background JPEGs for structured data (1:1) and social cards (1.91:1). */
const SQUARE = 1000
const OG = { width: 1200, height: 630 }

const kb = bytes => `${Math.round(bytes / 1024)} KB`

// Every product that names a photo, so a file nobody references is caught
// here rather than silently shipped. The nasal sprays are shot the same way
// (white sweep, product centred) and share the output folder under their own
// names; their masters sit in assets-source/sprays because Windows would
// otherwise collide Semax.png with the vial's semax.png.
const wanted = [...products, ...nasalSprays].flatMap(product => {
  const image = vialImage(product)
  return image
    ? [{ slug: image.slug, files: image.files, sourceDir: image.sourceDir, bottle: image.sourceDir === 'sprays' }]
    : []
})

const missing = []
const orphans = []
for (const dir of new Set(wanted.map(w => w.sourceDir))) {
  const available = new Set((await readdir(join(sourceRoot, dir))).filter(f => f.endsWith('.png')))
  const inDir = wanted.filter(w => w.sourceDir === dir)
  missing.push(...inDir.flatMap(w => w.files.filter(f => !available.has(`${f}.png`)).map(f => `${dir}/${f}`)))
  const referenced = new Set(inDir.flatMap(w => w.files.map(f => `${f}.png`)))
  orphans.push(...[...available].filter(f => !referenced.has(f)).map(f => `${dir}/${f}`))
}
if (missing.length) {
  console.error(`Missing source photos in assets-source: ${missing.join(', ')}`)
  process.exit(1)
}
if (orphans.length) {
  console.warn(`  note: not referenced by any product, skipping — ${orphans.join(', ')}`)
}

await mkdir(outDir, { recursive: true })

let sourceBytes = 0
let outputBytes = 0

for (const { slug, files, sourceDir, bottle } of wanted) {
  // A product can have more than one photo (bacteriostatic water is shot in
  // both its sizes); the first is the primary, the rest get a -2, -3 suffix.
  for (const [index, file] of files.entries()) {
    const name = index === 0 ? slug : `${slug}-${index + 1}`
    const input = await readFile(join(sourceRoot, sourceDir, `${file}.png`))
    sourceBytes += input.length

    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    // Spray bottles have a white pump cap on the white sweep; see rowConvex.
    const cleared = knockOutBackground(data, info.width, info.height, { rowConvex: bottle })
    const cutout = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 1 })
      .png()
      .toBuffer()

    let bytes = 0
    for (const width of WIDTHS) {
      const buffer = await sharp(cutout)
        .resize({
          width,
          height: width * ASPECT,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ quality: 82, effort: 6, alphaQuality: 90 })
        .toBuffer()
      await writeFile(join(outDir, `${name}-${width}.webp`), buffer)
      bytes += buffer.length
    }

    // The JPEGs come from the untouched master, not the cut-out: Google wants
    // a plain product photo here, and a transparent WebP flattened to black
    // would be worse than the white sweep it was shot on.
    const square = await sharp(input)
      .resize({ width: SQUARE, height: SQUARE, fit: 'contain', background: '#ffffff' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()
    await writeFile(join(outDir, `${name}-sq.jpg`), square)
    bytes += square.length

    const og = await sharp(input)
      .resize({ ...OG, fit: 'contain', background: '#ffffff' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toBuffer()
    await writeFile(join(outDir, `${name}-og.jpg`), og)
    bytes += og.length

    outputBytes += bytes
    console.log(
      `  ${name.padEnd(28)} ${kb(input.length).padStart(9)} -> ${kb(bytes).padStart(8)}` +
        ` across ${WIDTHS.length + 2} files (${Math.round(cleared * 100)}% background cleared)`,
    )
  }
}

console.log(
  `\n${wanted.length} products, ${kb(sourceBytes)} of masters -> ${kb(outputBytes)} shipped` +
    ` (-${Math.round((1 - outputBytes / sourceBytes) * 100)}%).`,
)
