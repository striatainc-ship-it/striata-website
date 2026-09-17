// Site-wide facts shared by page metadata, structured data and bylines.

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
