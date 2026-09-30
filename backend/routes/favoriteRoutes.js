import { Router } from 'express'
import { listFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

// Every favorites route is protected — you must be logged in.
router.use(requireAuth)

router.get('/', listFavorites)
router.post('/:propertyId', addFavorite)
router.delete('/:propertyId', removeFavorite)

export default router
