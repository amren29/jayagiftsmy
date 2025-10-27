import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RandomAnimatedDiv } from '@/components/ScrollAnimatedDiv'

export function GlobalCTA() {
  return (
    <section className="py-16 lg:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <RandomAnimatedDiv>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Need a Custom Service Solution?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every business is unique, and so are their gifting needs. Let us create a tailored service
              package that perfectly fits your requirements and budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-3 text-base">
                <Link href="/contact">
                  Discuss Your Needs
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="px-8 py-3 text-base">
                <Link href="/products">
                  View Our Products
                </Link>
              </Button>
            </div>
          </div>
        </RandomAnimatedDiv>
      </div>
    </section>
  )
}