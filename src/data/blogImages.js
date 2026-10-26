/**
 * Infographics for Learn articles, keyed by article slug. The image files are
 * made by `npm run images` from assets-source/blog/<slug>.png (see
 * scripts/optimize-images.mjs). Every fact in an image must match the article
 * it sits in: they were drawn from the article text, so update both together.
 *
 * `alt` describes what the image says, for screen readers and image search.
 * `caption` is shown under it.
 */
import { SITE_URL } from './site'

const BLOG_IMAGES = {
  'medical-aid-weight-loss-injections-south-africa': {
    alt: 'Flowchart: a GLP-1 injection prescribed for type 2 diabetes is usually funded by South African medical aid, because diabetes is on the Chronic Disease List; prescribed for weight loss only it is usually declined, because obesity is not a PMB condition. Still worth trying: medical savings account, above-threshold benefit, a motivated application for related conditions, or an ex gratia application.',
    caption: 'How South African medical schemes decide whether to fund Ozempic or Mounjaro.',
  },
  'where-to-buy-peptides-south-africa': {
    alt: 'Checklist for vetting a peptide supplier in South Africa. Must have: an independent lab Certificate of Analysis, HPLC purity of 98% or higher, mass spectrometry identity, endotoxin results, a batch number that matches your vial, cold storage at 2 to 8°C, and a sealed vial of white powder. Red flags: no CoA or an in-house CoA, a price far below the market, guaranteed health claims, no address or direct contact, and product that arrives pre-mixed or discoloured.',
    caption: 'What a trustworthy peptide supplier provides, and the red flags to walk away from.',
  },
  'peptides-anti-doping-south-africa': {
    alt: "Peptides on WADA's 2026 Prohibited List, all prohibited at all times. S0 non-approved substances: BPC-157 and any compound not approved anywhere, starting ban 2 years. S2 peptide hormones and growth factors: CJC-1295, tesamorelin, ipamorelin, GHRP-2, GHRP-6, AOD-9604, IGF-1 LR3, TB-500, and in males hCG, gonadorelin and kisspeptin, starting ban 4 years. S4.4 metabolic modulators: MOTS-c, starting ban 4 years. Strict liability applies.",
    caption: "Where common peptides sit on WADA's 2026 Prohibited List, and the starting ban for a first violation.",
  },
  'peptide-prices-south-africa': {
    alt: 'Guide to judging a peptide price in South Africa: compare price per mg (price divided by mg in the vial); fair reasons prices differ are 99%+ purity, third-party testing per batch, cold storage, and import duties and exchange rate; warning signs are a price far below the market, no Certificate of Analysis, underfilled vials, and no way to reach a person; a real monthly cost includes the compound and dose, water, syringes and swabs, bloodwork, and how many months.',
    caption: 'How to tell a fair peptide price from a warning sign, and what a real monthly budget includes.',
  },
  'semaglutide-vs-tirzepatide-vs-retatrutide': {
    alt: 'Bar chart of average body weight lost at the highest trial dose: semaglutide (GLP-1) 14.9% over 68 weeks in STEP 1; tirzepatide (GLP-1 and GIP) 20.9% over 72 weeks in SURMOUNT-1; retatrutide (GLP-1, GIP and glucagon) 24.2% over 48 weeks in a phase 2 trial. Long-term safety data is most mature for semaglutide, maturing for tirzepatide and limited for retatrutide.',
    caption: 'Average weight lost in each compound’s main trial. Separate trials of different lengths, not a head-to-head comparison.',
  },
}

const base = (slug) => `/assets/opt/blog-${slug}`

/** The infographic for an article, or null if it has none. */
export function blogImageFor(slug) {
  const image = BLOG_IMAGES[slug]
  if (!image) return null
  return {
    ...image,
    src: `${base(slug)}-768.webp`,
    srcSet: `${base(slug)}-768.webp 768w, ${base(slug)}-1536.webp 1536w`,
    full: `${base(slug)}-1536.webp`,
    // JPEG for og:image and Article.image: some scrapers still can't read WebP.
    shareUrl: `${SITE_URL}${base(slug)}-1200.jpg`,
    width: 1536,
    height: 869,
  }
}
