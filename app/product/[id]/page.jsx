import { products } from '@/lib/products'
import ProductPageClient from './ProductPageClient'

export function generateStaticParams() {
  return products.map(p => ({ id: p.id }))
}

export default function ProductPage({ params }) {
  return <ProductPageClient id={params.id} />
}
