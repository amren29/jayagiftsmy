import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Truck, MapPin, Clock, Package, Shield, Phone, MessageCircle } from 'lucide-react'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'Shipping Information & Policies | Borneo Gifts & Premium Supply',
  description: 'Learn about our shipping options, delivery areas, timelines, and policies for corporate gifts in Sabah and throughout Malaysia.',
}

const deliveryZones = [
  {
    zone: 'Miri City Area',
    coverage: 'Within 15km radius of Miri city center',
    deliveryTime: '1-2 working days',
    minOrder: 'RM 200',
    cost: 'FREE',
    icon: '🏢'
  },
  {
    zone: 'Kota Kinabalu City Area',
    coverage: 'Within 20km radius of KK city center',
    deliveryTime: '1-2 working days',
    minOrder: 'RM 200',
    cost: 'FREE',
    icon: '🏙️'
  },
  {
    zone: 'Other Sabah Areas',
    coverage: 'Sandakan, Tawau, Lahad Datu, Kudat, etc.',
    deliveryTime: '3-5 working days',
    minOrder: 'RM 500',
    cost: 'RM 15-50',
    icon: '🌴'
  },
  {
    zone: 'Peninsular Malaysia',
    coverage: 'KL, Selangor, Penang, Johor, etc.',
    deliveryTime: '5-7 working days',
    minOrder: 'RM 800',
    cost: 'RM 25-80',
    icon: '🏛️'
  },
  {
    zone: 'East Malaysia (Sarawak)',
    coverage: 'Kuching, Sibu, Bintulu, etc.',
    deliveryTime: '4-6 working days',
    minOrder: 'RM 600',
    cost: 'RM 20-60',
    icon: '🌺'
  }
]

const shippingFeatures = [
  {
    icon: Package,
    title: 'Secure Packaging',
    description: 'All items are carefully packed to ensure safe delivery with protective materials and branded packaging options.'
  },
  {
    icon: Shield,
    title: 'Delivery Insurance',
    description: 'Orders above RM 500 include delivery insurance coverage for loss or damage during transit.'
  },
  {
    icon: Clock,
    title: 'Order Tracking',
    description: 'Receive tracking information and delivery updates via WhatsApp or SMS for all shipments.'
  },
  {
    icon: Truck,
    title: 'Multiple Delivery Options',
    description: 'Choose from standard delivery, express shipping, or scheduled delivery to meet your timeline needs.'
  }
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Shipping Information
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Fast and reliable delivery across Sabah and Malaysia for all your corporate gifting needs
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Sabah Coverage
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Malaysia Wide
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Free Local Delivery
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Delivery Coverage Areas
              </h2>
              <p className="text-lg text-gray-600">
                We deliver corporate gifts across Malaysia with special focus on Sabah regions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliveryZones.map((zone, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{zone.icon}</div>
                    <CardTitle className="text-xl">{zone.zone}</CardTitle>
                    <CardDescription>{zone.coverage}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Delivery Time:</span>
                      <Badge variant="outline">{zone.deliveryTime}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Min Order:</span>
                      <span className="font-semibold">{zone.minOrder}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Delivery Cost:</span>
                      <span className={`font-semibold ${zone.cost === 'FREE' ? 'text-green-600' : 'text-blue-600'}`}>
                        {zone.cost}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Delivery Service
              </h2>
              <p className="text-lg text-gray-600">
                Professional delivery service designed for corporate clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shippingFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Policies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Shipping Policies & Guidelines
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Processing Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Standard Orders</h4>
                    <p className="text-gray-600 text-sm">2-3 working days for order processing after artwork approval and payment confirmation.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Custom Branding</h4>
                    <p className="text-gray-600 text-sm">5-10 working days depending on customization complexity and quantity.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Rush Orders</h4>
                    <p className="text-gray-600 text-sm">Available for selected items with 50% surcharge. Contact us for availability.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-600" />
                    Packaging Standards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Standard Packaging</h4>
                    <p className="text-gray-600 text-sm">Protective bubble wrap and sturdy boxes for all shipments at no extra cost.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Gift Packaging</h4>
                    <p className="text-gray-600 text-sm">Premium gift boxes, bags, and wrapping available for corporate presentations.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Bulk Orders</h4>
                    <p className="text-gray-600 text-sm">Individual packaging or bulk packaging options based on your distribution needs.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Delivery Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Attempts</h4>
                    <p className="text-gray-600 text-sm">Up to 3 delivery attempts. Recipient will be contacted before each attempt.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Inspection Period</h4>
                    <p className="text-gray-600 text-sm">Please inspect items upon delivery. Report any issues within 24 hours.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Confirmation</h4>
                    <p className="text-gray-600 text-sm">Photo confirmation and recipient signature for orders above RM 1,000.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Special Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Multiple Addresses</h4>
                    <p className="text-gray-600 text-sm">Delivery to multiple locations available for corporate events and campaigns.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">Scheduled Delivery</h4>
                    <p className="text-gray-600 text-sm">Arrange specific delivery dates for events, meetings, or special occasions.</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-2">International Shipping</h4>
                    <p className="text-gray-600 text-sm">Available to selected countries. Contact us for rates and customs requirements.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <GlobalCTA />

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Custom Shipping Solutions?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Contact our team to discuss special delivery requirements for your corporate orders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/60123456789?text=Hi%20Yui%20Gifts%2C%20I%20need%20information%20about%20shipping%20options"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </a>
              <a
                href="tel:+60123456789"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Us
              </a>
            </div>
            <div className="mt-8 text-center">
              <p className="text-green-100 text-sm">
                Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}