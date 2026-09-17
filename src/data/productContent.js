/**
 * Long-form copy for the per-product pages at /catalogue/<slug>.
 *
 * Keyed by catalogue product id, the same key productGuides.js uses. A product
 * with no entry here still gets a page — the template falls back to the
 * catalogue description and the dose table — but it will be a thin one, so
 * treat a missing entry as work outstanding rather than a decision.
 *
 * On claims. This follows the rule set in quizProtocols.js: the substance of
 * what a compound is said to do comes from copy already approved and published
 * elsewhere on the site — the catalogue description in products.js, the Learn
 * article linked in productGuides.js, the stack rationale in stacksData.js.
 * What is new here is framing, handling detail and South African context, not
 * new therapeutic claims. If a claim needs to change, change it at the source
 * and mirror it here rather than the other way round.
 *
 * Fields
 *   lede           one sentence under the H1; must not repeat `description`
 *   about          2-3 paragraphs — what it is, how it is understood to work
 *   researchedFor  3-4 { title, body } cards, ~35 words each
 *   handling       reconstitution and storage, specific to this vial size
 *   faqs           3-4 { q, a } — the questions this product actually gets
 *   pairsWith      product ids commonly bought alongside it
 *   meta           { title, description } — title under ~60 chars
 */

const STORAGE_SA =
  'Unopened vials are stable at room temperature in transit but belong in a fridge once they arrive, and out of a parked car in a Highveld summer.'

export const PRODUCT_CONTENT = {
  // ── Recovery & Performance ───────────────────────────────────────────

  3: {
    lede: 'The two best-known repair peptides in one vial, at the ratio most recovery protocols end up running anyway.',
    about: [
      'BPC-157 and TB-500 are the pair most people arrive at after reading about peptide recovery, and they are usually bought together because they work on different parts of the same problem. BPC-157 is a synthetic fragment of a protein found in gastric juice, and research interest centres on localised repair — blood vessel formation at an injury site, tendon and ligament fibroblasts, and the gut lining. TB-500 is a synthetic form of Thymosin Beta-4, and its interest is systemic: cell migration, actin regulation and getting repair cells to where the damage is.',
      'Running them together is what the "Wolverine" name refers to. The stack vial saves you reconstituting two products on the same schedule and keeps the ratio fixed, which is why it is the format most people move to once they have used both separately. It is also the base of The Wolverine Protocol on the stacks page, where it is paired with GHK-Cu and KPV for longer or more stubborn recovery work.',
    ],
    researchedFor: [
      {
        title: 'Soft tissue and tendon',
        body: 'The combination most often researched for tendon, ligament and muscle injury — the slow-healing connective tissue that responds poorly to rest alone.',
      },
      {
        title: 'Training load',
        body: 'Used by athletes through heavy blocks rather than only after injury, on the reasoning that recovery capacity, not effort, is usually what caps training volume.',
      },
      {
        title: 'Gut lining',
        body: 'BPC-157 in particular is studied for the gut, which is why the stack often appears in protocols aimed at inflammation rather than a specific injury.',
      },
      {
        title: 'Post-surgical recovery',
        body: 'A common research context for both compounds, and the reason the 15mg+15mg tier exists — longer protocols need more material.',
      },
    ],
    handling:
      'The 10mg+10mg vial holds 20mg of peptide in total. Most protocols reconstitute it with 2 mL of bacteriostatic water, which puts 10mg of combined peptide in each mL and makes a 500mcg/500mcg dose a 5-unit draw on a standard insulin syringe. Add the water down the side of the glass rather than straight onto the powder, and swirl rather than shake. ' +
      STORAGE_SA +
      ' Once reconstituted, refrigerate and use within about four weeks.',
    faqs: [
      {
        q: 'Why buy the stack instead of two vials?',
        a: 'Cost and convenience. The 10mg+10mg stack is R825; the same quantities bought as separate BPC-157 and TB-500 vials come to R850, and you reconstitute and track one vial instead of two on the same schedule.',
      },
      {
        q: 'Is there a pen version?',
        a: 'Yes. The Wolverine stack is one of the pre-filled pens on the /pens page, which suits people who would rather not reconstitute at all.',
      },
      {
        q: 'Which tier should I start with?',
        a: 'The 10mg+10mg is the one most people take and the tier we hold in stock. 5mg+5mg suits a short trial; 15mg+15mg is for longer protocols where you already know you will finish it.',
      },
    ],
    pairsWith: [22, 19, 87],
    meta: {
      title: 'BPC-157 + TB-500 Wolverine Stack | STRIATA',
      description:
        'BPC-157 and TB-500 in one vial for tissue repair and recovery. 10mg+10mg in stock at R825, shipped across South Africa. Research-grade, 99% purity.',
    },
  },

  9: {
    lede: 'One of the original growth hormone secretagogues, and still the one used when appetite is the point rather than a side effect.',
    about: [
      'GHRP-6 is a hexapeptide that mimics ghrelin at the growth hormone secretagogue receptor, prompting the pituitary to release a pulse of growth hormone. It was among the first of its class to be studied and remains a reference point for the ones that followed. Its distinguishing feature is a strong effect on appetite — pronounced enough that it is the reason some people choose it and the reason others choose Ipamorelin instead.',
      'In practice that makes GHRP-6 a lean-mass tool rather than a fat-loss one. It is most often researched in bulking and recovery contexts, where eating enough is the constraint, and it is frequently paired with a GHRH analogue such as CJC-1295, on the reasoning that a secretagogue and a releasing hormone acting together produce a larger pulse than either alone.',
    ],
    researchedFor: [
      {
        title: 'Growth hormone release',
        body: 'The core research interest: a pulsatile GH release that follows the body\'s own rhythm rather than replacing it, which is the argument for secretagogues over exogenous HGH.',
      },
      {
        title: 'Appetite',
        body: 'A marked increase in hunger, usually within twenty minutes. Useful in a lean-mass phase, and the main reason to pick a different secretagogue if you are cutting.',
      },
      {
        title: 'Lean mass protocols',
        body: 'Commonly stacked with a GHRH analogue and run alongside a surplus, where the appetite effect helps rather than hinders.',
      },
    ],
    handling:
      'The 10mg vial reconstituted with 2 mL of bacteriostatic water gives 5mg/mL, so a 100mcg dose is a 2-unit draw. Because GH release is pulsatile and follows a daily rhythm, most protocols time doses away from meals. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'GHRP-6 or Ipamorelin?',
        a: 'Appetite is the deciding factor. GHRP-6 raises it sharply, which suits a mass phase; Ipamorelin is the more selective and better-tolerated option if you do not want that. Both are in the catalogue.',
      },
      {
        q: 'Why is it usually stacked with CJC-1295?',
        a: 'They act on different receptors — CJC-1295 is a GHRH analogue, GHRP-6 a ghrelin mimetic — so the pulse they produce together is larger than either on its own. The CJC-1295 + Ipamorelin stack is the same idea with the milder secretagogue.',
      },
    ],
    pairsWith: [12, 44, 87],
    meta: {
      title: 'GHRP-6 South Africa | 10mg Vial | STRIATA',
      description:
        'GHRP-6, the ghrelin-mimetic GH secretagogue used in lean mass protocols. 10mg in stock at R350, delivered across South Africa. 99% purity.',
    },
  },

  12: {
    lede: 'A GHRH analogue and a ghrelin mimetic in one vial — the standard pairing for growth hormone work, pre-matched.',
    about: [
      'CJC-1295 and Ipamorelin are stacked so routinely that buying them separately is the exception. CJC-1295 is a growth hormone releasing hormone analogue: it raises the amount of GH available to be released. Ipamorelin is a selective secretagogue: it triggers the release itself. Acting on two different receptors at once produces a larger pulse than either does alone, which is the whole argument for the combination.',
      'Ipamorelin is the reason this stack suits people who cannot use GHRP-6. It is the most selective of the common secretagogues, with far less effect on appetite, cortisol and prolactin, so the GH pulse arrives without the hunger that makes GHRP-6 a poor fit for a cut. This vial holds 5mg of each.',
    ],
    researchedFor: [
      {
        title: 'Pulsatile GH release',
        body: 'Raising growth hormone in the body\'s own pattern — pulses, mostly overnight — rather than the flat elevated level exogenous HGH produces.',
      },
      {
        title: 'Recovery and sleep',
        body: 'The most common reason people run it. GH release concentrates in deep sleep, which is why protocols usually place a dose before bed.',
      },
      {
        title: 'Body composition',
        body: 'Studied for lean mass and fat distribution over longer runs, and selective enough that it does not carry the appetite increase that works against a deficit.',
      },
    ],
    handling:
      'The 5mg+5mg vial reconstituted with 2 mL of bacteriostatic water gives 2.5mg of each peptide per mL, so a 100mcg/100mcg dose is a 4-unit draw. Protocols almost always place a dose before bed, since the natural GH pulse is largest in deep sleep and the two compound. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is this CJC-1295 with or without DAC?',
        a: 'Without. The DAC version has a much longer half-life and is a separate catalogue line; the no-DAC form used here is the one that suits a short, sleep-timed pulse.',
      },
      {
        q: 'Why not just use HGH?',
        a: 'Different mechanism and a different price. Secretagogues prompt your own pituitary to release GH in its usual pattern and stop when the pituitary would stop. HGH Somatropin is also in the catalogue if that is what you are after.',
      },
      {
        q: 'When should I dose it?',
        a: 'Before bed is standard, away from food. Some protocols add a second morning dose; the sleep-timed one is the one nobody skips.',
      },
    ],
    pairsWith: [9, 44, 87],
    meta: {
      title: 'CJC-1295 + Ipamorelin Stack | STRIATA South Africa',
      description:
        'CJC-1295 and Ipamorelin, 5mg each in one vial, for pulsatile growth hormone release. In stock at R425, shipped nationwide in South Africa.',
    },
  },

  15: {
    lede: 'GHK-Cu, BPC-157 and TB-500 in one 70mg vial — repair from the inside and the skin at the same time.',
    about: [
      'The GLOW stack is built on the observation that skin regeneration and tissue repair are the same biology looked at from different angles. GHK-Cu is the copper tripeptide studied for collagen synthesis and skin remodelling; BPC-157 and TB-500 are the repair pair covered on the Wolverine stack page. Together they are the most-requested cosmetic protocol we sell, and the one people most often run continuously rather than in blocks.',
      'The 70mg vial holds GHK-Cu 50mg with BPC-157 10mg and TB-500 10mg. The GHK-Cu share is deliberately the largest — it is the compound doing the skin work, and the two repair peptides are there at the doses they are normally run at anyway. If you want the same thing with gut and systemic anti-inflammatory support added, the KLOW stack is this plus KPV 10mg.',
    ],
    researchedFor: [
      {
        title: 'Skin quality',
        body: 'GHK-Cu is the most-researched copper peptide for collagen, elastin and skin remodelling, and the reason this stack reads as a beauty protocol rather than a recovery one.',
      },
      {
        title: 'Hair and scalp',
        body: 'A frequent reason people choose GLOW over a pure recovery stack; GHK-Cu\'s follicle research is covered in the Learn article linked below.',
      },
      {
        title: 'Tissue repair',
        body: 'The BPC-157 and TB-500 share carries the same soft-tissue and gut interest it does on its own, so the stack does double duty through a training block.',
      },
      {
        title: 'Post-procedure recovery',
        body: 'Commonly researched around microneedling, laser and similar work, where skin remodelling and general repair are wanted at once.',
      },
    ],
    handling:
      'A 70mg vial is a lot of peptide for its size, so reconstitution volume matters more than usual. Most protocols use 2 to 3 mL of bacteriostatic water; at 3 mL the vial holds roughly 23mg of combined peptide per mL. Add the water slowly down the glass — a large powder cake takes a minute or two to dissolve fully, and it should be left to do that rather than shaken. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'GLOW or KLOW?',
        a: 'KLOW is GLOW plus KPV 10mg, for R150 more. Take KLOW if gut health or systemic inflammation is part of what you are addressing; GLOW if the goal is skin, hair and repair.',
      },
      {
        q: 'Is this the same as the GHK-Cu serum?',
        a: 'No. The serum is a topical 30 ml dropper bottle for the face. This is a reconstitution vial. Some people use both; they are different products with different pages.',
      },
      {
        q: 'How long does one vial last?',
        a: 'That depends entirely on your protocol, but at the doses GLOW is usually run at, a 70mg vial is a multi-week supply rather than a few days.',
      },
    ],
    pairsWith: [89, 22, 87],
    meta: {
      title: 'GLOW Stack — GHK-Cu + BPC-157 + TB-500 | STRIATA',
      description:
        'The GLOW stack: GHK-Cu 50mg, BPC-157 10mg and TB-500 10mg in one 70mg vial for skin regeneration and tissue repair. R1,150, in stock in South Africa.',
    },
  },

  89: {
    lede: 'The GLOW stack with KPV added — the same skin and repair protocol, with the gut brought into it.',
    about: [
      'KLOW is GLOW plus KPV 10mg: GHK-Cu 50mg, BPC-157 10mg, TB-500 10mg and KPV 10mg in a single 80mg vial. KPV is a tripeptide fragment of alpha-MSH studied for its anti-inflammatory action, particularly in the gut and in inflammatory skin conditions, and adding it turns a skin-and-repair stack into one that addresses inflammation systemically.',
      'That makes KLOW the stack people move to when the skin picture is not only cosmetic. Where GLOW is chosen for collagen, hair and post-procedure recovery, KLOW tends to be chosen where inflammatory skin conditions, gut symptoms or both are part of the reason for running a protocol at all. It is the most complete of our stack vials and the one with the widest research footprint behind it.',
    ],
    researchedFor: [
      {
        title: 'Inflammatory skin',
        body: 'KPV is researched in inflammatory skin conditions specifically, which is the distinction between this stack and GLOW.',
      },
      {
        title: 'Gut health',
        body: 'KPV and BPC-157 are the two compounds in the catalogue with the strongest gut research interest, and this is the only vial that holds both.',
      },
      {
        title: 'Skin regeneration',
        body: 'The GHK-Cu 50mg share does the same collagen and remodelling work it does in GLOW; nothing about that part of the stack changes.',
      },
      {
        title: 'Systemic repair',
        body: 'BPC-157 and TB-500 cover connective tissue and cell migration, so the stack still functions as a recovery protocol through a training block.',
      },
    ],
    handling:
      'An 80mg vial in a standard 3 mL vial is dense; reconstitute with 2 to 3 mL of bacteriostatic water and expect the cake to take a minute or two to go fully into solution. At 3 mL the vial holds roughly 27mg of combined peptide per mL. Do not shake it to speed that up. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is KLOW worth R150 more than GLOW?',
        a: 'If gut health or an inflammatory skin condition is part of why you are running it, yes — KPV 10mg on its own is R600. If you want skin, hair and repair only, GLOW does that.',
      },
      {
        q: 'Can I run it continuously?',
        a: 'KLOW is one of the stacks people most often run as an ongoing protocol rather than in blocks. How you structure that is between you and whoever is guiding your protocol.',
      },
    ],
    pairsWith: [15, 19, 87],
    meta: {
      title: 'KLOW Stack — KPV + GHK-Cu + BPC + TB | STRIATA',
      description:
        'KLOW: KPV 10mg, GHK-Cu 50mg, BPC-157 10mg and TB-500 10mg in one 80mg vial for skin, gut and tissue repair. R1,300, in stock in South Africa.',
    },
  },

  19: {
    lede: 'A three-amino-acid fragment of alpha-MSH, and one of the few peptides researched as much for the gut as for the skin.',
    about: [
      'KPV is lysine-proline-valine — the C-terminal tripeptide of alpha-melanocyte-stimulating hormone, and about as small as a peptide gets. What makes it interesting is that it appears to keep the anti-inflammatory action of the parent hormone without the pigmentation effects, which is why it turns up in research on inflammatory bowel conditions and inflammatory skin conditions rather than in tanning protocols.',
      'In practice KPV is bought for one of two reasons: gut symptoms, usually alongside BPC-157, or inflammatory skin conditions, usually alongside GHK-Cu. Both of those combinations exist pre-mixed in the KLOW stack, which is where most people end up if they want all four compounds rather than KPV on its own.',
    ],
    researchedFor: [
      {
        title: 'Gut inflammation',
        body: 'The largest body of KPV research, and the reason it is most often paired with BPC-157 — the two are studied on different parts of the same problem.',
      },
      {
        title: 'Inflammatory skin',
        body: 'Researched in inflammatory skin conditions, which is what it adds to the GLOW stack to make KLOW.',
      },
      {
        title: 'Systemic inflammation',
        body: 'Studied for a broad anti-inflammatory effect rather than a localised one, which is why it is treated as a base layer in longer protocols.',
      },
    ],
    handling:
      'The 10mg vial reconstituted with 2 mL of bacteriostatic water gives 5mg/mL. KPV is also one of the peptides sometimes used orally or topically in research contexts; the vial we supply is lyophilised powder for reconstitution. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'KPV on its own or the KLOW stack?',
        a: 'KPV 10mg is R600. The KLOW stack is R1,300 and holds the same KPV 10mg plus GHK-Cu 50mg, BPC-157 10mg and TB-500 10mg. If you would have bought those anyway, the stack is the cheaper route.',
      },
      {
        q: 'Does it cause tanning like Melanotan?',
        a: 'No. KPV is the fragment of alpha-MSH that carries the anti-inflammatory action without the melanocortin receptor activity responsible for pigmentation. Melanotan II is a separate product if tanning is what you are after.',
      },
    ],
    pairsWith: [89, 3, 87],
    meta: {
      title: 'KPV Peptide South Africa | 10mg Vial | STRIATA',
      description:
        'KPV, the alpha-MSH tripeptide researched for gut and inflammatory skin conditions. 10mg in stock at R600, delivered across South Africa.',
    },
  },

  // ── Skin, Hair & Anti-Aging ──────────────────────────────────────────

  22: {
    lede: 'The copper peptide the entire category is named after, in a 100mg vial — the most researched skin compound we stock.',
    about: [
      'GHK-Cu is a naturally occurring copper tripeptide found in human plasma, and its concentration falls sharply with age — roughly a two-thirds decline between your twenties and your sixties. That decline is what made it interesting to researchers in the first place, and it has since accumulated one of the deepest research literatures of any peptide in cosmetics, covering collagen and elastin synthesis, skin remodelling, hair follicles and wound healing.',
      'It is the compound behind both the GLOW and KLOW stacks and behind our topical serum, and this 100mg vial is the raw material form. At R450 for 100mg it is also the best value per milligram in the skin category by a wide margin, which is why people running longer protocols buy it here rather than as part of a stack.',
    ],
    researchedFor: [
      {
        title: 'Collagen and elastin',
        body: 'The core of the GHK-Cu literature: signalling skin cells to build rather than adding structural protein directly, which is what separates it from a collagen supplement.',
      },
      {
        title: 'Skin remodelling',
        body: 'Studied for texture, fine lines and scarring — the same wound-healing pathways, applied to skin that is not injured.',
      },
      {
        title: 'Hair follicles',
        body: 'A well-documented research interest and a common reason people choose GHK-Cu over other skin compounds.',
      },
      {
        title: 'Antioxidant activity',
        body: 'Researched for antioxidant and anti-inflammatory properties, which is the argument for it in reactive skin that tolerates retinoids and acids poorly.',
      },
    ],
    handling:
      'A 100mg vial is the largest peptide load in the skin category, so give it room: 2 to 3 mL of bacteriostatic water, added slowly down the glass. At 3 mL that is roughly 33mg/mL. GHK-Cu solution is a distinct blue — that is the copper, and it means the peptide-copper complex is intact rather than that anything has gone wrong. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Vial or serum?',
        a: 'Different products for different uses. The topical GHK-Cu serum is a finished 30 ml face formulation with hyaluronic acid, ready to use. This vial is lyophilised powder. People running a broader protocol often have both.',
      },
      {
        q: 'Why is the solution blue?',
        a: 'Copper. GHK-Cu is naturally blue in solution and the colour is a sign the complex is intact.',
      },
      {
        q: 'Is the stack better value?',
        a: 'Per milligram, no — 100mg here is R450. The GLOW stack is better value only if you also want the BPC-157 and TB-500 that come with it.',
      },
    ],
    pairsWith: [15, 91, 23],
    meta: {
      title: 'GHK-Cu Copper Peptide 100mg | STRIATA South Africa',
      description:
        'GHK-Cu, the copper tripeptide researched for collagen, skin remodelling and hair. 100mg vial in stock at R450, shipped across South Africa.',
    },
  },

  23: {
    lede: 'A four-amino-acid peptide from the pineal gland, and the compound most associated with telomere research.',
    about: [
      'Epithalon is a synthetic form of Epithalamin, a peptide extracted from the pineal gland and studied in Russia since the 1980s. Its research profile is unusual for how long it runs: several of the studies behind it followed subjects for years rather than weeks, which is rare in this field and part of why it is treated as a reference compound in longevity research.',
      'The interest centres on telomerase — the enzyme that maintains the protective caps on chromosomes that shorten each time a cell divides. Alongside that, Epithalon is consistently reported on for sleep and circadian rhythm, which follows from its pineal origin and is what many people actually notice first. It is usually run in short courses rather than continuously.',
    ],
    researchedFor: [
      {
        title: 'Telomerase activity',
        body: 'The headline research interest, and the reason Epithalon appears in almost every longevity protocol despite its small size.',
      },
      {
        title: 'Sleep and circadian rhythm',
        body: 'A pineal peptide with a documented interest in melatonin regulation, which is why sleep is the effect people most often report noticing.',
      },
      {
        title: 'Longevity protocols',
        body: 'Typically run as a course of consecutive days, repeated a few times a year, rather than continuously — the pattern the original research used.',
      },
    ],
    handling:
      'The 10mg vial reconstituted with 2 mL of bacteriostatic water gives 5mg/mL, so a 10mg course spread over ten days is a 1 mg (20-unit) draw each day. Because Epithalon is usually run in short courses, one vial often covers a full course with nothing left over. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'How is it usually run?',
        a: 'In courses rather than continuously — the original research used consecutive-day courses repeated periodically. The Learn article linked below goes through what those studies actually did.',
      },
      {
        q: 'Epithalon or Pinealon?',
        a: 'Both are pineal-derived bioregulators but the research interest differs: Epithalon for telomerase and circadian rhythm, Pinealon for cognitive function. Some longevity protocols run both.',
      },
    ],
    pairsWith: [64, 68, 22],
    meta: {
      title: 'Epithalon 10mg | Telomerase Research | STRIATA',
      description:
        'Epithalon, the pineal tetrapeptide researched for telomerase activity, sleep and longevity. 10mg in stock at R450, delivered across South Africa.',
    },
  },

  28: {
    lede: 'The body\'s own master antioxidant, in an injectable vial that sidesteps the absorption problem oral glutathione has.',
    about: [
      'Glutathione is a tripeptide your liver makes continuously and depletes under oxidative stress, alcohol, illness and age. It is central to phase II liver detoxification and to recycling other antioxidants, which is why it is described as the master antioxidant rather than one of several.',
      'The reason it is sold as an injectable at all is absorption. Oral glutathione is largely broken down in the gut before it reaches circulation, which has made oral supplementation a contested subject for decades. An injectable vial avoids that route entirely, which is why it is the form used in skin-brightening and liver-support protocols, and why it is priced by the hundreds of milligrams rather than the tens.',
    ],
    researchedFor: [
      {
        title: 'Antioxidant capacity',
        body: 'Neutralising free radicals directly and regenerating vitamins C and E, which is the mechanism behind most of its other reported uses.',
      },
      {
        title: 'Liver support',
        body: 'Central to phase II detoxification, and the context in which glutathione has the longest clinical history.',
      },
      {
        title: 'Skin tone',
        body: 'The most common reason it is bought here: glutathione is studied for its effect on melanin synthesis and even skin tone.',
      },
    ],
    handling:
      'Glutathione is one of two catalogue items with a 10 mL reconstitution limit rather than the usual 3 mL — the doses are large enough that a standard volume would make the solution impractically concentrated. The 600mg vial with 6 mL of bacteriostatic water gives 100mg/mL. The reconstitution calculator has the limit built in. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Why not just take it orally?',
        a: 'Oral glutathione is largely degraded in the gut before it reaches the bloodstream, which is the reason the injectable form exists.',
      },
      {
        q: 'Which size should I get?',
        a: '600mg at R350 and 1500mg at R580 are both in stock; the 1500mg is materially better value per milligram if your protocol will get through it within the solution\'s useful life.',
      },
      {
        q: 'Does it need more water than other peptides?',
        a: 'Yes — up to 10 mL rather than the usual 3 mL maximum. The calculator applies that automatically when you select it.',
      },
    ],
    pairsWith: [68, 22, 87],
    meta: {
      title: 'Glutathione Injection South Africa | STRIATA',
      description:
        'Injectable glutathione, the master antioxidant, for liver support and skin tone. 600mg R350 and 1500mg R580 in stock, shipped nationwide.',
    },
  },

  // ── Hormonal & Sexual Health ─────────────────────────────────────────

  33: {
    lede: 'A peptide encoded not in the cell nucleus but in the mitochondria — the closest thing in the catalogue to an exercise signal.',
    about: [
      'MOTS-c is unusual in where it comes from. Most peptides are encoded in nuclear DNA; MOTS-c is encoded in the mitochondrial genome, which puts it in a small class of mitochondrial-derived peptides discovered only in the last fifteen years. It appears to act as a signal from the mitochondria to the rest of the cell about energy status.',
      'That is why its research reads more like exercise physiology than endocrinology: metabolic flexibility, glucose handling, and exercise capacity. Levels rise with exercise and fall with age, and the research interest is in what supplying it does for people in whom both of those are working against them. It sits in the hormonal category here because it acts as a signalling molecule, but most people buy it for metabolism and energy.',
    ],
    researchedFor: [
      {
        title: 'Metabolic function',
        body: 'The core interest: glucose handling and metabolic flexibility, studied as a signal the mitochondria send when energy is short.',
      },
      {
        title: 'Exercise capacity',
        body: 'MOTS-c rises with exercise, which is why it is often described as an exercise mimetic alongside SLU-PP-332 — a different mechanism aimed at similar ground.',
      },
      {
        title: 'Cellular energy',
        body: 'Studied for mitochondrial function directly rather than through a hormonal intermediary, which is what distinguishes it from the GH secretagogues.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL, so a 500mcg dose is a 10-unit draw. The 20mg vial is the better value of the two in-stock sizes and the one most protocols run through. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'MOTS-c or SLU-PP-332?',
        a: 'Both are described as exercise mimetics but by different routes — MOTS-c as a mitochondrial signalling peptide, SLU-PP-332 through the ERR receptors. MOTS-c has the longer research history; SLU-PP-332 is the newer compound.',
      },
      {
        q: 'Is this a weight loss peptide?',
        a: 'Not in the way the GLP-1s are. MOTS-c is researched for metabolic function and energy rather than appetite, so it is usually run alongside a diet rather than to make one easier.',
      },
    ],
    pairsWith: [90, 68, 42],
    meta: {
      title: 'MOTS-C South Africa | Mitochondrial Peptide | STRIATA',
      description:
        'MOTS-c, the mitochondrial-derived peptide researched for metabolic function and exercise capacity. 10mg R400, 20mg R650, in stock in South Africa.',
    },
  },

  34: {
    lede: 'The one compound in this category that acts on the brain rather than on blood flow — and works for women as well as men.',
    about: [
      'PT-141, or bremelanotide, works on melanocortin receptors in the central nervous system. That is the whole point of it. The familiar erectile dysfunction drugs are vasodilators: they act on blood flow and do nothing for desire. PT-141 acts upstream of that, on arousal itself, which is why it is researched in people for whom the vascular drugs either do not work or do not address the actual problem.',
      'It is also the reason PT-141 is one of the few compounds in the category with a meaningful research base in women. Bremelanotide has been through clinical trials for hypoactive sexual desire disorder in premenopausal women and was approved in the United States on that basis — an unusual level of evidence for anything in a research peptide catalogue.',
    ],
    researchedFor: [
      {
        title: 'Arousal and desire',
        body: 'Acting on melanocortin receptors in the central nervous system rather than on vascular tissue, which is what makes it applicable to desire rather than only to function.',
      },
      {
        title: 'Men and women',
        body: 'One of the few compounds here with a clinical research base in both, and the only one approved anywhere specifically for desire in women.',
      },
      {
        title: 'Non-vascular mechanism',
        body: 'Researched in people for whom the PDE5 inhibitors are unsuitable or ineffective, because it does not act on the same pathway.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. PT-141 is dosed before use rather than daily, so one vial lasts a long time; nausea at higher doses is the most commonly reported reason people titrate up slowly from a low starting dose. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Does it work for women?',
        a: 'It is the one compound in this category with clinical trial evidence specifically in women — bremelanotide was approved in the US for hypoactive sexual desire disorder in premenopausal women.',
      },
      {
        q: 'How is it different from the ED drugs?',
        a: 'Mechanism. PDE5 inhibitors act on blood flow; PT-141 acts on melanocortin receptors in the brain and addresses arousal rather than the vascular response.',
      },
      {
        q: 'Why do people start at a low dose?',
        a: 'Nausea is the most commonly reported effect and it is dose-dependent, so most protocols titrate up rather than starting at the top.',
      },
    ],
    pairsWith: [40, 35, 87],
    meta: {
      title: 'PT-141 Bremelanotide 10mg | STRIATA South Africa',
      description:
        'PT-141 (bremelanotide), researched for libido and arousal in men and women through a central rather than vascular mechanism. 10mg R450, in stock.',
    },
  },

  35: {
    lede: 'The melanocortin agonist known for tanning, with two other effects that are the reason plenty of people buy it.',
    about: [
      'Melanotan II is a synthetic analogue of alpha-melanocyte-stimulating hormone. It binds melanocortin receptors and stimulates melanin production, which is where the tanning reputation comes from — it is the compound behind the entire "tanning peptide" category. But it binds several melanocortin receptors rather than one, and the other two it hits are the reason the product description mentions appetite and libido alongside pigmentation.',
      'That breadth is both the appeal and the caveat. Melanotan II is less selective than PT-141, which was developed from the same family specifically to isolate the arousal effect. If sexual health is the goal, PT-141 is the targeted tool. If tanning is the goal, this is the compound with the research behind it.',
    ],
    researchedFor: [
      {
        title: 'Melanin production',
        body: 'The primary research interest and the reason the compound exists: stimulating melanocytes directly rather than through UV exposure.',
      },
      {
        title: 'Appetite suppression',
        body: 'A documented melanocortin effect, and a reason Melanotan II occasionally appears in weight protocols despite not being marketed as one.',
      },
      {
        title: 'Libido',
        body: 'The effect PT-141 was developed to isolate. Present here, alongside everything else, rather than on its own.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. Protocols typically start low and build, both because the melanocortin effects are dose-dependent and because nausea and flushing are commonly reported at higher starting doses. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Melanotan II or PT-141?',
        a: 'PT-141 if the interest is sexual health specifically — it was developed from this family to isolate that effect. Melanotan II if tanning is what you are after.',
      },
      {
        q: 'Do you stock Melanotan I?',
        a: 'Yes, it is in the catalogue. Melanotan I is the more selective of the two for pigmentation, with less of the appetite and libido activity.',
      },
    ],
    pairsWith: [34, 36, 87],
    meta: {
      title: 'Melanotan II 10mg South Africa | STRIATA',
      description:
        'Melanotan II, the melanocortin agonist researched for melanin production, appetite and libido. 10mg vial in stock at R400, shipped nationwide.',
    },
  },

  40: {
    lede: 'The bonding hormone, in a vial — better known for what it does socially than for anything it does in a gym.',
    about: [
      'Oxytocin is a nine-amino-acid neuropeptide produced in the hypothalamus, and one of the very few compounds in this catalogue that most people have already heard of. Its reputation rests on childbirth and bonding, which is accurate but narrow: the research interest that brings people to it here is closer to stress, mood and social connection.',
      'It is an unusual product for a peptide catalogue because the reason people buy it is rarely physical. Oxytocin is researched for anxiety, trust and social behaviour far more than for anything in the performance or body composition categories, and it sits alongside Selank and DSIP in most protocols rather than alongside the growth hormone secretagogues.',
    ],
    researchedFor: [
      {
        title: 'Social connection',
        body: 'The research the compound is best known for, covering trust, bonding and social behaviour.',
      },
      {
        title: 'Stress response',
        body: 'Studied for its interaction with cortisol and the stress axis, which is the usual reason it appears alongside anxiolytic peptides like Selank.',
      },
      {
        title: 'Wellbeing',
        body: 'A broad research interest in mood and general wellbeing rather than a specific physical endpoint.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. Oxytocin has a short half-life, which is why research protocols dose it close to when the effect is wanted rather than on a fixed daily schedule. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is this the same oxytocin used in childbirth?',
        a: 'The same molecule, supplied as a research-grade lyophilised peptide. The Learn article linked below covers the research beyond the obstetric use it is known for.',
      },
      {
        q: 'What is it usually run with?',
        a: 'Most often alongside the brain and mood peptides — Selank, DSIP — rather than with anything in the recovery or weight categories.',
      },
    ],
    pairsWith: [60, 62, 87],
    meta: {
      title: 'Oxytocin Acetate South Africa | STRIATA',
      description:
        'Oxytocin acetate, researched for social connection, stress and wellbeing. 5mg vial in stock at R380, delivered across South Africa.',
    },
  },

  41: {
    lede: 'Upstream of everything else in hormonal health — the signal that starts the cascade rather than replacing its end product.',
    about: [
      'Kisspeptin sits at the very top of the hypothalamic-pituitary-gonadal axis. It signals the hypothalamus to release GnRH, which prompts the pituitary to release LH and FSH, which in turn drive testosterone production in the testes. That position is the entire argument for it: it works with the axis rather than around it.',
      'This is what separates it from exogenous testosterone, which raises the end product and, in doing so, suppresses the signals above it. Kisspeptin is researched in the opposite direction — stimulating the body\'s own production chain from the top. It is the same logic that makes HCG and Gonadorelin interesting, at an earlier point in the cascade.',
    ],
    researchedFor: [
      {
        title: 'HPG axis activation',
        body: 'The defining research interest: prompting the body\'s own LH, FSH and testosterone production rather than supplying the end hormone.',
      },
      {
        title: 'Testosterone support',
        body: 'Studied in men with low endogenous production, where the goal is restarting the chain rather than replacing what it makes.',
      },
      {
        title: 'Fertility research',
        body: 'Kisspeptin\'s role in reproductive signalling is where most of the clinical literature sits, in both men and women.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. Kisspeptin has a short half-life, and research protocols reflect that in how they schedule doses. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'How is it different from HCG?',
        a: 'Position in the cascade. HCG mimics LH and acts on the testes directly; Kisspeptin acts at the top, on the hypothalamus, so the whole axis signals normally. The Learn article linked below compares them.',
      },
      {
        q: 'Is there a photo of this vial?',
        a: 'Not yet — Kisspeptin is the one in-stock line we have not photographed. The vial and label are identical in format to the rest of the range.',
      },
    ],
    pairsWith: [39, 37, 87],
    meta: {
      title: 'Kisspeptin South Africa | HPG Axis | STRIATA',
      description:
        'Kisspeptin, researched for HPG axis activation and natural LH, FSH and testosterone production. 10mg in stock at R600, shipped across South Africa.',
    },
  },

  // ── Weight Loss & Metabolism ─────────────────────────────────────────

  42: {
    lede: 'An oral-route small molecule that targets an enzyme most people have never heard of, and one that gets more active as you gain fat.',
    about: [
      'NNMT — nicotinamide N-methyltransferase — is an enzyme in fat cells that regulates how fast they burn energy. Its activity rises in obesity, which creates a feedback loop: more fat tissue, more NNMT, slower metabolism in exactly the cells you want working harder. 5-Amino-1MQ is an NNMT inhibitor, and the research interest is in breaking that loop.',
      'It is a different proposition from the GLP-1 drugs that dominate this category. Those work on appetite and gastric emptying — they make eating less easier. 5-Amino-1MQ acts inside the fat cell on how energy is used, with no appetite mechanism at all. That makes it a candidate for people who do not have an appetite problem, and it is often researched alongside a GLP-1 rather than instead of one.',
    ],
    researchedFor: [
      {
        title: 'NNMT inhibition',
        body: 'The mechanism the compound was designed around: raising NAD+ availability and metabolic rate inside adipocytes by inhibiting the enzyme that suppresses both.',
      },
      {
        title: 'Fat loss without appetite effects',
        body: 'Researched in a way that does not overlap with the GLP-1s, which is why the two are often looked at together rather than as alternatives.',
      },
      {
        title: 'Cellular metabolism',
        body: 'The NNMT pathway also intersects with NAD+ metabolism, which is why 5-Amino-1MQ appears in longevity protocols as well as weight ones.',
      },
    ],
    handling:
      'The 10mg vial reconstituted with 2 mL of bacteriostatic water gives 5mg/mL. 5-Amino-1MQ is a small molecule rather than a true peptide, which is why it appears in research in oral as well as injectable form; what we supply is the lyophilised vial. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Can it be combined with a GLP-1?',
        a: 'The mechanisms do not overlap — one acts on appetite, the other inside the fat cell — which is why they are commonly researched together rather than as substitutes.',
      },
      {
        q: 'Is it a peptide?',
        a: 'Strictly, no. It is a small molecule NNMT inhibitor. It sits in the catalogue because it is used in the same protocols and supplied in the same form.',
      },
    ],
    pairsWith: [90, 68, 47],
    meta: {
      title: '5-Amino-1MQ 10mg | NNMT Inhibitor | STRIATA',
      description:
        '5-Amino-1MQ, the NNMT inhibitor researched for fat loss and cellular metabolism without appetite effects. 10mg in stock at R450 in South Africa.',
    },
  },

  90: {
    lede: 'A compound that activates the same receptors exercise does — the reason it gets called exercise in a bottle, and the reason that name oversells it.',
    about: [
      'SLU-PP-332 is an ERR agonist: it activates the estrogen-related receptors, a family of transcription factors that exercise itself switches on. Downstream of that are mitochondrial biogenesis, fat oxidation and endurance — which is why the early research generated headlines about a compound that reproduces the metabolic benefits of training.',
      'The honest version is narrower. What the research shows is activation of the same pathway, with measurable effects on mitochondrial activity and fat oxidation in animal models. It does not build the musculoskeletal adaptations, cardiovascular capacity or anything else training gives you. It is one of the newest compounds in the catalogue and its literature is correspondingly thin compared to something like GHK-Cu.',
    ],
    researchedFor: [
      {
        title: 'Mitochondrial biogenesis',
        body: 'The ERR pathway drives new mitochondria, which is the mechanism behind most of what SLU-PP-332 is studied for.',
      },
      {
        title: 'Fat oxidation',
        body: 'Researched for a shift toward burning fat for fuel rather than for appetite suppression, which puts it in a different bracket from the GLP-1s.',
      },
      {
        title: 'Endurance',
        body: 'The endpoint that generated the "exercise mimetic" framing. Worth reading with the caveat that it is a pathway effect, not a replacement for training.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. SLU-PP-332 has a short half-life, and research protocols reflect that in dose frequency. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Does it actually replace exercise?',
        a: 'No. It activates one pathway that exercise activates, with effects on mitochondrial activity and fat oxidation. It does nothing for strength, cardiovascular capacity or anything structural.',
      },
      {
        q: 'SLU-PP-332 or MOTS-c?',
        a: 'Similar territory, different mechanisms and very different amounts of research behind them. MOTS-c has the longer history; SLU-PP-332 is newer and less studied.',
      },
    ],
    pairsWith: [33, 42, 87],
    meta: {
      title: 'SLU-PP-332 South Africa | Exercise Mimetic | STRIATA',
      description:
        'SLU-PP-332, the ERR agonist researched for mitochondrial activity, fat oxidation and endurance. 5mg vial in stock at R400, shipped nationwide.',
    },
  },

  43: {
    lede: 'The fat-burning fragment of growth hormone, with the part that affects blood sugar and tissue growth left out.',
    about: [
      'AOD-9604 is a modified fragment of the human growth hormone molecule — specifically the C-terminal region responsible for its effect on fat metabolism. The point of isolating it is what gets left behind: the parts of HGH that affect blood glucose, IGF-1 and tissue growth are not in the fragment, so the research interest is in lipolysis without the rest of the growth hormone picture.',
      'That makes it a conservative option in a category that is not otherwise known for conservatism. AOD-9604 has been through human safety trials and has a longer regulatory history than most of what sits near it in the catalogue. It is closely related to HGH Fragment 176-191, and the Learn article linked below compares the two directly, since choosing between them is the most common question about either.',
    ],
    researchedFor: [
      {
        title: 'Lipolysis',
        body: 'Stimulating the breakdown of stored fat, which is the function the fragment was isolated to reproduce.',
      },
      {
        title: 'Fat storage',
        body: 'Studied for inhibiting new fat accumulation as well as mobilising existing stores — the two halves of the same research interest.',
      },
      {
        title: 'No glucose effect',
        body: 'The reason to choose a fragment over whole HGH: the glucose and IGF-1 effects are absent, which is what makes its safety profile the more settled one.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL, so a 300mcg dose is a 12-unit draw. Protocols typically dose it fasted, on the reasoning that lipolysis is easiest to influence when insulin is low. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'AOD-9604 or HGH Fragment 176-191?',
        a: 'They are closely related and the comparison is the most common question we get on either. The Learn article linked below works through it properly.',
      },
      {
        q: 'Does it affect blood sugar?',
        a: 'That is the point of using the fragment rather than whole HGH — the glucose and growth effects belong to parts of the molecule not present in AOD-9604.',
      },
    ],
    pairsWith: [44, 5, 87],
    meta: {
      title: 'AOD-9604 5mg South Africa | STRIATA',
      description:
        'AOD-9604, the HGH fragment researched for lipolysis without the glucose or growth effects of whole HGH. 5mg in stock at R500, shipped nationwide.',
    },
  },

  44: {
    lede: 'A GHRH analogue with something rare in this catalogue: an approved clinical indication and the trial data behind it.',
    about: [
      'Tesamorelin is a growth hormone releasing hormone analogue, and it is one of the few compounds here that went through the full clinical development path. It is approved in the United States for reducing excess visceral abdominal fat in a specific patient population, which means its effect on visceral fat is not inferred from mechanism — it was the trial endpoint.',
      'Visceral fat is what makes it interesting beyond that population. It is the fat around the organs rather than under the skin, it responds differently to diet than subcutaneous fat does, and it is the fraction most closely tied to metabolic risk. A compound with trial data specifically on that fraction is unusual. The research also covers cognitive endpoints, which follows from what raising growth hormone does more broadly.',
    ],
    researchedFor: [
      {
        title: 'Visceral fat',
        body: 'The clinical endpoint the compound was approved on — the deep abdominal fat around the organs, not the subcutaneous layer.',
      },
      {
        title: 'Body composition',
        body: 'Studied for the broader composition picture that follows from sustained GH elevation rather than for scale weight.',
      },
      {
        title: 'Cognitive function',
        body: 'A secondary research interest, consistent with the wider literature on growth hormone and cognition.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL, so a 1mg dose is a 20-unit draw. Like the other GH-axis compounds it is usually dosed away from food, and protocols commonly place it at night. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'How is it different from the CJC-1295 stack?',
        a: 'Both are GHRH-route compounds, but Tesamorelin has clinical trial data on visceral fat specifically, which is why it is priced and positioned differently.',
      },
      {
        q: 'Which vial size?',
        a: '5mg at R500 and 10mg at R1,050 are both in stock. The 10mg is the standard size for a full protocol; the 5mg suits a shorter run.',
      },
      {
        q: 'Is there a stack version?',
        a: 'Yes — Tesa10 + Ipamorelin is in the catalogue, pairing it with a secretagogue the way CJC-1295 is paired with one.',
      },
    ],
    pairsWith: [12, 43, 87],
    meta: {
      title: 'Tesamorelin South Africa | Visceral Fat | STRIATA',
      description:
        'Tesamorelin, the GHRH analogue with clinical data on visceral fat reduction. 5mg R500 and 10mg R1,050 in stock, delivered across South Africa.',
    },
  },

  46: {
    lede: 'Three incretin receptors instead of two — the newest and, on trial data, the most effective compound in this category.',
    about: [
      'Retatrutide is a triple agonist: it acts on the GLP-1, GIP and glucagon receptors at once. Semaglutide works on one of those, tirzepatide on two, and the trial results have followed that progression — each additional receptor has produced larger effects on body weight than the generation before it. Retatrutide is the current end of that line and its phase 2 results were, by some margin, the largest seen in this class.',
      'The glucagon receptor is what makes it structurally different from tirzepatide rather than simply stronger. Glucagon receptor agonism raises energy expenditure, which means Retatrutide is not only suppressing intake the way a pure GLP-1 does — it is acting on both sides of the balance. It is also the newest of the three, with correspondingly less long-term data behind it, which is a real consideration and not a marketing footnote.',
    ],
    researchedFor: [
      {
        title: 'Triple receptor agonism',
        body: 'GLP-1 for satiety and gastric emptying, GIP for insulin sensitivity, glucagon for energy expenditure — the three acting together is the whole design.',
      },
      {
        title: 'Body weight',
        body: 'The phase 2 results were the largest reported in this drug class, which is why Retatrutide commands the price it does despite being the least established.',
      },
      {
        title: 'Metabolic control',
        body: 'Studied for glycaemic endpoints alongside weight, consistent with the rest of the incretin class.',
      },
    ],
    handling:
      'The 30mg vial reconstituted with 3 mL of bacteriostatic water gives 10mg/mL, so a 2mg dose is a 20-unit draw. Retatrutide protocols are titrated upward over weeks rather than started at target dose — gastrointestinal effects are dose-dependent and titration is how the trials managed them. The reconstitution calculator will do the arithmetic for whatever volume you choose. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Retatrutide, tirzepatide or semaglutide?',
        a: 'Broadly, effect size and evidence base run in opposite directions: semaglutide has the longest track record, retatrutide the largest trial results and the least long-term data. The Learn article linked below compares all three.',
      },
      {
        q: 'Why is it the most expensive?',
        a: 'It is the newest compound in the class and the hardest to source at research grade. The 30mg vial at R1,750 is the size most protocols start on.',
      },
      {
        q: 'Do I need to titrate?',
        a: 'The trials titrated upward over weeks, and gastrointestinal effects in this class are dose-dependent. Starting at a target dose is not how the data was generated.',
      },
    ],
    pairsWith: [47, 49, 87],
    meta: {
      title: 'Retatrutide South Africa | 30mg Vial | STRIATA',
      description:
        'Retatrutide, the triple GLP-1/GIP/glucagon agonist with the largest trial results in its class. 30mg in stock at R1,750, shipped across South Africa.',
    },
  },

  47: {
    lede: 'The dual agonist behind Mounjaro, at research-grade pricing — the compound that reset expectations in this category.',
    about: [
      'Tirzepatide acts on two incretin receptors, GLP-1 and GIP. The GLP-1 half is the familiar mechanism: slowed gastric emptying, increased satiety, improved glycaemic control. The GIP half is what tirzepatide added, and adding it produced results in trials that were clearly larger than semaglutide\'s — enough to make it the reference compound in the category almost immediately.',
      'It is the generic equivalent of Mounjaro, and in South Africa the price gap between the branded product and a research-grade vial is the main reason people arrive at this page. The Learn article on tirzepatide in South Africa covers local availability and what the medical aid position actually is, which is usually the other half of the question.',
    ],
    researchedFor: [
      {
        title: 'Dual GIP/GLP-1 agonism',
        body: 'Two incretin receptors rather than one, which is the difference between tirzepatide and semaglutide and the reason the trial results separated.',
      },
      {
        title: 'Weight reduction',
        body: 'The endpoint that made it the reference compound in this class, with a substantial and well-replicated clinical literature behind it.',
      },
      {
        title: 'Blood sugar',
        body: 'Glycaemic control is where the incretin class started, and tirzepatide\'s data on it is as strong as its weight data.',
      },
    ],
    handling:
      'The 30mg vial reconstituted with 3 mL of bacteriostatic water gives 10mg/mL, so a 2.5mg dose is a 25-unit draw. Protocols titrate upward over weeks; gastrointestinal effects in this class track dose closely, and the clinical schedules exist for that reason. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is this the same as Mounjaro?',
        a: 'Same compound, supplied as research-grade lyophilised powder rather than as a branded pre-filled pen. The price difference in South Africa is what brings most people here.',
      },
      {
        q: 'Tirzepatide or retatrutide?',
        a: 'Tirzepatide has the far larger and longer clinical record; retatrutide has the larger trial effect and much less long-term data. The comparison article linked below goes through it.',
      },
      {
        q: 'Is there a pre-filled pen?',
        a: 'Yes — tirzepatide is one of the pre-filled pens on the /pens page if you would rather not reconstitute.',
      },
    ],
    pairsWith: [46, 49, 87],
    meta: {
      title: 'Tirzepatide South Africa | 30mg Vial | STRIATA',
      description:
        'Tirzepatide, the dual GIP/GLP-1 agonist and Mounjaro generic, for weight loss and blood sugar control. 30mg in stock at R1,500, shipped nationwide.',
    },
  },

  49: {
    lede: 'An amylin analogue rather than an incretin — a second appetite pathway, usually run alongside a GLP-1 rather than instead of one.',
    about: [
      'Cagrilintide is a long-acting analogue of amylin, a hormone secreted with insulin that signals satiety through a different route from GLP-1. That difference is the entire reason it exists as a product: because the pathways are separate, the effects add rather than overlap, and the combination of cagrilintide with semaglutide has been the most closely watched pairing in obesity research for several years.',
      'Sold on its own, it is most often bought by people already running a GLP-1 who have reached a plateau. The combination product — cagrisema — is in the catalogue as its own line, but the separate vial gives you control over the ratio, which is why a lot of protocols use it this way instead.',
    ],
    researchedFor: [
      {
        title: 'Amylin signalling',
        body: 'A satiety pathway distinct from GLP-1, which is what makes the two additive rather than redundant when run together.',
      },
      {
        title: 'Appetite suppression',
        body: 'The primary endpoint, and the reason it is most often added to a GLP-1 protocol that has stalled rather than started on its own.',
      },
      {
        title: 'Combination protocols',
        body: 'The cagrilintide plus semaglutide pairing is the most-studied combination in this category; running the vials separately lets you set the ratio.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. Cagrilintide is long-acting, which is what makes weekly dosing schedules practical, and protocols titrate it the same way they titrate a GLP-1. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Cagrilintide or cagrisema?',
        a: 'Cagrisema is cagrilintide and semaglutide pre-combined and is in the catalogue as its own line. Separate vials cost a little more effort and give you control over the ratio.',
      },
      {
        q: 'Can it be run alone?',
        a: 'It can, but most of the research and most of the interest is in the combination, because the two appetite pathways are separate and the effects add.',
      },
    ],
    pairsWith: [47, 46, 87],
    meta: {
      title: 'Cagrilintide 5mg South Africa | STRIATA',
      description:
        'Cagrilintide, the long-acting amylin analogue that complements GLP-1 therapy for appetite suppression. 5mg in stock at R600, shipped nationwide.',
    },
  },

  // ── Brain, Mood & Sleep ──────────────────────────────────────────────

  60: {
    lede: 'A Russian anxiolytic peptide that reduces anxiety without the sedation the word normally implies.',
    about: [
      'Selank is a synthetic analogue of tuftsin, developed at the Russian Academy of Sciences as an anxiolytic that would not sedate, impair or produce dependence — the three things that limit conventional anxiolytics. It has been in clinical use in Russia for years, which gives it an unusual amount of human data for a compound largely unknown elsewhere.',
      'The research describes an effect on anxiety alongside preserved or improved cognitive performance, which is the combination that makes it interesting. It is frequently paired with Semax, the other peptide from the same research programme: Selank for the anxiety and mood side, Semax for focus and memory. The Learn article comparing the two is the most-read piece in our brain category.',
    ],
    researchedFor: [
      {
        title: 'Anxiety',
        body: 'The compound\'s primary indication in Russian clinical use, studied specifically for an anxiolytic effect without sedation.',
      },
      {
        title: 'Mood stability',
        body: 'Researched for mood regulation over a course rather than acutely, which is how the clinical protocols run it.',
      },
      {
        title: 'Cognitive performance',
        body: 'Unusually for an anxiolytic, the research reports preserved or improved cognitive function rather than the impairment the class is known for.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. Selank is also widely used intranasally in research contexts, which is worth knowing because it changes the dosing arithmetic completely; what we supply is the lyophilised vial. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Selank or Semax?',
        a: 'Selank for anxiety and mood, Semax for focus and memory. They came out of the same research programme and are commonly run together. The comparison article linked below covers both properly.',
      },
      {
        q: 'Is it sedating?',
        a: 'The research premise is specifically that it is not — that was the design goal that separated it from conventional anxiolytics.',
      },
    ],
    pairsWith: [61, 85, 62],
    meta: {
      title: 'Selank 5mg South Africa | Anxiolytic Peptide | STRIATA',
      description:
        'Selank, the Russian anxiolytic nootropic researched for anxiety, mood and cognition without sedation. 5mg in stock at R400, shipped nationwide.',
    },
  },

  61: {
    lede: 'An ACTH fragment with the hormonal activity stripped out and the neurological activity kept — the best-known nootropic peptide there is.',
    about: [
      'Semax is derived from ACTH(4-10), a fragment of adrenocorticotropic hormone, modified so that the hormonal effects are gone and what remains acts on the brain. Like Selank it came out of the Russian Academy of Sciences and has been in clinical use there for decades, in contexts ranging from cognitive impairment to stroke recovery.',
      'The research interest that brings people here is narrower than the clinical one: focus, memory consolidation and neuroprotection, mediated in part through BDNF — brain-derived neurotrophic factor, the signalling protein most associated with neuroplasticity. It is the most widely used nootropic peptide and the reference point that Adamax, its modified successor, is measured against.',
    ],
    researchedFor: [
      {
        title: 'Focus and attention',
        body: 'The effect most people are after, and the one that made Semax the default nootropic peptide well before the others arrived.',
      },
      {
        title: 'Memory consolidation',
        body: 'Studied for learning and memory formation rather than recall alone, which is consistent with a BDNF-mediated mechanism.',
      },
      {
        title: 'Neuroprotection',
        body: 'The basis of its Russian clinical use, in contexts including stroke recovery and cognitive decline.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. Semax, like Selank, is commonly used intranasally in research settings; the vial we supply is lyophilised powder for reconstitution. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Semax or Adamax?',
        a: 'Adamax is a modified Semax analogue positioned as the more potent of the two. Semax has by far the longer research and clinical record.',
      },
      {
        q: 'Does it act like a stimulant?',
        a: 'Different mechanism. Semax is studied for BDNF and neuroplasticity rather than for catecholamine release, which is why the research describes it as a nootropic rather than a stimulant.',
      },
    ],
    pairsWith: [60, 85, 68],
    meta: {
      title: 'Semax 5mg South Africa | Nootropic Peptide | STRIATA',
      description:
        'Semax, the ACTH-derived nootropic researched for focus, memory and neuroprotection. 5mg vial in stock at R400, delivered across South Africa.',
    },
  },

  62: {
    lede: 'A peptide named for what it was found doing — inducing delta wave sleep, the deepest stage there is.',
    about: [
      'Delta Sleep-Inducing Peptide was isolated in the 1970s from the blood of sleeping rabbits, and named for the effect it produced: an increase in delta wave activity, the slow-wave stage where physical recovery, growth hormone release and memory consolidation concentrate.',
      'That focus on sleep quality rather than sleep onset is what distinguishes it from most sleep aids. DSIP is not researched as a sedative; the interest is in the architecture of sleep once you are in it, which is why it is usually chosen by people who fall asleep fine but wake unrefreshed. It also has a research interest in circadian regulation more broadly, which is why it appears alongside Epithalon in some protocols.',
    ],
    researchedFor: [
      {
        title: 'Delta wave sleep',
        body: 'The deep, slow-wave stage where physical recovery and growth hormone release concentrate — the stage the compound is named for.',
      },
      {
        title: 'Sleep-wake regulation',
        body: 'Studied for circadian rhythm rather than sedation, which is why it is often paired with Epithalon in longevity protocols.',
      },
      {
        title: 'Recovery',
        body: 'The reason it turns up in athletic protocols: growth hormone release is largest in deep sleep, so sleep quality and recovery are the same conversation.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. DSIP is dosed in the evening for obvious reasons, and protocols typically place it well before bed rather than at it. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is it a sedative?',
        a: 'No. The research interest is in sleep architecture — the depth and structure of sleep — rather than in falling asleep faster.',
      },
      {
        q: 'What is it usually run with?',
        a: 'Epithalon, most often, since both have a circadian research interest. It also appears in recovery protocols alongside the GH secretagogues, because deep sleep is when those matter most.',
      },
    ],
    pairsWith: [23, 12, 40],
    meta: {
      title: 'DSIP 5mg South Africa | Deep Sleep Peptide | STRIATA',
      description:
        'DSIP (Delta Sleep-Inducing Peptide), researched for deep restorative sleep and circadian regulation. 5mg in stock at R350, shipped across South Africa.',
    },
  },

  64: {
    lede: 'A three-amino-acid bioregulator from the pineal gland, aimed at the brain rather than the clock.',
    about: [
      'Pinealon is a short peptide bioregulator — part of the same Russian research tradition that produced Epithalon, and derived from the same gland. Where Epithalon\'s research centres on telomerase and circadian rhythm, Pinealon\'s centres on the brain: cognitive function, neuroprotection and what the literature calls geroprotection, meaning protection against age-related decline rather than against a specific disease.',
      'Peptide bioregulators are a category with a particular research history: developed in the Soviet Union from the 1970s onward, studied over long timescales, and largely unknown outside that tradition until recently. Pinealon is one of the better-documented members of it, and it is usually run in courses the same way Epithalon is.',
    ],
    researchedFor: [
      {
        title: 'Cognitive function',
        body: 'The primary research interest, and what distinguishes Pinealon from the other pineal-derived bioregulators.',
      },
      {
        title: 'Neuroprotection',
        body: 'Studied for protection of neurons against oxidative and hypoxic stress, which is the mechanism underlying the geroprotective framing.',
      },
      {
        title: 'Circadian regulation',
        body: 'A secondary interest it shares with Epithalon, consistent with both being pineal peptides.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. Like the other bioregulators, Pinealon is typically run as a course of consecutive days repeated periodically rather than continuously. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Pinealon or Epithalon?',
        a: 'Both are pineal bioregulators, but the research interests differ — Pinealon for cognition and neuroprotection, Epithalon for telomerase and circadian rhythm. Longevity protocols often run both.',
      },
      {
        q: 'What is a bioregulator?',
        a: 'A class of very short peptides developed in Soviet research from the 1970s, studied for their effect on the tissue they were derived from. Cortagen, Cardiogen and Bronchogen in the catalogue are from the same family.',
      },
    ],
    pairsWith: [23, 61, 68],
    meta: {
      title: 'Pinealon 10mg South Africa | Bioregulator | STRIATA',
      description:
        'Pinealon, the pineal bioregulator researched for cognitive function and neuroprotection. 10mg vial in stock at R400, delivered across South Africa.',
    },
  },

  68: {
    lede: 'Not a peptide at all — the coenzyme every cell needs to make energy, supplied in a 500mg vial.',
    about: [
      'NAD+ is a coenzyme present in every cell, required for the reactions that turn food into usable energy and for the DNA repair enzymes that keep genomes intact. Its levels fall substantially with age, and that decline is one of the most consistently reproduced findings in ageing biology — which is why NAD+ has become a cornerstone of longevity protocols rather than a niche interest.',
      'Injectable NAD+ exists for the same reason injectable glutathione does: the oral route is inefficient. Oral NAD+ is largely broken down before absorption, which is why most oral products supply precursors like NMN or NR instead and hope the body converts them. A 500mg vial supplies the molecule itself. It is one of two catalogue items with a 10 mL reconstitution allowance, because at 500mg a standard volume would be unusable.',
    ],
    researchedFor: [
      {
        title: 'Cellular energy',
        body: 'NAD+ is required for the reactions that generate ATP; the age-related decline in it is the clearest link between the molecule and how ageing feels.',
      },
      {
        title: 'DNA repair',
        body: 'The PARP enzymes that repair DNA damage consume NAD+ directly, which is one of the mechanisms behind the longevity interest.',
      },
      {
        title: 'Cognitive clarity',
        body: 'A substantial research interest in its own right — covered in a separate Learn article on NAD+ and brain health.',
      },
      {
        title: 'Healthy ageing',
        body: 'The sirtuins, the enzyme family most associated with longevity signalling, are NAD+-dependent. That dependency is why NAD+ anchors most longevity stacks.',
      },
    ],
    handling:
      'NAD+ is the other 10 mL exception alongside glutathione: 500mg in the usual 3 mL would be impractically concentrated. Reconstituted with 10 mL of bacteriostatic water it gives 50mg/mL. The reconstitution calculator applies the higher limit automatically when you select it. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Why injectable rather than oral?',
        a: 'Oral NAD+ is largely degraded before it is absorbed, which is why oral products usually supply precursors instead. The vial supplies the molecule itself.',
      },
      {
        q: 'How much water does it need?',
        a: 'Up to 10 mL rather than the usual 3 mL maximum — 500mg is a lot of material. The calculator has that rule built in.',
      },
      {
        q: 'What is it usually stacked with?',
        a: 'Glutathione and the bioregulators most often. NAD+ and glutathione are the two large-volume items in the catalogue and are frequently run together.',
      },
    ],
    pairsWith: [28, 23, 64],
    meta: {
      title: 'NAD+ 500mg Injection South Africa | STRIATA',
      description:
        'Injectable NAD+, the coenzyme central to cellular energy, DNA repair and healthy ageing. 500mg vial in stock at R400, shipped across South Africa.',
    },
  },

  85: {
    lede: 'A structurally modified Semax built for higher potency — the newer end of the nootropic peptide range.',
    about: [
      'Adamax is a Semax analogue with a modified structure intended to increase potency and stability. It belongs to the same lineage — ACTH-derived peptides acting on BDNF and neuroplasticity rather than on catecholamines — but it is a newer compound, positioned as the stronger option for people who already know how they respond to Semax.',
      'The research interest covers the same ground: focus, memory, neuroplasticity, and stress resilience. What is different is the amount of literature behind it. Semax has decades of Russian clinical use; Adamax does not, and anyone choosing between them should weigh a potentially stronger effect against a considerably thinner evidence base.',
    ],
    researchedFor: [
      {
        title: 'Focus and memory',
        body: 'The same endpoints Semax is studied for, with the structural modification intended to produce them at lower doses.',
      },
      {
        title: 'Neuroplasticity',
        body: 'BDNF-mediated, as with Semax — the signalling protein most associated with the brain\'s capacity to form new connections.',
      },
      {
        title: 'Stress resilience',
        body: 'Researched for adaptation to cognitive and physical stress, which is where the ACTH-derived lineage shows most clearly.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. Because Adamax is positioned as more potent than Semax, protocols generally start lower than a Semax-equivalent dose rather than matching it. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Should I start with Semax or Adamax?',
        a: 'Semax, if this is new territory — it has decades of clinical use behind it. Adamax is the option for people who already know how they respond and want something stronger.',
      },
      {
        q: 'Can they be run together?',
        a: 'They act on the same pathway, so most protocols treat them as alternatives rather than as a stack.',
      },
    ],
    pairsWith: [61, 60, 68],
    meta: {
      title: 'Adamax 10mg | Semax Analogue | STRIATA South Africa',
      description:
        'Adamax, the next-generation Semax analogue researched for focus, memory and neuroplasticity. 10mg in stock at R680, delivered across South Africa.',
    },
  },

  // ── Immunity & Longevity ─────────────────────────────────────────────

  71: {
    lede: 'A thymus-derived peptide that tunes the immune response rather than simply amplifying it.',
    about: [
      'Thymosin Alpha-1 is a 28-amino-acid peptide produced by the thymus, the gland that trains T-cells and that atrophies steadily from adolescence onward. It is one of the most clinically established compounds in this catalogue: it is approved in a number of countries as an immune modulator and has been used clinically for decades, particularly in chronic viral infection and as a vaccine adjuvant.',
      'The word to hold onto is modulator. It is studied for activating T-cells and dendritic cells and for restoring balance to an immune response, not for stimulating the immune system indiscriminately — which matters, because indiscriminate stimulation is the last thing you want in a system that can overreact. That distinction is why it appears in protocols for chronic immune problems rather than as a seasonal supplement.',
    ],
    researchedFor: [
      {
        title: 'T-cell activation',
        body: 'The core mechanism: maturation and activation of T-cells, the function the thymus itself performs and loses with age.',
      },
      {
        title: 'Immune modulation',
        body: 'Restoring balance rather than amplifying response, which is the distinction that makes it suitable for chronic rather than acute use.',
      },
      {
        title: 'Chronic infection',
        body: 'Where most of the clinical literature sits, alongside its use as a vaccine adjuvant.',
      },
    ],
    handling:
      'The 10mg vial with 2 mL of bacteriostatic water gives 5mg/mL. Thymosin Alpha-1 protocols are usually measured in weeks rather than days, so the 10mg vial is the practical size for a full course. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'Is it the same as Thymalin?',
        a: 'No. Both are thymus-derived and both are in the catalogue, but Thymalin is a peptide bioregulator extract while Thymosin Alpha-1 is a defined 28-amino-acid sequence with a much larger clinical literature.',
      },
      {
        q: 'Which size should I get?',
        a: '10mg at R1,040 is in stock and is the size a full course runs through. 5mg is available on request.',
      },
    ],
    pairsWith: [73, 68, 87],
    meta: {
      title: 'Thymosin Alpha-1 South Africa | STRIATA',
      description:
        'Thymosin Alpha-1, the thymus peptide researched for T-cell activation and immune modulation. 10mg in stock at R1,040, shipped across South Africa.',
    },
  },

  73: {
    lede: 'A neuropeptide that does three unrelated jobs — anti-inflammatory, bronchodilator and immune regulator — and is researched for all of them.',
    about: [
      'Vasoactive Intestinal Peptide was first identified in the gut, which is where its name comes from, but it is found throughout the body and functions as a neuropeptide and a hormone at once. Its receptors sit on immune cells, in the lungs, in the gut and in the brain, which is why its research profile is so much broader than most compounds here.',
      'The research interests that bring people to it are usually the anti-inflammatory and immunoregulatory ones, particularly in chronic inflammatory conditions. The bronchodilatory and pulmonary interest is a distinct strand of the same literature. It is one of the more specialised products in the catalogue and it tends to be bought for a specific reason rather than as part of a general protocol.',
    ],
    researchedFor: [
      {
        title: 'Anti-inflammatory action',
        body: 'Studied as an endogenous regulator of inflammatory response, with receptors on the immune cells that drive it.',
      },
      {
        title: 'Immune regulation',
        body: 'A modulating rather than stimulating role, which places it alongside Thymosin Alpha-1 rather than alongside a general immune supplement.',
      },
      {
        title: 'Pulmonary research',
        body: 'The bronchodilatory strand of the VIP literature, distinct from its immune work and a common reason people seek it out.',
      },
    ],
    handling:
      'The 5mg vial with 2 mL of bacteriostatic water gives 2.5mg/mL. VIP has a short half-life, and it is one of the peptides also researched by intranasal route for that reason; the vial we supply is lyophilised powder. ' +
      STORAGE_SA,
    faqs: [
      {
        q: 'VIP or Thymosin Alpha-1?',
        a: 'Different questions. Thymosin Alpha-1 is about T-cell function and immune competence; VIP is about regulating inflammatory response. Some protocols include both.',
      },
      {
        q: 'Why is it in the immunity category?',
        a: 'Its immunoregulatory research is the largest strand, though the compound also has substantial anti-inflammatory and pulmonary literature.',
      },
    ],
    pairsWith: [71, 19, 87],
    meta: {
      title: 'VIP Peptide 5mg South Africa | STRIATA',
      description:
        'VIP (Vasoactive Intestinal Peptide), researched for anti-inflammatory, immunomodulatory and bronchodilatory effects. 5mg at R550, in stock.',
    },
  },

  // ── Reconstitution Supplies ──────────────────────────────────────────

  87: {
    lede: 'The other half of every vial on this site — sterile water with a preservative, so one vial can be drawn from more than once.',
    about: [
      'Every lyophilised peptide in the catalogue arrives as a dry powder and has to be reconstituted before it can be drawn. Bacteriostatic water is what you reconstitute it with: sterile water containing 0.9% benzyl alcohol, a preservative that inhibits bacterial growth so the vial can be punctured repeatedly over weeks instead of being discarded after one use.',
      'That preservative is the whole difference between bacteriostatic and plain sterile water. Sterile water is single-use — nothing stops bacteria growing in it once the seal is broken. Since almost every peptide protocol involves drawing from the same vial many times, bacteriostatic is the correct choice, and running out of it is the most common reason an order gets held up.',
    ],
    researchedFor: [
      {
        title: 'Multi-dose vials',
        body: 'The benzyl alcohol preservative is what makes drawing from the same vial over several weeks possible rather than single-use.',
      },
      {
        title: 'Every reconstitution',
        body: 'The default solvent for lyophilised peptides. A handful of poorly soluble compounds need acetic acid instead, which is the other line in this category.',
      },
      {
        title: 'Shelf life once mixed',
        body: 'A reconstituted vial kept refrigerated is generally treated as good for about four weeks, and it is the preservative that sets that window.',
      },
    ],
    handling:
      'Buy more than you think you need — this is the item people run out of. The 3 mL vial matches the standard maximum reconstitution volume for a single peptide vial; the 10 mL is the practical choice if you are running several products, or NAD+ or glutathione, which both take up to 10 mL on their own. Store at room temperature, out of direct sun.',
    faqs: [
      {
        q: 'Bacteriostatic or sterile water?',
        a: 'Bacteriostatic, for anything you will draw from more than once. The benzyl alcohol preservative is what allows repeated punctures; plain sterile water has no preservative and is single-use.',
      },
      {
        q: '3 mL or 10 mL?',
        a: '3 mL covers one standard peptide vial. Take the 10 mL if you are reconstituting several products, or NAD+ or glutathione — each of those can take the full 10 mL on its own.',
      },
      {
        q: 'How much do I need per vial?',
        a: 'That depends on the peptide and the dose you want per unit. The reconstitution calculator works it out for any vial in the catalogue.',
      },
      {
        q: 'When is acetic acid used instead?',
        a: 'For peptides that dissolve poorly in bacteriostatic water. Acetic Acid 0.6% is in the catalogue for those; most compounds do not need it.',
      },
    ],
    pairsWith: [88, 46, 3],
    meta: {
      title: 'Bacteriostatic Water South Africa | 3ml & 10ml | STRIATA',
      description:
        'Sterile bacteriostatic water with 0.9% benzyl alcohol for reconstituting peptides. 3 ml R90 and 10 ml R150, delivered across South Africa.',
    },
  },
}

export const contentFor = (product) => PRODUCT_CONTENT[product.id] ?? null
