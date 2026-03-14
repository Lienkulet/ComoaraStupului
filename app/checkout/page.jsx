'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { useCart } from '@/context/CartContext'
import styles from './page.module.css'

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [payment, setPayment] = useState('')
  const [payError, setPayError] = useState('')
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

    if (!payment) {
      setPayError('Vă rugăm selectați metoda de plată.')
      return
    }

    setLoading(true)
    const itemsSummary = cart
      .map(item => ` Produs: ${item.name} | Cantitate: ${item.quantity} | Preț unitar: ${item.price} mdl | Total: ${item.price * item.quantity} mdl`)
      .join('\n')

    const message = `Metodă de plată: ${payment === 'card' ? 'Card' : 'Numerar'}\nTotal comandă: ${cartTotal} mdl\n\nProduse:\n${itemsSummary}`

    try {
      await emailjs.send(
        'service_dwwgi4k',
        'template_kdpvkf3',
        {
          from_name: form.name,
          email_id: form.email,
          message,
          clientName: form.name,
          phone_number: form.phone,
        },
        'jxMzgbYrsHramtQN2'
      )
      setStatus({ type: 'success', text: 'Comanda a fost plasată cu succes! Vă vom contacta în curând.' })
      clearCart()
      setTimeout(() => router.push('/'), 3000)
    } catch {
      setStatus({ type: 'error', text: 'A apărut o eroare. Vă rugăm încercați din nou.' })
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0 && status.type !== 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <h2>Coșul este gol</h2>
            <p>Adăugați produse în coș pentru a putea plasa o comandă.</p>
            <Link href="/produse" className="btn-primary">Explorați Produsele</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Finalizare Comandă</h1>

        <div className={styles.grid}>
          {/* FORM */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} noValidate>
              {/* Contact info */}
              <div className={styles.formCard}>
                <h2 className={styles.cardTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Informații de Contact
                </h2>
                <div className={styles.form}>
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
                </div>
              </div>

              {/* Payment */}
              <div className={styles.formCard}>
                <h2 className={styles.cardTitle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                  Metodă de Plată
                </h2>
                <div className={styles.paymentOptions}>
                  <label className={`${styles.paymentOption} ${payment === 'numerar' ? styles.selected : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="numerar"
                      checked={payment === 'numerar'}
                      onChange={() => { setPayment('numerar'); setPayError('') }}
                    />
                    <span className={styles.paymentIcon}>💵</span>
                    <span className={styles.paymentLabel}>Numerar</span>
                  </label>
                  <label className={`${styles.paymentOption} ${payment === 'card' ? styles.selected : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={payment === 'card'}
                      onChange={() => { setPayment('card'); setPayError('') }}
                    />
                    <span className={styles.paymentIcon}>💳</span>
                    <span className={styles.paymentLabel}>Card</span>
                  </label>
                </div>
                {payError && <p className={styles.payErrorMsg}>{payError}</p>}
              </div>

              {status.text && (
                <div className={`${styles.statusMsg} ${styles[status.type]}`}>
                  {status.text}
                </div>
              )}
            </form>
          </div>

          {/* SUMMARY */}
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Rezumatul Comenzii</h2>

            <div className={styles.summaryItems}>
              {cart.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} className={styles.summaryImg} />
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    <p className={styles.summaryItemQty}>Cantitate: {item.quantity}</p>
                  </div>
                  <span className={styles.summaryItemPrice}>
                    {item.price * item.quantity} mdl
                  </span>
                </div>
              ))}
            </div>

            <hr className={styles.divider} />

            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>Subtotal</span>
              <span className={styles.summaryRowValue}>{cartTotal} mdl</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>Livrare</span>
              <span className={styles.summaryRowValue} style={{ color: '#22c55e' }}>Gratuită</span>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalAmount}>{cartTotal} mdl</span>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || status.type === 'success'}
              onClick={handleSubmit}
            >
              {loading ? (
                'Se procesează...'
              ) : status.type === 'success' ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Comandă Plasată!
                </>
              ) : (
                <>
                  Plasează Comanda
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>

            <p className={styles.secureNote}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Comandă securizată
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
