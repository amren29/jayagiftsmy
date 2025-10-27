import Image from 'next/image'
import { Calendar, Target, Lightbulb, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function CompanyStory() {
  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Started as a small team with a vision to revolutionize corporate gifting',
      icon: Calendar
    },
    {
      year: '2015',
      title: 'First 100 Clients',
      description: 'Reached our first major milestone with diverse client portfolio',
      icon: Users
    },
    {
      year: '2018',
      title: 'Innovation Hub',
      description: 'Launched our custom design and branding services',
      icon: Lightbulb
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: 'Serving 1000+ clients with 50,000+ products delivered',
      icon: Target
    }
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Our Story
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Building Relationships Through
                <span className="text-primary block">
                  Thoughtful Gifting
                </span>
              </h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Founded in 2010, Jaya Gifts began with a simple yet powerful belief:
                that the right gift can strengthen business relationships and create
                lasting impressions that drive success.
              </p>
              
              <p>
                What started as a small team with big dreams has grown into a leading 
                provider of premium corporate gifts and promotional products. We've 
                helped thousands of businesses across industries express their 
                appreciation, celebrate achievements, and build stronger connections 
                with their clients, employees, and partners.
              </p>
              
              <p>
                Today, we continue to innovate and expand our offerings while staying 
                true to our core values of quality, service, and integrity. Every 
                product we deliver carries our commitment to excellence and our 
                passion for helping businesses succeed.
              </p>
            </div>
            
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-primary">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    To provide exceptional corporate gifting solutions that strengthen 
                    business relationships and create memorable experiences.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-secondary">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    To be the global leader in corporate gifting, known for innovation, 
                    quality, and unparalleled customer service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Timeline */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
              <p className="text-muted-foreground">
                Key milestones that shaped our company
              </p>
            </div>
            
            <div className="space-y-6">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <div key={milestone.year} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-16 bg-border ml-6 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {milestone.year}
                        </Badge>
                      </div>
                      <h4 className="font-semibold mb-1">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Company Image */}
        <div className="mt-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
            <Image
              src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20corporate%20office%20workspace%20with%20elegant%20gift%20displays%2C%20promotional%20products%20showcase%2C%20professional%20team%20collaboration%2C%20bright%20and%20inspiring%20atmosphere%2C%20high%20quality%20business%20photography&image_size=landscape_16_9"
              alt="Jaya Gifts office and team workspace"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}