import { useState } from 'react'
import { vialSrc } from '../data/products'

/**
 * The vial, cut out of its studio background, on a soft teal stage.
 *
 * A product with more than one shot (bacteriostatic water is photographed in
 * both its sizes) gets thumbnails under the stage. The first shot is the one
 * structured data and the social card use, so the switcher is presentation
 * only and nothing downstream depends on which is showing.
 */
export default function VialShot({ image, alt, labels, priority }) {
  const [active, setActive] = useState(0)

  if (!image) {
    return (
      <div className="aspect-[4/5] rounded-3xl border border-white/8 bg-[#0d1e35] grid place-items-center">
        <span className="text-white/25 text-sm">Photography coming soon</span>
      </div>
    )
  }

  const { names } = image
  const name = names[active] ?? names[0]
  const caption = labels?.[active]

  return (
    <div>
      <div className="relative aspect-[4/5]">
        {/* A radial wash behind the glass so the vial reads as lit rather than
            pasted onto the navy. */}
        <div
          className="absolute inset-[8%] rounded-full blur-3xl opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(0,180,180,0.22), transparent 68%)' }}
        />
        <img
          key={name}
          src={vialSrc(name, 960)}
          srcSet={`${vialSrc(name, 320)} 320w, ${vialSrc(name, 640)} 640w, ${vialSrc(name, 960)} 960w`}
          sizes="(min-width: 1024px) 360px, 55vw"
          alt={caption ? `${alt} — ${caption}` : alt}
          width={960}
          height={1920}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="relative w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {names.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {names.map((shot, i) => (
            <button
              key={shot}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-colors ${
                i === active
                  ? 'border-[#00B4B4]/60 bg-[#00B4B4]/10'
                  : 'border-white/8 bg-white/[0.03] hover:border-white/20'
              }`}
            >
              <img
                src={vialSrc(shot, 160)}
                alt=""
                width={160}
                height={320}
                loading="lazy"
                decoding="async"
                className="w-5 h-10 object-contain"
              />
              {labels?.[i] && (
                <span className={`text-[10px] font-mono ${i === active ? 'text-[#00B4B4]' : 'text-white/40'}`}>
                  {labels[i]}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
