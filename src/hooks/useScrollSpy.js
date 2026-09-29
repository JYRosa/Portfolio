import { useEffect, useState } from 'react'

// 기본은 뷰포트의 offset 비율을, 앵커 목차는 CSS scroll-margin 위치를 판정선으로 씁니다.
// 페이지 끝에 닿으면 마지막 요소를 현재 위치로 처리합니다.
function useScrollSpy(
  ids,
  { enabled = true, offset = 0.35, useScrollMargin = false } = {},
) {
  const [activeId, setActiveId] = useState(null)
  const idsKey = ids.join(' ')

  useEffect(() => {
    if (!enabled) {
      setActiveId(null)
      return undefined
    }

    const targetIds = idsKey.split(' ')
    let frameId = 0

    const update = () => {
      frameId = 0
      const elements = targetIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      if (elements.length === 0) {
        setActiveId(null)
        return
      }

      const { scrollHeight } = document.documentElement
      const isAtBottom =
        window.innerHeight + window.scrollY >= scrollHeight - 2

      if (isAtBottom) {
        setActiveId(elements[elements.length - 1].id)
        return
      }

      const scrollMarginTop = useScrollMargin
        ? Number.parseFloat(window.getComputedStyle(elements[0]).scrollMarginTop) || 0
        : 0
      const line = useScrollMargin
        ? scrollMarginTop + 1
        : window.innerHeight * offset
      let currentId = null

      elements.forEach((element) => {
        if (element.getBoundingClientRect().top <= line) {
          currentId = element.id
        }
      })

      setActiveId(currentId)
    }

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.cancelAnimationFrame(frameId)
    }
  }, [idsKey, enabled, offset, useScrollMargin])

  return activeId
}

export default useScrollSpy
