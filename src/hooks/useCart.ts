import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductVariant } from '@/lib/types'

export interface CartItem {
  id: string
  product: Product
  variant?: ProductVariant
  quantity: number
  selectedOptions?: Record<string, string>
  addedAt: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  isLoading: boolean
  lastAddedItem?: CartItem
}

export interface CartActions {
  // Core cart operations
  addItem: (product: Product, variant?: ProductVariant, quantity?: number, options?: Record<string, string>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  
  // UI state management
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  // Utility functions
  getItemCount: () => number
  getTotalPrice: () => number
  getItemById: (itemId: string) => CartItem | undefined
  
  // Bulk operations
  updateMultipleQuantities: (updates: { itemId: string; quantity: number }[]) => void
  removeMultipleItems: (itemIds: string[]) => void
  
  // WhatsApp quotation
  generateQuotationMessage: () => string
}

type CartStore = CartState & CartActions

// Generate unique cart item ID
const generateCartItemId = (product: Product, variant?: ProductVariant, options?: Record<string, string>): string => {
  const variantId = variant?.id || 'no-variant'
  const optionsKey = options ? Object.entries(options).sort().map(([k, v]) => `${k}:${v}`).join('|') : 'no-options'
  return `${product.id}-${variantId}-${optionsKey}`
}

// Check if two cart items are the same (for merging duplicates)
const isSameCartItem = (item1: CartItem, item2: { product: Product; variant?: ProductVariant; selectedOptions?: Record<string, string> }): boolean => {
  if (item1.product.id !== item2.product.id) return false
  if (item1.variant?.id !== item2.variant?.id) return false
  
  const options1 = item1.selectedOptions || {}
  const options2 = item2.selectedOptions || {}
  
  const keys1 = Object.keys(options1).sort()
  const keys2 = Object.keys(options2).sort()
  
  if (keys1.length !== keys2.length) return false
  
  return keys1.every(key => options1[key] === options2[key])
}

// Format price for display
const formatPrice = (price: number, currency: string = 'RM'): string => {
  return `${currency}${price.toFixed(2)}`
}

export const useCart = create<CartStore>()(persist(
  (set, get) => ({
    // Initial state
    items: [],
    isOpen: false,
    isLoading: false,
    lastAddedItem: undefined,
    
    // Add item to cart with duplicate merging
    addItem: (product, variant, quantity = 1, options) => {
      set({ isLoading: true })
      
      // Use setTimeout to simulate async operation and prevent UI lag
      setTimeout(() => {
        const state = get()
        const newItem = {
          product,
          variant,
          selectedOptions: options,
          quantity
        }
        
        // Check for existing item to merge
        const existingItemIndex = state.items.findIndex(item => 
          isSameCartItem(item, newItem)
        )
        
        let updatedItems: CartItem[]
        let addedItem: CartItem
        
        if (existingItemIndex >= 0) {
          // Merge with existing item
          const existingItem = state.items[existingItemIndex]
          const newQuantity = Math.min(existingItem.quantity + quantity, 999) // Cap at 999
          
          addedItem = {
            ...existingItem,
            quantity: newQuantity,
            addedAt: Date.now() // Update timestamp
          }
          
          updatedItems = [...state.items]
          updatedItems[existingItemIndex] = addedItem
        } else {
          // Add new item
          addedItem = {
            id: generateCartItemId(product, variant, options),
            product,
            variant,
            quantity: Math.min(quantity, 999), // Cap at 999
            selectedOptions: options,
            addedAt: Date.now()
          }
          
          updatedItems = [...state.items, addedItem]
        }
        
        set({
          items: updatedItems,
          isLoading: false,
          lastAddedItem: addedItem,
          isOpen: true // Auto-open cart when item is added
        })
      }, 50) // Small delay to prevent UI lag on rapid additions
    },
    
    // Remove item from cart
    removeItem: (itemId) => {
      set(state => ({
        items: state.items.filter(item => item.id !== itemId)
      }))
    },
    
    // Update item quantity
    updateQuantity: (itemId, quantity) => {
      if (quantity < 1 || quantity > 999) return // Validate range
      
      set(state => ({
        items: state.items.map(item => 
          item.id === itemId 
            ? { ...item, quantity }
            : item
        )
      }))
    },
    
    // Clear entire cart
    clearCart: () => {
      set({
        items: [],
        lastAddedItem: undefined
      })
    },
    
    // UI state management
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
    
    // Get total item count
    getItemCount: () => {
      const state = get()
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    // Get total price
    getTotalPrice: () => {
      const state = get()
      return state.items.reduce((total, item) => {
        const price = (item.variant?.price !== undefined) ? item.variant.price : item.product.price
        return total + (price * item.quantity)
      }, 0)
    },
    
    // Get item by ID
    getItemById: (itemId) => {
      const state = get()
      return state.items.find(item => item.id === itemId)
    },
    
    // Bulk quantity updates
    updateMultipleQuantities: (updates) => {
      set(state => ({
        items: state.items.map(item => {
          const update = updates.find(u => u.itemId === item.id)
          if (update && update.quantity >= 1 && update.quantity <= 999) {
            return { ...item, quantity: update.quantity }
          }
          return item
        })
      }))
    },
    
    // Remove multiple items
    removeMultipleItems: (itemIds) => {
      set(state => ({
        items: state.items.filter(item => !itemIds.includes(item.id))
      }))
    },
    
    // Generate WhatsApp quotation message
    generateQuotationMessage: () => {
      const state = get()
      if (state.items.length === 0) return ''
      
      let message = 'Hello! I would like to request a quotation for the following items:\n\n'
      message += 'Company name: [To be filled]\n'
      message += 'Contact name: [To be filled]\n'
      message += 'Email: [To be filled]\n'
      message += 'Phone: [To be filled]\n'
      message += 'Address: [To be filled]\n\n'
      
      state.items.forEach((item, index) => {
        const price = (item.variant?.price !== undefined) ? item.variant.price : item.product.price
        const total = price * item.quantity
        
        message += `${index + 1}. ${item.product.sku} - ${item.product.name}\n`
        
        if (item.variant) {
          message += `   Variant: ${item.variant.name} - ${item.variant.value}\n`
        }
        
        if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
          const optionsString = Object.entries(item.selectedOptions).map(([k, v]) => `${k}: ${v}`).join(', ')
          message += `   Options: ${optionsString}\n`
        }
        
        message += `   Quantity: ${item.quantity}\n`
        message += `   Unit Price: ${formatPrice(price)}\n`
        message += `   Total: ${formatPrice(total)}\n\n`
      })
      
      const grandTotal = state.getTotalPrice()
      message += `Grand Total: ${formatPrice(grandTotal)}\n\n`
      message += 'Please provide your best quotation for these items. Thank you!'
      
      return encodeURIComponent(message)
    }
  }),
  {
    name: 'cart-storage',
    partialize: (state) => ({ 
      items: state.items,
      // Don't persist UI state like isOpen, isLoading
    })
  }
))

// Export hook for cart item count (for header badge)
export const useCartItemCount = () => {
  return useCart(state => state.getItemCount())
}

// Export hook for cart total (for display)
export const useCartTotal = () => {
  return useCart(state => state.getTotalPrice())
}

// Export hook for cart open state
export const useCartOpen = () => {
  return useCart(state => ({ 
    isOpen: state.isOpen, 
    openCart: state.openCart, 
    closeCart: state.closeCart, 
    toggleCart: state.toggleCart 
  }))
}