import { Link } from 'react-router-dom'
import { Phone, CalendarCheck } from 'lucide-react'

export default function CTAStrip() {
  return (
    <section className="py-20 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-green rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display font-bold text-white text-3xl sm:text-4xl mb-4">
          Ready for a Spotless Space?
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
          Get a free quote today. No commitment needed — just a cleaner, healthier environment waiting for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/booking" className="btn-green text-base px-8 py-4">
            <CalendarCheck size={20} />
            Book a Free Quote
          </Link>
          <a href="tel:14405542773" className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-all duration-200 text-base justify-center">
            <Phone size={20} className="text-sky-300" />
            Call 1(440) 554-2773
          </a>
        </div>
      </div>
    </section>
  )
}
