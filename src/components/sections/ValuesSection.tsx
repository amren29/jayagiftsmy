import { Shield, Heart, Zap, Users, Award, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ValuesSection() {
  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      title: 'Customer-Centric',
      description: 'Our customers are at the heart of everything we do. We listen, understand, and deliver beyond expectations.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest trends and cutting-edge solutions in corporate gifting.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, understanding their unique needs and goals.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our business, from product selection to customer service.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to sustainable practices and offer eco-friendly options for conscious businesses.',
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
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              The Principles That
              <span className="text-primary block">
                Guide Our Success
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our core values shape every decision we make and every relationship we build. 
              They are the foundation of our commitment to excellence and the driving force 
              behind our continued growth.
            </p>
          </div>
        </FadeUpDiv>
        
        {/* Values Grid */}
        <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.2, threshold: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card 
                  key={value.title} 
                  className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
                >
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              )
            })}
          </div>
        </FadeInDiv>
        
        {/* Bottom CTA */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.4, threshold: 0.1 }}>
          <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Experience Our Values in Action?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let us show you how our commitment to quality, innovation, and customer 
              satisfaction can help your business make a lasting impression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Start Your Project
              </a>
              <a 
                href="/products" 
                className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Browse Products
              </a>
            </div>
          </div>
          </div>
        </FadeUpDiv>
      </div>
    </section>
  )
}