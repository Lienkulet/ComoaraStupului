'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import styles from './page.module.css'

const tr = {
  RO: {
    notFoundTitle: 'Produs negăsit',
    notFoundText: 'Produsul căutat nu există sau a fost eliminat.',
    notFoundBtn: 'Înapoi la Produse',
    home: 'Acasă',
    products: 'Produse',
    category: { miere: 'Miere', fagure: 'Fagure', lumanari: 'Lumânări', polen: 'Polen' },
    qty: 'Cantitate',
    addBtn: 'Adaugă în Coș',
    addedBtn: 'Adăugat în coș!',
    buyBtn: 'Cumpără Acum',
    features: ['100% Natural', 'Fără conservanți', 'Direct de la producător', 'Calitate certificată'],
    related: 'Produse Similare',
  },
  RU: {
    notFoundTitle: 'Товар не найден',
    notFoundText: 'Запрошенный товар не существует или был удалён.',
    notFoundBtn: 'Назад к Товарам',
    home: 'Главная',
    products: 'Товары',
    category: { miere: 'Мёд', fagure: 'Сот', lumanari: 'Свечи', polen: 'Пыльца' },
    qty: 'Количество',
    addBtn: 'Добавить в корзину',
    addedBtn: 'Добавлено в корзину!',
    buyBtn: 'Купить Сейчас',
    features: ['100% Натуральный', 'Без консервантов', 'Прямо от производителя', 'Сертифицированное качество'],
    related: 'Похожие Товары',
  },
}

export default function ProductPageClient({ id }) {
  const product = products.find(p => p.id === id)
  const { addToCart } = useCart()
  const { lang } = useLanguage()
  const t = tr[lang]
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>{t.notFoundTitle}</h2>
        <p>{t.notFoundText}</p>
        <Link href="/produse" className="btn-primary">{t.notFoundBtn}</Link>
      </div>
    )
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  function handleAdd() {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">{t.home}</Link>
          <span>/</span>
          <Link href="/produse">{t.products}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <img src={product.image} alt={product.name} className={styles.mainImage} />
          </div>

          <div className={styles.detailsSection}>
            <span className={styles.categoryBadge}>{t.category[product.category]}</span>
            <h1 className={styles.productName}>{product.name}</h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>{product.price} mdl</span>
              <span className={styles.unit}>/ {product.unit}</span>
            </div>

            <hr className={styles.divider} />

            <p className={styles.description}>{product.description}</p>

            <div className={styles.qtySection}>
              <p className={styles.qtyLabel}>{t.qty}</p>
              <div className={styles.qtyControls}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Scade"
                >
                  −
                </button>
                <span className={styles.qtyNum}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Crește"
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.addBtn} ${added ? styles.added : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t.addedBtn}
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    {t.addBtn}
                  </>
                )}
              </button>
              <Link href="/checkout" className={styles.buyBtn}>
                {t.buyBtn}
              </Link>
            </div>

            <div className={styles.features}>
              {t.features.map(feat => (
                <div key={feat} className={styles.featureItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>{t.related}</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
