import { PrintingTier, PrintingPricing } from '@/lib/types'

export interface PrintingCalculation {
  quantity: number
  printMethod: string
  pricePerUnit: number
  totalPrintingCost: number
  setupFee: number
  totalWithSetup: number
  colors: number
  tier: PrintingTier
}

/**
 * Calculate printing costs based on quantity and selected print method
 * @param quantity The desired quantity
 * @param selectedPrintMethod The selected printing method
 * @param printingPricing The printing pricing tiers for the product
 * @returns Printing calculation details or null if invalid
 */
export function calculatePrintingPrice(
  quantity: number,
  selectedPrintMethod: string,
  printingPricing: PrintingPricing
): PrintingCalculation | null {
  if (quantity <= 0 || !printingPricing?.tiers || printingPricing.tiers.length === 0) {
    return null
  }

  // Find tiers that match the selected print method
  const methodTiers = printingPricing.tiers.filter(
    tier => (tier.printMethod || tier.type) === selectedPrintMethod
  )

  if (methodTiers.length === 0) {
    return null
  }

  // For legacy pricing without minQuantity, use the first matching tier
  // For modern pricing with minQuantity, sort and find the best applicable tier
  let applicableTier: PrintingTier
  
  if (methodTiers[0].minQuantity !== undefined) {
    // Sort by minQuantity in descending order to find the best applicable tier
    const sortedTiers = [...methodTiers].sort((a, b) => (b.minQuantity || 0) - (a.minQuantity || 0))
    
    // Find the appropriate tier for the given quantity
    const foundTier = sortedTiers.find(tier => quantity >= (tier.minQuantity || 0))
    if (!foundTier) {
      return null
    }
    applicableTier = foundTier
  } else {
    // Legacy format: just use the first tier (no quantity restrictions)
    applicableTier = methodTiers[0]
  }

  const pricePerUnit = applicableTier.pricePerUnit || applicableTier.extraCostPerPc || 0
  const totalPrintingCost = quantity * pricePerUnit
  const setupFee = applicableTier.setupFee || 0
  const totalWithSetup = totalPrintingCost + setupFee

  return {
    quantity,
    printMethod: applicableTier.printMethod || applicableTier.type || '',
    pricePerUnit,
    totalPrintingCost,
    setupFee,
    totalWithSetup,
    colors: applicableTier.colors || 0,
    tier: applicableTier
  }
}

/**
 * Get available print methods for a product
 * @param printingPricing The printing pricing for the product
 * @returns Array of unique print methods
 */
export function getAvailablePrintMethods(printingPricing: PrintingPricing): string[] {
  if (!printingPricing?.tiers || printingPricing.tiers.length === 0) {
    return []
  }

  const methods = new Set(printingPricing.tiers.map(tier => tier.printMethod || tier.type || 'Unknown'))
  return Array.from(methods).sort()
}

/**
 * Get all tiers for a specific print method
 * @param printMethod The print method to filter by
 * @param printingPricing The printing pricing for the product
 * @returns Array of tiers for the specified method
 */
export function getTiersForMethod(
  printMethod: string, 
  printingPricing: PrintingPricing
): PrintingTier[] {
  if (!printingPricing?.tiers || printingPricing.tiers.length === 0) {
    return []
  }

  return printingPricing.tiers
    .filter(tier => (tier.printMethod || tier.type) === printMethod)
    .sort((a, b) => (a.minQuantity || 0) - (b.minQuantity || 0))
}

/**
 * Get minimum quantity for a specific print method
 * @param printMethod The print method
 * @param printingPricing The printing pricing for the product
 * @returns Minimum quantity or null if method not found
 */
export function getMinimumQuantityForMethod(
  printMethod: string, 
  printingPricing: PrintingPricing
): number | null {
  const tiers = getTiersForMethod(printMethod, printingPricing)
  if (tiers.length === 0) {
    return null
  }

  return Math.min(...tiers.map(tier => tier.minQuantity || 1))
}

/**
 * Validate if a quantity is valid for the selected print method
 * @param quantity The desired quantity
 * @param printMethod The selected print method
 * @param printingPricing The printing pricing for the product
 * @returns True if quantity is valid
 */
export function validatePrintingQuantity(
  quantity: number,
  printMethod: string,
  printingPricing: PrintingPricing
): boolean {
  const minQuantity = getMinimumQuantityForMethod(printMethod, printingPricing)
  return minQuantity !== null && quantity >= minQuantity
}

/**
 * Get suggested quantities for a specific print method
 * @param printMethod The print method
 * @param printingPricing The printing pricing for the product
 * @returns Array of suggested quantities
 */
export function getSuggestedQuantitiesForMethod(
  printMethod: string,
  printingPricing: PrintingPricing
): number[] {
  const tiers = getTiersForMethod(printMethod, printingPricing)
  if (tiers.length === 0) {
    return []
  }

  return tiers.map(tier => tier.minQuantity || 1)
}

/**
 * Get the best print method for a given quantity (cheapest total cost)
 * @param quantity The desired quantity
 * @param printingPricing The printing pricing for the product
 * @returns Best print method or null if none available
 */
export function getBestPrintMethod(
  quantity: number,
  printingPricing: PrintingPricing
): string | null {
  if (!printingPricing?.tiers || printingPricing.tiers.length === 0) {
    return null
  }

  const methods = getAvailablePrintMethods(printingPricing)
  let bestMethod: string | null = null
  let lowestCost = Infinity

  for (const method of methods) {
    const calculation = calculatePrintingPrice(quantity, method, printingPricing)
    if (calculation && calculation.totalWithSetup < lowestCost) {
      lowestCost = calculation.totalWithSetup
      bestMethod = method
    }
  }

  return bestMethod
}