import { Router } from 'express'
import {
	createCategoryController,
	listCategoriesController,
	deleteCategoryController,
} from '../controllers/categories.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const categoryRoutes = Router()
categoryRoutes.post('/admin/categories', verificarToken, createCategoryController)
categoryRoutes.get('/admin/categories', listCategoriesController)
categoryRoutes.delete('/admin/categories/:id', verificarToken, deleteCategoryController)

// Rota pública para listar categorias
categoryRoutes.get('/categories', listCategoriesController)
export default categoryRoutes
