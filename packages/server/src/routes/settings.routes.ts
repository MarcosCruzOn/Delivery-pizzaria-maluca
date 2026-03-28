import { Router } from 'express'
import {
	createPaymentController,
	listPaymentsController,
	createDeliveryController,
	listDeliveriesController,
	createOrderStatusController,
	listOrderStatusController,
} from '../controllers/settings.controllers.js'
import {
	createHorarioController,
	listHorariosController,
} from '../controllers/horario.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const settingsRoutes = Router()
settingsRoutes.post(
	'/admin/pagamentos',
	verificarToken,
	createPaymentController
)
settingsRoutes.get('/pagamentos', listPaymentsController)
settingsRoutes.post('/admin/entregas', verificarToken, createDeliveryController)
settingsRoutes.get('/entregas', listDeliveriesController)
settingsRoutes.post(
	'/admin/status',
	verificarToken,
	createOrderStatusController
)
settingsRoutes.get('/status', listOrderStatusController)
settingsRoutes.post('/admin/horarios', verificarToken, createHorarioController)
settingsRoutes.get('/horarios', listHorariosController)

export default settingsRoutes
