import { Router } from 'express'
import {
	listarTiposEntregaController,
	atualizarTipoEntregaController,
} from '../controllers/delivery.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const deliveryRoutes = Router()

deliveryRoutes.get('/admin/delivery-types', verificarToken, listarTiposEntregaController)
deliveryRoutes.put('/admin/delivery-types/:id', verificarToken, atualizarTipoEntregaController)

export default deliveryRoutes
