'use client'

import React from 'react'
import { Minus, Plus, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, CartItem as CartItemType } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import Link from 'next/link'

interface CartItemProps {
  item: CartItemType
  showRemoveButton?: boolean
  compact?: boolean
}

export function CartItem({ item, showRemoveButton = true, compact = false }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id)
    } else if (newQuantity <= 999) {
      updateQuantity(item.id, newQuantity)
    }
  }
  
  const handleRemove = () => {
    removeItem(item.id)
  }
  
  const itemPrice = item.variant?.price || item.product.price
  const totalPrice = itemPrice * item.quantity
  
  return (
    <div className={`flex gap-3 p-3 border-b border-gray-100 last:border-b-0 ${compact ? 'py-2' : 'py-4'}`}>
      {/* Product Image */}
      <div className={`flex-shrink-0 ${compact ? 'w-12 h-12' : 'w-16 h-16'}`}>
        <img
          src={item.product.images[0] ? `/${item.product.images[0]}` : '/images/placeholder-product.svg'}
          alt={item.product.name}
          className="w-full h-full object-cover rounded-md bg-gray-100"
          loading="lazy"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium text-gray-900 truncate ${compact ? 'text-sm' : 'text-base'}`}>
              {item.product.name}
            </h3>
            
            {/* Variant Information */}
            {item.variant && (
              <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                {item.variant.name}: {item.variant.value}
              </p>
            )}
            
            {/* Selected Options */}
            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
              <div className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'}`}>
                {Object.entries(item.selectedOptions).map(([key, value]) => (
                  <span key={key} className="inline-block mr-2">
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}
            
            {/* SKU */}
            <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
              SKU: {item.variant?.sku || item.product.sku}
            </p>
          </div>
          
          {/* Remove Button */}
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 p-1 h-auto"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        {/* Price and Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 p-0"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </Button>
            
            <span className={`font-medium min-w-[2rem] text-center ${compact ? 'text-sm' : 'text-base'}`}>
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 999}
              className="h-8 w-8 p-0"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          
          {/* Price Information */}
          <div className="text-right">
            <div className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
              {formatPrice(totalPrice)}
            </div>
            {item.quantity > 1 && (
              <div className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
                {formatPrice(itemPrice)} each
              </div>
            )}
          </div>
        </div>
        
        {/* Product Link */}
        {!compact && (
          <div className="mt-2">
            <Link 
              href={`/products/${item.product.slug}`}
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

// Compact version for mini cart displays
export function CompactCartItem({ item }: { item: CartItemType }) {
  return <CartItem item={item} showRemoveButton={false} compact={true} />
}

// Loading skeleton for cart items
export function CartItemSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex gap-3 p-3 border-b border-gray-100 animate-pulse ${compact ? 'py-2' : 'py-4'}`}>
      <div className={`flex-shrink-0 bg-gray-200 rounded-md ${compact ? 'w-12 h-12' : 'w-16 h-16'}`} />
      <div className="flex-1">
        <div className={`bg-gray-200 rounded ${compact ? 'h-4 mb-1' : 'h-5 mb-2'}`} style={{ width: '70%' }} />
        <div className={`bg-gray-200 rounded ${compact ? 'h-3 mb-1' : 'h-4 mb-2'}`} style={{ width: '50%' }} />
        <div className="flex justify-between items-center mt-2">
          <div className={`bg-gray-200 rounded ${compact ? 'h-6 w-20' : 'h-8 w-24'}`} />
          <div className={`bg-gray-200 rounded ${compact ? 'h-4 w-16' : 'h-5 w-20'}`} />
        </div>
      </div>
    </div>
  )
}