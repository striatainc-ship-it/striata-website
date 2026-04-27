import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { whatsappLink } from '../data/products'

const WA_SVG = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const CATALOGUE_ICON = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
)

const STACKS_ICON = (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
  </svg>
)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/learn', label: 'Learn' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [catalogueOpen, setCatalogueOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setCatalogueOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCatalogueOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  const isCatalogueActive =
    location.pathname.startsWith('/catalogue') || location.pathname.startsWith('/stacks')

  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ${
        scrolled
          ? 'top-0 left-0 right-0 md:top-3 md:left-3 md:right-3 bg-[#0A1628]/96 backdrop-blur-md shadow-xl shadow-black/40 border-b md:border md:rounded-2xl border-white/10'
          : 'top-0 left-0 right-0 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" aria-label="STRIATA home">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">

            {/* Catalogue dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCatalogueOpen(!catalogueOpen)}
                aria-expanded={catalogueOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B4B4] rounded-sm ${
                  isCatalogueActive ? 'text-[#00B4B4]' : 'text-white/80 hover:text-white'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Shop
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${catalogueOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 transition-all duration-200 origin-top ${
                  catalogueOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'
                }`}
              >
                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0d1e35] border-l border-t border-white/10 rotate-45" />

                <div className="relative bg-[#0d1e35] rounded-2xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden mt-1.5">
                  <Link
                    to="/catalogue"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors duration-150 group border-b border-white/8"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] flex-shrink-0 group-hover:bg-[#00B4B4]/20 transition-colors duration-150">
                      {CATALOGUE_ICON}
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Complete Catalogue</p>
                      <p className="text-white/45 text-xs mt-0.5">80+ research-grade peptides</p>
                    </div>
                  </Link>
                  <Link
                    to="/stacks"
                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors duration-150 group"
                  >
                    <span className="w-10 h-10 rounded-xl bg-[#00B4B4]/10 flex items-center justify-center text-[#00B4B4] flex-shrink-0 group-hover:bg-[#00B4B4]/20 transition-colors duration-150">
                      {STACKS_ICON}
                    </span>
                    <div>
                      <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>Peptide Stacks</p>
                      <p className="text-white/45 text-xs mt-0.5">10 curated goal-specific protocols</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(to) ? 'text-[#00B4B4]' : 'text-white/80 hover:text-white'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#00B4B4] hover:bg-[#009999] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/30"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {WA_SVG}
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-3.5 -mr-1 min-h-[44px] min-w-[44px] flex flex-col justify-center cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-white my-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0A1628]/98 backdrop-blur-md px-6 pb-6 pt-2 border-t border-white/10">

          {/* Shop expandable section */}
          <button
            onClick={() => setMobileShopOpen(!mobileShopOpen)}
            className={`w-full flex items-center justify-between py-3 text-base font-medium border-b border-white/5 transition-colors cursor-pointer ${
              isCatalogueActive ? 'text-[#00B4B4]' : 'text-white/80'
            }`}
          >
            Shop
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className={`overflow-hidden transition-all duration-200 ${mobileShopOpen ? 'max-h-40' : 'max-h-0'}`}>
            <Link to="/catalogue" className="flex items-center gap-3 pl-4 py-3 text-sm text-white/70 border-b border-white/5 hover:text-[#00B4B4] transition-colors">
              <svg className="w-4 h-4 text-[#00B4B4]/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg>
              Complete Catalogue
            </Link>
            <Link to="/stacks" className="flex items-center gap-3 pl-4 py-3 text-sm text-white/70 border-b border-white/5 hover:text-[#00B4B4] transition-colors">
              <svg className="w-4 h-4 text-[#00B4B4]/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg>
              Peptide Stacks
            </Link>
          </div>

          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block py-3 text-base font-medium border-b border-white/5 transition-colors ${
                isActive(to) ? 'text-[#00B4B4]' : 'text-white/80'
              }`}
            >
              {label}
            </Link>
          ))}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 bg-[#00B4B4] text-white font-semibold py-3 rounded-full"
          >
            {WA_SVG}
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}
