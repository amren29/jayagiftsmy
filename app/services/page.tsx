import { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { ServicesList } from '@/components/sections/ServicesList'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'Services - Borneo Gifts & Premium Supply',
  description: 'Complete corporate gifting solutions including custom design, bulk orders, branding services, and global shipping.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesHero />
      <RandomAnimatedDiv>
        <ServicesList />
      </RandomAnimatedDiv>
      <RandomAnimatedDiv>
        <GlobalCTA />
      </RandomAnimatedDiv>
    </main>
  )
}