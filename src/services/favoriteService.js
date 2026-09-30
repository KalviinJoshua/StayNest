import { api } from './api.js'

export const favoriteService = {
  list: () => api.get('/favorites'),
  add: (propertyId) => api.post(`/favorites/${propertyId}`),
  remove: (propertyId) => api.del(`/favorites/${propertyId}`),
}
