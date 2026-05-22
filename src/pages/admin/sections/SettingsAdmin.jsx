import { useState, useEffect } from 'react'
import { settingsAPI } from '../../../utils/api'
import { Settings, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsAdmin() {
  const [settings, setSettings] = useState([])
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState({})

  useEffect(() => {
    settingsAPI.getAll()
      .then(({ data }) => {
        setSettings(data)
        const v = {}
        data.forEach(s => { v[s.key] = s.value || '' })
        setValues(v)
      })
      .catch(() => toast.error('Failed to load settings'))
  }, [])

  const save = async (key) => {
    setSaving(prev => ({ ...prev, [key]: true }))
    try {
      await settingsAPI.update(key, values[key])
      toast.success('Setting saved')
    } catch { toast.error('Failed to save') } finally {
      setSaving(prev => ({ ...prev, [key]: false }))
    }
  }

  return (
    <div>
      <h1 className="font-display font-bold text-navy text-2xl mb-6">Site Settings</h1>
      <div className="card border border-gray-100 divide-y divide-gray-100">
        {settings.map(s => (
          <div key={s.key} className="p-5 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-medium text-navy text-sm capitalize">{s.key.replace(/_/g, ' ')}</div>
              {s.description && <div className="text-xs text-gray-400 mt-0.5">{s.description}</div>}
              <input
                value={values[s.key] || ''}
                onChange={e => setValues(prev => ({ ...prev, [s.key]: e.target.value }))}
                className="input-field mt-2 text-sm"
                placeholder={`Enter ${s.key}...`}
              />
            </div>
            <button onClick={() => save(s.key)} disabled={saving[s.key]} className="btn-primary text-sm px-4 py-2.5 shrink-0">
              <Save size={15} />{saving[s.key] ? 'Saving...' : 'Save'}
            </button>
          </div>
        ))}
        {settings.length === 0 && (
          <div className="p-12 text-center"><Settings size={40} className="text-gray-300 mx-auto mb-3" /><p className="text-gray-400">No settings found</p></div>
        )}
      </div>
    </div>
  )
}
