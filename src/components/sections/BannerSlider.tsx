'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    image: "/images/banners/banner-1.svg"
  },
  {
    id: 2,
    image: "/images/banners/banner-2.svg"
  },
  {
    id: 3,
    image: "/images/banners/banner-3.svg"
  },
  {
    id: 4,
    image: "/images/banners/banner-4.svg"
  }
]

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])


  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' :
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt={`Banner ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </div>
      ))}
    </section>
  )
}