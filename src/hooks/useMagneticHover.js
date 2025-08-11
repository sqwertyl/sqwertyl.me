import { useEffect, useState } from 'react'

/**
 * Magnetic hover translate effect.
 * Attaches pointer listeners to the element and returns a smoothed {x, y} translation.
 */
export default function useMagneticHover(
  ref,
  {
    maxPullX = 20,
    maxPullY = 16,
    easing = 0.8,
    onlyMouseLike = true,
    disabled = false,
  } = {}
){
  const [translation, setTranslation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref?.current
    if (!element) return
    if (disabled) return

    const isMouseLike = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (onlyMouseLike && !isMouseLike) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId = null
    let stopped = false

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      const rect = element.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width // 0..1
      const relY = (event.clientY - rect.top) / rect.height // 0..1
      const dx = (relX - 0.5) * 2 // -1..1
      const dy = (relY - 0.5) * 2 // -1..1
      targetX = dx * maxPullX
      targetY = dy * maxPullY
    }

    const onPointerLeave = () => {
      targetX = 0
      targetY = 0
    }

    const animate = () => {
      if (stopped) return
      currentX += (targetX - currentX) * easing
      currentY += (targetY - currentY) * easing
      setTranslation({ x: currentX, y: currentY })
      rafId = window.requestAnimationFrame(animate)
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)
    rafId = window.requestAnimationFrame(animate)

    return () => {
      stopped = true
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [ref, maxPullX, maxPullY, easing, onlyMouseLike, disabled])

  return translation
}


