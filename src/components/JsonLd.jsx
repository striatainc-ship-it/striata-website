// Renders a JSON-LD structured-data block as a plain DOM script.
// Kept OUT of react-helmet-async: Helmet mishandles multiple <script> children
// (it drops the title/canonical). Google reads ld+json from anywhere in the
// document, so rendering it in the body is fully valid.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
