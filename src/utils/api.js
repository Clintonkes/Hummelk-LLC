import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({ baseURL: API_BASE })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hummelk_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('hummelk_token')
      localStorage.removeItem('hummelk_admin')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  updateMe: (data) => api.put('/auth/me', data),
}

export const bookingsAPI = {
  create: (data) => api.post('/bookings/', data),
  getAll: (params) => api.get('/bookings/', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
}

export const messagesAPI = {
  create: (data) => api.post('/messages/', data),
  getAll: (params) => api.get('/messages/', { params }),
  getById: (id) => api.get(`/messages/${id}`),
  update: (id, data) => api.put(`/messages/${id}`, data),
  delete: (id) => api.delete(`/messages/${id}`),
}

export const testimonialsAPI = {
  create: (data) => api.post('/testimonials/', data),
  getAll: (params) => api.get('/testimonials/', { params }),
  getById: (id) => api.get(`/testimonials/${id}`),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
}

export const servicesAPI = {
  getAll: (params) => api.get('/services/', { params }),
  getAllAdmin: (params) => api.get('/services/admin/all', { params }),
  create: (data) => api.post('/services/', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
}

export const settingsAPI = {
  getStats: () => api.get('/settings/dashboard/stats'),
  getAll: () => api.get('/settings/'),
  update: (key, value) => api.put(`/settings/${key}`, { value }),
}

export default api
