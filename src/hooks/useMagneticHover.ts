import { useEffect, useState } from 'react'

/**
 * Magnetic hover translate effect.
 * Attaches pointer listeners to the element and returns a target {x, y} translation.
 */
export default function useMagneticHover(
  ref,
  {
    maxPullX = 20,
    maxPullY = 16,
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

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      const rect = element.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width // 0..1
      const relY = (event.clientY - rect.top) / rect.height // 0..1
      const dx = (relX - 0.5) * 2 // -1..1
      const dy = (relY - 0.5) * 2 // -1..1
      setTranslation({ x: dx * maxPullX, y: dy * maxPullY })
    }

    const onPointerLeave = () => {
      setTranslation({ x: 0, y: 0 })
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)

    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [ref, maxPullX, maxPullY, onlyMouseLike, disabled])

  return translation
}
