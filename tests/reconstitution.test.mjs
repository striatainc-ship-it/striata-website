import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  toMg,
  fromMg,
  convertDose,
  clamp,
  roundToIncrement,
  roundDecimals,
  concentration,
  volumeForDose,
  unitsForVolume,
  calculate,
  formatNumber,
} from '../src/lib/reconstitution.js'
import {
  parseVialMg,
  maxBacWaterFor,
  calculatorPeptides,
  DEFAULT_MAX_BAC_WATER_ML,
} from '../src/data/calculatorData.js'

const close = (a, b, eps = 1e-9) => assert.ok(Math.abs(a - b) < eps, `${a} ≠ ${b}`)

test('unit conversion round-trips mg and mcg', () => {
  assert.equal(toMg(250, 'mcg'), 0.25)
  assert.equal(toMg(2, 'mg'), 2)
  assert.equal(fromMg(0.25, 'mcg'), 250)
  assert.equal(convertDose(500, 'mcg', 'mg'), 0.5)
  assert.equal(convertDose(1.5, 'mg', 'mcg'), 1500)
  assert.equal(convertDose(7, 'mg', 'mg'), 7)
  assert.ok(Number.isNaN(toMg(NaN, 'mg')))
})

test('clamp keeps values inside the range and falls back to min', () => {
  assert.equal(clamp(5, 0, 3), 3)
  assert.equal(clamp(-1, 0, 3), 0)
  assert.equal(clamp(2, 0, 3), 2)
  assert.equal(clamp(NaN, 0, 3), 0)
})

test('rounding helpers', () => {
  assert.equal(roundToIncrement(12.3, 0.5), 12.5)
  assert.equal(roundToIncrement(12.24, 0.5), 12)
  assert.equal(roundToIncrement(2.5, 0.5), 2.5)
  assert.equal(roundToIncrement(7.7, 1), 8)
  assert.equal(roundToIncrement(7.7, 0), 7.7)
  assert.equal(roundDecimals(0.125, 2), 0.13)
  assert.equal(roundDecimals(1.005, 2), 1.01)
})

test('concentration: 5 mg in 2 mL is 2.5 mg/mL, and zero water is guarded', () => {
  assert.deepEqual(concentration(5, 2), { mgPerMl: 2.5, mcgPerMl: 2500 })
  assert.equal(concentration(5, 0), null)
  assert.equal(concentration(5, NaN), null)
  assert.equal(concentration(0, 2), null)
})

test('volume and units: 250 mcg from 5 mg / 2 mL is 0.1 mL = 10 units', () => {
  const { mgPerMl } = concentration(5, 2)
  close(volumeForDose(0.25, mgPerMl), 0.1)
  close(unitsForVolume(0.1, 100), 10)
  close(unitsForVolume(0.1, 40), 4)
  assert.ok(Number.isNaN(volumeForDose(0.25, 0)))
})

test('calculate: guide worked example, BPC-157 5 mg in 2 mL, 250 mcg dose', () => {
  const r = calculate({ vialMg: 5, bacMl: 2, doseMg: 0.25 })
  assert.equal(r.concentration.mgPerMl, 2.5)
  assert.equal(r.dose.volumeMl, 0.1)
  assert.equal(r.dose.units, 10)
  assert.equal(r.dose.exceedsVial, false)
  assert.equal(r.dose.exceedsSyringe, false)
  assert.equal(r.dose.dosesPerVial, 20)
})

test('calculate: U-40 syringe scales units by 40 per mL', () => {
  const r = calculate({ vialMg: 5, bacMl: 2, doseMg: 0.25, unitsPerMl: 40 })
  assert.equal(r.dose.units, 4)
})

test('calculate: units round to the configured increment', () => {
  // 10 mg in 3 mL = 3.333 mg/mL; 1 mg → 0.3 mL → 30 units exactly
  assert.equal(calculate({ vialMg: 10, bacMl: 3, doseMg: 1 }).dose.units, 30)
  // 5 mg in 3 mL = 1.667 mg/mL; 300 mcg → 0.18 mL → 18 units
  assert.equal(calculate({ vialMg: 5, bacMl: 3, doseMg: 0.3 }).dose.units, 18)
  // 2 mg in 3 mL; 110 mcg → 0.165 mL → 16.5 units on 0.5 steps, 17 on whole units
  assert.equal(calculate({ vialMg: 2, bacMl: 3, doseMg: 0.11 }).dose.units, 16.5)
  assert.equal(calculate({ vialMg: 2, bacMl: 3, doseMg: 0.11, unitsIncrement: 1 }).dose.units, 17)
})

test('calculate: flags a dose larger than the vial and a draw larger than a syringe', () => {
  const big = calculate({ vialMg: 5, bacMl: 2, doseMg: 6 })
  assert.equal(big.dose.exceedsVial, true)
  assert.equal(big.dose.exceedsSyringe, true)

  // 10 mg in 3 mL; 4 mg dose → 1.2 mL: fits the vial, not one syringe
  const twoSyringes = calculate({ vialMg: 10, bacMl: 3, doseMg: 4 })
  assert.equal(twoSyringes.dose.exceedsVial, false)
  assert.equal(twoSyringes.dose.exceedsSyringe, true)
})

test('calculate: missing inputs yield null sections rather than NaN', () => {
  assert.deepEqual(calculate({ vialMg: 5, bacMl: 0, doseMg: 1 }), { concentration: null, dose: null })
  const noDose = calculate({ vialMg: 5, bacMl: 2, doseMg: 0 })
  assert.equal(noDose.concentration.mgPerMl, 2.5)
  assert.equal(noDose.dose, null)
})

test('formatNumber trims trailing zeros and separates thousands', () => {
  assert.equal(formatNumber(1.5), '1.5')
  assert.equal(formatNumber(2), '2')
  assert.equal(formatNumber(1666.6666), '1,666.67')
  assert.equal(formatNumber(NaN), '—')
})

test('parseVialMg reads catalogue dose labels', () => {
  assert.equal(parseVialMg('5mg'), 5)
  assert.equal(parseVialMg('100mcg'), 0.1)
  assert.equal(parseVialMg('1.5 mg'), 1.5)
  assert.equal(parseVialMg('12iu'), null)
  assert.equal(parseVialMg('10ml'), null)
  assert.equal(parseVialMg('5mg+5mg'), null)
  assert.equal(parseVialMg('1% · 30ml'), null)
})

test('BAC water limits: 3 mL default, 10 mL for NAD+ and Glutathione', () => {
  assert.equal(DEFAULT_MAX_BAC_WATER_ML, 3)
  assert.equal(maxBacWaterFor(1, 5), 3) // BPC-157
  assert.equal(maxBacWaterFor(68, 500), 10) // NAD+
  assert.equal(maxBacWaterFor(28, 600), 10) // Glutathione
  assert.equal(maxBacWaterFor(28, 1500), 10)
})

test('derived catalogue contains only mg vials and carries the limits', () => {
  assert.ok(calculatorPeptides.length > 50)
  for (const p of calculatorPeptides) {
    assert.ok(p.vials.length > 0, `${p.name} has no vials`)
    for (const v of p.vials) {
      assert.ok(v.mg > 0, `${p.name} ${v.label} has bad mg`)
      assert.ok(v.maxBacWaterMl >= 3, `${p.name} ${v.label} has bad max`)
    }
  }
  const names = calculatorPeptides.map(p => p.name)
  assert.ok(names.includes('BPC-157'))
  assert.ok(names.includes('NAD+'))
  assert.ok(!names.includes('HGH Somatropin'), 'IU-dosed products are excluded')
  assert.ok(!names.includes('Bacteriostatic Water'), 'supplies are excluded')
  assert.ok(!names.includes('GHK-Cu Serum (Topical)'), 'topicals are excluded')
  assert.ok(!names.includes('L-Carnitine'), 'liquids are excluded')
  const nad = calculatorPeptides.find(p => p.name === 'NAD+')
  assert.equal(nad.vials[0].maxBacWaterMl, 10)
})
