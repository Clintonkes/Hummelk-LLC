import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const FAQS = [
  { q: 'What areas do you serve?', a: 'We primarily serve Brunswick, OH and surrounding areas including Medina, Strongsville, Akron, and other nearby communities. Contact us to confirm service in your area.' },
  { q: 'Are you insured and bonded?', a: 'Yes, Hummelk LLC is fully insured and bonded. Our team members are background-checked and professionally trained for your peace of mind.' },
  { q: 'How do I book a cleaning?', a: 'You can book online through our booking form, call us at 1(440) 554-2773, or send us a message through our contact page. We\'ll confirm your appointment promptly.' },
  { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Many clients prefer to be away. We just need access to your home. We\'ll lock up securely when done and send you a completion notification.' },
  { q: 'What products do you use?', a: 'We use professional-grade, eco-friendly cleaning products that are safe for your family, children, and pets. We can also accommodate specific product preferences upon request.' },
  { q: 'Do you offer recurring cleaning discounts?', a: 'Yes! Clients on weekly, bi-weekly, or monthly recurring plans receive discounted rates. Ask us about our loyalty pricing when you book.' },
  { q: 'What is your cancellation policy?', a: 'We ask for at least 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee. We\'ll always work with you to find a solution.' },
  { q: 'Is my satisfaction guaranteed?', a: 'Absolutely. If you\'re not completely satisfied, let us know within 24 hours and we\'ll return to address any missed areas — at no additional charge.' },
]

export default function FAQSection({ limit }) {
  const [open, setOpen] = useState(null)
  const items = limit ? FAQS.slice(0, limit) : FAQS

  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className={clsx('border rounded-2xl overflow-hidden transition-all duration-200', open === i ? 'border-sky/40 shadow-card' : 'border-gray-200 hover:border-gray-300')}>
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className={clsx('font-display font-semibold text-sm sm:text-base', open === i ? 'text-navy' : 'text-gray-800')}>{faq.q}</span>
            <ChevronDown size={18} className={clsx('shrink-0 text-gray-400 transition-transform duration-200 ml-4', open === i && 'rotate-180 text-sky')} />
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed animate-fade-in">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
