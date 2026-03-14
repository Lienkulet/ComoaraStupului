'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/products'
import { useLanguage } from '@/context/LanguageContext'
import styles from './page.module.css'

const categoryLabels = {
  RO: { all: 'Toate', miere: 'Miere', fagure: 'Fagure', lumanari: 'Lumânări', polen: 'Polen' },
  RU: { all: 'Все', miere: 'Мёд', fagure: 'Соты', lumanari: 'Свечи', polen: 'Пыльца' },
}

const tr = {
  RO: {
    title: 'Produsele Noastre',
    subtitle: 'Descoperă gama completă de produse apicole naturale, culese cu grijă din inima stupinei noastre.',
    sort: 'Sortare:', default: 'Implicit', priceAsc: 'Preț crescător', priceDesc: 'Preț descrescător', alpha: 'Alfabetic',
    found: (n) => `${n} produse găsite`,
    noneTitle: 'Niciun produs găsit', noneDesc: 'Încercați o altă categorie sau reveniți mai târziu.',
    loading: 'Se încarcă...',
  },
  RU: {
    title: 'Наши Продукты',
    subtitle: 'Откройте полный ассортимент натуральных продуктов пчеловодства, собранных с заботой из нашей пасеки.',
    sort: 'Сортировка:', default: 'По умолчанию', priceAsc: 'Цена: возрастание', priceDesc: 'Цена: убывание', alpha: 'По алфавиту',
    found: (n) => `${n} ${n === 1 ? 'товар найден' : n < 5 ? 'товара найдено' : 'товаров найдено'}`,
    noneTitle: 'Продукты не найдены', noneDesc: 'Попробуйте другую категорию или зайдите позже.',
    loading: 'Загрузка...',
  },
}

function ProduseContent() {
  const searchParams = useSearchParams()
  const { lang } = useLanguage()
  const t = tr[lang]
  const cats = categoryLabels[lang]
  const initialCat = searchParams.get('cat') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [sort, setSort] = useState('default')

  const categories = [
    { id: 'all', label: cats.all },
    { id: 'miere', label: cats.miere },
    { id: 'fagure', label: cats.fagure },
    { id: 'lumanari', label: cats.lumanari },
    { id: 'polen', label: cats.polen },
  ]

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? [...products] : products.filter(p => p.category === activeCategory)
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ro'))
    return result
  }, [activeCategory, sort])

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>{t.title}</h1>
        <p className={styles.heroSubtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {categories.map(cat => (
            <button key={cat.id} className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`} onClick={() => setActiveCategory(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className={styles.sortRow}>
          <span className={styles.sortLabel}>{t.sort}</span>
          <select className={styles.sortSelect} value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">{t.default}</option>
            <option value="price-asc">{t.priceAsc}</option>
            <option value="price-desc">{t.priceDesc}</option>
            <option value="name">{t.alpha}</option>
          </select>
        </div>
      </div>
      <p className={styles.count}>{t.found(filtered.length)}</p>
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🍯</div>
          <h3>{t.noneTitle}</h3>
          <p>{t.noneDesc}</p>
        </div>
      )}
    </div>
  )
}

export default function ProdusePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>...</div>}>
      <ProduseContent />
    </Suspense>
  )
}
