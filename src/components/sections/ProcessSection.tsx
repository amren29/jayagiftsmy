import { MessageCircle, Search, Palette, Package, Truck, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ProcessSection() {
  const steps = [
    {
      step: '01',
      icon: MessageCircle,
      title: 'Initial Consultation',
      description: 'We discuss your requirements, budget, timeline, and objectives to understand your needs.',
      details: [
        'Requirement analysis',
        'Budget discussion',
        'Timeline planning',
        'Objective setting'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      step: '02',
      icon: Search,
      title: 'Product Selection',
      description: 'Our experts curate a selection of products that align with your brand and requirements.',
      details: [
        'Product research',
        'Quality assessment',
        'Price comparison',
        'Recommendation report'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      step: '03',
      icon: Palette,
      title: 'Design & Customization',
      description: 'We create custom designs and branding solutions that perfectly represent your company.',
      details: [
        'Logo placement',
        'Color customization',
        'Design mockups',
        'Client approval'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      step: '04',
      icon: Package,
      title: 'Production & Quality Control',
      description: 'Your products are manufactured with strict quality control at every stage of production.',
      details: [
        'Production planning',
        'Quality inspections',
        'Progress updates',
        'Final approval'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      step: '05',
      icon: Truck,
      title: 'Packaging & Shipping',
      description: 'Professional packaging and reliable shipping ensure your products arrive in perfect condition.',
      details: [
        'Custom packaging',
        'Secure shipping',
        'Tracking information',
        'Delivery confirmation'
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      step: '06',
      icon: CheckCircle,
      title: 'Follow-up & Support',
      description: 'We ensure your complete satisfaction and provide ongoing support for future needs.',
      details: [
        'Delivery confirmation',
        'Satisfaction survey',
        'Future planning',
        'Ongoing support'
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.1, threshold: 0.1 }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
              Our Process
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              How We Deliver
              <span className="text-primary block">
                Exceptional Results
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our proven 6-step process ensures every project is executed flawlessly, 
              from initial consultation to final delivery and beyond.
            </p>
          </div>
        </FadeUpDiv>
        
        {/* Process Steps */}
        <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.2, threshold: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card 
                key={step.step} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm relative overflow-hidden"
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{step.step}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${step.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${step.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-2 pt-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.color.replace('text-', 'bg-')}`} />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                )}
              </Card>
            )
          })}
          </div>
        </FadeInDiv>
        
        {/* Timeline Visual */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.3, threshold: 0.1 }}>
          <div className="mt-16 hidden lg:block">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 transform -translate-y-1/2" />
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.step} className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary rounded-full mb-2 relative z-10" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Step {step.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUpDiv>
        
        {/* Bottom Stats */}
        <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.4, threshold: 0.1 }}>
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '24h', label: 'Initial Response' },
              { value: '7-14', label: 'Days Production' },
              { value: '99%', label: 'On-Time Delivery' },
              { value: '100%', label: 'Quality Guarantee' }
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