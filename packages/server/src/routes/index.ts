import { Router } from 'express'

import adminCategoriesRoutes from './admin-categories.routes.js'

import uploadRoutes from './upload.routes.js'

const router = Router()

router.use('/admin/categories', adminCategoriesRoutes)
router.use('/upload', uploadRoutes)

export { router }
