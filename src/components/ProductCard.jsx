import { useState } from 'react'
import { whatsappLink } from '../data/products'

const WA_ICON = (
  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const ChevronDown = ({ open }) => (
  <svg
    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

function fmtFull(price) {
  return `R ${price.toLocaleString('en-ZA')}`
}

function fmtShort(price) {
  return price >= 1000
    ? `R ${(price / 1000).toFixed(1).replace('.0', '')}k`
    : `R ${price}`
}

export default function ProductCard({ product }) {
  const [selectedTier, setSelectedTier] = useState(null)
  const [isPricingOpen, setIsPricingOpen] = useState(false)

  const hasPrices = product.prices && product.prices.length > 0
  const isSingleTier = hasPrices && product.prices.length === 1
  const lowestPrice = hasPrices ? Math.min(...product.prices.map((p) => p.price)) : null
  const useTwoCols = hasPrices && product.prices.length >= 4

  const buildWaLink = () => {
    const tier = selectedTier || (isSingleTier ? product.prices[0] : null)
    const msg = tier
      ? `Hi STRIATA, I'd like to order *${product.name}* — ${tier.dose} @ ${fmtFull(tier.price)}. Please confirm availability.`
      : `Hi STRIATA, I'd like to enquire about *${product.name}*. Please send me pricing and availability.`
    return `${whatsappLink}?text=${encodeURIComponent(msg)}`
  }

  const toggleTier = (tier) => {
    setSelectedTier((prev) => (prev?.dose === tier.dose ? null : tier))
  }

  const mobileSummaryLabel = selectedTier
    ? `${selectedTier.dose} · ${fmtFull(selectedTier.price)}`
    : `from ${fmtShort(lowestPrice)} · ${product.prices.length} sizes`

  return (
    <div className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-3.5 md:p-5 flex flex-col hover:border-[#00B4B4]/40 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4B4]/5">

      {/* Popular badge */}
      {product.featured && (
        <span
          className="self-start text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#00B4B4] bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-2 py-0.5 rounded-full mb-2.5"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          Popular
        </span>
      )}

      {/* Name */}
      <h3
        className="text-white font-bold text-sm md:text-base mb-1.5 md:mb-2 group-hover:text-[#00B4B4] transition-colors leading-snug line-clamp-2"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-white/50 text-xs md:text-sm leading-relaxed flex-1 mb-3 line-clamp-3 md:line-clamp-none">
        {product.description}
      </p>

      {/* Tags — desktop only */}
      {product.tags.length > 0 && (
        <div className="hidden md:flex flex-wrap gap-1.5 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Pricing */}
      {hasPrices && (
        <div className="mb-3 md:mb-4">

          {/* Single tier — same on all screen sizes */}
          {isSingleTier ? (
            <div className="flex items-center justify-between bg-[#00B4B4]/8 border border-[#00B4B4]/20 rounded-xl px-3 py-2.5">
              <span className="text-white/70 text-xs font-mono tracking-wide">
                {product.prices[0].dose}
              </span>
              <span className="text-white text-sm font-bold">
                {fmtFull(product.prices[0].price)}
              </span>
            </div>
          ) : (
            <>
              {/* ── MOBILE: accordion toggle ── */}
              <button
                onClick={() => setIsPricingOpen((o) => !o)}
                className={`md:hidden w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isPricingOpen
                    ? 'bg-[#00B4B4]/10 border border-[#00B4B4]/40 text-[#00B4B4]'
                    : 'bg-white/[0.05] border border-white/10 text-white/70'
                }`}
              >
                <span className={selectedTier ? 'text-[#00B4B4]' : ''}>{mobileSummaryLabel}</span>
                <ChevronDown open={isPricingOpen} />
              </button>

              {/* Mobile expanded tiers */}
              {isPricingOpen && (
                <div className="md:hidden mt-1.5 flex flex-col gap-1">
                  {product.prices.map((tier) => {
                    const isSelected = selectedTier?.dose === tier.dose
                    return (
                      <button
                        key={tier.dose}
                        onClick={() => toggleTier(tier)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#00B4B4]/15 border border-[#00B4B4]/60 text-white'
                            : 'bg-white/[0.04] border border-white/8 text-white/60'
                        }`}
                      >
                        <span className="font-mono tracking-wide">{tier.dose}</span>
                        <span className={`font-bold tabular-nums ${isSelected ? 'text-[#00B4B4]' : ''}`}>
                          {fmtFull(tier.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ── DESKTOP: always-visible tile grid ── */}
              <div className="hidden md:block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
                    Pricing · 1 Vial
                  </span>
                  <span className="text-[#00B4B4] text-xs font-bold">
                    from {fmtShort(lowestPrice)}
                  </span>
                </div>
                <div className={`grid gap-1.5 ${useTwoCols ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {product.prices.map((tier) => {
                    const isSelected = selectedTier?.dose === tier.dose
                    return (
                      <button
                        key={tier.dose}
                        onClick={() => toggleTier(tier)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                          isSelected
                            ? 'bg-[#00B4B4]/15 border border-[#00B4B4]/60 text-white shadow-sm shadow-[#00B4B4]/10'
                            : 'bg-white/[0.04] border border-white/8 text-white/60 hover:border-white/20 hover:text-white/80 hover:bg-white/[0.07]'
                        }`}
                      >
                        <span className="font-mono tracking-wide">{tier.dose}</span>
                        <span className={`font-bold tabular-nums ${isSelected ? 'text-[#00B4B4]' : ''}`}>
                          {fmtFull(tier.price)}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="mt-1.5 text-white/25 text-[10px]">
                  {selectedTier ? `✓ ${selectedTier.dose} selected` : 'Tap a concentration to select'}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Enquire button */}
      <a
        href={buildWaLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center gap-1.5 border text-xs md:text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 mt-auto ${
          selectedTier
            ? 'bg-[#00B4B4] border-[#00B4B4] text-white hover:bg-[#009999] hover:border-[#009999] shadow-md shadow-[#00B4B4]/20'
            : 'bg-[#00B4B4]/10 hover:bg-[#00B4B4] border-[#00B4B4]/30 hover:border-[#00B4B4] text-[#00B4B4] hover:text-white'
        }`}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {WA_ICON}
        <span className="truncate">
          {selectedTier ? `Order ${selectedTier.dose}` : 'Enquire on WhatsApp'}
        </span>
      </a>
    </div>
  )
}
