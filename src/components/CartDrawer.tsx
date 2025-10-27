'use client'

import React, { useEffect, useState } from 'react'
import { ShoppingCart, Trash2, MessageCircle, Package, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useCart, useCartItemCount, useCartTotal } from '@/hooks/useCart'
import { CartItem, CartItemSkeleton } from '@/components/CartItem'
import { CartQuotationForm } from '@/components/CartQuotationForm'
import { formatPrice } from '@/lib/format'

interface CartDrawerProps {
  className?: string
}

export function CartDrawer({ className }: CartDrawerProps) {
  const {
    items,
    isOpen,
    isLoading,
    lastAddedItem,
    closeCart,
    clearCart,
    generateQuotationMessage
  } = useCart()
  
  const [showQuotationForm, setShowQuotationForm] = useState(false)
  const itemCount = useCartItemCount()
  const totalPrice = useCartTotal()
  const [showAddedFeedback, setShowAddedFeedback] = useState(false)
  
  // Show feedback when item is added
  useEffect(() => {
    if (lastAddedItem && isOpen) {
      setShowAddedFeedback(true)
      const timer = setTimeout(() => setShowAddedFeedback(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [lastAddedItem, isOpen])
  
  const handleWhatsAppQuotation = () => {
    setShowQuotationForm(true)
  }
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear all items from your cart?')) {
      clearCart()
    }
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className={`w-full sm:max-w-lg flex flex-col h-full ${className}`} side="right">
        {/* Fixed Header */}
        <SheetHeader className="pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <SheetTitle>Shopping Cart</SheetTitle>
              {itemCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Badge>
              )}
            </div>
            
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <SheetDescription>
            {items.length === 0 
              ? 'Your cart is empty. Add some products to get started!'
              : `Review your items and request a quotation when ready.`
            }
          </SheetDescription>
        </SheetHeader>
        
        {/* Added Item Feedback */}
        {showAddedFeedback && lastAddedItem && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex-shrink-0">
            <div className="flex items-center gap-2 text-green-800">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">
                Added to cart: {lastAddedItem.product.name}
              </span>
            </div>
            {lastAddedItem.variant && (
              <p className="text-xs text-green-600 mt-1 ml-6">
                {lastAddedItem.variant.name}: {lastAddedItem.variant.value}
              </p>
            )}
          </div>
        )}
        
        {/* Scrollable Cart Content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {isLoading ? (
            // Loading State
            <div className="space-y-2 p-1">
              {[...Array(3)].map((_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Browse our products and add items to your cart to request a quotation.
              </p>
              <Button onClick={closeCart} className="gap-2">
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            // Cart Items - Scrollable Area
            <div className="h-full overflow-y-auto overflow-x-hidden">
              <div className="space-y-0 pr-2">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Fixed Footer */}
        {items.length > 0 && (
          <SheetFooter className="pt-4 mt-4 border-t flex-shrink-0">
            <div className="w-full space-y-4">
              {/* Total Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Items ({itemCount})</span>
                  <span className="text-sm text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Final pricing will be provided in the quotation
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={handleWhatsAppQuotation}
                  className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Request Quotation via WhatsApp
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={closeCart}
                    className="flex-1"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleClearCart}
                    className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="text-xs text-gray-500 text-center space-y-1">
                <p>• Free quotation and consultation</p>
                <p>• Bulk pricing available</p>
                <p>• Custom branding options</p>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
      
      {/* Cart Quotation Form */}
      <CartQuotationForm
        isOpen={showQuotationForm}
        onClose={() => setShowQuotationForm(false)}
      />
    </Sheet>
  )
}

// Mini Cart Component for Header
export function MiniCartButton() {
  const { toggleCart } = useCart()
  const itemCount = useCartItemCount()
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCart}
      className="relative p-2"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </Badge>
      )}
    </Button>
  )
}

// Cart Summary Component (for other pages)
export function CartSummary({ className }: { className?: string }) {
  const { items } = useCart()
  const itemCount = useCartItemCount()
  const totalPrice = useCartTotal()
  
  if (items.length === 0) return null
  
  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-gray-900 mb-3">Cart Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Items</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </div>
  )
}