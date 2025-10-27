import { Palette, Package, Truck, HeadphonesIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ServicesList() {
  const services = [
    {
      icon: Palette,
      title: 'Custom Design & Branding',
      description: 'Professional design services to create unique branded products that reflect your company identity.',
      features: [
        'Logo design and placement',
        'Color matching and customization',
        'Artwork consultation',
        'Digital mockups and proofs'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Package,
      title: 'Bulk Ordering Solutions',
      description: 'Streamlined bulk ordering process with competitive pricing and flexible MOQ options.',
      features: [
        'Volume discounts available',
        'Flexible minimum orders',
        'Inventory management',
        'Scheduled deliveries'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Truck,
      title: 'Domestic Shipping & Logistics (Door to Door)',
      description: 'Comprehensive domestic shipping solutions with tracking and insurance for door-to-door delivery.',
      features: [
        'Nationwide shipping coverage',
        'Real-time tracking',
        'Insurance options',
        'Door-to-door delivery service'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Customer Support',
      description: 'Round-the-clock customer support to assist with orders, inquiries, and issues.',
      features: [
        'Dedicated account managers',
        'Multi-channel support',
        'Order status updates',
        'Technical assistance'
      ],
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Comprehensive Solutions for
            <span className="text-primary block">
              Your Corporate Gifting Needs
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From initial concept to final delivery, we provide end-to-end services 
            that ensure your corporate gifting program exceeds expectations and 
            delivers measurable results.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card 
                key={service.title} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative"
              >
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${service.color.replace('text-', 'bg-')}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}