import { Router } from 'express'

import adminCategoriesRoutes from './admin-categories.routes.js'
import adminProductsRoutes from './admin-products.routes.js'
import uploadRoutes from './upload.routes.js'
import companyRoutes from './admin-company.routes.js'

const router = Router()

router.use(companyRoutes)

router.use('/admin/categories', adminCategoriesRoutes)
router.use('/admin/products', adminProductsRoutes)
router.use('/upload', uploadRoutes)

export { router }
