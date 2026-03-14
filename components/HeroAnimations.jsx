'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export default function HeroAnimations() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
        '[data-hero="bg"]',
        { scale: 1.1 },
        { scale: 1, duration: 2.2, ease: 'power2.out' },
        0
      )
      .fromTo(
        '[data-hero="eyebrow"]',
        { opacity: 0, y: -22 },
        { opacity: 1, y: 0, duration: 0.65 },
        0.25
      )
      .fromTo(
        '[data-hero="title"]',
        { opacity: 0, y: 46 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.45
      )
      .fromTo(
        '[data-hero="subtitle"]',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.68
      )
      .fromTo(
        '[data-hero="btns"]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.88
      )
      .fromTo(
        '[data-hero="scroll"]',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.15
      )
  })

  return null
}
