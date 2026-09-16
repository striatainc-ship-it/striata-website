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
