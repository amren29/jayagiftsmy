import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Users, Award, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeInDiv, FadeUpDiv, FadeRightDiv } from '@/components/ScrollAnimatedDiv'

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:20px_20px] opacity-60" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
            <div className="space-y-8">
            {/* Badge */}
            <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Trusted by 1000+ Companies
            </Badge>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Premium
                <span className="text-primary block">
                  Corporate Gifts
                </span>
                <span className="text-2xl lg:text-4xl font-medium text-gray-600">
                  That Make an Impact
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Discover our extensive collection of customizable corporate gifts, promotional items, and branded merchandise. From premium tech accessories to eco-friendly options, we help you make lasting impressions.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-base px-8">
                <Link href="/contact">
                  Get Custom Quote
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-gray-900">1000+</span>
                </div>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Award className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-gray-900">500+</span>
                </div>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start mb-2">
                  <Truck className="h-5 w-5 text-primary mr-2" />
                  <span className="text-2xl font-bold text-gray-900">24h</span>
                </div>
                <p className="text-sm text-gray-600">Fast Delivery</p>
              </div>
            </div>
            </div>
          </FadeUpDiv>
          
          {/* Right Content - Hero Image */}
          <FadeRightDiv animationOptions={{ duration: 800, delay: 200, threshold: 0.2 }}>
            <div className="relative">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <Image
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20corporate%20gifts%20display%20with%20branded%20items%20including%20notebooks%2C%20pens%2C%20mugs%2C%20tech%20accessories%2C%20and%20promotional%20products%20arranged%20elegantly%20on%20a%20modern%20desk%20with%20soft%20lighting%20and%20clean%20background&image_size=square_hd"
                alt="Premium Corporate Gifts Collection"
                fill
                className="object-cover"
                priority
              />
              
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          </FadeRightDiv>
        </div>
      </div>
    </section>
  )
}