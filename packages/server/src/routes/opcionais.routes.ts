import { Router } from 'express'
import {
	createOpcionalController,
	listOpcionaisController,
	createOpcionalItemController,
	listOpcionalItemsController,
} from '../controllers/opcioinais.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const opcionaisRoutes = Router()
opcionaisRoutes.post(
	'/admin/opcionais',
	verificarToken,
	createOpcionalController
)
opcionaisRoutes.get('/admin/opcionais', listOpcionaisController)
opcionaisRoutes.post(
	'/admin/opcionais/:idopcional/itens',
	verificarToken,
	createOpcionalItemController
)
opcionaisRoutes.get(
	'/admin/opcionais/:idopcional/itens',
	listOpcionalItemsController
)

export default opcionaisRoutes
