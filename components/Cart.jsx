'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import styles from './Cart.module.css'

export default function Cart() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  return (
    <>
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <aside className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Coșul meu
            <span className={styles.count}>({cartCount} produse)</span>
          </h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)} aria-label="Închide coșul">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <h3>Coșul este gol</h3>
              <p>Adăugați produse în coș pentru a continua cumpărăturile.</p>
              <Link href="/produse" className={styles.shopBtn} onClick={() => setIsCartOpen(false)}>
                Explorați produsele
              </Link>
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
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Scade cantitatea"
                        >
                          −
                        </button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Crește cantitatea"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Șterge produsul"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          <line x1="10" y1="11" x2="10" y2="17"/>
                          <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
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
              <span className={styles.totalLabel}>Total comandă</span>
              <span className={styles.totalAmount}>{cartTotal} mdl</span>
            </div>
            <Link href="/checkout" className={styles.checkoutBtn} onClick={() => setIsCartOpen(false)}>
              Finalizează comanda
            </Link>
            <button className={styles.continueLink} onClick={() => setIsCartOpen(false)}>
              Continuați cumpărăturile
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
