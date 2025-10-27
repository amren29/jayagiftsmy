import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Palette, Package, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeUpDiv, FadeRightDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ServicesHero() {
  const keyServices = [
    { icon: Palette, label: 'Custom Design' },
    { icon: Package, label: 'Bulk Orders' },
    { icon: Globe, label: 'Domestic Shipping' }
  ]

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23CC0F2F%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
            <div className="space-y-8">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <span className="text-foreground font-medium">Services</span>
              </div>
              
              {/* Badge */}
              <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
                <CheckCircle className="w-3 h-3 mr-1" />
                Full-Service Solutions
              </Badge>
              
              {/* Main Content */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Complete Corporate
                  <span className="text-primary block">
                    Gifting Solutions
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  From concept to delivery, we provide end-to-end corporate gifting services 
                  that help your business build stronger relationships and make lasting impressions.
                </p>
                
                {/* Service Highlights */}
                <div className="space-y-4">
                  {[
                    'Custom branding and design services',
                    'Bulk ordering with competitive pricing',
                    'Quality assurance and testing',
                    'Global shipping and logistics',
                    '24/7 customer support'
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Custom Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </div>
              
              {/* Key Services */}
              <div className="flex flex-wrap gap-6 pt-8">
                {keyServices.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon className="w-4 h-4 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUpDiv>
          
          {/* Hero Image */}
          <FadeRightDiv animationOptions={{ duration: 800, delay: 200, threshold: 0.2 }}>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <Image
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20services%20workspace%20with%20custom%20branded%20products%2C%20design%20team%20working%20on%20promotional%20items%2C%20professional%20service%20environment%2C%20high%20quality%20business%20photography&image_size=landscape_4_3"
                  alt="Jaya Gifts comprehensive corporate gifting services"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Floating Service Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Custom Design</div>
                      <div className="text-xs text-muted-foreground">Free Consultation</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Bulk Orders</div>
                      <div className="text-xs text-muted-foreground">Volume Discounts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeRightDiv>
        </div>
        
        {/* Stats Bar */}
        <FadeInDiv animationOptions={{ duration: 600, delay: 400, threshold: 0.3 }}>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Service Projects' },
              { value: '24h', label: 'Response Time' },
              { value: '99%', label: 'On-Time Delivery' },
              { value: '25+', label: 'Countries Served' }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeInDiv>
      </div>
    </section>
  )
}