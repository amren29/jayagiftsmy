import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { MissionVisionSection } from '@/components/sections/MissionVisionSection'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'About Us - Borneo Gifts & Premium Supply',
  description: 'Learn about Borneo Gifts & Premium Supply - your trusted partner for corporate gifts and promotional items. Professional service since 2010.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RandomAnimatedDiv>
        <MissionVisionSection />
      </RandomAnimatedDiv>
      <RandomAnimatedDiv>
        <GlobalCTA />
      </RandomAnimatedDiv>
    </main>
  )
}