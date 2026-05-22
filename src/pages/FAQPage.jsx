import PageLayout from '../components/layout/PageLayout'
import FAQSection from '../components/sections/FAQSection'
import CTAStrip from '../components/sections/CTAStrip'

export default function FAQPage() {
  return (
    <PageLayout>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Everything you need to know about our cleaning services.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L1440 60L1440 15C1200 55 960 65 720 45C480 25 240 5 0 30L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FAQSection />
        </div>
      </section>
      <CTAStrip />
    </PageLayout>
  )
}
