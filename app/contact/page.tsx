import { Metadata } from 'next'
import { ContactHero } from '@/components/sections/ContactHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { GlobalCTA } from '@/components/sections/GlobalCTA'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export const metadata: Metadata = {
  title: 'Contact Us - Borneo Gifts & Premium Supply',
  description: 'Get in touch with Borneo Gifts & Premium Supply for your corporate gifting needs. Professional service and quality products.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <RandomAnimatedDiv>
        <ContactForm />
      </RandomAnimatedDiv>
      <RandomAnimatedDiv>
        <GlobalCTA />
      </RandomAnimatedDiv>
    </main>
  )
}