import { Phone, Mail, MessageCircle, Clock, MapPin, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { FadeUpDiv, FadeRightDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ContactHero() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us your requirements',
      value: 'hello@jayagifts.com',
      action: 'mailto:hello@jayagifts.com',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick chat for instant quotes',
      value: '+1 (555) 123-4567',
      action: 'https://wa.me/15551234567',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]

  const quickStats = [
    { icon: Clock, label: '24h Response', value: 'Guaranteed' },
    { icon: Users, label: 'Expert Team', value: '10+ Years' },
    { icon: MapPin, label: 'Global Reach', value: '50+ Countries' }
  ]

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
            <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary font-medium">Contact</span>
            </nav>
            
            {/* Badge */}
            <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
              Get In Touch
            </Badge>
            
            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Let's Discuss Your
                <span className="text-primary block">
                  Next Project
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Ready to elevate your corporate gifting? Our expert team is here to help you 
                create memorable experiences that strengthen business relationships.
              </p>
            </div>
            
            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-6 h-6 ${method.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{method.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{method.description}</p>
                          <Button asChild variant="ghost" size="sm" className="h-auto p-0 text-xs hover:text-primary">
                            <a href={method.action}>{method.value}</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {quickStats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            </div>
          </FadeUpDiv>
          
          {/* Right Content - Hero Image */}
          <FadeRightDiv animationOptions={{ duration: 800, delay: 200, threshold: 0.2 }}>
            <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-8">
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm relative">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20reception%20area%20with%20professional%20team%20members%20greeting%20clients%2C%20corporate%20gifts%20display%2C%20clean%20minimalist%20design%2C%20natural%20lighting%2C%20business%20professional%20atmosphere&image_size=landscape_4_3"
                  alt="Contact Jaya Gifts Team"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Online Now</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </div>
          </FadeRightDiv>
        </div>
        
        {/* Bottom Stats */}
        <FadeInDiv animationOptions={{ duration: 600, delay: 400, threshold: 0.3 }}>
          <div className="mt-16 pt-8 border-t border-muted/20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '1000+', label: 'Projects Completed' },
              { value: '24h', label: 'Response Time' },
              { value: '99%', label: 'Client Satisfaction' },
              { value: '50+', label: 'Countries Served' }
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
        </FadeInDiv>
      </div>
    </section>
  )
}