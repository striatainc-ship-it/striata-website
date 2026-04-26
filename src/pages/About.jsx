import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whatsappLink } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const stats = [
  { num: 100, suffix: '+', label: 'Research-Grade Compounds' },
  { num: 99, suffix: '%', label: 'Purity Guaranteed' },
  { num: 500, suffix: '+', label: 'Happy Clients' },
  { num: 50, suffix: '+', label: 'Businesses Supplied' },
]

const IC = ({ children }) => (
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-4">
    {children}
  </div>
)

const values = [
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </IC>
    ),
    title: 'Purity',
    desc: 'Every product in the STRIATA catalogue meets a minimum 99% purity standard. No fillers. No shortcuts. Just the compound, exactly as it should be.',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </IC>
    ),
    title: 'Transparency',
    desc: "We independently verify our products through third-party laboratory testing. If you want the certificate, just ask and we'll send it. No questions asked.",
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      </IC>
    ),
    title: 'Accessibility',
    desc: "World-class peptide science shouldn't come with a world-class price tag. We've built our pricing to be fair, competitive and accessible, without compromising on quality.",
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      </IC>
    ),
    title: 'Trust',
    desc: 'We supply dozens of businesses and hundreds of satisfied clients across South Africa. Our reputation is built on consistency, reliability and doing exactly what we say we will.',
  },
]

export default function About() {
  const sectionsRef = useRef([])
  const statRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })

      statRefs.current.forEach((el, i) => {
        if (!el) return
        const { num, suffix } = stats[i]
        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 2,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const addRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
  }

  const addStatRef = (el, i) => { statRefs.current[i] = el }

  return (
    <div className="bg-[#0A1628]">
      <Helmet>
        <title>About STRIATA | Research-Grade Peptides Johannesburg</title>
        <meta name="description" content="STRIATA is South Africa's trusted source for pharmaceutical-grade peptides. Based in Johannesburg, we supply clinics, athletes and biohackers with 99%+ purity compounds." />
        <link rel="canonical" href="https://striatalabs.co.za/about" />
        <meta property="og:title" content="About STRIATA | Research-Grade Peptides Johannesburg" />
        <meta property="og:description" content="South Africa's trusted source for pharmaceutical-grade peptides. Based in Johannesburg." />
        <meta property="og:url" content="https://striatalabs.co.za/about" />
      </Helmet>
      {/* Hero Banner */}
      <section className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/lab equipment 1.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 to-[#0A1628]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Our Story
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-none" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            About <span className="text-[#00B4B4]">STRIATA</span>
          </h1>
          <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto">
            South Africa's benchmark for peptide purity and trust.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-12 bg-[#060e1a] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map(({ num, suffix, label }, i) => (
              <div key={label} className="text-center">
                <p
                  ref={(el) => addStatRef(el, i)}
                  className="text-3xl md:text-5xl font-black text-[#00B4B4] mb-1"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  0{suffix}
                </p>
                <p className="text-white/50 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section ref={addRef} className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Where It Started
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Born from a <span className="text-[#00B4B4]">Crisis.</span> Built for <span className="text-[#00B4B4]">Performance.</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                STRIATA was founded in 2021, not in a boardroom, but on the ground, during one of the most disruptive periods in modern history. When the world was navigating the uncertainty of the COVID-19 pandemic, our team was already in the thick of it, sourcing and supplying critical medical products to individuals and businesses across South Africa who needed them most.
              </p>
              <p>
                When the world began to stabilise, something became clear: people had woken up to the importance of their health in a way they never had before. Performance, recovery, longevity. These weren't niche conversations anymore. They were mainstream.
              </p>
              <p>
                In 2025, we made a deliberate shift. We looked at the peptide market in South Africa and saw the same problems everywhere: overpriced products, questionable quality, and a complete lack of transparency. Nobody was doing it properly. So we decided to.
              </p>
              <p>
                STRIATA was built to fill that gap. To bring world-class, research-grade peptides to South Africans at pricing that doesn't punish you for wanting to take your health seriously.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/image 1.png`}
              alt="STRIATA lab"
              className="rounded-3xl w-full object-cover aspect-[4/5]"
            />
            <div className="hidden sm:block absolute -top-4 -left-4 bg-[#0d1e35] border border-white/10 rounded-2xl p-5 shadow-xl">
              <p className="text-[#00B4B4] font-black text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>2021</p>
              <p className="text-white/60 text-xs mt-0.5">Founded in SA</p>
            </div>
            <div className="hidden sm:block absolute -bottom-4 -right-4 bg-[#00B4B4] rounded-2xl p-5 shadow-xl">
              <p className="text-white font-black text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>99%</p>
              <p className="text-white/80 text-xs mt-0.5">Purity Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section ref={addRef} className="py-24 bg-gradient-to-br from-[#00B4B4]/8 via-[#060e1a] to-[#060e1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/athlete 2.png`}
              alt="Training athlete"
              className="rounded-3xl w-full object-cover aspect-[4/5]"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Our Mission
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Why We <span className="text-[#00B4B4]">Exist</span>
            </h2>
            <blockquote className="border-l-4 border-[#00B4B4] pl-5 mb-6">
              <p className="text-white/80 text-xl italic leading-relaxed">
                "South Africa's benchmark for peptide purity and trust."
              </p>
            </blockquote>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                We exist for the athlete chasing one more personal best. The professional who can't afford to slow down. The person who has tried everything and wants something that actually works. And the business that needs a supplier they can rely on.
              </p>
              <p>
                Our mission is simple: give every South African access to the science that was once reserved for the few. No gatekeeping. No inflated margins. Just pure, verified compounds and honest service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Peptides */}
      <section ref={addRef} className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              The Science
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              The Science Behind <span className="text-[#00B4B4]">the Compound</span>
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Peptides are short chains of amino acids, the fundamental building blocks of proteins in the human body. They act as biological messengers, signalling cells to perform specific functions: repair tissue, release growth hormone, burn fat, regulate sleep, enhance cognition and much more.
              </p>
              <p>
                Unlike synthetic drugs, peptides work with your body's existing systems rather than overriding them. This makes them one of the most exciting areas of modern health and performance research, and one of the fastest growing globally.
              </p>
              <p>
                At STRIATA, every compound in our catalogue is selected based on research evidence, purity standards and real-world results. We don't stock something just because it's trending; we stock it because the science supports it.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/helix 2.png`}
              alt="DNA helix"
              className="rounded-3xl w-full object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={addRef} className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              What We <span className="text-[#00B4B4]">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-7 hover:border-[#00B4B4]/30 transition-colors">
                {icon}
                <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proudly SA */}
      <section ref={addRef} className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/hero background 2.png`}
            alt="South Africa"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/70 to-transparent flex items-center">
            <div className="px-6 md:px-10 max-w-lg">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Local Stock. Local Support. <span className="text-[#00B4B4]">Nationwide Delivery.</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                STRIATA is proudly South African, built here, run here and fully committed to serving this market. We maintain consistent local stock levels so you're never waiting weeks for an international shipment.
              </p>
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold px-6 py-3 rounded-full text-sm transition-all"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Browse the Catalogue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={addRef} className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Ready to Experience <span className="text-[#00B4B4]">the Difference?</span>
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Browse our full catalogue or chat to us directly on WhatsApp and we'll help you find exactly what you need.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {WA_ICON}
          Chat to Us on WhatsApp
        </a>
        <p className="mt-5 text-white/30 text-sm flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Typically responds within 1 hour during business hours
        </p>
      </section>
    </div>
  )
}
