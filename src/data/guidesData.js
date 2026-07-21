import reconstitutionMd from './guides/peptide-reconstitution-dosage-calculator.md?raw'
import bloodworkMd from './guides/peptide-bloodwork-guide.md?raw'

// Parse a single guide markdown file with YAML-style frontmatter.
function parseGuide(md) {
  md = md.replace(/\r\n/g, '\n')

  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/)
  const meta = {}
  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const idx = line.indexOf(':')
      if (idx === -1) return
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
      meta[key] = val
    })
  }

  let content = fmMatch ? md.slice(fmMatch[0].length) : md
  content = content.trim()
  // Drop the leading H1 — the title is rendered from frontmatter in the header.
  content = content.replace(/^#\s+.+\n+/, '').trim()

  return {
    slug: meta.slug || '',
    title: meta.title || '',
    preview: meta.meta_description || '',
    category: meta.category || 'Guide',
    readTime: meta.read_time || '',
    content,
  }
}

export const guides = [
  parseGuide(reconstitutionMd),
  parseGuide(bloodworkMd),
]

export const getGuide = (slug) => guides.find(g => g.slug === slug)
