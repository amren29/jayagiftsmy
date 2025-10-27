import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// RFQ form validation schema
export const rfqFormSchema = z.object({
  // Customer Information
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name must be less than 100 characters'),
  
  // Product Information
  productId: z.string().min(1, 'Product ID is required'),
  productName: z.string().min(1, 'Product name is required'),
  variantId: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(100000, 'Quantity must be less than 100,000'),
  
  // Customization
  imprintOption: z.string().optional(),
  customizationDetails: z.string().max(500, 'Customization details must be less than 500 characters').optional(),
  logoFile: z.string().optional(), // File path or URL
  
  // Additional Requirements
  deliveryDate: z.string().optional(),
  specialRequirements: z.string().max(500, 'Special requirements must be less than 500 characters').optional(),
  
  // Budget (optional)
  budgetRange: z.string().optional(),
});

export type RFQFormData = z.infer<typeof rfqFormSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters').optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Product search/filter schema
export const productSearchSchema = z.object({
  query: z.string().max(100, 'Search query must be less than 100 characters').optional(),
  category: z.string().optional(),
  minPrice: z.number().min(0, 'Minimum price must be 0 or greater').optional(),
  maxPrice: z.number().min(0, 'Maximum price must be 0 or greater').optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z.enum(['name', 'price-asc', 'price-desc', 'newest', 'popular']).optional(),
  page: z.number().min(1, 'Page must be 1 or greater').optional(),
  limit: z.number().min(1, 'Limit must be 1 or greater').max(100, 'Limit must be 100 or less').optional(),
});

export type ProductSearchData = z.infer<typeof productSearchSchema>;

// File upload validation
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'].includes(file.type),
      'File must be an image (JPEG, PNG, GIF, WebP) or PDF'
    ),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(cleaned) && cleaned.length >= 10 && cleaned.length <= 15;
};

export const validateMalaysianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  // Malaysian phone patterns
  const patterns = [
    /^60[1-9]\d{7,9}$/, // +60 format
    /^0[1-9]\d{7,9}$/, // Local format starting with 0
    /^[1-9]\d{7,9}$/, // Without country code or leading 0
  ];
  return patterns.some(pattern => pattern.test(cleaned));
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>"'&]/g, '');
};

export const validateQuantity = (quantity: number, minQuantity: number = 1): boolean => {
  return Number.isInteger(quantity) && quantity >= minQuantity && quantity <= 100000;
};

export const validatePriceRange = (minPrice?: number, maxPrice?: number): boolean => {
  if (minPrice === undefined && maxPrice === undefined) return true;
  if (minPrice !== undefined && minPrice < 0) return false;
  if (maxPrice !== undefined && maxPrice < 0) return false;
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) return false;
  return true;
};