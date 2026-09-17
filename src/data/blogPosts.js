import peptideGuidesMd from './blog/striata_peptide_guides.md?raw'
import weightLossMd from './blog/striata_weightloss_articles.md?raw'
import recoveryMd from './blog/striata_recovery_articles.md?raw'
import antiAgingMd from './blog/striata_antiaging_articles.md?raw'
import brainMoodMd from './blog/striata_brain_mood_articles.md?raw'
import hormonalMd from './blog/striata_hormonal_health_articles.md?raw'
import saTargetedMd from './blog/striata_sa_targeted_articles.md?raw'
import saTargeted2Md from './blog/striata_sa_targeted_articles_2.md?raw'

// The Learn library went live on 1 April 2026, which is the default date for
// the articles published with it. A post written later declares its own
// `**Published:** 2026-09-17`, and one revised after publication declares
// `**Updated:** 2026-05-14`; those are shown in the byline and emitted as
// datePublished / dateModified. Absent both, the two dates match the default.
const PUBLISHED = '2026-04-01'

function parseArticles(md) {
  md = md.replace(/\r\n/g, '\n')
  const blocks = md.split(/(?=^# Article \d+:)/m).filter(b => /^# Article \d+:/.test(b.trim()))

  return blocks.map(block => {
    block = block.trim()

    const metaEndIdx = block.search(/^---$/m)
    if (metaEndIdx === -1) return null

    const metaBlock = block.slice(0, metaEndIdx).trim()
    let contentBlock = block.slice(metaEndIdx).trim()

    contentBlock = contentBlock.replace(/^---\n?/, '').trim()
    contentBlock = contentBlock.replace(/\n---\n---\s*$/, '').trim()
    contentBlock = contentBlock.replace(/\n---\s*$/, '').trim()

    // Strip the duplicate main heading (## ...) at the start of content
    contentBlock = contentBlock.replace(/^## [^\n]+\n\n/, '')

    const titleMatch = metaBlock.match(/^# Article \d+: (.+)$/m)
    const metaDescMatch = metaBlock.match(/\*\*Meta description:\*\* (.+)$/m)
    const slugMatch = metaBlock.match(/\*\*Slug:\*\* \/learn\/(.+)$/m)
    const categoryMatch = metaBlock.match(/\*\*Category:\*\* (.+)$/m)
    const readTimeMatch = metaBlock.match(/\*\*Read time:\*\* (.+)$/m)
    const publishedMatch = metaBlock.match(/\*\*Published:\*\* (\d{4}-\d{2}-\d{2})/m)
    const updatedMatch = metaBlock.match(/\*\*Updated:\*\* (\d{4}-\d{2}-\d{2})/m)
    const published = publishedMatch?.[1] || PUBLISHED

    return {
      slug: slugMatch?.[1]?.trim() || '',
      title: titleMatch?.[1]?.trim() || '',
      category: categoryMatch?.[1]?.trim() || '',
      readTime: readTimeMatch?.[1]?.trim() || '',
      preview: metaDescMatch?.[1]?.trim() || '',
      datePublished: published,
      dateModified: updatedMatch?.[1] || published,
      content: contentBlock,
      featured: false,
    }
  }).filter(Boolean)
}

const allArticles = [
  ...parseArticles(peptideGuidesMd),
  ...parseArticles(weightLossMd),
  ...parseArticles(recoveryMd),
  ...parseArticles(antiAgingMd),
  ...parseArticles(brainMoodMd),
  ...parseArticles(hormonalMd),
  ...parseArticles(saTargetedMd),
  ...parseArticles(saTargeted2Md),
]

if (allArticles.length > 0) allArticles[0].featured = true

export const blogPosts = allArticles

export const getBlogPost = (slug) => allArticles.find(a => a.slug === slug)

export const blogCategories = [
  { key: 'all', label: 'All' },
  { key: 'Peptide Guides', label: 'Peptide Guides' },
  { key: 'Weight Loss', label: 'Weight Loss' },
  { key: 'Recovery', label: 'Recovery' },
  { key: 'Anti-Aging', label: 'Anti-Aging' },
  { key: 'Brain & Mood', label: 'Brain & Mood' },
  { key: 'Hormonal Health', label: 'Hormonal Health' },
]
