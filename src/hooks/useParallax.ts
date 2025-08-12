import { useEffect, useState } from 'react'

/**
 * Tracks a window-based parallax vector that eases toward the pointer position.
 * Returns an { x, y } pair you can map into background position or transforms.
 */
export default function useParallax({
  sensitivityX = 40, // horizontal range in px across window width
  sensitivityY = 40, // vertical range in px across window height
  offsetX = 0,       // constant horizontal offset in px
  offsetY = -25,     // constant vertical offset in px
  easing = 0.25,     // smoothing factor 0..1
  divideBy = 3,      // post-scale of returned vector
  onlyMouseLike = true,
  disabled = false,
} = {}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (disabled) return

    const isMouseLike = typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : false
    if (onlyMouseLike && !isMouseLike) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId = null
    let stopped = false

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      const x = ((event.clientX - window.innerWidth / 2) / window.innerWidth) * sensitivityX + offsetX
      const y = (event.clientY / window.innerHeight) * sensitivityY + offsetY
      targetX = x
      targetY = y
    }

    const animate = () => {
      if (stopped) return
      currentX += (targetX - currentX) * easing
      currentY += (targetY - currentY) * easing
      setPosition({ x: currentX / divideBy, y: currentY / divideBy })
      rafId = window.requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', onPointerMove)
    rafId = window.requestAnimationFrame(animate)

    return () => {
      stopped = true
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [sensitivityX, sensitivityY, offsetX, offsetY, easing, divideBy, onlyMouseLike, disabled])

  return position
}


