import Link from 'next/link'
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/constants'

export function CallToAction() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Ready to Make an
                <span className="block">Impression?</span>
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                Get a personalized quote for your corporate gifting needs. Our team will help you find the perfect products that align with your brand and budget.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary" className="text-base px-8">
                <Link href="/contact">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-base px-8 border-white text-white hover:bg-white hover:text-primary">
                <Link href="/products">
                  Browse Catalog
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-8 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm text-white/80">Quick Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-white/80">Quote & Design</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-white/80">Happy Clients</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Contact Cards */}
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Call Us Now</h3>
                    <p className="text-white/80 text-sm mb-2">Speak directly with our experts</p>
                    <a 
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-white font-medium hover:underline"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Us</h3>
                    <p className="text-white/80 text-sm mb-2">Get detailed information via email</p>
                    <a 
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-white font-medium hover:underline"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <p className="text-white/80 text-sm mb-2">Quick chat for instant quotes</p>
                    <a 
                      href={`https://wa.me/${SITE_CONFIG.whatsapp.number.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:underline"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}