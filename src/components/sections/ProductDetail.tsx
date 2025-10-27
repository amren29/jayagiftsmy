'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart, MessageCircle, Star, Check, Info, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RFQDialog } from '@/components/RFQDialog'
import { CartDrawer } from '@/components/CartDrawer'
import { QuotationForm } from '@/components/QuotationForm'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import { Product, Category } from '@/lib/types'
import { calculateMOQPrice, getMinimumQuantity, validateMOQQuantity, getSuggestedQuantities } from '@/lib/moq-pricing'
import { 
  calculatePrintingPrice, 
  getAvailablePrintMethods, 
  validatePrintingQuantity,
  getSuggestedQuantitiesForMethod,
  getBestPrintMethod 
} from '@/lib/printing-pricing'
import categoriesData from '@/data/categories.json'

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const [showRFQDialog, setShowRFQDialog] = useState(false)
  const [showQuotationForm, setShowQuotationForm] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(getMinimumQuantity())
  const [selectedPrintMethod, setSelectedPrintMethod] = useState<string | null>(
    product.printingPricing ? getBestPrintMethod(getMinimumQuantity(), product.printingPricing) : null
  )
  
  const { addItem, toggleCart } = useCart()
  
  // Calculate base price using MOQ pricing
  const basePriceCalculation = product.moqPricing 
    ? calculateMOQPrice(quantity, product.price)
    : null
  
  // Calculate printing price if printing method is selected
  const printingCalculation = selectedPrintMethod && product.printingPricing
    ? calculatePrintingPrice(quantity, selectedPrintMethod, product.printingPricing)
    : null

  // Combined price calculation including printing costs
  const priceCalculation = basePriceCalculation ? {
    ...basePriceCalculation,
    unitPrice: basePriceCalculation.unitPrice + (printingCalculation?.pricePerUnit || 0),
    totalPrice: basePriceCalculation.totalPrice + (printingCalculation?.totalPrintingCost || 0) + (printingCalculation?.setupFee || 0),
  } : null
  
  const suggestedQuantities = getSuggestedQuantities()
  const isValidQuantity = validateMOQQuantity(quantity)
  const minQuantity = getMinimumQuantity()
  
  // Get available print methods for this product
  const availablePrintMethods = product.printingPricing 
    ? getAvailablePrintMethods(product.printingPricing) 
    : []

  const categories = categoriesData as Category[]
  const category = categories.find(c => c.id === product.categoryId)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/products?category=${category.id}`} className="hover:text-primary">
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group">
              <Image
                src={product.images[currentImageIndex] ? `/${product.images[currentImageIndex]}` : '/images/placeholder-product.svg'}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image ? `/${image}` : '/images/placeholder-product.svg'}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  {product.featured && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  {category && (
                    <Link 
                      href={`/products?category=${category.id}`}
                      className="text-primary hover:underline"
                    >
                      {category.name}
                    </Link>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              {/* Price Range */}
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {product.originalPrice 
                  ? `RM ${product.price} (was RM ${product.originalPrice})`
                  : `RM ${product.price}`}
                </div>
                <p className="text-sm text-muted-foreground">
                  Price varies based on quantity and customization options
                </p>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Customization Options */}
            <div className="space-y-2">
              <h3 className="font-medium">Customization Available</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <Check className="w-3 h-3 mr-1" />
                  Logo Printing
                </Badge>
                <Badge variant="secondary">
                  <Check className="w-3 h-3 mr-1" />
                  Custom Colors
                </Badge>
                <Badge variant="secondary">
                  <Check className="w-3 h-3 mr-1" />
                  Packaging Options
                </Badge>
              </div>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">Select Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id
                    const isColorVariant = variant.type.toLowerCase() === 'color'
                    
                    if (isColorVariant) {
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: variant.value.toLowerCase() }}
                          title={`${variant.name} - ${variant.value}`}
                        />
                      )
                    } else {
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            isSelected 
                              ? 'border-primary bg-primary text-primary-foreground' 
                              : 'border-gray-300 hover:border-primary'
                          }`}
                        >
                          {variant.value}
                        </button>
                      )
                    }
                  })}
                </div>
                {selectedVariant && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedVariant.name} - {selectedVariant.value}
                  </p>
                )}
              </div>
            )}

            {/* Printing Options Selection */}
            {product.printingPricing && availablePrintMethods.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Printing Options</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Print Method</Label>
                    <div className="flex flex-wrap gap-2">
                      {availablePrintMethods.map((method) => (
                        <Button
                          key={method}
                          variant={selectedPrintMethod === method ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPrintMethod(method)}
                          className="text-xs"
                        >
                          {method}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                </div>
              </div>
            )}

            {/* MOQ Pricing Input */}
            {product.moqPricing && product.moqPricing.tiers && product.moqPricing.tiers.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">MOQ Pricing</h3>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (Min: {minQuantity} pcs)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={minQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 0
                        setQuantity(newQuantity)
                      }}
                      className={`${!isValidQuantity ? 'border-red-500' : ''}`}
                      placeholder={`Enter quantity (min ${minQuantity})`}
                    />
                    {!isValidQuantity && (
                      <p className="text-sm text-red-500">
                        Minimum quantity is {minQuantity} pieces
                      </p>
                    )}
                  </div>
                  
                  {/* Quick quantity buttons */}
                  {suggestedQuantities.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Quick select:</Label>
                      <div className="flex flex-wrap gap-2">
                        {suggestedQuantities.slice(0, 6).map((suggestedQty) => (
                          <Button
                            key={suggestedQty}
                            variant={quantity === suggestedQty ? "default" : "outline"}
                            size="sm"
                            onClick={() => setQuantity(suggestedQty)}
                            className="text-xs"
                          >
                            {suggestedQty}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Price calculation display */}
                  {priceCalculation && isValidQuantity && (
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4 space-y-2">
                        {/* Base product unit price */}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Product Unit Price:</span>
                          <span className="font-bold text-primary">
                            {formatPrice(basePriceCalculation?.unitPrice || 0)}
                          </span>
                        </div>
                        
                        {/* Printing cost per unit if selected */}
                        {printingCalculation && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Printing Cost/Unit ({selectedPrintMethod}):</span>
                            <span className="font-bold text-orange-600">
                              +{formatPrice(printingCalculation.pricePerUnit)}
                            </span>
                          </div>
                        )}
                        
                        {/* Total unit price */}
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm font-medium">Total Unit Price:</span>
                          <span className="font-bold text-primary">
                            {formatPrice(priceCalculation.unitPrice)}
                          </span>
                        </div>

                        {/* Setup fee if applicable */}
                        {printingCalculation && printingCalculation.setupFee > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Setup Fee:</span>
                            <span className="font-bold text-orange-600">
                              +{formatPrice(printingCalculation.setupFee)}
                            </span>
                          </div>
                        )}
                        
                        {/* Final total price */}
                        <div className="flex justify-between items-center border-t pt-2">
                          <span className="text-sm font-medium">Total Price:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(priceCalculation.totalPrice)}
                          </span>
                        </div>
                        
                        {basePriceCalculation?.savings && basePriceCalculation?.savingsPercentage && (
                          <div className="flex justify-between items-center text-green-600">
                            <span className="text-sm">MOQ Savings:</span>
                            <span className="text-sm font-medium">
                              {formatPrice(basePriceCalculation.savings)} ({basePriceCalculation.savingsPercentage.toFixed(1)}%)
                            </span>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground pt-1">
                          Quantity: {priceCalculation.quantity} pieces
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (!isValidQuantity || !priceCalculation) {
                    alert(`Please enter a valid quantity (minimum ${minQuantity} pieces)`)
                    return
                  }
                  setShowQuotationForm(true)
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Request Quotation
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                onClick={() => {
                  if (!isValidQuantity || !priceCalculation) {
                    alert(`Please enter a valid quantity (minimum ${minQuantity} pieces)`)
                    return
                  }
                  
                  const options: Record<string, string> = {
                    moqTier: `${quantity} units at ${formatPrice(priceCalculation.unitPrice)} each`
                  }
                  
                  // Add printing method if selected
                  if (selectedPrintMethod) {
                    options.printingMethod = selectedPrintMethod
                    if (printingCalculation) {
                      options.printingCost = formatPrice(printingCalculation.pricePerUnit)
                      options.printingTotal = formatPrice(printingCalculation.totalWithSetup)
                    }
                  }
                  
                  addItem(
                    product,
                    selectedVariant,
                    quantity,
                    options
                  )
                  
                  toggleCart()
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Request Quotation: Instantly submit a quote request for a quick response.</p>
              <p>• Add to Cart: Select multiple items and request a quotation in one go.</p>
            </div>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Min Order:</span>
                    <div className="font-medium">
                      {minQuantity} pcs
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lead Time:</span>
                    <div className="font-medium">5-10 business days</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Shipping:</span>
                    <div className="font-medium">Worldwide</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Warranty:</span>
                    <div className="font-medium">1 Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="production">Production</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.specifications && Object.keys(product.specifications).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={index} className="flex justify-between py-2 border-b">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value || 'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Detailed specifications will be provided with your quote.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="production" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Production Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Manufacturing Details</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Production lead time: 7-14 business days</li>
                      <li>• Quality control: ISO 9001 certified</li>
                      <li>• Custom branding available</li>
                      <li>• Bulk order discounts applicable</li>
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Customization Options</h4>
                    <p className="text-sm text-muted-foreground">
                      Logo printing, color customization, and packaging options available for bulk orders.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Delivery Options</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Standard Shipping: 5-7 business days</li>
                        <li>• Express Shipping: 2-3 business days</li>
                        <li>• Overnight Shipping: Next business day</li>
                        <li>• International Shipping: 7-14 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Shipping Costs</h4>
                      <p className="text-sm text-muted-foreground">
                        Shipping costs are calculated based on order value, weight, and destination. 
                        Free shipping available for orders over RM 1,500.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Returns & Exchanges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Return Policy</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• 30-day return window for unused items</li>
                        <li>• Custom/personalized items are non-returnable</li>
                        <li>• Return shipping costs apply</li>
                        <li>• Refunds processed within 5-7 business days</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Quality Guarantee</h4>
                      <p className="text-sm text-muted-foreground">
                        We stand behind the quality of our products. If you're not satisfied, 
                        we'll work with you to make it right.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quotation Form */}
        <QuotationForm
          product={product}
          isOpen={showQuotationForm}
          onClose={() => setShowQuotationForm(false)}
          quantity={quantity}
          printingMethod={selectedPrintMethod || undefined}
          pricePerUnit={priceCalculation?.unitPrice || product.price}
          totalPrice={priceCalculation?.totalPrice || (product.price * quantity)}
          variant={selectedVariant}
        />
      </div>
    </section>
  )
}