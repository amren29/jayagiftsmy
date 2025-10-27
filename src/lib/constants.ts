// Site Configuration
export const SITE_CONFIG = {
  name: 'Jaya Gifts',
  description: 'Premium corporate gifts and promotional products in Malaysia. Custom branding, bulk orders, and professional service for businesses.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jayagifts.com',
  ogImage: '/og-image.jpg',
  keywords: [
    'corporate gifts malaysia',
    'promotional products',
    'custom branding',
    'bulk orders',
    'business gifts',
    'promotional items',
    'corporate merchandise',
    'branded products'
  ],
  author: 'Jaya Gifts',
  creator: '@jayagifts',
  contact: {
    phone: '+60 88 123 4567',
    email: 'info@jayagifts.com',
  },
  whatsapp: {
    number: '+60123456789',
  },
};

// Brand Colors
export const BRAND_COLORS = {
  primary: '#CC0F2F',
  primaryHover: '#B00D29',
  secondary: '#F8F9FA',
  accent: '#FFC107',
  dark: '#212529',
  light: '#F8F9FA',
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',
};

// Contact Information
export const CONTACT_INFO = {
  phone: '+60 88 123 4567',
  whatsapp: '+60881234567',
  email: 'info@jayagifts.com',
  businessHours: {
    weekdays: '9:00 AM - 6:00 PM',
    saturday: '9:00 AM - 1:00 PM',
    sunday: 'Closed',
  },
  socialMedia: {
    facebook: 'https://facebook.com/jayagifts',
    instagram: 'https://instagram.com/jayagifts',
    linkedin: 'https://linkedin.com/company/jayagifts',
    twitter: 'https://twitter.com/jayagifts',
  },
};

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  businessNumber: '60881234567',
  baseUrl: 'https://wa.me',
  defaultMessage: 'Hello! I\'m interested in your corporate gifts and would like to get a quote.',
};

// Pagination Settings
export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 48,
  defaultPage: 1,
};

// Product Settings
export const PRODUCT_SETTINGS = {
  maxImages: 8,
  maxVariants: 20,
  maxMOQTiers: 10,
  defaultCurrency: 'MYR',
  minQuantity: 1,
  maxQuantity: 100000,
  featuredLimit: 8,
  relatedLimit: 4,
};

// File Upload Settings
export const FILE_UPLOAD = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'],
};

// Form Settings
export const FORM_SETTINGS = {
  maxNameLength: 50,
  maxEmailLength: 100,
  maxPhoneLength: 15,
  maxCompanyLength: 100,
  maxSubjectLength: 100,
  maxMessageLength: 1000,
  maxCustomizationLength: 500,
  maxSpecialRequirementsLength: 500,
};

// Navigation Menu Items
export const MAIN_NAV = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Navigation Menu for Header (direct links only)
export const NAVIGATION_MENU = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Products',
    href: '/products',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Footer Links
export const FOOTER_LINKS = {
  quickLinks: [
    { title: 'About Us', href: '/about' },
    { title: 'Our Services', href: '/services' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'FAQ', href: '/faq' },
    { title: 'Shipping Info', href: '/shipping' },
  ],
  categories: [
    { title: 'All Products', href: '/products' },
    { title: 'Corporate Gifts', href: '/products?category=corporate-gifts' },
    { title: 'Promotional Items', href: '/products?category=promotional-items' },
    { title: 'Custom Branding', href: '/services#custom-branding' },
    { title: 'Gift Sets', href: '/products?category=gift-sets' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Returns Policy', href: '/returns' },
    { title: 'Size Guide', href: '/size-guide' },
  ],
  // Legacy structure for backward compatibility
  company: [
    { title: 'About Us', href: '/about' },
    { title: 'Our Services', href: '/services' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Privacy Policy', href: '/privacy' },
    { title: 'Terms of Service', href: '/terms' },
  ],
  products: [
    { title: 'All Products', href: '/products' },
    { title: 'Corporate Gifts', href: '/products?category=corporate-gifts' },
    { title: 'Promotional Items', href: '/products?category=promotional-items' },
    { title: 'Custom Branding', href: '/services#custom-branding' },
  ],
  support: [
    { title: 'FAQ', href: '/faq' },
    { title: 'Shipping Info', href: '/shipping' },
    { title: 'Returns', href: '/returns' },
    { title: 'Size Guide', href: '/size-guide' },
  ],
};

// Sort Options for Products
export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'name-asc', label: 'Name (A - Z)' },
  { value: 'name-desc', label: 'Name (Z - A)' },
  { value: 'price-asc', label: 'Price (Low > High)' },
  { value: 'price-desc', label: 'Price (High > Low)' },
  { value: 'rating-desc', label: 'Rating (Highest)' },
  { value: 'rating-asc', label: 'Rating (Lowest)' },
  { value: 'model-asc', label: 'Model (A - Z)' },
  { value: 'model-desc', label: 'Model (Z - A)' },
  { value: 'newest', label: 'Newest > Oldest' },
  { value: 'oldest', label: 'Oldest > Newest' },
];

// Alias for backward compatibility
export const PRODUCT_SORT_OPTIONS = SORT_OPTIONS;

// Price Range Filters
export const PRICE_RANGES = [
  { label: 'Under RM 10', min: 0, max: 10 },
  { label: 'RM 10 - RM 25', min: 10, max: 25 },
  { label: 'RM 25 - RM 50', min: 25, max: 50 },
  { label: 'RM 50 - RM 100', min: 50, max: 100 },
  { label: 'RM 100 - RM 200', min: 100, max: 200 },
  { label: 'Over RM 200', min: 200, max: null },
];

// Common Tags
export const COMMON_TAGS = [
  'eco-friendly',
  'premium',
  'customizable',
  'bulk-discount',
  'fast-delivery',
  'popular',
  'new-arrival',
  'bestseller',
  'corporate',
  'promotional',
  'branded',
  'gift-set',
];

// Imprint Options
export const IMPRINT_OPTIONS = [
  'Screen Printing',
  'Embroidery',
  'Heat Transfer',
  'Laser Engraving',
  'Debossing',
  'Embossing',
  'Digital Printing',
  'Pad Printing',
  'Sublimation',
  'UV Printing',
];

// Budget Ranges for RFQ
export const BUDGET_RANGES = [
  'Under RM 500',
  'RM 500 - RM 1,000',
  'RM 1,000 - RM 2,500',
  'RM 2,500 - RM 5,000',
  'RM 5,000 - RM 10,000',
  'Over RM 10,000',
];

// API Endpoints (if using external APIs)
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  contact: '/api/contact',
  rfq: '/api/rfq',
  newsletter: '/api/newsletter',
  upload: '/api/upload',
};

// Error Messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  notFound: 'The requested item was not found.',
  unauthorized: 'You are not authorized to perform this action.',
  serverError: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  contactSent: 'Thank you for your message. We\'ll get back to you soon!',
  rfqSent: 'Your quote request has been sent successfully!',
  newsletterSubscribed: 'Thank you for subscribing to our newsletter!',
  fileCopied: 'File copied to clipboard!',
};