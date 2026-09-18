import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  useCart,
  openSlip,
  closeSlip,
  clearSlip,
  setQty,
  removeLine,
  setDetails,
  lineCount,
  orderable,
  toCheck,
  subtotal,
  deliveryFor,
  orderTotal,
  setDelivery,
  DELIVERY_OPTIONS,
  orderMessage,
  orderLink,
  trackOrderSent,
} from '../lib/cart'
import { whatsappLink, vialSrc } from '../data/products'
import { SLIP_TARGET_ID } from './AddToOrder'

/*
 * The order slip. The rest of the site is navy; the slip is the one pale
 * surface on it, a paper requisition laid over the page, which is what makes
 * it read as "your order" rather than one more panel. Dashed rules and
 * underline-only fields carry the form metaphor. The WhatsApp preview at the
 * foot is the point of the design: the customer reads the exact message
 * before it opens on their phone, so sending it holds no surprises.
 */

const H = { fontFamily: 'var(--font-heading)' }
const INK = '#0A1628'
const rand = (n) => `R ${n.toLocaleString('en-ZA')}`

const WA_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
const WA_ICON = (cls) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d={WA_PATH} />
  </svg>
)
const SLIP_ICON = (cls) => (
  <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" />
    <path d="M9 8h6M9 11.5h6M9 15h3.5" />
  </svg>
)

/**
 * The corner button. With nothing on the slip it is the familiar WhatsApp
 * chat button; once something is added it becomes the way back to the slip,
 * showing the count and running total. It pops once each time a line is
 * added, keyed on the store's `pulse` counter.
 */
export function SlipFab() {
  const { lines, pulse } = useCart()
  const count = lineCount(lines)
  const total = subtotal(lines)

  if (!count) {
    return (
      <a
        id={SLIP_TARGET_ID}
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5a] rounded-full flex items-center justify-center shadow-xl shadow-green-900/40 transition-all duration-200 hover:scale-110"
      >
        {WA_ICON('w-7 h-7 text-white')}
      </a>
    )
  }

  return (
    <button
      id={SLIP_TARGET_ID}
      key={pulse}
      type="button"
      onClick={openSlip}
      className="slip-pop fixed bottom-5 right-5 z-50 flex items-center gap-3 pl-4 pr-5 h-14 rounded-full bg-[#EEF3F2] text-[#0A1628] shadow-2xl shadow-black/50 ring-1 ring-black/5 hover:-translate-y-0.5 transition-transform cursor-pointer"
      aria-label={`Open your order slip, ${count} item${count === 1 ? '' : 's'}`}
    >
      <span className="relative">
        {SLIP_ICON('w-6 h-6')}
        <span className="absolute -top-2 -right-2.5 min-w-5 h-5 px-1 rounded-full bg-[#00B4B4] text-white text-[11px] font-bold grid place-items-center tabular-nums">
          {count}
        </span>
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-sm font-bold" style={H}>Your order</span>
        <span className="text-[11px] text-[#0A1628]/55 tabular-nums">{total ? rand(total) : 'Availability check'}</span>
      </span>
    </button>
  )
}

/** Slip icon for the navbar, with the count once there is something on it. */
export function SlipNavButton({ className = '' }) {
  const { lines } = useCart()
  const count = lineCount(lines)
  return (
    <button
      type="button"
      onClick={openSlip}
      className={`relative text-white/75 hover:text-white p-2.5 min-h-[44px] min-w-[44px] grid place-items-center cursor-pointer transition-colors ${className}`}
      aria-label={count ? `Your order slip, ${count} item${count === 1 ? '' : 's'}` : 'Your order slip'}
    >
      {SLIP_ICON('w-6 h-6')}
      {count > 0 && (
        <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#00B4B4] text-white text-[10px] font-bold grid place-items-center tabular-nums">
          {count}
        </span>
      )}
    </button>
  )
}

function Stepper({ line }) {
  const btn =
    'w-7 h-7 grid place-items-center rounded-full text-[#0A1628]/70 hover:bg-[#0A1628]/8 hover:text-[#0A1628] cursor-pointer transition-colors'
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={`Quantity of ${line.name}`}>
      <button type="button" className={btn} onClick={() => setQty(line.key, line.qty - 1)} aria-label={line.qty === 1 ? `Remove ${line.name}` : 'One fewer'}>
        {line.qty === 1 ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 7h14M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
          </svg>
        ) : (
          <span aria-hidden="true" className="text-lg leading-none">−</span>
        )}
      </button>
      <span className="w-6 text-center text-sm font-bold tabular-nums">{line.qty}</span>
      <button type="button" className={btn} onClick={() => setQty(line.key, line.qty + 1)} aria-label="One more">
        <span aria-hidden="true" className="text-lg leading-none">+</span>
      </button>
    </div>
  )
}

function Line({ line }) {
  return (
    <li className="flex gap-3 py-4 border-b border-dashed border-[#0A1628]/15 last:border-0">
      <div className="w-9 h-[4.5rem] shrink-0 rounded-lg bg-[#0A1628] grid place-items-center overflow-hidden">
        {line.image ? (
          <img src={vialSrc(line.image, 160)} alt="" width={160} height={320} className="w-7 h-14 object-contain" loading="lazy" decoding="async" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-[#00B4B4]" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {line.href ? (
              <Link to={line.href} onClick={closeSlip} className="font-bold text-[15px] leading-snug hover:underline underline-offset-2" style={H}>
                {line.name}
              </Link>
            ) : (
              <p className="font-bold text-[15px] leading-snug" style={H}>{line.name}</p>
            )}
            <p className="text-[#0A1628]/55 text-xs mt-0.5">
              {line.format}, {line.dose}
            </p>
            {line.detail && <p className="text-[#0A1628]/45 text-[11px] leading-snug mt-1">{line.detail}</p>}
          </div>
          <p className="text-sm font-bold tabular-nums shrink-0">
            {line.inStock ? rand(line.price * line.qty) : <span className="text-[#0A1628]/45 font-semibold">To confirm</span>}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Stepper line={line} />
          <button type="button" onClick={() => removeLine(line.key)} className="text-xs text-[#0A1628]/45 hover:text-[#0A1628] underline-offset-2 hover:underline cursor-pointer">
            Remove
          </button>
        </div>
      </div>
    </li>
  )
}

/**
 * How the parcel ships. A choice between standard and express, unless the
 * slip settles it: pens force cold-chain express.
 */
function Delivery({ slip }) {
  const delivery = deliveryFor(slip)
  if (!delivery) return null

  if (delivery.locked) {
    return (
      <div className="mt-5 rounded-xl border border-[#0A1628]/12 px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-bold" style={H}>{delivery.label}</p>
          <p className="text-sm font-bold tabular-nums">{delivery.price ? rand(delivery.price) : 'Free'}</p>
        </div>
        <p className="text-xs text-[#0A1628]/55 mt-0.5">{delivery.note}</p>
      </div>
    )
  }

  return (
    <fieldset className="mt-5">
      <legend className="text-xs text-[#0A1628]/55 mb-2">Delivery</legend>
      <div className="grid grid-cols-2 gap-2">
        {Object.values(DELIVERY_OPTIONS).map((option) => {
          const active = delivery.id === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setDelivery(option.id)}
              aria-pressed={active}
              className={`text-left rounded-xl px-3.5 py-2.5 border transition-colors cursor-pointer ${
                active ? 'border-[#0A1628] bg-[#0A1628] text-white' : 'border-[#0A1628]/15 hover:border-[#0A1628]/40'
              }`}
            >
              <span className="block text-sm font-bold" style={H}>{option.id === 'standard' ? 'Standard' : 'Express'}</span>
              <span className={`block text-xs tabular-nums ${active ? 'text-white/70' : 'text-[#0A1628]/55'}`}>{rand(option.price)}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Field({ label, value, onChange, placeholder, multiline = false }) {
  const cls =
    'w-full bg-transparent border-0 border-b border-[#0A1628]/25 focus:border-[#007C7C] focus:outline-none focus:ring-0 px-0 py-1.5 text-[15px] placeholder:text-[#0A1628]/30'
  return (
    <label className="block">
      <span className="text-xs text-[#0A1628]/55">{label}</span>
      {multiline ? (
        <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} resize-none`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </label>
  )
}

/**
 * The drawer itself: a side sheet on desktop, a bottom sheet on a phone. It
 * is always in the DOM (closed and `inert` until opened) so opening can
 * animate; the server always renders it closed and empty.
 */
export default function OrderSlip() {
  const slip = useCart()
  const { lines, reference, name, deliverTo, note, open } = slip
  const [sent, setSent] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const closeRef = useRef(null)
  const returnFocus = useRef(null)

  const ready = orderable(lines)
  const check = toCheck(lines)
  const total = subtotal(lines)
  const empty = lines.length === 0

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && closeSlip()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      returnFocus.current?.focus?.()
    }
  }, [open])

  const onSend = () => {
    trackOrderSent(slip)
    setSent(true)
  }

  const onClose = () => {
    setSent(false)
    closeSlip()
  }

  return (
    <div className={`fixed inset-0 z-[60] ${open ? '' : 'pointer-events-none'}`} inert={!open}>
      <div
        className={`absolute inset-0 bg-[#030811]/70 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-slip-title"
        className={`slip-paper absolute bottom-0 right-0 w-full sm:top-3 sm:bottom-3 sm:right-3 sm:w-[420px] max-h-[92dvh] sm:max-h-none flex flex-col rounded-t-3xl sm:rounded-2xl text-[#0A1628] shadow-2xl shadow-black/60 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          open ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-y-0 sm:translate-x-[110%]'
        }`}
        style={{ color: INK }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-7 pb-4">
          <div>
            <h2 id="order-slip-title" className="text-2xl font-black tracking-tight" style={H}>
              Your order slip
            </h2>
            <p className="text-xs text-[#0A1628]/50 mt-1 tabular-nums">
              {reference ? `Reference ${reference}` : 'Add products to start an order'}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-10 h-10 -mr-2 -mt-1 grid place-items-center rounded-full hover:bg-[#0A1628]/8 cursor-pointer"
            aria-label="Close order slip"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {empty ? (
          <div className="px-6 pb-8 pt-4 flex-1">
            <p className="text-[15px] leading-relaxed text-[#0A1628]/70 mb-6">
              Nothing on your slip yet. Add products as you browse, then send the whole order to us on WhatsApp in one message.
            </p>
            <div className="flex flex-col gap-2">
              {[
                ['/catalogue', 'Browse the catalogue'],
                ['/pens', 'Peptide pens'],
                ['/nasal-sprays', 'Nasal sprays'],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#0A1628]/12 hover:border-[#007C7C] hover:text-[#007C7C] font-semibold text-sm transition-colors"
                >
                  {label}
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </div>
        ) : sent ? (
          <div className="px-6 pb-8 pt-4 flex-1">
            <p className="text-lg font-bold mb-2" style={H}>
              WhatsApp should have opened with your order.
            </p>
            <p className="text-[15px] leading-relaxed text-[#0A1628]/70 mb-6">
              Tap send in WhatsApp and we&rsquo;ll reply with payment and delivery details, usually within the hour during
              business hours. Quote {reference} if you contact us about it.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  clearSlip()
                  onClose()
                }}
                className="w-full py-3.5 rounded-xl bg-[#0A1628] text-white font-semibold cursor-pointer hover:bg-[#13233d] transition-colors"
              >
                It&rsquo;s sent, clear my slip
              </button>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="w-full py-3.5 rounded-xl border border-[#0A1628]/15 font-semibold cursor-pointer hover:border-[#0A1628]/40 transition-colors"
              >
                Back to my slip
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto overscroll-contain px-6">
              {ready.length > 0 && (
                <ul className="border-t border-dashed border-[#0A1628]/15">
                  {ready.map((line) => (
                    <Line key={line.key} line={line} />
                  ))}
                </ul>
              )}

              {check.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold" style={H}>
                    We&rsquo;ll check availability
                  </p>
                  <p className="text-xs text-[#0A1628]/55 mt-0.5">
                    Sizes we aren&rsquo;t holding right now. They go in the message as a question and aren&rsquo;t in
                    the total.
                  </p>
                  <ul className="border-t border-dashed border-[#0A1628]/15 mt-2">
                    {check.map((line) => (
                      <Line key={line.key} line={line} />
                    ))}
                  </ul>
                </div>
              )}

              <Delivery slip={slip} />

              <div className="mt-6 flex flex-col gap-4">
                <Field label="Your name (optional)" value={name} onChange={(v) => setDetails({ name: v })} placeholder="So we know who we're talking to" />
                <Field label="Deliver to (optional)" value={deliverTo} onChange={(v) => setDetails({ deliverTo: v })} placeholder="Town or suburb" />
                <Field label="Anything else (optional)" value={note} onChange={(v) => setDetails({ note: v })} placeholder="A question, or a delivery date" multiline />
              </div>

              <div className="mt-6 mb-5">
                <button
                  type="button"
                  onClick={() => setShowMessage((s) => !s)}
                  aria-expanded={showMessage}
                  className="text-xs font-semibold text-[#007C7C] hover:underline underline-offset-2 cursor-pointer"
                >
                  {showMessage ? 'Hide the message' : 'Preview the WhatsApp message'}
                </button>
                {showMessage && (
                  <div className="mt-3 rounded-2xl bg-[#E6DDD4] p-3">
                    <div className="ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2 shadow-sm">
                      <p className="whitespace-pre-wrap break-words text-[13px] leading-snug text-[#111B21]">{orderMessage(slip)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Totals and send, pinned to the foot of the slip */}
            <div className="px-6 pt-4 pb-6 border-t border-dashed border-[#0A1628]/20">
              {ready.length > 0 && (
                <dl className="mb-3">
                  <div className="flex justify-between text-sm text-[#0A1628]/65">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{rand(total)}</dd>
                  </div>
                  <div className="flex justify-between text-sm text-[#0A1628]/65 mt-0.5">
                    <dt>{deliveryFor(slip).label}</dt>
                    <dd className="tabular-nums">{deliveryFor(slip).price ? rand(deliveryFor(slip).price) : 'Free'}</dd>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <dt className="text-sm font-bold" style={H}>Total</dt>
                    <dd className="text-2xl font-black tabular-nums" style={H}>{rand(orderTotal(slip))}</dd>
                  </div>
                </dl>
              )}
              <p className="text-xs text-[#0A1628]/50 mb-4">
                {ready.length ? 'Nothing is charged until you pay. We confirm the order on WhatsApp first.' : 'We’ll confirm availability and pricing on WhatsApp.'}
              </p>
              <a
                href={orderLink(slip)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onSend}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-[#0A1628] font-bold text-[15px] transition-colors"
                style={H}
              >
                {WA_ICON('w-5 h-5')}
                {ready.length ? 'Send order on WhatsApp' : 'Send enquiry on WhatsApp'}
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
