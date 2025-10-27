/**
 * Formats a price in Malaysian Ringgit
 * @param price Price in MYR
 * @param showCurrency Whether to show currency symbol
 * @returns Formatted price string
 */
export function formatPrice(price: number, showCurrency: boolean = true): string {
  const formatted = price.toFixed(2);
  return showCurrency ? `RM ${formatted}` : formatted;
}

/**
 * Formats a price range
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @returns Formatted price range string
 */
export function formatPriceRange(minPrice: number, maxPrice: number): string {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice);
  }
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
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
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Converts string to URL-friendly slug
 * @param str Input string
 * @returns URL slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Truncates text to specified length with ellipsis
 * @param text Input text
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Formats file size in human readable format
 * @param bytes File size in bytes
 * @returns Formatted file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Formats phone number for display
 * @param phone Raw phone number
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Malaysian phone numbers
  if (cleaned.startsWith('60')) {
    const number = cleaned.substring(2);
    if (number.length === 9 || number.length === 10) {
      return `+60 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
    }
  }
  
  // Return original if can't format
  return phone;
}

/**
 * Generates a random ID
 * @param length Length of the ID
 * @returns Random ID string
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}