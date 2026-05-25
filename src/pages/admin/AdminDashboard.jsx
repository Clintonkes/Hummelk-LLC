import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { settingsAPI } from '../../utils/api'
import clsx from 'clsx'
import {
  LayoutDashboard, CalendarCheck, MessageSquare, Star, Briefcase,
  Settings, User, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react'

import DashboardOverview from './sections/DashboardOverview'
import BookingsAdmin from './sections/BookingsAdmin'
import MessagesAdmin from './sections/MessagesAdmin'
import TestimonialsAdmin from './sections/TestimonialsAdmin'
import ServicesAdmin from './sections/ServicesAdmin'
import SettingsAdmin from './sections/SettingsAdmin'
import ProfileAdmin from './sections/ProfileAdmin'

const NAV_ITEMS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/services', label: 'Services', icon: Briefcase },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/profile', label: 'My Profile', icon: User },
]

function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <LogOut size={24} className="text-red-500" />
        </div>
        <h3 className="font-display font-bold text-navy text-xl mb-2">Sign Out?</h3>
        <p className="text-gray-500 text-sm mb-6">You'll need to sign in again to access the dashboard.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium text-sm">Sign Out</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = () => settingsAPI.getStats().then(({ data }) => setStats(data)).catch(() => {})
    fetchStats()
    window.addEventListener('refreshStats', fetchStats)
    return () => window.removeEventListener('refreshStats', fetchStats)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const isActive = (to, exact) => exact ? pathname === to : pathname.startsWith(to) && to !== '/admin'

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <aside className={clsx(
          'fixed top-0 left-0 h-full w-64 bg-navy flex flex-col z-50 transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-sky rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm leading-tight">Hummelk LLC</div>
                <div className="text-xs text-sky-400">Admin Panel</div>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(({ to, label, icon: Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    active ? 'bg-white/15 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon size={18} />
                  {label}
                  {active && <ChevronRight size={14} className="ml-auto" />}
                  {label === 'Bookings' && stats?.pending_bookings > 0 && (
                    <span className="ml-auto bg-sky text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.pending_bookings}</span>
                  )}
                  {label === 'Messages' && stats?.unread_messages > 0 && (
                    <span className="ml-auto bg-red-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{stats.unread_messages}</span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Admin info + logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky/20 flex items-center justify-center">
                <User size={18} className="text-sky-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{admin?.name}</div>
                <div className="text-gray-400 text-xs truncate">{admin?.email}</div>
              </div>
            </div>
            <button onClick={() => setShowLogout(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 text-sm font-medium">
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </aside>
      </>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden w-full max-w-[100vw] lg:max-w-none">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Menu size={20} className="text-navy" />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-navy font-medium capitalize">{pathname.split('/').pop() || 'Overview'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-gray-400 hover:text-navy transition-colors">View Site</Link>
            <div className="relative">
              <Bell size={18} className="text-gray-400 hover:text-navy cursor-pointer transition-colors" />
              {(stats?.unread_messages > 0 || stats?.pending_bookings > 0) && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
              <User size={16} className="text-navy" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route index element={<DashboardOverview stats={stats} />} />
            <Route path="bookings" element={<BookingsAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
            <Route path="profile" element={<ProfileAdmin />} />
          </Routes>
        </main>
      </div>

      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
    </div>
  )
}
