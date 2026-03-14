'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function CountUp({ end, suffix = '', className }) {
  const ref = useRef(null)
  const obj = useRef({ val: 0 })

  useGSAP(
    () => {
      gsap.to(obj.current, {
        val: end,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        onUpdate() {
          if (ref.current) {
            ref.current.textContent = Math.round(obj.current.val) + suffix
          }
        },
      })
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
