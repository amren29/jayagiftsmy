import { Metadata } from 'next'
import { ProductCatalog } from '@/components/sections/ProductCatalog'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'Products - Borneo Gifts & Premium Supply',
  description: 'Browse our extensive collection of corporate gifts and promotional items. Custom branding available with competitive MOQ pricing.',
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <RandomAnimatedDiv>
        <ProductCatalog searchParams={{}} />
      </RandomAnimatedDiv>
    </main>
  )
}