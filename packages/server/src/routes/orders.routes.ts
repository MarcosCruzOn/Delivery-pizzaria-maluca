import { Router } from 'express'
import { createOrder, getOrder } from '../controllers/orders.controllers.js'

export const ordersRoutes = Router()
ordersRoutes.post('/', createOrder)
ordersRoutes.get('/:id', getOrder)
