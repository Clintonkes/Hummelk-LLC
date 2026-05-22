import PageLayout from '../components/layout/PageLayout'
import Hero from '../components/sections/Hero'
import ServicesSection from '../components/sections/ServicesSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTAStrip from '../components/sections/CTAStrip'
import FAQSection from '../components/sections/FAQSection'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <TestimonialsSection />

      {/* FAQ preview */}
      <section className="py-24 bg-gray-50/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="badge bg-navy/10 text-navy font-semibold mb-3">FAQ</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <FAQSection limit={4} />
          <div className="text-center mt-8">
            <Link to="/faq" className="btn-secondary inline-flex">See All FAQs</Link>
          </div>
        </div>
      </section>

      <CTAStrip />
    </PageLayout>
  )
}
