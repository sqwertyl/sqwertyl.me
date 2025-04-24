import { useEffect } from 'react'

// Hook for adding a tilt (perspective + rotation) effect on mouse move
export default function useTilt(ref, { easing = 0.25 } = {}) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let ticking = false

    const onMouseMove = event => {
      targetX = ((event.clientX - window.innerWidth / 2) / window.innerWidth) * 40
      targetY = (event.clientY / window.innerHeight) * 40 - 25
      if (!ticking) {
        window.requestAnimationFrame(() => {
          currentX += (targetX - currentX) * easing
          currentY += (targetY - currentY) * easing
          el.style.transform = `perspective(600px) rotateX(${-currentY}deg) rotateY(${currentX}deg)`
          ticking = false
        })
        ticking = true
      }
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove)
    }
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove)
      }
    }
  }, [ref, easing])
}