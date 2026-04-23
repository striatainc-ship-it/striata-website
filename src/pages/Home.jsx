import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { whatsappLink } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const IC = ({ children }) => (
  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-4">
    {children}
  </div>
)

const categories = [
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      </IC>
    ),
    label: 'Recovery & Performance', desc: 'Push harder. Lift heavier. Break limits.', to: '/catalogue?cat=recovery',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      </IC>
    ),
    label: 'Skin, Hair & Anti-Aging', desc: 'Regenerate. Rejuvenate. Renew.', to: '/catalogue?cat=skin',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </IC>
    ),
    label: 'Hormonal & Sexual Health', desc: 'Optimise. Balance. Perform.', to: '/catalogue?cat=hormonal',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        </svg>
      </IC>
    ),
    label: 'Weight Loss & Metabolism', desc: 'Optimise your metabolism. Reclaim your body.', to: '/catalogue?cat=weight',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
        </svg>
      </IC>
    ),
    label: 'Brain, Mood & Sleep', desc: 'Sharpen your mind. Sustain your drive.', to: '/catalogue?cat=brain',
  },
  {
    icon: (
      <IC>
        <svg className="w-7 h-7 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      </IC>
    ),
    label: 'Immunity & Longevity', desc: 'Age on your terms. Stay ahead of time.', to: '/catalogue?cat=immunity',
  },
]

const testimonials = [
  {
    text: "I've been using BPC-157 for recovery after training and the difference is night and day. My joints feel better than they have in years. STRIATA's quality is unmatched and the WhatsApp support is incredibly responsive.",
    name: 'Luca M.',
    location: 'Johannesburg',
  },
  {
    text: "Started on the Wolverine Stack about 8 weeks ago. Recovery time has dropped significantly and I'm training harder than ever. Delivery was fast and the product arrived perfectly packaged.",
    name: 'Ashleigh P.',
    location: 'Cape Town',
  },
  {
    text: "As a wellness clinic we've been sourcing peptides for our clients through STRIATA for several months now. The consistency of quality and reliability of stock availability makes them our go-to supplier.",
    name: 'Dr. K. Naidoo',
    location: 'Durban',
  },
  {
    text: "The NAD+ has completely changed my energy levels. I used to hit a wall every afternoon. That's gone. Ordered twice now and both times the process was seamless.",
    name: 'Ruan V.',
    location: 'Pretoria',
  },
  {
    text: "Skeptical at first but the results speak for themselves. Three months on Semax and my focus and mental clarity are on another level. STRIATA made the whole process easy.",
    name: 'Taryn O.',
    location: 'Stellenbosch',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const heroTextRef = useRef(null)
  const scrollBeatRef = useRef(null)
  const beatInnerRef = useRef(null)
  const beatTextRefs = useRef([])
  const sectionsRef = useRef([])
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        heroTextRef.current?.querySelectorAll('.hero-animate') || [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      )

      // Scroll beat text animation
      if (beatInnerRef.current) {
        const beats = beatTextRefs.current.filter(Boolean)
        if (beats.length === 3) {
          gsap.set(beats, { opacity: 0, y: 40 })

          const tl = gsap.timeline()
          tl.to(beats[0], { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
          tl.to({}, { duration: 2 })
          tl.to(beats[0], { opacity: 0, y: -40, duration: 1, ease: 'power2.in' })
          tl.to(beats[1], { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '<')
          tl.to({}, { duration: 2 })
          tl.to(beats[1], { opacity: 0, y: -40, duration: 1, ease: 'power2.in' })
          tl.to(beats[2], { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '<')
          tl.to({}, { duration: 2 })
          tl.to(beats[2], { opacity: 0, y: -40, duration: 1, ease: 'power2.in' })

          ScrollTrigger.create({
            trigger: beatInnerRef.current,
            start: 'top top',
            end: '+=210%',
            pin: true,
            scrub: 1,
            animation: tl,
          })
        }
      }

      // Fade-in sections
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
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5
  }, [])

  const addSectionRef = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el)
  }

  return (
    <div className="bg-[#0A1628]">
      {/* ── HERO ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src={`${import.meta.env.BASE_URL}assets/hero-video.mp4`} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-transparent to-[#0A1628]" />

        <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="hero-animate inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-6 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4B4]" />
            South Africa's Premier Research Peptide Source
          </div>
          <h1
            className="hero-animate font-black text-white leading-none tracking-tight mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">THINK STRONG.</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#00B4B4]">TRAIN SMARTER.</span>
          </h1>
          <p className="hero-animate text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            South Africa's premier source for research-grade peptides. Purity you can trust. Performance you can feel.
          </p>
          <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {WA_ICON}
              Enquire on WhatsApp
            </a>
            <Link
              to="/catalogue"
              className="flex items-center gap-2 text-white/70 hover:text-white font-semibold text-base px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Browse Catalogue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <p className="hero-animate mt-6 text-white/30 text-sm flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Typically responds within 1 hour during business hours
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── SCROLL BEAT ANIMATION ──────────────────── */}
      <section ref={scrollBeatRef} className="relative">
        <div ref={beatInnerRef} className="h-[100svh] flex items-center justify-center overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/vial layouts 2.png`}
            alt="STRIATA peptide vials"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-transparent to-[#0A1628]/70" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 text-center">
            <div className="relative h-64 md:h-72 flex items-center justify-center">
              {[
                <><span className="block">Pure.</span><span className="block">Potent.</span><span className="block">Proven.</span></>,
                <span className="block">Research-grade peptides, delivered to your door.</span>,
                <><span className="block">Think Strong.</span><span className="block text-[#00B4B4]">Train Smarter.</span></>,
              ].map((content, i) => (
                <p
                  key={i}
                  ref={(el) => (beatTextRefs.current[i] = el)}
                  className="absolute inset-x-0 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif', opacity: 0 }}
                >
                  {content}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────── */}
      <section ref={addSectionRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What Are You <span className="text-[#00B4B4]">Training For?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our full catalogue of research-grade peptides, each category precision-selected to support your goals.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(({ icon, label, desc, to }) => (
            <Link
              key={label}
              to={to}
              className="group bg-[#0d1e35] border border-white/8 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#00B4B4]/40 hover:bg-[#0f2340] transition-all duration-300 hover:shadow-lg hover:shadow-[#00B4B4]/5 hover:-translate-y-1"
            >
              {icon}
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#00B4B4] transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {label}
              </h3>
              <p className="text-white/50 text-sm">{desc}</p>
              <div className="mt-4 flex items-center justify-center gap-1 text-[#00B4B4] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Explore
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 text-[#00B4B4] hover:text-white font-semibold text-base border border-[#00B4B4]/30 hover:bg-[#00B4B4] px-8 py-3.5 rounded-full transition-all duration-200"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Browse the Full Catalogue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── ABOUT SNAPSHOT ────────────────────────── */}
      <section ref={addSectionRef} className="py-24 bg-[#060e1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}assets/purity 2.png`}
              alt="STRIATA"
              className="rounded-3xl w-full object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-[#00B4B4] rounded-2xl p-4 md:p-6 shadow-xl">
              <p className="text-white font-black text-2xl md:text-3xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>2021</p>
              <p className="text-white/80 text-sm">Founded in SA</p>
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-5 bg-[#00B4B4]/10 border border-[#00B4B4]/20 px-4 py-2 rounded-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Our Story
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Built by People Who <span className="text-[#00B4B4]">Believe in Better</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              STRIATA was founded in 2021 by a team with deep roots in the health and medical supply industry. When the world was navigating the uncertainty of a global pandemic, we were already on the ground, sourcing and supplying critical medical products to those who needed them most.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              STRIATA was built to fill the gap. To bring world-class, research-grade peptides to South Africans at pricing that doesn't punish you for wanting to take your health seriously.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Learn More About Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ─────────────────────────── */}
      <section ref={addSectionRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Purity You Can <span className="text-[#00B4B4]">Count On</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We don't cut corners. Every product in the STRIATA catalogue meets strict research-grade standards so you always know exactly what you're getting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.746 3.746 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
              ),
              title: '99% Purity Guaranteed',
              desc: 'Every batch is held to a minimum 99% purity standard. No fillers, no compromises. Just the compound, exactly as it should be.',
            },
            {
              icon: (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
              ),
              title: 'Research Grade Only',
              desc: 'All STRIATA peptides are research-grade quality, sourced from trusted suppliers and handled with the precision the science demands.',
            },
            {
              icon: (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
              ),
              title: 'South African Based',
              desc: 'We are proudly South African. Local stock, local support and fast nationwide delivery, with no waiting weeks for international shipments.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-[#0d1e35] border border-white/8 rounded-2xl p-5 md:p-8 text-center">
              {icon}
              <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/purity.png`}
            alt="Lab purity standards"
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/90 to-transparent flex items-center">
            <div className="px-10 max-w-lg">
              <p className="text-[#00B4B4] text-sm font-bold uppercase tracking-widest mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Certificate of Analysis
              </p>
              <h3 className="text-white text-3xl font-black mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Ask Us for the CoA. We'll Send It.
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Full transparency on every product. Third-party verified, no questions asked.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold px-6 py-3 rounded-full text-sm transition-all duration-200"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {WA_ICON}
                Request a CoA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BULK & BUSINESS ───────────────────────── */}
      <section ref={addSectionRef} className="py-24 bg-gradient-to-br from-[#00B4B4]/10 via-[#060e1a] to-[#0A1628]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Stocking for <span className="text-[#00B4B4]">Your Business?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              STRIATA supplies clinics, wellness centres, gyms and health retailers across South Africa with bulk research-grade peptides at competitive pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" /><path d="M6 6h.008v.008H6V6z" />
                    </svg>
                  </div>
                ),
                title: 'Competitive Bulk Pricing', desc: 'The more you order, the better your rate. We work with businesses of all sizes to find a pricing structure that makes sense.',
              },
              {
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                ),
                title: 'Reliable Stock Availability', desc: 'We maintain consistent local stock levels so your business never has to wait. No backorders, no surprises.',
              },
              {
                icon: (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B4B4]/20 to-[#004444]/5 border border-[#00B4B4]/25 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-[#00B4B4]" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                ),
                title: 'Dedicated Support', desc: 'Your business gets direct WhatsApp support and a dedicated contact for all orders, queries and restocking needs.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-[#0d1e35] border border-white/8 rounded-2xl p-7 flex flex-col items-center text-center">
                {icon}
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {WA_ICON}
              Enquire About Bulk Orders
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────── */}
      <section ref={addSectionRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What Our Customers <span className="text-[#00B4B4]">Are Saying</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-[#0d1e35] border border-white/8 rounded-2xl p-7 ${i === 2 ? 'lg:col-span-1' : ''}`}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-[#00B4B4]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <p className="text-white font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t.name}</p>
                <p className="text-white/40 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────── */}
      <section ref={addSectionRef} className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B4B4]/15 to-transparent" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/helix 2.png)` }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Ready to <span className="text-[#00B4B4]">Start?</span>
          </h2>
          <p className="text-white/60 text-base md:text-xl mb-10">
            Browse our full catalogue, get a personalised price list or ask us anything. All on WhatsApp. Our team responds fast.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-200 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-1"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {WA_ICON}
            Chat to Us on WhatsApp
          </a>
          <p className="mt-5 text-white/30 text-sm flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Typically responds within 1 hour during business hours
          </p>
        </div>
      </section>
    </div>
  )
}
