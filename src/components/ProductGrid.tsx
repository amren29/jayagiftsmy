import { Product } from '@/lib/types'
import { ProductCard } from './ProductCard'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  className?: string
  variant?: 'default' | 'compact'
  showQuickActions?: boolean
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export function ProductGrid({ 
  products, 
  className,
  variant = 'default',
  showQuickActions = true,
  columns = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4
  }
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21V9l-8-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  const gridClasses = cn(
    'grid gap-4 sm:gap-5 lg:gap-4 xl:gap-5',
    // Default column (mobile)
    `grid-cols-${columns.default}`,
    // Small screens
    columns.sm && `sm:grid-cols-${columns.sm}`,
    // Medium screens
    columns.md && `md:grid-cols-${columns.md}`,
    // Large screens
    columns.lg && `lg:grid-cols-${columns.lg}`,
    // Extra large screens
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  )

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          showQuickActions={showQuickActions}
        />
      ))}
    </div>
  )
}

// Preset grid configurations for common use cases
export function FeaturedProductGrid({ products, className }: { products: Product[], className?: string }) {
  return (
    <ProductGrid
      products={products}
      className={className}
      columns={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4
      }}
    />
  )
}

export function CompactProductGrid({ products, className }: { products: Product[], className?: string }) {
  return (
    <ProductGrid
      products={products}
      className={className}
      variant="compact"
      columns={{
        default: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6
      }}
    />
  )
}

export function RelatedProductGrid({ products, className }: { products: Product[], className?: string }) {
  return (
    <ProductGrid
      products={products}
      className={className}
      variant="compact"
      showQuickActions={false}
      columns={{
        default: 2,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4
      }}
    />
  )
}