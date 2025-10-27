'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, X, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import categoriesData from '@/data/categories.json'
import { Category } from '@/lib/types'
import { useState } from 'react'

const categories = categoriesData as Category[]

export function FeaturedCategories() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [removedCategories, setRemovedCategories] = useState<string[]>([])
  
  // Get featured categories (first 6) and filter out removed ones
  const featuredCategories = categories
    .filter(cat => cat.featured && !removedCategories.includes(cat.id))
    .slice(0, 6)

  const handleRemoveCategory = (categoryId: string) => {
    setRemovedCategories(prev => [...prev, categoryId])
  }

  const handleRestoreCategories = () => {
    setRemovedCategories([])
  }
  
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 relative">
          <Badge variant="outline" className="mb-4">
            Product Categories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Our
            <span className="text-primary"> Featured Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From tech accessories to eco-friendly options, discover the perfect corporate gifts for every occasion and budget.
          </p>
          
          {/* Edit Mode Controls */}
          <div className="absolute top-0 right-0 flex gap-2">
            <Button
              variant={isEditMode ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <Edit className="h-4 w-4 mr-1" />
              {isEditMode ? "Exit Edit" : "Edit"}
            </Button>
            {removedCategories.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestoreCategories}
              >
                Restore All
              </Button>
            )}
          </div>
        </div>
        
        {/* Categories Grid */}
        {featuredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCategories.map((category) => (
              <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                {/* Remove Button */}
                {isEditMode && (
                  <button
                    onClick={() => handleRemoveCategory(category.id)}
                    className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
                    title="Remove category"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {category.productCount} Products
                      </span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                
                <Link href={`/products?category=${category.slug}`} className="absolute inset-0" style={{zIndex: isEditMode ? -1 : 'auto'}} />
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <p className="text-gray-500 mb-4">All categories have been removed.</p>
              {removedCategories.length > 0 && (
                <Button onClick={handleRestoreCategories} variant="outline">
                  Restore All Categories
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* View All Categories CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}