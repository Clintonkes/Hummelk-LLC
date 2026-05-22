import { useState, useEffect } from 'react'
import { bookingsAPI } from '../../../utils/api'
import { CalendarCheck, Trash2, CheckCircle2, Clock, X, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-sky/10 text-sky',
  completed: 'bg-green/10 text-green',
  cancelled: 'bg-red-100 text-red-600',
}

function BookingModal({ booking, onClose, onUpdate }) {
  const [status, setStatus] = useState(booking.status)
  const [notes, setNotes] = useState(booking.admin_notes || '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    try {
      await bookingsAPI.update(booking.id, { status, admin_notes: notes })
      toast.success('Booking updated')
      onUpdate()
      onClose()
    } catch { toast.error('Update failed') } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-display font-bold text-navy">Booking #{booking.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[['Name', booking.full_name], ['Email', booking.email], ['Phone', booking.phone], ['Service', booking.service_type], ['Date', booking.preferred_date], ['Time', booking.preferred_time]].map(([l, v]) => (
              <div key={l}>
                <div className="text-xs text-gray-400 mb-0.5">{l}</div>
                <div className="font-medium text-navy">{v}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Address</div>
            <div className="text-sm text-gray-700">{booking.address}</div>
          </div>
          {booking.notes && <div><div className="text-xs text-gray-400 mb-0.5">Client Notes</div><div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{booking.notes}</div></div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="input-field">
              {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Admin Notes</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} className="input-field resize-none" rows={3} placeholder="Internal notes..." />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 text-sm font-medium">Cancel</button>
          <button onClick={save} disabled={saving} className="flex-1 btn-primary justify-center text-sm py-2.5">{saving ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </div>
    </div>
  )
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const load = () => {
    setLoading(true)
    bookingsAPI.getAll(filter ? { status: filter } : {})
      .then(({ data }) => setBookings(data))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const remove = async (id) => {
    if (!confirm('Delete this booking?')) return
    try { await bookingsAPI.delete(id); load(); toast.success('Deleted') } catch { toast.error('Failed') }
  }

  const quickStatus = async (id, status) => {
    try { await bookingsAPI.update(id, { status }); load(); toast.success(`Marked as ${status}`) } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-navy text-2xl">Bookings</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field w-40 py-2">
          <option value="">All Status</option>
          {['pending', 'confirmed', 'completed', 'cancelled'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="card p-12 text-center border border-gray-100"><div className="animate-spin w-8 h-8 border-2 border-sky border-t-transparent rounded-full mx-auto" /></div>
      ) : bookings.length === 0 ? (
        <div className="card p-12 text-center border border-gray-100">
          <CalendarCheck size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No bookings found</p>
        </div>
      ) : (
        <div className="card border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>{['Client', 'Service', 'Date & Time', 'Status', 'Submitted', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-navy">{b.full_name}</div>
                      <div className="text-xs text-gray-400">{b.email}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{b.service_type}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-700">{b.preferred_date}</div>
                      <div className="text-xs text-gray-400">{b.preferred_time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={clsx('badge text-xs font-semibold', STATUS_COLORS[b.status])}>{b.status}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400">{new Date(b.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setSelected(b)} className="p-1.5 rounded-lg hover:bg-sky/10 text-sky transition-colors" title="View"><Eye size={15} /></button>
                        {b.status === 'pending' && <button onClick={() => quickStatus(b.id, 'confirmed')} className="p-1.5 rounded-lg hover:bg-green/10 text-green transition-colors" title="Confirm"><CheckCircle2 size={15} /></button>}
                        {b.status === 'confirmed' && <button onClick={() => quickStatus(b.id, 'completed')} className="p-1.5 rounded-lg hover:bg-navy/10 text-navy transition-colors" title="Complete"><CheckCircle2 size={15} /></button>}
                        <button onClick={() => remove(b.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && <BookingModal booking={selected} onClose={() => setSelected(null)} onUpdate={load} />}
    </div>
  )
}
