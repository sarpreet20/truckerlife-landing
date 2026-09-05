import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { APP_STORE_URL, PRIVACY_URL, TERMS_URL } from '../config'

function homeHash(pathname, hash) {
  return pathname === '/' ? hash : `/${hash}`
}

export function SiteLayout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(location.pathname)
  const [scrolled, setScrolled] = useState(false)

  if (location.pathname !== menuPath) {
    setMenuPath(location.pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])

  // SPA page views for GA4 (initial load is handled by the gtag config in index.html)
  useEffect(() => {
    if (typeof window.gtag !== 'function') return
    window.gtag('config', 'G-GT89F9EBTJ', {
      page_path: `${location.pathname}${location.search}${location.hash}`,
    })
  }, [location.pathname, location.search, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const path = location.pathname

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <Link to="/" className="nav__brand" onClick={closeMenu}>
            <span className="nav__mark" aria-hidden>
              T
            </span>
            Trucker Life AI
          </Link>
          <nav className={`nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'is-current' : undefined)}>
              Home
            </NavLink>
            <a href={homeHash(path, '#features')} onClick={closeMenu}>
              Features
            </a>
            <a href={homeHash(path, '#pricing')} onClick={closeMenu}>
              Pricing
            </a>
            <a href={homeHash(path, '#about-us')} onClick={closeMenu}>
              About Us
            </a>
            <NavLink
              to="/blog"
              end
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? 'is-current' : undefined)}>
              Blog
            </NavLink>
            <a
              href={APP_STORE_URL}
              className="btn btn--sm btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}>
              Download
            </a>
          </nav>
          <button
            type="button"
            className={`nav__burger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {children}
      <footer className="footer" id="support">
        <div className="container footer__inner">
          <div className="footer__top">
            <Link to="/" className="footer__brand">
              <span className="nav__mark" aria-hidden>
                T
              </span>
              Trucker Life AI
            </Link>
            <nav className="footer__links" aria-label="Footer">
              <a href={homeHash(path, '#features')}>Features</a>
              <a href={homeHash(path, '#pricing')}>Pricing</a>
              <Link to="/blog">Blog</Link>
              <a href={homeHash(path, '#about-us')}>About Us</a>
              <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                Privacy
              </a>
              <a href={TERMS_URL} target="_blank" rel="noopener noreferrer">
                Terms
              </a>
            </nav>
          </div>
          <p className="footer__copy">
            © {new Date().getFullYear()} Trucker Life AI. Built for owner-operators, by an owner-operator.
          </p>
        </div>
      </footer>
    </>
  )
}
