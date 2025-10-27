import { Shield, Truck, Users, Award, Clock, Palette } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'All our products undergo rigorous quality checks to ensure they meet the highest standards for corporate gifting.',
    color: 'text-blue-600'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick turnaround times with reliable shipping options. Most orders delivered within 5-7 business days.',
    color: 'text-green-600'
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Professional customization services including logo printing, embroidery, and engraving on all products.',
    color: 'text-purple-600'
  },
  {
    icon: Users,
    title: 'Bulk Discounts',
    description: 'Competitive pricing with attractive volume discounts. The more you order, the more you save.',
    color: 'text-orange-600'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Dedicated customer support team available round the clock to assist with your orders and queries.',
    color: 'text-red-600'
  },
  {
    icon: Award,
    title: 'Trusted Partner',
    description: 'Over 1000+ satisfied clients trust us for their corporate gifting needs. Join our growing family.',
    color: 'text-indigo-600'
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your Trusted
            <span className="text-primary"> Corporate Gifting Partner</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine quality products, exceptional service, and competitive pricing to deliver the best corporate gifting experience.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors`}>
                      <IconComponent className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}