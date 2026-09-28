import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LoadingScreen } from '../components/loaders/LoadingScreen'
import { SiteNavigation } from '../components/navigation/SiteNavigation'
import { CustomCursor } from '../components/navigation/CustomCursor'
import { siteConfig } from '../config/site'

export function PortfolioLayout() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 140 : 900)
    return () => window.clearTimeout(timeout)
  }, [])

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <a className="sr-only focus:not-sr-only" href="#main-content">Skip to content</a>
      <LoadingScreen visible={loading} />
      <SiteNavigation />
      <Outlet />
      <footer className="site-footer">
        <div className="site-footer__main">
          <a className="site-footer__brand" href="#home">Dhananjay<span>.</span></a>
          <p>Full-Stack Developer · AI Builder<br />{siteConfig.location}</p>
          <div className="site-footer__links flex flex-wrap gap-4 text-xs mt-3 text-muted">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub ↗</a>
            <a href={siteConfig.links.linkedIn} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn ↗</a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-accent transition-colors">{siteConfig.contactEmail}</a>
          </div>
          <a className="site-footer__top mt-4 inline-block" href="#home">Back to top <ArrowUpRightIcon /></a>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} DHANANJAY RAJAN SARNAIK</span>
          <span>SAWANTWADI, MAHARASHTRA, INDIA</span>
          <a href="#contact">GET IN TOUCH ↗</a>
        </div>
      </footer>
    </div>
  )
}

function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>
}
