export const categories = [
  { id: 'all', label: 'All' },
  { id: 'popular', label: 'Popular', icon: '⭐' },
  { id: 'recovery', label: 'Recovery & Performance', icon: '💪' },
  { id: 'skin', label: 'Skin, Hair & Anti-Aging', icon: '✨' },
  { id: 'hormonal', label: 'Hormonal & Sexual Health', icon: '⚡' },
  { id: 'weight', label: 'Weight Loss & Metabolism', icon: '🔥' },
  { id: 'brain', label: 'Brain, Mood & Sleep', icon: '🧠' },
  { id: 'immunity', label: 'Immunity & Longevity', icon: '🛡️' },
  { id: 'specialised', label: 'Specialised & Bioregulators', icon: '🔬' },
  { id: 'supplies', label: 'Reconstitution Supplies', icon: '⚗️' },
]

export const products = [
  // Recovery & Performance
  {
    id: 1,
    name: 'BPC-157',
    category: 'recovery',
    description: 'A powerful body protection compound that accelerates tissue repair, reduces inflammation and supports gut health. A staple in any recovery protocol.',
    tags: ['Tissue Repair', 'Anti-Inflammatory', 'Gut Health'],
    prices: [
      { dose: '2mg', price: 275 },
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 400 },
    ],
  },
  {
    id: 2,
    name: 'TB-500',
    category: 'recovery',
    description: 'Thymosin Beta-4 peptide that fast-tracks recovery from soft tissue and connective tissue injuries. Ideal for athletes and active individuals.',
    tags: ['Soft Tissue', 'Recovery', 'Athletic'],
    prices: [
      { dose: '2mg', price: 300 },
      { dose: '5mg', price: 400 },
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 3,
    name: 'BPC+TB Wolverine Stack',
    category: 'recovery',
    description: 'The ultimate healing combo: BPC-157 and TB-500 working together for maximum tissue repair and accelerated recovery.',
    tags: ['Stack', 'Recovery', 'Tissue Repair'],
    featured: true,
    prices: [
      { dose: '5mg+5mg', price: 650 },
      { dose: '10mg+10mg', price: 825 },
      { dose: '15mg+15mg', price: 1250 },
    ],
  },
  {
    id: 4,
    name: 'IGF-1 LR3',
    category: 'recovery',
    description: 'Long-acting growth factor that drives muscle growth, supports fat metabolism and enhances cellular repair.',
    tags: ['Muscle Growth', 'Fat Metabolism', 'Cellular Repair'],
    prices: [
      { dose: '100mcg', price: 300 },
      { dose: '1mg', price: 970 },
    ],
  },
  {
    id: 5,
    name: 'HGH Fragment 176-191',
    category: 'recovery',
    description: 'An isolated fragment of HGH that specifically targets fat burning without the growth-promoting side effects of full HGH.',
    tags: ['Fat Burning', 'HGH Fragment', 'Performance'],
    prices: [
      { dose: '2mg', price: 275 },
      { dose: '5mg', price: 500 },
    ],
  },
  {
    id: 6,
    name: 'HGH Somatropin',
    category: 'recovery',
    description: 'Recombinant human growth hormone for muscle growth, fat loss and anti-aging, and one of the most sought-after compounds in performance research.',
    tags: ['Growth Hormone', 'Muscle Growth', 'Anti-Aging'],
    featured: true,
    prices: [
      { dose: '12iu', price: 360 },
      { dose: '15iu', price: 440 },
      { dose: '24iu', price: 660 },
    ],
  },
  {
    id: 7,
    name: 'MGF',
    category: 'recovery',
    description: 'Mechano Growth Factor that activates satellite cells for localised muscle repair and growth following intense training.',
    tags: ['Muscle Repair', 'Satellite Cells', 'Training'],
    prices: [
      { dose: '2mg', price: 420 },
    ],
  },
  {
    id: 8,
    name: 'CJC-1295 with DAC',
    category: 'recovery',
    description: 'Long-acting growth hormone releasing hormone analogue providing sustained GH release over 1–2 weeks per injection.',
    tags: ['GHRH', 'Sustained Release', 'GH'],
    prices: [
      { dose: '2mg', price: 375 },
    ],
  },
  {
    id: 9,
    name: 'GHRP-6',
    category: 'recovery',
    description: 'Growth hormone releasing peptide that stimulates GH secretion and increases appetite, ideal for lean mass protocols.',
    tags: ['GH Release', 'Lean Mass', 'Appetite'],
    prices: [
      { dose: '5mg', price: 250 },
      { dose: '10mg', price: 350 },
    ],
  },
  {
    id: 10,
    name: 'GHRP-2',
    category: 'recovery',
    description: 'A potent GH releasing peptide with stronger stimulation than GHRP-6 and less appetite effect.',
    tags: ['GH Release', 'Potent', 'Performance'],
    prices: [
      { dose: '5mg', price: 270 },
      { dose: '10mg', price: 340 },
      { dose: '15mg', price: 480 },
    ],
  },
  {
    id: 11,
    name: 'Ipamorelin',
    category: 'recovery',
    description: 'A clean, selective GH secretagogue delivering a precise pulse of growth hormone with minimal side effects.',
    tags: ['GH Secretagogue', 'Clean', 'Minimal Side Effects'],
    prices: [
      { dose: '5mg', price: 300 },
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 12,
    name: 'CJC-1295 + Ipamorelin Stack',
    category: 'recovery',
    description: 'A synergistic GHRH and ghrelin mimetic stack for optimised pulsatile growth hormone release.',
    tags: ['Stack', 'GHRH', 'GH Release'],
    prices: [
      { dose: '5mg+5mg', price: 425 },
    ],
  },
  {
    id: 13,
    name: 'Hexarelin Acetate',
    category: 'recovery',
    description: 'A highly potent GH secretagogue with added cardioprotective properties and strong growth hormone stimulation.',
    tags: ['GH Secretagogue', 'Cardioprotective', 'Potent'],
    prices: [
      { dose: '2mg', price: 350 },
      { dose: '5mg', price: 725 },
    ],
  },
  {
    id: 14,
    name: 'Sermorelin Acetate',
    category: 'recovery',
    description: 'Restores natural growth hormone pulses, commonly used in anti-aging and hormone optimisation protocols.',
    tags: ['GH Pulses', 'Anti-Aging', 'Hormone Optimisation'],
    prices: [
      { dose: '2mg', price: 350 },
      { dose: '5mg', price: 700 },
      { dose: '10mg', price: 1050 },
    ],
  },
  {
    id: 15,
    name: 'GLOW Stack (BPC+GHK-Cu)',
    category: 'recovery',
    description: 'A dual-action beauty and healing stack combining BPC-157 for tissue repair with GHK-Cu for skin regeneration and anti-aging.',
    tags: ['Stack', 'Beauty', 'Anti-Aging'],
    featured: true,
    prices: [
      { dose: '10mg+50mg', price: 1150 },
    ],
  },
  {
    id: 16,
    name: 'SS-31',
    category: 'recovery',
    description: 'A mitochondria-targeting antioxidant peptide that reduces oxidative stress and supports cellular energy production.',
    tags: ['Mitochondria', 'Antioxidant', 'Energy'],
    prices: [
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 600 },
      { dose: '50mg', price: 1980 },
    ],
  },
  {
    id: 17,
    name: 'ACE 031',
    category: 'recovery',
    description: 'A myostatin inhibitor that promotes significant lean muscle growth and strength by blocking muscle growth limitations.',
    tags: ['Myostatin Inhibitor', 'Lean Muscle', 'Strength'],
    prices: [
      { dose: '1mg', price: 300 },
    ],
  },
  {
    id: 18,
    name: 'EPO',
    category: 'recovery',
    description: 'Erythropoietin that stimulates red blood cell production, dramatically improving endurance and oxygen delivery.',
    tags: ['Endurance', 'Red Blood Cells', 'Oxygen'],
    prices: [
      { dose: '3000iu', price: 375 },
    ],
  },
  {
    id: 19,
    name: 'KPV',
    category: 'recovery',
    description: 'A potent anti-inflammatory tripeptide effective for gut health, skin conditions and systemic inflammation.',
    tags: ['Anti-Inflammatory', 'Gut Health', 'Skin'],
    featured: true,
    prices: [
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 600 },
    ],
  },
  {
    id: 20,
    name: 'LL37',
    category: 'recovery',
    description: 'Human antimicrobial peptide with broad-spectrum antibacterial, antiviral and wound-healing properties.',
    tags: ['Antimicrobial', 'Wound Healing', 'Antiviral'],
    prices: [
      { dose: '5mg', price: 580 },
    ],
  },
  {
    id: 21,
    name: 'PEG MGF',
    category: 'recovery',
    description: 'PEGylated Mechano Growth Factor with an extended half-life for enhanced and sustained muscle satellite cell activation.',
    tags: ['PEGylated', 'Muscle Growth', 'Extended Half-Life'],
    prices: [
      { dose: '2mg', price: 530 },
    ],
  },

  // Skin, Hair & Anti-Aging
  {
    id: 22,
    name: 'GHK-Cu',
    category: 'skin',
    description: 'The gold standard copper tripeptide, renowned for skin rejuvenation, collagen regeneration and powerful anti-aging effects.',
    tags: ['Skin Rejuvenation', 'Collagen', 'Anti-Aging'],
    featured: true,
    prices: [
      { dose: '100mg', price: 450 },
    ],
  },
  {
    id: 23,
    name: 'Epithalon',
    category: 'skin',
    description: 'A telomerase-activating tetrapeptide with anti-aging, sleep improvement and longevity benefits, and one of the most researched longevity compounds available.',
    tags: ['Telomerase', 'Longevity', 'Anti-Aging'],
    featured: true,
    prices: [
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 24,
    name: 'FOX04-DRI',
    category: 'skin',
    description: 'A cutting-edge senolytic peptide that selectively clears senescent cells, one of the most advanced longevity compounds in research today.',
    tags: ['Senolytic', 'Longevity', 'Advanced'],
    prices: [
      { dose: '2mg', price: 580 },
      { dose: '10mg', price: 1750 },
    ],
  },
  {
    id: 25,
    name: 'AHK-Cu',
    category: 'skin',
    description: 'Copper tripeptide that promotes hair growth, scalp health, collagen synthesis and follicle regeneration.',
    tags: ['Hair Growth', 'Scalp Health', 'Collagen'],
    prices: [
      { dose: '20mg', price: 250 },
      { dose: '50mg', price: 550 },
    ],
  },
  {
    id: 26,
    name: 'Snap-8',
    category: 'skin',
    description: 'An octapeptide that inhibits facial muscle contractions for a Botox-like smoothing effect on expression lines and wrinkles.',
    tags: ['Anti-Wrinkle', 'Botox Alternative', 'Smoothing'],
    prices: [
      { dose: '10mg', price: 300 },
      { dose: '100mg', price: 1150 },
    ],
  },
  {
    id: 27,
    name: 'Matrixyl',
    category: 'skin',
    description: 'Stimulates collagen and hyaluronic acid synthesis for visibly firmer, more youthful skin.',
    tags: ['Collagen', 'Hyaluronic Acid', 'Firmness'],
    prices: [
      { dose: '10mg', price: 250 },
    ],
  },
  {
    id: 28,
    name: 'Glutathione',
    category: 'skin',
    description: 'The master antioxidant that neutralises free radicals, supports liver detoxification and brightens skin tone.',
    tags: ['Antioxidant', 'Detox', 'Skin Brightening'],
    prices: [
      { dose: '400mg', price: 250 },
      { dose: '600mg', price: 350 },
      { dose: '1500mg', price: 580 },
    ],
  },
  {
    id: 29,
    name: 'Melatonin',
    category: 'skin',
    description: 'Injectable melatonin for circadian rhythm regulation, deep restorative sleep and powerful antioxidant support.',
    tags: ['Sleep', 'Circadian Rhythm', 'Antioxidant'],
    prices: [
      { dose: '10mg', price: 435 },
    ],
  },
  {
    id: 30,
    name: 'PTD-DBM',
    category: 'skin',
    description: 'A Wnt signalling activator that promotes hair follicle regeneration and stimulates new hair growth.',
    tags: ['Hair Regeneration', 'Wnt Signalling', 'Follicle'],
    prices: [
      { dose: '1mg', price: 570 },
    ],
  },
  {
    id: 31,
    name: 'B12',
    category: 'skin',
    description: 'Injectable Vitamin B12 for energy metabolism, neurological support and red blood cell formation.',
    tags: ['Energy', 'Neurological', 'Vitamin'],
    prices: [
      { dose: '1mg/ml', price: 350 },
    ],
  },
  {
    id: 32,
    name: 'Botulinum Toxin',
    category: 'skin',
    description: 'Research-grade Botulinum Toxin Type A for cosmetic and neurological research applications.',
    tags: ['Botox', 'Cosmetic', 'Research'],
    prices: [
      { dose: '100iu', price: 550 },
    ],
  },

  // Hormonal & Sexual Health
  {
    id: 33,
    name: 'MOTS-C',
    category: 'hormonal',
    description: 'A mitochondrial-derived peptide that enhances metabolic function, exercise capacity and cellular energy production.',
    tags: ['Mitochondrial', 'Metabolic', 'Energy'],
    featured: true,
    prices: [
      { dose: '20mg', price: 650 },
      { dose: '40mg', price: 940 },
    ],
  },
  {
    id: 34,
    name: 'PT-141 (Bremelanotide)',
    category: 'hormonal',
    description: 'Clinically proven to enhance sexual arousal and libido in both men and women, without acting on the vascular system.',
    tags: ['Libido', 'Sexual Health', 'Clinically Proven'],
    featured: true,
    prices: [
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 35,
    name: 'Melanotan II',
    category: 'hormonal',
    description: 'Stimulates melanin production for tanning, appetite suppression and libido enhancement.',
    tags: ['Tanning', 'Libido', 'Melanin'],
    prices: [
      { dose: '10mg', price: 400 },
    ],
  },
  {
    id: 36,
    name: 'Melanotan I',
    category: 'hormonal',
    description: 'Promotes melanin synthesis for a natural tan with reduced UV exposure requirements.',
    tags: ['Tanning', 'Melanin', 'UV Protection'],
    prices: [
      { dose: '10mg', price: 390 },
    ],
  },
  {
    id: 37,
    name: 'HCG',
    category: 'hormonal',
    description: 'Stimulates testosterone production and maintains testicular function, a key compound in hormonal health protocols.',
    tags: ['Testosterone', 'Hormonal Health', 'Male Health'],
    prices: [
      { dose: '5000iu', price: 385 },
    ],
  },
  {
    id: 38,
    name: 'HMG',
    category: 'hormonal',
    description: 'Contains FSH and LH for comprehensive fertility support and hormonal restoration.',
    tags: ['Fertility', 'FSH', 'LH'],
    prices: [
      { dose: '75iu', price: 425 },
    ],
  },
  {
    id: 39,
    name: 'Gonadorelin Acetate',
    category: 'hormonal',
    description: 'A GnRH analogue that stimulates LH and FSH release, used in fertility protocols and testosterone recovery.',
    tags: ['GnRH', 'Fertility', 'Testosterone Recovery'],
    prices: [
      { dose: '2mg', price: 260 },
      { dose: '5mg', price: 390 },
    ],
  },
  {
    id: 40,
    name: 'Oxytocin Acetate',
    category: 'hormonal',
    description: 'The bonding hormone that enhances social connection, reduces stress and supports recovery and wellbeing.',
    tags: ['Bonding', 'Stress Reduction', 'Wellbeing'],
    prices: [
      { dose: '2mg', price: 225 },
      { dose: '5mg', price: 380 },
      { dose: '10mg', price: 530 },
    ],
  },
  {
    id: 41,
    name: 'Kisspeptin',
    category: 'hormonal',
    description: 'Activates the HPG axis to naturally boost LH, FSH and testosterone in individuals with hormonal deficiencies.',
    tags: ['HPG Axis', 'Testosterone', 'Hormonal Deficiency'],
    prices: [
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 600 },
    ],
  },

  // Weight Loss & Metabolism
  {
    id: 42,
    name: '5-Amino-1MQ',
    category: 'weight',
    description: 'Inhibits NNMT enzyme activity to promote fat loss and improved cellular metabolism.',
    tags: ['NNMT Inhibitor', 'Fat Loss', 'Metabolism'],
    prices: [
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 43,
    name: 'AOD-9604',
    category: 'weight',
    description: 'An HGH fragment that stimulates lipolysis and inhibits fat storage without affecting blood sugar or growth.',
    tags: ['Lipolysis', 'Fat Loss', 'HGH Fragment'],
    prices: [
      { dose: '5mg', price: 500 },
    ],
  },
  {
    id: 44,
    name: 'Tesamorelin',
    category: 'weight',
    description: 'Clinically proven to reduce visceral fat, improve body composition and boost cognitive function.',
    tags: ['Visceral Fat', 'Body Composition', 'Cognitive'],
    featured: true,
    prices: [
      { dose: '5mg', price: 500 },
      { dose: '10mg', price: 1050 },
      { dose: '20mg', price: 1650 },
    ],
  },
  {
    id: 45,
    name: 'Tesa10 + Ipamorelin Stack',
    category: 'weight',
    description: 'Pre-combined Tesamorelin and Ipamorelin for optimised GH release with targeted visceral fat reduction.',
    tags: ['Stack', 'GH Release', 'Fat Reduction'],
    prices: [
      { dose: '10mg+5mg', price: 1250 },
    ],
  },
  {
    id: 46,
    name: 'Retatrutide',
    category: 'weight',
    description: 'The most advanced weight loss peptide available: a triple agonist delivering superior fat reduction and metabolic control.',
    tags: ['Triple Agonist', 'Advanced', 'Fat Loss'],
    featured: true,
    prices: [
      { dose: '30mg', price: 1750 },
      { dose: '50mg', price: 2750 },
      { dose: '60mg', price: 3600 },
    ],
  },
  {
    id: 47,
    name: 'Tirzepatide',
    category: 'weight',
    description: 'Dual GIP/GLP-1 agonist delivering powerful weight loss and blood sugar optimisation (the Mounjaro generic).',
    tags: ['GLP-1', 'Weight Loss', 'Blood Sugar'],
    featured: true,
    prices: [
      { dose: '30mg', price: 1500 },
      { dose: '50mg', price: 2250 },
      { dose: '60mg', price: 2600 },
    ],
  },
  {
    id: 48,
    name: 'Semaglutide',
    category: 'weight',
    description: 'GLP-1 receptor agonist clinically proven for significant weight loss and blood sugar control (the Ozempic generic).',
    tags: ['GLP-1', 'Weight Loss', 'Ozempic'],
    prices: [
      { dose: '2mg', price: 300 },
      { dose: '5mg', price: 400 },
      { dose: '10mg', price: 600 },
      { dose: '15mg', price: 800 },
      { dose: '20mg', price: 1200 },
      { dose: '50mg', price: 2000 },
    ],
  },
  {
    id: 49,
    name: 'Cagrilintide',
    category: 'weight',
    description: 'Long-acting amylin analogue that suppresses appetite and complements GLP-1 therapy for enhanced fat loss.',
    tags: ['Amylin', 'Appetite Suppression', 'GLP-1'],
    prices: [
      { dose: '2mg', price: 300 },
      { dose: '5mg', price: 600 },
      { dose: '10mg', price: 1080 },
    ],
  },
  {
    id: 50,
    name: 'Cagrisema',
    category: 'weight',
    description: 'A synergistic combination of Cagrilintide and Semaglutide for dual-mechanism weight management.',
    tags: ['Combination', 'Weight Management', 'Dual Mechanism'],
    prices: [
      { dose: '5mg', price: 425 },
      { dose: '10mg', price: 750 },
      { dose: '20mg', price: 1150 },
    ],
  },
  {
    id: 51,
    name: 'Liraglutide',
    category: 'weight',
    description: 'GLP-1 receptor agonist for weight management and type 2 diabetes support (the Victoza/Saxenda generic).',
    tags: ['GLP-1', 'Weight Management', 'Diabetes'],
    prices: [
      { dose: '5mg', price: 520 },
      { dose: '10mg', price: 880 },
      { dose: '30mg', price: 2380 },
    ],
  },
  {
    id: 52,
    name: 'Dulaglutide',
    category: 'weight',
    description: 'Once-weekly GLP-1 agonist for glucose control and moderate weight reduction (the Trulicity generic).',
    tags: ['GLP-1', 'Once Weekly', 'Glucose Control'],
    prices: [
      { dose: '5mg', price: 950 },
      { dose: '10mg', price: 1550 },
    ],
  },
  {
    id: 53,
    name: 'Survodutide',
    category: 'weight',
    description: 'Next-generation dual glucagon/GLP-1 receptor agonist showing exceptional results in obesity research.',
    tags: ['Glucagon', 'GLP-1', 'Next-Gen'],
    prices: [
      { dose: '10mg', price: 1400 },
    ],
  },
  {
    id: 54,
    name: 'Mazdutide',
    category: 'weight',
    description: 'A GLP-1/glucagon dual agonist in late-stage clinical trials for obesity and metabolic health.',
    tags: ['GLP-1', 'Glucagon', 'Clinical Trials'],
    prices: [
      { dose: '10mg', price: 1650 },
    ],
  },
  {
    id: 55,
    name: 'AICAR',
    category: 'weight',
    description: 'An AMPK activator that mimics the metabolic effects of exercise and improves endurance, fat oxidation and insulin sensitivity.',
    tags: ['AMPK', 'Exercise Mimetic', 'Fat Oxidation'],
    prices: [
      { dose: '50mg', price: 350 },
      { dose: '100mg', price: 650 },
    ],
  },
  {
    id: 56,
    name: 'Adipotide/FTTP',
    category: 'weight',
    description: 'A fat-targeting peptide that selectively disrupts vasculature in adipose tissue for targeted fat loss.',
    tags: ['Targeted Fat Loss', 'Adipose Tissue', 'Vasculature'],
    prices: [
      { dose: '2mg', price: 400 },
      { dose: '5mg', price: 850 },
      { dose: '10mg', price: 1300 },
    ],
  },
  {
    id: 57,
    name: 'L-Carnitine',
    category: 'weight',
    description: 'Facilitates fatty acid transport into mitochondria for energy production and fat metabolism support.',
    tags: ['Fat Metabolism', 'Mitochondria', 'Energy'],
    prices: [
      { dose: '600mg', price: 450 },
      { dose: '1200mg', price: 600 },
    ],
  },
  {
    id: 58,
    name: 'Lipo-C',
    category: 'weight',
    description: 'A lipotropic injection blend that mobilises and metabolises fat for enhanced body composition.',
    tags: ['Lipotropic', 'Fat Mobilisation', 'Body Composition'],
    prices: [
      { dose: '10ml', price: 550 },
    ],
  },
  {
    id: 59,
    name: 'MIC (Lipo-C + B12)',
    category: 'weight',
    description: 'A comprehensive lipotropic shot combining Methionine, Inositol, Choline and B12 for fat metabolism and energy.',
    tags: ['Lipotropic', 'B12', 'Fat Metabolism'],
    prices: [
      { dose: '10mg', price: 850 },
    ],
  },

  // Brain, Mood & Sleep
  {
    id: 60,
    name: 'Selank',
    category: 'brain',
    description: 'An anxiolytic nootropic peptide that reduces anxiety, stabilises mood and enhances cognitive performance.',
    tags: ['Anxiolytic', 'Nootropic', 'Mood'],
    featured: true,
    prices: [
      { dose: '10mg', price: 650 },
    ],
  },
  {
    id: 61,
    name: 'Semax',
    category: 'brain',
    description: 'An ACTH-derived nootropic that enhances focus, memory consolidation and neuroprotection, a favourite among biohackers.',
    tags: ['Nootropic', 'Focus', 'Memory'],
    featured: true,
    prices: [
      { dose: '10mg', price: 650 },
    ],
  },
  {
    id: 62,
    name: 'DSIP',
    category: 'brain',
    description: 'Delta Sleep-Inducing Peptide that promotes deep restorative sleep and regulates the sleep-wake cycle.',
    tags: ['Sleep', 'Delta Sleep', 'Circadian'],
    prices: [
      { dose: '2mg', price: 290 },
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 600 },
    ],
  },
  {
    id: 63,
    name: 'PE-22-28',
    category: 'brain',
    description: 'A fast-acting antidepressant peptide analogue with neurogenesis-promoting effects.',
    tags: ['Antidepressant', 'Neurogenesis', 'Fast-Acting'],
    prices: [
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 590 },
    ],
  },
  {
    id: 64,
    name: 'Pinealon',
    category: 'brain',
    description: 'A geroprotective tripeptide from the pineal gland that improves cognitive function and circadian regulation.',
    tags: ['Geroprotective', 'Cognitive', 'Pineal Gland'],
    prices: [
      { dose: '5mg', price: 250 },
      { dose: '10mg', price: 400 },
    ],
  },
  {
    id: 65,
    name: 'P21',
    category: 'brain',
    description: 'A CNTF-derived peptide that enhances synaptic plasticity and shows strong promise in neurodegenerative research.',
    tags: ['Neuroprotective', 'Synaptic Plasticity', 'CNTF'],
    prices: [
      { dose: '5mg', price: 1650 },
    ],
  },
  {
    id: 66,
    name: 'Humanin',
    category: 'brain',
    description: 'A mitochondria-derived peptide with neuroprotective, cardioprotective and longevity-promoting properties.',
    tags: ['Neuroprotective', 'Cardioprotective', 'Longevity'],
    prices: [
      { dose: '10mg', price: 1960 },
    ],
  },
  {
    id: 67,
    name: 'Cerebrolysin',
    category: 'brain',
    description: 'A neuropeptide mixture that promotes neuroplasticity, cognitive recovery and brain cell protection.',
    tags: ['Neuroplasticity', 'Cognitive Recovery', 'Neuroprotection'],
    prices: [
      { dose: '60mg', price: 400 },
    ],
  },
  {
    id: 68,
    name: 'NAD+',
    category: 'brain',
    description: 'The essential coenzyme for cellular energy, metabolism, DNA repair and healthy ageing, a longevity cornerstone.',
    tags: ['NAD+', 'Longevity', 'Cellular Energy'],
    featured: true,
    prices: [
      { dose: '500mg', price: 400 },
    ],
  },

  // Immunity & Longevity
  {
    id: 69,
    name: 'ARA290 (Cibinetide)',
    category: 'immunity',
    description: 'An erythropoietin-derived peptide with neuroprotective and anti-inflammatory effects targeting metabolic health.',
    tags: ['Neuroprotective', 'Anti-Inflammatory', 'EPO-derived'],
    prices: [
      { dose: '10mg', price: 425 },
      { dose: '16mg', price: 650 },
    ],
  },
  {
    id: 70,
    name: 'Thymalin/Thymulin',
    category: 'immunity',
    description: 'A thymic peptide that restores immune function, supports T-cell maturation and promotes longevity.',
    tags: ['Immune Function', 'T-Cell', 'Longevity'],
    prices: [
      { dose: '10mg', price: 450 },
    ],
  },
  {
    id: 71,
    name: 'Thymosin Alpha-1',
    category: 'immunity',
    description: 'A potent immune-modulating peptide that activates T-cells and dendritic cells for enhanced immune defence.',
    tags: ['Immune Modulation', 'T-Cell', 'Immune Defence'],
    featured: true,
    prices: [
      { dose: '5mg', price: 650 },
      { dose: '10mg', price: 1040 },
    ],
  },
  {
    id: 72,
    name: 'B7-33',
    category: 'immunity',
    description: 'A relaxin-derived peptide with anti-fibrotic, cardioprotective and vascular remodelling properties.',
    tags: ['Anti-Fibrotic', 'Cardioprotective', 'Vascular'],
    prices: [
      { dose: '2mg', price: 350 },
      { dose: '10mg', price: 1300 },
    ],
  },
  {
    id: 73,
    name: 'VIP',
    category: 'immunity',
    description: 'Vasoactive Intestinal Peptide, a neuropeptide with anti-inflammatory, bronchodilatory and immunomodulatory effects.',
    tags: ['Immunomodulatory', 'Anti-Inflammatory', 'Neuropeptide'],
    prices: [
      { dose: '5mg', price: 550 },
      { dose: '10mg', price: 900 },
    ],
  },

  // Specialised & Bioregulators
  {
    id: 74,
    name: 'ACTH 1-39',
    category: 'specialised',
    description: 'Full-length adrenocorticotropic hormone that stimulates cortisol production and adrenal gland function.',
    tags: ['ACTH', 'Cortisol', 'Adrenal'],
    prices: [
      { dose: '5mg', price: 450 },
    ],
  },
  {
    id: 75,
    name: 'Bronchogen',
    category: 'specialised',
    description: 'A peptide bioregulator that supports lung health and respiratory function.',
    tags: ['Lung Health', 'Respiratory', 'Bioregulator'],
    prices: [
      { dose: '20mg', price: 550 },
    ],
  },
  {
    id: 76,
    name: 'Cardiogen',
    category: 'specialised',
    description: 'A tetrapeptide bioregulator that promotes cardiac cell regeneration and cardiovascular health.',
    tags: ['Cardiac', 'Cardiovascular', 'Bioregulator'],
    prices: [
      { dose: '20mg', price: 550 },
    ],
  },
  {
    id: 77,
    name: 'Cartalax',
    category: 'specialised',
    description: 'Supports cartilage regeneration, joint health and connective tissue repair.',
    tags: ['Cartilage', 'Joint Health', 'Connective Tissue'],
    prices: [
      { dose: '20mg', price: 525 },
    ],
  },
  {
    id: 78,
    name: 'Cortagen',
    category: 'specialised',
    description: 'A cortical brain tissue bioregulator supporting neurological health and cognitive longevity.',
    tags: ['Neurological', 'Cognitive Longevity', 'Bioregulator'],
    prices: [
      { dose: '20mg', price: 625 },
    ],
  },
  {
    id: 79,
    name: 'Crystagen',
    category: 'specialised',
    description: 'Targets the immune system to support thymus function and immune cell activity.',
    tags: ['Thymus', 'Immune Cells', 'Bioregulator'],
    prices: [
      { dose: '20mg', price: 550 },
    ],
  },
  {
    id: 80,
    name: 'Vesugen',
    category: 'specialised',
    description: 'A vascular peptide bioregulator that supports blood vessel integrity and endothelial cell regeneration.',
    tags: ['Vascular', 'Endothelial', 'Bioregulator'],
    prices: [
      { dose: '10mg', price: 420 },
    ],
  },
  {
    id: 81,
    name: 'PNC-27',
    category: 'specialised',
    description: 'An anticancer peptide that selectively targets and disrupts cancer cell membranes without affecting healthy cells.',
    tags: ['Anticancer', 'Selective', 'Research'],
    prices: [
      { dose: '5mg', price: 580 },
    ],
  },

  // Additional products from pricelist
  {
    id: 82,
    name: 'TB Fragment',
    category: 'recovery',
    description: 'A targeted Thymosin Beta fragment with focused anti-inflammatory and tissue repair properties.',
    tags: ['Anti-Inflammatory', 'Tissue Repair', 'TB Fragment'],
    prices: [
      { dose: '5mg', price: 350 },
      { dose: '10mg', price: 600 },
    ],
  },
  {
    id: 83,
    name: 'Dermorphin',
    category: 'skin',
    description: 'A highly potent analgesic peptide with pain-relieving properties significantly stronger than conventional options.',
    tags: ['Analgesic', 'Pain Relief', 'Potent'],
    prices: [
      { dose: '2mg', price: 280 },
      { dose: '10mg', price: 650 },
    ],
  },
  {
    id: 84,
    name: 'Retatrutide + Tirzepatide Stack',
    category: 'weight',
    description: 'An advanced combination of triple and dual agonists for multi-mechanism metabolic and weight control.',
    tags: ['Stack', 'Triple Agonist', 'Multi-Mechanism'],
    prices: [
      { dose: '20mg+40mg', price: 1300 },
    ],
  },
  {
    id: 85,
    name: 'ADMAX',
    category: 'weight',
    description: 'An advanced adaptogenic peptide compound that enhances stress resilience, cognitive performance and sustained energy.',
    tags: ['Adaptogen', 'Stress Resilience', 'Energy'],
    prices: [
      { dose: '5mg', price: 450 },
      { dose: '10mg', price: 680 },
    ],
  },
  {
    id: 86,
    name: 'FTPP Adipotide',
    category: 'weight',
    description: 'An enhanced stability variant of Adipotide offering targeted adipose tissue reduction with improved bioavailability.',
    tags: ['Targeted Fat Loss', 'Enhanced Stability', 'Adipose'],
    prices: [
      { dose: '5mg', price: 650 },
    ],
  },

  // Reconstitution Supplies
  {
    id: 87,
    name: 'Bacteriostatic Water',
    category: 'supplies',
    description: 'Sterile bacteriostatic water for reconstituting lyophilised peptides. Contains 0.9% benzyl alcohol for multi-dose stability.',
    tags: ['Reconstitution', 'Sterile', 'Multi-Dose'],
    prices: [
      { dose: '3ml', price: 90 },
      { dose: '10ml', price: 150 },
    ],
  },
  {
    id: 88,
    name: 'Acetic Acid 0.6%',
    category: 'supplies',
    description: 'Sterile acetic acid solution for reconstituting peptides that are poorly soluble in bacteriostatic water.',
    tags: ['Reconstitution', 'Sterile', 'Acetic Acid'],
    prices: [
      { dose: '3ml', price: 80 },
      { dose: '5ml', price: 120 },
      { dose: '10ml', price: 150 },
    ],
  },
]

export const whatsappNumbers = [
  { number: '+27782137905', display: '+27 78 213 7905' },
]

export const whatsappLink = `https://wa.me/27782137905`
