import PageLayout from '../components/layout/PageLayout'
import { Link } from 'react-router-dom'
import { Home, Building2, Sparkles, Truck, HardHat, CalendarDays, CheckCircle2, ArrowRight } from 'lucide-react'
import CTAStrip from '../components/sections/CTAStrip'

const SERVICES = [
  {
    icon: Home, title: 'Residential Cleaning', from: '$80',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop',
    desc: 'Your home is your sanctuary. Our residential cleaning service ensures every room is spotless, fresh, and welcoming. We clean kitchens, bathrooms, bedrooms, living areas, and more.',
    includes: ['All rooms vacuumed and mopped', 'Kitchen surfaces & appliance exteriors', 'Bathroom deep scrub', 'Dusting all surfaces', 'Trash removal', 'Window sills & baseboards'],
  },
  {
    icon: Building2, title: 'Commercial Cleaning', from: '$150',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop',
    desc: 'A clean workplace boosts morale and impresses clients. We handle offices, retail spaces, and commercial properties with professional-grade cleaning on your schedule.',
    includes: ['Office & common areas', 'Restroom sanitation', 'Kitchen & breakroom', 'Reception and lobby', 'Floor care', 'Waste management'],
  },
  {
    icon: Sparkles, title: 'Deep Cleaning', from: '$200',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop',
    desc: 'A comprehensive, top-to-bottom clean targeting areas often missed in routine cleaning. Perfect for first-time clients, spring cleaning, or preparing your home for special occasions.',
    includes: ['Inside oven & refrigerator', 'Behind & under furniture', 'Inside cabinets & drawers', 'Baseboards & ceiling fans', 'Window interiors', 'Grout & tile scrubbing'],
  },
  {
    icon: Truck, title: 'Move In / Move Out', from: '$180',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
    desc: 'Moving is stressful. We make the cleaning part effortless. Our move cleaning service ensures your old home is spotless for the next residents and your new home is ready for you.',
    includes: ['Full property clean', 'Inside all appliances', 'Closet & cabinet interiors', 'Wall spot cleaning', 'Window cleaning', 'Final walkthrough'],
  },
  {
    icon: HardHat, title: 'Post-Construction', from: '$250',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80&auto=format&fit=crop',
    desc: 'Construction leaves behind dust, debris, and residue everywhere. Our specialized post-construction cleaning restores your renovated space to a clean, livable condition.',
    includes: ['Construction dust removal', 'Debris and waste cleanup', 'Window & glass cleaning', 'Surface wiping & polishing', 'Floor buffing', 'Final detail pass'],
  },
  {
    icon: CalendarDays, title: 'Recurring Maintenance', from: '$70',
    img: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80&auto=format&fit=crop',
    desc: 'Maintain a consistently clean environment with scheduled recurring visits. Choose from weekly, bi-weekly, or monthly plans and enjoy discounted rates as a loyal client.',
    includes: ['Flexible scheduling', 'Weekly, bi-weekly, monthly', 'Loyalty discounts', 'Same trusted cleaner', 'Priority booking', 'Customized checklist'],
  },
]

export default function ServicesPage() {
  return (
    <PageLayout>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Our Services</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive cleaning solutions for every need — residential, commercial, and everything in between.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L1440 60L1440 15C1200 55 960 65 720 45C480 25 240 5 0 30L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {SERVICES.map(({ icon: Icon, title, from, img, desc, includes }, idx) => (
            <div key={title} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="rounded-3xl overflow-hidden shadow-card-hover h-80">
                  <img src={img} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky to-navy flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-navy text-2xl">{title}</h2>
                    <span className="text-sm text-gray-400">Starting from <span className="text-green font-bold">{from}</span></span>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>
                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-green shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/booking" className="btn-primary">
                  Book This Service <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTAStrip />
    </PageLayout>
  )
}
