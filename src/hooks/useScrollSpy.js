import { useEffect, useState } from 'react'

// 뷰포트 상단에서 offset 비율 지점을 지난 마지막 요소를 현재 위치로 봅니다.
// 페이지 끝에 닿으면 마지막 요소를 현재 위치로 처리합니다.
function useScrollSpy(ids, { enabled = true, offset = 0.35 } = {}) {
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

      const line = window.innerHeight * offset
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
  }, [idsKey, enabled, offset])

  return activeId
}

export default useScrollSpy
