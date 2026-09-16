import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, whatsappLink } from '../data/products'
import {
  calculatorPeptides,
  getCalculatorPeptide,
  CUSTOM_PEPTIDE_ID,
  CUSTOM_VIAL_RANGE_MG,
  DEFAULT_MAX_BAC_WATER_ML,
  SYRINGE_TYPES,
  SYRINGE_CAPACITY_ML,
  UNITS_ROUNDING_INCREMENT,
  REFERENCE_DOSES_MCG,
} from '../data/calculatorData'
import {
  calculate,
  toMg,
  convertDose,
  roundDecimals,
  formatNumber,
} from '../lib/reconstitution'

/*
 * Self-contained reconstitution calculator. Pure client-side: every value is
 * derived from local state on each render; nothing is fetched or stored.
 *
 * Inputs are kept as strings so a user can type "2." or clear a field
 * without the cursor fighting them. Numbers are parsed at the point of use.
 */

const DEFAULT_PEPTIDE_ID = '1' // BPC-157
const DEFAULT_DOSE = { value: '250', unit: 'mcg' }

const inputClass =
  'w-full bg-[#0A1628] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-base focus:outline-none focus:border-[#00B4B4]/60 transition-colors tabular-nums'

const labelClass = 'block text-white/55 text-xs font-bold uppercase tracking-widest mb-2'

const CHEVRON = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/** Keep only digits and a single decimal point. */
const sanitiseDecimal = (raw) => {
  const cleaned = String(raw).replace(/[^0-9.]/g, '')
  const [head, ...rest] = cleaned.split('.')
  return rest.length ? `${head}.${rest.join('')}` : head
}

/** Number → input string without thousands separators, trimmed. */
const toInputString = (n) => (Number.isFinite(n) ? String(roundDecimals(n, 4)) : '')

/** First in-stock vial, else the smallest. */
const defaultVialIndex = (peptide) => {
  const i = peptide.vials.findIndex(v => v.inStock)
  return i === -1 ? 0 : i
}

/** "250 mcg" or "1 mg" from a mcg value. */
const doseLabelFromMcg = (mcg) =>
  mcg >= 1000 ? `${formatNumber(mcg / 1000)} mg` : `${formatNumber(mcg)} mcg`

/** Grouped <optgroup>s in catalogue category order. Static, so built once. */
const PEPTIDE_GROUPS = (() => {
  const byCat = new Map()
  for (const p of calculatorPeptides) {
    if (!byCat.has(p.category)) byCat.set(p.category, [])
    byCat.get(p.category).push(p)
  }
  return categories
    .filter(c => byCat.has(c.id))
    .map(c => ({ id: c.id, label: c.label, items: byCat.get(c.id) }))
})()

/** Two-way pill toggle used for mg/mcg and U-100/U-40. */
function Segmented({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="inline-flex bg-[#0A1628] border border-white/10 rounded-xl p-1 gap-1">
      {options.map(opt => {
        const active = opt.id === value
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              active ? 'bg-[#00B4B4] text-white' : 'text-white/55 hover:text-white'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/** A horizontal insulin-syringe barrel showing how far to draw. */
function SyringeGauge({ units, unitsPerMl, over }) {
  const capacity = unitsPerMl * SYRINGE_CAPACITY_ML
  const pct = Math.min(100, Math.max(0, (units / capacity) * 100))
  const majorStep = unitsPerMl === 100 ? 10 : 5
  const ticks = []
  for (let u = 0; u <= capacity; u += majorStep) ticks.push(u)

  return (
    <div aria-hidden="true" className="mt-5">
      <div className="relative h-9 rounded-full bg-[#0A1628] border border-white/10 overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out ${
            over ? 'bg-red-500/70' : 'bg-gradient-to-r from-[#00B4B4]/70 to-[#00B4B4]'
          }`}
          style={{ width: `${pct}%` }}
        />
        <div className="absolute inset-0 flex">
          {ticks.slice(1).map(u => (
            <span
              key={u}
              className="absolute top-0 h-full w-px bg-white/15"
              style={{ left: `${(u / capacity) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div className="relative h-4 mt-1 text-[10px] text-white/35 tabular-nums">
        {ticks.filter((_, i) => i % 2 === 0).map(u => (
          <span
            key={u}
            className="absolute -translate-x-1/2"
            style={{ left: `${(u / capacity) * 100}%` }}
          >
            {u}
          </span>
        ))}
      </div>
    </div>
  )
}

function Warning({ tone = 'amber', children }) {
  const cls = tone === 'red'
    ? 'border-red-400/30 bg-red-500/10 text-red-200'
    : 'border-amber-400/30 bg-amber-500/10 text-amber-100'
  return (
    <p role="alert" className={`mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${cls}`}>
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      <span>{children}</span>
    </p>
  )
}

export default function ReconstitutionCalculator() {
  const [peptideId, setPeptideId] = useState(DEFAULT_PEPTIDE_ID)
  const [vialIndex, setVialIndex] = useState(() => defaultVialIndex(getCalculatorPeptide(DEFAULT_PEPTIDE_ID)))
  const [customVialMg, setCustomVialMg] = useState('')
  const [bacMl, setBacMl] = useState(() => {
    const p = getCalculatorPeptide(DEFAULT_PEPTIDE_ID)
    return String(p.vials[defaultVialIndex(p)].maxBacWaterMl)
  })
  const [doseValue, setDoseValue] = useState(DEFAULT_DOSE.value)
  const [doseUnit, setDoseUnit] = useState(DEFAULT_DOSE.unit)
  const [syringeId, setSyringeId] = useState(SYRINGE_TYPES[0].id)

  const isCustom = peptideId === CUSTOM_PEPTIDE_ID
  const peptide = isCustom ? null : getCalculatorPeptide(peptideId)
  const vial = peptide?.vials[vialIndex] ?? peptide?.vials[0] ?? null
  const syringe = SYRINGE_TYPES.find(s => s.id === syringeId) ?? SYRINGE_TYPES[0]

  const vialMg = isCustom ? parseFloat(customVialMg) : vial?.mg
  const maxBac = isCustom ? DEFAULT_MAX_BAC_WATER_ML : (vial?.maxBacWaterMl ?? DEFAULT_MAX_BAC_WATER_ML)
  const bacNum = parseFloat(bacMl)
  const doseNum = parseFloat(doseValue)
  const doseMg = toMg(doseNum, doseUnit)

  // The maths is a handful of divisions; recomputing per render is cheaper
  // than memoising it.
  const result = calculate({
    vialMg,
    bacMl: bacNum,
    doseMg,
    unitsPerMl: syringe.unitsPerMl,
    unitsIncrement: UNITS_ROUNDING_INCREMENT,
    syringeMaxMl: SYRINGE_CAPACITY_ML,
  })

  const conc = result.concentration
  const dose = result.dose

  // Quick-reference rows at the current concentration, limited to doses that
  // fit both the vial and a single syringe.
  const referenceRows = !conc ? [] : REFERENCE_DOSES_MCG
      .map(mcg => {
        const r = calculate({
          vialMg,
          bacMl: bacNum,
          doseMg: mcg / 1000,
          unitsPerMl: syringe.unitsPerMl,
          unitsIncrement: UNITS_ROUNDING_INCREMENT,
          syringeMaxMl: SYRINGE_CAPACITY_ML,
        }).dose
        return r && !r.exceedsVial && !r.exceedsSyringe ? { mcg, ...r } : null
      })
      .filter(Boolean)

  /** Clamp the current water volume to a new limit, leaving a valid value alone. */
  const revalidateBac = (newMax) => {
    const n = parseFloat(bacMl)
    if (!Number.isFinite(n) || n <= 0 || n > newMax) setBacMl(String(newMax))
  }

  const handlePeptideChange = (id) => {
    setPeptideId(id)
    if (id === CUSTOM_PEPTIDE_ID) {
      revalidateBac(DEFAULT_MAX_BAC_WATER_ML)
      return
    }
    const p = getCalculatorPeptide(id)
    const idx = defaultVialIndex(p)
    setVialIndex(idx)
    revalidateBac(p.vials[idx].maxBacWaterMl)
  }

  const handleVialChange = (idx) => {
    setVialIndex(idx)
    revalidateBac(peptide.vials[idx].maxBacWaterMl)
  }

  const handleBacChange = (raw) => {
    const s = sanitiseDecimal(raw)
    const n = parseFloat(s)
    if (Number.isFinite(n) && n > maxBac) {
      setBacMl(String(maxBac))
      return
    }
    setBacMl(s)
  }

  const handleCustomVialChange = (raw) => {
    const s = sanitiseDecimal(raw)
    const n = parseFloat(s)
    if (Number.isFinite(n) && n > CUSTOM_VIAL_RANGE_MG.max) {
      setCustomVialMg(String(CUSTOM_VIAL_RANGE_MG.max))
      return
    }
    setCustomVialMg(s)
  }

  const handleDoseUnitChange = (unit) => {
    if (unit === doseUnit) return
    if (Number.isFinite(doseNum)) setDoseValue(toInputString(convertDose(doseNum, doseUnit, unit)))
    setDoseUnit(unit)
  }

  const applyReferenceDose = (mcg) => {
    setDoseValue(toInputString(convertDose(mcg, 'mcg', doseUnit)))
  }

  // ── Derived display state ──
  const bacInvalid = bacMl !== '' && !(bacNum > 0)
  const vialInvalid = isCustom && customVialMg !== '' && !(vialMg > 0)
  const tinyDraw = dose && !dose.exceedsVial && dose.unitsRaw < 1
  const peptideLabel = isCustom
    ? (vialMg > 0 ? `${formatNumber(vialMg)} mg vial` : 'Custom vial')
    : `${peptide.name} ${vial.label}`

  const summaryText = dose && conc
    ? `Hi STRIATA, quick check on my reconstitution: ${peptideLabel} + ${formatNumber(bacNum)} mL BAC water = ${formatNumber(conc.mgPerMl, 3)} mg/mL. For a ${formatNumber(doseNum, 3)} ${doseUnit} dose I get ${formatNumber(dose.volumeMl)} mL = ${formatNumber(dose.units, 1)} units on a ${syringe.label} syringe. Does that look right?`
    : ''

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 items-start">
      {/* ── INPUTS ── */}
      <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6 md:p-8">
        <h2 className="text-white font-bold text-lg mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="text-[#00B4B4] mr-2">1.</span>Your vial
        </h2>

        {/* Peptide */}
        <div className="mb-5">
          <label htmlFor="rc-peptide" className={labelClass}>Peptide</label>
          <div className="relative">
            <select
              id="rc-peptide"
              value={peptideId}
              onChange={e => handlePeptideChange(e.target.value)}
              className={`${inputClass} appearance-none pr-11 cursor-pointer`}
            >
              {PEPTIDE_GROUPS.map(g => (
                <optgroup key={g.id} label={g.label}>
                  {g.items.map(p => (
                    <option key={p.id} value={String(p.id)}>{p.name}</option>
                  ))}
                </optgroup>
              ))}
              <optgroup label="Not listed">
                <option value={CUSTOM_PEPTIDE_ID}>Other / custom vial size</option>
              </optgroup>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">{CHEVRON}</span>
          </div>
        </div>

        {/* Vial size */}
        <div className="mb-5">
          {isCustom ? (
            <>
              <label htmlFor="rc-custom-mg" className={labelClass}>Vial content (mg)</label>
              <div className="relative">
                <input
                  id="rc-custom-mg"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="e.g. 5"
                  value={customVialMg}
                  onChange={e => handleCustomVialChange(e.target.value)}
                  aria-invalid={vialInvalid || undefined}
                  className={`${inputClass} pr-14`}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">mg</span>
              </div>
              <p className="mt-2 text-white/40 text-xs">
                Read the total peptide content off the vial label. Defaults to the {DEFAULT_MAX_BAC_WATER_ML} mL water limit.
              </p>
            </>
          ) : (
            <>
              <span className={labelClass}>Vial size</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Vial size">
                {peptide.vials.map((v, i) => {
                  const active = i === vialIndex
                  return (
                    <button
                      key={v.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => handleVialChange(i)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-colors cursor-pointer tabular-nums ${
                        active
                          ? 'bg-[#00B4B4] border-[#00B4B4] text-white'
                          : 'bg-[#0A1628] border-white/10 text-white/65 hover:text-white hover:border-[#00B4B4]/40'
                      }`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {v.label}
                      {v.inStock && (
                        <span className={`ml-2 inline-block w-1.5 h-1.5 rounded-full align-middle ${active ? 'bg-white' : 'bg-green-400'}`} title="In stock" />
                      )}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* BAC water */}
        <div className="mb-8">
          <label htmlFor="rc-bac" className={labelClass}>Bacteriostatic water added</label>
          <div className="relative">
            <input
              id="rc-bac"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder={`up to ${maxBac}`}
              value={bacMl}
              onChange={e => handleBacChange(e.target.value)}
              aria-invalid={bacInvalid || undefined}
              aria-describedby="rc-bac-note"
              className={`${inputClass} pr-14`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-semibold">mL</span>
          </div>
          <p id="rc-bac-note" className="mt-2 text-xs text-white/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            {maxBac === DEFAULT_MAX_BAC_WATER_ML
              ? `Max ${maxBac} mL for this peptide.`
              : `Max ${maxBac} mL for this vial size.`}
            {bacInvalid && <span className="text-amber-200 ml-1">Enter a volume above 0.</span>}
          </p>
        </div>

        <h2 className="text-white font-bold text-lg mb-6 pt-6 border-t border-white/8" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="text-[#00B4B4] mr-2">2.</span>Your dose
        </h2>

        {/* Dose */}
        <div className="mb-5">
          <label htmlFor="rc-dose" className={labelClass}>Desired dose</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              id="rc-dose"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="e.g. 250"
              value={doseValue}
              onChange={e => setDoseValue(sanitiseDecimal(e.target.value))}
              className={`${inputClass} sm:flex-1`}
            />
            <Segmented
              label="Dose unit"
              value={doseUnit}
              onChange={handleDoseUnitChange}
              options={[{ id: 'mcg', label: 'mcg' }, { id: 'mg', label: 'mg' }]}
            />
          </div>
        </div>

        {/* Syringe */}
        <div>
          <span className={labelClass}>Syringe type</span>
          <Segmented
            label="Syringe type"
            value={syringeId}
            onChange={setSyringeId}
            options={SYRINGE_TYPES}
          />
          <p className="mt-2 text-white/40 text-xs">{syringe.note}</p>
        </div>
      </div>

      {/* ── RESULTS ── */}
      <div className="lg:sticky lg:top-28 space-y-6">
        <div className="relative bg-[#0d1e35] border border-[#00B4B4]/25 rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#00B4B4]/8 rounded-full translate-x-28 -translate-y-28 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              Draw up
            </p>
            <p className="text-white/45 text-sm mb-5 truncate">{peptideLabel}</p>

            {dose ? (
              <>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className={`text-6xl md:text-7xl font-black leading-none tabular-nums ${dose.exceedsVial ? 'text-red-300' : 'text-white'}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                    aria-live="polite"
                  >
                    {formatNumber(dose.units, 1)}
                  </span>
                  <span className="text-white/60 text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    units
                  </span>
                </div>
                <p className="mt-2 text-white/60 text-base">
                  <span className="text-white font-semibold tabular-nums">{formatNumber(dose.volumeMl)} mL</span>
                  {' '}on a {syringe.label} syringe
                </p>

                <SyringeGauge units={dose.units} unitsPerMl={syringe.unitsPerMl} over={dose.exceedsSyringe} />

                {dose.exceedsVial && (
                  <Warning tone="red">
                    This dose exceeds the total vial content ({formatNumber(vialMg)} mg). Check the dose or the vial size.
                  </Warning>
                )}
                {!dose.exceedsVial && dose.exceedsSyringe && (
                  <Warning>
                    That is more than one {SYRINGE_CAPACITY_ML} mL syringe. Split the draw across two syringes, or reconstitute with less water for a stronger solution.
                  </Warning>
                )}
                {tinyDraw && (
                  <Warning>
                    Under 1 unit is hard to measure accurately. Add more BAC water (up to {maxBac} mL) so the same dose becomes a larger draw.
                  </Warning>
                )}
              </>
            ) : (
              <div className="py-6 text-white/40 text-sm leading-relaxed">
                {!conc
                  ? (isCustom && !(vialMg > 0)
                    ? 'Enter the vial content in mg to begin.'
                    : 'Enter how much bacteriostatic water you are adding.')
                  : 'Enter a dose to see how many units to draw.'}
              </div>
            )}
          </div>
        </div>

        {/* Concentration */}
        <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
          <p className="text-white/55 text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Concentration
          </p>
          <dl className="grid grid-cols-3 gap-4">
            <div>
              <dt className="text-white/40 text-xs mb-1">mg / mL</dt>
              <dd className="text-white text-xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                {conc ? formatNumber(conc.mgPerMl, 3) : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-white/40 text-xs mb-1">mcg / mL</dt>
              <dd className="text-white text-xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                {conc ? formatNumber(conc.mcgPerMl, 1) : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-white/40 text-xs mb-1">Doses / vial</dt>
              <dd className="text-white text-xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-heading)' }}>
                {dose && !dose.exceedsVial ? formatNumber(dose.dosesPerVial, 0) : '—'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Quick reference */}
        {referenceRows.length > 0 && (
          <div className="bg-[#0d1e35] border border-white/8 rounded-2xl p-6">
            <div className="flex items-baseline justify-between gap-3 mb-4">
              <p className="text-white/55 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)' }}>
                Quick reference
              </p>
              <p className="text-white/30 text-xs">Tap a row to use that dose</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs">
                  <th scope="col" className="text-left font-semibold pb-2">Dose</th>
                  <th scope="col" className="text-right font-semibold pb-2">mL</th>
                  <th scope="col" className="text-right font-semibold pb-2">{syringe.label} units</th>
                </tr>
              </thead>
              <tbody>
                {referenceRows.map(row => {
                  const current = Number.isFinite(doseMg) && Math.abs(doseMg - row.mcg / 1000) < 1e-9
                  return (
                    <tr
                      key={row.mcg}
                      onClick={() => applyReferenceDose(row.mcg)}
                      className={`border-t border-white/5 cursor-pointer transition-colors tabular-nums ${
                        current ? 'text-[#00B4B4]' : 'text-white/75 hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <td className="py-2.5 font-semibold">{doseLabelFromMcg(row.mcg)}</td>
                      <td className="py-2.5 text-right">{formatNumber(row.volumeMl)}</td>
                      <td className="py-2.5 text-right font-bold">{formatNumber(row.units, 1)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Sanity-check via WhatsApp */}
        {summaryText && (
          <a
            href={`${whatsappLink}?text=${encodeURIComponent(summaryText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-md w-full"
          >
            {WA_SVG}
            Check this with us on WhatsApp
          </a>
        )}

        <p className="text-white/35 text-xs leading-relaxed">
          Informational research tool only, not medical advice. Always verify against the documentation supplied with your product and confirm doses with a qualified practitioner. Read the{' '}
          <Link to="/guides/peptide-reconstitution-dosage-calculator" className="text-[#00B4B4]/80 hover:text-[#00B4B4] underline underline-offset-2">
            full reconstitution guide
          </Link>{' '}
          for the procedure.
        </p>
      </div>
    </div>
  )
}
