import { Shield, Clock, ThumbsUp, Users, Leaf, BadgeCheck } from 'lucide-react'

const REASONS = [
  { icon: Shield, title: 'Fully Insured', desc: 'Our entire team is bonded and insured, giving you complete peace of mind.', color: 'from-sky to-navy' },
  { icon: BadgeCheck, title: 'Vetted Professionals', desc: 'Every cleaner passes background checks and thorough training before entering your home.', color: 'from-green to-sky' },
  { icon: ThumbsUp, title: '100% Satisfaction', desc: "Not happy? We'll come back and make it right — at no extra charge.", color: 'from-navy to-sky' },
  { icon: Clock, title: 'Punctual & Reliable', desc: 'We show up on time, every time. Your schedule is our priority.', color: 'from-sky to-green' },
  { icon: Leaf, title: 'Eco-Friendly Products', desc: 'We use safe, environmentally responsible cleaning products for your family and pets.', color: 'from-green to-navy' },
  { icon: Users, title: 'Local & Trusted', desc: "We're a local Brunswick business deeply invested in our community's satisfaction.", color: 'from-navy to-green' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <span className="badge bg-navy/10 text-navy font-semibold mb-3">Why Hummelk LLC</span>
            <h2 className="section-title mb-5">The Trusted Choice for Premium Cleaning</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We're not just a cleaning service — we're your partner in maintaining a beautiful, healthy space. Our team brings professionalism, care, and consistency to every job.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {REASONS.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="card p-5 border border-gray-100 hover:border-sky/30 transition-all duration-300 group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-sm mb-1.5">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-56 shadow-card">
                  <img src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80&auto=format&fit=crop" alt="Cleaning" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-40 shadow-card">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&auto=format&fit=crop" alt="Cleaning supplies" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-40 shadow-card">
                  <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&q=80&auto=format&fit=crop" alt="Clean home" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden h-56 shadow-card">
                  <img src="https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80&auto=format&fit=crop" alt="Team cleaning" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-5 text-center min-w-[140px]">
              <div className="text-3xl font-display font-bold text-navy">8+</div>
              <div className="text-gray-500 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
