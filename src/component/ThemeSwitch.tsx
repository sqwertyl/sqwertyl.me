"use client"

import { forwardRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa'
 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ThemeSwitch = forwardRef<HTMLButtonElement, ButtonProps>(function ThemeSwitch(props, ref) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const cycleTheme = () => {
    const next = theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system'
    document.documentElement.classList.add('theme-transition')
    setTheme(next)
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 320)
  }

  const icon = !mounted
    ? <FaAdjust className="w-5 h-5" />
    : theme === 'system'
      ? <FaMoon className="w-5 h-5" />
      : resolvedTheme === 'dark'
        ? <FaSun className="w-5 h-5" />
        : <FaAdjust className="w-5 h-5" />
  const ariaLabel = !mounted
    ? 'Theme: system'
    : theme === 'system'
      ? 'Theme: system'
      : resolvedTheme === 'dark'
        ? 'Theme: dark'
        : 'Theme: light'

  const { className, ...rest } = props

  return (
    <button
      ref={ref}
      aria-label={ariaLabel}
      onClick={cycleTheme}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors bg-gray-100 text-gray-950 dark:bg-gray-950 dark:text-gray-100 ${className ?? ''}`}
      {...rest}
    >
      <span className={`${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        {icon}
      </span>
    </button>
  )
})

export default ThemeSwitch
