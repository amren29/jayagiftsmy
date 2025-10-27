import { TrendingUp, Users, Package, Globe, Award, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '1,000+',
      label: 'Happy Clients',
      description: 'Businesses trust us with their corporate gifting needs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Package,
      value: '50,000+',
      label: 'Products Delivered',
      description: 'Successfully delivered across various industries',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Globe,
      value: '25+',
      label: 'Countries Served',
      description: 'Global reach with local expertise',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      value: '98%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding expectations',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Clock,
      value: '24h',
      label: 'Quick Response',
      description: 'Fast turnaround on quotes and inquiries',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: TrendingUp,
      value: '14+',
      label: 'Years Experience',
      description: 'Proven track record in corporate gifting',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Numbers That Speak
            <span className="text-primary block">
              Our Success Story
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our achievements reflect our commitment to excellence and the trust 
            our clients place in us. These numbers represent real relationships, 
            successful projects, and satisfied customers.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card 
                key={stat.label} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-muted/20"
              >
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    
                    {/* Value */}
                    <div className="space-y-2">
                      <div className="text-4xl lg:text-5xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {stat.label}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 lg:p-12 text-center text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join Our Growing Family of Satisfied Clients
            </h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Experience the difference that comes with working with a trusted partner 
              who understands your business needs and delivers exceptional results.
            </p>
            
            {/* Mini Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '99.5%', label: 'On-Time Delivery' },
                { value: '4.9/5', label: 'Average Rating' },
                { value: '72h', label: 'Average Production' },
                { value: '24/7', label: 'Customer Support' }
              ].map((miniStat) => (
                <div key={miniStat.label} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold mb-1">
                    {miniStat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/80">
                    {miniStat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}