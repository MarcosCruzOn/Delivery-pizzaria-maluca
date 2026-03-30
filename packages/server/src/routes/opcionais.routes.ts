import { Router } from 'express'
import {
	createOpcionalController,
	listOpcionaisController,
	createOpcionalItemController,
	listOpcionalItemsController,
	updateOpcionalController,
	deleteOpcionalController,
	updateItemOpcionalController,
	deleteItemOpcionalController,
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

// Rotas do GRUPO
opcionaisRoutes.put(
	'/admin/opcionais/:id',
	verificarToken,
	updateOpcionalController
)
opcionaisRoutes.delete(
	'/admin/opcionais/:id',
	verificarToken,
	deleteOpcionalController
)

// Rotas do ITEM
opcionaisRoutes.put(
	'/admin/opcionais/itens/:idItem',
	verificarToken,
	updateItemOpcionalController
)
opcionaisRoutes.delete(
	'/admin/opcionais/itens/:idItem',
	verificarToken,
	deleteItemOpcionalController
)

export default opcionaisRoutes
