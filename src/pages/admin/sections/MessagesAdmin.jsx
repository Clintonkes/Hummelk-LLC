import { useState, useEffect } from 'react'
import { messagesAPI } from '../../../utils/api'
import { MessageSquare, Trash2, Eye, X, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const STATUS_COLORS = { unread: 'bg-red-100 text-red-600', read: 'bg-gray-100 text-gray-500', replied: 'bg-green/10 text-green' }

function MessageModal({ msg, onClose, onUpdate }) {
  const [reply, setReply] = useState(msg.reply || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (msg.status === 'unread') messagesAPI.update(msg.id, { status: 'read' }).then(onUpdate).catch(() => {})
  }, [])

  const sendReply = async () => {
    setSaving(true)
    try {
      await messagesAPI.update(msg.id, { reply, status: 'replied' })
      toast.success('Reply saved')
      onUpdate(); onClose()
    } catch { toast.error('Failed') } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-display font-bold text-navy">Message from {msg.full_name}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[['From', msg.full_name], ['Email', msg.email], ['Phone', msg.phone || '—'], ['Subject', msg.subject]].map(([l, v]) => (
              <div key={l}><div className="text-xs text-gray-400 mb-0.5">{l}</div><div className="font-medium text-navy">{v}</div></div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{msg.message}</div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reply / Notes</label>
            <textarea value={reply} onChange={e => setReply(e.target.value)} className="input-field resize-none" rows={4} placeholder="Your reply..." />
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium">Cancel</button>
          <button onClick={sendReply} disabled={saving} className="flex-1 btn-primary justify-center text-sm py-2.5">
            <Send size={15} />{saving ? 'Saving...' : 'Save Reply'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('')

  const load = () => {
    setLoading(true)
    messagesAPI.getAll(filter ? { status: filter } : {})
      .then(({ data }) => setMessages(data))
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return
    try { await messagesAPI.delete(id); load(); toast.success('Deleted') } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-navy text-2xl">Messages</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field w-40 py-2">
          <option value="">All</option>
          {['unread', 'read', 'replied'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>
      {loading ? (
        <div className="card p-12 text-center border border-gray-100"><div className="animate-spin w-8 h-8 border-2 border-sky border-t-transparent rounded-full mx-auto" /></div>
      ) : messages.length === 0 ? (
        <div className="card p-12 text-center border border-gray-100"><MessageSquare size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-gray-400">No messages</p></div>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className={clsx('card p-5 border transition-all duration-200 flex items-start gap-4', m.status === 'unread' ? 'border-sky/30 bg-sky/5' : 'border-gray-100')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky to-navy flex items-center justify-center shrink-0">
                <MessageSquare size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-navy text-sm">{m.full_name}</span>
                  <span className={clsx('badge text-xs', STATUS_COLORS[m.status])}>{m.status}</span>
                  <span className="text-xs text-gray-400 ml-auto">{new Date(m.created_at).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{m.email} · {m.subject}</div>
                <p className="text-gray-600 text-sm truncate">{m.message}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => setSelected(m)} className="p-2 rounded-lg hover:bg-sky/10 text-sky transition-colors"><Eye size={15} /></button>
                <button onClick={() => remove(m.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selected && <MessageModal msg={selected} onClose={() => setSelected(null)} onUpdate={load} />}
    </div>
  )
}
