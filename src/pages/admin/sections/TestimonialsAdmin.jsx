import { useState, useEffect } from 'react'
import { testimonialsAPI } from '../../../utils/api'
import { Star, Trash2, CheckCircle2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const STATUS_COLORS = { pending: 'bg-yellow-100 text-yellow-700', published: 'bg-green/10 text-green', rejected: 'bg-red-100 text-red-600' }

export default function TestimonialsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const load = () => {
    setLoading(true)
    const skip = (page - 1) * limit
    const params = { skip, limit }
    if (filter) params.status = filter
    
    testimonialsAPI.getAll(params)
      .then(({ data }) => {
        setItems(data.items)
        setTotal(data.total)
      })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter, page])

  const update = async (id, data) => {
    try { await testimonialsAPI.update(id, data); load(); toast.success('Updated') } catch { toast.error('Failed') }
  }

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try { await testimonialsAPI.delete(id); load(); toast.success('Deleted') } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-navy text-2xl">Testimonials</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field w-40 py-2">
          <option value="">All</option>
          {['pending', 'published', 'rejected'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="card p-12 text-center border border-gray-100"><div className="animate-spin w-8 h-8 border-2 border-sky border-t-transparent rounded-full mx-auto" /></div>
      ) : items.length === 0 ? (
        <div className="card p-12 text-center border border-gray-100"><Star size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-gray-400">No testimonials</p></div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(t => (
              <div key={t.id} className="card p-5 border border-gray-100 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-navy text-sm">{t.client_name}</div>
                    <div className="text-xs text-gray-400">{t.location}</div>
                  </div>
                  <span className={clsx('badge text-xs', STATUS_COLORS[t.status])}>{t.status}</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 italic">"{t.review}"</p>
                {t.service_type && <span className="text-xs bg-sky/10 text-sky px-2 py-0.5 rounded-full mb-4 self-start">{t.service_type}</span>}
                <div className="flex gap-2 flex-wrap pt-3 border-t border-gray-100">
                  {t.status !== 'published' && (
                    <button onClick={() => update(t.id, { status: 'published' })} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-green/10 text-green hover:bg-green hover:text-white rounded-lg transition-colors font-medium">
                      <CheckCircle2 size={12} /> Publish
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button onClick={() => update(t.id, { status: 'rejected' })} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-red-50 text-red-400 hover:bg-red-400 hover:text-white rounded-lg transition-colors font-medium">
                      <X size={12} /> Reject
                    </button>
                  )}
                  <button onClick={() => update(t.id, { is_featured: !t.is_featured })} className={clsx('flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium', t.is_featured ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-yellow-100 hover:text-yellow-700')}>
                    <Star size={12} /> {t.is_featured ? 'Featured' : 'Feature'}
                  </button>
                  <button onClick={() => remove(t.id)} className="ml-auto p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {total > limit && (
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50 mt-4 rounded-xl">
              <div className="text-sm text-gray-500">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} results
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={page * limit >= total}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
