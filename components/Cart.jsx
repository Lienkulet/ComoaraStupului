'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import styles from './Cart.module.css'

const tr = {
  RO: {
    title: 'Coșul meu',
    items: (n) => `(${n} ${n === 1 ? 'produs' : 'produse'})`,
    empty: 'Coșul este gol', emptyDesc: 'Adăugați produse în coș pentru a continua cumpărăturile.',
    explore: 'Explorați produsele', total: 'Total comandă',
    checkout: 'Finalizează comanda', continue: 'Continuați cumpărăturile',
  },
  RU: {
    title: 'Моя корзина',
    items: (n) => `(${n} ${n === 1 ? 'товар' : n < 5 ? 'товара' : 'товаров'})`,
    empty: 'Корзина пуста', emptyDesc: 'Добавьте товары в корзину, чтобы продолжить покупки.',
    explore: 'Посмотреть продукты', total: 'Итого',
    checkout: 'Оформить заказ', continue: 'Продолжить покупки',
  },
}

export default function Cart() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()
  const { lang } = useLanguage()
  const t = tr[lang]

  return (
    <>
      <div className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`} onClick={() => setIsCartOpen(false)} />
      <aside className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {t.title}
            <span className={styles.count}>{t.items(cartCount)}</span>
          </h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <h3>{t.empty}</h3>
              <p>{t.emptyDesc}</p>
              <Link href="/produse" className={styles.shopBtn} onClick={() => setIsCartOpen(false)}>{t.explore}</Link>
            </div>
          ) : (
            <div className={styles.itemList}>
              {cart.map(item => (
                <div key={item.id} className={styles.item}>
                  <img src={item.image} alt={item.name} className={styles.itemImg} />
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemPrice}>{item.price * item.quantity} mdl</span>
                    <div className={styles.itemControls}>
                      <div className={styles.qtyControls}>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>{t.total}</span>
              <span className={styles.totalAmount}>{cartTotal} mdl</span>
            </div>
            <Link href="/checkout" className={styles.checkoutBtn} onClick={() => setIsCartOpen(false)}>{t.checkout}</Link>
            <button className={styles.continueLink} onClick={() => setIsCartOpen(false)}>{t.continue}</button>
          </div>
        )}
      </aside>
    </>
  )
}
