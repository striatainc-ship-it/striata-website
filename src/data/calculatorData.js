/**
 * Reconstitution calculator configuration.
 *
 * The peptide list is derived from the live catalogue (products.js) so a new
 * vial size or product shows up here automatically. Everything that is a
 * business rule rather than catalogue data — water limits, syringe types,
 * rounding, the quick-reference doses — is set explicitly below.
 */
import { products } from './products.js'

/** Every peptide may be reconstituted with at most this much BAC water… */
export const DEFAULT_MAX_BAC_WATER_ML = 3

/**
 * …except these. Keyed by product id (stable even if a name is retouched).
 * Either a single number for every vial size, or a map of vial mg → max mL
 * when only some sizes qualify.
 */
export const MAX_BAC_WATER_OVERRIDES = {
  68: 10, // NAD+ 500 mg
  28: 10, // Glutathione (400 / 600 / 1500 mg)
}

/**
 * Catalogue items measured in mg that are nonetheless supplied as a ready
 * liquid, so there is nothing to reconstitute. Keyed by product id.
 */
export const EXCLUDED_PRODUCT_IDS = new Set([
  57, // L-Carnitine (liquid)
  59, // MIC (Lipo-C + B12) (liquid)
  67, // Cerebrolysin (ampoules)
])

/** Smallest increment the user can read on an insulin syringe. */
export const UNITS_ROUNDING_INCREMENT = 0.5

/** One insulin syringe holds this much; larger draws need a second syringe. */
export const SYRINGE_CAPACITY_ML = 1

export const SYRINGE_TYPES = [
  { id: 'u100', label: 'U-100', unitsPerMl: 100, note: '100 units = 1 mL. The standard insulin syringe.' },
  { id: 'u40', label: 'U-40', unitsPerMl: 40, note: '40 units = 1 mL. Less common. Check the barrel.' },
]

/** Doses shown in the quick-reference table, in mcg. */
export const REFERENCE_DOSES_MCG = [100, 250, 500, 1000, 2000, 2500, 5000]

/** The manual "type your own vial size" option. */
export const CUSTOM_PEPTIDE_ID = 'custom'

/** Minimum and maximum a user may type as a custom vial size, in mg. */
export const CUSTOM_VIAL_RANGE_MG = { min: 0.01, max: 5000 }

const DOSE_PATTERN = /^(\d+(?:\.\d+)?)\s*(mg|mcg)$/i

/** '5mg' → 5, '100mcg' → 0.1, anything else (iu, ml, %, stacks) → null. */
export function parseVialMg(dose) {
  const m = String(dose).trim().match(DOSE_PATTERN)
  if (!m) return null
  const n = parseFloat(m[1])
  return m[2].toLowerCase() === 'mcg' ? n / 1000 : n
}

/** Max BAC water for a given product + vial size, applying the overrides. */
export function maxBacWaterFor(productId, vialMg) {
  const override = MAX_BAC_WATER_OVERRIDES[productId]
  if (override == null) return DEFAULT_MAX_BAC_WATER_ML
  if (typeof override === 'number') return override
  return override[vialMg] ?? DEFAULT_MAX_BAC_WATER_ML
}

/**
 * Catalogue → calculator entries. Only lyophilised vials measured in mg/mcg
 * qualify: pre-mixed liquids, IU-dosed hormones, combined multi-vial stacks
 * and supplies are left out.
 */
export const calculatorPeptides = products
  .filter(p => p.category !== 'supplies' && p.format !== 'Bottle' && !EXCLUDED_PRODUCT_IDS.has(p.id))
  .map(p => {
    const vials = (p.prices ?? [])
      .map(tier => ({ label: tier.dose, mg: parseVialMg(tier.dose), inStock: tier.inStock === true }))
      .filter(v => v.mg !== null)
      .sort((a, b) => a.mg - b.mg)
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      vials: vials.map(v => ({ ...v, maxBacWaterMl: maxBacWaterFor(p.id, v.mg) })),
    }
  })
  .filter(p => p.vials.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name))

export const getCalculatorPeptide = (id) =>
  calculatorPeptides.find(p => String(p.id) === String(id))
