import { useSyncExternalStore } from 'react'
import { whatsappLink } from '../data/products'
import { trackEvent } from './analytics'

/**
 * The order slip: a cart that ends in a WhatsApp message instead of a
 * checkout.
 *
 * A module-level store read through useSyncExternalStore rather than a React
 * context, for two reasons. There is no provider to thread through both the
 * client tree and the prerenderer. And the server snapshot is a fixed empty
 * slip, so prerendered HTML and the first client render always agree (no
 * hydration mismatch). The saved slip is read from localStorage straight
 * after, and the badge and drawer update from there.
 *
 * Saved per browser. It is a convenience, so every storage call is wrapped:
 * a private window or blocked storage just means the slip is not remembered.
 */

const STORAGE_KEY = 'striata-order-slip-v1'

/**
 * A line on the slip. `key` identifies the exact thing ordered: the same
 * compound as a vial and as a spray are two lines, and so are two sizes.
 *
 * @typedef {{
 *   key: string, name: string, format: string, dose: string,
 *   price: number, inStock: boolean, qty: number, href: string | null,
 *   image: string | null, detail?: string | null,
 * }} Line
 *
 * `detail` is what a bundle contains (a stack tier's compounds), printed under
 * the line on the slip and in the message so we can see what was chosen.
 */

/** STR- plus four characters, skipping the ones that misread (0/O, 1/I/L). */
function newReference() {
  const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'
  let ref = ''
  for (let i = 0; i < 4; i++) ref += alphabet[Math.floor(Math.random() * alphabet.length)]
  return `STR-${ref}`
}

const EMPTY = Object.freeze({ lines: [], reference: null, name: '', deliverTo: '', note: '', delivery: 'standard', open: false, pulse: 0 })

let state = EMPTY
let loaded = false
const listeners = new Set()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (saved && Array.isArray(saved.lines)) {
      state = {
        ...EMPTY,
        lines: saved.lines.filter((l) => l && l.key && l.qty > 0),
        reference: saved.reference ?? null,
        name: saved.name ?? '',
        deliverTo: saved.deliverTo ?? '',
        note: saved.note ?? '',
        delivery: saved.delivery === 'express' ? 'express' : 'standard',
      }
    }
  } catch {
    // Unreadable or blocked storage: start with an empty slip.
  }
}

function persist() {
  try {
    const { lines, reference, name, deliverTo, note, delivery } = state
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, reference, name, deliverTo, note, delivery }))
  } catch {
    // Not remembered this time; the slip still works for this visit.
  }
}

function set(next, { save = true } = {}) {
  state = { ...state, ...next }
  if (save) persist()
  listeners.forEach((fn) => fn())
}

function subscribe(fn) {
  load()
  listeners.add(fn)
  // A slip changed in another tab shows up here too.
  const onStorage = (e) => {
    if (e.key !== STORAGE_KEY) return
    loaded = false
    load()
    fn()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = () => state
const getServerSnapshot = () => EMPTY

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Build a line from a catalogue-shaped product and one of its price tiers. */
export function lineFor(product, tier, { format, href = null, image = null, detail = null } = {}) {
  const fmt = format ?? product.format ?? 'Vial'
  return {
    key: `${product.id}|${fmt}|${tier.dose}`,
    name: product.name,
    format: fmt,
    dose: tier.dose,
    price: tier.price,
    inStock: tier.inStock === true,
    qty: 1,
    href,
    image,
    detail,
    // Products whose own page promises free delivery (the serum, the
    // Menopause Reset) carry the promise onto the slip.
    freeShipping: product.freeShipping === true,
  }
}

export function addLine(line) {
  const existing = state.lines.find((l) => l.key === line.key)
  const lines = existing
    ? state.lines.map((l) => (l.key === line.key ? { ...l, qty: Math.min(l.qty + 1, 99) } : l))
    : [...state.lines, line]
  set({ lines, reference: state.reference ?? newReference(), pulse: state.pulse + 1 })
  trackEvent('add_to_cart', {
    currency: 'ZAR',
    value: line.price,
    items: [{ item_name: line.name, item_variant: `${line.format} ${line.dose}`, price: line.price, quantity: 1 }],
  })
}

export function setQty(key, qty) {
  const lines =
    qty <= 0 ? state.lines.filter((l) => l.key !== key) : state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 99) } : l))
  set({ lines, reference: lines.length ? state.reference : null })
}

export const removeLine = (key) => setQty(key, 0)

export function setDetails(details) {
  set(details)
}

export function openSlip() {
  set({ open: true }, { save: false })
}

export function closeSlip() {
  set({ open: false }, { save: false })
}

/** Start again after an order has gone out. Keeps name and delivery town. */
export function clearSlip() {
  set({ lines: [], reference: null, note: '' })
}

export const lineCount = (lines) => lines.reduce((n, l) => n + l.qty, 0)

export const orderable = (lines) => lines.filter((l) => l.inStock)
export const toCheck = (lines) => lines.filter((l) => !l.inStock)
export const subtotal = (lines) => orderable(lines).reduce((sum, l) => sum + l.price * l.qty, 0)

/**
 * Delivery, as the business charges it (confirmed 2026-09-18):
 * standard R150 or express R200, the customer's choice; any order with a pen
 * goes cold-chain express at R220, because pens ship with ice packs and
 * insulation so the peptide doesn't degrade. One parcel, one fee.
 */
export const DELIVERY_OPTIONS = {
  standard: { id: 'standard', label: 'Standard delivery', price: 150 },
  express: { id: 'express', label: 'Express delivery', price: 200 },
}
export const COLD_CHAIN = {
  id: 'cold',
  label: 'Cold-chain express',
  price: 220,
  note: 'Pens ship express with ice packs and insulation so the peptide doesn’t degrade.',
}

/**
 * The delivery that applies to this slip, or null when nothing on it is
 * priced yet (an availability question has nothing to deliver). `locked`
 * means the customer has no choice to make.
 *
 * Free delivery applies only when everything priced on the slip was sold with
 * it; add a vial to a serum order and the parcel is charged like any other.
 */
export function deliveryFor({ lines, delivery }) {
  const ready = orderable(lines)
  if (!ready.length) return null
  if (ready.some((l) => l.format === 'Pen')) return { ...COLD_CHAIN, locked: true }
  if (ready.every((l) => l.freeShipping)) {
    return { id: 'free', label: 'Free delivery', price: 0, locked: true, note: 'Included with this order.' }
  }
  return { ...(DELIVERY_OPTIONS[delivery] ?? DELIVERY_OPTIONS.standard), locked: false }
}

export const orderTotal = (slip) => subtotal(slip.lines) + (deliveryFor(slip)?.price ?? 0)

export function setDelivery(id) {
  if (DELIVERY_OPTIONS[id]) set({ delivery: id })
}

const rand = (n) => `R ${n.toLocaleString('en-ZA')}`

/**
 * The message the slip sends — also rendered as the preview, so what the
 * customer reads on the slip is exactly what arrives on our phone.
 *
 * WhatsApp formatting: *bold*. Stock lines are priced and totalled; lines we
 * are not holding are listed separately as an availability question, because
 * they need a different reply and must not be in a total someone pays.
 */
export function orderMessage(slip) {
  const { lines, reference, name, deliverTo, note } = slip
  const ready = orderable(lines)
  const check = toCheck(lines)
  const out = [`Hi STRIATA, I'd like to place an order.`, '', `*Order ${reference ?? ''}*`.trim()]

  if (ready.length) {
    out.push('')
    for (const l of ready) {
      out.push(`${l.qty} × ${l.name} (${l.format}, ${l.dose}) — ${rand(l.price * l.qty)}`)
      if (l.detail) out.push(`    ${l.detail}`)
    }
    const delivery = deliveryFor(slip)
    out.push(
      '',
      `Subtotal: ${rand(subtotal(lines))}`,
      `${delivery.label}: ${delivery.price ? rand(delivery.price) : 'free'}`,
      `*Total: ${rand(orderTotal(slip))}*`,
    )
  }
  if (check.length) {
    out.push('', ready.length ? '*Please also check availability of:*' : '*Please check availability of:*')
    for (const l of check) {
      out.push(`${l.qty} × ${l.name} (${l.format}, ${l.dose})`)
      if (l.detail) out.push(`    ${l.detail}`)
    }
  }

  const details = [name.trim() && `Name: ${name.trim()}`, deliverTo.trim() && `Deliver to: ${deliverTo.trim()}`, note.trim() && `Note: ${note.trim()}`].filter(Boolean)
  if (details.length) out.push('', ...details)

  out.push('', ready.length ? 'Please send me payment details.' : 'Thank you.')
  return out.join('\n')
}

export function orderLink(slip) {
  return `${whatsappLink}?text=${encodeURIComponent(orderMessage(slip))}`
}

export function trackOrderSent(slip) {
  trackEvent('begin_checkout', {
    currency: 'ZAR',
    value: orderTotal(slip),
    shipping: deliveryFor(slip)?.price ?? 0,
    transaction_id: slip.reference,
    items: slip.lines.map((l) => ({ item_name: l.name, item_variant: `${l.format} ${l.dose}`, price: l.price, quantity: l.qty })),
  })
}

/** The single-item enquiry that sits beside "Add to order" everywhere. */
export function enquiryLink(product, tier, format) {
  const label = format && format !== 'Vial' ? `${product.name} (${format})` : product.name
  const message = !tier
    ? `Hi STRIATA, I have a question about *${label}*.`
    : `Hi STRIATA, I have a question about *${label}* — ${tier.dose} @ ${rand(tier.price)}.`
  return `${whatsappLink}?text=${encodeURIComponent(message)}`
}
