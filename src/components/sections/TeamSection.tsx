import Image from 'next/image'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

export function TeamSection() {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      department: 'Leadership',
      bio: 'With over 15 years in corporate gifting, Sarah leads our vision of creating meaningful business connections through thoughtful gifts.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businesswoman%20CEO%20in%20modern%20office%2C%20confident%20smile%2C%20business%20suit%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'sarah.chen@jayagifts.com',
      linkedin: '#'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Sales',
      department: 'Sales',
      bio: 'Michael brings 12 years of B2B sales experience, helping clients find the perfect promotional solutions for their business needs.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20hispanic%20businessman%20sales%20director%2C%20friendly%20smile%2C%20business%20suit%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'michael.rodriguez@jayagifts.com',
      linkedin: '#'
    },
    {
      name: 'Emily Johnson',
      role: 'Creative Director',
      department: 'Design',
      bio: 'Emily leads our design team, creating custom branding solutions that help businesses make lasting impressions with their gifts.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20creative%20director%20woman%2C%20artistic%20background%2C%20confident%20pose%2C%20modern%20business%20casual%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'emily.johnson@jayagifts.com',
      linkedin: '#'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager',
      department: 'Operations',
      bio: 'David ensures smooth operations and timely delivery, managing our supply chain and quality control processes.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20asian%20businessman%20operations%20manager%2C%20confident%20expression%2C%20business%20shirt%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'david.kim@jayagifts.com',
      linkedin: '#'
    },
    {
      name: 'Lisa Thompson',
      role: 'Customer Success Manager',
      department: 'Customer Service',
      bio: 'Lisa is dedicated to ensuring every client has an exceptional experience, from initial inquiry to final delivery.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20businesswoman%20customer%20service%20manager%2C%20warm%20smile%2C%20business%20attire%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'lisa.thompson@jayagifts.com',
      linkedin: '#'
    },
    {
      name: 'James Wilson',
      role: 'Quality Assurance Lead',
      department: 'Quality',
      bio: 'James maintains our high quality standards, ensuring every product meets our rigorous specifications before delivery.',
      image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20businessman%20quality%20assurance%20manager%2C%20serious%20expression%2C%20business%20suit%2C%20corporate%20headshot%20style&image_size=portrait_4_3',
      email: 'james.wilson@jayagifts.com',
      linkedin: '#'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.1, threshold: 0.1 }}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Meet the Experts Behind
              <span className="text-primary block">
                Your Success
              </span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our diverse team of professionals brings together decades of experience 
              in corporate gifting, design, operations, and customer service to deliver 
              exceptional results for your business.
            </p>
          </div>
        </FadeUpDiv>
        
        {/* Team Grid */}
        <FadeInDiv animationOptions={{ duration: 0.8, delay: 0.2, threshold: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {member.department}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium">
                      {member.role}
                    </p>
                  </div>
                  
                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Contact */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </FadeInDiv>
        
        {/* Bottom CTA */}
        <FadeUpDiv animationOptions={{ duration: 0.6, delay: 0.3, threshold: 0.1 }}>
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Work with Our Expert Team?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Our team is here to help you find the perfect corporate gifting solution. 
                Get in touch today and experience the difference our expertise makes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Our Team
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/products">
                    Browse Our Products
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeUpDiv>
      </div>
    </section>
  )
}