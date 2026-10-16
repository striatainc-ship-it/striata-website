import { products } from './products.js'
import { penPageFor, penPagePath } from './penPages.js'

/**
 * Peptide pens — the same compounds as the catalogue, in a pre-filled pen.
 *
 * Each entry points at the vial product (by id) so the name, description,
 * category and tags stay in one place; only the pen-specific doses and
 * prices live here. Every pen listed is a current stock line.
 */
const PENS = [
  { productId: 3,  prices: [{ dose: '10mg+10mg', price: 1200 }] },  // BPC+TB Wolverine Stack
  { productId: 22, prices: [{ dose: '100mg', price: 1100 }] },      // GHK-Cu
  { productId: 33, prices: [{ dose: '10mg', price: 1200 }, { dose: '20mg', price: 1600 }] }, // MOTS-C
  { productId: 9,  prices: [{ dose: '10mg', price: 850 }] },        // GHRP-6
  { productId: 12, prices: [{ dose: '5mg+5mg', price: 800 }] },     // CJC-1295 + Ipamorelin
  { productId: 44, prices: [{ dose: '5mg', price: 850 }, { dose: '10mg', price: 1500 }] },   // Tesamorelin
  { productId: 46, prices: [{ dose: '30mg', price: 2100 }] },       // Retatrutide
  { productId: 47, prices: [{ dose: '30mg', price: 1800 }] },       // Tirzepatide
  { productId: 49, prices: [{ dose: '5mg', price: 900 }] },         // Cagrilintide
  { productId: 34, prices: [{ dose: '10mg', price: 800 }] },        // PT-141
  { productId: 40, prices: [{ dose: '5mg', price: 750 }] },         // Oxytocin
  { productId: 61, prices: [{ dose: '5mg', price: 750 }] },         // Semax
  { productId: 60, prices: [{ dose: '5mg', price: 750 }] },         // Selank
  { productId: 23, prices: [{ dose: '10mg', price: 750 }] },        // Epithalon
  { productId: 62, prices: [{ dose: '5mg', price: 700 }] },         // DSIP
  { productId: 15, prices: [{ dose: '70mg', price: 1650 }] },       // GLOW Stack
  { productId: 89, prices: [{ dose: '80mg', price: 1800 }] },       // KLOW Stack
  { productId: 19, prices: [{ dose: '10mg', price: 850 }] },        // KPV
  { productId: 85, prices: [{ dose: '10mg', price: 1000 }] },       // Adamax
  { productId: 68, prices: [{ dose: '500mg', price: 750 }] },       // NAD+
  { productId: 28, prices: [{ dose: '600mg', price: 650 }] },       // Glutathione
  { productId: 42, prices: [{ dose: '10mg', price: 900 }] },        // 5-Amino-1MQ
  { productId: 90, prices: [{ dose: '5mg', price: 750 }] },         // SLU-PP-332
  { productId: 43, prices: [{ dose: '5mg', price: 1000 }] },        // AOD-9604
  { productId: 35, prices: [{ dose: '10mg', price: 950 }] },        // Melanotan II
  { productId: 73, prices: [{ dose: '5mg', price: 850 }] },         // VIP
  { productId: 71, prices: [{ dose: '10mg', price: 1550 }] },       // Thymosin Alpha-1
  { productId: 64, prices: [{ dose: '10mg', price: 950 }] },        // Pinealon
  { productId: 41, prices: [{ dose: '10mg', price: 1100 }] },       // Kisspeptin
]

/**
 * Pen photography, by catalogue id: box and pen together, one shot per
 * compound. Masters are in ../assets/Peptide Pens/, copied to
 * assets-source/pens/; `npm run vials` emits them as <slug>-pen-*. Where a pen
 * comes in two sizes the shot is of one of them (MOTS-C 20mg, Tesamorelin
 * 10mg). A pen missing here shows PEN_PLACEHOLDER rather than the vial's.
 */
const PEN_PHOTOS = {
  3: 'Wolverine Stack 20mg Complete',
  22: 'GHK Cu 100mg Complete',
  33: 'MOTS C 20mg Complete',
  12: 'CJC Ipa 10mg Complete',
  44: 'Tesamorelin 10mg Complete',
  46: 'Retatrutide 30mg Complete',
  47: 'Tirzepatide 30mg Complete',
  34: 'PT141 10mg Complete',
  61: 'Semax 5mg Complete',
  60: 'Selank 5mg Complete',
  23: 'Epithalon 10mg Complete',
  62: 'DSIP 5mg Complete',
  15: 'GLOW Stack 70mg Complete',
  89: 'KLOW Stack 80mg Complete',
  19: 'KPV 10mg Complete',
  85: 'Adamax 10mg Complete',
  68: 'NAD+ 500mg Complete',
}

/**
 * Stand-in for the pens not yet photographed: an AI-generated (Higgsfield)
 * box and pen in the house style with no compound name on it, so it can
 * never be read as the wrong product. The card captions it as illustrative
 * and it is kept out of structured data. Remove a pen from this fallback by
 * adding its real shot to PEN_PHOTOS.
 */
const PEN_PLACEHOLDER = 'Pen Placeholder'

const byId = new Map(products.map((p) => [p.id, p]))

// Resolved pen products, shaped exactly like catalogue products so ProductCard
// can render them. Pens carry a distinct id so React keys never collide.
export const pens = PENS.map(({ productId, prices }) => {
  const base = byId.get(productId)
  if (!base) throw new Error(`pensData: no catalogue product with id ${productId}`)
  return {
    ...base,
    id: `pen-${productId}`,
    format: 'Pen',
    // Never inherit the vial's photos: a pen card showing a vial is a picture
    // of the wrong product. `slug` is deliberately kept, so the card still
    // links to the compound's page; `imageName` gives the pen its own files.
    // Every placeholder pen shares the one set of files.
    photos: [PEN_PHOTOS[productId] ?? PEN_PLACEHOLDER],
    photoLabels: undefined,
    photoDir: 'pens',
    photoShape: 'wide',
    photoPlaceholder: !PEN_PHOTOS[productId],
    imageName: PEN_PHOTOS[productId] ? `${base.slug}-pen` : 'pen-placeholder',
    prices: prices.map((tier) => ({ ...tier, inStock: true })),
    // A pen with its own page links there (productPath prefers `page`);
    // the rest link to the compound's vial page.
    ...(penPageFor(productId) ? { page: penPagePath(penPageFor(productId)) } : {}),
  }
})

export const penCount = pens.reduce((n, p) => n + p.prices.length, 0)
