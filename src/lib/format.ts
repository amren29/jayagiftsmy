/**
 * Formats a price in Malaysian Ringgit
 * @param price Price in MYR
 * @param showCurrency Whether to show currency symbol
 * @returns Formatted price string
 */
export function formatPrice(price: number | null | undefined, showCurrency: boolean = true): string {
  if (price === null || price === undefined || isNaN(price)) {
    return showCurrency ? 'RM 0.00' : '0.00';
  }
  const formatted = price.toFixed(2);
  return showCurrency ? `RM ${formatted}` : formatted;
}

/**
 * Formats a price range
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @returns Formatted price range string
 */
export function formatPriceRange(minPrice: number | null | undefined, maxPrice: number | null | undefined): string {
  const min = minPrice ?? 0;
  const max = maxPrice ?? 0;
  if (min === max) {
    return formatPrice(min);
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

/**
 * Formats quantity with proper units
 * @param quantity Quantity number
 * @param unit Unit name (default: 'pcs')
 * @returns Formatted quantity string
 */
export function formatQuantity(quantity: number, unit: string = 'pcs'): string {
  if (quantity >= 1000) {
    const thousands = quantity / 1000;
    return `${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}k ${unit}`;
  }
  return `${quantity} ${unit}`;
}

/**
 * Formats MOQ (Minimum Order Quantity) display
 * @param moq MOQ number
 * @returns Formatted MOQ string
 */
export function formatMOQ(moq: number): string {
  return `MOQ: ${formatQuantity(moq)}`;
}

/**
 * Capitalizes the first letter of each word
 * @param str Input string
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}