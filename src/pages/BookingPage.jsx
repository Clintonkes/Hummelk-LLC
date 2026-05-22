import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PageLayout from '../components/layout/PageLayout'
import { bookingsAPI } from '../utils/api'
import { CheckCircle2, CalendarCheck, Clock, User, Mail, Phone, MapPin, ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'

const SERVICES = ['Residential Cleaning', 'Commercial Cleaning', 'Deep Cleaning', 'Move In / Move Out', 'Post-Construction', 'Recurring Maintenance']
const TIMES = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await bookingsAPI.create(data)
      setSubmitted(true)
      reset()
      toast.success('Booking submitted successfully!')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to submit booking. Please try again.')
    }
  }

  return (
    <PageLayout>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Book a Cleaning</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Fill out the form below to request a quote or schedule your cleaning service. We'll confirm within 24 hours.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pb-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full">
            <path d="M0 60L1440 60L1440 15C1200 55 960 65 720 45C480 25 240 5 0 30L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Info sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card p-6 border border-gray-100">
                <h3 className="font-display font-bold text-navy mb-4">Why Book With Us</h3>
                {[['Free quotes with no obligation', CheckCircle2], ['Flexible scheduling', Clock], ['Vetted, insured cleaners', User], ['100% satisfaction guarantee', CheckCircle2]].map(([text, Icon]) => (
                  <div key={text} className="flex items-start gap-3 mb-3">
                    <Icon size={16} className="text-green mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <div className="card p-6 border border-sky/20 bg-sky/5">
                <h3 className="font-display font-bold text-navy mb-3 text-sm">Prefer to Call?</h3>
                <a href="tel:14405542773" className="flex items-center gap-2 text-navy font-bold hover:text-sky transition-colors">
                  <Phone size={18} className="text-sky" />
                  1(440) 554-2773
                </a>
                <p className="text-gray-400 text-xs mt-2">Mon–Sat: 8am – 6pm</p>
              </div>
              <div className="card p-6 border border-gray-100">
                <h3 className="font-display font-bold text-navy mb-3 text-sm">Our Address</h3>
                <div className="flex items-start gap-2 text-gray-500 text-sm">
                  <MapPin size={16} className="text-sky mt-0.5 shrink-0" />
                  4709 Center Rd<br />Brunswick, OH 44212
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card p-12 text-center border border-green/20 bg-green/5">
                  <div className="w-20 h-20 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={40} className="text-green" />
                  </div>
                  <h3 className="font-display font-bold text-navy text-2xl mb-3">Booking Submitted!</h3>
                  <p className="text-gray-500 mb-6">Thank you! We've received your request and will confirm your appointment within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary mx-auto">
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div className="card p-8 border border-gray-100">
                  <h2 className="font-display font-bold text-navy text-2xl mb-6 flex items-center gap-2">
                    <CalendarCheck size={24} className="text-sky" />
                    Request a Quote
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input {...register('full_name', { required: 'Full name is required' })} className="input-field" placeholder="Jane Smith" />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                        <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="input-field" placeholder="jane@email.com" type="email" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                        <input {...register('phone', { required: 'Phone is required' })} className="input-field" placeholder="(440) 000-0000" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Type *</label>
                        <select {...register('service_type', { required: 'Select a service' })} className="input-field">
                          <option value="">Select a service...</option>
                          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service_type && <p className="text-red-500 text-xs mt-1">{errors.service_type.message}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date *</label>
                        <input {...register('preferred_date', { required: 'Date is required' })} className="input-field" type="date" min={new Date().toISOString().split('T')[0]} />
                        {errors.preferred_date && <p className="text-red-500 text-xs mt-1">{errors.preferred_date.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time *</label>
                        <select {...register('preferred_time', { required: 'Select a time' })} className="input-field">
                          <option value="">Select a time...</option>
                          {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        {errors.preferred_time && <p className="text-red-500 text-xs mt-1">{errors.preferred_time.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Address *</label>
                      <input {...register('address', { required: 'Address is required' })} className="input-field" placeholder="123 Main St, Brunswick, OH 44212" />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes / Special Instructions</label>
                      <textarea {...register('notes')} className="input-field resize-none" rows={4} placeholder="Any special requirements, access instructions, pet information, etc." />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-green w-full justify-center text-base py-4">
                      {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                    </button>
                    <p className="text-gray-400 text-xs text-center">We'll confirm your appointment within 24 hours by phone or email.</p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
