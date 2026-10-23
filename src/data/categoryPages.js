/**
 * Category landing pages at /catalogue/<slug>: the indexable form of the
 * catalogue's ?cat= filters, which canonicalise to /catalogue and so cannot
 * rank for "weight loss peptides South Africa" and the like.
 *
 * Copy describes what each compound has been studied for, never what it does
 * for a person, and names no doses. The grid on each page is the in-stock
 * products of that category, so stock changes need no edit here; the intro
 * names compounds, so a compound archived for good should come out of it.
 *
 * Kept free of heavy imports: routeLoaders.js reads the slugs from here.
 */
export const CATEGORY_PAGES = [
  {
    id: 'recovery',
    slug: 'recovery-peptides',
    h1: 'Recovery Peptides in South Africa',
    title: 'Recovery Peptides South Africa | In Stock | STRIATA',
    description:
      'Recovery peptides in stock in South Africa: BPC-157 and TB-500 blends, KPV and GH-axis peptides, with the research behind each. Delivered nationwide.',
    intro: [
      'Recovery peptides are the research compounds studied for tissue repair: tendon, ligament, muscle and the gut lining. Most of the work behind them is preclinical, in cell and animal models. The strongest signals come from BPC-157 and TB-500 (thymosin beta-4), which act on different parts of the repair process: BPC-157 has been studied for blood-vessel growth and connective tissue healing, TB-500 for the movement of repair cells into damaged tissue. That is why the two so often appear together, and why most of this range is built on blends of them.',
      'The range also covers the growth-hormone axis, with GHRP-6 and the CJC-1295 + Ipamorelin stack studied for their effect on the body’s own GH release, and KPV, a three-amino-acid fragment of alpha-MSH studied mainly in models of gut inflammation. The GLOW and KLOW stacks add GHK-Cu, the copper peptide studied for collagen and skin remodelling, to the BPC-157 and TB-500 base.',
      'If you compete in a tested sport, check the WADA Prohibited List before anything else: TB-500 and the growth-hormone secretagogues are prohibited at all times. Our article on peptides and anti-doping in South Africa sets out which compounds are on it.',
    ],
    reading: ['wolverine-stack-bpc-157-tb-500', 'bpc-157-recovery-peptide-guide', 'tb-500-thymosin-beta-4-guide', 'how-to-build-a-peptide-recovery-protocol', 'peptides-anti-doping-south-africa'],
    links: [{ label: 'The Wolverine Protocol stack', to: '/stacks/the-wolverine-protocol' }],
  },
  {
    id: 'weight',
    slug: 'weight-loss-peptides',
    h1: 'Weight Loss Peptides in South Africa',
    title: 'Weight Loss Peptides South Africa | STRIATA',
    description:
      'Weight loss peptides in stock in South Africa: tirzepatide, retatrutide, cagrilintide, AOD-9604 and more, with the research behind each. Delivered nationwide.',
    intro: [
      'This range is built around the incretin class: compounds that act on the receptors for GLP-1 and related gut hormones, which regulate appetite and blood sugar. Tirzepatide acts on two of them, GIP and GLP-1. Retatrutide adds a third, the glucagon receptor. Cagrilintide is an amylin analogue, a separate appetite pathway, studied both on its own and alongside semaglutide. These are the most heavily researched compounds on the site, with large human trials behind tirzepatide and published phase 2 data for retatrutide.',
      'Alongside them sit compounds studied for fat metabolism by other routes. AOD-9604 is a fragment of growth hormone studied for fat breakdown. Tesamorelin is a GHRH analogue studied in clinical trials for visceral fat. 5-Amino-1MQ and SLU-PP-332 are earlier-stage compounds, studied in animal models for their effects on how cells use energy.',
      'Two things are worth knowing in South Africa. Mounjaro, the registered tirzepatide medicine, is available on prescription, and most medical schemes do not fund GLP-1 drugs for weight loss; our articles on tirzepatide in South Africa and on medical aid cover explain both. And gastrointestinal effects in this class rise with dose, which is why the clinical trials increased doses slowly over weeks.',
    ],
    reading: ['semaglutide-vs-tirzepatide-vs-retatrutide', 'tirzepatide-south-africa', 'medical-aid-weight-loss-injections-south-africa', 'glp-1-peptides-explained', 'aod-9604-vs-hgh-fragment-176-191'],
    links: [{ label: 'The Shred Protocol stack', to: '/stacks/the-shred-protocol' }],
  },
  {
    id: 'skin',
    slug: 'skin-anti-aging-peptides',
    h1: 'Peptides for Skin and Anti-Aging in South Africa',
    title: 'Peptides for Skin & Anti-Aging in South Africa | STRIATA',
    description:
      'Skin and anti-aging peptides in South Africa: GHK-Cu vials and topical serum, epithalon and glutathione, with the research behind each. Delivered nationwide.',
    intro: [
      'GHK-Cu is the centre of this range. It is a copper-binding tripeptide found naturally in human blood plasma, where its level falls with age, and it has been studied for collagen production, wound healing and skin remodelling since the 1970s. We supply it two ways: as a lyophilised vial for research, and as a ready-made topical serum with hyaluronic acid.',
      'The rest of the range looks at ageing from the inside. Epithalon is a short synthetic peptide studied, largely in Russian laboratory and animal research, for its effect on telomerase, the enzyme that maintains the ends of chromosomes. Glutathione is the body’s main antioxidant inside cells. The GLOW stack, which pairs GHK-Cu with BPC-157 and TB-500, sits in the recovery range but is often chosen for skin.',
      'Most of the evidence here comes from cell culture and animal work rather than human trials. Each product page sets out what has and has not been studied, with the sources.',
    ],
    reading: ['ghk-cu-copper-peptide-anti-aging', 'glow-stack-peptides-skin-regeneration', 'epithalon-longevity-telomerase-research', 'nad-plus-aging-decline-what-to-do'],
    links: [
      { label: 'GHK-Cu topical serum', to: '/ghk-serum' },
      { label: 'The Glow Up stack', to: '/stacks/the-glow-up' },
    ],
  },
  {
    id: 'hormonal',
    slug: 'hormonal-health-peptides',
    h1: 'Hormonal and Sexual Health Peptides in South Africa',
    title: 'Hormonal & Sexual Health Peptides SA | STRIATA',
    description:
      'Hormonal and sexual health peptides in South Africa: kisspeptin, PT-141, oxytocin, melanotan II and MOTS-c, with the research behind each. Delivered nationwide.',
    intro: [
      'This range covers peptides studied for the signalling that sits upstream of the sex hormones. Kisspeptin is the natural trigger of the reproductive axis: it acts on the hypothalamus to release GnRH, which in turn drives LH and FSH. PT-141 (bremelanotide) acts on melanocortin receptors in the brain and was studied in phase 3 trials for low sexual desire in women. Oxytocin, best known for its role in bonding and childbirth, is studied far more widely than that reputation suggests.',
      'Melanotan II is a melanocortin agonist first studied for skin pigmentation, with effects on arousal noticed early in that research. MOTS-c is a peptide encoded in mitochondrial DNA rather than the cell nucleus, studied in animal models for metabolism and exercise capacity.',
      'For menopause specifically, the Menopause Reset is our 12-week, four-stack protocol, supplied through your practitioner, and our article on peptides and menopause in South Africa covers the research behind it.',
    ],
    reading: ['kisspeptin-testosterone-hormonal-health', 'pt-141-peptide-libido-men-women', 'oxytocin-beyond-bonding-hormone-research', 'peptides-menopause-south-africa'],
    links: [{ label: 'The Menopause Reset', to: '/stacks/menopause-reset' }],
  },
  {
    id: 'brain',
    slug: 'nootropic-peptides',
    h1: 'Nootropic, Mood and Sleep Peptides in South Africa',
    title: 'Nootropic & Sleep Peptides South Africa | STRIATA',
    description:
      'Nootropic, mood and sleep peptides in South Africa: Semax, Selank, DSIP, pinealon and NAD+, as vials or nasal sprays, with the research behind each.',
    intro: [
      'Semax and Selank are the best-known peptides in this group. Both were developed in Russia, and in South Africa they are research compounds. Semax is an analogue of a fragment of ACTH, studied for its effect on BDNF and attention. Selank is a synthetic analogue of tuftsin, studied for anxiety without sedation. Both are also available here as ready-made nasal sprays.',
      'DSIP (delta sleep-inducing peptide) was first isolated in the 1970s from rabbits in induced sleep, and has been studied for sleep regulation with mixed results. Pinealon is a short bioregulator peptide from the same school of Russian research as epithalon. NAD+ is the coenzyme at the centre of cellular energy production, and its levels decline with age. Adamax is a newer derivative of Semax with little published research so far.',
      'Most of this research is small, and much of it comes from a few Russian groups. Each product page lists what has been studied and links the sources.',
    ],
    reading: ['selank-vs-semax-nootropic-peptide-comparison', 'semax-nootropic-peptide-guide', 'dsip-delta-sleep-inducing-peptide-guide', 'nad-plus-brain-health-focus-mental-clarity'],
    links: [
      { label: 'Nasal sprays', to: '/nasal-sprays' },
      { label: 'The Biohacker Stack', to: '/stacks/the-biohacker-stack' },
    ],
  },
  {
    id: 'immunity',
    slug: 'immunity-longevity-peptides',
    h1: 'Immunity and Longevity Peptides in South Africa',
    title: 'Immune & Longevity Peptides South Africa | STRIATA',
    description:
      'Immune and longevity peptides in South Africa: thymosin alpha-1 and VIP, with what the research shows and how they fit with our longevity range.',
    intro: [
      'Thymosin alpha-1 (thymalfasin) is a 28-amino-acid peptide first isolated from the thymus. It has been studied as an immune modulator, including in randomised trials in people with chronic hepatitis B, for its effect on T-cell function.',
      'VIP (vasoactive intestinal peptide) is a 28-amino-acid neuropeptide found throughout the gut, lungs and brain, studied for its anti-inflammatory effects and its role in regulating immune responses.',
      'Longevity research overlaps with several other ranges. Epithalon and GHK-Cu sit in the skin and anti-aging range, and NAD+ in the brain range. The Immune Fortress and Fountain Protocol stacks combine them with the immune peptides here.',
    ],
    reading: ['epithalon-longevity-telomerase-research', 'nad-plus-aging-decline-what-to-do', 'fox04-dri-senolytic-peptide-cellular-aging'],
    links: [
      { label: 'The Immune Fortress stack', to: '/stacks/the-immune-fortress' },
      { label: 'The Fountain Protocol stack', to: '/stacks/the-fountain-protocol' },
    ],
  },
]

export const categoryPagePath = (page) => `/catalogue/${page.slug}`

export const categoryPageFor = (categoryId) => CATEGORY_PAGES.find((p) => p.id === categoryId) ?? null
