import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useScrollSpy from '../hooks/useScrollSpy.js'

const menuItems = [
  { label: 'HOME', sectionId: 'home' },
  { label: 'ABOUT', sectionId: 'about' },
  { label: 'PROJECTS', sectionId: 'projects' },
  { label: 'SKILLS', sectionId: 'skills' },
  { label: 'CONTACT', sectionId: 'contact' },
]

const sectionIds = menuItems.map((item) => item.sectionId)

function useIsScrolled(threshold = 8) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isScrolled = useIsScrolled()
  const visibleSection = useScrollSpy(sectionIds, { enabled: isHome })

  let activeSection = null
  if (isHome) {
    activeSection = visibleSection
  } else if (pathname.startsWith('/projects/')) {
    activeSection = 'projects'
  }

  return (
    <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
      <nav className="container navbar" aria-label="주요 메뉴">
        <Link className="site-title" to="/#home">
          Portfolio
        </Link>
        <ul className="nav-list">
          {menuItems.map((item) => {
            const isActive = activeSection === item.sectionId

            return (
              <li key={item.sectionId}>
                <Link
                  className={isActive ? 'is-active' : undefined}
                  to={`/#${item.sectionId}`}
                  aria-current={isActive && isHome ? 'location' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
