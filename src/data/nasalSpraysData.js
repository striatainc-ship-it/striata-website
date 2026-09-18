import { products } from './products.js'

/**
 * Nasal sprays — catalogue compounds in a 10 ml amber nasal spray bottle.
 *
 * Same shape as pensData: each entry points at the vial product (by id) so the
 * compound page stays the single place to read about the peptide. What lives
 * here is spray-specific: the positioning, the amount per bottle, the price and
 * the write-up. Copy and prices come from the brief in
 * `Website Content/Nasal Sprays/`. Every spray listed is a current stock line.
 * `photo` names the master in assets-source/sprays (see scripts/vials.mjs).
 */
const SPRAYS = [
  {
    productId: 61,
    anchor: 'semax',
    photo: 'Semax',
    name: 'Semax',
    positioning: 'Focus & Cognition',
    amount: '5mg',
    price: 400,
    description: 'The ACTH-derived nootropic, researched for sustained attention, working memory and mental stamina.',
    writeup: [
      'Semax is a synthetic peptide originally developed in Russia as an analogue of a fragment of adrenocorticotropic hormone (ACTH 4–10), stripped of its hormonal activity while retaining its effects on the central nervous system. It is one of the most studied nootropic peptides in the research literature, with a body of work — mostly from Russian institutions — investigating its influence on brain-derived neurotrophic factor (BDNF) expression, attention, and neuroprotection following ischaemic events.',
      'Research interest centres on sustained attention, working memory and mental stamina under cognitively demanding conditions. It has also been studied in the context of ADHD-type symptoms and post-stroke recovery, though these remain research contexts rather than approved clinical uses outside Russia.',
    ],
  },
  {
    productId: 60,
    anchor: 'selank',
    photo: 'Selank',
    name: 'Selank',
    positioning: 'Calm & Resilience',
    amount: '5mg',
    price: 430,
    description: 'A tuftsin analogue studied for calm without sedation: stress response, emotional regulation and a mild nootropic profile.',
    writeup: [
      'Selank is a synthetic analogue of tuftsin, an immunomodulatory peptide, engineered for improved stability and CNS penetration. Like Semax, it emerged from Russian peptide research and has been studied for anxiolytic (anxiety-reducing) properties that researchers report occur without the sedation or dependency profile associated with benzodiazepines.',
      'Studies have looked at its effect on cortisol dynamics and generalised anxiety symptoms, alongside a mild nootropic profile. That combination — calm without sedation — is the throughline of the research and of this spray’s positioning.',
    ],
  },
  {
    productId: 40,
    anchor: 'oxytocin',
    photo: 'Oxytocin',
    name: 'Oxytocin',
    positioning: 'Connection & Mood',
    amount: '5mg',
    price: 540,
    description: 'The bonding neuropeptide, with a substantial intranasal research literature on trust, empathy and social behaviour.',
    writeup: [
      'Oxytocin is a naturally occurring neuropeptide hormone produced in the hypothalamus. It has long been known for its role in childbirth and lactation, but is increasingly studied — particularly via intranasal administration — for its central effects on social behaviour. The research press often calls it the “bonding hormone”.',
      'Intranasal oxytocin has a substantial research literature examining trust, empathy, social recognition and emotional bonding, along with exploratory work in social anxiety and autism spectrum research contexts. The “connection” positioning tracks directly with what the published research investigates.',
    ],
  },
  {
    productId: 62,
    anchor: 'dsip',
    photo: 'DSIP',
    name: 'DSIP',
    positioning: 'Deep Sleep',
    amount: '5mg',
    price: 570,
    description: 'Delta Sleep-Inducing Peptide, researched for sleep architecture, stress regulation and circadian rhythm.',
    writeup: [
      'Delta Sleep-Inducing Peptide (DSIP) was first isolated in the 1970s during studies on sleep induction, and named for its association with delta-wave (slow-wave) sleep activity on EEG. It has since been studied for a potential role in stress regulation, pain modulation and normalising disrupted sleep-wake cycles.',
      'Despite the name, DSIP’s direct sleep-inducing effect in humans has produced mixed results across studies. Researchers now investigate it more broadly as a stress-and-circadian-regulation peptide than as a straightforward sedative — its research interest lies in sleep architecture and recovery rather than sedation.',
    ],
  },
  {
    productId: 85,
    anchor: 'adamax',
    photo: 'Adamax',
    name: 'Adamax',
    positioning: 'Libido & Drive',
    amount: '10mg',
    price: 780,
    description: 'A next-generation Semax analogue, formulated for research into drive and vitality.',
    writeup: [
      'Adamax is a structurally modified analogue of Semax, a newer compound in the ACTH-derived peptide lineage. It is formulated in this range for research into drive and vitality.',
      'Its research base is considerably thinner than that of Semax, which has decades of Russian clinical use behind it. Anyone choosing between the two should weigh that difference.',
    ],
  },
  {
    productId: 34,
    anchor: 'pt-141',
    photo: 'PT141',
    name: 'PT-141',
    positioning: 'Sexual Wellness',
    amount: '10mg',
    price: 520,
    description: 'Bremelanotide, a melanocortin agonist that acts on central arousal pathways rather than blood flow.',
    writeup: [
      'PT-141 (bremelanotide) is a melanocortin receptor agonist — it acts on MC3R/MC4R pathways in the brain rather than on vascular tissue the way traditional ED medications do. It is notable in this range for having an approved pharmaceutical form (Vyleesi, an injectable) for hypoactive sexual desire disorder in women, and it has separately been studied for erectile dysfunction in men.',
      'That central mechanism — nervous system arousal pathways rather than local blood flow — is what sets PT-141 apart in the research literature. Side effects reported in that literature include nausea, flushing and transient blood pressure changes.',
    ],
  },
  {
    productId: 68,
    anchor: 'nad-plus',
    photo: 'NAD',
    name: 'NAD+',
    positioning: 'Energy & Longevity',
    amount: '500mg',
    price: 460,
    description: 'The coenzyme at the centre of cellular energy metabolism and DNA repair, in an intranasal format.',
    writeup: [
      'Nicotinamide adenine dinucleotide (NAD+) is a coenzyme central to cellular energy metabolism, present in every living cell and involved in mitochondrial function and DNA repair pathways. NAD+ levels are well documented to decline with age, which has driven a wave of research interest in restoring them via IV therapy, oral precursors and — as here — intranasal delivery.',
      'Cellular energy production and age-related decline are the two pillars most NAD+ research rests on. Intranasal bioavailability of NAD+ is an active area of research rather than settled science.',
    ],
  },
  {
    productId: 73,
    anchor: 'vip',
    photo: 'VIP',
    name: 'VIP',
    positioning: 'Recovery & Healing',
    amount: '5mg',
    price: 1240,
    description: 'Vasoactive Intestinal Peptide, researched for anti-inflammatory signalling and immune modulation.',
    writeup: [
      'Vasoactive Intestinal Peptide (VIP) is a neuropeptide with wide-ranging roles in vasodilation, immune modulation and anti-inflammatory signalling. It has drawn particular attention in research and functional-medicine circles around chronic inflammatory response syndrome (CIRS) and mould-related illness protocols, alongside broader interest in tissue repair and immune regulation.',
      'The recovery it is researched for is systemic rather than athletic: inflammatory and immune recalibration, closer to immunology than to sports recovery.',
    ],
  },
]

const byId = new Map(products.map((p) => [p.id, p]))

/**
 * Volume of one actuation of the pump, in mL. 0.1 mL is the standard metered
 * nasal pump; every "per spray" figure on the site is derived from it, so if
 * the bottles turn out to use a different pump, this is the one line to change.
 */
export const SPRAY_ML = 0.1
const BOTTLE_ML = 10

/** '500mg' -> 500 */
const mgOf = (amount) => Number.parseFloat(amount)

/** 0.05 -> '50mcg', 5 -> '5mg' */
export const formatMass = (mg) =>
  mg < 1 ? `${Math.round(mg * 1000)}mcg` : `${Number.isInteger(mg) ? mg : mg.toFixed(1)}mg`

// Resolved sprays, shaped like catalogue products so ProductCard and the
// product-page pieces can render them. Each spray has its own page at
// /nasal-sprays/<slug>; `compoundPath` is the vial compound's page.
export const nasalSprays = SPRAYS.map(({ productId, anchor, photo, name, positioning, amount, price, description, writeup }) => {
  const base = byId.get(productId)
  if (!base) throw new Error(`nasalSpraysData: no catalogue product with id ${productId}`)
  const mg = mgOf(amount)
  return {
    ...base,
    id: `spray-${productId}`,
    productId,
    name,
    format: 'Nasal Spray',
    slug: anchor,
    // The bottle shot, not the vial's: emitted by scripts/vials.mjs from
    // assets-source/sprays under its own name so it never collides with the
    // vial's files.
    photos: [photo],
    photoLabels: undefined,
    photoDir: 'sprays',
    imageName: `${anchor}-nasal-spray`,
    featured: false,
    description,
    tags: [positioning],
    positioning,
    anchor,
    writeup,
    amount,
    page: `/nasal-sprays/${anchor}`,
    compoundPath: base.slug ? `/catalogue/${base.slug}` : null,
    prices: [{ dose: `10ml · ${amount}`, price, inStock: true }],
    dosing: {
      bottleMl: BOTTLE_ML,
      perMl: mg / BOTTLE_ML,
      perSpray: (mg / BOTTLE_ML) * SPRAY_ML,
      spraysPerBottle: Math.round(BOTTLE_ML / SPRAY_ML),
    },
  }
})

export const nasalSprayBySlug = (slug) => nasalSprays.find((s) => s.slug === slug) ?? null
