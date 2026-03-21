import { Router } from 'express'

import adminCategoriesRoutes from './admin-categories.routes.js'
import adminProductsRoutes from './admin-products.routes.js'
import uploadRoutes from './upload.routes.js'
import companyRoutes from './admin-company.routes.js'
import horarioRoutes from './admin-horario.routes.js'
import adminOpcionaisRoutes from './admin-opcionais.routes.js'

const router = Router()

router.use(companyRoutes)

router.use('/admin/categories', adminCategoriesRoutes)
router.use('/admin/products', adminProductsRoutes)
router.use('/upload', uploadRoutes)
router.use('/admin', adminOpcionaisRoutes)

router.use(horarioRoutes)

export { router }
