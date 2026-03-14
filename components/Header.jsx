'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Header.module.css'

gsap.registerPlugin(useGSAP)

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeLang, setActiveLang] = useState('RO')
  const { cartCount, setIsCartOpen } = useCart()
  const pathname = usePathname()
  const headerRef = useRef(null)
  const langRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
          `.${styles.logoLink}`,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6 },
          0.1
        )
        .fromTo(
          `.${styles.navLinks} li`,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 },
          0.2
        )
        .fromTo(
          `.${styles.rightSection}`,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.5 },
          0.2
        )
    },
    { scope: headerRef }
  )

  const navItems = [
    { href: '/', label: 'Acasă' },
    { href: '/produse', label: 'Produse' },
    { href: '/despre', label: 'Despre Noi' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logoLink}>
          <img src="/assets/generalImgs/logo.png" alt="Comoara Stupului" className={styles.logoImg} />
          <span className={styles.logoText}>Comoara Stupului</span>
        </Link>

        <ul className={styles.navLinks}>
          {navItems.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.active : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.rightSection}>
          <div ref={langRef} className={styles.langDropdown}>
            <button
              className={styles.langBtn}
              onClick={() => setLangOpen(o => !o)}
              aria-label="Selectează limba"
            >
              <span className={styles.langFlag}>
                {activeLang === 'RO' ? '🇷🇴' : '🇷🇺'}
              </span>
              <span className={styles.langCode}>{activeLang}</span>
              <svg
                className={`${styles.langChevron} ${langOpen ? styles.open : ''}`}
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div className={styles.langMenu}>
                {['RO', 'RU'].map(lang => (
                  <button
                    key={lang}
                    className={`${styles.langOption} ${activeLang === lang ? styles.langActive : ''}`}
                    onClick={() => { setActiveLang(lang); setLangOpen(false) }}
                  >
                    <span>{lang === 'RO' ? '🇷🇴' : '🇷🇺'}</span>
                    <span>{lang === 'RO' ? 'Română' : 'Русский'}</span>
                    {activeLang === lang && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
            aria-label="Deschide coșul"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </button>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meniu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        <ul>
          {navItems.map(item => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
