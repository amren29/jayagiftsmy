'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { NAVIGATION_MENU, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  className?: string
}

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(item => item !== itemTitle)
        : [...prev, itemTitle]
    )
  }

  const isExpanded = (itemTitle: string) => expandedItems.includes(itemTitle)

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href) || false
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('md:hidden p-2', className)}
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
              <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Navigation Menu */}
          <nav className="flex-1 p-6 space-y-2">
            {NAVIGATION_MENU.map((item) => {
              const hasChildren = (item as any).items && (item as any).items.length > 0
              const isActive = isActiveLink(item.href)
              const expanded = isExpanded(item.title)

              if (!hasChildren) {
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-3 px-4 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    {item.title}
                  </Link>
                )
              }

              return (
                <Collapsible key={item.title} open={expanded} onOpenChange={() => toggleExpanded(item.title)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-between py-3 px-4 h-auto text-sm font-medium',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {item.title}
                      {expanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="space-y-1 mt-1">
                    {(item as any).items?.map((child: any) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block py-2 px-8 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors',
                          isActiveLink(child.href) && 'text-primary bg-gray-50'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </nav>

          {/* Contact Information */}
          <div className="border-t p-6 space-y-4">
            <h3 className="font-semibold text-sm text-gray-900">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-600">{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-600">{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="space-y-2 pt-4">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}