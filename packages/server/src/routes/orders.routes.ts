import { Router } from 'express'
import {
	createOrderController,
	listOrdersController,
	updateOrderStatusController,
} from '../controllers/orders.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const orderRoutes = Router()
orderRoutes.post('/orders', createOrderController) // Cliente compra
orderRoutes.get('/admin/orders', verificarToken, listOrdersController) // Admin vê
orderRoutes.patch('/admin/orders/:idpedido/status', verificarToken, updateOrderStatusController) // Admin atualiza

export default orderRoutes
