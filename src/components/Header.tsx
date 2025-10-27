'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { SITE_CONFIG, NAVIGATION_MENU } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { MiniCartButton } from './CartDrawer'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')
  const router = useRouter()

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(mobileSearchQuery.trim())}`)
      setMobileSearchQuery('')
      setIsSearchOpen(false)
    }
  }

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60', className)}>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{SITE_CONFIG.contact.phone}</span>
            </div>
            <div className="hidden md:block">
              <span>{SITE_CONFIG.contact.email}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free shipping on orders over RM 300</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-gray-900">{SITE_CONFIG.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAVIGATION_MENU.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {(item as any).items ? (
                    <>
                      <NavigationMenuTrigger className="text-gray-700 hover:text-primary">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {(item as any).items.map((subItem: any) => (
                            <NavigationMenuLink key={subItem.title} asChild>
                              <Link
                                href={subItem.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href || '#'}
                        className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors text-gray-700 hover:text-primary focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent hover:border-primary focus:border-primary"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              {isSearchOpen ? (
                <form onSubmit={handleDesktopSearch} className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    disabled={!searchQuery.trim()}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile Search */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => {
                if (isSearchOpen) {
                  setMobileSearchQuery('')
                }
                setIsSearchOpen(!isSearchOpen)
              }}
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <MiniCartButton />

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2 pb-4 border-b">
                    <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                      <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <span className="font-bold text-xl text-gray-900">{SITE_CONFIG.name}</span>
                  </div>
                  
                  {NAVIGATION_MENU.map((item) => (
                    <div key={item.title} className="space-y-2">
                      {(item as any).items ? (
                        <>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <div className="pl-4 space-y-2">
                            {(item as any).items.map((subItem: any) => (
                              <Link
                                key={subItem.title}
                                href={subItem.href}
                                className="block text-sm text-gray-600 hover:text-primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href || '#'}
                          className="block font-medium text-gray-900 hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleMobileSearch}>
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}