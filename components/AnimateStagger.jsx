'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AnimateStagger({
  children,
  className,
  stagger = 0.1,
  y = 44,
  duration = 0.65,
  start = 'top 84%',
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const items = ref.current.children
      if (!items.length) return

      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
