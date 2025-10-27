import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Package, CreditCard, Truck, Users, Clock } from 'lucide-react'
import { FadeUpDiv, FadeInDiv, RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'
import { GlobalCTA } from '@/components/sections/GlobalCTA'

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Borneo Gifts & Premium Supply',
  description: 'Find answers to common questions about our corporate gifts, custom branding services, ordering process, and more.',
}

const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    icon: MessageCircle,
    questions: [
      {
        question: 'What types of corporate gifts do you offer?',
        answer: 'We offer a wide range of corporate gifts including promotional items, custom branded merchandise, executive gifts, employee recognition awards, and seasonal gifts. Our catalog includes tech accessories, office supplies, apparel, drinkware, bags, and premium gift sets.'
      },
      {
        question: 'Do you serve clients outside of Sabah?',
        answer: 'Yes, while we are based in Sabah (Miri & Kota Kinabalu), we serve clients throughout Malaysia and can arrange shipping to other locations. Contact us for shipping rates and delivery times to your area.'
      },
      {
        question: 'What makes Borneo Gifts & Premium Supply different from other suppliers?',
        answer: 'We specialize in corporate gifts with local expertise in Sabah, offer competitive MOQ requirements, provide comprehensive custom branding services, and maintain strong relationships with reliable suppliers to ensure quality and timely delivery.'
      }
    ]
  },
  {
    id: 'ordering',
    title: 'Ordering Process',
    icon: Package,
    questions: [
      {
        question: 'What is the minimum order quantity (MOQ)?',
        answer: 'MOQ varies by product. Most items have MOQs starting from 50-100 pieces, while some premium items may require higher quantities. Check individual product pages for specific MOQ requirements and tiered pricing.'
      },
      {
        question: 'How do I place an order?',
        answer: 'You can request a quote by clicking "Request Quote" on any product page, which will open WhatsApp with pre-filled details. Alternatively, contact us directly via phone or email. We\'ll provide a detailed quotation and guide you through the ordering process.'
      },
      {
        question: 'Can I get samples before placing a large order?',
        answer: 'Yes, we can provide samples for most products. Sample costs and shipping fees may apply, which can often be credited toward your final order. Contact us to discuss sample requirements for your specific needs.'
      },
      {
        question: 'What information do I need to provide for custom branding?',
        answer: 'Please provide your logo in high-resolution format (AI, EPS, or PNG), specify branding locations, preferred colors, and any special requirements. Our design team will create a mockup for your approval before production.'
      }
    ]
  },
  {
    id: 'customization',
    title: 'Customization & Branding',
    icon: Users,
    questions: [
      {
        question: 'What customization options are available?',
        answer: 'We offer various customization methods including screen printing, embroidery, laser engraving, digital printing, and embossing. The best method depends on your product choice, design complexity, and budget.'
      },
      {
        question: 'Can you match our company colors exactly?',
        answer: 'We strive to match your brand colors as closely as possible. Please provide Pantone color codes or color samples for the most accurate matching. Some variations may occur depending on the material and printing method used.'
      },
      {
        question: 'Do you provide design services?',
        answer: 'Yes, our experienced design team can help create or modify designs for your corporate gifts. We offer design consultation, logo optimization, and layout services to ensure the best results for your branded merchandise.'
      },
      {
        question: 'What file formats do you accept for artwork?',
        answer: 'We accept AI, EPS, PDF, PNG, and JPG files. Vector formats (AI, EPS) are preferred for the best quality results. If you only have low-resolution files, our design team can help recreate your artwork.'
      }
    ]
  },
  {
    id: 'pricing',
    title: 'Pricing & Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'How is pricing determined?',
        answer: 'Pricing depends on product selection, quantity, customization complexity, and delivery requirements. We offer tiered pricing with better rates for larger quantities. Request a quote for accurate pricing based on your specific needs.'
      },
      {
        question: 'Are there additional costs for customization?',
        answer: 'Customization costs vary based on the method used, number of colors, and complexity. Simple single-color printing may be included in the base price, while complex multi-color designs or premium techniques may incur additional charges.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, company cheques, and cash payments. For large orders, we may require a deposit before production begins. Payment terms can be discussed based on your company\'s requirements.'
      },
      {
        question: 'Do you offer discounts for repeat customers?',
        answer: 'Yes, we value long-term partnerships and offer competitive pricing for repeat customers. Volume discounts and loyalty programs are available for regular corporate clients.'
      }
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery & Timeline',
    icon: Truck,
    questions: [
      {
        question: 'What are your typical delivery times?',
        answer: 'Standard delivery time is 7-14 working days after artwork approval and deposit payment. Rush orders may be accommodated with additional charges. Complex customizations or large quantities may require longer lead times.'
      },
      {
        question: 'Do you offer rush delivery?',
        answer: 'Yes, rush delivery is available for selected products and may incur additional charges. Contact us to discuss your timeline requirements and we\'ll do our best to accommodate urgent orders.'
      },
      {
        question: 'How do you handle delivery in Sabah?',
        answer: 'We offer free delivery within Miri and Kota Kinabalu city areas for orders above minimum value. For other locations in Sabah, delivery charges apply based on distance and order size.'
      },
      {
        question: 'Can you deliver directly to multiple locations?',
        answer: 'Yes, we can arrange delivery to multiple addresses for large corporate orders. Additional handling and delivery charges may apply. This service is ideal for companies with multiple branches or events.'
      }
    ]
  },
  {
    id: 'quality',
    title: 'Quality & Support',
    icon: Clock,
    questions: [
      {
        question: 'What quality standards do you maintain?',
        answer: 'We work with certified suppliers and conduct quality checks throughout the production process. All products are inspected before delivery to ensure they meet our quality standards and your expectations.'
      },
      {
        question: 'What if I\'m not satisfied with my order?',
        answer: 'Customer satisfaction is our priority. If there are quality issues or errors on our part, we will work to resolve them promptly. Please inspect your order upon delivery and contact us immediately with any concerns.'
      },
      {
        question: 'Do you provide after-sales support?',
        answer: 'Yes, we provide comprehensive after-sales support including assistance with reorders, design modifications, and addressing any product-related queries. Our team is always ready to help with your corporate gifting needs.'
      },
      {
        question: 'Can you help with gift packaging and presentation?',
        answer: 'Absolutely! We offer various packaging options including gift boxes, bags, and custom packaging solutions. Professional presentation is important for corporate gifts, and we can help make your gifts look impressive.'
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <FadeUpDiv animationOptions={{ duration: 800, threshold: 0.2 }}>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Find answers to common questions about our corporate gifts and services
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Corporate Gifts
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Custom Branding
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Sabah Based
                </Badge>
              </div>
            </div>
          </FadeUpDiv>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeUpDiv animationOptions={{ duration: 600, delay: 200, threshold: 0.2 }}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Everything You Need to Know
                </h2>
                <p className="text-lg text-gray-600">
                  Browse through our comprehensive FAQ sections or contact us directly for personalized assistance
                </p>
              </div>
            </FadeUpDiv>

            <FadeInDiv animationOptions={{ duration: 600, delay: 400, threshold: 0.1 }}>
              <div className="grid gap-8">
              {faqCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="h-6 w-6 text-blue-600" />
                        </div>
                        {category.title}
                      </CardTitle>
                      <CardDescription>
                        Common questions about {category.title.toLowerCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left hover:text-blue-600">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            </FadeInDiv>
          </div>
        </div>
      </section>

      <GlobalCTA />

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Our team is here to help with any specific questions about your corporate gifting needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/60123456789?text=Hi%20Yui%20Gifts%2C%20I%20have%20a%20question%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp Us
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
              >
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}