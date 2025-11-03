'use client'

import { useState, useMemo, useCallback } from 'react'
import { Filter, Grid, List, SlidersHorizontal, X, Package, Search, Download, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ProductCard } from '@/components/ProductCard'
import { PRODUCT_SORT_OPTIONS } from '@/lib/constants'
import { Product, Category, ProductFilters } from '@/lib/types'
import productsData from '@/data/product.json'
import categoriesData from '@/data/categories.json'
import { FadeInDiv, FadeUpDiv, FadeLeftDiv } from '@/components/ScrollAnimatedDiv'

interface ProductCatalogProps {
  searchParams: {
    category?: string
    sort?: string
    page?: string
  }
}

const ITEMS_PER_PAGE = 15

// Synonyms and aliases for better search matching
const PRODUCT_SYNONYMS: Record<string, string[]> = {
  // Drinkware
  'mug': ['cup', 'tumbler', 'automug', 'travel mug', 'coffee mug'],
  'flask': ['bottle', 'vacuum flask', 'thermos', 'vacuum bottle'],
  'bottle': ['flask', 'vacuum bottle', 'water bottle', 'drink bottle'],
  'tumbler': ['mug', 'cup', 'travel mug'],
  'cup': ['mug', 'tumbler', 'coffee cup'],
  'thermos': ['flask', 'vacuum flask', 'vacuum bottle'],

  // Bags
  'bag': ['tote', 'backpack', 'carry bag', 'shopping bag', 'laptop bag'],
  'tote': ['bag', 'tote bag', 'carry bag', 'shopping bag'],
  'backpack': ['bag', 'laptop bag', 'carry bag'],
  'jute': ['jute bag', 'eco bag', 'natural bag'],
  'messenger': ['messenger bag', 'shoulder bag'],
  'pouch': ['bag', 'small bag', 'carry pouch'],

  // Stationery
  'notebook': ['journal', 'notepad', 'diary', 'writing pad'],
  'pen': ['ballpoint', 'writing pen', 'stylus'],
  'journal': ['notebook', 'diary', 'writing pad'],
  'stationery': ['pen', 'notebook', 'writing'],

  // Materials
  'steel': ['stainless steel', 'metal', 'stainless'],
  'stainless': ['stainless steel', 'steel', 'metal'],
  'metal': ['steel', 'stainless steel', 'aluminium'],
  'bamboo': ['eco', 'sustainable', 'natural'],
  'eco': ['sustainable', 'green', 'bamboo', 'recycled'],
  'plastic': ['pp', 'polypropylene'],
  'pp': ['plastic', 'polypropylene'],
  'canvas': ['fabric', 'cloth'],
  'nylon': ['fabric', 'synthetic'],
  'oxford': ['fabric', 'nylon'],
  'polyester': ['fabric', 'synthetic'],
  'cotton': ['fabric', 'natural'],
  'leather': ['pu', 'synthetic leather', 'pu leather'],

  // Electronics
  'usb': ['flash drive', 'thumb drive', 'pendrive'],
  'powerbank': ['power bank', 'portable charger'],
  'gadget': ['electronic', 'tech'],

  // Accessories
  'lanyard': ['strap', 'id holder'],
  'keychain': ['key ring', 'key holder'],
  'umbrella': ['parasol', 'rain cover'],
}

// SKU abbreviation patterns - more restrictive for exact matches
const SKU_PATTERNS: Record<string, string[]> = {
  'AM': ['bottle'],
  'BP': ['bag'],
  'CB': ['notebook'],
  'CE': ['ceramic'],
  'CR': ['crystal'],
  'EC': ['electronic'],
  'HL': ['holder'],
  'ID': ['id card'],
  'JB': ['notebook'],
  'LD': ['lanyard'],
  'LT': ['light'],
  'MB': ['bag'],
  'NW': ['notebook'],
  'PP': ['pen'],
  'PR': ['pen'],
  'PS': ['power'],
  'SA': ['bag'],
  'SB': ['bag'],
  'TL': ['flask', 'tumbler'],
  'TR': ['flask', 'tumbler'],
  'UM': ['umbrella'],
  'VF': ['vacuum flask'],
}

interface SearchResult {
  score: number
  matchType: 'exact' | 'partial' | 'synonym' | 'sku' | 'tag' | 'description'
}

interface SearchResponse {
  query: string
  totalResults: number
  executionTime: number
  results: Array<{
    product: Product
    relevanceScore: number
    matchType: string
    matchedFields: string[]
    snippet?: string
  }>
  suggestions?: string[]
  filters: {
    categories: Array<{ id: string, name: string, count: number }>
    priceRange: { min: number, max: number }
    tags: Array<{ name: string, count: number }>
  }
}

function calculateSearchScore(product: Product, searchTerm: string, categories: Category[]): SearchResult {
  const term = searchTerm.toLowerCase().trim()
  if (!term || term.length < 1) return { score: 0, matchType: 'exact' }

  const name = product.name.toLowerCase()
  const sku = product.sku.toLowerCase()
  const description = product.description.toLowerCase()
  const shortDescription = product.shortDescription?.toLowerCase() || ''
  const tags = product.tags?.map(tag => tag.toLowerCase()) || []

  // Get material, size, and other specifications
  const material = product.specifications?.material?.toLowerCase() || ''
  const size = product.specifications?.size?.toLowerCase() || ''
  const printingType = product.specifications?.printingType?.toLowerCase() || ''
  const features = product.specifications?.features?.toLowerCase() || ''

  // Get category name
  const category = categories.find(c => c.id === product.categoryId)
  const categoryName = category?.name.toLowerCase() || ''
  const categorySlug = category?.slug.toLowerCase() || ''

  // Detect if this looks like an exact search (SKU pattern only)
  const isExactSearch = /^[A-Z]{2,4}\d+$/i.test(term)

  // 1. EXACT matches (highest priority)
  // Perfect SKU match
  if (sku === term || sku.replace('-', '') === term.replace('-', '')) {
    return { score: 1.0, matchType: 'exact' }
  }

  // Perfect name match
  if (name === term) {
    return { score: 1.0, matchType: 'exact' }
  }

  // For exact search mode, be very strict (SKU searches)
  if (isExactSearch) {
    // Only allow exact SKU matches for SKU-like queries
    if (sku.includes(term)) {
      return { score: 0.95, matchType: 'sku' }
    }
    // Don't allow fuzzy matching for exact searches
    return { score: 0, matchType: 'exact' }
  }

  // 2. High-priority matches for non-exact searches
  // Name matches
  if (name.includes(term)) {
    const exactMatch = name.startsWith(term)
    return { score: exactMatch ? 0.9 : 0.8, matchType: 'exact' }
  }

  // SKU matches
  if (sku.includes(term)) {
    return { score: 0.85, matchType: 'sku' }
  }

  // Material matches (high priority)
  if (material && material.includes(term)) {
    const exactMatch = material === term || material.startsWith(term)
    return { score: exactMatch ? 0.82 : 0.75, matchType: 'exact' }
  }

  // Category matches
  if (categoryName.includes(term) || categorySlug.includes(term)) {
    const exactMatch = categoryName === term || categorySlug === term
    return { score: exactMatch ? 0.8 : 0.72, matchType: 'exact' }
  }

  // 3. Partial word matching - for progressive search like "ba" -> "bag", "ste" -> "steel"
  const nameWords = name.split(/\s+|-/)
  for (const word of nameWords) {
    const wordLower = word.toLowerCase()
    if (wordLower.startsWith(term) && term.length >= 1) {
      const matchQuality = term.length / wordLower.length
      return { score: 0.75 * matchQuality, matchType: 'partial' }
    }
  }

  // Check material words
  if (material) {
    const materialWords = material.split(/\s+|-/)
    for (const word of materialWords) {
      if (word.startsWith(term) && term.length >= 2) {
        const matchQuality = term.length / word.length
        return { score: 0.7 * matchQuality, matchType: 'partial' }
      }
    }
  }

  // Check category words
  const categoryWords = categoryName.split(/\s+|-/)
  for (const word of categoryWords) {
    if (word.startsWith(term) && term.length >= 2) {
      const matchQuality = term.length / word.length
      return { score: 0.68 * matchQuality, matchType: 'partial' }
    }
  }

  // 4. SKU abbreviation matching
  const skuPrefix = sku.split('-')[0]
  if (SKU_PATTERNS[term.toUpperCase()]) {
    const patterns = SKU_PATTERNS[term.toUpperCase()]
    if (patterns.some((pattern: string) => name.includes(pattern) || description.includes(pattern))) {
      return { score: 0.7, matchType: 'sku' }
    }
  }

  if (SKU_PATTERNS[skuPrefix]) {
    const patterns = SKU_PATTERNS[skuPrefix]
    if (patterns.some((pattern: string) => pattern.includes(term))) {
      return { score: 0.65, matchType: 'sku' }
    }
  }

  // 5. Tag matches
  for (const tag of tags) {
    if (tag.includes(term) || term.includes(tag)) {
      return { score: 0.6, matchType: 'tag' }
    }
  }

  // 6. Short description matches
  if (shortDescription && shortDescription.includes(term)) {
    const wordBoundaryRegex = new RegExp(`\\b${term}`, 'i')
    if (wordBoundaryRegex.test(shortDescription)) {
      return { score: 0.55, matchType: 'description' }
    }
  }

  // 7. Synonym matching - more restrictive and category-aware
  for (const [key, synonyms] of Object.entries(PRODUCT_SYNONYMS)) {
    // Only match if the term exactly matches the key or synonym
    if (key === term) {
      if (synonyms.some(synonym => name.includes(synonym) || material.includes(synonym))) {
        return { score: 0.5, matchType: 'synonym' }
      }
    }

    for (const synonym of synonyms) {
      if (synonym === term) {
        if (name.includes(key) || material.includes(key)) {
          return { score: 0.45, matchType: 'synonym' }
        }
      }
    }
  }

  // 8. Size/dimension matches
  if (size && size.includes(term)) {
    return { score: 0.4, matchType: 'description' }
  }

  // 9. Printing type matches
  if (printingType && printingType.includes(term)) {
    return { score: 0.38, matchType: 'description' }
  }

  // 10. Features matches
  if (features && features.includes(term)) {
    return { score: 0.35, matchType: 'description' }
  }

  // 11. Description matching - much more restrictive
  if (description.includes(term) && term.length >= 3) {
    // Require word boundaries for description matches
    const wordBoundaryRegex = new RegExp(`\\b${term}`, 'i')
    if (wordBoundaryRegex.test(description)) {
      return { score: 0.25, matchType: 'description' }
    }
  }

  return { score: 0, matchType: 'exact' }
}

// Generate search suggestions based on partial matches
function generateSearchSuggestions(query: string, products: Product[], categories: Category[]): string[] {
  const suggestions = new Set<string>()
  const term = query.toLowerCase().trim()

  if (term.length < 2) return []

  // Add category suggestions
  categories.forEach(category => {
    const categoryName = category.name.toLowerCase()
    if (categoryName.startsWith(term) || categoryName.includes(term)) {
      suggestions.add(category.name)
    }
  })

  // Add material suggestions from products
  const materials = new Set<string>()
  products.forEach(product => {
    const material = product.specifications?.material?.toLowerCase()
    if (material && (material.startsWith(term) || material.includes(term))) {
      materials.add(product.specifications?.material || '')
    }
  })
  Array.from(materials).slice(0, 3).forEach(m => suggestions.add(m))

  // Add synonyms as suggestions
  for (const [key, synonyms] of Object.entries(PRODUCT_SYNONYMS)) {
    if (key.startsWith(term)) {
      suggestions.add(key)
    }
    synonyms.forEach(syn => {
      if (syn.startsWith(term)) suggestions.add(syn)
    })
  }

  // Add product names that partially match
  products.slice(0, 50).forEach(product => {
    const name = product.name.toLowerCase()
    const words = name.split(/\s+|-/)

    words.forEach(word => {
      if (word.startsWith(term) && word !== term && word.length > 2) {
        suggestions.add(word)
      }
    })
  })

  return Array.from(suggestions).slice(0, 6)
}

// Create comprehensive search response with JSON formatting
function createSearchResponse(
  query: string,
  products: Product[], 
  allProducts: Product[],
  categories: Category[],
  executionStart: number
): SearchResponse {
  const executionTime = performance.now() - executionStart
  const suggestions = generateSearchSuggestions(query, allProducts, categories)
  
  // Calculate category distribution
  const categoryCount = new Map<string, number>()
  products.forEach(product => {
    const count = categoryCount.get(product.categoryId) || 0
    categoryCount.set(product.categoryId, count + 1)
  })
  
  const categoryFilters = categories.map(category => ({
    id: category.id,
    name: category.name,
    count: categoryCount.get(category.id) || 0
  })).filter(cat => cat.count > 0)
  
  // Calculate price range
  const prices = products.map(p => p.price)
  const priceRange = {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
  
  // Calculate tag distribution
  const tagCount = new Map<string, number>()
  products.forEach(product => {
    product.tags?.forEach(tag => {
      const count = tagCount.get(tag) || 0
      tagCount.set(tag, count + 1)
    })
  })
  
  const tagFilters = Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
  
  // Create detailed results with matched fields
  const results = products.map(product => {
    const searchResult = calculateSearchScore(product, query, categories)
    const matchedFields: string[] = []
    const term = query.toLowerCase().trim()

    // Determine which fields matched
    if (product.name.toLowerCase().includes(term)) matchedFields.push('name')
    if (product.sku.toLowerCase().includes(term)) matchedFields.push('sku')
    if (product.description.toLowerCase().includes(term)) matchedFields.push('description')
    if (product.tags?.some(tag => tag.toLowerCase().includes(term))) matchedFields.push('tags')
    if (product.specifications?.material?.toLowerCase().includes(term)) matchedFields.push('material')

    const category = categories.find(c => c.id === product.categoryId)
    if (category?.name.toLowerCase().includes(term)) matchedFields.push('category')
    
    // Create snippet from description
    const description = product.description.toLowerCase()
    let snippet: string | undefined
    if (description.includes(term)) {
      const index = description.indexOf(term)
      const start = Math.max(0, index - 50)
      const end = Math.min(description.length, index + term.length + 50)
      snippet = product.description.substring(start, end) + (end < product.description.length ? '...' : '')
    }
    
    return {
      product,
      relevanceScore: searchResult.score,
      matchType: searchResult.matchType,
      matchedFields,
      snippet
    }
  })
  
  return {
    query,
    totalResults: products.length,
    executionTime: Math.round(executionTime * 100) / 100,
    results,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
    filters: {
      categories: categoryFilters,
      priceRange,
      tags: tagFilters
    }
  }
}

export function ProductCatalog({ searchParams }: ProductCatalogProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    categoryId: searchParams.category || '',
    minPrice: undefined,
    maxPrice: undefined,
    tags: [],
    featured: undefined
  })
  const [sortBy, setSortBy] = useState<string>(searchParams.sort || 'default')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.page || '1'))
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const products = (productsData as { Product: Product[] }).Product
  const categories = categoriesData as Category[]

  // Search state for debugging and analytics
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  
  // Filter and sort products with comprehensive search
  const filteredProducts = useMemo(() => {
    const executionStart = performance.now()
    
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categoryId && product.categoryId !== filters.categoryId) {
        return false
      }

      // Search filter with advanced matching
      if (filters.search) {
        const searchResult = calculateSearchScore(product, filters.search, categories)

        // Set minimum score threshold based on search type
        const searchTerm = filters.search.trim()
        const isExactSearch = /^[A-Z]{2,4}\d+$/i.test(searchTerm)
        const minThreshold = isExactSearch ? 0.8 : 0.2 // Lower threshold for partial word matches

        if (searchResult.score < minThreshold) {
          return false
        }
        // Store the score for later sorting
        ;(product as any).searchScore = searchResult.score
      }

      return true
    })
    
    // Create search response for analytics/debugging
    if (filters.search && filters.search.length >= 2) {
      const response = createSearchResponse(
        filters.search,
        filtered,
        products,
        categories,
        executionStart
      )
      setSearchResponse(response)
      
      // Log search analytics (can be sent to analytics service)
      console.log('Search Analytics:', {
        query: response.query,
        resultsCount: response.totalResults,
        executionTime: response.executionTime,
        topMatches: response.results.slice(0, 3).map(r => ({
          name: r.product.name,
          score: r.relevanceScore,
          matchType: r.matchType
        }))
      })
    } else {
      setSearchResponse(null)
    }

    // Sort products
    filtered.sort((a, b) => {
      // If search is active, prioritize by search relevance
      if (filters.search && (a as any).searchScore && (b as any).searchScore) {
        const scoreA = (a as any).searchScore
        const scoreB = (b as any).searchScore
        
        if (Math.abs(scoreA - scoreB) > 0.1) {
          return scoreB - scoreA // Higher score first
        }
        
        // If scores are close, use featured status as tiebreaker
        if (a.featured !== b.featured) {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        }
        
        return a.name.localeCompare(b.name)
      }
      
      switch (sortBy) {
        case 'default':
          // Default sorting: featured first, then by name
          if (a.featured !== b.featured) {
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          }
          return a.name.localeCompare(b.name)
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'rating-desc':
          return b.rating - a.rating
        case 'rating-asc':
          return a.rating - b.rating
        case 'model-asc':
          // Using SKU as model identifier
          return a.sku.localeCompare(b.sku)
        case 'model-desc':
          return b.sku.localeCompare(a.sku)
        case 'newest':
          // Sort by createdAt field (fallback to current date if not available)
          const dateA = new Date(a.createdAt || Date.now())
          const dateB = new Date(b.createdAt || Date.now())
          return dateB.getTime() - dateA.getTime()
        case 'oldest':
          const dateA2 = new Date(a.createdAt || Date.now())
          const dateB2 = new Date(b.createdAt || Date.now())
          return dateA2.getTime() - dateB2.getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Update filters with useCallback to prevent unnecessary re-renders
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setCurrentPage(1) // Reset to first page when filters change
  }, [])

  // Export search results as JSON
  const exportSearchResults = () => {
    if (!searchResponse) return
    
    const dataStr = JSON.stringify(searchResponse, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `search-results-${filters.search}-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      minPrice: undefined,
      maxPrice: undefined,
      tags: [],
      featured: undefined
    })
    setCurrentPage(1)
    setSearchResponse(null)
  }

  // Filter sidebar content
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Categories</label>
        <div className="space-y-2">
          <Button
            variant={!filters.categoryId ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ categoryId: '' })}
            className={`w-full justify-start ${
              !filters.categoryId 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'hover:bg-gray-50'
            }`}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.categoryId === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilters({ categoryId: category.id })}
              className={`w-full justify-start ${
                filters.categoryId === category.id 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'hover:bg-gray-50'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.categoryId || filters.search) && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with controls */}
        <FadeUpDiv animationOptions={{ duration: 600, threshold: 0.2 }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Our Products
            </h1>
            <div className="flex items-center gap-2 text-lg text-gray-600">
              <span className="font-medium text-primary">{filteredProducts.length}</span>
              <span>products available</span>
              {searchResponse && (
                <span className="text-sm text-gray-500 ml-2">
                  (found in {searchResponse.executionTime}ms)
                </span>
              )}
            </div>
            
            {/* Search suggestions */}
            {searchResponse?.suggestions && searchResponse.suggestions.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">Try:</span>
                <div className="flex flex-wrap gap-2">
                  {searchResponse.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => updateFilters({ search: suggestion })}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white border-gray-200 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by code, material, name, category..."
                  value={filters.search}
                  onChange={(e) => updateFilters({ search: e.target.value })}
                  className="pl-10 w-64 bg-white border-gray-200 shadow-sm"
                />
                {filters.search && (
                  <button
                    onClick={() => updateFilters({ search: '' })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Export search results */}
              {searchResponse && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportSearchResults}
                    className="bg-white border-gray-200 shadow-sm"
                    title="Export search results as JSON"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  {/* Search info tooltip */}
                  <div className="relative group">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        Advanced search with synonyms & relevance ranking
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* View Mode */}
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'}
              >
                <Grid className="w-4 h-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'}
              >
                <List className="w-4 h-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>

            {/* Mobile Filters */}
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden bg-white border-gray-200 shadow-sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
        </FadeUpDiv>

        {/* Main Content */}
        <div className="flex gap-6 lg:gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-6">
              <FadeLeftDiv animationOptions={{ duration: 600, delay: 200, threshold: 0.1 }}>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h3 className="font-semibold">Filter Products</h3>
                </div>
                <FilterContent />
                </div>
              </FadeLeftDiv>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <FadeInDiv animationOptions={{ duration: 600, delay: 300, threshold: 0.1 }}>
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    No products found in this category. Try selecting a different category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="bg-white border-gray-300 hover:bg-gray-50"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
                      {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 p-6">
                      {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} variant="compact" />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="hover:bg-gray-50"
                        >
                          Previous
                        </Button>

                        {(() => {
                          const pageNumbers: (number | string)[] = []
                          const maxVisible = 7 // Maximum page buttons to show

                          if (totalPages <= maxVisible) {
                            // Show all pages if total is small
                            for (let i = 1; i <= totalPages; i++) {
                              pageNumbers.push(i)
                            }
                          } else {
                            // Always show first page
                            pageNumbers.push(1)

                            // Calculate range around current page
                            let startPage = Math.max(2, currentPage - 1)
                            let endPage = Math.min(totalPages - 1, currentPage + 1)

                            // Adjust if current page is near the start
                            if (currentPage <= 3) {
                              endPage = Math.min(totalPages - 1, 4)
                            }

                            // Adjust if current page is near the end
                            if (currentPage >= totalPages - 2) {
                              startPage = Math.max(2, totalPages - 3)
                            }

                            // Add ellipsis after first page if needed
                            if (startPage > 2) {
                              pageNumbers.push('...')
                            }

                            // Add middle pages
                            for (let i = startPage; i <= endPage; i++) {
                              pageNumbers.push(i)
                            }

                            // Add ellipsis before last page if needed
                            if (endPage < totalPages - 1) {
                              pageNumbers.push('...')
                            }

                            // Always show last page
                            pageNumbers.push(totalPages)
                          }

                          return pageNumbers.map((page, index) => {
                            if (page === '...') {
                              return (
                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                  ...
                                </span>
                              )
                            }

                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? 'default' : 'outline'}
                                onClick={() => setCurrentPage(page as number)}
                                className={`w-10 ${
                                  currentPage === page
                                    ? 'bg-primary text-white hover:bg-primary/90'
                                    : 'hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </Button>
                            )
                          })
                        })()}

                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="hover:bg-gray-50"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            </FadeInDiv>
          </div>
        </div>
      </div>
    </section>
  )
}