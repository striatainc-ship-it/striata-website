import { products } from './products'

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
    // The studio photography is of the vial, and a pen card showing a vial
    // would be a picture of the wrong product. The card falls back to no image
    // until pens are shot. `slug` is deliberately kept: the card still links to
    // the compound's page, which is the right place to read about it.
    photos: undefined,
    prices: prices.map((tier) => ({ ...tier, inStock: true })),
  }
})

export const penCount = pens.reduce((n, p) => n + p.prices.length, 0)
