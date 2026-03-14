'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from './page.module.css'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const regexPhone = /^0\d{8}$/
  const regexName = /^[A-Z][a-z]+(?:[ '-][A-Za-z]+)*$/
  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

  function validate() {
    const newErrors = {}
    if (!regexName.test(form.name)) newErrors.name = 'Introduceți un nume valid (prima literă mare).'
    if (!regexPhone.test(form.phone)) newErrors.phone = 'Introduceți un număr valid (ex: 0xxxxxxxx).'
    if (!regexEmail.test(form.email)) newErrors.email = 'Introduceți un email valid.'
    if (!form.message.trim()) newErrors.message = 'Mesajul nu poate fi gol.'
    return newErrors
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await emailjs.send(
        'service_dwwgi4k',
        'template_kdpvkf3',
        {
          from_name: form.name,
          email_id: form.email,
          message: form.message,
          clientName: form.name,
          phone_number: form.phone,
        },
        'jxMzgbYrsHramtQN2'
      )
      setStatus({ type: 'success', text: 'Mesaj transmis cu succes! Vă vom contacta în curând.' })
      setForm({ name: '', phone: '', email: '', message: '' })
      setErrors({})
    } catch {
      setStatus({ type: 'error', text: 'A apărut o eroare. Vă rugăm încercați din nou.' })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus({ type: '', text: '' }), 5000)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Contactați-ne</h1>
        <p className={styles.heroSubtitle}>
          Suntem la dispoziția dumneavoastră pentru orice întrebare sau comandă specială.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.infoCol}>
          <h2>Luați Legătura cu Noi</h2>
          <p>
            Ne bucurăm să auzim de la dumneavoastră. Fie că aveți o întrebare despre produsele noastre sau doriți să plasați o comandă, suntem gata să vă ajutăm.
          </p>

          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4>Telefon</h4>
                <p>+373 69 123 456</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4>Email</h4>
                <p>contact@comorastupului.md</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4>Adresă</h4>
                <p>Moldova, Chișinău</p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div className={styles.contactInfo}>
                <h4>Program</h4>
                <p>Luni – Sâmbătă: 9:00 – 18:00</p>
              </div>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h4>Urmăriți-ne</h4>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.9a8.17 8.17 0 0 0 4.78 1.52V7.05a4.85 4.85 0 0 1-1.01-.36z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <h2>Trimiteți un Mesaj</h2>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  Nume <span className={styles.required}>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`${styles.input} ${errors.name ? styles.error : ''}`}
                  placeholder="Ion Popescu"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">
                  Telefon <span className={styles.required}>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`${styles.input} ${errors.phone ? styles.error : ''}`}
                  placeholder="069123456"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="ion@exemplu.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">
                Mesaj <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                placeholder="Scrieți mesajul dumneavoastră..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>

            {status.text && (
              <div className={`${styles.statusMsg} ${styles[status.type]}`}>
                {status.text}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                'Se trimite...'
              ) : (
                <>
                  Trimite Mesajul
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
