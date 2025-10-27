import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Award, Globe, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeUpDiv, FadeRightDiv } from '@/components/ScrollAnimatedDiv'

export function AboutHero() {
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
              <span className="text-foreground font-medium">About Us</span>
            </div>
            
            {/* Badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
              <Heart className="w-3 h-3 mr-1" />
              Trusted Since 2010
            </Badge>
            
            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Crafting Memorable
                <span className="text-primary block">
                  Corporate Experiences
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                For over a decade, Jaya Gifts has been the trusted partner for businesses
                seeking premium corporate gifts and promotional products that leave lasting impressions.
              </p>
              

              
              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Products Delivered</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/products">
                  Explore Products
                </Link>
              </Button>
            </div>
            
            {/* Key Features */}
            <div className="flex flex-wrap gap-6 pt-8">
              {[
                { icon: Users, label: 'Expert Team' },
                { icon: Award, label: 'Quality Assured' },
                { icon: Globe, label: 'Global Reach' }
              ].map(({ icon: Icon, label }) => (
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
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20office%20team%20meeting%20with%20diverse%20professionals%20discussing%20promotional%20products%20and%20corporate%20gifts%2C%20bright%20and%20professional%20atmosphere%2C%20high%20quality%20photography%20style&image_size=landscape_4_3"
                alt="Jaya Gifts team working on corporate gift solutions"
                fill
                className="object-cover"
                priority
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">ISO Certified</div>
                    <div className="text-xs text-muted-foreground">Quality Management</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-[200px]">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Domestic Shipping</div>
                    <div className="text-xs text-muted-foreground">Door-to-Door Delivery</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </FadeRightDiv>
        </div>
      </div>
    </section>
  )
}