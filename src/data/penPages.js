/**
 * Pens with a page of their own at /pens/<slug>. Chosen on 2026-10-16 from
 * real demand: Search Console queries for retatrutide, NAD+ and tesamorelin
 * pens by name, tirzepatide's weight-loss search volume, and MOTS-C as the
 * most-added vial on the order slip (GA4). To give another pen a page, add an
 * entry here; its card on /pens then links to the page instead of the vial's.
 *
 * Copy describes the compound and the format only. No doses, and no prices
 * in the prose: the page renders prices from pensData and products, so they
 * cannot go stale here.
 */
export const PEN_PAGES = [
  {
    productId: 46,
    slug: 'retatrutide-pen',
    title: 'Retatrutide Pen South Africa | Pre-Filled | STRIATA',
    description:
      'Retatrutide in a pre-filled pen: no reconstitution, no syringes. The GIP, GLP-1 and glucagon triple agonist, delivered cold-chain across South Africa.',
    intro: [
      'The retatrutide pen holds retatrutide already in solution, in a sealed, pre-filled pen with a dial. It is the same compound as our retatrutide vial: a single peptide that acts on three receptors, GIP, GLP-1 and glucagon, and that has been studied in phase 1 and phase 2 human trials for body weight and blood sugar.',
      'What changes is the format. There is no powder to reconstitute, no bacteriostatic water and no insulin syringe to draw from. That convenience is what the price difference over the vial pays for; if you already work with vials, the vial is the cheaper route to the same compound.',
    ],
  },
  {
    productId: 47,
    slug: 'tirzepatide-pen',
    title: 'Tirzepatide Pen South Africa | Pre-Filled | STRIATA',
    description:
      'Tirzepatide in a pre-filled pen: no reconstitution, no syringes. The dual GIP and GLP-1 receptor agonist, delivered cold-chain across South Africa.',
    intro: [
      'The tirzepatide pen holds tirzepatide already in solution, in a sealed, pre-filled pen with a dial. Tirzepatide is the dual GIP and GLP-1 receptor agonist with the largest body of human trial data of anything we stock, and the compound in the registered medicine Mounjaro.',
      'This pen is unbranded tirzepatide supplied for research. It is not Mounjaro and not a substitute for a prescribed medicine. The difference from our tirzepatide vial is the format alone: no reconstitution, no bacteriostatic water and no syringe to draw from, at a higher price than the vial.',
    ],
  },
  {
    productId: 68,
    slug: 'nad-plus-pen',
    title: 'NAD+ Pen South Africa | Pre-Filled 500mg | STRIATA',
    description:
      'NAD+ in a pre-filled 500mg pen: no reconstitution, no syringes. The coenzyme studied in ageing research, delivered cold-chain across South Africa.',
    intro: [
      'NAD+ (nicotinamide adenine dinucleotide) is the coenzyme at the centre of cellular energy production. Its levels decline with age, which is why it features so heavily in ageing research. The NAD+ pen holds it already in solution, in a sealed, pre-filled pen with a dial.',
      'We supply NAD+ in three formats: this pen, a lyophilised vial and a nasal spray. The compound is the same in each; what differs is how much preparation it needs and the price. The pen needs none, the vial needs reconstituting, and the spray is a ready-made format of its own.',
    ],
  },
  {
    productId: 44,
    slug: 'tesamorelin-pen',
    title: 'Tesamorelin Pen South Africa | Pre-Filled | STRIATA',
    description:
      'Tesamorelin in a pre-filled pen, in two sizes: no reconstitution, no syringes. The GHRH analogue studied for visceral fat, delivered across South Africa.',
    intro: [
      'Tesamorelin is a GHRH analogue: it acts on the pituitary to raise the body’s own growth hormone release, rather than supplying growth hormone itself, and it has been studied in clinical trials for reducing visceral fat. The tesamorelin pen holds it already in solution, in a sealed, pre-filled pen with a dial.',
      'The pen comes in two sizes. As with every pen we list, the compound matches the vial and the difference is the format: no reconstitution and no syringe, at a higher price than the vial of the same strength.',
    ],
  },
  {
    productId: 33,
    slug: 'mots-c-pen',
    title: 'MOTS-C Pen South Africa | Pre-Filled | STRIATA',
    description:
      'MOTS-c in a pre-filled pen, in two sizes: no reconstitution, no syringes. The mitochondrial-derived peptide studied for metabolism, delivered across SA.',
    intro: [
      'MOTS-c is a 16-amino-acid peptide encoded in mitochondrial DNA rather than in the cell nucleus, first described in 2015. It has been studied mainly in animal models for its effects on insulin sensitivity, metabolism and exercise capacity. The MOTS-C pen holds it already in solution, in a sealed, pre-filled pen with a dial.',
      'The pen comes in two sizes. The compound matches our MOTS-C vial; the pen trades a higher price for skipping reconstitution and syringes.',
    ],
  },
]

export const penPagePath = (page) => `/pens/${page.slug}`

export const penPageFor = (productId) => PEN_PAGES.find((p) => p.productId === productId) ?? null

export const penPageBySlug = (slug) => PEN_PAGES.find((p) => p.slug === slug) ?? null
