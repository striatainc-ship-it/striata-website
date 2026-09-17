/**
 * Turn the studio vial photography into the web assets the product pages use.
 *
 * Input:  assets-source/vials/*.png  — 2048px squares on a white sweep, one
 *         per product. They are ~3.5 MB each and gitignored; the masters live
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

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'assets-source', 'vials')
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

/**
 * Knock the white studio sweep out of a vial shot.
 *
 * A blanket "white becomes transparent" would hollow out the label and the
 * lyophilised powder, both of which are white, so the fill starts at the image
 * border and only clears background actually connected to it. The vial's own
 * outline is dark enough everywhere to stop it.
 *
 * The one place a single threshold fails is the contact shadow: it is a soft
 * grey that never reaches the cutoff, so a strict pass leaves a smudge under
 * the vial. Below the vial's base the threshold therefore drops hard, which is
 * safe precisely because nothing of the vial is down there — `baseY` is found
 * per image as the last row still containing the vial's dark outline.
 *
 * Thresholding alone cannot separate the label from the sweep — both are
 * 253-255 — so what actually holds the fill out is the vial's edge, and on two
 * of the thirty shots (VIP, Thymosin Alpha-1) the label runs so close to the
 * glass that the edge thins to a pixel or two and the fill poured through,
 * emptying the white half of the label. Eroding the background mask before the
 * fill closes gaps that narrow; dilating the cleared region afterwards, and
 * only over pixels that were background to begin with, puts the real edge back
 * without reopening them.
 *
 * @returns {number} Fraction of the frame cleared.
 */
function knockOutBackground(data, width, height) {
  let baseY = height - 1
  for (let y = height - 1; y >= 0; y--) {
    let dark = 0
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (data[i] < 120 && data[i + 1] < 120 && data[i + 2] < 120) dark++
    }
    // A handful of pixels, not one: JPEG-ish noise in the sweep can produce a
    // lone dark pixel well below the vial.
    if (dark > 3) {
      baseY = y
      break
    }
  }

  // Start the aggressive band slightly above the base so the shadow that
  // spreads out to either side of the vial goes with it.
  const floorY = baseY - Math.round(height * 0.04)
  const thresholdAt = y => (y > floorY ? 150 : 246)

  // Everything pale enough to be sweep, label or powder — connectivity, not
  // this mask, is what tells them apart.
  const pale = new Uint8Array(width * height)
  for (let y = 0; y < height; y++) {
    const t = thresholdAt(y)
    for (let x = 0; x < width; x++) {
      const p = y * width + x
      const i = p * 4
      if (data[i] >= t && data[i + 1] >= t && data[i + 2] >= t) pale[p] = 1
    }
  }

  // Two rounds of erosion: enough to seal the pixel-wide gaps, small enough
  // that the dilation below restores the silhouette faithfully.
  const SEAL = 2

  let mask = pale
  for (let round = 0; round < SEAL; round++) {
    const next = new Uint8Array(width * height)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x
        if (mask[p] && mask[p - 1] && mask[p + 1] && mask[p - width] && mask[p + width]) next[p] = 1
      }
    }
    // The frame itself erodes away otherwise, and the fill needs somewhere to
    // start, so the border keeps whatever the unshrunk mask said.
    for (let x = 0; x < width; x++) {
      next[x] = pale[x]
      next[(height - 1) * width + x] = pale[(height - 1) * width + x]
    }
    for (let y = 0; y < height; y++) {
      next[y * width] = pale[y * width]
      next[y * width + width - 1] = pale[y * width + width - 1]
    }
    mask = next
  }

  const outside = new Uint8Array(width * height)
  const stack = []
  const seed = (x, y) => {
    const p = y * width + x
    if (!outside[p] && mask[p]) {
      outside[p] = 1
      stack.push(p)
    }
  }

  for (let x = 0; x < width; x++) {
    seed(x, 0)
    seed(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    seed(0, y)
    seed(width - 1, y)
  }

  while (stack.length) {
    const p = stack.pop()
    const x = p % width
    const y = (p - x) / width
    if (x > 0) seed(x - 1, y)
    if (x < width - 1) seed(x + 1, y)
    if (y > 0) seed(x, y - 1)
    if (y < height - 1) seed(x, y + 1)
  }

  // Grow the cleared region back by what erosion took, staying inside `pale`
  // so it can only reclaim pixels that were background in the first place.
  for (let round = 0; round < SEAL; round++) {
    const grown = Uint8Array.from(outside)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x
        if (outside[p] || !pale[p]) continue
        if (outside[p - 1] || outside[p + 1] || outside[p - width] || outside[p + width]) grown[p] = 1
      }
    }
    outside.set(grown)
  }

  let cleared = 0
  for (let p = 0; p < outside.length; p++) {
    if (!outside[p]) continue
    data[p * 4 + 3] = 0
    cleared++
  }

  // Feather the cut so the glass keeps its anti-aliased rim instead of ending
  // in a hard stair-step: an opaque pixel touching a cleared one gets alpha
  // from how far it is from white.
  const alphaAt = p => data[p * 4 + 3]
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x
      if (alphaAt(p) === 0) continue
      const touchesCleared =
        alphaAt(p - 1) === 0 ||
        alphaAt(p + 1) === 0 ||
        alphaAt(p - width) === 0 ||
        alphaAt(p + width) === 0
      if (!touchesCleared) continue
      const i = p * 4
      const brightness = Math.min(data[i], data[i + 1], data[i + 2])
      data[i + 3] = Math.round(Math.min(255, Math.max(0, (255 - brightness) * 3)))
    }
  }

  return cleared / (width * height)
}

const kb = bytes => `${Math.round(bytes / 1024)} KB`

// Every product that names a vial photo, so a file nobody references is caught
// here rather than silently shipped.
const wanted = products.flatMap(product => {
  const image = vialImage(product)
  return image ? [{ slug: image.slug, files: image.files }] : []
})

const available = new Set((await readdir(sourceDir)).filter(f => f.endsWith('.png')))
const missing = wanted.flatMap(w => w.files.filter(f => !available.has(`${f}.png`)))
if (missing.length) {
  console.error(`Missing source photos in assets-source/vials: ${missing.join(', ')}`)
  process.exit(1)
}

const referenced = new Set(wanted.flatMap(w => w.files.map(f => `${f}.png`)))
const orphans = [...available].filter(f => !referenced.has(f))
if (orphans.length) {
  console.warn(`  note: not referenced by any product, skipping — ${orphans.join(', ')}`)
}

await mkdir(outDir, { recursive: true })

let sourceBytes = 0
let outputBytes = 0

for (const { slug, files } of wanted) {
  // A product can have more than one photo (bacteriostatic water is shot in
  // both its sizes); the first is the primary, the rest get a -2, -3 suffix.
  for (const [index, file] of files.entries()) {
    const name = index === 0 ? slug : `${slug}-${index + 1}`
    const input = await readFile(join(sourceDir, `${file}.png`))
    sourceBytes += input.length

    const { data, info } = await sharp(input)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const cleared = knockOutBackground(data, info.width, info.height)
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
