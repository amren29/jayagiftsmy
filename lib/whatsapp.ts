import { RFQPayload } from './types';

/**
 * Builds a WhatsApp URL with pre-filled message for RFQ
 * @param payload RFQ data to include in the message
 * @returns WhatsApp deep link URL
 */
export function buildWhatsAppUrl(payload: RFQPayload): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '60123456789';
  
  const message = `🎁 *RFQ - Borneo Gifts & Premium Supply*

` +
    `*Customer Details:*
` +
    `Name: ${payload.name}
` +
    `Company: ${payload.company}
` +
    `Email: ${payload.email}
` +
    `${payload.phone ? `Phone: ${payload.phone}\n` : ''}` +
    `
*Product Information:*
` +
    `Product: ${payload.productName}
` +
    `Product ID: ${payload.productId}
` +
    `Variant: ${payload.variant}
` +
    `Quantity: ${payload.quantity} units
` +
    `${payload.notes ? `\nAdditional Notes: ${payload.notes}\n` : ''}` +
    `
*Source:* ${payload.currentUrl}
` +
    `
---
` +
    `Please provide quotation and delivery timeline. Thank you! 🙏`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with the RFQ message
 * @param payload RFQ data
 */
export function sendWhatsAppRFQ(payload: RFQPayload): void {
  const url = buildWhatsAppUrl(payload);
  window.open(url, '_blank');
}

/**
 * Validates RFQ payload before sending
 * @param payload RFQ data to validate
 * @returns Validation result with errors if any
 */
export function validateRFQPayload(payload: Partial<RFQPayload>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!payload.name?.trim()) {
    errors.push('Name is required');
  }

  if (!payload.company?.trim()) {
    errors.push('Company name is required');
  }

  if (!payload.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!payload.productId?.trim()) {
    errors.push('Product ID is required');
  }

  if (!payload.productName?.trim()) {
    errors.push('Product name is required');
  }

  if (!payload.variant?.trim()) {
    errors.push('Product variant is required');
  }

  if (!payload.quantity || payload.quantity <= 0) {
    errors.push('Quantity must be greater than 0');
  }

  if (!payload.currentUrl?.trim()) {
    errors.push('Current URL is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}