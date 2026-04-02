import { Router } from 'express'
import {
	createOrderController,
	listOrdersController,
	updateOrderStatusController,
	getOrderDetailsController,
} from '../controllers/orders.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const orderRoutes = Router()
orderRoutes.post('/orders', createOrderController) // Cliente compra
orderRoutes.get('/admin/orders', verificarToken, listOrdersController) // Admin vê
orderRoutes.patch('/admin/orders/:idpedido/status', verificarToken, updateOrderStatusController) //
orderRoutes.get('/admin/orders/:idpedido/details', verificarToken, getOrderDetailsController)
export default orderRoutes
