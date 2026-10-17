/**
 * Turn the certificate-of-analysis scans into the images the product pages show.
 *
 * Input:  assets-source/coas/<name>.(jpeg|jpg|png) — the certificate as the lab
 *         issued it. Gitignored; the originals live in ../CoAs/ (OneDrive).
 * Output: public/assets/opt/coa/
 *         <name>-480.webp   thumbnail on the product page
 *         <name>-full.webp  the full certificate, opened in a new tab
 *
 * The certificates are published as issued: no cropping into the document,
 * no retouching. Screenshot chrome (phone status bar, browser bar) is cropped
 * off the master before it lands here, never anything printed on the page.
 *
 * Run with `npm run coas` after adding a certificate, then commit the output.
 */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'assets-source', 'coas')
const outDir = join(root, 'public', 'assets', 'opt', 'coa')

// Full size stays readable at 1600px; most scans are smaller and are not upscaled.
const FULL = 1600
const THUMB = 480

await mkdir(outDir, { recursive: true })

const files = (await readdir(sourceDir)).filter((f) => /\.(jpe?g|png)$/i.test(f))
for (const file of files) {
  const name = file.slice(0, -extname(file).length)
  const input = join(sourceDir, file)
  const { width } = await sharp(input).metadata()

  await sharp(input)
    .resize({ width: Math.min(width, FULL), withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(join(outDir, `${name}-full.webp`))
  await sharp(input)
    .resize({ width: THUMB, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(outDir, `${name}-480.webp`))

  console.log(`coa  ${name}`)
}
