import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 스크롤 진입 시 페이드업할 요소
const REVEAL_SELECTOR = [
  '.hero-content > *',
  '.hero-graph',
  '.section:not(.hero) .container > :not(.info-grid, .project-grid, .skills-grid, .contact-list)',
  '.info-item',
  '.project-card',
  '.skill-group',
  '.contact-list > div',
  '.detail-header .container > *',
  '.detail-content > .image-placeholder',
  '.detail-toc',
  '.detail-section',
  '.back-link',
  '.page-message > *',
].join(', ')

// 커서 위치를 따라 스포트라이트가 움직이는 카드
const SPOTLIGHT_SELECTOR =
  '.info-item, .project-card, .skill-group, .contact-list > div'

// 값이 작을수록 커서를 늦게 따라와 잔상이 길어집니다.
const DOT_EASING = 0.2
const TRAIL_EASING = 0.07

const matchesMedia = (query) => window.matchMedia(query).matches

function useRevealOnScroll(pathname) {
  // 첫 페인트 전에 숨김 상태를 지정해 깜빡임을 막습니다.
  useLayoutEffect(() => {
    if (
      matchesMedia('(prefers-reduced-motion: reduce)') ||
      !('IntersectionObserver' in window)
    ) {
      return undefined
    }

    document.documentElement.classList.add('has-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const { target } = entry
          target.style.setProperty(
            '--reveal-delay',
            `${Math.min(order, 5) * 70}ms`,
          )
          target.dataset.reveal = 'visible'
          observer.unobserve(target)
          order += 1
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    document.querySelectorAll(REVEAL_SELECTOR).forEach((target) => {
      if (target.dataset.reveal === 'visible') return
      target.dataset.reveal = 'hidden'
      observer.observe(target)
    })

    return () => observer.disconnect()
  }, [pathname])
}

function usePointerEffects(pathname) {
  useEffect(() => {
    if (
      matchesMedia('(prefers-reduced-motion: reduce)') ||
      !matchesMedia('(hover: hover) and (pointer: fine)')
    ) {
      return undefined
    }

    const hero = document.querySelector('.hero')
    const target = { x: 0, y: 0 }
    const dots = { x: 0, y: 0 }
    const trail = { x: 0, y: 0 }
    let isHeroActive = false
    let frameId = 0

    const render = () => {
      dots.x += (target.x - dots.x) * DOT_EASING
      dots.y += (target.y - dots.y) * DOT_EASING
      trail.x += (target.x - trail.x) * TRAIL_EASING
      trail.y += (target.y - trail.y) * TRAIL_EASING

      hero.style.setProperty('--mx', `${dots.x.toFixed(1)}px`)
      hero.style.setProperty('--my', `${dots.y.toFixed(1)}px`)
      hero.style.setProperty('--gx', `${trail.x.toFixed(1)}px`)
      hero.style.setProperty('--gy', `${trail.y.toFixed(1)}px`)

      const isSettled =
        Math.abs(target.x - trail.x) < 0.5 && Math.abs(target.y - trail.y) < 0.5
      frameId = isSettled ? 0 : window.requestAnimationFrame(render)
    }

    const setHeroActive = (isActive) => {
      if (!hero || isHeroActive === isActive) return
      isHeroActive = isActive
      hero.dataset.pointer = isActive ? 'active' : 'idle'
    }

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return

      const card =
        event.target instanceof Element
          ? event.target.closest(SPOTLIGHT_SELECTOR)
          : null

      if (card) {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--x', `${event.clientX - rect.left}px`)
        card.style.setProperty('--y', `${event.clientY - rect.top}px`)
      }

      if (!hero) return

      const rect = hero.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      if (y < 0 || y > rect.height) {
        setHeroActive(false)
        return
      }

      target.x = x
      target.y = y

      // 영역에 새로 들어올 때는 커서 위치에서 바로 시작합니다.
      if (!isHeroActive) {
        dots.x = trail.x = x
        dots.y = trail.y = y
      }

      setHeroActive(true)

      if (!frameId) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    const handlePointerOut = (event) => {
      if (!event.relatedTarget) setHeroActive(false)
    }

    document.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    })
    document.addEventListener('pointerout', handlePointerOut)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerout', handlePointerOut)
      window.cancelAnimationFrame(frameId)
      if (hero) delete hero.dataset.pointer
    }
  }, [pathname])
}

function InteractionEffects() {
  const { pathname } = useLocation()

  useRevealOnScroll(pathname)
  usePointerEffects(pathname)

  return null
}

export default InteractionEffects
