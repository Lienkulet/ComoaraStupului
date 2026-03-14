'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ProductCard from '@/components/ProductCard'
import { products, categories } from '@/lib/products'
import styles from './page.module.css'

function ProduseContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('cat') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? [...products]
      : products.filter(p => p.category === activeCategory)

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ro'))

    return result
  }, [activeCategory, sort])

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Produsele Noastre</h1>
        <p className={styles.heroSubtitle}>
          Descoperă gama completă de produse apicole naturale, culese cu grijă din inima stupinei noastre.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.filters}>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.sortRow}>
          <span className={styles.sortLabel}>Sortare:</span>
          <select
            className={styles.sortSelect}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="default">Implicit</option>
            <option value="price-asc">Preț crescător</option>
            <option value="price-desc">Preț descrescător</option>
            <option value="name">Alfabetic</option>
          </select>
        </div>
      </div>

      <p className={styles.count}>{filtered.length} produse găsite</p>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🍯</div>
          <h3>Niciun produs găsit</h3>
          <p>Încercați o altă categorie sau reveniți mai târziu.</p>
        </div>
      )}
    </div>
  )
}

export default function ProdusePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Se încarcă...</div>}>
      <ProduseContent />
    </Suspense>
  )
}
