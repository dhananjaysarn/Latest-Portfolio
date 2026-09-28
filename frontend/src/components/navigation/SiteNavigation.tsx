import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigationItems, siteConfig } from '../../config/site'
import { useTheme } from '../../context/ThemeProvider'

export function SiteNavigation() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const sections = navigationItems
      .map(({ href }) => document.querySelector(href))
      .filter((element): element is Element => element !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="#home" aria-label="Dhananjay — Home" onClick={closeMenu}>
          <span className="wordmark__mark">D<span>.</span></span>
          <span className="wordmark__name">DHANANJAY<small>ENGINEER / BUILDER</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigationItems.map((item, index) => {
            const id = item.href.slice(1)
            return (
              <a key={id} href={item.href} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'location' : undefined}>
                <span className="desktop-nav__number">0{index + 1}</span>{item.label}
              </a>
            )
          })}
        </nav>
        <div className="site-header__actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {siteConfig.links.resume && <a className="header-resume" href={siteConfig.links.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={13} /></a>}
          <button
            className="mobile-menu-trigger"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span className={`menu-trigger-icon ${menuOpen ? 'is-open' : ''}`}><Menu size={20} /><X size={20} /></span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mobile-nav__top"><span>DHANANJAY.OS <i /></span><button type="button" onClick={closeMenu} aria-label="Close navigation"><X size={18} /></button></div>
            <div className="mobile-nav__items">
              {navigationItems.map((item, index) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className={active === item.href.slice(1) ? 'is-active' : ''}>
                  <span>0{index + 1}</span>{item.label}<ArrowDownRight size={20} />
                </a>
              ))}
            </div>
            <p>Building ideas into systems, one thoughtful decision at a time.</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
