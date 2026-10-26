// Site-wide facts shared by page metadata, structured data and bylines.

import { DELIVERY_OPTIONS, COLD_CHAIN } from '../lib/cart'

export const SITE_URL = 'https://www.striatalabs.co.za'

/** Fallback image for Article/OG when a page has no image of its own. */
export const DEFAULT_IMAGE = `${SITE_URL}/assets/opt/og-image.jpg`

/** Every Learn post and Guide is written by the founder. */
export const AUTHOR = {
  name: 'James Kriel',
  jobTitle: 'Founder',
  role: 'Founder, STRIATA',
  initials: 'JK',
  url: `${SITE_URL}/about#founder`,
  bio: 'James founded STRIATA in Johannesburg in 2021 to give South Africans a transparent, research-grade peptide source, and writes the Learn and Guides library.',
}

/** schema.org Person for Article.author. */
export const AUTHOR_SCHEMA = {
  '@type': 'Person',
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: AUTHOR.url,
  worksFor: { '@type': 'Organization', name: 'STRIATA', url: SITE_URL },
}

/**
 * Pull the reference list out of an article's markdown "Sources" section.
 *
 * The sources live in the markdown so writers edit them in one place; this
 * lifts them into `citation` on the Article schema as well, so the references
 * are machine-readable to search engines and AI answer engines rather than
 * only being visible to a human reader.
 */
export function parseSources(content) {
  if (!content) return []
  const block = content.split(/^#{2,3} Sources\s*$/m)[1]
  if (!block) return []
  return [...block.matchAll(/^- (.+?) \[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\.\s*(.*?)\.?\s*$/gm)].map(
    ([, authors, name, url, publication]) => ({ authors, name, url, publication }),
  )
}

/** schema.org citation entries for an article's reference list. */
export function citationSchema(content) {
  return parseSources(content).map(s => ({
    '@type': 'CreativeWork',
    name: s.name,
    url: s.url,
    ...(s.publication ? { publication: s.publication } : {}),
  }))
}

/** "2026-04-01" -> "1 April 2026". UTC so server and client agree. */
export function formatDate(iso) {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Dispatch days from the order-processing SOP (2026-10-26): vials and serums
// ship Monday to Friday, pens and nasal sprays Monday to Thursday.
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const MON_FRI = WEEKDAYS
const MON_THU = WEEKDAYS.slice(0, 4)

// Transit in business days after dispatch, as the Legal page states it:
// standard 2-3, express and cold-chain 1-3.
const TRANSIT = { standard: [2, 3], express: [1, 3] }

const days = ([min, max]) => ({ '@type': 'QuantitativeValue', minValue: min, maxValue: max, unitCode: 'DAY' })

const shippingTo = (price, transit, shipDays) => ({
  '@type': 'OfferShippingDetails',
  shippingRate: { '@type': 'MonetaryAmount', value: price, currency: 'ZAR' },
  shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'ZA' },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    businessDays: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: shipDays.map((d) => `https://schema.org/${d}`),
    },
    // Paid orders go out on the next shipping day.
    handlingTime: days([1, 1]),
    transitTime: days(transit),
  },
})

/**
 * Delivery and returns on every Offer, as the Legal page states them: flat
 * standard or express delivery nationwide (cold-chain for pens), and no
 * returns once an order is dispatched (sections 4.1–4.3 and 5.1). Rates come
 * from the order slip's table so the two cannot drift apart. `spray` uses the
 * pens' Monday-to-Thursday dispatch days but the normal delivery options.
 */
export function offerTerms({ pen = false, spray = false } = {}) {
  const shipDays = pen || spray ? MON_THU : MON_FRI
  return {
    shippingDetails: pen
      ? [shippingTo(COLD_CHAIN.price, TRANSIT.express, shipDays)]
      : [
          shippingTo(DELIVERY_OPTIONS.standard.price, TRANSIT.standard, shipDays),
          shippingTo(DELIVERY_OPTIONS.express.price, TRANSIT.express, shipDays),
        ],
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'ZA',
      returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      merchantReturnLink: `${SITE_URL}/legal#refunds`,
    },
  }
}
