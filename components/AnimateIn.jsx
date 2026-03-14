'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function AnimateIn({
  children,
  className,
  style,
  delay = 0,
  duration = 0.7,
  y = 36,
  x = 0,
  scale = 1,
  start = 'top 88%',
  as: Tag = 'div',
  ...props
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
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
    <Tag ref={ref} className={className} style={style} {...props}>
      {children}
    </Tag>
  )
}
