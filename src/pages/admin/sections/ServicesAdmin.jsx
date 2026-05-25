import { useState, useEffect } from 'react'
import { servicesAPI } from '../../../utils/api'
import { Briefcase, Trash2, Edit2, ToggleLeft, ToggleRight, Plus, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'

function ServiceForm({ service, onClose, onSave }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: service || { name: '', description: '', short_description: '', price_from: '', icon: '', is_active: true, is_featured: false, order: 0 }
  })

  const onSubmit = async (data) => {
    try {
      if (service) await servicesAPI.update(service.id, { ...data, price_from: parseFloat(data.price_from) || null })
      else await servicesAPI.create({ ...data, price_from: parseFloat(data.price_from) || null })
      toast.success(service ? 'Service updated' : 'Service created')
      onSave()
    } catch { toast.error('Failed to save') }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-display font-bold text-navy">{service ? 'Edit Service' : 'Add Service'}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Service Name *</label><input {...register('name', { required: true })} className="input-field" placeholder="e.g. Residential Cleaning" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Short Description</label><input {...register('short_description')} className="input-field" placeholder="One-line description" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Full Description *</label><textarea {...register('description', { required: true })} className="input-field resize-none" rows={3} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Starting Price ($)</label><input {...register('price_from')} className="input-field" type="number" min="0" step="0.01" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Sort Order</label><input {...register('order', { valueAsNumber: true })} className="input-field" type="number" min="0" /></div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('is_active')} className="rounded" /><span className="text-sm text-gray-700">Active</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('is_featured')} className="rounded" /><span className="text-sm text-gray-700">Featured</span></label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 btn-primary justify-center text-sm py-2.5">{isSubmitting ? 'Saving...' : 'Save Service'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ServicesAdmin() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [adding, setAdding] = useState(false)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 10

  const load = () => {
    setLoading(true)
    const skip = (page - 1) * limit
    servicesAPI.getAllAdmin({ skip, limit })
      .then(({ data }) => {
        setServices(data.items)
        setTotal(data.total)
      })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [page])

  const remove = async (id) => {
    if (!confirm('Delete this service?')) return
    try { await servicesAPI.delete(id); load(); toast.success('Deleted') } catch { toast.error('Failed') }
  }

  const toggle = async (s) => {
    try { await servicesAPI.update(s.id, { is_active: !s.is_active }); load() } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-navy text-2xl">Services</h1>
        <button onClick={() => setAdding(true)} className="btn-primary text-sm px-4 py-2.5"><Plus size={16} /> Add Service</button>
      </div>
      {loading ? (
        <div className="card p-12 text-center border border-gray-100"><div className="animate-spin w-8 h-8 border-2 border-sky border-t-transparent rounded-full mx-auto" /></div>
      ) : (
        <div className="card border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Service', 'Price From', 'Status', 'Featured', 'Actions'].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-navy">{s.name}</div>
                    <div className="text-xs text-gray-400 truncate max-w-xs">{s.short_description}</div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-green">{s.price_from ? `$${s.price_from}` : '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`badge text-xs font-semibold ${s.is_active ? 'bg-green/10 text-green' : 'bg-gray-100 text-gray-500'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge text-xs ${s.is_featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>{s.is_featured ? 'Yes' : 'No'}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-sky/10 text-sky transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => toggle(s)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">{s.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}</button>
                      <button onClick={() => remove(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {total > limit && (
            <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
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
        </div>
      )}
      {(adding || editing) && <ServiceForm service={editing} onClose={() => { setAdding(false); setEditing(null) }} onSave={() => { setAdding(false); setEditing(null); load() }} />}
    </div>
  )
}
