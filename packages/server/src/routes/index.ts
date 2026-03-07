import { Router } from 'express'
import uploadRoutes from './upload.routes.js'

import menuRoutes from './menu.routes.js'

const router = Router()

router.use('/menu', menuRoutes)
router.use('/upload', uploadRoutes)

export { router }
