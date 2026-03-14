'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import styles from './page.module.css'

const tr = {
  RO: {
    pageTitle: 'Finalizare Comandă',
    emptyTitle: 'Coșul este gol',
    emptyText: 'Adăugați produse în coș pentru a putea plasa o comandă.',
    emptyBtn: 'Explorați Produsele',
    contactTitle: 'Informații de Contact',
    name: 'Nume',
    phone: 'Telefon',
    email: 'Email',
    payTitle: 'Metodă de Plată',
    cash: 'Numerar',
    card: 'Card',
    subtotal: 'Subtotal',
    delivery: 'Livrare',
    free: 'Gratuită',
    total: 'Total',
    qty: 'Cantitate',
    summaryTitle: 'Rezumatul Comenzii',
    submit: 'Plasează Comanda',
    submitting: 'Se procesează...',
    submitted: 'Comandă Plasată!',
    secure: 'Comandă securizată',
    errName: 'Introduceți un nume valid (prima literă mare).',
    errPhone: 'Introduceți un număr valid (ex: 0xxxxxxxx).',
    errEmail: 'Introduceți un email valid.',
    errPayment: 'Vă rugăm selectați metoda de plată.',
    success: 'Comanda a fost plasată cu succes! Vă vom contacta în curând.',
    error: 'A apărut o eroare. Vă rugăm încercați din nou.',
    product: 'Produs',
    quantity: 'Cantitate',
    unitPrice: 'Preț unitar',
    paymentLabel: (method) => `Metodă de plată: ${method === 'card' ? 'Card' : 'Numerar'}`,
    totalLabel: (total) => `Total comandă: ${total} mdl`,
  },
  RU: {
    pageTitle: 'Оформление Заказа',
    emptyTitle: 'Корзина пуста',
    emptyText: 'Добавьте товары в корзину, чтобы разместить заказ.',
    emptyBtn: 'Просмотреть Товары',
    contactTitle: 'Контактная Информация',
    name: 'Имя',
    phone: 'Телефон',
    email: 'Email',
    payTitle: 'Способ Оплаты',
    cash: 'Наличные',
    card: 'Карта',
    subtotal: 'Подытог',
    delivery: 'Доставка',
    free: 'Бесплатно',
    total: 'Итого',
    qty: 'Количество',
    summaryTitle: 'Сводка Заказа',
    submit: 'Разместить Заказ',
    submitting: 'Обработка...',
    submitted: 'Заказ Размещён!',
    secure: 'Защищённый заказ',
    errName: 'Введите действительное имя (первая буква заглавная).',
    errPhone: 'Введите действительный номер (пр: 0xxxxxxxx).',
    errEmail: 'Введите действительный email.',
    errPayment: 'Пожалуйста, выберите способ оплаты.',
    success: 'Заказ успешно размещён! Мы свяжемся с вами в ближайшее время.',
    error: 'Произошла ошибка. Пожалуйста, попробуйте ещё раз.',
    product: 'Товар',
    quantity: 'Количество',
    unitPrice: 'Цена за единицу',
    paymentLabel: (method) => `Способ оплаты: ${method === 'card' ? 'Карта' : 'Наличные'}`,
    totalLabel: (total) => `Итого заказа: ${total} mdl`,
  },
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart()
  const { lang } = useLanguage()
  const t = tr[lang]
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
    if (!regexName.test(form.name)) newErrors.name = t.errName
    if (!regexPhone.test(form.phone)) newErrors.phone = t.errPhone
    if (!regexEmail.test(form.email)) newErrors.email = t.errEmail
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
      setPayError(t.errPayment)
      return
    }

    setLoading(true)
    const itemsSummary = cart
      .map(item => ` ${t.product}: ${item.name} | ${t.quantity}: ${item.quantity} | ${t.unitPrice}: ${item.price} mdl | Total: ${item.price * item.quantity} mdl`)
      .join('\n')

    const message = `${t.paymentLabel(payment)}\n${t.totalLabel(cartTotal)}\n\n${itemsSummary}`

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
      setStatus({ type: 'success', text: t.success })
      clearCart()
      setTimeout(() => router.push('/'), 3000)
    } catch {
      setStatus({ type: 'error', text: t.error })
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0 && status.type !== 'success') {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <h2>{t.emptyTitle}</h2>
            <p>{t.emptyText}</p>
            <Link href="/produse" className="btn-primary">{t.emptyBtn}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{t.pageTitle}</h1>

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
                  {t.contactTitle}
                </h2>
                <div className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="name">
                        {t.name} <span className={styles.required}>*</span>
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
                        {t.phone} <span className={styles.required}>*</span>
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
                      {t.email} <span className={styles.required}>*</span>
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
                  {t.payTitle}
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
                    <span className={styles.paymentLabel}>{t.cash}</span>
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
                    <span className={styles.paymentLabel}>{t.card}</span>
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
            <h2 className={styles.summaryTitle}>{t.summaryTitle}</h2>

            <div className={styles.summaryItems}>
              {cart.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <img src={item.image} alt={item.name} className={styles.summaryImg} />
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemName}>{item.name}</p>
                    <p className={styles.summaryItemQty}>{t.qty}: {item.quantity}</p>
                  </div>
                  <span className={styles.summaryItemPrice}>
                    {item.price * item.quantity} mdl
                  </span>
                </div>
              ))}
            </div>

            <hr className={styles.divider} />

            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>{t.subtotal}</span>
              <span className={styles.summaryRowValue}>{cartTotal} mdl</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryRowLabel}>{t.delivery}</span>
              <span className={styles.summaryRowValue} style={{ color: '#22c55e' }}>{t.free}</span>
            </div>

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>{t.total}</span>
              <span className={styles.totalAmount}>{cartTotal} mdl</span>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || status.type === 'success'}
              onClick={handleSubmit}
            >
              {loading ? (
                t.submitting
              ) : status.type === 'success' ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t.submitted}
                </>
              ) : (
                <>
                  {t.submit}
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
              {t.secure}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
