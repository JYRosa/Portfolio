import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const frameId = window.requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))

      if (target) {
        const reduceMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        target.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      }
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [pathname, hash])

  return null
}

export default ScrollToHash
