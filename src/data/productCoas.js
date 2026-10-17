/**
 * The latest certificate of analysis for each product page, keyed by product id.
 *
 * Every figure here is copied from the certificate it belongs to; the scans
 * themselves are in ../CoAs/ (OneDrive) and go through `npm run coas`. When a
 * newer certificate arrives, replace the entry rather than adding beside it.
 *
 * `kind` decides how the page labels it:
 *   'pooled' — an independent lab test commissioned by one of the companies
 *              that buy from the same factory we do (see COA_TESTING). The
 *              client named on it may be that company, not STRIATA.
 *   'raw'    — the factory's own release certificate for the bulk powder,
 *              before it was filled into vials.
 *
 * `client` is what the certificate prints, including when the lab or the
 * sender blurred it; never tidy it up.
 */

export const COA_TESTING = {
  // Janoshik's published prices, read from janoshik.com/pricelist/<test>/ on this date.
  checkedOn: '17 October 2026',
  lab: 'Janoshik Analytical',
  url: 'https://janoshik.com/pricelist/bpc-157-analysis/',
  prices: [
    { test: 'BPC-157 or TB-500', price: 215 },
    { test: 'GHK-Cu, Semax, Selank or Epithalon', price: 290 },
    { test: 'Two-peptide blend (BPC-157/TB-500, CJC/Ipamorelin)', price: 320 },
    { test: 'GLP-1 test (semaglutide, tirzepatide, retatrutide)', price: 360 },
    { test: 'NAD+', price: 450 },
    { test: 'KLOW four-peptide blend', price: 800 },
    { test: 'Endotoxin screen, added to any test', price: 180, addOn: true },
  ],
}

export const LABS = {
  janoshik: { name: 'Janoshik Analytical', place: 'Prague, Czech Republic', verify: 'https://janoshik.com/verify/' },
  testides: { name: 'Testides', place: 'North America' },
  freedom: { name: 'Freedom Diagnostics', place: 'United States', verify: 'https://freedomdiagnosticstesting.com/' },
  nst: { name: 'North South Precision Testing (NST)', place: 'Shenzhen, China' },
  tsurgex: { name: 'Hangzhou TSurgeX Pharmaceutical Technology', place: 'Hangzhou, China' },
}

const productCoas = {
  // BPC+TB Wolverine Stack
  3: {
    kind: 'pooled',
    lab: 'testides',
    reportNo: 'AMU-BPCTB-30-041626',
    date: '20 April 2026',
    sample: 'BPC-157/TB-500 blend, 30 mg expected',
    client: 'Regenisis',
    method: 'HPLC-UV, 214 nm',
    results: [
      { label: 'Purity', value: '99.78%' },
      { label: 'Total content', value: '35.91 mg (119.7% of label)' },
      { label: 'BPC-157', value: '17.72 mg' },
      { label: 'TB-500', value: '18.19 mg' },
    ],
    images: [{ name: 'bpc-157-tb-500-wolverine-stack-2026-04-20' }],
  },

  // CJC-1295 + Ipamorelin Stack
  12: {
    kind: 'pooled',
    lab: 'testides',
    reportNo: 'MG1-CJCI-10-032926',
    date: '5 April 2026',
    sample: 'CJC-1295/Ipamorelin blend, 10 mg expected (lot 2026001)',
    client: 'Prometheus',
    method: 'HPLC-UV, 214 nm',
    results: [
      { label: 'Purity', value: '99.70%' },
      { label: 'Total content', value: '12.42 mg (124.2% of label)' },
      { label: 'Ipamorelin', value: '6.46 mg' },
      { label: 'CJC-1295', value: '5.96 mg' },
    ],
    images: [{ name: 'cjc-1295-ipamorelin-2026-04-05' }],
  },

  // GLOW Stack
  15: {
    kind: 'pooled',
    lab: 'janoshik',
    reportNo: 'Task #56245',
    verifyKey: 'HXS7IJZ7PTJ9',
    date: '20 January 2025',
    sample: 'BBG70 (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg), batch 2025-01-08',
    client: 'Blurred on the certificate; manufacturer Kerisite (Shenzhen) International Trade Co.',
    method: 'Identity and amount per vial. Janoshik’s GLOW test does not include peptide purity.',
    results: [
      { label: 'GHK-Cu', value: '51.64 mg' },
      { label: 'BPC-157', value: '10.14 mg' },
      { label: 'TB-500', value: '9.66 mg' },
    ],
    images: [{ name: 'glow-stack-2025-01-20' }],
  },

  // KLOW Stack
  89: {
    kind: 'pooled',
    lab: 'janoshik',
    reportNo: 'Task #66352',
    verifyKey: 'DKEUX5HWAFS8',
    date: '2 June 2025',
    sample: 'KLOW 80 mg (BPC-157 + TB-500 + GHK-Cu + KPV), batch BBGK/2025-05',
    client: 'Qing Li peptide; manufacturer qinglishangmao.com',
    method: 'Identity and amount per vial',
    results: [
      { label: 'GHK-Cu', value: '50.83 mg' },
      { label: 'BPC-157', value: '11.63 mg' },
      { label: 'TB-500', value: '11.68 mg' },
      { label: 'KPV', value: '10.01 mg' },
    ],
    images: [{ name: 'klow-stack-2025-06-02' }],
  },

  // GHK-Cu
  22: {
    kind: 'pooled',
    lab: 'freedom',
    reportNo: 'Accession 2601200197',
    date: '21 January 2026',
    sample: 'GHK-Cu 100 mg vial',
    client: 'Blurred on the certificate',
    method: 'HPLC with UV detection, coupled with mass spectrometry',
    results: [
      { label: 'Purity', value: '99.51%' },
      { label: 'Net peptide content', value: '93.50 mg' },
      { label: 'Identity', value: 'GHK-Cu, confirmed by mass' },
    ],
    images: [{ name: 'ghk-cu-2026-01-21' }],
  },

  // Epithalon
  23: {
    kind: 'raw',
    lab: 'tsurgex',
    reportNo: 'NO:023-E82-TSX',
    date: '5 June 2026',
    sample: 'Epitalon raw powder, 1 kg bag, manufactured 5 June 2026',
    method: 'HPLC purity, MS (ESI) identity, Karl Fischer water content',
    results: [
      { label: 'Purity (HPLC)', value: '99.47%' },
      { label: 'Peptide content', value: '87.8%' },
      { label: 'Water content', value: '3.1%' },
      { label: 'Identity (MS)', value: 'Conforms' },
    ],
    images: [{ name: 'epithalon-2026-06-05' }],
  },

  // Glutathione
  28: {
    kind: 'pooled',
    lab: 'freedom',
    reportNo: 'Accession 2601050170',
    date: '7 January 2026',
    sample: 'Glutathione 1500 mg vial',
    client: 'Blurred on the certificate',
    method: 'HPLC with UV detection, coupled with mass spectrometry',
    results: [
      { label: 'Purity', value: '99.763%' },
      { label: 'Net content', value: '1490 mg' },
      { label: 'Identity', value: 'Glutathione, confirmed by mass' },
    ],
    images: [{ name: 'glutathione-2026-01-07' }],
  },

  // Retatrutide
  46: {
    kind: 'pooled',
    lab: 'janoshik',
    reportNo: 'Task #90558',
    verifyKey: 'CR8GTCWP7UQ9',
    date: '25 November 2025',
    sample: 'Retatrutide 30 mg, two vials, batch 2025.11',
    client: 'ASK',
    method: 'Identity, amount and peptide purity per vial',
    results: [
      { label: 'Vial 1', value: '30.52 mg · 99.892% purity' },
      { label: 'Vial 2', value: '29.14 mg · 99.931% purity' },
    ],
    images: [{ name: 'retatrutide-2025-11-25' }],
  },

  // Selank
  60: {
    kind: 'pooled',
    lab: 'janoshik',
    reportNo: 'Task #69189',
    verifyKey: 'A65FBWZWP5IP',
    date: '25 June 2025',
    sample: 'Selank 10 mg, batch SK11',
    client: 'Kerisite peptide; manufacturer qinglishangmao.com',
    method: 'Identity, amount and peptide purity per vial',
    results: [
      { label: 'Purity', value: '99.875%' },
      { label: 'Amount', value: '12.02 mg' },
    ],
    images: [{ name: 'selank-2025-06-25' }],
  },

  // Semax
  61: {
    kind: 'pooled',
    lab: 'janoshik',
    reportNo: 'Task #69188',
    verifyKey: '588RKASXBZP6',
    date: '25 June 2025',
    sample: 'Semax 10 mg, batch XA11',
    client: 'Kerisite peptide; manufacturer qinglishangmao.com',
    method: 'Identity, amount and peptide purity per vial',
    results: [
      { label: 'Purity', value: '99.499%' },
      { label: 'Amount', value: '11.80 mg' },
    ],
    images: [{ name: 'semax-2025-06-25' }],
  },

  // NAD+
  68: {
    kind: 'pooled',
    lab: 'nst',
    reportNo: 'SNTEK2026010517051 and SNTEK2026010517052',
    date: '6 January 2026',
    sample: 'NAD+ 1000 mg (model NJ1000), production batch 20251222-01',
    client: 'sciencepeptidelab',
    method: 'RP-HPLC/UHPLC, with reference to USP, EP and Chinese Pharmacopoeia methods',
    results: [
      { label: 'Purity', value: '99.0%' },
      { label: 'Content', value: '1000.06 mg' },
      { label: 'Heavy metals', value: 'Not detected (Pb, Cd, Hg, As)' },
      { label: 'Bacterial endotoxin', value: '≤0.5 EU/mg' },
    ],
    images: [
      { name: 'nad-plus-2026-01-06-report', caption: 'Test report' },
      { name: 'nad-plus-2026-01-06-coa', caption: 'Certificate of analysis' },
    ],
  },
}

export const coaFor = (product) => productCoas[product.id] ?? null

export const coaThumb = (name) => `/assets/opt/coa/${name}-480.webp`
export const coaFull = (name) => `/assets/opt/coa/${name}-full.webp`
