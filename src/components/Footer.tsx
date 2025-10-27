import Link from 'next/link'
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants'
import { FadeUpDiv, FadeInDiv } from '@/components/ScrollAnimatedDiv'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white ${className || ''}`}>
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <FadeUpDiv animationOptions={{ duration: 800, delay: 200, threshold: 0.1 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0 mr-2" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0 mr-2" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Categories</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.categories.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-medium text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="sm" className="p-2 h-auto">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-2 h-auto">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-2 h-auto">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-2 h-auto">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </div>
          </div>
          </div>
        </FadeUpDiv>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <FadeInDiv animationOptions={{ duration: 600, delay: 400, threshold: 0.1 }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          </FadeInDiv>
        </div>
      </div>
    </footer>
  )
}