'use client'

import { useState } from 'react'
import Link from 'next/link'
import emailjs from '@emailjs/browser'
import { useLanguage } from '@/context/LanguageContext'
import styles from './Footer.module.css'

const tr = {
  RO: {
    tagline: 'Produse apicole naturale, culese cu grijă din inima stupului. Calitate garantată direct de la producător.',
    nav: 'Navigare', products: 'Produse', newsletter: 'Newsletter',
    newsletterDesc: 'Abonați-vă pentru a primi oferte exclusive și noutăți direct în inbox.',
    subscribe: 'Abonare', successMsg: 'Abonare reușită!',
    emailError: 'Introduceți un email valid!', serverError: 'A apărut o eroare. Încercați din nou.',
    home: 'Acasă', about: 'Despre Noi', contact: 'Contact',
    honey: 'Miere', honeycomb: 'Fagure', candles: 'Lumânări', pollen: 'Polen',
    copyright: '© 2024 Comoara Stupului. Toate drepturile rezervate.',
    privacy: 'Politica de confidențialitate', terms: 'Termeni și condiții',
  },
  RU: {
    tagline: 'Натуральные продукты пчеловодства, собранные с заботой из сердца улья. Гарантированное качество прямо от производителя.',
    nav: 'Навигация', products: 'Продукты', newsletter: 'Рассылка',
    newsletterDesc: 'Подпишитесь, чтобы получать эксклюзивные предложения и новости прямо в inbox.',
    subscribe: 'Подписаться', successMsg: 'Вы подписались!',
    emailError: 'Введите корректный email!', serverError: 'Произошла ошибка. Попробуйте снова.',
    home: 'Главная', about: 'О нас', contact: 'Контакт',
    honey: 'Мёд', honeycomb: 'Соты', candles: 'Свечи', pollen: 'Пыльца',
    copyright: '© 2024 Comoara Stupului. Все права защищены.',
    privacy: 'Политика конфиденциальности', terms: 'Условия использования',
  },
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = tr[lang]
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState({ text: '', color: '' })

  async function handleSubscribe(e) {
    e.preventDefault()
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!regex.test(email)) {
      setMsg({ text: t.emailError, color: 'red' })
      setTimeout(() => setMsg({ text: '', color: '' }), 3000)
      return
    }
    try {
      await emailjs.send('service_dwwgi4k', 'template_ze75xjb', { email_id: email }, 'jxMzgbYrsHramtQN2')
      setMsg({ text: t.successMsg, color: '#22c55e' })
      setEmail('')
    } catch {
      setMsg({ text: t.serverError, color: 'red' })
    }
    setTimeout(() => setMsg({ text: '', color: '' }), 3000)
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink}>
            <img src="/assets/generalImgs/logo.png" alt="Logo" className={styles.logoImg} />
            <span className={styles.logoText}>Comoara Stupului</span>
          </Link>
          <p className={styles.tagline}>{t.tagline}</p>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.9a8.17 8.17 0 0 0 4.78 1.52V7.05a4.85 4.85 0 0 1-1.01-.36z"/></svg>
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <h4>{t.nav}</h4>
          <ul>
            <li><Link href="/">{t.home}</Link></li>
            <li><Link href="/produse">{t.products}</Link></li>
            <li><Link href="/despre">{t.about}</Link></li>
            <li><Link href="/contact">{t.contact}</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>{t.products}</h4>
          <ul>
            <li><Link href="/produse?cat=miere">{t.honey}</Link></li>
            <li><Link href="/produse?cat=fagure">{t.honeycomb}</Link></li>
            <li><Link href="/produse?cat=lumanari">{t.candles}</Link></li>
            <li><Link href="/produse?cat=polen">{t.pollen}</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>{t.newsletter}</h4>
          <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
            <p>{t.newsletterDesc}</p>
            <div className={styles.inputRow}>
              <input type="email" className={styles.newsletterInput} placeholder="email@exemplu.com" value={email} onChange={e => setEmail(e.target.value)} />
              <button type="submit" className={styles.subscribeBtn}>{t.subscribe}</button>
            </div>
            {msg.text && <p className={styles.newsletterMsg} style={{ color: msg.color }}>{msg.text}</p>}
          </form>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.bottom}>
        <p className={styles.copyright}>{t.copyright}</p>
        <div className={styles.bottomLinks}>
          <a href="#">{t.privacy}</a>
          <a href="#">{t.terms}</a>
        </div>
      </div>
    </footer>
  )
}
