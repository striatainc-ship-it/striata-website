/**
 * The protocols and peptides the quiz can recommend, one result page each
 * at /quiz/result/{slug}.
 *
 * Copy is reused from approved sources already on the site: catalogue
 * descriptions (products.js), stack rationale (stacksData.js) and the
 * Menopause Reset page. Do not add new claims here; edit the source page
 * and mirror it.
 *
 * Fields
 *   slug            result-page URL and the id scoring returns
 *   name            headline on the result page
 *   kind            'product' | 'stack' | 'menopause' (changes the CTA wording)
 *   goalTags        Q1/Q2 tags this matches (see quizConfig.js vocabulary)
 *   deliveryTags    injectable · pen · topical
 *   experienceTags  new · experienced (both when it suits either)
 *   summary         2–4 sentences of approved copy
 *   usedFor         short "commonly used for" chips
 *   fromPrice       lowest catalogue price in ZAR, for the Product schema
 *   primary         { label, to }  main CTA
 *   secondary       [{ label, to }] further links (pens, stacks page, guides)
 *   posts           blog slugs to list as further reading
 *   metaTitle/metaDescription  per-page SEO
 */

const catalogue = (q) => `/catalogue?q=${encodeURIComponent(q)}`
const pens = (q) => `/pens?q=${encodeURIComponent(q)}`
const stack = (anchor) => `/stacks#${anchor}`

export const quizProtocols = [
  // ── Recovery ─────────────────────────────────────────────────────────
  {
    slug: 'wolverine-stack',
    name: 'BPC+TB Wolverine Stack',
    kind: 'stack',
    goalTags: ['recovery', 'recovery-acute', 'recovery-maintenance'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'The ultimate healing combo: BPC-157 and TB-500 working together for maximum tissue repair and accelerated recovery. BPC-157 drives localised vascular repair and connective tissue regeneration, while TB-500 mobilises stem cells systemically to accelerate recovery. Available as a single reconstitution vial or a pre-filled pen, and as the base of The Wolverine Protocol on the stacks page.',
    usedFor: ['Tissue repair', 'Soft-tissue injury', 'Recovery'],
    fromPrice: 650,
    primary: { label: 'View the Wolverine Stack in the catalogue', to: catalogue('Wolverine') },
    secondary: [
      { label: 'Wolverine Stack pre-filled pen', to: pens('Wolverine') },
      { label: 'The Wolverine Protocol, all three tiers', to: stack('the-wolverine-protocol') },
    ],
    posts: ['wolverine-stack-bpc-157-tb-500', 'bpc-157-recovery-peptide-guide', 'tb-500-thymosin-beta-4-guide'],
    metaTitle: 'Wolverine Stack (BPC-157 + TB-500) for Recovery | STRIATA Quiz Result',
    metaDescription: 'Matched to recovery and injury healing: the BPC-157 + TB-500 Wolverine Stack, available as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'bpc-157',
    name: 'BPC-157',
    kind: 'product',
    goalTags: ['recovery', 'recovery-maintenance'],
    deliveryTags: ['injectable'],
    experienceTags: ['new'],
    summary:
      'A powerful body protection compound that accelerates tissue repair, reduces inflammation and supports gut health. A staple in any recovery protocol, and the simplest place to start if this is your first peptide: one vial, one compound, well tolerated.',
    usedFor: ['Tissue repair', 'Anti-inflammatory', 'Gut health'],
    fromPrice: 275,
    primary: { label: 'View BPC-157 in the catalogue', to: catalogue('BPC-157') },
    secondary: [{ label: 'How to reconstitute and dose it', to: '/guides/peptide-reconstitution-dosage-calculator' }],
    posts: ['bpc-157-recovery-peptide-guide', 'bpc-157-south-africa', 'how-to-build-a-peptide-recovery-protocol'],
    metaTitle: 'BPC-157 for Recovery & Gut Health | STRIATA Quiz Result',
    metaDescription: 'Matched to recovery: BPC-157, the body protection compound for tissue repair, inflammation and gut health. Research-grade from STRIATA, South Africa.',
  },
  {
    slug: 'klow-stack',
    name: 'KLOW Stack (KPV + GHK-Cu + BPC + TB)',
    kind: 'stack',
    goalTags: ['recovery-maintenance', 'wellness', 'skin'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['experienced'],
    summary:
      'The GLOW Stack plus KPV 10mg: GHK-Cu 50mg, BPC-157 10mg and TB-500 10mg for skin and tissue regeneration, with KPV added for gut health and systemic anti-inflammatory support. One blended vial or pen covering repair, skin and inflammation together.',
    usedFor: ['Anti-inflammatory', 'Gut health', 'Skin & tissue'],
    fromPrice: 1800,
    primary: { label: 'View the KLOW Stack in the catalogue', to: catalogue('KLOW') },
    secondary: [{ label: 'KLOW Stack pre-filled pen', to: pens('KLOW') }],
    posts: ['glow-stack-peptides-skin-regeneration', 'bpc-157-recovery-peptide-guide'],
    metaTitle: 'KLOW Stack: KPV, GHK-Cu, BPC-157 & TB-500 | STRIATA Quiz Result',
    metaDescription: 'Matched to tissue maintenance and inflammation: the KLOW Stack combines KPV, GHK-Cu, BPC-157 and TB-500 in one vial or pen. STRIATA, South Africa.',
  },

  // ── Skin, hair & anti-aging ──────────────────────────────────────────
  {
    slug: 'ghk-cu-serum',
    name: 'GHK-Cu Serum (Topical)',
    kind: 'product',
    goalTags: ['skin'],
    deliveryTags: ['topical'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Our copper peptide face serum: GHK-Cu with 1% hyaluronic acid in a 30 ml dropper, for all skin types. Restore, hydrate, renew. Available in 1% and 2% strengths, and the only STRIATA product that needs no needle at all.',
    usedFor: ['Skincare', 'Copper peptide', 'Hyaluronic acid'],
    fromPrice: 549,
    primary: { label: 'View the GHK-Cu Serum', to: '/ghk-serum' },
    secondary: [{ label: 'Injectable GHK-Cu, if you want the systemic version', to: catalogue('GHK-Cu') }],
    posts: ['ghk-cu-copper-peptide-anti-aging'],
    metaTitle: 'GHK-Cu Copper Peptide Serum for Skin | STRIATA Quiz Result',
    metaDescription: 'Matched to skin and anti-aging, topical: the STRIATA GHK-Cu serum with hyaluronic acid, 1% or 2%, in a 30 ml dropper. Delivered across South Africa.',
  },
  {
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    kind: 'product',
    goalTags: ['skin'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'The gold standard copper tripeptide, renowned for skin rejuvenation, collagen regeneration and powerful anti-aging effects. The injectable form works systemically rather than only where it is applied, and is available as a 100mg vial or a pre-filled pen.',
    usedFor: ['Skin rejuvenation', 'Collagen', 'Anti-aging'],
    fromPrice: 700,
    primary: { label: 'View GHK-Cu in the catalogue', to: catalogue('GHK-Cu') },
    secondary: [
      { label: 'GHK-Cu pre-filled pen', to: pens('GHK-Cu') },
      { label: 'The Glow Up stack, GHK-Cu with Matrixyl and Snap-8', to: stack('the-glow-up') },
    ],
    posts: ['ghk-cu-copper-peptide-anti-aging', 'glow-stack-peptides-skin-regeneration'],
    metaTitle: 'Injectable GHK-Cu for Skin & Collagen | STRIATA Quiz Result',
    metaDescription: 'Matched to skin, hair and anti-aging: injectable GHK-Cu copper peptide for collagen regeneration, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'glow-stack',
    name: 'GLOW Stack (GHK-Cu + BPC + TB)',
    kind: 'stack',
    goalTags: ['skin', 'recovery'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'A triple-action beauty and healing stack: GHK-Cu 50mg for skin regeneration and anti-aging, with BPC-157 10mg and TB-500 10mg for tissue repair and recovery. One blended vial or pen, so there is nothing to combine yourself.',
    usedFor: ['Beauty', 'Anti-aging', 'Tissue repair'],
    fromPrice: 1650,
    primary: { label: 'View the GLOW Stack in the catalogue', to: catalogue('GLOW') },
    secondary: [{ label: 'GLOW Stack pre-filled pen', to: pens('GLOW') }],
    posts: ['glow-stack-peptides-skin-regeneration', 'ghk-cu-copper-peptide-anti-aging'],
    metaTitle: 'GLOW Stack: GHK-Cu, BPC-157 & TB-500 | STRIATA Quiz Result',
    metaDescription: 'Matched to skin and recovery: the GLOW Stack blends GHK-Cu, BPC-157 and TB-500 in one vial or pre-filled pen. Research-grade from STRIATA, South Africa.',
  },
  {
    slug: 'glow-up-protocol',
    name: 'The Glow Up',
    kind: 'stack',
    goalTags: ['skin'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Injectable skincare for visible anti-aging results. GHK-Cu is the most extensively studied injectable skincare peptide: it activates collagen synthesis, reduces inflammation and modulates gene expression. Matrixyl stimulates collagen and hyaluronic acid production, Snap-8 relaxes expression lines from within, and the Premium tier adds AHK-Cu for scalp and follicle repair with BPC-157 beneath the skin.',
    usedFor: ['Collagen', 'Expression lines', 'Hair & scalp'],
    fromPrice: 670,
    primary: { label: 'View The Glow Up on the stacks page', to: stack('the-glow-up') },
    secondary: [{ label: 'GHK-Cu on its own', to: catalogue('GHK-Cu') }],
    posts: ['ghk-cu-copper-peptide-anti-aging', 'glow-stack-peptides-skin-regeneration'],
    metaTitle: 'The Glow Up: Injectable Skincare Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to skin and anti-aging for experienced users: The Glow Up stacks GHK-Cu, Matrixyl and Snap-8, with AHK-Cu and BPC-157 at Premium. STRIATA, South Africa.',
  },

  // ── Weight loss ──────────────────────────────────────────────────────
  {
    slug: 'tirzepatide',
    name: 'Tirzepatide',
    kind: 'product',
    goalTags: ['weight'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Dual GIP/GLP-1 agonist delivering powerful weight loss and blood sugar optimisation (the Mounjaro generic). The most common starting point in the GLP-1 class, available as a 30mg vial or a pre-filled pen for dial-in dosing without reconstitution.',
    usedFor: ['GLP-1', 'Weight loss', 'Blood sugar'],
    fromPrice: 1500,
    primary: { label: 'View Tirzepatide in the catalogue', to: catalogue('Tirzepatide') },
    secondary: [
      { label: 'Tirzepatide pre-filled pen', to: pens('Tirzepatide') },
      { label: 'The Shred Protocol, Tirzepatide with AOD-9604', to: stack('the-shred-protocol') },
    ],
    posts: ['semaglutide-vs-tirzepatide-vs-retatrutide', 'glp-1-peptides-explained', 'why-your-diet-isnt-working-metabolic-peptides'],
    metaTitle: 'Tirzepatide for Weight Loss | STRIATA Quiz Result',
    metaDescription: 'Matched to weight loss: Tirzepatide, the dual GIP/GLP-1 agonist, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'retatrutide',
    name: 'Retatrutide',
    kind: 'product',
    goalTags: ['weight'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['experienced'],
    summary:
      'The most advanced weight loss peptide available: a triple agonist delivering superior fat reduction and metabolic control. Typically chosen by people who have already used a GLP-1 and want the next step up, as a vial or pre-filled pen.',
    usedFor: ['Triple agonist', 'Fat loss', 'Metabolic control'],
    fromPrice: 1900,
    primary: { label: 'View Retatrutide in the catalogue', to: catalogue('Retatrutide') },
    secondary: [
      { label: 'Retatrutide pre-filled pen', to: pens('Retatrutide') },
      { label: 'The Shred Protocol Premium tier', to: stack('the-shred-protocol') },
    ],
    posts: ['semaglutide-vs-tirzepatide-vs-retatrutide', 'glp-1-peptides-explained'],
    metaTitle: 'Retatrutide Triple Agonist for Weight Loss | STRIATA Quiz Result',
    metaDescription: 'Matched to weight loss for experienced users: Retatrutide, the triple agonist, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'shred-protocol',
    name: 'The Shred Protocol',
    kind: 'stack',
    goalTags: ['weight'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'GLP-1 amplified with full metabolic fat-burning support. The GLP-1 receptor agonist suppresses appetite and improves insulin sensitivity at the hormonal level. AOD-9604 directly stimulates lipolysis in adipose tissue at the cellular level. L-Carnitine shuttles released fatty acids into mitochondria for energy, ensuring freed fat is burned rather than redeposited.',
    usedFor: ['Appetite control', 'Lipolysis', 'Metabolic support'],
    fromPrice: 1900,
    primary: { label: 'View The Shred Protocol on the stacks page', to: stack('the-shred-protocol') },
    secondary: [{ label: 'Tirzepatide on its own', to: catalogue('Tirzepatide') }],
    posts: ['glp-1-peptides-explained', 'aod-9604-vs-hgh-fragment-176-191', 'why-your-diet-isnt-working-metabolic-peptides'],
    metaTitle: 'The Shred Protocol: GLP-1 + AOD-9604 Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to weight loss for experienced users: The Shred Protocol pairs a GLP-1 agonist with AOD-9604 and L-Carnitine. STRIATA, South Africa.',
  },
  {
    slug: 'skin-saver-protocol',
    name: 'The Skin Saver',
    kind: 'stack',
    goalTags: ['weight', 'skin'],
    deliveryTags: ['injectable'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Lose the weight, keep the skin tight. Months 1 to 2: a GLP-1 agonist drives significant fat reduction, with AOD-9604 enhancing lipolysis at the cellular level. Month 3 onwards: GHK-Cu triggers collagen synthesis and dermal remodelling to address loose skin from rapid fat loss, with BPC-157 repairing the connective tissue layer beneath. One of the strongest stacks from a safety standpoint.',
    usedFor: ['Weight loss', 'Loose skin', 'Collagen'],
    fromPrice: 2520,
    primary: { label: 'View The Skin Saver on the stacks page', to: stack('the-skin-saver') },
    secondary: [{ label: 'The GLOW Stack used in its skin phase', to: catalogue('GLOW') }],
    posts: ['semaglutide-vs-tirzepatide-vs-retatrutide', 'ghk-cu-copper-peptide-anti-aging'],
    metaTitle: 'The Skin Saver: Weight Loss Without Loose Skin | STRIATA Quiz Result',
    metaDescription: 'Matched to weight loss with skin in mind: The Skin Saver phases a GLP-1 agonist and AOD-9604 into GHK-Cu and BPC-157. STRIATA, South Africa.',
  },

  // ── Body composition & GH ────────────────────────────────────────────
  {
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    kind: 'product',
    goalTags: ['body', 'weight'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Clinically proven to reduce visceral fat, improve body composition and boost cognitive function. A growth-hormone-releasing hormone analogue rather than a GLP-1, so it is the usual choice when the goal is a leaner midsection and better composition rather than appetite control. Vial or pre-filled pen.',
    usedFor: ['Visceral fat', 'Body composition', 'Cognitive'],
    fromPrice: 700,
    primary: { label: 'View Tesamorelin in the catalogue', to: catalogue('Tesamorelin') },
    secondary: [
      { label: 'Tesamorelin pre-filled pen', to: pens('Tesamorelin') },
      { label: 'Tesa10 + Ipamorelin Stack', to: catalogue('Tesa10') },
    ],
    posts: ['why-your-diet-isnt-working-metabolic-peptides', 'glp-1-peptides-explained'],
    metaTitle: 'Tesamorelin for Visceral Fat & Body Composition | STRIATA Quiz Result',
    metaDescription: 'Matched to body composition: Tesamorelin for visceral fat and lean mass, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'cjc-1295-ipamorelin',
    name: 'CJC-1295 + Ipamorelin Stack',
    kind: 'stack',
    goalTags: ['body'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new'],
    summary:
      'A synergistic GHRH and ghrelin mimetic stack for optimised pulsatile growth hormone release. The classic first GH-axis protocol: two well-tolerated compounds in one vial or pen, chosen for lean muscle, recovery and sleep quality without the intensity of the advanced stacks.',
    usedFor: ['GH release', 'Lean muscle', 'Recovery'],
    fromPrice: 800,
    primary: { label: 'View the CJC-1295 + Ipamorelin Stack', to: catalogue('CJC-1295 + Ipamorelin') },
    secondary: [
      { label: 'CJC + Ipamorelin pre-filled pen', to: pens('Ipamorelin') },
      { label: 'The Gains Engine, the next step up', to: stack('the-gains-engine') },
    ],
    posts: ['how-to-build-a-peptide-recovery-protocol', 'beginners-guide-to-peptides'],
    metaTitle: 'CJC-1295 + Ipamorelin Stack for GH Support | STRIATA Quiz Result',
    metaDescription: 'Matched to body composition for first-timers: the CJC-1295 + Ipamorelin Stack for pulsatile GH release, vial or pre-filled pen. STRIATA, South Africa.',
  },
  {
    slug: 'gains-engine',
    name: 'The Gains Engine',
    kind: 'stack',
    goalTags: ['body'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Optimised GH pulse for lean muscle growth. CJC-1295 with DAC provides a sustained GH baseline lasting 6 to 8 days per injection. GHRP-2 amplifies natural GH pulses with minimal appetite stimulation. At the Premium tier, IGF-1 LR3 converts elevated GH into direct anabolic signalling at the muscle, completing the GH axis protocol for experienced users. Bloodwork before the Premium tier is strongly recommended.',
    usedFor: ['Lean muscle', 'GH axis', 'Anabolic signalling'],
    fromPrice: 590,
    primary: { label: 'View The Gains Engine on the stacks page', to: stack('the-gains-engine') },
    secondary: [{ label: 'The Recomp, if fat loss comes first', to: stack('the-recomp') }],
    posts: ['igf-1-lr3-recovery-muscle-repair', 'how-to-build-a-peptide-recovery-protocol'],
    metaTitle: 'The Gains Engine: CJC-1295 DAC + GHRP Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to body composition for experienced users: The Gains Engine stacks CJC-1295 DAC, GHRP-2 and IGF-1 LR3 for lean muscle. STRIATA, South Africa.',
  },
  {
    slug: 'recomp-protocol',
    name: 'The Recomp',
    kind: 'stack',
    goalTags: ['body', 'weight'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Build muscle while shedding fat, in two phases. Month 1: HGH Fragment 176-191 targets fat cells specifically without systemic GH effects, and Ipamorelin adds a clean GH pulse. Month 2: once the substrate is leaner, IGF-1 LR3 and CJC-1295 DAC drive direct muscle anabolism on the improved body composition foundation. The phased structure is what makes this protocol safe.',
    usedFor: ['Fat loss then muscle', 'Phased', 'GH axis'],
    fromPrice: 550,
    primary: { label: 'View The Recomp on the stacks page', to: stack('the-recomp') },
    secondary: [{ label: 'Tesamorelin on its own', to: catalogue('Tesamorelin') }],
    posts: ['aod-9604-vs-hgh-fragment-176-191', 'igf-1-lr3-recovery-muscle-repair'],
    metaTitle: 'The Recomp: Two-Phase Fat Loss & Muscle Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to body composition: The Recomp runs HGH Fragment and Ipamorelin, then IGF-1 LR3 and CJC-1295 DAC. STRIATA, South Africa.',
  },

  // ── Energy & metabolic ───────────────────────────────────────────────
  {
    slug: 'mots-c',
    name: 'MOTS-c',
    kind: 'product',
    goalTags: ['energy'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'A mitochondrial-derived peptide that enhances metabolic function, exercise capacity and cellular energy production. The most direct match when the goal is energy and endurance rather than weight or muscle, available as a vial or a pre-filled pen in two sizes.',
    usedFor: ['Mitochondrial', 'Metabolic', 'Exercise capacity'],
    fromPrice: 1200,
    primary: { label: 'View MOTS-c in the catalogue', to: catalogue('MOTS-C') },
    secondary: [
      { label: 'MOTS-c pre-filled pen', to: pens('MOTS-C') },
      { label: 'NAD+ for cellular energy', to: catalogue('NAD+') },
    ],
    posts: ['why-your-diet-isnt-working-metabolic-peptides', 'peptides-for-south-african-athletes'],
    metaTitle: 'MOTS-c for Energy & Metabolic Support | STRIATA Quiz Result',
    metaDescription: 'Matched to energy and metabolic support: MOTS-c, the mitochondrial peptide for exercise capacity, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'nad-plus',
    name: 'NAD+',
    kind: 'product',
    goalTags: ['cellular', 'energy'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'The essential coenzyme for cellular energy, metabolism, DNA repair and healthy ageing, a longevity cornerstone. Supplied as a 500mg vial that reconstitutes with up to 10 mL of bacteriostatic water, or as a pre-filled pen.',
    usedFor: ['Cellular energy', 'Longevity', 'DNA repair'],
    fromPrice: 750,
    primary: { label: 'View NAD+ in the catalogue', to: catalogue('NAD+') },
    secondary: [
      { label: 'NAD+ pre-filled pen', to: pens('NAD+') },
      { label: 'The Fountain Protocol, NAD+ with Epithalon', to: stack('the-fountain-protocol') },
    ],
    posts: ['nad-plus-aging-decline-what-to-do', 'nad-plus-brain-health-focus-mental-clarity'],
    metaTitle: 'NAD+ for Cellular Energy & Longevity | STRIATA Quiz Result',
    metaDescription: 'Matched to cellular and energy support: NAD+ 500mg for cellular energy, metabolism and DNA repair, as a vial or pre-filled pen from STRIATA, South Africa.',
  },

  // ── Cellular & antioxidant ───────────────────────────────────────────
  {
    slug: 'glutathione',
    name: 'Glutathione',
    kind: 'product',
    goalTags: ['cellular'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'The master antioxidant that neutralises free radicals, supports liver detoxification and brightens skin tone. Available in 400mg, 600mg and 1500mg vials (reconstituted with up to 10 mL of water) and as a 600mg pre-filled pen.',
    usedFor: ['Antioxidant', 'Detox', 'Skin brightening'],
    fromPrice: 650,
    primary: { label: 'View Glutathione in the catalogue', to: catalogue('Glutathione') },
    secondary: [{ label: 'Glutathione pre-filled pen', to: pens('Glutathione') }],
    posts: ['nad-plus-aging-decline-what-to-do'],
    metaTitle: 'Glutathione, the Master Antioxidant | STRIATA Quiz Result',
    metaDescription: 'Matched to cellular and antioxidant support: Glutathione for free-radical defence, liver support and skin tone, vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'fountain-protocol',
    name: 'The Fountain Protocol',
    kind: 'stack',
    goalTags: ['cellular', 'wellness'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Core longevity stack for cellular rejuvenation. Epithalon activates telomerase to slow cellular ageing at the DNA level. NAD+ restores mitochondrial energy production that naturally declines with age. GHK-Cu reverses dermal collagen loss and modulates over 4,000 genes involved in repair and anti-inflammation. At the Premium tier, Thymalin and Thymosin Alpha-1 restore thymic immune function.',
    usedFor: ['Longevity', 'Telomerase', 'Mitochondria'],
    fromPrice: 810,
    primary: { label: 'View The Fountain Protocol on the stacks page', to: stack('the-fountain-protocol') },
    secondary: [{ label: 'NAD+ on its own', to: catalogue('NAD+') }],
    posts: ['epithalon-longevity-telomerase-research', 'nad-plus-aging-decline-what-to-do', 'fox04-dri-senolytic-peptide-cellular-aging'],
    metaTitle: 'The Fountain Protocol: Epithalon + NAD+ Longevity Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to cellular support for experienced users: The Fountain Protocol stacks Epithalon, NAD+ and GHK-Cu for longevity. STRIATA, South Africa.',
  },

  // ── Focus, mood & sleep ──────────────────────────────────────────────
  {
    slug: 'semax',
    name: 'Semax',
    kind: 'product',
    goalTags: ['brain'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'An ACTH-derived nootropic that enhances focus, memory consolidation and neuroprotection, a favourite among biohackers. The usual first pick for focus and mental clarity, available as a vial or a pre-filled pen.',
    usedFor: ['Focus', 'Memory', 'Neuroprotection'],
    fromPrice: 750,
    primary: { label: 'View Semax in the catalogue', to: catalogue('Semax') },
    secondary: [
      { label: 'Semax pre-filled pen', to: pens('Semax') },
      { label: 'Selank, if calm matters more than focus', to: catalogue('Selank') },
    ],
    posts: ['semax-nootropic-peptide-guide', 'selank-vs-semax-nootropic-peptide-comparison'],
    metaTitle: 'Semax Nootropic Peptide for Focus | STRIATA Quiz Result',
    metaDescription: 'Matched to focus and cognition: Semax, the ACTH-derived nootropic, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'selank',
    name: 'Selank',
    kind: 'product',
    goalTags: ['brain'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'An anxiolytic nootropic peptide that reduces anxiety, stabilises mood and enhances cognitive performance. Chosen when the priority is calm and mood stability rather than raw focus, and often paired with Semax. Vial or pre-filled pen.',
    usedFor: ['Anxiolytic', 'Mood', 'Cognition'],
    fromPrice: 750,
    primary: { label: 'View Selank in the catalogue', to: catalogue('Selank') },
    secondary: [
      { label: 'Selank pre-filled pen', to: pens('Selank') },
      { label: 'The Biohacker Stack, Semax + Selank + sleep support', to: stack('the-biohacker-stack') },
    ],
    posts: ['selank-vs-semax-nootropic-peptide-comparison', 'pe-22-28-mood-support-peptide-research'],
    metaTitle: 'Selank for Calm, Mood & Cognition | STRIATA Quiz Result',
    metaDescription: 'Matched to mood and calm: Selank, the anxiolytic nootropic peptide, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'dsip',
    name: 'DSIP',
    kind: 'product',
    goalTags: ['brain'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Delta Sleep-Inducing Peptide that promotes deep restorative sleep and regulates the sleep-wake cycle. The single-compound option when sleep is the whole goal. Vial or pre-filled pen.',
    usedFor: ['Deep sleep', 'Circadian rhythm'],
    fromPrice: 700,
    primary: { label: 'View DSIP in the catalogue', to: catalogue('DSIP') },
    secondary: [{ label: 'DSIP pre-filled pen', to: pens('DSIP') }],
    posts: ['dsip-delta-sleep-inducing-peptide-guide'],
    metaTitle: 'DSIP for Deep, Restorative Sleep | STRIATA Quiz Result',
    metaDescription: 'Matched to sleep: DSIP, the delta sleep-inducing peptide, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'biohacker-stack',
    name: 'The Biohacker Stack',
    kind: 'stack',
    goalTags: ['brain'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Sharpen cognition, sleep deeper, recover faster. Semax drives BDNF and neuroplasticity for enhanced focus and memory consolidation. Selank modulates cortisol and reduces anxiety without sedation. Injectable Melatonin resets the circadian rhythm for deep restorative sleep, and the Premium tier adds NAD+ and Pinealon, to be taken before bed only.',
    usedFor: ['Focus', 'Calm', 'Sleep'],
    fromPrice: 1030,
    primary: { label: 'View The Biohacker Stack on the stacks page', to: stack('the-biohacker-stack') },
    secondary: [{ label: 'Semax on its own', to: catalogue('Semax') }],
    posts: ['semax-nootropic-peptide-guide', 'selank-vs-semax-nootropic-peptide-comparison', 'dsip-delta-sleep-inducing-peptide-guide'],
    metaTitle: 'The Biohacker Stack: Semax, Selank & Sleep Support | STRIATA Quiz Result',
    metaDescription: 'Matched to focus, mood and sleep for experienced users: The Biohacker Stack combines Semax, Selank and injectable Melatonin. STRIATA, South Africa.',
  },

  // ── Wellness & immune ────────────────────────────────────────────────
  {
    slug: 'kpv',
    name: 'KPV',
    kind: 'product',
    goalTags: ['wellness'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'A potent anti-inflammatory tripeptide effective for gut health, skin conditions and systemic inflammation. Small, well tolerated and simple to run, which makes it the usual first choice for general wellness. Vial or pre-filled pen.',
    usedFor: ['Anti-inflammatory', 'Gut health', 'Skin conditions'],
    fromPrice: 400,
    primary: { label: 'View KPV in the catalogue', to: catalogue('KPV') },
    secondary: [
      { label: 'KPV pre-filled pen', to: pens('KPV') },
      { label: 'The KLOW Stack, KPV with GHK-Cu, BPC and TB', to: catalogue('KLOW') },
    ],
    posts: ['beginners-guide-to-peptides'],
    metaTitle: 'KPV Anti-Inflammatory Peptide for Wellness | STRIATA Quiz Result',
    metaDescription: 'Matched to general wellness: KPV, the anti-inflammatory tripeptide for gut and skin, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'thymosin-alpha-1',
    name: 'Thymosin Alpha-1',
    kind: 'product',
    goalTags: ['wellness'],
    deliveryTags: ['injectable', 'pen'],
    experienceTags: ['new', 'experienced'],
    summary:
      'A potent immune-modulating peptide that activates T-cells and dendritic cells for enhanced immune defence. The direct choice when immunity specifically is the goal, available as a vial or a 10mg pre-filled pen.',
    usedFor: ['Immune modulation', 'T-cells', 'Immune defence'],
    fromPrice: 700,
    primary: { label: 'View Thymosin Alpha-1 in the catalogue', to: catalogue('Thymosin Alpha-1') },
    secondary: [
      { label: 'Thymosin Alpha-1 pre-filled pen', to: pens('Thymosin') },
      { label: 'The Immune Fortress stack', to: stack('the-immune-fortress') },
    ],
    posts: ['beginners-guide-to-peptides'],
    metaTitle: 'Thymosin Alpha-1 for Immune Support | STRIATA Quiz Result',
    metaDescription: 'Matched to immune support: Thymosin Alpha-1, the immune-modulating peptide, as a vial or pre-filled pen from STRIATA, South Africa.',
  },
  {
    slug: 'immune-fortress',
    name: 'The Immune Fortress',
    kind: 'stack',
    goalTags: ['wellness'],
    deliveryTags: ['injectable'],
    experienceTags: ['experienced'],
    summary:
      'Rebuild immune defence from the ground up, in two phases. Month 1: Thymosin Alpha-1 activates T-cells and dendritic cells, while BPC-157 reduces systemic inflammation that suppresses immune response. Month 2: Thymalin restores thymic peptide production for sustained immune competence, with Epithalon and NAD+ providing the cellular longevity and energy substrate at the Premium tier.',
    usedFor: ['Immunity', 'Inflammation', 'Thymic function'],
    fromPrice: 760,
    primary: { label: 'View The Immune Fortress on the stacks page', to: stack('the-immune-fortress') },
    secondary: [{ label: 'Thymosin Alpha-1 on its own', to: catalogue('Thymosin Alpha-1') }],
    posts: ['epithalon-longevity-telomerase-research', 'bpc-157-recovery-peptide-guide'],
    metaTitle: 'The Immune Fortress: Thymosin + Thymalin Stack | STRIATA Quiz Result',
    metaDescription: 'Matched to immune support for experienced users: The Immune Fortress phases Thymosin Alpha-1 and BPC-157 into Thymalin. STRIATA, South Africa.',
  },

  // ── Menopause Reset ──────────────────────────────────────────────────
  {
    slug: 'menopause-reset-restful',
    name: 'The Menopause Reset: RESTFUL',
    kind: 'menopause',
    goalTags: ['menopause', 'menopause-sleep'],
    deliveryTags: ['injectable'],
    experienceTags: ['new', 'experienced'],
    summary:
      'For the 3 a.m. wake-ups and the wired-but-tired exhaustion that no amount of magnesium fixes. Oestrogen and progesterone modulate the GABA system, the brain’s braking mechanism. When they withdraw, night-time cortisol climbs and sleep architecture fragments. RESTFUL works on both ends: reducing daytime hyperarousal, and deepening slow-wave sleep at night. It is one of four stacks in the 12-week Menopause Reset, supplied through registered practitioners.',
    usedFor: ['Early-morning wakings', 'Cortisol hyperarousal', 'Sleep architecture'],
    fromPrice: 8950,
    primary: { label: 'View The Menopause Reset', to: '/stacks/menopause-reset' },
    secondary: [{ label: 'Pricing and the 3-month plan', to: '/stacks/menopause-reset#pricing' }],
    posts: ['oxytocin-beyond-bonding-hormone-research', 'dsip-delta-sleep-inducing-peptide-guide'],
    metaTitle: 'Menopause Reset RESTFUL: Sleep & Nervous System | STRIATA Quiz Result',
    metaDescription: 'Matched to menopause sleep symptoms: the RESTFUL stack of the 12-week Menopause Reset protocol, supplied through registered practitioners. STRIATA, South Africa.',
  },
  {
    slug: 'menopause-reset-renew',
    name: 'The Menopause Reset: RENEW',
    kind: 'menopause',
    goalTags: ['menopause', 'menopause-renewal'],
    deliveryTags: ['injectable'],
    experienceTags: ['new', 'experienced'],
    summary:
      'For the "I’m aging in fast-forward" feeling. The somatopause, the decline in growth hormone pulsing with age, runs in parallel with menopause and produces many of the same effects: visceral fat gain, lean mass loss, poor sleep, fatigue. Oestrogen stimulates GH release directly, so its withdrawal accelerates the process. RENEW works to restore the body’s own GH pulse pattern rather than replacing the hormone. One of four stacks in the 12-week Menopause Reset.',
    usedFor: ['Somatopause', 'Visceral adiposity', 'Fatigue'],
    fromPrice: 8950,
    primary: { label: 'View The Menopause Reset', to: '/stacks/menopause-reset' },
    secondary: [{ label: 'Pricing and the 3-month plan', to: '/stacks/menopause-reset#pricing' }],
    posts: ['nad-plus-aging-decline-what-to-do'],
    metaTitle: 'Menopause Reset RENEW: Cellular Anti-Aging & GH | STRIATA Quiz Result',
    metaDescription: 'Matched to menopause fatigue and fast-forward aging: the RENEW stack of the 12-week Menopause Reset protocol. STRIATA, South Africa.',
  },
  {
    slug: 'menopause-reset-radiant',
    name: 'The Menopause Reset: RADIANT',
    kind: 'menopause',
    goalTags: ['menopause', 'menopause-skin'],
    deliveryTags: ['injectable'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Women lose roughly 30% of skin collagen in the first five years post-menopause, which is why wrinkles seem to surface overnight. Oestrogen drives collagen synthesis and holds back the enzymes that break the extracellular matrix down. RADIANT combines a copper-peptide and repair-peptide stack with a cellular antioxidant to support collagen signalling and reduce the oxidative load that accelerates skin aging. It joins the 12-week Menopause Reset from Week 3.',
    usedFor: ['Collagen loss', 'Skin laxity', 'Oxidative stress'],
    fromPrice: 8950,
    primary: { label: 'View The Menopause Reset', to: '/stacks/menopause-reset' },
    secondary: [{ label: 'GHK-Cu Serum, the topical option', to: '/ghk-serum' }],
    posts: ['ghk-cu-copper-peptide-anti-aging'],
    metaTitle: 'Menopause Reset RADIANT: Skin & Collagen | STRIATA Quiz Result',
    metaDescription: 'Matched to menopause skin and collagen changes: the RADIANT stack of the 12-week Menopause Reset protocol. STRIATA, South Africa.',
  },
  {
    slug: 'menopause-reset-ignite',
    name: 'The Menopause Reset: IGNITE',
    kind: 'menopause',
    goalTags: ['menopause', 'menopause-vitality'],
    deliveryTags: ['injectable'],
    experienceTags: ['new', 'experienced'],
    summary:
      'Desire is a brain process before it is a body one. Menopausal changes to sexual function run on two tracks: local tissue changes, and central changes in how desire and arousal are generated. IGNITE works on the central track, on the hypothalamic circuitry behind desire rather than on blood flow, paired with a compound that supports bonding and sensory receptivity. IGNITE requires a cardiovascular screen before first use, which your practitioner completes with you.',
    usedFor: ['Loss of desire', 'Reduced arousal', 'Intimacy'],
    fromPrice: 8950,
    primary: { label: 'View The Menopause Reset', to: '/stacks/menopause-reset' },
    secondary: [{ label: 'PT-141 on its own', to: catalogue('PT-141') }],
    posts: ['pt-141-peptide-libido-men-women', 'oxytocin-beyond-bonding-hormone-research'],
    metaTitle: 'Menopause Reset IGNITE: Libido & Intimacy | STRIATA Quiz Result',
    metaDescription: 'Matched to menopause changes in desire and arousal: the IGNITE stack of the 12-week Menopause Reset protocol. STRIATA, South Africa.',
  },
]

export const getQuizProtocol = (slug) => quizProtocols.find(p => p.slug === slug)

/** Every result route, for prerendering and the sitemap. */
export const quizResultPaths = quizProtocols.map(p => `/quiz/result/${p.slug}`)
