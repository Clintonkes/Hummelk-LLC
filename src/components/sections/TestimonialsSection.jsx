import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonialsAPI } from '../../utils/api'

const FALLBACK = [
  { id: 1, client_name: 'Sarah M.', location: 'Brunswick, OH', rating: 5, review: 'Hummelk LLC transformed my home! The team was professional, thorough, and incredibly detail-oriented. I\'ve been using them every two weeks and couldn\'t be happier.', service_type: 'Residential Cleaning' },
  { id: 2, client_name: 'James T.', location: 'Medina, OH', rating: 5, review: 'We hired Hummelk for our office building and the results exceeded expectations. Punctual, reliable, and top-quality products. Our workspace has never looked better!', service_type: 'Commercial Cleaning' },
  { id: 3, client_name: 'Linda K.', location: 'Strongsville, OH', rating: 5, review: 'I needed a deep clean before listing my home for sale. The Hummelk team did a phenomenal job — floors, baseboards, appliances, everything was perfect.', service_type: 'Deep Cleaning' },
  { id: 4, client_name: 'Robert H.', location: 'Akron, OH', rating: 5, review: 'Moving is stressful enough without worrying about cleaning. Hummelk LLC handled our move-out flawlessly. We got our full deposit back thanks to their thorough work!', service_type: 'Move In/Move Out' },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(FALLBACK)

  useEffect(() => {
    testimonialsAPI.getAll({ status: 'published' })
      .then(({ data }) => { if (data.length > 0) setTestimonials(data) })
      .catch(() => {})
  }, [])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="badge bg-green/10 text-green font-semibold mb-3">Client Reviews</span>
          <h2 className="section-title">What Our Clients Are Saying</h2>
          <p className="section-subtitle mx-auto mt-4">
            Don't just take our word for it — hear from our satisfied customers across Brunswick and beyond.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((t) => (
            <div key={t.id} className="card p-6 border border-gray-100 hover:border-sky/30 group transition-all duration-300 relative">
              <Quote size={32} className="text-sky/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
              <div className="border-t border-gray-100 pt-4">
                <div className="font-display font-bold text-navy text-sm">{t.client_name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{t.location}</div>
                {t.service_type && (
                  <span className="inline-block mt-2 text-xs bg-sky/10 text-sky px-2 py-0.5 rounded-full font-medium">{t.service_type}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          {[['500+', 'Clients Served'], ['100%', 'Satisfaction Rate'], ['5★', 'Average Rating']].map(([num, label]) => (
            <div key={label} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-3xl font-display font-bold text-navy mb-1">{num}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
