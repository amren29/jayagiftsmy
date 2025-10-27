import { Search, Filter, Grid, List } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ProductsHero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <span>Home</span>
              <span>/</span>
              <span className="text-primary font-medium">Products</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                Corporate Gifts &
                <span className="block text-primary">Promotional Products</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover our extensive collection of high-quality corporate gifts and promotional products. 
                Perfect for brand building, employee recognition, and client appreciation.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Search className="w-4 h-4 mr-2" />
                Advanced Search
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Smart Filters
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Grid className="w-4 h-4 mr-2" />
                Multiple Views
              </Badge>
            </div>
          </FadeUpDiv>
          
          {/* Stats */}
          <FadeInDiv animationOptions={{ duration: 600, delay: 300, threshold: 0.3 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">12+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Quick Quote</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">Free</div>
              <div className="text-sm text-muted-foreground">Branding</div>
            </div>
            </div>
          </FadeInDiv>
        </div>
      </div>
    </section>
  )
}