import { Link } from 'react-router-dom'
import { Home, Building2, Sparkles, Truck, HardHat, CalendarDays, ArrowRight } from 'lucide-react'

const SERVICES = [
  { icon: Home, title: 'Residential Cleaning', desc: 'Thorough home cleaning tailored to your needs — bedrooms, bathrooms, kitchen, and living spaces.', color: 'bg-sky/10 text-sky', from: '$80' },
  { icon: Building2, title: 'Commercial Cleaning', desc: 'Keep your office or business spotless and professional with our reliable commercial cleaning.', color: 'bg-navy/10 text-navy', from: '$150' },
  { icon: Sparkles, title: 'Deep Cleaning', desc: 'A detailed, top-to-bottom clean targeting every corner, surface, and hard-to-reach spot.', color: 'bg-green/10 text-green', from: '$200' },
  { icon: Truck, title: 'Move In / Move Out', desc: 'Stress-free transitions with comprehensive cleaning for your old place or your new home.', color: 'bg-sky/10 text-sky', from: '$180' },
  { icon: HardHat, title: 'Post-Construction', desc: 'Remove dust, debris, and construction residue to restore your space after renovation.', color: 'bg-yellow-500/10 text-yellow-600', from: '$250' },
  { icon: CalendarDays, title: 'Recurring Maintenance', desc: 'Weekly, bi-weekly, or monthly plans so your home or office stays consistently clean.', color: 'bg-green/10 text-green', from: '$70' },
]

export default function ServicesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="badge bg-sky/10 text-sky font-semibold mb-3">What We Offer</span>
          <h2 className="section-title">Cleaning Services Tailored to You</h2>
          <p className="section-subtitle mx-auto mt-4">
            From weekly maintenance to one-time deep cleans, Hummelk LLC has you covered with professional, reliable service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map(({ icon: Icon, title, desc, color, from }) => (
            <div key={title} className="card p-7 group cursor-pointer border border-gray-100 hover:border-sky/30 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={26} />
              </div>
              <h3 className="font-display font-bold text-navy text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Starting from <span className="text-navy font-bold text-base">{from}</span></span>
                <Link to="/booking" className="w-9 h-9 rounded-xl bg-navy/5 hover:bg-navy hover:text-white text-navy flex items-center justify-center transition-all duration-200 group-hover:bg-sky group-hover:text-white">
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-secondary inline-flex">
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
