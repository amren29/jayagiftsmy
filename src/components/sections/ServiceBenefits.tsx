import { Shield, Clock, Globe, Users, Award, HeartHandshake } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ServiceBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Every product undergoes rigorous quality control with ISO certification standards.',
      features: [
        'ISO 9001 certified processes',
        'Multi-stage quality checks',
        '100% satisfaction guarantee',
        'Defect replacement policy'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Quick response times and efficient production schedules to meet your deadlines.',
      features: [
        '24-hour quote response',
        '7-14 days production',
        'Rush order options',
        'Real-time progress updates'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Worldwide shipping capabilities with reliable logistics partners.',
      features: [
        '50+ countries served',
        'Multiple shipping options',
        'Customs handling',
        'Tracking & insurance'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Dedicated professionals with years of experience in corporate gifting.',
      features: [
        'Industry expertise',
        'Design specialists',
        'Account managers',
        '24/7 customer support'
      ],
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Award,
      title: 'Competitive Pricing',
      description: 'Best value for money with transparent pricing and no hidden costs.',
      features: [
        'Volume discounts',
        'Transparent pricing',
        'No hidden fees',
        'Price match guarantee'
      ],
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted Partnership',
      description: 'Building long-term relationships with personalized service and support.',
      features: [
        'Dedicated account manager',
        'Personalized service',
        'Long-term partnerships',
        'Ongoing support'
      ],
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ]

  const testimonials = [
    {
      quote: "Jaya Gifts transformed our corporate gifting strategy. Their attention to detail and quality is unmatched.",
      author: "Sarah Johnson",
      company: "Tech Solutions Inc.",
      role: "Marketing Director"
    },
    {
      quote: "Fast delivery, excellent quality, and outstanding customer service. They've become our go-to partner.",
      author: "Michael Chen",
      company: "Global Enterprises",
      role: "Procurement Manager"
    },
    {
      quote: "The team at Jaya Gifts understands our brand perfectly. Every product reflects our company values.",
      author: "Emma Rodriguez",
      company: "Creative Agency",
      role: "Brand Manager"
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Benefits That Make
            <span className="text-primary block">
              The Difference
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Experience the advantages of working with a trusted corporate gifting partner 
            committed to excellence and customer satisfaction.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${benefit.borderColor} hover:border-primary/30 bg-white/80 backdrop-blur-sm relative overflow-hidden`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 ${benefit.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="p-6 relative z-10">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${benefit.color}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-2 pt-2">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className={`w-1.5 h-1.5 rounded-full ${benefit.color.replace('text-', 'bg-')}`} />
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
        
        {/* Testimonials */}
        <div className="bg-muted/30 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              What Our Clients Say
            </h3>
            <p className="text-muted-foreground">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-4xl text-primary/20">&ldquo;</div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="pt-4 border-t border-muted/20">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied customers who trust us with their corporate gifting needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/contact">
                  Get Started Today
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '1000+', label: 'Happy Clients' },
            { value: '50K+', label: 'Products Delivered' },
            { value: '99.8%', label: 'Satisfaction Rate' },
            { value: '24/7', label: 'Customer Support' }
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
      </div>
    </section>
  )
}