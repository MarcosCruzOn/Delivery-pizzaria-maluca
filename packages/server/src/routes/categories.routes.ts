import { Router } from 'express'
import {
	createCategoryController,
	listCategoriesController,
} from '../controllers/categories.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const categoryRoutes = Router()
categoryRoutes.post(
	'/admin/categories',
	verificarToken,
	createCategoryController
)
categoryRoutes.get('/admin/categories', listCategoriesController)

export default categoryRoutes
