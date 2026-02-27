import { Router } from 'express'
import { menuRoutes } from './menu.routes.js'
import { cartRoutes } from './cart.routes.js'
import { ordersRoutes } from './orders.routes.js'
import { aboutRoutes } from './about.routes.js'

export const router = Router()

router.get('/api/pizza', (_req, res) => res.json({ ok: true }))

router.use('/api/menu', menuRoutes)
router.use('/api/cart', cartRoutes)
router.use('/api/orders', ordersRoutes)
router.use('/api/about', aboutRoutes)
