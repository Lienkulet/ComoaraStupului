'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export default function Template({ children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    },
    { scope: ref }
  )

  return <div ref={ref}>{children}</div>
}
