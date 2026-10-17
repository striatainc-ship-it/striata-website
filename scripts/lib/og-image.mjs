/**
 * Social preview images (1200x630) for pages that have no photo of their own:
 * the page title on the brand background, with its section and the logo.
 *
 * Text goes through sharp's Pango renderer, which cannot read the site's
 * .woff2 files, so scripts/fonts holds static TTF instances of the same two
 * typefaces (Bricolage Grotesque 800 and Manrope 600, both OFL), cut from
 * public/fonts with fontTools. Pango matches them by the family names those
 * files carry, which is why the names below look odd.
 */
import sharp from 'sharp'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const HEADING = { family: 'Bricolage Grotesque 96pt ExtraBold', file: join(root, 'scripts/fonts/BricolageGrotesque-ExtraBold.ttf') }
const BODY = { family: 'Manrope ExtraLight', file: join(root, 'scripts/fonts/Manrope-SemiBold.ttf') }
const LOGO = join(root, 'public/assets/opt/logo-white-640.webp')
// The site's DNA artwork as a backdrop. It is scaled up 10% and cropped from
// the top-left so the generator's watermark in its bottom-right corner falls
// outside the frame, then darkened under a navy wash so the title reads.
// (Kept as its own file since og-image.jpg became the vial photograph.)
const ARTWORK = join(root, 'public/assets/opt/og-artwork.jpg')

const W = 1200
const H = 630
const PAD = 80
const TEXT_WIDTH = W - PAD * 2

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const BACKGROUND = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="88%" cy="18%" r="70%">
      <stop offset="0" stop-color="#00B4B4" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#00B4B4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0%" cy="100%" r="60%">
      <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <defs>
    <linearGradient id="wash" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0A1628" stop-opacity="0.94"/>
      <stop offset="0.6" stop-color="#0A1628" stop-opacity="0.86"/>
      <stop offset="1" stop-color="#0A1628" stop-opacity="0.62"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#wash)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#glow2)"/>
  <rect x="0" y="0" width="10" height="${H}" fill="#00B4B4"/>
</svg>`)

/** One block of text rendered to a transparent PNG, with its size. */
async function textBlock({ markup, font, size, width, spacing = 0, lineSpacing }) {
  const { data, info } = await sharp({
    text: {
      text: markup,
      font: `${font.family} ${size}`,
      fontfile: font.file,
      width,
      dpi: 72,
      rgba: true,
      wrap: 'word',
      spacing: lineSpacing,
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true })
  return { data, width: info.width, height: info.height, spacing }
}

/**
 * Title sized to fit: the longest titles step down so the block stays within
 * three lines and clear of the footer.
 */
async function fitTitle(title) {
  for (const size of [68, 60, 54, 48, 42]) {
    const block = await textBlock({
      markup: `<span foreground="#FFFFFF">${escape(title)}</span>`,
      font: HEADING,
      size,
      width: TEXT_WIDTH,
      lineSpacing: Math.round(size * 0.12),
    })
    if (block.height <= 300) return block
  }
  return textBlock({ markup: `<span foreground="#FFFFFF">${escape(title)}</span>`, font: HEADING, size: 38, width: TEXT_WIDTH })
}

export async function renderOgImage({ title, eyebrow, file }) {
  const logo = await sharp(LOGO).resize({ height: 58 }).png().toBuffer()
  const label = await textBlock({
    markup: `<span foreground="#00B4B4" letter_spacing="2400">${escape(eyebrow.toUpperCase())}</span>`,
    font: BODY,
    size: 22,
    width: TEXT_WIDTH,
  })
  const heading = await fitTitle(title)
  const footer = await textBlock({
    markup: `<span foreground="#FFFFFF" alpha="55%">striatalabs.co.za  ·  Research peptides, South Africa</span>`,
    font: BODY,
    size: 22,
    width: TEXT_WIDTH,
  })

  // Eyebrow and title sit as one group, centred in the space between the
  // logo and the footer.
  const groupHeight = label.height + 22 + heading.height
  const top = Math.max(150, Math.round(150 + (360 - groupHeight) / 2))

  const artwork = await sharp(ARTWORK)
    .resize({ width: Math.round(W * 1.1) })
    .extract({ left: 0, top: 0, width: W, height: H })
    .toBuffer()

  await sharp(artwork)
    .composite([
      { input: BACKGROUND, top: 0, left: 0 },
      { input: logo, top: 64, left: PAD },
      { input: label.data, top, left: PAD },
      { input: heading.data, top: top + label.height + 22, left: PAD },
      { input: footer.data, top: H - 64 - footer.height, left: PAD },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(file)
}
