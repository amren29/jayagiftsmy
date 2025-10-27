'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { FadeUpDiv } from '@/components/ScrollAnimatedDiv'
import { getMinimumQuantity } from '@/lib/moq-pricing'

interface ProductCardProps {
  product: Product
  className?: string
  showQuickActions?: boolean
  variant?: 'default' | 'compact'
}

export function ProductCard({ product, className, showQuickActions = true, variant = 'default' }: ProductCardProps) {
  const isCompact = variant === 'compact'
  const { addItem } = useCart()
  const primaryImage = product.images[0] ? `/${product.images[0]}` : '/images/placeholder-product.svg'
  const priceRange = product.originalPrice 
    ? `RM ${product.price} (was RM ${product.originalPrice})`
    : `RM ${product.price}`
  
  return (
    <FadeUpDiv 
      animationOptions={{ 
        duration: 600, 
        delay: Math.random() * 200, // Stagger animations
        threshold: 0.1 
      }}
      className="h-full"
    >
      <Card className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-gray-200",
        isCompact ? 'h-auto' : 'h-full',
        className
      )}>
      <div className="relative">
        {/* Product Image */}
        <Link href={`/products/${product.slug}`}>
          <div className={cn(
            'relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100',
            isCompact ? 'aspect-square' : 'aspect-[4/3]'
          )}>
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-primary text-white shadow-lg text-xs font-medium px-2 py-1">
              ⭐ Featured
            </Badge>
          )}
          {product.tags.includes('bulk-discount') && (
            <Badge className="bg-green-500 text-white shadow-lg text-xs font-medium px-2 py-1">
              🆕 Bulk Discount
            </Badge>
          )}
          {product.tags.includes('eco-friendly') && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              Eco-Friendly
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <Button
              variant="secondary"
              size="sm"
              className="h-7 w-7 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md border-0"
            >
              <Heart className="h-3 w-3 text-gray-600" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 w-7 p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md border-0"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                
                if (!product.moqPricing?.tiers) {
                  alert('No pricing information available')
                  return
                }
                
                const minQuantity = getMinimumQuantity()
                addItem(product, undefined, minQuantity)
              }}
            >
              <ShoppingCart className="h-3 w-3 text-gray-600" />
              <span className="sr-only">Quick add to cart</span>
            </Button>
          </div>
        )}
      </div>

      <CardContent className={cn(
        "p-4",
        isCompact && "flex-1"
      )}>
        {/* Product Info */}
        <div className="space-y-2.5">
          <div className="space-y-1">
            <Link href={`/products/${product.slug}`}>
              <h3 className={cn(
                'font-semibold line-clamp-2 hover:text-primary transition-colors duration-200 leading-tight text-gray-900',
                isCompact ? 'text-sm' : 'text-base'
              )}>
                {product.name}
              </h3>
            </Link>
            
            {!isCompact && (
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>


          {/* Price Range */}
          <div className="flex items-end justify-between pt-0.5">
            <div className="space-y-0.5">
              <div className={cn(
                'font-bold text-primary',
                isCompact ? 'text-sm' : 'text-base'
              )}>
                {priceRange}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Min. Order: {product.moqPricing ? getMinimumQuantity() : 'N/A'} pcs
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">4.5</span>
            </div>
          </div>
        </div>
      </CardContent>

      {!isCompact && (
        <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 h-8 text-xs border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            onClick={() => window.location.href = `/products/${product.slug}`}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="w-full sm:flex-1 h-8 text-xs bg-primary hover:bg-primary/90 shadow-sm transition-all duration-200"
            onClick={(e) => {
              e.preventDefault()
              
              if (!product.moqPricing?.tiers) {
                alert('No pricing information available')
                return
              }
              
              const minQuantity = getMinimumQuantity()
              addItem(product, undefined, minQuantity)
            }}
          >
            <ShoppingCart className="w-3 h-3 mr-1.5" />
            Quote
          </Button>
        </CardFooter>
      )}
    </Card>
    </FadeUpDiv>
  )
}