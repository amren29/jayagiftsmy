'use client'

import { useState } from 'react'
import { MessageCircle, Send, User, Mail, Phone, Building, Package, Palette, FileText, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Product, ProductVariant } from '@/lib/types'
import { SITE_CONFIG } from '@/lib/constants'

interface RFQDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
  selectedVariant?: ProductVariant
}

interface RFQFormData {
  // Contact Information
  name: string
  email: string
  phone: string
  company: string
  
  // Product Requirements
  quantity: string
  variant: string
  customization: string
  imprintOptions: string[]
  colors: string
  
  // Additional Details
  timeline: string
  budget: string
  message: string
  
  // Preferences
  contactMethod: 'email' | 'phone' | 'whatsapp'
  urgency: 'low' | 'medium' | 'high'
}

const initialFormData: RFQFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  quantity: '',
  variant: '',
  customization: '',
  imprintOptions: [],
  colors: '',
  timeline: '',
  budget: '',
  message: '',
  contactMethod: 'whatsapp',
  urgency: 'medium'
}

export function RFQDialog({ open, onOpenChange, product, selectedVariant }: RFQDialogProps) {
  const [formData, setFormData] = useState<RFQFormData>({
    ...initialFormData,
    variant: selectedVariant?.name || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const updateFormData = (field: keyof RFQFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleImprintOption = (option: string) => {
    setFormData(prev => ({
      ...prev,
      imprintOptions: prev.imprintOptions.includes(option)
        ? prev.imprintOptions.filter(o => o !== option)
        : [...prev.imprintOptions, option]
    }))
  }

  const generateWhatsAppMessage = () => {
    const baseUrl = 'https://wa.me/'
    const phoneNumber = SITE_CONFIG.whatsapp.number.replace(/[^0-9]/g, '')
    
    let message = `🎁 *RFQ - ${product.name}*\n\n`
    message += `👋 Hi! I'm interested in getting a quote for:\n\n`
    message += `📦 *Product:* ${product.name}\n`
    
    if (formData.variant) {
      message += `🔧 *Variant:* ${formData.variant}\n`
    }
    
    if (formData.quantity) {
      message += `📊 *Quantity:* ${formData.quantity} units\n`
    }
    
    if (formData.customization) {
      message += `🎨 *Customization:* ${formData.customization}\n`
    }
    
    if (formData.imprintOptions.length > 0) {
      message += `🖨️ *Imprint Options:* ${formData.imprintOptions.join(', ')}\n`
    }
    
    if (formData.colors) {
      message += `🌈 *Colors:* ${formData.colors}\n`
    }
    
    if (formData.timeline) {
      message += `⏰ *Timeline:* ${formData.timeline}\n`
    }
    
    if (formData.budget) {
      message += `💰 *Budget Range:* ${formData.budget}\n`
    }
    
    message += `\n👤 *Contact Details:*\n`
    message += `• Name: ${formData.name}\n`
    message += `• Email: ${formData.email}\n`
    
    if (formData.phone) {
      message += `• Phone: ${formData.phone}\n`
    }
    
    if (formData.company) {
      message += `• Company: ${formData.company}\n`
    }
    
    if (formData.message) {
      message += `\n💬 *Additional Message:*\n${formData.message}\n`
    }
    
    message += `\n🔗 Product Link: ${window.location.href}\n`
    message += `\n✨ Looking forward to your quote!`
    
    return `${baseUrl}${phoneNumber}?text=${encodeURIComponent(message)}`
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Open WhatsApp with pre-filled message
      const whatsappUrl = generateWhatsAppMessage()
      window.open(whatsappUrl, '_blank')
      
      // Reset form and close dialog
      setFormData(initialFormData)
      setStep(1)
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting RFQ:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = formData.name && formData.email && formData.quantity
  const isStep2Valid = true // Optional fields

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Request Quote - {product.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Basic Info</span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Details</span>
            </div>
          </div>
          
          {step === 1 && (
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Contact Information</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Basic Requirements */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Basic Requirements</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity Needed *</Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => updateFormData('quantity', e.target.value)}
                        placeholder="e.g., 100, 500, 1000+"
                      />
                    </div>
                    
                    {product.variants && product.variants.length > 0 && (
                      <div className="space-y-2">
                        <Label htmlFor="variant">Product Variant</Label>
                        <Select value={formData.variant} onValueChange={(value) => updateFormData('variant', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a variant" />
                          </SelectTrigger>
                          <SelectContent>
                            {product.variants.map((variant) => (
                              <SelectItem key={variant.id} value={variant.name}>
                                {variant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">When do you need this?</Label>
                    <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                        <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                        <SelectItem value="1-2-months">1-2 months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              {/* Customization Details */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium flex items-center space-x-2">
                    <Palette className="w-4 h-4" />
                    <span>Customization Details</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customization">Customization Requirements</Label>
                      <Textarea
                        id="customization"
                        value={formData.customization}
                        onChange={(e) => updateFormData('customization', e.target.value)}
                        placeholder="Describe your logo, text, or design requirements..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Imprint Options</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Screen Printing', 'Embroidery', 'Laser Engraving', 'Digital Print', 'Debossing'].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`imprint-${option}`}
                              checked={formData.imprintOptions.includes(option)}
                              onCheckedChange={() => toggleImprintOption(option)}
                            />
                            <Label htmlFor={`imprint-${option}`} className="text-sm">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="colors">Preferred Colors</Label>
                      <Input
                        id="colors"
                        value={formData.colors}
                        onChange={(e) => updateFormData('colors', e.target.value)}
                        placeholder="e.g., Red, Blue, Company colors"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Budget & Additional Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Additional Information</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1500">Under RM 1,500</SelectItem>
                          <SelectItem value="1500-3000">RM 1,500 - RM 3,000</SelectItem>
                          <SelectItem value="3000-7500">RM 3,000 - RM 7,500</SelectItem>
                          <SelectItem value="7500-15000">RM 7,500 - RM 15,000</SelectItem>
                          <SelectItem value="over-15000">Over RM 15,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        placeholder="Any additional details, special requirements, or questions..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <div className="flex space-x-4">
                        {[
                          { value: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                          { value: 'email', label: 'Email', icon: Mail },
                          { value: 'phone', label: 'Phone', icon: Phone }
                        ].map(({ value, label, icon: Icon }) => (
                          <div key={value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`contact-${value}`}
                              checked={formData.contactMethod === value}
                              onCheckedChange={() => updateFormData('contactMethod', value)}
                            />
                            <Label htmlFor={`contact-${value}`} className="flex items-center space-x-1 text-sm">
                              <Icon className="w-3 h-3" />
                              <span>{label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <div>
              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              
              {step === 1 ? (
                <Button 
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                >
                  Next Step
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Quote Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          
          {/* WhatsApp Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800 mb-1">
                  Quick Response via WhatsApp
                </p>
                <p className="text-green-700">
                  Your quote request will be sent via WhatsApp for faster communication. 
                  We typically respond within 30 minutes during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}