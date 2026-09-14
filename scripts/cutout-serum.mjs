/**
 * Knock the white studio background out of the GHK-Cu serum shot.
 *
 * A plain "make white transparent" pass would hollow out the white dropper
 * bulb, so instead the fill starts from the image border and only clears
 * background that is connected to it. Two thresholds: strict near the top,
 * where the bulb's highlights meet the background, and loose across the
 * bottom band so the soft grey floor reflection goes with the background —
 * the page draws its own contact shadow.
 *
 * Writes assets-source/ghk-serum-cut.png; run `npm run images` afterwards.
 */
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const input = join(root, 'assets-source', 'ghk-serum.jpg')
const output = join(root, 'assets-source', 'ghk-serum-cut.png')

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height } = info

// The floor reflection starts at the bottle's base edge, ~79% down the
// frame; the glass there is deep blue, so nothing of the bottle is at risk.
const FLOOR_Y = Math.round(height * 0.79)
// The bulb occupies the top ~30%; be strict there.
const BULB_Y = Math.round(height * 0.32)

// The bottle base is deep blue, so the floor band can be aggressive.
const thresholdAt = (y) => (y > FLOOR_Y ? 140 : y < BULB_Y ? 250 : 240)

const isBackground = (x, y) => {
  const i = (y * width + x) * 4
  const t = thresholdAt(y)
  return data[i] >= t && data[i + 1] >= t && data[i + 2] >= t
}

const visited = new Uint8Array(width * height)
const stack = []
const seed = (x, y) => {
  const p = y * width + x
  if (!visited[p] && isBackground(x, y)) { visited[p] = 1; stack.push(p) }
}
for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1) }
for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y) }

let cleared = 0
while (stack.length) {
  const p = stack.pop()
  const x = p % width
  const y = (p - x) / width
  data[p * 4 + 3] = 0
  cleared++
  if (x > 0) seed(x - 1, y)
  if (x < width - 1) seed(x + 1, y)
  if (y > 0) seed(x, y - 1)
  if (y < height - 1) seed(x, y + 1)
}

// Soften the cut edge: any opaque pixel touching a cleared one gets alpha
// from how far it is from white, so the bottle's anti-aliased rim survives.
const alphaAt = (p) => data[p * 4 + 3]
for (let y = 1; y < height - 1; y++) {
  for (let x = 1; x < width - 1; x++) {
    const p = y * width + x
    if (alphaAt(p) === 0) continue
    const nearCleared =
      alphaAt(p - 1) === 0 || alphaAt(p + 1) === 0 || alphaAt(p - width) === 0 || alphaAt(p + width) === 0
    if (!nearCleared) continue
    const i = p * 4
    const brightness = Math.min(data[i], data[i + 1], data[i + 2])
    data[i + 3] = Math.round(Math.min(255, Math.max(0, (255 - brightness) * 3)))
  }
}

await sharp(data, { raw: { width, height, channels: 4 } })
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toFile(output)

console.log(`cleared ${Math.round((cleared / (width * height)) * 100)}% of pixels -> ${output}`)
