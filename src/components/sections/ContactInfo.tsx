import { Phone, Mail, MessageCircle, MapPin, Clock, Globe, Users, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      primary: '+1 (555) 123-4567',
      secondary: 'Toll-free: 1-800-YUI-GIFT',
      action: 'tel:+15551234567',
      available: '24/7 Support Available',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send detailed requirements',
      primary: 'hello@jayagifts.com',
      secondary: 'quotes@jayagifts.com',
      action: 'mailto:hello@jayagifts.com',
      available: 'Response within 2 hours',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      description: 'Quick quotes and instant support',
      primary: '+1 (555) 123-4567',
      secondary: 'Business WhatsApp',
      action: 'https://wa.me/15551234567',
      available: 'Online 9 AM - 6 PM EST',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: MapPin,
      title: 'Visit Our Office',
      description: 'Schedule an in-person meeting',
      primary: '123 Business Ave, Suite 100',
      secondary: 'New York, NY 10001',
      action: 'https://maps.google.com/?q=123+Business+Ave+New+York+NY',
      available: 'By appointment only',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Emergency Support Only' }
  ]

  const departments = [
    {
      name: 'Sales & Quotes',
      email: 'sales@jayagifts.com',
      phone: '+1 (555) 123-4567 ext. 1',
      description: 'New orders and pricing inquiries'
    },
    {
      name: 'Customer Support',
      email: 'support@jayagifts.com',
      phone: '+1 (555) 123-4567 ext. 2',
      description: 'Order status and general support'
    },
    {
      name: 'Design Team',
      email: 'design@jayagifts.com',
      phone: '+1 (555) 123-4567 ext. 3',
      description: 'Custom design and artwork'
    },
    {
      name: 'Partnerships',
      email: 'partners@jayagifts.com',
      phone: '+1 (555) 123-4567 ext. 4',
      description: 'Business partnerships and bulk orders'
    }
  ]

  const quickFacts = [
    { icon: Clock, label: 'Response Time', value: '< 2 Hours' },
    { icon: Users, label: 'Expert Team', value: '15+ Specialists' },
    { icon: Globe, label: 'Languages', value: 'English, Spanish, Chinese' },
    { icon: Award, label: 'Satisfaction', value: '99.8% Rating' }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.1, threshold: 0.1 }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
              Contact Information
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Multiple Ways to
              <span className="text-primary block">
                Reach Our Team
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Choose the contact method that works best for you. Our dedicated team is ready 
              to help with all your corporate gifting needs.
            </p>
          </div>
        </FadeUpDiv>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.2, threshold: 0.1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Icon & Title */}
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-6 h-6 ${method.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {method.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        
                        {/* Contact Details */}
                        <div className="space-y-2">
                          <Button asChild variant="ghost" className="w-full justify-start h-auto p-0 hover:text-primary">
                            <a href={method.action} className="block">
                              <div className="text-left">
                                <div className="font-medium">{method.primary}</div>
                                <div className="text-sm text-muted-foreground">{method.secondary}</div>
                              </div>
                            </a>
                          </Button>
                        </div>
                        
                        {/* Availability */}
                        <div className="pt-2 border-t border-muted/20">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-xs text-muted-foreground">{method.available}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
                })}
              </div>
            </FadeInDiv>
            
            {/* Departments */}
            <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.4, threshold: 0.1 }}>
              <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Department Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {departments.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                      <div className="space-y-1">
                        <Button asChild variant="ghost" size="sm" className="h-auto p-0 text-xs hover:text-primary">
                          <a href={`mailto:${dept.email}`}>{dept.email}</a>
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="h-auto p-0 text-xs hover:text-primary block">
                          <a href={`tel:${dept.phone.replace(/[^+\d]/g, '')}`}>{dept.phone}</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              </Card>
            </FadeUpDiv>
          </div>

          {/* Sidebar */}
          <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.3, threshold: 0.1 }}>
            <div className="space-y-6">
            {/* Office Hours */}
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Office Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{schedule.day}</span>
                      <span className="text-sm text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-600">Currently Online</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Emergency support available 24/7 via WhatsApp
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Facts */}
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Quick Facts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quickFacts.map((fact, index) => {
                    const Icon = fact.icon
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{fact.label}</div>
                          <div className="text-lg font-bold text-primary">{fact.value}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* Emergency Contact */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Emergency Support</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Need urgent assistance? Our emergency line is available 24/7.
                    </p>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                      <a href="tel:+15551234567">Call Now</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </FadeInDiv>
        </div>
      </div>
    </section>
  )
}