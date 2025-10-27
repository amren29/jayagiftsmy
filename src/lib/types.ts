// Product and Category Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  categoryId: string
  price: number
  originalPrice?: number
  currency: string
  sku: string
  inStock: boolean
  stockQuantity: number
  featured: boolean
  bestseller: boolean
  newArrival: boolean
  rating: number
  reviewCount: number
  images: string[]
  variants?: ProductVariant[]
  moqPricing: MOQPricing
  printingPricing?: PrintingPricing
  specifications: Record<string, string | undefined>
  tags: string[]
  seo: SEOData
  createdAt?: string
}

export interface MOQTier {
  minQuantity: number
  unitPrice: number
  totalPrice?: number
  savings?: number
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  type: string
  price?: number
  sku: string
  inStock: boolean
  stockQuantity: number
  image?: string
}

export interface MOQPricing {
  tiers: MOQTier[]
}

export interface PrintingTier {
  minQuantity?: number
  pricePerUnit?: number
  printMethod?: string
  colors?: number
  setupFee?: number
  // Legacy fields
  type?: string
  extraCostPerPc?: number
}

export interface PrintingPricing {
  tiers: PrintingTier[]
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  icon?: string
  parentId?: string
  subcategories?: Category[]
  productCount: number
  featured: boolean
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

// RFQ (Request for Quote) Types
export interface RFQFormData {
  // Contact Information
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  
  // Product Requirements
  productId?: string
  productName?: string
  quantity: number
  variant?: string
  customization: string
  imprintOptions: string[]
  colors: string[]
  
  // Additional Details
  timeline: string
  budget: string
  message: string
  
  // Preferences
  newsletter: boolean
  updates: boolean
}

export interface RFQSubmission extends RFQFormData {
  id: string
  status: 'pending' | 'processing' | 'quoted' | 'completed' | 'cancelled'
  submittedAt: string
  quotedAt?: string
  quotedPrice?: number
  notes?: string
}

// Contact Form Types
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  inquiryType: string
  productCategory: string
  quantity: string
  budget: string
  timeline: string
  message: string
  newsletter: boolean
  updates: boolean
}

// Filter and Search Types
export interface ProductFilters {
  search?: string
  category?: string
  categoryId?: string
  subcategory?: string
  minPrice?: number
  maxPrice?: number
  priceRange?: {
    min: number
    max: number
  }
  tags?: string[]
  inStock?: boolean
  featured?: boolean
  bestseller?: boolean
  moqRange?: {
    min: number
    max: number
  }
}

export interface SearchParams {
  query?: string
  category?: string
  subcategory?: string
  sort?: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'popular'
  page?: number
  limit?: number
  filters?: ProductFilters
}

export interface SearchResults {
  products: Product[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

// Navigation Types
export interface NavItem {
  name: string
  href: string
  description?: string
  icon?: string
  children?: NavItem[]
}

export interface MegaMenuSection {
  title: string
  items: NavItem[]
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

// Utility Types
export type SortOption = {
  value: string
  label: string
}

export type ProductSortOption = SortOption

export type FilterOption = {
  value: string
  label: string
  count?: number
}

export type BreadcrumbItem = {
  name: string
  href?: string
  current?: boolean
}

// Component Props Types
export interface ProductCardProps {
  product: Product
  className?: string
  showQuickView?: boolean
  showAddToCart?: boolean
}

export interface ProductGridProps {
  products: Product[]
  loading?: boolean
  className?: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export interface FilterSidebarProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  categories: Category[]
  className?: string
}