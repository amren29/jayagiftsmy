// Core Types
export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  images: string[];
  description: string;
  specs: ProductSpec[];
  imprintOptions: string[];
  variants: ProductVariant[];
  tags: string[];
  minUnitPrice: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductVariant {
  sku: string;
  attributes: Record<string, string>;
  moqs: MOQTier[];
  stock?: number;
}

export interface MOQTier {
  qty: number;
  unitPrice: number;
}

export interface RFQPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  productId: string;
  productName: string;
  variant: string;
  quantity: number;
  notes?: string;
  currentUrl: string;
}

// Filter and Search Types
export interface ProductFilters {
  categories?: string[];
  priceRange?: [number, number];
  moqRange?: [number, number];
  imprintOptions?: string[];
  inStock?: boolean;
  search?: string;
}

export interface ProductSortOption {
  field: 'featured' | 'price' | 'newest';
  direction: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

// UI Component Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface RFQFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  quantity: number;
  notes?: string;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Utility Types
export type ProductWithCategory = Product & {
  category: Category;
};

export type ProductSearchResult = {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
};