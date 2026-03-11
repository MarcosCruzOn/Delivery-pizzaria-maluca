import { Router } from 'express'
import {
	createCategory,
	deleteCategory,
	listCategories,
} from '../controllers/admin-categories.controllers.js'

const router = Router()

router.get('/', listCategories)
router.post('/', createCategory)
router.delete('/:id', deleteCategory)

export default router
