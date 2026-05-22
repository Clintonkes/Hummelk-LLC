import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shadow-md group-hover:bg-sky transition-colors duration-200">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-navy text-lg leading-tight">Hummelk LLC</div>
              <div className="text-xs text-gray-500 leading-tight">Professional Cleaning</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={clsx('nav-link text-sm pb-1', pathname === to && 'nav-link-active text-navy')}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:14405542773" className="flex items-center gap-2 text-navy hover:text-sky transition-colors duration-200">
              <Phone size={16} className="text-sky" />
              <span className="font-semibold text-sm">1(440) 554-2773</span>
            </a>
            <Link to="/booking" className="btn-primary text-sm px-5 py-2.5">
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} className="text-navy" /> : <Menu size={24} className="text-navy" />}
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 py-4 px-4 animate-fade-in">
            {LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={clsx(
                  'block py-3 px-4 rounded-xl font-medium transition-colors duration-200',
                  pathname === to ? 'bg-navy/5 text-navy' : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                )}
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a href="tel:14405542773" className="flex items-center gap-2 px-4 text-navy font-semibold">
                <Phone size={16} className="text-sky" />
                1(440) 554-2773
              </a>
              <Link to="/booking" className="btn-primary justify-center">Book Now</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
