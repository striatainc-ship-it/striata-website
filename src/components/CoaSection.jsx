import Reveal from './Reveal'
import { COA_TESTING, LABS, coaFull, coaThumb } from '../data/productCoas'

const H = { fontFamily: 'var(--font-heading)' }

const usd = (n) => `US$${n}`

function VerifyLine({ coa, lab }) {
  if (coa.verifyKey && lab.verify) {
    return (
      <>
        Check it at{' '}
        <a href={lab.verify} target="_blank" rel="noopener noreferrer" className="text-[#00B4B4] hover:text-white transition-colors">
          janoshik.com/verify
        </a>{' '}
        with key <span className="font-mono text-white/80">{coa.verifyKey}</span>.
      </>
    )
  }
  if (coa.lab === 'freedom') {
    return (
      <>
        Search {coa.reportNo.replace('Accession ', 'accession number ')} at{' '}
        <a href={lab.verify} target="_blank" rel="noopener noreferrer" className="text-[#00B4B4] hover:text-white transition-colors">
          FreedomDiagnosticsTesting.com
        </a>
        .
      </>
    )
  }
  if (coa.lab === 'testides') return 'Scan the tamper-proof QR code on the certificate to look it up on testides.com.'
  return null
}

/**
 * The product's latest certificate, shown as the lab issued it, followed by
 * the note on how the testing is shared. The note is the disclosure that makes
 * a certificate naming another company honest to publish; keep it with the
 * certificate, never on a separate page.
 */
export default function CoaSection({ product, coa }) {
  const lab = LABS[coa.lab]
  const pooled = coa.kind === 'pooled'
  const verify = <VerifyLine coa={coa} lab={lab} />

  const rows = [
    { label: 'Report', value: coa.reportNo },
    { label: 'Sample tested', value: coa.sample },
    ...(coa.client ? [{ label: 'Client on report', value: coa.client }] : []),
    { label: 'Method', value: coa.method },
    ...coa.results,
  ]

  return (
    <section className="px-6 py-16 border-t border-white/5">
      <Reveal className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3" style={H}>
          Certificate of analysis
        </h2>
        <p className="text-white/40 text-sm mb-8">
          {pooled ? 'Independent lab test' : 'Manufacturer’s raw-material certificate'} ·{' '}
          <span className="text-white/70">{lab.name}</span>, {coa.date}
        </p>

        <div className="grid md:grid-cols-[minmax(0,300px)_1fr] gap-8 items-start">
          <div className={`grid gap-3 w-full max-w-sm md:max-w-none ${coa.images.length > 1 ? 'grid-cols-2 md:grid-cols-1' : ''}`}>
            {coa.images.map((img) => (
              <figure key={img.name}>
                <a
                  href={coaFull(img.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl overflow-hidden border border-white/10 hover:border-[#00B4B4]/60 transition-colors"
                >
                  <img
                    src={coaThumb(img.name)}
                    alt={`${product.name} ${img.caption?.toLowerCase() ?? 'certificate of analysis'} from ${lab.name}, ${coa.date}`}
                    width={480}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[3/4] object-contain object-top"
                  />
                </a>
                <figcaption className="mt-2 text-white/35 text-xs">
                  {img.caption ? `${img.caption} · ` : ''}Tap to open full size
                </figcaption>
              </figure>
            ))}
          </div>

          <div>
            <dl className="rounded-2xl border border-white/8 overflow-hidden">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4 px-5 py-3.5 ${i % 2 ? 'bg-white/[0.02]' : 'bg-[#0d1e35]'}`}
                >
                  <dt className="text-white/45 text-xs font-semibold uppercase tracking-widest sm:pt-0.5">{row.label}</dt>
                  <dd className="text-white/75 text-sm leading-relaxed break-words">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-white/45 text-sm leading-relaxed">
              {pooled
                ? 'Results apply to the sample the lab tested. '
                : 'This is the factory’s own release certificate for the raw peptide powder, issued before it was filled into vials. '}
              {verify}
            </p>
          </div>
        </div>

        {/* ── How the testing is shared (the disclaimer) ── */}
        <div className="mt-10 rounded-2xl border border-[#00B4B4]/20 bg-[#00B4B4]/[0.04] p-6 md:p-8">
          <h3 className="text-white font-bold text-lg mb-4" style={H}>
            How our batches are tested
          </h3>
          <div className="grid lg:grid-cols-[1fr_minmax(0,320px)] gap-8">
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>
                Demand for peptides has grown quickly, and the factories that make them now run batches far more
                often than they used to. When batches were large and infrequent, we could test each one ourselves.
                At today&rsquo;s pace that stopped being practical: independent testing is priced per sample, per
                compound, in US dollars.
              </p>
              <p>
                So we share it. STRIATA is one of a group of companies across South Africa that buy from the same
                factory, and together we split the cost of independent lab testing. Each test is paid for once and
                shared by everyone who buys from that factory, which lets the testing keep pace with the batches.
              </p>
              <p>
                That is why the client named on a certificate may be another company, and why the vial in a
                lab&rsquo;s photo may carry another brand&rsquo;s label: the report names whoever sent that sample
                in. We publish every certificate exactly as the lab issued it, unedited. If you have a question
                about a certificate, ask us on WhatsApp.
              </p>
            </div>

            <div>
              <p className="text-white/45 text-xs font-semibold uppercase tracking-widest mb-3">
                What one test costs at {COA_TESTING.lab}
              </p>
              <ul className="rounded-xl border border-white/8 divide-y divide-white/5 text-sm">
                {COA_TESTING.prices.map((p) => (
                  <li key={p.test} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                    <span className="text-white/60">{p.test}</span>
                    <span className="text-white font-semibold tabular-nums whitespace-nowrap">
                      {p.addOn ? '+' : ''}
                      {usd(p.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-white/30 text-xs leading-relaxed">
                Per sample, from{' '}
                <a href={COA_TESTING.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/60">
                  Janoshik&rsquo;s published price list
                </a>
                , checked {COA_TESTING.checkedOn}.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
