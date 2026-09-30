import { api } from './api.js'

export const propertyService = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return api.get(`/properties${qs ? `?${qs}` : ''}`)
  },
  getOne: (id) => api.get(`/properties/${id}`),
}
