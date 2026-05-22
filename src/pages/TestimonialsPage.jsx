import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PageLayout from '../components/layout/PageLayout'
import { testimonialsAPI } from '../utils/api'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

const FALLBACK = [
  { id: 1, client_name: 'Sarah M.', location: 'Brunswick, OH', rating: 5, review: 'Hummelk LLC transformed my home! The team was professional, thorough, and incredibly detail-oriented. I\'ve been using them every two weeks and couldn\'t be happier.', service_type: 'Residential Cleaning' },
  { id: 2, client_name: 'James T.', location: 'Medina, OH', rating: 5, review: 'We hired Hummelk for our office building and the results exceeded expectations. Punctual, reliable, and top-quality products. Our workspace has never looked better!', service_type: 'Commercial Cleaning' },
  { id: 3, client_name: 'Linda K.', location: 'Strongsville, OH', rating: 5, review: 'I needed a deep clean before listing my home for sale. The Hummelk team did a phenomenal job — floors, baseboards, appliances, everything was perfect.', service_type: 'Deep Cleaning' },
  { id: 4, client_name: 'Robert H.', location: 'Akron, OH', rating: 5, review: 'Moving is stressful enough without worrying about cleaning. Hummelk LLC handled our move-out flawlessly. We got our full deposit back!', service_type: 'Move In/Move Out' },
  { id: 5, client_name: 'Michelle P.', location: 'Brunswick, OH', rating: 5, review: 'I\'ve tried several cleaning services and none compare to Hummelk. They are consistent, trustworthy, and genuinely care about the quality of their work.', service_type: 'Recurring Maintenance' },
  { id: 6, client_name: 'David W.', location: 'Medina, OH', rating: 5, review: 'Post-construction cleanup was flawless. They removed all the dust and debris and the house looked brand new. Very impressed with the professionalism.', service_type: 'Post-Construction' },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(FALLBACK)
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  useEffect(() => {
    testimonialsAPI.getAll({ status: 'published' })
      .then(({ data }) => { if (data.length > 0) setTestimonials(data) })
      .catch(() => {})
  }, [])

  const onSubmit = async (data) => {
    try {
      await testimonialsAPI.create(data)
      setSubmitted(true)
      reset()
      toast.success('Review submitted! It will appear after review.')
    } catch {
      toast.error('Failed to submit. Please try again.')
    }
  }

  return (
    <PageLayout>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Client Testimonials</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Hear from hundreds of satisfied clients across Brunswick and surrounding communities.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L1440 60L1440 15C1200 55 960 65 720 45C480 25 240 5 0 30L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[['500+', 'Happy Clients'], ['100%', 'Satisfaction Rate'], ['5.0', 'Average Rating']].map(([n, l]) => (
              <div key={l} className="card p-6 text-center border border-gray-100">
                <div className="text-3xl font-display font-bold text-navy mb-1">{n}</div>
                <div className="text-gray-500 text-sm">{l}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {testimonials.map((t) => (
              <div key={t.id} className="card p-7 border border-gray-100 hover:border-sky/30 group transition-all duration-300 relative">
                <Quote size={36} className="text-sky/15 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-display font-bold text-navy text-sm">{t.client_name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.location}</div>
                  {t.service_type && <span className="inline-block mt-2 text-xs bg-sky/10 text-sky px-2 py-0.5 rounded-full">{t.service_type}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Submit review */}
          <div className="max-w-2xl mx-auto">
            <div className="card p-8 border border-gray-100">
              <h2 className="font-display font-bold text-navy text-2xl mb-2 text-center">Share Your Experience</h2>
              <p className="text-gray-500 text-sm text-center mb-6">Had a great cleaning? We'd love to hear about it.</p>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="text-green mx-auto mb-3" />
                  <h3 className="font-bold text-navy text-lg mb-2">Thank you for your review!</h3>
                  <p className="text-gray-500 text-sm">It will appear on this page after approval.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                      <input {...register('client_name', { required: true })} className="input-field" placeholder="Jane Smith" />
                      {errors.client_name && <p className="text-red-500 text-xs mt-1">Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                      <input {...register('location')} className="input-field" placeholder="City, OH" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Used</label>
                      <select {...register('service_type')} className="input-field">
                        <option value="">Select service...</option>
                        {['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Move In/Move Out', 'Post-Construction', 'Recurring Maintenance'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating *</label>
                      <select {...register('rating', { required: true, valueAsNumber: true })} className="input-field">
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{'⭐'.repeat(r)} ({r} stars)</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Review *</label>
                    <textarea {...register('review', { required: 'Please share your experience' })} className="input-field resize-none" rows={4} placeholder="Tell us about your experience..." />
                    {errors.review && <p className="text-red-500 text-xs mt-1">{errors.review.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
