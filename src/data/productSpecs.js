/**
 * Specifications and sources for product pages, keyed by catalogue product id.
 *
 * Every figure here was checked on 2026-10-16 against its source, not written
 * from memory: formula, molecular weight, CAS and CID from PubChem (PUG REST),
 * tirzepatide's structure and half-life from the FDA Mounjaro label, and each
 * study title, journal and year from PubMed (E-utilities). Where a figure has
 * no source we could reach, it is left out rather than estimated: retatrutide
 * has no PubChem record yet, so it carries no formula or CAS.
 *
 * TB-500 is deliberately given no formula. The name is used for both full
 * thymosin beta-4 (43 residues) and a 7-residue synthetic fragment
 * (Ac-LKKTETQ, the PubChem "TB-500" record), and which one a batch contains
 * is a question for its certificate of analysis.
 */

const pubmed = (pmid) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
const pubchem = (cid) => `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`

const S = {
  coskun2018: { authors: 'Coskun T, Sloop KW, et al.', title: 'LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: from discovery to clinical proof of concept', journal: 'Molecular Metabolism', year: 2018, url: pubmed(30473097) },
  surmount1: { authors: 'Jastreboff AM, Aronne LJ, et al.', title: 'Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1)', journal: 'New England Journal of Medicine', year: 2022, url: pubmed(35658024) },
  surpass2: { authors: 'Frias JP, Davies MJ, et al.', title: 'Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes (SURPASS-2)', journal: 'New England Journal of Medicine', year: 2021, url: pubmed(34170647) },
  mounjaroLabel: { authors: 'US Food and Drug Administration.', title: 'MOUNJARO (tirzepatide) prescribing information', journal: 'FDA label', year: 2022, url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/215866s000lbl.pdf' },
  coskun2022: { authors: 'Coskun T, Urva S, et al.', title: 'LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss: from discovery to clinical proof of concept', journal: 'Cell Metabolism', year: 2022, url: pubmed(35985340) },
  urva2022: { authors: 'Urva S, Coskun T, et al.', title: 'LY3437943, a novel triple GIP, GLP-1, and glucagon receptor agonist in people with type 2 diabetes: a phase 1b, multicentre, double-blind, placebo-controlled, randomised, multiple-ascending dose trial', journal: 'The Lancet', year: 2022, url: pubmed(36354040) },
  retaObesity: { authors: 'Jastreboff AM, Kaplan LM, et al.', title: 'Triple-hormone-receptor agonist retatrutide for obesity: a phase 2 trial', journal: 'New England Journal of Medicine', year: 2023, url: pubmed(37366315) },
  retaT2d: { authors: 'Rosenstock J, Frias J, et al.', title: 'Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial', journal: 'The Lancet', year: 2023, url: pubmed(37385280) },
  pickart1973: { authors: 'Pickart L, Thaler MM.', title: 'Tripeptide in human serum which prolongs survival of normal liver cells and stimulates growth in neoplastic liver', journal: 'Nature New Biology', year: 1973, url: pubmed(4349963) },
  maquart1988: { authors: 'Maquart FX, Pickart L, et al.', title: 'Stimulation of collagen synthesis in fibroblast cultures by the tripeptide-copper complex glycyl-L-histidyl-L-lysine-Cu2+', journal: 'FEBS Letters', year: 1988, url: pubmed(3169264) },
  pickart2012: { authors: 'Pickart L, Vasquez-Soltero JM, Margolina A.', title: 'The human tripeptide GHK-Cu in prevention of oxidative stress and degenerative conditions of aging', journal: 'Oxidative Medicine and Cellular Longevity', year: 2012, url: pubmed(22666519) },
  pickart2018: { authors: 'Pickart L, Margolina A.', title: 'Regenerative and protective actions of the GHK-Cu peptide in the light of the new gene data', journal: 'International Journal of Molecular Sciences', year: 2018, url: pubmed(29986520) },
  staresinic2003: { authors: 'Staresinic M, Sebecic B, et al.', title: 'Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocytes growth', journal: 'Journal of Orthopaedic Research', year: 2003, url: pubmed(14554208) },
  seiwerth2021: { authors: 'Seiwerth S, Milavic M, et al.', title: 'Stable gastric pentadecapeptide BPC 157 and wound healing', journal: 'Frontiers in Pharmacology', year: 2021, url: pubmed(34267654) },
  goldstein2005: { authors: 'Goldstein AL, Hannappel E, Kleinman HK.', title: 'Thymosin beta-4: actin-sequestering protein moonlights to repair injured tissues', journal: 'Trends in Molecular Medicine', year: 2005, url: pubmed(16099219) },
  kannengiesser2008: { authors: 'Kannengiesser K, Maaser C, et al.', title: 'Melanocortin-derived tripeptide KPV has anti-inflammatory potential in murine models of inflammatory bowel disease', journal: 'Inflammatory Bowel Diseases', year: 2008, url: pubmed(18092346) },
  dalmasso2008: { authors: 'Dalmasso G, Charrier-Hisamuddin L, et al.', title: 'PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation', journal: 'Gastroenterology', year: 2008, url: pubmed(18061177) },
}


/**
 * Further PubMed sources, generated on 2026-10-16 from PubMed's own esummary
 * records (authors, title, journal, year exactly as PubMed lists them) rather
 * than typed by hand.
 */
const PM = {
  14554208: { authors: "Staresinic M, Sebecic B, et al.", title: "Gastric pentadecapeptide BPC 157 accelerates healing of transected rat Achilles tendon and in vitro stimulates tendocytes growth", journal: "Journal of Orthopaedic Research", year: 2003, url: pubmed(14554208) },
  21030672: { authors: "Chang CH, Tsai WC, et al.", title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration", journal: "Journal of Applied Physiology", year: 2011, url: pubmed(21030672) },
  16099219: { authors: "Goldstein AL, Hannappel E, et al.", title: "Thymosin beta4: actin-sequestering protein moonlights to repair injured tissues", journal: "Trends in Molecular Medicine", year: 2005, url: pubmed(16099219) },
  14500546: { authors: "Philp D, Huff T, et al.", title: "The actin binding site on thymosin beta4 promotes angiogenesis", journal: "FASEB Journal", year: 2003, url: pubmed(14500546) },
  6714155: { authors: "Bowers CY, Momany FA, et al.", title: "On the in vitro and in vivo activity of a new synthetic hexapeptide that acts on the pituitary to specifically release growth hormone", journal: "Endocrinology", year: 1984, url: pubmed(6714155) },
  11297568: { authors: "Bowers CY.", title: "Unnatural growth hormone-releasing peptide begets natural ghrelin", journal: "The Journal of Clinical Endocrinology and Metabolism", year: 2001, url: pubmed(11297568) },
  11322498: { authors: "Tannenbaum GS, Bowers CY.", title: "Interactions of growth hormone secretagogues and growth hormone-releasing hormone/somatostatin", journal: "Endocrine", year: 2001, url: pubmed(11322498) },
  16352683: { authors: "Teichman SL, Neale A, et al.", title: "Prolonged stimulation of growth hormone (GH) and insulin-like growth factor I secretion by CJC-1295, a long-acting analog of GH-releasing hormone, in healthy adults", journal: "The Journal of Clinical Endocrinology and Metabolism", year: 2006, url: pubmed(16352683) },
  9849822: { authors: "Raun K, Hansen BS, et al.", title: "Ipamorelin, the first selective growth hormone secretagogue", journal: "European Journal of Endocrinology", year: 1998, url: pubmed(9849822) },
  18092346: { authors: "Kannengiesser K, Maaser C, et al.", title: "Melanocortin-derived tripeptide KPV has anti-inflammatory potential in murine models of inflammatory bowel disease", journal: "Inflammatory Bowel Diseases", year: 2008, url: pubmed(18092346) },
  18061177: { authors: "Dalmasso G, Charrier-Hisamuddin L, et al.", title: "PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation", journal: "Gastroenterology", year: 2008, url: pubmed(18061177) },
  28143741: { authors: "Xiao B, Xu Z, et al.", title: "Orally Targeted Delivery of Tripeptide KPV via Hyaluronic Acid-Functionalized Nanoparticles Efficiently Alleviates Ulcerative Colitis", journal: "Molecular Therapy", year: 2017, url: pubmed(28143741) },
  12937682: { authors: "Khavinson VKh, Bondarev IE, et al.", title: "Epithalon peptide induces telomerase activity and telomere elongation in human somatic cells", journal: "Bulletin of Experimental Biology and Medicine", year: 2003, url: pubmed(12937682) },
  11087911: { authors: "Khavinson VK, Izmaylov DM, et al.", title: "Effect of epitalon on the lifespan increase in Drosophila melanogaster", journal: "Mechanisms of Ageing and Development", year: 2000, url: pubmed(11087911) },
  14501183: { authors: "Anisimov VN, Khavinson VKh, et al.", title: "Effect of Epitalon on biomarkers of aging, life span and spontaneous tumor incidence in female Swiss-derived SHR mice", journal: "Biogerontology", year: 2003, url: pubmed(14501183) },
  22995213: { authors: "Lu SC.", title: "Glutathione synthesis", journal: "Biochimica Et Biophysica Acta", year: 2013, url: pubmed(22995213) },
  23747930: { authors: "Forman HJ, Davies KJ, et al.", title: "How do nutritional antioxidants really work: nucleophilic tone and para-hormesis versus free radical scavenging in vivo", journal: "Free Radical Biology & Medicine", year: 2014, url: pubmed(23747930) },
  27393004: { authors: "Forman HJ.", title: "Redox signaling: An evolution from free radicals to aging", journal: "Free Radical Biology & Medicine", year: 2016, url: pubmed(27393004) },
  25738459: { authors: "Lee C, Zeng J, et al.", title: "The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance", journal: "Cell Metabolism", year: 2015, url: pubmed(25738459) },
  33473109: { authors: "Reynolds JC, Lai RW, et al.", title: "MOTS-c is an exercise-induced mitochondrial-encoded regulator of age-dependent physical decline and muscle homeostasis", journal: "Nature Communications", year: 2021, url: pubmed(33473109) },
  31599840: { authors: "Kingsberg SA, Clayton AH, et al.", title: "Bremelanotide for the Treatment of Hypoactive Sexual Desire Disorder: Two Randomized Phase 3 Trials", journal: "Obstetrics and Gynecology", year: 2019, url: pubmed(31599840) },
  15226502: { authors: "Pfaus JG, Shadiack A, et al.", title: "Selective facilitation of sexual solicitation in the female rat by a melanocortin receptor agonist", journal: "Proceedings of the National Academy of Sciences of the United States of America", year: 2004, url: pubmed(15226502) },
  11035391: { authors: "Wessells H, Levine N, et al.", title: "Melanocortin receptor agonists, penile erection, and sexual motivation: human studies with Melanotan II", journal: "International Journal of Impotence Research", year: 2000, url: pubmed(11035391) },
  11018622: { authors: "Wessells H, Gralnek D, et al.", title: "Effect of an alpha-melanocyte stimulating hormone analog on penile erection and sexual desire in men with organic erectile dysfunction", journal: "Urology", year: 2000, url: pubmed(11018622) },
  16412534: { authors: "Hadley ME, Dorr RT.", title: "Melanocortin peptide therapeutics: historical milestones, clinical studies and commercialization", journal: "Peptides", year: 2006, url: pubmed(16412534) },
  26049207: { authors: "Leng G, Ludwig M.", title: "Intranasal Oxytocin: Myths and Delusions", journal: "Biological Psychiatry", year: 2016, url: pubmed(26049207) },
  25865294: { authors: "Lawson EA, Marengi DA, et al.", title: "Oxytocin reduces caloric intake in men", journal: "Obesity", year: 2015, url: pubmed(25865294) },
  14675803: { authors: "Heinrichs M, Baumgartner T, et al.", title: "Social support and oxytocin interact to suppress cortisol and subjective responses to psychosocial stress", journal: "Biological Psychiatry", year: 2003, url: pubmed(14675803) },
  23887343: { authors: "Rash JA, Aguirre-Camacho A, et al.", title: "Oxytocin and pain: a systematic review and synthesis of findings", journal: "The Clinical Journal of Pain", year: 2014, url: pubmed(23887343) },
  14573733: { authors: "Seminara SB, Messager S, et al.", title: "The GPR54 gene as a regulator of puberty", journal: "The New England Journal of Medicine", year: 2003, url: pubmed(14573733) },
  16174713: { authors: "Dhillo WS, Chaudhri OB, et al.", title: "Kisspeptin-54 stimulates the hypothalamic-pituitary gonadal axis in human males", journal: "The Journal of Clinical Endocrinology and Metabolism", year: 2005, url: pubmed(16174713) },
  21632807: { authors: "George JT, Veldhuis JD, et al.", title: "Kisspeptin-10 is a potent stimulator of LH and increases pulse frequency in men", journal: "The Journal of Clinical Endocrinology and Metabolism", year: 2011, url: pubmed(21632807) },
  28112678: { authors: "Comninos AN, Wall MB, et al.", title: "Kisspeptin modulates sexual and emotional brain processing in humans", journal: "The Journal of Clinical Investigation", year: 2017, url: pubmed(28112678) },
  29155147: { authors: "Neelakantan H, Vance V, et al.", title: "Selective and membrane-permeable small molecule inhibitors of nicotinamide N-methyltransferase reverse high fat diet-induced obesity in mice", journal: "Biochemical Pharmacology", year: 2018, url: pubmed(29155147) },
  35013352: { authors: "Dimet-Wiley A, Wu Q, et al.", title: "Reduced calorie diet combined with NNMT inhibition establishes a distinct microbiome in DIO mice", journal: "Scientific Reports", year: 2022, url: pubmed(35013352) },
  39161060: { authors: "Babula JJ, Bui D, et al.", title: "Nicotinamide N-methyltransferase inhibition mitigates obesity-related metabolic dysfunction", journal: "Diabetes, Obesity & Metabolism", year: 2024, url: pubmed(39161060) },
  36988910: { authors: "Billon C, Sitaula S, et al.", title: "Synthetic ERRα/β/γ Agonist Induces an ERRα-Dependent Acute Aerobic Exercise Response and Enhances Exercise Capacity", journal: "ACS Chemical Biology", year: 2023, url: pubmed(36988910) },
  41588687: { authors: "Möller T, Krug O, et al.", title: "In Vitro Metabolism and Analytical Characterization of SLU-PP-332 and SLU-PP-915: Novel Pan-ERR Agonists With Doping Potential", journal: "Rapid Communications in Mass Spectrometry", year: 2026, url: pubmed(41588687) },
  41850449: { authors: "Okda HE, Zhao P, et al.", title: "Chemical optimization of the exercise mimetic SLU-PP-332 enables insight into estrogen-related receptor signaling", journal: "International Journal of Biological Macromolecules", year: 2026, url: pubmed(41850449) },
  11146367: { authors: "Ng FM, Sun J, et al.", title: "Metabolic studies of a synthetic lipolytic domain (AOD9604) of human growth hormone", journal: "Hormone Research", year: 2000, url: pubmed(11146367) },
  11673763: { authors: "Heffernan MA, Thorburn AW, et al.", title: "Increase of fat oxidation and weight loss in obese mice caused by chronic treatment with human growth hormone or a modified C-terminal fragment", journal: "International Journal of Obesity and Related Metabolic Disorders", year: 2001, url: pubmed(11673763) },
  18057338: { authors: "Falutz J, Allas S, et al.", title: "Metabolic effects of a growth hormone-releasing factor in patients with HIV", journal: "The New England Journal of Medicine", year: 2007, url: pubmed(18057338) },
  20554713: { authors: "Falutz J, Mamputu JC, et al.", title: "Effects of tesamorelin (TH9507), a growth hormone-releasing factor analog, in human immunodeficiency virus-infected patients with excess abdominal fat: a pooled analysis of two multicenter, double-blind placebo-controlled phase 3 trials with safety extension data", journal: "The Journal of Clinical Endocrinology and Metabolism", year: 2010, url: pubmed(20554713) },
  33894838: { authors: "Enebo LB, Berthelsen KK, et al.", title: "Safety, tolerability, pharmacokinetics, and pharmacodynamics of concomitant administration of multiple doses of cagrilintide with semaglutide 2·4 mg for weight management: a randomised, controlled, phase 1b trial", journal: "Lancet", year: 2021, url: pubmed(33894838) },
  42251859: { authors: "Buse JB, Bajaj HS, et al.", title: "Cagrilintide-semaglutide (CagriSema) versus semaglutide or cagrilintide in people with type 2 diabetes (REIMAGINE 2): a double-blind, randomised, controlled, phase 3 study", journal: "The Lancet. Diabetes & Endocrinology", year: 2026, url: pubmed(42251859) },
  18454096: { authors: "Zozulia AA, Neznamov GG, et al.", title: "[Efficacy and possible mechanisms of action of a new peptide anxiolytic selank in the therapy of generalized anxiety disorders and neurasthenia]", journal: "Zhurnal Nevrologii I Psikhiatrii Imeni S.S. Korsakova", year: 2008, url: pubmed(18454096) },
  26924987: { authors: "Volkova A, Shadrina M, et al.", title: "Selank Administration Affects the Expression of Some Genes Involved in GABAergic Neurotransmission", journal: "Frontiers in Pharmacology", year: 2016, url: pubmed(26924987) },
  18841804: { authors: "Inozemtseva LS, Karpenko EA, et al.", title: "Intranasal administration of the peptide Selank regulates BDNF expression in the rat hippocampus in vivo", journal: "Doklady Biological Sciences", year: 2008, url: pubmed(18841804) },
  24291245: { authors: "Kolomin T, Morozova M, et al.", title: "The temporary dynamics of inflammation-related genes expression under tuftsin analog Selank action", journal: "Molecular Immunology", year: 2014, url: pubmed(24291245) },
  16635254: { authors: "Dolotov OV, Karpenko EA, et al.", title: "Semax, an analogue of adrenocorticotropin (4-10), binds specifically and increases levels of brain-derived neurotrophic factor protein in rat basal forebrain", journal: "Journal of Neurochemistry", year: 2006, url: pubmed(16635254) },
  16362768: { authors: "Eremin KO, Kudrin VS, et al.", title: "Semax, an ACTH(4-10) analogue with nootropic properties, activates dopaminergic and serotoninergic brain systems in rodents", journal: "Neurochemical Research", year: 2005, url: pubmed(16362768) },
  11517472: { authors: "Gusev EI, Skvortsova VI, et al.", title: "[Effectiveness of semax in acute period of hemispheric ischemic stroke (a clinical and electrophysiological study)]", journal: "Zhurnal Nevrologii I Psikhiatrii Imeni S.S. Korsakova", year: 1997, url: pubmed(11517472) },
  265572: { authors: "Schoenenberger GA, Monnier M.", title: "Characterization of a delta-electroencephalogram (-sleep)-inducing peptide", journal: "Proceedings of the National Academy of Sciences of the United States of America", year: 1977, url: pubmed(265572) },
  16539679: { authors: "Kovalzon VM, Strekalova TV.", title: "Delta sleep-inducing peptide (DSIP): a still unresolved riddle", journal: "Journal of Neurochemistry", year: 2006, url: pubmed(16539679) },
  3792404: { authors: "Schneider-Helmert D.", title: "Efficacy of DSIP to normalize sleep in middle-aged and elderly chronic insomniacs", journal: "European Neurology", year: 1986, url: pubmed(3792404) },
  33396470: { authors: "Khavinson V, Linkova N, et al.", title: "EDR Peptide: Possible Mechanism of Gene Expression and Protein Synthesis Regulation Involved in the Pathogenesis of Alzheimer's Disease", journal: "Molecules", year: 2020, url: pubmed(33396470) },
  24909721: { authors: "Khavinson VKh, Lin'kova NS, et al.", title: "Short peptides stimulate serotonin expression in cells of brain cortex", journal: "Bulletin of Experimental Biology and Medicine", year: 2014, url: pubmed(24909721) },
  33353981: { authors: "Covarrubias AJ, Perrone R, et al.", title: "NAD(+) metabolism and its roles in cellular processes during ageing", journal: "Nature Reviews. Molecular Cell Biology", year: 2021, url: pubmed(33353981) },
  22848760: { authors: "Massudi H, Grant R, et al.", title: "Age-associated changes in oxidative stress and NAD+ metabolism in human tissue", journal: "PloS One", year: 2012, url: pubmed(22848760) },
  27304511: { authors: "Camacho-Pereira J, Tarragó MG, et al.", title: "CD38 Dictates Age-Related NAD Decline and Mitochondrial Dysfunction through an SIRT3-Dependent Mechanism", journal: "Cell Metabolism", year: 2016, url: pubmed(27304511) },
  31577933: { authors: "Lautrup S, Sinclair DA, et al.", title: "NAD(+) in Brain Aging and Neurodegenerative Disorders", journal: "Cell Metabolism", year: 2019, url: pubmed(31577933) },
  42713852: { authors: "Naing C, Ni H, et al.", title: "Thymosin-ɑ1 for people with chronic hepatitis B", journal: "The Cochrane Database of Systematic Reviews", year: 2026, url: pubmed(42713852) },
  25640173: { authors: "Wu X, Jia J, et al.", title: "Thymosin alpha-1 treatment in chronic hepatitis B", journal: "Expert Opinion on Biological Therapy", year: 2015, url: pubmed(25640173) },
  38903817: { authors: "Garaci E, Paci M, et al.", title: "Phenotypic drug discovery: a case for thymosin alpha-1", journal: "Frontiers in Medicine", year: 2024, url: pubmed(38903817) },
  22139413: { authors: "Delgado M, Ganea D.", title: "Vasoactive intestinal peptide: a neuropeptide with pleiotropic immune functions", journal: "Amino Acids", year: 2013, url: pubmed(22139413) },
  23094830: { authors: "Souza-Moreira L, Delgado-Maroto V, et al.", title: "Potential applications of vasoactive intestinal Peptide-based therapies on transplantation", journal: "Endocrine, Metabolic & Immune Disorders Drug Targets", year: 2012, url: pubmed(23094830) },
  // Added 2026-10-17 from PubMed esummary, for the evidence and 'not shown' blocks.
  42250575: { authors: "Bajaj HS, Welch M, et al.", title: "Efficacy and safety of retatrutide, a GIP, GLP-1, and glucagon receptor agonist, in people with type 2 diabetes and inadequate glycaemic control with diet and exercise (TRANSCEND-T2D-1): a double-blind, randomised, phase 3 trial", journal: "Lancet", year: 2026, url: pubmed(42250575) },
  41090431: { authors: "Giblin K, Kaplan LM, et al.", title: "Retatrutide for the treatment of obesity, obstructive sleep apnea and knee osteoarthritis: Rationale and design of the TRIUMPH registrational clinical trials", journal: "Diabetes, Obesity & Metabolism", year: 2026, url: pubmed(41090431) },
  40789979: { authors: "McGuire FP, Martinez R, et al.", title: "Regeneration or Risk? A Narrative Review of BPC-157 for Musculoskeletal Healing", journal: "Current Reviews in Musculoskeletal Medicine", year: 2025, url: pubmed(40789979) },
  34324435: { authors: "Lee E, Padgett B.", title: "Intra-Articular Injection of BPC 157 for Multiple Types of Knee Pain", journal: "Alternative Therapies in Health and Medicine", year: 2021, url: pubmed(34324435) },
  24791752: { authors: "Richie JP Jr, Nichenametla S, et al.", title: "Randomized controlled trial of oral glutathione supplementation on body stores of glutathione", journal: "European Journal of Nutrition", year: 2015, url: pubmed(24791752) },
  40057759: { authors: "Johnson JS, Jarvis NR, et al.", title: "Intravenous Glutathione and Vitamin Supplementation Causing Stevens-Johnson Syndrome: A Case Report", journal: "Journal of Burn Care & Research", year: 2025, url: pubmed(40057759) },
  25038357: { authors: "Stanley TL, Feldpausch MN, et al.", title: "Effect of tesamorelin on visceral fat and liver fat in HIV-infected patients with abdominal fat accumulation: a randomized clinical trial", journal: "JAMA", year: 2014, url: pubmed(25038357) },
  31572171: { authors: "Grant R, Berg J, et al.", title: "A Pilot Study Investigating Changes in the Human Plasma and Urine NAD+ Metabolome During a 6 Hour Intravenous Infusion of NAD", journal: "Frontiers in Aging Neuroscience", year: 2019, url: pubmed(31572171) },
  29599478: { authors: "Martens CR, Denman BA, et al.", title: "Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD(+) in healthy middle-aged and older adults", journal: "Nature Communications", year: 2018, url: pubmed(29599478) },
  40908429: { authors: "Al-Dulaimi S, Thomas R, et al.", title: "Epitalon increases telomere length in human cell lines through telomerase upregulation or ALT activity", journal: "Biogerontology", year: 2025, url: pubmed(40908429) },
  40141333: { authors: "Araj SK, Brzezik J, et al.", title: "Overview of Epitalon-Highly Bioactive Pineal Tetrapeptide with Promising Properties", journal: "International Journal of Molecular Sciences", year: 2025, url: pubmed(40141333) },
  21564053: { authors: "Paurobally D, Jason F, et al.", title: "Melanotan-associated melanoma", journal: "The British Journal of Dermatology", year: 2011, url: pubmed(21564053) },
  19224885: { authors: "Evans-Brown M, Dawson RT, et al.", title: "Use of melanotan I and II in the general population", journal: "BMJ", year: 2009, url: pubmed(19224885) },
  37348524: { authors: "Brown SM, Barkauskas CE, et al.", title: "Intravenous aviptadil and remdesivir for treatment of COVID-19-associated hypoxaemic respiratory failure in the USA (TESICO): a randomised, placebo-controlled trial", journal: "The Lancet. Respiratory Medicine", year: 2023, url: pubmed(37348524) },
  40544433: { authors: "Garvey WT, Blüher M, et al.", title: "Coadministered Cagrilintide and Semaglutide in Adults with Overweight or Obesity", journal: "The New England Journal of Medicine", year: 2025, url: pubmed(40544433) },
  29032324: { authors: "Keech B, Crowe S, et al.", title: "Intranasal oxytocin, social cognition and neurodevelopmental disorders: A meta-analysis", journal: "Psychoneuroendocrinology", year: 2018, url: pubmed(29032324) },
  33400920: { authors: "Huang Y, Huang X, et al.", title: "Intranasal oxytocin in the treatment of autism spectrum disorders: A multilevel meta-analysis", journal: "Neuroscience and Biobehavioral Reviews", year: 2021, url: pubmed(33400920) },
  42549827: { authors: "Yeung AC, Phylactou M, et al.", title: "Chronic subcutaneous kisspeptin-10 stimulates gonadotropin secretion for 12 days in healthy men", journal: "European Journal of Endocrinology", year: 2026, url: pubmed(42549827) },
  23327199: { authors: "Wu J, Zhou L, et al.", title: "The efficacy of thymosin alpha 1 for severe sepsis (ETASS): a multicenter, single-blind, randomized and controlled trial", journal: "Critical Care", year: 2013, url: pubmed(23327199) },
  1907548: { authors: "Aebi S, Assereto R, et al.", title: "High-dose intravenous glutathione in man. Pharmacokinetics and effects on cyst(e)ine in plasma and urine", journal: "European Journal of Clinical Investigation", year: 1991, url: pubmed(1907548) },
  26056426: { authors: "Sosne G, Ousler GW.", title: "Thymosin beta 4 ophthalmic solution for dry eye: a randomized, placebo-controlled, Phase II clinical trial conducted using the controlled adverse environment (CAE™) model", journal: "Clinical Ophthalmology", year: 2015, url: pubmed(26056426) },
  23099431: { authors: "Cabrales A, Gil J, et al.", title: "Pharmacokinetic study of Growth Hormone-Releasing Peptide 6 (GHRP-6) in nine male healthy volunteers", journal: "European Journal of Pharmaceutical Sciences", year: 2013, url: pubmed(23099431) },
  10496658: { authors: "Gobburu JV, Agersø H, et al.", title: "Pharmacokinetic-pharmacodynamic modeling of ipamorelin, a growth hormone releasing peptide, in human volunteers", journal: "Pharmaceutical Research", year: 1999, url: pubmed(10496658) },
  15134286: { authors: "Wilding J.", title: "AOD-9604 Metabolic", journal: "Current Opinion in Investigational Drugs", year: 2004, url: pubmed(15134286) },
}
const pm = (...ids) => ids.map((id) => PM[id])

const WADA_LIST = { authors: 'World Anti-Doping Agency.', title: 'The Prohibited List', journal: 'WADA', year: 2026, url: 'https://www.wada-ama.org/en/prohibited-list' }
const WADA_2026 = { authors: 'World Anti-Doping Agency.', title: 'International Standard Prohibited List 2026', journal: 'WADA', year: 2025, url: 'https://www.wada-ama.org/sites/default/files/2025-09/2026list_en_final_clean_september_2025.pdf' }
const VYLEESI_LABEL = { authors: 'US Food and Drug Administration.', title: 'VYLEESI (bremelanotide) prescribing information', journal: 'FDA label', year: 2019, url: 'https://www.accessdata.fda.gov/drugsatfda_docs/label/2019/210557s000lbl.pdf' }

const GHK_CU = { label: 'GHK-Cu', value: 'Gly-His-Lys bound to copper(II) · C14H23CuN6O4 · MW 402.9 · CAS 89030-95-5', href: pubchem(71587328) }
const BPC_157 = { label: 'BPC-157', value: '15 amino acids, GEPPPGKPADDAGLV · C62H98N16O22 · MW 1419.5 · CAS 137525-51-0', href: pubchem(9941957) }
const TB_500 = { label: 'TB-500', value: 'Thymosin beta-4 peptide. The name covers both the full 43-residue protein and a 7-residue fragment (Ac-LKKTETQ).' }
const KPV = { label: 'KPV', value: 'Lys-Pro-Val, the C-terminal tripeptide of alpha-MSH (residues 11–13) · C16H30N4O4 · MW 342.4 · CAS 67727-97-3', href: pubchem(125672) }

/**
 * The five evidence levels. Every product carries exactly one, as `level`, with
 * an optional one-line `levelNote` that qualifies it. Kept to five so the label
 * means the same thing on every page and can later drive a catalogue filter.
 */
export const EVIDENCE_LEVELS = {
  approved: { label: 'Approved medicine', meaning: 'Approved by at least one national regulator for a specific use' },
  late: { label: 'Late-stage human trials', meaning: 'Phase 3 or large randomised trials published; not yet approved' },
  early: { label: 'Early human studies', meaning: 'Small or early-phase human studies only' },
  animal: { label: 'Animal and cell studies', meaning: 'No meaningful controlled human data' },
  little: { label: 'Little published research', meaning: 'Few or no peer-reviewed papers' },
}

/*
 * `glance` feeds the At a glance box under the H1: other names, class, and
 * status with the FDA and under the WADA 2026 Prohibited List (both checked
 * 2026-10-17; the WADA wording against the list PDF itself). South African
 * (SAHPRA) status is deliberately absent until the legal question on research
 * peptides is settled; see the SAHPRA note in the project memory.
 *
 * `notShown` is "What the research does not show": honest limits, each one
 * traceable to a source in the same entry.
 */
const WADA_S0_LIKELY = 'Not named; likely covered by S0 (substances not approved for human use anywhere are prohibited at all times)'
const WADA_S0_TRIALS = 'Covered by S0: drugs still in clinical development are prohibited at all times'
const WADA_S2 = 'Prohibited at all times under S2 (named)'
const WADA_INFUSION = 'Not named. IV infusions or injections of more than 100 mL per 12 hours are prohibited (M2.2)'
const NOT_THE_MEDICINE = 'That a research vial is the same as the registered medicine. It is a different, unregistered product.'

export const PRODUCT_SPECS = {
  // BPC+TB Wolverine Stack
  3: {
    level: 'animal',
    levelNote: 'Each compound has been studied separately, almost entirely in animals; the blend itself has not been studied.',
    glance: {
      aka: 'BPC-157 (body protection compound 157) with TB-500 (a thymosin beta-4 peptide)',
      class: 'Blend of two tissue-repair research peptides',
      fda: 'Neither is approved',
      wada: 'Prohibited at all times: BPC-157 under S0 and TB-500 under S2 (both named)',
    },
    notShown: [
      'Any study of BPC-157 and TB-500 given together. The case for the blend rests on their mechanisms looking complementary.',
      'Controlled human trials of BPC-157. The human evidence is one small uncontrolled case series, and a 2025 review weighed the regeneration data against unknown risks.',
      'Human trials of the TB-500 fragment. The eye-healing trials used full thymosin beta-4, a larger molecule.',
    ],
    rows: [
      { label: 'Composition', value: 'BPC-157 and TB-500 in equal amounts (5mg + 5mg, 10mg + 10mg or 15mg + 15mg)' },
      BPC_157,
      TB_500,
    ],
    sources: [...pm(14554208, 21030672, 34324435, 40789979, 16099219, 26056426), WADA_2026],
  },
  // GHRP-6
  9: {
    level: 'early',
    levelNote: 'Human studies are short diagnostic and pharmacokinetic tests.',
    glance: {
      aka: 'Growth hormone-releasing hexapeptide',
      class: 'Growth hormone secretagogue (ghrelin receptor agonist)',
      fda: 'Not approved',
      wada: WADA_S2,
    },
    notShown: [
      'Trials of repeated use in people. The human studies are short tests of growth hormone release.',
      'Approval for any use.',
    ],
    rows: [
      { label: 'Sequence', value: 'His-D-Trp-Ala-Trp-D-Phe-Lys-NH2 (six amino acids)' },
      { label: 'Formula', value: 'C46H56N12O6', href: pubchem(4345065) },
      { label: 'Molecular weight', value: '873.0 g/mol' },
    ],
    sources: [...pm(6714155, 11297568, 23099431), WADA_2026],
  },
  // CJC-1295 + Ipamorelin Stack
  12: {
    level: 'early',
    levelNote: 'Ipamorelin and the DAC form of CJC-1295 each have small early human studies; the blend itself has not been studied.',
    glance: {
      aka: 'CJC-1295 (a GHRH analogue) with ipamorelin (NNC 26-0161)',
      class: 'GHRH analogue plus a selective ghrelin receptor agonist',
      fda: 'Neither is approved',
      wada: 'Prohibited at all times under S2 (both named)',
    },
    notShown: [
      'Any study of the two given together.',
      'Human data for CJC-1295 without DAC. The 2006 human trials used the DAC version, a different molecule.',
    ],
    rows: [
      { label: 'Composition', value: 'CJC-1295 5mg and ipamorelin 5mg per vial' },
      { label: 'CJC-1295', value: 'A GHRH analogue, made both with and without a drug affinity complex (DAC) that extends its half-life.' },
      { label: 'Ipamorelin', value: 'Selective growth hormone secretagogue · C38H49N9O5 · MW 711.9 · CAS 170851-70-4', href: pubchem(9831659) },
    ],
    sources: [...pm(16352683, 9849822, 10496658), WADA_2026],
  },
  // KPV
  19: {
    level: 'animal',
    glance: {
      aka: 'Lys-Pro-Val; alpha-MSH(11-13)',
      class: 'Tripeptide fragment of alpha-melanocyte-stimulating hormone',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: ['Human trials. The evidence comes from mouse models of colitis and from cell studies.'],
    rows: [KPV],
    sources: pm(18092346, 18061177, 28143741),
  },
  // Epithalon
  23: {
    level: 'animal',
    levelNote: 'Plus small human reports, mostly from one Russian research group.',
    glance: {
      aka: 'Epitalon; AEDG peptide',
      class: 'Synthetic tetrapeptide modelled on a pineal gland extract (epithalamin)',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: [
      'That it extends human lifespan. There are no large controlled trials in people.',
      'Broad independent replication. Most of the research comes from one group, although a 2025 study in human cell lines confirmed the telomere finding.',
    ],
    rows: [
      { label: 'Sequence', value: 'Ala-Glu-Asp-Gly (four amino acids)' },
      { label: 'Formula', value: 'C14H22N4O9', href: pubchem(219042) },
      { label: 'Molecular weight', value: '390.35 g/mol' },
      { label: 'CAS number', value: '307297-39-8' },
    ],
    sources: pm(12937682, 40908429, 14501183, 40141333),
  },
  // Glutathione
  28: {
    level: 'early',
    levelNote: 'Oral randomised trials; data on injected glutathione are mostly about how quickly it clears.',
    glance: {
      aka: 'GSH; reduced glutathione',
      class: 'Tripeptide antioxidant made by the body',
      fda: 'Not approved as an injectable medicine',
      wada: WADA_INFUSION,
    },
    notShown: [
      'Reliable skin-lightening or “detox” effects from injections.',
      'That high-dose IV glutathione stays in the blood. A 1991 study found it cleared within minutes.',
      'The safety of unregulated IV products. Serious reactions have been reported, including a 2025 case of Stevens-Johnson syndrome after IV glutathione with vitamins.',
    ],
    rows: [
      { label: 'Structure', value: 'Tripeptide of glutamate, cysteine and glycine (reduced form)' },
      { label: 'Formula', value: 'C10H17N3O6S', href: pubchem(124886) },
      { label: 'Molecular weight', value: '307.33 g/mol' },
      { label: 'CAS number', value: '70-18-8' },
    ],
    sources: pm(22995213, 24791752, 1907548, 40057759),
  },
  // MOTS-C
  33: {
    level: 'animal',
    levelNote: 'Human data are limited to measuring natural blood levels.',
    glance: {
      aka: 'Mitochondrial open reading frame of the 12S rRNA type-c',
      class: 'Mitochondrial-derived peptide',
      fda: 'Not approved',
      wada: 'Prohibited at all times under S4.4 (named)',
    },
    notShown: ['Controlled human trials of supplied MOTS-c.'],
    rows: [
      { label: 'Sequence', value: 'MRWQEMGYIFYPRKLR (16 amino acids), encoded in mitochondrial DNA' },
      { label: 'Formula', value: 'C101H152N28O22S2', href: pubchem(146675088) },
      { label: 'Molecular weight', value: '2174.6 g/mol' },
      { label: 'CAS number', value: '1627580-64-6' },
    ],
    sources: [...pm(25738459, 33473109), WADA_2026],
  },
  // PT-141
  34: {
    level: 'approved',
    levelNote: 'FDA-approved in 2019 as Vyleesi, for low sexual desire in premenopausal women.',
    glance: {
      aka: 'Bremelanotide; Vyleesi',
      class: 'Melanocortin receptor agonist acting in the brain',
      fda: 'Approved (2019) for low sexual desire in premenopausal women',
      wada: 'Not named',
    },
    notShown: [
      'An approved use in men. Earlier trials included men, but the approval covers premenopausal women only.',
      NOT_THE_MEDICINE,
    ],
    rows: [
      { label: 'Formula', value: 'C50H68N14O10', href: pubchem(9941379) },
      { label: 'Molecular weight', value: '1025.2 g/mol' },
      { label: 'CAS number', value: '189691-06-3' },
    ],
    sources: [...pm(31599840, 15226502), VYLEESI_LABEL],
  },
  // Melanotan II
  35: {
    level: 'early',
    levelNote: 'Small pilot trials in the 1990s, plus published case reports of harm.',
    glance: {
      aka: 'MT-II',
      class: 'Synthetic alpha-MSH analogue (non-selective melanocortin receptor agonist)',
      fda: 'Not approved anywhere',
      wada: WADA_S0_LIKELY,
    },
    notShown: [
      'An established safety profile. Dermatology journals have reported changing moles and melanoma linked to unregulated use.',
    ],
    rows: [
      { label: 'Formula', value: 'C50H69N15O9', href: pubchem(92432) },
      { label: 'Molecular weight', value: '1024.2 g/mol' },
      { label: 'CAS number', value: '121062-08-6' },
    ],
    sources: pm(11035391, 11018622, 19224885, 21564053),
  },
  // Oxytocin Acetate
  40: {
    level: 'approved',
    levelNote: 'Approved for use in labour and after birth. The intranasal research is early human studies.',
    glance: {
      aka: 'Pitocin, Syntocinon (brand names of the medicine)',
      class: 'Nine-amino-acid neuropeptide hormone',
      fda: 'Approved for obstetric use',
      wada: 'Not named',
    },
    notShown: [
      'Consistent effects from intranasal use. Meta-analyses find small or inconsistent effects on social cognition and in autism.',
    ],
    rows: [
      { label: 'Structure', value: 'Nine-amino-acid peptide hormone; supplied as the acetate salt' },
      { label: 'Formula', value: 'C43H66N12O12S2 (oxytocin)', href: pubchem(439302) },
      { label: 'Molecular weight', value: '1007.2 g/mol (oxytocin)' },
      { label: 'CAS number', value: '50-56-6 (oxytocin)' },
    ],
    sources: pm(26049207, 25865294, 29032324, 33400920),
  },
  // Kisspeptin
  41: {
    level: 'early',
    levelNote: 'Physiology studies in healthy volunteers.',
    glance: {
      aka: 'KP-10; metastin(45-54)',
      class: 'Hypothalamic neuropeptide that triggers GnRH release',
      fda: 'Not approved',
      wada: WADA_S2,
    },
    notShown: ['Approval for any use.', 'Long-term effects. The longest study in men ran for 12 days.'],
    rows: [
      { label: 'Forms', value: 'Kisspeptin-10 and kisspeptin-54 are both sold as “kisspeptin”.' },
      { label: 'Kisspeptin-10', value: 'C63H83N17O14 · MW 1302.4 · CAS 374675-21-5', href: pubchem(25240297) },
    ],
    sources: [...pm(16174713, 21632807, 42549827), WADA_2026],
  },
  // 5-Amino-1MQ
  42: {
    level: 'animal',
    glance: {
      aka: '5-amino-1-methylquinolinium',
      class: 'Small-molecule NNMT inhibitor (not a peptide)',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: ['Any human trial data.'],
    rows: [
      { label: 'Formula', value: 'C10H11N2+ (the cation; usually supplied as a salt)', href: pubchem(950107) },
      { label: 'Molecular weight', value: '159.2 g/mol (cation)' },
    ],
    sources: pm(29155147, 35013352, 39161060),
  },
  // SLU-PP-332
  90: {
    level: 'animal',
    glance: {
      class: 'Small-molecule ERR agonist, studied as an “exercise mimetic” (not a peptide)',
      fda: 'Not approved',
      wada: `${WADA_S0_LIKELY}. Anti-doping labs have published methods to detect it.`,
    },
    notShown: ['Any human data.', 'That it can replace exercise.'],
    rows: [
      { label: 'Formula', value: 'C18H14N2O2', href: pubchem(5338394) },
      { label: 'Molecular weight', value: '290.3 g/mol' },
      { label: 'CAS number', value: '303760-60-3' },
    ],
    sources: pm(36988910, 41850449, 41588687),
  },
  // AOD-9604
  43: {
    level: 'early',
    levelNote: 'It reached human obesity trials but was never approved.',
    glance: {
      aka: 'Tyr-hGH(177-191)',
      class: 'Modified fragment of human growth hormone',
      fda: 'Not approved',
      wada: 'Prohibited at all times under S2 (named as a growth hormone fragment)',
    },
    notShown: ['Approval as a weight-loss medicine. It reached human trials but was never approved.'],
    rows: [
      { label: 'Structure', value: 'Synthetic fragment of the lipolytic (fat-metabolising) domain of human growth hormone' },
      { label: 'Formula', value: 'C78H123N23O23S2', href: pubchem(71300630) },
      { label: 'Molecular weight', value: '1815.1 g/mol' },
      { label: 'CAS number', value: '221231-10-3' },
    ],
    sources: [...pm(11146367, 11673763, 15134286), WADA_2026],
  },
  // Tesamorelin
  44: {
    level: 'approved',
    levelNote: 'FDA-approved in 2010 as Egrifta, for excess abdominal fat in HIV-associated lipodystrophy.',
    glance: {
      aka: 'TH9507; Egrifta',
      class: 'Growth hormone-releasing hormone (GHRH) analogue',
      fda: 'Approved (2010) for excess abdominal fat in people with HIV',
      wada: WADA_S2,
    },
    notShown: ['Proven benefits outside the HIV population it is approved for.', NOT_THE_MEDICINE],
    rows: [
      { label: 'Formula', value: 'C221H366N72O67S', href: pubchem(16137828) },
      { label: 'Molecular weight', value: '5136 g/mol' },
      { label: 'CAS number', value: '218949-48-5' },
    ],
    sources: [...pm(18057338, 20554713, 25038357), WADA_2026],
  },
  // Cagrilintide
  49: {
    level: 'late',
    levelNote: 'Mostly as CagriSema, in combination with semaglutide.',
    glance: {
      aka: 'NN9838; the amylin half of CagriSema',
      class: 'Long-acting amylin analogue',
      fda: 'Not approved',
      wada: WADA_S0_TRIALS,
    },
    notShown: [
      'Approval as a medicine, on its own or as CagriSema.',
      'Large trials of cagrilintide on its own. Most late-stage data are for the combination with semaglutide.',
    ],
    rows: [
      { label: 'Formula', value: 'C194H312N54O59S2', href: pubchem(171397054) },
      { label: 'Molecular weight', value: '4409 g/mol' },
      { label: 'CAS number', value: '1415456-99-3' },
    ],
    sources: pm(33894838, 40544433, 42251859),
  },
  // Selank
  60: {
    level: 'early',
    levelNote: 'Mainly small Russian trials; registered as a medicine in Russia.',
    glance: {
      aka: 'TKPRPGP; a tuftsin analogue',
      class: 'Synthetic analogue of the immune peptide tuftsin',
      fda: 'Not approved (registered in Russia)',
      wada: 'Not named',
    },
    notShown: ['Large international randomised trials. The human studies are mainly Russian.'],
    rows: [
      { label: 'Sequence', value: 'Thr-Lys-Pro-Arg-Pro-Gly-Pro (seven amino acids), a tuftsin analogue' },
      { label: 'Formula', value: 'C33H57N11O9', href: pubchem(11765600) },
      { label: 'Molecular weight', value: '751.9 g/mol' },
      { label: 'CAS number', value: '129954-34-3' },
    ],
    sources: pm(18454096, 26924987, 18841804, 24291245),
  },
  // Semax
  61: {
    level: 'early',
    levelNote: 'Mainly small Russian trials; registered as a medicine in Russia.',
    glance: {
      aka: 'ACTH(4-10) analogue',
      class: 'Synthetic fragment of ACTH with a stabilising Pro-Gly-Pro tail',
      fda: 'Not approved (registered in Russia)',
      wada: 'Not named',
    },
    notShown: ['Large international randomised trials. The human studies, including those after stroke, are mainly Russian.'],
    rows: [
      { label: 'Sequence', value: 'Met-Glu-His-Phe-Pro-Gly-Pro (seven amino acids), an ACTH(4-10) analogue' },
      { label: 'Formula', value: 'C37H51N9O10S', href: pubchem(9811102) },
      { label: 'Molecular weight', value: '813.9 g/mol' },
      { label: 'CAS number', value: '80714-61-0' },
    ],
    sources: pm(16635254, 16362768, 11517472),
  },
  // DSIP
  62: {
    level: 'early',
    levelNote: 'Small, older studies with inconsistent results.',
    glance: {
      aka: 'Delta sleep-inducing peptide',
      class: 'Nine-amino-acid neuropeptide, first isolated in 1977',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: [
      'A reliable effect on sleep. Small human studies in the 1980s gave mixed results, and a 2006 review called its role “a still unresolved riddle”.',
    ],
    rows: [
      { label: 'Sequence', value: 'Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu (nine amino acids), first described in 1977' },
      { label: 'Formula', value: 'C35H48N10O15', href: pubchem(68816) },
      { label: 'Molecular weight', value: '848.8 g/mol' },
      { label: 'CAS number', value: '62568-57-4' },
    ],
    sources: pm(265572, 16539679, 3792404),
  },
  // Pinealon
  64: {
    level: 'animal',
    levelNote: 'Mostly from one Russian research group.',
    glance: {
      aka: 'EDR peptide; Glu-Asp-Arg',
      class: 'Short “bioregulator” tripeptide',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: ['Human trials.'],
    rows: [
      { label: 'Sequence', value: 'Glu-Asp-Arg (EDR, three amino acids)' },
      { label: 'Formula', value: 'C15H26N6O8', href: pubchem(10273502) },
      { label: 'Molecular weight', value: '418.40 g/mol' },
      { label: 'CAS number', value: '175175-23-2' },
    ],
    sources: pm(33396470, 24909721),
  },
  // NAD+
  68: {
    level: 'early',
    levelNote: 'Direct NAD+ has small pilot studies; oral precursors such as nicotinamide riboside have larger trials.',
    glance: {
      aka: 'Nicotinamide adenine dinucleotide; β-NAD',
      class: 'Coenzyme (not a peptide)',
      fda: 'Not an approved medicine',
      wada: WADA_INFUSION,
    },
    notShown: ['That raising NAD+ slows ageing in people.'],
    rows: [
      { label: 'Formula', value: 'C21H27N7O14P2', href: pubchem(5892) },
      { label: 'Molecular weight', value: '663.4 g/mol' },
      { label: 'CAS number', value: '53-84-9' },
    ],
    sources: pm(33353981, 22848760, 31572171, 29599478),
  },
  // Adamax
  85: {
    level: 'little',
    levelNote: 'No peer-reviewed papers or PubChem record were found under this name.',
    glance: {
      class: 'Described by its manufacturer as a modified Semax analogue',
      fda: 'Not approved',
      wada: WADA_S0_LIKELY,
    },
    notShown: ['Any published research under this name. The studies are on Semax, a related but different molecule.'],
    rows: [{ label: 'Identity', value: 'No PubChem record.' }],
    sources: [],
  },
  // Thymosin Alpha-1
  71: {
    level: 'approved',
    levelNote: 'Approved outside the US, mainly for hepatitis B.',
    glance: {
      aka: 'Thymalfasin; Zadaxin',
      class: '28-amino-acid thymic peptide (immune modulator)',
      fda: 'Not approved in the US',
      wada: 'Not named',
    },
    notShown: ['US approval. Its approvals are elsewhere, mainly for hepatitis B.'],
    rows: [
      { label: 'Structure', value: '28 amino acids, N-terminally acetylated' },
      { label: 'Formula', value: 'C129H215N33O55', href: pubchem(16130571) },
      { label: 'Molecular weight', value: '3108.3 g/mol' },
      { label: 'CAS number', value: '62304-98-7' },
    ],
    sources: pm(42713852, 25640173, 23327199),
  },
  // VIP
  73: {
    level: 'early',
    levelNote: 'Human trials as aviptadil gave mixed results; a large 2023 trial found no benefit.',
    glance: {
      aka: 'Vasoactive intestinal peptide; aviptadil',
      class: '28-amino-acid neuropeptide',
      fda: 'Not approved',
      wada: 'Not named',
    },
    notShown: ['Benefit in critical illness. The 2023 TESICO trial of IV aviptadil in COVID-19 respiratory failure found none.'],
    rows: [
      { label: 'Structure', value: 'Vasoactive intestinal peptide: a 28-amino-acid neuropeptide of the secretin-glucagon family' },
    ],
    sources: pm(22139413, 23094830, 37348524),
  },
  // Tirzepatide
  47: {
    level: 'approved',
    levelNote: 'FDA-approved as Mounjaro (type 2 diabetes, 2022) and Zepbound (weight management, 2023).',
    glance: {
      aka: 'LY3298176; brand names Mounjaro and Zepbound',
      class: 'Dual GIP and GLP-1 receptor agonist',
      fda: 'Approved for type 2 diabetes (2022) and weight management (2023)',
      wada: 'Not prohibited',
    },
    notShown: [NOT_THE_MEDICINE, 'Long-term outcomes outside the trial populations.'],
    rows: [
      { label: 'Structure', value: '39-amino-acid modified peptide with a C20 fatty diacid side chain' },
      { label: 'Formula', value: 'C225H348N48O68', href: pubchem(166567236) },
      { label: 'Molecular weight', value: '4813 g/mol' },
      { label: 'CAS number', value: '2023788-19-2' },
      { label: 'Half-life', value: 'About 5 days (FDA label)' },
    ],
    sources: [S.coskun2018, S.surmount1, S.surpass2, S.mounjaroLabel],
  },
  // Retatrutide
  46: {
    level: 'late',
    levelNote: 'Phase 3 results began appearing in 2026; not yet approved anywhere.',
    glance: {
      aka: 'LY3437943',
      class: 'GIP, GLP-1 and glucagon receptor triple agonist',
      fda: 'Not approved (investigational)',
      wada: WADA_S0_TRIALS,
    },
    notShown: [
      'Approval anywhere. It remains investigational.',
      'Long-term safety beyond the trial periods.',
      'Whether weight lost is maintained after stopping.',
    ],
    rows: [{ label: 'Half-life', value: 'About 6 days (phase 1b trial, Urva 2022)' }],
    sources: [S.urva2022, S.retaObesity, S.retaT2d, ...pm(42250575, 41090431)],
  },
  // GHK-Cu
  22: {
    level: 'animal',
    levelNote: 'Plus small topical cosmetic studies in people; injected use has little published research.',
    glance: {
      aka: 'Copper tripeptide-1; prezatide copper',
      class: 'Naturally occurring copper-binding tripeptide',
      fda: 'Not approved as a drug',
      wada: 'Not named',
    },
    notShown: ['Large controlled trials of injected GHK-Cu.'],
    rows: [
      { label: 'Sequence', value: 'Gly-His-Lys (GHK), bound to copper(II)' },
      { label: 'Formula', value: 'C14H23CuN6O4 (copper complex)', href: pubchem(71587328) },
      { label: 'Molecular weight', value: '402.9 g/mol' },
      { label: 'CAS number', value: '89030-95-5' },
    ],
    sources: [S.pickart1973, S.maquart1988, S.pickart2012, S.pickart2018],
  },
  // GLOW Stack
  15: {
    level: 'animal',
    levelNote: 'Each compound has been studied separately, mostly in animals; the blend itself has not been studied.',
    glance: {
      aka: 'GHK-Cu, BPC-157 and TB-500 in one vial',
      class: 'Three-peptide skin and tissue-repair blend',
      fda: 'None of the three is approved',
      wada: 'Prohibited at all times: contains BPC-157 (S0) and TB-500 (S2)',
    },
    notShown: [
      'Any study of these three compounds combined.',
      'Controlled human trials of BPC-157, TB-500 or injected GHK-Cu.',
    ],
    rows: [
      { label: 'Composition', value: 'GHK-Cu 50mg, BPC-157 10mg, TB-500 10mg (70mg per vial)' },
      GHK_CU,
      BPC_157,
      TB_500,
    ],
    sources: [S.maquart1988, S.pickart2018, S.staresinic2003, S.seiwerth2021, S.goldstein2005, WADA_2026],
  },
  // KLOW Stack
  89: {
    level: 'animal',
    levelNote: 'Each compound has been studied separately, mostly in animals; the blend itself has not been studied.',
    glance: {
      aka: 'GHK-Cu, BPC-157, TB-500 and KPV in one vial',
      class: 'Four-peptide skin, repair and gut-inflammation blend',
      fda: 'None of the four is approved',
      wada: 'Prohibited at all times: contains BPC-157 (S0) and TB-500 (S2)',
    },
    notShown: [
      'Any study of these four compounds combined.',
      'Controlled human trials of BPC-157, TB-500, KPV or injected GHK-Cu.',
    ],
    rows: [
      { label: 'Composition', value: 'GHK-Cu 50mg, BPC-157 10mg, TB-500 10mg, KPV 10mg (80mg per vial)' },
      GHK_CU,
      BPC_157,
      TB_500,
      KPV,
    ],
    sources: [S.kannengiesser2008, S.dalmasso2008, S.pickart2018, S.staresinic2003, S.goldstein2005, WADA_2026],
  },
}

export const specsFor = (product) => PRODUCT_SPECS[product.id] ?? null
