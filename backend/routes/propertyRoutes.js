import { Router } from 'express'
import { listProperties, getProperty } from '../controllers/propertyController.js'

const router = Router()

router.get('/', listProperties)
router.get('/:id', getProperty)

export default router
