/**
 * The tools listed on /tools. Add an entry here and register its page in
 * routeLoaders.js and entry-server.jsx; the hub, sitemap and prerender pick
 * it up from there.
 *
 *   href    where the card links (a tool may live outside /tools, like /quiz)
 *   icon    key into the icon map in pages/Tools.jsx
 *   cta     button label on the card
 */
export const tools = [
  {
    slug: 'protocol-quiz',
    href: '/quiz',
    icon: 'quiz',
    title: 'Which Protocol Is Right For You?',
    tagline: 'Sixty-second quiz',
    preview:
      'Four quick questions about your goal, how you prefer to dose and your experience, then an immediate match to the STRIATA stack or peptide people most commonly choose for that, with links to the product and the reading behind it.',
    highlights: [
      'Matches to one of 30 protocols and peptides from the live catalogue',
      'Accounts for vial, pre-filled pen or topical preference',
      'Results show immediately, no sign-up needed',
      'Every result has its own shareable page',
    ],
    cta: 'Start the quiz',
  },
  {
    slug: 'reconstitution-calculator',
    href: '/tools/reconstitution-calculator',
    icon: 'calculator',
    title: 'Peptide Reconstitution Calculator',
    tagline: 'From vial to syringe in seconds',
    preview:
      'Pick your peptide and vial size, enter the bacteriostatic water you are adding, and get the concentration plus the exact mL and insulin-syringe units to draw for any dose.',
    highlights: [
      'Every STRIATA vial size pre-loaded, or type your own',
      'Live mg/mL and mcg/mL concentration',
      'U-100 and U-40 syringe units, rounded to the half-unit',
      'Quick-reference table for common doses',
    ],
    cta: 'Open the calculator',
    relatedGuide: 'peptide-reconstitution-dosage-calculator',
  },
]

export const getTool = (slug) => tools.find(t => t.slug === slug)
