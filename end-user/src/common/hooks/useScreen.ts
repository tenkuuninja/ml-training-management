import { useState, useEffect } from 'react'

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function useScreen(breakpoint: BreakPoint) {
  function isBreakPoint(): boolean {
    if (typeof window !== 'undefined') {
      let width = window.innerWidth
      switch (breakpoint) {
        case '2xl': {
          return width >= 1900
        }
        case 'xl': {
          return width >= 1500
        }
        case 'lg': {
          return width >= 1200
        }
        case 'md': {
          return width >= 900
        }
        case 'sm': {
          return width >= 600
        }
        case 'xs': {
          return width >= 460
        }
        default: {
          return true
        }
      }
    }
    return false
  }

  const [screen, setScreen] = useState<boolean>()
  useEffect(() => {
    function handleResize() {
      setScreen(isBreakPoint())
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  return screen
}
export default useScreen
