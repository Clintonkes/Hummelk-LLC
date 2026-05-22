import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-sky rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">Hummelk LLC</div>
                <div className="text-xs text-sky-300 leading-tight">Professional Cleaning</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Serving Brunswick, OH and surrounding communities with premium cleaning services since day one. Trusted, insured, and dedicated to your satisfaction.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-sky flex items-center justify-center transition-colors duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/booking', 'Book a Clean'], ['/testimonials', 'Testimonials'], ['/faq', 'FAQ'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-300 hover:text-sky transition-colors duration-200 text-sm flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-sky rounded-full inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Our Services</h4>
            <ul className="space-y-3">
              {['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Move In/Move Out', 'Post-Construction', 'Recurring Maintenance'].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-gray-300 hover:text-sky transition-colors duration-200 text-sm flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-green rounded-full inline-block" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-sky mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                  <a href="tel:14405542773" className="text-white hover:text-sky transition-colors font-medium text-sm">
                    1(440) 554-2773
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-sky mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Address</div>
                  <span className="text-gray-300 text-sm">4709 Center Rd<br />Brunswick, OH 44212</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-sky mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Email</div>
                  <a href="mailto:info@hummelkllc.com" className="text-gray-300 hover:text-sky transition-colors text-sm">
                    info@hummelkllc.com
                  </a>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-300 text-xs">5-star rated local cleaning service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Hummelk LLC. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-sky transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
