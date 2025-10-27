import { Product } from '@/lib/types'

export interface MOQTier {
  minQuantity: number
  unitPrice: number
}

export interface PriceCalculation {
  quantity: number
  unitPrice: number
  totalPrice: number
  tier: MOQTier
  savings?: number
  savingsPercentage?: number
}

// Fixed quantity tiers for the new pricing system
const FIXED_QUANTITY_TIERS = [100, 300, 500, 700, 1000]

// Quick select quantities (even numbers)
const QUICK_SELECT_QUANTITIES = [100, 200, 300, 500, 800, 1000]

/**
 * Calculate price based on quantity using fixed tier system with 10% discount per tier
 * @param quantity The desired quantity
 * @param basePrice The base unit price (for 100 pcs tier)
 * @returns Price calculation details or null if invalid
 */
export function calculateMOQPrice(
  quantity: number,
  basePrice: number
): PriceCalculation | null {
  if (quantity <= 0 || basePrice <= 0) {
    return null
  }

  // Find which tier the quantity falls into
  let applicableTierIndex = 0
  for (let i = FIXED_QUANTITY_TIERS.length - 1; i >= 0; i--) {
    if (quantity >= FIXED_QUANTITY_TIERS[i]) {
      applicableTierIndex = i
      break
    }
  }

  // Calculate unit price with 10% discount per tier (0%, 10%, 20%, 30%, 40%)
  const discountPercentage = applicableTierIndex * 10
  const unitPrice = basePrice * (1 - discountPercentage / 100)
  const totalPrice = quantity * unitPrice
  
  // Calculate savings compared to base price
  const baseTotalCost = quantity * basePrice
  const savings = baseTotalCost - totalPrice
  const savingsPercentage = savings > 0 ? (savings / baseTotalCost) * 100 : 0

  const tier: MOQTier = {
    minQuantity: FIXED_QUANTITY_TIERS[applicableTierIndex],
    unitPrice
  }

  return {
    quantity,
    unitPrice,
    totalPrice,
    tier,
    savings: savings > 0 ? savings : undefined,
    savingsPercentage: savingsPercentage > 0 ? savingsPercentage : undefined
  }
}

/**
 * Legacy function for backward compatibility with existing MOQ tiers
 * @param quantity The desired quantity
 * @param tiers Array of MOQ pricing tiers
 * @returns Price calculation details or null if no valid tier found
 */
export function calculateMOQPriceLegacy(
  quantity: number,
  tiers: MOQTier[]
): PriceCalculation | null {
  if (!tiers || tiers.length === 0 || quantity <= 0) {
    return null
  }

  // Sort tiers by minQuantity in descending order to find the best applicable tier
  const sortedTiers = [...tiers].sort((a, b) => b.minQuantity - a.minQuantity)
  
  // Find the appropriate tier for the given quantity
  const applicableTier = sortedTiers.find(tier => quantity >= tier.minQuantity)
  
  if (!applicableTier) {
    return null
  }

  const totalPrice = quantity * applicableTier.unitPrice
  
  // Calculate savings compared to the highest price tier (usually the first/lowest quantity tier)
  const highestPriceTier = tiers.reduce((highest, current) => 
    current.unitPrice > highest.unitPrice ? current : highest
  )
  
  const potentialHighestCost = quantity * highestPriceTier.unitPrice
  const savings = potentialHighestCost - totalPrice
  const savingsPercentage = savings > 0 ? (savings / potentialHighestCost) * 100 : 0

  return {
    quantity,
    unitPrice: applicableTier.unitPrice,
    totalPrice,
    tier: applicableTier,
    savings: savings > 0 ? savings : undefined,
    savingsPercentage: savingsPercentage > 0 ? savingsPercentage : undefined
  }
}

/**
 * Get the minimum quantity required for fixed tier MOQ pricing
 * @returns Minimum quantity (always 100 for fixed tier system)
 */
export function getMinimumQuantity(): number {
  return FIXED_QUANTITY_TIERS[0] // Always 100
}

/**
 * Legacy function for getting minimum quantity from MOQ tiers
 * @param tiers Array of MOQ pricing tiers
 * @returns Minimum quantity or 1 if no tiers available
 */
export function getMinimumQuantityLegacy(tiers: MOQTier[]): number {
  if (!tiers || tiers.length === 0) {
    return 1
  }
  
  return Math.min(...tiers.map(tier => tier.minQuantity))
}

/**
 * Get all available quantity breakpoints for display
 * @param tiers Array of MOQ pricing tiers
 * @returns Array of quantities where pricing changes
 */
export function getQuantityBreakpoints(tiers: MOQTier[]): number[] {
  if (!tiers || tiers.length === 0) {
    return []
  }
  
  return tiers.map(tier => tier.minQuantity).sort((a, b) => a - b)
}

/**
 * Validate if a quantity meets fixed tier MOQ requirements
 * @param quantity The desired quantity
 * @returns True if quantity meets minimum requirements (>= 100)
 */
export function validateMOQQuantity(quantity: number): boolean {
  const minQuantity = getMinimumQuantity()
  return quantity >= minQuantity
}

/**
 * Legacy function for validating quantity against MOQ tiers
 * @param quantity The desired quantity
 * @param tiers Array of MOQ pricing tiers
 * @returns True if quantity meets minimum requirements
 */
export function validateMOQQuantityLegacy(quantity: number, tiers: MOQTier[]): boolean {
  const minQuantity = getMinimumQuantityLegacy(tiers)
  return quantity >= minQuantity
}

/**
 * Get suggested quantities using quick select (even numbers)
 * @returns Array of even numbered suggested quantities
 */
export function getSuggestedQuantities(): number[] {
  return [...QUICK_SELECT_QUANTITIES]
}

/**
 * Legacy function for getting suggested quantities based on MOQ tiers
 * @param tiers Array of MOQ pricing tiers
 * @returns Array of suggested quantities
 */
export function getSuggestedQuantitiesLegacy(tiers: MOQTier[]): number[] {
  if (!tiers || tiers.length === 0) {
    return [1, 10, 50, 100]
  }
  
  const breakpoints = getQuantityBreakpoints(tiers)
  const suggestions = [...breakpoints]
  
  // Add some intermediate values for better UX
  breakpoints.forEach((breakpoint, index) => {
    if (index < breakpoints.length - 1) {
      const nextBreakpoint = breakpoints[index + 1]
      const midPoint = Math.floor((breakpoint + nextBreakpoint) / 2)
      if (midPoint > breakpoint && midPoint < nextBreakpoint) {
        suggestions.push(midPoint)
      }
    }
  })
  
  return suggestions.sort((a, b) => a - b)
}