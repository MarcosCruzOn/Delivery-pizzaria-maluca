import { Router } from 'express'
import {
	listarPagamentosController,
	togglePagamentoController,
} from '../controllers/pagamentos.controllers.js'
import { verificarToken } from '../middlewares/auth.js'

const pagamentosRoutes = Router()

pagamentosRoutes.get('/admin/pagamentos', verificarToken, listarPagamentosController)
pagamentosRoutes.patch('/admin/pagamentos/:id/toggle', verificarToken, togglePagamentoController)

export default pagamentosRoutes
