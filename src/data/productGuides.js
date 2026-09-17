/**
 * Catalogue product id -> the Learn post that explains it. Rendered as a
 * "Read our guide" link on the product card, so the deep articles pick up
 * links from the pages people actually land on (before this, most posts had
 * a single inbound link from the /learn index).
 */
export const PRODUCT_GUIDES = {
  1: 'bpc-157-south-africa',
  2: 'tb-500-thymosin-beta-4-guide',
  3: 'wolverine-stack-bpc-157-tb-500',
  4: 'igf-1-lr3-recovery-muscle-repair',
  5: 'aod-9604-vs-hgh-fragment-176-191',
  15: 'glow-stack-peptides-skin-regeneration',
  22: 'ghk-cu-copper-peptide-anti-aging',
  91: 'ghk-cu-copper-peptide-anti-aging',
  23: 'epithalon-longevity-telomerase-research',
  24: 'fox04-dri-senolytic-peptide-cellular-aging',
  34: 'pt-141-peptide-libido-men-women',
  37: 'hcg-testosterone-hormonal-support-peptide',
  39: 'gonadorelin-vs-hcg-hormonal-health',
  40: 'oxytocin-beyond-bonding-hormone-research',
  41: 'kisspeptin-testosterone-hormonal-health',
  43: 'aod-9604-vs-hgh-fragment-176-191',
  46: 'semaglutide-vs-tirzepatide-vs-retatrutide',
  47: 'semaglutide-vs-tirzepatide-vs-retatrutide',
  48: 'semaglutide-south-africa',
  84: 'semaglutide-vs-tirzepatide-vs-retatrutide',
  49: 'glp-1-peptides-explained',
  50: 'glp-1-peptides-explained',
  51: 'glp-1-peptides-explained',
  52: 'glp-1-peptides-explained',
  53: 'glp-1-peptides-explained',
  54: 'glp-1-peptides-explained',
  60: 'selank-vs-semax-nootropic-peptide-comparison',
  61: 'semax-nootropic-peptide-guide',
  62: 'dsip-delta-sleep-inducing-peptide-guide',
  63: 'pe-22-28-mood-support-peptide-research',
  68: 'nad-plus-aging-decline-what-to-do',
  87: 'how-to-store-and-reconstitute-peptides',
}

export const guideFor = (product) => PRODUCT_GUIDES[product.id] || null
