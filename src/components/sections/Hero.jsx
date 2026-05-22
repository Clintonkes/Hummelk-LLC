import { Link } from 'react-router-dom'
import { Phone, Star, Shield, Award, Clock, ChevronRight } from 'lucide-react'

const BADGES = [
  { icon: Shield, label: 'Fully Insured', color: 'text-sky' },
  { icon: Award, label: 'Certified Pro', color: 'text-green' },
  { icon: Star, label: '5-Star Rated', color: 'text-yellow-400' },
  { icon: Clock, label: 'Same-Day Available', color: 'text-sky' },
]

export default function Hero() {
  return (
    <section className="hero-gradient min-h-[92vh] flex items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-sky rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-green rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl opacity-5" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-sky-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              Brunswick, OH's #1 Cleaning Service
            </div>

            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              Professional Cleaning{' '}
              <span className="text-sky-300">You Can</span>{' '}
              <span className="text-green-400">Trust</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Hummelk LLC delivers spotless results for homes and businesses across Brunswick and surrounding Ohio communities. Fully insured, detail-focused, and satisfaction guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/booking" className="btn-green text-base px-8 py-4 shadow-lg">
                Book a Free Quote
                <ChevronRight size={18} />
              </Link>
              <a href="tel:14405542773" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 text-base">
                <Phone size={18} className="text-sky-300" />
                1(440) 554-2773
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-3 py-2.5">
                  <Icon size={16} className={color} />
                  <span className="text-white text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image card */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80&auto=format&fit=crop"
                  alt="Professional cleaning service"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 w-52">
                <div className="text-3xl font-display font-bold text-navy mb-1">500+</div>
                <div className="text-gray-500 text-sm">Happy Clients Served</div>
                <div className="flex gap-0.5 mt-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green text-white rounded-2xl shadow-xl p-4 w-40 text-center">
                <div className="text-2xl font-display font-bold mb-0.5">100%</div>
                <div className="text-sm text-green-100">Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
          <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 10 0 40L0 80Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
