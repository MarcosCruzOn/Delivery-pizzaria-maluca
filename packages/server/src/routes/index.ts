import { Router } from 'express'
import menuRoutes from './menu.routes.js'

const router = Router()

router.use('/menu', menuRoutes)

export { router }
