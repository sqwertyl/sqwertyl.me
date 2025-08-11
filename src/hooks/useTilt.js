import { useEffect } from 'react'

// Hook for adding a tilt (perspective + rotation) effect on mouse move
export default function useTilt(
  ref,
  { easing = 0.25, resetAfterMs = 2000, resetDurationMs = 400 } = {}
) {
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    let ticking = false
    let resetTimeoutId = null
    let resetInProgress = false

    const clearResetTransition = () => {
      el.style.transition = ''
    }

    const onPointerMove = event => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      targetX = ((event.clientX - centerX) / window.innerWidth) * 40
      targetY = ((event.clientY - centerY) / window.innerHeight) * 40
      // Cancel any in-progress reset and transition
      if (resetTimeoutId !== null) {
        clearTimeout(resetTimeoutId)
        resetTimeoutId = null
      }
      if (resetInProgress) {
        resetInProgress = false
        clearResetTransition()
      }
      if (!ticking) {
        window.requestAnimationFrame(() => {
          currentX += (targetX - currentX) * easing
          currentY += (targetY - currentY) * easing
          el.style.transform = `perspective(600px) rotateX(${-currentY}deg) rotateY(${currentX}deg)`
          ticking = false
        })
        ticking = true
      }

      // Schedule reset back to center after inactivity
      resetTimeoutId = setTimeout(() => {
        resetInProgress = true
        // Bring target and current toward zero to avoid jump on next move
        targetX = 0
        targetY = 0
        currentX = 0
        currentY = 0
        el.style.transition = `transform ${resetDurationMs}ms ease-out`
        el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)'
      }, resetAfterMs)
    }

    const isMouseLike = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (isMouseLike) {
      window.addEventListener('pointermove', onPointerMove)
    }
    const onTransitionEnd = (e) => {
      if (e.propertyName === 'transform' && resetInProgress) {
        resetInProgress = false
        clearResetTransition()
      }
    }
    el.addEventListener('transitionend', onTransitionEnd)

    return () => {
      if (isMouseLike) {
        window.removeEventListener('pointermove', onPointerMove)
      }
      if (resetTimeoutId !== null) {
        clearTimeout(resetTimeoutId)
      }
      el.removeEventListener('transitionend', onTransitionEnd)
    }
  }, [ref, easing])
}