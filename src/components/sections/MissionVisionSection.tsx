import { Heart, Globe } from 'lucide-react'
import { FadeUpDiv } from '@/components/ScrollAnimatedDiv'

export function MissionVisionSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Our <span className="text-primary">Purpose</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Driven by our commitment to excellence and meaningful business relationships
              </p>
            </div>
            
            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-colors">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To strengthen business relationships through thoughtfully curated corporate gifts 
                    that reflect your brand values and create meaningful connections with clients, 
                    partners, and employees.
                  </p>
                </div>
              </div>
              
              <div className="bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/20 transition-colors">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To be the leading corporate gifting partner in Southeast Asia, recognized for 
                    our innovation, quality, and ability to transform business relationships through 
                    exceptional gift experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUpDiv>
      </div>
    </section>
  )
}