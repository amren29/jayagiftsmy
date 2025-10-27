import { Metadata } from 'next'
import { BannerSlider } from '@/components/sections/BannerSlider'
import { BestSellers } from '@/components/sections/BestSellers'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'Home - Borneo Gifts & Premium Supply',
  description: 'Corporate Gifts Made Easy in Sabah - Professional promotional items and custom branding services in Miri & Kota Kinabalu.',
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <BannerSlider />
      <RandomAnimatedDiv>
        <BestSellers />
      </RandomAnimatedDiv>
      <RandomAnimatedDiv>
        <GlobalCTA />
      </RandomAnimatedDiv>
    </main>
  )
}