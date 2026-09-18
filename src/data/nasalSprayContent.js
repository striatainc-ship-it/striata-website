/**
 * Long-form copy for the per-spray pages at /nasal-sprays/<slug>.
 *
 * Keyed by the spray's slug (its `anchor` in nasalSpraysData.js). Every
 * compound here also has a vial page at /catalogue/<slug>, so this copy is
 * deliberately about the nasal route and the spray format — why intranasal,
 * what the intranasal research actually covers, what is in each spray — and
 * not a second description of the compound. Repeating the vial page would give
 * Google two near-identical URLs and neither would rank.
 *
 * Claims follow the rule in productContent.js: what a compound is researched
 * for comes from copy already published (the spray brief in
 * `Website Content/Nasal Sprays/`, the vial pages). What is new is the
 * intranasal context, and every study named in it is listed in `sources` —
 * each one resolved and read through the NCBI E-utilities API on 2026-09-18
 * before it went in. Do not add a source from memory.
 *
 * Fields
 *   lede           one sentence under the H1
 *   intranasal     2 paragraphs — why this compound is used through the nose
 *   researchNotes  3 { title, body } cards on the intranasal research itself
 *   caveat         one paragraph: where the evidence is thin
 *   faqs           3-4 { q, a }
 *   pairsWith      other spray slugs
 *   sources        { label, url } — rendered as a Sources list
 *   meta           { title, description }
 */

const pubmed = (id) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`

export const NASAL_SPRAY_CONTENT = {
  semax: {
    lede: 'Semax was developed as a nasal preparation in the first place — the spray is its native format, not an adaptation.',
    intranasal: [
      'Most peptides reach the market as injectables and are later tried intranasally. Semax went the other way. It was developed at the Russian Academy of Sciences as nasal drops, and the Russian clinical literature on it, stretching back to the 1980s, is overwhelmingly intranasal. When a paper describes what Semax does, it is usually describing what it does after going in through the nose.',
      'The reasoning is anatomical. The upper nasal cavity sits directly beneath the brain, and the olfactory and trigeminal nerves that run through it offer peptides a route into the central nervous system that bypasses both the gut, which would digest them, and much of the blood-brain barrier. For a compound whose entire interest is its effect on the brain, that route is the point.',
    ],
    researchNotes: [
      {
        title: 'BDNF after a single intranasal dose',
        body: 'Dolotov and colleagues (2006) found a single intranasal application in rats raised hippocampal BDNF protein about 1.4-fold and activated its receptor, trkB — the mechanism most Semax research leans on.',
      },
      {
        title: 'Learning and memory in animal models',
        body: 'The same work recorded more conditioned avoidance responses in treated animals, the behavioural half of the BDNF finding and the basis of the focus and memory positioning.',
      },
      {
        title: 'Neuroprotection',
        body: 'Russian clinical use centres on stroke and cerebral circulation. That work is largely published in Russian journals, which is why it is cited less often outside Russia than its volume would suggest.',
      },
    ],
    caveat:
      'Most of the Semax literature comes from a small number of Russian institutions, much of it in animals, and it has had little independent replication in Western trials. That is not the same as evidence against it, but it is a narrower base than the confidence of most online write-ups implies.',
    faqs: [
      {
        q: 'Is the spray the same Semax as the vial?',
        a: 'Same peptide, different format. The vial is lyophilised powder you reconstitute yourself; the spray arrives in solution, 5mg in 10ml, and needs no mixing.',
      },
      {
        q: 'Semax or Selank spray?',
        a: 'Semax for focus, attention and mental stamina; Selank for calm and stress resilience. They come from the same Russian research programme and are often run side by side.',
      },
      {
        q: 'How does the spray compare on price?',
        a: 'The 5mg spray and the 5mg vial are both R400, so you pay nothing extra to skip reconstitution. The 5mg pen is R750.',
      },
    ],
    pairsWith: ['selank', 'adamax', 'nad-plus'],
    sources: [
      {
        label: 'Dolotov OV et al. Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus. Brain Res. 2006.',
        url: pubmed(16996037),
      },
      {
        label: 'Lochhead JJ, Thorne RG. Intranasal delivery of biologics to the central nervous system. Adv Drug Deliv Rev. 2012.',
        url: pubmed(22119441),
      },
    ],
    meta: {
      title: 'Semax Nasal Spray South Africa | STRIATA',
      description:
        'Semax nasal spray, 5mg in a 10ml amber bottle for R400. The nootropic peptide in its original intranasal format, no reconstitution. Delivered across SA.',
    },
  },

  selank: {
    lede: 'The calm-without-sedation peptide, in the intranasal form its clinical use was built on.',
    intranasal: [
      'Selank, like Semax, came out of the Russian Academy of Sciences and is used there as nasal drops. Its appeal is a combination that conventional anxiolytics rarely manage: an effect on anxiety without sedation, and without the dependence that limits benzodiazepines. The spray delivers it the way that clinical experience was gathered.',
      'Route matters more for Selank than you might expect. A 2016 mouse study compared intranasal and intraperitoneal dosing and found the anxiolytic and nootropic effects under both, but with different receptor changes in the brain — NMDA binding shifted after intranasal dosing, GABA binding after injection. The authors put the difference down to how the peptide is absorbed and broken down by each route.',
    ],
    researchNotes: [
      {
        title: 'Compared with a benzodiazepine',
        body: 'Zozulia et al. (2008) treated 62 patients with generalised anxiety disorder or neurasthenia with Selank or medazepam. Anxiolytic effects were similar; Selank also showed anti-asthenic and mildly stimulating effects.',
      },
      {
        title: 'Enkephalin activity',
        body: 'The same study linked Selank to changes in serum enkephalin activity, the body\'s own opioid-like peptides — one proposed mechanism for its anxiolytic effect.',
      },
      {
        title: 'Route-dependent effects',
        body: 'The 2016 mouse comparison is a reminder that intranasal results cannot simply be assumed from injection data, or the other way round.',
      },
    ],
    caveat:
      'The clinical trials are Russian, modest in size, and published mainly in Russian-language journals. The anxiety research is promising, but it is a long way from the large, independently replicated trials behind registered anxiolytics elsewhere.',
    faqs: [
      {
        q: 'Will it make me drowsy?',
        a: 'Being non-sedating was the design goal, and it is what the research is built around. Nobody can promise how any one person responds, so start a research protocol when you have nothing demanding planned.',
      },
      {
        q: 'Selank or DSIP spray for stress?',
        a: 'Selank for daytime stress and resilience; DSIP is researched around sleep architecture and circadian rhythm. Different problems, and some people pair them for that reason.',
      },
      {
        q: 'Spray or vial?',
        a: 'The spray is R430 and needs no preparation. The 5mg vial is R400 but has to be reconstituted, and the 5mg pen is R750.',
      },
    ],
    pairsWith: ['semax', 'dsip', 'oxytocin'],
    sources: [
      {
        label: 'Zozulia AA et al. Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia. Zh Nevrol Psikhiatr Im S S Korsakova. 2008.',
        url: pubmed(18454096),
      },
      {
        label: 'Vasil\'eva EV et al. Comparison of pharmacological effects of heptapeptide selank after intranasal and intraperitoneal administration to BALB/c and C57BL/6 mice. Eksp Klin Farmakol. 2016.',
        url: pubmed(29787664),
      },
    ],
    meta: {
      title: 'Selank Nasal Spray South Africa | STRIATA',
      description:
        'Selank nasal spray, 5mg in 10ml for R430. The Russian anxiolytic peptide researched for calm without sedation, ready to use. Shipped across South Africa.',
    },
  },

  oxytocin: {
    lede: 'Intranasal is the route almost all human oxytocin research on social behaviour has used — this is the format the literature describes.',
    intranasal: [
      'Oxytocin given by injection acts mainly on the body — that is how it is used in childbirth. The research on trust, empathy and social behaviour is a different field, and it is almost entirely intranasal, because the nose offers a route toward the brain that an injection into the bloodstream largely does not.',
      'That body of work took off with a 2005 study in Nature in which participants given intranasal oxytocin handed more money to a stranger in an investment game — a measure of trust. Hundreds of intranasal studies have followed, on social recognition, emotional processing, and research in autism and social anxiety.',
    ],
    researchNotes: [
      {
        title: 'Trust',
        body: 'Kosfeld et al. (2005) found intranasal oxytocin increased the money participants entrusted to others, without changing their general appetite for risk.',
      },
      {
        title: 'Dose and delivery',
        body: 'Quintana and colleagues have shown the delivery device and the dose both change the result, and that lower intranasal doses sometimes outperform higher ones.',
      },
      {
        title: 'Reproducibility',
        body: 'A 2016 review by Walum, Waldman and Young found many early intranasal oxytocin studies were underpowered, and warned that a number of headline findings may not replicate.',
      },
    ],
    caveat:
      'This is the best-studied compound in the range and also the one with the most public reckoning over its evidence. The trust study became famous; later replications were mixed. Treat single striking results with caution and look for effects that have held up across several studies.',
    faqs: [
      {
        q: 'Why is the spray more expensive than the vial?',
        a: 'The spray is R540, the 5mg vial R380. You are paying for a solution that is ready to use rather than powder you reconstitute. The 5mg pen is R750.',
      },
      {
        q: 'How is oxytocin research dosed?',
        a: 'Usually in international units (IU) rather than milligrams, which is worth knowing when you read the studies. Most of that research is intranasal.',
      },
      {
        q: 'Does it pair with anything?',
        a: 'PT-141 is the usual pairing for research into intimacy and sexual wellness: PT-141 for arousal pathways, oxytocin for the bonding side.',
      },
    ],
    pairsWith: ['pt-141', 'selank', 'semax'],
    sources: [
      {
        label: 'Kosfeld M et al. Oxytocin increases trust in humans. Nature. 2005.',
        url: pubmed(15931222),
      },
      {
        label: 'Quintana DS et al. Advances in the field of intranasal oxytocin research: lessons learned and future directions for clinical research. Mol Psychiatry. 2021.',
        url: pubmed(32807845),
      },
      {
        label: 'Walum H, Waldman ID, Young LJ. Statistical and methodological considerations for the interpretation of intranasal oxytocin studies. Biol Psychiatry. 2016.',
        url: pubmed(26210057),
      },
    ],
    meta: {
      title: 'Oxytocin Nasal Spray South Africa | STRIATA',
      description:
        'Oxytocin nasal spray, 5mg in a 10ml amber bottle for R540. The intranasal format behind the research on trust and bonding. Delivered across South Africa.',
    },
  },

  dsip: {
    lede: 'A peptide named for deep sleep, whose story turned out to be more complicated than its name.',
    intranasal: [
      'Delta Sleep-Inducing Peptide was isolated in 1977 from the blood of rabbits in induced sleep, and named for the slow-wave (delta) sleep it seemed to promote. Much of the early human work gave it intravenously, including trials in insomnia and in shifted sleep-wake cycles.',
      'The spray is a practical format rather than one with a large literature of its own: DSIP is a small peptide, and intranasal delivery is the needle-free alternative to the injections the older studies used. That makes the spray convenient, but it also means the intranasal-specific evidence is thinner here than for Semax or oxytocin.',
    ],
    researchNotes: [
      {
        title: 'Sleep architecture',
        body: 'Research interest is in the structure of sleep — the share and quality of slow-wave sleep — rather than simply falling asleep faster.',
      },
      {
        title: 'Shifted sleep-wake cycles',
        body: 'Schneider-Helmert (1987) studied DSIP in phase-shifted insomnia, where the problem is timing rather than the ability to sleep.',
      },
      {
        title: 'Stress regulation',
        body: 'Researchers now describe DSIP more as a stress and circadian regulation peptide than a sedative, which is how we position it.',
      },
    ],
    caveat:
      'A 2006 review in the Journal of Neurochemistry called DSIP "a still unresolved riddle": its gene and receptor have never been identified, and the case for it as a natural sleep factor is weak. Some synthetic DSIP analogues promoted slow-wave sleep in animals where DSIP itself did not. Go in expecting research into sleep quality and recovery, not a sleeping pill.',
    faqs: [
      {
        q: 'Is DSIP a sedative?',
        a: 'No, and it should not be treated as one. Direct sleep-inducing effects in humans have been mixed. The research interest is sleep architecture and recovery.',
      },
      {
        q: 'Spray, vial or pen?',
        a: 'The spray is R570 and ready to use. The 5mg vial is R350 if you are comfortable reconstituting; the 5mg pen is R700.',
      },
      {
        q: 'What pairs with it?',
        a: 'Selank for the daytime stress side; some people add NAD+ for the energy and recovery research.',
      },
    ],
    pairsWith: ['selank', 'nad-plus', 'oxytocin'],
    sources: [
      {
        label: 'Kovalzon VM, Strekalova TV. Delta sleep-inducing peptide (DSIP): a still unresolved riddle. J Neurochem. 2006.',
        url: pubmed(16539679),
      },
      {
        label: 'Schneider-Helmert D. The use of DSIP (delta sleep-inducing peptide) in the correction of phase-shifted insomnia. Dtsch Med Wochenschr. 1987.',
        url: pubmed(3582201),
      },
    ],
    meta: {
      title: 'DSIP Nasal Spray South Africa | Deep Sleep | STRIATA',
      description:
        'DSIP nasal spray, 5mg in 10ml for R570. Delta Sleep-Inducing Peptide, researched for sleep architecture and recovery, needle-free. Shipped across SA.',
    },
  },

  adamax: {
    lede: 'The newest compound in the ACTH-derived line that Semax started, in a ready-to-use spray.',
    intranasal: [
      'Adamax is a structurally modified analogue of Semax. Semax itself was developed as a nasal preparation, and the spray keeps its successor on the same route, so it can be compared directly with the older compound.',
      'In this range it is positioned for research into drive and vitality. It carries the highest peptide load of the brain sprays, 10mg per bottle, which doubles what is in each spray compared with Semax.',
    ],
    researchNotes: [
      {
        title: 'Lineage',
        body: 'Adamax belongs to the ACTH(4-10) family that Semax established. That family\'s research, not Adamax\'s own, is where most of the mechanism discussion comes from.',
      },
      {
        title: 'Drive and vitality',
        body: 'The positioning for this spray. It is a research framing, not a proven outcome.',
      },
      {
        title: 'Concentration',
        body: '10mg in 10ml gives 1mg per mL, twice the concentration of the Semax spray. Worth knowing if you are comparing the two.',
      },
    ],
    caveat:
      'This is the thinnest evidence base in the range, and we would rather say so. Adamax does not have the decades of clinical use behind Semax or a body of published trials of its own. If you want the compound with the longer record, choose Semax. Choose Adamax knowing it is the newer, less-studied option.',
    faqs: [
      {
        q: 'Adamax or Semax?',
        a: 'Semax has by far the longer research and clinical record. Adamax is the newer modified analogue with a much thinner published base.',
      },
      {
        q: 'Why is it more expensive?',
        a: 'The bottle holds 10mg rather than 5mg. The spray is R780; the 10mg vial is R680 and the 10mg pen R1,000.',
      },
    ],
    pairsWith: ['semax', 'nad-plus', 'pt-141'],
    sources: [
      {
        label: 'Dolotov OV et al. Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus. Brain Res. 2006. (Research on the parent compound.)',
        url: pubmed(16996037),
      },
    ],
    meta: {
      title: 'Adamax Nasal Spray South Africa | STRIATA',
      description:
        'Adamax nasal spray, 10mg in a 10ml amber bottle for R780. The newer Semax analogue, researched for drive and vitality. Ready to use, delivered across SA.',
    },
  },

  'pt-141': {
    lede: 'PT-141 was first developed as a nasal spray — the injectable you may have read about came later.',
    intranasal: [
      'Bremelanotide (PT-141) began its clinical life as an intranasal product. Palatin Technologies ran its early human trials with a nasal spray, in men with erectile dysfunction and in women with sexual arousal disorder, and it absorbed quickly: in a 2004 trial the peak blood level came about 30 minutes after dosing.',
      'The company later switched to an under-the-skin injection. That is the form the FDA approved in 2019 as Vyleesi, for hypoactive sexual desire disorder in premenopausal women, after two phase 3 trials. This spray returns the compound to its original route.',
    ],
    researchNotes: [
      {
        title: 'Early intranasal trials',
        body: 'Diamond et al. (2004) gave intranasal PT-141 to healthy men and to men with erectile dysfunction, and found significant erectile responses at higher doses, with a first response after about 30 minutes.',
      },
      {
        title: 'A central mechanism',
        body: 'PT-141 acts on melanocortin receptors in the brain rather than on blood flow, which is how it differs from sildenafil-type drugs.',
      },
      {
        title: 'The approved form',
        body: 'Kingsberg et al. (2019) reported the two RECONNECT phase 3 trials of the injectable in women, the evidence behind its FDA approval.',
      },
    ],
    caveat:
      'Flushing and nausea were the most common side effects in the intranasal trials, and blood pressure changes have been reported for the compound. The approved product is the injection, not a nasal spray, so the intranasal evidence comes from the earlier development trials.',
    faqs: [
      {
        q: 'Why is the approved version an injection if it started as a spray?',
        a: 'The developer moved to subcutaneous dosing during development. Vyleesi, the FDA-approved form, is an injection.',
      },
      {
        q: 'Spray, vial or pen?',
        a: 'All three hold 10mg. The vial is R450, the spray R520 and the pen R800.',
      },
      {
        q: 'What pairs with PT-141?',
        a: 'Oxytocin is the usual pairing: PT-141 for the arousal pathways, oxytocin for the bonding and connection side.',
      },
    ],
    pairsWith: ['oxytocin', 'adamax', 'nad-plus'],
    sources: [
      {
        label: 'Diamond LE et al. Double-blind, placebo-controlled evaluation of the safety, pharmacokinetic properties and pharmacodynamic effects of intranasal PT-141. Int J Impot Res. 2004.',
        url: pubmed(14963471),
      },
      {
        label: 'Diamond LE et al. An effect on the subjective sexual response in premenopausal women with sexual arousal disorder by bremelanotide (PT-141). J Sex Med. 2006.',
        url: pubmed(16839319),
      },
      {
        label: 'Kingsberg SA et al. Bremelanotide for the treatment of hypoactive sexual desire disorder: two randomized phase 3 trials. Obstet Gynecol. 2019.',
        url: pubmed(31599840),
      },
    ],
    meta: {
      title: 'PT-141 Nasal Spray South Africa | STRIATA',
      description:
        'PT-141 (bremelanotide) nasal spray, 10mg in 10ml for R520. The route PT-141 was first developed on, no needles. Delivered across South Africa.',
    },
  },

  'nad-plus': {
    lede: 'NAD+ without the IV drip or the oral precursors — 500mg in a nasal spray.',
    intranasal: [
      'NAD+ is usually raised in one of two ways: an IV drip, which is expensive and takes hours, or oral precursors such as NMN and NR, which the body has to convert first. Intranasal delivery is the third option. It is aimed at the brain, and it skips both the clinic and the conversion.',
      'The case for it rests on animal research. In a 2007 rat study, intranasal NAD+ measurably raised NAD+ levels in the brain, and given two hours after a stroke it sharply reduced the resulting brain damage. Nicotinamide, a precursor, given the same way did not.',
    ],
    researchNotes: [
      {
        title: 'Reaching the brain',
        body: 'Ying et al. (2007) found intranasal NAD+ significantly increased NAD+ content in rat brains. That is the key point for this format.',
      },
      {
        title: 'Energy metabolism',
        body: 'NAD+ is central to how cells make energy in their mitochondria, and its levels are well documented to fall with age.',
      },
      {
        title: 'DNA repair',
        body: 'NAD+ is used up by the enzymes that repair DNA. That is the link the longevity research draws, and the reason the stroke study worked.',
      },
    ],
    caveat:
      'The strongest intranasal NAD+ evidence is in animals, in a stroke model. How well it is absorbed through the nose in people, and what that does for everyday energy, is an active research question rather than settled science.',
    faqs: [
      {
        q: 'How much NAD+ is in the bottle?',
        a: '500mg in 10ml, or 50mg per mL. That is far more than any other spray in the range, because NAD+ is a coenzyme rather than a signalling peptide.',
      },
      {
        q: 'Spray, vial or pen?',
        a: 'All three hold 500mg. The vial is R400, the spray R460 and the pen R750.',
      },
      {
        q: 'Does it pair with anything?',
        a: 'Semax is the usual pairing for cognitive work, and DSIP for recovery and sleep.',
      },
    ],
    pairsWith: ['semax', 'dsip', 'vip'],
    sources: [
      {
        label: 'Ying W et al. Intranasal administration with NAD+ profoundly decreases brain injury in a rat model of transient focal ischemia. Front Biosci. 2007.',
        url: pubmed(17127275),
      },
      {
        label: 'Lochhead JJ, Thorne RG. Intranasal delivery of biologics to the central nervous system. Adv Drug Deliv Rev. 2012.',
        url: pubmed(22119441),
      },
    ],
    meta: {
      title: 'NAD+ Nasal Spray South Africa | 500mg | STRIATA',
      description:
        'NAD+ nasal spray, 500mg in 10ml for R460. A needle-free alternative to NAD+ drips, researched for cellular energy and longevity. Shipped across SA.',
    },
  },

  vip: {
    lede: 'Vasoactive Intestinal Peptide, researched for inflammation and immune regulation, in the nasal form those protocols use.',
    intranasal: [
      'VIP is a neuropeptide found throughout the body, in the gut, lungs and nervous system. It helps regulate blood vessels, immune responses and inflammation. Its research profile is closer to immunology than to sports recovery.',
      'Intranasal VIP is best known from functional-medicine protocols for chronic inflammatory response syndrome (CIRS), usually linked to living or working in water-damaged, mouldy buildings. Those protocols are nasal by design. Separately, a synthetic form of VIP, aviptadil, has been studied by IV and inhaled routes in severe respiratory illness.',
    ],
    researchNotes: [
      {
        title: 'Inflammation and immune regulation',
        body: 'The core of VIP research: dampening inflammatory signalling and rebalancing immune responses, rather than repairing an injury.',
      },
      {
        title: 'CIRS protocols',
        body: 'The main reason people look for VIP as a nasal spray. It is used in these protocols after other steps, as part of a longer programme.',
      },
      {
        title: 'Aviptadil',
        body: 'A 2025 meta-analysis pooled the aviptadil (synthetic VIP) trials in acute respiratory distress syndrome. Those trials used IV and inhaled routes, not the nose.',
      },
    ],
    caveat:
      'The intranasal CIRS work comes mainly from clinical practice and has little in PubMed-indexed controlled trials. The indexed human data on VIP mostly uses other routes. It is also the most expensive spray in the range, so know which body of evidence you are relying on before you buy.',
    faqs: [
      {
        q: 'Is this a sports recovery product?',
        a: 'Not really. Our "recovery" positioning means systemic, inflammatory and immune recovery, not muscle or tendon repair. For those, look at BPC-157 and TB-500 in the catalogue.',
      },
      {
        q: 'Why is it the most expensive spray?',
        a: 'VIP is a longer, costlier peptide to make. The spray is R1,240; the 5mg vial is R550 and the 5mg pen R850.',
      },
      {
        q: 'Does it pair with anything?',
        a: 'NAD+ is sometimes paired with it for cellular energy during longer recovery protocols.',
      },
    ],
    pairsWith: ['nad-plus', 'selank', 'dsip'],
    sources: [
      {
        label: 'Udupa AA et al. Aviptadil therapy in acute respiratory distress syndrome patients: a systematic review and meta-analysis. Indian J Crit Care Med. 2025.',
        url: pubmed(41368449),
      },
      {
        label: 'Lochhead JJ, Thorne RG. Intranasal delivery of biologics to the central nervous system. Adv Drug Deliv Rev. 2012.',
        url: pubmed(22119441),
      },
    ],
    meta: {
      title: 'VIP Nasal Spray South Africa | STRIATA',
      description:
        'VIP (Vasoactive Intestinal Peptide) nasal spray, 5mg in 10ml for R1,240. Researched for inflammation and immune regulation. Delivered across South Africa.',
    },
  },
}

export const nasalSprayContentFor = (spray) => NASAL_SPRAY_CONTENT[spray.slug] ?? null
