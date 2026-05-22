import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PageLayout from '../components/layout/PageLayout'
import { messagesAPI } from '../utils/api'
import { Phone, MapPin, Mail, Clock, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await messagesAPI.create(data)
      setSubmitted(true)
      reset()
      toast.success('Message sent successfully!')
    } catch {
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <PageLayout>
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Reach out for quotes, questions, or anything else. We're happy to help.</p>
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
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: 'Phone', content: '1(440) 554-2773', sub: 'Mon–Sat: 8am – 6pm', href: 'tel:14405542773' },
                { icon: Mail, title: 'Email', content: 'info@hummelkllc.com', sub: 'Response within 24 hours', href: 'mailto:info@hummelkllc.com' },
                { icon: MapPin, title: 'Address', content: '4709 Center Rd', sub: 'Brunswick, OH 44212' },
                { icon: Clock, title: 'Hours', content: 'Mon – Sat', sub: '8:00 AM – 6:00 PM' },
              ].map(({ icon: Icon, title, content, sub, href }) => (
                <div key={title} className="card p-5 border border-gray-100 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky to-navy flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{title}</div>
                    {href ? (
                      <a href={href} className="font-semibold text-navy hover:text-sky transition-colors text-sm">{content}</a>
                    ) : (
                      <div className="font-semibold text-navy text-sm">{content}</div>
                    )}
                    <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card p-12 text-center border border-green/20 bg-green/5">
                  <CheckCircle2 size={48} className="text-green mx-auto mb-4" />
                  <h3 className="font-display font-bold text-navy text-2xl mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">We'll get back to you within 24 hours. Thank you!</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary mx-auto">Send Another Message</button>
                </div>
              ) : (
                <div className="card p-8 border border-gray-100">
                  <h2 className="font-display font-bold text-navy text-2xl mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                        <input {...register('full_name', { required: 'Required' })} className="input-field" placeholder="Jane Smith" />
                        {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className="input-field" placeholder="jane@email.com" type="email" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                        <input {...register('phone')} className="input-field" placeholder="(440) 000-0000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                        <input {...register('subject', { required: 'Required' })} className="input-field" placeholder="How can we help?" />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <textarea {...register('message', { required: 'Please enter your message' })} className="input-field resize-none" rows={5} placeholder="Tell us about your cleaning needs..." />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center text-base py-4">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
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
