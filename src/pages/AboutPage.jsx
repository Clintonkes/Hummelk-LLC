import PageLayout from '../components/layout/PageLayout'
import { Link } from 'react-router-dom'
import { Shield, Star, Users, Heart, Award, CheckCircle2 } from 'lucide-react'
import CTAStrip from '../components/sections/CTAStrip'

const VALUES = [
  { icon: Shield, title: 'Integrity', desc: 'We do what we say, every time. Honest pricing, honest work.' },
  { icon: Heart, title: 'Care', desc: 'We treat your home or business like our own.' },
  { icon: Star, title: 'Excellence', desc: 'No shortcuts. Every job deserves our full attention and effort.' },
  { icon: Users, title: 'Community', desc: 'Local-first. We\'re proud to serve Brunswick and surrounding areas.' },
]

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page header */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">About Hummelk LLC</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A locally owned cleaning company dedicated to delivering premium results and building lasting trust with every client.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L1440 60L1440 15C1200 55 960 65 720 45C480 25 240 5 0 30L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="badge bg-sky/10 text-sky font-semibold mb-4">Our Story</span>
              <h2 className="section-title mb-6">Built on Trust, Polished by Experience</h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                Hummelk LLC was founded with a simple belief: every home and business deserves a truly clean space, maintained with care, skill, and integrity. Based in Brunswick, OH, we've grown into one of the area's most trusted cleaning services.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                Our team of vetted, background-checked professionals brings a personal touch to every job. We take pride in consistency — you get the same high standard of service every visit, whether it's your first deep clean or your weekly maintenance appointment.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                We use eco-friendly, professional-grade products that are safe for your family, kids, and pets — delivering a spotless result without compromising your health or the environment.
              </p>

              <div className="space-y-3">
                {['Fully insured and bonded', 'Background-checked professionals', 'Eco-friendly cleaning products', '100% satisfaction guarantee', 'Flexible scheduling, including weekends'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-card-hover h-[480px]">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format&fit=crop" alt="Our team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 w-52 text-center">
                <div className="text-4xl font-display font-bold text-navy mb-1">8+</div>
                <div className="text-gray-500 text-sm">Years of Trusted Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge bg-navy/10 text-navy font-semibold mb-3">Our Values</span>
            <h2 className="section-title">What Drives Us Every Day</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-7 text-center border border-gray-100 hover:border-sky/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky to-navy flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-navy mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip />
    </PageLayout>
  )
}
