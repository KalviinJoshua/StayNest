import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { favoriteService } from '../services/favoriteService.js'
import { useAuth } from './AuthContext.jsx'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState([]) // full property objects
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const data = await favoriteService.list()
      setFavorites(data.properties)
    } catch {
      setFavorites([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load the user's favorites when they log in; clear them when they log out.
  useEffect(() => {
    if (isAuthenticated) {
      refresh()
    } else {
      setFavorites([])
    }
  }, [isAuthenticated, refresh])

  const favoriteIds = new Set(favorites.map((p) => p.id))
  const isFavorite = useCallback((id) => favoriteIds.has(id), [favorites])

  // Save/remove and update local state optimistically, rolling back on error.
  const toggleFavorite = useCallback(
    async (property) => {
      const id = property.id
      const alreadySaved = favorites.some((p) => p.id === id)

      if (alreadySaved) {
        const prev = favorites
        setFavorites((f) => f.filter((p) => p.id !== id))
        try {
          await favoriteService.remove(id)
        } catch (err) {
          setFavorites(prev) // rollback
          throw err
        }
      } else {
        const prev = favorites
        setFavorites((f) => [property, ...f])
        try {
          await favoriteService.add(id)
        } catch (err) {
          setFavorites(prev) // rollback
          throw err
        }
      }
    },
    [favorites],
  )

  const value = {
    favorites,
    favoriteIds,
    count: favorites.length,
    loading,
    isFavorite,
    toggleFavorite,
    refresh,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider')
  return ctx
}
