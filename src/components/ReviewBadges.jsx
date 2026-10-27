import { useEffect, useRef } from 'react'

/**
 * "Review us" buttons for Trustpilot and Google, side by side and the same
 * size. Trustpilot's is their Review Collector TrustBox; Google's is our own
 * button in the same style, linking straight to the write-a-review dialog of
 * the Google Business Profile.
 *
 * Trustpilot's script only loads once a badge comes near the viewport, so it
 * costs nothing on pages where nobody scrolls that far. Until it loads (and in
 * the prerendered HTML) the TrustBox shows a plain link styled like the real
 * button. No ratings go into structured data: Google ignores review markup a
 * business publishes about itself.
 */

export const TRUSTPILOT_URL = 'https://www.trustpilot.com/review/striatalabs.co.za'
// placeid of the Striata Labs Business Profile (cid 12845544918200623913).
export const GOOGLE_WRITE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ3dPhtywTlR4RKSOsYwuLRLI'

const TRUSTPILOT_SCRIPT = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
// Trustpilot's widget draws its button in Helvetica with 4px corners; the
// Google button and the fallback copy that so the pair look like a set.
const BUTTON_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const STAR ='<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path fill="#00B67A" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'

// Trustpilot's snippet as given, with the fallback link dressed as the button.
// Rendered through innerHTML so React never touches what the script puts inside.
const TRUSTBOX = `<div class="trustpilot-widget" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="6adf272f612465cdc9f1b2d0" data-style-height="52px" data-style-width="100%"><a href="${TRUSTPILOT_URL}" target="_blank" rel="noopener" class="mx-auto mt-px flex w-fit h-[36px] px-2.5 items-center gap-1 rounded-[4px] border border-[#21533f] bg-white text-[15px] text-[#191919]" style="font-family:${BUTTON_FONT}">Review us on ${STAR}<span class="font-bold">Trustpilot</span></a></div>`

let scriptPromise
function loadTrustpilot() {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = TRUSTPILOT_SCRIPT
    script.async = true
    script.onload = resolve
    script.onerror = () => {
      scriptPromise = undefined
      reject(new Error('Trustpilot script failed to load'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

function TrustBox() {
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadTrustpilot()
          .then(() => {
            // On first load the script fills every TrustBox on the page by
            // itself; after a client-side navigation it needs telling.
            const widget = host.querySelector('.trustpilot-widget')
            if (widget && !widget.querySelector('iframe')) window.Trustpilot?.loadFromElement(widget)
          })
          .catch(() => {}) // the fallback link stays, which still works
      },
      { rootMargin: '300px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  // Trustpilot only draws its one-line button in a frame about 250px wide, and
  // centres a ~181px button in it (measured 2026-10-27), top-aligned in the 52px height. The
  // negative margins take back that empty space so the gap to the Google
  // button looks like the row's gap.
  return <div ref={ref} className="w-[250px] h-[52px] -mx-[34px]" dangerouslySetInnerHTML={{ __html: TRUSTBOX }} />
}

function GoogleButton() {
  return (
    <a
      href={GOOGLE_WRITE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-px h-[36px] px-2.5 flex items-center gap-1.5 rounded-[4px] border border-[#21533f] bg-white text-[15px] text-[#191919] hover:bg-[#f6f8fa] transition-colors"
      style={{ fontFamily: BUTTON_FONT }}
    >
      Review us on
      <svg aria-hidden="true" viewBox="0 0 48 48" width="18" height="18">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      <span className="font-bold">Google</span>
    </a>
  )
}

export default function ReviewBadges({ className = '' }) {
  return (
    // Google first: Trustpilot's frame is wider than its button, and that
    // slack is least visible at the end of the row.
    <div className={`flex flex-wrap items-start gap-3 ${className}`}>
      <GoogleButton />
      <TrustBox />
    </div>
  )
}
