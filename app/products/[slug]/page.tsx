import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/sections/ProductDetail'
import { RelatedProducts } from '@/components/sections/RelatedProducts'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { Product } from '@/lib/types'
import productsData from '@/data/product.json'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const products = (productsData as { Product: Product[] }).Product
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found - Borneo Gifts & Premium Supply',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.name} - Borneo Gifts & Premium Supply`,
    description: product.shortDescription,
    keywords: product.tags,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const products = (productsData as { Product: Product[] }).Product
  const product = products.find(p => p.slug === params.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <ProductDetail product={product} />
      <RandomAnimatedDiv>
        <RelatedProducts currentProduct={product} />
      </RandomAnimatedDiv>
      <RandomAnimatedDiv>
        <GlobalCTA />
      </RandomAnimatedDiv>
    </main>
  )
}

export async function generateStaticParams() {
  const products = (productsData as { Product: Product[] }).Product
  return products.map((product) => ({
    slug: product.slug,
  }))
}