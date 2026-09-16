/**
 * Pure reconstitution maths. No React, no DOM — safe to unit-test in Node
 * and to reuse anywhere a dose needs converting.
 *
 *   concentration (mg/mL) = vial content (mg) / BAC water (mL)
 *   volume to draw (mL)   = desired dose (mg) / concentration (mg/mL)
 *   syringe units         = volume (mL) × units per mL   (U-100 → 100, U-40 → 40)
 */

const isPositive = (n) => typeof n === 'number' && Number.isFinite(n) && n > 0

/** Convert a dose to milligrams. */
export function toMg(value, unit) {
  if (!Number.isFinite(value)) return NaN
  return unit === 'mcg' ? value / 1000 : value
}

/** Convert milligrams to the requested display unit. */
export function fromMg(mg, unit) {
  if (!Number.isFinite(mg)) return NaN
  return unit === 'mcg' ? mg * 1000 : mg
}

/** Re-express a dose in another unit without changing what it means. */
export function convertDose(value, fromUnit, toUnit) {
  if (fromUnit === toUnit) return value
  return fromMg(toMg(value, fromUnit), toUnit)
}

/** Keep a number inside [min, max]. Non-numbers come back as `min`. */
export function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min
  return Math.min(Math.max(value, min), max)
}

/**
 * Round to the nearest `increment` (0.5 → the half-unit marks on an insulin
 * syringe). Increment ≤ 0 returns the value untouched.
 */
export function roundToIncrement(value, increment) {
  if (!Number.isFinite(value)) return NaN
  if (!isPositive(increment)) return value
  // Guard the float error that turns 2.5 into 2.4999999 → 2.
  return Math.round((value + Number.EPSILON) / increment) * increment
}

/** Round to `decimals` places, avoiding the 1.005 → 1.00 float trap. */
export function roundDecimals(value, decimals = 2) {
  if (!Number.isFinite(value)) return NaN
  const f = 10 ** decimals
  return Math.round((value + Number.EPSILON) * f) / f
}

/**
 * Concentration of a reconstituted vial.
 * Returns null rather than Infinity when the water volume is 0 or missing.
 */
export function concentration(vialMg, bacMl) {
  if (!isPositive(vialMg) || !isPositive(bacMl)) return null
  const mgPerMl = vialMg / bacMl
  return { mgPerMl, mcgPerMl: mgPerMl * 1000 }
}

/** Millilitres to draw for `doseMg` at `mgPerMl`. */
export function volumeForDose(doseMg, mgPerMl) {
  if (!isPositive(mgPerMl) || !Number.isFinite(doseMg) || doseMg < 0) return NaN
  return doseMg / mgPerMl
}

/** Syringe units for a volume. `unitsPerMl` is 100 for U-100, 40 for U-40. */
export function unitsForVolume(ml, unitsPerMl) {
  if (!isPositive(unitsPerMl) || !Number.isFinite(ml) || ml < 0) return NaN
  return ml * unitsPerMl
}

/**
 * One call that does the whole sheet.
 *
 * @param {object} p
 * @param {number} p.vialMg           total peptide in the vial, mg
 * @param {number} p.bacMl            BAC water added, mL
 * @param {number} p.doseMg           desired dose, mg (convert mcg first with toMg)
 * @param {number} [p.unitsPerMl]     100 (U-100, default) or 40 (U-40)
 * @param {number} [p.unitsIncrement] rounding step for units, default 0.5
 * @param {number} [p.syringeMaxMl]   capacity of one syringe, default 1 mL
 */
export function calculate({
  vialMg,
  bacMl,
  doseMg,
  unitsPerMl = 100,
  unitsIncrement = 0.5,
  syringeMaxMl = 1,
}) {
  const conc = concentration(vialMg, bacMl)
  if (!conc) return { concentration: null, dose: null }

  if (!isPositive(doseMg)) return { concentration: conc, dose: null }

  const volumeMl = volumeForDose(doseMg, conc.mgPerMl)
  const unitsRaw = unitsForVolume(volumeMl, unitsPerMl)

  return {
    concentration: conc,
    dose: {
      volumeMl: roundDecimals(volumeMl, 2),
      volumeMlRaw: volumeMl,
      units: roundToIncrement(unitsRaw, unitsIncrement),
      unitsRaw,
      exceedsVial: doseMg > vialMg,
      exceedsSyringe: volumeMl > syringeMaxMl,
      dosesPerVial: Math.floor(vialMg / doseMg),
    },
  }
}

/**
 * Trim a number for display: up to `maxDecimals` places, trailing zeros
 * dropped, thousands separated. 1.5 → "1.5", 2 → "2", 1666.666 → "1,666.67".
 */
export function formatNumber(value, maxDecimals = 2) {
  if (!Number.isFinite(value)) return '—'
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  })
}
