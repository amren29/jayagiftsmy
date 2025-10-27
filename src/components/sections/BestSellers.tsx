import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FeaturedProductGrid } from '@/components/ProductGrid'
import productsData from '@/data/product.json'
import { Product } from '@/lib/types'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

const products = (productsData as { Product: Product[] }).Product

export function BestSellers() {
  // Get featured products (best sellers)
  const bestSellers = products.filter(product => product.featured).slice(0, 8)
  
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <RandomAnimatedDiv>
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Best Sellers
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Most
              <span className="text-primary"> Popular Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the corporate gifts that companies love most. These top-rated products have proven their worth in making lasting impressions.
            </p>
          </div>
        </RandomAnimatedDiv>

        {/* Products Grid */}
        <RandomAnimatedDiv>
          <div className="mb-12">
            <FeaturedProductGrid products={bestSellers} />
          </div>
        </RandomAnimatedDiv>

        {/* More Products CTA */}
        <RandomAnimatedDiv>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/products">
                More Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </RandomAnimatedDiv>
      </div>
    </section>
  )
}