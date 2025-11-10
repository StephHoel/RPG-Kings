'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'

export function ToasterResponsive() {
  const [position, setPosition] = useState<'top-center' | 'top-right'>(() => {
    if (typeof window === 'undefined') return 'top-center'

    return window.matchMedia('(min-width: 768px)').matches ? 'top-right' : 'top-center'
  })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => {
      setPosition(e.matches ? 'top-right' : 'top-center')
    }

    // Some browsers use addEventListener
    try {
      mq.addEventListener('change', handler)
    } catch {
      mq.addListener(handler)
    }

    // set initial
    setPosition(mq.matches ? 'top-right' : 'top-center')

    return () => {
      try {
        mq.removeEventListener('change', handler)
      } catch {
        mq.removeListener(handler)
      }
    }
  }, [])

  return (
    <Toaster
      richColors
      swipeDirections={['right', 'left']}
      visibleToasts={5}
      position={position}
      duration={5 * 1000}
    />
  )
}
