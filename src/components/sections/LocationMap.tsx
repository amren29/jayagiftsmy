import { MapPin, Navigation, Car, Train, Plane, Clock, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function LocationMap() {
  const locations = [
    {
      name: 'Headquarters',
      address: '123 Business Avenue, Suite 100',
      city: 'New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'ny@jayagifts.com',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
      type: 'primary',
      mapUrl: 'https://maps.google.com/?q=123+Business+Avenue+New+York+NY',
      directions: [
        'From JFK Airport: 45 minutes by taxi',
        'From Penn Station: 15 minutes by subway',
        'Parking available in building garage'
      ]
    },
    {
      name: 'West Coast Office',
      address: '456 Innovation Drive',
      city: 'Los Angeles, CA 90210',
      phone: '+1 (555) 987-6543',
      email: 'la@jayagifts.com',
      hours: 'Mon-Fri: 9 AM - 6 PM PST',
      type: 'secondary',
      mapUrl: 'https://maps.google.com/?q=456+Innovation+Drive+Los+Angeles+CA',
      directions: [
        'From LAX Airport: 30 minutes by car',
        'From Union Station: 25 minutes by metro',
        'Valet parking available'
      ]
    }
  ]

  const transportOptions = [
    {
      icon: Car,
      title: 'By Car',
      description: 'Free parking available',
      details: 'Building garage with validation'
    },
    {
      icon: Train,
      title: 'By Subway',
      description: '2 blocks from station',
      details: 'Lines 4, 5, 6 - Union Square'
    },
    {
      icon: Plane,
      title: 'By Air',
      description: '45 min from JFK',
      details: 'Airport shuttle available'
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="bg-primary/10 text-primary mb-4">
            Our Locations
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Visit Us or
            <span className="text-primary block">
              Schedule a Meeting
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We have offices across the country to serve you better. Schedule an in-person 
            consultation or visit our showroom to see our products firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Interactive Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Embedded Map Placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                  {/* Map Image */}
                  <img
                    src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20office%20building%20exterior%20in%20New%20York%20city%2C%20glass%20facade%2C%20corporate%20headquarters%2C%20street%20view%2C%20urban%20setting%2C%20professional%20architecture&image_size=landscape_4_3"
                    alt="Jaya Gifts Office Location"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Map Overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Location Markers */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Map Controls */}
                  <div className="absolute bottom-4 right-4">
                    <Button asChild size="sm" className="bg-white/90 text-primary hover:bg-white">
                      <a href={locations[0].mapUrl} target="_blank" rel="noopener noreferrer">
                        <Navigation className="w-4 h-4 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Transport Options */}
            <Card className="bg-white/80 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  <span>How to Get Here</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {transportOptions.map((option, index) => {
                    const Icon = option.icon
                    return (
                      <div key={index} className="text-center space-y-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{option.title}</h4>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{option.details}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {locations.map((location, index) => (
              <Card key={index} className={`bg-white/80 backdrop-blur-sm border-0 ${location.type === 'primary' ? 'ring-2 ring-primary/20' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{location.name}</span>
                    </CardTitle>
                    {location.type === 'primary' && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Main Office
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="space-y-1">
                      <p className="font-medium">{location.address}</p>
                      <p className="text-muted-foreground">{location.city}</p>
                    </div>
                    
                    <Separator />
                    
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <Button asChild variant="ghost" size="sm" className="h-auto p-0 hover:text-primary">
                          <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}>{location.phone}</a>
                        </Button>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <Button asChild variant="ghost" size="sm" className="h-auto p-0 hover:text-primary">
                          <a href={`mailto:${location.email}`}>{location.email}</a>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Hours */}
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">Hours:</span>
                      <span className="text-muted-foreground">{location.hours}</span>
                    </div>
                    
                    {/* Directions */}
                    <div className="space-y-2">
                      <p className="font-medium text-sm">Getting Here:</p>
                      <ul className="space-y-1">
                        {location.directions.map((direction, dirIndex) => (
                          <li key={dirIndex} className="text-xs text-muted-foreground flex items-start space-x-2">
                            <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span>{direction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                        <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Call Office
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Appointment Booking */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Schedule a Visit</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Book an appointment to visit our showroom and meet with our experts.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Book Appointment
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://wa.me/15551234567?text=I'd like to schedule a visit to your office">
                          WhatsApp Us
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold">
              Can't Visit? No Problem!
            </h3>
            <p className="text-muted-foreground">
              We offer virtual consultations and can ship product samples directly to you. 
              Our team is available for video calls to discuss your requirements in detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                Schedule Video Call
              </Button>
              <Button variant="outline">
                Request Samples
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}