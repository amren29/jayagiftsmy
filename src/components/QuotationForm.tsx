'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MessageCircle, User, Mail, Phone, Building, MapPin } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/format'

interface QuotationFormData {
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  additionalNotes: string
}

interface QuotationFormProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  quantity: number
  printingMethod?: string
  pricePerUnit: number
  totalPrice: number
  variant?: any
}

export function QuotationForm({
  product,
  isOpen,
  onClose,
  quantity,
  printingMethod,
  pricePerUnit,
  totalPrice,
  variant
}: QuotationFormProps) {
  const [formData, setFormData] = useState<QuotationFormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    additionalNotes: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof QuotationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateWhatsAppMessage = () => {
    const message = [
      `Hello! I would like to request a quotation for the following items:`,
      ``,
      `Company name: ${formData.companyName || '[To be filled]'}`,
      `Contact name: ${formData.contactName || '[To be filled]'}`,
      `Email: ${formData.email || '[To be filled]'}`,
      `Phone: ${formData.phone || '[To be filled]'}`,
      `Address: ${formData.address || '[To be filled]'}`,
      ``,
      `1. ${product.sku} - ${product.name}`,
      variant ? `   Variant: ${variant.name} - ${variant.value}` : '',
      `   Options: moqTier: ${quantity} units at ${formatPrice(pricePerUnit)} each${printingMethod ? `, printingMethod: ${printingMethod}` : ''}`,
      `   Quantity: ${quantity}`,
      `   Unit Price: ${formatPrice(pricePerUnit)}`,
      `   Total: ${formatPrice(totalPrice)}`,
      ``,
      `Grand Total: ${formatPrice(totalPrice)}`,
      ``,
      formData.additionalNotes ? `${formData.additionalNotes}\n` : '',
      `Please provide your best quotation for these items. Thank you!`
    ].filter(line => line !== '').join('\n')

    return message
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/60103570729?text=${encodeURIComponent(message)}`
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Close form after a short delay
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const isFormValid = formData.contactName.trim() !== '' && formData.phone.trim() !== ''

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Request Quotation - {product.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Summary */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-medium">{quantity} pieces</span>
              </div>
              {printingMethod && (
                <div className="flex justify-between">
                  <span>Printing:</span>
                  <span className="font-medium">{printingMethod}</span>
                </div>
              )}
              {variant && (
                <div className="flex justify-between">
                  <span>Variant:</span>
                  <span className="font-medium">{variant.name}: {variant.value}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Price/pc:</span>
                <span className="font-medium">{formatPrice(pricePerUnit)}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company Name
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Name *
              </Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+60 12-345-6789"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Your delivery address"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="Any special requirements or questions..."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                'Opening WhatsApp...'
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send to WhatsApp
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            * Required fields. Your information will be included in the WhatsApp message.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}