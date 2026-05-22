import { useForm } from 'react-hook-form'
import { useAuth } from '../../../hooks/useAuth'
import { authAPI } from '../../../utils/api'
import { User, Lock, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProfileAdmin() {
  const { admin } = useAuth()
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm({
    defaultValues: { name: admin?.name, email: admin?.email }
  })

  const onSubmit = async (data) => {
    try {
      const payload = { name: data.name, email: data.email }
      if (data.new_password) {
        if (data.new_password !== data.confirm_password) { toast.error('Passwords do not match'); return }
        payload.password = data.new_password
      }
      await authAPI.updateMe(payload)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Update failed')
    }
  }

  return (
    <div>
      <h1 className="font-display font-bold text-navy text-2xl mb-6">My Profile</h1>
      <div className="max-w-lg">
        <div className="card p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky to-navy flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-navy text-lg">{admin?.name}</div>
              <div className="text-gray-500 text-sm">{admin?.email}</div>
              <span className="badge bg-green/10 text-green text-xs mt-1">Administrator</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input {...register('name', { required: true })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input {...register('email', { required: true })} className="input-field" type="email" />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Change Password (optional)</span>
              </div>
              <div className="space-y-3">
                <input {...register('new_password')} className="input-field" type="password" placeholder="New password" />
                <input {...register('confirm_password')} className="input-field" type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center">
              <Save size={16} />{isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
