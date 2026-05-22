import { Link } from 'react-router-dom'
import { CalendarCheck, MessageSquare, Star, Briefcase, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

function StatCard({ icon: Icon, label, value, sub, color, to }) {
  return (
    <Link to={to || '#'} className="card p-6 border border-gray-100 hover:border-sky/30 transition-all duration-300 block group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} className="text-white" />
        </div>
        <TrendingUp size={16} className="text-green opacity-60" />
      </div>
      <div className="text-3xl font-display font-bold text-navy mb-1">{value ?? '—'}</div>
      <div className="text-gray-500 text-sm font-medium">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </Link>
  )
}

export default function DashboardOverview({ stats }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-navy text-2xl mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your business.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={CalendarCheck} label="Total Bookings" value={stats?.total_bookings} sub={`${stats?.pending_bookings ?? 0} pending`} color="bg-gradient-to-br from-sky to-navy" to="/admin/bookings" />
        <StatCard icon={MessageSquare} label="Messages" value={stats?.total_messages} sub={`${stats?.unread_messages ?? 0} unread`} color="bg-gradient-to-br from-red-400 to-red-600" to="/admin/messages" />
        <StatCard icon={Star} label="Testimonials" value={stats?.total_testimonials} sub={`${stats?.pending_testimonials ?? 0} pending review`} color="bg-gradient-to-br from-yellow-400 to-orange-500" to="/admin/testimonials" />
        <StatCard icon={Briefcase} label="Active Services" value={stats?.total_services} sub="Manage services" color="bg-gradient-to-br from-green to-sky" to="/admin/services" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending alerts */}
        <div className="card p-6 border border-gray-100">
          <h2 className="font-display font-bold text-navy mb-4 text-base">Action Required</h2>
          <div className="space-y-3">
            {stats?.pending_bookings > 0 && (
              <Link to="/admin/bookings" className="flex items-center gap-3 p-3 bg-sky/5 border border-sky/20 rounded-xl hover:bg-sky/10 transition-colors">
                <AlertCircle size={16} className="text-sky shrink-0" />
                <span className="text-sm text-gray-700"><strong className="text-navy">{stats.pending_bookings}</strong> booking{stats.pending_bookings !== 1 ? 's' : ''} awaiting confirmation</span>
              </Link>
            )}
            {stats?.unread_messages > 0 && (
              <Link to="/admin/messages" className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <span className="text-sm text-gray-700"><strong className="text-navy">{stats.unread_messages}</strong> unread message{stats.unread_messages !== 1 ? 's' : ''}</span>
              </Link>
            )}
            {stats?.pending_testimonials > 0 && (
              <Link to="/admin/testimonials" className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl hover:bg-yellow-100 transition-colors">
                <Clock size={16} className="text-yellow-500 shrink-0" />
                <span className="text-sm text-gray-700"><strong className="text-navy">{stats.pending_testimonials}</strong> testimonial{stats.pending_testimonials !== 1 ? 's' : ''} awaiting approval</span>
              </Link>
            )}
            {(!stats?.pending_bookings && !stats?.unread_messages && !stats?.pending_testimonials) && (
              <div className="flex items-center gap-3 p-3 bg-green/5 border border-green/20 rounded-xl">
                <CheckCircle2 size={16} className="text-green" />
                <span className="text-sm text-gray-600">All caught up! Nothing needs attention right now.</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="card p-6 border border-gray-100">
          <h2 className="font-display font-bold text-navy mb-4 text-base">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/admin/bookings', label: 'View Bookings', icon: CalendarCheck, color: 'bg-sky/10 text-sky hover:bg-sky hover:text-white' },
              { to: '/admin/messages', label: 'Read Messages', icon: MessageSquare, color: 'bg-red-50 text-red-400 hover:bg-red-400 hover:text-white' },
              { to: '/admin/testimonials', label: 'Approve Reviews', icon: Star, color: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-500 hover:text-white' },
              { to: '/admin/services', label: 'Manage Services', icon: Briefcase, color: 'bg-green/10 text-green hover:bg-green hover:text-white' },
            ].map(({ to, label, icon: Icon, color }) => (
              <Link key={to} to={to} className={`flex items-center gap-2.5 p-4 rounded-xl border border-gray-100 transition-all duration-200 text-sm font-medium ${color}`}>
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
