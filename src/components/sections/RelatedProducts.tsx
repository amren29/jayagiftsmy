'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/ProductGrid'
import { Product, Category } from '@/lib/types'
import productsData from '@/data/product.json'
import categoriesData from '@/data/categories.json'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

interface RelatedProductsProps {
  currentProduct: Product
  maxProducts?: number
}

export function RelatedProducts({ currentProduct, maxProducts = 4 }: RelatedProductsProps) {
  const products = (productsData as { Product: Product[] }).Product
  const categories = categoriesData as Category[]
  
  const relatedProducts = useMemo(() => {
    // Get products from the same category
    const sameCategoryProducts = products.filter(
      product => 
        product.id !== currentProduct.id && 
        product.categoryId === currentProduct.categoryId
    )
    
    // If we have enough products from the same category, use them
    if (sameCategoryProducts.length >= maxProducts) {
      return sameCategoryProducts.slice(0, maxProducts)
    }
    
    // Otherwise, get products with similar tags
    const currentTags = currentProduct.tags || []
    const similarTagProducts = products.filter(
      product => {
        if (product.id === currentProduct.id) return false
        if (product.categoryId === currentProduct.categoryId) return false
        
        const productTags = product.tags || []
        return productTags.some(tag => currentTags.includes(tag))
      }
    )
    
    // Combine same category and similar tag products
    const combined = [...sameCategoryProducts, ...similarTagProducts]
    
    // If still not enough, add featured products
    if (combined.length < maxProducts) {
      const featuredProducts = products.filter(
        product => 
          product.id !== currentProduct.id &&
          product.featured &&
          !combined.some(p => p.id === product.id)
      )
      combined.push(...featuredProducts)
    }
    
    // Return the required number of products
    return combined.slice(0, maxProducts)
  }, [currentProduct, products, maxProducts])
  
  const currentCategory = categories.find(c => c.id === currentProduct.categoryId)
  
  if (relatedProducts.length === 0) {
    return null
  }
  
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.1, threshold: 0.1 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                You Might Also Like
              </h2>
              <p className="text-muted-foreground">
                {currentCategory 
                  ? `More products from ${currentCategory.name}` 
                  : 'Similar products you might be interested in'
                }
              </p>
            </div>
            
            {currentCategory && (
              <Button variant="outline" asChild>
                <Link href={`/products?category=${currentCategory.id}`}>
                  View All {currentCategory.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </FadeUpDiv>
        
        <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.2, threshold: 0.1 }}>
          <ProductGrid
            products={relatedProducts}
            variant="compact"
            columns={{
              default: 2,
              sm: 2,
              lg: 4,
              xl: 4
            }}
          />
        </FadeInDiv>
        
        {/* Call to Action */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.4, threshold: 0.1 }}>
          <div className="text-center mt-12">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                Can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We have thousands of promotional products in our catalog. 
                Browse our full collection or contact us for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/products">
                    Browse All Products
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Get Recommendations
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeUpDiv>
      </div>
    </section>
  )
}